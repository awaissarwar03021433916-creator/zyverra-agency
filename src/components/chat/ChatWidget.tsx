"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

// The chat window (and its dependencies) only loads when a visitor opens chat,
// keeping it out of the initial page bundle.
const ChatWindow = dynamic(() => import("./ChatWindow").then((m) => m.ChatWindow), {
  ssr: false,
  loading: () => null,
});

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showAttention, setShowAttention] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowAttention(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  // Allow other parts of the page (e.g. the "Try Live Experience" button) to open
  // the chat in-place instead of navigating away. The chat window's input
  // auto-focuses on mount, so opening here starts the interaction immediately.
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
      <AnimatePresence>
        {open ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 origin-bottom-right"
          >
            <ChatWindow onClose={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!open ? (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          animate={
            showAttention && !open && !shouldReduceMotion
              ? { scale: [1, 1.12, 1], y: [0, -6, 0] }
              : {}
          }
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      ) : null}
    </div>
  );
}

export default ChatWidget;

