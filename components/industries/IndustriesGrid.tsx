"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { industryCards, industryCategories, type IndustryCategory } from "@/lib/industries";
import { getMockupHtmlPath } from "@/lib/mockups";
import { WHATSAPP_URL } from "@/lib/constants";

/* One short page for all 20 industries: filter chips, then a card per industry with a screenshot of its concept site
   (public/industries/<id>.webp, taken from public/mockups), three key features and two actions. Every card is
   labelled as a concept design, because these are samples, not client work. */

type Filter = "All" | IndustryCategory;
const FILTERS: Filter[] = ["All", ...industryCategories];

function whatsappFor(name: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(`Hi TrustNova, I'd like a website for my business (${name}).`)}`;
}

export default function IndustriesGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? industryCards : industryCards.filter((c) => c.category === filter);
  const count = (f: Filter) => (f === "All" ? industryCards.length : industryCards.filter((c) => c.category === f).length);

  return (
    <>
      <div role="group" aria-label="Filter industries" className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:px-0">
        {FILTERS.map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
            className={`shrink-0 min-h-[44px] rounded-pill border px-4 text-sm font-semibold transition-colors duration-300 ${
              filter === f ? "border-brand-white bg-brand-white text-brand-black" : "border-brand-rule bg-brand-card text-brand-white hover:border-accent-warm/50"}`}>
            {f} <span className={filter === f ? "opacity-70" : "text-brand-dim"}>{count(f)}</span>
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 min-w-0">
        {shown.map((c) => (
          <li key={c.id} className="group creative-card flex min-w-0 flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card-hover">
            <a href={getMockupHtmlPath(c.id)} target="_blank" rel="noopener" className="relative block" aria-label={`${c.name}: open the concept website`}>
              <div className="flex h-7 items-center gap-1.5 border-b border-brand-rule bg-brand-muted px-3" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-brand-rule" /><span className="h-2 w-2 rounded-full bg-brand-rule" /><span className="h-2 w-2 rounded-full bg-brand-rule" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark">
                <Image src={`/industries/${c.id}.webp`} alt={`Concept website design for a ${c.name.toLowerCase()}`} fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                  className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.03]" />
              </div>
              <span className="absolute left-3 top-10 rounded-pill bg-brand-black/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-white backdrop-blur-sm">
                Concept design
              </span>
            </a>
            <div className="flex flex-1 flex-col p-6">
              <span className="editorial-eyebrow mb-2 text-accent-warm">{c.category}</span>
              <h2 className="font-display text-xl font-bold tracking-[-0.03em] text-brand-white">{c.name}</h2>
              <p className="editorial-body mt-2 text-sm leading-[1.65]">{c.tagline}</p>
              <ul className="mt-4 space-y-2 flex-1">
                {c.needs.slice(0, 3).map((n) => (
                  <li key={n} className="flex gap-2 text-sm text-brand-silver"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-warm" strokeWidth={2} />{n}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                <a href={getMockupHtmlPath(c.id)} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-1 text-brand-white hover:text-accent-warm">
                  View concept <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href={whatsappFor(c.name)} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center text-accent-warm hover:underline">
                  Get one like this →
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
