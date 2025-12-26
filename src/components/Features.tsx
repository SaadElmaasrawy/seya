"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslations } from "next-intl";

export function Features() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations();

  const features = [
    {
      icon: "article",
      color: "#007BFF",
      title: t("AI Article Writer"),
      description: t("feature_articles_desc"),
    },
    {
      icon: "groups",
      color: "#8A2BE2",
      title: t("Social Media Genius"),
      description: t("feature_social_desc"),
    },
    {
      icon: "play_circle",
      color: "#007BFF",
      title: t("YouTube Script Pro"),
      description: t("feature_youtube_desc"),
    },
  ];

  const delayClasses = ["", "animate-delay-100", "animate-delay-200"];

  return (
    <section id="features" className="flex flex-col gap-16 px-4 py-20 relative z-10 max-w-7xl mx-auto">
      <div ref={ref} className="flex flex-col gap-6 text-center">
        <h2 className={`text-white text-4xl md:text-5xl font-black tracking-tight scroll-animate ${isVisible ? 'visible' : ''}`}>
          {t("One Agent, Infinite Possibilities")}
        </h2>
        <p className={`text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto scroll-animate animate-delay-100 ${isVisible ? 'visible' : ''}`}>
          {t("features_section_desc")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`group flex flex-1 flex-col gap-6 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 scroll-animate ${delayClasses[index]} ${isVisible ? 'visible' : ''}`}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center bg-linear-to-br from-white/5 to-white/0 border border-white/10 group-hover:scale-110 transition-transform duration-300"
              style={{ color: feature.color }}
            >
              <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 text-base font-normal leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

