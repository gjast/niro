import { NextRequest, NextResponse } from "next/server";
import { addVisit } from "@/lib/analytics";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}

async function getCountryFromIp(ip: string): Promise<string> {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return "Локально";
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country&lang=ru`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await res.json();
    return (data?.country as string) ?? "Неизвестно";
  } catch {
    return "Неизвестно";
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    let referrer = "";
    try {
      const body = await request.json();
      if (body && typeof body.referrer === "string") referrer = body.referrer;
    } catch {
      // body пустой или не JSON — берём из заголовка
    }
    if (!referrer) {
      referrer = request.headers.get("referer") ?? request.headers.get("referrer") ?? "";
    }
    const userAgent = request.headers.get("user-agent") ?? "";
    const country = await getCountryFromIp(ip);

    addVisit({
      timestamp: new Date().toISOString(),
      ip,
      country,
      referrer: referrer || "Прямой заход",
      userAgent,
    });
  } catch (err) {
    // На сервере может не быть записи в data/ или ip-api недоступен — не отдаём 500 клиенту
    console.error("[analytics/track]", err);
  }
  return new NextResponse(null, { status: 204 });
}
