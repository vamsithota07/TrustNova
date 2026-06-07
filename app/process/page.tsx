import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import Process from "@/components/Process";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Process | TrustNova | Brand & Creative Studio",
  description:
    "TrustNova's clear, transparent, collaborative process - from discovery and design to launch and ongoing support.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <InnerPageLayout>
      <Process />
    </InnerPageLayout>
  );
}
