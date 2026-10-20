import Link from "next/link";
import { PenTool, Palette, MonitorSmartphone, TrendingUp } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { servicePages } from "@/lib/service-pages";

/* The homepage's plain-words guide: what we do (linked to each service page), how a project runs, what every client
   gets, and the questions people ask before they get in touch. Rendered on the server so search engines read all of it.
   Every claim here comes from the service catalogue. */

const SUMMARY: Record<string, string> = {
  "logo-design-hyderabad": "Three unique concepts, unlimited refinements and every file format, with concepts ready in 3-5 days. From ₹8,000.",
  "brand-identity-design": "Your logo plus colours, fonts, business cards, letterhead, social media templates and a brand style guide. From ₹18,000.",
  "website-design-hyderabad": "Custom, mobile-first websites of up to 8 pages with WhatsApp click-to-chat, basic SEO and Google Analytics, live in 2-4 weeks. From ₹25,000.",
  "digital-marketing-hyderabad": "SEO and Google Business Profile, social media management, Google and Meta ads, and content, on a monthly plan scoped to your goals.",
};

const ICONS: Record<string, typeof PenTool> = {
  "logo-design-hyderabad": PenTool, "brand-identity-design": Palette, "website-design-hyderabad": MonitorSmartphone, "digital-marketing-hyderabad": TrendingUp,
};

const STEPS = [
  { title: "A short brief", text: "A call or WhatsApp chat about your business, your customers and what you want to achieve. It is free and there is no obligation." },
  { title: "Concepts and a fixed quote", text: "You get a clear price before anything starts, then first concepts or a page plan to react to." },
  { title: "Refine together", text: "We adjust the work until it feels right, with unlimited revisions. You talk directly to the lead designer, not a middleman." },
  { title: "Launch and handover", text: "We handle the launch and hand over every file and all the code. Websites include 30 days of support after going live." },
];

const PROMISES = [
  { title: "On-time delivery", text: "We agree the schedule at the start and keep to it." },
  { title: "Unlimited revisions", text: "No counting rounds and no extra invoices for changes." },
  { title: "You own everything", text: "100% of the files and code are yours, with no lock-ins or licence fees." },
  { title: "Transparent pricing", text: "One clear quote, explained, with no hidden charges." },
];

export const HOME_FAQS = [
  { q: "How much does a logo or website cost?", a: "Logo design starts from ₹8,000, the complete brand identity package from ₹18,000 and websites from ₹25,000. Digital marketing is a monthly plan scoped to your goals. After a short free consultation you get one fixed quote, with no hidden charges." },
  { q: "How long does a website take?", a: "A full website is typically live in 2-4 weeks, depending on how quickly content and feedback come in. Logo concepts are ready in 3-5 days." },
  { q: "Do I own the logo, files and website code?", a: "Yes. You own 100% of everything we create: every logo file, the brand assets and the website code. Your domain and hosting are bought in your name, so they stay yours." },
  { q: "How many revisions do I get?", a: "Unlimited. We keep refining until you are happy with the result." },
  { q: "Do you only work with businesses in Hyderabad?", a: "We are based in Hyderabad and work with businesses across India. Most of the work happens over calls and WhatsApp, so location is never a problem." },
  { q: "What do I need to get started?", a: "Just a few minutes to tell us about your business. Message us on WhatsApp at +91 95022 24444 or use the contact page, and we will set up a free consultation." },
];

export default function HomeGuide() {
  return (
    <section id="guide" className="relative w-full py-section bg-brand-black overflow-hidden">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: HOME_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <Container>
        <SectionHeader eyebrow="What we do" heading="Branding, Websites and Marketing for Growing Businesses" highlight="Growing Businesses"
          subtext="TrustNova is a brand, website and digital marketing studio in Hyderabad. We help small and growing businesses look professional, get found online and turn visitors into enquiries." />

        <RevealStagger stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 min-w-0">
          {servicePages.map((s) => { const Icon = ICONS[s.slug] || PenTool; return (
            <article key={s.slug} data-reveal-item className="group creative-card p-8 md:p-10 min-w-0 flex flex-col transition-all duration-500 ease-premium hover:shadow-card-hover hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl border border-brand-rule bg-brand-dark flex items-center justify-center mb-6 transition-all duration-500 group-hover:border-accent-warm/30 group-hover:bg-accent-warm/5">
                <Icon className="w-5 h-5 text-brand-white group-hover:text-accent-warm transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-3xl mb-3 tracking-[-0.03em] text-brand-white">{s.nav}</h3>
              <p className="editorial-body text-sm md:text-base leading-[1.75] flex-1">{SUMMARY[s.slug]}</p>
              <Link href={`/services/${s.slug}`} className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent-warm hover:underline">
                {s.nav}: see what is included <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </article>
          ); })}
        </RevealStagger>

        <div className="mt-20 md:mt-28">
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

        <div className="mt-20 md:mt-28">
          <SectionHeader eyebrow="Our promises" heading="What Every Client Gets" highlight="Every Client" />
          <RevealStagger stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-w-0">
            {PROMISES.map((p) => (
              <div key={p.title} data-reveal-item className="creative-card p-8 min-w-0 transition-all duration-500 ease-premium hover:shadow-card-hover hover:-translate-y-1">
                <h3 className="font-display font-bold text-xl mb-3 tracking-[-0.02em] text-brand-white">{p.title}</h3>
                <p className="editorial-body text-sm leading-[1.75]">{p.text}</p>
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
