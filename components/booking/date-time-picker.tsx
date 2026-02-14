"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addDays, format, isBefore, startOfDay } from "date-fns";
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
  const maxDate = addDays(today, 30); // Allow booking up to 30 days ahead

  const disabledDays = [
    { before: today },
    { after: maxDate },
    { dayOfWeek: [0] }, // Disable Sundays
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Date & Time</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred appointment date and time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              disabled={disabledDays}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardContent className="p-4">
            {selectedDate ? (
              <div className="space-y-4">
                <div className="text-sm font-medium">
                  Available times for {format(selectedDate, "EEEE, MMMM d")}
                </div>
                {loading ? (
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-10 bg-muted animate-pulse rounded-md"
                      />
                    ))}
                  </div>
                ) : timeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={
                          selectedTime === slot.time ? "default" : "outline"
                        }
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => onTimeSelect(slot.time)}
                        className={cn(
                          !slot.available && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No available time slots for this date
                  </p>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p className="text-sm">Please select a date first</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
