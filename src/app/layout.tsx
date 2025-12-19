import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} bg-[#121218] font-display text-white antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
