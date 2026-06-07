"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Mail, Sparkles } from "lucide-react";
import {
  getRecommendation,
  getWhatsAppUrl,
  type Stage,
  type Need,
  type Recommendation,
} from "@/lib/recommend";
import { btnPrimary, btnSecondary, EMAIL, WHATSAPP_URL } from "@/lib/constants";
import MagneticButton from "@/components/motion/MagneticButton";
import { useIsMobile } from "@/lib/hooks";

interface Option {
  id: string;
  emoji: string;
  title: string;
  description: string;
  accent: "warm" | "sage" | "dusty" | "soft";
}

const step1Options: Option[] = [
  {
    id: "starting",
    emoji: "🌱",
    title: "Just Starting Out",
    description:
      "I have a business idea or just registered. I need everything built from scratch.",
    accent: "sage",
  },
  {
    id: "running",
    emoji: "🏃",
    title: "Already Running",
    description:
      "My business exists but my branding looks unprofessional or outdated.",
    accent: "warm",
  },
  {
    id: "growing",
    emoji: "📈",
    title: "Growing Fast",
    description: "We're scaling and need a brand that matches our ambition.",
    accent: "dusty",
  },
  {
    id: "rebranding",
    emoji: "🔄",
    title: "Rebranding",
    description: "We have a brand but it no longer represents who we are.",
    accent: "soft",
  },
];

const step2Options: Option[] = [
  {
    id: "logo",
    emoji: "🎨",
    title: "A Logo & Brand Identity",
    description:
      "I need a professional logo and brand that makes me look credible.",
    accent: "warm",
  },
  {
    id: "website",
    emoji: "🌐",
    title: "A Website",
    description: "I need a website that brings in clients and looks world-class.",
    accent: "dusty",
  },
  {
    id: "both",
    emoji: "📦",
    title: "Both - Brand + Website",
    description:
      "I need the full package - logo, identity, and a complete website.",
    accent: "sage",
  },
  {
    id: "maintenance",
    emoji: "🔧",
    title: "Ongoing Support",
    description: "I already have a site. I just need someone to maintain and grow it.",
    accent: "soft",
  },
];

const accentRing: Record<Option["accent"], string> = {
  warm: "ring-accent-warm/40 border-accent-warm/30",
  sage: "ring-accent-sage/40 border-accent-sage/30",
  dusty: "ring-accent-dusty/40 border-accent-dusty/30",
  soft: "ring-accent-soft/40 border-accent-soft/30",
};

const accentEmojiBg: Record<Option["accent"], string> = {
  warm: "bg-accent-warm/10",
  sage: "bg-accent-sage/10",
  dusty: "bg-accent-dusty/10",
  soft: "bg-accent-soft/10",
};

