"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations();

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0a0a0f]">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 blur-3xl rounded-full"></div>
            </div>

            <div className="layout-container flex grow flex-col">
                <Header />
                <div className="relative z-10 flex justify-center py-5">
                    <div className="layout-content-container flex w-full max-w-4xl flex-col px-4 sm:px-6 lg:px-8">
                        <main className="flex flex-col gap-12 py-12">
                            {/* Hero Section */}
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">
                                    {t("About")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">SEYA</span>
                                </h1>
                                <p className="text-lg text-[#a0a0b0] max-w-2xl mx-auto">
                                    {t("Empowering creators with AI-powered content generation")}
                                </p>
                            </div>

                            {/* Mission Section */}
                            <section className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 space-y-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{t("Our Mission")}</h2>
                                <p className="text-[#a0a0b0] leading-relaxed">
                                    {t("about_mission_text")}
                                </p>
                            </section>

                            {/* Story Section */}
                            <section className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 space-y-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{t("Our Story")}</h2>
                                <p className="text-[#a0a0b0] leading-relaxed">
                                    {t("about_story_p1")}
                                </p>
                                <p className="text-[#a0a0b0] leading-relaxed">
                                    {t("about_story_p2")}
                                </p>
                            </section>

                            {/* Values Section */}
                            <section className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-white text-center">{t("Our Values")}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-xl p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-white">{t("Innovation")}</h3>
                                        <p className="text-[#a0a0b0]">
                                            {t("value_innovation_desc")}
                                        </p>
                                    </div>
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-xl p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-white">{t("Quality")}</h3>
                                        <p className="text-[#a0a0b0]">
                                            {t("value_quality_desc")}
                                        </p>
                                    </div>
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-xl p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-white">{t("Accessibility")}</h3>
                                        <p className="text-[#a0a0b0]">
                                            {t("value_accessibility_desc")}
                                        </p>
                                    </div>
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-xl p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-white">{t("Community")}</h3>
                                        <p className="text-[#a0a0b0]">
                                            {t("value_community_desc")}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </main>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
