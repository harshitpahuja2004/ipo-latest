import Link from "next/link";
import type { Ipo } from "@/lib/api";
import { ArrowRight, Flame } from "lucide-react";

function fmtDate(d?: string) {
  if (!d) return "TBA";
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  } catch {
    return d;
  }
}

export default function IpoCard({ ipo }: { ipo: Ipo }) {
  const isGmpPositive = (ipo.gmp || 0) > 0;
  const isSme = ipo.type === "sme";
  const estListing = ipo.priceMax && ipo.gmp ? ipo.priceMax + ipo.gmp : null;
  const estGainPercent = ipo.priceMax && ipo.gmp ? ((ipo.gmp / ipo.priceMax) * 100).toFixed(1) : null;

  return (
    <div className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-emerald-500/60 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isSme
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            }`}>
              {isSme ? "SME" : "Mainboard"}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              ipo.status === "open"
                ? "bg-emerald-600 text-white animate-pulse"
                : ipo.status === "upcoming"
                  ? "bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}>
              {ipo.status}
            </span>
          </div>

          <span className="text-[10px] text-slate-400">
            {ipo.exchange || "BSE / NSE"}
          </span>
        </div>

        {/* Title */}
        <Link href={`/ipo/${ipo.slug}`}>
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug line-clamp-1">
            {ipo.companyName || ipo.name}
          </h3>
        </Link>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {ipo.sector || "Primary Market Issue"}
        </p>

        {/* Live GMP Callout Box */}
        <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 block">
              Live GMP
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className={`font-mono text-base font-bold ${
                isGmpPositive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600"
              }`}>
                {ipo.gmp ? `+₹${ipo.gmp}` : "₹0"}
              </span>
              {estGainPercent && (
                <span className="text-[11px] font-mono font-semibold text-emerald-600">
                  (+{estGainPercent}%)
                </span>
              )}
            </div>
          </div>

          {estListing && (
            <div className="text-right">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 block">
                Est. Listing
              </span>
              <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                ₹{estListing}
              </span>
            </div>
          )}
        </div>

        {/* Key Metrics Grid */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] border-t border-slate-100 dark:border-slate-800 pt-2.5">
          <div>
            <span className="text-[10px] text-slate-400 block">Price Band</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 block">
              {ipo.priceMax > 0 ? `₹${ipo.priceMin} – ₹${ipo.priceMax}` : "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Lot Size</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 block">
              {ipo.lotSize > 0 ? `${ipo.lotSize} Shares` : "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Issue Size</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">
              {ipo.issueSize || "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Dates</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">
              {fmtDate(ipo.openDate)} – {fmtDate(ipo.closeDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <Link
          href={`/ipo/${ipo.slug}`}
          className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          View Full Details <ArrowRight size={11} />
        </Link>
        <span className="text-[9px] text-slate-400 italic">
          * Indicative info
        </span>
      </div>
    </div>
  );
}
