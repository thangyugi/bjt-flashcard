import type { Metadata } from "next";
import { Be_Vietnam_Pro, Shippori_Mincho, Zen_Kaku_Gothic_New, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { Header } from "@/components/layout/Header";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { NavProgress } from "@/components/layout/NavProgress";
import { AppSplash } from "@/components/layout/AppSplash";
import { Suspense } from "react";

// Chữ Việt / giao diện
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

// Kanji trên thẻ (Mincho)
const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  preload: false,
});

// Kana, câu ví dụ, furigana
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BJT Flashcard — Học từ vựng tiếng Nhật thương mại",
  description:
    "Ứng dụng học từ vựng tiếng Nhật phục vụ ôn thi BJT Business Japanese Test. Flashcard thông minh nhóm theo chủ đề, có ghi chú ngữ cảnh business.",
  keywords: ["BJT", "tiếng Nhật", "business Japanese", "từ vựng", "flashcard", "JLPT N1"],
  openGraph: {
    title: "BJT Flashcard",
    description: "Học từ vựng tiếng Nhật thương mại hiệu quả",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${beVietnam.variable} ${shippori.variable} ${zenKaku.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <QueryProvider>
          <Suspense fallback={null}>
            <NavProgress />
          </Suspense>
          <AppSplash />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <MobileTabBar />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
