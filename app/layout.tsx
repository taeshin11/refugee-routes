import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AdHeader from "@/components/ads/AdHeader";
import AdMobileSticky from "@/components/ads/AdMobileSticky";
import VisitorCounter from "@/components/VisitorCounter";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Refugee Routes — Global Displacement Flow Tracker 2026",
  description:
    "Track where refugees and displaced people flee from and to. Data on Ukraine, Sudan, Myanmar, Gaza, Somalia and more.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <AdHeader />
        <header className="border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-white hover:text-blue-400 transition-colors">
            Refugee Routes
          </Link>
          <nav className="flex gap-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </nav>
          <VisitorCounter />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-800 px-4 py-4 text-center text-xs text-gray-500">
          Refugee Routes © 2026 — Data sourced from UNHCR, IOM, and open government datasets
        </footer>
        <AdMobileSticky />
      </body>
    </html>
  );
}
