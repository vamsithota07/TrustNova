"use client";

import { useLayoutEffect, useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
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

/** First-visit splash runs once per tab session. */
let initialLoaderComplete = false;

const INITIAL_DURATION = 1500;
const NAV_DURATION = 850;

export default function LoadingScreen() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const prevPathname = useRef<string | null>(null);
  const animCleanup = useRef<(() => void) | null>(null);

  const [mounted, setMounted] = useState(false);
  const [readyForNav, setReadyForNav] = useState(initialLoaderComplete);
  const [show, setShow] = useState(() => !initialLoaderComplete);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  pathnameRef.current = pathname;

  const runLoader = useCallback((duration: number, onComplete?: () => void) => {
    animCleanup.current?.();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resolvedDuration = reduced ? 0 : duration;

    lockPage();
    setFadeOut(false);
    setShow(true);
    setProgress(0);

    let raf = 0;
    let hideTimer = 0;
    let safetyTimer = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setFadeOut(true);
      hideTimer = window.setTimeout(() => {
        unlockPage();
        setShow(false);
        onComplete?.();
      }, reduced ? 0 : 450);
    };

    if (resolvedDuration === 0) {
      finish();
      animCleanup.current = () => clearTimeout(hideTimer);
      return;
    }

    const start = Date.now();

    const tick = () => {
      if (finished) return;

      const elapsed = Date.now() - start;
      const next = Math.min((elapsed / resolvedDuration) * 100, 100);
      setProgress(next);

      if (next >= 100) {
        finish();
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    safetyTimer = window.setTimeout(finish, resolvedDuration + 3500);

    animCleanup.current = () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (initialLoaderComplete) {
      unlockPage();
      setShow(false);
      prevPathname.current = pathnameRef.current;
      setReadyForNav(true);
      return;
    }

    runLoader(INITIAL_DURATION, () => {
      initialLoaderComplete = true;
      prevPathname.current = pathnameRef.current;
      setReadyForNav(true);
    });

    return () => animCleanup.current?.();
  }, [runLoader]);

  useEffect(() => {
    if (!readyForNav || !initialLoaderComplete) return;
    if (prevPathname.current === pathname) return;

    prevPathname.current = pathname;
    runLoader(NAV_DURATION);
  }, [pathname, readyForNav, runLoader]);

  useEffect(() => () => animCleanup.current?.(), []);

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
    document.body
  );
}
