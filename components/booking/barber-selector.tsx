"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Barber } from "@/types";

interface BarberSelectorProps {
  barbers: Barber[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function BarberSelector({
  barbers,
  selectedId,
  onSelect,
}: BarberSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Your Barber</h3>
        <p className="text-sm text-muted-foreground">
          Select a barber or choose &quot;Any Available&quot; for the first
          available slot
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Any Available Option */}
        <Card
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            selectedId === "" && "ring-2 ring-primary"
          )}
          onClick={() => onSelect("")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary">Any</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium">Any Available</h4>
                <p className="text-sm text-muted-foreground">
                  First available barber
                </p>
              </div>
              {selectedId === "" && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Barber Options */}
        {barbers.map((barber) => (
          <Card
            key={barber.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedId === barber.id && "ring-2 ring-primary"
            )}
            onClick={() => onSelect(barber.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={barber.imageUrl || ""} alt={barber.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(barber.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{barber.name}</h4>
                  {barber.specialties.length > 0 && (
                    <p className="text-sm text-muted-foreground truncate">
                      {barber.specialties.slice(0, 2).join(", ")}
                    </p>
                  )}
                </div>
                {selectedId === barber.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
