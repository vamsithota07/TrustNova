"use client";

import Reveal from "@/components/motion/Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  subtext?: string;
  className?: string;
  align?: "center" | "left";
  size?: "default" | "large";
  highlight?: string;
}

export default function SectionHeader({
  eyebrow,
  heading,
  subtext,
  className = "",
  align = "center",
  size = "default",
  highlight,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const headingSize =
    size === "large"
      ? "text-display-sm md:text-display-md lg:text-[4.5rem]"
      : "text-[clamp(2rem,5vw,3.75rem)] md:text-display-sm";

  const renderHeading = () => {
    if (highlight && heading.includes(highlight)) {
      const [before, after] = heading.split(highlight);
      return (
        <>
          {before}
          <span className="text-accent-warm">{highlight}</span>
          {after}
        </>
      );
    }
    return heading;
  };

  return (
    <div className={`${alignClass} mb-12 md:mb-16 lg:mb-20 min-w-0 ${className}`}>
      <Reveal delay={0}>
        <p className="editorial-eyebrow mb-4 md:mb-5">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08} y={64}>
        <h2 className={`editorial-heading ${headingSize}`}>{renderHeading()}</h2>
      </Reveal>
      {subtext && (
        <Reveal delay={0.16} y={40}>
          <p
            className={`mt-5 md:mt-6 editorial-body text-base md:text-lg max-w-2xl leading-[1.75] ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {subtext}
          </p>
        </Reveal>
      )}
    </div>
  );
}
