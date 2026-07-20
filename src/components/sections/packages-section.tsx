import { packages } from "@/lib/content/packages";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function PackagesSection() {
  return (
    <section className="bg-cream px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Our Packages" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.slug} className="overflow-hidden rounded-2xl ring-1 ring-border">
              <PlaceholderImage
                label={`${pkg.name} photo — TODO: replace`}
                aspect="aspect-[4/3]"
                className="rounded-none"
              />
              <div className="relative">
                <span className="absolute -top-4 left-4 rounded-md bg-secondary px-3 py-1.5 text-sm font-bold text-secondary-foreground">
                  {pkg.name}
                </span>
              </div>
              <div className="space-y-2 bg-green px-5 pb-5 pt-8 text-cream">
                <p className="text-sm">
                  <span className="font-semibold text-cream">Price:</span> {pkg.price}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-cream">Pax Range:</span> {pkg.paxRange}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-cream">Details:</span>{" "}
                  {pkg.details.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content -- Base UI's render prop injects the Button's children into this anchor */}
          <Button size="lg" render={<a href="#contact" />}>
            Book This Package
          </Button>
        </div>
      </div>
    </section>
  );
}
