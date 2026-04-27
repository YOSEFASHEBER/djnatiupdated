export default function MobileFilters({
  show,
  setShow,
  searchParams,
  updateParams,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="bg-white w-80 h-full p-6">
        <button
          onClick={() => setShow(false)}
          className="mb-6 text-sm text-blue-700"
        >
          Close
        </button>

        <h2 className="font-bold mb-4">Filters</h2>

        <input
          placeholder="Search..."
          defaultValue={searchParams.search || ""}
          onChange={(e) => updateParams({ search: e.target.value, page: 1 })}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <select
          defaultValue={searchParams.category || ""}
          onChange={(e) => updateParams({ category: e.target.value, page: 1 })}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="">All Categories</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
        </select>
      </div>
    </div>
  );
}
