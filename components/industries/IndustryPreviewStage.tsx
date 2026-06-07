"use client";

import { useEffect, useRef, useState } from "react";
import { getMockupHtmlPath, getMockupUrl, MOCKUP_HEIGHT, MOCKUP_WIDTH } from "@/lib/mockups";

type IndustryPreviewStageProps = {
  industryId: string;
  title: string;
  active?: boolean;
  className?: string;
};

export default function IndustryPreviewStage({
  industryId,
  title,
  active = true,
  className = "",
}: IndustryPreviewStageProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(0.55);

  useEffect(() => {
    setLoaded(false);
  }, [industryId]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w <= 0 || h <= 0) return;
      setScale(Math.min(w / MOCKUP_WIDTH, h / MOCKUP_HEIGHT, 1));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const src = getMockupHtmlPath(industryId);
  const url = getMockupUrl(industryId);

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center ${className}`}
      data-preview-stage
    >
      <div
        data-preview-frame
        className="relative flex h-full max-h-full w-full max-w-[min(100%,920px)] flex-col overflow-hidden rounded-2xl border border-brand-rule bg-brand-card shadow-[0_32px_80px_rgba(26,26,26,0.12)]"
      >
        <div
          data-preview-chrome
          className="flex shrink-0 items-center gap-3 border-b border-brand-rule bg-brand-dark px-4 py-3 sm:px-5"
        >
          <div className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-warm/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-sage/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-rule" />
          </div>
          <div className="min-w-0 flex-1 rounded-md border border-brand-rule bg-brand-black px-3 py-1.5">
            <span className="block truncate font-mono text-[11px] text-brand-silver">{url}</span>
          </div>
        </div>

        <div
          ref={viewportRef}
          data-preview-viewport
          className="relative min-h-0 flex-1 overflow-hidden bg-brand-muted"
        >
          {!loaded && (
            <div
              className="absolute inset-0 z-10 animate-pulse bg-brand-muted"
              aria-hidden
            />
          )}

          <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
            <div
              data-preview-canvas
              style={{
                width: MOCKUP_WIDTH * scale,
                height: MOCKUP_HEIGHT * scale,
              }}
            >
              <iframe
                key={industryId}
                src={src}
                width={MOCKUP_WIDTH}
                height={MOCKUP_HEIGHT}
                title={title}
                scrolling="no"
                onLoad={() => setLoaded(true)}
                className="block origin-top-left border-0"
                style={{
                  width: MOCKUP_WIDTH,
                  height: MOCKUP_HEIGHT,
                  transform: `scale(${scale})`,
                  pointerEvents: active ? "auto" : "none",
                }}
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-muted/90 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
