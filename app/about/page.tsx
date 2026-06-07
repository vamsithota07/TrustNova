import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import SectionSeparator from "@/components/SectionSeparator";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us | TrustNova | Brand & Creative Studio",
  description:
    "Learn about TrustNova - a Hyderabad-based brand and creative studio designed for Indian businesses, built to scale.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <InnerPageLayout>
      <About />
      <SectionSeparator />
      <WhyUs />
    </InnerPageLayout>
  );
}
