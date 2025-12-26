import { NextRequest, NextResponse } from "next/server";
import { verifyToken, authCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(authCookie.name)?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 200 });
  const payload = await verifyToken<{ uid: string; email: string }>(token);
  if (!payload) {
    const response = NextResponse.json({ authenticated: false }, { status: 200 });
    response.cookies.delete(authCookie.name);
    return response;
  }
  return NextResponse.json({ authenticated: true, user: payload });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(authCookie.name, "", { ...authCookie.options, maxAge: 0 });
  return res;
}