import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import TermsConditions from "@/components/legal/TermsConditions";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions | TrustNova",
  description:
    "Read TrustNova's terms and conditions for logo design, brand identity, website design, launch support, and maintenance services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <InnerPageLayout>
      <TermsConditions />
    </InnerPageLayout>
  );
}
