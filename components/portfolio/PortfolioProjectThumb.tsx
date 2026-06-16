"use client";

import Image from "next/image";
import { getMockupHtmlPath } from "@/lib/mockups";

type PortfolioProjectThumbProps = {
  imageAlt: string;
  industryId?: string;
  image?: string;
};

export default function PortfolioProjectThumb({
  imageAlt,
  industryId,
  image,
}: PortfolioProjectThumbProps) {
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
