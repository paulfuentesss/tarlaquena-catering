// `image` is a placeholder slot — pass a real src to <PlaceholderImage> once photos are available.
export type Offering = {
  slug: string;
  title: string;
  description: string;
  image?: string;
};

export const offerings: Offering[] = [
  {
    slug: "buffet",
    title: "Buffet",
    description:
      "Indulge in a lavish buffet, a sensory symphony of culinary delights curated by our chefs to elevate your dining experience.",
  },
  {
    slug: "meal-box",
    title: "Meal Box",
    description:
      "Savor convenience with our packed meal boxes — meticulously crafted, portioned, and ready for gourmet enjoyment.",
  },
  {
    slug: "snack-box",
    title: "Snack Box",
    description:
      "A curated assortment of bite-sized treats, perfect for office gatherings, celebrations, or an afternoon pick-me-up.",
  },
  {
    slug: "food-stalls",
    title: "Food Stalls",
    description:
      "Interactive live-station stalls that bring restaurant-quality cooking and presentation directly to your event.",
  },
];
