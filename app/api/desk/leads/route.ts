import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

export type Lead = { id: string; name: string; email: string; phone?: string; service?: string; message?: string; receivedAt?: string };

const previewLeads: Lead[] = [
  { id: "preview-1", name: "Aarav Mehta", email: "aarav@example.com", phone: "+91 98765 43210", service: "Brand identity", message: "Looking for a fresh identity and website for a growing hospitality business.", receivedAt: "Preview" },
  { id: "preview-2", name: "Nisha Rao", email: "nisha@example.com", phone: "+91 91234 56789", service: "Website design", message: "Need a high-trust website for a consultancy launch next month.", receivedAt: "Preview" },
];

function normalizeLead(item: unknown, index: number): Lead | null {
  if (!item || typeof item !== "object") return null;
  const row = item as Record<string, unknown>;
  const text = (key: string) => typeof row[key] === "string" ? row[key].trim() : "";
  const email = text("email").toLowerCase();
  if (!email || !email.includes("@")) return null;
  return { id: text("id") || `lead-${index}`, name: text("name") || "New enquiry", email, phone: text("phone"), service: text("service"), message: text("message"), receivedAt: text("receivedAt") || text("timestamp") };
}

export async function GET() {
  if (!verifyAdminSession(cookies().get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const sourceUrl = process.env.TRUSTNOVA_LEADS_API_URL;
  if (!sourceUrl) return NextResponse.json({ source: "preview", leads: previewLeads });

  try {
    const response = await fetch(sourceUrl, { headers: process.env.TRUSTNOVA_LEADS_API_TOKEN ? { Authorization: `Bearer ${process.env.TRUSTNOVA_LEADS_API_TOKEN}` } : {}, cache: "no-store" });
    if (!response.ok) throw new Error("Lead source unavailable");
    const data = await response.json();
    const rows = Array.isArray(data) ? data : Array.isArray(data.leads) ? data.leads : [];
    return NextResponse.json({ source: "live", leads: rows.map(normalizeLead).filter(Boolean) });
  } catch {
    return NextResponse.json({ source: "unavailable", leads: [] }, { status: 502 });
  }
}
