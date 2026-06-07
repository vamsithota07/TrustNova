"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/motion/gsap-register";
import {
  industryCards,
  categoryAccents,
  accentTextClass,
  type IndustryCard,
} from "@/lib/industries";
import { WHATSAPP_URL } from "@/lib/constants";
import IndustryPreviewStage from "@/components/industries/IndustryPreviewStage";

function whatsappFor(industry: IndustryCard) {
  return (
    `${WHATSAPP_URL}?text=` +
    encodeURIComponent(`Hi, I'd like a website for my ${industry.name.toLowerCase()} business`)
  );
}

function InsightBlock({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent: keyof typeof accentTextClass;
}) {
  return (
    <div data-insight-block>
      <p
        className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${accentTextClass[accent]}`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function IndustryChapterContent({ industry, index }: { industry: IndustryCard; index: number }) {
  const accent = categoryAccents[industry.category];
  const Icon = industry.icon;

  return (
    <div className="flex h-full min-h-0 flex-col justify-center py-4">
      <div data-insight-meta className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-rule bg-brand-card ${accentTextClass[accent]}`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dim">
            Chapter {String(index + 1).padStart(2, "0")}
          </p>
          <p className={`text-xs font-medium ${accentTextClass[accent]}`}>{industry.category}</p>
        </div>
      </div>

      <h2
        data-insight-title
        className="mb-6 font-display text-[clamp(1.5rem,2.4vw,2.35rem)] font-bold leading-[1.06] tracking-[-0.03em] text-brand-white"
      >
        {industry.name}
      </h2>

      <div data-insight-body className="max-h-[min(42vh,420px)] space-y-5 overflow-y-auto scrollbar-hide pr-2">
        <InsightBlock label="Why this industry is different" accent={accent}>
          <p className="text-sm leading-[1.7] text-brand-silver">{industry.tagline}</p>
        </InsightBlock>

        <InsightBlock label="Recommended conversion strategy" accent={accent}>
          <p className="mb-1.5 text-sm font-semibold text-brand-white">
            {industry.specialFeature.title}
          </p>
          <p className="text-sm leading-[1.7] text-brand-silver">
            {industry.specialFeature.description}
          </p>
        </InsightBlock>

        <InsightBlock label="Key website features" accent={accent}>
          <ul className="space-y-2">
            {industry.needs.map((item) => (
              <li
                key={item}
                data-insight-item
                className="flex items-start gap-2 text-sm leading-[1.65] text-brand-silver"
              >
                <span className={`mt-0.5 shrink-0 text-[10px] ${accentTextClass[accent]}`}>▸</span>
                {item}
              </li>
            ))}
          </ul>
        </InsightBlock>

        <InsightBlock label="Expected user journey" accent={accent}>
          <p className="text-sm leading-[1.7] text-brand-silver">{industry.pages.join(" → ")}</p>
        </InsightBlock>
      </div>

      <div data-insight-cta className="mt-6 shrink-0">
        <Link
          href={whatsappFor(industry)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[46px] w-full items-center justify-center rounded-pill bg-brand-white px-5 text-sm font-semibold text-brand-black shadow-soft transition-shadow hover:shadow-card-hover sm:w-auto"
        >
          Build My {industry.name} Website →
        </Link>
      </div>
    </div>
  );
}

export default function IndustriesDesktopStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndustry = industryCards[activeIndex];
  const total = industryCards.length;

  useLayoutEffect(() => {
    registerGsap();

    const hero = heroRef.current;
    const showcase = showcaseRef.current;
    const pin = pinRef.current;
    const progressFill = progressFillRef.current;

    if (!hero || !showcase || !pin) return;

    const chapters = chapterRefs.current.filter(Boolean) as HTMLDivElement[];
    if (chapters.length !== total) return;

    let lastIndex = 0;

    const ctx = gsap.context(() => {
      const chapterScroll = window.innerHeight * total;

      gsap.set(hero, { opacity: 1, y: 0 });
      if (progressFill) gsap.set(progressFill, { scaleX: 0 });

      chapters.forEach((chapter, i) => {
        const preview = chapter.querySelector("[data-chapter-preview]") as HTMLElement | null;
        const content = chapter.querySelector("[data-chapter-content]") as HTMLElement | null;
        const meta = chapter.querySelector("[data-insight-meta]");
        const title = chapter.querySelector("[data-insight-title]");
        const body = chapter.querySelector("[data-insight-body]");
        const blocks = chapter.querySelectorAll("[data-insight-block]");
        const items = chapter.querySelectorAll("[data-insight-item]");
        const cta = chapter.querySelector("[data-insight-cta]");

        gsap.set(chapter, {
          opacity: i === 0 ? 1 : 0,
          pointerEvents: i === 0 ? "auto" : "none",
          zIndex: i + 1,
        });

        if (preview) {
          gsap.set(preview, {
            position: "absolute",
            top: 72,
            bottom: 24,
            left: "6%",
            right: "6%",
          });
        }

        if (content) {
          gsap.set(content, { opacity: 0, x: -56, pointerEvents: "none" });
        }
        gsap.set([meta, title, body, cta, ...Array.from(blocks), ...Array.from(items)], {
          opacity: 0,
          y: 28,
        });
      });

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const fade = 1 - self.progress;
          gsap.set(hero, {
            opacity: fade,
            y: self.progress * -40,
            pointerEvents: fade < 0.05 ? "none" : "auto",
          });
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: showcase,
          start: "top top",
          end: () => `+=${chapterScroll}`,
          pin: pin,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressFill) gsap.set(progressFill, { scaleX: self.progress });

            const idx = Math.min(
              total - 1,
              Math.max(0, Math.floor(self.progress * total)),
            );

            if (idx !== lastIndex) {
              lastIndex = idx;
              setActiveIndex(idx);
            }
          },
        },
      });

      chapters.forEach((chapter, i) => {
        const preview = chapter.querySelector("[data-chapter-preview]") as HTMLElement | null;
        const content = chapter.querySelector("[data-chapter-content]") as HTMLElement | null;
        const meta = chapter.querySelector("[data-insight-meta]");
        const title = chapter.querySelector("[data-insight-title]");
        const body = chapter.querySelector("[data-insight-body]");
        const blocks = chapter.querySelectorAll("[data-insight-block]");
        const items = chapter.querySelectorAll("[data-insight-item]");
        const cta = chapter.querySelector("[data-insight-cta]");

        const segStart = i / total;
        const segLen = 1 / total;
        const t = (f: number) => segStart + segLen * f;

        if (i > 0) {
          tl.set(chapter, { opacity: 1, pointerEvents: "auto" }, t(0));
          if (preview) {
            tl.set(preview, { top: 72, bottom: 24, left: "6%", right: "6%" }, t(0));
          }
          tl.set(content, { opacity: 0, x: -56, pointerEvents: "none" }, t(0));
          tl.set([meta, title, body, cta, ...Array.from(blocks), ...Array.from(items)], {
            opacity: 0,
            y: 28,
          }, t(0));
        }

        if (preview) {
          tl.to(
            preview,
            {
              top: 88,
              bottom: 32,
              left: "44%",
              right: "3%",
              duration: segLen * 0.22,
              ease: "power2.inOut",
            },
            t(0.32),
          );
        }

        if (content) {
          tl.to(content, { opacity: 1, x: 0, duration: segLen * 0.16, ease: "power2.out" }, t(0.36));
          tl.set(content, { pointerEvents: "auto" }, t(0.36));
        }

        tl.to(meta, { opacity: 1, y: 0, duration: segLen * 0.08, ease: "power2.out" }, t(0.4));
        tl.to(title, { opacity: 1, y: 0, duration: segLen * 0.1, ease: "power3.out" }, t(0.44));
        tl.to(
          blocks,
          { opacity: 1, y: 0, duration: segLen * 0.1, stagger: segLen * 0.02, ease: "power2.out" },
          t(0.5),
        );
        tl.to(
          items,
          { opacity: 1, y: 0, duration: segLen * 0.08, stagger: segLen * 0.006, ease: "power2.out" },
          t(0.58),
        );
        tl.to(body, { opacity: 1, y: 0, duration: segLen * 0.08, ease: "power2.out" }, t(0.52));
        tl.to(cta, { opacity: 1, y: 0, duration: segLen * 0.08, ease: "power2.out" }, t(0.66));

        if (i < total - 1) {
          tl.to(chapter, { opacity: 0, duration: segLen * 0.1, ease: "power1.in" }, t(0.9));
          tl.set(chapter, { pointerEvents: "none" }, t(0.98));
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [total]);

  return (
    <div ref={rootRef} className="bg-brand-black">
      <header
        ref={heroRef}
        className="relative z-10 flex h-[100dvh] flex-col items-center justify-center px-6 pt-28 sm:pt-32 md:pt-36"
      >
        <div className="max-w-3xl text-center">
          <p className="editorial-eyebrow mb-4 md:mb-5">Our Expertise</p>
          <h1 className="editorial-heading text-[clamp(2rem,5vw,3.75rem)] md:text-display-sm text-balance">
            Whatever Your Business,
            <br />
            We Know How to Build For It.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-silver md:mt-6 md:text-lg">
            Scroll to experience each industry website - preview first, then the strategy behind
            it.
          </p>
        </div>
        <p className="absolute bottom-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-dim">
          Scroll to begin
        </p>
      </header>

      <section ref={showcaseRef} className="relative bg-brand-black">
        <div ref={pinRef} className="relative h-[100dvh] overflow-hidden bg-brand-black">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-brand-black via-brand-black/95 to-transparent px-6 pb-6 pt-24 sm:px-10 sm:pt-28">
            <div className="mx-auto max-w-6xl">
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-dim">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="truncate text-[10px] font-medium text-brand-silver">
                  {activeIndustry?.name}
                </span>
              </div>
              <div className="h-0.5 overflow-hidden rounded-full bg-brand-rule">
                <div
                  ref={progressFillRef}
                  className="h-full w-full origin-left rounded-full bg-brand-white"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>

          {industryCards.map((industry, i) => (
            <div
              key={industry.id}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              className="absolute inset-0 opacity-0 pointer-events-none"
              aria-hidden={activeIndex !== i}
            >
              <div
                data-chapter-content
                className="absolute bottom-8 left-6 top-[5.5rem] z-30 w-[min(100%,40%)] sm:left-10"
              >
                <IndustryChapterContent industry={industry} index={i} />
              </div>

              <div
                data-chapter-preview
                className="absolute z-20 overflow-hidden rounded-2xl"
              >
                <IndustryPreviewStage
                  industryId={industry.id}
                  title={industry.name}
                  active={activeIndex === i}
                  className="h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
