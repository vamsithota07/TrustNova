import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Pillars from "@/components/Pillars";
import SectionSeparator from "@/components/SectionSeparator";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata, pageSEO, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.home);

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <SectionSeparator />
        <TrustBar />
        <SectionSeparator />
        <Pillars />
      </main>
    </>
  );
}
