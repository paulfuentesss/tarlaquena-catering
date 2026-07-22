// `image` is a placeholder slot — pass a real src to <PlaceholderImage> once photos are available.
export type FoodGridItem = {
  slug: string;
  title: string;
  description: string;
  image?: string;
};

export const foodGridItems: FoodGridItem[] = [
  {
    slug: "signature-buffet",
    title: "Signature Buffet Spread",
    description:
      "A lavish spread of chef-curated dishes, plated and refreshed throughout your event for a seamless guest experience.",
  },
  {
    slug: "chefs-tasting-boxes",
    title: "Chef's Tasting Boxes",
    description:
      "Individually portioned meal boxes that bring restaurant-quality plating to every guest, no matter the venue.",
  },
  {
    slug: "live-food-stations",
    title: "Live Food Stations",
    description:
      "Interactive cooking stations that turn your event into an experience, with dishes prepared fresh in front of your guests.",
  },
];
