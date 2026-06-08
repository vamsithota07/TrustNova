"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap, ScrollTrigger } from "@/lib/motion/gsap-register";
import { setLenisInstance } from "@/lib/motion/lenis";

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
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1,
        syncTouch: true,
      });

      setLenisInstance(lenis);

      lenis.on("scroll", ScrollTrigger.update);

      const scrollerProxy = {
        scrollTop(value?: number) {
          if (arguments.length && lenis && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis?.scroll ?? window.scrollY;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "transform" as const,
      };

      ScrollTrigger.scrollerProxy(document.documentElement, scrollerProxy);
      ScrollTrigger.scrollerProxy(document.body, scrollerProxy);

      ScrollTrigger.addEventListener("refresh", () => lenis?.resize());
      ScrollTrigger.refresh();

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
      setLenisInstance(null);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
