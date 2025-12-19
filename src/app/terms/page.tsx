"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
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
                        <main className="flex flex-col gap-8 py-12">
                            {/* Hero Section */}
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">
                                    {t("Terms of")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#8A2BE2]">{t("Service")}</span>
                                </h1>
                                <p className="text-lg text-[#a0a0b0]">
                                    {t("Last updated: November 22, 2025")}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 space-y-8">
                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("1. Acceptance of Terms")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("By accessing and using SEYA (\"the Service\"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("2. Use License")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("Permission is granted to temporarily access and use the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("Modify or copy the materials")}</li>
                                        <li>{t("Use the materials for any commercial purpose or for any public display")}</li>
                                        <li>{t("Attempt to decompile or reverse engineer any software contained in the Service")}</li>
                                        <li>{t("Remove any copyright or other proprietary notations from the materials")}</li>
                                        <li>{t("Transfer the materials to another person or \"mirror\" the materials on any other server")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("3. User Accounts")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.")}
                                    </p>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("4. Content")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("Our Service allows you to generate, post, and share content. You are responsible for the content that you generate and share through the Service, including its legality, reliability, and appropriateness.")}
                                    </p>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("By generating and sharing content via the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("5. Prohibited Uses")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("In any way that violates any applicable national or international law or regulation")}</li>
                                        <li>{t("To transmit, or procure the sending of, any advertising or promotional material without our prior written consent")}</li>
                                        <li>{t("To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity")}</li>
                                        <li>{t("To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("6. Subscription and Payments")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select.")}
                                    </p>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("A valid payment method is required to process the payment for your subscription. You shall provide accurate and complete billing information.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("7. Termination")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("8. Limitation of Liability")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("In no event shall SEYA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("9. Changes to Terms")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms of Service on this page.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("10. Contact Us")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("If you have any questions about these Terms, please contact us at support@seya.ai")}
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
