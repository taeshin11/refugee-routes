import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import DisplacementBarChart from "@/components/DisplacementBarChart";
import type { Metadata } from "next";

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

async function getFlows(): Promise<Flow[]> {
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/flows.json"), "utf-8");
  return JSON.parse(raw).flows;
}

export async function generateStaticParams() {
  const flows = await getFlows();
  const dests = [...new Set(flows.map((f) => f.destination))];
  return dests.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/destination/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const flows = await getFlows();
  const flow = flows.find((f) => f.destination === slug);
  if (!flow) return {};
  return {
    title: `${flow.destination_label} Refugee Inflows — Refugee Routes`,
    description: `Who arrived in ${flow.destination_label}, their origins, and displacement counts.`,
  };
}

export default async function DestinationPage(props: PageProps<"/destination/[slug]">) {
  const { slug } = await props.params;
  const flows = await getFlows();
  const destFlows = flows.filter((f) => f.destination === slug);
  if (destFlows.length === 0) notFound();

  const dest = destFlows[0];
  const total = destFlows.reduce((s, f) => s + f.count, 0);

  const chartData = destFlows
    .sort((a, b) => b.count - a.count)
    .map((f) => ({ name: `${f.origin_flag} ${f.origin_label}`, count: f.count, slug: f.origin }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← All Flows</Link>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{dest.destination_flag}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{dest.destination_label}</h1>
          <p className="text-gray-400 text-sm mt-1">Total inflow: {(total / 1000000).toFixed(2)}M arrivals</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-white mb-4">Who Arrived</h2>
        <DisplacementBarChart data={chartData} color="#3b82f6" />
      </div>

      <div className="space-y-3">
        {destFlows.sort((a, b) => b.count - a.count).map((f) => (
          <Link
            key={f.id}
            href={`/origin/${f.origin}`}
            className="block bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{f.origin_flag}</span>
                <div>
                  <span className="font-medium text-white">{f.origin_label}</span>
                  <div className="text-xs text-gray-400">{f.conflict.replace(/-/g, " ")}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">{(f.count / 1000000).toFixed(2)}M</div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${f.type === "refugee" ? "bg-red-900 text-red-300" : "bg-blue-900 text-blue-300"}`}>
                  {f.type}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
