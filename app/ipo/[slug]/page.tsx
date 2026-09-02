import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchLiveIpoBySlug, fetchLiveIpos, type Ipo } from "@/lib/api";
import { siteConfig } from "@/lib/site-config";
import {
  ArrowLeft,
  Flame,
  Calendar,
  DollarSign,
  Users,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileText,
  Clock,
  AlertCircle
} from "lucide-react";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { ipos } = await fetchLiveIpos({ limit: 50 });
  return ipos.map((i) => ({ slug: i.slug }));
}

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
    title: `${name} IPO GMP Today, Subscription, Price Band & Review (2026)`,
    description: `Complete ${name} IPO review: Live GMP of ₹${ipo.gmp || 0} (${ipo.gmpPercent || 0}%), price band ₹${ipo.priceMin}–₹${ipo.priceMax}, lot size ${ipo.lotSize || "TBA"} shares, issue size ${ipo.issueSize || "TBA"}, allotment dates, and expert financial analysis.`,
    keywords: [
      `${name.toLowerCase()} ipo`,
      `${name.toLowerCase()} ipo gmp today`,
      `${name.toLowerCase()} ipo review`,
      `${name.toLowerCase()} ipo price band`,
      `${name.toLowerCase()} ipo allotment date`,
      `${name.toLowerCase()} ipo subscription status`,
      `${name.toLowerCase()} ipo lot size`,
      `${name.toLowerCase()} ipo apply or avoid`
    ],
    openGraph: {
      title: `${name} IPO GMP Today & In-Depth Review`,
      description: `Live Grey Market Premium (GMP ₹${ipo.gmp || 0}), price band ₹${ipo.priceMin}–₹${ipo.priceMax}, and step-by-step bidding analysis for ${name} IPO.`,
      url: `${siteConfig.url}/ipo/${ipo.slug}`,
      type: "website",
    },
  };
}

