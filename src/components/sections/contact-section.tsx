import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-cream px-6 pt-6 pb-16 sm:px-10 sm:pt-8 sm:pb-20 lg:px-16 lg:pt-10 lg:pb-28"
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
        <Card className="mt-4 shadow-[0_20px_50px_-28px_rgba(26,26,22,0.12)] ring-foreground/5 sm:mt-6 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(10)]">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
