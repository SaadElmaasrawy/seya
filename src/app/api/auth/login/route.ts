import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyPassword, authCookie, signToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    console.log("🔐 Login API: Starting login process");
    const body = await req.json();
    console.log("🔐 Login API: Request body received");

    // 1. Zod Validation
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      console.log("❌ Login API: Validation failed", validation.error.issues);
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    console.log("✅ Login API: Validation passed");

    const { email, password } = validation.data;

    console.log("🔌 Login API: Connecting to MongoDB...");
    const db = await getDb();
    console.log("✅ Login API: MongoDB connected");

    const users = db.collection("users");

    console.log("🔍 Login API: Finding user:", email);
    const user = await users.findOne<{
      _id: { toString(): string };
      email: string;
      passwordHash: string;
      emailVerified?: boolean;
    }>({ email });

    // 2. Check User & Password
    if (!user) {
      console.log("❌ Login API: User not found");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    console.log("✅ Login API: User found");

    console.log("🔐 Login API: Verifying password...");
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      console.log("❌ Login API: Password verification failed");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    console.log("✅ Login API: Password verified");

    // 3. Check Verification
    if (user.emailVerified === false) {
      console.log("⚠️ Login API: Email not verified");
      return NextResponse.json({
        error: "Please verify your email address first."
      }, { status: 403 });
    }
    console.log("✅ Login API: Email verified");

    console.log("🔑 Login API: Signing JWT token for", email);
    const token = await signToken({ uid: user._id.toString(), email });
    console.log("✅ Login API: JWT token signed successfully");

    const res = NextResponse.json({ email });
    res.cookies.set(authCookie.name, token, authCookie.options);
    console.log("🎉 Login API: Login completed successfully");
    return res;
  } catch (e: unknown) {
    const error = e as Error;
    console.error("❌❌❌ Login API Error - FULL DETAILS ❌❌❌");
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    console.error("Full error object:", JSON.stringify(e, null, 2));
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}