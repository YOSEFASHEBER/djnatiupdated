import CarCard from "./CarCard";

export default function LatestCars({ cars }) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Latest Cars</h2>

        {cars.length === 0 ? (
          <p>No cars available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
