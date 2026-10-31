import type { Metadata } from "next";
import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";
import Container from "@/components/Container";
import IndustriesGrid from "@/components/industries/IndustriesGrid";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { WHATSAPP_URL } from "@/lib/constants";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.industries);

export default function IndustriesPage() {
  return (
    <InnerPageLayout>
      <BreadcrumbJsonLd pageName="Industries" pagePath="/industries" />
      <section className="w-full pb-section">
        <Container>
          <div className="mb-10 max-w-3xl md:mb-12">
            <p className="editorial-eyebrow mb-4">Industries we build for</p>
            <h1 className="editorial-heading text-[clamp(2.2rem,5vw,4rem)]">
              Website designs for <span className="text-accent-warm">20+ industries</span>, worldwide
            </h1>
            <p className="editorial-body mt-5 text-base leading-[1.75] md:text-lg">
              Every business needs something different from its website: a menu and table booking for a restaurant, appointments for a
              clinic, listings for a real estate agency. These concept designs show how we would build yours. Open any of them to look around.
            </p>
          </div>
          <IndustriesGrid />
          <div className="creative-card mt-16 flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-brand-white md:text-3xl">Don&apos;t see your industry?</h2>
              <p className="editorial-body mt-2">We design for any business. Tell us what you do and we&apos;ll plan the pages with you.</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center text-accent-warm hover:underline">Chat on WhatsApp →</a>
              <Link href="/portfolio" className="inline-flex min-h-[44px] items-center text-brand-white hover:text-accent-warm">See our client work →</Link>
            </div>
          </div>
        </Container>
      </section>
    </InnerPageLayout>
  );
}
