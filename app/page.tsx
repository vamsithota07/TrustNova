import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Pillars from "@/components/Pillars";
import SectionSeparator from "@/components/SectionSeparator";
import { createPageMetadata } from "@/lib/seo";
import { siteMetadata } from "@/lib/constants";

export const metadata: Metadata = createPageMetadata({
  title: siteMetadata.title,
  description:
    "TrustNova helps Indian businesses build logos, brand identities, and websites that earn trust and drive growth. Based in Hyderabad, serving clients across India.",
  path: "/",
});

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <SectionSeparator />
      <TrustBar />
      <SectionSeparator />
      <Pillars />
    </main>
  );
}
