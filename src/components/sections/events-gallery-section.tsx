import { eventGalleryItems } from "@/lib/content/events-gallery";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionHeading } from "@/components/ui/section-heading";

export function EventsGallerySection() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-radial-[at_top_right] from-cream/50 via-terracotta/10 to-transparent"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading title="Past Events Gallery" align="center" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {eventGalleryItems.map((item) => (
            <div key={item.slug} className="flex flex-col gap-2">
              <PlaceholderImage
                label={`${item.title} photo`}
                aspect="aspect-square"
                src={item.image}
                alt={item.title}
              />
              <p className="text-center text-sm font-medium text-ink/70">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
