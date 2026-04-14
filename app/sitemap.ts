import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";

const BASE_URL = "https://refugee-routes.vercel.app";
const LOCALES = ["en", "ar", "zh", "ru", "fr", "de", "es", "uk"];

type Flow = { origin: string; destination: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/flows.json"), "utf-8");
  const flows: Flow[] = JSON.parse(raw).flows;
  const origins = [...new Set(flows.map((f) => f.origin))];
  const dests = [...new Set(flows.map((f) => f.destination))];

  const routes = [
    "",
    "/about",
    ...origins.map((s) => `/origin/${s}`),
    ...dests.map((s) => `/destination/${s}`),
  ];

  return LOCALES.flatMap((locale) =>
    routes.map((r) => ({
      url: `${BASE_URL}/${locale}${r}`,
      lastModified: new Date("2026-04-14"),
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.8,
    }))
  );
}
