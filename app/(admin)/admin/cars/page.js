// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Pencil, Trash2, Plus } from "lucide-react";

// function DeleteModal({ open, onClose, onConfirm, loading }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-7 w-[90%] max-w-md shadow-2xl animate-scaleIn text-slate-600">
//         <h2 className="text-xl font-semibold mb-2">Delete Car</h2>

//         <p className="text-gray-500 mb-6">This action cannot be undone.</p>

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AdminCarsPage() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedCar, setSelectedCar] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   const limit = 12;

//   const fetchCars = async () => {
//     try {
//       const res = await fetch(`/api/cars?limit=${limit}`);
//       const data = await res.json();
//       setCars(data.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const confirmDelete = async () => {
//     if (!selectedCar?.slug) return;

//     setDeleteLoading(true);

//     try {
//       await fetch(`/api/admin/cars/${selectedCar.slug}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       setCars((prev) => prev.filter((car) => car.slug !== selectedCar.slug));

//       setSelectedCar(null);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const statusStyle = {
//     Available: "bg-green-100 text-green-700",
//     Reserved: "bg-yellow-100 text-yellow-700",
//     Sold: "bg-red-100 text-red-700",
//   };

//   return (
//     <div className="space-y-10">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-slate-600">
//             Cars Inventory
//           </h1>

//           <p className="text-gray-500 text-sm">
//             Manage your dealership vehicles
//           </p>
//         </div>

//         <Link
//           href="/admin/cars/new"
//           className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl shadow hover:shadow-lg transition"
//         >
//           <Plus size={18} />
//           Add Car
//         </Link>
//       </div>

//       {/* GRID */}

//       {loading ? (
//         <p className="text-gray-500">Loading cars...</p>
//       ) : cars.length === 0 ? (
//         <p className="text-gray-500">No cars found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cars.map((car) => (
//             <article
//               key={car._id}
//               className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
//             >
//               {/* IMAGE */}
//               <div className="relative h-52 overflow-hidden">
//                 {/* <Image
//                   src={car.images?.[0]?.url || "/placeholder.png"}
//                   alt={car.name}
//                   fill
//                   className="object-cover group-hover:scale-105 transition"
//                 /> */}
//                 <Image
//                   src={car.images?.[0]?.url}
//                   alt="car"
//                   fill
//                   sizes="(max-width: 640px) 100vw,
//          (max-width: 1024px) 50vw,
//          25vw"
//                   className="object-cover rounded-xl"
//                 />

//                 <span
//                   className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${statusStyle[car.status]}`}
//                 >
//                   {car.status}
//                 </span>
//               </div>

//               {/* INFO */}

//               <div className="p-5 space-y-1">
//                 <h2 className="font-semibold text-lg text-slate-700">
//                   {car.name}
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   {car.brand} • {car.year}
//                 </p>

//                 <p className="text-xl font-bold text-gray-900 pt-1">
//                   {car.price?.toLocaleString()} ETB
//                 </p>
//               </div>

//               {/* ACTIONS */}

//               <div className="flex items-center justify-between px-5 pb-5">
//                 <Link
//                   href={`/admin/cars/${car.slug}`}
//                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
//                 >
//                   <Pencil size={16} />
//                   Edit
//                 </Link>

//                 <button
//                   onClick={() => setSelectedCar(car)}
//                   className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm"
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       <DeleteModal
//         open={!!selectedCar}
//         onClose={() => setSelectedCar(null)}
//         onConfirm={confirmDelete}
//         loading={deleteLoading}
//       />

//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         .animate-scaleIn {
//           animation: scaleIn 0.15s ease;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";

function DeleteModal({ open, onClose, onConfirm, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-7 w-[90%] max-w-md shadow-2xl animate-scaleIn text-slate-600">
        <h2 className="text-xl font-semibold mb-2">Delete Car</h2>

        <p className="text-gray-500 mb-6">This action cannot be undone.</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCar, setSelectedCar] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const limit = 12;

  const fetchCars = async () => {
    try {
      const res = await fetch(`/api/admin/cars?limit=${limit}`);
      const data = await res.json();
      setCars(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const confirmDelete = async () => {
    if (!selectedCar?.slug) return;

    setDeleteLoading(true);

    try {
      await fetch(`/api/admin/cars/${selectedCar.slug}`, {
        method: "DELETE",
        credentials: "include",
      });

      setCars((prev) => prev.filter((car) => car.slug !== selectedCar.slug));

      setSelectedCar(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const statusStyle = {
    Available: "bg-green-100 text-green-700",
    Reserved: "bg-yellow-100 text-yellow-700",
    Sold: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-600">
            Cars Inventory
          </h1>

          <p className="text-gray-500 text-sm">
            Manage your dealership vehicles
          </p>
        </div>

        <Link
          href="/admin/cars/new"
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl shadow hover:shadow-lg transition"
        >
          <Plus size={18} />
          Add Car
        </Link>
      </div>

      {/* GRID */}
      {loading ? (
        <p className="text-gray-500">Loading cars...</p>
      ) : cars.length === 0 ? (
        <p className="text-gray-500">No cars found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => {
            const mainImage = car.images?.[0]?.url;

            return (
              <article
                key={car._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={mainImage || "/placeholder.png"}
                    alt={car.name || "car"}
                    fill
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           25vw"
                    className="object-cover group-hover:scale-105 transition"
                  />

                  <span
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${
                      statusStyle[car.status]
                    }`}
                  >
                    {car.status}
                  </span>
                </div>

                {/* INFO */}
                <div className="p-5 space-y-1">
                  <h2 className="font-semibold text-lg text-slate-700">
                    {car.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {car.brand} • {car.year}
                  </p>

                  <p className="text-xl font-bold text-gray-900 pt-1">
                    {car.price?.toLocaleString()} ETB
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between px-5 pb-5">
                  <Link
                    href={`/admin/cars/${car.slug}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => setSelectedCar(car)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      <DeleteModal
        open={!!selectedCar}
        onClose={() => setSelectedCar(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.15s ease;
        }
      `}</style>
    </div>
  );
}
