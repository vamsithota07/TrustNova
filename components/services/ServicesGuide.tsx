import Link from "next/link";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";

/* Helps a visitor pick the right service: situations mapped to services, a comparison of what each includes, how long
   it takes, and the questions people ask before choosing. Rendered on the server so search
   engines read all of it. Every fact comes from the service catalogue (lib/service-pages.ts). */

const SITUATIONS = [
  { need: "You are starting a new business and need to look professional from day one", pick: "Logo design, or the complete brand identity if you also need cards, stationery and social templates", href: "/services/brand-identity-design" },
  { need: "You have a logo, but no website, or only a social media page", pick: "Website design: a mobile-first site with WhatsApp click-to-chat, live in 2-4 weeks", href: "/services/website-design-hyderabad" },
  { need: "You have a website, but customers can't find you on Google", pick: "Digital marketing: SEO and a complete Google Business Profile", href: "/services/digital-marketing-hyderabad" },
  { need: "Your website looks dated, is slow or doesn't work well on phones", pick: "Website design (a redesign), with optional monthly maintenance afterwards", href: "/services/website-design-hyderabad" },
  { need: "Your logo, website and posts all look different", pick: "Brand identity: one set of colours, fonts and templates used everywhere", href: "/services/brand-identity-design" },
];

const COMPARE = [
  { service: "Logo design", gets: "Three concepts, unlimited refinements, colour palette, fonts and every file format", time: "Concepts in 3-5 days", href: "/services/logo-design-hyderabad" },
  { service: "Brand identity", gets: "Logo plus business cards, letterhead, social media templates and a brand style guide", time: "Logo first, then the full set", href: "/services/brand-identity-design" },
  { service: "Website design", gets: "Custom, mobile-first site up to 8 pages, contact form, WhatsApp click-to-chat, basic SEO, Google Analytics", time: "Live in 2-4 weeks", href: "/services/website-design-hyderabad" },
  { service: "Launch support", gets: "Domain and DNS setup, deployment, SSL, device testing and 30 days of support after going live", time: "With your website", href: "/services/website-design-hyderabad" },
  { service: "Website maintenance", gets: "Ongoing updates and support after launch", time: "Monthly", href: "/contact" },
  { service: "Digital marketing", gets: "SEO and Google Business Profile, social media management, Google and Meta ads, content", time: "Ads in days; SEO builds over months", href: "/services/digital-marketing-hyderabad" },
];

const FAQS = [
  { q: "Can I hire you for just a logo?", a: "Yes. Logo design is its own service, with three concepts and unlimited refinements. You can add the full brand identity or a website later." },
  { q: "What is the difference between a logo and a brand identity?", a: "A logo is one mark. A brand identity is the whole system around it: colours, fonts, business cards, letterhead, social media templates and a style guide, so everything you put out looks like the same business." },
  { q: "Are the domain and hosting included?", a: "Domain and hosting are bought by you, so they stay in your name. We handle the technical setup: DNS, deployment, SSL and testing, plus 30 days of support after launch." },
  { q: "Do you offer support after the website goes live?", a: "Every website includes 30 days of post-launch support. After that you can choose a monthly maintenance plan for updates and ongoing help." },
  { q: "Can you market a website you didn't build?", a: "Yes. Digital marketing works with any website. We start with a free consultation, then scope a monthly plan covering SEO, your Google Business Profile, social media or ads, depending on your goals." },
  { q: "Will you guarantee first place on Google?", a: "No one can honestly guarantee rankings. SEO builds gradually over months; we focus on what makes the difference: a complete Google listing, clear pages and steady, useful content." },
];

export default function ServicesGuide() {
  return (
    <section className="w-full py-16 md:py-24">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <Container>
        <Reveal>
          <p className="editorial-eyebrow mb-2 text-accent-warm">Choosing a service</p>
          <h2 className="font-display text-2xl font-bold text-brand-white md:text-4xl mb-8 tracking-[-0.03em]">Which service do you need?</h2>
        </Reveal>
        <RevealStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-0">
          {SITUATIONS.map((s) => (
            <Link key={s.need} href={s.href} data-reveal-item className="group creative-card p-6 md:p-7 min-w-0 block transition-all duration-500 ease-premium hover:shadow-card-hover hover:-translate-y-1">
              <p className="font-display font-bold text-lg text-brand-white leading-snug">{s.need}</p>
              <p className="editorial-body text-sm md:text-base leading-[1.7] mt-2"><span className="text-accent-warm font-semibold inline-block transition-transform duration-300 group-hover:translate-x-1">→ </span>{s.pick}</p>
            </Link>
          ))}
          <Link href="/recommend" data-reveal-item className="group creative-card p-6 md:p-7 min-w-0 block transition-all duration-500 ease-premium hover:shadow-card-hover hover:-translate-y-1">
            <p className="font-display font-bold text-lg text-brand-white leading-snug">Still not sure?</p>
            <p className="editorial-body text-sm md:text-base leading-[1.7] mt-2"><span className="text-accent-warm font-semibold inline-block transition-transform duration-300 group-hover:translate-x-1">→ </span>Answer a few quick questions and find your package in a minute.</p>
          </Link>
        </RevealStagger>

        <Reveal className="mt-20">
          <p className="editorial-eyebrow mb-2 text-accent-warm">At a glance</p>
          <h2 className="font-display text-2xl font-bold text-brand-white md:text-4xl mb-8 tracking-[-0.03em]">What each service includes</h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[720px] text-left text-sm md:text-base border-collapse">
              <thead>
                <tr className="text-brand-dim text-xs uppercase tracking-[0.12em]">
                  <th className="py-3 pr-4 font-semibold">Service</th><th className="py-3 pr-4 font-semibold">What you get</th>
                  <th className="py-3 font-semibold">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.service} className="border-t border-brand-rule align-top transition-colors duration-300 hover:bg-brand-muted/60">
                    <td className="py-4 pr-4"><Link href={c.href} className="font-semibold text-brand-white hover:text-accent-warm">{c.service}</Link></td>
                    <td className="py-4 pr-4 editorial-body leading-[1.6]">{c.gets}</td>
                    <td className="py-4 editorial-body whitespace-nowrap">{c.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="editorial-body mt-6 leading-[1.75] max-w-3xl">
            Every service includes unlimited revisions, transparent pricing with no hidden charges, direct contact with our lead designer,
            and full ownership: you keep 100% of the files and code. You get one fixed quote after a short, free consultation.
          </p>
        </Reveal>

        <div className="mt-20 max-w-3xl">
          <p className="editorial-eyebrow mb-2 text-accent-warm">Questions</p>
          <h2 className="font-display text-2xl font-bold text-brand-white md:text-4xl mb-8 tracking-[-0.03em]">Before you choose</h2>
          <RevealStagger stagger={0.08} className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} data-reveal-item className="creative-card group p-6 md:p-7 transition-shadow duration-500 hover:shadow-card-hover">
                <summary className="cursor-pointer list-none font-display font-bold text-lg text-brand-white min-h-[44px] flex items-center justify-between gap-4">
                  {f.q}<span className="text-accent-warm transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="editorial-body text-sm md:text-base leading-[1.75] mt-4">{f.a}</p>
              </details>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </section>
  );
}
