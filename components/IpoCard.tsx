import Link from "next/link";
import type { Ipo } from "@/lib/api";
import { TrendingUp, Flame, Clock, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

function fmtDate(d?: string) {
  if (!d) return "TBA";
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  } catch {
    return d;
  }
}

export default function IpoCard({ ipo }: { ipo: Ipo }) {
  const isGmpPositive = ipo.gmp > 0;
  const isSme = ipo.type === "sme";
  const estListing = ipo.priceMax && ipo.gmp ? ipo.priceMax + ipo.gmp : null;
  const estGainPercent = ipo.priceMax && ipo.gmp ? ((ipo.gmp / ipo.priceMax) * 100).toFixed(1) : null;

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-emerald-500/60 hover:shadow-xl transition-all flex flex-col justify-between">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
              isSme
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            }`}>
              {isSme ? "SME IPO" : "Mainboard"}
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
              ipo.status === "open"
                ? "bg-emerald-600 text-white animate-pulse"
                : ipo.status === "upcoming"
                  ? "bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}>
              {ipo.status}
            </span>
          </div>

          <span className="text-[11px] text-slate-400">
            {ipo.exchange || "BSE / NSE"}
          </span>
        </div>

        {/* Company Title */}
        <Link href={`/ipo/${ipo.slug}`}>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug line-clamp-1">
            {ipo.companyName || ipo.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mt-0.5">
          {ipo.sector || "Primary Market Issue"}
        </p>

        {/* Live GMP Callout Box */}
        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
              Live GMP Today
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className={`font-mono text-xl font-bold ${isGmpPositive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}>
                {ipo.gmp ? `+₹${ipo.gmp}` : "₹0 (TBA)"}
              </span>
              {estGainPercent && (
                <span className="text-xs font-semibold text-emerald-600">
                  (+{estGainPercent}%)
                </span>
              )}
            </div>
          </div>

          {estListing && (
            <div className="text-right">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                Est. Listing Price
              </span>
              <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                ₹{estListing}
              </span>
            </div>
          )}
        </div>

        {/* Key Metrics Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
          <div>
            <span className="text-[11px] text-slate-400 block">Price Band</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {ipo.priceMax > 0 ? `₹${ipo.priceMin} – ₹${ipo.priceMax}` : "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Lot Size</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {ipo.lotSize > 0 ? `${ipo.lotSize} Shares` : "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Issue Size</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {ipo.issueSize || "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Bidding Dates</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {fmtDate(ipo.openDate)} – {fmtDate(ipo.closeDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA & Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link
          href={`/ipo/${ipo.slug}`}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          View Full Details &amp; Analysis <ArrowRight size={13} />
        </Link>
        <span className="text-[9px] text-slate-400 italic">
          * Indicative info
        </span>
      </div>
    </div>
  );
}
