import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

console.log("Proxy file loaded/evaluated");

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("seya_auth")?.value;

    let isValidSession = false;
    if (token) {
        try {
            isValidSession = !!(await verifyToken(token));
            console.log(`Proxy: Token present. Valid? ${isValidSession}`);
        } catch (e) {
            console.error("Proxy: Token verification crashed", e);
        }
    } else {
        console.log("Proxy: No token found");
    }

    if (pathname === "/") {
        // Allow access to landing page even if logged in
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
