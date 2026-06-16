import type { MetadataRoute } from "next";
import { SITE_URL, sitemapPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapPaths.map((path) => ({
    url: path === "" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
  }));
}
