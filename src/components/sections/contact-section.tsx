import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section id="contact" className="bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Get in touch" title="Send an Inquiry" align="center" />
        <Card className="mt-10 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(10)]">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
