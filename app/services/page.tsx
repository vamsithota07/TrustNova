import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import Services from "@/components/Services";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services | TrustNova | Brand & Creative Studio",
  description:
    "Logo design, brand identity packages, website design & development, launch support, and ongoing maintenance for Indian businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <InnerPageLayout>
      <Services />
    </InnerPageLayout>
  );
}
