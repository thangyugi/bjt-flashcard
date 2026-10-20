import Link from "next/link";
import type { HomeCatalog } from "@/lib/home/catalog";
import { HeroFigure } from "./HeroFigure";
import { Arrow } from "./icons";

const FEATURES = [
  { t: "Lịch ôn thông minh", d: "Thẻ quay lại đúng lúc bạn sắp quên, theo trí nhớ của riêng bạn." },
  { t: "Giọng đọc tự nhiên", jp: "音声", d: "Nghe từng câu, từng âm. Tiếng Anh có giọng Anh và Mỹ, nam và nữ." },
  { t: "Học offline", d: "Bài đã mở vẫn học được khi mất mạng." },
  { t: "Đồng bộ mọi thiết bị", d: "Đăng nhập để tiến độ đi theo bạn từ điện thoại sang máy tính." },
];

/** Hero: tiêu đề, lời dẫn, nút, số liệu thật từ catalog và Hình 1 (vẽ nét rồi tô màu) */
export function Hero({ catalog }: { catalog: HomeCatalog }) {
  const { totals } = catalog;
  return (
    <section className="hero" aria-labelledby="h-hero">
      <div className="hero-grid">
        <div className="hero-text">
          <p className="eyebrow">
            Học bằng tiếng Việt{" "}
            <span className="jp" lang="ja">
              日本語・English・AI
            </span>
          </p>
          <h1 className="hx" id="h-hero">
            <span>Học từng nét.</span>
            <span>Nhớ trọn</span>
            <span>bức tranh.</span>
          </h1>
          <p className="lead">
            Ngữ pháp N1 kể thành truyện, phát âm IPA, chứng chỉ OCI AI và từ vựng BJT trong cùng một nơi. Lịch ôn thông minh đưa từng thẻ quay lại đúng lúc bạn sắp quên.
          </p>
          <div className="cta-row">
            <a className="btn btn-p" href="#khoahoc">
              Bắt đầu học miễn phí
              <Arrow />
            </a>
            <Link className="btn btn-g" href="/land">
              Xem vùng đất của bạn
            </Link>
          </div>
          <dl className="stats">
            <div>
              <dt>Khóa học</dt>
              <dd>{totals.courses}</dd>
            </div>
            <div>
              <dt>Bài học</dt>
              <dd>{totals.lessons.toLocaleString("vi-VN")}</dd>
            </div>
            <div>
              <dt>Mục học</dt>
              <dd>{totals.items.toLocaleString("vi-VN")}</dd>
            </div>
          </dl>
        </div>
        <HeroFigure />
      </div>
      <div className="cols c4 feat">
        {FEATURES.map((f) => (
          <div className="col" key={f.t}>
            <h3>
              {f.t}
              {f.jp && <small lang="ja">{f.jp}</small>}
            </h3>
            <p>{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
