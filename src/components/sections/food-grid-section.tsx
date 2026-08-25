import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { foodGridItems } from "@/lib/content/food-grid";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function FoodGridSection() {
  return (
    <section className="bg-[#1a1b16] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Our Offerings" titleClassName="text-cream" />

        <div className="mt-10 flex flex-col gap-14 lg:gap-20">
          {foodGridItems.map((item, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <div
                key={item.slug}
                className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16"
              >
                <PlaceholderImage
                  label={`${item.title} photo`}
                  aspect="aspect-[4/3]"
                  src={item.image}
                  alt={item.title}
                  className={cn(imageFirst ? "lg:order-1" : "lg:order-2")}
                />
                <div
                  className={cn(
                    "flex flex-col gap-3",
                    imageFirst ? "lg:order-2" : "lg:order-1"
                  )}
                >
                  <h3 className="font-heading text-2xl font-extrabold tracking-tight text-cream uppercase sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream/70 sm:text-base">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center lg:mt-20">
          <Link
            href="/menu"
            className="group relative inline-flex items-center gap-2 pb-1 text-lg font-bold tracking-tight text-cream uppercase after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
          >
            Check Our Menu
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
