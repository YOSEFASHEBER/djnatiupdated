import Image from "next/image";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import { CarImageGallery } from "../components/CarImageGallery";

// ================= SEO =================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  await connectDB();

  const car = await Car.findOne({ slug }).lean();

  if (!car) {
    return {
      title: "Car Not Found",
      description: "The requested car does not exist.",
    };
  }

  return {
    title: `${car.brand} ${car.name} ${car.year} | Premium Cars`,
    description:
      car.description?.slice(0, 160) ||
      `Buy ${car.brand} ${car.name} at the best price.`,
    openGraph: {
      title: `${car.brand} ${car.name}`,
      description: car.description,
      images: car.images?.[0]?.url ? [car.images[0].url] : [],
    },
  };
}

// ================= PAGE =================
export default async function CarDetailPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const car = await Car.findOne({ slug }).lean();

  if (!car) return notFound();

  const relatedCars = await Car.find({
    category: car.category,
    _id: { $ne: car._id },
  })
    .limit(3)
    .lean();

  const phoneNumber = "+251912345678";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hello, I'm interested in the ${car.brand} ${car.name}`;

  return (
    <main className="min-h-screen pt-24 pb-20 bg-slate-50 md:bg-gradient-to-br md:from-white md:via-red-50 md:to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* ================= TITLE ================= */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            {car.brand} {car.name}
          </h1>

          <p className="text-slate-500 mt-2">
            {car.year} • {car.category}
          </p>
        </header>

        {/* ================= MAIN GRID (FIXED RESPONSIVE + NO WHITE SPACE BUG) ================= */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* ================= IMAGE SECTION ================= */}
          <div className="bg-white rounded-2xl shadow-lg border p-2 md:sticky md:top-24 self-start">
            <CarImageGallery
              images={car.images}
              name={`${car.brand} ${car.name}`}
            />
          </div>

          {/* ================= INFO SECTION ================= */}
          <div className="space-y-6">
            {/* PRICE */}
            <div>
              <p className="text-3xl font-extrabold text-red-600">
                {car.price?.toLocaleString()} ETB
              </p>

              <span
                className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold ${
                  car.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {car.status}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-2 text-slate-600">
                Description
              </h2>
              <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                {car.description || "No description available."}
              </p>
            </div>

            {/* DETAILS */}
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-3 text-slate-600">
                Car Details
              </h2>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-700">
                <p>
                  <b>Brand:</b> {car.brand}
                </p>
                <p>
                  <b>Model:</b> {car.name}
                </p>
                <p>
                  <b>Year:</b> {car.year}
                </p>
                <p>
                  <b>Fuel:</b> {car.fuelType}
                </p>
                <p>
                  <b>Category:</b> {car.category}
                </p>
                <p>
                  <b>Transmission:</b> {car.transmission}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4 pt-4">
              <a
                href={`tel:${phoneNumber}`}
                className="flex-1 bg-black text-white text-center py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                📞 Call
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                className="flex-1 bg-green-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ================= RELATED CARS ================= */}
        <section className="mt-14">
          <h2 className="text-xl font-bold mb-4 text-slate-600">
            Related Cars
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {relatedCars.map((c) => (
              <a
                key={c._id}
                href={`/cars/${c.slug}`}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-40">
                  <Image
                    src={c.images?.[0]?.url || "/car.jpg"}
                    alt={c.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3">
                  <p className="font-semibold text-slate-600">
                    {c.brand} {c.name}
                  </p>

                  <p className="text-red-600 font-bold">
                    {c.price?.toLocaleString()} ETB
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
