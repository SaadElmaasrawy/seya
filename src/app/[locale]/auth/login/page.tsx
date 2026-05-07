"use client";
import { useState, Suspense } from "react";
import { useRouter, Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AuthLayout } from "@/components/AuthLayout";
import { MoveRight, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/chat";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();

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
      setError(data.error || t("Login failed"));
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t("Welcome to Seya")}
        </h1>
        <p className="text-text-secondary">
          {t("Login to continue to your AI workspace")}
        </p>
      </div>

      <div className="relative group rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent">
        <form
          onSubmit={onSubmit}
          className="relative flex flex-col gap-5 bg-card-dark/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 shadow-lg"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium text-text-secondary ms-1 block">
                {t("Email")}
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ms-1">
                <label htmlFor="login-password" className="text-sm font-medium text-text-secondary">
                  {t("Password")}
                </label>
                <Link href="/auth/forgot-password" className="text-xs text-text-secondary hover:text-white transition-colors">
                  {t("Forgot password?")}
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors font-medium"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl h-12 bg-primary hover:bg-primary/90 text-white font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {t("Sign In")}
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="text-center text-sm text-text-secondary">
            {t("Don't have an account?")}{" "}
            <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
              {t("Sign Up")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="text-text-secondary text-center p-10">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
