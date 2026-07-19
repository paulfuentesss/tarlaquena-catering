import { values } from "@/lib/content/values";
import { SectionHeading } from "@/components/ui/section-heading";

export function ValuesSection() {
  return (
    <section className="bg-olive px-6 py-14 text-cream sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Our Core Values"
          align="center"
          titleClassName="text-2xl text-mustard sm:text-3xl"
        />
        <div className="mt-10 grid grid-cols-2 gap-8 divide-cream/20 sm:grid-cols-4 sm:divide-x">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center sm:px-4">
              <Icon className="size-7 text-mustard" aria-hidden />
              <p className="font-heading text-base font-bold text-mustard">{title}</p>
              <p className="text-sm text-cream/80">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
