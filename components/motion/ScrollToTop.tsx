"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/motion/gsap-register";
import { getLenisInstance } from "@/lib/motion/lenis";

function resetScrollPosition() {
  const lenis = getLenisInstance();

  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    resetScrollPosition();
  }, [pathname]);

  return null;
}
