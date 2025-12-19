"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/context/LanguageContext";

export function Features() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  const features = [
    {
      icon: "article",
      color: "#007BFF",
      title: t("AI Article Writer"),
      description: t("Generate long-form articles that are SEO-optimized and ready to publish in minutes."),
    },
    {
      icon: "groups",
      color: "#8A2BE2",
      title: t("Social Media Genius"),
      description: t("Create engaging tweets, threads, and social media posts that capture attention."),
    },
    {
      icon: "play_circle",
      color: "#007BFF",
      title: t("YouTube Script Pro"),
      description: t("Craft compelling video scripts that keep your audience hooked from start to finish."),
    },
  ];

  const delayClasses = ["", "animate-delay-100", "animate-delay-200"];

  return (
    <section id="features" className="flex flex-col gap-10 px-4 py-10 relative z-10">
      <div ref={ref} className="flex flex-col gap-4 text-center">
        <h2 className={`text-white tracking-light text-3xl font-bold leading-tight md:text-4xl md:font-black md:leading-tight md:tracking-[-0.033em] scroll-animate ${isVisible ? 'visible' : ''}`}>
          {t("One Agent, Infinite Possibilities")}
        </h2>
        <p className={`text-[#a0a0b0] text-base font-normal leading-relaxed max-w-2xl mx-auto scroll-animate animate-delay-100 ${isVisible ? 'visible' : ''}`}>
          {t("Discover how our versatile AI writing assistant can streamline your content workflow and amplify your creativity.")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-1 flex-col gap-4 rounded-xl border border-[#2a2a32] bg-[#1E1E24]/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#007BFF] hover:-translate-y-1 scroll-animate ${delayClasses[index]} ${isVisible ? 'visible' : ''}`}
          >
            <div style={{ color: feature.color }}>
              <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-lg font-bold leading-tight">{feature.title}</h3>
              <p className="text-[#a0a0b0] text-sm font-normal leading-normal">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

