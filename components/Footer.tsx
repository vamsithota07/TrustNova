import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/lib/constants";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import FooterContact from "@/components/FooterContact";
import FooterSocialLinks from "@/components/FooterSocialLinks";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden w-full border-t border-brand-rule bg-brand-footer py-section-sm md:py-section">
      <Container className="relative z-[1]">
        <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16 min-w-0">
          <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-0">
            <Link
              href="/"
              className="inline-block transition-opacity duration-300 hover:opacity-85"
            >
              <Logo linked={false} imageClassName="h-20 md:h-28 lg:h-32 w-auto max-w-[200px] object-contain" />
            </Link>

            <div className="mt-4 md:mt-6 space-y-1 text-brand-silver text-sm leading-relaxed max-w-[280px] mx-auto md:mx-0">
              <p>TrustNova built with purpose, designed for you.</p>
              <p>Every brand tells a story that earns trust.</p>
            </div>

            <FooterSocialLinks />
          </div>

          <div className="text-center md:text-left lg:border-r lg:border-brand-rule lg:pr-12 xl:pr-16 min-w-0">
            <h3 className="text-brand-white font-semibold mb-4">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-1 md:block">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block mb-0 md:mb-2 min-h-[44px] md:min-h-0 flex items-center justify-center md:justify-start transition-colors duration-200 text-sm ${
                    link.highlight
                      ? "text-brand-blue hover:text-brand-white font-medium"
                      : "text-brand-dim hover:text-brand-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/terms"
                className="block mb-0 md:mb-2 min-h-[44px] md:min-h-0 flex items-center justify-center md:justify-start transition-colors duration-200 text-sm text-brand-dim hover:text-brand-white"
              >
                Terms
              </Link>
            </nav>
          </div>

          <div className="lg:pl-12 xl:pl-16 min-w-0">
            <FooterContact />
          </div>
        </div>

        <div className="relative z-[1] border-t border-brand-rule mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col items-center gap-4 min-w-0">
          <nav
            aria-label="Legal policies"
            className="flex flex-wrap items-center justify-center gap-x-3 text-xs text-brand-dim"
          >
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-brand-white"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-brand-rule select-none" aria-hidden="true">
              |
            </span>
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-brand-white"
            >
              Privacy Policy
            </Link>
          </nav>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left w-full">
            <p className="text-brand-dim text-xs">
              © 2025 TrustNova. All rights reserved. · trustnova.in · Hyderabad,
              India
            </p>
            <p className="text-brand-blue text-xs">
              Built with ♥ for Indian businesses
            </p>
          </div>
        </div>
      </Container>

      <div
        className="hidden md:block absolute pointer-events-none select-none z-0 right-[-40px] bottom-[-40px] w-[380px] h-[380px]"
      >
        <Image
          src="/logo_icon.png"
          alt=""
          fill
          className="object-contain object-bottom-right opacity-[0.055] invert"
        />
      </div>
    </footer>
  );
};
