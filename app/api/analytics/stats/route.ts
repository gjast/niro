import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, getSessionCookieName } from "@/lib/admin-auth";
import { getVisits, getStats, formatMsk } from "@/lib/analytics";

const MAX_TABLE_ROWS = 200;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    if (!verifySessionToken(token)) {
      return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 });
    }

    const visits = getVisits();
    const { day, week, month } = getStats(visits);

    const table = visits
      .slice()
      .reverse()
      .slice(0, MAX_TABLE_ROWS)
      .map((v) => ({
        id: v.id,
        country: v.country,
        timeMsk: formatMsk(v.timestamp),
        referrer: v.referrer || "Прямой заход",
      }));

    return NextResponse.json({
      day,
      week,
      month,
      table,
    });
  } catch {
    return NextResponse.json({ error: "Ошибка загрузки" }, { status: 500 });
  }
}
