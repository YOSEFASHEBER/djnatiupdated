export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { uploadBufferToCloudinary } from "@/lib/uploadToCloudinary";

const MAX_FILES = 10;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files?.length) {
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 },
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { success: false, message: "Max 10 images allowed" },
        { status: 400 },
      );
    }

    // upload all in parallel (FASTER ⚡)
    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await uploadBufferToCloudinary(buffer, "dj-nati-cars");

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      images: uploadedImages,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
