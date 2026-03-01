import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, getSessionCookieName } from "@/lib/admin-auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const ok = verifySessionToken(token);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
