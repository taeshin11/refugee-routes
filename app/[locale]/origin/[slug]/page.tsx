import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import DisplacementBarChart from "@/components/DisplacementBarChart";
import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

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
  return routing.locales.flatMap(locale => origins.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const flows = await getFlows();
  const flow = flows.find((f) => f.origin === slug);
  if (!flow) return {};
  return {
    title: `${flow.origin_label} Refugee Outflows — Refugee Routes`,
    description: `Where refugees from ${flow.origin_label} fled to, displacement counts, and trends.`,
  };
}

export default async function OriginPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
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
      <Link href={`/${locale}`} className="text-sm text-teal-600 hover:text-teal-700 font-medium mb-6 inline-flex items-center gap-1">← All Flows</Link>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{origin.origin_flag}</span>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{origin.origin_label}</h1>
          <p className="text-slate-500 text-sm mt-1">
            Total outflow: {(total / 1000000).toFixed(2)}M displaced
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
        <h2 className="font-bold text-slate-900 mb-4">Where They Fled To</h2>
        <DisplacementBarChart data={chartData} color="#14b8a6" />
      </div>

      <div className="space-y-3">
        {originFlows.sort((a, b) => b.count - a.count).map((f) => (
          <Link
            key={f.id}
            href={`/${locale}/destination/${f.destination}`}
            className="block bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{f.destination_flag}</span>
                <span className="font-medium text-slate-900 group-hover:text-teal-600 transition-colors">{f.destination_label}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-teal-600">{(f.count / 1000000).toFixed(2)}M</div>
                <div className={`text-xs ${f.trend === "increasing" ? "text-red-500" : f.trend === "stable" ? "text-slate-400" : "text-green-500"}`}>
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
