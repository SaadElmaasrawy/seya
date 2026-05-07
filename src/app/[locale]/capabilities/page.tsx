"use client";

import { Link } from "@/i18n/routing";
import { Icon, type IconName } from "@/components/Icon";
import { PageShell } from "@/components/PageShell";
import { useTranslations } from "next-intl";

export default function CapabilitiesPage() {
  const t = useTranslations();

  const capabilities = [
    {
      title: t("Articles & Blog Posts"),
      description: t("capabilities_articles_desc"),
      icon: "article" as IconName,
      examples: ["Blog posts", "News articles", "Listicles", "Product reviews"],
    },
    {
      title: t("Tweets & Threads"),
      description: t("capabilities_tweets_desc"),
      icon: "send" as IconName,
      examples: ["Single tweets", "Engaging threads", "Marketing announcements"],
    },
    {
      title: t("YouTube Scripts"),
      description: t("capabilities_youtube_desc"),
      icon: "movie" as IconName,
      examples: ["Video intros", "Education scripts", "Review structures"],
    },
    {
      title: t("LinkedIn Posts"),
      description: t("capabilities_linkedin_desc"),
      icon: "work" as IconName,
      examples: ["Professional updates", "Thought leadership", "Company news"],
    },
    {
      title: t("Instagram Captions"),
      description: t("capabilities_instagram_desc"),
      icon: "photo_camera" as IconName,
      examples: ["Photo captions", "Story hooks", "Product showcases"],
    },
    {
      title: t("Facebook Posts"),
      description: t("capabilities_facebook_desc"),
      icon: "group" as IconName,
      examples: ["Community updates", "Event promos", "Engagement posts"],
    },
  ];

  return (
    <PageShell
      backgroundVariant="single"
      contentClassName="max-w-6xl px-4 sm:px-6 lg:px-8"
      mainClassName="flex flex-col gap-12 py-12"
    >
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          {t("From Ideas to Impact, Instantly")}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary">
          {t("capabilities_hero_desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="group flex flex-col gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-8 transition-colors hover:border-primary/40 sm:flex-row lg:col-span-3">
          <Icon name={capabilities[0].icon} className="shrink-0 text-5xl text-primary" aria-hidden="true" />
          <div className="flex flex-1 flex-col gap-3">
            <h2 className="text-2xl font-bold leading-tight text-white">{capabilities[0].title}</h2>
            <p className="text-base leading-relaxed text-text-secondary">{capabilities[0].description}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {capabilities[0].examples.map((example) => (
                <span key={example} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary/80">
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>

        {capabilities.slice(1, 3).map((capability) => (
          <div
            key={capability.title}
            className="group flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-card-dark/50 p-7 transition-colors hover:border-secondary/30"
          >
            <div className="flex items-center gap-3">
              <Icon name={capability.icon} className="text-3xl text-secondary/70 transition-colors group-hover:text-secondary" aria-hidden="true" />
              <h2 className="text-lg font-bold leading-snug text-white">{capability.title}</h2>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-text-secondary">{capability.description}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {capability.examples.map((example) => (
                <span key={example} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-text-secondary">
                  {example}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="group flex flex-col items-start gap-5 rounded-2xl border border-white/5 bg-card-dark/30 px-7 py-6 transition-colors hover:border-primary/20 sm:flex-row sm:items-center lg:col-span-1">
          <Icon name={capabilities[3].icon} className="shrink-0 text-4xl text-primary/50 transition-colors group-hover:text-primary/70" aria-hidden="true" />
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="text-lg font-bold leading-tight text-white">{capabilities[3].title}</h2>
            <p className="text-sm leading-relaxed text-text-secondary">{capabilities[3].description}</p>
          </div>
        </div>

        {capabilities.slice(4).map((capability) => (
          <div
            key={capability.title}
            className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-card-dark/30 p-6 transition-colors hover:border-white/15"
          >
            <Icon name={capability.icon} className="text-2xl text-text-secondary transition-colors group-hover:text-white" aria-hidden="true" />
            <div>
              <h2 className="mb-1 text-base font-bold text-white">{capability.title}</h2>
              <p className="text-xs leading-relaxed text-text-secondary">{capability.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="mb-6 text-2xl font-bold text-white">{t("Ready to Automate Your Content?")}</h2>
        <Link
          href="/auth/register"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-8 py-4 font-bold text-white transition-colors hover:bg-primary/90"
        >
          {t("Get Started for Free")}
        </Link>
      </div>
    </PageShell>
  );
}
