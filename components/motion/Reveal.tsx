"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap-register";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  scale?: number;
  as?: keyof JSX.IntrinsicElements;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 56,
  duration = 1,
  scale,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const from: gsap.TweenVars = { opacity: 0, y };
    const to: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    };

    if (scale !== undefined) {
      from.scale = scale;
      to.scale = 1;
    }

    const tween = gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, duration, scale, y]);

  const Component = Tag as "div";

  return (
    <Component ref={ref as never} className={className}>
      {children}
    </Component>
  );
}
