import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-terracotta/7 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent"
      />
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading eyebrow="Get in touch" title="Send an Inquiry" align="center" />
        <Card className="mt-10 shadow-[0_30px_60px_-30px_rgba(26,26,22,0.25)] ring-foreground/5 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(10)]">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
