"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { gsap, registerGsap } from "@/lib/motion/gsap-register";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import MagneticButton from "@/components/motion/MagneticButton";
import ServiceVisual, { type ServiceVisualType } from "@/components/services/ServiceVisuals";
import { WHATSAPP_URL } from "@/lib/constants";

type Service = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  visual: ServiceVisualType;
  bullets: string[];
  rotate: number;
  accent: "warm" | "sage" | "dusty" | "soft";
};

const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Logo Design & Brand Identity",
    subtitle: "A powerful logo is the foundation of every successful brand.",
    visual: "logo",
    rotate: -2.5,
    accent: "warm",
    bullets: [
      "3 unique initial concepts",
      "Unlimited refinements until 100% satisfied",
      "Full brand colour palette (HEX, RGB, CMYK)",
      "Typography pairing - primary & secondary fonts",
      "Brand usage guidelines document",
      "Final files: PNG, JPG, SVG, PDF, AI",
      "Social media profile versions + monochrome variants",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Complete Brand Identity Package",
    subtitle: "A cohesive visual language for your entire business.",
    visual: "brand",
    rotate: 1.8,
    accent: "sage",
    bullets: [
      "Everything in Logo Design, PLUS:",
      "Business card design (print-ready files)",
      "Letterhead & professional email signature",
      "5 customisable social media post templates",
      "Brand Style Guide (10–15 page PDF)",
      "WhatsApp Business profile banner",
      "Brand icon / favicon for digital use",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Website Design & Development",
    subtitle: "Your website is your most powerful sales tool - we build it right.",
    visual: "website",
    rotate: -1.2,
    accent: "dusty",
    bullets: [
      "Custom design tailored to your brand and goals",
      "Mobile-first responsive - perfect on all devices",
      "Up to 8 pages: Home, About, Services, Portfolio, Blog, Contact",
      "Contact forms and WhatsApp click-to-chat integration",
      "Basic SEO setup: meta titles, descriptions, sitemap",
      "Google Analytics 4 integration",
      "Built on WordPress, Webflow, or static HTML - your choice",
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Website Launch & Go-Live Support",
    subtitle: "We handle every technical detail so your launch goes smoothly.",
    visual: "launch",
    rotate: 2.2,
    accent: "soft",
    bullets: [
      "Domain DNS configuration and pointing (domain by client)",
      "Website deployment to chosen hosting (hosting by client)",
      "SSL certificate setup - HTTPS secure padlock",
      "Cross-browser and device compatibility testing",
      "30-day post-launch support for bugs and minor edits",
      "Handover session - full training included",
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Website Maintenance & Ongoing Support",
    subtitle: "Keep your website healthy, updated, and growing every month.",
    visual: "maintenance",
    rotate: -1.8,
    accent: "warm",
    bullets: [
      "Monthly content updates: text, images, new pages",
      "Plugin and platform updates (WordPress / Webflow)",
      "Regular automated backups",
      "Uptime monitoring and rapid issue resolution",
      "Priority support via WhatsApp and email",
      "Monthly performance and traffic report",
    ],
  },
];

const accentBorder: Record<Service["accent"], string> = {
  warm: "border-t-accent-warm",
  sage: "border-t-accent-sage",
  dusty: "border-t-accent-dusty",
  soft: "border-t-accent-soft",
};

const accentBorderSide: Record<Service["accent"], string> = {
  warm: "border-l-accent-warm",
  sage: "border-l-accent-sage",
  dusty: "border-l-accent-dusty",
  soft: "border-l-accent-soft",
};

const accentText: Record<Service["accent"], string> = {
  warm: "text-accent-warm",
  sage: "text-accent-sage",
  dusty: "text-accent-dusty",
  soft: "text-accent-soft",
};

function quoteUrl(title: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(`Hi, I'd like a quote for ${title}`)}`;
}

function FloatingCard({
  service,
  index,
  isActive,
  onSelect,
}: {
  service: Service;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const el = cardRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onEnter = () => {
      if (isActive) return;
      gsap.to(el, { y: -12, rotate: service.rotate + 1, scale: 1.02, duration: 0.45, ease: "power2.out" });
    };
    const onLeave = () => {
      if (isActive) return;
      gsap.to(el, { y: 0, rotate: service.rotate, scale: 1, duration: 0.5, ease: "power2.out" });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [isActive, service.rotate]);

  const offsetClass =
    index % 2 === 0 ? "md:ml-0 lg:ml-4" : "md:ml-8 lg:ml-16 xl:ml-24";

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onSelect}
      aria-expanded={isActive}
      style={{ rotate: `${service.rotate}deg` }}
      className={`group creative-card ${accentBorder[service.accent]} border-t-4 text-left w-full max-w-md p-6 md:p-7 transition-shadow duration-500 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-brand-white/20 ${offsetClass} ${
        isActive ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dim">
        {service.number}
      </span>
      <h3 className="font-display font-bold text-brand-white text-xl md:text-2xl mt-3 mb-2 tracking-[-0.02em] leading-tight">
        {service.title}
      </h3>
      <p className={`text-sm italic ${accentText[service.accent]}`}>{service.subtitle}</p>
      <span className="inline-flex mt-5 text-xs font-semibold uppercase tracking-widest text-brand-silver group-hover:text-brand-white transition-colors">
        Explore →
      </span>
    </button>
  );
}

function ExpandedPanel({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const panelTransition = { type: "spring" as const, damping: 32, stiffness: 280, mass: 0.85 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200]"
    >
      <motion.button
        type="button"
        aria-label="Close service details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-brand-white/35 backdrop-blur-[6px]"
        onClick={onClose}
      />

      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby={`service-title-${service.id}`}
        initial={{ x: "105%" }}
        animate={{ x: 0 }}
        exit={{ x: "105%" }}
        transition={panelTransition}
        className={`fixed top-0 right-0 z-10 flex h-full w-full max-w-[min(100vw,540px)] sm:max-w-xl lg:max-w-2xl flex-col overflow-hidden border-l-4 bg-brand-card shadow-[-24px_0_80px_rgba(26,26,26,0.12)] ${accentBorderSide[service.accent]}`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-brand-rule bg-brand-card/95 backdrop-blur-md px-6 py-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dim">
              {service.number}
            </span>
            <h3
              id={`service-title-${service.id}`}
              className="font-display font-bold text-brand-white text-xl sm:text-2xl tracking-[-0.02em] mt-0.5"
            >
              {service.title}
            </h3>
          </motion.div>
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-rule text-brand-white hover:bg-brand-dark transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 overflow-y-auto p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:gap-10">
            <div>
              <p className={`text-[15px] italic mb-6 ${accentText[service.accent]}`}>
                {service.subtitle}
              </p>
              <ul className="space-y-3">
                {service.bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.04, duration: 0.35 }}
                    className="flex items-start gap-3"
                  >
                    <span className={`text-sm mt-0.5 shrink-0 ${accentText[service.accent]}`}>▸</span>
                    <span className="text-brand-silver text-[15px] leading-relaxed">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-2">
              <ServiceVisual type={service.visual} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 border-t border-brand-rule bg-brand-card px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <p className="text-brand-white text-sm font-semibold">Ready to get started?</p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton
              href={quoteUrl(service.title)}
              external
              className="btn-magnetic min-h-[48px] px-7 py-3 bg-brand-white text-brand-black font-semibold text-sm rounded-pill shadow-soft hover:shadow-card-hover transition-all"
            >
              Get a Quote →
            </MagneticButton>
            <Link
              href="/services"
              className={`text-[13px] font-medium underline-offset-4 hover:underline ${accentText[service.accent]}`}
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const active = services.find((s) => s.id === activeService) ?? null;

  return (
    <section id="services" className="relative w-full py-section bg-brand-dark overflow-hidden">
      <div className="floating-shape top-20 -right-16 h-64 w-64 bg-accent-soft/20" aria-hidden />
      <Container>
        <SectionHeader eyebrow="Services" heading="What We Offer" className="mb-4 md:mb-5" />
        <p className="text-center text-brand-silver text-[15px] italic mb-12 md:mb-16 max-w-lg mx-auto">
          Click any service to explore what&apos;s included.
        </p>

        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:pl-8">
          {services.map((service, index) => (
            <FloatingCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeService !== null}
              onSelect={() => setActiveService(service.id)}
            />
          ))}
        </div>
      </Container>

      <AnimatePresence mode="wait">
        {active && (
          <ExpandedPanel service={active} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
