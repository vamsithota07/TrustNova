"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { btnPrimary, fadeInUp, inViewOptions, WHATSAPP_URL, EMAIL, PHONE } from "@/lib/constants";

type SubmitState = "idle" | "loading" | "success" | "error";

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

const serviceOptions = [
  "Logo Design & Brand Identity",
  "Complete Brand Identity Package",
  "Website Design & Development",
  "Website Launch & Go-Live Support",
  "Website Maintenance & Support",
  "Full Brand + Website Bundle",
  "Not sure yet - need guidance",
];

const budgetOptions = [
  "Under ₹15,000",
  "₹15,000 - ₹30,000",
  "₹30,000 - ₹60,000",
  "₹60,000+",
  "Not sure yet",
];

const reassurances = [
  "Free 30-minute discovery call",
  "Reply within one business day by email",
  "Tailored quote - no hidden fees",
];

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    hint: "We respond within one business day",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: PHONE,
    href: WHATSAPP_URL,
    hint: "Fastest way to reach us",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Hyderabad, Telangana, India",
    hint: "Serving clients across India",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Sat, 9:00 AM - 7:00 PM IST",
    hint: "Closed on public holidays",
  },
];

const inputClass =
  "w-full min-w-0 rounded-lg border border-brand-rule bg-white px-4 py-3 text-[15px] text-brand-white placeholder:text-brand-dim/70 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

