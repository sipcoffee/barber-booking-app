"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addDays, format, startOfDay } from "date-fns";
import { CalendarDays, Clock, Loader2 } from "lucide-react";
import type { TimeSlot } from "@/types";

interface DateTimePickerProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  timeSlots: TimeSlot[];
  onDateSelect: (date: Date | undefined) => void;
  onTimeSelect: (time: string) => void;
  loading?: boolean;
}

export function DateTimePicker({
  selectedDate,
  selectedTime,
  timeSlots,
  onDateSelect,
  onTimeSelect,
  loading = false,
}: DateTimePickerProps) {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 30);

  const disabledDays = [
    { before: today },
    { after: maxDate },
    { dayOfWeek: [0] },
  ];

  // Group time slots by morning/afternoon/evening
  const morningSlots = timeSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour < 12;
  });

  const afternoonSlots = timeSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour >= 12 && hour < 17;
  });

  const eveningSlots = timeSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour >= 17;
  });

  const renderTimeSlots = (slots: TimeSlot[], label: string) => {
    if (slots.length === 0) return null;

    return (
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.map((slot) => (
            <Button
              key={slot.time}
              type="button"
              variant={selectedTime === slot.time ? "default" : "outline"}
              size="sm"
              disabled={!slot.available}
              onClick={() => onTimeSelect(slot.time)}
              className={cn(
                "h-10 text-sm font-medium transition-all",
                !slot.available && "opacity-40 cursor-not-allowed line-through",
                selectedTime === slot.time && "ring-2 ring-primary ring-offset-2"
              )}
            >
              {slot.time}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Select Date & Time</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred appointment date and time
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Section */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Pick a Date</span>
          </div>
          <div className="border rounded-lg p-2 bg-card">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              disabled={disabledDays}
              className="rounded-md"
            />
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Pick a Time</span>
          </div>

          <div className="border rounded-lg p-4 bg-card min-h-[280px]">
            {selectedDate ? (
              <div className="space-y-4">
                <div className="pb-3 border-b">
                  <p className="text-sm font-medium">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </p>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Loading available times...
                    </p>
                  </div>
                ) : timeSlots.length > 0 ? (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {renderTimeSlots(morningSlots, "Morning")}
                    {renderTimeSlots(afternoonSlots, "Afternoon")}
                    {renderTimeSlots(eveningSlots, "Evening")}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
                    <Clock className="h-10 w-10 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      No available time slots for this date.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Please try selecting another date.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 gap-2 text-center">
                <CalendarDays className="h-10 w-10 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Please select a date first
                </p>
                <p className="text-xs text-muted-foreground">
                  Available time slots will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedDate && selectedTime && (
        <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Your selected appointment</p>
            <p className="text-sm text-muted-foreground">
              {format(selectedDate, "EEEE, MMMM d")} at {selectedTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
