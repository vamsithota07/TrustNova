import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import { rootMetadata, structuredDataGraph } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <head>
        <JsonLd data={structuredDataGraph()} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add("is-loading");})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-brand-black text-brand-silver">
        <div
          id="page-loader"
          aria-hidden="true"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-black pointer-events-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="TrustNova"
            className="h-32 sm:h-36 md:h-40 w-auto object-contain animate-loader-blink invert"
          />
        </div>
        <MotionProvider>
          <LoadingScreen />
          <div id="site-content" className="relative w-full min-w-0">
            <div className="pointer-events-none fixed inset-0 z-[1] grain-overlay opacity-40" aria-hidden />
            <ScrollProgress />
            <Navbar />
            {children}
            <Footer />
            <WhatsAppButton />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
