import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import Contact from "@/components/Contact";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact | TrustNova | Brand & Creative Studio",
  description:
    "Get in touch with TrustNova. Send a project enquiry via our contact form to info@trustnova.in - free discovery call, Hyderabad-based brand studio.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <InnerPageLayout>
      <Contact />
    </InnerPageLayout>
  );
}