function fmtDate(d?: string) {
  if (!d) return "TBA";
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return d;
  }
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
  const isSme = ipo.type === "sme";
  const board = isSme ? "SME" : "Mainboard";
  const isGmpPositive = (ipo.gmp || 0) > 0;
  const estListing = ipo.priceMax && ipo.gmp ? ipo.priceMax + ipo.gmp : null;
  const estGainPercent = ipo.priceMax && ipo.gmp ? ((ipo.gmp / ipo.priceMax) * 100).toFixed(1) : null;
  const minInvestment = ipo.priceMax && ipo.lotSize ? ipo.priceMax * ipo.lotSize : 0;
  const maxRetailLots = minInvestment > 0 ? Math.floor(200000 / minInvestment) : 1;

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${name} IPO`,
    description: ipo.about || `${name} Initial Public Offering details, live GMP, and prospectus analysis.`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: ipo.priceMin,
      highPrice: ipo.priceMax,
    },
  };

  const faqList = [
    {
      q: `What is the current GMP of ${name} IPO?`,
      a: ipo.gmp > 0
        ? `The Grey Market Premium (GMP) of ${name} IPO is currently quoted at ₹${ipo.gmp} per share (+${estGainPercent}% over cap price of ₹${ipo.priceMax}). Estimated listing price is approximately ₹${estListing}.`
        : `The Grey Market Premium (GMP) of ${name} IPO has not officially opened yet or is currently trading around parity (₹0).`,
    },
    {
      q: `What is the price band and minimum lot size for ${name} IPO?`,
      a: `The price band for ${name} IPO is fixed between ₹${ipo.priceMin} and ₹${ipo.priceMax} per equity share. The minimum application lot size is ${ipo.lotSize} shares, requiring a minimum retail capital outlay of ₹${minInvestment.toLocaleString("en-IN")}.`,
    },
    {
      q: `When does ${name} IPO open and close for public bidding?`,
      a: `${name} IPO bidding opens on ${fmtDate(ipo.openDate)} and closes on ${fmtDate(ipo.closeDate)}. Bids can be submitted between 10:00 AM and 5:00 PM IST via ASBA net banking or UPI mandate.`,
    },
    {
      q: `When will ${name} IPO allotment status be finalized?`,
      a: `The basis of allotment for ${name} IPO is scheduled to be finalized on ${fmtDate(ipo.allotmentDate)}. Successful applicants will have shares credited to their demat account by ${fmtDate(ipo.creditDate || ipo.listingDate)}.`,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-600 flex items-center gap-1">
          <ArrowLeft size={12} /> Home
        </Link>
        <span>/</span>
        <Link href="/ipo/gmp" className="hover:text-emerald-600">
          Live GMP Tracker
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 truncate max-w-xs">{name}</span>
      </nav>

      {/* Hero Overview Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-md text-xs font-bold ${
              isSme
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            }`}>
              {isSme ? "SME IPO" : "Mainboard IPO"}
            </span>
            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
              ipo.status === "open"
                ? "bg-emerald-600 text-white animate-pulse"
                : ipo.status === "upcoming"
                  ? "bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}>
              {ipo.status}
            </span>
          </div>

          <span className="text-xs text-slate-500 flex items-center gap-1">
            Exchange: <strong className="text-slate-800 dark:text-slate-200">{ipo.exchange || "BSE / NSE"}</strong>
          </span>
        </div>

        <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
          {name} IPO Details &amp; Live GMP
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
          {ipo.sector ? `${ipo.sector} Sector · ` : ""}Total Issue Size: <strong className="text-slate-800 dark:text-slate-200">{ipo.issueSize || "TBA"}</strong>
        </p>

        {/* Live GMP & Key Numbers Banner */}
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Live GMP Today
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`font-mono text-3xl font-bold ${isGmpPositive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>
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
                Cap price (₹{ipo.priceMax}) + current GMP
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
              1 Lot ({ipo.lotSize || 0} shares at cut-off)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Full Written Research & Data Tables */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Facts Summary Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText size={18} className="text-emerald-600" />
              <span>{name} IPO Key Facts &amp; Timeline</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Price Band</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.priceMax > 0 ? `₹${ipo.priceMin} – ₹${ipo.priceMax}` : "TBA"}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Lot Size</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.lotSize > 0 ? `${ipo.lotSize} Shares` : "TBA"}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Total Issue Size</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {ipo.issueSize || "TBA"}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Bidding Opens</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {fmtDate(ipo.openDate)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Bidding Closes</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {fmtDate(ipo.closeDate)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block">Allotment Date</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
                  {fmtDate(ipo.allotmentDate)}
                </span>
              </div>
            </div>
          </div>

          {/* In-Depth Written Research Analysis (SEO & Reader Value) */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md mb-2">
                <ShieldCheck size={13} />
                <span>Editorial Research &amp; Prospectus Audit</span>
              </div>
              <h2 className="font-bold text-xl text-slate-900 dark:text-white">
                {name} IPO: Comprehensive Analysis &amp; Investment Overview
              </h2>
            </div>

            {/* Section 1: Business Overview */}
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span>1. Business Model &amp; Operations</span>
              </h3>
              <p>
                <strong>{name}</strong> is {board === "SME" ? "an SME" : "a Mainboard"} public offering in the {ipo.sector || "commercial"} sector, entering the primary capital markets with a total issue size of <strong>{ipo.issueSize || "TBA"}</strong>.
              </p>
              {ipo.about && (
                <p className="mt-2.5 text-slate-600 dark:text-slate-300">
                  {ipo.about}
                </p>
              )}
            </div>

            {/* Section 2: GMP Analysis */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Flame size={16} className="text-emerald-600" />
                <span>2. Grey Market Premium (GMP) &amp; Listing Gain Expectations</span>
              </h3>
              <p>
                As per active unlisted primary market quotes, the <strong>Grey Market Premium (GMP)</strong> for {name} IPO is currently standing at <strong>₹{ipo.gmp || 0}</strong>. With the upper price band set at <strong>₹{ipo.priceMax || 0}</strong>, the implied listing price discovery calculates to <strong>₹{estListing || ipo.priceMax}</strong> per share, pointing to an estimated listing pop of <strong>{estGainPercent ? `+${estGainPercent}%` : "0%"}</strong>.
              </p>
              <p className="text-xs text-slate-500 mt-2.5">
                * Note: Grey market figures represent unorganized sentiment and are subject to market volatility. Real listing day gains depend on institutional QIB subscription numbers on Day 3.
              </p>
            </div>

            {/* Section 3: Bidding Strategy */}
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Clock size={16} className="text-emerald-600" />
                <span>3. Retail Application Strategy &amp; Lot Size Math</span>
              </h3>
              <p>
                Retail investors can bid for a minimum of <strong>1 Lot ({ipo.lotSize} shares)</strong> worth <strong>₹{minInvestment.toLocaleString("en-IN")}</strong>. Under SEBI retail allocation guidelines, retail applicants are capped at a maximum bid value of ₹2,00,000 (translating to up to <strong>{maxRetailLots} lots</strong>).
              </p>
              <p className="mt-2">
                <strong>Pro-Tip:</strong> In heavily oversubscribed public issues, allotment in the retail category is decided via a computerized lottery where every valid application is reduced to 1 lot. Applying for multiple lots from the same PAN does not increase allotment odds. To maximize statistical chances, apply 1 lot each from separate family demat accounts.
              </p>
            </div>

            {/* Section 4: Allotment & Timeline */}
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-emerald-600" />
                <span>4. Critical Timeline: From Bid to Exchange Listing</span>
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Public Bidding Closes:</strong> {fmtDate(ipo.closeDate)} (5:00 PM cut-off for UPI mandate approval).</li>
                <li><strong>Basis of Allotment:</strong> {fmtDate(ipo.allotmentDate)} (Registrar publishes allotment status).</li>
                <li><strong>Refunds / Unblock Funds:</strong> {fmtDate(ipo.refundsDate || ipo.allotmentDate)}.</li>
                <li><strong>Demat Credit of Shares:</strong> {fmtDate(ipo.creditDate || ipo.listingDate)}.</li>
                <li><strong>Official Listing on {ipo.exchange || "BSE / NSE"}:</strong> {fmtDate(ipo.listingDate)}.</li>
              </ul>
            </div>
          </div>

          {/* Frequently Asked Questions (Structured FAQs) */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <HelpCircle size={20} className="text-emerald-600" />
              <span>Frequently Asked Questions (FAQs)</span>
            </h2>
            <div className="space-y-4">
              {faqList.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1.5">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Key Actions & Disclaimers */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
              Primary Market Quick Actions
            </h3>
            <div className="space-y-3 text-xs">
              <Link
                href="/ipo/gmp"
                className="block w-full text-center rounded-xl bg-emerald-600 text-white py-2.5 font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Track Live GMP Today
              </Link>
              <Link
                href="/category/IPO%20Review"
                className="block w-full text-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2.5 font-semibold hover:border-emerald-500 transition-colors"
              >
                Read Other Prospectus Reviews
              </Link>
              <Link
                href="/category/Guide"
                className="block w-full text-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2.5 font-semibold hover:border-emerald-500 transition-colors"
              >
                IPO Tax &amp; Bidding Playbooks
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <AlertCircle size={14} className="text-amber-600" />
              <span>Non-Advisory Disclaimer</span>
            </p>
            <p className="leading-relaxed">
              * Info is indicative, not an investment advice. Equity investments and IPO subscriptions carry financial market risks. Please read the official Red Herring Prospectus (RHP) before bidding.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
