import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const barber = await prisma.barber.findUnique({
      where: { id },
    });

    if (!barber) {
      return NextResponse.json(
        { error: "Barber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(barber);
  } catch (error) {
    console.error("Error fetching barber:", error);
    return NextResponse.json(
      { error: "Failed to fetch barber" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, bio, imageUrl, specialties } = body;

    const barber = await prisma.barber.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(bio !== undefined && { bio }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(specialties !== undefined && { specialties }),
      },
    });

    return NextResponse.json(barber);
  } catch (error) {
    console.error("Error updating barber:", error);
    return NextResponse.json(
      { error: "Failed to update barber" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Soft delete by setting isActive to false
    await prisma.barber.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting barber:", error);
    return NextResponse.json(
      { error: "Failed to delete barber" },
      { status: 500 }
    );
  }
}
