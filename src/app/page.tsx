import "@/components/home/home.css";
import { homeCatalog } from "@/lib/home/catalog";
import { Hero } from "@/components/home/Hero";
import { SectionHead } from "@/components/home/SectionHead";
import { TodayBand } from "@/components/home/TodayBand";
import { CourseBand } from "@/components/home/CourseBand";
import { WorldSection } from "@/components/home/WorldSection";
import { CtaBand } from "@/components/home/CtaBand";
import { HomeFooter } from "@/components/home/HomeFooter";
import { IsoIcon } from "@/components/home/drawing/IsoIcon";
import { DAILY_GOAL, XP_PER_CRYSTAL } from "@/lib/land/economy";

/** Trang chủ: trang tĩnh; phần theo người học (kế hoạch, chuỗi, tiến độ) chạy phía client. */
export default function HomePage() {
  const catalog = homeCatalog();
  const { totals } = catalog;
  return (
    <div className="hp">
      <Hero catalog={catalog} />

      <section id="homnay" aria-labelledby="h-today">
        <SectionHead
          id="h-today"
          eyebrow="Hôm nay"
          title={["Mỗi ngày", "một kế hoạch"]}
          lead={`Ba mục vừa sức mỗi ngày: ${DAILY_GOAL.xp} XP, ${DAILY_GOAL.reviews} thẻ ôn, ${DAILY_GOAL.lessons} bài mới. Giữ chuỗi ngày và gom Tinh thể (${XP_PER_CRYSTAL} XP = 1 Tinh thể) cho vùng đất của bạn.`}
        />
        <TodayBand icons={{ plan: <IsoIcon name="plan" />, gift: <IsoIcon name="gift" />, streak: <IsoIcon name="streak" /> }} />
      </section>

      <section id="khoahoc" aria-labelledby="h-courses">
        <SectionHead
          id="h-courses"
          eyebrow="Khóa học"
          title={[`${totals.courses} khóa`, `${totals.lessons.toLocaleString("vi-VN")} bài`, `${totals.items.toLocaleString("vi-VN")} mục học`]}
          lead="Nội dung mở để xem miễn phí. Đăng nhập khi bạn muốn lưu tiến độ, lịch ôn và phần thưởng."
        />
        <CourseBand catalog={catalog} />
      </section>

      <WorldSection />
      <CtaBand />
      <HomeFooter />
    </div>
  );
}
