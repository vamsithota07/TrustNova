import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { EMAIL, PHONE, PHONE_TEL } from "@/lib/constants";

const sectionTitle =
  "text-brand-blue font-semibold text-sm underline underline-offset-4 decoration-brand-blue mb-3";

export default function FooterNap() {
  return (
    <div className="space-y-8 text-center md:text-left">
      <div>
        <h3 className={sectionTitle}>TrustNova</h3>
        <p className="text-brand-white text-sm font-medium">Brand &amp; Creative Studio</p>
        <p className="mt-2 text-brand-silver text-sm">
          <Link href="/" className="hover:text-brand-blue transition-colors">
            trustnova.in
          </Link>
        </p>
      </div>

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
          href={PHONE_TEL}
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
    </div>
  );
}
