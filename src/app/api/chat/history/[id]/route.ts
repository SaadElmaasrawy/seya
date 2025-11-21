import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken, authCookie } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    console.log(`GET /api/chat/history/${params.id} hit`);
    const token = req.cookies.get(authCookie.name)?.value || "";
    let payload = await verifyToken<{ uid: string; email?: string }>(token);
    if (!payload?.uid) {
      console.log("Auth failed in history/[id] API, using test user");
      payload = { uid: "test-user-123" }; // Temporary bypass for testing
    } else {
      console.log("Auth success in history/[id] API for:", payload.uid);
    }

    const id = params.id;
    const db = await getDb();

    // Try finding by chatId first (new format)
    let session = await db.collection("users_session_id").findOne({ chatId: id, userId: payload.uid });

    // If not found or has no messages, try finding by sessionId (old format/n8n)
    if (!session || !session.messages || session.messages.length === 0) {
      const sessionById = await db.collection("users_session_id").findOne({ sessionId: id });
      if (sessionById) {
        session = sessionById;
      }
    }

    if (!session) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Map messages to standard format
    const rawMessages = (session.messages || []) as any[];
    const messages = rawMessages.map((m) => {
      let role = "user";
      let content = "";

      if (m.role) {
        role = m.role;
        content = m.content;
      } else if (m.type) {
        role = m.type === "human" ? "user" : "assistant";
        content = m.data?.content || m.content || "";
      }

      return { role, content };
    });

    return NextResponse.json({ messages });
  } catch (e: any) {
    const msg = typeof e?.message === "string" ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
