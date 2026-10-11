import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { publishedPolicies } from "@/lib/policies";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "weekly") => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1),
    page("/shop", 0.9),
    ...products.map((p) => page(`/product/${p.slug}`, 0.8)),
    page("/lookbook", 0.5, "monthly"),
    page("/bulk-orders", 0.5, "monthly"),
    ...publishedPolicies.map((p) => page(`/policies/${p.slug}`, 0.3, "monthly")),
  ];
}
