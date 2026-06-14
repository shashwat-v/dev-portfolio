import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy scoped to the origins this site actually uses:
// - 'unsafe-inline' for styles/scripts is required by Next.js + next-themes
//   (inline theme bootstrap) and framer-motion's inline style updates.
// - 'unsafe-eval' is added in development only — React's dev mode needs eval()
//   for debugging features; it is never used in production.
// - img-src allows the simpleicons CDN used by the tech-stack marquee.
// - connect-src allows the GitHub contributions API used by the calendar.
// - frame-src/frame-ancestors 'self' keeps the same-origin Resume.pdf iframe working.
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.simpleicons.org",
  "font-src 'self' data:",
  "connect-src 'self' https://github-contributions-api.jogruber.de",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
