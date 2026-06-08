"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap-register";
import Container from "@/components/Container";
import MagneticButton from "@/components/motion/MagneticButton";
import ServiceVisual, { type ServiceVisualType } from "@/components/services/ServiceVisuals";
import { WHATSAPP_URL } from "@/lib/constants";
import { shouldRenderNearby } from "@/lib/motion/performance";

const SERVICE_TINT_RGB = [
  "196, 103, 74",
  "122, 158, 135",
  "107, 143, 168",
  "154, 139, 180",
  "196, 103, 74",
];

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
    <div data-service-cta className={className}>
      <MagneticButton
        href={quoteUrl(service.title)}
        external
        className="btn-magnetic relative z-20 min-h-[48px] px-7 py-3.5 bg-brand-white text-brand-black font-semibold text-sm rounded-pill shadow-soft hover:shadow-card-hover transition-all w-full sm:w-auto justify-center"
      >
        Get a Quote →
      </MagneticButton>
    </div>
  );
}

function ServiceEditorial({
  service,
  includeCta = true,
  isActive = true,
}: {
  service: Service;
  includeCta?: boolean;
  isActive?: boolean;
}) {
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
            {isActive ? <ServiceVisual type={service.visual} active /> : (
              <div className="h-[260px] rounded-2xl border border-brand-rule bg-brand-dark/50" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicePanel({ service, isActive = false }: { service: Service; isActive?: boolean }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        data-panel-title
        className="pointer-events-none mx-auto flex w-full max-w-3xl shrink-0 flex-col items-center px-4 pt-2 sm:pt-4 text-center"
      >
        <span data-service-number className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-dim">
          Service {service.number}
        </span>
        <div
          data-accent-line
          className={`mx-auto mt-4 h-px w-0 max-w-[80px] ${accentLine[service.accent]}`}
          aria-hidden
        />
        <div className="mt-5 overflow-hidden">
          <h3
            data-service-name
            className="font-display font-bold text-brand-white text-[clamp(1.75rem,4.5vw,3.5rem)] tracking-[-0.03em] leading-[1.08] text-balance"
          >
            {service.title}
          </h3>
        </div>
        <p
          data-scroll-hint
          className="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-dim"
        >
          Scroll to know more
        </p>
      </div>

      <div
        data-panel-content
        className="min-h-0 flex-1 overflow-y-auto scrollbar-hide opacity-0 will-change-transform"
      >
        <div className="mx-auto mt-6 sm:mt-8 w-full max-w-6xl pb-4">
          <ServiceEditorial service={service} includeCta={false} isActive={isActive} />
        </div>
      </div>

      <div
        data-panel-footer
        className="relative z-20 shrink-0 border-t border-brand-rule/50 bg-brand-black px-4 sm:px-6 pt-5 pb-6 sm:pb-7 opacity-0"
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
  const spineLineRef = useRef<HTMLDivElement>(null);
  const bgTintRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spineDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
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
        const scrollHint = panel.querySelector("[data-scroll-hint]");
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
        gsap.set(scrollHint, { opacity: 0, y: 20 });
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

            if (bgTintRef.current) {
              const rgb = SERVICE_TINT_RGB[idx] ?? SERVICE_TINT_RGB[0];
              bgTintRef.current.style.background = `radial-gradient(ellipse at 30% 50%, rgba(${rgb}, 0.06), transparent 60%)`;
            }

            if (spineLineRef.current) {
              const spineH = 216 * ((idx + 1) / services.length);
              gsap.set(spineLineRef.current, { height: spineH });
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
      tl.set(intro, { pointerEvents: "none" }, introEnd * 0.3);

      services.forEach((_, i) => {
        const panel = panels[i];
        if (!panel) return;

        const segStart = introEnd + (i / services.length) * (1 - introEnd);
        const segEnd = introEnd + ((i + 1) / services.length) * (1 - introEnd);
        const segLen = segEnd - segStart;

        const title = panel.querySelector("[data-panel-title]");
        const serviceNumber = panel.querySelector("[data-service-number]");
        const accentLineEl = panel.querySelector("[data-accent-line]");
        const serviceName = panel.querySelector("[data-service-name]");
        const scrollHint = panel.querySelector("[data-scroll-hint]");
        const content = panel.querySelector("[data-panel-content]");
        const footer = panel.querySelector("[data-panel-footer]");
        const subtitle = panel.querySelector("[data-service-subtitle]");
        const bullets = panel.querySelectorAll("[data-service-bullet]");
        const deliverables = panel.querySelector("[data-service-deliverables]");
        const visual = panel.querySelector("[data-service-visual]");
        const visualInner = panel.querySelector("[data-service-visual-inner]");
        const cta = panel.querySelector("[data-service-cta]");
        const useBlur = window.innerWidth >= 768;

        const t = (fraction: number) => segStart + segLen * fraction;

        if (i > 0) {
          tl.fromTo(
            panel,
            { opacity: 0, y: 60, filter: useBlur ? "blur(4px)" : "blur(0px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: segLen * 0.14, ease: "power3.out" },
            t(0),
          );
        } else {
          tl.set(panel, { opacity: 1, y: 0, pointerEvents: "auto", filter: "blur(0px)" }, t(0));
        }
        tl.set(panel, { pointerEvents: "auto" }, t(0));
        tl.fromTo(
          serviceNumber,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: segLen * 0.12, ease: "power2.out" },
          t(0.04),
        );
        tl.fromTo(
          accentLineEl,
          { width: 0 },
          { width: 80, duration: segLen * 0.14, ease: "power2.out" },
          t(0.08),
        );
        tl.fromTo(
          serviceName,
          { opacity: 0, y: "100%" },
          { opacity: 1, y: 0, duration: segLen * 0.18, ease: "power3.out" },
          t(0.12),
        );
        tl.fromTo(
          title,
          { opacity: 0, y: 56 },
          { opacity: 1, y: 0, duration: segLen * 0.2, ease: "power2.out" },
          t(0.04),
        );
        tl.fromTo(
          scrollHint,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: segLen * 0.12, ease: "power2.out" },
          t(0.12),
        );
        tl.to(title, { opacity: 1, y: 0, duration: segLen * 0.14, ease: "none" }, t(0.24));
        tl.to(
          scrollHint,
          { opacity: 0, y: -12, duration: segLen * 0.1, ease: "power1.in" },
          t(0.34),
        );

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
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: segLen * 0.12,
            stagger: segLen * 0.008,
            ease: "power2.out",
          },
          t(0.52),
        );
        tl.fromTo(
          visual,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: segLen * 0.14, ease: "power2.out" },
          t(0.56),
        );
        if (visualInner) {
          tl.fromTo(
            visualInner,
            { y: 24, scale: 0.92 },
            { y: 0, scale: 1, duration: segLen * 0.14, ease: "power2.out" },
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
            {
              opacity: 0,
              y: -40,
              filter: useBlur ? "blur(4px)" : "blur(0px)",
              duration: segLen * 0.12,
              ease: "power1.in",
            },
            t(0.86),
          );
          tl.set(panel, { pointerEvents: "none" }, t(0.98));
          tl.set(title, { opacity: 0, y: 56, scale: 1 }, t(0.98));
          tl.set(scrollHint, { opacity: 0, y: 20 }, t(0.98));
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
    spineDotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const active = i === activeIndex;
      gsap.to(dot, {
        scale: active ? 1.35 : 1,
        backgroundColor: active ? "#C4674A" : "#DDDDDD",
        borderColor: active ? "#C4674A" : "rgba(196, 103, 74, 0.4)",
        duration: 0.4,
        ease: "back.out(2)",
      });
    });
  }, [activeIndex, useFallback]);

  const progressLabel = services[activeIndex]?.title ?? services[0].title;

  return (
    <section ref={sectionRef} id="services" className="relative w-full bg-brand-black">
      {useFallback ? (
        <>
          <Container className="pt-section pb-10 md:pb-12">
            <div className="relative text-center mb-0">
              <p className="editorial-eyebrow mb-4 md:mb-5">Services</p>
              <h2 className="editorial-heading text-[clamp(2rem,5vw,3.75rem)] md:text-display-sm">
                What We Offer
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-silver md:mt-6 md:text-lg">
                Scroll through each service to see what&apos;s included.
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
            ref={bgTintRef}
            className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-700"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-35"
            aria-hidden
            data-service-parallax
          >
            <div className="floating-shape top-[10%] -left-24 h-64 w-64 bg-accent-sage/10 animate-float" />
            <div className="floating-shape bottom-[12%] -right-20 h-72 w-72 bg-accent-warm/8 animate-float-delayed" />
          </div>

          <div
            className="pointer-events-none absolute left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex xl:left-10"
            style={{ height: 240 }}
          >
            <div className="relative flex h-full w-6 flex-col items-center">
              <div className="absolute top-3 bottom-3 w-0.5 rounded-full bg-brand-rule" />
              <div
                ref={spineLineRef}
                className="absolute top-3 w-0.5 origin-top rounded-full bg-accent-warm"
                style={{ height: 0 }}
              />
              {services.map((s, i) => (
                <div key={s.id} className="relative z-10 flex flex-1 items-center justify-center">
                  <span
                    ref={(el) => {
                      spineDotRefs.current[i] = el;
                    }}
                    data-spine-dot
                    className="h-2.5 w-2.5 rounded-full border-2 border-accent-warm/40 bg-brand-rule"
                    aria-hidden
                  />
                  {activeIndex === i && (
                    <span className="absolute left-5 top-1/2 max-w-[140px] -translate-y-1/2 truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-warm">
                      {s.title.split("&")[0].trim()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            ref={introRef}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6"
          >
            <div className="text-center max-w-3xl w-full">
              <p className="editorial-eyebrow mb-4 md:mb-5">Services</p>
              <h2 className="editorial-heading text-[clamp(2rem,5vw,3.75rem)] md:text-display-sm">
                What We Offer
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-silver md:mt-6 md:text-lg">
                Scroll through each service to see what&apos;s included.
              </p>
            </div>
            <p className="absolute bottom-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-dim">
              Scroll to begin
            </p>
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
                <ServicePanel
                  service={service}
                  isActive={shouldRenderNearby(activeIndex, i)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
