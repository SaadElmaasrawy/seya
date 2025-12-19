import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken, authCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
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
        const { chatId, title } = body || {};

        if (!chatId || !title) {
            return NextResponse.json({ error: "Missing chatId or title" }, { status: 400 });
        }

        const db = await getDb();
        const collection = db.collection("users_session_id");

        // Verify ownership (optional but recommended, though chatId is UUID)
        // For now, just update based on chatId as it's unique enough and we checked auth
        const result = await collection.updateOne(
            { chatId, userId: payload.uid },
            { $set: { customTitle: title } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Chat not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ message: "Chat renamed successfully" });
    } catch (e) {
        console.error("Rename chat error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
