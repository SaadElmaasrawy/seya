"use client";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundAmbience } from "@/components/BackgroundAmbience";
import { motion } from "framer-motion";

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-white antialiased selection:bg-blue-500/30 selection:text-blue-200">
            <BackgroundAmbience />

            <Header />

            <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-20 relative z-10 min-h-[calc(100vh-200px)]">
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
