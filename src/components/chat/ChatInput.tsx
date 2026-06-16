"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
};

export function ChatInput({ onSend, disabled, autoFocus }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autosize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, 112); // aligns with max-h-28
    el.style.height = `${next}px`;
  }, []);

  useEffect(() => {
    autosize();
  }, [autosize, value]);

  useEffect(() => {
    if (!autoFocus) return;
    textareaRef.current?.focus();
  }, [autoFocus]);

  const send = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }, [disabled, onSend, value]);

  return (
    <div className="border-t border-zinc-200 p-3">
      <div className="flex items-end gap-2 rounded-xl border border-zinc-200 bg-white px-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-zinc-900/10">
        <textarea
            ref={textareaRef}
          value={value}
            onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          placeholder="Type a message…"
            className="max-h-28 min-h-[1.5rem] w-full resize-none outline-none overflow-hidden bg-transparent px-1 text-sm text-zinc-900 placeholder:text-zinc-400"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={send}
          disabled={disabled || !value.trim()}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-[11px] text-zinc-400">Enter to send • Shift+Enter for new line</p>
    </div>
  );
}

