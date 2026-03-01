import { readFileSync } from "fs";
import { join } from "path";

export interface Review {
  id: string;
  name: string;
  icon: string;
  text: string;
  date: string;
}

const DATA_PATH = join(process.cwd(), "data", "reviews.json");

export function getReviews(): Review[] {
  try {
    const raw = readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
