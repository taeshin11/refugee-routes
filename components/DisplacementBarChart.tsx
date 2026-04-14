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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-sm">
        <p className="font-semibold text-slate-900 mb-1">{label}</p>
        <p className="text-teal-600 font-bold">{(Number(payload[0].value) / 1000000).toFixed(2)}M displaced</p>
      </div>
    );
  }
  return null;
};

export default function DisplacementBarChart({
  data,
  color = "#14b8a6",
}: {
  data: DataPoint[];
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30, top: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          type="number"
          tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          stroke="#e2e8f0"
        />
        <YAxis
          dataKey="name"
          type="category"
          tick={{ fill: "#64748b", fontSize: 11 }}
          stroke="#e2e8f0"
          width={90}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[0, 6, 6, 0]}>
          {data.map((_, i) => (
            <Cell
              key={i}
              fill={color}
              fillOpacity={1 - i * 0.12}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
