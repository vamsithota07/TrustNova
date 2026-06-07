"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useHasMounted } from "@/lib/hooks";
import {
  btnPrimary,
  btnSecondary,
  fadeInUp,
  staggerContainer,
  WHATSAPP_URL,
} from "@/lib/constants";
import Container from "@/components/Container";
import CircuitBackground from "@/components/CircuitBackground";

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

export default function Hero() {
  const mounted = useHasMounted();

  const headlineLines = [
    { text: "Your Brand.", color: "text-brand-white" },
    { text: "Your Trust.", color: "text-brand-white" },
    { text: "Your Growth.", color: "text-brand-blue" },
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-brand-black via-brand-black to-brand-dark pt-20 sm:pt-24 md:pt-28 lg:pt-36"
    >
      <CircuitBackground id="hero" />

      <Container className="relative z-10 flex-1 py-12 md:py-16 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] lg:grid-cols-2 gap-8 md:gap-6 lg:gap-20 items-center w-full min-w-0">
          <motion.div
            className="w-full min-w-0 order-1"
            initial={false}
            animate={mounted ? "visible" : false}
            variants={staggerContainer(0.2)}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 md:mb-8 text-xs sm:text-sm font-semibold text-brand-bluedim bg-brand-accentbg border border-brand-blue/40 rounded-full animate-border-pulse"
            >
              <Zap size={14} className="fill-brand-blue text-brand-blue shrink-0" />
              India&apos;s Premier Brand & Creative Studio
            </motion.span>

            <div className="mb-6 md:mb-8 space-y-1">
              {headlineLines.map((line) => (
                <motion.h1
                  key={line.text}
                  variants={fadeInUp}
                  className={`font-bold tracking-tight text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] leading-[1.1] lg:leading-[1.05] ${line.color}`}
                >
                  {line.text}
                </motion.h1>
              ))}
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-brand-silver text-base lg:text-lg xl:text-xl mb-8 md:mb-10 leading-relaxed prose-width"
            >
              We design logos that stop the scroll, build identities that command
              respect, and create websites that convert visitors into clients.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full min-w-0"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btnPrimary}
              >
                Start Your Project →
              </a>
              <Link href="/services" className={btnSecondary}>
                View Our Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full min-w-0 order-2"
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="bg-brand-dark border border-brand-rule rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] animate-float w-full max-w-full md:max-w-none lg:ml-auto">
              <h2 className="text-brand-white font-bold text-lg mb-4 md:mb-6">
                Our Services
              </h2>
              <ul className="space-y-3 md:space-y-4">
                {services.map((title) => (
                  <li key={title} className="flex items-center gap-3 min-w-0">
                    <span className="text-brand-blue text-lg shrink-0">◆</span>
                    <p className="text-brand-white font-semibold">{title}</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-brand-rule mt-5 md:mt-6 pt-5 md:pt-6">
                <p className="text-brand-silver text-sm text-center">
                  Based in Hyderabad · Serving all of India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <div className="relative z-10 w-full border-y border-brand-rule bg-brand-dark/90 py-3 backdrop-blur-sm md:py-4 overflow-hidden touch-pause-marquee">
        <div className="flex marquee-track animate-marquee-mobile md:animate-marquee-tablet lg:animate-marquee hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center shrink-0 text-brand-silver text-xs md:text-sm tracking-wide whitespace-nowrap"
            >
              <span className="mx-4">{item}</span>
              <span className="text-brand-blue">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
