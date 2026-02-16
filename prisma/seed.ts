import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: "srv_classic_haircut" },
      update: {},
      create: {
        id: "srv_classic_haircut",
        name: "Classic Haircut",
        description:
          "Traditional haircut with precision cutting and styling. Includes wash and blow dry.",
        duration: 30,
        price: 25,
      },
    }),
    prisma.service.upsert({
      where: { id: "srv_beard_trim" },
      update: {},
      create: {
        id: "srv_beard_trim",
        name: "Beard Trim",
        description:
          "Expert beard shaping and trimming to maintain your perfect look.",
        duration: 20,
        price: 15,
      },
    }),
    prisma.service.upsert({
      where: { id: "srv_haircut_beard" },
      update: {},
      create: {
        id: "srv_haircut_beard",
        name: "Haircut & Beard",
        description:
          "Complete grooming package with haircut and beard trim combo.",
        duration: 45,
        price: 35,
      },
    }),
    prisma.service.upsert({
      where: { id: "srv_hot_towel" },
      update: {},
      create: {
        id: "srv_hot_towel",
        name: "Hot Towel Shave",
        description:
          "Luxurious traditional hot towel shave for the smoothest finish.",
        duration: 30,
        price: 30,
      },
    }),
    prisma.service.upsert({
      where: { id: "srv_kids_haircut" },
      update: {},
      create: {
        id: "srv_kids_haircut",
        name: "Kids Haircut",
        description:
          "Gentle and patient haircuts for children under 12 years old.",
        duration: 20,
        price: 18,
      },
    }),
    prisma.service.upsert({
      where: { id: "srv_premium" },
      update: {},
      create: {
        id: "srv_premium",
        name: "Premium Package",
        description:
          "Full service including haircut, beard trim, hot towel, and styling.",
        duration: 60,
        price: 55,
      },
    }),
  ]);

  console.log(`Created ${services.length} services`);

  // Create barbers
  const barbers = await Promise.all([
    prisma.barber.upsert({
      where: { id: "barber_james" },
      update: {},
      create: {
        id: "barber_james",
        name: "James Wilson",
        email: "james@barbershop.com",
        phone: "(555) 111-2222",
        bio: "15 years of experience specializing in classic cuts and hot towel shaves.",
        specialties: ["Classic Cuts", "Hot Towel Shave", "Beard Styling"],
      },
    }),
    prisma.barber.upsert({
      where: { id: "barber_michael" },
      update: {},
      create: {
        id: "barber_michael",
        name: "Michael Chen",
        email: "michael@barbershop.com",
        phone: "(555) 222-3333",
        bio: "Expert in modern fades and creative designs. Award-winning stylist.",
        specialties: ["Fades", "Hair Design", "Color"],
      },
    }),
    prisma.barber.upsert({
      where: { id: "barber_david" },
      update: {},
      create: {
        id: "barber_david",
        name: "David Rodriguez",
        email: "david@barbershop.com",
        phone: "(555) 333-4444",
        bio: "Passionate about precision cuts and making every client look their best.",
        specialties: ["Precision Cuts", "Kids Haircuts", "Beard Trim"],
      },
    }),
    prisma.barber.upsert({
      where: { id: "barber_alex" },
      update: {},
      create: {
        id: "barber_alex",
        name: "Alex Thompson",
        email: "alex@barbershop.com",
        phone: "(555) 444-5555",
        bio: "Bringing fresh perspectives and the latest trends to traditional barbering.",
        specialties: ["Trendy Styles", "Texture", "Styling"],
      },
    }),
  ]);

  console.log(`Created ${barbers.length} barbers`);

  // Create work schedules for each barber (Mon-Sat, 9am-6pm)
  for (const barber of barbers) {
    for (let day = 1; day <= 6; day++) {
      await prisma.workSchedule.upsert({
        where: {
          barberId_dayOfWeek: {
            barberId: barber.id,
            dayOfWeek: day,
          },
        },
        update: {},
        create: {
          barberId: barber.id,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "18:00",
          isWorking: true,
        },
      });
    }
    // Sunday off
    await prisma.workSchedule.upsert({
      where: {
        barberId_dayOfWeek: {
          barberId: barber.id,
          dayOfWeek: 0,
        },
      },
      update: {},
      create: {
        barberId: barber.id,
        dayOfWeek: 0,
        startTime: "09:00",
        endTime: "18:00",
        isWorking: false,
      },
    });
  }

  console.log("Created work schedules for all barbers");

  // Create shop settings
  await prisma.shopSettings.upsert({
    where: { id: "shop_main" },
    update: {},
    create: {
      id: "shop_main",
      shopName: "BarberShop",
      address: "123 Main Street, Downtown, City 12345",
      phone: "(555) 123-4567",
      email: "info@barbershop.com",
      openTime: "09:00",
      closeTime: "20:00",
      slotDuration: 30,
      closedDays: [0], // Sunday
    },
  });

  console.log("Created shop settings");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
