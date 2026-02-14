"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Today's Appointments",
    value: "12",
    description: "3 pending confirmation",
    icon: Calendar,
    trend: "+2 from yesterday",
  },
  {
    title: "Revenue This Week",
    value: "$2,450",
    description: "From 68 appointments",
    icon: DollarSign,
    trend: "+12% from last week",
  },
  {
    title: "Total Clients",
    value: "1,234",
    description: "48 new this month",
    icon: Users,
    trend: "+8% growth",
  },
  {
    title: "Completion Rate",
    value: "96%",
    description: "4% no-show rate",
    icon: TrendingUp,
    trend: "Above target",
  },
];

const upcomingAppointments = [
  {
    id: 1,
    customer: "John Smith",
    service: "Classic Haircut",
    barber: "James Wilson",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Mike Johnson",
    service: "Beard Trim",
    barber: "Michael Chen",
    time: "10:30 AM",
    status: "pending",
  },
  {
    id: 3,
    customer: "David Lee",
    service: "Haircut & Beard",
    barber: "David Rodriguez",
    time: "11:00 AM",
    status: "confirmed",
  },
  {
    id: 4,
    customer: "Chris Brown",
    service: "Hot Towel Shave",
    barber: "James Wilson",
    time: "11:30 AM",
    status: "confirmed",
  },
  {
    id: 5,
    customer: "Tom Wilson",
    service: "Premium Package",
    barber: "Alex Thompson",
    time: "12:00 PM",
    status: "pending",
  },
];

export function OverviewTab() {
  return (
    <div className="space-y-6">
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
              <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
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
                    <div className="font-medium">{appointment.customer}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.service} with {appointment.barber}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{appointment.time}</div>
                    <div
                      className={`text-xs flex items-center gap-1 ${
                        appointment.status === "confirmed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      <CheckCircle className="h-3 w-3" />
                      {appointment.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
