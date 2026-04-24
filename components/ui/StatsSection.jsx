"use client";

import { useEffect, useState } from "react";

function Counter({ value, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = value / 60;

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-xl font-bold">{count}+</div>
      <div className="text-xs text-red-500">{label}</div>
    </div>
  );
}

export default function StatsSection({ availableCars }) {
  return (
    <div className="bg-white border-t py-4 grid grid-cols-4 text-center">
      <Counter value={200} label="Cars Sold" />
      <Counter value={100} label="Clients" />
      <Counter value={5} label="Years" />
      <Counter value={availableCars} label="Available" />
    </div>
  );
}
