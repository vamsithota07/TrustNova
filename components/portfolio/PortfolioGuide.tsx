import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { featuredProjects, portfolioProjects } from "@/lib/portfolio";
import { industryCards } from "@/lib/industries";

/* The portfolio in words: what we did for each client, what the industry showcases are, and the questions people ask
   about our work. Rendered on the server so search engines read all of it. Facts come from lib/portfolio.ts; nothing
   here claims results we haven't measured. */

const CASES: Record<string, { client: string; did: string; service: { label: string; href: string } }> = {
  "milletio-global-grain": {
    client: "Milletio Global Grain is a grain brand selling to customers around the world.",
    did: "TrustNova supports its digital marketing: campaign creative, social media storytelling and a channel strategy focused on growth, so the brand looks and sounds the same wherever customers meet it.",
    service: { label: "Digital marketing", href: "/services/digital-marketing-hyderabad" },
  },
  vistix: {
    client: "Vistix Engineers is an HVAC and industrial engineering company in Hyderabad.",
    did: "We designed and built its marketing website, which explains its HVAC systems, cleanroom solutions, cold rooms, AHU fabrication and pharmaceutical-grade engineering work clearly for the businesses that buy them. The site is built with React and Vite.",
    service: { label: "Website design", href: "/services/website-design-hyderabad" },
  },
  asmc: {
    client: "ASMC (Asian Speciality Medical Centre LLC) runs premium dental clinics across Oman.",
    did: "We designed and built its website in Next.js, with immersive motion and a 3D hero section that match the clinics' luxury positioning and help patients understand the care on offer.",
    service: { label: "Website design", href: "/services/website-design-hyderabad" },
  },
};

const FAQS = [
  { q: "Are these real client projects?", a: "Milletio Global Grain, Vistix Engineers and ASMC are client projects, and you can visit their live websites. The industry showcases below them are concept websites we designed to show how we would approach each kind of business." },
  { q: "Can you design for my industry?", a: `Yes. We have concept websites for ${industryCards.length} industries, from clinics and restaurants to law firms, real estate and gyms, and every project starts from a brief about your own business, so nothing is copied from a template.` },
  { q: "Do you work with businesses outside Hyderabad?", a: "Yes. We are based in Hyderabad and work with businesses across India, and our clients include a dental clinic group in Oman. Most of the work happens over calls and WhatsApp." },
  { q: "How long does a website like these take?", a: "A full website is typically live in 2-4 weeks, depending on how quickly content and feedback come in. Logo concepts are ready in 3-5 days." },
];

export default function PortfolioGuide() {
  return (
    <section className="px-4 py-16 sm:px-8 md:py-24 border-t border-brand-rule">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <div className="mx-auto max-w-editorial">
        <p className="editorial-eyebrow mb-2 text-accent-warm">Client work in detail</p>
        <h2 className="font-display text-2xl font-bold text-brand-white md:text-4xl mb-10">What we did for each client</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
          {featuredProjects.map((p) => {
            const c = CASES[p.id];
            if (!c) return null;
            return (
              <article key={p.id} className="creative-card p-8 min-w-0 flex flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dim">{p.category}</p>
                <h3 className="font-display font-bold text-2xl mt-2 mb-4 tracking-[-0.02em] text-brand-white">{p.title}</h3>
                <p className="editorial-body text-sm md:text-base leading-[1.75]">{c.client}</p>
                <p className="editorial-body text-sm md:text-base leading-[1.75] mt-3 flex-1">{c.did}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
                  <Link href={c.service.href} className="inline-flex min-h-[44px] items-center text-sm font-semibold text-accent-warm hover:underline">{c.service.label} →</Link>
                  {p.href && <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-silver hover:underline">Visit the live site ↗</a>}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20">
          <p className="editorial-eyebrow mb-2 text-accent-warm">Industry showcases</p>
          <h2 className="font-display text-2xl font-bold text-brand-white md:text-4xl mb-4">How we would approach your business</h2>
          <p className="editorial-body max-w-3xl leading-[1.75]">
            Alongside client work, we design concept websites for the kinds of businesses we work with most, so you can see how a site for
            your industry could look and work before we start. The showcases above include a restaurant with a menu and reservations, a law
            firm built around consultations, a jewellery storefront, a clinic focused on appointments and a photography portfolio.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-3xl">
            {portfolioProjects.map((p) => (
              <li key={p.id} className="editorial-body text-sm leading-[1.7]"><b className="text-brand-white">{p.title}</b> ({p.category}): {p.description}</li>
            ))}
          </ul>
          <p className="editorial-body mt-8 leading-[1.75] max-w-3xl">
            We have concept websites for {industryCards.length} industries:{" "}
            {industryCards.map((c, i) => <span key={c.id}>{c.name}{i < industryCards.length - 1 ? ", " : "."}</span>)}{" "}
            <Link href="/industries" className="text-accent-warm font-semibold hover:underline">See every industry</Link>.
          </p>
        </div>

        <div className="mt-20 max-w-3xl">
          <p className="editorial-eyebrow mb-2 text-accent-warm">Questions</p>
          <h2 className="font-display text-2xl font-bold text-brand-white md:text-4xl mb-8">About our work</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="creative-card group p-6 md:p-7">
                <summary className="cursor-pointer list-none font-display font-bold text-lg text-brand-white min-h-[44px] flex items-center justify-between gap-4">
                  {f.q}<span className="text-accent-warm transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="editorial-body text-sm md:text-base leading-[1.75] mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
