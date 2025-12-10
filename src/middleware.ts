import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

console.log("Middleware file loaded/evaluated");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("seya_auth")?.value;

  let isValidSession = false;
  console.log(`Middleware: checking path ${pathname}`);
  
  if (token) {
    try {
      const payload = await verifyToken(token);
      isValidSession = !!payload;
      console.log(`Middleware: Token present. Valid? ${isValidSession}. Payload:`, payload ? "OK" : "NULL");
    } catch (e) {
      console.error("Middleware: Token verification crashed", e);
    }
  } else {
    console.log("Middleware: No token found in cookies");
    console.log("Cookies available:", req.cookies.getAll().map(c => c.name).join(", "));
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