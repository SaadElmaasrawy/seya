import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("seya_auth")?.value;

    let isValidSession = false;
    if (token) {
        try {
            isValidSession = !!(await verifyToken(token));
        } catch (e) {
            console.error("Proxy: Token verification crashed", e);
        }
    }

    // Handle authentication redirects
    // We check both raw and localized paths
    const isChatPath = pathname.match(/^\/(?:en|ar)?\/?chat/);
    const isAuthPath = pathname.match(/^\/(?:en|ar)?\/?auth/);

    if (isChatPath && !isValidSession) {
        // Redirect to landing page (locale-aware if possible, but "/" works with next-intl)
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (isAuthPath && isValidSession) {
        return NextResponse.redirect(new URL("/chat", req.url));
    }

    // Run internationalization middleware for all other cases
    return intlMiddleware(req);
}

export const config = {
    // Match all pathnames except for
    // - /api routes
    // - /_next (Next.js internals)
    // - /_static (inside /public)
    // - all root files inside /public (e.g. /favicon.ico)
    matcher: ['/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)']
};
