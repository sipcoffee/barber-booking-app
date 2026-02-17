import useSWR, { mutate } from "swr";
import type {
  Appointment,
  AppointmentStatus,
  Barber,
  Service,
  ShopSettings,
  TimeSlot,
} from "@/types";

// Generic fetcher for GET requests
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return res.json();
};

// API mutation helpers
async function postData<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to create");
  }
  return res.json();
}

async function putData<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to update");
  }
  return res.json();
}

async function deleteData(url: string): Promise<void> {
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to delete");
  }
}

// ============ BOOKINGS / APPOINTMENTS ============

interface BookingsParams {
  startDate?: string;
  endDate?: string;
  status?: string;
  date?: string;
  barberId?: string;
}

export function useBookings(params: BookingsParams = {}) {
  const searchParams = new URLSearchParams();
  if (params.startDate) searchParams.set("startDate", params.startDate);
  if (params.endDate) searchParams.set("endDate", params.endDate);
  if (params.status) searchParams.set("status", params.status);
  if (params.date) searchParams.set("date", params.date);
  if (params.barberId) searchParams.set("barberId", params.barberId);

  const queryString = searchParams.toString();
  const url = `/api/bookings${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate: mutateBookings } = useSWR<Appointment[]>(url, fetcher);

  return {
    bookings: data ?? [],
    isLoading,
    isError: error,
    mutate: mutateBookings,
  };
}

export async function createBooking(data: {
  serviceId: string;
  barberId?: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}) {
  const result = await postData<Appointment>("/api/bookings", data);
  mutate((key) => typeof key === "string" && key.startsWith("/api/bookings"));
  return result;
}

export async function updateBookingStatus(id: string, status: AppointmentStatus) {
  const result = await putData<Appointment>(`/api/bookings/${id}`, { status });
  mutate((key) => typeof key === "string" && key.startsWith("/api/bookings"));
  return result;
}

export async function deleteBooking(id: string) {
  await deleteData(`/api/bookings/${id}`);
  mutate((key) => typeof key === "string" && key.startsWith("/api/bookings"));
}

// ============ BARBERS ============

export function useBarbers() {
  const { data, error, isLoading, mutate: mutateBarbers } = useSWR<Barber[]>("/api/barbers", fetcher);

  return {
    barbers: data ?? [],
    isLoading,
    isError: error,
    mutate: mutateBarbers,
  };
}

export async function createBarber(data: Omit<Barber, "id">) {
  const result = await postData<Barber>("/api/barbers", data);
  mutate("/api/barbers");
  return result;
}

export async function updateBarber(id: string, data: Partial<Barber>) {
  const result = await putData<Barber>(`/api/barbers/${id}`, data);
  mutate("/api/barbers");
  return result;
}

export async function deleteBarber(id: string) {
  await deleteData(`/api/barbers/${id}`);
  mutate("/api/barbers");
}

// ============ SERVICES ============

export function useServices() {
  const { data, error, isLoading, mutate: mutateServices } = useSWR<Service[]>("/api/services", fetcher);

  return {
    services: data ?? [],
    isLoading,
    isError: error,
    mutate: mutateServices,
  };
}

export async function createService(data: Omit<Service, "id">) {
  const result = await postData<Service>("/api/services", data);
  mutate("/api/services");
  return result;
}

export async function updateService(id: string, data: Partial<Service>) {
  const result = await putData<Service>(`/api/services/${id}`, data);
  mutate("/api/services");
  return result;
}

export async function deleteService(id: string) {
  await deleteData(`/api/services/${id}`);
  mutate("/api/services");
}

// ============ SHOP SETTINGS ============

export function useShopSettings() {
  const { data, error, isLoading, mutate: mutateSettings } = useSWR<ShopSettings>(
    "/api/shop-settings",
    fetcher
  );

  return {
    settings: data,
    isLoading,
    isError: error,
    mutate: mutateSettings,
  };
}

export async function updateShopSettings(data: Partial<ShopSettings>) {
  const result = await putData<ShopSettings>("/api/shop-settings", data);
  mutate("/api/shop-settings");
  return result;
}

// ============ AVAILABLE SLOTS ============

interface AvailableSlotsParams {
  date: string;
  duration: number;
  barberId?: string;
}

interface AvailableSlotsResponse {
  slots: TimeSlot[];
  message?: string;
}

export function useAvailableSlots(params: AvailableSlotsParams | null) {
  const url = params
    ? `/api/available-slots?date=${params.date}&duration=${params.duration}${params.barberId ? `&barberId=${params.barberId}` : ""}`
    : null;

  const { data, error, isLoading } = useSWR<AvailableSlotsResponse>(url, fetcher);

  return {
    slots: data?.slots ?? [],
    isLoading,
    isError: error,
  };
}
