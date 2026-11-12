import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "../styles/globals.css";
import PageShell from "@/components/marketing/pages/PageShell";
import { NotFoundContent } from "@/components/marketing/pages/NotFoundContent";

// The app has two root layouts ((site) and (admin)), so unmatched URLs are
// handled here (experimental.globalNotFound). Returns a real 404 status.
// Same options as app/(site)/layout.tsx (see the note there).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Page not found | Zyverra Labs",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en-GB" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PageShell>
          <NotFoundContent />
        </PageShell>
      </body>
    </html>
  );
}
