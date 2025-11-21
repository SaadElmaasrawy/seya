"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative w-[90%] flex items-center justify-between whitespace-nowrap px-4 sm:px-6 py-4 z-50 m-auto">
      <div className="flex items-center gap-4 text-white">
        <Link href="/">
          <img alt="SEYA" src="/seyaLogo.svg" className="h-8 md:h-10 w-auto" />
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-end items-center gap-8">
        <nav className="flex items-center gap-9">
          <a className="text-white hover:text-[#007BFF] text-sm font-medium leading-normal transition-colors" href="#features">
            Features
          </a>
          <a className="text-white hover:text-[#007BFF] text-sm font-medium leading-normal transition-colors" href="#pricing">
            Pricing
          </a>
          <a className="text-white hover:text-[#007BFF] text-sm font-medium leading-normal transition-colors" href="/capabilities">
            Capabilities
          </a>
        </nav>
        <div className="flex gap-2">
          <Link href="/auth/register" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#007BFF] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors">
            <span className="truncate">Sign Up Free</span>
          </Link>
          <Link href="/auth/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1E1E24] hover:bg-[#2a2a32] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
            <span className="truncate">Log In</span>
          </Link>
        </div>
      </div>
      <div className="md:hidden">
        <button
          className="text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      {/* Mobile Menu Sidebar */}
      {isMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-[9998] md:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-[280px] bg-[#1E1E24] md:hidden z-[9999] shadow-2xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#2a2a32]">
                <img alt="SEYA" src="/seyaLogo.svg" className="h-8 w-auto" />
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
                <a
                  className="text-white hover:text-[#007BFF] hover:bg-[#2a2a32] text-base font-medium leading-normal transition-all py-3 px-4 rounded-lg"
                  href="#features"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  className="text-white hover:text-[#007BFF] hover:bg-[#2a2a32] text-base font-medium leading-normal transition-all py-3 px-4 rounded-lg"
                  href="#pricing"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  className="text-white hover:text-[#007BFF] hover:bg-[#2a2a32] text-base font-medium leading-normal transition-all py-3 px-4 rounded-lg"
                  href="/capabilities"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Capabilities
                </a>
              </nav>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3 p-4 border-t border-[#2a2a32]">
                <Link
                  href="/auth/register"
                  className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#007BFF] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="truncate">Sign Up Free</span>
                </Link>
                <Link
                  href="/auth/login"
                  className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#2a2a32] hover:bg-[#3a3a42] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="truncate">Log In</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
