import type { Metadata } from 'next'
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import AdInContent from "@/components/ads/AdInContent";
import AdSidebar from "@/components/ads/AdSidebar";
import FlowCard from "@/components/FlowCard";
import DisplacementBarChart from "@/components/DisplacementBarChart";

export const metadata: Metadata = {
  title: 'Refugee Routes | Real-Time Conflict Intelligence',
  description: 'Mapping refugee displacement routes, migration flows, and humanitarian corridors from active conflict zones',
  keywords: 'refugee routes, displacement map, migration flows, forced displacement, refugee crisis, IDP',
}

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
  const originCountries = Object.keys(originTotals).length;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">Humanitarian Displacement Intelligence</p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div>
              <h1 className="text-4xl font-extrabold mb-4">Refugee Routes</h1>
              <p className="text-slate-300 text-lg max-w-2xl">Visualizing cross-border displacement caused by armed conflict.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-teal-400">{flows.length}</div>
                <div className="text-xs text-slate-400 mt-1">Active Routes</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-teal-400">{(totalDisplaced / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-slate-400 mt-1">Total Displaced</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-teal-400">{originCountries}</div>
                <div className="text-xs text-slate-400 mt-1">Origin Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" id="origins">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h2 className="font-bold text-slate-900 mb-1">Top Origins</h2>
                <p className="text-slate-500 text-xs mb-4">Countries with highest outflow</p>
                <DisplacementBarChart data={topOrigins} color="#14b8a6" />
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5" id="destinations">
                <h2 className="font-bold text-slate-900 mb-1">Top Destinations</h2>
                <p className="text-slate-500 text-xs mb-4">Countries receiving most displaced people</p>
                <DisplacementBarChart data={topDests} color="#6366f1" />
              </div>
            </div>

            <AdInContent />

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">All Displacement Flows</h2>
              <p className="text-slate-500 text-sm mb-4">Sorted by scale of displacement</p>
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
          </div>

          <aside className="hidden lg:block w-[300px] shrink-0">
            <AdSidebar />
            <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Origins</h3>
              {topOrigins.map((o) => (
                <Link
                  key={o.slug}
                  href={`/origin/${o.slug}`}
                  className="flex items-center justify-between py-2 text-sm hover:text-teal-600 transition-colors border-b border-slate-50 last:border-0"
                >
                  <span className="text-slate-700">{o.name}</span>
                  <span className="text-slate-400 text-xs bg-slate-50 px-2 py-0.5 rounded-full">{(o.count / 1000000).toFixed(1)}M</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Destinations</h3>
              {topDests.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destination/${d.slug}`}
                  className="flex items-center justify-between py-2 text-sm hover:text-teal-600 transition-colors border-b border-slate-50 last:border-0"
                >
                  <span className="text-slate-700">{d.name}</span>
                  <span className="text-slate-400 text-xs bg-slate-50 px-2 py-0.5 rounded-full">{(d.count / 1000000).toFixed(1)}M</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
