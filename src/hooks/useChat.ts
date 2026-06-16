"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "@/types/chat";
import type { Lead } from "@/types/lead";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const SESSION_STORAGE_KEY = "zyverra_session";

/**
 * Stable per-visitor session id, persisted across reloads. Sent with every
 * chat request so the server (Phase 4) can tie messages and the extracted
 * lead to one conversation.
 */
function getSessionId() {
  if (typeof window === "undefined") return createId();
  try {
    let id = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = createId();
      window.localStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return createId();
  }
}

const INITIAL_MESSAGE: Message = {
  id: "initial",
  role: "assistant",
  content: "Hi! I'm Zyverra AI.\nHow can I help you with your software project today?",
};

function extractLeadData(rawText: string): Partial<Lead> {
  const data: Partial<Lead> = {};

  const normalizedText = rawText.replace(/\r/g, "");

  const emailMatch = normalizedText.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  if (emailMatch) data.email = emailMatch[0];

  const phoneMatch = normalizedText.match(/\+?\d[\d\s-]{8,}\d/);
  if (phoneMatch) {
    const digitsOnly = phoneMatch[0].replace(/[^\d+]/g, "");
    if (/^\+?\d{10,15}$/.test(digitsOnly)) data.phone = digitsOnly;
  }

  const nameMatch = normalizedText.match(
    /(?:\bmy name is\b|\bname is\b|\bi am\b|\bi'm\b)\s+([a-zA-Z]{3,30})/i
  );
  if (nameMatch) data.name = nameMatch[1];

  const lines = normalizedText
    .split(/\n|,/)
    .map((l) => l.trim())
    .filter(Boolean);

  for (const item of lines) {
    const token = item.trim();
    if (!token) continue;

    // EMAIL
    if (!data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(token)) {
      data.email = token;
      continue;
    }

    // PHONE
    const compact = token.replace(/[^\d+]/g, "");
    if (!data.phone && /^\+?\d{10,15}$/.test(compact)) {
      data.phone = compact;
      continue;
    }
  }

  // FULL TEXT ANALYSIS (for intent fields)
  const text = normalizedText.toLowerCase();

  if (text.includes("website")) data.projectType = "website";
  if (text.includes("crm")) data.projectType = "CRM system";
  if (text.includes("app")) data.projectType = "app";

  if (text.includes("bags")) data.businessType = "manufacturing";
  if (text.includes("salon")) data.businessType = "salon";
  if (text.includes("solar")) data.businessType = "solar";

  if (text.includes("5k") || text.includes("$5000")) data.budget = "5000";
  if (text.includes("week")) data.timeline = "1 week";

  data.description = normalizedText;

  return data;
}

export function useChat(options?: { sessionId?: string }) {
  // Each project drives its own conversation via its own sessionId; fall back to
  // the shared per-visitor session id when none is provided.
  const resolvedSessionId = options?.sessionId;

  const [messages, setMessages] = useState<Message[]>(() => [INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lead, setLead] = useState<Lead>({});
  const [conversationMeta, setConversationMeta] = useState<{
    createdAt: string | null;
    updatedAt: string | null;
  } | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const submittedLeadKeysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  // Load this project's saved conversation history when the session is selected, so
  // switching projects restores the full thread (user + AI messages, in order).
  useEffect(() => {
    if (!resolvedSessionId) return;
    let active = true;
    void fetch(`/api/chat/history?sessionId=${encodeURIComponent(resolvedSessionId)}`)
      .then((res) => res.json())
      .then((data: { messages?: unknown; createdAt?: unknown; updatedAt?: unknown } | null) => {
        if (!active) return;
        setConversationMeta({
          createdAt: typeof data?.createdAt === "string" ? data.createdAt : null,
          updatedAt: typeof data?.updatedAt === "string" ? data.updatedAt : null,
        });
        if (!Array.isArray(data?.messages) || data.messages.length === 0) return;
        const raw = data.messages as Array<{
          id?: unknown;
          role?: unknown;
          content?: unknown;
          createdAt?: unknown;
        }>;
        const loaded: Message[] = [];
        for (const m of raw) {
          if ((m.role === "user" || m.role === "assistant") && typeof m.content === "string") {
            loaded.push({
              id: typeof m.id === "string" ? m.id : `${Date.now()}-${loaded.length}`,
              role: m.role,
              content: m.content,
              createdAt: typeof m.createdAt === "string" ? m.createdAt : undefined,
            });
          }
        }
        if (loaded.length === 0) return;
        // Only seed history if the user hasn't already started this thread.
        setMessages((prev) => (prev.length <= 1 ? [INITIAL_MESSAGE, ...loaded] : prev));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [resolvedSessionId]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    const extracted = extractLeadData(userMessage.content);
    const updatedLead: Lead = { ...lead, ...extracted };

    setLead(updatedLead);

    if (updatedLead.email || updatedLead.phone) {
      const dedupeKey = `${(updatedLead.email ?? "").toLowerCase()}|${(updatedLead.phone ?? "")
        .replace(/[^\d+]/g, "")
        .toLowerCase()}`;
      if (!submittedLeadKeysRef.current.has(dedupeKey)) {
        submittedLeadKeysRef.current.add(dedupeKey);
        void fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLead),
        }).catch(() => {});
      }
    }

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsLoading(true);
    setIsTyping(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // Small delay makes the typing indicator feel natural.
      await new Promise((res) => setTimeout(res, 400));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          lead: updatedLead,
          sessionId: resolvedSessionId ?? getSessionId(),
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`Chat request failed: ${res.status}`);

      const data = (await res.json().catch(() => null)) as { reply?: unknown } | null;
      const replyText = typeof data?.reply === "string" ? data.reply : "";

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: replyText || "Sorry, I'm having trouble responding right now.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      if ((err as { name?: string } | null)?.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            content: "Sorry, I'm having trouble responding right now.",
          },
        ]);
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [lead, messages, resolvedSessionId]);

  return { messages, sendMessage, isLoading, isTyping, lead, conversationMeta } as const;
}

