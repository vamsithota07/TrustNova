"use client";

import Image from "next/image";
import { getMockupHtmlPath } from "@/lib/mockups";

type PortfolioProjectThumbProps = {
  title: string;
  industryId?: string;
  image?: string;
};

export default function PortfolioProjectThumb({
  title,
  industryId,
  image,
}: PortfolioProjectThumbProps) {
  if (image) {
    return (
      <div className="relative mx-auto w-[88%] overflow-hidden rounded-lg bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        <div className="relative aspect-[1440/900] w-full">
          <Image
            src={image}
            alt={`${title} preview`}
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
    <div className="relative mx-auto w-[88%] overflow-hidden rounded-lg bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-[1440/900] w-full overflow-hidden">
        <iframe
          src={src}
          title={`${title} preview`}
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
