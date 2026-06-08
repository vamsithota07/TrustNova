"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap-register";
import { btnPrimary, btnSecondary, WHATSAPP_URL } from "@/lib/constants";
import MagneticButton from "@/components/motion/MagneticButton";

const services = [
  "Logo Design & Brand Identity",
  "Brand Identity Package",
  "Website Design & Development",
  "Launch & Maintenance Support",
];

const marqueeItems = [
  "Logo Design",
  "Brand Identity",
  "Website Development",
  "Visual Strategy",
  "Go-Live Support",
  "Brand Style Guides",
  "SEO Setup",
  "Mobile-First Design",
];

const headlineLines = [
  { text: "Your Brand.", accent: false },
  { text: "Your Trust.", accent: false },
  { text: "Your Growth.", accent: true },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lines = linesRef.current?.querySelectorAll("[data-hero-line]");
      if (!lines?.length) return;

      try {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(eyebrowRef.current, { opacity: 0, y: 20, duration: 0.7 })
          .from(lines, { opacity: 0, y: "110%", duration: 1, stagger: 0.11, ease: "power4.out" }, "-=0.35")
          .from(copyRef.current, { opacity: 0, y: 32, duration: 0.85 }, "-=0.5")
          .from(ctaRef.current?.children ?? [], { opacity: 0, y: 24, duration: 0.75, stagger: 0.08 }, "-=0.55")
          .from(cardRef.current, { opacity: 0, y: 60, duration: 1.1, ease: "back.out(1.2)" }, "-=0.65")
          .from(marqueeRef.current, { opacity: 0, y: 16, duration: 0.7 }, "-=0.4");

        [blob1Ref, blob2Ref].forEach((ref, i) => {
          if (!ref.current) return;
          gsap.to(ref.current, {
            x: `random(${i === 0 ? -60 : -40}, ${i === 0 ? 60 : 40})`,
            y: `random(${i === 0 ? -40 : -24}, ${i === 0 ? 40 : 24})`,
            duration: `random(8, 14)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 3,
          });
        });

        gsap.to(blob1Ref.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: -80,
          opacity: 0.3,
        });
      } catch (error) {
        console.warn("Hero animation skipped:", error);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-dot-grid relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-brand-black pt-28 sm:pt-32 md:pt-36"
    >
      <div
        ref={blob1Ref}
        className="floating-shape -top-16 right-[8%] h-72 w-72 bg-accent-warm/[0.08] mix-blend-multiply"
        aria-hidden
      />
      <div
        ref={blob2Ref}
        className="floating-shape bottom-[20%] -left-20 h-56 w-56 bg-accent-warm/[0.08] mix-blend-multiply"
        aria-hidden
      />
      <div className="relative z-10 flex flex-1 w-full items-center justify-center py-12 md:py-16 lg:py-20">
        <div
          className="hero-grid mx-auto grid w-full grid-cols-1 items-start gap-[clamp(24px,3vw,48px)] px-[clamp(20px,4vw,48px)] lg:max-w-[1040px] lg:grid-cols-[1fr_300px] lg:gap-8 min-[1441px]:max-w-[1180px] min-[1441px]:grid-cols-[1fr_320px]"
        >
          <div className="order-1 w-full min-w-0">
            <span
              ref={eyebrowRef}
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 md:mb-10 editorial-eyebrow border border-brand-rule rounded-pill bg-brand-card/80 shadow-soft backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-accent-warm shrink-0" />
              India&apos;s Premier Brand & Creative Studio
            </span>

            <div ref={linesRef} className="mb-8 md:mb-10 space-y-1 md:space-y-2 overflow-hidden">
              {headlineLines.map((line) => (
                <div key={line.text} className="overflow-hidden py-0.5">
                  <h1
                    data-hero-line
                    className={`font-display font-bold leading-[0.95] tracking-[-0.05em] text-[clamp(2.5rem,5.5vw,7rem)] ${
                      line.accent ? "text-accent-warm" : "text-brand-white"
                    }`}
                  >
                    {line.text}
                  </h1>
                </div>
              ))}
            </div>

            <p
              ref={copyRef}
              className="editorial-body text-base lg:text-xl mb-10 md:mb-12 max-w-xl leading-[1.75]"
            >
              We design logos that stop the scroll, build identities that command
              respect, and create websites that convert visitors into clients.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-4 w-full min-w-0">
              <MagneticButton href={WHATSAPP_URL} external className={btnPrimary}>
                <span className="relative z-[1]">Start Your Project →</span>
              </MagneticButton>
              <MagneticButton href="/services" className={btnSecondary}>
                <span className="relative z-[1]">View Our Services</span>
              </MagneticButton>
            </div>
          </div>

          <div
            ref={cardRef}
            className="hero-card order-2 w-full shrink-0 lg:mt-[4.75rem] lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px] min-[1441px]:mt-20 min-[1441px]:w-[320px] min-[1441px]:min-w-[320px] min-[1441px]:max-w-[320px]"
          >
            <div className="hero-services-card creative-card box-border w-full overflow-hidden p-6 transition-all duration-700 ease-premium hover:shadow-card-hover">
              <p className="editorial-eyebrow mb-4">What we do</p>
              <h2 className="mb-5 font-display text-lg font-bold tracking-[-0.03em] text-brand-white">
                Our Services
              </h2>
              <ul className="space-y-3">
                {services.map((title, i) => (
                  <li key={title} className="group flex min-w-0 items-start gap-3 transition-all duration-200 hover:translate-x-1">
                    <span className="mt-0.5 shrink-0 text-[11px] font-semibold text-brand-dim tabular-nums transition-transform duration-200 group-hover:scale-110">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] font-medium leading-[1.4] text-brand-white transition-colors duration-300 group-hover:text-accent-warm">
                      {title}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-brand-rule pt-5">
                <p className="flex min-w-0 items-center justify-center gap-2 whitespace-nowrap text-xs tracking-wide text-brand-silver md:justify-start">
                  <span
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#27AE60]"
                    style={{ animation: "status-pulse 2s ease-in-out infinite" }}
                    aria-hidden
                  />
                  Based in Hyderabad · Serving all of India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={marqueeRef}
        className="relative z-10 w-full border-t border-brand-rule/80 bg-brand-dark/60 py-4 overflow-hidden touch-pause-marquee backdrop-blur-sm"
      >
        <div className="flex marquee-track animate-marquee-mobile md:animate-marquee-tablet lg:animate-marquee hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center shrink-0 text-brand-silver text-xs md:text-sm tracking-[0.12em] uppercase whitespace-nowrap font-medium"
            >
              <span className="mx-6 md:mx-8">{item}</span>
              <span className="text-brand-dim">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
