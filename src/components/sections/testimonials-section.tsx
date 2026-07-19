import Image from "next/image";
import { testimonials } from "@/lib/content/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialsSection() {
  return (
    <section className="bg-cream px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="What Our Clients Say" align="center" />
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {/* TODO: swap `avatar` in lib/content/testimonials.ts for a real photo when available. */}
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col gap-4">
              {testimonial.avatar ? (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex size-14 items-center justify-center rounded-full bg-mustard/40 font-heading text-lg font-bold text-olive"
                >
                  {testimonial.name.charAt(0)}
                </div>
              )}
              <p className="text-sm italic text-ink/80">&ldquo;{testimonial.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-bold text-coral">{testimonial.name}</p>
                <p className="text-xs text-ink/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
