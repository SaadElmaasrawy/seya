import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body || {};

        if (typeof email !== "string" || !email) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        const db = await getDb();
        const users = db.collection("users");
        const user = await users.findOne({ email });

        if (!user) {
            // Return success even if user not found to prevent enumeration
            return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
        }

        const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

        const resets = db.collection("password_resets");
        await resets.insertOne({ email, token, expiresAt });

        console.log(`[MOCK EMAIL SERVICE] Password reset link for ${email}: http://localhost:3000/auth/reset-password?token=${token}`);

        return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
    } catch (e) {
        console.error("Forgot password error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
