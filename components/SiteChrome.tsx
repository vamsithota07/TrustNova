"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/motion/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/hub")) return <>{children}</>;

  return (
    <MotionProvider>
      <LoadingScreen />
      <div id="site-content" className="relative w-full min-w-0">
        <div className="pointer-events-none fixed inset-0 z-[1] grain-overlay opacity-40" aria-hidden />
        <ScrollProgress />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <WhatsAppButton />
      </div>
    </MotionProvider>
  );
}
