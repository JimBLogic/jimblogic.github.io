import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://jimblogic.github.io";
const lastModified = new Date("2026-08-21T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/certifications`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/labs/cyberdailylog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/labs/austrian-monitor`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];
}
