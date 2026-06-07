import type { Metadata } from "next";
import { EMAIL, PHONE_WHATSAPP, socialLinks, siteMetadata } from "@/lib/constants";

export const SITE_URL = "https://trustnova.in";
export const SITE_NAME = "TrustNova";

export const OG_IMAGE = {
  url: "/logo.png",
  width: 1200,
  height: 630,
  alt: "TrustNova - Brand & Creative Studio",
} as const;

export const sitemapRoutes: {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.9 },
  { path: "/recommend", changeFrequency: "monthly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/process", changeFrequency: "monthly", priority: 0.75 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

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
  keywords?: string[];
}): Metadata {
  const url = pageUrl(path);

  return {
    title,
    description,
    keywords: keywords ?? siteMetadata.keywords,
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
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteMetadata.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
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
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [OG_IMAGE.url],
  },
};

export function structuredDataGraph() {
  const orgId = `${SITE_URL}/#organization`;
  const businessId = `${SITE_URL}/#business`;
  const websiteId = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        email: EMAIL,
        telephone: `+${PHONE_WHATSAPP}`,
        sameAs: [socialLinks.instagram, socialLinks.linkedin, socialLinks.x],
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/logo.png`,
        description: siteMetadata.description,
        email: EMAIL,
        telephone: `+${PHONE_WHATSAPP}`,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        parentOrganization: { "@id": orgId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: SITE_URL,
        description: siteMetadata.description,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
    ],
  };
}
