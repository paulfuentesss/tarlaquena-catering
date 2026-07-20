import { ViewTransition } from "react";
import { Hero } from "@/components/sections/hero";
import { ValuesSection } from "@/components/sections/values-section";
import { OfferingsSection } from "@/components/sections/offerings-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "fade" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "fade" }}
    >
      <Hero />
      <ValuesSection />
      <OfferingsSection variant="preview" />
      <TestimonialsSection />
      <ContactSection />
    </ViewTransition>
  );
}
