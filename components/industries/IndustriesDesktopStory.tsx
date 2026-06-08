"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/motion/gsap-register";
import {
  industryCards,
  getIndustryTintColor,
  type IndustryCard,
} from "@/lib/industries";
import { getMockupHtmlPath } from "@/lib/mockups";
import { hexToRgbString } from "@/lib/colors";
import { WHATSAPP_URL } from "@/lib/constants";

const TOTAL = industryCards.length;
const MOCKUP_W = 1440;
const MOCKUP_H = 900;

function whatsappFor(industry: IndustryCard) {
  return (
    `${WHATSAPP_URL}?text=` +
    encodeURIComponent(`Hi, I'd like a website for my ${industry.name.toLowerCase()} business`)
  );
}

function CoverBackground({
  industryId,
  visible,
}: {
  industryId: string;
  visible: boolean;
}) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      setScale(Math.max(window.innerWidth / MOCKUP_W, window.innerHeight / MOCKUP_H));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-[600ms] ease-out"
      style={{ opacity: visible ? 1 : 0, zIndex: visible ? 1 : 0 }}
      aria-hidden={!visible}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: MOCKUP_W,
          height: MOCKUP_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <iframe
          src={getMockupHtmlPath(industryId)}
          width={MOCKUP_W}
          height={MOCKUP_H}
          title={industryId}
          scrolling="no"
          className="block border-0"
          style={{ width: MOCKUP_W, height: MOCKUP_H, pointerEvents: "none" }}
        />
      </div>
    </div>
  );
}

function IndustryContent({ industry }: { industry: IndustryCard }) {
  const tint = getIndustryTintColor(industry.id);
  const rgb = hexToRgbString(tint);

  return (
    <div className="flex max-w-xl flex-col">
      <span
        className="mb-5 inline-flex w-fit rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{
          background: `rgba(${rgb}, 0.15)`,
          border: `1px solid rgba(${rgb}, 0.3)`,
          color: tint,
        }}
      >
        {industry.category}
      </span>
      <h2 className="mb-3 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
        {industry.name}
      </h2>
      <p className="mb-8 text-base text-white/65">{industry.tagline}</p>
      <ul className="space-y-2.5">
        {industry.needs.slice(0, 4).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
            <span className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-accent-warm" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IndustriesDesktopStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const activeIndustry = industryCards[activeIndex];
  const tintRgb = hexToRgbString(getIndustryTintColor(activeIndustry.id));

  const preloadIndices = [
    Math.max(0, activeIndex - 1),
    activeIndex,
    Math.min(TOTAL - 1, activeIndex + 1),
  ];

  useLayoutEffect(() => {
    registerGsap();

    const hero = heroRef.current;
    const heroContent = heroContentRef.current;
    const outer = outerRef.current;
    const pin = pinRef.current;
    const overlay = overlayRef.current;

    if (!hero || !heroContent || !outer || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(heroContent, {
            opacity: Math.max(0, 1 - self.progress * 2),
            y: self.progress * -60,
          });
          if (self.progress > 0.05) setHasScrolled(true);
        },
      });

      const scrollDistance = window.innerHeight * TOTAL;

      ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: pin,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(TOTAL - 1, Math.max(0, Math.floor(self.progress * TOTAL)));
          setActiveIndex(idx);
          if (self.progress > 0.01) setHasScrolled(true);

          const rgb = hexToRgbString(getIndustryTintColor(industryCards[idx].id));
          if (overlay) {
            overlay.style.setProperty("--tint-rgb", rgb);
          }
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-brand-black">
      <header
        ref={heroRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-[#F8F5EF] px-6 pt-28 sm:pt-32 md:pt-36"
      >
        <div ref={heroContentRef} className="max-w-3xl text-center">
          <p className="editorial-eyebrow mb-4 md:mb-5">Industries We Build For</p>
          <h1 className="editorial-heading text-balance text-[clamp(2rem,5vw,3.75rem)] text-brand-white md:text-display-sm">
            Whatever Your Business,
            <br />
            We Know How to Build For It.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-silver md:mt-6 md:text-lg">
            Scroll through 20 industries and see exactly what we&apos;d build for yours.
          </p>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-dim">
            Scroll to begin
          </p>
        </div>
      </header>

      <div ref={outerRef} style={{ height: `calc(${TOTAL} * 100dvh)` }}>
        <div ref={pinRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0806]">
          {/* Layer 1 — full-bleed mockup backgrounds */}
          <div className="absolute inset-0 z-0">
            {preloadIndices.map((i) => (
              <CoverBackground
                key={industryCards[i].id}
                industryId={industryCards[i].id}
                visible={i === activeIndex}
              />
            ))}
          </div>

          {/* Layer 2 — gradient overlay */}
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 z-[2] transition-[background] duration-600 ease-out"
            style={{
              background: `linear-gradient(to right, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.4) 55%, rgba(10,8,6,0) 100%), radial-gradient(ellipse at 20% 50%, rgba(${tintRgb}, 0.18), transparent 55%)`,
            }}
          />

          {/* Layer 3 — content panel */}
          <div className="absolute left-0 z-[3] flex h-full w-full max-w-[50%] flex-col justify-center pl-[clamp(40px,6vw,100px)] pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <IndustryContent industry={activeIndustry} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Layer 4 — progress indicator */}
          <div className="absolute right-10 top-8 z-[4] text-right">
            <div className="mb-1.5 text-[11px] uppercase tracking-[0.2em] text-white/40">
              {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndustry.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mb-2.5 text-[13px] font-medium text-white/75"
              >
                {activeIndustry.name}
              </motion.p>
            </AnimatePresence>
            <div className="flex justify-end gap-1">
              {industryCards.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-sm transition-all duration-300 ease-out"
                  style={{
                    width: i === activeIndex ? 20 : 4,
                    background: i === activeIndex ? "#C4674A" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Layer 5 — bottom CTA (mobile-hidden duplicate; main CTA in content) */}
          <AnimatePresence>
            <motion.div
              key={`cta-${activeIndustry.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-8 left-[clamp(40px,6vw,100px)] z-[4]"
            >
              <Link
                href={whatsappFor(activeIndustry)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-accent-warm px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(196,103,74,0.35)] transition-all hover:bg-[#B35B3F]"
              >
                Build My {activeIndustry.name} Website →
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hasScrolled ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute bottom-8 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-lg text-white/40"
            >
              ↓
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
