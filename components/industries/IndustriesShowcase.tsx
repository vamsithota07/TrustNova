"use client";

import { useEffect, useState } from "react";
import IndustriesDesktopStory from "@/components/industries/IndustriesDesktopStory";
import IndustriesMobileStory from "@/components/industries/IndustriesMobileStory";

export default function IndustriesShowcase() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile === null) {
    return <div className="min-h-[50vh] bg-brand-black" aria-hidden />;
  }

  return isMobile ? <IndustriesMobileStory /> : <IndustriesDesktopStory />;
}
