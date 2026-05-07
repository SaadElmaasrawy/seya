"use client";

import { PageShell } from "@/components/PageShell";
import { useTranslations } from "next-intl";

export default function TermsPage() {
    const t = useTranslations();

    return (
        <PageShell contentClassName="max-w-4xl px-4 sm:px-6 lg:px-8" mainClassName="flex flex-col gap-8 py-12">
                            {/* Hero Section */}
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">
                                    {t("Terms of")} <span className="text-primary">{t("Service")}</span>
                                </h1>
                                <p className="text-lg text-text-secondary">
                                    {t("privacy_last_updated")}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="bg-card-dark/50 border border-white/[0.07] rounded-2xl p-8 space-y-8">
                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_1_accept_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_1_accept_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_2_license_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_2_license_text")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                                        <li>{t("terms_2_license_item1")}</li>
                                        <li>{t("terms_2_license_item2")}</li>
                                        <li>{t("terms_2_license_item3")}</li>
                                        <li>{t("terms_2_license_item4")}</li>
                                        <li>{t("terms_2_license_item5")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_3_accounts_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_3_accounts_text1")}
                                    </p>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_3_accounts_text2")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_4_content_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_4_content_text1")}
                                    </p>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_4_content_text2")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_5_prohibited_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_5_prohibited_text")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                                        <li>{t("terms_5_prohibited_item1")}</li>
                                        <li>{t("terms_5_prohibited_item2")}</li>
                                        <li>{t("terms_5_prohibited_item3")}</li>
                                        <li>{t("terms_5_prohibited_item4")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_6_payment_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_6_payment_text1")}
                                    </p>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_6_payment_text2")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_7_termination_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_7_termination_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_8_liability_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_8_liability_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_9_changes_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_9_changes_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("terms_10_contact_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("terms_10_contact_text")}
                                    </p>
                                </section>
                            </div>
        </PageShell>
    );
}
