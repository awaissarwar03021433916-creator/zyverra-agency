"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  Clock3,
  Flame,
  FolderKanban,
  LogOut,
  Mail,
  MessagesSquare,
  Phone,
  RefreshCw,
  Snowflake,
  Sparkles,
  Thermometer,
  User,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type LeadRow = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  businessType?: string | null;
  projectType?: string | null;
  budget?: string | null;
  timeline?: string | null;
  description?: string | null;
  createdAt?: string | null;
  // AI Lead Scoring (Phase 4), provided by /api/leads.
  score?: number | null;
  scoreTier?: ScoreTier | null;
  scoreReason?: string | null;
  // Sales Pipeline stage (Phase 5).
  stage?: Stage | null;
  // Latest linked conversation (if any), provided by /api/leads for deep-linking.
  conversations?: Array<{ id: string }> | null;
  // Projects under this lead (Project Context Management).
  projects?: ProjectRow[] | null;
};

type ProjectStatus = "ACTIVE" | "WON" | "LOST" | "ARCHIVED";

type ProjectRow = {
  id: string;
  title: string;
  status: ProjectStatus;
  projectType?: string | null;
  budget?: string | null;
  score?: number | null;
  scoreTier?: ScoreTier | null;
  stage?: Stage | null;
  conversations?: Array<{ id: string }> | null;
};

const NOT_CAPTURED = "Not Captured";

function NotCaptured() {
  return <span className="text-xs font-normal italic text-zinc-300">{NOT_CAPTURED}</span>;
}

type ScoreTier = "HOT" | "WARM" | "COLD";

const STAGE_ORDER = ["NEW", "CONTACTED", "MEETING", "PROPOSAL", "WON", "LOST"] as const;
type Stage = (typeof STAGE_ORDER)[number];

const STAGE_META: Record<Stage, { label: string; badge: string }> = {
  NEW: { label: "New", badge: "bg-zinc-100 text-zinc-600 ring-zinc-500/15" },
  CONTACTED: { label: "Contacted", badge: "bg-blue-50 text-blue-700 ring-blue-600/15" },
  MEETING: { label: "Meeting", badge: "bg-violet-50 text-violet-700 ring-violet-600/15" },
  PROPOSAL: { label: "Proposal", badge: "bg-amber-50 text-amber-700 ring-amber-600/15" },
  WON: { label: "Won", badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/15" },
  LOST: { label: "Lost", badge: "bg-rose-50 text-rose-700 ring-rose-600/15" },
};

const PROJECT_STATUS_BADGE: Record<ProjectStatus, string> = {
  ACTIVE: "bg-blue-50 text-blue-700 ring-blue-600/15",
  WON: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  LOST: "bg-rose-50 text-rose-700 ring-rose-600/15",
  ARCHIVED: "bg-zinc-100 text-zinc-500 ring-zinc-500/15",
};

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const label = status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${PROJECT_STATUS_BADGE[status]}`}
    >
      {label}
    </span>
  );
}

// Read-only pipeline-stage pill.
function StageBadge({ stage }: { stage?: Stage | null }) {
  const meta = STAGE_META[stage ?? "NEW"];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${meta.badge}`}
    >
      {meta.label}
    </span>
  );
}

// Inline, badge-styled stage editor for changing stage directly in the table.
// Stops click propagation so it doesn't toggle the row's expand/collapse.
function StageSelect({
  value,
  onChange,
}: {
  value: Stage;
  onChange: (stage: Stage) => void;
}) {
  const meta = STAGE_META[value];
  return (
    <select
      value={value}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value as Stage)}
      className={`cursor-pointer rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 ${meta.badge}`}
      aria-label="Pipeline stage"
    >
      {STAGE_ORDER.map((s) => (
        <option key={s} value={s}>
          {STAGE_META[s].label}
        </option>
      ))}
    </select>
  );
}

const SCORE_TIER_STYLES: Record<ScoreTier, { badge: string; icon: LucideIcon; card: string }> = {
  HOT: { badge: "bg-red-50 text-red-700 ring-red-600/20", icon: Flame, card: "bg-red-50 text-red-600" },
  WARM: { badge: "bg-amber-50 text-amber-700 ring-amber-600/20", icon: Thermometer, card: "bg-amber-50 text-amber-600" },
  COLD: { badge: "bg-sky-50 text-sky-700 ring-sky-600/20", icon: Snowflake, card: "bg-sky-50 text-sky-600" },
};

