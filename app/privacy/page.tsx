import { siteConfig } from "@/lib/site-config";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
      <h1 className="font-bold text-3xl text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
      <p className="text-xs text-slate-400 mb-6">Last Updated: September 2, 2026</p>

      <div className="space-y-5">
        <p>
          This Privacy Policy explains how <strong>{siteConfig.name} ({siteConfig.domain})</strong> collects, uses, and safeguards information when you visit our website.
        </p>

        <h2 className="font-bold text-lg text-slate-900 dark:text-white pt-3">1. Information We Collect</h2>
        <p>
          We do not require user account registration. We collect standard server logs and anonymous browser usage data via Google Analytics to improve reading experience.
        </p>

        <h2 className="font-bold text-lg text-slate-900 dark:text-white pt-3">2. Cookies and Google AdSense</h2>
        <p>
          We use Google AdSense and third-party advertising vendors to serve ads when you visit our website. These companies may use cookies and device identifiers to serve personalized ads based on your visits to this and other websites on the Internet.
        </p>
        <p>
          You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">Google Ads Settings</a>.
        </p>

        <h2 className="font-bold text-lg text-slate-900 dark:text-white pt-3">3. Contact Us</h2>
        <p>
          If you have questions regarding this Privacy Policy, please email <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-600 underline">{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </div>
  );
}
