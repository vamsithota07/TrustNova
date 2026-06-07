"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import ServiceVisual, { type ServiceVisualType } from "@/components/services/ServiceVisuals";
import { staggerContainer, fadeInUp, inViewOptions, WHATSAPP_URL } from "@/lib/constants";

type Service = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  visual: ServiceVisualType;
  bullets: string[];
};

const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Logo Design & Brand Identity",
    subtitle: "A powerful logo is the foundation of every successful brand.",
    visual: "logo",
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

function quoteUrl(title: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(`Hi, I'd like a quote for ${title}`)}`;
}

function ServiceCard({
  service,
  isActive,
  onToggle,
  cardRef,
}: {
  service: Service;
  isActive: boolean;
  onToggle: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      layout
      ref={cardRef}
      className={`min-w-0 bg-brand-card rounded-[14px] border transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
        isActive
          ? "border-brand-blue border-l-4 shadow-[0_8px_40px_rgba(107,130,168,0.15)]"
          : "border-brand-rule hover:border-brand-blue hover:shadow-[0_4px_20px_rgba(107,130,168,0.12)] hover:-translate-y-0.5"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isActive}
        className={`w-full text-left px-7 py-7 md:px-8 md:py-7 ${
          isActive ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <span className="text-brand-blue text-[13px] font-semibold tracking-[2px] opacity-60 shrink-0">
              {service.number}
            </span>
            <h3
              className={`font-bold text-brand-white min-w-0 ${
                isActive
                  ? "text-xl md:text-[26px] md:font-extrabold"
                  : "text-lg md:text-[18px] md:whitespace-nowrap"
              }`}
            >
              {service.title}
            </h3>
          </div>

          <div className="flex items-center shrink-0 md:ml-4">
            <ChevronDown
              size={18}
              className="text-brand-blue shrink-0 transition-transform duration-300 ease-out"
              style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-7 pb-7 md:px-8 md:pb-8 pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="min-w-0">
                  <p className="text-brand-blue text-[15px] italic mt-1 mb-6">{service.subtitle}</p>

                  <ul className="space-y-3">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="text-brand-blue text-sm mt-0.5 shrink-0">▸</span>
                        <span className="text-brand-silver text-[15px] leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden lg:flex flex-col items-stretch w-full">
                  <div className="w-full max-w-md ml-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`visual-${service.id}-${isActive}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <ServiceVisual type={service.visual} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="border-t border-brand-rule mt-6 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-brand-white text-sm font-semibold">Ready to get started?</p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={quoteUrl(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-brand-blue text-white px-7 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-300 hover:shadow-blue-glow"
                  >
                    Get a Quote →
                  </a>
                  <Link
                    href="/services"
                    className="text-brand-blue text-[13px] font-medium underline-offset-4 hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (activeService && cardRefs.current[activeService]) {
      const timer = window.setTimeout(() => {
        cardRefs.current[activeService]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
      return () => window.clearTimeout(timer);
    }
  }, [activeService]);

  const handleToggle = (id: number) => {
    setActiveService((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="relative w-full py-16 md:py-24 bg-brand-dark overflow-hidden">
      <Container>
        <SectionHeader eyebrow="Services" heading="What We Offer" className="mb-4 md:mb-5" />
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="text-center text-brand-blue text-[15px] italic mb-10"
        >
          Click any service to explore what&apos;s included.
        </motion.p>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0"
          initial={false}
          whileInView="visible"
          viewport={inViewOptions}
          variants={staggerContainer(0.08)}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              layout
              variants={fadeInUp}
              className={activeService === service.id ? "md:col-span-2" : undefined}
            >
              <ServiceCard
                service={service}
                isActive={activeService === service.id}
                onToggle={() => handleToggle(service.id)}
                cardRef={(el) => {
                  cardRefs.current[service.id] = el;
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
