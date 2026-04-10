import { Resend } from "resend";

type SendContactNotificationArgs = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactNotificationEmail({
  name,
  email,
  message,
}: SendContactNotificationArgs) {
  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    process.env.CONTACT_EMAIL_TO ??
    process.env.RESEND_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    process.env.EMAIL_FROM;

  // If email is not configured, silently skip to avoid failing the API request.
  if (!apiKey || !to || !from) return;

  const resend = new Resend(apiKey);

  const subject = `New contact submission from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">
      <h3 style="margin:0 0 12px 0;">New contact submission</h3>
      <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0;"><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; margin-top: 8px;">${escapeHtml(message)}</pre>
    </div>
  `;

  await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
    replyTo: email,
  });
}

