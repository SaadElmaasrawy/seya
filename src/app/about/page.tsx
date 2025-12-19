"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0a0a0f]">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#007BFF]/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 w-[800px] h-[800px] bg-[#8A2BE2]/20 blur-3xl rounded-full"></div>
            </div>

            <div className="layout-container flex grow flex-col">
                <Header />
                <div className="relative z-10 flex justify-center py-5">
                    <div className="layout-content-container flex w-full max-w-4xl flex-col px-4 sm:px-6 lg:px-8">
                        <main className="flex flex-col gap-12 py-12">
                            {/* Hero Section */}
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">
                                    {t("About")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#8A2BE2]">SEYA</span>
                                </h1>
                                <p className="text-lg text-[#a0a0b0] max-w-2xl mx-auto">
                                    {t("Empowering creators with AI-powered content generation")}
                                </p>
                            </div>

                            {/* Mission Section */}
                            <section className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 space-y-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{t("Our Mission")}</h2>
                                <p className="text-[#a0a0b0] leading-relaxed">
                                    {t("At SEYA, we believe that everyone deserves access to powerful content creation tools. Our mission is to democratize content creation by providing AI-powered solutions that help individuals and teams produce high-quality content faster and more efficiently.")}
                                </p>
                            </section>

                            {/* Story Section */}
                            <section className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 space-y-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{t("Our Story")}</h2>
                                <p className="text-[#a0a0b0] leading-relaxed">
                                    {t("SEYA was born from the frustration of spending countless hours creating content for various platforms. We recognized that content creators needed a solution that could adapt to different formats while maintaining quality and authenticity.")}
                                </p>
                                <p className="text-[#a0a0b0] leading-relaxed">
                                    {t("Today, SEYA serves thousands of creators, marketers, and businesses worldwide, helping them streamline their content creation process and focus on what matters most - connecting with their audience.")}
                                </p>
                            </section>

                            {/* Values Section */}
                            <section className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-white text-center">{t("Our Values")}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-xl p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-white">{t("Innovation")}</h3>
                                        <p className="text-[#a0a0b0]">
                                            {t("We continuously push the boundaries of what's possible with AI technology.")}
                                        </p>
                                    </div>
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-xl p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-white">{t("Quality")}</h3>
                                        <p className="text-[#a0a0b0]">
                                            {t("We're committed to delivering exceptional results that exceed expectations.")}
                                        </p>
                                    </div>
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-xl p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-white">{t("Accessibility")}</h3>
                                        <p className="text-[#a0a0b0]">
                                            {t("We make powerful tools available to everyone, regardless of technical expertise.")}
                                        </p>
                                    </div>
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-xl p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-white">{t("Community")}</h3>
                                        <p className="text-[#a0a0b0]">
                                            {t("We believe in building a supportive community of creators helping creators.")}
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
