"use client";

import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollToTop from "@/components/motion/ScrollToTop";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <SmoothScroll>
        <ScrollToTop />
        {children}
      </SmoothScroll>
    </MotionConfig>
  );
}
