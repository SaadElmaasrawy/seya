"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/chat";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push(nextUrl);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="layout-content-container flex flex-col max-w-[480px] w-full">
      <h1 className="text-off-white text-2xl font-bold mb-4">Log In</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 bg-card-dark border border-border-dark rounded-xl p-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-border-dark bg-[#1E1E24] px-4 py-3 text-off-white placeholder:text-text-muted-dark focus:outline-none focus:border-primary"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-border-dark bg-[#1E1E24] px-4 py-3 text-off-white placeholder:text-text-muted-dark focus:outline-none focus:border-primary"
          required
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button disabled={loading} className="flex w-full items-center justify-center rounded-lg h-11 px-4 bg-[#007BFF] text-white font-bold hover:bg-blue-600 disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#007BFF]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 w-[800px] h-[800px] bg-[#8A2BE2]/20 blur-3xl rounded-full"></div>
      </div>
      <Header />
      <div className="layout-container flex grow flex-col">
        <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-10">
          <Suspense fallback={<div className="text-off-white">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}