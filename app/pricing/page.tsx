import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import Pricing from "@/components/Pricing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing | TrustNova | Brand & Creative Studio",
  description:
    "Transparent pricing for logo design, brand identity, website design, launch support, and maintenance. No hidden fees.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <InnerPageLayout>
      <Pricing />
    </InnerPageLayout>
  );
}
