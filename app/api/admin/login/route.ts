import { NextRequest, NextResponse } from "next/server";
import {
  getSessionToken,
  getSessionCookieOptions,
  getSessionCookieName,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";

    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return NextResponse.json(
        { error: "Admin login is not configured" },
        { status: 500 }
      );
    }

    if (password !== expected) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
    }

    const opts = getSessionCookieOptions();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(getSessionCookieName(), opts.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: opts.maxAge,
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
