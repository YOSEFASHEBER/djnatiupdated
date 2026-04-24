import CarsClient from "@/components/cars/CarClient";

export default async function CarsPage({ searchParams }) {
  // ✅ SAFE CONVERSION
  const params = new URLSearchParams();

  for (const key in searchParams) {
    const value = searchParams[key];

    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }

  const query = params.toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars?${query}`,
    { cache: "no-store" },
  );

  const data = await res.json();

  return <CarsClient initialData={data} />;
}
