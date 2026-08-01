import type { MetadataRoute } from "next";

const baseUrl = "https://tarlaquena-catering-three.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/menu`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
