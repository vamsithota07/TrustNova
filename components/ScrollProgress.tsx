"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useScroll } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-[100] h-[2px] bg-brand-blue origin-left"
      style={{ scaleX }}
    />
  );
}
