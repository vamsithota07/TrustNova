"use client";

import { useEffect, useRef, useState } from "react";
import { getMockupHtmlPath, MOCKUP_HEIGHT, MOCKUP_WIDTH } from "@/lib/mockups";

type MockupIframePreviewProps = {
  industryId: string;
  title: string;
  scale?: number;
  className?: string;
  preload?: boolean;
};

export default function MockupIframePreview({
  industryId,
  title,
  scale = 0.248,
  className = "",
  preload = false,
}: MockupIframePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(preload);
  const [loaded, setLoaded] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (preload) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [preload, industryId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setBox({ w: el.clientWidth, h: el.clientHeight });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setLoaded(false);
  }, [industryId]);

  const src = getMockupHtmlPath(industryId);
  const zoom = box.w > 0 ? box.w / MOCKUP_WIDTH : scale;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-full min-w-0 h-full bg-[#1A1E28] ${className}`}
      style={{ overflow: "clip", contain: "layout paint" }}
    >
      {(!isVisible || !loaded) && (
        <div className="absolute inset-0 animate-pulse bg-[#1A1E28] z-0" aria-hidden />
      )}

      {isVisible && box.w > 0 && (
        <div
          className="pointer-events-none select-none origin-top-left"
          style={{
            width: MOCKUP_WIDTH,
            height: MOCKUP_HEIGHT,
            zoom,
          }}
        >
          <iframe
            src={src}
            title={title}
            loading="lazy"
            scrolling="no"
            onLoad={() => setLoaded(true)}
            className="block border-0 pointer-events-none"
            width={MOCKUP_WIDTH}
            height={MOCKUP_HEIGHT}
          />
        </div>
      )}
    </div>
  );
}
