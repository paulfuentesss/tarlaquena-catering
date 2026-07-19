// `avatar` is a placeholder slot — pass a real src to <PlaceholderImage> once photos are available.
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Jane Morgana",
    role: "CEO of Latuconsina Company",
    quote:
      "Tarlaquena Catering has a diverse menu, exquisite flavors, and impeccable service that exceeded our expectations for our special engagement day.",
  },
  {
    name: "Samuel Winston",
    role: "Lead Finance of Lokalvenue Co.",
    quote:
      "Choosing Tarlaquena for our wedding buffet was a fantastic decision. The variety of dishes and attention to detail made our celebration truly special.",
  },
  {
    name: "Mia Albertan",
    role: "Creative Director of Mangan Inc.",
    quote:
      "The snack box from Tarlaquena was a hit at our office. A perfect assortment of treats that satisfied everyone's cravings — delightful and convenient.",
  },
];
