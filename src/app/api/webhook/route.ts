import { NextRequest, NextResponse } from "next/server";
import { verifyToken, authCookie } from "@/lib/auth";
import https from "https";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

const WEBHOOK_URL = process.env.WEBHOOK_URL || "https://n8n.srv897291.hstgr.cloud/webhook/324ce0eb-2ade-422b-b48b-023c26eaad97";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(authCookie.name)?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken<{ uid: string; email?: string }>(token);
    if (!payload?.uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => null);
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const chatId = typeof body?.chatId === "string" ? body.chatId : undefined;
    if (!message) return NextResponse.json({ error: "Invalid message" }, { status: 400 });

    if (chatId) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        await db.collection("users_session_id").updateOne(
          { chatId },
          {
            $set: {
              userId: payload.uid,
              updatedAt: new Date()
            },
            $setOnInsert: {
              createdAt: new Date()
            }
          },
          { upsert: true }
        );
        console.log(`Saved session ID: ${chatId} for user: ${payload.uid}`);
      } catch (e) {
        console.error("Failed to save session ID:", e);
        // Continue execution even if DB save fails
      }
    }

    let res: Response | null = null;
    try {
      res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ userId: payload.uid, message, chatId }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      res = null;
    }

    if (!res) {
      const fallback = await new Promise<{ status: number; headers: Record<string, string | string[] | undefined>; body: string }>((resolve, reject) => {
        const u = new URL(WEBHOOK_URL);
        const req = https.request(
          {
            protocol: u.protocol,
            hostname: u.hostname,
            port: u.port || (u.protocol === "https:" ? 443 : 80),
            path: u.pathname + (u.search || ""),
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
          },
          (resp) => {
            let data = "";
            resp.on("data", (chunk) => (data += chunk));
            resp.on("end", () => resolve({ status: resp.statusCode || 500, headers: resp.headers as any, body: data }));
          }
        );
        req.on("error", reject);
        req.write(JSON.stringify({ userId: payload.uid, message, chatId }));
        req.end();
      }).catch((e: any) => ({ status: 502, headers: {} as Record<string, string | string[] | undefined>, body: e?.message || "Webhook request failed" }));

      const ct = (fallback.headers["content-type"] as string) || "";
      if (fallback.status >= 200 && fallback.status < 300) {
        if (ct.includes("application/json")) {
          try {
            const json = JSON.parse(fallback.body || "{}");
            const output = typeof (json as any)?.output === "string" ? (json as any).output : JSON.stringify(json ?? {});
            return NextResponse.json({ ok: true, status: fallback.status, body: output });
          } catch {
            return NextResponse.json({ ok: true, status: fallback.status, body: fallback.body });
          }
        }
        return NextResponse.json({ ok: true, status: fallback.status, body: fallback.body });
      }
      if (ct.includes("application/json")) {
        try {
          const errJson = JSON.parse(fallback.body || "{}");
          const errStr = typeof (errJson as any)?.error === "string" ? (errJson as any).error : JSON.stringify(errJson ?? { error: "Webhook error" });
          return NextResponse.json({ ok: false, status: fallback.status, error: errStr }, { status: 502 });
        } catch {
          return NextResponse.json({ ok: false, status: fallback.status, error: fallback.body || "Webhook error" }, { status: 502 });
        }
      }
      return NextResponse.json({ ok: false, status: fallback.status, error: fallback.body || "Webhook error" }, { status: 502 });
    }

    if (!res.ok) {
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const errJson = await res.json().catch(() => null);
        const errStr = typeof errJson?.error === "string" ? errJson.error : JSON.stringify(errJson ?? { error: "Webhook error" });
        return NextResponse.json({ ok: false, status: res.status, error: errStr }, { status: 502 });
      }
      const text = await res.text();
      return NextResponse.json({ ok: false, status: res.status, error: text || "Webhook error" }, { status: 502 });
    }

    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const json = await res.json().catch(() => null);
      const output = typeof json?.output === "string" ? json.output : JSON.stringify(json ?? {});
      return NextResponse.json({ ok: true, status: res.status, body: output });
    }
    const data = await res.text();
    return NextResponse.json({ ok: true, status: res.status, body: data });
  } catch (e: any) {
    const msg = typeof e?.message === "string" ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}