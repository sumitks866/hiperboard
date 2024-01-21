import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./utils/validateToken";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");
  const { url } = request;

  // if (
  //   request.nextUrl.pathname == "/login" ||
  //   request.nextUrl.pathname == "/signup"
  // )
  //   return NextResponse.next();

  if (jwt?.value) {
    if (await validateToken(jwt.value)) {
      //
    } else {
      return NextResponse.redirect(new URL("/login", url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", url));
  }

  //   return response;
}

export const config = {
  matcher: ["/home", "/projects/:path*", "/taks/:path*"],
};
