import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shake large named-export packages so only used icons/animations ship.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  // Clean case-study URLs: /case-studies/<slug> serves the static <slug>.html.
  // The slug pattern only matches lowercase-kebab names, so the LandChain PDF
  // and any direct .html access are left untouched.
  async rewrites() {
    return [
      {
        source: "/case-studies/:slug([a-z0-9-]+)",
        destination: "/case-studies/:slug.html",
      },
    ];
  },
  // Production-grade security headers applied to every response.
  async headers() {
    // The site is statically prerendered, so the framework emits inline bootstrap
    // scripts that can't carry a per-request nonce without forcing dynamic
    // rendering. script-src therefore allows 'unsafe-inline'; everything else is
    // locked down (object-src none, base-uri self, frame-ancestors none) and the
    // chatbot only ever talks to its own origin (connect-src 'self').
    const isDev = process.env.NODE_ENV !== "production";

    const directives = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      // 'unsafe-eval' is only needed by React Fast Refresh in development.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      // framer-motion / React render inline style attributes; Tailwind is a sheet.
      "style-src 'self' 'unsafe-inline'",
      // next/image optimizer (self) + direct remote avatars/photos over https.
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      // Chatbot, contact form, and history all call the same origin only.
      // ws/wss are dev-only (HMR).
      `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
      "frame-src 'self'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ];
    // upgrade-insecure-requests would break http://localhost in dev.
    if (!isDev) directives.push("upgrade-insecure-requests");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: directives.join("; ") },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "off" },
        ],
      },
    ];
  },
};

export default nextConfig;
