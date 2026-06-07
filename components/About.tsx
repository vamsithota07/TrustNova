"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import { fadeInLeft, fadeInRight, fadeInUp, inViewOptions } from "@/lib/constants";
import { useIsMobile } from "@/lib/hooks";

const promises = [
  "Designs delivered on time, every time",
  "Unlimited revisions until you love the result",
  "Transparent pricing, no hidden charges",
  "You own 100% of everything we create",
  "India-focused design with global standards",
];

export default function About() {
  const isMobile = useIsMobile();

  return (
    <section id="about" className="relative w-full py-section bg-brand-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(107,143,117,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Container className="relative">
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOptions}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="editorial-eyebrow mb-8"
        >
          About Us
        </motion.p>

        <motion.blockquote
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOptions}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mb-12 md:mb-20 max-w-3xl mx-auto text-center min-w-0"
        >
          <span
            className="block text-brand-blue text-[60px] md:text-[120px] leading-none font-serif select-none"
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="text-brand-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed -mt-4 md:-mt-6">
            Great design is not decoration.
            <br />
            It is communication.
            <br />
            We speak it fluently.
          </p>
          <footer className="mt-4 md:mt-6 text-brand-dim text-base md:text-lg">
            - TrustNova Studio
          </footer>
        </motion.blockquote>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start w-full min-w-0">
          <motion.div
            className="w-full min-w-0"
            initial={false}
            whileInView="visible"
            viewport={inViewOptions}
            variants={isMobile ? fadeInUp : fadeInLeft}
          >
            <h2 className="text-brand-white font-bold text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 leading-tight">
              Designed for Indian Businesses.
              <br />
              Built to Scale
            </h2>
            <p className="text-brand-silver text-sm md:text-base lg:text-lg leading-relaxed prose-width">
              Our mission is to give every Indian business, small or large, a brand
              identity and online presence that earns trust from day one. Great design is
              not a luxury; it is the engine of business growth.
            </p>
            <p className="text-brand-silver text-sm md:text-base lg:text-lg leading-relaxed mt-4 prose-width">
              TrustNova was founded on one idea: your brand should inspire confidence from
              the very first moment someone sees it.
            </p>
          </motion.div>

          <motion.div
            className="w-full min-w-0 bg-brand-card rounded-2xl p-5 md:p-8 border border-brand-rule shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            initial={false}
            whileInView="visible"
            viewport={inViewOptions}
            variants={isMobile ? fadeInUp : fadeInRight}
          >
            <h3 className="text-brand-white font-bold text-lg md:text-xl mb-4 md:mb-6">Our Promise</h3>
            <ul className="space-y-3 md:space-y-4">
              {promises.map((item) => (
                <li key={item} className="flex items-start gap-3 text-brand-silver text-sm md:text-base min-w-0">
                  <span className="text-brand-blue font-bold mt-1 shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
