"use client";

import { PageShell } from "@/components/PageShell";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations();

    return (
        <PageShell backgroundVariant="single" contentClassName="max-w-4xl px-4 sm:px-6 lg:px-8" mainClassName="flex flex-col gap-20 py-16 md:gap-28 md:py-24">
                            {/* Hero Section */}
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">
                                    {t("About")} <span className="text-primary">SEYA</span>
                                </h1>
                                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                                    {t("Empowering creators with AI-powered content generation")}
                                </p>
                            </div>

                            {/* Mission Section — open prose, no card */}
                            <section className="max-w-3xl space-y-5">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{t("Our Mission")}</h2>
                                <div className="w-10 h-px bg-primary/50"></div>
                                <p className="text-text-secondary leading-relaxed text-[1.0625rem]">
                                    {t("about_mission_text")}
                                </p>
                            </section>

                            {/* Story Section — open prose, no card */}
                            <section className="max-w-3xl space-y-5">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{t("Our Story")}</h2>
                                <div className="w-10 h-px bg-primary/50"></div>
                                <div className="space-y-5">
                                    <p className="text-text-secondary leading-relaxed text-[1.0625rem]">
                                        {t("about_story_p1")}
                                    </p>
                                    <p className="text-text-secondary leading-relaxed text-[1.0625rem]">
                                        {t("about_story_p2")}
                                    </p>
                                </div>
                            </section>

                            {/* Values Section */}
                            <section className="space-y-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{t("Our Values")}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 space-y-2">
                                        <h3 className="text-lg font-semibold text-white">{t("Innovation")}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">
                                            {t("value_innovation_desc")}
                                        </p>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 space-y-2">
                                        <h3 className="text-lg font-semibold text-white">{t("Quality")}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">
                                            {t("value_quality_desc")}
                                        </p>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 space-y-2">
                                        <h3 className="text-lg font-semibold text-white">{t("Accessibility")}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">
                                            {t("value_accessibility_desc")}
                                        </p>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 space-y-2">
                                        <h3 className="text-lg font-semibold text-white">{t("Community")}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">
                                            {t("value_community_desc")}
                                        </p>
                                    </div>
                                </div>
                            </section>
        </PageShell>
    );
}
