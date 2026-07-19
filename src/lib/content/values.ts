import type { LucideIcon } from "lucide-react";
import { Sparkles, Lightbulb, ShieldCheck, Leaf } from "lucide-react";

export type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    icon: Sparkles,
    title: "Excellence",
    description: "Unforgettable culinary experiences",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Dynamic, fresh, exciting flavors",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description: "Source to plate culinary delights",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Eco-friendly dining practices",
  },
];
