import Link from "next/link";
import { PenTool, Palette, MonitorSmartphone, Rocket, TrendingUp, Check } from "lucide-react";
import Container from "@/components/Container";
import RevealStagger from "@/components/motion/RevealStagger";
import { WHATSAPP_URL } from "@/lib/constants";

/* The services page's main list: the same five services, in the same order, as the homepage story. Rendered on the
   server as plain cards, so the whole page scrolls normally and search engines read every line. */

const SERVICES = [
  { n: "01", icon: PenTool, title: "Logo Design", line: "A logo people remember, built from your story.", href: "/services/logo-design-hyderabad",
    bullets: ["3 unique initial concepts", "Unlimited refinements", "Colour palette and font pairing", "Every file format: PNG, JPG, SVG, PDF, AI", "Social media and monochrome versions"] },
  { n: "02", icon: Palette, title: "Brand Identity", line: "One look, everywhere your customers see you.", href: "/services/brand-identity-design",
    bullets: ["Everything in logo design", "Business cards and letterhead", "Email signature and WhatsApp banner", "Social media post templates", "Brand style guide (10-15 page PDF)"] },
  { n: "03", icon: MonitorSmartphone, title: "Website Design & Development", line: "A website that turns visitors into enquiries.", href: "/services/website-design-hyderabad",
    bullets: ["Custom, mobile-first design", "Up to 8 pages", "Contact form and WhatsApp click-to-chat", "Basic SEO and Google Analytics", "Live in 2-4 weeks"] },
  { n: "04", icon: Rocket, title: "Launch & Website Care", line: "We handle the tech. You open for business.", href: "/services/website-design-hyderabad",
    bullets: ["Domain, DNS and hosting setup (in your name)", "SSL, speed and device testing", "30 days of support after launch", "Optional monthly care: updates, backups, uptime checks", "Monthly traffic report"] },
  { n: "05", icon: TrendingUp, title: "Digital Marketing", line: "Then we help the right people find you.", href: "/services/digital-marketing-hyderabad",
    bullets: ["SEO and Google Business Profile", "Social media content and reels", "Google and Meta ads", "A monthly growth plan", "Clear monthly reports"] },
];

function quoteUrl(title: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(`Hi TrustNova, I'd like a quote for ${title}.`)}`;
}

export default function ServicesList() {
  return (
    <section className="w-full pb-16 md:pb-24">
      <Container>
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="editorial-eyebrow mb-4">Services</p>
          <h1 className="editorial-heading text-[clamp(2.2rem,5vw,4rem)]">
            Logo, branding, websites and <span className="text-accent-warm">digital marketing</span> in Hyderabad
          </h1>
          <p className="editorial-body mt-5 text-base leading-[1.75] md:text-lg">
            Five services that work on their own or together, from the first sketch of your logo to the customers who find you on Google.
            Every project gets one fixed quote after a free consultation.
          </p>
        </div>
        <RevealStagger stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 min-w-0">
          {SERVICES.map((s) => (
            <article key={s.n} data-reveal-item className="group creative-card flex min-w-0 flex-col p-8 md:p-10 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-rule bg-brand-dark transition-colors duration-500 group-hover:border-accent-warm/30">
                  <s.icon className="h-5 w-5 text-brand-white group-hover:text-accent-warm" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold tabular-nums text-brand-dim">{s.n} / 05</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-brand-white lg:text-3xl">{s.title}</h2>
              <p className="editorial-body mt-2">{s.line}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-brand-silver md:text-[15px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-warm" strokeWidth={2} />{b}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href={s.href} className="inline-flex min-h-[44px] items-center text-brand-white hover:text-accent-warm">See what is included →</Link>
                <a href={quoteUrl(s.title)} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center text-accent-warm hover:underline">Get a quote</a>
              </div>
            </article>
          ))}
          <div data-reveal-item className="creative-card flex min-w-0 flex-col justify-center p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-brand-white">Not sure where to start?</h2>
            <p className="editorial-body mt-2">Answer two quick questions and we&apos;ll point you to the right service.</p>
            <Link href="/recommend" className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent-warm hover:underline">Find your package →</Link>
          </div>
        </RevealStagger>
      </Container>
    </section>
  );
}
