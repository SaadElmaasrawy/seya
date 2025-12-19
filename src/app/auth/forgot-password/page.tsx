"use client";
import { useState, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");
        setMessage("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("If an account exists with this email, you will receive a password reset link.");
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Failed to send request");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="layout-content-container flex flex-col max-w-[480px] w-full">
            <h1 className="text-off-white text-2xl font-bold mb-4">Reset Password</h1>
            <p className="text-text-muted-dark mb-6">Enter your email address and we'll send you a link to reset your password.</p>

            <form onSubmit={onSubmit} className="flex flex-col gap-4 bg-card-dark border border-border-dark rounded-xl p-6">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg border border-border-dark bg-[#1E1E24] px-4 py-3 text-off-white placeholder:text-text-muted-dark focus:outline-none focus:border-primary"
                    required
                />

                {status === "error" && <div className="text-red-400 text-sm">{message}</div>}
                {status === "success" && <div className="text-green-400 text-sm">{message}</div>}

                <button disabled={loading} className="flex w-full items-center justify-center rounded-lg h-11 px-4 bg-[#007BFF] text-white font-bold hover:bg-blue-600 disabled:opacity-60">
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
}

export default function ForgotPasswordPage() {
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
                        <ForgotPasswordForm />
                    </Suspense>
                </div>
            </div>
            <Footer />
        </div>
    );
}
