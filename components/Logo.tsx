import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  linked?: boolean;
}

export default function Logo({
  className = "inline-flex items-center shrink-0 min-w-0",
  imageClassName = "h-8 sm:h-16 md:h-20 lg:h-24 w-auto max-w-[140px] sm:max-w-none",
  priority = false,
  linked = true,
}: LogoProps) {
  const content = (
    <span className={className}>
      <Image
        src="/logo.png"
        alt="TrustNova - Brand & Creative Studio"
        width={280}
        height={120}
        sizes="140px"
        className={`${imageClassName} invert object-contain h-auto max-h-full`}
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
