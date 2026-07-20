import type { Metadata } from "next";
import { OfferingsSection } from "@/components/sections/offerings-section";
import { PackagesSection } from "@/components/sections/packages-section";

export const metadata: Metadata = {
  title: "Menu — Tarlaquena Catering",
};

export default function MenuPage() {
  return (
    <>
      <div className="bg-cream px-6 pt-14 pb-4 text-center sm:px-10 lg:px-16">
        <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
          Our Menu
        </h1>
      </div>
      <OfferingsSection variant="full" />
      <PackagesSection />
    </>
  );
}
