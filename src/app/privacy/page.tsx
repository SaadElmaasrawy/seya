"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
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
                                    {t("Privacy")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#8A2BE2]">{t("Policy")}</span>
                                </h1>
                                <p className="text-lg text-[#a0a0b0]">
                                    {t("Last updated: November 22, 2025")}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 space-y-8">
                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("1. Introduction")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("SEYA (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. Please read this privacy policy carefully.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("2. Information We Collect")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We collect information that you provide directly to us, including:")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("Account information (name, email address, password)")}</li>
                                        <li>{t("Profile information you choose to provide")}</li>
                                        <li>{t("Content you create, upload, or share through the Service")}</li>
                                        <li>{t("Communications between you and SEYA")}</li>
                                        <li>{t("Payment information (processed securely through third-party payment processors)")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("3. Automatically Collected Information")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("When you access or use our Service, we automatically collect certain information, including:")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("Log data (IP address, browser type, operating system)")}</li>
                                        <li>{t("Device information (device type, unique device identifiers)")}</li>
                                        <li>{t("Usage data (pages visited, features used, time spent on the Service)")}</li>
                                        <li>{t("Cookies and similar tracking technologies")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("4. How We Use Your Information")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We use the information we collect to:")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("Provide, maintain, and improve our Service")}</li>
                                        <li>{t("Process transactions and send related information")}</li>
                                        <li>{t("Send you technical notices, updates, security alerts, and support messages")}</li>
                                        <li>{t("Respond to your comments, questions, and customer service requests")}</li>
                                        <li>{t("Communicate with you about products, services, offers, and events")}</li>
                                        <li>{t("Monitor and analyze trends, usage, and activities in connection with our Service")}</li>
                                        <li>{t("Detect, investigate, and prevent fraudulent transactions and other illegal activities")}</li>
                                        <li>{t("Personalize and improve the Service and provide content or features that match your interests")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("5. Information Sharing and Disclosure")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We may share your information in the following circumstances:")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf")}</li>
                                        <li>{t("In response to a request for information if we believe disclosure is in accordance with applicable law")}</li>
                                        <li>{t("If we believe your actions are inconsistent with our user agreements or policies")}</li>
                                        <li>{t("To protect the rights, property, and safety of SEYA or others")}</li>
                                        <li>{t("In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition")}</li>
                                        <li>{t("With your consent or at your direction")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("6. Data Security")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("7. Data Retention")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("8. Your Rights")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("Depending on your location, you may have certain rights regarding your personal information, including:")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-[#a0a0b0] ml-4">
                                        <li>{t("The right to access your personal information")}</li>
                                        <li>{t("The right to correct inaccurate or incomplete information")}</li>
                                        <li>{t("The right to delete your personal information")}</li>
                                        <li>{t("The right to restrict or object to our processing of your information")}</li>
                                        <li>{t("The right to data portability")}</li>
                                        <li>{t("The right to withdraw consent")}</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("9. Cookies")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("10. Children's Privacy")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("11. Changes to This Privacy Policy")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date.")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">{t("12. Contact Us")}</h2>
                                    <p className="text-[#a0a0b0] leading-relaxed">
                                        {t("If you have any questions about this Privacy Policy, please contact us at privacy@seya.ai")}
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
