"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import type { ShopSettings } from "@/types";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function LocationSection() {
  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/shop-settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching shop settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // Generate business hours display
  const getBusinessHours = () => {
    if (!settings) return [];

    const closedDays = new Set(settings.closedDays);
    const openTime = formatTime(settings.openTime);
    const closeTime = formatTime(settings.closeTime);

    // Group consecutive days with same hours
    const weekdays = [1, 2, 3, 4, 5]; // Mon-Fri
    const saturday = 6;
    const sunday = 0;

    const hours: { days: string; hours: string; closed?: boolean }[] = [];

    // Check weekdays
    const openWeekdays = weekdays.filter((d) => !closedDays.has(d));
    if (openWeekdays.length === 5) {
      hours.push({ days: "Monday - Friday", hours: `${openTime} - ${closeTime}` });
    } else if (openWeekdays.length > 0) {
      hours.push({
        days: openWeekdays.map((d) => DAYS[d]).join(", "),
        hours: `${openTime} - ${closeTime}`,
      });
    }

    // Saturday
    if (!closedDays.has(saturday)) {
      hours.push({ days: "Saturday", hours: `${openTime} - ${closeTime}` });
    } else {
      hours.push({ days: "Saturday", hours: "Closed", closed: true });
    }

    // Sunday
    if (!closedDays.has(sunday)) {
      hours.push({ days: "Sunday", hours: `${openTime} - ${closeTime}` });
    } else {
      hours.push({ days: "Sunday", hours: "Closed", closed: true });
    }

    return hours;
  };

  if (loading) {
    return (
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </section>
    );
  }

  const businessHours = getBusinessHours();

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Us</h2>
          <p className="text-muted-foreground">
            Visit our shop or get in touch. We&apos;re conveniently located in
            the heart of downtown.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Map Placeholder */}
          <div className="aspect-video lg:aspect-auto lg:h-full min-h-[300px] rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-primary mx-auto" />
              <p className="text-muted-foreground">Map will be displayed here</p>
              <p className="text-sm text-muted-foreground">
                Google Maps integration
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {settings?.address || "123 Main Street\nDowntown District\nCity, State 12345"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  {businessHours.map((item) => (
                    <div key={item.days} className="flex justify-between">
                      <span>{item.days}</span>
                      <span className={item.closed ? "text-destructive" : ""}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Phone className="h-4 w-4 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`tel:${settings?.phone?.replace(/[^0-9+]/g, "") || "+15551234567"}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {settings?.phone || "(555) 123-4567"}
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`mailto:${settings?.email || "info@barbershop.com"}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {settings?.email || "info@barbershop.com"}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
