import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Refugee Routes",
  description: "Methodology and data sources for Refugee Routes displacement tracker.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">About Refugee Routes</h1>
      <div className="space-y-4 text-gray-300">
        <p>
          Refugee Routes visualizes displacement flows — where people flee from and where they end up —
          using data from UNHCR, IOM, and government statistical agencies.
        </p>
        <h2 className="text-lg font-semibold text-white mt-6">Methodology</h2>
        <p>
          Counts represent registered refugees and asylum seekers as reported by host country authorities
          and UNHCR registration data. IDP (Internally Displaced Person) figures are sourced from IDMC.
          &ldquo;Migrants&rdquo; denotes mixed-migration flows where protection status is contested.
        </p>
        <h2 className="text-lg font-semibold text-white mt-6">Data Sources</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li>UNHCR Global Trends Report 2026</li>
          <li>IOM Displacement Tracking Matrix (DTM)</li>
          <li>IDMC Global Report on Internal Displacement</li>
          <li>Individual country statistical agencies</li>
        </ul>
        <p className="text-gray-400 text-sm mt-6">
          Last updated: April 2026. Data may lag real-time conditions by 30-90 days.
        </p>
      </div>
    </div>
  );
}
