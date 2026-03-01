import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

const DATA_PATH = join(process.cwd(), "data", "reviews.json");

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const raw = readFileSync(DATA_PATH, "utf-8");
    const reviews = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    const filtered = reviews.filter((r: { id: string }) => r.id !== id);
    if (filtered.length === reviews.length) {
      return NextResponse.json({ error: "Отзыв не найден" }, { status: 404 });
    }
    writeFileSync(DATA_PATH, JSON.stringify(filtered, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/reviews/[id]:", err);
    return NextResponse.json(
      { error: "Ошибка при удалении" },
      { status: 500 }
    );
  }
}
