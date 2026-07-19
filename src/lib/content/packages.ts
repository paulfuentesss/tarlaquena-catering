// `image` is a placeholder slot — pass a real src to <PlaceholderImage> once photos are available.
export type PackageTier = {
  slug: string;
  name: string;
  price: string;
  paxRange: string;
  details: string[];
  image?: string;
};

export const packages: PackageTier[] = [
  {
    slug: "signature-feast",
    name: "Signature Feast",
    price: "$39.99 per person",
    paxRange: "20-50 guests",
    details: ["2 appetizers", "3 main courses", "3 condiments", "3 desserts"],
  },
  {
    slug: "gourmet-vaganza",
    name: "Gourmet Vaganza",
    price: "$49.99 per person",
    paxRange: "30-80 guests",
    details: ["3 appetizers", "4 main courses", "3 condiments", "3 desserts"],
  },
  {
    slug: "premium-culinary",
    name: "Premium Culinary",
    price: "$69.99 per person",
    paxRange: "50-100 guests",
    details: ["3 appetizers", "5 main courses", "4 condiments", "3 desserts"],
  },
];
