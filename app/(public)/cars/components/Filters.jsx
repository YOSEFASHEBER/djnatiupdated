// import { Search, Filter, DollarSign, Car, RotateCcw } from "lucide-react";

// export default function Filters({
//   search,
//   setSearch,
//   category,
//   setCategory,
//   minPrice,
//   setMinPrice,
//   maxPrice,
//   setMaxPrice,
//   setPage,
// }) {
//   const resetFilters = () => {
//     setSearch("");
//     setCategory("");
//     setMinPrice("");
//     setMaxPrice("");
//     setPage(1);
//   };

//   return (
//     <aside className="hidden md:block w-80">
//       <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-md sticky top-28">
//         {/* Header */}
//         <div className="flex items-center gap-2 mb-6">
//           <Filter className="w-5 h-5 text-red-600" />
//           <h2 className="text-lg font-bold text-slate-900">Filters</h2>
//         </div>

//         {/* Search */}
//         <div className="relative mb-5">
//           <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />

//           <input
//             value={search}
//             onChange={(e) => {
//               setPage(1);
//               setSearch(e.target.value);
//             }}
//             placeholder="Search cars..."
//             className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl
//             focus:ring-2 focus:ring-red-500 focus:outline-none"
//           />
//         </div>

//         {/* Category */}
//         <div className="mb-5">
//           <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
//             <Car className="w-4 h-4 text-red-500" />
//             Category
//           </label>

//           <select
//             value={category}
//             onChange={(e) => {
//               setPage(1);
//               setCategory(e.target.value);
//             }}
//             className="w-full bg-white border border-slate-200 p-2 rounded-xl
//             focus:ring-2 focus:ring-red-500 focus:outline-none"
//           >
//             <option value="">All Categories</option>
//             <option value="SUV">SUV</option>
//             <option value="Sedan">Sedan</option>
//             <option value="Truck">Truck</option>
//             <option value="Van">Van</option>
//           </select>
//         </div>

//         {/* Price Range */}
//         <div className="mb-6">
//           <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
//             <DollarSign className="w-4 h-4 text-red-500" />
//             Price Range
//           </label>

//           <div className="flex gap-3">
//             <input
//               type="number"
//               placeholder="Min"
//               value={minPrice}
//               onChange={(e) => {
//                 setPage(1);
//                 setMinPrice(e.target.value);
//               }}
//               className="w-full bg-white border border-slate-200 p-2 rounded-xl
//               focus:ring-2 focus:ring-red-500 focus:outline-none"
//             />

//             <input
//               type="number"
//               placeholder="Max"
//               value={maxPrice}
//               onChange={(e) => {
//                 setPage(1);
//                 setMaxPrice(e.target.value);
//               }}
//               className="w-full bg-white border border-slate-200 p-2 rounded-xl
//               focus:ring-2 focus:ring-red-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Reset Button */}
//         <button
//           onClick={resetFilters}
//           className="w-full flex items-center justify-center gap-2 py-2 rounded-xl
//           bg-red-600 text-black font-semibold hover:bg-red-700 transition"
//         >
//           <RotateCcw className="w-4 h-4" />
//           Reset Filters
//         </button>
//       </div>
//     </aside>
//   );
// }

import { Search, Filter, DollarSign, Car, RotateCcw } from "lucide-react";

export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setPage,
}) {
  // Format number with commas
  const formatNumber = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-US").format(value);
  };

  // Remove commas
  const parseNumber = (value) => {
    return value.replace(/,/g, "");
  };

  const handleMinPrice = (e) => {
    const raw = parseNumber(e.target.value);

    if (!/^\d*$/.test(raw)) return;

    setPage(1);
    setMinPrice(raw);
  };

  const handleMaxPrice = (e) => {
    const raw = parseNumber(e.target.value);

    if (!/^\d*$/.test(raw)) return;

    setPage(1);
    setMaxPrice(raw);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <aside className="hidden md:block w-80">
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-md sticky top-28">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />

          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search cars..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl
            focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <Car className="w-4 h-4 text-red-500" />
            Category
          </label>

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="w-full bg-white border border-slate-200 p-2 rounded-xl
            focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <DollarSign className="w-4 h-4 text-red-500" />
            Price Range
          </label>

          <div className="flex gap-3">
            {/* Min Price */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="Min"
              value={formatNumber(minPrice)}
              onChange={handleMinPrice}
              className="w-full bg-white border border-slate-200 p-2 rounded-xl
              focus:ring-2 focus:ring-red-500 focus:outline-none"
            />

            {/* Max Price */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="Max"
              value={formatNumber(maxPrice)}
              onChange={handleMaxPrice}
              className="w-full bg-white border border-slate-200 p-2 rounded-xl
              focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl
          bg-red-600 text-black font-semibold hover:bg-red-700 transition"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