// Reusable HOT/WARM/COLD badge. Hover shows the score explanation.
function ScoreBadge({
  tier,
  score,
  reason,
  withScore = true,
}: {
  tier?: ScoreTier | null;
  score?: number | null;
  reason?: string | null;
  withScore?: boolean;
}) {
  if (!tier) {
    return <span className="text-xs font-normal italic text-zinc-300">Unscored</span>;
  }
  const style = SCORE_TIER_STYLES[tier];
  const Icon = style.icon;
  return (
    <span
      title={reason ?? undefined}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style.badge}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {tier}
      {withScore && typeof score === "number" ? <span className="opacity-70">· {score}</span> : null}
    </span>
  );
}

// Display-only categorization. This NEVER mutates or persists lead data — it derives
// a friendly category from text already present (businessType, with a soft fallback to
// projectType/description) purely for presentation. Order matters: more specific rules first.
type LeadCategory = { label: string; className: string };

const GENERAL_CATEGORY: LeadCategory = {
  label: "General Business",
  className: "bg-zinc-100 text-zinc-600 ring-zinc-500/15",
};

const CATEGORY_RULES: Array<{ label: string; className: string; keywords: string[] }> = [
  {
    label: "Healthcare",
    className: "bg-rose-50 text-rose-700 ring-rose-600/15",
    keywords: ["clinic", "hospital", "doctor", "dental", "dentist", "medical", "pharmacy", "health", "therapy", "wellness", "veterinary", "dermatolog"],
  },
  {
    label: "Beauty",
    className: "bg-pink-50 text-pink-700 ring-pink-600/15",
    keywords: ["salon", "spa", "beauty", "barber", "hair", "nail", "makeup", "cosmetic", "skincare", "lash"],
  },
  {
    label: "Restaurant",
    className: "bg-amber-50 text-amber-700 ring-amber-600/15",
    keywords: ["restaurant", "cafe", "coffee", "food", "dining", "bakery", "catering", "kitchen", "pizza", "bistro", "diner", "grill"],
  },
  {
    label: "Real Estate",
    className: "bg-teal-50 text-teal-700 ring-teal-600/15",
    keywords: ["real estate", "property", "properties", "realty", "realtor", "housing", "apartment", "rental", "broker", "mortgage"],
  },
  {
    label: "E-commerce",
    className: "bg-blue-50 text-blue-700 ring-blue-600/15",
    keywords: ["e-commerce", "ecommerce", "online store", "shop", "store", "retail", "bag", "clothing", "fashion", "boutique", "apparel", "jewelry", "jeweller", "shoes", "dropship", "merch"],
  },
  {
    label: "Fitness",
    className: "bg-lime-50 text-lime-700 ring-lime-600/15",
    keywords: ["gym", "fitness", "yoga", "pilates", "trainer", "crossfit", "sports"],
  },
  {
    label: "Education",
    className: "bg-indigo-50 text-indigo-700 ring-indigo-600/15",
    keywords: ["school", "education", "academy", "tutor", "course", "training", "university", "college", "coaching", "e-learning", "edtech"],
  },
  {
    label: "Finance",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    keywords: ["finance", "financial", "bank", "fintech", "insurance", "accounting", "loan", "investment", "tax", "crypto"],
  },
  {
    label: "Energy",
    className: "bg-yellow-50 text-yellow-700 ring-yellow-600/15",
    keywords: ["solar", "renewable", "energy", "power plant", "electric vehicle", "ev charging"],
  },
  {
    label: "Travel & Hospitality",
    className: "bg-cyan-50 text-cyan-700 ring-cyan-600/15",
    keywords: ["travel", "tour", "hotel", "hospitality", "airline", "resort", "booking", "tourism"],
  },
  {
    label: "Automotive",
    className: "bg-slate-100 text-slate-700 ring-slate-600/15",
    keywords: ["car ", "cars", "auto", "vehicle", "garage", "dealership", "mechanic", "motors"],
  },
  {
    label: "Legal",
    className: "bg-stone-100 text-stone-700 ring-stone-600/15",
    keywords: ["law ", "legal", "attorney", "lawyer", "advocate", "notary"],
  },
  {
    label: "Construction",
    className: "bg-orange-50 text-orange-700 ring-orange-600/15",
    keywords: ["construction", "builder", "contractor", "plumbing", "renovation", "interior", "architect", "carpentry"],
  },
  {
    label: "Logistics",
    className: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/15",
    keywords: ["logistics", "shipping", "delivery", "courier", "transport", "freight", "warehouse"],
  },
  {
    label: "Manufacturing",
    className: "bg-neutral-100 text-neutral-700 ring-neutral-600/15",
    keywords: ["manufactur", "factory", "wholesale", "industrial", "production unit"],
  },
  {
    // Checked last: genuine tech businesses only. Deliverable words (website, app, CRM)
    // describe what Zyverra builds — not the client's industry — so they are deliberately excluded.
    label: "Technology",
    className: "bg-violet-50 text-violet-700 ring-violet-600/15",
    keywords: ["software", "saas", "startup", "tech company", "tech firm", "it company", "it services", "artificial intelligence", "machine learning"],
  },
];

