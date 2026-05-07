"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

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

  return (
    <footer className="mt-12 md:mt-20 border-t border-border-subtle py-6 px-4 relative z-10">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-xs">
          <Image alt="SEYA" src="/seyaLogo.svg" width={100} height={32} className="h-8 w-auto" />
          <p className="text-text-secondary text-sm">{t("platform_tagline")}</p>
        </div>
        <div className="flex gap-8 md:gap-12">
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">{t("Product")}</h4>
            <ul className="space-y-3" aria-label={t("Product")}>
              <li><Link className="text-text-secondary hover:text-white transition-colors text-sm" href="/#features" aria-current={isActivePath("/#features") ? "page" : undefined}>{t("Features")}</Link></li>
              <li><Link className="text-text-secondary hover:text-white transition-colors text-sm" href="/#pricing" aria-current={isActivePath("/#pricing") ? "page" : undefined}>{t("Pricing")}</Link></li>
              <li><Link className="text-text-secondary hover:text-white transition-colors text-sm" href="/capabilities" aria-current={isActivePath("/capabilities") ? "page" : undefined}>{t("Capabilities")}</Link></li>
              <li><Link className="text-text-secondary hover:text-white transition-colors text-sm" href="/auth/login" aria-current={isActivePath("/auth/login") ? "page" : undefined}>{t("Sign In")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">{t("Company")}</h4>
            <ul className="space-y-3" aria-label={t("Company")}>
              <li><Link className="text-text-secondary hover:text-white transition-colors text-sm" href="/about" aria-current={isActivePath("/about") ? "page" : undefined}>{t("About Us")}</Link></li>
              <li><Link className="text-text-secondary hover:text-white transition-colors text-sm" href="/contact" aria-current={isActivePath("/contact") ? "page" : undefined}>{t("Contact")}</Link></li>
              <li><Link className="text-text-secondary hover:text-white transition-colors text-sm" href="/terms" aria-current={isActivePath("/terms") ? "page" : undefined}>{t("Terms of Service")}</Link></li>
              <li><Link className="text-text-secondary hover:text-white transition-colors text-sm" href="/privacy" aria-current={isActivePath("/privacy") ? "page" : undefined}>{t("Privacy Policy")}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border-subtle text-center text-sm text-text-secondary">
        {t("footer_copyright")}
      </div>
    </footer>
  );
}
