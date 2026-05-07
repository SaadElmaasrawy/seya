import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundAmbience } from "@/components/BackgroundAmbience";

type PageShellProps = {
  children: ReactNode;
  backgroundVariant?: "default" | "single";
  contentClassName?: string;
  mainClassName?: string;
  className?: string;
};

export function PageShell({
  children,
  backgroundVariant = "default",
  contentClassName = "max-w-6xl px-4 sm:px-6 lg:px-8",
  mainClassName = "py-12",
  className = "",
}: PageShellProps) {
  return (
    <div
      className={`relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark ${className}`.trim()}
    >
      <BackgroundAmbience variant={backgroundVariant} />
      <div className="layout-container flex grow flex-col">
        <Header />
        <div className="relative z-10 flex grow justify-center py-5">
          <div className={`layout-content-container flex w-full flex-col ${contentClassName}`.trim()}>
            <main id="main-content" className={mainClassName}>
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
