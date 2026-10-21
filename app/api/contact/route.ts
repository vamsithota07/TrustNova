import { NextResponse } from "next/server";
import { getGoogleSheetsUrl } from "@/lib/google-sheets";

const SHEET_URL = getGoogleSheetsUrl();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Google Sheets treats a value starting with + = - or @ as a formula ("+91 98765..." becomes #ERROR!).
 *  A leading apostrophe makes the sheet keep it as plain text; the apostrophe itself is not shown. */
const asText = (value: string) => (/^[=+\-@]/.test(value) ? `'${value}` : value);

export async function POST(request: Request) {
  if (!SHEET_URL || SHEET_URL === "your_script_url_here") {
    return NextResponse.json(
      { success: false, error: "Contact form URL is not configured" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const budget = typeof body.budget === "string" ? body.budget.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !EMAIL_PATTERN.test(email) || !phone || !service || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const sheetResponse = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        name: asText(name),
        email,
        phone: asText(phone),
        service,
        budget,
        message: asText(message),
        source: body.source || "Contact Page",
      }),
      redirect: "follow",
    });

    const text = await sheetResponse.text();
    let result: { success?: boolean; error?: string } = { success: sheetResponse.ok };

    try {
      result = JSON.parse(text) as { success?: boolean; error?: string };
    } catch {
      // Apps Script may return non-JSON on redirect; treat 2xx as success.
    }

    if (!sheetResponse.ok || result.success === false) {
      return NextResponse.json(
        { success: false, error: result.error || "Sheet submission failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Request failed" },
      { status: 500 },
    );
  }
}
