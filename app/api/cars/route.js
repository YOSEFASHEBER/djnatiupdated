import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // ================= PAGINATION =================
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // ================= FILTERS =================
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");
    const brand = searchParams.get("brand");
    const fuelType = searchParams.get("fuelType");

    // 🔥 IMPORTANT: only public cars
    let query = {
      status: "Available",
    };

    // ================= FILTER BUILDING =================
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (fuelType) query.fuelType = fuelType;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // ================= DATA =================
    const [cars, filteredTotal, totalCars, available, sold, reserved] =
      await Promise.all([
        Car.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

        Car.countDocuments(query),

        Car.countDocuments(),

        Car.countDocuments({ status: "Available" }),
        Car.countDocuments({ status: "Sold" }),
        Car.countDocuments({ status: "Reserved" }),
      ]);

    // ================= RESPONSE =================
    return Response.json({
      success: true,

      data: cars,

      stats: {
        total: totalCars,
        filteredTotal,
        available,
        sold,
        reserved,
      },

      pagination: {
        page,
        limit,
        total: filteredTotal,
        totalPages: Math.ceil(filteredTotal / limit),
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
