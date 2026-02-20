"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./(tabs)/overview.tab";
import { AppointmentsTab } from "./(tabs)/appointments.tab";
import { ServicesTab } from "./(tabs)/services.tab";
import { BarbersTab } from "./(tabs)/barbers.tab";
import { SettingsTab } from "./(tabs)/settings.tab";
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Users,
  Settings,
  Loader2,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "services", label: "Services", icon: Scissors },
  { id: "barbers", label: "Barbers", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your TRIM appointments, services, and team
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your TRIM appointments, services, and team
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentsTab />
        </TabsContent>

        <TabsContent value="services">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="barbers">
          <BarbersTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
