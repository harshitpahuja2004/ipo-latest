import type { Metadata } from "next";
import Link from "next/link";
import { fetchLiveIpos } from "@/lib/api";
import GmpTable from "@/components/GmpTable";
import { siteConfig } from "@/lib/site-config";
import { Flame, ArrowLeft, ShieldCheck, HelpCircle, ArrowUpRight } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Live IPO GMP Today (2026) — Mainboard & SME Grey Market Premium Tracker",
  description: "Live IPO GMP today tracker for Indian stock market. Real-time Grey Market Premium rates, Kostak rates, Subject to Sauda, and estimated listing prices updated hourly.",
  keywords: [
    "ipo gmp today",
    "live ipo gmp",
    "sme ipo gmp today",
    "ipo grey market premium today",
    "kostak rate ipo",
    "ipo listing gain estimate"
  ],
};

export default async function GmpTodayPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type = "all" } = await searchParams;
  const { ipos } = await fetchLiveIpos({
    type: type !== "all" ? type : undefined,
    limit: 60,
  });

  const sortedIpos = [...ipos].sort((a, b) => (b.gmp || 0) - (a.gmp || 0));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Live IPO GMP Today Tracker",
    description: "Live Grey Market Premium (GMP) for all open and upcoming IPOs in India.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 mb-6">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      {/* Header Banner */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Flame size={14} className="text-amber-500" />
            <span>Hourly Cross-Checked Primary Market Rates</span>
          </div>
          <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
            Live IPO GMP Today (2026)
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Real-time Grey Market Premium (GMP) rates for all active Mainboard and SME IPOs. Track estimated listing gains, Kostak rates, price bands, and bidding windows.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3.5 mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Link
            href="/ipo/gmp"
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              type === "all"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400"
            }`}
          >
            All Issues ({ipos.length})
          </Link>
          <Link
            href="/ipo/gmp?type=mainboard"
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              type === "mainboard"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400"
            }`}
          >
            Mainboard IPOs
          </Link>
          <Link
            href="/ipo/gmp?type=sme"
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              type === "sme"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400"
            }`}
          >
            SME IPOs
          </Link>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Cross-checked against primary dealer quotes</span>
        </div>
      </div>

      {/* High Density Table */}
      <div className="mb-12">
        <GmpTable ipos={sortedIpos} />
      </div>

      {/* Educational Guide Box */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-4 shadow-sm">
        <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle size={18} className="text-emerald-600" /> What is IPO Grey Market Premium (GMP)?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The <strong>Grey Market Premium (GMP)</strong> is an unofficial cash premium at which IPO shares trade in the unorganized over-the-counter (OTC) market before their official stock exchange listing on BSE and NSE.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Estimated Listing Price Formula</h4>
            <p className="font-mono text-emerald-600 font-semibold">Estimated Listing Price = Cap Price (Issue Price) + Current GMP</p>
            <p className="text-slate-500 mt-1">Example: If price band is ₹100 and GMP is ₹40, the estimated listing price is ₹140 (+40%).</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Important Risk Disclaimer</h4>
            <p className="text-slate-500">
              * GMP is purely indicative and based on unofficial market sentiment. It is NOT guaranteed and should never be the sole basis for applying in an IPO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
