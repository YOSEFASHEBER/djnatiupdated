import Image from "next/image";
import Link from "next/link";
import Car from "@/models/Car";
import { connectDB } from "@/lib/mongodb";

// ================= SEO =================
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ FIX

  await connectDB();

  const car = await Car.findOne({ slug }).lean();

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `${car.brand} ${car.name} ${car.year} | DJ Nati Cars`,
    description: car.description,
    openGraph: {
      images: car.images?.[0]?.url,
    },
  };
}

// ================= PAGE =================
export default async function CarDetailPage({ params }) {
  const { slug } = await params; // ✅ FIX HERE TOO

  await connectDB();

  const car = await Car.findOne({ slug }).lean();

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Car not found</h1>
      </div>
    );
  }

  const relatedCars = await Car.find({
    category: car.category,
    _id: { $ne: car._id },
  })
    .limit(3)
    .lean();

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black">
        {car.brand} {car.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* IMAGE */}
        <div className="relative h-96 rounded-xl overflow-hidden">
          <Image
            src={car.images?.[0]?.url}
            alt={car.name}
            fill
            className="object-cover"
          />
        </div>

        {/* INFO */}
        <div className="space-y-4">
          <p className="text-2xl font-bold text-red-600">${car.price}</p>

          <p className="text-gray-600">{car.description}</p>

          <a
            href="https://wa.me/251912345678"
            className="block bg-green-600 text-white text-center py-3 rounded-xl"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>

      {/* RELATED */}
      <section className="mt-12">
        <h2 className="font-bold text-xl mb-4">Related Cars</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {relatedCars.map((c) => (
            <Link
              key={c._id}
              href={`/cars/${c.slug}`}
              className="border rounded-xl p-3"
            >
              {c.brand} {c.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
