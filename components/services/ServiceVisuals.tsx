"use client";

import { useEffect, useState } from "react";

export type ServiceVisualType = "logo" | "brand" | "website" | "launch" | "maintenance";

const visualLabels: Record<ServiceVisualType, string> = {
  logo: "3 Concepts Delivered",
  brand: "Complete Brand System",
  website: "Mobile-First & Responsive",
  launch: "30-Day Support Included",
  maintenance: "Monthly Reports Included",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function anim(reduced: boolean, value: string) {
  return reduced ? "none" : value;
}

function fadeUpStyle(reduced: boolean, delay: string) {
  if (reduced) {
    return { opacity: 1, transform: "none", animation: "none" as const };
  }
  return { animation: `fadeUp 0.5s ease ${delay} both` };
}

function LogoVisual({ reduced, active }: { reduced: boolean; active: boolean }) {
  return (
    <div className="relative flex h-[260px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-brand-rule bg-brand-dark p-8">
      <div
        className="pointer-events-none absolute rounded-full border border-brand-blue/15"
        style={{
          width: 200,
          height: 200,
          animation: anim(reduced, "spin 12s linear infinite"),
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full border border-dashed border-brand-blue/20"
        style={{
          width: 150,
          height: 150,
          animation: anim(reduced, "spin 8s linear infinite reverse"),
        }}
      />

      <div
        className="relative z-[1] mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-brand-white shadow-[0_8px_32px_rgba(107,143,117,0.2)]"
        style={{ animation: anim(reduced, "svc-logo-pulse 3s ease-in-out infinite") }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
          <path
            d="M18 4L32 12V24L18 32L4 24V12L18 4Z"
            stroke="#6B8F75"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M18 4V18M18 18L4 12M18 18L32 12"
            stroke="rgba(107,143,117,0.6)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-[1] flex gap-2.5">
        {(["Concept A", "Concept B", "Concept C"] as const).map((label, i) => (
          <div
            key={label}
            className={`flex h-10 w-16 items-center justify-center rounded-lg text-[9px] font-semibold tracking-wide ${
              i === 1
                ? "border border-brand-blue bg-brand-blue text-white"
                : "border border-brand-rule bg-brand-black text-brand-blue"
            }`}
            style={
              reduced || !active
                ? fadeUpStyle(reduced, `${i * 0.2}s`)
                : {
                    animation: `concept-flip 0.5s ease ${i * 0.15}s both`,
                  }
            }
          >
            {label}
          </div>
        ))}
      </div>

      <p className="relative z-[1] mt-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
        3 Concepts Included
      </p>
    </div>
  );
}

function BrandVisual({ reduced }: { reduced: boolean }) {
  const colors = ["#0D1117", "#6B8F75", "#5A7A62", "#E8F0EA", "#F4F8F5"];

  return (
    <div className="flex h-[260px] flex-col gap-3.5 overflow-hidden rounded-2xl border border-brand-rule bg-brand-dark p-7">
      <div>
        <p className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-brand-dim">Colour Palette</p>
        <div className="flex gap-2.5">
          {colors.map((c, i) => (
            <div
              key={c}
              className="h-9 w-9 rounded-full border-2 border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
              style={{ background: c, ...fadeUpStyle(reduced, `${i * 0.1}s`) }}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-brand-dim">Typography</p>
        <p
          className="text-[22px] font-bold tracking-tight text-brand-white"
          style={fadeUpStyle(reduced, "0.3s")}
        >
          Aa - Primary Font
        </p>
        <p className="mt-1 text-sm text-brand-blue" style={fadeUpStyle(reduced, "0.4s")}>
          Aa - Secondary Font
        </p>
      </div>

      <div>
        <p className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-brand-dim">Social Templates</p>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex h-10 w-10 items-center justify-center rounded-md ${
                i % 2 === 0 ? "bg-brand-white" : "bg-brand-blue"
              }`}
              style={fadeUpStyle(reduced, `${0.5 + i * 0.08}s`)}
            >
              <div className="h-0.5 w-5 rounded-sm bg-white/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebsiteVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative h-[260px] overflow-hidden rounded-2xl bg-brand-white">
      <div className="flex items-center gap-2 border-b border-[#2E3448] bg-[#1A1E28] px-4 py-2.5">
        <div className="flex gap-1.5">
          {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
            <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="min-w-0 flex-1 rounded bg-brand-white px-3 py-1 font-mono text-[11px] text-brand-blue">
          www.yourbusiness.com
        </div>
      </div>

      <div className="relative px-[22px] py-5">
        <div
          className="mb-[18px] flex items-center justify-between"
          style={fadeUpStyle(reduced, "0.1s")}
        >
          <div className="h-2 w-[60px] rounded bg-brand-blue" />
          <div className="flex gap-2">
            {[40, 40, 40, 60].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-sm bg-brand-blue/30"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>

        <div className="mb-4" style={fadeUpStyle(reduced, "0.2s")}>
          <div className="mb-2 h-3.5 w-[70%] rounded bg-white" />
          <div className="mb-3 h-3.5 w-[55%] rounded bg-white/50" />
          <div className="flex gap-2">
            <div className="h-7 w-20 rounded-md bg-brand-blue" />
            <div className="h-7 w-20 rounded-md border border-brand-blue" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2" style={fadeUpStyle(reduced, "0.4s")}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-[#2E3448] bg-[#1A1E28] p-2.5">
              <div className="mb-1.5 h-1.5 w-full rounded-sm bg-brand-blue/40" />
              <div className="h-1 w-[70%] rounded-sm bg-brand-blue/20" />
            </div>
          ))}
        </div>

        <div
          className="absolute bottom-4 right-5 h-4 w-0.5 bg-brand-blue"
          style={{ animation: anim(reduced, "blink 1s ease infinite") }}
        />
      </div>
    </div>
  );
}

function LaunchVisual({ reduced }: { reduced: boolean }) {
  const steps = [
    { label: "DNS Configuration", highlight: false, delay: "0s" },
    { label: "SSL Certificate Active", highlight: false, delay: "0.15s" },
    { label: "Mobile Testing", highlight: false, delay: "0.3s" },
    { label: "Browser Compatibility", highlight: false, delay: "0.45s" },
    { label: "Site Live ✦", highlight: true, delay: "0.6s" },
  ];

  return (
    <div className="flex h-[260px] flex-col justify-center overflow-hidden rounded-2xl border border-brand-rule bg-brand-dark px-8 py-7">
      {steps.map((step, i) => (
        <div
          key={step.label}
          className={`flex items-center gap-3.5 py-2 ${i < 4 ? "border-b border-brand-accentbg" : ""}`}
          style={
            reduced
              ? { opacity: 1, transform: "none" }
              : { animation: `slideIn 0.5s ease ${step.delay} both` }
          }
        >
          <div
            className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              step.highlight
                ? "border-2 border-brand-blue bg-brand-blue"
                : "border-2 border-brand-blue/30 bg-brand-blue/15"
            }`}
          >
            <span
              className={`text-[11px] font-bold ${step.highlight ? "text-white" : "text-brand-blue"}`}
            >
              ✓
            </span>
            {step.highlight && !reduced && (
              <div
                className="absolute inset-[-4px] rounded-full border-2 border-brand-blue"
                style={{ animation: "ping 1.5s ease infinite" }}
              />
            )}
          </div>
          <span
            className={`text-sm ${step.highlight ? "font-bold text-brand-white" : "text-brand-silver"}`}
          >
            {step.label}
          </span>
          {step.highlight && (
            <span className="ml-auto rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-brand-blue">
              LIVE
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function MaintenanceVisual({ reduced }: { reduced: boolean }) {
  const bars = [65, 78, 55, 90, 72, 88, 95];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="h-[260px] overflow-hidden rounded-2xl bg-brand-white p-6">
      <div
        className="mb-5 flex items-center justify-between"
        style={fadeUpStyle(reduced, "0.1s")}
      >
        <div>
          <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-brand-blue">
            Monthly Report
          </p>
          <p className="text-lg font-bold text-white">
            Site Health: <span className="text-brand-blue">98%</span>
          </p>
        </div>
        <div
          className="h-2.5 w-2.5 rounded-full bg-[#27AE60] shadow-[0_0_8px_#27AE60]"
          style={{ animation: anim(reduced, "pulse 2s ease infinite") }}
        />
      </div>

      <div className="mb-4 flex h-[90px] items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end">
            <div
              className={`w-full rounded-t ${i === 6 ? "bg-brand-blue" : "bg-brand-blue/30"}`}
              style={{
                height: `${h}%`,
                transformOrigin: "bottom",
                ...(reduced
                  ? { transform: "scaleY(1)", opacity: 1 }
                  : { animation: `barGrow 0.6s ease ${i * 0.08}s both` }),
              }}
            />
          </div>
        ))}
      </div>

      <div className="mb-4 flex gap-2">
        {days.map((d, i) => (
          <div key={`${d}-${i}`} className="flex-1 text-center text-[10px] text-brand-silver">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5" style={fadeUpStyle(reduced, "0.5s")}>
        {[
          { label: "Uptime", value: "99.9%", color: "#27AE60" },
          { label: "Backups", value: "Daily", color: "#6B8F75" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-[#2E3448] bg-[#1A1E28] px-3.5 py-2.5"
          >
            <p className="mb-0.5 text-[10px] uppercase tracking-wide text-brand-blue">
              {stat.label}
            </p>
            <p className="text-base font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualBody({
  type,
  reduced,
  active,
}: {
  type: ServiceVisualType;
  reduced: boolean;
  active: boolean;
}) {
  switch (type) {
    case "logo":
      return <LogoVisual reduced={reduced} active={active} />;
    case "brand":
      return <BrandVisual reduced={reduced} />;
    case "website":
      return <WebsiteVisual reduced={reduced} />;
    case "launch":
      return <LaunchVisual reduced={reduced} />;
    case "maintenance":
      return <MaintenanceVisual reduced={reduced} />;
  }
}

export default function ServiceVisual({
  type,
  active = true,
}: {
  type: ServiceVisualType;
  active?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div>
      <VisualBody type={type} reduced={reduced} active={active} />
      <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
        {visualLabels[type]}
      </p>
    </div>
  );
}
