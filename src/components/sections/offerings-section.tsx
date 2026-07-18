import Link from "next/link";
import { offerings } from "@/lib/content/offerings";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

type OfferingsSectionProps = {
  variant?: "preview" | "full";
};

export function OfferingsSection({ variant = "full" }: OfferingsSectionProps) {
  const items = variant === "preview" ? offerings.slice(0, 4) : offerings;

  return (
    <section className="bg-cream px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <SectionHeading title="Our Offerings" />
          {variant === "preview" && (
            <Button variant="secondary" size="sm" render={<Link href="/menu" />}>
              View More
            </Button>
          )}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((offering) => (
            <div key={offering.slug} className="flex flex-col overflow-hidden rounded-2xl">
              <div className="bg-coral px-3 py-2 text-center text-sm font-bold text-white">
                {offering.title}
              </div>
              <PlaceholderImage
                label={`${offering.title} photo — TODO: replace`}
                aspect="aspect-[4/5]"
                className="rounded-none"
              />
              {variant === "full" && (
                <p className="mt-2 text-sm text-ink/70">{offering.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
