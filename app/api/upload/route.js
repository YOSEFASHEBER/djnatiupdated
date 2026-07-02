export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const assetsDir = path.join(process.cwd(), "public", "assets", "cars");

    if (!fs.existsSync(assetsDir)) {
      return NextResponse.json({ success: true, images: [] });
    }

    const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

    const images = fs
      .readdirSync(assetsDir)
      .filter((file) =>
        ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()),
      )
      .map((file) => `/assets/cars/${file}`);

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Failed to read assets directory:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
