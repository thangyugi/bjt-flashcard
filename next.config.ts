import type { NextConfig } from "next";

// Service worker tải và lưu offline âm thanh trên Cloudflare R2 → CSP của sw.js phải cho phép kết nối tới đó
const mediaOrigin = (() => {
  try {
    return process.env.NEXT_PUBLIC_MEDIA_BASE_URL ? new URL(process.env.NEXT_PUBLIC_MEDIA_BASE_URL).origin : "";
  } catch {
    return "";
  }
})();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Service worker luôn lấy bản mới nhất để app cài trên máy được cập nhật
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self'; connect-src 'self'${mediaOrigin ? ` ${mediaOrigin}` : ""}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
