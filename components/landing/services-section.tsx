import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Clock, DollarSign } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Classic Haircut",
    description:
      "Traditional haircut with precision cutting and styling. Includes wash and blow dry.",
    duration: 30,
    price: 25,
    icon: Scissors,
  },
  {
    id: 2,
    name: "Beard Trim",
    description:
      "Expert beard shaping and trimming to maintain your perfect look.",
    duration: 20,
    price: 15,
    icon: Scissors,
  },
  {
    id: 3,
    name: "Haircut & Beard",
    description:
      "Complete grooming package with haircut and beard trim combo.",
    duration: 45,
    price: 35,
    icon: Scissors,
  },
  {
    id: 4,
    name: "Hot Towel Shave",
    description:
      "Luxurious traditional hot towel shave for the smoothest finish.",
    duration: 30,
    price: 30,
    icon: Scissors,
  },
  {
    id: 5,
    name: "Kids Haircut",
    description:
      "Gentle and patient haircuts for children under 12 years old.",
    duration: 20,
    price: 18,
    icon: Scissors,
  },
  {
    id: 6,
    name: "Premium Package",
    description:
      "Full service including haircut, beard trim, hot towel, and styling.",
    duration: 60,
    price: 55,
    icon: Scissors,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground">
            From classic cuts to modern styles, we offer a full range of premium
            grooming services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${service.price}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/booking?service=${service.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Book Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
