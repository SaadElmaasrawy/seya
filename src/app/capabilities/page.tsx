"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CapabilitiesPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#007BFF]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 w-[800px] h-[800px] bg-[#8A2BE2]/20 blur-3xl rounded-full"></div>
      </div>
      <Header />
      <div className="layout-container flex grow flex-col">
        <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] w-full">
            <main>
              <div className="flex flex-wrap justify-between gap-3 p-4 py-16 text-center">
                <div className="flex w-full flex-col items-center gap-3">
                  <p className="scroll-animate text-off-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                    {t("From Ideas to Impact, Instantly")}
                  </p>
                  <p className="scroll-animate animate-delay-100 text-text-muted-dark text-base md:text-lg font-normal leading-normal max-w-2xl">
                    {t("Discover the wide range of high-quality content SEYA can generate for you. Explore examples and see the power of AI in action.")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-4">
                {[
                  { icon: "article", title: t("Articles & Blog Posts"), desc: t("Informative, persuasive, listicles, and how-to guides.") },
                  { icon: "forum", title: t("Tweets & Threads"), desc: t("Generate single tweets or engaging multi-tweet threads.") },
                  { icon: "smart_display", title: t("YouTube Scripts"), desc: t("Create compelling script intros with visual cues and narration.") },
                  { icon: "groups", title: t("LinkedIn Posts"), desc: t("Craft professional, thought-leadership posts for your network.") },
                  { icon: "photo_camera", title: t("Instagram Captions"), desc: t("Write short, engaging captions with emojis and hashtags.") },
                  { icon: "social_leaderboard", title: t("Facebook Posts"), desc: t("Design posts for community engagement and promotion.") },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`scroll-animate animate-delay-${(idx + 2) * 100} flex flex-1 flex-col gap-3 rounded-xl border border-border-dark bg-card-dark p-6 transition-all hover:border-[#007BFF]/50 hover:shadow-lg`}
                  >
                    <span className="material-symbols-outlined text-[#007BFF]" style={{ fontSize: 32 }}>{item.icon}</span>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-off-white text-lg font-bold leading-tight">{item.title}</h2>
                      <p className="text-text-muted-dark text-sm font-normal leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-16">
                <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="scroll-animate text-off-white tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                      {t("Ready to Automate Your Content?")}
                    </h1>
                  </div>
                  <div className="flex flex-1 justify-center">
                    <div className="scroll-animate animate-delay-100 flex justify-center">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#007BFF] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base grow hover:bg-blue-600 transition-opacity">
                        <span className="truncate">{t("Choose Your Plan")}</span>
                      </button>
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