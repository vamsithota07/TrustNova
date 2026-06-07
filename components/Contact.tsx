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

function buildMailtoBody(data: FormState) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Budget: ${data.budget}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function buildMailtoUrl(data: FormState) {
  const subject = `Project enquiry from ${data.name} - TrustNova`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMailtoBody(data))}`;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = buildMailtoUrl(form);
    setSubmitted(true);
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
                    Fill in the form and we&apos;ll open your email app addressed to{" "}
                    <span className="font-medium text-brand-white">{EMAIL}</span>.
                  </p>
                </div>

                {submitted ? (
                  <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/[0.06] px-6 py-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
                      <CheckCircle className="h-7 w-7 text-brand-blue" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-brand-white">You&apos;re almost done</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-brand-silver">
                      Your email app should have opened with your message ready to send to{" "}
                      {EMAIL}. Hit send there and we&apos;ll get back to you shortly.
                    </p>
                    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                      <a href={buildMailtoUrl(form)} className={btnPrimary}>
                        Open email again →
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
                      >
                        Prefer WhatsApp instead
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
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

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        className={`${btnPrimary} shrink-0 gap-2 whitespace-nowrap`}
                      >
                        <Mail className="h-4 w-4" strokeWidth={2} />
                        Send via Email
                      </button>
                      <p className="text-xs text-brand-dim">
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
