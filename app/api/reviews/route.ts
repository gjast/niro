import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const DATA_PATH = join(process.cwd(), "data", "reviews.json");
const UPLOAD_DIR = join(process.cwd(), "public", "imgs", "reviews");

export async function GET() {
  try {
    const raw = readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const text = String(formData.get("text") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();
    const iconUrl = String(formData.get("icon") ?? "").trim();

    if (!name || !text || !date) {
      return NextResponse.json(
        { error: "Заполните имя, текст и дату" },
        { status: 400 }
      );
    }

    let icon = iconUrl;

    const file = formData.get("iconFile") as File | null;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = file.name.split(".").pop() || "png";
      const filename = `${randomUUID()}.${ext}`;

      if (!existsSync(UPLOAD_DIR)) {
        mkdirSync(UPLOAD_DIR, { recursive: true });
      }
      const filePath = join(UPLOAD_DIR, filename);
      writeFileSync(filePath, buffer);
      icon = `/imgs/reviews/${filename}`;
    } else if (!icon) {
      icon = "/imgs/hero.png";
    }

    const raw = readFileSync(DATA_PATH, "utf-8");
    const reviews = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    const review = {
      id: randomUUID(),
      name,
      icon,
      text,
      date,
    };
    reviews.push(review);
    writeFileSync(DATA_PATH, JSON.stringify(reviews, null, 2), "utf-8");

    return NextResponse.json(review);
  } catch (err) {
    console.error("POST /api/reviews:", err);
    return NextResponse.json(
      { error: "Ошибка при сохранении отзыва" },
      { status: 500 }
    );
  }
}
