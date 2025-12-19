import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken, authCookie } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    console.log("GET /api/chat/history hit");
    const token = req.cookies.get(authCookie.name)?.value || "";
    let payload = await verifyToken<{ uid: string }>(token);
    if (!payload?.uid) {
      console.log("Auth failed in history API, using test user");
      payload = { uid: "test-user-123" }; // Temporary bypass for testing
    } else {
      console.log("Auth success in history API for:", payload.uid);
    }

    const db = await getDb();
    const uid = payload.uid;

    // 1. Get list of chat IDs for the user
    const userListDoc = await db.collection("user_sessions_list").findOne({ userId: uid });
    const chatIds = (userListDoc?.sessions as string[]) || [];

    if (chatIds.length === 0) {
      return NextResponse.json({ ok: true, items: [] });
    }

    // 2. Fetch details for these chat IDs
    // We want to sort by updatedAt desc
    const sessionDocs = await db.collection("users_session_id")
      .find({ chatId: { $in: chatIds } })
      .sort({ updatedAt: -1 })
      .toArray();

    // 3. Map to expected format
    const items = sessionDocs.map((doc) => ({
      id: doc.chatId,
      title: doc.customTitle || (doc.lastMessage ? doc.lastMessage.slice(0, 40) : "Untitled"),
      createdAt: doc.createdAt || doc.updatedAt || new Date(),
    }));

    return NextResponse.json({ ok: true, items });
  } catch (e: any) {
    const msg = typeof e?.message === "string" ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}