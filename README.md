<p align="center">
  <img src="/public/images/logo.png" alt="TRIM Logo" width="80" height="80" />
</p>

<h1 align="center">TRIM</h1>

<p align="center">
  <strong>Modern Barbershop Management & Booking Platform</strong>
</p>

<p align="center">
  A complete SaaS solution for barbershops to manage appointments, services, staff, and customer bookings with a beautiful, conversion-optimized landing page.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#roadmap">Roadmap</a>
</p>

---

## Overview

**TRIM** is an all-in-one barbershop management platform that combines a stunning landing page with a powerful booking system and comprehensive admin dashboard. Built for modern barbershops that want to streamline their operations and provide an exceptional customer experience.

### Why TRIM?

- **Increase Bookings** — Convert visitors into customers with a professionally designed landing page
- **Save Time** — Automate appointment scheduling and reduce no-shows
- **Manage Everything** — Services, staff, appointments, and settings in one place
- **Delight Customers** — Smooth, mobile-first booking experience

---

## Features

### Landing Page

| Feature               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| **Hero Section**      | Eye-catching headline with business stats and dual CTAs         |
| **Services Showcase** | Dynamic service cards with pricing, duration, and quick booking |
| **Team Profiles**     | Barber cards with photos, bios, and specialties                 |
| **Image Gallery**     | Categorized gallery with lightbox modal viewing                 |
| **Testimonials**      | Customer review carousel with ratings                           |
| **Pricing Tiers**     | Three-tier pricing display (Basic, Premium, VIP)                |
| **Location & Hours**  | Business hours, contact info, and map placeholder               |
| **Responsive Design** | Mobile-first design with smooth animations                      |

### Online Booking System

| Feature                      | Description                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| **5-Step Booking Flow**      | Guided wizard: Service → Barber → Date/Time → Details → Confirm |
| **Real-Time Availability**   | Live slot generation based on schedules and existing bookings   |
| **Smart Conflict Detection** | Prevents double-bookings and validates time slots               |
| **Barber Selection**         | Choose a specific barber or "Any Available" option              |
| **Service Pre-Selection**    | Deep linking support for service-specific booking               |
| **Mobile Optimized**         | Seamless booking experience on any device                       |

### Admin Dashboard

| Module           | Capabilities                                                           |
| ---------------- | ---------------------------------------------------------------------- |
| **Overview**     | KPI cards, date range filters, upcoming appointments widget            |
| **Appointments** | Search, filter by status/date, confirm, complete, cancel, mark no-show |
| **Services**     | Full CRUD operations with pricing and duration management              |
| **Barbers**      | Staff management with specialties, bios, and contact info              |
| **Settings**     | Shop info, business hours, slot duration, closed days configuration    |

### Authentication & Security

- Secure authentication powered by Better-Auth
- Session management with token-based security
- Role-based access control (Admin, Staff)
- Protected admin routes

---

## Tech Stack

| Category           | Technology                   |
| ------------------ | ---------------------------- |
| **Framework**      | Next.js 16 (App Router)      |
| **Language**       | TypeScript                   |
| **Styling**        | Tailwind CSS 4               |
| **UI Components**  | shadcn/ui + Radix UI         |
| **Database**       | PostgreSQL with Prisma ORM   |
| **Authentication** | Better-Auth                  |
| **Data Fetching**  | SWR (Stale-While-Revalidate) |
| **Forms**          | React Hook Form + Zod        |
| **Notifications**  | Sonner                       |
| **Icons**          | Lucide React                 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/trim.git
   cd trim
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/trim"
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

5. **Seed the database (optional)**

   ```bash
   pnpm dlx tsx prisma/seed.ts
   ```

6. **Start the development server**

   ```bash
   pnpm dev
   ```

7. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000)

## Roadmap

### Upcoming Features

| Priority  | Feature                     | Description                                   |
| --------- | --------------------------- | --------------------------------------------- |
| 🔴 High   | **Email Notifications**     | Automated booking confirmations and reminders |
| 🔴 High   | **Google Maps Integration** | Interactive map in location section           |
| 🔴 High   | **SMS Reminders**           | Reduce no-shows with text reminders           |
| 🟠 Medium | **Online Payments**         | Stripe/PayPal integration for deposits        |
| 🟠 Medium | **Customer Accounts**       | Login to view/manage bookings                 |
| 🟠 Medium | **Staff Calendar View**     | Visual calendar for barbers                   |
| 🟠 Medium | **Recurring Appointments**  | Schedule regular bookings                     |
| 🟢 Low    | **Analytics Dashboard**     | Revenue, booking trends, popular services     |
| 🟢 Low    | **Multi-Location Support**  | Manage multiple barbershop locations          |
| 🟢 Low    | **Waitlist Management**     | Handle fully-booked time slots                |
| 🟢 Low    | **Loyalty Program**         | Points and rewards for repeat customers       |
| 🟢 Low    | **Review System**           | Collect and display customer reviews          |

### Future Enhancements

- **Mobile App** — Native iOS/Android apps for customers and staff
- **POS Integration** — Connect with point-of-sale systems
- **Inventory Management** — Track product stock and sales
- **Staff Scheduling** — Advanced shift management
- **White-Label Solution** — Custom branding for enterprise clients
- **API Access** — Public API for third-party integrations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for modern barbershops
</p>
