"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, LayoutGrid, Search, Shuffle, SquareStack } from "lucide-react";
import type { GlossaryItem } from "@/data/oci-ai/types";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

/** Tô sáng đoạn khớp từ khóa (so khớp không dấu). */
function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = norm(text).indexOf(q);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function GlossaryBrowser({ items }: { items: GlossaryItem[] }) {
  const sections = useMemo(() => Array.from(new Set(items.map((i) => i.section))), [items]);
  const [section, setSection] = useState<string | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"list" | "cards">("list");
  const [order, setOrder] = useState<number[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const q = norm(query.trim());
  const visible = useMemo(
    () =>
      items.filter(
        (i) =>
          (section === "ALL" || i.section === section) &&
          (!q || norm(`${i.term} ${i.vi} ${i.cat}`).includes(q))
      ),
    [items, section, q]
  );

  const deck = order ? order.map((i) => visible[i]).filter(Boolean) : visible;
  const card = deck[Math.min(idx, Math.max(0, deck.length - 1))];

  const resetDeck = () => {
    setOrder(null);
    setIdx(0);
    setFlipped(false);
  };
  const go = (d: number) => {
    setFlipped(false);
    setIdx((i) => (deck.length ? (i + d + deck.length) % deck.length : 0));
  };
  const shuffle = () => {
    const arr = visible.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setOrder(arr);
    setIdx(0);
    setFlipped(false);
  };

  return (
    <>
      <div className="oci-gloss-tools">
        <label className="oci-gloss-search">
          <Search aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetDeck();
            }}
            placeholder="Gõ để tìm, ví dụ: overfitting, embedding, RAG, MCP…"
            aria-label="Tìm thuật ngữ"
          />
        </label>
        <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div className="oci-seg" role="group" aria-label="Lọc theo phần">
            <button
              aria-pressed={section === "ALL"}
              onClick={() => {
                setSection("ALL");
                resetDeck();
              }}
            >
              Tất cả · {items.length}
            </button>
            {sections.map((s) => (
              <button
                key={s}
                aria-pressed={section === s}
                onClick={() => {
                  setSection(s);
                  resetDeck();
                }}
              >
                {s.split(" — ")[0]}
              </button>
            ))}
          </div>
          <div className="oci-seg" role="group" aria-label="Chế độ xem">
            <button aria-pressed={mode === "list"} onClick={() => setMode("list")}>
              <LayoutGrid size={14} style={{ display: "inline", verticalAlign: -2, marginRight: 5 }} aria-hidden />
              Danh sách
            </button>
            <button
              aria-pressed={mode === "cards"}
              onClick={() => {
                setMode("cards");
                setFlipped(false);
              }}
            >
              <SquareStack size={14} style={{ display: "inline", verticalAlign: -2, marginRight: 5 }} aria-hidden />
              Thẻ ghi nhớ
            </button>
          </div>
        </div>
      </div>

      {!visible.length && <p className="oci-gloss-empty">Không tìm thấy thuật ngữ nào khớp “{query}”.</p>}

      {mode === "list" &&
        sections.map((s) => {
          const list = visible.filter((i) => i.section === s);
          if (!list.length) return null;
          return (
            <section key={s}>
              <div className="oci-gloss-head">
                {s} · {list.length}
              </div>
              <div className="oci-gloss-list">
                {list.map((i) => (
                  <div className="oci-gloss-item" key={`${s}-${i.term}`}>
                    <div className="cat">{i.cat}</div>
                    <div className="term">
                      <Highlight text={i.term} q={q} />
                    </div>
                    <div className="vi">
                      <Highlight text={i.vi} q={q} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

      {mode === "cards" && card && (
        <div className="oci-fc-wrap">
          <div
            className={`oci-fc${flipped ? " flipped" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={flipped ? `Nghĩa: ${card.vi}` : `Thuật ngữ: ${card.term}. Bấm để xem nghĩa`}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setFlipped((f) => !f);
              }
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
          >
            <div className="oci-fc-inner">
              <div className="oci-fc-face">
                <span className="cat">
                  {card.section.split(" — ")[0]} · {card.cat}
                </span>
                <span className="term">{card.term}</span>
                <span className="hint">Bấm để lật thẻ</span>
              </div>
              <div className="oci-fc-face oci-fc-back">
                <span className="cat">{card.term}</span>
                <span className="vi">{card.vi}</span>
              </div>
            </div>
          </div>
          <div className="oci-fc-nav">
            <button className="oci-btn ghost sm" onClick={() => go(-1)} aria-label="Thẻ trước">
              <ArrowLeft aria-hidden />
            </button>
            <span className="count">
              {Math.min(idx, deck.length - 1) + 1} / {deck.length}
            </span>
            <span style={{ display: "flex", gap: 8 }}>
              <button className="oci-btn ghost sm" onClick={shuffle} aria-label="Xáo trộn thẻ">
                <Shuffle aria-hidden />
              </button>
              <button className="oci-btn primary sm" onClick={() => go(1)} aria-label="Thẻ tiếp theo">
                <ArrowRight aria-hidden />
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
