"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import { staggerContainer, fadeInUp, inViewOptions } from "@/lib/constants";

const reasons = [
  {
    title: "India-Focused Design",
    description:
      "Work that resonates locally and meets global standards.",
  },
  {
    title: "You Own Everything",
    description:
      "100% ownership of all files and code. No lock-ins. No recurring licence fees.",
  },
  {
    title: "Fast Turnaround",
    description: "Logo concepts in 3-5 days. Full websites in 2-4 weeks.",
  },
  {
    title: "No Revision Limits",
    description: "We refine until your brand feels exactly right.",
  },
  {
    title: "Direct Communication",
    description:
      "Work directly with our lead designer. No handoffs. No middlemen. No miscommunication.",
  },
  {
    title: "Honest Pricing",
    description: "What you see is what you pay. Transparent, always.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="w-full py-16 md:py-24 bg-brand-black">
      <Container>
        <SectionHeader
          eyebrow="Why TrustNova"
          heading="Six Reasons to Choose Us"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-w-0"
          initial={false}
          whileInView="visible"
          viewport={inViewOptions}
          variants={staggerContainer(0.1)}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={fadeInUp}
              className="bg-brand-card rounded-xl p-5 md:p-8 border-l-4 border-brand-blue border border-brand-rule shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(107,143,117,0.12)] hover:border-brand-blue/60 active:scale-[0.99] min-w-0"
            >
              <span className="text-brand-blue font-bold text-lg">◆</span>
              <h3 className="text-brand-white font-bold text-lg mt-1 mb-2 md:mb-3">
                {reason.title}
              </h3>
              <p className="text-brand-silver leading-relaxed text-sm md:text-base prose-width">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
