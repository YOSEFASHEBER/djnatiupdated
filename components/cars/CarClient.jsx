"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { ArrowLeft, ArrowRight, CarFront, Search, Filter } from "lucide-react";
import CarSkeleton from "../ui/CarSkeleton";
import CarCard from "../ui/CarCard";

export default function CarsClient({ initialData }) {
  const [cars, setCars] = useState(initialData.data || []);
  const [totalPages, setTotalPages] = useState(
    initialData.pagination?.totalPages || 1,
  );

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 12;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const debouncedSearch = useDebounce(search, 600);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ================= QUERY BUILDER (SEO FRIENDLY) =================
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    params.set("page", page);
    params.set("limit", limit);

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    return params.toString();
  }, [page, limit, debouncedSearch, category, minPrice, maxPrice]);

  // ================= FETCH =================
  const fetchCars = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/cars?${queryString}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setCars(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Cars fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [queryString]);

  // ================= SMART PAGINATION =================
  const pages = useMemo(() => {
    const range = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) range.push(i);

    return range;
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 mb-4">
            <CarFront className="w-4 h-4" />
            Inventory
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Explore Our Cars
          </h1>

          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Browse carefully selected vehicles with transparent pricing and
            quality assurance.
          </p>
        </div>

        {/* ================= MOBILE FILTER ================= */}
        <div className="md:hidden flex gap-2 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search cars..."
              className="w-full pl-9 p-2 border rounded-xl bg-white shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="p-2 bg-black text-white rounded-xl"
          >
            <Filter />
          </button>
        </div>

        {/* ================= MOBILE FILTER PANEL ================= */}
        {showMobileFilters && (
          <div className="md:hidden bg-white border rounded-2xl p-4 mb-6 shadow-lg space-y-3">
            <select
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">All Categories</option>
              <option>SUV</option>
              <option>Sedan</option>
              <option>Hatchback</option>
              <option>Truck</option>
              <option>Van</option>
            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => {
                setPage(1);
                setMinPrice(e.target.value);
              }}
              className="w-full p-2 border rounded-xl"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => {
                setPage(1);
                setMaxPrice(e.target.value);
              }}
              className="w-full p-2 border rounded-xl"
            />
          </div>
        )}

        <div className="flex gap-8">
          {/* ================= SIDEBAR ================= */}
          <aside className="hidden md:block w-80">
            <div className="bg-white border rounded-3xl p-6 shadow-lg sticky top-28">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search cars..."
                className="w-full p-2 border rounded-xl mb-4"
              />

              <select
                value={category}
                onChange={(e) => {
                  setPage(1);
                  setCategory(e.target.value);
                }}
                className="w-full p-2 border rounded-xl mb-4"
              >
                <option value="">All Categories</option>
                <option>SUV</option>
                <option>Sedan</option>
                <option>Hatchback</option>
                <option>Truck</option>
                <option>Van</option>
              </select>

              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => {
                  setPage(1);
                  setMinPrice(e.target.value);
                }}
                className="w-full p-2 border rounded-xl mb-3"
              />

              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => {
                  setPage(1);
                  setMaxPrice(e.target.value);
                }}
                className="w-full p-2 border rounded-xl"
              />
            </div>
          </aside>

          {/* ================= MAIN ================= */}
          <main className="flex-1">
            {/* GRID */}
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-center mt-12 gap-2 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-2 bg-white border rounded-xl"
              >
                <ArrowLeft />
              </button>

              {pages.map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-2 border rounded-xl ${
                    page === num ? "bg-red-600 text-white" : "bg-white"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-3 py-2 bg-white border rounded-xl"
              >
                <ArrowRight />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
