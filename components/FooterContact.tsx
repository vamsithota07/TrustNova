"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { EMAIL, WHATSAPP_URL, PHONE } from "@/lib/constants";

const sectionTitle =
  "text-brand-blue font-semibold text-sm underline underline-offset-4 decoration-brand-blue mb-3";

export default function FooterContact() {
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    if (typeof email === "string" && email.trim()) {
      window.location.href = `mailto:${EMAIL}?subject=Newsletter%20Subscription&body=Please%20subscribe%20${encodeURIComponent(email.trim())}%20to%20TrustNova%20updates.`;
    }
    setSubmitted(true);
    form.reset();
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
        <h3 className={sectionTitle}>Newsletter</h3>
        <form onSubmit={handleNewsletter} className="flex gap-0 max-w-sm mx-auto md:mx-0">
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            className="flex-1 min-w-0 px-4 py-2.5 bg-white border border-brand-rule text-brand-silver text-sm rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <button
            type="submit"
            aria-label="Subscribe to newsletter"
            className="px-4 py-2.5 bg-brand-blue text-white rounded-r-md hover:bg-brand-bluedim transition-colors shrink-0"
          >
            <Send className="w-4 h-4" strokeWidth={2} />
          </button>
        </form>
        <p className="text-brand-silver text-xs mt-3 underline underline-offset-2 decoration-brand-rule">
          {submitted
            ? "Thank you - we will be in touch soon."
            : "Subscribe for exclusive offers and updates."}
        </p>
      </div>
    </div>
  );
}
