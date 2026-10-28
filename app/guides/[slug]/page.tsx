import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import InnerPageLayout from "@/components/InnerPageLayout";
import JsonLd from "@/components/JsonLd";
import { btnPrimary, btnSecondary, WHATSAPP_URL } from "@/lib/constants";
import { guideBySlug, guides } from "@/lib/guides";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = guideBySlug(params.slug);
  if (!g) return {};
  return createPageMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}`, keywords: g.keywords });
}

function schema(g: NonNullable<ReturnType<typeof guideBySlug>>) {
  const url = `${SITE_URL}/guides/${g.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.h1,
      description: g.description,
      url,
      dateModified: g.updated,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: g.nav, item: url },
      ],
    },
  ];
}

const sectionHeading = "text-brand-white font-display font-bold tracking-[-0.03em] text-2xl md:text-3xl mb-6";
const card = "rounded-2xl border border-brand-rule bg-brand-card p-6 md:p-8 shadow-soft";

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = guideBySlug(params.slug);
  if (!g) notFound();
  const others = guides.filter((x) => x.slug !== g.slug);

  return (
    <InnerPageLayout>
      {schema(g).map((data) => (
        <JsonLd key={data["@type"]} data={data} />
      ))}

      <article>
        <section className="w-full bg-brand-black pb-10 md:pb-14">
          <Container>
            <div className="max-w-3xl min-w-0">
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-brand-dim">
                <Link href="/" className="hover:text-brand-white">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/guides" className="hover:text-brand-white">Guides</Link>
              </nav>
              <p className="editorial-eyebrow mb-4 text-accent-warm">Guide</p>
              <h1 className="editorial-heading text-[clamp(2rem,5vw,3.4rem)] leading-[1.08]">{g.h1}</h1>
              {/* the direct answer first: the part search engines and AI assistants quote */}
              <div className={`${card} mt-8 border-l-4 border-l-accent-warm`}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-warm mb-3">The short answer</p>
                <p className="text-brand-white text-lg md:text-xl leading-relaxed">{g.answer}</p>
              </div>
              <p className="mt-4 text-sm text-brand-dim">Updated {new Date(g.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </Container>
        </section>

        {g.sections.map((s, i) => (
          <section key={s.heading} className={`w-full py-10 md:py-14 ${i % 2 ? "bg-brand-black" : "bg-brand-dark"}`}>
            <Container>
              <div className="max-w-3xl">
                <h2 className={sectionHeading}>{s.heading}</h2>
                {s.items && (
                  <ul className="space-y-4">
                    {s.items.map((it) => (
                      <li key={it.text} className="flex gap-3 text-brand-silver text-base md:text-lg leading-relaxed">
                        <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent-warm" />
                        <span>{it.label && <strong className="text-brand-white font-semibold">{it.label}: </strong>}{it.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.text?.map((p) => (
                  <p key={p} className="editorial-body text-base md:text-lg mt-4 first:mt-0">{p}</p>
                ))}
              </div>
            </Container>
          </section>
        ))}

        <section className="w-full bg-brand-dark py-10 md:py-14">
          <Container>
            <div className="max-w-3xl">
              <h2 className={sectionHeading}>Common questions</h2>
              <div className="space-y-6">
                {g.faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="text-brand-white font-semibold text-lg mb-2">{f.q}</h3>
                    <p className="text-brand-silver leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} inline-flex items-center justify-center`}>
                  Ask us on WhatsApp →
                </a>
                <Link href={g.service.href} className={`${btnSecondary} inline-flex items-center justify-center`}>
                  {g.service.label}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </article>

      <section className="w-full bg-brand-black py-10 md:py-14">
        <Container>
          <h2 className={sectionHeading}>More guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/guides/${o.slug}`} className={`${card} transition-shadow hover:shadow-card-hover`}>
                <span className="text-brand-white font-bold text-lg">{o.h1}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </InnerPageLayout>
  );
}
