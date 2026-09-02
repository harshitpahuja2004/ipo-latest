import type { PostContent } from "./posts";
import { posts as staticPosts } from "./posts";

export interface Ipo {
  id: string;
  slug: string;
  name: string;
  companyName: string;
  symbol?: string;
  type: "mainboard" | "sme";
  status: "open" | "upcoming" | "closed" | "listed";
  priceMin: number;
  priceMax: number;
  issuePrice?: number;
  lotSize: number;
  issueSize: string;
  freshIssue?: string;
  ofs?: string;
  retailQuota?: number;
  qibQuota?: number;
  niiQuota?: number;
  openDate?: string;
  closeDate?: string;
  allotmentDate?: string;
  refundsDate?: string;
  creditDate?: string;
  listingDate?: string;
  gmp: number;
  gmpPercent: number;
  gmpLastHeard?: string;
  gmpHistory?: number[];
  listingPrice?: number;
  currentPrice?: number;
  exchange?: string;
  leadManagers?: string[];
  sector?: string;
  about?: string;
  logo?: string;
  subscription?: Array<{ category: string; sharesOffered: number; sharesBid: number; timesSubscribed: number }>;
  financials?: Array<{ year: string; revenue: number; expense?: number; pat: number; netWorth?: number; totalAssets?: number }>;
  rhpUrl?: string;
  drhpUrl?: string;
  allotmentUrl?: string;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "https://api.iposathi.com").replace(/\/$/, "");

export async function fetchLiveIpos(params?: {
  status?: string;
  type?: string;
  limit?: number;
  page?: number;
}): Promise<{ ipos: Ipo[]; total: number }> {
  try {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.type) qs.set("type", params.type);
    if (params?.limit) qs.set("limit", String(params.limit));
    if (params?.page) qs.set("page", String(params.page));

    const url = `${API_BASE}/api/ipos${qs.toString() ? `?${qs.toString()}` : ""}`;
    const res = await fetch(url, { next: { revalidate: 120 } });
    if (!res.ok) return { ipos: [], total: 0 };
    const data = await res.json();
    if (Array.isArray(data)) return { ipos: data, total: data.length };
    if (data && Array.isArray(data.items)) return { ipos: data.items, total: data.total || data.items.length };
    if (data && Array.isArray(data.ipos)) return { ipos: data.ipos, total: data.total || data.ipos.length };
    return { ipos: [], total: 0 };
  } catch {
    return { ipos: [], total: 0 };
  }
}

export async function fetchLiveIpoBySlug(slug: string): Promise<Ipo | null> {
  try {
    const res = await fetch(`${API_BASE}/api/ipos/${slug}`, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.slug ? data : null;
  } catch {
    return null;
  }
}

export async function fetchLivePosts(): Promise<PostContent[]> {
  try {
    const res = await fetch(`${API_BASE}/api/blog/posts`, { next: { revalidate: 300 } });
    if (!res.ok) return staticPosts;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return staticPosts;
  } catch {
    return staticPosts;
  }
}

export async function fetchLivePostBySlug(slug: string): Promise<PostContent | undefined> {
  try {
    const res = await fetch(`${API_BASE}/api/blog/posts/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return staticPosts.find((p) => p.slug === slug);
    const data = await res.json();
    if (data && data.slug) return data;
    return staticPosts.find((p) => p.slug === slug);
  } catch {
    return staticPosts.find((p) => p.slug === slug);
  }
}
