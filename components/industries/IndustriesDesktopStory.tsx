"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/motion/gsap-register";
import { getLenisInstance } from "@/lib/motion/lenis";
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
const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 50;

function whatsappFor(industry: IndustryCard) {
  return (
    `${WHATSAPP_URL}?text=` +
    encodeURIComponent(`Hi, I'd like a website for my ${industry.name.toLowerCase()} business`)
  );
}

function CoverBackground({
  industryId,
  index,
}: {
  industryId: string;
  index: number;
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
      id={`industry-bg-${index}`}
      className="pointer-events-none absolute inset-0"
      style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 1 : 0 }}
      aria-hidden={index !== 0}
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

function expandLoadedIndices(indices: number[], center: number) {
  const next = new Set(indices);
  next.add(center);
  if (center > 0) next.add(center - 1);
  if (center < TOTAL - 1) next.add(center + 1);
  return Array.from(next)
    .filter((i) => i >= 0 && i < TOTAL)
    .sort((a, b) => a - b);
}

export default function IndustriesDesktopStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const storyWrapperRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressNameRef = useRef<HTMLParagraphElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0, 1]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isStoryVisible, setIsStoryVisible] = useState(false);

  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isStoryActiveRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchHandledRef = useRef(false);

  const activeIndustry = industryCards[activeIndex];
  const tintRgb = hexToRgbString(getIndustryTintColor(activeIndustry.id));

  const updateOverlayTint = useCallback((index: number) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const rgb = hexToRgbString(getIndustryTintColor(industryCards[index].id));
    overlay.style.setProperty("--tint-rgb", rgb);
  }, []);

  const releaseStory = useCallback((direction: "up" | "down") => {
    isStoryActiveRef.current = false;
    if (direction === "up") {
      setIsStoryVisible(false);
    }
    getLenisInstance()?.start();

    const lenis = getLenisInstance();
    if (direction === "up" && heroRef.current) {
      lenis?.scrollTo(heroRef.current, { duration: 0.9 });
      return;
    }

    if (direction === "down" && storyWrapperRef.current) {
      const exitTarget =
        storyWrapperRef.current.offsetTop + storyWrapperRef.current.offsetHeight + 8;
      lenis?.scrollTo(exitTarget, { duration: 0.9 });
    }
  }, []);

  const goToIndustry = useCallback(
    (newIndex: number) => {
      if (isAnimatingRef.current) return;
      if (newIndex < 0 || newIndex >= TOTAL) return;

      const currentIndex = activeIndexRef.current;
      if (newIndex === currentIndex) return;

      isAnimatingRef.current = true;
      setHasScrolled(true);

      const direction = newIndex > currentIndex ? 1 : -1;

      flushSync(() => {
        setLoadedIndices((prev) => expandLoadedIndices(prev, newIndex));
      });

      const contentEl = contentRef.current;
      const ctaEl = ctaRef.current;
      const progressNameEl = progressNameRef.current;
      const currentBg = document.getElementById(`industry-bg-${currentIndex}`);
      const newBg = document.getElementById(`industry-bg-${newIndex}`);

      const exitTargets = [contentEl, ctaEl, progressNameEl].filter(Boolean) as Element[];

      gsap.to(exitTargets, {
        opacity: 0,
        y: direction * -40,
        duration: 0.35,
        ease: "power2.in",
      });

      if (currentBg) {
        gsap.to(currentBg, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
      }

      if (newBg) {
        gsap.set(newBg, { zIndex: 2 });
        gsap.to(newBg, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
      }

      window.setTimeout(() => {
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
        updateOverlayTint(newIndex);

        if (currentBg) {
          gsap.set(currentBg, { zIndex: 0 });
        }

        gsap.fromTo(
          exitTargets,
          { opacity: 0, y: direction * 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          }
        );
      }, 350);
    },
    [updateOverlayTint]
  );

  const handleWheelIntent = useCallback(
    (delta: number) => {
      if (!isStoryActiveRef.current || isAnimatingRef.current) return false;

      if (Math.abs(delta) < WHEEL_THRESHOLD) return false;

      const currentIndex = activeIndexRef.current;

      if (delta > 0) {
        if (currentIndex < TOTAL - 1) {
          goToIndustry(currentIndex + 1);
          return true;
        }
        releaseStory("down");
        return true;
      }

      if (delta < 0) {
        if (currentIndex > 0) {
          goToIndustry(currentIndex - 1);
          return true;
        }
        releaseStory("up");
        return true;
      }

      return true;
    },
    [goToIndustry, releaseStory]
  );

  useLayoutEffect(() => {
    registerGsap();
    updateOverlayTint(0);

    const hero = heroRef.current;
    const introContent = introContentRef.current;
    const storyWrapper = storyWrapperRef.current;

    if (!hero || !introContent || !storyWrapper) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const activateStory = () => {
      isStoryActiveRef.current = true;
      setIsStoryVisible(true);
      setHasScrolled(true);
      getLenisInstance()?.stop();
    };

    const deactivateStory = () => {
      isStoryActiveRef.current = false;
      setIsStoryVisible(false);
      getLenisInstance()?.start();
    };

    const ctx = gsap.context(() => {
      gsap.to(introContent, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: storyWrapper,
        start: "top top",
        end: "bottom top",
        onEnter: activateStory,
        onEnterBack: activateStory,
        onLeaveBack: deactivateStory,
        onLeave: deactivateStory,
      });
    }, rootRef);

    return () => ctx.revert();
  }, [updateOverlayTint]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    setLoadedIndices((prev) => expandLoadedIndices(prev, activeIndex));
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (!isStoryActiveRef.current) return;

      const consumed = handleWheelIntent(event.deltaY);
      if (consumed) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!isStoryActiveRef.current) return;
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
      touchHandledRef.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isStoryActiveRef.current || touchHandledRef.current) return;

      const touchY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - touchY;

      if (Math.abs(delta) < TOUCH_THRESHOLD) return;

      event.preventDefault();
      touchHandledRef.current = true;
      handleWheelIntent(delta);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      getLenisInstance()?.start();
    };
  }, [handleWheelIntent]);

  return (
    <div ref={rootRef} className="relative bg-brand-black">
      <section
        ref={heroRef}
        className="relative z-10 flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#F8F5EF] px-6"
      >
        <div ref={introContentRef} className="max-w-3xl pt-24 text-center sm:pt-28 md:pt-32">
          <p className="editorial-eyebrow mb-4 md:mb-5">Industries We Build For</p>
          <h1 className="editorial-heading text-balance text-[clamp(2rem,5vw,3.75rem)] text-brand-white md:text-display-sm">
            Whatever Your Business,
            <br />
            We Know How to Build For It.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-silver md:mt-6 md:text-lg">
            Scroll through 20 industries and see exactly what we&apos;d build for yours.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: hasScrolled ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-dim"
          >
            Scroll to begin
          </motion.p>
        </div>
      </section>

      <section ref={storyWrapperRef} className="relative z-[1] h-[100dvh] bg-brand-black">
        <div
          ref={containerRef}
          className={`sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#0a0806] transition-opacity duration-300 ${
            isStoryVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="absolute inset-0 z-0">
            {loadedIndices.map((i) => (
              <CoverBackground
                key={industryCards[i].id}
                industryId={industryCards[i].id}
                index={i}
              />
            ))}
          </div>

          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 z-[1] transition-[background] duration-600 ease-out"
            style={{
              background: `linear-gradient(to right, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.4) 55%, rgba(10,8,6,0) 100%), radial-gradient(ellipse at 20% 50%, rgba(${tintRgb}, 0.18), transparent 55%)`,
              ["--tint-rgb" as string]: tintRgb,
            }}
          />

          <div className="absolute left-0 z-[2] flex h-full w-full max-w-[50%] flex-col justify-between py-[clamp(40px,8vh,80px)] pl-[clamp(40px,6vw,100px)] pr-8">
            <div className="flex flex-1 flex-col justify-center">
              <div ref={contentRef} className="industry-content">
                <IndustryContent industry={activeIndustry} />
              </div>
            </div>

            <div ref={ctaRef} className="industry-content shrink-0 pt-6">
              <Link
                href={whatsappFor(activeIndustry)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-accent-warm px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(196,103,74,0.35)] transition-all hover:bg-[#B35B3F]"
              >
                Build My {activeIndustry.name} Website →
              </Link>
            </div>
          </div>

          <div className="absolute right-10 top-8 z-[3] text-right">
            <div className="mb-1.5 text-[11px] uppercase tracking-[0.2em] text-white/40">
              {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </div>
            <p
              ref={progressNameRef}
              className="mb-2.5 text-[13px] font-medium text-white/75"
            >
              {activeIndustry.name}
            </p>
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
        </div>
      </section>

      <div className="h-[40dvh] bg-brand-black" aria-hidden />
    </div>
  );
}
