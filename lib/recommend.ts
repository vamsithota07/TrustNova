import { WHATSAPP_URL } from "@/lib/constants";

export type Stage = "starting" | "running" | "growing" | "rebranding";
export type Need = "logo" | "website" | "both" | "maintenance";

export interface Answers {
  stage: Stage;
  need: Need;
}

export type ResultId =
  | "logo-basic"
  | "brand-identity"
  | "website"
  | "full-bundle"
  | "maintenance";

export interface Recommendation {
  id: ResultId;
  badge: string;
  packageName: string;
  price: string;
  description: string;
  includes: string[];
  ctaLabel: string;
  whatsappMessage: string;
}

const results: Record<ResultId, Omit<Recommendation, "id">> = {
  "logo-basic": {
    badge: "RECOMMENDED FOR YOU",
    packageName: "Logo Design & Brand Identity",
    price: "Starting at ₹8,000",
    description:
      "You need a strong foundation - a professional logo that makes your business instantly credible. This is the right first step.",
    includes: [
      "3 unique logo concepts",
      "Unlimited revisions",
      "Full colour palette",
      "All file formats (PNG, JPG, SVG, PDF, AI)",
      "Social media versions included",
    ],
    ctaLabel: "Get My Logo →",
    whatsappMessage: "Hi, I'm interested in Logo Design",
  },
  "brand-identity": {
    badge: "RECOMMENDED FOR YOU",
    packageName: "Complete Brand Identity Package",
    price: "Starting at ₹18,000",
    description:
      "You're ready for a full brand system - not just a logo, but a complete visual identity that works everywhere.",
    includes: [
      "Everything in Logo Design",
      "Business card design",
      "Letterhead & email signature",
      "5 social media templates",
      "Brand Style Guide (PDF)",
      "WhatsApp Business banner",
    ],
    ctaLabel: "Build My Brand →",
    whatsappMessage: "Hi, I'm interested in Brand Identity Pack",
  },
  website: {
    badge: "RECOMMENDED FOR YOU",
    packageName: "Website Design & Development",
    price: "Starting at ₹25,000",
    description:
      "Your business needs a website that works as hard as you do - beautiful, fast, mobile-ready, and built to convert.",
    includes: [
      "Custom design for your brand",
      "Mobile-first, fully responsive",
      "Up to 8 pages",
      "WhatsApp & contact form integration",
      "SEO setup + Google Analytics",
      "30-day post-launch support",
    ],
    ctaLabel: "Start My Website →",
    whatsappMessage: "Hi, I'm interested in Website Design",
  },
  "full-bundle": {
    badge: "BEST VALUE - RECOMMENDED FOR YOU",
    packageName: "Full Brand + Website Bundle",
    price: "Starting at ₹45,000",
    description:
      "This is the complete package. Everything you need to launch professionally - logo, brand identity, and a stunning website. Built together, so everything is perfectly consistent.",
    includes: [
      "Complete Brand Identity Package",
      "Custom Website (up to 8 pages)",
      "Go-Live & Launch Support",
      "30-day post-launch support",
      "Single point of contact throughout",
      "Full file ownership - everything is yours",
    ],
    ctaLabel: "Get the Full Package →",
    whatsappMessage: "Hi, I'm interested in the Full Bundle",
  },
  maintenance: {
    badge: "RECOMMENDED FOR YOU",
    packageName: "Website Maintenance & Ongoing Support",
    price: "Starting at ₹4,000/month",
    description:
      "Your website needs consistent care to stay fast, secure, and up to date. We handle everything so you can focus on running your business.",
    includes: [
      "Monthly content updates",
      "Plugin & platform updates",
      "Automated backups",
      "Uptime monitoring",
      "Priority WhatsApp support",
      "Monthly performance report",
    ],
    ctaLabel: "Start Maintenance →",
    whatsappMessage: "Hi, I'm interested in Website Maintenance",
  },
};

export function getRecommendation(answers: Answers): Recommendation {
  const { stage, need } = answers;

  if (need === "maintenance") {
    return { id: "maintenance", ...results.maintenance };
  }

  if (need === "both") {
    return { id: "full-bundle", ...results["full-bundle"] };
  }

  if (need === "website") {
    return { id: "website", ...results.website };
  }

  if (stage === "growing" || stage === "rebranding") {
    return { id: "brand-identity", ...results["brand-identity"] };
  }

  return { id: "logo-basic", ...results["logo-basic"] };
}

export function getWhatsAppUrl(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
