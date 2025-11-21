import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { hashPassword, authCookie, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = body || {};

    if (typeof email !== "string" || typeof password !== "string" || typeof name !== "string" || !email || !password || !name) {
      return NextResponse.json({ error: "Invalid email, password, or name" }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = { email, passwordHash, name, createdAt: new Date() };
    const { insertedId } = await users.insertOne(user);

    const token = await signToken({ uid: insertedId.toString(), email });
    const res = NextResponse.json({ id: insertedId, email });
    res.cookies.set(authCookie.name, token, authCookie.options);
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}