"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Clock3, FolderKanban, Plus, X } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { useChat } from "@/hooks/useChat";
import { useProjects, type ChatProject } from "@/hooks/useProjects";
import type { Message } from "@/types/chat";

type Props = {
  onClose: () => void;
};

export function ChatWindow({ onClose }: Props) {
  const { ready, projects, activeProject, createProject, switchProject } = useProjects();

  return (
    <div className="flex h-[500px] w-[350px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl">
      {/* Title bar */}
      <div className="flex items-start justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <h2 className="truncate text-sm font-semibold text-zinc-900">Zyverra AI</h2>
          </div>
          <p className="truncate text-xs text-zinc-500">AI Sales Engineer</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Project bar */}
      {ready && activeProject ? (
        <ProjectBar
          projects={projects}
          activeProject={activeProject}
          onSwitch={switchProject}
          onCreate={createProject}
        />
      ) : null}

      {/* Threads stay mounted (only the active is visible) so switching preserves
          scroll position and messages with no reload, duplication, or loss. */}
      <div className="relative min-h-0 flex-1">
        {ready
          ? projects.map((p) => {
              const isActive = p.id === activeProject?.id;
              return (
                <div
                  key={p.id}
                  className={`absolute inset-0 flex flex-col ${
                    isActive ? "z-10" : "invisible pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  <ChatThread sessionId={p.sessionId} projectName={p.name} active={isActive} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

function ProjectBar({
  projects,
  activeProject,
  onSwitch,
  onCreate,
}: {
  projects: ChatProject[];
  activeProject: ChatProject;
  onSwitch: (id: string) => void;
  onCreate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/70 px-3 py-2">
      <div ref={ref} className="relative min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-left text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
        >
          <FolderKanban className="h-3.5 w-3.5 shrink-0 text-blue-600" />
          <span className="min-w-0 flex-1 truncate" title={activeProject.name}>
            {activeProject.name}
          </span>
          <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open ? (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-44 overflow-y-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
            {projects.map((p) => {
              const isActive = p.id === activeProject.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onSwitch(p.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-xs transition hover:bg-zinc-50 ${
                    isActive ? "font-semibold text-blue-700" : "text-zinc-700"
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate">{p.name}</span>
                  {isActive ? <Check className="h-3.5 w-3.5 shrink-0 text-blue-600" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
      >
        <Plus className="h-3.5 w-3.5" />
        New
      </button>
    </div>
  );
}

function formatStamp(value: string | null | undefined) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function ProjectMeta({
  name,
  created,
  lastActivity,
}: {
  name: string;
  created: string | null;
  lastActivity: string | null;
}) {
  return (
    <div className="border-b border-zinc-100 px-4 py-2">
      <p className="truncate text-xs font-semibold text-zinc-800" title={name}>
        {name}
      </p>
      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-zinc-400">
        {created ? (
          <span>Created {formatStamp(created)}</span>
        ) : (
          <span>New conversation</span>
        )}
        {lastActivity ? (
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-2.5 w-2.5" />
            Last activity {formatStamp(lastActivity)}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ChatThread({
  sessionId,
  projectName,
  active,
}: {
  sessionId: string;
  projectName: string;
  active: boolean;
}) {
  const { messages, sendMessage, isLoading, isTyping, conversationMeta } = useChat({ sessionId });

  const { created, lastActivity } = useMemo(() => {
    const dated = messages.filter((m: Message) => m.createdAt);
    return {
      created: conversationMeta?.createdAt ?? dated[0]?.createdAt ?? null,
      lastActivity: dated[dated.length - 1]?.createdAt ?? conversationMeta?.updatedAt ?? null,
    };
  }, [messages, conversationMeta]);

  return (
    <div className="flex h-full flex-col">
      <ProjectMeta name={projectName} created={created} lastActivity={lastActivity} />
      <div className="min-h-0 flex-1 bg-white">
        <MessageList messages={messages} isTyping={isTyping} />
      </div>
      <ChatInput onSend={sendMessage} disabled={isLoading} autoFocus={active} />
    </div>
  );
}
