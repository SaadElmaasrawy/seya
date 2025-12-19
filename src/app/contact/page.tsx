"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const { t } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => setSubmitStatus("idle"), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

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
                                    {t("Get in")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#8A2BE2]">{t("Touch")}</span>
                                </h1>
                                <p className="text-lg text-[#a0a0b0] max-w-2xl mx-auto">
                                    {t("Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.")}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Contact Form */}
                                <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">{t("Send us a message")}</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-[#a0a0b0] mb-2">
                                                {t("Name")}
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a32] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#007BFF] transition-colors"
                                                placeholder={t("Your name")}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-[#a0a0b0] mb-2">
                                                {t("Email")}
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a32] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#007BFF] transition-colors"
                                                placeholder={t("your@email.com")}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-[#a0a0b0] mb-2">
                                                {t("Subject")}
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a32] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#007BFF] transition-colors"
                                                placeholder={t("How can we help?")}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-[#a0a0b0] mb-2">
                                                {t("Message")}
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a32] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#007BFF] transition-colors resize-none"
                                                placeholder={t("Your message...")}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#8A2BE2] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? t("Sending...") : t("Send Message")}
                                        </button>

                                        {submitStatus === "success" && (
                                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                                                {t("Message sent successfully! We'll get back to you soon.")}
                                            </div>
                                        )}
                                    </form>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-6">
                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 space-y-6">
                                        <h2 className="text-2xl font-bold text-white">{t("Contact Information")}</h2>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-[#007BFF]/10 border border-[#007BFF]/30 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white mb-1">{t("Email")}</h3>
                                                    <p className="text-[#a0a0b0]">support@seya.ai</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-[#8A2BE2]/10 border border-[#8A2BE2]/30 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-[#8A2BE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white mb-1">{t("Location")}</h3>
                                                    <p className="text-[#a0a0b0]">{t("Cairo, Egypt")}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-[#007BFF]/10 border border-[#007BFF]/30 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white mb-1">{t("Business Hours")}</h3>
                                                    <p className="text-[#a0a0b0]">{t("Mon - Fri: 9AM - 6PM EET")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8">
                                        <h3 className="text-xl font-bold text-white mb-4">{t("Follow Us")}</h3>
                                        <div className="flex gap-4">
                                            <a href="#" className="w-10 h-10 rounded-lg bg-[#007BFF]/10 border border-[#007BFF]/30 flex items-center justify-center hover:bg-[#007BFF]/20 transition-colors">
                                                <span className="text-[#007BFF] font-bold">𝕏</span>
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-lg bg-[#8A2BE2]/10 border border-[#8A2BE2]/30 flex items-center justify-center hover:bg-[#8A2BE2]/20 transition-colors">
                                                <span className="text-[#8A2BE2] font-bold">in</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
