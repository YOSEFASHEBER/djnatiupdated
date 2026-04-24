import Link from "next/link";
import Image from "next/image";

export default function CarCard({ car }) {
  return (
    <Link
      href={`/cars/${car.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative h-48">
        <Image
          src={car.images?.[0]?.url}
          alt={car.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="font-bold">
          {car.brand} {car.name}
        </h3>
        <p className="text-sm text-gray-500">{car.year}</p>
        <p className="text-red-600 font-bold">${car.price}</p>
      </div>
    </Link>
  );
}
