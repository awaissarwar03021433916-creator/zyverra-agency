import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, siteOrigin } from "@/lib/schema";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus the matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(siteOrigin(), trail)} />
      <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/40">
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 px-4 py-2.5 text-xs text-muted-foreground sm:px-6">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.path} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight aria-hidden className="h-3 w-3" />}
                {last ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="transition-colors hover:text-primary">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
