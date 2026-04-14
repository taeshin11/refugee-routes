import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Refugee Routes",
  description: "Methodology and data sources for Refugee Routes displacement tracker.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">About Refugee Routes</h1>
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed">
          Refugee Routes visualizes displacement flows — where people flee from and where they end up —
          using data from UNHCR, IOM, and government statistical agencies.
        </p>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Methodology</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Counts represent registered refugees and asylum seekers as reported by host country authorities
            and UNHCR registration data. IDP (Internally Displaced Person) figures are sourced from IDMC.
            &ldquo;Migrants&rdquo; denotes mixed-migration flows where protection status is contested.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Data Sources</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0"></span>UNHCR Global Trends Report 2026</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0"></span>IOM Displacement Tracking Matrix (DTM)</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0"></span>IDMC Global Report on Internal Displacement</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0"></span>Individual country statistical agencies</li>
          </ul>
        </div>

        <p className="text-slate-400 text-sm">
          Last updated: April 2026. Data may lag real-time conditions by 30-90 days.
        </p>
      </div>
    </div>
  );
}
