"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Container from "@/components/Container";
import { fadeInUp, inViewOptions } from "@/lib/constants";

const pricingRows = [
  {
    service: "Logo Design - Basic Package",
    oneTime: "₹8,000 – ₹12,000",
    monthly: "-",
    highlight: false,
  },
  {
    service: "Complete Brand Identity Pack",
    oneTime: "₹18,000 – ₹28,000",
    monthly: "-",
    highlight: false,
  },
  {
    service: "Website Design - Up to 5 Pages",
    oneTime: "₹25,000 – ₹40,000",
    monthly: "-",
    highlight: false,
  },
  {
    service: "Website Design - 6 to 8+ Pages",
    oneTime: "₹40,000 – ₹65,000",
    monthly: "-",
    highlight: false,
  },
  {
    service: "Website Go-Live & Launch Support",
    oneTime: "₹5,000 – ₹8,000",
    monthly: "-",
    highlight: false,
  },
  {
    service: "Website Maintenance & Support",
    oneTime: "-",
    monthly: "₹4,000 – ₹8,000/mo",
    highlight: false,
  },
  {
    service: "Full Brand + Website Bundle",
    oneTime: "₹45,000 – ₹80,000",
    monthly: "Optional",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative w-full py-16 md:py-24 bg-brand-dark overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          heading="Transparent Pricing. No Hidden Fees."
          subtext="Prices shown are indicative - a tailored quote follows your free discovery call."
        />

        <motion.div
          initial={false}
          whileInView="visible"
          viewport={inViewOptions}
          variants={fadeInUp}
          className="max-w-[1200px] mx-auto w-full min-w-0"
        >
          <div className="overflow-x-auto rounded-2xl border border-brand-rule bg-brand-card shadow-[0_4px_24px_rgba(0,0,0,0.06)] [-webkit-overflow-scrolling:touch]">
            <table className="w-full min-w-[560px] border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-brand-dark border-b-2 border-brand-blue">
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-brand-white font-bold">
                    Service
                  </th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-brand-blue font-bold whitespace-nowrap">
                    One-Time Fee
                  </th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-brand-blue font-bold">
                    Monthly
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, index) => (
                  <tr
                    key={row.service}
                    className={`relative border-b border-brand-rule ${
                      row.highlight
                        ? "bg-brand-accentbg border-l-4 border-l-brand-blue"
                        : index % 2 === 0
                          ? "bg-brand-card"
                          : "bg-brand-rowalt"
                    }`}
                  >
                    <td className="relative px-3 sm:px-6 py-3 sm:py-4 text-brand-white font-medium min-w-0">
                      {row.highlight && (
                        <>
                          <span className="md:hidden inline-block mb-2 bg-brand-blue text-white text-xs px-3 py-1 rounded-full font-semibold">
                            BEST VALUE
                          </span>
                          <span className="hidden md:inline absolute -top-3 right-4 bg-brand-blue text-white text-xs px-3 py-1 rounded-full font-semibold">
                            BEST VALUE
                          </span>
                        </>
                      )}
                      {row.service}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-brand-silver whitespace-nowrap">
                      {row.oneTime}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-brand-silver whitespace-nowrap">
                      {row.monthly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="md:hidden text-brand-blue text-xs mt-2 text-center">
            ← Scroll to see more
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView="visible"
          viewport={inViewOptions}
          variants={fadeInUp}
          transition={{ delay: 0.15 }}
          className="mt-6 md:mt-8 max-w-[1200px] mx-auto bg-brand-accentbg border-l-4 border-brand-blue rounded-r-xl p-5 md:p-6 flex flex-col sm:flex-row items-start gap-3 min-w-0"
        >
          <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
          <p className="text-brand-silver text-sm leading-relaxed prose-width min-w-0">
            Domain and hosting are paid directly by you to your provider (GoDaddy,
            Hostinger, etc.). TrustNova does not mark up or resell these - you
            retain full control.
          </p>
        </motion.div>

        <motion.p
          initial={false}
          whileInView="visible"
          viewport={inViewOptions}
          variants={fadeInUp}
          transition={{ delay: 0.25 }}
          className="text-brand-dim text-center mt-6 md:mt-8 text-sm md:text-base"
        >
          Not sure which package suits you?{" "}
          <Link
            href="/recommend"
            className="text-brand-blue hover:text-brand-white transition-colors duration-300 hover:underline inline-flex items-center min-h-[44px]"
          >
            Find your perfect package →
          </Link>
        </motion.p>
      </Container>
    </section>
  );
};
