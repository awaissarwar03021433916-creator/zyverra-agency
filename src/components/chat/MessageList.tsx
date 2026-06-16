"use client";

import { useEffect, useMemo, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { Message } from "@/types/chat";

type Props = {
  messages: Message[];
  isTyping?: boolean;
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

export function MessageList({ messages, isTyping }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);

  const stableMessages = useMemo(() => messages, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [stableMessages.length, isTyping]);

  return (
    <div
      className="h-full overflow-y-auto px-4 py-3"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Conversation"
    >
      <div className="flex flex-col gap-2">
        {stableMessages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {isTyping ? <TypingIndicator /> : null}
        <div ref={endRef} />
      </div>
    </div>
  );
}

