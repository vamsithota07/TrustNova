export type NavLink = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer = (stagger = 0.15) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  },
});

export const inViewOptions = { once: true, margin: "-80px" as const };

/** @deprecated Use Container component or containerClass from @/components/Container */
export const sectionInner =
  "w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-w-0";

/** @deprecated Use Container component or containerClass from @/components/Container */
export const pageShellInner = sectionInner;

export const readableProse = "max-w-[65ch]";
export const readableProseWide = "max-w-[65ch] lg:max-w-3xl";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/industries" },
  { label: "Services", href: "/services" },
  { label: "Find My Package", href: "/recommend", highlight: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PHONE = "+91 95022 24444";
export const PHONE_WHATSAPP = "919502224444";
export const WHATSAPP_URL = `https://wa.me/${PHONE_WHATSAPP}`;
export const EMAIL = "info@trustnova.in";

export const socialLinks = {
  instagram: "https://instagram.com/trustnova.in",
  linkedin: "https://linkedin.com/company/trustnova",
  gmail: `mailto:${EMAIL}`,
  x: "https://x.com/trustnova_in",
};

export const siteMetadata = {
  title: "TrustNova - Brand & Creative Studio | Hyderabad",
  description:
    "TrustNova is a premium brand and creative studio in Hyderabad. Logo design, brand identity, and website design for Indian businesses.",
  keywords: [
    "logo design hyderabad",
    "brand identity india",
    "website design hyderabad",
    "trustnova",
  ],
};

export const btnPrimary =
  "inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-brand-blue text-white font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-glow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-black";

export const btnSecondary =
  "inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-brand-blue text-brand-white font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 hover:bg-brand-blue hover:text-white active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-black";

export const btnOutline =
  "inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 border border-brand-blue text-brand-white text-base sm:text-lg font-bold rounded-xl transition-all duration-300 hover:bg-brand-blue hover:text-white active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-black";
