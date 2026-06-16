"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bot,
  Mail,
  MessagesSquare,
  Phone,
  User,
} from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

type ConversationDetail = {
  id: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  lead: {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    businessType?: string | null;
    projectType?: string | null;
  } | null;
  messages: ChatMessage[];
};

const NOT_CAPTURED = <span className="italic text-zinc-300">Not Captured</span>;

function initialsFor(lead: ConversationDetail["lead"]): string {
  const name = lead?.name?.trim();
  if (name) {
    const parts = name.split(/\s+/);
    const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : name.slice(0, 2);
    return letters.toUpperCase();
  }
  const source = (lead?.email || lead?.phone || "?").trim();
  return source.slice(0, 2).toUpperCase();
}

function formatStamp(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function dayLabel(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric", year: "numeric" });
}

export default function ConversationView({ id }: { id: string }) {
  const router = useRouter();
  const [data, setData] = useState<ConversationDetail | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "notfound" | "error">("loading");

  useEffect(() => {
    let active = true;
    void fetch(`/api/admin/conversations/${id}`, { cache: "no-store" })
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return null;
        }
        if (res.status === 404) {
          if (active) setStatus("notfound");
          return null;
        }
        if (!res.ok) {
          if (active) setStatus("error");
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (!active || !json) return;
        setData(json as ConversationDetail);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [id, router]);

  return (
    <main className="min-h-screen bg-zinc-50/60">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
        {/* Back link */}
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Link>

        <header className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Zyverra CRM
          </p>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            <MessagesSquare className="h-6 w-6 text-blue-600" />
            Conversation
          </h1>
        </header>

        {status === "loading" ? (
          <div className="mt-7 space-y-4">
            <div className="h-28 animate-pulse rounded-2xl bg-zinc-100" />
            <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-zinc-100" />
            <div className="ml-auto h-16 w-3/4 animate-pulse rounded-2xl bg-zinc-100" />
            <div className="h-16 w-2/3 animate-pulse rounded-2xl bg-zinc-100" />
          </div>
        ) : status === "notfound" ? (
          <EmptyNotice title="Conversation not found" hint="It may have been removed, or the link is invalid." />
        ) : status === "error" ? (
          <EmptyNotice title="Couldn't load conversation" hint="Please try again in a moment." />
        ) : data ? (
          <>
            {/* Lead information card */}
            <section className="mt-7 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-semibold text-white">
                    {initialsFor(data.lead)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-zinc-900">
                      {data.lead?.name?.trim() ? data.lead.name : data.lead ? "Unnamed lead" : "No lead linked"}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-zinc-400" />
                        {data.lead?.email ? data.lead.email : NOT_CAPTURED}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-zinc-400" />
                        {data.lead?.phone ? data.lead.phone : NOT_CAPTURED}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {data.lead ? (
                    <Link
                      href="/admin/leads"
                      className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
                    >
                      View in Leads
                    </Link>
                  ) : null}
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-zinc-100 pt-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-400">Business Type</dt>
                  <dd className="mt-0.5 font-medium text-zinc-800">
                    {data.lead?.businessType ? data.lead.businessType : NOT_CAPTURED}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-400">Project Type</dt>
                  <dd className="mt-0.5 font-medium text-zinc-800">
                    {data.lead?.projectType ? data.lead.projectType : NOT_CAPTURED}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-400">Messages</dt>
                  <dd className="mt-0.5 font-medium text-zinc-800">{data.messages.length}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-400">Started</dt>
                  <dd className="mt-0.5 font-medium text-zinc-800">{formatStamp(data.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-400">Last activity</dt>
                  <dd className="mt-0.5 font-medium text-zinc-800">{formatStamp(data.updatedAt)}</dd>
                </div>
              </dl>
            </section>

            {/* Conversation timeline */}
            <section className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 text-sm font-semibold text-zinc-900">Conversation Timeline</h2>
              {data.messages.length === 0 ? (
                <EmptyNotice title="No messages stored" hint="This conversation has no recorded turns yet." inline />
              ) : (
                <ol className="space-y-5">
                  {data.messages.map((m, i) => {
                    const prev = data.messages[i - 1];
                    const showDay = !prev || dayLabel(prev.createdAt) !== dayLabel(m.createdAt);
                    const isUser = m.role === "user";
                    return (
                      <li key={m.id}>
                        {showDay ? (
                          <div className="my-4 flex items-center justify-center">
                            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
                              {dayLabel(m.createdAt)}
                            </span>
                          </div>
                        ) : null}
                        <div className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                          <span
                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                              isUser ? "bg-blue-600 text-white" : "bg-zinc-200 text-zinc-600"
                            }`}
                          >
                            {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </span>
                          <div className={`flex max-w-[78%] flex-col ${isUser ? "items-end" : "items-start"}`}>
                            <div
                              className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                                isUser
                                  ? "rounded-br-md bg-blue-600 text-white"
                                  : "rounded-bl-md border border-zinc-200 bg-zinc-50 text-zinc-800"
                              }`}
                            >
                              {m.content}
                            </div>
                            <span className="mt-1 px-1 text-[11px] text-zinc-400">
                              {isUser ? "Visitor" : "Zyverra AI"} · {formatStamp(m.createdAt)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

function EmptyNotice({
  title,
  hint,
  inline = false,
}: {
  title: string;
  hint: string;
  inline?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        inline ? "py-10" : "mt-7 rounded-2xl border border-zinc-200/80 bg-white py-16 shadow-sm"
      }`}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
        <MessagesSquare className="h-6 w-6" />
      </span>
      <p className="mt-3 text-sm font-medium text-zinc-700">{title}</p>
      <p className="mt-1 text-xs text-zinc-400">{hint}</p>
    </div>
  );
}
