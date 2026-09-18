import { cookies } from "next/headers";
import DeskAccess from "@/components/desk/DeskAccess";
import LeadDesk from "@/components/desk/LeadDesk";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

export const metadata = { title: "Lead Desk | TrustNova", robots: { index: false, follow: false } };
export default function DeskPage() { return verifyAdminSession(cookies().get(ADMIN_COOKIE)?.value) ? <LeadDesk /> : <DeskAccess />; }
