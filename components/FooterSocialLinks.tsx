"use client";

import { Instagram, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/lib/constants";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const externalLinks = [
  {
    href: socialLinks.instagram,
    label: "TrustNova on Instagram",
    icon: Instagram,
  },
  {
    href: socialLinks.x,
    label: "TrustNova on X",
    icon: XIcon,
  },
  {
    href: socialLinks.linkedin,
    label: "TrustNova on LinkedIn",
    icon: Linkedin,
  },
] as const;

export default function FooterSocialLinks() {
  return (
    <div className="relative flex items-center justify-center gap-4 md:gap-5 mt-6 md:mt-8">
      {externalLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-brand-blue transition-colors duration-200 hover:text-brand-white active:scale-95"
        >
          {Icon === XIcon ? (
            <XIcon className="w-6 h-6 shrink-0" />
          ) : (
            <Icon className="w-6 h-6 shrink-0" strokeWidth={1.75} />
          )}
        </a>
      ))}

      <a
        href={socialLinks.gmail}
        aria-label="Email TrustNova"
        className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-brand-blue transition-colors duration-200 hover:text-brand-white active:scale-95"
      >
        <Mail className="w-6 h-6 shrink-0" strokeWidth={1.75} />
      </a>
    </div>
  );
}
