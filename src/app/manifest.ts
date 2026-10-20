import type { MetadataRoute } from "next";

/** Web App Manifest — cho phép cài app lên màn hình chính điện thoại / tablet (PWA). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "LeoEdu — Học ngôn ngữ và chứng chỉ",
    short_name: "LeoEdu",
    description:
      "Ngữ pháp & từ vựng JLPT N1, phát âm tiếng Anh IPA, OCI AI Foundations và từ vựng tiếng Nhật thương mại (BJT) — học bằng tiếng Việt.",
    lang: "vi",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Học bài", url: "/study", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Ôn tập", url: "/review", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Trắc nghiệm", url: "/quiz", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
