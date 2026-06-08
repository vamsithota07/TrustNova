"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useHasMounted } from "@/lib/hooks";
import { navLinks } from "@/lib/constants";
import MagneticButton from "@/components/motion/MagneticButton";
import Logo from "@/components/Logo";
import { getLenisInstance } from "@/lib/motion/lenis";

export default function Navbar() {
  const pathname = usePathname();
  const mounted = useHasMounted();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    getLenisInstance()?.stop();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenisInstance()?.start();
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const linkClass = (active: boolean) =>
    `px-3 xl:px-4 py-2 text-[12px] xl:text-[13px] font-medium rounded-pill transition-all duration-300 whitespace-nowrap ${
      active
        ? "text-brand-white bg-brand-dark"
        : "text-brand-silver hover:text-brand-white hover:bg-brand-dark/60"
    }`;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={mounted ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="site-navbar fixed top-0 left-0 right-0 z-[1000] px-3 sm:px-5 pt-3 sm:pt-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto mx-auto max-w-editorial flex items-center justify-between gap-4 rounded-pill border transition-all duration-500 ease-premium ${
            scrolled
              ? "bg-brand-card/95 backdrop-blur-xl border-brand-rule shadow-nav py-2.5 px-4 sm:px-6 lg:px-8"
              : "bg-brand-card/80 backdrop-blur-md border-brand-rule/80 shadow-soft py-3 px-4 sm:px-6 lg:px-8"
          }`}
        >
          <Logo
            priority
            imageClassName="h-9 sm:h-11 md:h-12 lg:h-14 w-auto min-w-[90px] sm:min-w-[120px] max-w-[150px] sm:max-w-[180px] object-contain"
          />

          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 min-w-0 shrink">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(isActive(link.href))}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block shrink-0">
            <MagneticButton
              href="/contact"
              className={`min-h-[42px] px-5 xl:px-6 text-[13px] font-semibold rounded-pill transition-all duration-500 ease-premium ${
                isActive("/contact")
                  ? "bg-brand-white text-brand-black shadow-soft"
                  : "bg-brand-white text-brand-black hover:shadow-card-hover"
              }`}
            >
              Contact
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full text-brand-white hover:bg-brand-dark transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-brand-white/30 backdrop-blur-sm lg:hidden"
              onClick={closeDrawer}
            />
            <motion.div
              ref={drawerRef}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[4.5rem] left-3 right-3 z-50 lg:hidden overflow-hidden rounded-organic border border-brand-rule bg-brand-card/98 backdrop-blur-xl shadow-nav"
            >
              <nav className="flex flex-col p-2">
                {[...navLinks, { label: "Contact", href: "/contact" }].map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeDrawer}
                        className={`flex items-center min-h-[52px] px-4 text-base font-medium rounded-2xl transition-colors ${
                          active
                            ? "bg-brand-dark text-brand-white"
                            : "text-brand-silver hover:bg-brand-dark/60 hover:text-brand-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
