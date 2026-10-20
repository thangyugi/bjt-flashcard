import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Shippori_Mincho, Zen_Kaku_Gothic_New, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { Header } from "@/components/layout/Header";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { NavProgress } from "@/components/layout/NavProgress";
import { AppSplash } from "@/components/layout/AppSplash";
import { ServiceWorkerRegister } from "@/components/layout/Pwa";
import { LearningRuntime } from "@/components/learning/LearningRuntime";
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
  title: {
    default: "LeoEdu — Học ngôn ngữ và chứng chỉ bằng tiếng Việt",
    template: "%s — LeoEdu",
  },
  description:
    "LeoEdu: ngữ pháp và từ vựng JLPT N1 kể thành truyện, phát âm tiếng Anh IPA, chứng chỉ OCI AI Foundations và từ vựng tiếng Nhật thương mại BJT — học bằng tiếng Việt, lịch ôn thông minh.",
  keywords: ["LeoEdu", "JLPT N1", "tiếng Nhật", "IPA", "tiếng Anh", "OCI AI Foundations", "BJT", "flashcard", "FSRS"],
  applicationName: "LeoEdu",
  appleWebApp: { capable: true, title: "LeoEdu", statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "LeoEdu",
    description: "Học ngôn ngữ và chứng chỉ bằng tiếng Việt",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  viewportFit: "cover",
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
          <ServiceWorkerRegister />
          <LearningRuntime />
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
