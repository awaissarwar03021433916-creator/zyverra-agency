import { NextResponse } from "next/server";

import { prisma } from "@/database/prisma/client";
import { checkContactRateLimit } from "@/rate-limiting/contactLimiter";
import { sendContactNotificationEmail } from "@/backend/services/email.service";

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

    const raw = body as Record<string, unknown>;
    const name = typeof raw.name === "string" ? raw.name.trim() : "";
    const email = typeof raw.email === "string" ? raw.email.trim() : "";
    const message = typeof raw.message === "string" ? raw.message.trim() : "";

    if (!name || !email || !message) {
      statusCode = 400;
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (name.length > 80 || email.length > 254 || message.length > 2000) {
      statusCode = 400;
      return NextResponse.json(
        { success: false, message: "Validation failed" },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: { name, email, message },
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
