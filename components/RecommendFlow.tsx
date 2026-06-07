"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Mail } from "lucide-react";
import {
  getRecommendation,
  getWhatsAppUrl,
  type Stage,
  type Need,
  type Recommendation,
} from "@/lib/recommend";
import { btnPrimary, btnSecondary, EMAIL, WHATSAPP_URL } from "@/lib/constants";
import { useIsMobile } from "@/lib/hooks";

interface Option {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const step1Options: { id: Stage; emoji: string; title: string; description: string }[] = [
  {
    id: "starting",
    emoji: "🌱",
    title: "Just Starting Out",
    description:
      "I have a business idea or just registered. I need everything built from scratch.",
  },
  {
    id: "running",
    emoji: "🏃",
    title: "Already Running",
    description:
      "My business exists but my branding looks unprofessional or outdated.",
  },
  {
    id: "growing",
    emoji: "📈",
    title: "Growing Fast",
    description: "We're scaling and need a brand that matches our ambition.",
  },
  {
    id: "rebranding",
    emoji: "🔄",
    title: "Rebranding",
    description: "We have a brand but it no longer represents who we are.",
  },
];

const step2Options: { id: Need; emoji: string; title: string; description: string }[] = [
  {
    id: "logo",
    emoji: "🎨",
    title: "A Logo & Brand Identity",
    description:
      "I need a professional logo and brand that makes me look credible.",
  },
  {
    id: "website",
    emoji: "🌐",
    title: "A Website",
    description: "I need a website that brings in clients and looks world-class.",
  },
  {
    id: "both",
    emoji: "📦",
    title: "Both - Brand + Website",
    description:
      "I need the full package - logo, identity, and a complete website.",
  },
  {
    id: "maintenance",
    emoji: "🔧",
    title: "Ongoing Support",
    description: "I already have a site. I just need someone to maintain and grow it.",
  },
];

const stepVariantsDesktop = {
  enter: { y: 24, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -24, opacity: 0 },
};

const stepVariantsMobile = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

function StepIndicator({ currentStep }: { currentStep: number }) {
  const labels = ["Step 1", "Step 2", "Step 3"];
  const progress = currentStep >= 3 ? 100 : ((currentStep - 1) / 2) * 100;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
        {labels.map((label, i) => {
          const stepNum = i + 1;
          const completed = currentStep > stepNum;
          const active = currentStep === stepNum;

          return (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 min-w-[32px] rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  completed
                    ? "bg-brand-blue border-brand-blue text-white"
                    : active
                      ? "bg-brand-blue border-brand-blue text-white"
                      : "bg-transparent border-brand-rule text-brand-dim"
                }`}
              >
                {completed ? <Check size={14} /> : stepNum}
              </div>
              <span
                className={`text-xs hidden md:block ${
                  active || completed ? "text-brand-bluedim font-medium" : "text-brand-dim"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-0.5 bg-brand-rule rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-blue"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function StepBackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-silver transition-colors hover:text-brand-blue"
    >
      <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      {label}
    </button>
  );
}

function OptionCard({
  option,
  selected,
  onSelect,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`text-left w-full min-h-[44px] p-4 md:p-6 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue active:scale-[0.98] ${
        selected
          ? "border-2 border-brand-blue bg-brand-accentbg shadow-blue-glow-sm"
          : "border border-brand-rule bg-brand-card hover:border-brand-blue shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
      }`}
    >
      <span className="text-2xl md:text-3xl block mb-2 md:mb-3" aria-hidden>
        {option.emoji}
      </span>
      <h3 className="text-brand-white font-bold text-base md:text-lg mb-2">{option.title}</h3>
      <p className="text-brand-silver text-sm leading-relaxed prose-width">{option.description}</p>
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
    <div className="relative bg-brand-card border border-brand-rule border-l-4 border-brand-blue rounded-r-xl p-6 md:p-8 shadow-[0_4px_40px_rgba(107,130,168,0.1)]">
      <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand-blue text-white rounded-full mb-4">
        {result.badge}
      </span>

      <h3 className="text-brand-white font-bold text-2xl md:text-3xl mb-2">
        {result.packageName}
      </h3>
      {showPackagePrice && result.price && (
        <p className="text-brand-blue font-bold text-xl md:text-2xl mb-4">
          {result.price}
        </p>
      )}
      <p className="text-brand-silver leading-relaxed mb-6 max-w-3xl">{result.description}</p>

      {result.includes.length > 0 && (
        <ul className="space-y-2">
          {result.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-brand-silver text-sm">
              <Check className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RecommendFlow() {
  const isMobile = useIsMobile();
  const stepVariants = isMobile ? stepVariantsMobile : stepVariantsDesktop;
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

  const handleBackFromStep2 = () => {
    goBack();
  };

  const handleBackFromStep3 = () => {
    setResult(null);
    goBack();
  };

  const handleStageSelect = (value: Stage) => {
    setStage(value);
    setTimeout(goNext, 300);
  };

  const handleNeedSelect = (value: Need) => {
    setNeed(value);
    if (stage) {
      setResult(getRecommendation({ stage, need: value }));
    }
    setTimeout(goNext, 300);
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

  return (
    <div className="w-full mx-auto min-w-0">
      <div className="text-center mb-8 md:mb-10">
        <p className="text-brand-bluedim text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
          Get Started
        </p>
        <h1 className="text-brand-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
          Find Your Perfect Package
        </h1>
        <p className="text-brand-silver text-base md:text-lg prose-width mx-auto">
          Answer 2 quick questions. We&apos;ll recommend the right package and share
          tailored pricing for your project.
        </p>
      </div>

      {step <= 3 && <StepIndicator currentStep={step} />}

      <div className="overflow-x-hidden min-w-0">
      <AnimatePresence mode="wait" custom={direction}>
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: isMobile ? 0.32 : 0.4, ease: "easeOut" }}
          >
            <h2 className="text-brand-white font-bold text-xl md:text-2xl mb-6 text-center">
              {stepHeadings[0]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {step1Options.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={stage === opt.id}
                  onSelect={() => handleStageSelect(opt.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: isMobile ? 0.32 : 0.4, ease: "easeOut" }}
          >
            <StepBackButton onClick={handleBackFromStep2} label="Back to Step 1" />
            <h2 className="text-brand-white font-bold text-xl md:text-2xl mb-6 text-center">
              {stepHeadings[1]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {step2Options.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={need === opt.id}
                  onSelect={() => handleNeedSelect(opt.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && result && (
          <motion.div
            key="step3"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: isMobile ? 0.32 : 0.4, ease: "easeOut" }}
          >
            <StepBackButton onClick={handleBackFromStep3} label="Back to Step 2" />
            <h2 className="text-brand-white font-bold text-xl md:text-2xl mb-6 text-center">
              {stepHeadings[2]}
            </h2>

            <ResultCard result={result} showPackagePrice={false} />

            <div className="mt-6 rounded-2xl border border-brand-blue/20 bg-brand-blue/[0.06] p-6 md:p-8 text-center">
              <p className="text-brand-white font-bold text-lg md:text-xl mb-2">
                Pricing starts from ₹15,000
              </p>
              <p className="text-brand-silver text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                Based on your requirements, we tailor every quote to fit your project -
                scope, timeline, and goals. No hidden fees.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <a
                  href={contactWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnPrimary} w-full sm:w-auto sm:min-w-[220px] px-8 py-4`}
                >
                  Chat on WhatsApp →
                </a>
                <a
                  href={contactEmailUrl}
                  className={`${btnSecondary} w-full sm:w-auto sm:min-w-[220px] px-8 py-4 gap-2`}
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  Email us
                </a>
              </div>
            </div>

            <div className="mt-10 text-center space-y-8">
              <div>
                <p className="text-brand-silver mb-2">Want to try different answers?</p>
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="text-brand-blue font-medium hover:text-brand-white transition-colors duration-300 hover:underline"
                >
                  Start over ↑
                </button>
              </div>

              <div className="space-y-3">
                {[
                  "Free 30-minute discovery call",
                  "No obligation, no pressure",
                  "We'll recommend the right package in person",
                ].map((line) => (
                  <p
                    key={line}
                    className="flex items-center justify-center gap-2 text-brand-silver text-sm"
                  >
                    <Check className="w-4 h-4 text-brand-blue shrink-0" />
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
  );
}
