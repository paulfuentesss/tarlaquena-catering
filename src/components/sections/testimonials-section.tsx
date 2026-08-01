"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/lib/content/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Keep this in sync with the --animate-progress-fill duration in globals.css.
const AUTOPLAY_DELAY_MS = 4000;

export function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onChange = () => {
      setSlideCount(api.scrollSnapList().length);
      setSelectedIndex(api.selectedScrollSnap());
    };

    onChange();

    api.on("select", onChange);
    api.on("reInit", onChange);

    return () => {
      api.off("select", onChange);
      api.off("reInit", onChange);
    };
  }, [api]);

  return (
    <section className="bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="What Our Clients Say" align="center" />

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true, slidesToScroll: "auto" }}
          plugins={[Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: false })]}
          className="mt-10"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="flex h-full flex-col gap-4">
                  <p className="text-sm italic text-ink/80">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-terracotta/40 font-heading text-base font-bold text-green"
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-primary">{testimonial.name}</p>
                      <p className="text-xs text-ink/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-10 flex items-center justify-center gap-6 border-t border-border pt-6">
            <CarouselPrevious className="static translate-y-0 border-primary/20 text-primary hover:bg-primary hover:text-cream" />
            <div className="flex items-center gap-1.5">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === selectedIndex}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-2 overflow-hidden rounded-full bg-primary/20 transition-[width] duration-300",
                    index === selectedIndex ? "w-8 sm:w-10" : "w-2"
                  )}
                >
                  {index === selectedIndex && (
                    <span
                      key={selectedIndex}
                      className="animate-progress-fill block h-full rounded-full bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
            <CarouselNext className="static translate-y-0 border-primary/20 text-primary hover:bg-primary hover:text-cream" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
