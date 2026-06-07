"use client";

import { Target, Sparkles, Layers } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import RevealStagger from "@/components/motion/RevealStagger";

const pillars = [
  {
    icon: Target,
    title: "Strategy First",
    description:
      "Every logo and website starts with understanding your business, audience, and goals. The right brief leads to the right design.",
  },
  {
    icon: Sparkles,
    title: "Design Excellence",
    description:
      "Clean, modern, premium work that stands out in a competitive market and commands attention from day one.",
  },
  {
    icon: Layers,
    title: "End-to-End",
    description:
      "From brief to launch - and beyond. We are with you at every stage of your brand's journey.",
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="relative w-full py-section bg-brand-black overflow-hidden">
      <div className="floating-shape bottom-10 left-[5%] h-48 w-48 bg-accent-dusty/15" aria-hidden />
      <Container>
        <SectionHeader
          eyebrow="The TrustNova Difference"
          heading="Three Pillars of Everything We Do"
          size="large"
          highlight="Pillars"
        />

        <RevealStagger
          stagger={0.14}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 min-w-0 items-stretch"
        >
          {pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              data-reveal-item
              className="group creative-card p-8 md:p-10 lg:p-12 min-w-0 h-full flex flex-col transition-all duration-500 ease-premium hover:shadow-card-hover hover:-translate-y-1"
            >
              <span className="text-[11px] font-semibold text-brand-dim mb-6 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-14 h-14 rounded-2xl border border-brand-rule bg-brand-dark flex items-center justify-center mb-6 transition-all duration-500 group-hover:border-accent-warm/30 group-hover:bg-accent-warm/5">
                <pillar.icon className="w-5 h-5 text-brand-white group-hover:text-accent-warm transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-3xl mb-4 tracking-[-0.03em] text-brand-white">
                {pillar.title}
              </h3>
              <p className="editorial-body text-sm md:text-base flex-1 leading-[1.75]">{pillar.description}</p>
            </article>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
