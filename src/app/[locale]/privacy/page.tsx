"use client";

import { PageShell } from "@/components/PageShell";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
    const t = useTranslations();

    return (
        <PageShell contentClassName="max-w-4xl px-4 sm:px-6 lg:px-8" mainClassName="flex flex-col gap-8 py-12">
                            {/* Hero Section */}
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">
                                    {t("Privacy")} <span className="text-primary">{t("Policy")}</span>
                                </h1>
                                <p className="text-lg text-text-secondary">
                                    {t("privacy_last_updated")}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="bg-card-dark/50 border border-white/[0.07] rounded-2xl p-8 space-y-8">
                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_1_intro_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_1_intro_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_2_info_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_2_info_intro")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                                        <li>{t("privacy_2_info_acc")}</li>
                                        <li>{t("privacy_2_info_profile")}</li>
                                        <li>{t("privacy_2_info_content")}</li>
                                        <li>{t("privacy_2_info_comm")}</li>
                                        <li>{t("privacy_2_info_payment")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_3_auto_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_3_auto_intro")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                                        <li>{t("privacy_3_auto_log")}</li>
                                        <li>{t("privacy_3_auto_device")}</li>
                                        <li>{t("privacy_3_auto_usage")}</li>
                                        <li>{t("privacy_3_auto_cookies")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_4_use_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_4_use_intro")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                                        <li>{t("privacy_4_use_improve")}</li>
                                        <li>{t("privacy_4_use_transactions")}</li>
                                        <li>{t("privacy_4_use_support")}</li>
                                        <li>{t("privacy_4_use_requests")}</li>
                                        <li>{t("privacy_4_use_comm")}</li>
                                        <li>{t("privacy_4_use_trends")}</li>
                                        <li>{t("privacy_4_use_fraud")}</li>
                                        <li>{t("privacy_4_use_personalize")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_5_share_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_5_share_intro")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                                        <li>{t("privacy_5_share_vendors")}</li>
                                        <li>{t("privacy_5_share_law")}</li>
                                        <li>{t("privacy_5_share_policies")}</li>
                                        <li>{t("privacy_5_share_safety")}</li>
                                        <li>{t("privacy_5_share_merger")}</li>
                                        <li>{t("privacy_5_share_consent")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_6_security_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_6_security_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_7_retention_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_7_retention_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_8_rights_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_8_rights_intro")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                                        <li>{t("privacy_8_rights_access")}</li>
                                        <li>{t("privacy_8_rights_correct")}</li>
                                        <li>{t("privacy_8_rights_delete")}</li>
                                        <li>{t("privacy_8_rights_restrict")}</li>
                                        <li>{t("privacy_8_rights_portability")}</li>
                                        <li>{t("privacy_8_rights_withdraw")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_9_cookies_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_9_cookies_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_10_children_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_10_children_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_11_changes_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_11_changes_text")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("privacy_12_contact_title")}</h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {t("privacy_12_contact_text")}
                                    </p>
                                </section>
                            </div>
        </PageShell>
    );
}