const labelClass = "mb-1.5 block text-sm font-semibold text-brand-white";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: serviceOptions[0],
  budget: budgetOptions[4],
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          service: form.service,
          budget: form.budget,
          message: form.message.trim(),
          source: "Contact Page",
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        if (response.status === 503) {
          setErrorMessage(
            "Contact form is not set up yet. Please email us at info@trustnova.in or message us on WhatsApp.",
          );
        } else {
          setErrorMessage(result.error || "Could not send your enquiry. Please try again.");
        }
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setSubmitted(true);
    } catch (error) {
      console.error("Contact form error:", error);
      setErrorMessage("Could not send your enquiry. Please try again.");
      setSubmitState("error");
    }
  };

  return (
    <>
      <header className="border-b border-brand-rule bg-brand-dark/50">
        <Container className="py-section-sm md:py-16 lg:py-24">
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOptions}
            transition={{ duration: 0.5 }}
            className="editorial-eyebrow mb-4"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOptions}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="max-w-4xl font-display font-bold text-display-sm md:text-display-md tracking-[-0.04em] text-brand-white"
          >
            Let&apos;s build something{" "}
            <span className="text-brand-blue">the world will notice.</span>
          </motion.h1>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOptions}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl text-base text-brand-silver md:text-lg"
          >
            Tell us about your project - we&apos;ll reply to your email within one business day with
            next steps and a free discovery call slot.
          </motion.p>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOptions}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 max-w-2xl rounded-xl border border-brand-blue/20 bg-brand-blue/[0.06] px-4 py-3 text-sm text-brand-silver md:text-base"
          >
            <span className="font-semibold text-brand-white">For pricing, contact us.</span> Every
            project is different, so we share a tailored quote after a quick discovery call - no
            hidden fees.
          </motion.p>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOptions}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 text-sm text-brand-dim"
          >
            Currently accepting new projects for 2025
          </motion.p>
        </Container>
      </header>

      <section id="contact" className="relative w-full overflow-hidden bg-brand-black py-12 md:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(107,143,117,0.06) 0%, transparent 55%)",
          }}
        />

        <Container className="relative min-w-0">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-16">
            <motion.div
              initial={false}
              whileInView="visible"
              viewport={inViewOptions}
              variants={fadeInUp}
              className="min-w-0"
            >
              <div className="rounded-2xl border border-brand-rule bg-brand-card p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-brand-white md:text-2xl">
                    Send us a message
                  </h2>
                  <p className="mt-2 text-sm text-brand-silver">
                    Fill in the form and we&apos;ll get back to you at your email within one business
                    day.
                  </p>
                </div>

                {submitted ? (
                  <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/[0.06] px-6 py-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
                      <CheckCircle className="h-7 w-7 text-brand-blue" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-brand-white">Enquiry received!</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-brand-silver">
                      Thank you, {form.name.split(" ")[0] || "there"}. We&apos;ve received your
                      message and will reply to{" "}
                      <span className="font-medium text-brand-white">{form.email}</span> within one
                      business day.
                    </p>
                    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnPrimary}
                      >
                        Chat on WhatsApp →
                      </a>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
                      >
                        Email us directly
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmitState("idle");
                        setForm(initialForm);
                      }}
                      className="mt-6 text-sm text-brand-dim transition-colors hover:text-brand-blue"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className={labelClass}>
                          Full name <span className="text-brand-blue">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          Email <span className="text-brand-blue">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@company.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-phone" className={labelClass}>
                          Phone / WhatsApp <span className="text-brand-blue">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-budget" className={labelClass}>
                          Estimated budget
                        </label>
                        <select
                          id="contact-budget"
                          value={form.budget}
                          onChange={(e) => update("budget", e.target.value)}
                          className={`${inputClass} cursor-pointer`}
                        >
                          {budgetOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-service" className={labelClass}>
                        What do you need? <span className="text-brand-blue">*</span>
                      </label>
                      <select
                        id="contact-service"
                        required
                        value={form.service}
                        onChange={(e) => update("service", e.target.value)}
                        className={`${inputClass} cursor-pointer`}
                      >
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className={labelClass}>
                        Project details <span className="text-brand-blue">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us about your business, timeline, and what you're looking to achieve..."
                        className={`${inputClass} resize-y min-h-[120px]`}
                      />
                    </div>

                    <div className="pt-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <motion.button
                          type="submit"
                          disabled={submitState === "loading"}
                          initial={false}
                          animate={
                            submitState === "success"
                              ? { scale: [0.8, 1], backgroundColor: "#27AE60" }
                              : { scale: 1, backgroundColor: "#C4674A" }
                          }
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          className="inline-flex items-center gap-2.5 rounded-lg border-none px-9 py-4 text-[15px] font-semibold tracking-[0.3px] text-white shadow-[0_4px_20px_rgba(196,103,74,0.3)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:bg-[#B35B3F] hover:shadow-[0_8px_28px_rgba(196,103,74,0.4)] active:translate-y-0 active:scale-[0.98] disabled:opacity-80"
                          style={{
                            background: submitState === "success" ? "#27AE60" : undefined,
                          }}
                        >
                          {submitState === "loading" ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                              Sending...
                            </>
                          ) : submitState === "success" ? (
                            <>
                              <CheckCircle className="h-[18px] w-[18px]" strokeWidth={2.5} />
                              Enquiry Sent!
                            </>
                          ) : (
                            <>
                              <SendIcon />
                              Send Enquiry
                            </>
                          )}
                        </motion.button>
                      </div>
                      {submitState === "error" && errorMessage && (
                        <p className="mt-2.5 text-xs text-[#E74C3C]">{errorMessage}</p>
                      )}
                      <p className="mt-2.5 text-xs text-brand-dim">
                        By submitting, you agree to be contacted about your enquiry.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.aside
              initial={false}
              whileInView="visible"
              viewport={inViewOptions}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="min-w-0 space-y-6"
            >
              <div className="creative-card p-6 md:p-8 flex flex-col gap-6 md:gap-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-warm">
                    <WhatsAppIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-base font-bold text-brand-white leading-snug">
                      Prefer to chat first?
                    </p>
                    <p className="mt-1.5 text-sm text-brand-silver leading-relaxed">
                      Skip the form - message us directly
                    </p>
                  </div>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnPrimary} w-full shrink-0`}
                >
                  Chat on WhatsApp →
                </a>
              </div>

              <div className="space-y-3">
                {contactCards.map(({ icon: Icon, label, value, href, hint }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-brand-rule bg-brand-card p-4 transition-shadow hover:shadow-[0_4px_20px_rgba(107,143,117,0.1)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-dark">
                        <Icon className="h-[18px] w-[18px] text-brand-blue" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-dim">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="mt-0.5 block text-sm font-medium text-brand-white transition-colors hover:text-brand-blue break-words"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm font-medium text-brand-white break-words">
                            {value}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-brand-dim">{hint}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-brand-rule bg-brand-dark p-5">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2 text-sm text-brand-silver">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={1.75} />
                    trustnova.in
                  </li>
                  {reassurances.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-brand-silver">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={1.75} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </Container>
      </section>
    </>
  );
}
