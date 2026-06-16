import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import TermsConditions from "@/components/legal/TermsConditions";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.terms);

export default function TermsPage() {
  return (
    <InnerPageLayout>
      <BreadcrumbJsonLd pageName="Terms & Conditions" pagePath="/terms" />
      <TermsConditions />
    </InnerPageLayout>
  );
}
