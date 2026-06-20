import type { ReactNode } from "react";

import Navbar from "@/components/marketing/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

// Shared chrome (navbar + footer) for the standalone marketing pages so they
// match the home page exactly without duplicating layout.
export default function PageShell({
  dict,
  lang,
  children,
}: {
  dict: Dictionary;
  lang: Locale;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar dict={dict.nav} lang={lang} />
      <main id="top">{children}</main>
      <Footer dict={dict.footer} lang={lang} />
    </div>
  );
}
