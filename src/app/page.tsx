import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { ValuesSection } from "@/components/sections/values-section";
import { OfferingsSection } from "@/components/sections/offerings-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ValuesSection />
        <OfferingsSection variant="preview" />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
