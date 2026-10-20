import type { QuoteInput } from "@/lib/validations";

export type StoredQuote = {
  reference: string;
  createdAt: string;
  status: "received" | "assessed" | "scheduled";
  propertyType: QuoteInput["propertyType"];
  monthlyBill: number;
  county: string;
  facilitySize: string;
  contactMethod: QuoteInput["contactMethod"];
  name: string;
  email: string;
  phone: string;
  notes?: string;
  estimatedSystemSizeKw: number;
  estimatedCostKes: number;
  estimatedMonthlySavingKes: number;
};

const globalStore = globalThis as unknown as {
  __elishaQuotes?: Map<string, StoredQuote>;
};

const memoryStore: Map<string, StoredQuote> =
  globalStore.__elishaQuotes ?? new Map<string, StoredQuote>();
globalStore.__elishaQuotes = memoryStore;

function hasKvConfig(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvClient() {
  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function saveQuote(quote: StoredQuote): Promise<void> {
  memoryStore.set(quote.reference, quote);
  if (!hasKvConfig()) return;

  try {
    const kv = await kvClient();
    await kv.set(`quote:${quote.reference}`, JSON.stringify(quote), { ex: 60 * 60 * 24 * 120 });
  } catch (error) {
    console.error("KV quote write failed, kept in memory only", error);
  }
}

export async function getQuote(reference: string): Promise<StoredQuote | undefined> {
  const cached = memoryStore.get(reference);
  if (cached) return cached;
  if (!hasKvConfig()) return undefined;

  try {
    const kv = await kvClient();
    const raw = await kv.get<string>(`quote:${reference}`);
    if (!raw) return undefined;
    const parsed =
      typeof raw === "string" ? (JSON.parse(raw) as StoredQuote) : (raw as StoredQuote);
    memoryStore.set(parsed.reference, parsed);
    return parsed;
  } catch (error) {
    console.error("KV quote read failed", error);
    return undefined;
  }
}
