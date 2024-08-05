import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname === "/") {
    console.log(response.cookies.getAll());

    response.cookies.delete("providerId");
    response.cookies.delete("locationId");
  }

  return response;
}
