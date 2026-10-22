import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import ServicesList from "@/components/services/ServicesList";
import ServicesGuide from "@/components/services/ServicesGuide";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.services);

export default function ServicesPage() {
  return (
    <InnerPageLayout>
      <BreadcrumbJsonLd pageName="Services" pagePath="/services" />
      <ServicesList />
      <ServicesGuide />
    </InnerPageLayout>
  );
}
