"use client";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background font-sans text-foreground antialiased selection:bg-blue-500/30 selection:text-blue-200">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[100px] rounded-full opacity-50"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[100px] rounded-full opacity-30"></div>
            </div>

            <Header />

            <div className="flex-1 flex flex-col items-center justify-center py-20 relative z-10 min-h-[calc(100vh-200px)]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-[480px]"
                >
                    {children}
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
