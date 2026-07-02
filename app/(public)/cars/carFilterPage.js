"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Fuel, Tag, DollarSign } from "lucide-react";

export default function CarFilter({ searchParams = {} }) {
  const router = useRouter();

  const [search, setSearch] = useState(searchParams?.search || "");
  const [brand, setBrand] = useState(searchParams?.brand || "");
  const [fuelType, setFuelType] = useState(searchParams?.fuelType || "");
  const [minPrice, setMinPrice] = useState(searchParams?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams?.maxPrice || "");

  const [error, setError] = useState("");

  const brands = ["Toyota", "Suzuki", "Hyundai", "Kia", "Nissan"];
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

  // ================= APPLY FILTER (SAFE) =================
  const applyFilter = () => {
    try {
      setError("");

      // ✅ Validation: price logic
      if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
        setError("Min price cannot be greater than max price");
        return;
      }

      const params = new URLSearchParams();

      if (search) params.set("search", search.trim());
      if (brand) params.set("brand", brand);
      if (fuelType) params.set("fuelType", fuelType);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);

      router.push(`/cars?${params.toString()}`);
    } catch (err) {
      console.error("Filter error:", err);
      setError("Something went wrong while applying filters");
    }
  };

  // ================= CLEAR FILTER (SAFE) =================
  const clearFilters = () => {
    try {
      setSearch("");
      setBrand("");
      setFuelType("");
      setMinPrice("");
      setMaxPrice("");
      setError("");

      router.push("/cars");
    } catch (err) {
      console.error("Clear filter error:", err);
      setError("Failed to reset filters");
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-5 mb-6 border border-gray-100">
      {/* ================= ERROR UI ================= */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search car..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border rounded-xl px-3 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* BRAND */}
        <div className="relative">
          <Tag className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="pl-9 border rounded-xl px-3 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* FUEL */}
        <div className="relative">
          <Fuel className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="pl-9 border rounded-xl px-3 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="">All Fuel Types</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* MIN PRICE */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="pl-9 border rounded-xl px-3 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* MAX PRICE */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="pl-9 border rounded-xl px-3 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={applyFilter}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 font-semibold transition"
          >
            Apply
          </button>

          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-2 font-medium transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
