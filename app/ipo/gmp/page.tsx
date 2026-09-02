import type { Metadata } from "next";
import Link from "next/link";
import { fetchLiveIpos } from "@/lib/api";
import IpoCard from "@/components/IpoCard";
import { siteConfig } from "@/lib/site-config";
import { Flame, TrendingUp, Sparkles, ArrowLeft, ShieldCheck, HelpCircle } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "IPO GMP Today — Live Grey Market Premium, Kostak & Listing Estimates (2026)",
  description: "Check live IPO GMP today for all Mainboard & SME IPOs in India. Real-time Grey Market Premium rates, estimated listing gains, Kostak rates, and fire ratings updated hourly.",
  keywords: [
    "ipo gmp today",
    "live ipo gmp",
    "ipo grey market premium today",
    "sme ipo gmp today",
    "ipo gmp price",
    "upcoming ipo gmp",
    "latest ipo gmp",
    "kostak rate ipo"
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

  // Sort by highest GMP percentage first
  const sortedIpos = [...ipos].sort((a, b) => (b.gmp || 0) - (a.gmp || 0));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "IPO GMP Today Live Tracker",
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

      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 mb-6">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 p-6 sm:p-8 text-white mb-8 shadow-lg">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3">
            <Flame size={14} className="text-amber-300" />
            <span>Live Hourly Cross-Checked Rates</span>
          </div>
          <h1 className="font-bold text-2xl sm:text-4xl tracking-tight leading-tight">
            IPO GMP Today — Live Grey Market Premium (2026)
          </h1>
          <p className="text-emerald-100 text-xs sm:text-base mt-2.5 leading-relaxed">
            Real-time Grey Market Premium rates for Mainboard &amp; SME IPOs. Track estimated listing gains, Kostak rates, Subject to Sauda, and price bands.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Link
            href="/ipo/gmp"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              type === "all"
                ? "bg-emerald-600 text-white shadow-sm"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
            }`}
          >
            All IPOs ({ipos.length})
          </Link>
          <Link
            href="/ipo/gmp?type=mainboard"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              type === "mainboard"
                ? "bg-emerald-600 text-white shadow-sm"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
            }`}
          >
            Mainboard IPOs
          </Link>
          <Link
            href="/ipo/gmp?type=sme"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              type === "sme"
                ? "bg-emerald-600 text-white shadow-sm"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
            }`}
          >
            SME IPOs
          </Link>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Rates cross-checked from primary market dealers</span>
        </div>
      </div>

      {/* Live Grid */}
      {sortedIpos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400 text-sm">No active IPOs found matching this filter.</p>
          <Link href="/ipo/gmp" className="mt-3 inline-block text-xs font-semibold text-emerald-600 hover:underline">
            View all IPOs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedIpos.map((ipo) => (
            <IpoCard key={ipo.slug} ipo={ipo} />
          ))}
        </div>
      )}

      {/* Educational Guide on What Is GMP */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4">
        <h2 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle size={18} className="text-emerald-600" /> What is IPO Grey Market Premium (GMP)?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The <strong>Grey Market Premium (GMP)</strong> is an unofficial cash premium at which IPO shares trade in the unorganized over-the-counter (OTC) market before their official stock exchange listing on BSE and NSE.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Estimated Listing Price Formula</h4>
            <p className="font-mono text-emerald-600 font-semibold">Estimated Listing Price = Cap Price (Issue Price) + Current GMP</p>
            <p className="text-slate-500 mt-1">Example: If price band is ₹100 and GMP is ₹40, the estimated listing price is ₹140 (+40%).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
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
