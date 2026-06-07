"use client";

import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/motion/SmoothScroll";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
