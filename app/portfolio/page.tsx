import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio | TrustNova - Brand & Creative Studio",
  description:
    "Explore TrustNova's portfolio of logo design, brand identity, and website projects for Indian businesses across hospitality, retail, professional services, and more.",
  path: "/portfolio",
});

export default function PortfolioRoute() {
  return (
    <InnerPageLayout>
      <PortfolioPage />
    </InnerPageLayout>
  );
}
