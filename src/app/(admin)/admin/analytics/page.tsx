import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, BarChart3, Flame, Snowflake, Thermometer, Users } from "lucide-react";

import { getAdminSession } from "@/server/auth/requireAdmin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Dist = { label: string; value: number; color: string };

// Approximate numeric value from a free-text budget string (e.g. "$5,000", "10k").
function parseBudget(value: string | null): number | null {
  if (!value) return null;
  const lower = value.toLowerCase().replace(/,/g, "");
  const match = lower.match(/(\d+(?:\.\d+)?)\s*(k|m)?/);
  if (!match) return null;
  let n = Number.parseFloat(match[1]);
  if (Number.isNaN(n)) return null;
  if (match[2] === "k") n *= 1000;
  else if (match[2] === "m") n *= 1_000_000;
  return n;
}

function BarRow({ label, value, max, color }: Dist & { max: number }) {
  const pct = max > 0 ? Math.max(value > 0 ? 4 : 0, Math.round((value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 truncate text-xs text-zinc-500" title={label}>
        {label}
      </span>
      <div className="h-2.5 flex-1 rounded-full bg-zinc-100">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 shrink-0 text-right text-xs font-semibold text-zinc-800">{value}</span>
    </div>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      <span className="text-sm font-medium text-zinc-500">{label}</span>
      <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{value}</p>
      <p className="mt-1 text-xs text-zinc-400">{sub}</p>
    </div>
  );
}

function RankedList({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: { label: string; value: number }[];
}) {
  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
        <p className="text-xs text-zinc-400">{subtitle}</p>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-zinc-400">No data yet.</p>
      ) : (
        <ol className="space-y-2.5">
          {items.map((it, i) => (
            <li key={it.label} className="flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-[11px] font-semibold text-zinc-500">
                  {i + 1}
                </span>
                <span className="truncate text-sm text-zinc-700" title={it.label}>
                  {it.label}
                </span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-zinc-900">{it.value}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function Panel({ title, subtitle, data }: { title: string; subtitle: string; data: Dist[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
        <p className="text-xs text-zinc-400">{subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.map((d) => (
          <BarRow key={d.label} {...d} max={max} />
        ))}
      </div>
    </section>
  );
}

export default async function AnalyticsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const leads = await prisma.lead.findMany({
    select: {
      score: true,
      scoreTier: true,
      stage: true,
      businessType: true,
      projectType: true,
      budget: true,
    },
  });

  const total = leads.length;
  let hot = 0;
  let warm = 0;
  let cold = 0;
  for (const l of leads) {
    if (l.scoreTier === "HOT") hot += 1;
    else if (l.scoreTier === "WARM") warm += 1;
    else if (l.scoreTier === "COLD") cold += 1;
  }

  // Lead Score Distribution — numeric buckets (heat gradient).
  const scoreBuckets = [
    { label: "0–20", min: 0, max: 20, color: "bg-slate-400" },
    { label: "21–40", min: 21, max: 40, color: "bg-sky-400" },
    { label: "41–60", min: 41, max: 60, color: "bg-amber-400" },
    { label: "61–80", min: 61, max: 80, color: "bg-orange-400" },
    { label: "81–100", min: 81, max: 100, color: "bg-red-400" },
  ].map((b) => ({
    label: b.label,
    color: b.color,
    value: leads.filter((l) => typeof l.score === "number" && l.score >= b.min && l.score <= b.max).length,
  }));

  // Pipeline Distribution — stage colors consistent with the leads dashboard.
  const stageDefs = [
    { key: "NEW", label: "New", color: "bg-zinc-400" },
    { key: "CONTACTED", label: "Contacted", color: "bg-blue-400" },
    { key: "MEETING", label: "Meeting", color: "bg-violet-400" },
    { key: "PROPOSAL", label: "Proposal", color: "bg-amber-400" },
    { key: "WON", label: "Won", color: "bg-emerald-500" },
    { key: "LOST", label: "Lost", color: "bg-rose-400" },
  ];
  const pipeline: Dist[] = stageDefs.map((s) => ({
    label: s.label,
    color: s.color,
    value: leads.filter((l) => l.stage === s.key).length,
  }));

  // Industry Distribution — by business category (top 8).
  const industryMap = new Map<string, number>();
  for (const l of leads) {
    const key = l.businessType?.trim() || "Uncategorized";
    industryMap.set(key, (industryMap.get(key) ?? 0) + 1);
  }
  const industry: Dist[] = [...industryMap.entries()]
    .map(([label, value]) => ({ label, value, color: "bg-blue-400" }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Budget Distribution — bucketed from the parsed budget values.
  const budgetDefs = [
    { label: "< $1k", test: (n: number) => n < 1000 },
    { label: "$1k–$5k", test: (n: number) => n >= 1000 && n < 5000 },
    { label: "$5k–$10k", test: (n: number) => n >= 5000 && n < 10000 },
    { label: "$10k–$25k", test: (n: number) => n >= 10000 && n < 25000 },
    { label: "$25k+", test: (n: number) => n >= 25000 },
  ];
  const parsed = leads.map((l) => parseBudget(l.budget));
  const budget: Dist[] = [
    ...budgetDefs.map((b) => ({
      label: b.label,
      color: "bg-emerald-400",
      value: parsed.filter((n): n is number => n !== null && b.test(n)).length,
    })),
    { label: "Not specified", color: "bg-zinc-300", value: parsed.filter((n) => n === null).length },
  ];

  // ---- Sales Intelligence ----
  // Top Industries (excluding the "Uncategorized" bucket), top 5.
  const topIndustries = [...industryMap.entries()]
    .filter(([label]) => label !== "Uncategorized")
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Most Common Project Types, top 5.
  const projectMap = new Map<string, number>();
  for (const l of leads) {
    const key = l.projectType?.trim();
    if (!key) continue;
    projectMap.set(key, (projectMap.get(key) ?? 0) + 1);
  }
  const topProjects = [...projectMap.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Average Budget (estimated from stated budgets only).
  const budgetValues = parsed.filter((n): n is number => n !== null);
  const avgBudget =
    budgetValues.length > 0
      ? Math.round(budgetValues.reduce((sum, n) => sum + n, 0) / budgetValues.length)
      : null;
  const avgBudgetLabel = avgBudget !== null ? `$${avgBudget.toLocaleString()}` : "—";

  // Conversion Rate — WON leads as a share of all leads.
  const wonCount = leads.filter((l) => l.stage === "WON").length;
  const conversionRate = total > 0 ? Math.round((wonCount / total) * 100) : 0;

  const cards = [
    { label: "Total Leads", value: total, icon: Users, iconClass: "bg-blue-50 text-blue-600" },
    { label: "Hot Leads", value: hot, icon: Flame, iconClass: "bg-red-50 text-red-600" },
    { label: "Warm Leads", value: warm, icon: Thermometer, iconClass: "bg-amber-50 text-amber-600" },
    { label: "Cold Leads", value: cold, icon: Snowflake, iconClass: "bg-sky-50 text-sky-600" },
  ];

  return (
    <main className="min-h-screen bg-zinc-50/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Link>

        <header className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Zyverra CRM</p>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Analytics
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Lead, scoring, pipeline and budget overview.</p>
        </header>

        {/* KPI cards */}
        <section className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-500">{card.label}</span>
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${card.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">{card.value}</p>
              </div>
            );
          })}
        </section>

        {/* Distributions */}
        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="Lead Score Distribution" subtitle="Leads by score range" data={scoreBuckets} />
          <Panel title="Pipeline Distribution" subtitle="Leads by stage" data={pipeline} />
          <Panel title="Industry Distribution" subtitle="Leads by business category" data={industry} />
          <Panel title="Budget Distribution" subtitle="Leads by estimated budget" data={budget} />
        </section>

        {/* Sales Intelligence */}
        <div className="mt-8">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900">Sales Intelligence</h2>
          <p className="mt-0.5 text-sm text-zinc-500">Key signals to focus your sales effort.</p>
        </div>

        <section className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard
            label="Average Budget"
            value={avgBudgetLabel}
            sub={
              avgBudget !== null
                ? `Across ${budgetValues.length} lead${budgetValues.length === 1 ? "" : "s"} with a budget`
                : "No budgets captured yet"
            }
          />
          <MetricCard
            label="Conversion Rate"
            value={`${conversionRate}%`}
            sub={`${wonCount} won of ${total} lead${total === 1 ? "" : "s"}`}
          />
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <RankedList title="Top Industries" subtitle="Most common business categories" items={topIndustries} />
          <RankedList
            title="Most Common Project Types"
            subtitle="What leads ask us to build"
            items={topProjects}
          />
        </section>
      </div>
    </main>
  );
}
