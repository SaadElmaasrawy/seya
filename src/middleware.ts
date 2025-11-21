import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

console.log("Middleware file loaded/evaluated");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("seya_auth")?.value;

  let isValidSession = false;
  if (token) {
    try {
      isValidSession = !!(await verifyToken(token));
      console.log(`Middleware: Token present. Valid? ${isValidSession}`);
    } catch (e) {
      console.error("Middleware: Token verification crashed", e);
    }
  } else {
    console.log("Middleware: No token found");
  }

  if (pathname === "/") {
    if (isValidSession) return NextResponse.redirect(new URL("/chat", req.url));
    return NextResponse.next();
  }

  if (pathname.startsWith("/chat")) {
    if (!isValidSession) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (pathname.startsWith("/auth")) {
    if (isValidSession) return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/chat", "/auth/:path*"],
};