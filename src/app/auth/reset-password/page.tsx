"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus("error");
            setMessage("Passwords do not match");
            return;
        }

        if (!token) {
            setStatus("error");
            setMessage("Invalid or missing reset token");
            return;
        }

        setLoading(true);
        setStatus("idle");
        setMessage("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Password reset successfully. Redirecting to login...");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    if (!token) {
        return (
            <div className="layout-content-container flex flex-col max-w-[480px] w-full">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400 text-center">
                    Invalid or missing reset token. Please request a new link.
                </div>
            </div>
        );
    }

    return (
        <div className="layout-content-container flex flex-col max-w-[480px] w-full">
            <h1 className="text-off-white text-2xl font-bold mb-4">Set New Password</h1>

            <form onSubmit={onSubmit} className="flex flex-col gap-4 bg-card-dark border border-border-dark rounded-xl p-6">
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg border border-border-dark bg-[#1E1E24] px-4 py-3 text-off-white placeholder:text-text-muted-dark focus:outline-none focus:border-primary"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-lg border border-border-dark bg-[#1E1E24] px-4 py-3 text-off-white placeholder:text-text-muted-dark focus:outline-none focus:border-primary"
                    required
                />

                {status === "error" && <div className="text-red-400 text-sm">{message}</div>}
                {status === "success" && <div className="text-green-400 text-sm">{message}</div>}

                <button disabled={loading} className="flex w-full items-center justify-center rounded-lg h-11 px-4 bg-[#007BFF] text-white font-bold hover:bg-blue-600 disabled:opacity-60">
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
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
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
            <Footer />
        </div>
    );
}
