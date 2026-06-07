"use client";

import { motion } from "framer-motion";
import { Target, Sparkles, Layers } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import { staggerContainer, fadeInUp, inViewOptions } from "@/lib/constants";

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
    <section id="pillars" className="w-full py-16 md:py-24 bg-brand-black">
      <Container>
        <SectionHeader
          eyebrow="The TrustNova Difference"
          heading="Three Pillars of Everything We Do"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-w-0"
          initial={false}
          whileInView="visible"
          viewport={inViewOptions}
          variants={staggerContainer(0.15)}
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={fadeInUp}
              className={`bg-brand-card rounded-xl p-6 md:p-8 border-l-4 border-brand-blue border border-brand-rule shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-card-hover active:scale-[0.99] min-w-0 ${
                i === 2 ? "md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-accentbg border border-brand-blue/20 flex items-center justify-center mb-4 md:mb-6">
                <pillar.icon className="w-6 h-6 text-brand-blue" strokeWidth={1.5} />
              </div>
              <h3 className="text-brand-white font-bold text-xl lg:text-2xl mb-2 md:mb-3">
                {pillar.title}
              </h3>
              <p className="text-brand-silver text-sm md:text-base leading-relaxed prose-width">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
