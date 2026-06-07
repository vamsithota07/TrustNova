"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  subtext?: string;
  className?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  eyebrow,
  heading,
  subtext,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClass} mb-10 md:mb-12 lg:mb-16 min-w-0 ${className}`}>
      <motion.p
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-brand-bluedim text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="text-brand-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance"
      >
        {heading}
      </motion.h2>
      {subtext && (
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className={`mt-3 md:mt-4 text-brand-silver text-sm md:text-base lg:text-lg prose-width ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
}
