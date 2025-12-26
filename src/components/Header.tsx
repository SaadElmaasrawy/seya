"use client";

import { Link, useRouter, usePathname } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.authenticated);
        setCheckingAuth(false);
      })
      .catch(() => setCheckingAuth(false));
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 py-3"
        : "bg-transparent py-5"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 text-white">
          <Link href="/">
            <Image alt="SEYA" src="/seyaLogo.svg" width={120} height={40} className="h-8 md:h-10 w-auto" priority />
          </Link>
        </div>
        <div className="hidden md:flex flex-1 justify-end items-center gap-8">
          <nav className="flex items-center gap-9">
            <Link className="text-white hover:text-primary text-sm font-medium leading-normal transition-colors" href="/#features">
              {t("Features")}
            </Link>
            <Link className="text-white hover:text-primary text-sm font-medium leading-normal transition-colors" href="/#pricing">
              {t("Pricing")}
            </Link>
            <Link className="text-white hover:text-primary text-sm font-medium leading-normal transition-colors" href="/capabilities">
              {t("Capabilities")}
            </Link>
          </nav>
          <div className="flex gap-2 items-center">
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-primary text-sm font-bold px-2 transition-colors uppercase"
            >
              {locale === "en" ? "AR" : "EN"}
            </button>
            {!checkingAuth && (
              isAuthenticated ? (
                <Link href="/chat" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors">
                  <span className="truncate">{t("Go to Chat")}</span>
                </Link>
              ) : (
                <>
                  <Link href="/auth/register" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors">
                    <span className="truncate">{t("Sign Up Free")}</span>
                  </Link>
                  <Link href="/auth/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1E1E24] hover:bg-[#2a2a32] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
                    <span className="truncate">{t("Log In")}</span>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-white hover:text-primary text-sm font-bold transition-colors uppercase"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>


      {/* Mobile Menu Sidebar */}
      {isMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-9998 md:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className={`fixed top-0 ${locale === 'ar' ? 'left-0' : 'right-0'} h-full w-[280px] bg-[#1E1E24] md:hidden z-9999 shadow-2xl animate-slide-in-${locale === 'ar' ? 'left' : 'right'}`}>
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#2a2a32]">
                <Image alt="SEYA" src="/seyaLogo.svg" width={100} height={32} className="h-8 w-auto" />
                <button
                  className="text-white hover:bg-[#2a2a32] p-2 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-4 gap-2 flex-1">
                <Link
                  className="text-white hover:text-primary hover:bg-[#2a2a32] text-base font-medium leading-normal transition-all py-3 px-4 rounded-lg"
                  href="/#features"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("Features")}
                </Link>
                <Link
                  className="text-white hover:text-primary hover:bg-[#2a2a32] text-base font-medium leading-normal transition-all py-3 px-4 rounded-lg"
                  href="/#pricing"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("Pricing")}
                </Link>
                <Link
                  className="text-white hover:text-primary hover:bg-[#2a2a32] text-base font-medium leading-normal transition-all py-3 px-4 rounded-lg"
                  href="/capabilities"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("Capabilities")}
                </Link>
              </nav>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3 p-4 border-t border-[#2a2a32]">
                {!checkingAuth && (
                  isAuthenticated ? (
                    <Link
                      href="/chat"
                      className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="truncate">{t("Go to Chat")}</span>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/auth/register"
                        className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="truncate">{t("Sign Up Free")}</span>
                      </Link>
                      <Link
                        href="/auth/login"
                        className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#2a2a32] hover:bg-[#3a3a42] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="truncate">{t("Log In")}</span>
                      </Link>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.header>
  );
}
