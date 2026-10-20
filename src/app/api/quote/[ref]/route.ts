import { NextResponse } from "next/server";
import { getQuote } from "@/lib/quote-store";
import { isQuoteReference } from "@/lib/quote-reference";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ref: string }> },
) {
  const { ref } = await params;

  if (!isQuoteReference(ref)) {
    return NextResponse.json({ error: "Malformed reference" }, { status: 400 });
  }

  const quote = await getQuote(ref);

  if (!quote) {
    return NextResponse.json(
      {
        error: "Quote not found",
        reference: ref,
        hint: "References are kept for 120 days. Contact us on WhatsApp if you need it resent.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ quote });
}
