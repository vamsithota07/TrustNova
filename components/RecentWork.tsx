"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import RevealStagger from "@/components/motion/RevealStagger";
import { featuredProjects } from "@/lib/portfolio";

/** Real client work, shown early on the homepage: the proof a visitor looks for before getting in touch. */
const clients = [
  { name: "Milletio Global Grain" },
  { name: "Vistix Engineers", where: "Hyderabad" },
  { name: "Asian Speciality Medical Centre", where: "Oman" },
];

export default function RecentWork() {
  return (
    <section id="recent-work" className="relative w-full py-section bg-brand-black overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Recent Work"
          heading="Real Projects for Real Businesses"
          subtext="A few of the brands, websites and campaigns we've built recently. Each one started with a short brief and a fixed quote."
          size="large"
          highlight="Real Businesses"
        />

        <RevealStagger stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 min-w-0 items-stretch">
          {featuredProjects.map((p) => {
            const card = (
              <>
                <div className="relative w-full overflow-hidden rounded-t-[inherit] bg-brand-dark aspect-[16/10]">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 768px) 92vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="editorial-eyebrow mb-3 text-accent-warm">{p.category}</span>
                  <h3 className="font-display font-bold text-xl lg:text-2xl tracking-[-0.03em] text-brand-white mb-3 flex items-start justify-between gap-3">
                    {p.title}
                    {p.href && <ArrowUpRight className="h-5 w-5 shrink-0 text-brand-dim transition-colors group-hover:text-accent-warm" />}
                  </h3>
                  <p className="editorial-body text-sm leading-[1.7] flex-1">{p.description}</p>
                </div>
              </>
            );
            const cls = "group creative-card overflow-hidden min-w-0 h-full flex flex-col transition-all duration-500 ease-premium hover:shadow-card-hover hover:-translate-y-1";
            return p.href ? (
              <a key={p.id} data-reveal-item href={p.href} target="_blank" rel="noopener" className={cls} aria-label={`${p.title}: see the live site`}>
                {card}
              </a>
            ) : (
              <article key={p.id} data-reveal-item className={cls}>
                {card}
              </article>
            );
          })}
        </RevealStagger>

        <div className="mt-10 md:mt-12 flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-8 rounded-organic border border-brand-rule bg-brand-card px-6 py-5 md:px-8">
          <p className="text-sm text-brand-silver text-center md:text-left">
            <span className="font-semibold text-brand-white">Trusted by businesses in India and Oman: </span>
            {clients.map((c, i) => (
              <span key={c.name}>
                {c.name}{c.where && <span className="text-brand-dim"> ({c.where})</span>}
                {i < clients.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-white transition-colors hover:text-accent-warm"
          >
            See all our work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
