"use client";

import clsx from "clsx";
import type { Message } from "@/types/chat";

type Props = {
  message: Message;
};

function formatTime(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";
  const time = formatTime(message.createdAt);

  return (
    <div className={clsx("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div className={clsx("flex max-w-[85%] flex-col", isUser ? "items-end" : "items-start")}>
        <div
          className={clsx(
            "rounded-2xl text-sm leading-relaxed shadow-sm",
            isUser
              ? "bg-zinc-900 text-white rounded-br-md px-3 py-2"
              : clsx(
                  "bg-zinc-100 text-zinc-900 rounded-bl-md",
                  isAssistant ? "px-4 py-3 leading-relaxed" : "px-3 py-2"
                )
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        {time ? <span className="mt-1 px-1 text-[10px] text-zinc-400">{time}</span> : null}
      </div>
    </div>
  );
}

