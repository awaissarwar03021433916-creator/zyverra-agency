"use client";

import { useCallback, useEffect, useState } from "react";

export type ChatProject = { id: string; name: string; sessionId: string };

const PROJECTS_KEY = "zyverra_projects";
const LEGACY_SESSION_KEY = "zyverra_session";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

type Stored = { projects: ChatProject[]; activeId: string };

function loadInitial(): Stored {
  if (typeof window === "undefined") {
    const sessionId = createId();
    const project = { id: createId(), name: "Project 1", sessionId };
    return { projects: [project], activeId: project.id };
  }
  try {
    const raw = window.localStorage.getItem(PROJECTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Stored;
      if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
        const activeId = parsed.projects.some((p) => p.id === parsed.activeId)
          ? parsed.activeId
          : parsed.projects[0].id;
        return { projects: parsed.projects, activeId };
      }
    }
    // First run: adopt the existing per-visitor session as "Project 1" so the
    // current conversation is preserved.
    const legacy = window.localStorage.getItem(LEGACY_SESSION_KEY);
    const sessionId = legacy ?? createId();
    const project = { id: createId(), name: "Project 1", sessionId };
    return { projects: [project], activeId: project.id };
  } catch {
    const sessionId = createId();
    const project = { id: createId(), name: "Project 1", sessionId };
    return { projects: [project], activeId: project.id };
  }
}

/**
 * Client-side project management for the chat widget. Each project is its own
 * conversation (its own sessionId), persisted across reloads in localStorage.
 */
export function useProjects() {
  const [state, setState] = useState<Stored>(() => ({ projects: [], activeId: "" }));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadInitial());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [state, ready]);

  const createProject = useCallback(() => {
    setState((prev) => {
      const name = `Project ${prev.projects.length + 1}`;
      const project: ChatProject = { id: createId(), name, sessionId: createId() };
      return { projects: [...prev.projects, project], activeId: project.id };
    });
  }, []);

  const switchProject = useCallback((id: string) => {
    setState((prev) =>
      prev.projects.some((p) => p.id === id) ? { ...prev, activeId: id } : prev
    );
  }, []);

  const activeProject =
    state.projects.find((p) => p.id === state.activeId) ?? state.projects[0] ?? null;

  return {
    ready,
    projects: state.projects,
    activeProject,
    activeId: state.activeId,
    createProject,
    switchProject,
  };
}
