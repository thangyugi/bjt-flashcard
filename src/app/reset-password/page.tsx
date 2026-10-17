import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/account/AuthForms";

export const metadata: Metadata = { title: "Đặt mật khẩu mới", robots: { index: false } };

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
