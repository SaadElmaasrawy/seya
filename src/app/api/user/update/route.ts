import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken, authCookie, hashPassword } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
    try {
        const token = req.cookies.get(authCookie.name)?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const payload = await verifyToken(token);
        if (!payload || !payload.uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, email, password } = body || {};

        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            updateData.passwordHash = await hashPassword(password);
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ message: "No changes provided" });
        }

        const db = await getDb();
        const users = db.collection("users");

        await users.updateOne(
            { _id: new ObjectId(payload.uid) },
            { $set: updateData }
        );

        return NextResponse.json({ message: "Profile updated successfully" });
    } catch (e) {
        console.error("Update profile error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
