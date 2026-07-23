import type { Metadata } from "next";
import { ViewTransition } from "react";
import { MenuBanner } from "@/components/sections/menu-banner";
import { OfferingsSection } from "@/components/sections/offerings-section";
import { PackagesSection } from "@/components/sections/packages-section";

export const metadata: Metadata = {
  title: "Menu — Tarlaquena Catering",
};

export default function MenuPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "fade" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "fade" }}
    >
      <MenuBanner />
      <OfferingsSection variant="full" />
      <PackagesSection />
    </ViewTransition>
  );
}
