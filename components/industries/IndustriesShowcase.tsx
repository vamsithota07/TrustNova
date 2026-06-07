"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  industryCards,
  type FilterOption,
  type IndustryCard,
} from "@/lib/industries";
import { getMockupHtmlPath, getMockupUrl } from "@/lib/mockups";
import MockupIframePreview from "@/components/industries/MockupIframePreview";
import MockupBrowserFrame from "@/components/industries/MockupBrowserFrame";
import Container from "@/components/Container";
import { WHATSAPP_URL } from "@/lib/constants";

const filterLabels: Record<FilterOption, string> = {
  ALL: "All",
  "Retail & Products": "Retail & Products",
  "Food & Hospitality": "Food & Hospitality",
  Services: "Services",
  Professional: "Professional",
  "Health & Wellness": "Health & Wellness",
  Education: "Education",
  Creative: "Creative",
};

const pillOrder: FilterOption[] = [
  "ALL",
  "Retail & Products",
  "Food & Hospitality",
  "Services",
  "Professional",
  "Health & Wellness",
  "Education",
  "Creative",
];

const CARD_PREVIEW_HEIGHT = 220;

function whatsappFor(industry: IndustryCard) {
  return (
    `${WHATSAPP_URL}?text=` +
    encodeURIComponent(`Hi, I'd like a website for my ${industry.name.toLowerCase()} business`)
  );
}

function IndustryThumbnail({
  card,
  onClick,
  preload,
  onPreload,
}: {
  card: IndustryCard;
  onClick: () => void;
  preload: boolean;
  onPreload: () => void;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.248);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 1440);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
      onMouseEnter={onPreload}
      onFocus={onPreload}
      className="group text-left w-full min-w-0 max-w-full rounded-xl [overflow:clip] [contain:layout_paint] border border-brand-rule bg-brand-card shadow-[0_2px_12px_rgba(0,0,0,0.05)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue"
    >
      <div
        ref={previewRef}
        className="relative min-w-0 max-w-full [overflow:clip] rounded-t-xl"
        style={{ height: CARD_PREVIEW_HEIGHT }}
        data-mockup-id={card.id}
      >
        <MockupIframePreview
          industryId={card.id}
          title={`${card.name} website preview`}
          scale={scale}
          preload={preload}
          className="rounded-t-xl"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
          <p className="text-white font-bold text-base px-4 text-center">{card.name}</p>
          <span className="mt-2 text-brand-blue text-xs px-3 py-1 rounded-full border border-brand-blue/30 bg-brand-accentbg">
            {card.category}
          </span>
          <span className="mt-3 text-white text-sm border border-white/40 px-4 py-2 rounded-full">
            View Details →
          </span>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-brand-rule">
        <p className="text-brand-white font-medium text-sm">{card.name}</p>
        <p className="text-brand-blue text-xs mt-0.5">{card.category}</p>
      </div>
    </motion.button>
  );
}

function DetailLeftPanel({
  industry,
  onBack,
  hideBack,
}: {
  industry: IndustryCard;
  onBack: () => void;
  hideBack?: boolean;
}) {
  return (
    <div className="h-full overflow-y-auto bg-brand-dark border-r border-brand-rule p-8 md:p-10 pb-32">
      {!hideBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-brand-dim hover:text-brand-white text-sm mb-8 transition-colors min-h-[44px]"
        >
          ← Back to All Industries
        </button>
      ) : (
        <button
          type="button"
          onClick={onBack}
          className="hidden md:inline-block text-brand-dim hover:text-brand-white text-sm mb-8 transition-colors"
        >
          ← Back to All Industries
        </button>
      )}

      <span className="inline-block bg-brand-accentbg text-brand-blue border border-brand-blue/30 rounded-full px-3 py-1 text-xs">
        {industry.category}
      </span>
      <h2 className="text-brand-white text-3xl font-bold mt-3">{industry.name}</h2>
      <p className="text-brand-silver text-base mt-2 leading-relaxed max-w-3xl">{industry.tagline}</p>

      <hr className="border-brand-rule my-8" />

      <h3 className="text-brand-blue text-xs uppercase tracking-widest font-semibold mb-4">
        What Their Website Needs
      </h3>
      <ul className="space-y-4 mb-8">
        {industry.needs.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="text-brand-blue font-bold mt-0.5 shrink-0">◆</span>
            <span className="text-brand-silver text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      <hr className="border-brand-rule my-8" />

      <h3 className="text-brand-blue text-xs uppercase tracking-widest font-semibold mb-4">
        Pages We&apos;d Build
      </h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {industry.pages.map((page) => (
          <span
            key={page}
            className="bg-brand-card border border-brand-rule text-brand-silver text-xs px-3 py-1.5 rounded-full"
          >
            {page}
          </span>
        ))}
      </div>

      <hr className="border-brand-rule my-8" />

      <h3 className="text-brand-blue text-xs uppercase tracking-widest font-semibold mb-4">
        Special Feature
      </h3>
      <div className="bg-brand-card rounded-xl p-5 border border-brand-rule border-l-[3px] border-l-brand-blue">
        <p className="text-brand-white font-bold mb-2">{industry.specialFeature.title}</p>
        <p className="text-brand-silver text-sm leading-relaxed max-w-3xl">
          {industry.specialFeature.description}
        </p>
      </div>

      <div className="sticky bottom-0 pt-6 mt-8 bg-gradient-to-t from-brand-dark via-brand-dark to-transparent">
        <a
          href={whatsappFor(industry)}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-brand-blue text-white rounded-xl py-4 font-semibold text-base transition-all duration-300 hover:shadow-blue-glow hover:scale-[1.02] min-h-[44px]"
        >
          Build My {industry.name} Website →
        </a>
      </div>
    </div>
  );
}

