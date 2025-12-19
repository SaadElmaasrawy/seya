import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload: object, expiresIn = "7d") {
    return new SignJWT(payload as any)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(expiresIn)
        .sign(secret);
}

export async function verifyToken<T = any>(token: string | undefined): Promise<T | null> {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as T;
    } catch (error) {
        console.error("JWT Verification Error:", error);
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
