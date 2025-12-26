import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 400 });
        }

        const db = await getDb();
        const users = db.collection("users");

        // Find user with this token
        const user = await users.findOne({ verificationToken: token });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Verify and clear token
        await users.updateOne(
            { _id: user._id },
            {
                $set: { emailVerified: true },
                $unset: { verificationToken: "" }
            }
        );

        // Redirect to login with success message
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        return NextResponse.redirect(`${baseUrl}/en/auth/login?verified=true`);

    } catch (e) {
        console.error("Verification Error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
