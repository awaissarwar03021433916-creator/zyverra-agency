import type { ReactNode } from "react";

import Navbar from "@/components/marketing/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumbs, type Crumb } from "@/components/marketing/blocks/Breadcrumbs";

// Shared chrome for every public page: header, <main id="main"> (the skip-link
// target), optional breadcrumbs, and the footer.
export default function PageShell({
  children,
  breadcrumbs,
}: {
  children: ReactNode;
  /** Every page except Home passes its trail (Home is added automatically). */
  breadcrumbs?: Crumb[];
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {children}
      </main>
      <Footer />
    </div>
  );
}
