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
  "btn-magnetic group min-h-[52px] w-full sm:w-auto px-8 sm:px-10 py-4 bg-brand-white text-brand-black font-semibold text-sm sm:text-base rounded-pill shadow-soft transition-all duration-500 ease-premium hover:shadow-card-hover hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-white focus:ring-offset-2 focus:ring-offset-brand-black";

export const btnSecondary =
  "btn-magnetic group min-h-[52px] w-full sm:w-auto px-8 sm:px-10 py-4 border-2 border-brand-rule text-brand-white font-semibold text-sm sm:text-base rounded-pill bg-brand-card/50 backdrop-blur-sm transition-all duration-500 ease-premium hover:border-brand-white/30 hover:shadow-soft active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-white/30 focus:ring-offset-2 focus:ring-offset-brand-black";

export const btnOutline =
  "btn-magnetic group min-h-[52px] w-full sm:w-auto px-8 sm:px-10 py-4 border-2 border-brand-white/15 text-brand-white text-sm sm:text-base font-bold rounded-pill transition-all duration-500 ease-premium hover:bg-brand-white hover:text-brand-black active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-white/30 focus:ring-offset-2 focus:ring-offset-brand-black";
