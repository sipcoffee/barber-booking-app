"use client";

import { useState } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const appointments = [
  {
    id: "1",
    customer: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    service: "Classic Haircut",
    barber: "James Wilson",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "CONFIRMED",
    price: 25,
  },
  {
    id: "2",
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "(555) 234-5678",
    service: "Beard Trim",
    barber: "Michael Chen",
    date: "2024-01-15",
    time: "10:30 AM",
    status: "PENDING",
    price: 15,
  },
  {
    id: "3",
    customer: "David Lee",
    email: "david@example.com",
    phone: "(555) 345-6789",
    service: "Haircut & Beard",
    barber: "David Rodriguez",
    date: "2024-01-15",
    time: "11:00 AM",
    status: "COMPLETED",
    price: 35,
  },
  {
    id: "4",
    customer: "Chris Brown",
    email: "chris@example.com",
    phone: "(555) 456-7890",
    service: "Hot Towel Shave",
    barber: "James Wilson",
    date: "2024-01-15",
    time: "11:30 AM",
    status: "CANCELLED",
    price: 30,
  },
  {
    id: "5",
    customer: "Tom Wilson",
    email: "tom@example.com",
    phone: "(555) 567-8901",
    service: "Premium Package",
    barber: "Alex Thompson",
    date: "2024-01-16",
    time: "9:00 AM",
    status: "CONFIRMED",
    price: 55,
  },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  CONFIRMED: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus =
      statusFilter === "all" || apt.status === statusFilter;
    const matchesSearch =
      apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
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
                        <div className="font-medium">{appointment.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.email} &bull; {appointment.phone}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {appointment.service} with {appointment.barber}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{appointment.time}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.date}
                        </div>
                        <div className="text-sm font-medium text-primary">
                          ${appointment.price}
                        </div>
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Confirm</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
