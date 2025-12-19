import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token, password } = body || {};

        if (typeof token !== "string" || typeof password !== "string" || !token || !password) {
            return NextResponse.json({ error: "Invalid token or password" }, { status: 400 });
        }

        const db = await getDb();
        const resets = db.collection("password_resets");

        const resetRequest = await resets.findOne({ token });

        if (!resetRequest) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        if (new Date() > new Date(resetRequest.expiresAt)) {
            return NextResponse.json({ error: "Token expired" }, { status: 400 });
        }

        const users = db.collection("users");
        const passwordHash = await hashPassword(password);

        await users.updateOne(
            { email: resetRequest.email },
            { $set: { passwordHash } }
        );

        await resets.deleteOne({ _id: resetRequest._id });

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (e) {
        console.error("Reset password error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
