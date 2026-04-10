import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "../styles/globals.css";
import { appConfig } from "@/config/app";
import { env } from "@/config/env";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteUrl = env.APP_URL ? new URL(env.APP_URL) : new URL("https://zyverra.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Zyverra Labs",
  description: "AI Automation and SaaS Development Agency",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

