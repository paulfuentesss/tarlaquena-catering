import { Hero } from "@/components/sections/hero";
import { ValuesSection } from "@/components/sections/values-section";
import { OfferingsSection } from "@/components/sections/offerings-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ValuesSection />
      <OfferingsSection variant="preview" />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
