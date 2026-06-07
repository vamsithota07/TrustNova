"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  industryCards,
  industryCategories,
  categoryAccents,
  accentTextClass,
  accentBgClass,
  categoryStartIndex,
  type IndustryCategory,
} from "@/lib/industries";
import { WHATSAPP_URL } from "@/lib/constants";
import IndustryPreviewStage from "@/components/industries/IndustryPreviewStage";

function whatsappFor(name: string) {
  return (
    `${WHATSAPP_URL}?text=` +
    encodeURIComponent(`Hi, I'd like a website for my ${name.toLowerCase()} business`)
  );
}

export default function IndustriesMobileStory() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<IndustryCategory>(
    industryCards[0].category,
  );

  const updateIndexFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const idx = Math.round(el.scrollLeft / w);
    const clamped = Math.min(industryCards.length - 1, Math.max(0, idx));
    setActiveIndex(clamped);
    setActiveCategory(industryCards[clamped].category);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateIndexFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateIndexFromScroll);
  }, [updateIndexFromScroll]);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  const jumpToCategory = (category: IndustryCategory) => {
    const idx = categoryStartIndex(category);
    if (idx >= 0) scrollToIndex(idx);
  };

  const industry = industryCards[activeIndex];
  const accent = categoryAccents[industry.category];

  return (
    <div className="relative bg-brand-black pb-8 pt-28 sm:pt-32">
      <div className="px-4 pt-2 pb-4 text-center">
        <p className="editorial-eyebrow mb-3">Our Expertise</p>
        <h1 className="editorial-heading text-[clamp(1.75rem,6vw,2.5rem)] text-balance">
          Built for your industry
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-silver max-w-md mx-auto">
          Swipe through how TrustNova designs for businesses like yours.
        </p>
      </div>

      <div className="px-4 mb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-dim">
            {String(activeIndex + 1).padStart(2, "0")} / {String(industryCards.length).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium text-brand-silver truncate">{industry.name}</span>
        </div>
        <div className="h-0.5 overflow-hidden rounded-full bg-brand-rule">
          <div
            className="h-full origin-left rounded-full bg-brand-white transition-transform duration-300"
            style={{
              transform: `scaleX(${(activeIndex + 1) / industryCards.length})`,
            }}
          />
        </div>
      </div>

      <div className="mb-4 flex gap-1.5 overflow-x-auto scrollbar-hide px-4">
        {industryCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => jumpToCategory(category)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                isActive
                  ? "border-brand-white bg-brand-white text-brand-black"
                  : "border-brand-rule text-brand-dim"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {industryCards.map((item, i) => {
          const itemAccent = categoryAccents[item.category];
          const ItemIcon = item.icon;
          return (
            <article
              key={item.id}
              className="w-full shrink-0 snap-center snap-always px-4"
              style={{ scrollSnapAlign: "center" }}
            >
              <div className="flex h-[min(52vh,420px)] flex-col overflow-hidden rounded-2xl border border-brand-rule bg-brand-card shadow-soft">
                <IndustryPreviewStage industryId={item.id} title={item.name} active={i === activeIndex} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 space-y-5 pb-6"
              >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-rule bg-brand-dark ${accentTextClass[itemAccent]}`}
                      >
                        <ItemIcon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dim">
                          {item.category}
                        </p>
                        <h2 className="font-display text-xl font-bold text-brand-white tracking-[-0.02em]">
                          {item.name}
                        </h2>
                      </div>
                    </div>

                    <div>
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-2 ${accentTextClass[itemAccent]}`}>
                        Why this industry is different
                      </p>
                      <p className="text-sm leading-relaxed text-brand-silver">{item.tagline}</p>
                    </div>

                    <div>
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-2 ${accentTextClass[itemAccent]}`}>
                        Recommended conversion strategy
                      </p>
                      <p className="text-sm font-semibold text-brand-white">{item.specialFeature.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-brand-silver">
                        {item.specialFeature.description}
                      </p>
                    </div>

                    <div>
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-2 ${accentTextClass[itemAccent]}`}>
                        Key website features
                      </p>
                      <ul className="space-y-2">
                        {item.needs.slice(0, 4).map((need) => (
                          <li key={need} className="flex gap-2 text-sm text-brand-silver">
                            <span className={`shrink-0 ${accentTextClass[itemAccent]}`}>▸</span>
                            {need}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={whatsappFor(item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[48px] w-full items-center justify-center rounded-pill bg-brand-white text-sm font-semibold text-brand-black shadow-soft"
                    >
                      Build My {item.name} Website →
                    </Link>
              </motion.div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {industryCards.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to industry ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? `w-4 ${accentBgClass[accent]}` : "w-1.5 bg-brand-rule"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
