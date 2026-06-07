"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Globe,
  List,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import Container from "@/components/Container";
import { EMAIL, WHATSAPP_URL, PHONE } from "@/lib/constants";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "payment-terms", label: "Payment Terms" },
  { id: "revisions", label: "Revisions" },
  { id: "cancellation-refunds", label: "Cancellation & Refunds" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "client-responsibilities", label: "Client Responsibilities" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "turnaround-time", label: "Turnaround Time" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes-to-terms", label: "Changes to Terms" },
  { id: "contact-us", label: "Contact Us" },
] as const;

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-[22px] font-bold text-brand-white mb-5 pt-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-brand-blue/20 bg-brand-blue/10 text-xs font-bold text-brand-blue">
        {number}
      </span>
      {title}
    </h2>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-[1.9] text-brand-silver mb-4 last:mb-0">{children}</p>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-brand-white mt-6 mb-3 first:mt-0">{children}</h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 mb-4">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 border-b border-brand-dark py-2 text-[15px] leading-[1.7] text-brand-silver last:border-b-0"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-r-lg border-l-4 border-brand-blue bg-brand-blue/[0.06] px-5 py-4 text-sm leading-[1.8] text-brand-silver">
      {children}
    </div>
  );
}

function TermsSection({
  id,
  number,
  title,
  children,
  isLast = false,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 ${isLast ? "" : "mb-14 border-b border-brand-accentbg pb-14"}`}
    >
      <SectionHeading number={number} title={title} />
      {children}
    </section>
  );
}

function SidebarNav({
  activeId,
  onNavigate,
  className = "",
}: {
  activeId: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={className} aria-label="Terms sections">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
        On this page
      </p>
      <ul className="space-y-0.5">
        {SECTIONS.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={onNavigate}
                className={`block border-l-2 py-2 pl-3.5 text-sm no-underline transition-all duration-200 ${
                  active
                    ? "border-brand-blue bg-brand-blue/[0.06] font-medium text-brand-blue"
                    : "border-brand-rule text-brand-dim hover:border-brand-blue hover:text-brand-white"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <header className="bg-brand-dark border-b border-brand-rule">
        <Container className="py-12 md:py-16">
          <p className="text-brand-blue text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Legal
          </p>
          <h1 className="text-brand-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-brand-silver text-base md:text-lg max-w-2xl mb-6">
            Please read these terms carefully before engaging our services.
          </p>
          <span className="inline-block rounded-full border border-brand-blue/20 bg-brand-blue/[0.08] px-4 py-1.5 text-[13px] text-brand-blue">
            Last updated: June 2025
          </span>
        </Container>
      </header>

      <div className="bg-brand-black">
        <Container className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 min-w-0">
            <aside className="hidden lg:block">
              <div className="sticky top-28 h-fit">
                <SidebarNav activeId={activeSection} />
              </div>
            </aside>

            <div className="min-w-0">
              <TermsSection id="overview" number={1} title="Overview">
                <BodyText>
                  These Terms and Conditions (&quot;Terms&quot;) govern all services provided by
                  TrustNova (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) to you (&quot;Client&quot;,
                  &quot;you&quot;). By engaging our services, making any payment, or communicating your
                  approval to proceed, you confirm that you have read, understood, and agreed to these
                  Terms in full.
                </BodyText>
                <BodyText>
                  These Terms apply to all services offered by TrustNova, including Logo Design, Brand
                  Identity, Website Design &amp; Development, Website Launch Support, and Website
                  Maintenance.
                </BodyText>
                <BodyText>
                  If you do not agree with any part of these Terms, please do not engage our services.
                </BodyText>
              </TermsSection>

              <TermsSection id="services" number={2} title="Services">
                <BodyText>TrustNova offers the following services:</BodyText>
                <BulletList
                  items={[
                    "Logo Design & Brand Identity - creation of custom logos, colour palettes, typography systems, and brand style guides.",
                    "Complete Brand Identity Package - logo design plus business card design, letterhead, social media templates, and brand documentation.",
                    "Website Design & Development - custom website design and development built to your brand, delivered on your chosen platform (WordPress, Webflow, or static HTML).",
                    "Website Launch & Go-Live Support - DNS configuration, SSL setup, deployment, and post-launch technical support.",
                    "Website Maintenance & Ongoing Support - monthly updates, backups, uptime monitoring, and priority support.",
                  ]}
                />
                <BodyText>
                  The exact scope of work for each project will be confirmed in writing via email or
                  WhatsApp before work commences. Any work outside the agreed scope will be quoted
                  separately.
                </BodyText>
              </TermsSection>

              <TermsSection id="payment-terms" number={3} title="Payment Terms">
                <SubHeading>3.1 Payment Structure</SubHeading>
                <BodyText>All projects operate on a 50/50 payment structure:</BodyText>
                <BulletList
                  items={[
                    "50% advance payment is required before work begins",
                    "50% final payment is due upon project completion, before final files or website access is handed over",
                  ]}
                />
                <SubHeading>3.2 Advance Payment</SubHeading>
                <BodyText>
                  Work will not commence until the advance payment has been received and confirmed. The
                  project timeline begins from the date of payment confirmation, not the date of enquiry.
                </BodyText>
                <SubHeading>3.3 Final Payment</SubHeading>
                <HighlightBox>
                  Final files, source code, login credentials, and all deliverables will be released only
                  after the final 50% payment has been received in full.
                </HighlightBox>
                <SubHeading>3.4 Payment Methods</SubHeading>
                <BodyText>Payments are accepted via:</BodyText>
                <BulletList
                  items={[
                    "Bank Transfer (NEFT / IMPS / RTGS)",
                    "UPI",
                    "Other methods as agreed in writing",
                  ]}
                />
                <SubHeading>3.5 Late Payments</SubHeading>
                <BodyText>
                  If final payment is not received within 14 days of project completion, TrustNova
                  reserves the right to suspend delivery of final files and charge a holding fee of ₹500
                  per week until payment is cleared.
                </BodyText>
                <SubHeading>3.6 Taxes</SubHeading>
                <BodyText>
                  All prices quoted are exclusive of GST. GST will be added at the applicable rate where
                  required.
                </BodyText>
              </TermsSection>

              <TermsSection id="revisions" number={4} title="Revisions">
                <SubHeading>4.1 Unlimited Revisions</SubHeading>
                <BodyText>
                  TrustNova offers unlimited revisions on all projects. We work until you are completely
                  satisfied with the result.
                </BodyText>
                <SubHeading>4.2 What Counts as a Revision</SubHeading>
                <BodyText>
                  A revision is a modification to existing work within the originally agreed scope - such
                  as changing colours, adjusting typography, moving elements, or refining copy.
                </BodyText>
                <SubHeading>4.3 What is NOT a Revision</SubHeading>
                <BodyText>The following are considered changes in scope and will be quoted separately:</BodyText>
                <BulletList
                  items={[
                    "Requesting a completely new design direction after concepts have been approved",
                    "Adding new pages or sections not in the original brief",
                    "Changing the platform or technology after development has begun",
                    "Adding features or functionality not originally discussed",
                  ]}
                />
                <SubHeading>4.4 Approval</SubHeading>
                <BodyText>
                  Once you provide written approval (via email or WhatsApp) for any design or development
                  stage, that stage is considered complete. Revisiting approved work may incur additional
                  charges.
                </BodyText>
              </TermsSection>

              <TermsSection id="cancellation-refunds" number={5} title="Cancellation & Refunds">
                <SubHeading>5.1 Cancellation by Client</SubHeading>
                <BodyText>
                  You may cancel a project at any time by notifying us in writing via email or WhatsApp.
                </BodyText>
                <SubHeading>5.2 Refund Policy</SubHeading>
                <BodyText>Refunds are calculated based on the work completed at the time of cancellation:</BodyText>
                <HighlightBox>
                  <BulletList
                    items={[
                      "If cancelled before any work has started: Full advance refund minus a ₹1,000 administrative fee.",
                      "If cancelled after work has commenced: Refund of the advance payment minus the value of work completed. The cost of completed work will be calculated fairly based on time and effort invested, and communicated to you in writing within 48 hours of cancellation.",
                      "If cancelled after final approval: No refund. Once work has been approved and final files prepared for delivery, the project is considered complete.",
                    ]}
                  />
                </HighlightBox>
                <SubHeading>5.3 Cancellation by TrustNova</SubHeading>
                <BodyText>TrustNova reserves the right to cancel a project if:</BodyText>
                <BulletList
                  items={[
                    "The client is unresponsive for more than 30 consecutive days",
                    "The client engages in abusive or disrespectful communication",
                    "Payment obligations are not met",
                  ]}
                />
                <BodyText>
                  In such cases, any advance payment for work not yet started will be refunded.
                </BodyText>
                <SubHeading>5.4 No Refund on Completed Projects</SubHeading>
                <BodyText>
                  Once a project has been fully completed, delivered, and final payment received, no
                  refund will be issued under any circumstances.
                </BodyText>
              </TermsSection>

              <TermsSection id="intellectual-property" number={6} title="Intellectual Property">
                <SubHeading>6.1 Ownership on Full Payment</SubHeading>
                <BodyText>
                  Upon receipt of full and final payment, the Client owns 100% of all deliverables created
                  by TrustNova for that project. This includes logo files, source files, website code,
                  design assets, and all related materials.
                </BodyText>
                <SubHeading>6.2 Ownership Before Full Payment</SubHeading>
                <HighlightBox>
                  Until final payment is received, all work created by TrustNova remains the intellectual
                  property of TrustNova. The Client may not use, publish, distribute, or reproduce any
                  deliverables before full payment is confirmed.
                </HighlightBox>
                <SubHeading>6.3 TrustNova Portfolio Rights</SubHeading>
                <BodyText>
                  TrustNova reserves the right to display completed work in its portfolio, website, and
                  marketing materials unless the Client requests otherwise in writing before project
                  commencement.
                </BodyText>
                <SubHeading>6.4 Third-Party Assets</SubHeading>
                <BodyText>
                  Certain projects may use third-party assets such as stock photography, icons, or fonts.
                  Licensing for such assets is the responsibility of the Client unless explicitly included
                  in the project scope. TrustNova will always disclose when third-party assets are used.
                </BodyText>
                <SubHeading>6.5 Client-Provided Content</SubHeading>
                <BodyText>
                  You are solely responsible for ensuring that any text, images, logos, or other content you
                  provide to TrustNova does not infringe any third-party copyright, trademark, or other
                  intellectual property rights.
                </BodyText>
              </TermsSection>

              <TermsSection id="client-responsibilities" number={7} title="Client Responsibilities">
                <BodyText>
                  To ensure your project is delivered on time and to the highest standard, you agree to:
                </BodyText>
                <BulletList
                  items={[
                    "Provide all required content, images, text, and references within 7 days of project kickoff, or as otherwise agreed in writing.",
                    "Respond to design concepts, revision requests, and queries within 5 business days. Delays in response may push back the project timeline.",
                    "Ensure that all content provided is accurate, legally compliant, and does not infringe any third-party rights.",
                    "Nominate a single point of contact for all project communication to avoid conflicting instructions.",
                    "Purchase and manage your own domain name and hosting account. TrustNova does not provide domain or hosting services. Costs for domain registration and hosting are your responsibility.",
                    "Provide necessary access credentials (hosting login, domain registrar, etc.) when required for website launch.",
                  ]}
                />
              </TermsSection>

              <TermsSection id="confidentiality" number={8} title="Confidentiality">
                <BodyText>
                  Both TrustNova and the Client agree to keep all project-related information, business
                  details, and communications confidential.
                </BodyText>
                <BodyText>
                  TrustNova will not share your business information, project details, or personal data with
                  any third party without your written consent, except where required by law.
                </BodyText>
                <BodyText>
                  This confidentiality obligation continues indefinitely after the completion or termination
                  of any project.
                </BodyText>
              </TermsSection>

              <TermsSection id="turnaround-time" number={9} title="Turnaround Time">
                <SubHeading>9.1 Estimated Timelines</SubHeading>
                <BodyText>
                  Estimated project timelines are provided in good faith and are indicative, not
                  guaranteed. Standard timelines are:
                </BodyText>
                <BulletList
                  items={[
                    "Logo Design - first concepts within 3–5 business days of advance payment",
                    "Complete Brand Identity - 7–14 business days",
                    "Website Design (up to 5 pages) - 2–3 weeks",
                    "Website Design (6–8+ pages) - 3–5 weeks",
                    "Website Launch Support - 2–5 business days after site approval",
                  ]}
                />
                <SubHeading>9.2 Delays Caused by Client</SubHeading>
                <BodyText>Project timelines may be extended if:</BodyText>
                <BulletList
                  items={[
                    "Content or feedback is not provided on time",
                    "Revision requests significantly change the agreed scope",
                    "Payment is delayed",
                  ]}
                />
                <BodyText>TrustNova is not liable for project delays caused by the Client.</BodyText>
                <SubHeading>9.3 Force Majeure</SubHeading>
                <BodyText>
                  TrustNova is not liable for delays caused by circumstances beyond our reasonable control,
                  including but not limited to illness, technical failures, natural disasters, or internet
                  outages.
                </BodyText>
              </TermsSection>

              <TermsSection id="limitation-of-liability" number={10} title="Limitation of Liability">
                <SubHeading>10.1 Maximum Liability</SubHeading>
                <HighlightBox>
                  TrustNova&apos;s total liability to you for any claim arising from or related to our
                  services shall not exceed the total amount paid by you for the specific project in
                  question.
                </HighlightBox>
                <SubHeading>10.2 No Consequential Damages</SubHeading>
                <BodyText>
                  TrustNova is not liable for any indirect, incidental, special, or consequential damages
                  including but not limited to loss of revenue, loss of profits, loss of business, or loss
                  of data arising from the use of or inability to use our deliverables.
                </BodyText>
                <SubHeading>10.3 Website Performance</SubHeading>
                <BodyText>
                  TrustNova builds websites to professional standards, but we do not guarantee specific
                  search engine rankings, traffic levels, or business outcomes resulting from the website.
                </BodyText>
                <SubHeading>10.4 Third-Party Services</SubHeading>
                <BodyText>
                  TrustNova is not responsible for the performance, uptime, or policies of third-party
                  services including hosting providers, domain registrars, payment gateways, or any other
                  external platforms.
                </BodyText>
              </TermsSection>

              <TermsSection id="governing-law" number={11} title="Governing Law">
                <BodyText>
                  These Terms and Conditions are governed by and construed in accordance with the laws of
                  India.
                </BodyText>
                <BodyText>
                  Any disputes arising from these Terms or from services provided by TrustNova shall be
                  subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana, India.
                </BodyText>
                <BodyText>
                  Both parties agree to first attempt to resolve any dispute amicably through direct
                  communication before pursuing legal action.
                </BodyText>
              </TermsSection>

              <TermsSection id="changes-to-terms" number={12} title="Changes to Terms">
                <BodyText>
                  TrustNova reserves the right to update or modify these Terms at any time. The most current
                  version will always be available at trustnova.in/terms.
                </BodyText>
                <BodyText>
                  Changes will take effect immediately upon publication. Continued engagement with
                  TrustNova after changes are published constitutes your acceptance of the updated Terms.
                </BodyText>
                <BodyText>
                  For active projects, the Terms in effect at the time of advance payment will apply for the
                  duration of that project.
                </BodyText>
              </TermsSection>

              <TermsSection id="contact-us" number={13} title="Contact Us" isLast>
                <BodyText>
                  If you have any questions about these Terms and Conditions, please contact us:
                </BodyText>
                <div className="mt-6 rounded-2xl border border-brand-rule bg-brand-dark p-6 md:p-8">
                  <p className="font-bold text-brand-white mb-4">TrustNova - Brand &amp; Creative Studio</p>
                  {[
                    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                    {
                      icon: Phone,
                      label: "Phone / WhatsApp",
                      value: PHONE,
                      href: WHATSAPP_URL,
                    },
                    {
                      icon: Globe,
                      label: "Website",
                      value: "trustnova.in",
                      href: "https://trustnova.in",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Hyderabad, Telangana, India",
                    },
                    {
                      icon: Clock,
                      label: "Hours",
                      value: "Monday – Saturday, 9:00 AM – 7:00 PM IST",
                    },
                  ].map(({ icon: Icon, label, value, href }, index, arr) => (
                    <div
                      key={label}
                      className={`flex items-start gap-3 py-2.5 ${
                        index < arr.length - 1 ? "border-b border-brand-rule" : ""
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px] text-brand-blue shrink-0 mt-0.5" strokeWidth={1.75} />
                      <div className="min-w-0">
                        <span className="font-semibold text-brand-white text-sm">{label}: </span>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-brand-silver text-sm hover:text-brand-blue transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="text-brand-silver text-sm">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <BodyText>
                  We are happy to clarify any aspect of these Terms before you engage our services.
                </BodyText>
              </TermsSection>
            </div>
          </div>
        </Container>
      </div>

      <section className="border-t border-brand-rule bg-brand-dark py-10 md:py-12 text-center">
        <Container>
          <h2 className="text-brand-white text-xl md:text-[22px] font-bold mb-2">
            Questions about our terms?
          </h2>
          <p className="text-brand-silver text-[15px] mb-6 max-w-xl mx-auto">
            We&apos;re happy to explain anything before you engage our services. Just reach out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi, I have a question about your Terms & Conditions.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] px-7 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold transition-all hover:shadow-blue-glow"
            >
              Chat on WhatsApp →
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center min-h-[44px] px-7 py-2.5 rounded-lg border border-brand-blue text-brand-blue text-sm font-semibold transition-colors hover:bg-brand-blue/5"
            >
              {EMAIL}
            </a>
          </div>
        </Container>
      </section>

      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed bottom-6 right-5 z-40 flex items-center gap-2 rounded-full bg-brand-blue text-white px-4 py-3 text-sm font-semibold shadow-[0_8px_24px_rgba(107,143,117,0.35)]"
        aria-label="Open table of contents"
      >
        <List className="w-4 h-4" />
        Contents
      </button>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close contents"
              className="lg:hidden fixed inset-0 z-50 bg-brand-white/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Table of contents"
              className="lg:hidden fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border border-brand-rule bg-brand-black p-6 pb-8 shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-brand-white font-semibold">Contents</p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-brand-dim hover:text-brand-white"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarNav
                activeId={activeSection}
                onNavigate={() => setDrawerOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
