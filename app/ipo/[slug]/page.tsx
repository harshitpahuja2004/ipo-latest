import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchLiveIpoBySlug, fetchLiveIpos } from "@/lib/api";
import { siteConfig } from "@/lib/site-config";
import { ArrowLeft, Flame, Calendar, DollarSign, Users, ShieldCheck, CheckCircle2 } from "lucide-react";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ipo = await fetchLiveIpoBySlug(slug);

  if (!ipo) {
    return { title: "IPO Details Not Found", robots: { index: false } };
  }

  const name = ipo.companyName || ipo.name;
  return {
    title: `${name} IPO GMP Today, Price Band, Allotment & Review (2026)`,
    description: `Complete ${name} IPO details: Live GMP of ₹${ipo.gmp || 0} (${ipo.gmpPercent || 0}%), price band ₹${ipo.priceMin}–₹${ipo.priceMax}, lot size ${ipo.lotSize || "TBA"}, subscription status and expert review.`,
    keywords: [
      `${name.toLowerCase()} ipo`,
      `${name.toLowerCase()} ipo gmp today`,
      `${name.toLowerCase()} ipo review`,
      `${name.toLowerCase()} ipo price band`,
      `${name.toLowerCase()} ipo allotment status`,
      `${name.toLowerCase()} ipo subscription`
    ],
  };
}

export default async function IpoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ipo = await fetchLiveIpoBySlug(slug);

  if (!ipo) notFound();

  const name = ipo.companyName || ipo.name;
  const isGmpPositive = ipo.gmp > 0;
  const estListing = ipo.priceMax && ipo.gmp ? ipo.priceMax + ipo.gmp : null;
  const estGainPercent = ipo.priceMax && ipo.gmp ? ((ipo.gmp / ipo.priceMax) * 100).toFixed(1) : null;
  const minInvestment = ipo.priceMax && ipo.lotSize ? ipo.priceMax * ipo.lotSize : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${name} IPO`,
    description: ipo.about || `${name} Initial Public Offering details and live GMP.`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: ipo.priceMin,
      highPrice: ipo.priceMax,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/ipo/gmp" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 mb-6">
        <ArrowLeft size={13} /> Back to Live GMP Tracker
      </Link>

      {/* Main Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-md text-xs font-bold ${
              ipo.type === "sme"
                ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
            }`}>
              {ipo.type === "sme" ? "SME IPO" : "Mainboard IPO"}
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {ipo.status}
            </span>
          </div>

          <span className="text-xs text-slate-400">
            Listed on: <strong className="text-slate-800 dark:text-slate-200">{ipo.exchange || "BSE / NSE"}</strong>
          </span>
        </div>

        <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
          {name} IPO Details &amp; Live GMP
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">
          {ipo.sector ? `${ipo.sector} Sector` : "Primary Market Issue"} · Issue Size: <strong className="text-slate-800 dark:text-slate-200">{ipo.issueSize || "TBA"}</strong>
        </p>

        {/* Live GMP Box */}
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Live GMP Today
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`font-mono text-3xl font-bold ${isGmpPositive ? "text-emerald-600" : "text-slate-700"}`}>
                {ipo.gmp ? `+₹${ipo.gmp}` : "₹0 (TBA)"}
              </span>
              {estGainPercent && (
                <span className="text-sm font-bold text-emerald-600">
                  (+{estGainPercent}%)
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Last heard: {ipo.gmpLastHeard || "Active Primary Market"}
            </p>
          </div>

          {estListing && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Estimated Listing Price
              </span>
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                ₹{estListing}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Cap price + current GMP
              </p>
            </div>
          )}

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Minimum Retail Investment
            </span>
            <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {minInvestment > 0 ? `₹${minInvestment.toLocaleString("en-IN")}` : "TBA"}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              1 Lot ({ipo.lotSize || 0} shares)
            </p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Key Facts Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
              IPO Structure &amp; Price Band
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Price Band</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.priceMax > 0 ? `₹${ipo.priceMin} – ₹${ipo.priceMax}` : "TBA"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Lot Size</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.lotSize > 0 ? `${ipo.lotSize} Shares` : "TBA"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Total Issue Size</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.issueSize || "TBA"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Bidding Opens</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.openDate || "TBA"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Bidding Closes</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.closeDate || "TBA"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Allotment Date</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.allotmentDate || "TBA"}
                </span>
              </div>
            </div>
          </div>

          {/* About Company */}
          {ipo.about && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
                About {name}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {ipo.about}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Actions */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
              Official Documents &amp; Status
            </h3>
            <div className="space-y-3 text-xs">
              {ipo.rhpUrl && (
                <a
                  href={ipo.rhpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center rounded-xl bg-emerald-600 text-white py-2.5 font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Download Official RHP
                </a>
              )}
              {ipo.drhpUrl && (
                <a
                  href={ipo.drhpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2.5 font-semibold hover:border-emerald-500 transition-colors"
                >
                  View DRHP Filing
                </a>
              )}
              <Link
                href="/category/IPO%20Review"
                className="block w-full text-center rounded-xl border border-slate-200 dark:border-slate-800 text-emerald-600 py-2.5 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Read Prospectus Analysis
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-xs text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
              * Indicative Information
            </p>
            <p>
              Information on this page is compiled from official draft offer documents and exchange feeds for research purposes. It does not constitute investment advice.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
