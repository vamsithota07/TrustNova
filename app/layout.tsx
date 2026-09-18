import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import SiteChrome from "@/components/SiteChrome";
import { professionalServiceSchema, rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <JsonLd data={professionalServiceSchema()} />
      </head>
      <body className="font-sans antialiased bg-brand-black text-brand-silver">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
