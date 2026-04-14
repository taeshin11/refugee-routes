import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import AdInContent from "@/components/ads/AdInContent";
import AdSidebar from "@/components/ads/AdSidebar";
import FlowCard from "@/components/FlowCard";
import DisplacementBarChart from "@/components/DisplacementBarChart";

type Flow = {
  id: string;
  origin: string;
  origin_label: string;
  origin_flag: string;
  destination: string;
  destination_label: string;
  destination_flag: string;
  count: number;
  type: string;
  conflict: string;
  date_peak: string;
  trend: string;
};

type FlowsData = { updated: string; flows: Flow[] };

async function getFlows(): Promise<FlowsData> {
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/flows.json"), "utf-8");
  return JSON.parse(raw);
}

export default async function Home() {
  const { flows } = await getFlows();

  // Top 5 origins by total outflow
  const originTotals: Record<string, { name: string; flag: string; count: number }> = {};
  for (const f of flows) {
    if (!originTotals[f.origin]) {
      originTotals[f.origin] = { name: f.origin_label, flag: f.origin_flag, count: 0 };
    }
    originTotals[f.origin].count += f.count;
  }
  const topOrigins = Object.entries(originTotals)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([slug, d]) => ({ slug, name: `${d.flag} ${d.name}`, count: d.count }));

  // Top 5 destinations
  const destTotals: Record<string, { name: string; flag: string; count: number }> = {};
  for (const f of flows) {
    if (!destTotals[f.destination]) {
      destTotals[f.destination] = { name: f.destination_label, flag: f.destination_flag, count: 0 };
    }
    destTotals[f.destination].count += f.count;
  }
  const topDests = Object.entries(destTotals)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([slug, d]) => ({ slug, name: `${d.flag} ${d.name}`, count: d.count }));

  const totalDisplaced = flows.reduce((s, f) => s + f.count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Global Displacement Flows</h1>
        <p className="text-gray-400">
          Tracking {flows.length} major displacement routes. Total: {(totalDisplaced / 1000000).toFixed(1)}M people displaced.
        </p>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h2 className="font-semibold text-white mb-4">Top Origins (Outflow)</h2>
              <DisplacementBarChart data={topOrigins} color="#ef4444" />
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h2 className="font-semibold text-white mb-4">Top Destinations (Inflow)</h2>
              <DisplacementBarChart data={topDests} color="#3b82f6" />
            </div>
          </div>

          <AdInContent />

          {/* Flow cards */}
          <h2 className="text-xl font-semibold text-white mb-4">All Flows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flows
              .sort((a, b) => b.count - a.count)
              .map((f) => (
                <Link key={f.id} href={`/origin/${f.origin}`}>
                  <FlowCard flow={f} />
                </Link>
              ))}
          </div>
        </div>

        <aside className="hidden lg:block w-[300px] shrink-0">
          <AdSidebar />
          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3 text-sm">Origins</h3>
            {topOrigins.map((o) => (
              <Link
                key={o.slug}
                href={`/origin/${o.slug}`}
                className="flex items-center justify-between py-1.5 text-sm hover:text-blue-400 transition-colors"
              >
                <span className="text-gray-300">{o.name}</span>
                <span className="text-gray-500 text-xs">{(o.count / 1000000).toFixed(1)}M</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3 text-sm">Destinations</h3>
            {topDests.map((d) => (
              <Link
                key={d.slug}
                href={`/destination/${d.slug}`}
                className="flex items-center justify-between py-1.5 text-sm hover:text-blue-400 transition-colors"
              >
                <span className="text-gray-300">{d.name}</span>
                <span className="text-gray-500 text-xs">{(d.count / 1000000).toFixed(1)}M</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
