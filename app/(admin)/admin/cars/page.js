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

//   const [error, setError] = useState("");
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   const limit = 12;

//   // ================= SAFE FETCH =================
//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`/api/admin/cars?limit=${limit}`);

//       if (!res.ok) {
//         throw new Error("Failed to fetch cars");
//       }

//       const data = await res.json();

//       if (!data?.success) {
//         throw new Error(data?.message || "API error");
//       }

//       setCars(data.data || []);
//     } catch (err) {
//       console.error("Fetch cars error:", err);
//       setError("Failed to load cars. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // ================= SAFE DELETE =================
//   const confirmDelete = async () => {
//     if (!selectedCar?.slug) return;

//     try {
//       setDeleteLoading(true);
//       setError("");

//       const res = await fetch(`/api/admin/cars/${selectedCar.slug}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         throw new Error("Delete failed");
//       }

//       const data = await res.json();

//       if (!data?.success) {
//         throw new Error(data?.message || "Delete error");
//       }

//       setCars((prev) => prev.filter((car) => car.slug !== selectedCar.slug));

//       setSelectedCar(null);
//     } catch (err) {
//       console.error("Delete error:", err);
//       setError("Failed to delete car. Try again.");
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

//       {/* ================= ERROR UI ================= */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
//           <div className="flex items-center justify-between">
//             <p>{error}</p>

//             <button onClick={fetchCars} className="text-sm underline">
//               Retry
//             </button>
//           </div>
//         </div>
//       )}

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
//               <div className="relative h-52 overflow-hidden">
//                 <Image
//                   src={car.images?.[0]?.url || "/placeholder.png"}
//                   alt={car.name || "car"}
//                   fill
//                   className="object-cover group-hover:scale-105 transition"
//                 />

//                 <span
//                   className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${
//                     statusStyle[car.status]
//                   }`}
//                 >
//                   {car.status}
//                 </span>
//               </div>

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

//               <div className="flex items-center justify-between px-5 pb-5">
//                 <Link
//                   href={`/admin/cars/${car.slug}`}
//                   className="flex items-center gap-2 text-blue-600 text-sm"
//                 >
//                   <Pencil size={16} />
//                   Edit
//                 </Link>

//                 <button
//                   onClick={() => setSelectedCar(car)}
//                   className="flex items-center gap-2 text-red-600 text-sm"
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       {/* MODAL */}
//       <DeleteModal
//         open={!!selectedCar}
//         onClose={() => setSelectedCar(null)}
//         onConfirm={confirmDelete}
//         loading={deleteLoading}
//       />

//       {/* ANIMATION */}
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

//   const [error, setError] = useState("");
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   const limit = 12;

//   // ================= SAFE FETCH (IMPROVED) =================
//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`/api/admin/cars?limit=${limit}`);

//       if (!res.ok) {
//         throw new Error(`Failed to fetch cars (${res.status})`);
//       }

//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         throw new Error("Invalid server response");
//       }

//       if (!data?.success) {
//         throw new Error(data?.message || "API returned error");
//       }

//       if (!Array.isArray(data.data)) {
//         throw new Error("Invalid cars data format");
//       }

//       setCars(data.data);
//     } catch (err) {
//       console.error("Fetch cars error:", err);
//       setError(err.message || "Failed to load cars. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // ================= SAFE DELETE (IMPROVED) =================
//   const confirmDelete = async () => {
//     if (!selectedCar?.slug) return;

//     const backupCars = [...cars]; // rollback safety

//     try {
//       setDeleteLoading(true);
//       setError("");

//       // optimistic UI update
//       setCars((prev) => prev.filter((car) => car.slug !== selectedCar.slug));

//       const res = await fetch(`/api/admin/cars/${selectedCar.slug}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         throw new Error(`Delete failed (${res.status})`);
//       }

//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         throw new Error("Invalid delete response");
//       }

