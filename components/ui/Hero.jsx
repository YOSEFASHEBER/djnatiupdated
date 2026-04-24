import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-[80px]">
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dznmeumqb/image/upload/v1776802919/dj-nati-cars/bmrikyoquk5eebycuoio.png"
          alt="Cars hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 flex items-center min-h-[calc(100svh-80px)]">
        <div className="max-w-2xl space-y-6">
          <span className="text-red-400 font-semibold text-sm">
            Reliable Cars in Ethiopia
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white">
            Find Your Next <span className="text-red-500">Car</span>
          </h1>

          <p className="text-gray-200">
            Browse verified cars with transparent pricing.
          </p>

          <div className="flex gap-4">
            <Link
              href="/cars"
              className="bg-red-600 px-6 py-3 rounded-xl text-white font-bold"
            >
              Browse Cars
            </Link>

            <Link
              href="/contact"
              className="bg-white px-6 py-3 rounded-xl font-bold"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
