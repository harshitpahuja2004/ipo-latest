import { siteConfig } from "@/lib/site-config";

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
      <h1 className="font-bold text-3xl text-slate-900 dark:text-white mb-6">Financial Disclaimer</h1>
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 mb-6 text-amber-900 dark:text-amber-200 font-medium">
        Important Notice: {siteConfig.name} is NOT a SEBI-registered Research Analyst or Investment Adviser.
      </div>
      <div className="space-y-4">
        <p>
          No content published anywhere on {siteConfig.domain} should be construed as investment advice, financial planning guidance, or an endorsement to participate in any Initial Public Offering (IPO) or secondary equity trade.
        </p>
        <p>
          Equity investments and IPO bidding carry substantial financial risk, including potential loss of principal capital. Readers must conduct independent due diligence and consult a licensed financial advisor.
        </p>
      </div>
    </div>
  );
}
