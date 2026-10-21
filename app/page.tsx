import type { Metadata } from "next";
import TrustBar from "@/components/TrustBar";
import RecentWork from "@/components/RecentWork";
import BrandStory from "@/components/BrandStory";
import HomeGuide from "@/components/HomeGuide";
import SectionSeparator from "@/components/SectionSeparator";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata, pageSEO, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.home);

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <main className="w-full overflow-x-clip">
        <BrandStory />
        <SectionSeparator />
        <TrustBar />
        <SectionSeparator />
        <RecentWork />
        <SectionSeparator />
        <HomeGuide />
      </main>
    </>
  );
}
