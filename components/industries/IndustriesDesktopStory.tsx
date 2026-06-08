"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/motion/gsap-register";
import { getLenisInstance } from "@/lib/motion/lenis";
import {
  industryCards,
  getIndustryTintColor,
  type IndustryCard,
} from "@/lib/industries";
import {
  getMockupHtmlPath,
  MOCKUP_HEIGHT,
  MOCKUP_WIDTH,
} from "@/lib/mockups";
import { hexToRgbString } from "@/lib/colors";
import { WHATSAPP_URL } from "@/lib/constants";
import IndustriesScrollRail from "@/components/industries/IndustriesScrollRail";

const TOTAL = industryCards.length;
const SCRUB = 0.8;

function whatsappFor(industry: IndustryCard) {
  return (
    `${WHATSAPP_URL}?text=` +
    encodeURIComponent(`Hi, I'd like a website for my ${industry.name.toLowerCase()} business`)
  );
}

function MockupIframe({ industryId }: { industryId: string }) {
  const scalerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scalerRef.current;
    if (!el) return;

    const update = () => {
      const scale = Math.max(
        window.innerWidth / MOCKUP_WIDTH,
        window.innerHeight / MOCKUP_HEIGHT
      );
      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#080604]">
      <div
        ref={scalerRef}
        className="iframe-scaler absolute left-1/2 top-1/2 will-change-transform"
        style={{
          width: MOCKUP_WIDTH,
          height: MOCKUP_HEIGHT,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <iframe
          src={getMockupHtmlPath(industryId)}
          width={MOCKUP_WIDTH}
          height={MOCKUP_HEIGHT}
          title={industryId}
          scrolling="no"
          loading="lazy"
          className="block border-0"
          style={{
            width: MOCKUP_WIDTH,
            height: MOCKUP_HEIGHT,
            border: "none",
            display: "block",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

function IndustryPanel({ industry }: { industry: IndustryCard }) {
  const tint = getIndustryTintColor(industry.id);
  const rgb = hexToRgbString(tint);
  const features = industry.needs.slice(0, 4);

  return (
    <div className="max-w-[480px]">
      <span
        data-panel-category
        className="mb-5 inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{
          background: `rgba(${rgb}, 0.18)`,
          border: `1px solid rgba(${rgb}, 0.35)`,
          color: tint,
        }}
      >
        {industry.category}
      </span>

      <h2
        data-panel-title
        className="mb-3.5 font-display text-[clamp(1.9rem,3.8vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white"
      >
        {industry.name}
      </h2>

      <p
        data-panel-tagline
        className="mb-8 max-w-md text-[15px] leading-[1.7] text-white/60"
      >
        {industry.tagline}
      </p>

      <ul data-panel-features className="mb-9 space-y-2.5">
        {features.map((feature) => (
          <li
            key={feature}
            data-panel-feature
            className="flex items-start gap-2.5 text-sm text-white/78"
          >
            <span className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-accent-warm" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        data-panel-cta
        href={whatsappFor(industry)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-accent-warm px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(196,103,74,0.35)] transition-colors hover:bg-[#B35B3F]"
      >
        Build My {industry.name} Website →
      </Link>
    </div>
  );
}

function expandPreload(center: number) {
  const next = new Set<number>();
  for (let i = center - 1; i <= center + 1; i += 1) {
    if (i >= 0 && i < TOTAL) next.add(i);
  }
  return next;
}

function scrollDistance() {
  return TOTAL * window.innerHeight;
}

export default function IndustriesDesktopStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const mockupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gradientRef = useRef<HTMLDivElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(
    () => expandPreload(0)
  );

  const activeIndustry = industryCards[activeIndex];

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    registerGsap();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let ctx: gsap.Context | null = null;
    let cancelled = false;
    let lastIndex = 0;
    let lenisAttempts = 0;

    const setup = () => {
      if (cancelled) return;

      if (!reducedMotion && !getLenisInstance()) {
        lenisAttempts += 1;
        if (lenisAttempts < 90) {
          requestAnimationFrame(setup);
          return;
        }
      }

      const intro = introRef.current;
      const introContent = introContentRef.current;
      const story = storyRef.current;
      const stage = stageRef.current;
      const scrollTrack = scrollTrackRef.current;
      const gradient = gradientRef.current;
      const tint = tintRef.current;
      if (
        !intro ||
        !introContent ||
        !story ||
        !stage ||
        !scrollTrack ||
        !gradient ||
        !tint
      ) {
        return;
      }

      ctx = gsap.context(() => {
        mockupRefs.current.forEach((mockup, i) => {
          if (mockup) gsap.set(mockup, { opacity: i === 0 ? 1 : 0 });
          if (parallaxRefs.current[i]) {
            gsap.set(parallaxRefs.current[i], { y: "0%", scale: 1 });
          }
        });

        contentRefs.current.forEach((panel) => {
          if (!panel) return;
          gsap.set(panel, { opacity: 0, y: 48, pointerEvents: "none" });
          const title = panel.querySelector("[data-panel-title]");
          const tagline = panel.querySelector("[data-panel-tagline]");
          const category = panel.querySelector("[data-panel-category]");
          const features = panel.querySelector("[data-panel-features]");
          const cta = panel.querySelector("[data-panel-cta]");
          gsap.set([title, tagline, category, features, cta], {
            opacity: 0,
            y: 28,
          });
        });

        gsap.set(gradient, { opacity: 0 });

        if (!reducedMotion) {
          gsap.to(introContent, {
            opacity: 0,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: intro,
              start: "top top",
              end: "bottom top",
              scrub: SCRUB,
            },
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: story,
            start: "top top",
            end: () => `+=${scrollDistance()}`,
            pin: stage,
            scrub: reducedMotion ? false : SCRUB,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setStoryProgress(self.progress);

              const idx = Math.min(
                TOTAL - 1,
                Math.max(0, Math.floor(self.progress * TOTAL))
              );

              const rgb = hexToRgbString(
                getIndustryTintColor(industryCards[idx].id)
              );
              tint.style.background = `radial-gradient(ellipse at 22% 48%, rgba(${rgb}, 0.24), transparent 58%)`;

              if (idx !== lastIndex) {
                lastIndex = idx;
                setActiveIndex(idx);
                setLoadedIndexes(expandPreload(idx));
              }
            },
          },
        });

        industryCards.forEach((_, i) => {
          const mockup = mockupRefs.current[i];
          const parallax = parallaxRefs.current[i];
          const content = contentRefs.current[i];
          const nextMockup =
            i < TOTAL - 1 ? mockupRefs.current[i + 1] : null;
          const nextParallax =
            i < TOTAL - 1 ? parallaxRefs.current[i + 1] : null;

          if (!mockup || !parallax || !content) return;

          const segStart = i / TOTAL;
          const segEnd = (i + 1) / TOTAL;
          const segLen = segEnd - segStart;
          const t = (fraction: number) => segStart + segLen * fraction;

          const title = content.querySelector("[data-panel-title]");
          const tagline = content.querySelector("[data-panel-tagline]");
          const category = content.querySelector("[data-panel-category]");
          const features = content.querySelector("[data-panel-features]");
          const featureItems = content.querySelectorAll("[data-panel-feature]");
          const cta = content.querySelector("[data-panel-cta]");

          if (i === 0) {
            tl.set(mockup, { opacity: 1 }, 0);
            tl.set(parallax, { y: "0%", scale: 1 }, 0);
          } else {
            tl.set(mockup, { opacity: 1, y: 0 }, t(0));
            tl.set(parallax, { y: "0%", scale: 1 }, t(0));
          }

          tl.set(content, { opacity: 0, y: 48, pointerEvents: "none" }, t(0));
          tl.set(gradient, { opacity: 0 }, t(0));

          // Phase 1 — mockup hero (hold)
          tl.to(
            mockup,
            { opacity: 1, duration: segLen * 0.22, ease: "none" },
            t(0.02)
          );
          tl.to(
            parallax,
            { y: "0%", scale: 1, duration: segLen * 0.22, ease: "none" },
            t(0.02)
          );

          // Phase 2 — mockup recedes, content enters
          tl.to(
            mockup,
            { opacity: 0.32, duration: segLen * 0.16, ease: "power1.inOut" },
            t(0.28)
          );
          tl.to(
            parallax,
            { y: "-2%", scale: 0.97, duration: segLen * 0.16, ease: "power1.inOut" },
            t(0.28)
          );
          tl.fromTo(
            gradient,
            { opacity: 0 },
            { opacity: 1, duration: segLen * 0.14, ease: "power1.inOut" },
            t(0.30)
          );
          tl.fromTo(
            content,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: segLen * 0.18,
              ease: "power2.out",
            },
            t(0.32)
          );
          tl.set(content, { pointerEvents: "auto" }, t(0.32));
          tl.fromTo(
            category,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: segLen * 0.1, ease: "power2.out" },
            t(0.36)
          );
          tl.fromTo(
            title,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: segLen * 0.12, ease: "power3.out" },
            t(0.40)
          );
          tl.fromTo(
            tagline,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: segLen * 0.1, ease: "power2.out" },
            t(0.44)
          );
          tl.fromTo(
            features,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: segLen * 0.1, ease: "power2.out" },
            t(0.48)
          );
          tl.fromTo(
            featureItems,
            { opacity: 0, x: -12 },
            {
              opacity: 1,
              x: 0,
              duration: segLen * 0.1,
              stagger: segLen * 0.006,
              ease: "power2.out",
            },
            t(0.50)
          );
          tl.fromTo(
            cta,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: segLen * 0.1, ease: "power2.out" },
            t(0.56)
          );

          // Phase 3 — hold content
          tl.to(
            content,
            { opacity: 1, duration: segLen * 0.14, ease: "none" },
            t(0.60)
          );

          // Phase 4 — content exits, next mockup enters
          tl.to(
            content,
            { opacity: 0, y: -28, duration: segLen * 0.14, ease: "power1.in" },
            t(0.76)
          );
          tl.set(content, { pointerEvents: "none" }, t(0.90));
          tl.to(
            gradient,
            { opacity: 0, duration: segLen * 0.12, ease: "power1.in" },
            t(0.78)
          );
          tl.to(
            mockup,
            { opacity: 0, duration: segLen * 0.14, ease: "power1.in" },
            t(0.80)
          );
          tl.to(
            parallax,
            { y: "-5%", scale: 0.95, duration: segLen * 0.14, ease: "power1.in" },
            t(0.80)
          );

          if (nextMockup && nextParallax) {
            tl.set(nextMockup, { opacity: 0 }, t(0.82));
            tl.set(nextParallax, { y: "4%", scale: 1.02 }, t(0.82));
            tl.fromTo(
              nextMockup,
              { opacity: 0 },
              { opacity: 1, duration: segLen * 0.14, ease: "power2.out" },
              t(0.86)
            );
            tl.fromTo(
              nextParallax,
              { y: "4%", scale: 1.02 },
              { y: "0%", scale: 1, duration: segLen * 0.14, ease: "power2.out" },
              t(0.86)
            );
          }

          if (i < TOTAL - 1) {
            tl.set(mockup, { opacity: 0, y: 0 }, t(0.98));
            tl.set(parallax, { y: "0%", scale: 1 }, t(0.98));
            tl.set(
              [title, tagline, category, features, cta, ...Array.from(featureItems)],
              { opacity: 0, y: 28 },
              t(0.98)
            );
          }
        });
      }, rootRef);

      ScrollTrigger.refresh();
    };

    const handleResize = () => {
      document.querySelectorAll<HTMLElement>(".iframe-scaler").forEach((el) => {
        const scale = Math.max(
          window.innerWidth / MOCKUP_WIDTH,
          window.innerHeight / MOCKUP_HEIGHT
        );
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      });
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    setup();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full bg-brand-black">
      <section
        ref={introRef}
        className="relative z-[5] flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#F8F5EF] px-10 text-center"
      >
        <div ref={introContentRef} className="max-w-[700px]">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-warm">
            Industries We Build For
          </p>
          <h1 className="mb-5 font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-brand-white">
            Whatever Your Business,
            <br />
            We Know How to Build For It.
          </h1>
          <p className="mb-14 text-base text-brand-silver">
            Scroll to explore {TOTAL} industries
          </p>
          <div className="animate-tn-bounce flex flex-col items-center gap-2">
            <div className="h-[60px] w-px bg-gradient-to-b from-accent-warm to-transparent" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-warm">
              Scroll
            </span>
          </div>
        </div>
      </section>

      <div ref={storyRef} className="relative bg-[#080604]">
        <div
          ref={stageRef}
          className="relative z-10 h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-[#080604]"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            {industryCards.map((industry, i) => (
              <div
                key={industry.id}
                ref={(el) => {
                  mockupRefs.current[i] = el;
                }}
                className="absolute inset-0 overflow-hidden will-change-[opacity]"
                style={{ opacity: i === 0 ? 1 : 0 }}
                aria-hidden={i !== activeIndex}
              >
                <div
                  ref={(el) => {
                    parallaxRefs.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  {loadedIndexes.has(i) && (
                    <MockupIframe industryId={industry.id} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            ref={tintRef}
            className="pointer-events-none absolute inset-0 z-[1] transition-[background] duration-500"
            style={{
              background: `radial-gradient(ellipse at 22% 48%, rgba(${hexToRgbString(getIndustryTintColor(activeIndustry.id))}, 0.24), transparent 58%)`,
            }}
          />

          <div
            ref={gradientRef}
            className="pointer-events-none absolute inset-0 z-[2] opacity-0"
            style={{
              background:
                "linear-gradient(to right, rgba(8,6,4,0.94) 0%, rgba(8,6,4,0.78) 40%, rgba(8,6,4,0.28) 68%, transparent 100%)",
            }}
          />

          {industryCards.map((industry, i) => (
            <div
              key={industry.id}
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="pointer-events-none absolute left-0 top-0 z-[3] flex h-full w-1/2 max-w-[50%] flex-col justify-center pl-[clamp(40px,7vw,120px)] pr-8 opacity-0"
              aria-hidden={i !== activeIndex}
            >
              <IndustryPanel industry={industry} />
            </div>
          ))}

          <div className="pointer-events-none absolute right-10 top-8 z-[10] text-right">
            <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/40">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(TOTAL).padStart(2, "0")}
            </div>
            <p className="max-w-[180px] truncate text-[13px] font-medium text-white/75">
              {activeIndustry.name}
            </p>
          </div>

          <IndustriesScrollRail
            progress={storyProgress}
            activeIndex={activeIndex}
          />

          <p className="pointer-events-none absolute bottom-8 left-1/2 z-[10] -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
            Scroll to explore
          </p>
        </div>

        <div
          ref={scrollTrackRef}
          className="pointer-events-none"
          style={{ height: `${TOTAL * 100}dvh` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
