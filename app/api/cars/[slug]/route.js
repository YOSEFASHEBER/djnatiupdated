import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET(req, context) {
  await connectDB();

  try {
    const { slug } = await context.params;

    const car = await Car.findOne({
      slug,
      status: "Available",
    }).lean();

    if (!car) {
      return Response.json(
        {
          success: false,
          error: "Car not found",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      data: car,
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
