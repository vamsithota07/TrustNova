import { NextResponse } from "next/server";
import {
  CLIENT_HUB_COOKIE,
  createClientHubSession,
  SESSION_DURATION_SECONDS,
} from "@/lib/client-hub-auth";

export async function POST(request: Request) {
  const configuredCode = process.env.CLIENT_HUB_ACCESS_CODE;
  if (!configuredCode) {
    return NextResponse.json(
      { error: "Client hub access has not been configured." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const accessCode = typeof body.accessCode === "string" ? body.accessCode : "";
  if (accessCode !== configuredCode) {
    return NextResponse.json({ error: "That access code is not valid." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: CLIENT_HUB_COOKIE,
    value: createClientHubSession(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/hub",
    maxAge: SESSION_DURATION_SECONDS,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({ name: CLIENT_HUB_COOKIE, value: "", path: "/hub", maxAge: 0 });
  return response;
}
