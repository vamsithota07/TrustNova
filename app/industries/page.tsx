import type { Metadata } from "next";
import IndustriesShowcase from "@/components/industries/IndustriesShowcase";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Industries We Build For | TrustNova",
  description:
    "See how TrustNova builds websites for jewellery shops, restaurants, clinics, real estate, coaching centres, and 20+ business types across India.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 min-w-0 w-full overflow-x-hidden">
      <IndustriesShowcase />
    </main>
  );
}
