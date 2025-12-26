import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken, authCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get(authCookie.name)?.value;
        const payload = await verifyToken<{ uid: string }>(token);
        if (!payload?.uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await getDb();
        const identities = await db.collection("identities")
            .find({ userId: payload.uid })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(identities);
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get(authCookie.name)?.value;
        const payload = await verifyToken<{ uid: string }>(token);
        if (!payload?.uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, description } = body;

        if (!title || !description) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection("identities").insertOne({
            userId: payload.uid,
            title,
            description,
            createdAt: new Date()
        });

        return NextResponse.json({
            _id: result.insertedId,
            userId: payload.uid,
            title,
            description,
            createdAt: new Date()
        });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
