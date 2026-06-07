"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  if (reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-[100] h-px bg-brand-blue origin-left"
      style={{ scaleX }}
    />
  );
}
