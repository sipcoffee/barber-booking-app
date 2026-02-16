import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { format, parse, addMinutes, isBefore, isAfter } from "date-fns";

const DEFAULT_SETTINGS = {
  openTime: "09:00",
  closeTime: "20:00",
  slotDuration: 30,
  closedDays: [0], // Sunday
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");
    const barberId = searchParams.get("barberId");
    const serviceDuration = parseInt(searchParams.get("duration") || "30");

    if (!dateStr) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Parse the date string properly to avoid timezone issues
    const [year, month, day] = dateStr.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const dayOfWeek = selectedDate.getDay();

    // Get shop settings
    let settings = await prisma.shopSettings.findFirst();
    if (!settings) {
      settings = {
        id: "",
        shopName: "",
        address: "",
        phone: "",
        email: "",
        ...DEFAULT_SETTINGS,
      };
    }

    // Check if shop is closed on this day
    if (settings.closedDays.includes(dayOfWeek)) {
      return NextResponse.json({
        slots: [],
        message: "Shop is closed on this day",
      });
    }

    // Get existing appointments for this date
    const dayStart = new Date(year, month - 1, day, 0, 0, 0, 0);
    const dayEnd = new Date(year, month - 1, day, 23, 59, 59, 999);

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        ...(barberId && { barberId }),
      },
      select: {
        startTime: true,
        endTime: true,
        barberId: true,
      },
    });

    // Generate time slots
    const slots: { time: string; available: boolean }[] = [];
    const openTime = parse(settings.openTime, "HH:mm", selectedDate);
    const closeTime = parse(settings.closeTime, "HH:mm", selectedDate);
    const slotDuration = settings.slotDuration;

    let currentSlot = openTime;
    const now = new Date();

    while (isBefore(currentSlot, closeTime)) {
      const slotEnd = addMinutes(currentSlot, serviceDuration);

      // Check if this slot would extend past closing time
      if (isAfter(slotEnd, closeTime)) {
        break;
      }

      // Check if slot is in the past (for today)
      const isToday = format(selectedDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
      const isPast = isToday && isBefore(currentSlot, now);

      // Check if slot conflicts with existing appointments
      const hasConflict = existingAppointments.some((apt) => {
        const aptStart = new Date(apt.startTime);
        const aptEnd = new Date(apt.endTime);
        // Conflict if: slot starts before apt ends AND slot ends after apt starts
        return isBefore(currentSlot, aptEnd) && isAfter(slotEnd, aptStart);
      });

      const timeString = format(currentSlot, "h:mm a");
      slots.push({
        time: timeString,
        available: !isPast && !hasConflict,
      });

      currentSlot = addMinutes(currentSlot, slotDuration);
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
