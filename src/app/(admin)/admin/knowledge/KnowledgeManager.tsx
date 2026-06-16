"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

type Status = "DRAFT" | "PUBLISHED";

type Article = {
  id: string;
  title: string;
  category?: string | null;
  content: string;
  status: Status;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type Draft = { id: string | null; title: string; category: string; content: string; status: Status };

const CATEGORIES = [
  "Services",
  "Pricing",
  "FAQs",
  "Process",
  "Portfolio",
  "Case Studies",
  "Company Information",
] as const;

const EMPTY_DRAFT: Draft = { id: null, title: "", category: "", content: "", status: "DRAFT" };

const STATUS_BADGE: Record<Status, string> = {
  DRAFT: "bg-zinc-100 text-zinc-600 ring-zinc-500/15",
  PUBLISHED: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
};

function formatDate(value?: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STATUS_BADGE[status]}`}
    >
      {status === "PUBLISHED" ? "Published" : "Draft"}
    </span>
  );
}

export default function KnowledgeManager() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | Status>("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/knowledge", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) setArticles(data as Article[]);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (statusFilter && a.status !== statusFilter) return false;
      if (categoryFilter && (a.category ?? "") !== categoryFilter) return false;
      if (q) {
        const hay = `${a.title} ${a.category ?? ""} ${a.content}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [articles, query, categoryFilter, statusFilter]);

  async function save() {
    if (!draft) return;
    if (!draft.title.trim() || !draft.content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setSaving(true);
    setError(null);
    const isEdit = Boolean(draft.id);
    const url = isEdit ? `/api/admin/knowledge/${draft.id}` : "/api/admin/knowledge";
    const method = isEdit ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draft.title.trim(),
          category: draft.category.trim(),
          content: draft.content.trim(),
          status: draft.status,
        }),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setError((j && j.error) || "Could not save the article.");
        return;
      }
      setDraft(null);
      await load();
    } catch {
      setError("Could not save the article.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this article? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/knowledge/${id}`, { method: "DELETE" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
        if (draft?.id === id) setDraft(null);
      }
    } catch {
      /* ignore */
    }
  }

  const publishedCount = articles.filter((a) => a.status === "PUBLISHED").length;
  const draftCount = articles.length - publishedCount;

  return (
    <main className="min-h-screen bg-zinc-50/60">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Link>

        {/* Header */}
        <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Zyverra CRM</p>
            <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Knowledge Base
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {publishedCount} published · {draftCount} draft. Only published articles ground Zyverra AI.
            </p>
          </div>
          {!draft ? (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setDraft(EMPTY_DRAFT);
              }}
              className="inline-flex h-9 w-fit items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New Article
            </button>
          ) : null}
        </header>

        {/* Editor */}
        {draft ? (
          <section className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-900">
                {draft.id ? "Edit article" : "New article"}
              </h2>
              <button
                type="button"
                onClick={() => setDraft(null)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Close editor"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Title"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                >
                  <option value="">No category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value as Status })}
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                >
                  <option value="DRAFT">Draft — hidden from chatbot</option>
                  <option value="PUBLISHED">Published — used by chatbot</option>
                </select>
              </div>
              <textarea
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                placeholder="Content"
                rows={7}
                className="w-full resize-y rounded-lg border border-zinc-200 px-3 py-2 text-sm leading-relaxed text-zinc-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
              />
              {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={save}
                  disabled={saving}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : null}
                  {draft.id ? "Save changes" : "Create article"}
                </button>
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="inline-flex h-9 items-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {/* Toolbar: search + filters */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "" | Status)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
          >
            <option value="">All statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>

        {/* List */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-zinc-900">Articles</h2>
              {!loading ? (
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                  {filtered.length}
                </span>
              ) : null}
            </div>
            {loading ? <RefreshCw className="h-4 w-4 animate-spin text-zinc-300" /> : null}
          </div>

          {loading ? (
            <div className="space-y-3 p-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-zinc-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
                <BookOpen className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm font-medium text-zinc-700">
                {articles.length === 0 ? "No articles yet" : "No matching articles"}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {articles.length === 0
                  ? "Create your first knowledge article."
                  : "Try a different search or filter."}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {filtered.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-medium text-zinc-900">{a.title}</h3>
                      <StatusBadge status={a.status} />
                      {a.category ? (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 ring-1 ring-inset ring-blue-600/15">
                          {a.category}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">{a.content}</p>
                    <p className="mt-1 text-[11px] text-zinc-400">Updated {formatDate(a.updatedAt)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setError(null);
                        setDraft({
                          id: a.id,
                          title: a.title,
                          category: a.category ?? "",
                          content: a.content,
                          status: a.status,
                        });
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                      aria-label="Edit article"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(a.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Delete article"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
