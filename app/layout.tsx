import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
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
            alt=""
            className="h-52 sm:h-56 md:h-60 w-auto invert object-contain animate-loader-blink"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-muted">
            <div className="h-full w-1/3 bg-brand-blue animate-pulse" />
          </div>
        </div>
        <MotionProvider>
          <LoadingScreen />
          <div id="site-content" className="w-full max-w-[100vw] overflow-x-clip min-w-0">
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
