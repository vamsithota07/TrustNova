import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import InnerPageLayout from "@/components/InnerPageLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { guides } from "@/lib/guides";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guides for Small Business Owners: Websites, Branding, Google | TrustNova",
  description:
    "Plain answers to the questions small business owners ask about websites, logos, branding and getting found on Google.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <InnerPageLayout>
      <BreadcrumbJsonLd pageName="Guides" pagePath="/guides" />
      <section className="w-full bg-brand-black pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <p className="editorial-eyebrow mb-4 text-accent-warm">Guides</p>
            <h1 className="editorial-heading text-[clamp(2rem,5vw,3.75rem)] leading-[1.05]">Plain answers for business owners</h1>
            <p className="editorial-body text-base md:text-lg mt-6">
              The questions we hear most about websites, logos and getting found on Google, answered straight.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`}
                className="rounded-2xl border border-brand-rule bg-brand-card p-6 md:p-8 shadow-soft transition-shadow hover:shadow-card-hover">
                <span className="block text-brand-white font-display font-bold text-xl leading-snug">{g.h1}</span>
                <span className="block text-brand-silver text-sm mt-3 leading-relaxed">{g.description}</span>
                <span className="block text-accent-warm font-semibold text-sm mt-5">Read the answer →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </InnerPageLayout>
  );
}
