import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import SectionSeparator from "@/components/SectionSeparator";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.about);

export default function AboutPage() {
  return (
    <InnerPageLayout>
      <BreadcrumbJsonLd pageName="About" pagePath="/about" />
      <About />
      <SectionSeparator />
      <WhyUs />
    </InnerPageLayout>
  );
}
