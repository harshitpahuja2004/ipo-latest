import Link from "next/link";
import type { Ipo } from "@/lib/api";
import { ArrowUpRight, TrendingUp, ShieldCheck } from "lucide-react";

function fmtDate(d?: string) {
  if (!d) return "TBA";
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  } catch {
    return d;
  }
}

export default function GmpTable({ ipos }: { ipos: Ipo[] }) {
  if (!ipos || ipos.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-8 text-center bg-white dark:bg-slate-900 text-sm text-slate-500">
        No active IPOs found matching this criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
            <th className="py-3 px-4">IPO / Company</th>
            <th className="py-3 px-3">Type</th>
            <th className="py-3 px-3">Price Band</th>
            <th className="py-3 px-3">Lot Size</th>
            <th className="py-3 px-3">Issue Size</th>
            <th className="py-3 px-3 text-right">Live GMP</th>
            <th className="py-3 px-3 text-right">Est. Listing</th>
            <th className="py-3 px-3">Dates</th>
            <th className="py-3 px-4 text-right">Review</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
          {ipos.map((ipo) => {
            const isGmpPositive = (ipo.gmp || 0) > 0;
            const isSme = ipo.type === "sme";
            const estListing = ipo.priceMax && ipo.gmp ? ipo.priceMax + ipo.gmp : null;
            const estGainPercent = ipo.priceMax && ipo.gmp ? ((ipo.gmp / ipo.priceMax) * 100).toFixed(1) : null;
            const minInv = ipo.priceMax && ipo.lotSize ? ipo.priceMax * ipo.lotSize : 0;

            return (
              <tr
                key={ipo.slug}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
              >
                {/* Company Name */}
                <td className="py-3.5 px-4">
                  <Link href={`/ipo/${ipo.slug}`} className="block group-hover:text-emerald-600 transition-colors">
                    <span className="font-bold text-sm block leading-tight text-slate-900 dark:text-white">
                      {ipo.companyName || ipo.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-normal">
                      {ipo.sector || ipo.exchange || "BSE / NSE"}
                    </span>
                  </Link>
                </td>

                {/* Board Type */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isSme
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                      : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
                  }`}>
                    {isSme ? "SME" : "Mainboard"}
                  </span>
                </td>

                {/* Price Band */}
                <td className="py-3.5 px-3 whitespace-nowrap font-mono text-xs font-semibold">
                  {ipo.priceMax > 0 ? `₹${ipo.priceMin}–₹${ipo.priceMax}` : "TBA"}
                </td>

                {/* Lot Size & Min Inv */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className="font-mono text-xs font-semibold block">{ipo.lotSize ? `${ipo.lotSize} sh` : "TBA"}</span>
                  {minInv > 0 && (
                    <span className="text-[10px] text-slate-400 font-mono block">
                      ₹{minInv.toLocaleString("en-IN")}
                    </span>
                  )}
                </td>

                {/* Issue Size */}
                <td className="py-3.5 px-3 whitespace-nowrap text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {ipo.issueSize || "TBA"}
                </td>

                {/* Live GMP */}
                <td className="py-3.5 px-3 whitespace-nowrap text-right">
                  <div className="inline-flex flex-col items-end">
                    <span className={`font-mono text-sm font-bold ${
                      isGmpPositive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"
                    }`}>
                      {ipo.gmp ? `+₹${ipo.gmp}` : "₹0"}
                    </span>
                    {estGainPercent && (
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1 rounded">
                        +{estGainPercent}%
                      </span>
                    )}
                  </div>
                </td>

                {/* Est. Listing */}
                <td className="py-3.5 px-3 whitespace-nowrap text-right font-mono text-xs font-bold text-slate-900 dark:text-white">
                  {estListing ? `₹${estListing}` : "—"}
                </td>

                {/* Bidding Dates */}
                <td className="py-3.5 px-3 whitespace-nowrap text-[11px] text-slate-500">
                  <span className="block font-medium text-slate-700 dark:text-slate-300">
                    {fmtDate(ipo.openDate)} – {fmtDate(ipo.closeDate)}
                  </span>
                  <span className={`inline-block mt-0.5 text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                    ipo.status === "open"
                      ? "bg-emerald-600 text-white"
                      : ipo.status === "upcoming"
                        ? "bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}>
                    {ipo.status}
                  </span>
                </td>

                {/* Action Link */}
                <td className="py-3.5 px-4 whitespace-nowrap text-right">
                  <Link
                    href={`/ipo/${ipo.slug}`}
                    className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    Details <ArrowUpRight size={13} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
