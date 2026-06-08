"use client";

import { useState } from "react";
import { Instagram, Linkedin, Mail } from "lucide-react";
import {
  LINKEDIN_COMING_SOON_MESSAGE,
  socialLinks,
} from "@/lib/constants";

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
] as const;

export default function FooterSocialLinks() {
  const [linkedinNotice, setLinkedinNotice] = useState(false);

  const showLinkedinNotice = () => {
    setLinkedinNotice(true);
    window.setTimeout(() => setLinkedinNotice(false), 3200);
  };

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

      <div className="relative">
        <button
          type="button"
          onClick={showLinkedinNotice}
          aria-label="LinkedIn — profile coming soon"
          title={LINKEDIN_COMING_SOON_MESSAGE}
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-brand-dim transition-colors duration-200 hover:text-brand-silver active:scale-95 cursor-pointer"
        >
          <Linkedin className="w-6 h-6 shrink-0" strokeWidth={1.75} />
        </button>

        {linkedinNotice && (
          <p
            role="status"
            className="absolute bottom-full left-1/2 z-20 mb-2 w-[min(240px,70vw)] -translate-x-1/2 rounded-lg border border-brand-rule bg-brand-card px-3 py-2 text-center text-[11px] leading-snug text-brand-silver shadow-lg"
          >
            {LINKEDIN_COMING_SOON_MESSAGE}
          </p>
        )}
      </div>

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
