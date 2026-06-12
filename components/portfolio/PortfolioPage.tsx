"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import {
  EMAIL,
  WHATSAPP_URL,
  btnPrimary,
  fadeInUp,
  inViewOptions,
  socialLinks,
} from "@/lib/constants";
import {
  featuredProjects,
  portfolioProjects,
  studioExperience,
  studioTools,
  type PortfolioProject,
} from "@/lib/portfolio";
import PortfolioHeroHeader from "@/components/portfolio/PortfolioHeroHeader";
import PortfolioProjectThumb from "@/components/portfolio/PortfolioProjectThumb";
import MagneticButton from "@/components/motion/MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PortfolioProjectCard({
  project,
  index,
  wide = false,
}: {
  project: PortfolioProject;
  index: number;
  wide?: boolean;
}) {
  const card = (
    <>
      <div
        className="relative flex flex-col overflow-hidden rounded-sm p-3 pt-4 pb-3"
        style={{ backgroundColor: project.panelBg, color: project.panelText }}
      >
        <span className="absolute right-3 top-3 text-[10px] font-bold tracking-[0.2em] opacity-70">
          {project.number}
        </span>
        <PortfolioProjectThumb
          title={project.title}
          industryId={project.industryId}
          image={project.image}
        />
        <span
          className="mt-3 font-display text-5xl font-bold leading-none opacity-90 md:text-6xl"
          aria-hidden
        >
          {project.number.replace("0", "")}
        </span>
      </div>
      <div className="mt-4 min-w-0 px-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-warm">
          {project.category}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-brand-white group-hover:text-accent-warm transition-colors">
          {project.title}
          {project.href ? (
            <ArrowUpRight className="ml-1 inline h-4 w-4 align-[-2px] opacity-60" />
          ) : null}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-brand-silver">{project.description}</p>
      </div>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOptions}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      className={
        wide
          ? "flex w-[85vw] shrink-0 snap-center flex-col sm:w-[70vw] md:w-auto"
          : "flex w-[78vw] shrink-0 snap-center flex-col sm:w-[52vw] md:w-auto"
      }
    >
      {project.href ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
          {card}
        </a>
      ) : (
        card
      )}
    </motion.article>
  );
}

export default function PortfolioPage() {
  return (
    <div className="overflow-x-clip bg-brand-black">
      <PortfolioHeroHeader />

      {/* Studio bio */}
      <section className="border-b border-brand-rule px-4 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={fadeInUp}
          >
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-brand-white md:text-4xl">
              Hi, we&apos;re{" "}
              <span className="text-accent-warm">TrustNova</span>
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-brand-silver md:text-lg">
              A Hyderabad-based brand &amp; creative studio crafting logos, identities,
              and conversion-focused websites for Indian businesses. We believe great
              design earns trust before a single word is read, and we build every
              project with that principle at the centre.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={fadeInUp}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          >
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-warm">
                Experience
              </p>
              <ul className="space-y-4">
                {studioExperience.map((item) => (
                  <li key={item.period} className="border-b border-brand-rule/80 pb-4 last:border-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-dim">{item.period}</p>
                    <p className="mt-1 text-sm font-semibold text-brand-white">{item.role}</p>
                    <p className="text-sm text-brand-silver">{item.org}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-warm">
                Contact
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-brand-white transition-colors hover:text-accent-warm"
                  >
                    <Mail className="h-4 w-4 text-accent-warm" />
                    {EMAIL}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-brand-white transition-colors hover:text-accent-warm"
                  >
                    WhatsApp
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-brand-white transition-colors hover:text-accent-warm"
                  >
                    <Instagram className="h-4 w-4 text-accent-warm" />
                    @trustnova.in
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-brand-white transition-colors hover:text-accent-warm"
                  >
                    <XIcon className="h-4 w-4 text-accent-warm" />
                    @trustnovain
                  </a>
                </li>
              </ul>

              <p className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-warm">
                Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {studioTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-pill border border-brand-rule bg-brand-card px-3 py-1.5 text-xs font-medium text-brand-silver"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects: CONTENT masthead + panels */}
      <section className="relative px-4 py-16 sm:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center overflow-hidden md:top-12">
          <span
            className="portfolio-outline-text font-display text-[clamp(4rem,22vw,14rem)] font-bold uppercase leading-none"
            aria-hidden
          >
            WORK
          </span>
        </div>

        <div className="relative mx-auto max-w-editorial">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewOptions}
            variants={fadeInUp}
            className="mb-10 flex items-end justify-between gap-4 md:mb-14"
          >
            <div>
              <p className="editorial-eyebrow mb-2 text-accent-warm">Selected Projects</p>
              <h2 className="font-display text-2xl font-bold text-brand-white md:text-3xl">
                Brands we&apos;ve shaped
              </h2>
            </div>
            <Link
              href="/industries"
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-silver transition-colors hover:text-accent-warm sm:inline-flex"
            >
              View all industries
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Featured client work: Vistix & ASMC */}
          <div className="horizontal-scroll mb-12 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:gap-6">
            {featuredProjects.map((project, i) => (
              <PortfolioProjectCard key={project.id} project={project} index={i} wide />
            ))}
          </div>

          <p className="editorial-eyebrow mb-6 text-accent-warm">Industry showcases</p>

          <div className="horizontal-scroll flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:pb-0 lg:gap-4">
            {portfolioProjects.map((project, i) => (
              <PortfolioProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-brand-rule bg-brand-dark px-4 py-16 sm:px-8 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-2xl font-bold text-brand-white md:text-4xl">
            Ready to be our next project?
          </h2>
          <p className="mt-4 text-base text-brand-silver md:text-lg">
            Let&apos;s build a brand and website your customers trust from the first scroll.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href={WHATSAPP_URL} external className={btnPrimary}>
              Start Your Project →
            </MagneticButton>
            <MagneticButton href="/contact" className="text-sm font-semibold text-brand-silver underline-offset-4 hover:text-brand-white hover:underline">
              Get in touch
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
