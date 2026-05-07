"use client";
import { useState, Suspense } from "react";
import { useRouter, Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AuthLayout } from "@/components/AuthLayout";
import { MoveRight, Loader2 } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/chat";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();

  // Password validation helpers
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasNumberOrSpecial: /[0-9!@#$%^&*]/.test(password),
  };

  const isPasswordValid = passwordRequirements.minLength && passwordRequirements.hasNumberOrSpecial;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t("Passwords do not match"));
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      router.push(nextUrl);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t("Registration failed"));
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t("Sign Up")}
        </h1>
        <p className="text-text-secondary">
          {t("Create an account to get started")}
        </p>
      </div>

      <div className="relative group rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent">
        <form onSubmit={onSubmit} className="relative flex flex-col gap-5 bg-card-dark/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="register-name" className="text-sm font-medium text-text-secondary ms-1 block">
                {t("Name")}
              </label>
              <input
                id="register-name"
                type="text"
                placeholder={t("Name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="register-email" className="text-sm font-medium text-text-secondary ms-1 block">
                {t("Email")}
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="register-password" className="text-sm font-medium text-text-secondary ms-1 block">
                {t("Password")}
              </label>
              <input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
                required
              />

              {/* Password Requirements Indicators */}
              {password.length > 0 && (
                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-text-secondary font-medium mb-2">{t("Password Requirements")}:</p>
                  <div className="space-y-1.5">
                    <div className={`flex items-center gap-2 transition-colors ${passwordRequirements.minLength ? 'text-green-400' : 'text-text-secondary/50'}`}>
                      {passwordRequirements.minLength ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      )}
                      <span>{t("At least 8 characters")}</span>
                    </div>
                    <div className={`flex items-center gap-2 transition-colors ${passwordRequirements.hasNumberOrSpecial ? 'text-green-400' : 'text-text-secondary/50'}`}>
                      {passwordRequirements.hasNumberOrSpecial ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      )}
                      <span>{t("Contains a number or special character")}</span>
                    </div>
                  </div>
                  {isPasswordValid && (
                    <div className="flex items-center gap-2 text-green-400 font-medium mt-2 pt-2 border-t border-white/10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{t("Password is strong")}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="register-confirm-password" className="text-sm font-medium text-text-secondary ms-1 block">
                {t("Confirm Password")}
              </label>
              <input
                id="register-confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
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
                {t("Create Account")}
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="text-center text-sm text-text-secondary mt-2">
            {t("Already have an account?")}{" "}
            <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              {t("Log In")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="text-off-white text-center p-10">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
