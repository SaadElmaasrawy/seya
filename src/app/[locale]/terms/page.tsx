"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function TermsPage() {
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
                        <main className="flex flex-col gap-8 py-12">
                            {/* Hero Section */}
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">
                                    {t("Terms of")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{t("Service")}</span>
                                </h1>
                                <p className="text-lg text-[#a0a0b0]">
                                    {t("privacy_last_updated")}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 space-y-8">
                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_1_accept_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_1_accept_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_2_license_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_2_license_text")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("terms_2_license_item1")}</li>
                                        <li>{t("terms_2_license_item2")}</li>
                                        <li>{t("terms_2_license_item3")}</li>
                                        <li>{t("terms_2_license_item4")}</li>
                                        <li>{t("terms_2_license_item5")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_3_accounts_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_3_accounts_text1")}
                                    </p>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_3_accounts_text2")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_4_content_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_4_content_text1")}
                                    </p>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_4_content_text2")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_5_prohibited_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_5_prohibited_text")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("terms_5_prohibited_item1")}</li>
                                        <li>{t("terms_5_prohibited_item2")}</li>
                                        <li>{t("terms_5_prohibited_item3")}</li>
                                        <li>{t("terms_5_prohibited_item4")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_6_payment_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_6_payment_text1")}
                                    </p>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_6_payment_text2")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_7_termination_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_7_termination_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_8_liability_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_8_liability_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_9_changes_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_9_changes_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_10_contact_title")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("terms_10_contact_text")}
                                    </p>
                                </section>
                            </div>
                        </main>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
