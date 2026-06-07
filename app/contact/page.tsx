import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import Contact from "@/components/Contact";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact | TrustNova | Brand & Creative Studio",
  description:
    "Get in touch with TrustNova for project enquiries and pricing. Send a message to info@trustnova.in for a tailored quote and free discovery call.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <InnerPageLayout>
      <Contact />
    </InnerPageLayout>
  );
}
