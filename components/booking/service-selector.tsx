"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatPrice, formatDuration } from "@/lib/utils";
import { Check, Clock, DollarSign } from "lucide-react";
import type { Service } from "@/types";

interface ServiceSelectorProps {
  services: Service[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ServiceSelector({
  services,
  selectedId,
  onSelect,
}: ServiceSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select a Service</h3>
        <p className="text-sm text-muted-foreground">
          Choose the service you would like to book
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedId === service.id && "ring-2 ring-primary"
            )}
            onClick={() => onSelect(service.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">{service.name}</h4>
                  {service.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDuration(service.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </div>
                {selectedId === service.id && (
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
