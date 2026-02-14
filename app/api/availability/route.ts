import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  startOfDay,
  endOfDay,
  addMinutes,
  format,
  parse,
  isAfter,
  isBefore,
} from "date-fns";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");
    const barberId = searchParams.get("barberId");
    const serviceId = searchParams.get("serviceId");

    if (!dateParam) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    const date = new Date(dateParam);
    const dayOfWeek = date.getDay();

    // Get shop settings
    const shopSettings = await prisma.shopSettings.findFirst();
    const openTime = shopSettings?.openTime || "09:00";
    const closeTime = shopSettings?.closeTime || "20:00";
    const slotDuration = shopSettings?.slotDuration || 30;
    const closedDays = shopSettings?.closedDays || [0]; // Sunday closed by default

    // Check if shop is closed on this day
    if (closedDays.includes(dayOfWeek)) {
      return NextResponse.json({ slots: [], message: "Shop is closed on this day" });
    }

    // Get service duration if provided
    let serviceDuration = slotDuration;
    if (serviceId) {
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });
      if (service) {
        serviceDuration = service.duration;
      }
    }

    // Get barber's work schedule if provided
    let barberSchedule = null;
    if (barberId) {
      barberSchedule = await prisma.workSchedule.findUnique({
        where: {
          barberId_dayOfWeek: {
            barberId,
            dayOfWeek,
          },
        },
      });

      // If barber doesn't work this day
      if (barberSchedule && !barberSchedule.isWorking) {
        return NextResponse.json({
          slots: [],
          message: "Barber is not available on this day",
        });
      }
    }

    // Generate time slots
    const slots: { time: string; available: boolean }[] = [];
    const startDate = startOfDay(date);
    const endDate = endOfDay(date);

    const scheduleStart = barberSchedule?.startTime || openTime;
    const scheduleEnd = barberSchedule?.endTime || closeTime;

    let currentTime = parse(scheduleStart, "HH:mm", startDate);
    const endTimeLimit = parse(scheduleEnd, "HH:mm", startDate);

    // Get existing appointments for this day
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        ...(barberId && { barberId }),
      },
    });

    // Generate slots
    while (isBefore(currentTime, endTimeLimit)) {
      const slotEndTime = addMinutes(currentTime, serviceDuration);

      // Check if slot would extend past closing time
      if (isAfter(slotEndTime, endTimeLimit)) {
        break;
      }

      // Check if slot conflicts with existing appointments
      const isBooked = existingAppointments.some((apt) => {
        const aptStart = new Date(apt.startTime);
        const aptEnd = new Date(apt.endTime);
        return (
          (currentTime >= aptStart && currentTime < aptEnd) ||
          (slotEndTime > aptStart && slotEndTime <= aptEnd) ||
          (currentTime <= aptStart && slotEndTime >= aptEnd)
        );
      });

      // Check if slot is in the past (for today)
      const now = new Date();
      const isPast = isBefore(currentTime, now);

      slots.push({
        time: format(currentTime, "h:mm a"),
        available: !isBooked && !isPast,
      });

      currentTime = addMinutes(currentTime, slotDuration);
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
