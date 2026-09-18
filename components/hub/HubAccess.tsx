"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, ArrowRight } from "lucide-react";

export default function HubAccess() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/hub/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to open the hub.");
      window.location.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to open the hub.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-black px-5 py-24 text-brand-white">
      <section className="mx-auto max-w-md rounded-organic-lg border border-brand-rule bg-brand-card p-7 shadow-card sm:p-10">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-warm/10 text-accent-warm">
          <LockKeyhole size={22} aria-hidden="true" />
        </div>
        <p className="editorial-eyebrow text-accent-warm">TrustNova client space</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Your project, in one calm place.</h1>
        <p className="mt-4 leading-relaxed text-brand-silver">Enter the access code from your TrustNova welcome email to view your workspace.</p>
        <form className="mt-8 space-y-4" onSubmit={submit}>
          <label className="block text-sm font-semibold text-brand-white" htmlFor="access-code">Access code</label>
          <input id="access-code" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} className="w-full rounded-xl border border-brand-rule bg-brand-black px-4 py-3 text-brand-white outline-none transition focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20" autoComplete="one-time-code" required />
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-white px-4 py-3 font-semibold text-brand-black transition hover:opacity-85 disabled:opacity-60">
            {loading ? "Opening…" : "Open my workspace"} <ArrowRight size={18} aria-hidden="true" />
          </button>
        </form>
      </section>
    </main>
  );
}
