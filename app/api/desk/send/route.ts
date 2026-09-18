import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

type Channel = "email" | "whatsapp";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cleanHeader = (value: string) => value.replace(/[\r\n]/g, " ").trim();
const asBase64Url = (value: string) => Buffer.from(value, "utf8").toString("base64url");

async function gmailAccessToken() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return "";
  const body = new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: "refresh_token" });
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body, cache: "no-store" });
  const data = await response.json() as { access_token?: string };
  return response.ok ? data.access_token || "" : "";
}

async function sendEmail(to: string, subject: string, message: string) {
  const sender = process.env.GMAIL_SENDER_EMAIL;
  const token = await gmailAccessToken();
  if (!sender || !token) return { configured: false };
  const mime = `From: ${cleanHeader(sender)}\r\nTo: ${cleanHeader(to)}\r\nSubject: ${cleanHeader(subject)}\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n${message}`;
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ raw: asBase64Url(mime) }), cache: "no-store" });
  return { configured: true, sent: response.ok };
}

async function sendWhatsApp(to: string, message: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US";
  if (!phoneNumberId || !token || !templateName) return { configured: false };
  const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ messaging_product: "whatsapp", to: to.replace(/\D/g, ""), type: "template", template: { name: templateName, language: { code: language }, components: [{ type: "body", parameters: [{ type: "text", text: message }] }] } }), cache: "no-store" });
  return { configured: true, sent: response.ok };
}

export async function POST(request: Request) {
  if (!verifyAdminSession(cookies().get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const channel = body.channel as Channel;
  const to = typeof body.to === "string" ? body.to.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || (channel !== "email" && channel !== "whatsapp")) return NextResponse.json({ error: "A channel and message are required." }, { status: 400 });
  if (channel === "email" && (!emailPattern.test(to) || !subject)) return NextResponse.json({ error: "A valid email address and subject are required." }, { status: 400 });
  if (channel === "whatsapp" && to.replace(/\D/g, "").length < 10) return NextResponse.json({ error: "A valid WhatsApp number is required." }, { status: 400 });

  const result = channel === "email" ? await sendEmail(to, subject, message) : await sendWhatsApp(to, message);
  if (!result.configured) return NextResponse.json({ error: `${channel === "email" ? "Gmail" : "WhatsApp Business"} is not connected yet.` }, { status: 503 });
  if (!result.sent) return NextResponse.json({ error: "The provider did not accept this message. Check its account settings and approved template." }, { status: 502 });
  return NextResponse.json({ success: true });
}
