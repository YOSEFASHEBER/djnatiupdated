import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import slugify from "slugify";
import cloudinary from "@/lib/cloudinary";

// ================= GET CAR =================
export async function GET(req, context) {
  const params = await context.params; // ✅ FIX

  console.log("📦 Params:", params);
  console.log("🔍 Slug:", params.slug);

  await connectDB();
  console.log("✅ DB Connected");

  try {
    console.log("🔍 Searching car with slug:", params.slug);

    const car = await Car.findOne({ slug: params?.slug });

    console.log("📄 DB RESULT:", car ? "FOUND" : "NOT FOUND");

    if (!car) {
      console.log("❌ Car not found in DB");
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    console.log("✅ Car found:", car.name);

    return Response.json({ success: true, data: car });
  } catch (error) {
    console.log("💥 GET ERROR:", error.message);

    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ================= UPDATE CAR =================
export async function PUT(req, context) {
  const params = await context.params;
  console.log("✏️ [PUT] UPDATE HIT");
  console.log("📦 Slug:", params.slug);

  await connectDB();

  try {
    const body = await req.json();
    console.log("📥 BODY RECEIVED:", body);

    const car = await Car.findOne({ slug: params.slug });

    console.log("🔍 CAR FOUND:", !!car);

    if (!car) {
      console.log("❌ Car not found for update");
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    // update fields
    if (body.name) car.name = body.name;
    if (body.brand) car.brand = body.brand;
    if (body.year) car.year = Number(body.year);
    if (body.price) car.price = Number(body.price);
    if (body.description) car.description = body.description;
    if (body.status) car.status = body.status;
    if (body.images) car.images = body.images;

    console.log("🛠️ Updated fields applied");

    // regenerate slug
    if (body.name || body.brand || body.year) {
      const baseSlug = slugify(`${car.brand}-${car.name}-${car.year}`, {
        lower: true,
        strict: true,
      });

      car.slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

      console.log("🔗 NEW SLUG GENERATED:", car.slug);
    }

    await car.save();

    console.log("💾 Car saved successfully");

    return Response.json({ success: true, data: car });
  } catch (error) {
    console.log("💥 UPDATE ERROR:", error.message);

    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ================= DELETE CAR =================
export async function DELETE(req, context) {
  const params = await context.params;
  console.log("🗑️ [DELETE] HIT");
  console.log("📦 Slug:", params.slug);

  await connectDB();

  try {
    const car = await Car.findOne({ slug: params.slug });

    console.log("🔍 CAR FOUND:", !!car);

    if (!car) {
      console.log("❌ Car not found for delete");
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    // delete cloudinary images
    if (car.images?.length) {
      console.log("☁️ Deleting images from Cloudinary...");

      await Promise.all(
        car.images.map((img) => {
          console.log("🗑️ Deleting:", img.public_id);
          return cloudinary.uploader.destroy(img.public_id);
        }),
      );
    }

    await Car.deleteOne({ slug: params.slug });

    console.log("✅ Car deleted from DB");

    return Response.json({ success: true });
  } catch (error) {
    console.log("💥 DELETE ERROR:", error.message);

    return Response.json({ error: error.message }, { status: 500 });
  }
}
