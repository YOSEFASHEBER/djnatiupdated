import HeroSection from "@/components/hero/HeroSection";
import LatestCars from "@/components/ui/LatestCars";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

export const revalidate = 60;

export const metadata = {
  title: "DJ Nati Cars | Buy Cars in Ethiopia",
  description:
    "Browse verified cars in Ethiopia with transparent pricing and trusted sellers.",
};

// ================= SAFE DATA FETCH =================
async function getLatestCars() {
  try {
    await connectDB();

    const cars = await Car.find(
      {},
      {
        name: 1,
        brand: 1,
        price: 1,
        images: 1,
        slug: 1,
        year: 1,
        status: 1,
      },
    )
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    const availableCars = await Car.countDocuments();

    return {
      cars,
      availableCars,
      error: null,
    };
  } catch (error) {
    console.error("❌ DB Error in getLatestCars:", error);

    return {
      cars: [],
      availableCars: 0,
      error: "Failed to load cars. Please try again later.",
    };
  }
}

// ================= PAGE =================
export default async function HomePage() {
  const { cars, availableCars, error } = await getLatestCars();

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      {/* ================= HERO ================= */}
      <HeroSection availableCars={availableCars} />

      {/* ================= ERROR STATE (SAFE UI) ================= */}
      {error ? (
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            <h2 className="font-semibold text-lg">Something went wrong</h2>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      ) : (
        <LatestCars cars={cars} />
      )}
    </main>
  );
}
