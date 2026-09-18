import { cookies } from "next/headers";
import ClientHub from "@/components/hub/ClientHub";
import HubAccess from "@/components/hub/HubAccess";
import { CLIENT_HUB_COOKIE, verifyClientHubSession } from "@/lib/client-hub-auth";

export const metadata = { title: "Client Hub | TrustNova", robots: { index: false, follow: false } };

export default function HubPage() {
  const session = cookies().get(CLIENT_HUB_COOKIE)?.value;
  return verifyClientHubSession(session) ? <ClientHub /> : <HubAccess />;
}
