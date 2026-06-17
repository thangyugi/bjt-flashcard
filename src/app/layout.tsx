import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
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
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
