import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/upload
// Returns a list of all image paths currently in public/assets/cars/
// Useful for the admin to pick images that were pushed via Git.
// ─────────────────────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const assetsDir = path.join(process.cwd(), "public", "assets", "cars");

    if (!fs.existsSync(assetsDir)) {
      return NextResponse.json({ images: [] });
    }

    const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

    const files = fs
      .readdirSync(assetsDir)
      .filter((file) =>
        ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()),
      )
      .map((file) => `/assets/cars/${file}`); // public-relative path

    return NextResponse.json({ images: files });
  } catch (error) {
    console.error("Failed to read assets directory:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
