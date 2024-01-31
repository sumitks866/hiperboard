import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./utils/validateToken";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");
  const { pathname } = request.nextUrl;
  const originalUrl = request.nextUrl.clone();

  if (["/", "/login", "/signup"].includes(pathname)) return NextResponse.next();

  const isValidToken = jwt?.value ? await validateToken(jwt.value) : false;

  if (isValidToken) {
    return NextResponse.next();
  } else {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirectUri", originalUrl.toString());
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/((?!_next|login|signup|icons8-google-color|logobanner200px.png).*)(.+)",
  ],
};
