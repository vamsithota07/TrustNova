"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/motion/gsap-register";
import Container from "@/components/Container";
import MagneticButton from "@/components/motion/MagneticButton";
import ServiceVisual, { type ServiceVisualType } from "@/components/services/ServiceVisuals";
import { WHATSAPP_URL } from "@/lib/constants";

type Service = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  visual: ServiceVisualType;
  bullets: string[];
  accent: "warm" | "sage" | "dusty" | "soft";
};

const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Logo Design & Brand Identity",
    subtitle: "A powerful logo is the foundation of every successful brand.",
    visual: "logo",
    accent: "warm",
    bullets: [
      "3 unique initial concepts",
      "Unlimited refinements until 100% satisfied",
      "Full brand colour palette (HEX, RGB, CMYK)",
      "Typography pairing - primary & secondary fonts",
      "Brand usage guidelines document",
      "Final files: PNG, JPG, SVG, PDF, AI",
      "Social media profile versions + monochrome variants",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Complete Brand Identity Package",
    subtitle: "A cohesive visual language for your entire business.",
    visual: "brand",
    accent: "sage",
    bullets: [
      "Everything in Logo Design, PLUS:",
      "Business card design (print-ready files)",
      "Letterhead & professional email signature",
      "5 customisable social media post templates",
      "Brand Style Guide (10-15 page PDF)",
      "WhatsApp Business profile banner",
      "Brand icon / favicon for digital use",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Website Design & Development",
    subtitle: "Your website is your most powerful sales tool - we build it right.",
    visual: "website",
    accent: "dusty",
    bullets: [
      "Custom design tailored to your brand and goals",
      "Mobile-first responsive - perfect on all devices",
      "Up to 8 pages: Home, About, Services, Portfolio, Blog, Contact",
      "Contact forms and WhatsApp click-to-chat integration",
      "Basic SEO setup: meta titles, descriptions, sitemap",
      "Google Analytics 4 integration",
      "Built on WordPress, Webflow, or static HTML - your choice",
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Website Launch & Go-Live Support",
    subtitle: "We handle every technical detail so your launch goes smoothly.",
    visual: "launch",
    accent: "soft",
    bullets: [
      "Domain DNS configuration and pointing (domain by client)",
      "Website deployment to chosen hosting (hosting by client)",
      "SSL certificate setup - HTTPS secure padlock",
      "Cross-browser and device compatibility testing",
      "30-day post-launch support for bugs and minor edits",
      "Handover session - full training included",
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Website Maintenance & Ongoing Support",
    subtitle: "Keep your website healthy, updated, and growing every month.",
    visual: "maintenance",
    accent: "warm",
    bullets: [
      "Monthly content updates: text, images, new pages",
      "Plugin and platform updates (WordPress / Webflow)",
      "Regular automated backups",
      "Uptime monitoring and rapid issue resolution",
      "Priority support via WhatsApp and email",
      "Monthly performance and traffic report",
    ],
  },
];

const accentText: Record<Service["accent"], string> = {
  warm: "text-accent-warm",
  sage: "text-accent-sage",
  dusty: "text-accent-dusty",
  soft: "text-accent-soft",
};

const accentLine: Record<Service["accent"], string> = {
  warm: "bg-accent-warm",
  sage: "bg-accent-sage",
  dusty: "bg-accent-dusty",
  soft: "bg-accent-soft",
};

function quoteUrl(title: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(`Hi, I'd like a quote for ${title}`)}`;
}

function ServiceCtaRow({ service, className = "" }: { service: Service; className?: string }) {
  return (
    <div
      data-service-cta
      className={`flex flex-col sm:flex-row sm:items-center gap-4 ${className}`}
    >
      <MagneticButton
        href={quoteUrl(service.title)}
        external
        className="btn-magnetic min-h-[48px] px-7 py-3.5 bg-brand-white text-brand-black font-semibold text-sm rounded-pill shadow-soft hover:shadow-card-hover transition-all w-full sm:w-auto justify-center"
      >
        Get a Quote →
      </MagneticButton>
      <Link
        href="/contact"
        className={`text-sm font-medium underline-offset-4 hover:underline text-center sm:text-left ${accentText[service.accent]}`}
      >
        Learn More
      </Link>
    </div>
  );
}

function ServiceEditorial({ service, includeCta = true }: { service: Service; includeCta?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
        <div className="min-w-0">
          <p
            data-service-subtitle
            className={`text-base md:text-lg leading-relaxed mb-8 ${accentText[service.accent]}`}
          >
            {service.subtitle}
          </p>

          <div data-service-deliverables>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-dim mb-4">
              What&apos;s included
            </p>
            <ul className="space-y-2.5">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  data-service-bullet
                  className="flex items-start gap-2.5 text-brand-silver text-sm md:text-[15px] leading-relaxed"
                >
                  <span className={`shrink-0 mt-0.5 text-xs ${accentText[service.accent]}`}>▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {includeCta && <ServiceCtaRow service={service} className="pt-8 pb-2" />}
        </div>

        <div data-service-visual className="relative flex items-center justify-center lg:sticky lg:top-8">
          <div className="w-full max-w-md" data-service-visual-inner>
            <ServiceVisual type={service.visual} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicePanel({ service }: { service: Service }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        data-panel-title
        className="pointer-events-none mx-auto flex w-full max-w-3xl shrink-0 flex-col items-center px-4 pt-2 sm:pt-4 text-center"
      >
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-dim">
          Service {service.number}
        </span>
        <div className={`mx-auto mt-4 h-px w-12 ${accentLine[service.accent]}`} aria-hidden />
        <h3 className="font-display font-bold text-brand-white text-[clamp(1.75rem,4.5vw,3.5rem)] mt-5 tracking-[-0.03em] leading-[1.08] text-balance">
          {service.title}
        </h3>
      </div>

      <div
        data-panel-content
        className="min-h-0 flex-1 overflow-y-auto scrollbar-hide opacity-0 will-change-transform"
      >
        <div className="mx-auto mt-6 sm:mt-8 w-full max-w-6xl pb-4">
          <ServiceEditorial service={service} includeCta={false} />
        </div>
      </div>

      <div
        data-panel-footer
        className="shrink-0 border-t border-brand-rule/50 bg-brand-black px-4 sm:px-6 pt-5 pb-6 sm:pb-7 opacity-0"
      >
        <div className="mx-auto w-full max-w-6xl">
          <ServiceCtaRow service={service} />
        </div>
      </div>
    </div>
  );
}

function ServicesFallback() {
  return (
    <div className="px-4 sm:px-6 md:px-8 pb-section space-y-20 max-w-4xl mx-auto">
      {services.map((service) => (
        <article key={service.id} className="space-y-6">
          <div className="text-center">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-dim">
              Service {service.number}
            </span>
            <h3 className="font-display font-bold text-brand-white text-2xl sm:text-3xl mt-3 tracking-[-0.03em]">
              {service.title}
            </h3>
          </div>
          <ServiceEditorial service={service} />
        </article>
      ))}
    </div>
  );
}

const INTRO_WEIGHT = 0.85;
const SERVICE_WEIGHT = 1;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [useFallback, setUseFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    registerGsap();

    const section = sectionRef.current;
    const pin = pinRef.current;
    const intro = introRef.current;
    const progress = progressRef.current;
    const progressFill = progressFillRef.current;

    if (!section || !pin || !intro || !progress) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(max-width: 1023px)").matches;

    if (reduced || coarse) {
      setUseFallback(true);
      return;
    }

    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length !== services.length) return;

    const ctx = gsap.context(() => {
      const totalUnits = INTRO_WEIGHT + services.length * SERVICE_WEIGHT;
      const totalScroll = window.innerHeight * totalUnits;
      const introEnd = INTRO_WEIGHT / totalUnits;
      let lastIndex = 0;

      gsap.set(intro, { opacity: 1, y: 0, scale: 1 });
      gsap.set(progress, { opacity: 1, y: 0 });
      if (progressFill) gsap.set(progressFill, { scaleX: 0 });

      panels.forEach((panel, i) => {
        const title = panel.querySelector("[data-panel-title]");
        const content = panel.querySelector("[data-panel-content]");
        const footer = panel.querySelector("[data-panel-footer]");
        const subtitle = panel.querySelector("[data-service-subtitle]");
        const bullets = panel.querySelectorAll("[data-service-bullet]");
        const deliverables = panel.querySelector("[data-service-deliverables]");
        const visual = panel.querySelector("[data-service-visual]");
        const visualInner = panel.querySelector("[data-service-visual-inner]");
        const cta = panel.querySelector("[data-service-cta]");

        gsap.set(panel, {
          opacity: 0,
          y: 0,
          pointerEvents: "none",
          zIndex: i + 1,
        });
        gsap.set(title, { opacity: 0, y: 56, scale: 1 });
        gsap.set(content, { opacity: 0, y: 48 });
        gsap.set(footer, { opacity: 0, y: 24 });
        gsap.set([subtitle, deliverables, visual, ...Array.from(bullets)], {
          opacity: 0,
          y: 32,
        });
        gsap.set(cta, { opacity: 0, y: 16 });
        if (visualInner) gsap.set(visualInner, { y: 24 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: pin,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressFill) {
              gsap.set(progressFill, { scaleX: p });
            }

            let idx = 0;
            if (p >= introEnd * 0.7) {
              const serviceProgress = (p - introEnd) / (1 - introEnd);
              idx = Math.min(
                services.length - 1,
                Math.max(0, Math.floor(serviceProgress * services.length)),
              );
            }

            if (idx !== lastIndex) {
              lastIndex = idx;
              setActiveIndex(idx);
            }
          },
        },
      });

      tl.to(intro, { opacity: 1, y: 0, duration: 0.12, ease: "none" }, 0);
      tl.to(
        intro,
        { opacity: 0, y: 56, scale: 0.98, duration: 0.22, ease: "power1.inOut" },
        introEnd * 0.3,
      );

      services.forEach((_, i) => {
        const panel = panels[i];
        if (!panel) return;

        const segStart = introEnd + (i / services.length) * (1 - introEnd);
        const segEnd = introEnd + ((i + 1) / services.length) * (1 - introEnd);
        const segLen = segEnd - segStart;

        const title = panel.querySelector("[data-panel-title]");
        const content = panel.querySelector("[data-panel-content]");
        const footer = panel.querySelector("[data-panel-footer]");
        const subtitle = panel.querySelector("[data-service-subtitle]");
        const bullets = panel.querySelectorAll("[data-service-bullet]");
        const deliverables = panel.querySelector("[data-service-deliverables]");
        const visual = panel.querySelector("[data-service-visual]");
        const visualInner = panel.querySelector("[data-service-visual-inner]");
        const cta = panel.querySelector("[data-service-cta]");

        const t = (fraction: number) => segStart + segLen * fraction;

        tl.set(panel, { opacity: 1, y: 0, pointerEvents: "auto" }, t(0));
        tl.fromTo(
          title,
          { opacity: 0, y: 56 },
          { opacity: 1, y: 0, duration: segLen * 0.2, ease: "power2.out" },
          t(0.04),
        );
        tl.to(title, { opacity: 1, y: 0, duration: segLen * 0.14, ease: "none" }, t(0.24));

        tl.fromTo(
          content,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: segLen * 0.2, ease: "power2.out" },
          t(0.36),
        );
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: segLen * 0.12, ease: "power2.out" },
          t(0.42),
        );
        tl.fromTo(
          deliverables,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: segLen * 0.1, ease: "power2.out" },
          t(0.48),
        );
        tl.fromTo(
          bullets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: segLen * 0.14,
            stagger: segLen * 0.01,
            ease: "power2.out",
          },
          t(0.52),
        );
        tl.fromTo(
          visual,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: segLen * 0.12, ease: "power2.out" },
          t(0.56),
        );
        if (visualInner) {
          tl.fromTo(
            visualInner,
            { y: 24 },
            { y: 0, duration: segLen * 0.14, ease: "power2.out" },
            t(0.6),
          );
        }
        tl.fromTo(
          footer,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: segLen * 0.14, ease: "power2.out" },
          t(0.58),
        );
        tl.fromTo(
          cta,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: segLen * 0.1, ease: "power2.out" },
          t(0.64),
        );

        if (i < services.length - 1) {
          tl.to(
            panel,
            { opacity: 0, y: 40, duration: segLen * 0.12, ease: "power1.in" },
            t(0.86),
          );
          tl.set(panel, { pointerEvents: "none" }, t(0.98));
          tl.set(title, { opacity: 0, y: 56, scale: 1 }, t(0.98));
          tl.set(content, { opacity: 0, y: 48 }, t(0.98));
          tl.set(footer, { opacity: 0, y: 24 }, t(0.98));
          tl.set([subtitle, deliverables, visual, cta, ...Array.from(bullets)], { opacity: 0, y: 32 }, t(0.98));
          if (visualInner) tl.set(visualInner, { y: 24 }, t(0.98));
        } else {
          tl.to({}, { duration: segLen * 0.1 }, t(0.78));
        }
      });

      gsap.to("[data-service-parallax]", {
        y: 24,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (useFallback) return;
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const active = i === activeIndex;
      gsap.to(dot, {
        scale: active ? 1.25 : 1,
        opacity: active ? 1 : 0.3,
        duration: 0.35,
        ease: "power2.out",
      });
    });
  }, [activeIndex, useFallback]);

  const progressLabel = services[activeIndex]?.title ?? services[0].title;

  return (
    <section ref={sectionRef} id="services" className="relative w-full bg-brand-black">
      {useFallback ? (
        <>
          <Container className="pt-section pb-10 md:pb-12">
            <div className="text-center mb-0">
              <p className="editorial-eyebrow mb-4 md:mb-5">Services</p>
              <h2 className="editorial-heading text-[clamp(2rem,5vw,3.75rem)] md:text-display-sm">
                What We Offer
              </h2>
              <p className="mt-5 md:mt-6 editorial-body text-base md:text-lg max-w-2xl leading-[1.75] mx-auto">
                Scroll to explore each service - one focused story at a time.
              </p>
            </div>
          </Container>
          <ServicesFallback />
        </>
      ) : (
        <div
          ref={pinRef}
          className="relative flex h-[calc(100dvh-7rem)] flex-col sm:h-[calc(100dvh-8rem)] md:h-[calc(100dvh-9rem)] overflow-x-clip bg-brand-black"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            aria-hidden
            data-service-parallax
          >
            <div className="floating-shape top-[10%] -left-24 h-64 w-64 bg-accent-sage/10 animate-float" />
            <div className="floating-shape bottom-[12%] -right-20 h-72 w-72 bg-accent-warm/8 animate-float-delayed" />
          </div>

          <div
            ref={introRef}
            className="absolute inset-0 z-30 flex items-center justify-center px-6"
          >
            <div className="text-center max-w-3xl w-full">
              <p className="editorial-eyebrow mb-4 md:mb-5">Services</p>
              <h2 className="editorial-heading text-[clamp(2rem,5vw,3.75rem)] md:text-display-sm">
                What We Offer
              </h2>
              <p className="mt-5 md:mt-6 editorial-body text-base md:text-lg max-w-2xl leading-[1.75] mx-auto text-brand-silver">
                Scroll to explore each service - one focused story at a time.
              </p>
            </div>
          </div>

          <div
            ref={progressRef}
            className="relative z-40 shrink-0 px-4 sm:px-6 pt-4 pb-3"
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-dim">
                  {`${String(activeIndex + 1).padStart(2, "0")} / ${String(services.length).padStart(2, "0")}`}
                </span>
                <span className="text-[11px] font-medium text-brand-silver truncate max-w-[55%] text-right">
                  {progressLabel}
                </span>
              </div>
              <div className="h-0.5 bg-brand-rule rounded-full overflow-hidden">
                <div
                  ref={progressFillRef}
                  className="h-full w-full origin-left bg-brand-white rounded-full"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {services.map((s, i) => (
                  <span
                    key={s.id}
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-brand-white opacity-30"
                    aria-hidden
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 min-h-0 flex-1">
            {services.map((service, i) => (
              <div
                key={service.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="absolute inset-0 flex flex-col opacity-0"
                aria-label={service.title}
                aria-hidden={activeIndex !== i}
              >
                <ServicePanel service={service} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
