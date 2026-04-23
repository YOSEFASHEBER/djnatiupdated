import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import slugify from "slugify";

const STATUS_ENUM = ["Available", "Sold", "Reserved"];

const sanitize = (v) => (typeof v === "string" ? v.trim() : v);

// ================= GET ALL CARS (ADMIN) =================
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const [cars, total, available, sold, reserved] = await Promise.all([
      Car.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

      Car.countDocuments(),
      Car.countDocuments({ status: "Available" }),
      Car.countDocuments({ status: "Sold" }),
      Car.countDocuments({ status: "Reserved" }),
    ]);

    return Response.json({
      success: true,
      data: cars,
      stats: {
        total,
        available,
        sold,
        reserved,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return Response.json(
      { success: false, error: "Failed to fetch cars" },
      { status: 500 },
    );
  }
}

// ================= CREATE CAR (ADMIN) =================
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newCar = {
      name: sanitize(body.name),
      brand: sanitize(body.brand),
      category: sanitize(body.category),
      price: Number(body.price),
      year: Number(body.year),
      fuelType: sanitize(body.fuelType),
      transmission: sanitize(body.transmission),
      mileage: body.mileage ? Number(body.mileage) : undefined,
      description: body.description ? sanitize(body.description) : "",
      status: sanitize(body.status || "Available"),
      images: Array.isArray(body.images) ? body.images : [],
    };

    // ================= VALIDATION =================
    const requiredFields = [
      "name",
      "brand",
      "category",
      "price",
      "year",
      "fuelType",
      "transmission",
    ];

    for (const field of requiredFields) {
      if (!newCar[field]) {
        return Response.json(
          { success: false, error: `${field} is required` },
          { status: 400 },
        );
      }
    }

    if (isNaN(newCar.price)) {
      return Response.json(
        { success: false, error: "Valid price required" },
        { status: 400 },
      );
    }

    if (isNaN(newCar.year)) {
      return Response.json(
        { success: false, error: "Valid year required" },
        { status: 400 },
      );
    }

    if (!STATUS_ENUM.includes(newCar.status)) {
      return Response.json(
        { success: false, error: "Invalid status" },
        { status: 400 },
      );
    }

    const isValidImages =
      Array.isArray(newCar.images) &&
      newCar.images.length > 0 &&
      newCar.images.every((img) => img?.url && img?.public_id);

    if (!isValidImages) {
      return Response.json(
        {
          success: false,
          error: "Images must include url and public_id",
        },
        { status: 400 },
      );
    }

    // ================= SLUG GENERATION =================
    const baseSlug = slugify(`${newCar.brand} ${newCar.name} ${newCar.year}`, {
      lower: true,
      strict: true,
    });

    const uniqueId = Date.now().toString().slice(-5);
    newCar.slug = `${baseSlug}-${uniqueId}`;

    // ================= CREATE CAR =================
    const car = await Car.create(newCar);

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("POST /admin/cars error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to create car",
      },
      { status: 500 },
    );
  }
}
