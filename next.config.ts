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
  // Đường dẫn cũ (lịch sử, dấu trang, liên kết đã chia sẻ) vẫn dùng được sau khi tách Học bài / Trắc nghiệm theo khóa
  async redirects() {
    return [
      // Nhóm flashcard BJT: /study/<nhóm> → /bjt/<nhóm>
      { source: "/study/:groupId", destination: "/bjt/:groupId", permanent: true },
      // Thiết lập trắc nghiệm BJT cũ: /quiz?groupId=… hoặc /quiz?scope=… → /quiz/bjt (giữ nguyên tham số)
      { source: "/quiz", has: [{ type: "query", key: "groupId" }], destination: "/quiz/bjt", permanent: true },
      { source: "/quiz", has: [{ type: "query", key: "scope" }], destination: "/quiz/bjt", permanent: true },
      // Bộ lọc khóa cũ /quiz?course=… → trang trắc nghiệm của khóa /quiz/[khóa]
      { source: "/quiz", has: [{ type: "query", key: "course", value: "jlpt-n1" }], destination: "/quiz/jlpt-n1", permanent: true },
      { source: "/quiz", has: [{ type: "query", key: "course", value: "english" }], destination: "/quiz/english", permanent: true },
      { source: "/quiz", has: [{ type: "query", key: "course", value: "(?:oci|oci-ai)" }], destination: "/quiz/oci", permanent: true },
      { source: "/quiz", has: [{ type: "query", key: "course", value: "bjt" }], destination: "/quiz/bjt", permanent: true },
      { source: "/quiz", has: [{ type: "query", key: "course", value: "mixed" }], destination: "/review", permanent: true },
      { source: "/quiz/oci-ai", destination: "/quiz/oci", permanent: true },
    ];
  },
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
