import { NextResponse } from "next/server";

const SHEET_URL =
  process.env.NEWSLETTER_URL || process.env.NEXT_PUBLIC_NEWSLETTER_URL || "";

export async function POST(request: Request) {
  if (!SHEET_URL || SHEET_URL === "your_script_url_here") {
    return NextResponse.json(
      { success: false, error: "Newsletter URL is not configured" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    const sheetResponse = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: body.source || "Website Footer",
        name: body.name || "",
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
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { success: false, error: "Request failed" },
      { status: 500 },
    );
  }
}
