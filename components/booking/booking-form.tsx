"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceSelector } from "./service-selector";
import { BarberSelector } from "./barber-selector";
import { DateTimePicker } from "./date-time-picker";
import { CustomerInfoForm } from "./customer-info-form";
import { BookingSummary } from "./booking-summary";
import {
  bookingFormSchema,
  type BookingFormValues,
} from "@/lib/validations/booking";
import type { Service, Barber, TimeSlot } from "@/types";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data - replace with API calls
const mockServices: Service[] = [
  {
    id: "1",
    name: "Classic Haircut",
    description: "Traditional haircut with precision cutting and styling",
    duration: 30,
    price: 25,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "2",
    name: "Beard Trim",
    description: "Expert beard shaping and trimming",
    duration: 20,
    price: 15,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "3",
    name: "Haircut & Beard",
    description: "Complete grooming package with haircut and beard trim combo",
    duration: 45,
    price: 35,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "4",
    name: "Hot Towel Shave",
    description: "Luxurious traditional hot towel shave",
    duration: 30,
    price: 30,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "5",
    name: "Kids Haircut",
    description: "Gentle haircuts for children under 12",
    duration: 20,
    price: 18,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "6",
    name: "Premium Package",
    description: "Full service including haircut, beard, hot towel, and styling",
    duration: 60,
    price: 55,
    imageUrl: null,
    isActive: true,
  },
];

const mockBarbers: Barber[] = [
  {
    id: "1",
    name: "James Wilson",
    email: null,
    phone: null,
    bio: "15 years of experience",
    imageUrl: null,
    specialties: ["Classic Cuts", "Hot Towel Shave"],
    isActive: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: null,
    phone: null,
    bio: "Expert in modern fades",
    imageUrl: null,
    specialties: ["Fades", "Hair Design"],
    isActive: true,
  },
  {
    id: "3",
    name: "David Rodriguez",
    email: null,
    phone: null,
    bio: "Precision cuts specialist",
    imageUrl: null,
    specialties: ["Precision Cuts", "Kids Haircuts"],
    isActive: true,
  },
];

const mockTimeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: false },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: false },
  { time: "4:30 PM", available: true },
  { time: "5:00 PM", available: true },
  { time: "5:30 PM", available: true },
];

const steps = [
  { id: 1, name: "Service", description: "Choose your service" },
  { id: 2, name: "Barber", description: "Select your barber" },
  { id: 3, name: "Date & Time", description: "Pick a slot" },
  { id: 4, name: "Details", description: "Your information" },
  { id: 5, name: "Confirm", description: "Review booking" },
];

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceId: "",
      barberId: "",
      date: undefined,
      timeSlot: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      notes: "",
    },
  });

  const watchedValues = form.watch();
  const selectedService = mockServices.find(
    (s) => s.id === watchedValues.serviceId
  );
  const selectedBarber = mockBarbers.find(
    (b) => b.id === watchedValues.barberId
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!watchedValues.serviceId;
      case 2:
        return true; // Barber is optional
      case 3:
        return !!watchedValues.date && !!watchedValues.timeSlot;
      case 4:
        return (
          !!watchedValues.customerName &&
          !!watchedValues.customerEmail &&
          !!watchedValues.customerPhone
        );
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Booking data:", data);
      setIsComplete(true);
      toast.success("Appointment booked successfully!", {
        description: "Check your email for confirmation details.",
      });
    } catch (error) {
      toast.error("Failed to book appointment", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
              Your appointment has been successfully booked. We&apos;ve sent a
              confirmation email to {watchedValues.customerEmail}.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={() => window.location.reload()}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Another
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={cn(
                  "flex items-center",
                  index !== steps.length - 1 && "flex-1"
                )}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                      currentStep > step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium">{step.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-4",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="text-sm text-muted-foreground mb-2">
          Step {currentStep} of {steps.length}
        </div>
        <div className="flex gap-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "h-1 flex-1 rounded-full",
                currentStep >= step.id ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        <div className="mt-2 font-medium">{steps[currentStep - 1].name}</div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardContent className="p-6">
              {/* Step Content */}
              {currentStep === 1 && (
                <ServiceSelector
                  services={mockServices}
                  selectedId={watchedValues.serviceId}
                  onSelect={(id) => form.setValue("serviceId", id)}
                />
              )}

              {currentStep === 2 && (
                <BarberSelector
                  barbers={mockBarbers}
                  selectedId={watchedValues.barberId || ""}
                  onSelect={(id) => form.setValue("barberId", id)}
                />
              )}

              {currentStep === 3 && (
                <DateTimePicker
                  selectedDate={watchedValues.date}
                  selectedTime={watchedValues.timeSlot}
                  timeSlots={mockTimeSlots}
                  onDateSelect={(date) => form.setValue("date", date as Date)}
                  onTimeSelect={(time) => form.setValue("timeSlot", time)}
                />
              )}

              {currentStep === 4 && <CustomerInfoForm form={form} />}

              {currentStep === 5 && (
                <BookingSummary
                  service={selectedService}
                  barber={selectedBarber}
                  date={watchedValues.date}
                  time={watchedValues.timeSlot}
                  customerName={watchedValues.customerName}
                  customerEmail={watchedValues.customerEmail}
                  customerPhone={watchedValues.customerPhone}
                  notes={watchedValues.notes || ""}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed()}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
