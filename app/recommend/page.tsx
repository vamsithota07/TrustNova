import type { Metadata } from "next";
import RecommendFlow from "@/components/RecommendFlow";
import Container from "@/components/Container";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Find the Right Package | TrustNova",
  description:
    "Answer 2 quick questions and TrustNova will recommend the right logo, brand, or website package for your business.",
  path: "/recommend",
});

export default function RecommendPage() {
  return (
    <main className="hero-dot-grid relative min-h-screen bg-brand-black pt-28 sm:pt-32 md:pt-36 pb-section-sm md:pb-section min-w-0 overflow-hidden">
      <div
        className="floating-shape top-32 -left-24 h-64 w-64 bg-accent-sage/15 animate-float"
        aria-hidden
      />
      <div
        className="floating-shape bottom-20 right-[5%] h-72 w-72 bg-accent-warm/10 animate-float-delayed"
        aria-hidden
      />
      <Container className="relative z-10">
        <RecommendFlow />
      </Container>
    </main>
  );
}
