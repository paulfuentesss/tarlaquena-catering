import { companyStory } from "@/lib/content/about";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionHeading } from "@/components/ui/section-heading";

export function CompanySection() {
  return (
    <section id="company" className="bg-[#1a1b16] px-6 py-16 text-cream sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <PlaceholderImage
          label="Catering team photo"
          aspect="aspect-[4/3]"
          className="lg:order-1"
        />
        <div className="flex flex-col gap-4 lg:order-2">
          <SectionHeading
            eyebrow={companyStory.eyebrow}
            title={companyStory.greeting}
            titleClassName="text-cream"
          />
          {companyStory.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm text-cream/80 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
