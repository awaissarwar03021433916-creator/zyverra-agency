import { Resend } from "resend";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getFromEmail() {
  return (
    process.env.FROM_EMAIL ??
    process.env.CONTACT_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    process.env.EMAIL_FROM
  );
}

export async function sendClientEmail(to: string, name?: string) {
  const resend = getResend();
  const from = getFromEmail();
  if (!resend || !from) return;

  const safeName = name?.trim() ? escapeHtml(name.trim()) : "there";

  return resend.emails.send({
    from,
    to,
    subject: "We received your project request 🚀",
    html: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">
        <h2 style="margin:0 0 12px 0;">Hi ${safeName},</h2>
        <p style="margin:0 0 10px 0;">Thanks for reaching out to Zyverra.</p>

        <p style="margin:0 0 10px 0;">We’ve received your project details and our team is reviewing it.</p>

        <p style="margin:0 0 8px 0;">Next steps:</p>
        <ul style="margin:0 0 10px 18px;">
          <li>We analyze your requirements</li>
          <li>Prepare a tailored plan</li>
          <li>Reach out within 24 hours</li>
        </ul>

        <p style="margin:0 0 10px 0;">Looking forward to working with you.</p>

        <p style="margin:0;"><strong>Zyverra Team</strong></p>
      </div>
    `,
  });
}

export type LeadEmailPayload = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  businessType?: string | null;
  projectType?: string | null;
  score?: number | null;
  scoreTier?: "HOT" | "WARM" | "COLD" | null;
  stage?: string | null;
};

function getNotificationRecipient() {
  return process.env.LEADS_NOTIFICATION_EMAIL ?? process.env.CONTACT_NOTIFICATION_EMAIL;
}

function fieldOrDash(value: unknown) {
  return value !== null && value !== undefined && String(value).trim()
    ? escapeHtml(String(value).trim())
    : "—";
}

function detailRow(label: string, value: string) {
  return `<tr>
    <td style="padding:9px 14px;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;white-space:nowrap;">${label}</td>
    <td style="padding:9px 14px;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:600;">${value}</td>
  </tr>`;
}

function renderLeadDetails(lead: LeadEmailPayload) {
  const scoreText =
    typeof lead.score === "number"
      ? `${lead.score}/100${lead.scoreTier ? ` (${escapeHtml(lead.scoreTier)})` : ""}`
      : "—";

  return `<table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
    ${detailRow("Name", fieldOrDash(lead.name))}
    ${detailRow("Email", fieldOrDash(lead.email))}
    ${detailRow("Phone", fieldOrDash(lead.phone))}
    ${detailRow("Business Type", fieldOrDash(lead.businessType))}
    ${detailRow("Project Type", fieldOrDash(lead.projectType))}
    ${detailRow("Score", scoreText)}
    ${detailRow("Stage", fieldOrDash(lead.stage))}
  </table>`;
}

function renderLeadEmail(opts: { heading: string; accent: string; intro: string; lead: LeadEmailPayload }) {
  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; background:#f8fafc; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
        <div style="background:${opts.accent}; padding:16px 20px;">
          <p style="margin:0; color:#ffffff; font-size:16px; font-weight:700; letter-spacing:.2px;">${opts.heading}</p>
        </div>
        <div style="padding:20px;">
          <p style="margin:0 0 14px 0; color:#475569; font-size:14px;">${opts.intro}</p>
          ${renderLeadDetails(opts.lead)}
          <p style="margin:16px 0 0 0; color:#94a3b8; font-size:12px;">Zyverra CRM · automated lead notification</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Admin alert for every newly captured lead.
 */
export async function sendNewLeadEmail(lead: LeadEmailPayload) {
  const resend = getResend();
  const from = getFromEmail();
  const to = getNotificationRecipient();
  if (!resend || !from || !to) return;

  return resend.emails.send({
    from,
    to,
    subject: `New Lead Captured${lead.name ? ` — ${lead.name}` : ""}`,
    html: renderLeadEmail({
      heading: "New Lead Captured",
      accent: "#2563eb",
      intro: "A new lead was just captured by Zyverra AI.",
      lead,
    }),
  });
}

/**
 * High-priority admin alert when a lead is scored HOT.
 */
export async function sendHotLeadEmail(lead: LeadEmailPayload) {
  const resend = getResend();
  const from = getFromEmail();
  const to = getNotificationRecipient();
  if (!resend || !from || !to) return;

  return resend.emails.send({
    from,
    to,
    subject: `🔥 HOT Lead — act now${lead.name ? ` — ${lead.name}` : ""}`,
    html: renderLeadEmail({
      heading: "🔥 HOT Lead Captured",
      accent: "#dc2626",
      intro: "This lead scored HOT — reach out as soon as possible.",
      lead,
    }),
  });
}

