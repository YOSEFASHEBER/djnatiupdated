import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import slugify from "slugify";
import cloudinary from "@/lib/cloudinary";

// ================= GET CAR =================
export async function GET(req, context) {
  const params = await context.params;
  const slug = params.slug;

  await connectDB();

  try {
    const car = await Car.findOne({ slug });

    if (!car) {
      return Response.json(
        { success: false, error: "Car not found" },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// ================= UPDATE CAR =================
export async function PUT(req, context) {
  const params = await context.params;
  const slug = params.slug;

  await connectDB();

  try {
    const body = await req.json();

    const car = await Car.findOne({ slug });

    if (!car) {
      return Response.json(
        { success: false, error: "Car not found" },
        { status: 404 },
      );
    }

    // ================= VALIDATION =================
    const errors = {};

    const isEmpty = (val) => !val || val.toString().trim() === "";

    if ("name" in body && isEmpty(body.name)) {
      errors.name = "Car name is required";
    }

    if ("brand" in body && isEmpty(body.brand)) {
      errors.brand = "Brand is required";
    }

    if ("price" in body) {
      const price = Number(body.price);
      if (isNaN(price) || price <= 0) {
        errors.price = "Price must be a valid number";
      }
    }

    if ("year" in body) {
      const year = Number(body.year);
      const currentYear = new Date().getFullYear();

      if (isNaN(year) || year < 1900 || year > currentYear + 1) {
        errors.year = "Year is invalid";
      }
    }

    if (
      "status" in body &&
      !["Available", "Sold", "Reserved"].includes(body.status)
    ) {
      errors.status = "Invalid status value";
    }

    if ("images" in body) {
      if (!Array.isArray(body.images) || body.images.length === 0) {
        errors.images = "At least one image is required";
      } else {
        const invalid = body.images.some((img) => !img?.url || !img?.public_id);

        if (invalid) {
          errors.images = "Each image must have url and public_id";
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors,
        },
        { status: 400 },
      );
    }

    // ================= UPDATE FIELDS =================
    const fields = [
      "name",
      "brand",
      "year",
      "price",
      "description",
      "status",
      "fuelType",
      "transmission",
      "category",
      "images",
    ];

    fields.forEach((field) => {
      if (field in body) {
        car[field] =
          field === "price" || field === "year"
            ? Number(body[field])
            : body[field];
      }
    });

    // ================= SLUG UPDATE =================
    if (body.name || body.brand || body.year) {
      const baseSlug = slugify(`${car.brand}-${car.name}-${car.year}`, {
        lower: true,
        strict: true,
      });

      car.slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    await car.save();

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// ================= DELETE CAR =================
export async function DELETE(req, context) {
  const params = await context.params;
  const slug = params.slug;

  await connectDB();

  try {
    const car = await Car.findOne({ slug });

    if (!car) {
      return Response.json(
        { success: false, error: "Car not found" },
        { status: 404 },
      );
    }

    // delete images from cloudinary
    if (car.images?.length) {
      await Promise.all(
        car.images.map((img) => cloudinary.uploader.destroy(img.public_id)),
      );
    }

    await Car.deleteOne({ slug });

    return Response.json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
