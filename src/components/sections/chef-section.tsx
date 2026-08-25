import { ChevronDown } from "lucide-react";
import { chefBio } from "@/lib/content/about";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function ChefSection() {
  return (
    <section
      id="chef"
      // 68px matches the sticky header's rendered height.
      className="relative flex min-h-[calc(100dvh-68px)] flex-col justify-center overflow-hidden bg-cream px-6 py-16 sm:px-10 lg:px-16"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-radial-[at_bottom_right] from-cream/50 via-terracotta/10 to-transparent"
      />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            {chefBio.eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {chefBio.greeting}
          </h1>
          {chefBio.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm text-ink/70 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
        <PlaceholderImage
          label="Chef portrait photo"
          aspect="aspect-[3/4]"
          className="mx-auto w-full max-w-sm grayscale"
        />
      </div>
      <a
        href="#company"
        aria-label="Scroll to About the Catering Company"
        className="absolute inset-x-0 bottom-8 mx-auto hidden size-10 animate-bounce items-center justify-center text-ink/60 transition-colors hover:text-primary lg:flex"
      >
        <ChevronDown className="size-8" />
      </a>
    </section>
  );
}
