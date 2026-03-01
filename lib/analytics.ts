import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

export interface Visit {
  id: string;
  timestamp: string; // ISO UTC
  ip: string;
  country: string;
  referrer: string;
  userAgent: string;
}

const DATA_PATH = join(process.cwd(), "data", "analytics.json");
const DATA_DIR = join(process.cwd(), "data");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function getVisits(): Visit[] {
  try {
    ensureDataDir();
    if (!existsSync(DATA_PATH)) return [];
    const raw = readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function addVisit(visit: Omit<Visit, "id">): Visit | null {
  try {
    ensureDataDir();
    const visits = getVisits();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const newVisit: Visit = { ...visit, id };
    visits.push(newVisit);
    writeFileSync(DATA_PATH, JSON.stringify(visits, null, 2), "utf-8");
    return newVisit;
  } catch (err) {
    console.error("[analytics] addVisit write failed:", err);
    return null;
  }
}

export function formatMsk(timestamp: string): string {
  const d = new Date(timestamp);
  return d.toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function getStats(visits: Visit[]) {
  const now = new Date();
  // MSK = UTC+3, midnight MSK = 21:00 UTC предыдущего дня
  const mskOffset = 3 * 60 * 60 * 1000;
  const dayStart = new Date(
    Math.floor((now.getTime() + mskOffset) / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000) - mskOffset
  );
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const day = visits.filter((v) => new Date(v.timestamp) >= dayStart).length;
  const week = visits.filter((v) => new Date(v.timestamp) >= weekStart).length;
  const month = visits.filter((v) => new Date(v.timestamp) >= monthStart).length;

  return { day, week, month };
}