function categorizeLead(lead: LeadRow): LeadCategory {
  // Match across every text signal we have. `description` holds the raw chat message
  // (e.g. "ladies bags", "clinic"), which is far richer than the chatbot's coarse
  // `businessType` label (which collapses "bags" -> "manufacturing"), so it must always
  // be considered — not just as a fallback.
  const haystack = [lead.businessType, lead.projectType, lead.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .trim();

  if (!haystack) return GENERAL_CATEGORY;

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((keyword) => haystack.includes(keyword))) {
      return { label: rule.label, className: rule.className };
    }
  }
  return GENERAL_CATEGORY;
}

function initialsFor(lead: LeadRow): string {
  const name = lead.name?.trim();
  if (name) {
    const parts = name.split(/\s+/);
    const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : name.slice(0, 2);
    return letters.toUpperCase();
  }
  const source = (lead.email || lead.phone || "?").trim();
  return source.slice(0, 2).toUpperCase();
}

function formatDate(value?: string | null): { date: string; time: string } {
  if (!value) return { date: "—", time: "" };
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { date: "—", time: "" };
  return {
    date: d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
    time: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function LeadsTable() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void fetch("/api/leads", { cache: "no-store" })
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        if (!active || !Array.isArray(data)) return;
        setLeads(data as LeadRow[]);
      })
      .catch(() => {
        if (!active) return;
        setLeads([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  const stats = useMemo(() => {
    let hot = 0;
    let warm = 0;
    let cold = 0;
    const stageCounts: Record<Stage, number> = {
      NEW: 0,
      CONTACTED: 0,
      MEETING: 0,
      PROPOSAL: 0,
      WON: 0,
      LOST: 0,
    };
    for (const lead of leads) {
      if (lead.scoreTier === "HOT") hot += 1;
      else if (lead.scoreTier === "WARM") warm += 1;
      else if (lead.scoreTier === "COLD") cold += 1;
      stageCounts[lead.stage ?? "NEW"] += 1;
    }
    return { total: leads.length, hot, warm, cold, stageCounts };
  }, [leads]);

  // CRM priority view: highest score first, unscored last, newest as tiebreak.
  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      const sa = typeof a.score === "number" ? a.score : -1;
      const sb = typeof b.score === "number" ? b.score : -1;
      if (sb !== sa) return sb - sa;
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return tb - ta;
    });
  }, [leads]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/admin/login");
    router.refresh();
  }

  // Update a lead's pipeline stage: optimistic UI, reverting if the request fails.
  const updateLeadStage = useCallback(
    async (id: string, stage: Stage) => {
      const previous = leads.find((l) => l.id === id)?.stage ?? "NEW";
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
      try {
        const res = await fetch(`/api/admin/leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage }),
        });
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error("stage update failed");
      } catch {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: previous } : l)));
      }
    },
    [leads, router]
  );

  // Update a single project's pipeline stage independently: optimistic, reverting on failure.
  const updateProjectStage = useCallback(
    async (leadId: string, projectId: string, stage: Stage) => {
      const previous =
        leads.find((l) => l.id === leadId)?.projects?.find((p) => p.id === projectId)?.stage ??
        "NEW";
      const patch = (s: Stage) =>
        setLeads((prev) =>
          prev.map((l) =>
            l.id === leadId
              ? {
                  ...l,
                  projects: l.projects?.map((p) => (p.id === projectId ? { ...p, stage: s } : p)),
                }
              : l
          )
        );
      patch(stage);
      try {
        const res = await fetch(`/api/admin/projects/${projectId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage }),
        });
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error("project stage update failed");
      } catch {
        patch(previous);
      }
    },
    [leads, router]
  );

  const summaryCards = [
    {
      label: "Total Leads",
      value: stats.total,
      caption: "All captured leads",
      icon: Users,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      label: "Hot Leads",
      value: stats.hot,
      caption: "Ready to engage",
      icon: Flame,
      iconClass: SCORE_TIER_STYLES.HOT.card,
    },
    {
      label: "Warm Leads",
      value: stats.warm,
      caption: "Worth nurturing",
      icon: Thermometer,
      iconClass: SCORE_TIER_STYLES.WARM.card,
    },
    {
      label: "Cold Leads",
      value: stats.cold,
      caption: "Low buying intent",
      icon: Snowflake,
      iconClass: SCORE_TIER_STYLES.COLD.card,
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-50/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Zyverra CRM
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Leads Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Leads captured from Zyverra AI, in one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/analytics"
              className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Summary cards */}
        <section className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-500">{card.label}</span>
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${card.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
                  {loading ? (
                    <span className="inline-block h-8 w-12 animate-pulse rounded-md bg-zinc-100 align-middle" />
                  ) : (
                    card.value
                  )}
                </p>
                <p className="mt-1 text-xs text-zinc-400">{card.caption}</p>
              </div>
            );
          })}
        </section>

        {/* Pipeline statistics — count of leads in each stage */}
        <section className="mt-5 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold text-zinc-900">Pipeline</h2>
            <span className="text-xs text-zinc-400">Leads by stage</span>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {STAGE_ORDER.map((s) => (
              <div
                key={s}
                className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-3 text-center"
              >
                <p className="text-2xl font-bold tracking-tight text-zinc-900">
                  {loading ? (
                    <span className="inline-block h-7 w-8 animate-pulse rounded-md bg-zinc-100 align-middle" />
                  ) : (
                    stats.stageCounts[s]
                  )}
                </p>
                <span
                  className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STAGE_META[s].badge}`}
                >
                  {STAGE_META[s].label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Table card */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-zinc-900">All Leads</h2>
              {!loading ? (
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                  {leads.length}
                </span>
              ) : null}
            </div>
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin text-zinc-300" />
            ) : null}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1280px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[9%]" />
                <col className="w-[17%]" />
                <col className="w-[15%]" />
                <col className="w-[9%]" />
                <col className="w-[10%]" />
                <col className="w-[21%]" />
                <col className="w-[9%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/70 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  <th className="px-5 py-3">Priority</th>
                  <th className="px-5 py-3">Lead</th>
                  <th className="px-5 py-3">Business &amp; Project</th>
                  <th className="px-5 py-3">Budget</th>
                  <th className="px-5 py-3">Timeline</th>
                  <th className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                      AI Summary
                    </span>
                  </th>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-5 py-4" colSpan={8}>
                        <div className="h-5 w-full animate-pulse rounded-md bg-zinc-100" />
                      </td>
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  <tr>
                    <td className="px-5 py-16" colSpan={8}>
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
                          <Users className="h-6 w-6" />
                        </span>
                        <p className="mt-3 text-sm font-medium text-zinc-700">No leads yet</p>
                        <p className="mt-1 text-xs text-zinc-400">
                          New leads from Zyverra AI will appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedLeads.map((lead) => {
                    const created = formatDate(lead.createdAt);
                    const isExpanded = expandedId === lead.id;
                    return (
                      <Fragment key={lead.id}>
                      <tr
                        onClick={() =>
                          setExpandedId((prev) => (prev === lead.id ? null : lead.id))
                        }
                        className={`cursor-pointer text-sm text-zinc-700 transition hover:bg-zinc-50/70 ${
                          isExpanded ? "bg-blue-50/50" : ""
                        }`}
                      >
                        {/* Priority: AI score/tier + inline-editable pipeline stage */}
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-col items-start gap-1.5">
                            <ScoreBadge tier={lead.scoreTier} score={lead.score} reason={lead.scoreReason} />
                            <StageSelect
                              value={lead.stage ?? "NEW"}
                              onChange={(s) => updateLeadStage(lead.id, s)}
                            />
                          </div>
                        </td>

                        {/* Lead: identity + contact in one scannable block */}
                        <td className="px-5 py-4 align-top">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-semibold text-white">
                              {initialsFor(lead)}
                            </span>
                            <div className="min-w-0">
                              <div className="truncate font-semibold text-zinc-900" title={lead.name ?? undefined}>
                                {lead.name?.trim() ? lead.name : <NotCaptured />}
                              </div>
                              <div className="mt-1 flex items-center gap-1.5 truncate text-xs text-zinc-500">
                                <Mail className="h-3 w-3 shrink-0 text-zinc-400" />
                                {lead.email ? (
                                  <span className="truncate" title={lead.email}>{lead.email}</span>
                                ) : (
                                  <NotCaptured />
                                )}
                              </div>
                              <div className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-zinc-500">
                                <Phone className="h-3 w-3 shrink-0 text-zinc-400" />
                                {lead.phone ? (
                                  <span className="truncate">{lead.phone}</span>
                                ) : (
                                  <NotCaptured />
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Business & Project: category-colored industry chip + project */}
                        <td className="px-5 py-4 align-top">
                          {lead.businessType ? (
                            <span
                              className={`inline-flex max-w-full items-center truncate rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${categorizeLead(lead).className}`}
                            >
                              {lead.businessType}
                            </span>
                          ) : (
                            <NotCaptured />
                          )}
                          <div className="mt-1.5">
                            {lead.projectType ? (
                              <span className="inline-flex max-w-full items-center truncate rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">
                                {lead.projectType}
                              </span>
                            ) : (
                              <NotCaptured />
                            )}
                          </div>
                        </td>

                        {/* Budget: sales-critical, emphasized */}
                        <td className="px-5 py-4 align-top">
                          {lead.budget ? (
                            <span
                              className="inline-flex max-w-full items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-700"
                              title={lead.budget}
                            >
                              <Wallet className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{lead.budget}</span>
                            </span>
                          ) : (
                            <NotCaptured />
                          )}
                        </td>

                        {/* Timeline: urgency signal, emphasized */}
                        <td className="px-5 py-4 align-top">
                          {lead.timeline ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-sm font-medium text-amber-700">
                              <Clock3 className="h-3.5 w-3.5" />
                              {lead.timeline}
                            </span>
                          ) : (
                            <NotCaptured />
                          )}
                        </td>

                        {/* AI Summary: the at-a-glance sales context */}
                        <td className="px-5 py-4 align-top">
                          {lead.description?.trim() ? (
                            <p
                              className="line-clamp-3 text-xs leading-relaxed text-zinc-600"
                              title={lead.description}
                            >
                              {lead.description}
                            </p>
                          ) : (
                            <NotCaptured />
                          )}
                        </td>

                        {/* Received */}
                        <td className="px-5 py-4 align-top whitespace-nowrap">
                          {created.time || created.date !== "—" ? (
                            <>
                              <div className="font-medium text-zinc-700">{created.date}</div>
                              {created.time ? (
                                <div className="mt-0.5 text-xs text-zinc-400">{created.time}</div>
                              ) : null}
                            </>
                          ) : (
                            <NotCaptured />
                          )}
                        </td>

                        <td className="px-5 py-4 align-top text-right">
                          <div className="flex items-center justify-end gap-2">
                            {(() => {
                              const conversationId = lead.conversations?.[0]?.id;
                              return conversationId ? (
                                <Link
                                  href={`/admin/conversations/${conversationId}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                                >
                                  <MessagesSquare className="h-3.5 w-3.5" />
                                  View Conversation
                                </Link>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-300">
                                  <MessagesSquare className="h-3.5 w-3.5" />
                                  No conversation
                                </span>
                              );
                            })()}
                            <ChevronDown
                              className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </td>
                      </tr>
                      {isExpanded ? (
                        <tr className="bg-blue-50/40">
                          <td colSpan={8} className="px-5 pb-5 pt-0">
                            <LeadDetailCard
                              lead={lead}
                              onStageChange={updateLeadStage}
                              onProjectStageChange={updateProjectStage}
                            />
                          </td>
                        </tr>
                      ) : null}
                      </Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoTile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200/70 bg-white p-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// Expanded per-lead CRM card: clean, badge-driven view of the AI-extracted data.
