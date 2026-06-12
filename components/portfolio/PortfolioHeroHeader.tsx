"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function StylizedT({ className }: { className?: string }) {
  return (
    <span className={`relative inline-block align-baseline ${className ?? ""}`}>
      <span className="relative z-[1]">T</span>
      <span
        className="pointer-events-none absolute left-1/2 top-[16%] z-[2] h-[0.1em] w-[1em] -translate-x-1/2 rotate-[50deg] rounded-full bg-brand-white"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute left-1/2 top-[16%] z-[2] h-[0.1em] w-[1em] -translate-x-1/2 -rotate-[50deg] rounded-full bg-brand-white"
        aria-hidden
      />
    </span>
  );
}

export default function PortfolioHeroHeader() {
  return (
    <section className="relative overflow-x-clip border-b border-brand-rule bg-brand-black px-4 pb-10 pt-8 sm:px-8 md:pb-16 md:pt-12">
      <div className="mx-auto max-w-editorial">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="mb-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-warm"
        >
          <span>TrustNova Studio</span>
          <span className="text-brand-dim">·</span>
          <span>Creative Portfolio</span>
        </motion.p>

        <div className="flex flex-col items-center text-center">
          {/* Playful PORTFOLIO: single line, centered above avatar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="relative z-20 mb-[-0.08em] w-full"
          >
            <span className="absolute right-[8%] top-0 text-[11px] font-semibold tracking-[0.12em] text-accent-warm sm:right-[12%] sm:text-xs md:right-[18%]">
              &apos;26
            </span>

            <h1
              className="select-none whitespace-nowrap font-display leading-[0.88] text-brand-white"
              aria-label="Portfolio"
            >
              <span className="inline-block -rotate-[2deg] text-[clamp(2.75rem,14vw,9.5rem)] font-extrabold tracking-[-0.05em]">
                POR
              </span>
              <StylizedT className="mx-[-0.03em] inline-block translate-y-[0.06em] rotate-[3deg] text-[clamp(2.25rem,11vw,7.5rem)] font-bold" />
              <span className="inline-block translate-y-[0.12em] rotate-[1deg] text-[clamp(2.5rem,12.5vw,8.5rem)] font-black tracking-[-0.06em]">
                FOLIO
              </span>
            </h1>
          </motion.div>

          {/* Centered transparent avatar with blob accent behind */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.12 }}
            className="relative z-10 flex w-full justify-center"
          >
            <div className="relative bg-brand-black">
              <div
                className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[min(70vw,320px)] w-[min(70vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-[42%] bg-[#EDE6DC] md:h-[360px] md:w-[360px]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-[54%] top-[48%] -z-10 h-[min(50vw,220px)] w-[min(50vw,220px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F3EDE4]"
                aria-hidden
              />
              <Image
                src="/avatar.png"
                alt="Vamsi Thota"
                width={560}
                height={560}
                priority
                unoptimized
                className="relative z-10 h-[min(62vw,340px)] w-auto object-contain md:h-[min(42vw,440px)]"
                sizes="(max-width: 768px) 62vw, 440px"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.22 }}
            className="mt-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-accent-warm sm:mt-4 sm:text-[11px]"
          >
            Vamsi Thota
          </motion.p>
        </div>
      </div>
    </section>
  );
}
