"use client";
import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/visitor").then((r) => r.json()).then((d) => setCount(d.count)).catch(() => {});
  }, []);
  if (count === null) return null;
  return <span className="text-xs text-gray-400">Visits: {count}</span>;
}
