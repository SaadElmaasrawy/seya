import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const db = await getDb();
        const sessions = await db.collection("users_session_id").find({}).toArray();
        const userSessions = await db.collection("user_sessions_list").find({}).toArray();
        const n8nSessions = await db.collection("n8n_chat_histories").find({}).toArray();
        const collections = await db.listCollections().toArray();
        return NextResponse.json({ sessions, userSessions, n8nSessions, collections });
    } catch (e: unknown) {
        const error = e as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
