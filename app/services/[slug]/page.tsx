import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import InnerPageLayout from "@/components/InnerPageLayout";
import JsonLd from "@/components/JsonLd";
import { btnPrimary, btnSecondary, WHATSAPP_URL } from "@/lib/constants";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { servicePageBySlug, servicePages } from "@/lib/service-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = servicePageBySlug(params.slug);
  if (!page) return {};
  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/services/${page.slug}`,
    keywords: page.keywords,
  });
}

function schema(page: NonNullable<ReturnType<typeof servicePageBySlug>>) {
  const url = `${SITE_URL}/services/${page.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.schemaName,
      serviceType: page.schemaName,
      description: page.description,
      url,
      provider: { "@type": "ProfessionalService", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
      areaServed: [
        { "@type": "City", name: "Hyderabad" },
        { "@type": "Country", name: "India" },
      ],
      ...(false
        ? {}
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: page.nav, item: url },
      ],
    },
  ];
}

const sectionHeading = "text-brand-white font-display font-bold tracking-[-0.03em] text-2xl md:text-3xl mb-6";
const card = "rounded-2xl border border-brand-rule bg-brand-card p-6 md:p-8 shadow-soft";

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const page = servicePageBySlug(params.slug);
  if (!page) notFound();
  const others = servicePages.filter((p) => p.slug !== page.slug);

  return (
    <InnerPageLayout>
      {schema(page).map((data) => (
        <JsonLd key={data["@type"]} data={data} />
      ))}

      <section className="w-full bg-brand-black pb-12 md:pb-16">
        <Container>
          <div className="max-w-4xl min-w-0">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-brand-dim">
              <Link href="/" className="hover:text-brand-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="hover:text-brand-white">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-brand-silver">{page.nav}</span>
            </nav>
            <p className="editorial-eyebrow mb-4 text-accent-warm">{page.eyebrow}</p>
            <h1 className="editorial-heading text-[clamp(2rem,5vw,3.75rem)] leading-[1.05]">{page.h1}</h1>
            <div className="mt-6 space-y-4">
              {page.intro.map((p) => (
                <p key={p} className="editorial-body text-base md:text-lg max-w-3xl">{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} inline-flex items-center justify-center`}>
                Get a free demo →
              </a>
              <Link href="/contact" className={`${btnSecondary} inline-flex items-center justify-center`}>
                Ask for a quote
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full bg-brand-dark py-12 md:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-start">
            <div className={card}>
              <h2 className={sectionHeading}>{page.includes.heading}</h2>
              <ul className="space-y-3">
                {page.includes.items.map((item) => (
                  <li key={item} className="flex gap-3 text-brand-silver text-base leading-relaxed">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-warm" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className={card}>
                <h2 className="text-brand-white font-bold text-xl mb-3">Timeline</h2>
                <p className="text-brand-silver leading-relaxed">{page.timeline}</p>
              </div>
              <div className={card}>
                <h2 className="text-brand-white font-bold text-xl mb-3">Pricing</h2>
                <p className="text-brand-silver leading-relaxed">{page.price}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full bg-brand-black py-12 md:py-16">
        <Container>
          <h2 className={sectionHeading}>How it works</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {page.steps.map((step, i) => (
              <li key={step.title} className={card}>
                <span className="text-accent-warm font-bold text-sm tracking-widest">STEP {i + 1}</span>
                <h3 className="text-brand-white font-bold text-xl mt-2 mb-2">{step.title}</h3>
                <p className="text-brand-silver leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 items-start">
            <div>
              <h2 className={sectionHeading}>{page.fit.heading}</h2>
              <ul className="space-y-3">
                {page.fit.items.map((item) => (
                  <li key={item} className="flex gap-3 text-brand-silver text-base leading-relaxed">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={sectionHeading}>What you can count on</h2>
              <ul className="space-y-3 text-brand-silver text-base leading-relaxed">
                <li>Unlimited revisions until it feels right</li>
                <li>You own 100% of the files and code, with no lock-in</li>
                <li>Direct contact with our lead designer</li>
                <li>A fixed quote before work starts, with no hidden charges</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full bg-brand-dark py-12 md:py-16">
        <Container>
          <div className="max-w-3xl">
            <h2 className={sectionHeading}>Common questions</h2>
            <div className="space-y-6">
              {page.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-brand-white font-semibold text-lg mb-2">{f.q}</h3>
                  <p className="text-brand-silver leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full bg-brand-black py-12 md:py-16">
        <Container>
          <h2 className={sectionHeading}>Related services</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className={`${card} transition-shadow hover:shadow-card-hover`}>
                <span className="text-brand-white font-bold text-lg">{o.nav}</span>
                <span className="block text-brand-dim text-sm mt-1">{o.eyebrow}</span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-brand-silver">
            Ready to talk?{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent-warm font-semibold underline underline-offset-4">
              Message us on WhatsApp
            </a>{" "}
            or <Link href="/contact" className="text-accent-warm font-semibold underline underline-offset-4">send an enquiry</Link>.
          </p>
        </Container>
      </section>
    </InnerPageLayout>
  );
}
