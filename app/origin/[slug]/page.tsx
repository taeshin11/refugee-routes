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
  const origins = [...new Set(flows.map((f) => f.origin))];
  return origins.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/origin/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const flows = await getFlows();
  const flow = flows.find((f) => f.origin === slug);
  if (!flow) return {};
  return {
    title: `${flow.origin_label} Refugee Outflows — Refugee Routes`,
    description: `Where refugees from ${flow.origin_label} fled to, displacement counts, and trends.`,
  };
}

export default async function OriginPage(props: PageProps<"/origin/[slug]">) {
  const { slug } = await props.params;
  const flows = await getFlows();
  const originFlows = flows.filter((f) => f.origin === slug);
  if (originFlows.length === 0) notFound();

  const origin = originFlows[0];
  const total = originFlows.reduce((s, f) => s + f.count, 0);

  const chartData = originFlows
    .sort((a, b) => b.count - a.count)
    .map((f) => ({ name: `${f.destination_flag} ${f.destination_label}`, count: f.count, slug: f.destination }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← All Flows</Link>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{origin.origin_flag}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{origin.origin_label}</h1>
          <p className="text-gray-400 text-sm mt-1">
            Total outflow: {(total / 1000000).toFixed(2)}M displaced
          </p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-white mb-4">Where They Fled To</h2>
        <DisplacementBarChart data={chartData} color="#ef4444" />
      </div>

      <div className="space-y-3">
        {originFlows.sort((a, b) => b.count - a.count).map((f) => (
          <Link
            key={f.id}
            href={`/destination/${f.destination}`}
            className="block bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{f.destination_flag}</span>
                <span className="font-medium text-white">{f.destination_label}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">{(f.count / 1000000).toFixed(2)}M</div>
                <div className={`text-xs ${f.trend === "increasing" ? "text-red-400" : f.trend === "stable" ? "text-gray-400" : "text-green-400"}`}>
                  {f.trend === "increasing" ? "↑ Increasing" : f.trend === "stable" ? "→ Stable" : "↓ Decreasing"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
