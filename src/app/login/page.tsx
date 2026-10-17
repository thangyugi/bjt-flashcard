import type { Metadata } from "next";
import { LoginForm } from "@/components/account/AuthForms";

export const metadata: Metadata = { title: "Đăng nhập", robots: { index: false } };

export default function LoginPage() {
  return <LoginForm />;
}
