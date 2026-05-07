"use client";

import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TEXT_KEYS = [
  "hero_typing_articles",
  "hero_typing_tweets",
  "hero_typing_scripts",
  "hero_typing_posts",
];

export function Hero() {
  const t = useTranslations();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TEXT_KEYS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="relative z-10 flex flex-col gap-8 items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 items-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
            <span className="text-white block mb-2">
              {t("Your AI Assistant for Effortless Writing")}
            </span>
            <span
              className="h-[1.2em] relative flex items-center justify-center overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-primary pb-2 px-1"
                >
                  {t(TEXT_KEYS[index])}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mt-4">
            {t("hero_description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8"
        >
          <Link
            href="/auth/register"
            className="flex items-center justify-center px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-lg font-bold transition-colors"
          >
            {t("Get Started for Free")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
