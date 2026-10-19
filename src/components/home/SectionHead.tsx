import type { ReactNode } from "react";

/** Đầu mục: nhãn nhỏ + tiêu đề in hoa bên trái, lời dẫn bên phải, trên lưới cột mảnh */
export function SectionHead({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: string[]; lead: ReactNode }) {
  return (
    <div className="sec-head">
      <div className="l">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="hx h2" id={id}>
          {title.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </h2>
      </div>
      <div className="r">
        <p className="lead">{lead}</p>
      </div>
    </div>
  );
}