//       if (!data?.success) {
//         throw new Error(data?.message || "Delete failed");
//       }

//       setSelectedCar(null);
//     } catch (err) {
//       console.error("Delete error:", err);

//       // rollback
//       setCars(backupCars);

//       setError(err.message || "Failed to delete car. Try again.");
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

//       {/* ERROR UI (UNCHANGED) */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
//           <div className="flex items-center justify-between">
//             <p>{error}</p>

//             <button onClick={fetchCars} className="text-sm underline">
//               Retry
//             </button>
//           </div>
//         </div>
//       )}

//       {/* GRID */}
//       {loading ? (
//         <p className="text-gray-500">Loading cars...</p>
//       ) : cars.length === 0 ? (
//         <p className="text-gray-500">No cars found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cars.map((car) => (
//             <article
//               key={car?._id || car?.slug}
//               className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
//             >
//               <div className="relative h-52 overflow-hidden">
//                 <Image
//                   src={car?.images?.[0]?.url || "/placeholder.png"}
//                   alt={car?.name || "car"}
//                   fill
//                   className="object-cover group-hover:scale-105 transition"
//                 />

//                 <span
//                   className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${
//                     statusStyle[car?.status] || "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   {car?.status || "Unknown"}
//                 </span>
//               </div>

//               <div className="p-5 space-y-1">
//                 <h2 className="font-semibold text-lg text-slate-700">
//                   {car?.name || "Unnamed"}
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   {car?.brand || "Unknown"} • {car?.year || "-"}
//                 </p>

//                 <p className="text-xl font-bold text-gray-900 pt-1">
//                   {car?.price ? Number(car.price).toLocaleString() : "0"} ETB
//                 </p>
//               </div>

//               <div className="flex items-center justify-between px-5 pb-5">
//                 <Link
//                   href={`/admin/cars/${car?.slug}`}
//                   className="flex items-center gap-2 text-blue-600 text-sm"
//                 >
//                   <Pencil size={16} />
//                   Edit
//                 </Link>

//                 <button
//                   onClick={() => setSelectedCar(car)}
//                   className="flex items-center gap-2 text-red-600 text-sm"
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       {/* MODAL */}
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

//   const [error, setError] = useState("");
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const limit = 12;

//   // ================= SAFE FETCH =================
//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`/api/admin/cars?page=${page}&limit=${limit}`);

//       if (!res.ok) {
//         throw new Error(`Failed to fetch cars (${res.status})`);
//       }

//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         throw new Error("Invalid server response");
//       }

//       if (!data?.success) {
//         throw new Error(data?.message || "API returned error");
//       }

//       if (!Array.isArray(data.data)) {
//         throw new Error("Invalid cars data format");
//       }

//       setCars(data.data);
//       setTotalPages(data?.pagination?.totalPages || 1);
//     } catch (err) {
//       console.error("Fetch cars error:", err);
//       setError(err.message || "Failed to load cars. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, [page]);

//   // ================= SAFE DELETE =================
//   const confirmDelete = async () => {
//     if (!selectedCar?.slug) return;

//     const backupCars = [...cars];

//     try {
//       setDeleteLoading(true);
//       setError("");

//       setCars((prev) => prev.filter((car) => car.slug !== selectedCar.slug));

//       const res = await fetch(`/api/admin/cars/${selectedCar.slug}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         throw new Error(`Delete failed (${res.status})`);
//       }

//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         throw new Error("Invalid delete response");
//       }

//       if (!data?.success) {
//         throw new Error(data?.message || "Delete failed");
//       }

//       setSelectedCar(null);
//     } catch (err) {
//       console.error("Delete error:", err);

//       setCars(backupCars);

//       setError(err.message || "Failed to delete car. Try again.");
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

//       {/* ERROR */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
//           <div className="flex items-center justify-between">
//             <p>{error}</p>

//             <button onClick={fetchCars} className="text-sm underline">
//               Retry
//             </button>
//           </div>
//         </div>
//       )}

