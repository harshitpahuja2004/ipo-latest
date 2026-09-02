import type { Metadata } from "next";
import Link from "next/link";
import { fetchLiveIpos } from "@/lib/api";
import IpoCard from "@/components/IpoCard";
import { siteConfig } from "@/lib/site-config";
import { Flame, ArrowLeft, ShieldCheck, HelpCircle } from "lucide-react";

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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 mb-5">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      {/* Header Banner */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 dark:bg-emerald-950/30 p-5 sm:p-6 mb-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2 uppercase tracking-wider">
            <Flame size={12} className="text-amber-500" />
            <span>Hourly Cross-Checked Primary Market Rates</span>
          </div>
          <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-white tracking-tight">
            Live IPO GMP Today (2026)
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Real-time Grey Market Premium (GMP) rates for all active Mainboard and SME IPOs. Track estimated listing gains, Kostak rates, price bands, and bidding windows.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Link
            href="/ipo/gmp"
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              type === "all"
                ? "bg-emerald-600 text-white shadow-sm"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
            }`}
          >
            All Issues ({ipos.length})
          </Link>
          <Link
            href="/ipo/gmp?type=mainboard"
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              type === "mainboard"
                ? "bg-emerald-600 text-white shadow-sm"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
            }`}
          >
            Mainboard IPOs
          </Link>
          <Link
            href="/ipo/gmp?type=sme"
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              type === "sme"
                ? "bg-emerald-600 text-white shadow-sm"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
            }`}
          >
            SME IPOs
          </Link>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>Rates cross-checked against primary dealer quotes</span>
        </div>
      </div>

      {/* Grid of Sharp Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {sortedIpos.map((ipo) => (
          <IpoCard key={ipo.slug} ipo={ipo} />
        ))}
      </div>

      {/* Educational Guide */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-3 shadow-sm">
        <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle size={16} className="text-emerald-600" /> What is IPO Grey Market Premium (GMP)?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The <strong>Grey Market Premium (GMP)</strong> is an unofficial cash premium at which IPO shares trade in the unorganized OTC market before their official stock exchange listing on BSE and NSE.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Estimated Listing Price Formula</h4>
            <p className="font-mono text-emerald-600 font-semibold">Estimated Listing Price = Cap Price + Current GMP</p>
            <p className="text-slate-500 mt-1">Example: Price band ₹100 + GMP ₹40 = Estimated listing price ₹140 (+40%).</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Important Risk Disclaimer</h4>
            <p className="text-slate-500">
              * GMP is indicative and based on unofficial market sentiment. It is NOT guaranteed and should never be the sole basis for applying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
