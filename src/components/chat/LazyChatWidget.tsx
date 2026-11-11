"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget").then((m) => m.ChatWidget), {
  ssr: false,
  loading: () => null,
});

/**
 * Mounts the chat widget only after the browser is idle or the visitor first
 * interacts (Section G7), so it never competes with the page's own loading.
 *
 * An "open chat" request (e.g. "Try our live AI agent") is honoured at any
 * point: before loading starts, or while the widget's code is still being
 * downloaded. Once the widget mounts it handles further requests itself;
 * `initialOpen` only matters for that first mount.
 */
export function LazyChatWidget() {
  const [load, setLoad] = useState(false);
  const [openOnLoad, setOpenOnLoad] = useState(false);

  // Always listening, so a request can't fall into the gap between "loading
  // started" and "widget mounted".
  useEffect(() => {
    const openNow = () => {
      setOpenOnLoad(true);
      setLoad(true);
    };
    window.addEventListener("zyverra:open-chat", openNow);
    return () => window.removeEventListener("zyverra:open-chat", openNow);
  }, []);

  useEffect(() => {
    if (load) return;
    const start = () => setLoad(true);

    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    // Safari has no requestIdleCallback; fall back to a timer there.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 5000 })
      : window.setTimeout(start, 3500);

    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [load]);

  return load ? <ChatWidget initialOpen={openOnLoad} /> : null;
}
