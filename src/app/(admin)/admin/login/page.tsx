"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Login failed.");
        return;
      }
      router.push("/admin/leads");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-lg font-semibold text-zinc-900">Zyverra Admin</h1>
        <p className="mt-1 text-sm text-zinc-500">Sign in to view captured leads.</p>

        <div className="mt-6 grid gap-2">
          <label htmlFor="username" className="text-xs font-semibold tracking-wide text-zinc-500">
            USERNAME
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="h-10 rounded-lg border border-zinc-200 px-3 text-sm text-zinc-900 outline-none focus:border-zinc-400"
            required
          />
        </div>

        <div className="mt-4 grid gap-2">
          <label htmlFor="password" className="text-xs font-semibold tracking-wide text-zinc-500">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="h-10 rounded-lg border border-zinc-200 px-3 text-sm text-zinc-900 outline-none focus:border-zinc-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </form>
    </main>
  );
}
