// import { connectDB } from "@/lib/mongodb";
// import Car from "@/models/Car";
// import CarsClient from "./components/CarsClient";

// // ✅ FIX 1: Force dynamic rendering (IMPORTANT)
// export const dynamic = "force-dynamic";

// export default async function CarsPage({ searchParams }) {
//   try {
//     // ❌ FIX 2: REMOVE await (CRITICAL)
//     const params = searchParams;

//     const page = Number(params?.page) || 1;
//     const limit = 12;

//     const query = {};

//     if (params?.search) {
//       query.$or = [
//         { name: { $regex: params.search, $options: "i" } },
//         { brand: { $regex: params.search, $options: "i" } },
//       ];
//     }

//     if (params?.category) {
//       query.category = params.category;
//     }

//     if (params?.brand) {
//       query.brand = params.brand;
//     }

//     if (params?.fuelType) {
//       query.fuelType = params.fuelType;
//     }

//     if (params?.minPrice || params?.maxPrice) {
//       query.price = {};
//       if (params.minPrice) query.price.$gte = Number(params.minPrice);
//       if (params.maxPrice) query.price.$lte = Number(params.maxPrice);
//     }

//     await connectDB();

//     const [cars, total] = await Promise.all([
//       Car.find(query)
//         .sort({ createdAt: -1 })
//         .skip((page - 1) * limit)
//         .limit(limit)
//         .lean(),

//       Car.countDocuments(query),
//     ]);

//     const totalPages = Math.ceil(total / limit);

//     return (
//       <CarsClient
//         initialData={{
//           data: JSON.parse(JSON.stringify(cars)),
//           pagination: { totalPages },
//           error: null,
//         }}
//       />
//     );
//   } catch (error) {
//     console.error("❌ CarsPage Error:", error);

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center p-6 bg-red-50 border border-red-200 rounded-xl max-w-md">
//           <h2 className="text-xl font-bold text-red-600">
//             Failed to load cars
//           </h2>

//           <p className="text-sm text-red-500 mt-2">
//             Please check your internet connection or try again later.
//           </p>

//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import CarsClient from "./components/CarsClient";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function CarsPage({ searchParams }) {
  try {
    // ✅ FIX: await searchParams (Next.js 15+ fix)
    const params = await searchParams;

    const page = Number(params?.page) || 1;
    const limit = 12;

    const query = {};

    if (params?.search) {
      query.$or = [
        { name: { $regex: params.search, $options: "i" } },
        { brand: { $regex: params.search, $options: "i" } },
      ];
    }

    if (params?.category) query.category = params.category;
    if (params?.brand) query.brand = params.brand;
    if (params?.fuelType) query.fuelType = params.fuelType;

    if (params?.minPrice || params?.maxPrice) {
      query.price = {};
      if (params.minPrice) query.price.$gte = Number(params.minPrice);
      if (params.maxPrice) query.price.$lte = Number(params.maxPrice);
    }

    await connectDB();

    const [cars, total] = await Promise.all([
      Car.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Car.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return (
      <CarsClient
        initialData={{
          data: JSON.parse(JSON.stringify(cars)),
          pagination: { totalPages, page },
          error: null,
        }}
      />
    );
  } catch (error) {
    console.error("❌ CarsPage Error:", error);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-xl max-w-md">
          <h2 className="text-xl font-bold text-red-600">
            Failed to load cars
          </h2>

          <p className="text-sm text-red-500 mt-2">Please try again later.</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}
