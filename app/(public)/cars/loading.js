export default function Loading() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-red-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Page Title Skeleton */}
        <div className="text-center mb-16">
          <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse mb-4"></div>
          <div className="h-5 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>

        {/* Car Cards Skeleton */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200"
            >
              {/* Image */}
              <div className="h-48 bg-gray-200 animate-pulse"></div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>

                <div className="flex gap-3">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
