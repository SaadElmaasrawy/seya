import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken, authCookie } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
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
        const { chatId } = body || {};

        if (!chatId) {
            return NextResponse.json({ error: "Missing chatId" }, { status: 400 });
        }

        const db = await getDb();

        // 1. Remove from user_sessions_list
        await db.collection("user_sessions_list").updateOne(
            { userId: payload.uid },
            { $pull: { sessions: chatId } as any }
        );

        // 2. Delete from users_session_id
        const result = await db.collection("users_session_id").deleteOne({ chatId, userId: payload.uid });

        if (result.deletedCount === 0) {
            // It might have been already deleted or doesn't exist, but we successfully removed it from the list if it was there.
            // Or maybe the user doesn't own it.
            // We can just return success.
        }

        return NextResponse.json({ message: "Chat deleted successfully" });
    } catch (e) {
        console.error("Delete chat error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
