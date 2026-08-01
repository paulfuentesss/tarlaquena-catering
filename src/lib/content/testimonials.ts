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
  // Placeholder — swap for a real client quote when available.
  {
    name: "Daniel Reyes",
    role: "Groom, Reyes-Santos Wedding",
    quote:
      "From tasting to the big day, the team walked us through every option and never once made us feel rushed. Our guests are still asking for the recipe.",
  },
  // Placeholder — swap for a real client quote when available.
  {
    name: "Patricia Lim",
    role: "HR Director of Verdant Holdings",
    quote:
      "We've booked Tarlaquena for three company events now. Consistent quality, punctual setup, and a menu that always has something for every dietary need.",
  },
  // Placeholder — swap for a real client quote when available.
  {
    name: "Carlo Villanueva",
    role: "Host, 60th Birthday Celebration",
    quote:
      "Impeccable timing and presentation. The staff handled a last-minute headcount change without missing a beat, and the food was the highlight of the night.",
  },
];
