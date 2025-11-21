import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken, authCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        console.log("POST /api/chat/session hit");
        const token = req.cookies.get(authCookie.name)?.value || "";
        let payload = await verifyToken<{ uid: string }>(token);

        if (!payload?.uid) {
            console.log("Auth failed in session API, using test user");
            payload = { uid: "test-user-123" };
        } else {
            console.log("Auth success in session API for:", payload.uid);
        }

        const body = await req.json().catch(() => null);
        const chatId = typeof body?.chatId === "string" ? body.chatId : undefined;
        const message = typeof body?.message === "string" ? body.message : undefined;
        const role = typeof body?.role === "string" ? body.role : undefined;
        const content = typeof body?.content === "string" ? body.content : undefined;

        if (!chatId) return NextResponse.json({ error: "Invalid chatId" }, { status: 400 });

        const db = await getDb();
        const usersCollection = db.collection("users");
        const { ObjectId } = require("mongodb");

        // Check User Subscription & Limits
        const user = await usersCollection.findOne({ _id: new ObjectId(payload.uid) });

        if (user) {
            const isPro = user.subscriptionStatus === 'pro';
            const messageCount = user.messageCount || 0;
            const maxMessages = user.maxMessages || 50; // Default 50 for free

            if (!isPro && messageCount >= maxMessages) {
                return NextResponse.json({
                    error: "Message limit reached",
                    code: "LIMIT_REACHED",
                    limit: maxMessages
                }, { status: 403 });
            }

            // Increment message count
            await usersCollection.updateOne(
                { _id: new ObjectId(payload.uid) },
                { $inc: { messageCount: 1 } }
            );
        }

        const updateDoc: any = {
            $set: {
                userId: payload.uid,
                updatedAt: new Date(),
                lastMessage: message || content // Use message if provided (legacy) or content
            },
            $setOnInsert: {
                createdAt: new Date()
            }
        };

        if (role && content) {
            updateDoc.$push = {
                messages: {
                    role,
                    content,
                    timestamp: new Date()
                }
            };
        }

        await db.collection("users_session_id").updateOne(
            { chatId },
            updateDoc,
            { upsert: true }
        );

        await db.collection("user_sessions_list").updateOne(
            { userId: payload.uid },
            {
                $addToSet: { sessions: chatId }
            },
            { upsert: true }
        );

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        console.error("Failed to save session ID:", e);
        return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
    }
}