function MobileMockupPreview({ industryId, title }: { industryId: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.238);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 1440);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full relative overflow-hidden rounded-lg">
      <MockupIframePreview
        industryId={industryId}
        title={title}
        scale={scale}
        preload
        className="rounded-lg"
      />
    </div>
  );
}

export default function IndustriesShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("ALL");
  const [selected, setSelected] = useState<IndustryCard | null>(null);
  const [preloadId, setPreloadId] = useState<string | null>(null);
  const scrollRef = useRef(0);

  const filtered =
    activeFilter === "ALL"
      ? industryCards
      : industryCards.filter((c) => c.category === activeFilter);

  const selectedIndex = selected
    ? industryCards.findIndex((c) => c.id === selected.id)
    : -1;

  const openDetail = useCallback((card: IndustryCard) => {
    scrollRef.current = window.scrollY;
    setSelected(card);
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const closeDetail = useCallback(() => {
    setSelected(null);
    document.body.style.overflow = "";
    const y = scrollRef.current;
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
    });
  }, []);

  const goToIndex = useCallback((index: number) => {
    const next = industryCards[index];
    if (next) setSelected(next);
  }, []);

  const goPrev = useCallback(() => {
    if (selectedIndex <= 0) goToIndex(industryCards.length - 1);
    else goToIndex(selectedIndex - 1);
  }, [selectedIndex, goToIndex]);

  const goNext = useCallback(() => {
    if (selectedIndex >= industryCards.length - 1) goToIndex(0);
    else goToIndex(selectedIndex + 1);
  }, [selectedIndex, goToIndex]);

  useEffect(() => {
    if (!selected) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetail();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeDetail, goPrev, goNext]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-black w-full overflow-x-hidden">
      {preloadId && !selected && (
        <iframe
          src={getMockupHtmlPath(preloadId)}
          title="Preload mockup"
          className="hidden"
          tabIndex={-1}
          aria-hidden
        />
      )}

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Container className="pb-16 md:pb-24 pt-6 md:pt-8">
              <header className="text-center mb-12">
                <p className="text-brand-bluedim text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                  Our Expertise
                </p>
                <h1 className="text-brand-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                  Whatever Your Business,
                  <br />
                  We Know How to Build For It.
                </h1>
                <p className="text-brand-silver text-base md:text-lg mt-4 prose-width mx-auto">
                  Explore how TrustNova designs websites tailored to your industry - click any
                  preview to see the full breakdown.
                </p>
              </header>

              <div className="w-full min-w-0 max-w-full flex gap-2 overflow-x-auto flex-nowrap pb-4 mb-8 md:mb-10 scrollbar-hide [-webkit-overflow-scrolling:touch] md:flex-wrap md:justify-center md:overflow-visible">
                {pillOrder.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-sm border transition-all duration-300 min-h-[44px] ${
                      activeFilter === filter
                        ? "bg-brand-blue text-white border-brand-blue"
                        : "border-brand-rule text-brand-dim bg-transparent hover:border-brand-blue hover:text-brand-bluedim"
                    }`}
                  >
                    {filterLabels[filter]}
                  </button>
                ))}
              </div>

              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-w-0 max-w-full [&>*]:min-w-0 [overflow:clip]">
                <AnimatePresence mode="popLayout">
                  {filtered.map((card) => (
                    <IndustryThumbnail
                      key={card.id}
                      card={card}
                      onClick={() => openDetail(card)}
                      preload={preloadId === card.id}
                      onPreload={() => setPreloadId(card.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </Container>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-20 sm:top-24 md:top-28 lg:top-32 z-30 bg-brand-black overflow-y-auto md:overflow-hidden"
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous industry"
              className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center rounded-full bg-brand-card/80 text-brand-dim hover:text-brand-white hover:bg-brand-card border border-brand-rule transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next industry"
              className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center rounded-full bg-brand-card/80 text-brand-dim hover:text-brand-white hover:bg-brand-card border border-brand-rule transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="min-h-full flex flex-col md:flex-row md:h-full md:overflow-hidden">
              <button
                type="button"
                onClick={closeDetail}
                className="md:hidden shrink-0 flex items-center min-h-[44px] w-full text-left text-brand-dim hover:text-brand-white text-sm px-4 sm:px-6 py-3 bg-brand-dark border-b border-brand-rule transition-colors"
              >
                ← Back to All Industries
              </button>

              <div className="md:hidden w-full h-[260px] shrink-0 bg-brand-muted flex items-center justify-center border-b border-brand-rule p-3 overflow-hidden">
                <MobileMockupPreview industryId={selected.id} title={selected.name} />
              </div>

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full md:w-[40%] md:h-full shrink-0 order-2 md:order-1 min-w-0"
              >
                <DetailLeftPanel industry={selected} onBack={closeDetail} hideBack />
              </motion.div>

              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:flex w-[60%] h-full bg-brand-muted items-center justify-center relative order-3 min-w-0"
              >
                <MockupBrowserFrame
                  industryId={selected.id}
                  title={selected.name}
                  url={getMockupUrl(selected.id)}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
