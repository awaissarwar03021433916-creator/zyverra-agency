import { NextResponse } from "next/server";

import { prisma } from "@/database/prisma/client";
import { checkContactRateLimit } from "@/rate-limiting/contactLimiter";
import { sendContactNotificationEmail } from "@/backend/services/email.service";
import { cleanContent } from "@/server/security/sanitize";
import { contactSchema } from "@/validation/zod/contact";

function getClientIpFromRequest(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // `x-forwarded-for` can contain multiple IPs: client, proxy1, proxy2...
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}

export async function POST(req: Request) {
  const requestIp = getClientIpFromRequest(req);
  const endpointPath = new URL(req.url).pathname;
  const requestMethod = req.method ?? "POST";

  let statusCode = 500;

  try {
    const rate = await checkContactRateLimit(requestIp);
    if (!rate.allowed) {
      statusCode = 429;
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      statusCode = 400;
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      statusCode = 400;
      return NextResponse.json(
        { success: false, message: "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, clinic, town, website, services } = parsed.data;
    // The Contact table stores one message column, so the clinic details are
    // folded into it (no schema migration needed). Cleaned of control chars.
    const message = cleanContent(
      [
        `Clinic: ${clinic}`,
        `Town/city: ${town}`,
        `Website: ${website || "—"}`,
        `Services: ${services.length ? services.join(", ") : "—"}`,
        "",
        parsed.data.message,
      ].join("\n"),
      3000
    );

    await prisma.contact.create({
      data: { name: cleanContent(name, 80), email, message },
    });

    statusCode = 200;

    // Email notification is best-effort; failures must not fail the submission.
    try {
      await sendContactNotificationEmail({ name, email, message });
    } catch (emailError) {
      console.error("Contact notification email failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    statusCode = 500;
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    // Store submission analytics (IP, endpoint path, timestamp via createdAt, status code).
    try {
      await prisma.apiRequestLog.create({
        data: {
          requestIp,
          path: endpointPath,
          method: requestMethod,
          statusCode,
        },
      });
    } catch (logError) {
      console.error("ApiRequestLog write failed:", logError);
    }
  }
}
