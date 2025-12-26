import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { hashPassword, authCookie, signToken } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    console.log("📝 Register API: Starting registration process");
    const body = await req.json();
    console.log("📝 Register API: Request body received");

    // 1. Zod Validation
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      console.log("❌ Register API: Validation failed", validation.error.issues);
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    console.log("✅ Register API: Validation passed");

    const { email, password, name } = validation.data;

    console.log("🔌 Register API: Connecting to MongoDB...");
    const db = await getDb();
    console.log("✅ Register API: MongoDB connected");

    const users = db.collection("users");

    // 2. Check Exists
    console.log("🔍 Register API: Checking if email exists:", email);
    const existing = await users.findOne({ email });
    if (existing) {
      console.log("❌ Register API: Email already exists");
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    console.log("✅ Register API: Email is available");

    // 3. New User Object
    console.log("🔐 Register API: Hashing password...");
    const passwordHash = await hashPassword(password);
    console.log("✅ Register API: Password hashed");

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = {
      email,
      passwordHash,
      name,
      subscriptionStatus: 'free',
      messageCount: 0,
      maxMessages: 50,
      createdAt: new Date(),
      emailVerified: false,
      verificationToken,
    };

    console.log("💾 Register API: Inserting user into database...");
    const { insertedId } = await users.insertOne(user);
    console.log("✅ Register API: User inserted with ID:", insertedId);

    // 4. Send Verification Email
    console.log("📧 Register API: Sending verification email...");
    await sendVerificationEmail(email, verificationToken);
    console.log("✅ Register API: Verification email sent");

    // 5. Sign Token
    console.log("🔑 Register API: Signing JWT token...");
    const token = await signToken({ uid: insertedId.toString(), email });
    console.log("✅ Register API: JWT token signed");

    const res = NextResponse.json({ id: insertedId, email, message: "Registered. Please verify your email." });
    res.cookies.set(authCookie.name, token, authCookie.options);
    console.log("🎉 Register API: Registration completed successfully");
    return res;
  } catch (e: unknown) {
    const error = e as Error;
    console.error("❌❌❌ Register API Error - FULL DETAILS ❌❌❌");
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    console.error("Full error object:", JSON.stringify(e, null, 2));
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}