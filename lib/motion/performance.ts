export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function isCoarseViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function shouldRenderNearby(activeIndex: number, index: number, radius = 1): boolean {
  return Math.abs(activeIndex - index) <= radius;
}

export function applyMobileTimelineScale(gsap: { globalTimeline: { timeScale: (v: number) => void } }): void {
  if (typeof window === "undefined") return;
  if (window.innerWidth < 768) {
    gsap.globalTimeline.timeScale(1.5);
  }
}
