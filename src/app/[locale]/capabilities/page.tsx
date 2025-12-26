"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function CapabilitiesPage() {
  const t = useTranslations();

  const capabilities = [
    {
      title: t("Articles & Blog Posts"),
      description: t("capabilities_articles_desc"),
      icon: "article",
      examples: ["Blog posts", "News articles", "Listicles", "Product reviews"]
    },
    {
      title: t("Tweets & Threads"),
      description: t("capabilities_tweets_desc"),
      icon: "send",
      examples: ["Single tweets", "Engaging threads", "Marketing announcements"]
    },
    {
      title: t("YouTube Scripts"),
      description: t("capabilities_youtube_desc"),
      icon: "movie",
      examples: ["Video intros", "Education scripts", "Review structures"]
    },
    {
      title: t("LinkedIn Posts"),
      description: t("capabilities_linkedin_desc"),
      icon: "work",
      examples: ["Professional updates", "Thought leadership", "Company news"]
    },
    {
      title: t("Instagram Captions"),
      description: t("capabilities_instagram_desc"),
      icon: "photo_camera",
      examples: ["Photo captions", "Story hooks", "Product showcases"]
    },
    {
      title: t("Facebook Posts"),
      description: t("capabilities_facebook_desc"),
      icon: "group",
      examples: ["Community updates", "Event promos", "Engagement posts"]
    }
  ];

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
          <div className="layout-content-container flex w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
            <main className="flex flex-col gap-12 py-12">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {t("From Ideas to Impact, Instantly")}
                </h1>
                <p className="text-lg text-[#a0a0b0] max-w-3xl mx-auto">
                  {t("capabilities_hero_desc")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {capabilities.map((cap, index) => (
                  <div key={index} className="bg-[#1a1a24]/50 backdrop-blur-sm border border-[#2a2a32] rounded-2xl p-8 hover:border-primary transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary text-2xl">{cap.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{cap.title}</h3>
                    <p className="text-[#a0a0b0] mb-6">{cap.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cap.examples.map((ex, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#a0a0b0]">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold text-white mb-6">{t("Ready to Automate Your Content?")}</h2>
                <Link href="/auth/register" className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                  {t("Get Started for Free")}
                </Link>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
