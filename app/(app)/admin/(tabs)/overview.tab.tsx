"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import type { Appointment } from "@/types";

export function OverviewTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodaysAppointments();
  }, []);

  const fetchTodaysAppointments = async () => {
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const response = await fetch(`/api/bookings?date=${today}`);
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const todayCount = appointments.length;
  const pendingCount = appointments.filter(
    (apt) => apt.status === "PENDING"
  ).length;
  const confirmedCount = appointments.filter(
    (apt) => apt.status === "CONFIRMED"
  ).length;
  const completedCount = appointments.filter(
    (apt) => apt.status === "COMPLETED"
  ).length;

  // Get upcoming appointments (not cancelled/no-show)
  const upcomingAppointments = appointments
    .filter((apt) => apt.status === "PENDING" || apt.status === "CONFIRMED")
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )
    .slice(0, 5);

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return format(date, "h:mm a");
  };

  const stats = [
    {
      title: "Today's Appointments",
      value: loading ? "-" : todayCount.toString(),
      description: loading
        ? "Loading..."
        : `${pendingCount} pending confirmation`,
      icon: Calendar,
    },
    {
      title: "Confirmed",
      value: loading ? "-" : confirmedCount.toString(),
      description: loading ? "Loading..." : "Ready for service",
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: loading ? "-" : pendingCount.toString(),
      description: loading ? "Loading..." : "Awaiting confirmation",
      icon: AlertCircle,
    },
    {
      title: "Completed Today",
      value: loading ? "-" : completedCount.toString(),
      description: loading ? "Loading..." : "Finished appointments",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Appointments</CardTitle>
          <CardDescription>
            Upcoming appointments scheduled for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : upcomingAppointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No upcoming appointments for today
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {appointment.customerName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.service?.name} with{" "}
                        {appointment.barber?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">
                        {formatTime(appointment.startTime)}
                      </div>
                      <div
                        className={`text-xs flex items-center gap-1 ${
                          appointment.status === "CONFIRMED"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        <CheckCircle className="h-3 w-3" />
                        {appointment.status.toLowerCase()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
