import { NextResponse } from "next/server";
import { syncPrice } from "~/server/actions/price";

export const dynamic = "force-dynamic";

export async function GET() {
  await syncPrice();

  return NextResponse.json({
    success: true,
    action: "fetchPrice",
    timestamp: Date.now(),
  });
}
