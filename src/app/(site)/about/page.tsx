import type { Metadata } from "next";
import { ViewTransition } from "react";
import { ChefSection } from "@/components/sections/chef-section";
import { CompanySection } from "@/components/sections/company-section";
import { EventsGallerySection } from "@/components/sections/events-gallery-section";

export const metadata: Metadata = {
  title: "Our Story — Tarlaquena Catering",
};

export default function AboutPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "fade" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "fade" }}
    >
      <ChefSection />
      <CompanySection />
      <EventsGallerySection />
    </ViewTransition>
  );
}
