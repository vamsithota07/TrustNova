"use client";

import { useEffect, useRef, useState } from "react";
import { getMockupHtmlPath, MOCKUP_HEIGHT, MOCKUP_WIDTH } from "@/lib/mockups";

type MockupBrowserFrameProps = {
  industryId: string;
  title: string;
  url?: string;
};

export default function MockupBrowserFrame({
  industryId,
  title,
  url = "www.yourbusiness.com",
}: MockupBrowserFrameProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(0.625);

  useEffect(() => {
    setLoaded(false);
  }, [industryId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(w / MOCKUP_WIDTH, 1));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const src = getMockupHtmlPath(industryId);

  return (
    <div
      className="w-[85%] max-w-[900px] rounded-xl overflow-hidden border border-brand-rule bg-[#1A1E28] shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
    >
      <div className="bg-[#13161D] px-4 py-3 flex items-center gap-3 border-b border-[#2E3448]">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        <div className="flex-1 bg-[#0D0F14] rounded-md px-3 py-1.5 min-w-0">
          <span className="text-brand-bluedim text-xs font-mono truncate block">{url}</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="relative bg-[#0D0F14] overflow-auto"
        style={{ height: "min(65vh, 600px)" }}
      >
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-[#1A1E28] z-10" aria-hidden />
        )}
        <div
          style={{
            width: MOCKUP_WIDTH * scale,
            height: MOCKUP_HEIGHT * scale,
          }}
        >
          <iframe
            src={src}
            width={MOCKUP_WIDTH}
            height={MOCKUP_HEIGHT}
            scrolling="yes"
            title={title}
            onLoad={() => setLoaded(true)}
            className="border-0 block origin-top-left"
            style={{
              width: MOCKUP_WIDTH,
              height: MOCKUP_HEIGHT,
              transform: `scale(${scale})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
