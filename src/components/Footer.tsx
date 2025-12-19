"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-12 md:mt-20 border-t border-[#2a2a32] py-6 px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <img alt="SEYA" src="/seyaLogo.svg" className="h-8 md:h-10 w-auto" />
          </div>
          <p className="text-[#a0a0b0] text-sm max-w-sm">{t("The AI-powered content creation platform for modern teams.")}</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">{t("Product")}</h4>
          <ul className="space-y-3">
            <li>
              <Link className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="/#features">
                {t("Features")}
              </Link>
            </li>
            <li>
              <Link className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="/#pricing">
                {t("Pricing")}
              </Link>
            </li>
            <li>
              <Link className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="/capabilities">
                {t("Capabilities")}
              </Link>
            </li>
            <li>
              <Link className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="/auth/login">
                {t("Sign In")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">{t("Company")}</h4>
          <ul className="space-y-3">
            <li>
              <Link className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="/about">
                {t("About Us")}
              </Link>
            </li>
            <li>
              <Link className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="/contact">
                {t("Contact")}
              </Link>
            </li>
            <li>
              <Link className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="/terms">
                {t("Terms of Service")}
              </Link>
            </li>
            <li>
              <Link className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="/privacy">
                {t("Privacy Policy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-[#2a2a32] text-center text-sm text-[#a0a0b0]">
        {t("© 2024 SEYA. All rights reserved.")}
      </div>
    </footer>
  );
}
