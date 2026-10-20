import Link from "next/link";

const COLS: { h: string; links: [string, string][] }[] = [
  {
    h: "Khóa học",
    links: [
      ["JLPT N1", "/jlpt-n1"],
      ["Phát âm IPA", "/english"],
      ["OCI AI Foundations", "/oracle-oci-ai"],
      ["Từ vựng BJT", "/bjt"],
    ],
  },
  {
    h: "Nền tảng",
    links: [
      ["Học bài", "/study"],
      ["Trắc nghiệm", "/quiz"],
      ["Ôn tập FSRS", "/review"],
      ["Tiến độ học tập", "/progress"],
      ["Vùng đất của bạn", "/land"],
    ],
  },
  {
    h: "Tài khoản",
    links: [
      ["Đăng nhập", "/login?next=/"],
      ["Tạo tài khoản", "/register?next=/"],
      ["Quyền riêng tư", "/privacy"],
    ],
  },
];

/** Chân trang của trang chủ (thương hiệu thật như trên thanh tiêu đề) */
export function HomeFooter() {
  return (
    <footer className="home-foot">
      <div className="foot-grid">
        <div>
          <Link className="brand" href="/">
            <span className="mark" aria-hidden>
              語
            </span>
            <span className="bn">LeoEdu</span>
          </Link>
          <p className="note">Học ngôn ngữ và chứng chỉ bằng tiếng Việt.</p>
        </div>
        {COLS.map((c) => (
          <nav key={c.h} aria-label={c.h}>
            <h4>{c.h}</h4>
            {c.links.map(([t, href]) => (
              <Link key={href} href={href}>
                {t}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="legal">
        <span>© 2026 LeoEdu</span>
        <span className="jp" lang="ja">
          一歩ずつ
        </span>
      </div>
    </footer>
  );
}
