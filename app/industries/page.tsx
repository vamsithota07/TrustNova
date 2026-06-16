import type { Metadata } from "next";
import IndustriesShowcase from "@/components/industries/IndustriesShowcase";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.industries);

export default function IndustriesPage() {
  return (
    <main className="relative w-full overflow-x-clip bg-brand-black">
      <BreadcrumbJsonLd pageName="Industries" pagePath="/industries" />
      <IndustriesShowcase />
    </main>
  );
}
