"use client";

import { Icon } from "@/components/Icon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslations } from "next-intl";

export function Steps() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations();

  return (
    <section className="relative z-10">
      <h2 className={`text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-5 pt-5 text-center md:text-4xl scroll-animate ${isVisible ? 'visible' : ''}`}>
        {t("Simple Steps to Brilliant Content")}
      </h2>
      <div ref={ref} className="grid grid-cols-[40px_1fr] gap-x-4 px-4 max-w-xl mx-auto mt-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2 pt-3">
          <div className={`flex items-center justify-center size-10 rounded-full border border-white/10 bg-white/5 text-primary/70 scroll-animate ${isVisible ? 'visible' : ''}`}>
            <Icon name="edit_note" className="text-2xl" aria-hidden="true" />
          </div>
          <div className="w-0.5 bg-border-subtle grow"></div>
        </div>
        <div className={`flex flex-1 flex-col py-3 scroll-animate ${isVisible ? 'visible' : ''}`}>
          <p className="text-sm font-medium leading-normal text-text-secondary">{t("Step 1")}</p>
          <h3 className="text-white text-lg font-bold leading-normal">{t("Describe Your Topic")}</h3>
          <p className="text-text-secondary text-base font-normal leading-relaxed mt-1">
            {t("step1_desc")}
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-0.5 bg-border-subtle h-2"></div>
          <div className={`flex items-center justify-center size-10 rounded-full border border-white/10 bg-white/5 text-primary/70 scroll-animate animate-delay-100 ${isVisible ? 'visible' : ''}`}>
            <Icon name="auto_awesome" className="text-2xl" aria-hidden="true" />
          </div>
          <div className="w-0.5 bg-border-subtle grow"></div>
        </div>
        <div className={`flex flex-1 flex-col py-3 scroll-animate animate-delay-100 ${isVisible ? 'visible' : ''}`}>
          <p className="text-sm font-medium leading-normal text-text-secondary">{t("Step 2")}</p>
          <h3 className="text-white text-lg font-bold leading-normal">{t("Generate Content")}</h3>
          <p className="text-text-secondary text-base font-normal leading-relaxed mt-1">
            {t("step2_desc")}
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2 pb-3">
          <div className="w-0.5 bg-border-subtle h-2"></div>
          <div className={`flex items-center justify-center size-10 rounded-full border border-white/10 bg-white/5 text-primary/70 scroll-animate animate-delay-200 ${isVisible ? 'visible' : ''}`}>
            <Icon name="send" className="text-2xl" aria-hidden="true" />
          </div>
        </div>
        <div className={`flex flex-1 flex-col py-3 scroll-animate animate-delay-200 ${isVisible ? 'visible' : ''}`}>
          <p className="text-sm font-medium leading-normal text-text-secondary">{t("Step 3")}</p>
          <h3 className="text-white text-lg font-bold leading-normal">{t("Publish & Share")}</h3>
          <p className="text-text-secondary text-base font-normal leading-relaxed mt-1">
            {t("step3_desc")}
          </p>
        </div>
      </div>
    </section>
  );
}
