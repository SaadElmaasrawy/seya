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
      {/* Background Glow */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 flex flex-col gap-8 items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 items-center"
        >
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-300 mb-2 backdrop-blur-md hover:bg-blue-500/20 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New Generation AI
          </div> */}

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 block mb-2">
              {t("Your AI Assistant for Effortless Writing")}
            </span>
            <span className="h-[1.2em] relative flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text pb-2 px-1"
                >
                  {t(TEXT_KEYS[index])}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mt-4">
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
            className="flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.6)] shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]"
          >
            {t("Get Started for Free")}
          </Link>
          {/* <button className="flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-lg font-bold transition-all backdrop-blur-sm hover:border-white/20">
            Watch Demo
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}

