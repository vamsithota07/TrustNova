"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import { WHATSAPP_URL } from "@/lib/constants";

const serif = Instrument_Serif({ weight: "400", style: ["italic"], subsets: ["latin"], display: "swap" });

/* The homepage hero. It opens on a title card (the page's h1, the main buttons and real proof) that dissolves into
   the story as the visitor scrolls. Then what TrustNova does, told by scrolling. One continuous scene moves through the five things we do:
   a pencil sketch of a logo, the brand identity around it, the website, the launch, and the marketing that brings
   customers. The animation is an image sequence drawn on a canvas from the scroll position (frames in /public/story,
   a lighter set for phones); the words are real text on the page. The
   first frame is a normal image that loads straight away; the rest load behind it. With reduced motion, the finished
   picture and all five chapters are shown without the scroll animation. */

const FRAMES = 240;
const CREAM = "#F3EEE5";
const HOLD = 0.05; // share of the scroll the title card takes before the story starts
const TERRA = "#B5482A";

type Chapter = { n: string; eyebrow: string; title: string; text: string; chips: string[]; range: [number, number] };
const chapters: Chapter[] = [
  { n: "01", eyebrow: "Logo design", title: "Every brand starts as a sketch.", range: [0.06, 0.145],
    text: "We begin with your story, your customers and a pencil. The right idea comes before any colour or font.",
    chips: ["3 unique concepts", "Unlimited refinements", "Every file format"] },
  { n: "02", eyebrow: "Brand identity", title: "One idea, everywhere your customers look.", range: [0.19, 0.46],
    text: "Your logo grows into a complete look that people recognise at a glance.",
    chips: ["Business cards", "Colours & fonts", "Social templates", "Signage", "Packaging", "Style guide"] },
  { n: "03", eyebrow: "Website design", title: "A website that turns visitors into enquiries.", range: [0.525, 0.68],
    text: "Designed for phones first, built to load fast, and easy for customers to contact you.",
    chips: ["Mobile-first", "Up to 8 pages", "WhatsApp chat button", "Basic SEO", "Google Analytics", "Live in 2-4 weeks"] },
  { n: "04", eyebrow: "Launch & care", title: "We handle the tech. You open for business.", range: [0.735, 0.86],
    text: "Domain, hosting, security and testing are taken care of, and we stay with you after launch.",
    chips: ["Domain & hosting", "SSL security", "Speed & testing", "30 days of support", "Monthly website care"] },
  { n: "05", eyebrow: "Digital marketing", title: "Then we help the right people find you.", range: [0.905, 2],
    text: "A monthly plan to get you found on Google, seen on social media and chosen over the shop next door.",
    chips: ["SEO", "Google Business Profile", "Social media", "Google & Meta ads", "Monthly reports"] },
];

const PROOF = [["3-5 days", "logo concepts"], ["2-4 weeks", "website live"], ["100%", "yours to keep"]];
const CLIENTS = ["Milletio Global Grain", "Vistix Engineers", "Asian Speciality Medical Centre"];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// how visible a chapter is at progress p: fades in over [a, a+0.035], out over [b-0.035, b]
const band = (p: number, a: number, b: number) => clamp(Math.min((p - a) / 0.035, (b - p) / 0.035));

