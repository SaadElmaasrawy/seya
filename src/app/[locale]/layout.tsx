import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/contexts/AuthContext";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEYA - AI Writer Agent",
  description: "SEYA is your personal AI agent for high-quality content generation. Stop staring at a blank page and start creating in seconds.",
  icons: {
    icon: { url: "/seyaLogo.svg", type: "image/svg+xml" },
    shortcut: { url: "/seyaLogo.svg", type: "image/svg+xml" },
    apple: { url: "/seyaLogo.svg" },
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="dark" suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P2JTS6FB');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} bg-background-dark font-display text-white antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:font-medium focus:outline-none"
        >
          Skip to content
        </a>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P2JTS6FB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
