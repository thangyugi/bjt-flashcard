import type { Metadata } from "next";
import Link from "next/link";
import { Page, PageHeader } from "@/components/ui/page";

export const metadata: Metadata = { title: "Chính sách quyền riêng tư" };

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Dữ liệu chúng tôi thu thập",
    p: [
      "Tài khoản: email, tên hiển thị, múi giờ. Mật khẩu được mã hóa bởi nhà cung cấp xác thực (Supabase), chúng tôi không đọc được.",
      "Dữ liệu học: bài đã học, kết quả trắc nghiệm, lịch ôn tập, thời gian học, cài đặt giọng đọc.",
      "Không thu thập: số điện thoại, địa chỉ, giấy tờ tùy thân, dữ liệu thanh toán.",
    ],
  },
  {
    h: "2. Mục đích sử dụng",
    p: [
      "Lưu và đồng bộ tiến độ học giữa các thiết bị của bạn; tính lịch ôn tập; hiển thị thống kê học tập cho chính bạn.",
      "Số liệu tổng hợp đã ẩn danh (ví dụ: bài nào nhiều người bỏ dở) để cải thiện nội dung.",
      "Không bán, không chia sẻ dữ liệu cá nhân cho bên thứ ba vì mục đích quảng cáo.",
    ],
  },
  {
    h: "3. Nơi lưu trữ",
    p: [
      "Dữ liệu lưu trên máy chủ Supabase (PostgreSQL) và được bảo vệ bằng phân quyền theo từng dòng: mỗi người chỉ đọc được dữ liệu của mình.",
      "Khi chưa đăng nhập, tiến độ chỉ nằm trong trình duyệt của bạn.",
    ],
  },
  {
    h: "4. Quyền của bạn (Nghị định 13/2023/NĐ-CP)",
    p: [
      "Xem và tải về toàn bộ dữ liệu: Tài khoản → Tải dữ liệu (JSON).",
      "Xóa tài khoản và mọi dữ liệu học trên máy chủ: Tài khoản → Xóa tài khoản. Việc xóa có hiệu lực ngay, không thể hoàn tác.",
      "Rút lại sự đồng ý bất cứ lúc nào bằng cách xóa tài khoản.",
    ],
  },
  {
    h: "5. Thời gian lưu",
    p: ["Dữ liệu được giữ đến khi bạn xóa tài khoản. Nhật ký hoạt động chi tiết giữ tối đa 13 tháng, sau đó chỉ còn số liệu tổng hợp."],
  },
];

export default function PrivacyPage() {
  return (
    <Page>
      <PageHeader eyebrow="Phiên bản 17/10/2026" title="Chính sách quyền riêng tư" size="md" />
      <div className="flex max-w-[760px] flex-col gap-8">
      {SECTIONS.map((s) => (
        <section key={s.h} className="flex flex-col gap-2">
          <h2 className="text-[18px] font-bold text-ink">{s.h}</h2>
          <ul className="flex flex-col gap-1.5">
            {s.p.map((t) => (
              <li key={t} className="text-[15px] leading-relaxed text-ink-2">
                • {t}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Link href="/account" className="text-[14px] font-semibold text-brand hover:underline">
        Đến trang tài khoản →
      </Link>
      </div>
    </Page>
  );
}
