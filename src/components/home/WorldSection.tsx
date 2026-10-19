import Link from "next/link";
import { RAR, SPECIES } from "@/components/land/data";
import { DAILY_GOAL, WELCOME_GIFT, XP_PER_CRYSTAL } from "@/lib/land/economy";
import { SectionHead } from "./SectionHead";
import { WorldScrolly } from "./WorldScrolly";
import { GuestOnly } from "./viewer";
import { Arrow, Lock } from "./icons";

/** Phần "Vùng đất của bạn": 4 bước Học → Tinh thể → Gieo cây → Đi dạo, nội dung theo luật thật của vùng đất */
export function WorldSection() {
  const rare = SPECIES.filter((s) => !s.tree && !s.imag);
  const costs = RAR.map((r) => r.cost);
  return (
    <section className="world" id="vungdat" aria-labelledby="h-world">
      <SectionHead
        id="h-world"
        eyebrow="Vùng đất của bạn"
        title={["Thảo nguyên", "Pha Lê"]}
        lead="Một cao nguyên trên mây, lớn dần theo những ngày bạn học. Ngày và đêm đổi theo giờ thật. Nhìn xuống là sông, hồ và thành phố."
      />
      <WorldScrolly>
        <ol className="w-steps">
          <li className="w-step on" data-step="1">
            <span className="n">Bước 1</span>
            <h3 className="hx">
              <span>Học</span>
              <span>mỗi ngày</span>
            </h3>
            <p className="lead">
              Kế hoạch hôm nay gồm ba mục nhỏ: đạt {DAILY_GOAL.xp} XP, ôn {DAILY_GOAL.reviews} thẻ và học {DAILY_GOAL.lessons} bài mới. Mỗi ngày có học là một ngày trong chuỗi.
            </p>
          </li>
          <li className="w-step" data-step="2">
            <span className="n">Bước 2</span>
            <h3 className="hx">
              <span>Nhận</span>
              <span>Tinh thể</span>
            </h3>
            <p className="lead">
              Cứ {XP_PER_CRYSTAL} XP bạn học được thành 1 Tinh thể. Lần đầu mở vùng đất, bạn được tặng {WELCOME_GIFT} Tinh thể, đủ để gieo cây đầu tiên.
            </p>
          </li>
          <li className="w-step" data-step="3">
            <span className="n">Bước 3</span>
            <h3 className="hx">
              <span>Gieo cây</span>
              <span>quý hiếm</span>
            </h3>
            <p className="lead">
              Dùng Tinh thể ({Math.min(...costs)}–{Math.max(...costs)} mỗi cây) để trồng những loài có thật vào tám ô đất, cùng anh đào, thông, phong đỏ.
            </p>
            <ul>
              {rare.map((s) => (
                <li key={s.id}>{s.vn}</li>
              ))}
            </ul>
          </li>
          <li className="w-step" data-step="4">
            <span className="n">Bước 4</span>
            <h3 className="hx">
              <span>Đi dạo trên</span>
              <span>thảo nguyên</span>
            </h3>
            <p className="lead">Dẫn Lữ khách đi quanh cao nguyên. Gặp Mochi, chú cáo mây, và Bọt, chú rùa biển sao. Ra mép đá để nhìn xuống sông, hồ và thành phố bên dưới.</p>
          </li>
        </ol>
      </WorldScrolly>
      <div className="w-cta">
        <div>
          <Link className="btn btn-p" href="/land">
            Mở vùng đất
            <Arrow />
          </Link>
          <GuestOnly>
            <span className="lock">
              <Lock />
              Cần đăng nhập
            </span>
          </GuestOnly>
          <p className="note">Vùng đất gắn với tài khoản để cây bạn trồng và Tinh thể bạn gom không mất khi đổi thiết bị.</p>
        </div>
      </div>
    </section>
  );
}
