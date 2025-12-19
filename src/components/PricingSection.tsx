'use client';

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import PaymentButton from "./PaymentButton";

export function Pricing() {
    const { t } = useLanguage();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                setIsLoggedIn(true);
                setUser(data.user);
            }
        } catch (error) {
            console.error("Auth check failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="pricing" className="flex flex-col gap-8">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {t("Simple, Transparent Pricing")}
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    {t("Start for free and upgrade when you need more")}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                {/* Free Plan */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2">{t("Free")}</h3>
                    <p className="text-gray-400 mb-6">{t("Perfect for trying out Seya")}</p>
                    <div className="mb-8">
                        <span className="text-5xl font-bold text-white">{t("0 EGP")}</span>
                        <span className="text-gray-500 ml-2">{t("/ month")}</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {t("50 AI Messages / Month")}
                        </li>
                        <li className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <a
                            href="/auth/register"
                            className="w-full py-3 rounded-lg border border-white/20 text-white font-medium text-center hover:bg-white/5 transition-all"
                        >
                            {t("Get Started for Free")}
                        </a>
                    )}
                </div>

                {/* Pro Plan */}
                <div className="bg-gradient-to-b from-indigo-900/40 to-indigo-900/10 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-xl shadow-indigo-900/20">
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        {t("RECOMMENDED")}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t("Pro")}</h3>
                    <p className="text-gray-300 mb-6">{t("Unleash your full potential")}</p>
                    <div className="mb-8">
                        <span className="text-5xl font-bold text-white">{t("500 EGP")}</span>
                        <span className="text-gray-400 ml-2">{t("/ month")}</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <strong>{t("Unlimited")}</strong>&nbsp;{t("AI Messages")}
                        </li>
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {t("Priority Support")}
                        </li>
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {t("Access to New Features")}
                        </li>
                    </ul>
                    {isLoggedIn && user ? (
                        <PaymentButton
                            amount={50000} // 500 EGP in cents
                            currency="EGP"
                            billingData={{
                                first_name: user.name?.split(' ')[0] || 'User',
                                last_name: user.name?.split(' ').slice(1).join(' ') || 'Name',
                                email: user.email,
                                phone_number: "01000000000", // Placeholder if not available
                            }}
                            items={[{
                                name: "Pro Plan Subscription",
                                amount_cents: 50000,
                                description: "Monthly subscription for Pro Plan",
                                quantity: 1
                            }]}
                            userId={user.id}
                            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-center transition-all shadow-lg shadow-indigo-900/50"
                        >
                            {t("Upgrade to Pro")}
                        </PaymentButton>
                    ) : (
                        <a
                            href="/auth/register"
                            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-center transition-all shadow-lg shadow-indigo-900/50"
                        >
                            {t("Upgrade to Pro")}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
