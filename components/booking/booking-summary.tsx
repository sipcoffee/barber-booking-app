"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDuration } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, Clock, User, Scissors, Mail, Phone } from "lucide-react";
import type { Service, Barber } from "@/types";

interface BookingSummaryProps {
  service: Service | undefined;
  barber: Barber | undefined;
  date: Date | undefined;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

export function BookingSummary({
  service,
  barber,
  date,
  time,
  customerName,
  customerEmail,
  customerPhone,
  notes,
}: BookingSummaryProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Your Booking</h3>
        <p className="text-sm text-muted-foreground">
          Please review your appointment details before confirming
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service */}
          <div className="flex items-start gap-3">
            <Scissors className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-medium">{service?.name || "No service selected"}</div>
              <div className="text-sm text-muted-foreground">
                {service && (
                  <>
                    {formatDuration(service.duration)} &bull;{" "}
                    {formatPrice(service.price)}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Barber */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-medium">
                {barber?.name || "Any Available Barber"}
              </div>
              <div className="text-sm text-muted-foreground">
                {barber?.specialties?.slice(0, 2).join(", ") || "First available"}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-medium">
                {date ? format(date, "EEEE, MMMM d, yyyy") : "No date selected"}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {time || "No time selected"}
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Contact Information</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {customerName || "Name not provided"}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              {customerEmail || "Email not provided"}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              {customerPhone || "Phone not provided"}
            </div>
          </div>

          {notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-medium">Special Requests</div>
                <p className="text-sm text-muted-foreground">{notes}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="text-xl font-bold text-primary">
              {service ? formatPrice(service.price) : "$0.00"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
