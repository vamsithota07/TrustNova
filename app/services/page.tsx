import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import Link from "next/link";
import Container from "@/components/Container";
import Services from "@/components/Services";
import ServicesGuide from "@/components/services/ServicesGuide";
import { servicePages } from "@/lib/service-pages";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata, pageSEO } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSEO.services);

export default function ServicesPage() {
  return (
    <InnerPageLayout>
      <BreadcrumbJsonLd pageName="Services" pagePath="/services" />
      <Services />
      <ServicesGuide />
      <section className="w-full bg-brand-dark py-12 md:py-16">
        <Container>
          <h2 className="text-brand-white font-display font-bold tracking-[-0.03em] text-2xl md:text-3xl mb-6">Read more about each service</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicePages.map((p) => (
              <Link key={p.slug} href={`/services/${p.slug}`} className="rounded-2xl border border-brand-rule bg-brand-card p-6 shadow-soft transition-shadow hover:shadow-card-hover">
                <span className="text-brand-white font-bold text-lg">{p.nav}</span>
                <span className="block text-brand-dim text-sm mt-1">{p.eyebrow}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </InnerPageLayout>
  );
}
