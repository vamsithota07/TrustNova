"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Image from "next/image";

function lockPage() {
  document.documentElement.classList.add("is-loading");
}

function unlockPage() {
  document.documentElement.classList.remove("is-loading");
}

export default function LoadingScreen() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    let raf = 0;
    let timeout1 = 0;
    let timeout2 = 0;

    setShow(true);
    setFadeOut(false);
    setProgress(0);
    lockPage();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : 1200;
    const start = Date.now();

    const finish = () => {
      setFadeOut(true);
      timeout2 = window.setTimeout(() => {
        unlockPage();
        setShow(false);
      }, reduced ? 0 : 400);
    };

    if (duration === 0) {
      setProgress(100);
      finish();
      return () => {
        clearTimeout(timeout2);
        unlockPage();
      };
    }

    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / duration) * 100, 100));

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout1 = window.setTimeout(finish, 200);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      unlockPage();
    };
  }, [pathname]);

  if (!mounted || !show) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading TrustNova"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-brand-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-loader-blink">
        <Image
          src="/logo.png"
          alt="TrustNova - Brand & Creative Studio"
          width={320}
          height={320}
          className="h-52 sm:h-56 md:h-60 w-auto invert object-contain"
          priority
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-muted">
        <div
          className="h-full bg-brand-blue transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>,
    document.body
  );
}
