import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEFAULT_SETTINGS = {
  shopName: "TRIM",
  address: "123 Main Street, Downtown, City 12345",
  phone: "(555) 123-4567",
  email: "info@trim.com",
  openTime: "09:00",
  closeTime: "20:00",
  slotDuration: 30,
  closedDays: [0], // Sunday closed by default
};

export async function GET() {
  try {
    // Find existing settings or create default
    let settings = await prisma.shopSettings.findFirst();

    if (!settings) {
      settings = await prisma.shopSettings.create({
        data: DEFAULT_SETTINGS,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching shop settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch shop settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      shopName,
      address,
      phone,
      email,
      openTime,
      closeTime,
      slotDuration,
      closedDays,
    } = body;

    // Find existing settings
    let settings = await prisma.shopSettings.findFirst();

    if (!settings) {
      // Create with provided values and defaults
      settings = await prisma.shopSettings.create({
        data: {
          shopName: shopName ?? DEFAULT_SETTINGS.shopName,
          address: address ?? DEFAULT_SETTINGS.address,
          phone: phone ?? DEFAULT_SETTINGS.phone,
          email: email ?? DEFAULT_SETTINGS.email,
          openTime: openTime ?? DEFAULT_SETTINGS.openTime,
          closeTime: closeTime ?? DEFAULT_SETTINGS.closeTime,
          slotDuration: slotDuration ?? DEFAULT_SETTINGS.slotDuration,
          closedDays: closedDays ?? DEFAULT_SETTINGS.closedDays,
        },
      });
    } else {
      // Update existing settings
      settings = await prisma.shopSettings.update({
        where: { id: settings.id },
        data: {
          ...(shopName !== undefined && { shopName }),
          ...(address !== undefined && { address }),
          ...(phone !== undefined && { phone }),
          ...(email !== undefined && { email }),
          ...(openTime !== undefined && { openTime }),
          ...(closeTime !== undefined && { closeTime }),
          ...(slotDuration !== undefined && { slotDuration }),
          ...(closedDays !== undefined && { closedDays }),
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating shop settings:", error);
    return NextResponse.json(
      { error: "Failed to update shop settings" },
      { status: 500 }
    );
  }
}
