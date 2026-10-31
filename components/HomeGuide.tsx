import Link from "next/link";
import { PenTool, Palette, MonitorSmartphone, TrendingUp } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { servicePages } from "@/lib/service-pages";

/* The homepage's plain-words guide: what we do (linked to each service page), how a project runs (/process redirects
   here) and the questions people ask before they get in touch. Rendered on the server so search engines read all of it.
   Every claim here comes from the service catalogue. */

const ICONS: Record<string, typeof PenTool> = {
  "logo-design-hyderabad": PenTool, "brand-identity-design": Palette, "website-design-hyderabad": MonitorSmartphone, "digital-marketing-hyderabad": TrendingUp,
};

const STEPS = [
  { title: "A short brief", text: "A call or WhatsApp chat about your business, your customers and what you want to achieve. It is free and there is no obligation." },
  { title: "Concepts and a fixed quote", text: "You get a clear price before anything starts, then first concepts or a page plan to react to." },
  { title: "Refine together", text: "We adjust the work until it feels right, with unlimited revisions. You talk directly to the lead designer, not a middleman." },
  { title: "Launch and handover", text: "We handle the launch and hand over every file and all the code. Websites include 30 days of support after going live." },
];

export const HOME_FAQS = [
  { q: "How much does a logo or website cost?", a: "Every project is different, so we don't use a fixed price list. After a short free consultation you get one fixed quote for exactly what you need, explained clearly, with no hidden charges. Digital marketing is a monthly plan scoped to your goals." },
  { q: "How long does a website take?", a: "A full website is typically live in 2-4 weeks, depending on how quickly content and feedback come in. Logo concepts are ready in 3-5 days." },
  { q: "Do I own the logo, files and website code?", a: "Yes. You own 100% of everything we create: every logo file, the brand assets and the website code. Your domain and hosting are bought in your name, so they stay yours." },
  { q: "How many revisions do I get?", a: "Unlimited. We keep refining until you are happy with the result." },
  { q: "Do you only work with businesses in India?", a: "No. We are based in Hyderabad, India, and work with businesses anywhere in the world. Most of the work happens over calls and WhatsApp, so location is never a problem." },
  { q: "What do I need to get started?", a: "Just a few minutes to tell us about your business. Message us on WhatsApp at +91 95022 24444 or use the contact page, and we will set up a free consultation." },
];

export default function HomeGuide() {
  return (
    <section id="guide" className="relative w-full py-section bg-brand-black overflow-hidden">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: HOME_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <Container>
        <SectionHeader eyebrow="What we do" heading="Branding, Websites and Marketing for Growing Businesses" highlight="Growing Businesses"
          subtext="TrustNova is a brand, website and digital marketing studio based in Hyderabad, India, working with clients worldwide. We help small and growing businesses look professional, get found online and turn visitors into enquiries." />

        <Reveal className="-mt-4 flex flex-wrap justify-center gap-3 md:-mt-8">
          {servicePages.map((s) => { const Icon = ICONS[s.slug] || PenTool; return (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-brand-rule bg-brand-card px-5 text-sm font-semibold text-brand-white transition-colors hover:border-accent-warm/50 hover:text-accent-warm">
              <Icon className="h-4 w-4" strokeWidth={1.75} />{s.nav} <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          ); })}
        </Reveal>

        <div id="how-it-works" className="mt-20 md:mt-28 scroll-mt-28">
          <SectionHeader eyebrow="How it works" heading="From First Message to Launch" highlight="Launch" />
          <RevealStagger stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-w-0">
            {STEPS.map((step, i) => (
              <div key={step.title} data-reveal-item className="group creative-card p-8 min-w-0 transition-all duration-500 ease-premium hover:shadow-card-hover hover:-translate-y-1">
                <span className="text-[11px] font-semibold text-brand-dim tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display font-bold text-xl mt-4 mb-3 tracking-[-0.02em] text-brand-white">{step.title}</h3>
                <p className="editorial-body text-sm leading-[1.75]">{step.text}</p>
              </div>
            ))}
          </RevealStagger>
        </div>

        <div className="mt-20 md:mt-28 max-w-3xl mx-auto">
          <SectionHeader eyebrow="Questions" heading="Before You Get in Touch" highlight="Get in Touch" />
          <RevealStagger stagger={0.08} className="space-y-4">
            {HOME_FAQS.map((f) => (
              <details key={f.q} data-reveal-item className="creative-card group p-6 md:p-7 transition-shadow duration-500 hover:shadow-card-hover">
                <summary className="cursor-pointer list-none font-display font-bold text-lg text-brand-white min-h-[44px] flex items-center justify-between gap-4">
                  {f.q}<span className="text-accent-warm transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="editorial-body text-sm md:text-base leading-[1.75] mt-4">{f.a}</p>
              </details>
            ))}
          </RevealStagger>
          <Reveal as="p" className="editorial-body text-center mt-10">
            Not sure which service you need? <Link href="/recommend" className="text-accent-warm font-semibold hover:underline">Find your package</Link> in a minute,
            or <Link href="/contact" className="text-accent-warm font-semibold hover:underline">ask for a free quote</Link>.
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
