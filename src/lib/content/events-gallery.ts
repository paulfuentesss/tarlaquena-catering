// `image` is a placeholder slot — pass a real src to <PlaceholderImage> once event photos are available.
export type EventGalleryItem = {
  slug: string;
  title: string;
  date?: string;
  image?: string;
};

export const eventGalleryItems: EventGalleryItem[] = [
  { slug: "wedding-reception", title: "Wedding Reception" },
  { slug: "corporate-luncheon", title: "Corporate Luncheon" },
  { slug: "birthday-fiesta", title: "Birthday Fiesta" },
  { slug: "family-reunion", title: "Family Reunion" },
  { slug: "holiday-party", title: "Holiday Party" },
  { slug: "christening-celebration", title: "Christening Celebration" },
  { slug: "graduation-party", title: "Graduation Party" },
  { slug: "anniversary-dinner", title: "Anniversary Dinner" },
];
