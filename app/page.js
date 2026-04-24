import Hero from "@/components/ui/Hero";
import LatestCars from "@/components/ui/LatestCars";
import StatsSection from "@/components/ui/StatsSection";

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/cars?limit=6&page=1`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      <Hero />

      <StatsSection availableCars={data.stats?.available || 0} />

      <LatestCars cars={data.data || []} />
    </main>
  );
}
