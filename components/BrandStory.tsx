"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* The homepage hero: what TrustNova does, told by scrolling. One continuous scene moves through the five things we do:
   a pencil sketch of a logo, the brand identity around it, the website, the launch, and the marketing that brings
   customers. The animation is an image sequence drawn on a canvas from the scroll position (frames in /public/story,
   a lighter set for phones); the words are real text on the page, and the first chapter carries the page's h1. The
   first frame is a normal image that loads straight away; the rest load behind it. With reduced motion, the finished
   picture and all five chapters are shown without the scroll animation. */

const FRAMES = 240;
const CREAM = "#F3EEE5";
const TERRA = "#B5482A";

type Chapter = { n: string; eyebrow: string; title: string; text: string; chips: string[]; range: [number, number] };
const chapters: Chapter[] = [
  { n: "01", eyebrow: "Logo design", title: "Every brand starts as a sketch.", range: [-1, 0.1],
    text: "We begin with your story, your customers and a pencil. The right idea comes before any colour or font.",
    chips: ["3 unique concepts", "Unlimited refinements", "Every file format"] },
  { n: "02", eyebrow: "Brand identity", title: "One idea, everywhere your customers look.", range: [0.15, 0.43],
    text: "Your logo grows into a complete look that people recognise at a glance.",
    chips: ["Business cards", "Colours & fonts", "Social templates", "Signage", "Packaging", "Style guide"] },
  { n: "03", eyebrow: "Website design", title: "A website that turns visitors into enquiries.", range: [0.5, 0.66],
    text: "Designed for phones first, built to load fast, and easy for customers to contact you.",
    chips: ["Mobile-first", "Up to 8 pages", "WhatsApp chat button", "Basic SEO", "Google Analytics", "Live in 2-4 weeks"] },
  { n: "04", eyebrow: "Launch & care", title: "We handle the tech. You open for business.", range: [0.72, 0.85],
    text: "Domain, hosting, security and testing are taken care of, and we stay with you after launch.",
    chips: ["Domain & hosting", "SSL security", "Speed & testing", "30 days of support", "Monthly website care"] },
  { n: "05", eyebrow: "Digital marketing", title: "Then we help the right people find you.", range: [0.9, 2],
    text: "A monthly plan to get you found on Google, seen on social media and chosen over the shop next door.",
    chips: ["SEO", "Google Business Profile", "Social media", "Google & Meta ads", "Monthly reports"] },
];

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
      const i = Math.round(prog * (FRAMES - 1));
      if (i !== frame) { frame = i; draw(i); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [reduced]);

  const heading = (c: Chapter, i: number) =>
    i === 0 ? (
      <h1 className="font-display mt-3 font-bold leading-[1.02] tracking-[-0.04em] text-brand-white text-[clamp(2rem,4.2vw,3.6rem)]">
        {c.title}<span className="sr-only"> TrustNova, brand, web and growth studio in Hyderabad</span>
      </h1>
    ) : (
      <h2 className="font-display mt-3 font-bold leading-[1.02] tracking-[-0.04em] text-brand-white text-[clamp(2rem,4.2vw,3.6rem)]">{c.title}</h2>
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

  if (reduced) {
    return (
      <section id="how-we-build" className="w-full py-section px-4 sm:px-8" style={{ background: CREAM }}>
        <div className="mx-auto max-w-5xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/story/d/${FRAMES}.webp`} alt="A website on a laptop and phone, with marketing icons around it" className="w-full rounded-3xl" loading="lazy" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {chapters.map((c, i) => (
              <div key={c.n}>
                <p className="editorial-eyebrow text-accent-warm">{c.n} · {c.eyebrow}</p>
                {heading(c, i)}
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
    <section ref={section} id="how-we-build" aria-label="What TrustNova does" className="relative w-full h-[820vh] md:h-[900vh]" style={{ background: CREAM }}>
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

        <div className="absolute inset-x-0 bottom-0 top-auto md:top-0 md:right-auto md:w-[44%] flex items-end md:items-center px-6 pb-10 md:pb-0 md:pt-24 md:pl-[clamp(24px,6vw,96px)]">
          <div className="relative w-full max-w-[520px] min-h-[340px] md:h-full md:min-h-0">
            {chapters.map((c, i) => {
              const o = band(p, ...c.range);
              const start = c.range[0];
              return (
                <div key={c.n} className="absolute inset-x-0 bottom-0 md:inset-y-0 md:flex md:flex-col md:justify-center"
                  style={{ opacity: o, transform: `translateY(${(1 - o) * 18}px)`, pointerEvents: o > 0.5 ? "auto" : "none" }}>
                  <p className="editorial-eyebrow text-accent-warm">{c.n} · {c.eyebrow}</p>
                  {heading(c, i)}
                  <p className="editorial-body mt-4 text-sm md:text-base leading-[1.7] max-w-[420px]">{c.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 max-w-[460px]">
                    {c.chips.map((k, j) => {
                      const q = i === 0 ? 1 : clamp((p - start - 0.015 - j * 0.008) / 0.02);
                      return (
                        <li key={k} className="rounded-full border border-brand-rule bg-white/80 px-3 py-1.5 text-xs md:text-sm font-semibold text-brand-white"
                          style={{ opacity: q, transform: `translateY(${(1 - q) * 10}px)` }}>{k}</li>
                      );
                    })}
                  </ul>
                  {i === 0 && (
                    <p className="mt-6 hidden md:flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-brand-dim" style={{ opacity: clamp(1 - p / 0.05) }}>
                      <span className="inline-block h-6 w-[1.5px] bg-current animate-pulse" /> Scroll to see what we do
                    </p>
                  )}
                  {i === chapters.length - 1 && buttons}
                </div>
              );
            })}
          </div>
        </div>

        {/* where you are in the story */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3" aria-hidden>
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
