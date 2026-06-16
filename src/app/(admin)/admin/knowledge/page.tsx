import { redirect } from "next/navigation";

import { getAdminSession } from "@/server/auth/requireAdmin";
import KnowledgeManager from "./KnowledgeManager";

// Server-side gate: only authenticated admins manage knowledge articles.
export default async function KnowledgePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return <KnowledgeManager />;
}
