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
  sector?: string;
  about?: string;
  rhpUrl?: string;
  drhpUrl?: string;
}

export const FALLBACK_IPOS: Ipo[] = [
  {
    id: "deepa-jewellers-ipo",
    slug: "deepa-jewellers-ipo",
    name: "Deepa Jewellers",
    companyName: "Deepa Jewellers Limited",
    type: "mainboard",
    status: "open",
    priceMin: 168,
    priceMax: 177,
    lotSize: 84,
    issueSize: "₹459.72 Cr",
    openDate: "2026-09-01",
    closeDate: "2026-09-03",
    allotmentDate: "2026-09-04",
    listingDate: "2026-09-08",
    gmp: 44,
    gmpPercent: 24.8,
    gmpLastHeard: "01 Sep, 06:12 PM",
    gmpHistory: [30, 35, 38, 42, 44],
    exchange: "BSE, NSE",
    sector: "Gems & Jewellery",
    about: "Deepa Jewellers is an established jewellery retailer and manufacturer with retail showrooms across major urban hubs in India.",
  },
  {
    id: "priority-jewels-ipo",
    slug: "priority-jewels-ipo",
    name: "Priority Jewels",
    companyName: "Priority Jewels Limited",
    type: "sme",
    status: "open",
    priceMin: 80,
    priceMax: 84,
    lotSize: 1600,
    issueSize: "₹21.50 Cr",
    openDate: "2026-09-01",
    closeDate: "2026-09-03",
    allotmentDate: "2026-09-04",
    listingDate: "2026-09-08",
    gmp: 28,
    gmpPercent: 33.3,
    gmpLastHeard: "01 Sep, 05:45 PM",
    gmpHistory: [15, 20, 24, 28],
    exchange: "BSE SME",
    sector: "Gems & Jewellery",
    about: "Priority Jewels is a specialized diamond and gold jewellery manufacturer serving boutique luxury retailers.",
  },
  {
    id: "rays-of-belief-ipo",
    slug: "rays-of-belief-ipo",
    name: "Rays of Belief",
    companyName: "Rays of Belief Limited",
    type: "mainboard",
    status: "open",
    priceMin: 215,
    priceMax: 226,
    lotSize: 66,
    issueSize: "₹380.00 Cr",
    openDate: "2026-09-01",
    closeDate: "2026-09-03",
    allotmentDate: "2026-09-04",
    listingDate: "2026-09-08",
    gmp: 52,
    gmpPercent: 23.0,
    gmpLastHeard: "01 Sep, 04:30 PM",
    gmpHistory: [35, 42, 48, 52],
    exchange: "BSE, NSE",
    sector: "Renewable Energy",
    about: "Rays of Belief provides end-to-end solar EPC solutions and commercial rooftop solar installations across India.",
  },
  {
    id: "nse-ipo",
    slug: "nse-ipo",
    name: "National Stock Exchange (NSE)",
    companyName: "National Stock Exchange of India Limited",
    type: "mainboard",
    status: "upcoming",
    priceMin: 5500,
    priceMax: 6200,
    lotSize: 15,
    issueSize: "₹10,000+ Cr",
    openDate: "2026-10-15",
    closeDate: "2026-10-18",
    allotmentDate: "2026-10-20",
    listingDate: "2026-10-24",
    gmp: 1250,
    gmpPercent: 20.2,
    gmpLastHeard: "02 Sep, 11:30 AM",
    gmpHistory: [900, 1050, 1150, 1250],
    exchange: "BSE",
    sector: "Financial Market Infrastructure",
    about: "NSE is India's leading stock exchange and the world's largest derivatives exchange by contract volume.",
  },
  {
    id: "cult-fit-ipo",
    slug: "cult-fit-ipo",
    name: "Cult.fit (Curefit)",
    companyName: "Curefit Healthcare Private Limited",
    type: "mainboard",
    status: "upcoming",
    priceMin: 420,
    priceMax: 450,
    lotSize: 33,
    issueSize: "₹2,250 Cr",
    openDate: "2026-10-22",
    closeDate: "2026-10-25",
    allotmentDate: "2026-10-27",
    listingDate: "2026-10-31",
    gmp: 85,
    gmpPercent: 18.9,
    gmpLastHeard: "02 Sep, 12:00 PM",
    gmpHistory: [60, 70, 78, 85],
    exchange: "BSE, NSE",
    sector: "Consumer Health & Fitness",
    about: "Cult.fit is India's premier fitness and gym aggregator platform founded by Mukesh Bansal with backing from Tata Digital and Hrithik Roshan.",
  },
  {
    id: "ather-energy-ipo",
    slug: "ather-energy-ipo",
    name: "Ather Energy",
    companyName: "Ather Energy Limited",
    type: "mainboard",
    status: "upcoming",
    priceMin: 340,
    priceMax: 360,
    lotSize: 40,
    issueSize: "₹3,100 Cr",
    openDate: "2026-09-20",
    closeDate: "2026-09-23",
    allotmentDate: "2026-09-24",
    listingDate: "2026-09-28",
    gmp: 75,
    gmpPercent: 20.8,
    gmpLastHeard: "02 Sep, 10:00 AM",
    gmpHistory: [45, 55, 65, 75],
    exchange: "BSE, NSE",
    sector: "Electric Vehicles (EV)",
    about: "Ather Energy is one of India's leading intelligent electric two-wheeler manufacturers backed by Hero MotoCorp.",
  },
  {
    id: "tata-passenger-electric-mobility-ipo",
    slug: "tata-passenger-electric-mobility-ipo",
    name: "Tata EV (TPEM)",
    companyName: "Tata Passenger Electric Mobility Limited",
    type: "mainboard",
    status: "upcoming",
    priceMin: 650,
    priceMax: 700,
    lotSize: 20,
    issueSize: "₹7,500 Cr",
    openDate: "2026-11-05",
    closeDate: "2026-11-08",
    allotmentDate: "2026-11-10",
    listingDate: "2026-11-14",
    gmp: 160,
    gmpPercent: 22.8,
    gmpLastHeard: "02 Sep, 02:00 PM",
    gmpHistory: [110, 130, 145, 160],
    exchange: "BSE, NSE",
    sector: "Electric Vehicles (EV)",
    about: "Tata Motors EV subsidiary commanding over 65% market share in the Indian passenger electric vehicle market.",
  },
  {
    id: "urban-company-ipo",
    slug: "urban-company-ipo",
    name: "Urban Company",
    companyName: "Urban Company Limited",
    type: "mainboard",
    status: "upcoming",
    priceMin: 280,
    priceMax: 300,
    lotSize: 50,
    issueSize: "₹1,800 Cr",
    openDate: "2026-10-01",
    closeDate: "2026-10-04",
    allotmentDate: "2026-10-06",
    listingDate: "2026-10-10",
    gmp: 65,
    gmpPercent: 21.7,
    gmpLastHeard: "02 Sep, 01:15 PM",
    gmpHistory: [40, 50, 58, 65],
    exchange: "BSE, NSE",
    sector: "Home Services Tech",
    about: "India's largest home services marketplace offering beauty, cleaning, and appliance repair services.",
  },
  {
    id: "swiggy-ipo",
    slug: "swiggy-ipo",
    name: "Swiggy",
    companyName: "Swiggy Limited",
    type: "mainboard",
    status: "listed",
    priceMin: 371,
    priceMax: 390,
    lotSize: 38,
    issueSize: "₹11,327 Cr",
    openDate: "2024-11-06",
    closeDate: "2024-11-08",
    allotmentDate: "2024-11-11",
    listingDate: "2024-11-13",
    gmp: 25,
    gmpPercent: 6.4,
    listingPrice: 420,
    currentPrice: 485,
    exchange: "BSE, NSE",
    sector: "Quick Commerce & Food Delivery",
    about: "India's pioneering hyperlocal commerce platform operating food delivery and Instamart quick commerce.",
  },
  {
    id: "hyundai-motor-india-ipo",
    slug: "hyundai-motor-india-ipo",
    name: "Hyundai Motor India",
    companyName: "Hyundai Motor India Limited",
    type: "mainboard",
    status: "listed",
    priceMin: 1865,
    priceMax: 1960,
    lotSize: 7,
    issueSize: "₹27,870 Cr",
    openDate: "2024-10-15",
    closeDate: "2024-10-17",
    allotmentDate: "2024-10-18",
    listingDate: "2024-10-22",
    gmp: 65,
    gmpPercent: 3.3,
    listingPrice: 1934,
    currentPrice: 2010,
    exchange: "BSE, NSE",
    sector: "Automobiles",
    about: "India's second-largest passenger vehicle manufacturer with popular models including Creta, Venue, and i20.",
  }
];

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
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      let rawList: Ipo[] = [];
      if (Array.isArray(data)) rawList = data;
      else if (data && Array.isArray(data.items)) rawList = data.items;
      else if (data && Array.isArray(data.ipos)) rawList = data.ipos;

      if (rawList.length > 0) {
        return { ipos: rawList, total: data.total || rawList.length };
      }
    }
  } catch {
    // API down or unreachable -> use rich fallback
  }

  // Filter fallback data
  let filtered = [...FALLBACK_IPOS];
  if (params?.status) {
    filtered = filtered.filter((i) => i.status === params.status);
  }
  if (params?.type && params.type !== "all") {
    filtered = filtered.filter((i) => i.type === params.type);
  }
  if (params?.limit) {
    filtered = filtered.slice(0, params.limit);
  }

  return { ipos: filtered, total: filtered.length };
}

export async function fetchLiveIpoBySlug(slug: string): Promise<Ipo | null> {
  try {
    const res = await fetch(`${API_BASE}/api/ipos/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data && data.slug) return data;
    }
  } catch {
    // Fallback
  }

  const found = FALLBACK_IPOS.find((i) => i.slug === slug);
  return found || null;
}

export async function fetchLivePosts(): Promise<PostContent[]> {
  try {
    const res = await fetch(`${API_BASE}/api/blog/posts`, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // Fallback
  }
  return staticPosts;
}

export async function fetchLivePostBySlug(slug: string): Promise<PostContent | undefined> {
  try {
    const res = await fetch(`${API_BASE}/api/blog/posts/${slug}`, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      if (data && data.slug) return data;
    }
  } catch {
    // Fallback
  }
  return staticPosts.find((p) => p.slug === slug);
}
