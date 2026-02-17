"use client";

import { useState, useMemo } from "react";
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
import { format, addDays, addMonths } from "date-fns";
import { useBookings } from "@/lib/swr";

type DateFilter = "today" | "3days" | "7days" | "month";

const filterOptions: { value: DateFilter; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "3days", label: "3 Days" },
  { value: "7days", label: "7 Days" },
  { value: "month", label: "Month" },
];

function getDateRange(filter: DateFilter) {
  const today = new Date();
  const startDate = format(today, "yyyy-MM-dd");
  let endDate: string;

  switch (filter) {
    case "today":
      endDate = startDate;
      break;
    case "3days":
      endDate = format(addDays(today, 2), "yyyy-MM-dd");
      break;
    case "7days":
      endDate = format(addDays(today, 6), "yyyy-MM-dd");
      break;
    case "month":
      endDate = format(addMonths(today, 1), "yyyy-MM-dd");
      break;
  }

  return { startDate, endDate };
}

export function OverviewTab() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");

  const { startDate, endDate } = getDateRange(dateFilter);
  const { bookings, isLoading } = useBookings({ startDate, endDate });

  const { pendingCount, confirmedCount, completedCount, upcomingCount } = useMemo(() => {
    const pending = bookings.filter((apt) => apt.status === "PENDING").length;
    const confirmed = bookings.filter((apt) => apt.status === "CONFIRMED").length;
    const completed = bookings.filter((apt) => apt.status === "COMPLETED").length;
    return {
      pendingCount: pending,
      confirmedCount: confirmed,
      completedCount: completed,
      upcomingCount: pending + confirmed,
    };
  }, [bookings]);

  const upcomingAppointments = useMemo(() => {
    return bookings
      .filter((apt) => apt.status === "PENDING" || apt.status === "CONFIRMED")
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .slice(0, 5);
  }, [bookings]);

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return format(date, "h:mm a");
  };

  const getFilterLabel = () => {
    switch (dateFilter) {
      case "today":
        return "Today";
      case "3days":
        return "Next 3 Days";
      case "7days":
        return "Next 7 Days";
      case "month":
        return "This Month";
    }
  };

  const stats = [
    {
      title: "Upcoming Appointments",
      value: isLoading ? "-" : upcomingCount.toString(),
      description: isLoading
        ? "Loading..."
        : `${pendingCount} pending confirmation`,
      icon: Calendar,
    },
    {
      title: "Confirmed",
      value: isLoading ? "-" : confirmedCount.toString(),
      description: isLoading ? "Loading..." : "Ready for service",
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: isLoading ? "-" : pendingCount.toString(),
      description: isLoading ? "Loading..." : "Awaiting confirmation",
      icon: AlertCircle,
    },
    {
      title: "Completed",
      value: isLoading ? "-" : completedCount.toString(),
      description: isLoading ? "Loading..." : "Finished appointments",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div className="flex items-center gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setDateFilter(option.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              dateFilter === option.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>
            {dateFilter === "today"
              ? "Appointments scheduled for today"
              : `Appointments for the ${getFilterLabel().toLowerCase()}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : upcomingAppointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No upcoming appointments{" "}
              {dateFilter === "today"
                ? "for today"
                : `for the ${getFilterLabel().toLowerCase()}`}
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
                        {dateFilter !== "today" && (
                          <span className="text-muted-foreground mr-2">
                            {format(new Date(appointment.startTime), "MMM d")}
                          </span>
                        )}
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
