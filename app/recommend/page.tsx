import type { Metadata } from "next";
import RecommendFlow from "@/components/RecommendFlow";
import Container from "@/components/Container";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.recommend);

export default function RecommendPage() {
  return (
    <main className="hero-dot-grid relative overflow-x-clip bg-brand-black pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 min-w-0 w-full">
      <BreadcrumbJsonLd pageName="Find My Package" pagePath="/recommend" />
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