//       {/* GRID */}
//       {loading ? (
//         <p className="text-gray-500">Loading cars...</p>
//       ) : cars.length === 0 ? (
//         <p className="text-gray-500">No cars found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cars.map((car) => (
//             <article
//               key={car?._id || car?.slug}
//               className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
//             >
//               <div className="relative h-52 overflow-hidden">
//                 <Image
//                   src={car?.images?.[0]?.url || "/placeholder.png"}
//                   alt={car?.name || "car"}
//                   fill
//                   className="object-cover group-hover:scale-105 transition"
//                 />

//                 <span
//                   className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${
//                     statusStyle[car?.status] || "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   {car?.status || "Unknown"}
//                 </span>
//               </div>

//               <div className="p-5 space-y-1">
//                 <h2 className="font-semibold text-lg text-slate-700">
//                   {car?.name || "Unnamed"}
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   {car?.brand || "Unknown"} • {car?.year || "-"}
//                 </p>

//                 <p className="text-xl font-bold text-gray-900 pt-1">
//                   {car?.price ? Number(car.price).toLocaleString() : "0"} ETB
//                 </p>
//               </div>

//               <div className="flex items-center justify-between px-5 pb-5">
//                 <Link
//                   href={`/admin/cars/${car?.slug}`}
//                   className="flex items-center gap-2 text-blue-600 text-sm"
//                 >
//                   <Pencil size={16} />
//                   Edit
//                 </Link>

//                 <button
//                   onClick={() => setSelectedCar(car)}
//                   className="flex items-center gap-2 text-red-600 text-sm"
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       {/* MODAL */}
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

  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 12;

  // ================= FETCH =================
  const fetchCars = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/admin/cars?page=${page}&limit=${limit}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch cars (${res.status})`);
      }

      const data = await res.json();

      if (!data?.success) {
        throw new Error(data?.message || "API returned error");
      }

      setCars(data.data);
      setTotalPages(data?.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [page]);

  // ================= DELETE =================
  const confirmDelete = async () => {
    if (!selectedCar?.slug) return;

    const backup = [...cars];

    try {
      setDeleteLoading(true);

      setCars((prev) => prev.filter((c) => c.slug !== selectedCar.slug));

      const res = await fetch(`/api/admin/cars/${selectedCar.slug}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data?.success) throw new Error("Delete failed");

      setSelectedCar(null);
    } catch (err) {
      setCars(backup);
      setError(err.message);
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
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl shadow"
        >
          <Plus size={18} />
          Add Car
        </Link>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
          <div className="flex justify-between">
            <p>{error}</p>
            <button onClick={fetchCars} className="underline text-sm">
              Retry
            </button>
          </div>
        </div>
      )}

      {/* GRID */}
      {loading ? (
        <p className="text-gray-500">Loading cars...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-600">
          {cars.map((car) => (
            <article
              key={car?._id || car?.slug}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={car?.images?.[0]?.url || "/placeholder.png"}
                  alt={car?.name}
                  fill
                  className="object-cover"
                />

                <span
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full ${
                    statusStyle[car?.status] || "bg-gray-100"
                  }`}
                >
                  {car?.status}
                </span>
              </div>

              <div className="p-5">
                <h2 className="font-semibold text-lg">{car?.name}</h2>
                <p className="text-sm text-gray-500">
                  {car?.brand} • {car?.year}
                </p>
                <p className="text-xl font-bold text-red-500">
                  {Number(car?.price).toLocaleString()} ETB
                </p>
              </div>

              <div className="flex justify-between px-5 pb-5">
                <Link
                  href={`/admin/cars/${car?.slug}`}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </Link>

                <button
                  onClick={() => setSelectedCar(car)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ================= PAGINATION UI (ADDED) ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10 text-slate-600">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  page === i + 1 ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      <DeleteModal
        open={!!selectedCar}
        onClose={() => setSelectedCar(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
