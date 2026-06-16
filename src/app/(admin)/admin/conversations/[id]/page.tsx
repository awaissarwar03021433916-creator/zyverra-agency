import { redirect } from "next/navigation";

import { getAdminSession } from "@/server/auth/requireAdmin";
import ConversationView from "./ConversationView";

// Server-side gate: unauthenticated visitors never reach conversation content.
export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  return <ConversationView id={id} />;
}
