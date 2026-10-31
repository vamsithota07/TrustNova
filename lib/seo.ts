import type { Metadata } from "next";
import { EMAIL, PHONE_TEL, socialLinks } from "@/lib/constants";

export const SITE_URL = "https://www.trustnova.in";
export const SITE_NAME = "TrustNova";
export const TWITTER_HANDLE = "@trustnovain";

export const defaultSEO = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  defaultTitle: "Brand, Website & Digital Marketing Studio | TrustNova",
  defaultDescription:
    "TrustNova is a brand, website, and digital marketing studio based in Hyderabad, India, working with businesses worldwide. We help them build trust, get found, and grow.",
  defaultOGImage: `${SITE_URL}/og-image.jpg`,
  twitterHandle: TWITTER_HANDLE,
} as const;

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "TrustNova - Brand & Creative Studio",
} as const;

export const pageSEO = {
  home: {
    title: "Brand, Website & Digital Marketing Studio | TrustNova",
    description:
      "We design brands, build conversion-focused websites, and run digital marketing that helps businesses get found and grow. Based in Hyderabad, India, working with clients worldwide.",
    keywords: [
      "logo design hyderabad",
      "website design hyderabad",
      "brand identity hyderabad",
      "web designer hyderabad",
      "logo designer hyderabad",
      "digital marketing agency hyderabad",
      "seo services hyderabad",
      "brand and website studio",
      "remote logo and website design",
    ],
    path: "/",
  },
  services: {
    title: "Our Services - Branding, Websites & Digital Marketing | TrustNova",
    description:
      "Branding, website design, SEO, social media, Google Business Profile optimisation, and paid digital marketing for businesses anywhere in the world. Based in Hyderabad, India.",
    keywords: [
      "logo design india",
      "website design india",
      "brand identity package india",
      "web development hyderabad",
      "digital marketing hyderabad",
      "social media marketing hyderabad",
    ],
    path: "/services",
  },
  industries: {
    title: "Website Designs for 20+ Industries | TrustNova",
    description:
      "See what TrustNova builds for jewellery shops, restaurants, clinics, gyms, law firms, real estate, coaching centres and 14 more industries, for clients worldwide.",
    keywords: [
      "website design for small business india",
      "web design for restaurants hyderabad",
      "web design for clinics india",
    ],
    path: "/industries",
  },
  recommend: {
    title: "Find Your Perfect Package - Website & Brand Design | TrustNova",
    description:
      "Answer 3 quick questions and find the right TrustNova package for your business stage and budget.",
    path: "/recommend",
  },
  about: {
    title: "About TrustNova - Brand & Creative Studio",
    description:
      "TrustNova is a Brand and Creative Studio founded in Hyderabad, India, to help businesses everywhere build powerful brands and professional websites that earn trust and drive growth.",
    path: "/about",
  },
  contact: {
    title: "Contact TrustNova - Start Your Brand or Website Project",
    description:
      "Get in touch with TrustNova to start your logo, brand identity, or website project. Based in Hyderabad, India, working with clients worldwide. WhatsApp: +91 9502224444. Email: info@trustnova.in",
    path: "/contact",
  },
  terms: {
    title: "Terms & Conditions | TrustNova",
    description:
      "Read TrustNova's terms and conditions covering services, payments, revisions, cancellations, intellectual property, and governing law.",
    path: "/terms",
  },
  privacy: {
    title: "Privacy Policy | TrustNova",
    description: "How TrustNova collects, uses, and protects your personal information.",
    path: "/privacy",
  },
  portfolio: {
    title: "Portfolio - Brands & Websites We've Built | TrustNova",
    description:
      "See TrustNova's portfolio of brand identity, websites, and digital marketing work for businesses in India and abroad.",
    keywords: [
      "web design portfolio hyderabad",
      "logo design portfolio india",
      "brand identity portfolio",
      "website design samples india",
    ],
    path: "/portfolio",
  },
} as const;

/** Sitemap URLs only (url + lastModified per Google guidance). */
export const sitemapPaths = [
  "",
  "/services",
  "/services/logo-design-hyderabad",
  "/services/brand-identity-design",
  "/services/website-design-hyderabad",
  "/services/digital-marketing-hyderabad",
  "/industries",
  "/portfolio",
  "/recommend",
  "/about",
  "/contact",
  "/guides",
  "/guides/website-cost-small-business-hyderabad",
  "/guides/website-or-instagram-for-small-business",
  "/guides/logo-vs-brand-identity",
  "/terms",
  "/privacy",
] as const;

export const PORTFOLIO_OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "TrustNova Portfolio",
} as const;

export const portfolioMetadata: Metadata = {
  title: {
    absolute: "Portfolio - Brands & Websites We've Built | TrustNova",
  },
  description:
    "See TrustNova's portfolio of brand identity, websites, and digital marketing work for businesses in India and abroad.",
  keywords:
    "web design portfolio hyderabad, logo design portfolio india, brand identity portfolio, website design samples india",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
  openGraph: {
    title: "Portfolio - Brands & Websites We've Built | TrustNova",
    description:
      "See TrustNova's portfolio of brand identity, websites, and digital marketing work for businesses in India and abroad.",
    url: `${SITE_URL}/portfolio`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [PORTFOLIO_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: "Portfolio | TrustNova",
    description: "Brand identity, websites, and digital marketing work for businesses in India and abroad.",
    images: [PORTFOLIO_OG_IMAGE.url],
  },
};

function pageUrl(path: string) {
  return path === "/" || path === "" ? SITE_URL : `${SITE_URL}${path}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
}): Metadata {
  const url = pageUrl(path);

  return {
    title: { absolute: title },
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultSEO.defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultSEO.defaultDescription,
  keywords: [...pageSEO.home.keywords],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  openGraph: {
    title: defaultSEO.defaultTitle,
    description: defaultSEO.defaultDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: defaultSEO.defaultTitle,
    description: defaultSEO.defaultDescription,
    images: [OG_IMAGE.url],
  },
};

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "TrustNova Brand & Creative Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-dark.png`,
    image: defaultSEO.defaultOGImage,
    description:
      "TrustNova is a brand, website, and digital marketing studio based in Hyderabad, India, working with clients worldwide.",
    telephone: PHONE_TEL.replace("tel:", ""),
    email: EMAIL,
    paymentAccepted: "UPI, Bank Transfer, NEFT, IMPS",
    areaServed: [
      { "@type": "Country", name: "India" },
      "Worldwide",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.38405",
      longitude: "78.45636",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    sameAs: [socialLinks.instagram, socialLinks.x, socialLinks.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "TrustNova Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Logo Design & Brand Identity",
            description:
              "Custom logo design with unlimited revisions, brand colour palette, typography, and final files in all formats.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Complete Brand Identity Package",
            description:
              "Logo design plus business card, letterhead, social media templates, and brand style guide.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Design & Development",
            description:
              "Custom mobile-first website design and development for businesses anywhere. Up to 8 pages with SEO setup.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing & Growth",
            description:
              "SEO, Google Business Profile optimisation, social media, paid campaigns, and monthly growth reporting.",
          },
        },
      ],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbSchema(pagePath: string, pageName: string) {
  const path = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: pageUrl(path),
      },
    ],
  };
}

export function portfolioCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TrustNova Portfolio",
    description:
      "Portfolio of logo designs, brand identities, and website designs created by TrustNova for businesses in India and abroad.",
    url: `${SITE_URL}/portfolio`,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    breadcrumb: breadcrumbSchema("/portfolio", "Portfolio"),
  };
}
