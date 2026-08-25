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
    <section className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <SectionHeading title="Our Offerings" />
          {variant === "preview" && (
            <Button variant="secondary" size="sm" render={<Link href="/menu" />}>
              View More
            </Button>
          )}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map((offering) => (
            <div
              key={offering.slug}
              className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-md shadow-black/14"
            >
              <PlaceholderImage
                label={`${offering.title} photo`}
                aspect="aspect-[4/3]"
                src={offering.image}
                alt={offering.title}
                className="rounded-none"
              />
              <div className="flex flex-col gap-1 px-4 py-4">
                <p className="font-heading text-base font-bold text-ink">{offering.title}</p>
                {variant === "full" && (
                  <p className="text-sm text-ink/60">{offering.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
