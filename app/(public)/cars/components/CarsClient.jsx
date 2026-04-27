"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { ArrowLeft, ArrowRight, CarFront, Search, Filter } from "lucide-react";
import CarSkeleton from "@/components/ui/CarSkeleton";
import CarCard from "@/components/ui/CarCard";

export default function CarsClient({ initialData }) {
  const [cars, setCars] = useState(initialData?.data || []);
  const [totalPages, setTotalPages] = useState(
    initialData?.pagination?.totalPages || 1,
  );

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 12;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ================= QUERY BUILDER =================
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
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/cars?${queryString}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.success) {
          setCars(data?.data);
          setTotalPages(data?.pagination?.totalPages);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [queryString]);

  // ================= PAGINATION RANGE =================
  const pages = useMemo(() => {
    const range = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }, [page, totalPages]);

  // ================= RESET FILTERS =================
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-red-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <header className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 mb-4">
            <CarFront className="w-4 h-4" />
            Verified Inventory
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Find Your Perfect Car
          </h1>

          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Browse premium vehicles with transparent pricing, trusted sellers,
            and verified condition reports.
          </p>
        </header>

        {/* ================= MOBILE FILTER ================= */}
        <div className="md:hidden flex gap-2 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-red-400" />

            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e?.target?.value);
              }}
              placeholder="Search cars..."
              className="w-full pl-9 p-2 border border-slate-300 rounded-xl bg-white shadow-sm
              placeholder:text-zinc-700 text-shadow-slate-600"
            />
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="p-2 bg-black text-white rounded-xl "
          >
            <Filter />
          </button>
        </div>

        {/* ================= MOBILE FILTER PANEL ================= */}
        {showMobileFilters && (
          <div className="md:hidden bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-lg space-y-3  placeholder:text-zinc-700 text-shadow-slate-600">
            <select
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e?.target?.value);
                setShowMobileFilters(false);
              }}
              className="w-full p-2 border rounded-xl text-slate-600"
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
                setMinPrice(e?.target?.value);
              }}
              className="w-full p-2 border rounded-xl text-zinc-500  placeholder-slate-500"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => {
                setPage(1);
                setMaxPrice(e?.target?.value);
              }}
              className="w-full p-2 border rounded-xl text-zinc-500  placeholder-slate-500"
            />

            <button
              onClick={resetFilters}
              className="w-full bg-red-600 rounded-xl py-2 font-medium text-amber-50 bg-sl "
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* ================= SIDEBAR ================= */}
          <aside className="hidden md:block w-80">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>

                <button
                  onClick={resetFilters}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Reset
                </button>
              </div>

              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e?.target?.value);
                }}
                placeholder="Search cars..."
                className="w-full p-2 border border-slate-300 rounded-xl mb-4
                placeholder:text-slate-500 text-slate-900 focus:ring-2 focus:ring-red-500 outline-none"
              />

              <select
                value={category}
                onChange={(e) => {
                  setPage(1);
                  setCategory(e?.target?.value);
                }}
                className="w-full p-2 border border-s-slate-600 rounded-xl mb-4
                 text-slate-900 focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="" className=" text-slate-900">
                  All Categories
                </option>
                <option>SUV</option>
                <option>Sedan</option>
                <option>Hatchback</option>
                <option>Truck</option>
                <option>Van</option>
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => {
                    setPage(1);
                    setMinPrice(e.target.value);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl  text-slate-900
                  placeholder:text-slate-500 focus:ring-2 focus:ring-red-500 outline-none"
                />

                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => {
                    setPage(1);
                    setMaxPrice(e?.target?.value);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl   text-slate-900
                  placeholder:text-slate-500 focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>
          </aside>

          {/* ================= MAIN ================= */}
          <main className="flex-1">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car?._id} car={car} />
                ))}
              </div>
            )}

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-center mt-12 gap-2 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-2 bg-white border rounded-xl hover:bg-gray-100"
              >
                <ArrowLeft />
              </button>

              {pages.map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-2 border rounded-xl transition ${
                    page === num
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-3 py-2 bg-white border rounded-xl hover:bg-gray-100"
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
