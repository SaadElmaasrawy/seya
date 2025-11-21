import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken, authCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(authCookie.name)?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken<{ uid: string }>(token);
    if (!payload?.uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = await getDb();
    const cols = await db.listCollections({}, { nameOnly: true }).toArray();
    const names = cols.map((c: any) => String(c.name)).filter(Boolean);

    return NextResponse.json({ ok: true, collections: names });
  } catch (e: any) {
    const msg = typeof e?.message === "string" ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}