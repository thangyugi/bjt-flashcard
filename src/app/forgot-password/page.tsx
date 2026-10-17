import type { Metadata } from "next";
import { ForgotForm } from "@/components/account/AuthForms";

export const metadata: Metadata = { title: "Quên mật khẩu", robots: { index: false } };

export default function ForgotPasswordPage() {
  return <ForgotForm />;
}
