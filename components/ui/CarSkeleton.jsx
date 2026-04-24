import React from "react";

function CarSkeleton() {
  return (
    <div className="animate-pulse w-full max-w-sm rounded-2xl bg-white shadow p-4 space-y-4">
      <div className="h-48 bg-gray-200 rounded-xl" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded-xl" />
    </div>
  );
}

export default CarSkeleton;
