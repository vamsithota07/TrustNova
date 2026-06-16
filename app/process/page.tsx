import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import Process from "@/components/Process";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.process);

export default function ProcessPage() {
  return (
    <InnerPageLayout>
      <BreadcrumbJsonLd pageName="Process" pagePath="/process" />
      <Process />
    </InnerPageLayout>
  );
}
