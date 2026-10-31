"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import { fadeInLeft, fadeInRight, fadeInUp, inViewOptions } from "@/lib/constants";
import { useIsMobile } from "@/lib/hooks";

/** The person visitors will work with. Shown as soon as it is filled in (photo in /public/team/). */
const FOUNDER: { name: string; role: string; photo: string; line: string } | null = null;

const clients = [
  { name: "Milletio Global Grain", what: "Digital marketing" },
  { name: "Vistix Engineers", what: "Website, Hyderabad" },
  { name: "Asian Speciality Medical Centre", what: "Website, Oman" },
];

export default function About() {
  const isMobile = useIsMobile();

  return (
    <section id="about" className="relative w-full py-section bg-brand-dark overflow-hidden">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start w-full min-w-0">
          <motion.div
            className="w-full min-w-0"
            initial={false}
            whileInView="visible"
            viewport={inViewOptions}
            variants={isMobile ? fadeInUp : fadeInLeft}
          >
            <h1 className="text-brand-white font-bold text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 leading-tight">
              A brand, web and growth studio for businesses everywhere
            </h1>
            <p className="text-brand-silver text-sm md:text-base lg:text-lg leading-relaxed prose-width">
              TrustNova designs logos and brand identities, builds websites and runs digital marketing for small and growing
              businesses. We started with one idea: your business should look trustworthy from the very first moment someone sees it.
            </p>
            <p className="text-brand-silver text-sm md:text-base lg:text-lg leading-relaxed mt-4 prose-width">
              You work directly with the person designing your work, over calls and WhatsApp, from the first sketch to launch day and after.
            </p>
            {FOUNDER && (
              <div className="mt-8 flex items-center gap-4">
                <Image src={FOUNDER.photo} alt={FOUNDER.name} width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover" />
                <div>
                  <p className="font-display font-bold text-brand-white">{FOUNDER.name}</p>
                  <p className="text-sm text-brand-dim">{FOUNDER.role}</p>
                  <p className="text-sm text-brand-silver mt-1">{FOUNDER.line}</p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="w-full min-w-0 bg-brand-card rounded-2xl p-5 md:p-8 border border-brand-rule shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            initial={false}
            whileInView="visible"
            viewport={inViewOptions}
            variants={isMobile ? fadeInUp : fadeInRight}
          >
            <h2 className="text-brand-white font-bold text-lg md:text-xl mb-4 md:mb-6">Businesses we&apos;ve worked with</h2>
            <ul className="divide-y divide-brand-rule">
              {clients.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-4 py-3 min-w-0">
                  <span className="text-brand-white font-semibold text-sm md:text-base">{c.name}</span>
                  <span className="text-brand-dim text-xs md:text-sm text-right">{c.what}</span>
                </li>
              ))}
            </ul>
            <p className="text-brand-silver text-sm mt-5">Based in Hyderabad, India, working with businesses all over the world.</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
