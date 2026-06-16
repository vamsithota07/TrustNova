import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import JsonLd from "@/components/JsonLd";
import { portfolioCollectionSchema, portfolioMetadata } from "@/lib/seo";

export const metadata: Metadata = portfolioMetadata;

export default function PortfolioRoute() {
  return (
    <InnerPageLayout>
      <JsonLd data={portfolioCollectionSchema()} />
      <PortfolioPage />
    </InnerPageLayout>
  );
}
