import { NextResponse } from "next/server";
import { fetchPrice } from "~/server/actions/price";

export const dynamic = "force-dynamic";

export async function GET() {
  await fetchPrice();

  return NextResponse.json({
    success: true,
    action: "fetchPrice",
    timestamp: Date.now(),
  });
}
