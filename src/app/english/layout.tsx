import { Noto_Sans } from "next/font/google";

// Phông có đủ ký hiệu IPA (ɪ ʊ ə ʃ ʒ θ ð ŋ ː ˈ …)
const notoIpa = Noto_Sans({
  variable: "--font-noto-ipa",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "600", "700"],
});

export default function EnglishLayout({ children }: LayoutProps<"/english">) {
  return <div className={notoIpa.variable}>{children}</div>;
}
