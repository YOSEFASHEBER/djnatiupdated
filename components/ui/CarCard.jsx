// import Link from "next/link";
// import Image from "next/image";
// import { BadgeCheck } from "lucide-react";

// export default function CarCard({ car }) {
//   return (
//     <Link
//       href={`/cars/${car.slug}`}
//       className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition block"
//     >
//       {/* Image */}
//       <div className="relative h-48 sm:h-52 overflow-hidden">
//         <Image
//           src={car?.images?.[0]?.url}
//           alt={car?.name}
//           fill
//           className="object-cover"
//         />

//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//         {/* Name + Status */}
//         <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
//           <h2 className="text-white text-lg font-bold truncate">{car?.name}</h2>

//           <span
//             className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
//               car?.status === "Available"
//                 ? "bg-green-500 text-white"
//                 : car?.status === "Reserved"
//                   ? "bg-gray-500 text-white"
//                   : "bg-red-500 text-white"
//             }`}
//           >
//             <BadgeCheck className="w-3 h-3" />
//             {car?.status}
//           </span>
//         </div>
//       </div>

//       {/* Info */}
//       <div className="p-4 flex flex-col gap-3">
//         <p className="text-red-500 text-xl font-extrabold">
//           {car?.price
//             ? `${car.price.toLocaleString()} ETB`
//             : "Price not available"}
//         </p>

//         {/* Button style but NOT a Link */}
//         <div className="w-full text-center py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition">
//           View Details
//         </div>
//       </div>
//     </Link>
//   );
// }
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export default function CarCard({ car }) {
  const imageUrl = car?.images?.[0]?.url || "/placeholder.png";
  const carName = car?.name || "Unknown Car";
  const carSlug = car?.slug || "#";

  const price =
    typeof car?.price === "number"
      ? car.price.toLocaleString()
      : car?.price
        ? Number(car.price).toLocaleString()
        : null;

  return (
    <Link
      href={`/cars/${carSlug}`}
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition block"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image src={imageUrl} alt={carName} fill className="object-cover" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Name + Status */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <h2 className="text-white text-lg font-bold truncate">{carName}</h2>

          <span
            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
              car?.status === "Available"
                ? "bg-green-500 text-white"
                : car?.status === "Reserved"
                  ? "bg-gray-500 text-white"
                  : "bg-red-500 text-white"
            }`}
          >
            <BadgeCheck className="w-3 h-3" />
            {car?.status || "Unknown"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        <p className="text-red-500 text-xl font-extrabold">
          {price ? `${price} ETB` : "Price not available"}
        </p>

        {/* Button style but NOT a Link */}
        <div className="w-full text-center py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition">
          View Details
        </div>
      </div>
    </Link>
  );
}
