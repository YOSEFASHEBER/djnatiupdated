import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import slugify from "slugify";
import cloudinary from "@/lib/cloudinary";

// ✅ Allowed enum
const STATUS_ENUM = ["Available", "Sold", "Reserved"];

// ✅ Basic sanitize
const sanitize = (value) => {
  if (typeof value !== "string") return value;
  return value.trim();
};

// ================= GET CAR BY ID =================
export async function GET(req, context) {
  await connectDB();

  try {
    const { id } = await context.params;

    const car = await Car.findById(id);

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
// ================= UPDATE CAR =================
export async function PUT(req, context) {
  await connectDB();

  try {
    const { id } = await context.params;
    const body = await req.json();

    const car = await Car.findById(id);

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    // ================= UPDATE FIELDS =================

    if (body.name) car.name = sanitize(body.name);
    if (body.brand) car.brand = sanitize(body.brand);
    if (body.year) car.year = Number(body.year);
    if (body.price) car.price = Number(body.price);
    if (body.fuelType) car.fuelType = sanitize(body.fuelType);
    if (body.description !== undefined)
      car.description = sanitize(body.description);

    if (body.status) {
      if (!STATUS_ENUM.includes(body.status)) {
        return Response.json(
          { error: "Invalid status value" },
          { status: 400 },
        );
      }
      car.status = body.status;
    }

    // ================= IMAGE VALIDATION =================

    if (body.images) {
      if (!Array.isArray(body.images) || body.images.length === 0) {
        return Response.json(
          { error: "At least one image is required" },
          { status: 400 },
        );
      }

      const validImages = body.images.every(
        (img) => img?.url && img?.public_id,
      );

      if (!validImages) {
        return Response.json(
          { error: "Invalid image format" },
          { status: 400 },
        );
      }

      car.images = body.images;
    }

    // ================= SLUG UPDATE =================

    if (body.name || body.brand || body.year) {
      const baseSlug = slugify(`${car.brand} ${car.name} ${car.year}`, {
        lower: true,
        strict: true,
      });

      const uniqueId = Date.now().toString().slice(-5);

      car.slug = `${baseSlug}-${uniqueId}`;
    }

    await car.save();

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ================= DELETE CAR =================
export async function DELETE(req, context) {
  await connectDB();

  try {
    const { id } = await context.params;
    const car = await Car.findById(id);

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    // 🔥 Delete images from Cloudinary
    if (car.images?.length) {
      const deletePromises = car.images.map((img) =>
        cloudinary.uploader.destroy(img.public_id),
      );

      await Promise.all(deletePromises);
    }

    await Car.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: error.message }, { status: 500 });
  }
}
