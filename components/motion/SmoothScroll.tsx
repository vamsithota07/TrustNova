"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap, ScrollTrigger } from "@/lib/motion/gsap-register";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lenis: Lenis | null = null;
    let rafId = 0;

    try {
      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch (error) {
      console.warn("Smooth scroll disabled:", error);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
