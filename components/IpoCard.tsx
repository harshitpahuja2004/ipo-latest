import Link from "next/link";
import type { Ipo } from "@/lib/api";
import { ArrowUpRight, TrendingUp } from "lucide-react";

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
  const minInv = ipo.priceMax && ipo.lotSize ? ipo.priceMax * ipo.lotSize : 0;

  return (
    <div className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Top Chips */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              isSme
                ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
            }`}>
              {isSme ? "SME" : "Mainboard"}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              ipo.status === "open"
                ? "bg-emerald-600 text-white"
                : ipo.status === "upcoming"
                  ? "bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}>
              {ipo.status}
            </span>
          </div>

          <span className="text-[11px] font-medium text-slate-400">
            {ipo.exchange || "BSE / NSE"}
          </span>
        </div>

        {/* Title */}
        <Link href={`/ipo/${ipo.slug}`}>
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug line-clamp-1">
            {ipo.companyName || ipo.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mt-0.5 font-normal">
          {ipo.sector || "Primary Capital Market Issue"}
        </p>

        {/* High-Contrast GMP Bar */}
        <div className="mt-4 rounded-md border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
              Live GMP Today
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className={`font-mono text-lg font-extrabold ${
                isGmpPositive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600"
              }`}>
                {ipo.gmp ? `+₹${ipo.gmp}` : "₹0"}
              </span>
              {estGainPercent && (
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  (+{estGainPercent}%)
                </span>
              )}
            </div>
          </div>

          {estListing && (
            <div className="text-right">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                Est. Listing
              </span>
              <span className="font-mono text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
                ₹{estListing}
              </span>
            </div>
          )}
        </div>

        {/* Data Grid */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Price Band</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {ipo.priceMax > 0 ? `₹${ipo.priceMin} – ₹${ipo.priceMax}` : "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Lot Size</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {ipo.lotSize > 0 ? `${ipo.lotSize} sh` : "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Issue Size</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {ipo.issueSize || "TBA"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Bidding Dates</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {fmtDate(ipo.openDate)} – {fmtDate(ipo.closeDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link
          href={`/ipo/${ipo.slug}`}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          View Full Audit <ArrowUpRight size={13} />
        </Link>
        <span className="text-[9px] text-slate-400 italic">
          * Indicative info
        </span>
      </div>
    </div>
  );
}
