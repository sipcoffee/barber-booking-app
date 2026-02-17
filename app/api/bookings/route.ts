import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parse, addMinutes } from "date-fns";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const barberId = searchParams.get("barberId");

    // Build date filter if provided
    let dateFilter = {};
    if (startDate && endDate) {
      // Date range filter
      const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
      const [endYear, endMonth, endDay] = endDate.split("-").map(Number);
      const rangeStart = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0);
      const rangeEnd = new Date(endYear, endMonth - 1, endDay, 23, 59, 59, 999);

      dateFilter = {
        date: {
          gte: rangeStart,
          lte: rangeEnd,
        },
      };
    } else if (date) {
      // Single date filter (backwards compatible)
      const [year, month, day] = date.split("-").map(Number);
      const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
      const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

      dateFilter = {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        ...(status && { status: status as any }),
        ...dateFilter,
        ...(barberId && { barberId }),
      },
      include: {
        barber: true,
        service: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      serviceId,
      barberId,
      date,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      notes,
    } = body;

    // Validate required fields
    if (
      !serviceId ||
      !date ||
      !timeSlot ||
      !customerName ||
      !customerEmail ||
      !customerPhone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get service to determine duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // If no barber specified, find first available
    let selectedBarberId = barberId;
    if (!selectedBarberId) {
      const availableBarber = await prisma.barber.findFirst({
        where: { isActive: true },
      });
      if (availableBarber) {
        selectedBarberId = availableBarber.id;
      } else {
        return NextResponse.json(
          { error: "No barbers available" },
          { status: 400 }
        );
      }
    }

    // Parse date and time
    const appointmentDate = new Date(date);
    const startTime = parse(timeSlot, "h:mm a", appointmentDate);
    const endTime = addMinutes(startTime, service.duration);

    // Check for conflicts
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        barberId: selectedBarberId,
        date: appointmentDate,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
        ],
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        date: appointmentDate,
        startTime,
        endTime,
        notes,
        barberId: selectedBarberId,
        serviceId,
      },
      include: {
        barber: true,
        service: true,
      },
    });

    // TODO: Send confirmation email

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
