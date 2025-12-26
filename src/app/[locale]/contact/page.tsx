"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Loader2, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        interest: "",
        budget: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const t = useTranslations();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", interest: "", budget: "", message: "" });

        setTimeout(() => setSubmitStatus("idle"), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0A0A0A] selection:bg-white/30 selection:text-white">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/20 blur-[120px] rounded-full opacity-60 mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-purple-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse delay-1000"></div>
                <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[100px] rounded-full opacity-40 mix-blend-screen"></div>
            </div>

            <Header />

            <div className="layout-container flex grow flex-col relative z-10 pt-32 pb-24">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                    {/* Decorative Left Line (from inspiration) */}
                    <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-[1px] bg-white/10"></div>

                    <div className="lg:pl-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-16 space-y-2"
                        >
                            <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tighter leading-[1.1]">
                                {t("contact_title_love")}
                            </h1>
                            <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tighter leading-[1.1] flex items-center gap-3">
                                {t("contact_title_get_in_touch")} <span className="animate-wave inline-block origin-[70%_70%]">👋</span>
                            </h1>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="space-y-12 max-w-4xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                {/* Name */}
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-sm font-medium text-white block">
                                        {t("Name")}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 rounded-[4px] border border-transparent focus:border-white/20 px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-0 transition-all font-light"
                                        placeholder="Edward Snowden"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-sm font-medium text-white block">
                                        {t("Email")}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 rounded-[4px] border border-transparent focus:border-white/20 px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-0 transition-all font-light"
                                        placeholder="itanexmple@gmail.com"
                                    />
                                </div>

                                {/* Interest */}
                                <div className="space-y-3">
                                    <label htmlFor="interest" className="text-sm font-medium text-white block">
                                        {t("contact_field_interest")}
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="interest"
                                            name="interest"
                                            value={formData.interest}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 rounded-[4px] border border-transparent focus:border-white/20 px-4 py-3.5 text-white focus:outline-none focus:ring-0 transition-all appearance-none cursor-pointer font-light"
                                        >
                                            <option value="" disabled className="text-neutral-500">{t("contact_placeholder_interest")}</option>
                                            <option value="design" className="bg-[#0A0A0A]">{t("contact_interest_design")}</option>
                                            <option value="dev" className="bg-[#0A0A0A]">{t("contact_interest_dev")}</option>
                                            <option value="marketing" className="bg-[#0A0A0A]">{t("contact_interest_marketing")}</option>
                                            <option value="other" className="bg-[#0A0A0A]">{t("contact_interest_other")}</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className="space-y-3">
                                    <label htmlFor="budget" className="text-sm font-medium text-white block">
                                        {t("contact_field_budget")}
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 rounded-[4px] border border-transparent focus:border-white/20 px-4 py-3.5 text-white focus:outline-none focus:ring-0 transition-all appearance-none cursor-pointer font-light"
                                        >
                                            <option value="" disabled className="text-neutral-500">{t("contact_placeholder_budget")}</option>
                                            <option value="<1k" className="bg-[#0A0A0A]">{t("contact_budget_under_1k")}</option>
                                            <option value="1k-5k" className="bg-[#0A0A0A]">{t("contact_budget_1k_5k")}</option>
                                            <option value="5k-10k" className="bg-[#0A0A0A]">{t("contact_budget_5k_10k")}</option>
                                            <option value="10k+" className="bg-[#0A0A0A]">{t("contact_budget_10k_plus")}</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-3">
                                <label htmlFor="message" className="text-sm font-medium text-white block">
                                    {t("Message")}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full bg-white/5 rounded-[4px] border border-transparent focus:border-white/20 px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-0 transition-all resize-none font-light"
                                    placeholder={t("contact_message_placeholder")}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto min-w-[200px] inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 font-medium rounded-[4px] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-base"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>{t("sending")}</span>
                                        </>
                                    ) : (
                                        <>
                                            {t("contact_btn_just_send")}
                                            <ArrowUpRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {submitStatus === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-[4px] bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium"
                                >
                                    {t("contact_success_message")}
                                </motion.div>
                            )}
                        </motion.form>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    10% { transform: rotate(14deg); }
                    20% { transform: rotate(-8deg); }
                    30% { transform: rotate(14deg); }
                    40% { transform: rotate(-4deg); }
                    50% { transform: rotate(10deg); }
                    60% { transform: rotate(0deg); }
                    100% { transform: rotate(0deg); }
                }
                .animate-wave {
                    animation: wave 2s infinite;
                }
            `}</style>

            <Footer />
        </div>
    );
}
