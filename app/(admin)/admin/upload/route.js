import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY EXISTS:", !!process.env.CLOUDINARY_API_KEY);
console.log("SECRET EXISTS:", !!process.env.CLOUDINARY_API_SECRET);

const MAX_FILES = 10;

export async function POST(req) {
  console.log("🚀 [STEP 1] Upload API HIT");

  try {
    // ================= STEP 2 =================
    const formData = await req.formData();
    console.log("📦 [STEP 2] FormData received");

    const files = formData.getAll("files");
    console.log("📁 [STEP 3] Files received:", files.length);

    // ================= CHECK 1 =================
    if (!files || files.length === 0) {
      console.log("❌ ERROR: No files found in request");
      return NextResponse.json(
        { error: "No files uploaded (STEP 3 FAILED)" },
        { status: 400 },
      );
    }

    // ================= CHECK 2 =================
    if (files.length > MAX_FILES) {
      console.log("❌ ERROR: Too many files");
      return NextResponse.json(
        { error: "Max 10 images allowed" },
        { status: 400 },
      );
    }

    const uploadedUrls = [];

    // ================= STEP 4 =================
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      console.log(`🖼️ [STEP 4.${i}] Processing file:`, file.name);

      try {
        // ================= STEP 5 =================
        const buffer = Buffer.from(await file.arrayBuffer());
        console.log(`⚙️ [STEP 5.${i}] Buffer created, size:`, buffer.length);

        // ================= STEP 6 =================
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "dj-nati-cars" },
            (err, res) => {
              if (err) {
                console.log(`❌ Cloudinary ERROR at file ${i}:`, err);
                reject(err);
              } else {
                console.log(`✅ Cloudinary SUCCESS for file ${i}`);
                resolve(res);
              }
            },
          );

          stream.end(buffer);
        });

        // ================= STEP 7 =================
        if (!result?.secure_url) {
          console.log(`❌ STEP 7 FAILED: No secure_url`);
          throw new Error("Cloudinary returned empty result");
        }

        // uploadedUrls.push(result.secure_url);
        uploadedUrls.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
        console.log(`✅ [STEP 7.${i}] URL added`);
      } catch (fileError) {
        console.log(`❌ FILE ${i} FAILED:`, fileError.message);
        return NextResponse.json(
          {
            error: `Upload failed at file ${i}: ${fileError.message}`,
          },
          { status: 500 },
        );
      }
    }

    // ================= FINAL STEP =================
    console.log("🎉 ALL FILES UPLOADED SUCCESSFULLY");

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
    });
  } catch (error) {
    console.log("💥 GLOBAL ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
