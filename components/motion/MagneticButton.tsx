"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function MagneticButton({
  children,
  className = "",
  href,
  external,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const shared =
    "magnetic-btn inline-flex items-center justify-center transition-transform duration-300 ease-premium will-change-transform";

  if (href) {
    if (external) {
      return (
        <a
          ref={ref as never}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${shared} ${className}`}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as never}
        href={href}
        className={`${shared} ${className}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as never}
      type={type}
      onClick={onClick}
      className={`${shared} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}
