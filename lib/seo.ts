import type { Metadata } from "next";
import { EMAIL, PHONE_TEL, PHONE_WHATSAPP, socialLinks } from "@/lib/constants";

export const SITE_URL = "https://trustnova.in";
export const SITE_NAME = "TrustNova";
export const TWITTER_HANDLE = "@trustnovain";

export const defaultSEO = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  defaultTitle: "TrustNova - Logo & Website Design Studio in Hyderabad",
  defaultDescription:
    "TrustNova is a Brand and Creative Studio in Hyderabad. We design logos, brand identities, and websites for Indian businesses. Starting from ₹8,000.",
  defaultOGImage: `${SITE_URL}/og-image.jpg`,
  twitterHandle: TWITTER_HANDLE,
} as const;

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "TrustNova - Brand & Creative Studio, Hyderabad",
} as const;

export const pageSEO = {
  home: {
    title: "TrustNova - Logo & Website Design Studio in Hyderabad",
    description:
      "We design logos that stop the scroll, build brand identities that earn trust, and create websites that convert visitors into clients. Based in Hyderabad, serving all of India. Starting ₹8,000.",
    keywords: [
      "logo design hyderabad",
      "website design hyderabad",
      "brand identity hyderabad",
      "web designer hyderabad",
      "logo designer hyderabad",
    ],
    path: "/",
  },
  services: {
    title: "Our Services - Logo Design, Brand Identity & Website Development | TrustNova",
    description:
      "Logo Design from ₹8,000. Complete Brand Identity from ₹18,000. Website Design from ₹25,000. Professional design services for Indian businesses. Based in Hyderabad.",
    keywords: [
      "logo design india",
      "website design india",
      "brand identity package india",
      "web development hyderabad",
    ],
    path: "/services",
  },
  industries: {
    title: "Website Designs for 20+ Industries | TrustNova Hyderabad",
    description:
      "See what TrustNova builds for jewellery shops, restaurants, clinics, gyms, law firms, real estate, coaching centres and 14 more industries. Based in Hyderabad.",
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
      "Answer 3 quick questions and find the right TrustNova package for your business stage and budget. Logo from ₹8,000, Website from ₹25,000.",
    path: "/recommend",
  },
  about: {
    title: "About TrustNova - Brand & Creative Studio, Hyderabad",
    description:
      "TrustNova is a Brand and Creative Studio founded in Hyderabad to help Indian businesses build powerful brands and professional websites that earn trust and drive growth.",
    path: "/about",
  },
  contact: {
    title: "Contact TrustNova - Start Your Brand or Website Project",
    description:
      "Get in touch with TrustNova to start your logo, brand identity, or website project. Based in Hyderabad. WhatsApp: +91 9502224444. Email: info@trustnova.in",
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
    title: "Portfolio - Website & Brand Design Work | TrustNova Hyderabad",
    description:
      "See TrustNova's portfolio of logo designs, brand identities, and website designs built for Indian businesses across 20+ industries. Based in Hyderabad.",
    keywords: [
      "web design portfolio hyderabad",
      "logo design portfolio india",
      "brand identity portfolio",
      "website design samples india",
    ],
    path: "/portfolio",
  },
  process: {
    title: "Our Process - Brand & Website Design | TrustNova",
    description:
      "TrustNova's clear, transparent, collaborative process from discovery and design to launch and ongoing support.",
    path: "/process",
  },
} as const;

/** Sitemap URLs only (url + lastModified per Google guidance). */
export const sitemapPaths = [
  "",
  "/services",
  "/industries",
  "/portfolio",
  "/recommend",
  "/about",
  "/contact",
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
    absolute: "Portfolio - Website & Brand Design Work | TrustNova Hyderabad",
  },
  description:
    "See TrustNova's portfolio of logo designs, brand identities, and website designs built for Indian businesses across 20+ industries. Based in Hyderabad.",
  keywords:
    "web design portfolio hyderabad, logo design portfolio india, brand identity portfolio, website design samples india",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
  openGraph: {
    title: "Portfolio - Website & Brand Design Work | TrustNova",
    description:
      "See TrustNova's portfolio of logo designs, brand identities, and website designs built for Indian businesses across 20+ industries.",
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
    description: "Logo designs, brand identities, and websites built for Indian businesses.",
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
    logo: `${SITE_URL}/logo.png`,
    image: defaultSEO.defaultOGImage,
    description:
      "TrustNova is a Brand and Creative Studio based in Hyderabad, India. We design logos, brand identities, and websites for Indian businesses.",
    telephone: PHONE_TEL.replace("tel:", ""),
    email: EMAIL,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "UPI, Bank Transfer, NEFT, IMPS",
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "State", name: "Telangana" },
      { "@type": "Country", name: "India" },
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
    sameAs: [
      socialLinks.instagram,
      socialLinks.x,
      `https://wa.me/${PHONE_WHATSAPP}`,
    ],
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
          price: "8000",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Complete Brand Identity Package",
            description:
              "Logo design plus business card, letterhead, social media templates, and brand style guide.",
          },
          price: "18000",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Design & Development",
            description:
              "Custom mobile-first website design and development for Indian businesses. Up to 8 pages with SEO setup.",
          },
          price: "25000",
          priceCurrency: "INR",
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
      "Portfolio of logo designs, brand identities, and website designs created by TrustNova for Indian businesses.",
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