// Missing fields render the "Not Captured" treatment — never raw/empty values.
function LeadDetailCard({
  lead,
  onStageChange,
  onProjectStageChange,
}: {
  lead: LeadRow;
  onStageChange: (id: string, stage: Stage) => void;
  onProjectStageChange: (leadId: string, projectId: string, stage: Stage) => void;
}) {
  const category = categorizeLead(lead);

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 sm:p-5">
      {/* Dedicated AI Summary — the first thing a salesperson reads */}
      <section className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">AI Project Summary</h3>
            <p className="text-[11px] text-zinc-400">Auto-generated from the conversation</p>
          </div>
        </div>
        {lead.description?.trim() ? (
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-700">
            {lead.description}
          </p>
        ) : (
          <p className="mt-3 text-sm">
            <NotCaptured />
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Pipeline Stage — editable from the dashboard */}
        <InfoTile label="Pipeline Stage">
          <div className="flex items-center gap-2">
            <StageBadge stage={lead.stage} />
            <select
              value={lead.stage ?? "NEW"}
              onChange={(e) => onStageChange(lead.id, e.target.value as Stage)}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
            >
              {STAGE_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STAGE_META[s].label}
                </option>
              ))}
            </select>
          </div>
        </InfoTile>

        {/* Lead Score — tier badge + the explainable breakdown */}
        <InfoTile label="Lead Score">
          {lead.scoreTier ? (
            <div className="space-y-1.5">
              <ScoreBadge tier={lead.scoreTier} score={lead.score} reason={lead.scoreReason} />
              {lead.scoreReason ? (
                <p className="text-xs leading-relaxed text-zinc-500">{lead.scoreReason}</p>
              ) : null}
            </div>
          ) : (
            <span className="text-xs font-normal italic text-zinc-300">Unscored</span>
          )}
        </InfoTile>

        {/* Contact Information */}
        <InfoTile label="Contact Information">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-zinc-800">
              <User className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
              {lead.name?.trim() ? (
                <span className="truncate font-medium">{lead.name}</span>
              ) : (
                <NotCaptured />
              )}
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Mail className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
              {lead.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="truncate hover:text-blue-600 hover:underline"
                >
                  {lead.email}
                </a>
              ) : (
                <NotCaptured />
              )}
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
              {lead.phone ? (
                <a
                  href={`tel:${lead.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="truncate hover:text-blue-600 hover:underline"
                >
                  {lead.phone}
                </a>
              ) : (
                <NotCaptured />
              )}
            </div>
          </div>
        </InfoTile>

        {/* Business Type */}
        <InfoTile label="Business Type">
          {lead.businessType ? (
            <span
              className={`inline-flex max-w-full items-center truncate rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${category.className}`}
            >
              {lead.businessType}
            </span>
          ) : (
            <NotCaptured />
          )}
        </InfoTile>

        {/* Project Type */}
        <InfoTile label="Project Type">
          {lead.projectType ? (
            <span className="inline-flex max-w-full items-center truncate rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
              {lead.projectType}
            </span>
          ) : (
            <NotCaptured />
          )}
        </InfoTile>

        {/* Budget */}
        <InfoTile label="Budget">
          {lead.budget ? (
            <span
              className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-700"
              title={lead.budget}
            >
              <Wallet className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{lead.budget}</span>
            </span>
          ) : (
            <NotCaptured />
          )}
        </InfoTile>

        {/* Timeline */}
        <InfoTile label="Timeline">
          {lead.timeline ? (
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-sm font-medium text-amber-700">
              <Clock3 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{lead.timeline}</span>
            </span>
          ) : (
            <NotCaptured />
          )}
        </InfoTile>
      </div>

      {/* Projects (Lead → Projects → Conversations) */}
      <div className="mt-4 rounded-xl border border-zinc-200/70 bg-white p-3.5">
        <div className="mb-3 flex items-center gap-2">
          <FolderKanban className="h-4 w-4 text-blue-600" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">Projects</p>
          {lead.projects && lead.projects.length > 0 ? (
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600">
              {lead.projects.length}
            </span>
          ) : null}
        </div>
        {lead.projects && lead.projects.length > 0 ? (
          <ul className="space-y-2">
            {lead.projects.map((p) => {
              const conversationId = p.conversations?.[0]?.id;
              return (
                <li
                  key={p.id}
                  className="flex flex-col gap-2 rounded-lg border border-zinc-100 bg-zinc-50/60 p-2.5 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-medium text-zinc-900" title={p.title}>
                        {p.title}
                      </span>
                      <ProjectStatusBadge status={p.status} />
                      <ScoreBadge tier={p.scoreTier} score={p.score} />
                      <StageSelect
                        value={p.stage ?? "NEW"}
                        onChange={(s) => onProjectStageChange(lead.id, p.id, s)}
                      />
                    </div>
                    {p.projectType || p.budget ? (
                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {[p.projectType, p.budget].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  {conversationId ? (
                    <Link
                      href={`/admin/conversations/${conversationId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                    >
                      <MessagesSquare className="h-3.5 w-3.5" />
                      View Conversation
                    </Link>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-300">
                      <MessagesSquare className="h-3.5 w-3.5" />
                      No conversation
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-xs text-zinc-400">No projects yet for this lead.</p>
        )}
      </div>
    </div>
  );
}
