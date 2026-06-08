"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/constants";
import { useFinePointer } from "@/lib/hooks";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const finePointer = useFinePointer();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed z-50 group bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] md:bottom-6 md:right-6"
    >
      {finePointer && showTooltip && (
        <div className="absolute right-14 md:right-16 top-1/2 -translate-y-1/2 bg-brand-card text-brand-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-brand-rule shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          Chat with us on WhatsApp
        </div>
      )}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => finePointer && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with us on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 min-h-[44px] min-w-[44px] rounded-full bg-brand-white text-white shadow-soft transition-all duration-300 hover:scale-110 hover:shadow-card-hover active:scale-95 before:absolute before:inset-0 before:rounded-full before:bg-accent-warm/30 before:animate-ping before:opacity-40"
      >
        <WhatsAppIcon className="relative w-6 h-6 md:w-7 md:h-7" />
      </a>
    </motion.div>
  );
};
