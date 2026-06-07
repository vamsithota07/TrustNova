import type { Metadata } from "next";
import RecommendFlow from "@/components/RecommendFlow";
import Container from "@/components/Container";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Find the Right Package | TrustNova",
  description:
    "Answer 3 quick questions and TrustNova will recommend the perfect logo, brand, or website package for your business and budget.",
  path: "/recommend",
});

export default function RecommendPage() {
  return (
    <main className="relative min-h-screen bg-brand-black pt-20 sm:pt-24 md:pt-28 lg:pt-36 pb-16 md:pb-20 min-w-0 overflow-hidden">
      <Container>
        <RecommendFlow />
      </Container>
    </main>
  );
}
