# Barber Shop Landing Page - Project Architecture

## Overview

A modern, responsive landing page for a barber shop featuring an online booking system built with Next.js 16, TypeScript, and Tailwind CSS 4.

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.1.1 |
| Language | TypeScript | 5.x |
| React | React | 19.2.3 |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui (Radix UI) | latest |
| Database | PostgreSQL + Prisma | 7.2.0 |
| Authentication | better-auth | 1.4.10 |
| Form Handling | React Hook Form | 7.70.0 |
| Validation | Zod | 4.x |
| Date Utilities | date-fns | 4.x |
| Date Picker | react-day-picker | 9.x |
| Icons | lucide-react + react-icons | latest |
| Toasts | sonner | 2.x |
| Theme | next-themes | 0.4.6 |

---

## Project Structure

```
barber/
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── migrations/                # Database migrations
│   └── seed.ts                    # Seed data for services/barbers
│
├── public/
│   └── images/
│       ├── hero/                  # Hero section images
│       ├── gallery/               # Shop gallery images
│       └── barbers/               # Barber profile photos
│
├── assets/
│   └── logo.png                   # Shop logo
│
├── generated/
│   └── prisma/                    # Auto-generated Prisma client
│
├── app/
│   ├── layout.tsx                 # Root layout (fonts, metadata)
│   ├── page.tsx                   # Landing page (home)
│   ├── globals.css                # Global styles & theme variables
│   ├── not-found.tsx              # 404 page
│   │
│   ├── (marketing)/               # Public marketing pages group
│   │   ├── layout.tsx             # Marketing layout (navbar, footer)
│   │   ├── page.tsx               # Landing page
│   │   └── booking/
│   │       └── page.tsx           # Booking page
│   │
│   ├── (auth)/                    # Auth routes group
│   │   ├── layout.tsx             # Auth layout
│   │   ├── login/
│   │   │   └── page.tsx           # Admin login page
│   │   └── signup/
│   │       └── page.tsx           # Admin signup page
│   │
│   ├── (app)/                     # Protected routes group
│   │   ├── layout.tsx             # App layout with sidebar/navbar
│   │   ├── admin/
│   │   │   ├── page.tsx           # Admin dashboard
│   │   │   └── (tabs)/
│   │   │       ├── overview.tab.tsx
│   │   │       ├── appointments.tab.tsx
│   │   │       ├── services.tab.tsx
│   │   │       ├── barbers.tab.tsx
│   │   │       └── settings.tab.tsx
│   │   └── appointments/
│   │       └── page.tsx           # Appointments list/calendar
│   │
│   └── api/
│       ├── auth/[...all]/
│       │   └── route.ts           # better-auth catch-all handler
│       ├── bookings/
│       │   ├── route.ts           # GET all, POST new booking
│       │   └── [id]/
│       │       └── route.ts       # GET, PUT, DELETE booking
│       ├── services/
│       │   └── route.ts           # GET services
│       ├── barbers/
│       │   └── route.ts           # GET barbers
│       └── availability/
│           └── route.ts           # GET available time slots
│
├── components/
│   ├── ui/                        # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── calendar.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx (sonner)
│   │   └── ...
│   │
│   ├── navigation/
│   │   ├── navbar.tsx             # Top navigation bar
│   │   ├── footer.tsx             # Site footer
│   │   └── sidebar/
│   │       ├── app-sidebar.tsx
│   │       ├── nav-main.tsx
│   │       └── nav-user.tsx
│   │
│   ├── landing/
│   │   ├── hero-section.tsx       # Hero with CTA
│   │   ├── services-section.tsx   # Services showcase
│   │   ├── barbers-section.tsx    # Team/barbers showcase
│   │   ├── gallery-section.tsx    # Photo gallery
│   │   ├── testimonials-section.tsx
│   │   ├── pricing-section.tsx    # Pricing table
│   │   ├── location-section.tsx   # Map & contact info
│   │   └── cta-section.tsx        # Call to action
│   │
│   ├── booking/
│   │   ├── booking-form.tsx       # Main booking form
│   │   ├── service-selector.tsx   # Service selection step
│   │   ├── barber-selector.tsx    # Barber selection step
│   │   ├── date-picker.tsx        # Date selection
│   │   ├── time-slot-picker.tsx   # Available time slots
│   │   ├── customer-info-form.tsx # Customer details
│   │   └── booking-summary.tsx    # Confirmation summary
│   │
│   ├── login-form.tsx             # Admin login form
│   └── signup-form.tsx            # Admin signup form
│
├── lib/
│   ├── auth.ts                    # better-auth server configuration
│   ├── auth-client.ts             # better-auth client configuration
│   ├── prisma.ts                  # Prisma client with PG adapter
│   └── utils.ts                   # Utility functions (cn helper)
│
├── hooks/
│   ├── use-mobile.ts              # Mobile breakpoint detection
│   ├── use-booking.ts             # Booking state management
│   └── use-availability.ts        # Fetch available slots
│
├── utils/
│   └── string-utility.ts          # String manipulation helpers
│
├── types/
│   └── index.ts                   # TypeScript interfaces
│
├── proxy.ts                       # Middleware for route protection
│
├── .env                           # Environment variables
├── .env.example                   # Example env file
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── components.json                # shadcn/ui configuration
├── postcss.config.mjs             # PostCSS config for Tailwind
├── eslint.config.mjs              # ESLint configuration
├── package.json
└── README.md
```

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== AUTHENTICATION (better-auth) ====================

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  role          Role      @default(ADMIN)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  sessions      Session[]
  accounts      Account[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Account {
  id                   String    @id @default(cuid())
  userId               String
  providerId           String
  accountId            String
  password             String?
  accessToken          String?
  refreshToken         String?
  idToken              String?
  scope                String?
  accessTokenExpiresAt DateTime?
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([providerId, accountId])
  @@index([userId])
}

model Verification {
  id         String   @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([identifier])
}

// ==================== BARBER SHOP MODELS ====================

model Barber {
  id            String        @id @default(cuid())
  name          String
  email         String?
  phone         String?
  bio           String?
  imageUrl      String?
  specialties   String[]
  isActive      Boolean       @default(true)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  appointments  Appointment[]
  workSchedule  WorkSchedule[]
}

model Service {
  id            String        @id @default(cuid())
  name          String
  description   String?
  duration      Int           // in minutes
  price         Decimal       @db.Decimal(10, 2)
  imageUrl      String?
  isActive      Boolean       @default(true)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  appointments  Appointment[]
}

model Appointment {
  id            String            @id @default(cuid())
  customerName  String
  customerEmail String
  customerPhone String
  date          DateTime
  startTime     DateTime
  endTime       DateTime
  status        AppointmentStatus @default(PENDING)
  notes         String?
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt

  barber        Barber            @relation(fields: [barberId], references: [id])
  barberId      String
  service       Service           @relation(fields: [serviceId], references: [id])
  serviceId     String

  @@index([barberId, date])
  @@index([date, status])
}

model WorkSchedule {
  id        String  @id @default(cuid())
  dayOfWeek Int     // 0 = Sunday, 6 = Saturday
  startTime String  // "09:00"
  endTime   String  // "18:00"
  isWorking Boolean @default(true)

  barber    Barber  @relation(fields: [barberId], references: [id], onDelete: Cascade)
  barberId  String

  @@unique([barberId, dayOfWeek])
}

model ShopSettings {
  id           String @id @default(cuid())
  shopName     String
  address      String
  phone        String
  email        String
  openTime     String // "09:00"
  closeTime    String // "20:00"
  slotDuration Int    @default(30) // minutes
  closedDays   Int[]  // [0] for Sunday closed
}

// ==================== ENUMS ====================

enum Role {
  ADMIN
  STAFF
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
  NO_SHOW
}
```

---

## Authentication Setup (better-auth)

### Server Configuration (`lib/auth.ts`)

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      disablePKCE: true,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      disablePKCE: true,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});
```

### Client Configuration (`lib/auth-client.ts`)

```typescript
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
});

export type SessionData = typeof authClient.$Infer.Session;
```

### API Route (`app/api/auth/[...all]/route.ts`)

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

---

## Prisma Client Setup (`lib/prisma.ts`)

```typescript
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/auth/[...all]` | better-auth handler |
| GET | `/api/services` | Get all active services |
| GET | `/api/barbers` | Get all active barbers |
| GET | `/api/availability?barberId=X&date=Y` | Get available time slots |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings` | Get all bookings (admin) |
| GET | `/api/bookings/[id]` | Get booking by ID |
| PUT | `/api/bookings/[id]` | Update booking status |
| DELETE | `/api/bookings/[id]` | Cancel booking |

---

## Landing Page Sections

### 1. Hero Section
- Full-width background image/video
- Shop name and tagline
- Primary CTA: "Book Now" button
- Secondary CTA: "View Services"

### 2. Services Section
- Grid of service cards
- Service name, description, duration, price
- "Book This Service" button on each card

### 3. Our Barbers Section
- Team member cards with photos
- Name, specialties, short bio

### 4. Gallery Section
- Masonry/grid layout of shop photos
- Lightbox for full-size viewing

### 5. Testimonials Section
- Customer reviews carousel
- Star ratings

### 6. Pricing Section
- Pricing table/cards
- Service packages

### 7. Location & Contact Section
- Embedded Google Map
- Address, phone, email
- Business hours

### 8. Footer
- Quick links
- Social media icons
- Copyright

---

## Booking Flow

```
┌─────────────────┐
│  Select Service │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Select Barber  │
│   (optional)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Select Date   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Select Time Slot│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Enter Details  │
│ (name, email,   │
│  phone, notes)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Review & Confirm│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Confirmation   │
│ (toast + email) │
└─────────────────┘
```

---

## Key Features

### Customer-Facing
- [x] Responsive landing page
- [x] Dark/Light mode support
- [x] Service catalog with pricing
- [x] Online booking system
- [x] Barber selection
- [x] Real-time availability
- [x] Email confirmations
- [x] Booking cancellation

### Admin Dashboard
- [x] Tab-based interface
- [x] View all appointments
- [x] Calendar view
- [x] Manage services (CRUD)
- [x] Manage barbers (CRUD)
- [x] Update appointment status
- [x] Settings management

---

## Environment Variables

```env
# .env.example

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/barber_db"

# better-auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Public
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-key"
```

---

## shadcn/ui Configuration

```json
// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## Dependencies (package.json)

```json
{
  "dependencies": {
    "next": "^16.1.1",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",

    "better-auth": "^1.4.10",
    "@auth/prisma-adapter": "^2.11.1",

    "@prisma/client": "^7.2.0",
    "@prisma/adapter-pg": "^7.2.0",
    "pg": "^8.16.3",

    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-dropdown-menu": "^2.x",
    "@radix-ui/react-select": "^2.x",
    "@radix-ui/react-tabs": "^1.x",

    "react-hook-form": "^7.70.0",
    "@hookform/resolvers": "^5.2.2",
    "zod": "^4.3.5",

    "date-fns": "^4.1.0",
    "react-day-picker": "^9.13.0",

    "lucide-react": "^0.562.0",
    "react-icons": "^5.5.0",

    "sonner": "^2.0.7",
    "next-themes": "^0.4.6",
    "tailwind-merge": "^3.4.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "prisma": "^7.2.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/pg": "^8",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "^16.1.1",
    "tw-animate-css": "^1.4.0"
  }
}
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize shadcn/ui
npx shadcn@latest init

# Push database schema
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed the database (optional)
npx tsx prisma/seed.ts

# Run development server
npm run dev
```

---

## Deployment Checklist

- [ ] Set up PostgreSQL database (Supabase, Neon, Railway)
- [ ] Configure environment variables in Vercel
- [ ] Set up OAuth providers (GitHub, Google)
- [ ] Configure domain and SSL
- [ ] Test booking flow end-to-end
- [ ] Set up monitoring (optional)

---

## Future Enhancements

- Payment integration (Stripe)
- SMS notifications (Twilio)
- Customer accounts & booking history
- Loyalty program
- Staff mobile app
- Multi-location support
- Waitlist functionality
- Review/rating system
