"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/contexts/AuthContext";

export function Pricing() {
    const t = useTranslations();
    const { isAuthenticated: isLoggedIn } = useAuth();

    return (
        <section id="pricing" className="flex flex-col gap-10 md:gap-14">
            <div className="text-center space-y-3">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    {t("Simple, Transparent Pricing")}
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                    {t("Start for free and upgrade when you need more")}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                {/* Free Plan */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2">{t("Free")}</h3>
                    <p className="text-text-secondary mb-6">{t("Perfect for trying out Seya")}</p>
                    <div className="mb-8">
                        <span className="text-4xl md:text-5xl font-bold text-white">{t("0 EGP")}</span>
                        <span className="text-text-secondary ms-2">{t("/ month")}</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center text-text-secondary">
                            <svg className="w-5 h-5 text-primary/60 me-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {t("50 AI Messages / Month")}
                        </li>
                        <li className="flex items-center text-text-secondary">
                            <svg className="w-5 h-5 text-primary/60 me-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {t("Basic Support")}
                        </li>
                    </ul>
                    {isLoggedIn ? (
                        <button
                            disabled
                            className="w-full py-3 rounded-lg border border-white/20 text-white font-medium text-center opacity-50 cursor-not-allowed"
                        >
                            {t("Current Plan")}
                        </button>
                    ) : (
                        <Link
                            href="/auth/register"
                            className="w-full py-3 rounded-lg border border-white/20 text-white font-medium text-center hover:bg-white/5 transition-all"
                        >
                            {t("Get Started for Free")}
                        </Link>
                    )}
                </div>

                {/* Pro Plan */}
                <div className="bg-linear-to-b from-secondary/[0.12] to-transparent border border-secondary/20 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-lg shadow-secondary/5">
                    <div className="absolute top-0 right-0 bg-secondary/15 text-secondary text-xs font-medium px-3 py-1 rounded-bl-lg">
                        {t("RECOMMENDED")}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t("Pro")}</h3>
                    <p className="text-text-secondary mb-6">{t("Unleash your full potential")}</p>
                    <div className="mb-8">
                        <span className="text-4xl md:text-5xl font-bold text-white">{t("500 EGP")}</span>
                        <span className="text-text-secondary ms-2">{t("/ month")}</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-secondary me-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <strong>{t("Unlimited")}</strong>&nbsp;{t("AI Messages")}
                        </li>
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-secondary me-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {t("Priority Support")}
                        </li>
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-secondary me-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {t("Access to New Features")}
                        </li>
                    </ul>
                    <a
                        href="https://wa.me/201023012787?text=Hello%2C%20I%20want%20to%20subscribe%20to%20the%20Pro%20plan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-center transition-colors shadow-md shadow-primary/20"
                    >
                        {t("Upgrade to Pro")}
                    </a>
                </div>
            </div>
        </section>
    );
}
