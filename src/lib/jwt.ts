import { SignJWT, jwtVerify, JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only";

if (!JWT_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("Missing JWT_SECRET in environment");
}

const secret = new TextEncoder().encode(JWT_SECRET);
console.log("JWT_SECRET defined:", !!JWT_SECRET, "Length:", JWT_SECRET?.length);

export async function signToken(payload: JWTPayload, expiresIn = "7d") {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(expiresIn)
        .sign(secret);
}

export async function verifyToken<T = unknown>(token: string | undefined): Promise<T | null> {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as T;
    } catch (error: unknown) {
        const err = error as { code?: string };
        if (err?.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
            console.warn("JWT Signature mismatch (clearing session likely needed)");
        } else {
            console.error("JWT Verification Error (full):", error);
        }
        return null;
    }
}

export const authCookie = {
    name: "seya_auth",
    options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    },
};
