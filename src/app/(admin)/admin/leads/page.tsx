import { redirect } from "next/navigation";

import { getAdminSession } from "@/server/auth/requireAdmin";
import LeadsTable from "./LeadsTable";

// Server-side gate: unauthenticated visitors never reach the leads UI.
export default async function LeadsAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return <LeadsTable />;
}
