"use client";

import { Icon, type IconName } from "@/components/Icon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslations } from "next-intl";

export function Features() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations();

  return (
    <section id="features" className="flex flex-col gap-10 md:gap-14 px-4 py-14 md:py-20 relative z-10 max-w-7xl mx-auto">
      <div ref={ref} className="flex flex-col gap-6 text-center">
        <h2 className={`text-white text-4xl md:text-5xl font-bold tracking-tight scroll-animate ${isVisible ? 'visible' : ''}`}>
          {t("One Agent, Infinite Possibilities")}
        </h2>
        <p className={`text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto scroll-animate animate-delay-100 ${isVisible ? 'visible' : ''}`}>
          {t("features_section_desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Featured card — spans 3 cols, horizontal layout on large screens */}
        <div className={`lg:col-span-3 flex flex-col sm:flex-row gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-8 transition-colors duration-300 hover:border-primary/40 scroll-animate ${isVisible ? 'visible' : ''}`}>
          <Icon name={"article" as IconName} className="shrink-0 text-5xl text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-2xl font-bold leading-tight">{t("AI Article Writer")}</h3>
            <p className="text-text-secondary text-base leading-relaxed">{t("feature_articles_desc")}</p>
          </div>
        </div>

        {/* Smaller card — spans 2 cols */}
        <div className={`lg:col-span-2 flex flex-col gap-5 rounded-2xl border border-white/5 bg-card-dark/50 p-7 transition-colors duration-300 hover:border-secondary/30 scroll-animate animate-delay-100 ${isVisible ? 'visible' : ''}`}>
          <Icon name={"groups" as IconName} className="text-4xl text-secondary" aria-hidden="true" />
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-xl font-bold leading-tight">{t("Social Media Genius")}</h3>
            <p className="text-text-secondary text-base leading-relaxed">{t("feature_social_desc")}</p>
          </div>
        </div>

        {/* Wide bottom card — spans full width */}
        <div className={`lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-2xl border border-white/5 bg-card-dark/30 px-8 py-6 transition-colors duration-300 hover:border-primary/20 scroll-animate animate-delay-200 ${isVisible ? 'visible' : ''}`}>
          <Icon name={"play_circle" as IconName} className="shrink-0 text-4xl text-primary/70" aria-hidden="true" />
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="text-white text-xl font-bold leading-tight">{t("YouTube Script Pro")}</h3>
            <p className="text-text-secondary text-base leading-relaxed">{t("feature_youtube_desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