export default function BrandStory() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = section.current!, cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const small = window.innerWidth < 768;
    const dir = small ? "m" : "d";
    let frame = -1, raf = 0;

    const draw = (i: number) => {
      // nearest frame that has loaded, so the picture never goes blank while the rest arrive
      let k = i;
      while (k > 0 && !images.current[k]?.complete) k--;
      const img = images.current[k];
      if (!img || !img.complete || !img.naturalWidth) return;
      const w = cv.clientWidth, h = cv.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
      ctx.fillStyle = CREAM; ctx.fillRect(0, 0, cv.width, cv.height);
      if (small) {
        // phones: the wide scene across the top of the screen, enlarged a little and centred on the subject (right of
        // centre), with the words below it; cropping it to the full tall screen would show only a sliver
        const s = (cv.width / img.naturalWidth) * 1.7, dw = img.naturalWidth * s, dh = img.naturalHeight * s;
        const dy = cv.height * 0.05;
        ctx.drawImage(img, (cv.width - dw) * 0.7, dy, dw, dh);
        // fade the picture's top and bottom edges into the cream, so there is no visible line
        for (const [y0, y1] of [[dy + dh * 0.12, dy - 1], [dy + dh * 0.72, dy + dh + 1]]) {
          const g = ctx.createLinearGradient(0, y0, 0, y1);
          g.addColorStop(0, CREAM + "00"); g.addColorStop(1, CREAM);
          ctx.fillStyle = g; ctx.fillRect(0, Math.min(y0, y1), cv.width, Math.abs(y1 - y0));
        }
      } else {
        const s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight);
        const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
        ctx.drawImage(img, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh);
      }
    };

    // all frames, in order; the browser fetches them behind the opening screen
    for (let i = 0; i < FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `/story/${dir}/${String(i + 1).padStart(3, "0")}.webp`;
      img.onload = () => { if (Math.abs(i - frame) < 3 || i === 0) draw(Math.max(frame, 0)); };
      images.current[i] = img;
    }

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const prog = clamp(-r.top / total);
      setP(prog);
      // the picture holds on the sketch while the title card is up, then plays through the rest of the scroll
      const i = Math.round(clamp((prog - HOLD) / (1 - HOLD)) * (FRAMES - 1));
      if (i !== frame) { frame = i; draw(i); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [reduced]);

  const heading = (c: Chapter) => (
    <h2 className="font-display mt-3 font-bold leading-[1.02] tracking-[-0.04em] text-brand-white text-[clamp(2rem,4.2vw,3.6rem)]">{c.title}</h2>
  );

  // the opening title card
  const titleCard = (
    <div className="max-w-[760px]">
      <p className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-brand-rule bg-white/70 py-1.5 pl-2.5 pr-4 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-brand-silver backdrop-blur-sm" style={{ animationDelay: "0.05s" }}>
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: TERRA }} /><span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: TERRA }} /></span>
        <span className="md:hidden">Design studio · Worldwide</span><span className="hidden md:inline">Brand, web &amp; growth studio · Worldwide</span>
      </p>
      <h1 className="font-display mt-4 md:mt-7 font-bold text-brand-white leading-[0.95] tracking-[-0.055em] text-[clamp(2.9rem,6.6vw,6.9rem)]">
        <span className="block overflow-hidden pb-[0.06em]"><span className="hero-word block" style={{ animationDelay: "0.12s" }}>We build brands</span></span>
        <span className="block overflow-hidden pb-[0.14em]">
          <span className="hero-word block" style={{ animationDelay: "0.24s" }}>
            people{" "}
            <span className={`${serif.className} relative inline-block font-normal text-[1.1em] leading-[0.8] tracking-[-0.02em] pr-[0.08em]`} style={{ color: TERRA }}>
              trust.
              <svg className="hero-underline absolute left-0 -bottom-[0.06em] w-full h-[0.2em] overflow-visible" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
                <path d="M3 13 C 40 5, 85 4, 120 9 S 180 15, 197 6" fill="none" stroke={TERRA} strokeWidth="3.2" strokeLinecap="round" pathLength={1} />
              </svg>
            </span>
          </span>
        </span>
        <span className="sr-only"> TrustNova, brand, website and digital marketing studio</span>
      </h1>
      <p className="hero-rise editorial-body mt-4 md:mt-7 max-w-[540px] text-[15px] md:text-lg leading-[1.7]" style={{ animationDelay: "0.4s" }}>
        Logos, brand identities, websites and digital marketing for growing businesses. From the first sketch to your first customers, one studio does it all.
      </p>
      <div className="hero-rise mt-6 md:mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.52s" }}>
        <Link href="/contact" className="group inline-flex min-h-[50px] items-center gap-2 rounded-full px-6 md:px-7 text-sm md:text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(34,29,26,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(181,72,42,0.55)]" style={{ background: "#221D1A" }}>
          Book a free call <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-brand-rule bg-white/80 px-5 md:px-6 text-sm md:text-base font-semibold text-brand-white backdrop-blur-sm transition-colors hover:border-[#B5482A66]">
          <MessageCircle className="h-4 w-4" style={{ color: TERRA }} /> <span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">Chat on WhatsApp</span>
        </a>
      </div>
      <div className="hero-rise mt-7 md:mt-12 flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-4 md:gap-x-10" style={{ animationDelay: "0.64s" }}>
        {PROOF.map(([big, small]) => (
          <div key={big} className="min-w-0">
            <p className="font-display text-xl md:text-2xl font-bold tracking-[-0.03em] text-brand-white">{big}</p>
            <p className="text-xs md:text-sm text-brand-dim">{small}</p>
          </div>
        ))}
      </div>
      <p className="hero-rise mt-6 md:mt-8 hidden sm:block text-xs md:text-sm text-brand-dim" style={{ animationDelay: "0.74s" }}>
        Trusted by <span className="font-semibold text-brand-silver">{CLIENTS.join(" · ")}</span>
      </p>
    </div>
  );

  const buttons = (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5" style={{ color: "#fff", background: "#221D1A" }}>
        Book a free call <ArrowRight className="h-4 w-4" />
      </Link>
      <Link href="/portfolio" className="inline-flex items-center rounded-full border border-brand-rule bg-white/80 px-6 py-3 text-sm font-semibold text-brand-white">
        See our work
      </Link>
    </div>
  );

  const hero = clamp(1 - p / HOLD);

  if (reduced) {
    return (
      <section id="how-we-build" className="w-full py-section px-4 sm:px-8" style={{ background: CREAM }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-14">{titleCard}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/story/d/${FRAMES}.webp`} alt="A website on a laptop and phone, with marketing icons around it" className="w-full rounded-3xl" loading="lazy" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {chapters.map((c, i) => (
              <div key={c.n}>
                <p className="editorial-eyebrow text-accent-warm">{c.n} · {c.eyebrow}</p>
                {heading(c)}
                <p className="editorial-body mt-2 text-sm leading-[1.7]">{c.text}</p>
                <p className="mt-2 text-sm text-brand-silver">{c.chips.join(" · ")}</p>
              </div>
            ))}
          </div>
          {buttons}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} id="how-we-build" aria-label="What TrustNova does" className="relative w-full h-[860vh] md:h-[945vh]" style={{ background: CREAM }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <picture>
          <source media="(max-width: 767px)" srcSet="/story/m/001.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/story/d/001.webp" alt="" aria-hidden fetchPriority="high" decoding="async"
            className="absolute inset-0 h-full w-full object-cover max-md:h-auto max-md:top-[5%] max-md:w-[170%] max-md:max-w-none max-md:left-[-49%]" />
        </picture>
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
        {/* soft cream fade behind the words: from the left on wide screens, from the bottom on phones */}
        <div className="pointer-events-none absolute inset-0 hidden md:block" style={{ background: `linear-gradient(90deg, ${CREAM} 0%, ${CREAM}e6 26%, ${CREAM}00 52%)` }} />
        <div className="pointer-events-none absolute inset-0 md:hidden" style={{ background: `linear-gradient(0deg, ${CREAM} 0%, ${CREAM}f0 40%, ${CREAM}00 62%)` }} />

        {/* the title card, with a stronger fade behind it, dissolving upwards as the story begins */}
        <div className="pointer-events-none absolute inset-0 hidden md:block" style={{ opacity: hero, background: `radial-gradient(60% 70% at 18% 45%, ${TERRA}14 0%, ${TERRA}00 70%), linear-gradient(90deg, ${CREAM} 0%, ${CREAM}f2 38%, ${CREAM}00 68%)` }} />
        <div className="pointer-events-none absolute inset-0 md:hidden" style={{ opacity: hero, background: `linear-gradient(0deg, ${CREAM} 0%, ${CREAM} 46%, ${CREAM}00 64%)` }} />
        <div className="absolute inset-0 flex items-end md:items-center px-6 pb-8 md:pb-0 md:pt-20 md:pl-[clamp(24px,6vw,96px)]"
          style={{ opacity: hero, transform: `translateY(${(1 - hero) * -40}px) scale(${1 - (1 - hero) * 0.03})`, filter: hero < 1 ? `blur(${(1 - hero) * 6}px)` : undefined, pointerEvents: hero > 0.5 ? "auto" : "none", transformOrigin: "left center" }}>
          {titleCard}
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-dim" style={{ opacity: hero }} aria-hidden>
          <span className="hero-rise" style={{ animationDelay: "1s" }}>Scroll to see how a brand is built</span>
          <span className="relative h-10 w-px overflow-hidden bg-brand-rule"><span className="hero-scroll absolute inset-x-0 top-0 h-4" style={{ background: TERRA }} /></span>
        </div>

        <div className="absolute inset-x-0 bottom-0 top-auto md:top-0 md:right-auto md:w-[44%] flex items-end md:items-center px-6 pb-10 md:pb-0 md:pt-24 md:pl-[clamp(24px,6vw,96px)]">
          <div className="relative w-full max-w-[520px] min-h-[340px] md:h-full md:min-h-0">
            {chapters.map((c, i) => {
              const o = band(p, ...c.range);
              const start = c.range[0];
              return (
                <div key={c.n} className="absolute inset-x-0 bottom-0 md:inset-y-0 md:flex md:flex-col md:justify-center"
                  style={{ opacity: o, transform: `translateY(${(1 - o) * 18}px)`, pointerEvents: o > 0.5 ? "auto" : "none" }}>
                  <p className="editorial-eyebrow text-accent-warm">{c.n} · {c.eyebrow}</p>
                  {heading(c)}
                  <p className="editorial-body mt-4 text-sm md:text-base leading-[1.7] max-w-[420px]">{c.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 max-w-[460px]">
                    {c.chips.map((k, j) => {
                      const q = clamp((p - start - 0.015 - j * 0.008) / 0.02);
                      return (
                        <li key={k} className="rounded-full border border-brand-rule bg-white/80 px-3 py-1.5 text-xs md:text-sm font-semibold text-brand-white"
                          style={{ opacity: q, transform: `translateY(${(1 - q) * 10}px)` }}>{k}</li>
                      );
                    })}
                  </ul>
                  {i === chapters.length - 1 && buttons}
                </div>
              );
            })}
          </div>
        </div>

        {/* where you are in the story */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3" style={{ opacity: clamp((p - 0.04) / 0.03) }} aria-hidden>
          {chapters.map((c) => (
            <div key={c.n} className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em]"
              style={{ color: band(p, ...c.range) > 0.5 ? TERRA : "#b3a99f" }}>
              <span className="h-px w-5" style={{ background: "currentColor" }} />{c.n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
