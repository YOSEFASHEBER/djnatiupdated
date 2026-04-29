"use client";

import { useEffect, useState, useRef } from "react";
import StatItem from "./StatItem";

export default function Stats({ availableCars }) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 text-center gap-4">
        <StatItem label="Cars Sold" value={200} start={animate} />
        <StatItem label="Happy Clients" value={100} start={animate} />
        <StatItem label="Years Experience" value={5} start={animate} />
        <StatItem
          label="Available Cars"
          value={availableCars}
          start={animate}
        />
      </div>
    </div>
  );
}
