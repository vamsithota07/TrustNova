"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { EMAIL, WHATSAPP_URL, PHONE } from "@/lib/constants";

const sectionTitle =
  "text-brand-blue font-semibold text-sm underline underline-offset-4 decoration-brand-blue mb-3";

type NewsletterStatus = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FooterContact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetError = () => {
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
    }, 4000);
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmed = email.trim().toLowerCase();

    if (!trimmed || !EMAIL_PATTERN.test(trimmed)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      resetError();
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source: "Website Footer",
          name: "",
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        if (response.status === 503) {
          setErrorMessage("Newsletter signup is not set up yet. Please email us at info@trustnova.in.");
        } else {
          setErrorMessage(result.error || "Could not subscribe right now. Please try again.");
        }
        setStatus("error");
        resetError();
        return;
      }

      setStatus("success");
      setEmail("");
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    } catch (error) {
      console.error("Newsletter error:", error);
      setErrorMessage("Could not subscribe right now. Please try again.");
      setStatus("error");
      resetError();
    }
  };

  return (
    <div className="space-y-8 text-center md:text-left">
      <div>
        <h3 className={sectionTitle}>Email us</h3>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-2 text-brand-white text-sm hover:text-brand-blue transition-colors"
        >
          <Mail className="w-4 h-4 text-brand-blue shrink-0" strokeWidth={2} />
          {EMAIL}
        </a>
        <p className="text-brand-dim text-xs mt-2">
          We will get back to you within 2 hours on WhatsApp.
        </p>
      </div>

      <div>
        <h3 className={sectionTitle}>Call us</h3>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-white text-sm hover:text-brand-blue transition-colors"
        >
          <Phone className="w-4 h-4 text-brand-blue shrink-0" strokeWidth={2} />
          {PHONE}
        </a>
        <p className="text-brand-dim text-xs mt-2">
          Available Monday-Saturday, 9:00 AM - 7:00 PM IST
        </p>
      </div>

      <div>
        <h3 className={sectionTitle}>Address</h3>
        <p className="text-brand-white text-sm leading-relaxed flex items-start gap-2 justify-center md:justify-start">
          <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" strokeWidth={2} />
          <span>Hyderabad, Telangana, India</span>
        </p>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-warm mb-3.5">
          Newsletter
        </p>

        {status === "success" ? (
          <div className="flex max-w-sm items-center gap-2.5 rounded-lg border border-[#27AE60]/25 bg-[#27AE60]/[0.08] px-4 py-3 text-sm font-medium text-[#27AE60] mx-auto md:mx-0">
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />
            You&apos;re subscribed. Thank you!
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="w-full max-w-sm mx-auto md:mx-0">
            <div className="flex overflow-hidden rounded-lg border border-brand-rule bg-white transition-colors focus-within:border-accent-warm/50">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={status === "loading"}
                required
                className="min-w-0 flex-1 border-none bg-transparent px-4 py-3 text-sm text-brand-white caret-brand-white outline-none placeholder:text-brand-dim/70 disabled:opacity-70"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label="Subscribe to newsletter"
                className="flex shrink-0 items-center justify-center bg-accent-warm px-4 py-3 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Send className="h-4 w-4" strokeWidth={2.5} />
                )}
              </button>
            </div>

            {status === "error" && errorMessage && (
              <p className="mt-1.5 text-xs text-[#E74C3C]">{errorMessage}</p>
            )}

            <p className="mt-2 text-xs leading-relaxed text-brand-silver">
              Subscribe for exclusive offers and updates. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
