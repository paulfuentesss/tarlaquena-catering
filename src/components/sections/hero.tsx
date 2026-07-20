import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function Hero() {
  return (
    <section className="bg-cream px-6 pt-14 pb-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Discover Culinary
          <br />
          Excellence{" "}
          <span className="font-accent text-3xl font-normal italic normal-case text-primary sm:text-4xl lg:text-5xl">
            with Tarlaquena
          </span>
        </h1>

        <div className="relative mt-8">
          <PlaceholderImage
            label="Hero banner — TODO: replace with food photo"
            aspect="aspect-[16/7]"
            className="w-full"
          />
          <Button
            className="absolute bottom-4 right-4"
            render={<Link href="/menu" />}
          >
            Explore Our Offerings
          </Button>
        </div>
      </div>
    </section>
  );
}
