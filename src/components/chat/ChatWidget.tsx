"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";

// The chat window (and its dependencies) only loads when a visitor opens chat,
// keeping it out of the initial page bundle.
const ChatWindow = dynamic(() => import("./ChatWindow").then((m) => m.ChatWindow), {
  ssr: false,
  loading: () => null,
});

export function ChatWidget({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [showAttention, setShowAttention] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowAttention(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  // Other parts of the page (e.g. "Try our live AI agent") open the chat in place.
  useEffect(() => {
    const openChat = () => {
      setShowAttention(false);
      setOpen(true);
    };
    window.addEventListener("zyverra:open-chat", openChat);
    return () => window.removeEventListener("zyverra:open-chat", openChat);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mb-3 origin-bottom-right animate-in fade-in slide-in-from-bottom-10 duration-200">
          <ChatWindow onClose={() => setOpen(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-95 motion-reduce:animate-none motion-reduce:hover:scale-100 ${
            showAttention ? "animate-chat-nudge" : ""
          }`}
          aria-label="Open chat"
        >
          <MessageCircle aria-hidden className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default ChatWidget;
