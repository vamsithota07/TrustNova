"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle, Lock, Star } from "lucide-react";
import Container from "@/components/Container";
import { fadeInUp, inViewOptions, staggerContainer } from "@/lib/constants";

const signals = [
  { icon: Zap, label: "Fast Delivery" },
  { icon: CheckCircle, label: "No Revision Limits" },
  { icon: Lock, label: "You Own Everything" },
  { icon: Star, label: "100% Transparent Pricing" },
];

export default function TrustBar() {
  return (
    <section className="w-full bg-brand-black border-y border-brand-rule py-6 md:py-8">
      <Container>
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={inViewOptions}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 min-w-0"
        >
          {signals.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center text-center sm:text-left min-w-0"
            >
              <Icon className="w-5 h-5 text-brand-blue shrink-0" strokeWidth={2} />
              <span className="text-brand-silver text-xs sm:text-sm md:text-base font-medium">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
