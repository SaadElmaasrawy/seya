"use client";

import { Link, useRouter, usePathname } from "@/i18n/routing";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@/components/Icon";

const PRIMARY_NAV_LINKS = [
  { href: "/#features", key: "Features" },
  { href: "/#pricing", key: "Pricing" },
  { href: "/capabilities", key: "Capabilities" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading: checkingAuth } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const isActivePath = (href: string) => {
    if (href.includes("#")) {
      return false;
    }
    const [routePath] = href.split("#");
    if (routePath === "/") {
      return pathname === "/";
    }
    return pathname === routePath;
  };

  const mobileMenuAnimationClass =
    locale === "ar" ? "animate-slide-in-left left-0" : "animate-slide-in-right right-0";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background-dark/80 backdrop-blur-md border-b border-white/5 py-3"
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
          <nav className="flex items-center gap-9" aria-label={t("Product")}>
            {PRIMARY_NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                className="text-white hover:text-primary text-sm font-medium leading-normal transition-colors"
                href={item.href}
                aria-current={isActivePath(item.href) ? "page" : undefined}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2 items-center">
            <button
              onClick={toggleLanguage}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 text-white transition-colors hover:bg-white/5 hover:text-primary uppercase text-sm font-bold"
              aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              {locale === "en" ? "AR" : "EN"}
            </button>
            {!checkingAuth && (
              isAuthenticated ? (
                <Link href="/chat" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                  <span className="truncate">{t("Go to Chat")}</span>
                </Link>
              ) : (
                <>
                  <Link href="/auth/register" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                    <span className="truncate">{t("Sign Up Free")}</span>
                  </Link>
                  <Link href="/auth/login" className="text-white/70 hover:text-white text-sm font-medium transition-colors px-2">
                    {t("Log In")}
                  </Link>
                </>
              )
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 text-white transition-colors hover:bg-white/5 hover:text-primary uppercase text-sm font-bold"
            aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
          >
            {locale === "en" ? "AR" : "EN"}
          </button>
          <button
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon name="menu" className="text-[1.75rem]" aria-hidden="true" />
          </button>
        </div>
      </div>


      {/* Mobile Menu Sidebar */}
      {isMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-[9998] md:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
            role="presentation"
          />

          {/* Sidebar */}
          <div id="mobile-navigation" className={`fixed top-0 h-full w-[280px] bg-surface md:hidden z-[9999] shadow-2xl ${mobileMenuAnimationClass}`}>
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-border-subtle">
                <Image alt="SEYA" src="/seyaLogo.svg" width={100} height={32} className="h-8 w-auto" />
                <button
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-border-subtle"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <Icon name="close" className="text-xl" aria-hidden="true" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-4 gap-2 flex-1" aria-label={t("Product")}>
                {PRIMARY_NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    className="text-white hover:text-primary hover:bg-border-subtle text-base font-medium leading-normal transition-all py-3 px-4 rounded-lg"
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActivePath(item.href) ? "page" : undefined}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3 p-4 border-t border-border-subtle">
                {!checkingAuth && (
                  isAuthenticated ? (
                    <Link
                      href="/chat"
                      className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="truncate">{t("Go to Chat")}</span>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/auth/register"
                        className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="truncate">{t("Sign Up Free")}</span>
                      </Link>
                      <Link
                        href="/auth/login"
                        className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-surface hover:bg-border-subtle text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
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
