"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Robert Johnson",
    role: "Regular Client",
    content:
      "Best barber shop in town! James always knows exactly what I want. The hot towel shave is an experience every man should have.",
    rating: 5,
    image: "/images/testimonials/robert.jpg",
    initials: "RJ",
  },
  {
    id: 2,
    name: "Marcus Lee",
    role: "First-time Client",
    content:
      "Was recommended by a friend and now I understand why. Professional service, great atmosphere, and an amazing haircut.",
    rating: 5,
    image: "/images/testimonials/marcus.jpg",
    initials: "ML",
  },
  {
    id: 3,
    name: "Thomas Wright",
    role: "Regular Client",
    content:
      "I've been coming here for 3 years now. The consistency and quality of service is unmatched. Highly recommend!",
    rating: 5,
    image: "/images/testimonials/thomas.jpg",
    initials: "TW",
  },
  {
    id: 4,
    name: "Daniel Park",
    role: "Regular Client",
    content:
      "Finally found a barber who understands Asian hair. Michael is incredibly skilled and always delivers perfect results.",
    rating: 5,
    image: "/images/testimonials/daniel.jpg",
    initials: "DP",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground">
            Don&apos;t just take our word for it. Here&apos;s what our valued
            customers have to say about their experience.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <Card className="relative">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-primary/20 absolute top-6 left-6" />

              <div className="relative z-10 text-center space-y-6">
                {/* Rating */}
                <div className="flex justify-center gap-1">
                  {Array.from({ length: testimonials[currentIndex].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-500 fill-yellow-500"
                      />
                    )
                  )}
                </div>

                {/* Content */}
                <p className="text-lg md:text-xl text-muted-foreground italic">
                  &quot;{testimonials[currentIndex].content}&quot;
                </p>

                {/* Author */}
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonials[currentIndex].initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-primary/20"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextTestimonial}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
