"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function DeskAccess() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/desk/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ accessCode }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to open the lead desk.");
      window.location.reload();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to open the lead desk."); }
    finally { setLoading(false); }
  }
  return <main className="min-h-screen bg-brand-black px-5 py-24 text-brand-white"><section className="mx-auto max-w-md rounded-organic-lg border border-brand-rule bg-brand-card p-8 shadow-card sm:p-10"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-warm/10 text-accent-warm"><ShieldCheck size={22} /></div><p className="mt-8 editorial-eyebrow text-accent-warm">TrustNova internal</p><h1 className="mt-3 text-3xl font-bold tracking-tight">Lead desk</h1><p className="mt-4 leading-relaxed text-brand-silver">Review new enquiries, approve outreach, and keep every first contact intentional.</p><form className="mt-8 space-y-4" onSubmit={submit}><label className="block text-sm font-semibold" htmlFor="desk-code">Admin access code</label><input id="desk-code" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} className="w-full rounded-xl border border-brand-rule bg-brand-black px-4 py-3 text-brand-white outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20" required />{error && <p className="text-sm text-red-600" role="alert">{error}</p>}<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-white px-4 py-3 font-semibold text-brand-black disabled:opacity-60" disabled={loading}>{loading ? "Opening…" : "Open lead desk"}<ArrowRight size={18} /></button></form></section></main>;
}
