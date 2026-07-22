"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/content/faqs";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-terracotta/5 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cream to-transparent sm:h-20 lg:h-28"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream to-transparent sm:h-20 lg:h-28"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-24">
          <SectionHeading title="Frequently Asked Questions" titleClassName="normal-case" />
          <PlaceholderImage
            label="Chef illustration"
            aspect="aspect-square"
            className="mt-8 hidden max-w-sm lg:flex"
          />
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <div
                key={faq.question}
                className={cn(
                  "rounded-2xl bg-card px-6 py-5 ring-1 transition-colors duration-300",
                  isOpen ? "ring-2 ring-primary/30" : "ring-1 ring-green/10"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-heading text-base font-bold text-ink sm:text-lg">
                    {faq.question}
                  </span>
                  <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
                    <Plus
                      className={cn(
                        "absolute size-5 text-primary transition-all duration-300 ease-in-out",
                        isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                      )}
                      aria-hidden
                    />
                    <Minus
                      className={cn(
                        "absolute size-5 text-primary transition-all duration-300 ease-in-out",
                        isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                      )}
                      aria-hidden
                    />
                  </span>
                </button>
                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        "mt-3 text-sm text-ink/70 transition-opacity duration-300 sm:text-base",
                        isOpen ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
