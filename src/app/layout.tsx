import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
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
        className={`${inter.variable} bg-[#121218] font-display text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
