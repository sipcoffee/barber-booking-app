export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  imageUrl: string | null;
  isActive: boolean;
}

export interface Barber {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  bio: string | null;
  imageUrl: string | null;
  specialties: string[];
  isActive: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes: string | null;
  barberId: string;
  serviceId: string;
  barber?: Barber;
  service?: Service;
}

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export interface ShopSettings {
  id: string;
  shopName: string;
  address: string;
  phone: string;
  email: string;
  openTime: string;
  closeTime: string;
  slotDuration: number;
  closedDays: number[];
}
