import HeroSection from "@/components/hero/HeroSection";
import LatestCars from "@/components/ui/LatestCars";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

export const metadata = {
  title: "DJ Nati Cars | Buy Cars in Ethiopia",
  description:
    "Browse verified cars in Ethiopia with transparent pricing and trusted sellers.",
};

async function getLatestCars() {
  await connectDB();

  const cars = await Car.find({}).sort({ createdAt: -1 }).limit(6).lean();

  const availableCars = await Car.countDocuments();

  return { cars, availableCars };
}

export default async function HomePage() {
  const { cars, availableCars } = await getLatestCars();

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      <HeroSection availableCars={availableCars} />
      <LatestCars cars={cars} />
    </main>
  );
}
