import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scissors, Calendar } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Scissors className="h-12 w-12 mx-auto opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready for Your Best Look?
          </h2>
          <p className="text-lg opacity-90">
            Don&apos;t wait for a great haircut. Book your appointment today and
            experience the difference of professional grooming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto gap-2"
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
            <Link href="tel:+15551234567">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                Call (555) 123-4567
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
