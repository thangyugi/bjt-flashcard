import type { Metadata } from "next";
import { RegisterForm } from "@/components/account/AuthForms";

export const metadata: Metadata = { title: "Tạo tài khoản", robots: { index: false } };

export default function RegisterPage() {
  return <RegisterForm />;
}
