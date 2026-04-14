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

const typeColors: Record<string, string> = {
  refugee: "bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20",
  migrant: "bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/20",
  idp: "bg-yellow-500/10 text-yellow-700 ring-1 ring-inset ring-yellow-500/20",
};

const trendDot: Record<string, string> = {
  increasing: "inline-block w-2 h-2 rounded-full bg-red-500",
  stable: "inline-block w-2 h-2 rounded-full bg-slate-400",
  decreasing: "inline-block w-2 h-2 rounded-full bg-green-500",
};

const trendLabel: Record<string, string> = {
  increasing: "text-red-500",
  stable: "text-slate-400",
  decreasing: "text-green-500",
};

export default function FlowCard({ flow }: { flow: Flow }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 p-5 group">
      {/* Flow arrow visualization */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl">{flow.origin_flag}</span>
          <span className="text-xs text-slate-500 mt-1 font-medium">{flow.origin_label}</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-0.5">
          <div className="w-full flex items-center gap-1">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-teal-200 to-teal-400"></div>
            <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-2xl font-black text-teal-600 mt-1">{(flow.count / 1000).toFixed(0)}K</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">{flow.destination_flag}</span>
          <span className="text-xs text-slate-500 mt-1 font-medium">{flow.destination_label}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className={`px-2.5 py-0.5 rounded-full font-semibold ${typeColors[flow.type] || "bg-slate-100 text-slate-600"}`}>{flow.type}</span>
        <span className={`flex items-center gap-1.5 ${trendLabel[flow.trend] || "text-slate-400"}`}>
          <span className={trendDot[flow.trend] || "inline-block w-2 h-2 rounded-full bg-slate-400"}></span>
          {flow.trend}
        </span>
      </div>
    </div>
  );
}
