import { packages } from "@/lib/content/packages";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionHeading } from "@/components/ui/section-heading";

export function PackagesSection() {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Our Packages" />

        {/* Mobile: card list, thumbnail left / details right. */}
        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-md shadow-black/14 ring-1 ring-border"
            >
              <PlaceholderImage
                label={`${pkg.name} photo`}
                aspect="aspect-square"
                src={pkg.image}
                alt={pkg.name}
                className="size-28 shrink-0 rounded-xl"
              />
              <div className="min-w-0 flex-1">
                <p className="font-heading text-base font-bold text-ink">{pkg.name}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-ink/60">
                  {pkg.paxRange} · {pkg.details.join(", ")}
                </p>
                <p className="mt-1 text-sm font-bold text-secondary">{pkg.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet/desktop: stacked cards. */}
        <div className="mt-10 hidden gap-6 sm:grid sm:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.slug} className="overflow-hidden rounded-2xl shadow-md shadow-black/14 ring-1 ring-border">
              <PlaceholderImage
                label={`${pkg.name} photo`}
                aspect="aspect-[4/3]"
                src={pkg.image}
                alt={pkg.name}
                className="rounded-none"
              />
              <div className="relative">
                <span className="absolute -top-4 left-4 rounded-md bg-green px-3 py-1.5 text-sm font-bold text-primary-foreground">
                  {pkg.name}
                </span>
              </div>
              <div className="space-y-2 bg-card px-5 pb-5 pt-8">
                <p className="text-sm text-ink">
                  <span className="font-semibold text-ink">Price:</span> {pkg.price}
                </p>
                <p className="text-sm text-ink">
                  <span className="font-semibold text-ink">Pax Range:</span> {pkg.paxRange}
                </p>
                <p className="text-sm text-ink">
                  <span className="font-semibold text-ink">Details:</span>{" "}
                  {pkg.details.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
