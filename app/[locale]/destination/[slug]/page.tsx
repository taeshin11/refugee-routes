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
  const dests = [...new Set(flows.map((f) => f.destination))];
  return routing.locales.flatMap(locale => dests.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const flows = await getFlows();
  const flow = flows.find((f) => f.destination === slug);
  if (!flow) return {};
  return {
    title: `${flow.destination_label} Refugee Inflows — Refugee Routes`,
    description: `Who arrived in ${flow.destination_label}, their origins, and displacement counts.`,
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
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
      <Link href={`/${locale}`} className="text-sm text-teal-600 hover:text-teal-700 font-medium mb-6 inline-flex items-center gap-1">← All Flows</Link>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{dest.destination_flag}</span>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{dest.destination_label}</h1>
          <p className="text-slate-500 text-sm mt-1">Total inflow: {(total / 1000000).toFixed(2)}M arrivals</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
        <h2 className="font-bold text-slate-900 mb-4">Who Arrived</h2>
        <DisplacementBarChart data={chartData} color="#6366f1" />
      </div>

      <div className="space-y-3">
        {destFlows.sort((a, b) => b.count - a.count).map((f) => (
          <Link
            key={f.id}
            href={`/${locale}/origin/${f.origin}`}
            className="block bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{f.origin_flag}</span>
                <div>
                  <span className="font-medium text-slate-900 group-hover:text-teal-600 transition-colors">{f.origin_label}</span>
                  <div className="text-xs text-slate-400">{f.conflict.replace(/-/g, " ")}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-teal-600">{(f.count / 1000000).toFixed(2)}M</div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${f.type === "refugee" ? "bg-red-50 text-red-600 ring-1 ring-inset ring-red-200" : "bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200"}`}>
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
