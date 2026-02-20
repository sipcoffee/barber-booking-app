import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scissors, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[url('/images/hero/pattern.svg')] opacity-5" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span>Rated 5.0 by our customers</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Premium
            <span className="text-primary"> Grooming</span>
            <br />
            Experience
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Step into TRIM and experience the art of traditional
            grooming combined with modern techniques. Look sharp, feel confident.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Scissors className="h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
            <Link href="#services">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Services
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                10+
              </div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                5000+
              </div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                15+
              </div>
              <div className="text-sm text-muted-foreground">
                Expert Barbers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
