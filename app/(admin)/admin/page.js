"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  Plus,
  Car,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // ================= TOAST =================
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCars = async () => {
    try {
      const res = await fetch("/api/admin/cars", {
        credentials: "include",
      });

      const data = await res.json();

      setCars(data.data || []);
      setStats(data.stats || {});
    } catch (err) {
      console.error(err);
      showToast("Failed to load cars", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();

    const created = sessionStorage.getItem("car_created");

    if (created) {
      showToast("Car created successfully 🚗🔥", "success");
      sessionStorage.removeItem("car_created");
    }
  }, []);

  // ================= DELETE MODAL =================
  const [deleteSlug, setDeleteSlug] = useState(null);

  const confirmDelete = async () => {
    if (!deleteSlug) return;

    try {
      await fetch(`/api/admin/cars/${deleteSlug}`, {
        method: "DELETE",
        credentials: "include",
      });

      showToast("Car deleted", "success");
      setDeleteSlug(null);
      fetchCars();
    } catch (err) {
      console.error(err);
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="space-y-10 relative">
      {/* ================= TOAST ================= */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg text-white z-50 transition
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteSlug && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[380px] space-y-5">
            <h2 className="text-lg font-semibold text-gray-800">Delete Car</h2>

            <p className="text-sm text-gray-500">
              Are you sure you want to delete this car? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteSlug(null)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-600">Cars</h1>
          <p className="text-gray-500 text-sm">
            Manage your dealership inventory
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

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-slate-600">
        <StatCard icon={<Car />} label="Total Cars" value={stats.total} />
        <StatCard
          icon={<CheckCircle />}
          label="Available"
          value={stats.available}
          color="green"
        />
        <StatCard
          icon={<XCircle />}
          label="Sold"
          value={stats.sold}
          color="red"
        />
        <StatCard
          icon={<Clock />}
          label="Reserved"
          value={stats.reserved}
          color="yellow"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Car</th>
              <th className="px-6 py-4 text-left">Brand</th>
              <th className="px-6 py-4 text-left">Year</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-600">
                  Loading cars...
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr
                  key={car.slug}
                  className="hover:bg-gray-50 transition text-slate-600"
                >
                  <td className="px-6 py-4 font-semibold">
                    {car.name?.toUpperCase()}
                  </td>
                  <td className="px-6 py-4">{car.brand?.toUpperCase()}</td>
                  <td className="px-6 py-4">{car.year}</td>

                  <td className="px-6 py-4 font-medium">
                    {car.price?.toLocaleString()} ETB
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={car.status} />
                  </td>

                  <td className="px-6 py-4 flex justify-end gap-4">
                    <Link
                      href={`/admin/cars/${car.slug}`}
                      className="text-blue-600"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() => setDeleteSlug(car.slug)}
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ icon, label, value, color = "gray" }) {
  const styles = {
    gray: "bg-white",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    yellow: "bg-yellow-50 text-yellow-700",
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-sm hover:shadow-md transition flex items-center justify-between ${styles[color]}`}
    >
      <div>
        <p className="text-xs uppercase text-gray-500">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>

      <div className="text-gray-400">{icon}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Available: "bg-green-100 text-green-700",
    Reserved: "bg-yellow-100 text-yellow-700",
    Sold: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