const stepLabels = [
  { num: 1, label: "Your stage", hint: "Where you are today" },
  { num: 2, label: "Your priority", hint: "What you need most" },
  { num: 3, label: "Your match", hint: "Tailored recommendation" },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  const progress = currentStep >= 3 ? 100 : ((currentStep - 1) / 2) * 100;

  return (
    <div className="mb-10 md:mb-14">
      <div className="hidden lg:flex flex-col gap-0 sticky top-32">
        {stepLabels.map(({ num, label, hint }) => {
          const completed = currentStep > num;
          const active = currentStep === num;

          return (
            <div key={num} className="flex gap-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                    completed || active
                      ? "bg-brand-white text-brand-black shadow-soft"
                      : "border-2 border-brand-rule text-brand-dim bg-brand-card"
                  }`}
                >
                  {completed ? <Check size={16} strokeWidth={2.5} /> : num}
                </div>
                {num < 3 && (
                  <div
                    className={`mt-2 w-px flex-1 min-h-[2rem] transition-colors duration-500 ${
                      completed ? "bg-brand-white" : "bg-brand-rule"
                    }`}
                  />
                )}
              </div>
              <div className="pt-1.5">
                <p
                  className={`text-sm font-semibold tracking-[-0.01em] transition-colors ${
                    active ? "text-brand-white" : completed ? "text-brand-silver" : "text-brand-dim"
                  }`}
                >
                  {label}
                </p>
                <p className="text-xs text-brand-dim mt-0.5">{hint}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-2 mb-4">
          {stepLabels.map(({ num, label }) => {
            const completed = currentStep > num;
            const active = currentStep === num;
            return (
              <div key={num} className="flex flex-1 flex-col items-center gap-2 min-w-0">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                    completed || active
                      ? "bg-brand-white text-brand-black"
                      : "border border-brand-rule text-brand-dim"
                  }`}
                >
                  {completed ? <Check size={13} /> : num}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider truncate max-w-full ${
                    active ? "text-brand-white font-semibold" : "text-brand-dim"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-1 bg-brand-rule rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-white rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  );
}

function StepBackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-silver transition-colors hover:text-brand-white group"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-rule bg-brand-card transition-all group-hover:border-brand-white/30 group-hover:-translate-x-0.5">
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </span>
      {label}
    </button>
  );
}

function OptionCard({
  option,
  selected,
  onSelect,
  index,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
      whileTap={{ scale: 0.98 }}
      className={`group text-left w-full min-h-[44px] p-6 md:p-8 rounded-organic-lg border-2 transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-brand-white/20 ${
        selected
          ? `creative-card shadow-card-hover ring-4 ${accentRing[option.accent]} bg-brand-card`
          : "creative-card hover:shadow-card-hover border-brand-rule bg-brand-card"
      }`}
    >
      <span
        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl md:text-3xl mb-5 transition-transform duration-500 group-hover:scale-110 ${accentEmojiBg[option.accent]}`}
        aria-hidden
      >
        {option.emoji}
      </span>
      <h3 className="font-display font-bold text-brand-white text-lg md:text-xl mb-2 tracking-[-0.02em]">
        {option.title}
      </h3>
      <p className="text-brand-silver text-sm md:text-[15px] leading-relaxed">{option.description}</p>
      <span className="inline-flex mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-dim group-hover:text-accent-warm transition-colors">
        Select →
      </span>
    </motion.button>
  );
}

function ResultCard({
  result,
  showPackagePrice = true,
}: {
  result: Recommendation;
  showPackagePrice?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="creative-card border-l-4 border-l-accent-warm p-6 md:p-10 shadow-card-hover"
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] bg-brand-white text-brand-black rounded-pill mb-5">
        <Sparkles className="h-3.5 w-3.5" />
        {result.badge}
      </span>

      <h3 className="font-display font-bold text-brand-white text-2xl md:text-4xl mb-3 tracking-[-0.03em]">
        {result.packageName}
      </h3>
      {showPackagePrice && result.price && (
        <p className="text-accent-warm font-bold text-xl md:text-2xl mb-4">{result.price}</p>
      )}
      <p className="text-brand-silver leading-relaxed mb-8 max-w-3xl text-base md:text-lg">
        {result.description}
      </p>

      {result.includes.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-brand-silver text-sm">
              <Check className="w-4 h-4 text-accent-sage shrink-0 mt-0.5" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function RecommendFlow() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [stage, setStage] = useState<Stage | null>(null);
  const [need, setNeed] = useState<Need | null>(null);
  const [result, setResult] = useState<Recommendation | null>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => s + 1);
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const handleStageSelect = (value: Stage) => {
    setStage(value);
    setTimeout(goNext, 350);
  };

  const handleNeedSelect = (value: Need) => {
    setNeed(value);
    if (stage) {
      setResult(getRecommendation({ stage, need: value }));
    }
    setTimeout(goNext, 350);
  };

  const handleStartOver = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setDirection(-1);
    setStage(null);
    setNeed(null);
    setResult(null);
    setStep(1);
  };

  const stepHeadings = [
    "Where are you right now?",
    "What's your biggest priority right now?",
    "Your tailored pricing",
  ];

  const contactWhatsAppUrl = result
    ? getWhatsAppUrl(result.whatsappMessage)
    : WHATSAPP_URL;
  const contactEmailUrl = result
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${result.packageName}`)}&body=${encodeURIComponent("Hi TrustNova,\n\nI'd like to discuss pricing for my project.\n\n")}`
    : `mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry - TrustNova")}`;

  const slideVariants = {
    enter: (dir: number) => ({
      x: isMobile ? 0 : dir > 0 ? 48 : -48,
      y: isMobile ? (dir > 0 ? 24 : -24) : 0,
      opacity: 0,
    }),
    center: { x: 0, y: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: isMobile ? 0 : dir > 0 ? -48 : 48,
      y: isMobile ? (dir > 0 ? -24 : 24) : 0,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full mx-auto min-w-0">
      <div className="text-center lg:text-left mb-10 md:mb-14 max-w-3xl lg:max-w-none">
        <p className="editorial-eyebrow mb-4">Get Started</p>
        <h1 className="font-display font-bold text-display-sm md:text-display-md lg:text-display-lg mb-5 text-balance tracking-[-0.04em] text-brand-white">
          Find Your{" "}
          <span className="italic text-accent-warm">Perfect Package</span>
        </h1>
        <p className="editorial-body text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-[1.75]">
          Answer 2 quick questions. We&apos;ll recommend the right package and share
          tailored pricing for your project.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16 xl:gap-20 items-start">
        {step <= 3 && (
          <aside className="hidden lg:block">
            <StepIndicator currentStep={step} />
          </aside>
        )}

        <div className="min-w-0">
          {step <= 3 && (
            <div className="lg:hidden">
              <StepIndicator currentStep={step} />
            </div>
          )}

          <div className="overflow-x-hidden min-w-0">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="font-display font-bold text-brand-white text-2xl md:text-3xl mb-8 md:mb-10 tracking-[-0.03em] text-center lg:text-left">
                    {stepHeadings[0]}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    {step1Options.map((opt, i) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        index={i}
                        selected={stage === opt.id}
                        onSelect={() => handleStageSelect(opt.id as Stage)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepBackButton onClick={goBack} label="Back to Step 1" />
                  <h2 className="font-display font-bold text-brand-white text-2xl md:text-3xl mb-8 md:mb-10 tracking-[-0.03em] text-center lg:text-left">
                    {stepHeadings[1]}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    {step2Options.map((opt, i) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        index={i}
                        selected={need === opt.id}
                        onSelect={() => handleNeedSelect(opt.id as Need)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && result && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepBackButton onClick={() => { setResult(null); goBack(); }} label="Back to Step 2" />
                  <h2 className="font-display font-bold text-brand-white text-2xl md:text-3xl mb-8 md:mb-10 tracking-[-0.03em] text-center lg:text-left">
                    {stepHeadings[2]}
                  </h2>

                  <div className="space-y-6 lg:space-y-8">
                    <ResultCard result={result} showPackagePrice={false} />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      className="creative-card p-6 md:p-10 text-center lg:text-left"
                    >
                      <p className="font-display font-bold text-brand-white text-xl md:text-2xl mb-3 tracking-[-0.02em]">
                        Pricing starts from ₹15,000
                      </p>
                      <p className="text-brand-silver text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Based on your requirements, we tailor every quote to fit your project -
                        scope, timeline, and goals. No hidden fees.
                      </p>

                      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
                        <MagneticButton
                          href={contactWhatsAppUrl}
                          external
                          className={`${btnPrimary} w-full sm:w-auto sm:min-w-[220px]`}
                        >
                          Chat on WhatsApp →
                        </MagneticButton>
                        <MagneticButton
                          href={contactEmailUrl}
                          className={`${btnSecondary} w-full sm:w-auto sm:min-w-[220px] gap-2`}
                        >
                          <Mail className="h-4 w-4" strokeWidth={2} />
                          Email us
                        </MagneticButton>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-12 md:mt-16 text-center lg:text-left space-y-8">
                    <div>
                      <p className="text-brand-silver mb-3">Want to try different answers?</p>
                      <button
                        type="button"
                        onClick={handleStartOver}
                        className="text-accent-warm font-semibold hover:text-brand-white transition-colors duration-300 hover:underline underline-offset-4"
                      >
                        Start over ↑
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
                      {[
                        "Free 30-minute discovery call",
                        "No obligation, no pressure",
                        "We'll recommend the right package in person",
                      ].map((line) => (
                        <p
                          key={line}
                          className="flex items-center gap-2 text-brand-silver text-sm"
                        >
                          <Check className="w-4 h-4 text-accent-sage shrink-0" strokeWidth={2.5} />
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
