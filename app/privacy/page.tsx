import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import LegalPageContent from "@/components/LegalPageContent";
import { EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | TrustNova",
  description: "How TrustNova collects, uses, and protects your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <InnerPageLayout>
      <LegalPageContent
        title="Privacy Policy"
        updated="June 2025"
        intro="TrustNova respects your privacy. This policy explains what information we collect when you visit trustnova.in or contact us, and how we use it."
        sections={[
          {
            title: "Information We Collect",
            paragraphs: [
              "We may collect your name, email address, phone number, business details, and project requirements when you submit a form, message us on WhatsApp, or book a discovery call.",
              "We automatically collect basic usage data such as browser type, pages visited, and approximate location through standard analytics tools.",
            ],
          },
          {
            title: "How We Use Your Information",
            paragraphs: [
              "We use your information to respond to enquiries, prepare quotes, deliver services, send project updates, and improve our website.",
              "We do not sell your personal data to third parties.",
            ],
          },
          {
            title: "Cookies & Analytics",
            paragraphs: [
              "Our website may use cookies and similar technologies to remember preferences and understand how visitors use the site.",
              "You can control cookies through your browser settings. Disabling cookies may affect some site functionality.",
            ],
          },
          {
            title: "Data Sharing",
            paragraphs: [
              "We may share information with trusted service providers who help us operate our website, analytics, or communication tools, only as needed to perform those services.",
              "We may disclose information if required by law or to protect our rights and users.",
            ],
          },
          {
            title: "Data Retention & Security",
            paragraphs: [
              "We retain contact and project information for as long as needed to provide services and meet legal obligations.",
              "We take reasonable measures to protect your data, though no online transmission is completely secure.",
            ],
          },
          {
            title: "Your Rights & Contact",
            paragraphs: [
              "You may request access, correction, or deletion of your personal data by contacting us.",
              `For privacy-related questions, email ${EMAIL} or use the contact page on trustnova.in.`,
            ],
          },
        ]}
      />
    </InnerPageLayout>
  );
}
