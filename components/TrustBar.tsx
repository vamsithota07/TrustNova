"use client";

import { Zap, CheckCircle, Lock, Star } from "lucide-react";
import Container from "@/components/Container";
import RevealStagger from "@/components/motion/RevealStagger";

const signals = [
  { icon: Zap, label: "Fast Delivery" },
  { icon: CheckCircle, label: "No Revision Limits" },
  { icon: Lock, label: "You Own Everything" },
  { icon: Star, label: "100% Transparent Pricing" },
];

export default function TrustBar() {
  return (
    <section className="w-full bg-brand-card border-y border-brand-rule py-10 md:py-12 overflow-hidden">
      <Container>
        <RevealStagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 min-w-0">
          {signals.map(({ icon: Icon, label }) => (
            <div
              key={label}
              data-reveal-item
              className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 text-center lg:text-left min-w-0 group creative-card p-4 sm:p-5 lg:p-0 lg:bg-transparent lg:border-0 lg:shadow-none lg:rounded-none hover:shadow-soft lg:hover:shadow-none transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-rule bg-brand-muted transition-all duration-500 group-hover:border-accent-warm/40 group-hover:bg-accent-warm/5">
                <Icon
                  className="h-4 w-4 shrink-0 text-brand-white transition-colors group-hover:text-accent-warm"
                  strokeWidth={1.75}
                  data-reveal-icon
                />
              </div>
              <span className="text-brand-white text-sm md:text-base font-semibold tracking-[-0.01em]">
                {label}
              </span>
            </div>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
