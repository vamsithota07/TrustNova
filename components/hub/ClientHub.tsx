"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Mail,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { EMAIL, PHONE_WHATSAPP } from "@/lib/constants";

type Channel = "email" | "whatsapp";
type Draft = { channel: Channel; subject: string; message: string };

const projectItems = [
  { label: "Discovery", detail: "Project brief received", status: "complete" },
  { label: "Creative direction", detail: "Your next review milestone", status: "active" },
  { label: "Design & build", detail: "Begins after direction approval", status: "upcoming" },
  { label: "Launch", detail: "Final checks and handover", status: "upcoming" },
];

export default function ClientHub() {
  const [tab, setTab] = useState<"overview" | "messages">("overview");
  const [channel, setChannel] = useState<Channel>("email");
  const [subject, setSubject] = useState("Project update");
  const [message, setMessage] = useState("");
  const [reviewing, setReviewing] = useState<Draft | null>(null);
  const [notice, setNotice] = useState("");
  const canReview = message.trim().length > 0 && (channel === "whatsapp" || subject.trim().length > 0);

  const destination = useMemo(() => channel === "email" ? EMAIL : `+${PHONE_WHATSAPP}`, [channel]);

  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canReview) return;
    setReviewing({ channel, subject: subject.trim(), message: message.trim() });
  }

  function approveAndOpen() {
    if (!reviewing) return;
    if (reviewing.channel === "email") {
      const url = new URL("https://mail.google.com/mail/");
      url.searchParams.set("view", "cm");
      url.searchParams.set("fs", "1");
      url.searchParams.set("to", EMAIL);
      url.searchParams.set("su", reviewing.subject);
      url.searchParams.set("body", reviewing.message);
      window.open(url.toString(), "_blank", "noopener,noreferrer");
    } else {
      const url = new URL(`https://wa.me/${PHONE_WHATSAPP}`);
      url.searchParams.set("text", reviewing.message);
      window.open(url.toString(), "_blank", "noopener,noreferrer");
    }
    setReviewing(null);
    setNotice("Your approved draft has opened in the selected channel. Sending remains under your control there.");
  }

  async function signOut() {
    await fetch("/api/hub/session", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-brand-black px-4 py-5 text-brand-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 rounded-organic border border-brand-rule bg-brand-card px-5 py-5 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-warm">TrustNova client hub</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Welcome to your project space</h1>
          </div>
          <button onClick={signOut} className="self-start rounded-full border border-brand-rule px-4 py-2 text-sm font-semibold text-brand-silver transition hover:border-brand-white hover:text-brand-white sm:self-auto">Sign out</button>
        </header>

        <nav className="mt-6 flex gap-2 border-b border-brand-rule" aria-label="Client hub sections">
          {(["overview", "messages"] as const).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`rounded-t-xl px-4 py-3 text-sm font-semibold capitalize transition ${tab === item ? "bg-brand-card text-brand-white" : "text-brand-silver hover:text-brand-white"}`}>
              {item}
            </button>
          ))}
        </nav>

        {tab === "overview" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
            <section className="rounded-organic border border-brand-rule bg-brand-card p-6 shadow-soft sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="editorial-eyebrow text-accent-warm">Project status</p>
                  <h2 className="mt-2 text-2xl font-bold">Creative direction</h2>
                  <p className="mt-2 text-sm leading-relaxed text-brand-silver">We’re preparing the thinking that will guide your visual system and website experience.</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent-warm/10 px-3 py-1.5 text-xs font-bold text-accent-warm">In progress</span>
              </div>
              <ol className="mt-8 space-y-5">
                {projectItems.map((item, index) => (
                  <li key={item.label} className="flex gap-4">
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${item.status === "complete" ? "border-accent-sage bg-accent-sage text-white" : item.status === "active" ? "border-accent-warm bg-accent-warm/10 text-accent-warm" : "border-brand-rule text-brand-dim"}`}>
                      {item.status === "complete" ? <CheckCircle2 size={15} /> : item.status === "active" ? <Clock3 size={14} /> : <span className="text-xs font-bold">{index + 1}</span>}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-white">{item.label}</p>
                      <p className="mt-0.5 text-sm text-brand-silver">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <aside className="space-y-6">
              <section className="rounded-organic border border-brand-rule bg-brand-card p-6 shadow-soft">
                <div className="flex items-center gap-3"><FileText className="text-accent-warm" size={20} /><h2 className="font-bold">Shared space</h2></div>
                <p className="mt-3 text-sm leading-relaxed text-brand-silver">Your approved files, decisions, and handover items will appear here as the project moves forward.</p>
                <button onClick={() => setTab("messages")} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent-warm hover:underline">Ask a project question <ChevronRight size={15} /></button>
              </section>
              <section className="rounded-organic border border-accent-sage/30 bg-accent-sage/10 p-6">
                <div className="flex items-center gap-3"><ShieldCheck className="text-accent-sage" size={20} /><h2 className="font-bold">Private by design</h2></div>
                <p className="mt-3 text-sm leading-relaxed text-brand-silver">This workspace uses a signed, secure session. Messages remain drafts until you deliberately approve them.</p>
              </section>
            </aside>
          </div>
        ) : (
          <section className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-organic border border-brand-rule bg-brand-card p-6 shadow-soft sm:p-8">
              <p className="editorial-eyebrow text-accent-warm">Contact TrustNova</p>
              <h2 className="mt-2 text-2xl font-bold">Your words, your approval.</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-silver">Write your update here. We’ll show the finished draft before opening Gmail or WhatsApp. Nothing is sent by this hub.</p>
              <div className="mt-7 space-y-3">
                <div className="flex gap-3"><Mail size={18} className="text-accent-warm" /><span className="text-sm text-brand-silver">Email drafts go to {EMAIL}</span></div>
                <div className="flex gap-3"><MessageCircle size={18} className="text-accent-warm" /><span className="text-sm text-brand-silver">WhatsApp drafts open your own WhatsApp</span></div>
              </div>
            </div>

            <form onSubmit={prepareDraft} className="rounded-organic border border-brand-rule bg-brand-card p-6 shadow-soft sm:p-8">
              <div className="flex rounded-xl bg-brand-dark p-1" role="tablist" aria-label="Message channel">
                {(["email", "whatsapp"] as const).map((option) => <button type="button" role="tab" aria-selected={channel === option} key={option} onClick={() => setChannel(option)} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition ${channel === option ? "bg-brand-card text-brand-white shadow-soft" : "text-brand-silver"}`}>{option === "email" ? "Gmail" : "WhatsApp"}</button>)}
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-dim">To: {destination}</p>
              {channel === "email" && <label className="mt-5 block text-sm font-semibold">Subject<input value={subject} onChange={(event) => setSubject(event.target.value)} className="mt-2 w-full rounded-xl border border-brand-rule bg-brand-black px-4 py-3 text-brand-white outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20" required /></label>}
              <label className="mt-5 block text-sm font-semibold">Message<textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={7} className="mt-2 w-full resize-y rounded-xl border border-brand-rule bg-brand-black px-4 py-3 text-brand-white outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20" placeholder="Share an update, ask a question, or leave feedback…" required /></label>
              {notice && <p className="mt-4 rounded-xl bg-accent-sage/10 p-3 text-sm text-accent-sage" role="status">{notice}</p>}
              <button type="submit" disabled={!canReview} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-white px-4 py-3 font-semibold text-brand-black transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"><ShieldCheck size={18} />Review draft before opening</button>
            </form>
          </section>
        )}
      </div>

      {reviewing && <div className="fixed inset-0 z-[2000] flex items-end bg-brand-white/45 p-4 backdrop-blur-sm sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-labelledby="draft-title">
        <div className="w-full max-w-xl rounded-organic bg-brand-card p-6 shadow-card-hover sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="editorial-eyebrow text-accent-warm">Final approval</p><h2 id="draft-title" className="mt-2 text-2xl font-bold">Review your draft</h2></div><button onClick={() => setReviewing(null)} className="rounded-full p-2 text-brand-silver hover:bg-brand-dark hover:text-brand-white" aria-label="Close draft review"><X size={20} /></button></div>
          <div className="mt-6 rounded-xl border border-brand-rule bg-brand-black p-4 text-sm"><p className="text-brand-dim">To</p><p className="mt-1 font-semibold">{reviewing.channel === "email" ? EMAIL : `WhatsApp +${PHONE_WHATSAPP}`}</p>{reviewing.channel === "email" && <><p className="mt-4 text-brand-dim">Subject</p><p className="mt-1 font-semibold">{reviewing.subject}</p></>}<p className="mt-4 whitespace-pre-wrap leading-relaxed text-brand-silver">{reviewing.message}</p></div>
          <p className="mt-5 text-sm leading-relaxed text-brand-silver">Approving opens a prefilled draft in {reviewing.channel === "email" ? "Gmail" : "WhatsApp"}. The platform’s own Send control is a separate final action.</p>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button onClick={() => setReviewing(null)} className="rounded-xl px-4 py-3 text-sm font-semibold text-brand-silver hover:text-brand-white">Keep editing</button><button onClick={approveAndOpen} className="rounded-xl bg-brand-white px-5 py-3 text-sm font-semibold text-brand-black transition hover:opacity-85">Approve & open draft</button></div>
        </div>
      </div>}
    </main>
  );
}
