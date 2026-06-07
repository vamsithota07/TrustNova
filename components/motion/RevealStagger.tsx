"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap-register";

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export default function RevealStagger({
  children,
  className = "",
  stagger = 0.1,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll("[data-reveal-item]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 40 });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
