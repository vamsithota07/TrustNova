import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  linked?: boolean;
  /** Cropped artwork with no empty margin, so the mark fills the height it is given. */
  tight?: boolean;
}

export default function Logo({
  className = "inline-flex items-center shrink-0 min-w-0",
  imageClassName = "h-8 sm:h-16 md:h-20 lg:h-24 w-auto max-w-[140px] sm:max-w-none",
  priority = false,
  linked = true,
  tight = false,
}: LogoProps) {
  const content = (
    <span className={className}>
      <Image
        src={tight ? "/logo-ink-tight.png" : "/logo-ink.png"}
        alt="TrustNova - brand, website and digital marketing studio, Hyderabad"
        width={tight ? 738 : 280}
        height={tight ? 608 : 120}
        sizes="(max-width: 640px) 160px, 220px"
        className={`${imageClassName} object-contain object-left`}
        priority={priority}
      />
    </span>
  );

  if (!linked) return content;

  return (
    <Link
      href="/"
      className="inline-flex items-center shrink-0 min-w-0 transition-opacity duration-300 hover:opacity-85 active:opacity-75"
    >
      {content}
    </Link>
  );
};
