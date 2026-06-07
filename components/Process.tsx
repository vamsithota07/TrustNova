"use client";

import { useLayoutEffect, useRef } from "react";
import {
  MessageSquare,
  Pencil,
  RefreshCw,
  CheckCircle,
  Rocket,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap-register";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";

const steps: {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "warm" | "sage" | "dusty" | "soft";
}[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery & Brief",
    description: "Deep conversation about your business, audience, and vision.",
    accent: "warm",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Concept & Design",
    description: "3 logo directions or website wireframe and mood board.",
    accent: "sage",
  },
  {
    number: "03",
    icon: RefreshCw,
    title: "Feedback & Revisions",
    description: "Unlimited refinements until every detail is exactly right.",
    accent: "dusty",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Finalisation",
    description: "All assets prepared in every format. Full source files delivered.",
    accent: "soft",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch & Handover",
    description: "Coordinated go-live with full training and walkthrough.",
    accent: "warm",
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Post-Launch Support",
    description: "Available for questions, updates, and long-term growth.",
    accent: "sage",
  },
];

const accentBg: Record<(typeof steps)[0]["accent"], string> = {
  warm: "bg-accent-warm/10 text-accent-warm",
  sage: "bg-accent-sage/10 text-accent-sage",
  dusty: "bg-accent-dusty/10 text-accent-dusty",
  soft: "bg-accent-soft/10 text-accent-soft",
};

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 120;
      const tween = gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative w-full bg-brand-black overflow-hidden">
      <Container className="pt-section pb-8 lg:pb-12">
        <SectionHeader
          eyebrow="Our Process"
          heading="Clear, Transparent, Collaborative"
          subtext="Every project follows a structured process. You always know exactly what happens next."
          align="left"
        />
      </Container>

      {/* Mobile & tablet: vertical journey cards */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 pb-section">
        <div className="flex flex-col gap-5 max-w-xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className={`creative-card p-6 ${i % 2 === 1 ? "ml-6" : "mr-6"}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accentBg[step.accent]}`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-brand-dim">{step.number}</span>
                    <h3 className="font-display font-bold text-brand-white text-lg mt-1 mb-2">{step.title}</h3>
                    <p className="text-brand-silver text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Desktop: horizontal scroll journey */}
      <div className="hidden lg:block overflow-hidden pb-section">
        <div ref={trackRef} className="flex gap-8 px-8 xl:px-16 w-max will-change-transform">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className="creative-card shrink-0 w-[min(420px,38vw)] p-8 xl:p-10"
              >
                <span className="text-[11px] font-bold tracking-[0.25em] text-brand-dim">{step.number}</span>
                <div className={`mt-6 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accentBg[step.accent]}`}>
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-brand-white text-2xl xl:text-3xl mb-3 tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="text-brand-silver text-base leading-relaxed">{step.description}</p>
              </article>
            );
          })}
          <div className="shrink-0 w-24" aria-hidden />
        </div>
      </div>
    </section>
  );
}
