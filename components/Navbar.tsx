"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useHasMounted } from "@/lib/hooks";
import { navLinks, fadeInDown } from "@/lib/constants";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const onClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (link: (typeof navLinks)[0]) => {
    const active = isActive(link.href);
    if (link.highlight) {
      return `group relative text-sm font-semibold transition-colors duration-300 text-brand-bluedim hover:text-brand-blue ${
        active ? "text-brand-white" : ""
      }`;
    }
    return `group relative text-sm font-medium transition-colors duration-300 ${
      active ? "text-brand-white" : "text-brand-silver hover:text-brand-white"
    }`;
  };

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <motion.header
        initial={false}
        animate={mounted ? "visible" : false}
        variants={fadeInDown}
        className={`fixed top-0 left-0 right-0 z-40 transition-shadow duration-300 bg-white/90 backdrop-blur-md ${
          scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "shadow-[0_1px_0_rgba(0,0,0,0.06)]"
        }`}
      >
        <div className="border-b border-brand-rule">
          <Container>
            <div className="flex items-center justify-between min-h-[64px] md:min-h-[80px] lg:min-h-[96px]">
              <Logo
                priority
                imageClassName="h-8 w-auto sm:h-16 md:h-20 lg:h-24 max-w-[140px] sm:max-w-none object-contain"
              />

              <nav className="hidden lg:flex items-center gap-5 xl:gap-7 min-w-0 shrink">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`${linkClass(link)} whitespace-nowrap`}
                    >
                      {link.label}
                      {!link.highlight && (
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-brand-blue transition-all duration-300 ${
                            active ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      )}
                      {active && !link.highlight && (
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden lg:block shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 border border-brand-blue text-brand-blue bg-transparent text-sm font-semibold rounded-md transition-all duration-300 hover:bg-brand-blue hover:text-white hover:shadow-blue-glow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-blue whitespace-nowrap"
                >
                  Get Started
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 text-brand-silver hover:text-brand-white transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </Container>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[64px] md:top-[80px] left-0 right-0 z-30 lg:hidden overflow-hidden bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] w-full"
          >
            <nav className="flex flex-col w-full">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeDrawer}
                      className={`flex items-center min-h-[56px] px-6 text-lg font-medium border-b border-brand-rule/50 transition-colors ${
                        link.highlight
                          ? "text-brand-bluedim font-semibold hover:text-brand-blue"
                          : active
                            ? "text-brand-white"
                            : "text-brand-silver hover:text-brand-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="px-6 py-4">
                <Link
                  href="/contact"
                  onClick={closeDrawer}
                  className="inline-flex items-center justify-center min-h-[44px] w-full px-6 py-3 border border-brand-blue text-brand-blue font-semibold rounded-md transition-all duration-300 hover:bg-brand-blue hover:text-white active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
