"use client";

import { industryCards, getIndustryTintColor } from "@/lib/industries";

const TOTAL = industryCards.length;
const RAIL_H = 440;
const CHAMBER_W = 20;
const CHAMBER_H = RAIL_H;
const PAD_X = 3;
const PAD_Y = 8;

type Props = {
  progress: number;
  activeIndex: number;
};

export default function IndustriesScrollRail({ progress, activeIndex }: Props) {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const scanY = clampedProgress * CHAMBER_H;
  const activeTint = getIndustryTintColor(industryCards[activeIndex].id);
  const spineX = CHAMBER_W / 2;

  return (
    <div
      className="industries-scroll-rail pointer-events-none absolute right-6 top-1/2 z-[20] hidden -translate-y-1/2 lg:block xl:right-10"
      aria-label={`Scroll position: industry ${activeIndex + 1} of ${TOTAL}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={TOTAL}
      aria-valuenow={activeIndex + 1}
    >
      <div className="relative" style={{ padding: `${PAD_Y * 4}px ${PAD_X * 4}px` }}>
        <div
          className="pointer-events-none absolute -left-7 font-mono text-[11px] font-bold tabular-nums tracking-widest text-accent-warm transition-[top] duration-150"
          style={{
            top: PAD_Y * 4 + scanY,
            transform: "translateY(-50%)",
            textShadow: `0 0 12px ${activeTint}, 0 0 24px ${activeTint}66`,
          }}
          aria-hidden
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </div>

        <div
          className="relative"
          style={{ width: CHAMBER_W, height: CHAMBER_H }}
        >
          <span
            className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-accent-warm/35"
            aria-hidden
          />
          <span
            className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-accent-warm/35"
            aria-hidden
          />
          <span
            className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-accent-warm/35"
            aria-hidden
          />
          <span
            className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-accent-warm/35"
            aria-hidden
          />

          <div className="absolute inset-0 overflow-hidden rounded-md border border-white/[0.06] bg-transparent">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                background: `radial-gradient(ellipse at 50% ${clampedProgress * 100}%, ${activeTint}18 0%, transparent 60%)`,
              }}
              aria-hidden
            />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${CHAMBER_W} ${CHAMBER_H}`}
              fill="none"
              aria-hidden
            >
              <defs>
                <filter id="rail-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="rail-spine-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C4674A" />
                  <stop offset="100%" stopColor={activeTint} />
                </linearGradient>
              </defs>

              <line
                x1={spineX}
                y1={0}
                x2={spineX}
                y2={CHAMBER_H}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <line
                x1={spineX}
                y1={0}
                x2={spineX}
                y2={scanY}
                stroke="url(#rail-spine-fill)"
                strokeWidth="2"
                filter="url(#rail-glow)"
              />

            </svg>

            <div
              className="industries-rail-scan absolute left-0 right-0 z-[15]"
              style={{ top: scanY, transform: "translateY(-50%)" }}
              aria-hidden
            >
              <div
                className="h-px w-full opacity-90"
                style={{
                  background: `linear-gradient(90deg, transparent, ${activeTint}, transparent)`,
                  boxShadow: `0 0 14px ${activeTint}, 0 0 28px ${activeTint}88`,
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="mx-auto mt-5 flex flex-col items-center gap-2"
          style={{ width: CHAMBER_W }}
          aria-hidden
        >
          <div className="flex items-center gap-2">
            <span className="h-px w-3 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-[7px] font-bold uppercase tracking-[0.45em] text-white/25">
              Signal
            </span>
            <span className="h-px w-3 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="industries-rail-chevron h-1 w-1 rotate-45 border-b border-r border-accent-warm/60" />
            <span className="industries-rail-chevron h-1 w-1 rotate-45 border-b border-r border-accent-warm/35 [animation-delay:120ms]" />
            <span className="industries-rail-chevron h-1 w-1 rotate-45 border-b border-r border-accent-warm/20 [animation-delay:240ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
