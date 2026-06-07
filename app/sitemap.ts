import type { MetadataRoute } from "next";
import { SITE_URL, sitemapRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
