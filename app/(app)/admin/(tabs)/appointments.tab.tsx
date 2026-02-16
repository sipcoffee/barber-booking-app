"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Appointment } from "@/types";

const statusColors: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  CONFIRMED:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  NO_SHOW: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
};

const statusIcons: Record<string, React.ElementType> = {
  PENDING: Clock,
  CONFIRMED: CheckCircle,
  COMPLETED: CheckCircle,
  CANCELLED: XCircle,
  NO_SHOW: XCircle,
};

export function AppointmentsTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      if (date) {
        params.append("date", format(date, "yyyy-MM-dd"));
      }

      const response = await fetch(`/api/bookings?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, date]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleConfirm = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CONFIRMED" }),
      });
      if (!response.ok) throw new Error("Failed to confirm appointment");
      toast.success("Appointment confirmed");
      fetchAppointments();
    } catch (error) {
      console.error("Error confirming appointment:", error);
      toast.error("Failed to confirm appointment");
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to cancel appointment");
      toast.success("Appointment cancelled");
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" }),
      });
      if (!response.ok) throw new Error("Failed to complete appointment");
      toast.success("Appointment marked as completed");
      fetchAppointments();
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error("Failed to complete appointment");
    }
  };

  const handleNoShow = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "NO_SHOW" }),
      });
      if (!response.ok) throw new Error("Failed to mark as no-show");
      toast.success("Appointment marked as no-show");
      fetchAppointments();
    } catch (error) {
      console.error("Error marking no-show:", error);
      toast.error("Failed to mark as no-show");
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return format(date, "h:mm a");
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>
            View and manage all customer appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "All dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
                {date && (
                  <div className="p-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => setDate(undefined)}
                    >
                      Clear date filter
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="NO_SHOW">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Appointments List */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No appointments found
                </div>
              ) : (
                filteredAppointments.map((appointment) => {
                  const StatusIcon = statusIcons[appointment.status];
                  return (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium">
                            {appointment.customerName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.customerEmail} &bull;{" "}
                            {appointment.customerPhone}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
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
                          <div className="text-sm text-muted-foreground">
                            {formatDate(appointment.date)}
                          </div>
                          {appointment.service?.price && (
                            <div className="text-sm font-medium text-primary">
                              ${Number(appointment.service.price).toFixed(2)}
                            </div>
                          )}
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                            statusColors[appointment.status]
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {appointment.status}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {appointment.status === "PENDING" && (
                              <DropdownMenuItem
                                onClick={() => handleConfirm(appointment.id)}
                              >
                                Confirm
                              </DropdownMenuItem>
                            )}
                            {(appointment.status === "PENDING" ||
                              appointment.status === "CONFIRMED") && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleComplete(appointment.id)}
                                >
                                  Mark Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleNoShow(appointment.id)}
                                >
                                  Mark No-Show
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleCancel(appointment.id)}
                                >
                                  Cancel
                                </DropdownMenuItem>
                              </>
                            )}
                            {appointment.status === "COMPLETED" && (
                              <DropdownMenuItem disabled>
                                No actions available
                              </DropdownMenuItem>
                            )}
                            {appointment.status === "CANCELLED" && (
                              <DropdownMenuItem disabled>
                                Appointment cancelled
                              </DropdownMenuItem>
                            )}
                            {appointment.status === "NO_SHOW" && (
                              <DropdownMenuItem disabled>
                                Marked as no-show
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
