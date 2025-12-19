import { NextResponse } from "next/server";
import { authCookie } from "@/lib/auth";

export async function POST() {
    const res = NextResponse.json({ success: true });
    res.cookies.delete(authCookie.name);
    return res;
}
