"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useBarbers } from "@/lib/swr";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function BarbersSection() {
  const { barbers, isLoading } = useBarbers();

  return (
    <section id="barbers" className="py-20 px-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground">
            Our skilled barbers bring years of experience and passion for their
            craft. Get to know the experts who will take care of your grooming
            needs.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : barbers.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No barbers available at the moment.
          </div>
        ) : (
          /* Barbers Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {barbers.map((barber) => (
              <Card key={barber.id} className="text-center">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage
                      src={barber.imageUrl || ""}
                      alt={barber.name}
                    />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {getInitials(barber.name)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{barber.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    Barber
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {barber.bio && (
                    <p className="text-sm text-muted-foreground">
                      {barber.bio}
                    </p>
                  )}
                  {barber.specialties.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {barber.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="text-xs px-2 py-1 bg-secondary rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
