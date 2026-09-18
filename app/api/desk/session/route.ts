import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminSession, SESSION_DURATION_SECONDS } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const configuredCode = process.env.TRUSTNOVA_ADMIN_ACCESS_CODE;
  if (!configuredCode) return NextResponse.json({ error: "The TrustNova lead desk has not been configured." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  if (body.accessCode !== configuredCode) return NextResponse.json({ error: "That access code is not valid." }, { status: 401 });

  const response = NextResponse.json({ success: true });
  response.cookies.set({ name: ADMIN_COOKIE, value: createAdminSession(), httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/desk", maxAge: SESSION_DURATION_SECONDS });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({ name: ADMIN_COOKIE, value: "", path: "/desk", maxAge: 0 });
  return response;
}
