import { Suspense } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { BookingForm } from "@/components/booking/booking-form";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Book Appointment - TRIM",
  description: "Book your appointment online at TRIM",
};

function BookingFormFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Book Your Appointment
              </h1>
              <p className="text-muted-foreground">
                Select your service, choose your barber, and pick a time that
                works for you
              </p>
            </div>

            {/* Booking Form */}
            <Suspense fallback={<BookingFormFallback />}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
