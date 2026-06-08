"use client";

import { useState } from "react";
import { useScroll, useSpring, motion, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPercent(Math.round(v * 100));
  });

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[100] h-px w-full">
      <motion.div className="h-full w-full origin-left bg-brand-blue" style={{ scaleX }} />
      <AnimatePresence>
        {percent > 5 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-3 top-2 text-[10px] font-semibold tabular-nums text-accent-warm"
          >
            {percent}%
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
