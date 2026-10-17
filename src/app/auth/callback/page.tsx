import type { Metadata } from "next";
import { AuthCallback } from "@/components/account/AuthForms";

export const metadata: Metadata = { title: "Đang đăng nhập", robots: { index: false } };

export default function AuthCallbackPage() {
  return <AuthCallback />;
}
