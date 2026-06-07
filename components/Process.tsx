"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquare,
  Pencil,
  RefreshCw,
  CheckCircle,
  Rocket,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import { fadeInLeft, fadeInRight, fadeInUp, inViewOptions } from "@/lib/constants";
import { useIsMobile } from "@/lib/hooks";

const steps: {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery & Brief",
    description:
      "Deep conversation about your business, audience, and vision.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Concept & Design",
    description: "3 logo directions or website wireframe and mood board.",
  },
  {
    number: "03",
    icon: RefreshCw,
    title: "Feedback & Revisions",
    description:
      "Unlimited refinements until every detail is exactly right.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Finalisation",
    description:
      "All assets prepared in every format. Full source files delivered.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch & Handover",
    description: "Coordinated go-live with full training and walkthrough.",
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Post-Launch Support",
    description: "Available for questions, updates, and long-term growth.",
  },
];

function StepBubble({ number, size = "lg" }: { number: string; size?: "lg" | "sm" }) {
  const dim = size === "sm" ? "w-8 h-8 text-xs" : "w-12 h-12 text-sm";
  return (
    <motion.div
      initial={false}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={inViewOptions}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 shrink-0"
    >
      {size === "lg" && (
        <span className="absolute inset-0 rounded-full bg-brand-blue animate-pulse-ring" />
      )}
      <div
        className={`relative ${dim} rounded-full bg-brand-blue text-white flex items-center justify-center font-bold`}
      >
        {number}
      </div>
    </motion.div>
  );
}

function StepContent({
  step,
  side,
  mobile = false,
}: {
  step: (typeof steps)[0];
  side: "left" | "right";
  mobile?: boolean;
}) {
  const Icon = step.icon;
  const isMobile = useIsMobile();
  const variant = mobile || isMobile ? fadeInUp : side === "left" ? fadeInLeft : fadeInRight;

  return (
    <motion.div
      initial={false}
      whileInView="visible"
      viewport={inViewOptions}
      variants={variant}
      className={`bg-brand-dark border border-brand-rule rounded-xl min-w-0 ${
        mobile ? "p-4 text-left" : "p-6"
      } ${!mobile && side === "left" ? "text-right" : "text-left"}`}
    >
      <Icon className="w-5 h-5 text-brand-blue mb-3 inline-block" />
      <h3 className="text-brand-white font-bold text-base md:text-lg mb-2">{step.title}</h3>
      <p
        className={`text-brand-silver text-sm leading-relaxed prose-width ${
          !mobile && side === "left" ? "ml-auto" : ""
        }`}
      >
        {step.description}
      </p>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative w-full py-16 md:py-24 bg-brand-black overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Our Process"
          heading="Clear, Transparent, Collaborative"
          subtext="Every project follows a structured process. You always know exactly what happens next."
        />

        <div ref={containerRef} className="relative mt-12 md:mt-16 w-full max-w-4xl mx-auto min-w-0">
          {/* Desktop / tablet alternating timeline */}
          <div className="hidden md:block">
            <div
              className="absolute top-0 bottom-0 w-px bg-brand-rule -translate-x-1/2"
              style={{ left: "50%" }}
            />
            <motion.div
              className="absolute top-0 w-px bg-brand-blue origin-top -translate-x-1/2"
              style={{ left: "50%", height: lineHeight }}
            />

            <div className="space-y-10 lg:space-y-12">
              {steps.map((step, index) => {
                const isOdd = index % 2 === 0;
                return (
                  <div
                    key={step.number}
                    className="grid grid-cols-[1fr_auto_1fr] gap-4 lg:gap-8 items-center min-w-0"
                  >
                    {isOdd ? (
                      <>
                        <StepContent step={step} side="left" />
                        <StepBubble number={step.number} />
                        <div className="min-w-0" />
                      </>
                    ) : (
                      <>
                        <div className="min-w-0" />
                        <StepBubble number={step.number} />
                        <StepContent step={step} side="right" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: left-edge spine */}
          <div className="md:hidden relative pl-12 min-w-0">
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-brand-blue"
              style={{ left: "15px" }}
            />
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="relative min-w-0">
                  <div className="absolute -left-12 top-1">
                    <StepBubble number={step.number} size="sm" />
                  </div>
                  <StepContent step={step} side="right" mobile />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
