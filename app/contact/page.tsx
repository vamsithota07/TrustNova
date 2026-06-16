import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import Contact from "@/components/Contact";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.contact);

export default function ContactPage() {
  return (
    <InnerPageLayout>
      <BreadcrumbJsonLd pageName="Contact" pagePath="/contact" />
      <Contact />
    </InnerPageLayout>
  );
}
