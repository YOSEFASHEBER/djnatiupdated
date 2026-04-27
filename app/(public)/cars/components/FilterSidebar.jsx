// export default function FiltersSidebar({ searchParams, updateParams }) {
//   return (
//     <aside className="hidden md:block w-72">
//       <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-lg sticky top-28">
//         <h2 className="text-lg font-bold mb-4 text-slate-900">Filters</h2>

//         {/* Search */}
//         <input
//           placeholder="Search..."
//           defaultValue={searchParams.search || ""}
//           onChange={(e) => updateParams({ search: e.target.value, page: 1 })}
//           className="
//             w-full p-2 mb-4 rounded-lg
//             border border-slate-400
//             text-slate-900
//             placeholder:text-slate-500
//             focus:outline-none focus:ring-2 focus:ring-red-500
//           "
//         />

//         {/* Category */}
//         <select
//           defaultValue={searchParams.category || ""}
//           onChange={(e) => updateParams({ category: e.target.value, page: 1 })}
//           className="
//             w-full p-2 mb-4 rounded-lg
//             border border-slate-400
//             text-slate-900
//             focus:outline-none focus:ring-2 focus:ring-red-500
//           "
//         >
//           <option value="">All Categories</option>
//           <option value="SUV">SUV</option>
//           <option value="Sedan">Sedan</option>
//           <option value="Truck">Truck</option>
//         </select>

//         {/* Min Price */}
//         <input
//           type="number"
//           placeholder="Min Price"
//           defaultValue={searchParams.minPrice || ""}
//           onChange={(e) => updateParams({ minPrice: e.target.value, page: 1 })}
//           className="
//             w-full p-2 mb-3 rounded-lg
//             border border-slate-400
//             text-slate-900
//             placeholder:text-slate-500
//             focus:outline-none focus:ring-2 focus:ring-red-500
//           "
//         />

//         {/* Max Price */}
//         <input
//           type="number"
//           placeholder="Max Price"
//           defaultValue={searchParams.maxPrice || ""}
//           onChange={(e) => updateParams({ maxPrice: e.target.value, page: 1 })}
//           className="
//             w-full p-2 rounded-lg
//             border border-slate-400
//             text-slate-900
//             placeholder:text-slate-500
//             focus:outline-none focus:ring-2 focus:ring-red-500
//           "
//         />
//       </div>
//     </aside>
//   );
// }

"use client";

import { useState, useEffect } from "react";

export default function FiltersSidebar({ searchParams, updateParams }) {
  const formatNumber = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-US").format(value);
  };

  const parseNumber = (value) => {
    return value.replace(/,/g, "");
  };

  const [minPrice, setMinPrice] = useState(
    formatNumber(searchParams.minPrice || ""),
  );
  const [maxPrice, setMaxPrice] = useState(
    formatNumber(searchParams.maxPrice || ""),
  );

  useEffect(() => {
    setMinPrice(formatNumber(searchParams.minPrice || ""));
    setMaxPrice(formatNumber(searchParams.maxPrice || ""));
  }, [searchParams.minPrice, searchParams.maxPrice]);

  const handleMinChange = (e) => {
    const raw = parseNumber(e.target.value);
    if (!/^\d*$/.test(raw)) return;

    setMinPrice(formatNumber(raw));
    updateParams({ minPrice: raw, page: 1 });
  };

  const handleMaxChange = (e) => {
    const raw = parseNumber(e.target.value);
    if (!/^\d*$/.test(raw)) return;

    setMaxPrice(formatNumber(raw));
    updateParams({ maxPrice: raw, page: 1 });
  };

  return (
    <aside className="hidden md:block w-72">
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-lg sticky top-28">
        <h2 className="text-lg font-bold mb-4 text-slate-900">Filters</h2>

        {/* Search */}
        <input
          placeholder="Search..."
          defaultValue={searchParams.search || ""}
          onChange={(e) => updateParams({ search: e.target.value, page: 1 })}
          className="
            w-full p-2 mb-4 rounded-lg
            border border-slate-400
            text-slate-900
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-red-500
          "
        />

        {/* Category */}
        <select
          defaultValue={searchParams.category || ""}
          onChange={(e) => updateParams({ category: e.target.value, page: 1 })}
          className="
            w-full p-2 mb-4 rounded-lg
            border border-slate-400
            text-slate-900
            focus:outline-none focus:ring-2 focus:ring-red-500
          "
        >
          <option value="">All Categories</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
        </select>

        {/* Min Price */}
        <input
          type="text"
          inputMode="numeric"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinChange}
          className="
            w-full p-2 mb-3 rounded-lg
            border border-slate-400
            text-slate-900
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-red-500
          "
        />

        {/* Max Price */}
        <input
          type="text"
          inputMode="numeric"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxChange}
          className="
            w-full p-2 rounded-lg
            border border-slate-400
            text-slate-900
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-red-500
          "
        />
      </div>
    </aside>
  );
}
