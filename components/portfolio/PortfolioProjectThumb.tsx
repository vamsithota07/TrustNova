"use client";

import Image from "next/image";
import { getMockupHtmlPath } from "@/lib/mockups";

type PortfolioProjectThumbProps = {
  imageAlt: string;
  industryId?: string;
  image?: string;
  variant?: "campaign";
};

export default function PortfolioProjectThumb({
  imageAlt,
  industryId,
  image,
  variant,
}: PortfolioProjectThumbProps) {
  if (variant === "campaign") {
    return (
      <div className="relative mx-auto flex aspect-[1440/900] w-full flex-col justify-between overflow-hidden rounded-lg bg-[#E8E6D7] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:w-[88%]" role="img" aria-label={imageAlt}>
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.22em] text-[#546B47]"><span>Milletio</span><span>Global Grain</span></div>
        <div><p className="font-display text-[clamp(1.4rem,3vw,3rem)] font-bold leading-[0.95] tracking-[-0.05em] text-[#31402A]">GOOD GRAIN.<br />GOOD GROWTH.</p><div className="mt-4 h-1.5 w-2/3 rounded-full bg-[#C4674A]" /></div>
        <div className="grid grid-cols-3 gap-2"><div className="rounded-md bg-[#546B47] p-2 text-[8px] font-bold text-white">SOCIAL</div><div className="rounded-md bg-[#D8B44A] p-2 text-[8px] font-bold text-[#31402A]">SEARCH</div><div className="rounded-md bg-[#C4674A] p-2 text-[8px] font-bold text-white">GROWTH</div></div>
      </div>
    );
  }
  if (image) {
    return (
      <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:w-[88%]">
        <div className="relative aspect-[1440/900] w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 78vw, 40vw"
          />
        </div>
      </div>
    );
  }

  if (!industryId) return null;

  const src = getMockupHtmlPath(industryId);

  return (
    <div
      className="relative mx-auto w-full overflow-hidden rounded-lg bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:w-[88%]"
      role="img"
      aria-label={imageAlt}
    >
      <div className="relative aspect-[1440/900] w-full overflow-hidden">
        <iframe
          src={src}
          title={imageAlt}
          loading="lazy"
          scrolling="no"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{
            width: 1440,
            height: 900,
            transform: "scale(0.28)",
          }}
        />
      </div>
    </div>
  );
}
