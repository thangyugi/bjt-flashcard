import type { MetadataRoute } from "next";

/** Web App Manifest — cho phép cài app lên màn hình chính điện thoại / tablet (PWA). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "BJT Flashcard — Tiếng Nhật thương mại & JLPT N1",
    short_name: "BJT Flashcard",
    description:
      "Học từ vựng tiếng Nhật thương mại (BJT), ngữ pháp & từ vựng JLPT N1 và khóa OCI AI Foundations.",
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
      { name: "Khóa học", url: "/courses", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "JLPT N1", url: "/jlpt-n1", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Trắc nghiệm", url: "/quiz", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
