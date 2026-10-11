/**
 * Hàm tiện ích để soạn nội dung bài học Phần 5–8 với cùng bộ class HTML
 * như tài liệu gốc (dfn/gloss, callout, tbl-wrap, figure, sum-card…).
 */

const ICON_INFO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`;
const ICON_PEN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`;
const ICON_WARN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>`;

/** Thuật ngữ tiếng Anh + giải nghĩa tiếng Việt ngay bên cạnh */
export const d = (term: string, gloss: string) => `<dfn>${term}</dfn> <span class="gloss">(${gloss})</span>`;

/** Hộp "Ví dụ đời thường" */
export const example = (body: string, title = "Ví dụ đời thường") =>
  `<div class="callout example"><div class="callout-head">${ICON_INFO}${title}</div>${body}</div>`;

/** Hộp "Ghi nhớ nhanh" */
export const memo = (body: string, title = "Ghi nhớ nhanh") =>
  `<div class="callout memo"><div class="callout-head">${ICON_PEN}${title}</div>${body}</div>`;

/** Hộp lưu ý / cảnh báo */
export const note = (title: string, body: string) =>
  `<div class="callout note"><div class="callout-head">${ICON_WARN}${title}</div>${body}</div>`;

export const table = (head: string[], rows: string[][]) =>
  `<div class="tbl-wrap"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;

/** Danh sách bước có đánh số dạng thẻ */
export const steps = (items: string[]) => `<ol class="steps">${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;

export const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
export const ol = (items: string[]) => `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;

/** Lưới thẻ so sánh: mỗi thẻ có nhãn nhỏ, tiêu đề và nội dung HTML */
export const cards = (items: { tag?: string; title: string; body: string }[], cols: 2 | 3 = 2) =>
  `<div class="cards${cols === 3 ? " c3" : ""}">${items
    .map((c) => `<div class="card">${c.tag ? `<span class="tag">${c.tag}</span>` : ""}<h4>${c.title}</h4>${c.body}</div>`)
    .join("")}</div>`;

/** Hội thoại minh họa: [vai, nội dung] với vai là "user" | "bot" | "sys" */
export const chat = (msgs: [("user" | "bot" | "sys"), string][]) =>
  `<div class="chat">${msgs
    .map(([who, text]) => {
      const name = who === "user" ? "Nhân viên" : who === "bot" ? "Helpdesk agent" : "";
      return `<div class="msg ${who}">${name ? `<span class="who">${name}</span>` : ""}${text}</div>`;
    })
    .join("")}</div>`;

/** Khối mã: tự thoát ký tự HTML, tô mờ chú thích (# hoặc --) */
export const code = (src: string) => {
  const esc = src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = esc
    .trim()
    .split("\n")
    .map((line) => line.replace(/(^|\s)(#|--|\/\/)(\s.*)$/, (_, sp, mark, rest) => `${sp}<span class="cmt">${mark}${rest}</span>`));
  return `<pre><code>${lines.join("\n")}</code></pre>`;
};

/** Thẻ tóm tắt một bài trong trang tổng kết */
export const sum = (title: string, items: string[]) => `<div class="sum-card"><h4>${title}</h4>${ul(items)}</div>`;
export const sumGrid = (cardsHtml: string[]) => `<div class="summary-grid">${cardsHtml.join("")}</div>`;

export const figure = (svg: string, caption: string) => `<figure>${svg}<figcaption>${caption}</figcaption></figure>`;

let markerSeq = 100;
/** Đầu mũi tên dùng chung cho một sơ đồ SVG; trả về [defs, id] */
export const arrowDefs = (): [string, string] => {
  const id = `oa${++markerSeq}`;
  return [
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`,
    id,
  ];
};

/**
 * Sơ đồ luồng ngang 2–5 hộp có mũi tên.
 * Mỗi hộp: tiêu đề + dòng phụ (tùy chọn). `hi` = chỉ số hộp được nhấn mạnh.
 */
export const flow = (boxes: { t: string; s?: string }[], aria: string, hi?: number) => {
  const [defs, id] = arrowDefs();
  const bw = 150;
  const gap = 46;
  const w = boxes.length * bw + (boxes.length - 1) * gap + 20;
  const h = 96;
  const parts = boxes.map((b, i) => {
    const x = 10 + i * (bw + gap);
    const strong = i === hi;
    const arrow =
      i < boxes.length - 1
        ? `<line x1="${x + bw + 4}" y1="48" x2="${x + bw + gap - 6}" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#${id})"/>`
        : "";
    return `<rect x="${x}" y="18" width="${bw}" height="60" rx="12" fill="${strong ? "currentColor" : "none"}" fill-opacity="${strong ? 0.08 : 0}" stroke="currentColor" stroke-width="${strong ? 2.2 : 1.4}"/>
<text x="${x + bw / 2}" y="${b.s ? 44 : 53}" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">${b.t}</text>${
      b.s ? `<text x="${x + bw / 2}" y="62" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".7">${b.s}</text>` : ""
    }${arrow}`;
  });
  return `<svg class="svg-diagram" viewBox="0 0 ${w} ${h}" role="img" aria-label="${aria}">${defs}${parts.join("")}</svg>`;
};
