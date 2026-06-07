"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

function lockPage() {
  document.documentElement.classList.add("is-loading");
}

function unlockPage() {
  document.documentElement.classList.remove("is-loading");
}

function displayProgress(value: number) {
  if (value >= 100) return 100;
  return Math.max(1, Math.round(value));
}

/** Survives React Strict Mode remounts - loader runs once per page session. */
let loaderComplete = false;

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(() => !loaderComplete);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (loaderComplete) {
      unlockPage();
      setShow(false);
      return;
    }

    lockPage();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : 1500;
    let raf = 0;
    let hideTimer = 0;
    let safetyTimer = 0;
    let finished = false;

    const finish = () => {
      if (finished || loaderComplete) return;
      finished = true;
      loaderComplete = true;
      setProgress(100);
      setFadeOut(true);
      hideTimer = window.setTimeout(() => {
        unlockPage();
        setShow(false);
      }, reduced ? 0 : 450);
    };

    if (duration === 0) {
      finish();
      return () => clearTimeout(hideTimer);
    }

    const start = Date.now();

    const tick = () => {
      if (finished || loaderComplete) return;

      const elapsed = Date.now() - start;
      const next = Math.min((elapsed / duration) * 100, 100);
      setProgress(next);

      if (next >= 100) {
        finish();
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    safetyTimer = window.setTimeout(finish, 5000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!mounted || !show) return null;

  const counter = displayProgress(progress);

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading TrustNova ${counter} percent`}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-brand-black transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-loader-blink">
        <Image
          src="/logo.png"
          alt="TrustNova - Brand & Creative Studio"
          width={320}
          height={320}
          className="h-40 sm:h-44 md:h-48 w-auto invert object-contain"
          priority
        />
      </div>

      <p
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-white tabular-nums tracking-[-0.04em]"
        aria-hidden
      >
        {counter}
      </p>
    </div>,
    document.body,
  );
}
