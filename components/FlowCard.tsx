type Flow = {
  id: string;
  origin_label: string;
  origin_flag: string;
  destination_label: string;
  destination_flag: string;
  count: number;
  type: string;
  conflict: string;
  trend: string;
};

const TYPE_COLOR: Record<string, string> = {
  refugee: "bg-red-900 text-red-300",
  migrant: "bg-blue-900 text-blue-300",
  idp: "bg-yellow-900 text-yellow-300",
};

const TREND_ICON: Record<string, string> = {
  increasing: "↑",
  stable: "→",
  decreasing: "↓",
};

const TREND_COLOR: Record<string, string> = {
  increasing: "text-red-400",
  stable: "text-gray-400",
  decreasing: "text-green-400",
};

export default function FlowCard({ flow }: { flow: Flow }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{flow.origin_flag}</span>
        <span className="text-gray-400 text-lg">→</span>
        <span className="text-2xl">{flow.destination_flag}</span>
        <div className="ml-1">
          <div className="text-sm font-medium text-white">
            {flow.origin_label} → {flow.destination_label}
          </div>
          <div className="text-xs text-gray-400">{flow.conflict.replace(/-/g, " ")}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          {(flow.count / 1000000).toFixed(2)}M
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLOR[flow.type] || "bg-gray-700 text-gray-400"}`}>
            {flow.type}
          </span>
          <span className={`text-sm font-bold ${TREND_COLOR[flow.trend] || "text-gray-400"}`}>
            {TREND_ICON[flow.trend] || "→"}
          </span>
        </div>
      </div>
    </div>
  );
}
