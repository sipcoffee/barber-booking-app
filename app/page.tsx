import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { BarbersSection } from "@/components/landing/barbers-section";
import { GallerySection } from "@/components/landing/gallery-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { LocationSection } from "@/components/landing/location-section";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <BarbersSection />
        <GallerySection />
        <TestimonialsSection />
        <PricingSection />
        <LocationSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
