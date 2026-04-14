"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type DataPoint = {
  name: string;
  count: number;
  flag?: string;
  slug?: string;
};

export default function DisplacementBarChart({
  data,
  color = "#f97316",
}: {
  data: DataPoint[];
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30, top: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          type="number"
          tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          stroke="#374151"
        />
        <YAxis
          dataKey="name"
          type="category"
          tick={{ fill: "#d1d5db", fontSize: 12 }}
          stroke="#374151"
          width={80}
        />
        <Tooltip
          formatter={(value) => [`${(Number(value) / 1000000).toFixed(2)}M`, "Displaced"]}
          contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
          labelStyle={{ color: "#f3f4f6" }}
          itemStyle={{ color: "#d1d5db" }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={color} fillOpacity={0.8 - i * 0.05} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
