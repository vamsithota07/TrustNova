"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getMockupHtmlPath, getMockupUrl, MOCKUP_HEIGHT, MOCKUP_WIDTH } from "@/lib/mockups";
import { hexToRgbString } from "@/lib/colors";

type IndustryPreviewStageProps = {
  industryId: string;
  title: string;
  active?: boolean;
  className?: string;
  tintColor?: string;
  shouldLoad?: boolean;
  compact?: boolean;
};

export default function IndustryPreviewStage({
  industryId,
  title,
  active = true,
  className = "",
  tintColor = "#C4674A",
  shouldLoad = true,
  compact = false,
}: IndustryPreviewStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [loadingBar, setLoadingBar] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setLoadingBar(true);
    const timer = window.setTimeout(() => setLoadingBar(false), 600);
    return () => window.clearTimeout(timer);
  }, [industryId]);

  useLayoutEffect(() => {
    const calculate = () => {
      if (!stageRef.current) return;
      const { width, height } = stageRef.current.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      const scaleX = width / MOCKUP_WIDTH;
      const scaleY = height / MOCKUP_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    calculate();
    const ro = new ResizeObserver(calculate);
    const el = stageRef.current;
    if (el) ro.observe(el);
    return () => ro.disconnect();
  }, [industryId, compact]);

  const src = getMockupHtmlPath(industryId);
  const url = getMockupUrl(industryId);
  const tintRgb = hexToRgbString(tintColor);

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center ${className}`}
      data-preview-stage
      style={{
        background: `radial-gradient(ellipse at center, rgba(${tintRgb}, 0.08), transparent 60%)`,
      }}
    >
      <div
        data-preview-frame
        className={`relative flex h-full max-h-full w-full flex-col overflow-hidden rounded-2xl ${
          compact ? "border border-brand-rule bg-brand-card shadow-soft" : ""
        }`}
        style={
          compact
            ? undefined
            : {
                maxWidth: "min(100%, 920px)",
                background: "rgba(20,20,28,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.4), 0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
              }
        }
      >
        <div
          data-preview-chrome
          className="group/chrome relative flex shrink-0 items-center gap-3 px-4 py-3 sm:px-5"
          style={{
            background: "rgba(20,20,28,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {loadingBar && (
            <div
              className="absolute inset-x-0 top-0 h-0.5 overflow-hidden"
              aria-hidden
            >
              <div
                className="h-full origin-left bg-accent-warm"
                style={{ animation: "mockup-load-bar 0.6s ease-out forwards" }}
              />
            </div>
          )}
          <div className="flex shrink-0 gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full transition-opacity group-hover/chrome:opacity-100"
              style={{ background: "#FF5F57", boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.3)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full transition-opacity group-hover/chrome:opacity-100"
              style={{ background: "#FFBD2E", boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.3)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full transition-opacity group-hover/chrome:opacity-100"
              style={{ background: "#28CA41", boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.3)" }}
            />
          </div>
          <div className="min-w-0 flex-1 rounded-md border border-brand-rule/60 bg-brand-black/80 px-3 py-1.5">
            <span className="block truncate font-mono text-[11px] text-brand-silver">{url}</span>
          </div>
        </div>

        <div
          ref={stageRef}
          data-preview-viewport
          className="relative min-h-0 flex-1 overflow-hidden bg-brand-muted"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!loaded && shouldLoad && (
            <div className="absolute inset-0 z-10 animate-pulse bg-brand-muted" aria-hidden />
          )}

          {shouldLoad ? (
            <div
              style={{
                width: `${MOCKUP_WIDTH}px`,
                height: `${MOCKUP_HEIGHT}px`,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                flexShrink: 0,
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
                style={{
                  width: `${MOCKUP_WIDTH}px`,
                  height: `${MOCKUP_HEIGHT}px`,
                  border: "none",
                  display: "block",
                  pointerEvents: compact ? "none" : active ? "auto" : "none",
                }}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-[70%] w-[85%] animate-pulse rounded-lg bg-brand-rule/40" />
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-muted/90 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
