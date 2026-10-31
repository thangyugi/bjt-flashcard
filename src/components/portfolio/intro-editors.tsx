"use client";

import { useState } from "react";
import { QA_CATS, emptyIntroProfile, type IntroBlock, type IntroProfile, type QaCat, type QaItem } from "@/lib/portfolio/types";
import { Area, EditPanel, Field, Text } from "./editors";

/*
 * Biểu mẫu của trang Introduce (自己紹介) và Interview Q&A (面接Q&A).
 * Hai cột: tiếng Nhật bên trái, bản dịch tiếng Việt bên phải (điện thoại: xếp chồng).
 */

type Errors = Record<string, string>;

function LangLegend({ ja }: { ja?: boolean }) {
  return ja ? (
    <legend>
      <span className="lang-badge ja" aria-hidden>
        日
      </span>
      日本語
    </legend>
  ) : (
    <legend>
      <span className="lang-badge" aria-hidden>
        Vi
      </span>
      Tiếng Việt
    </legend>
  );
}

// ═══════════════ Introduce: thẻ hồ sơ ═══════════════
export function IntroProfileForm({ initial, onSave, onClose }: { initial: IntroProfile; onSave: (v: IntroProfile) => void; onClose: () => void }) {
  const [v, setV] = useState<IntroProfile>({ ...emptyIntroProfile(), ...initial });
  const [err, setErr] = useState<Errors>({});
  const up = (p: Partial<IntroProfile>) => setV((x) => ({ ...x, ...p }));
  const submit = () => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = "Cần nhập họ tên.";
    setErr(e);
    if (Object.keys(e).length) return false;
    const t = (s: string) => s.trim();
    onSave({
      name: t(v.name),
      kana: t(v.kana),
      role: t(v.role),
      location: t(v.location),
      years: t(v.years),
      langs: t(v.langs),
      catchJa: t(v.catchJa),
      catchVi: t(v.catchVi),
    });
    return true;
  };
  return (
    <EditPanel eyebrow="Introduce · 自己紹介" title="Sửa hồ sơ" lead="Thông tin trên thẻ hồ sơ ở đầu trang Introduce." onClose={onClose} onSubmit={submit}>
      <div className="cols2">
        <fieldset>
          <legend>
            <span className="n">1</span> Thông tin cơ bản
          </legend>
          <Field label="Họ tên" error={err.name}>
            <Text value={v.name} onChange={(name) => up({ name })} invalid={!!err.name} maxLength={60} />
          </Field>
          <Field label="Phiên âm (フリガナ)">
            <Text value={v.kana} onChange={(kana) => up({ kana })} maxLength={60} lang="ja" placeholder="もりもと けんた" />
          </Field>
          <Field label="Vai trò">
            <Text value={v.role} onChange={(role) => up({ role })} maxLength={120} />
          </Field>
          <div className="row2">
            <Field label="Nơi ở">
              <Text value={v.location} onChange={(location) => up({ location })} maxLength={60} />
            </Field>
            <Field label="Kinh nghiệm">
              <Text value={v.years} onChange={(years) => up({ years })} maxLength={80} placeholder="5 năm IT" />
            </Field>
          </div>
          <Field label="Ngôn ngữ">
            <Text value={v.langs} onChange={(langs) => up({ langs })} maxLength={120} placeholder="Tiếng Việt · Tiếng Nhật N2" />
          </Field>
        </fieldset>
        <fieldset>
          <legend>
            <span className="n">2</span> Câu khẩu hiệu (キャッチコピー)
          </legend>
          <Field label="日本語">
            <Area value={v.catchJa} onChange={(catchJa) => up({ catchJa })} maxLength={200} rows={4} lang="ja" />
          </Field>
          <Field label="Tiếng Việt">
            <Area value={v.catchVi} onChange={(catchVi) => up({ catchVi })} maxLength={300} rows={4} />
          </Field>
        </fieldset>
      </div>
    </EditPanel>
  );
}

// ═══════════════ Introduce: một mục giới thiệu ═══════════════
export function IntroBlockForm({
  initial,
  isNew,
  onSave,
  onClose,
  onDelete,
}: {
  initial: IntroBlock;
  isNew: boolean;
  onSave: (v: IntroBlock) => void;
  onClose: () => void;
  onDelete?: () => void;
}) {
  const [v, setV] = useState(initial);
  const [err, setErr] = useState<Errors>({});
  const up = (p: Partial<IntroBlock>) => setV((x) => ({ ...x, ...p }));
  const submit = () => {
    const e: Errors = {};
    if (!v.titleJa.trim()) e.titleJa = "Cần tiêu đề tiếng Nhật.";
    setErr(e);
    if (Object.keys(e).length) return false;
    onSave({ ...v, titleJa: v.titleJa.trim(), titleVi: v.titleVi.trim(), bodyJa: v.bodyJa.trim(), bodyVi: v.bodyVi.trim() });
    return true;
  };
  return (
    <EditPanel
      eyebrow="Introduce · 自己紹介"
      title={isNew ? "Thêm mục giới thiệu" : "Sửa mục giới thiệu"}
      lead="Tiếng Nhật ở cột trái, bản dịch tiếng Việt ở cột phải. Xuống dòng được giữ nguyên khi hiển thị."
      onClose={onClose}
      onSubmit={submit}
      submitLabel={isNew ? "Thêm mục" : "Lưu"}
      onDelete={onDelete}
      deleteLabel="Xóa mục"
    >
      <div className="cols2">
        <fieldset>
          <LangLegend ja />
          <Field label="タイトル · Tiêu đề" error={err.titleJa}>
            <Text value={v.titleJa} onChange={(titleJa) => up({ titleJa })} invalid={!!err.titleJa} maxLength={60} lang="ja" placeholder="例：強み" />
          </Field>
          <Field label="本文 · Nội dung" hint={`${v.bodyJa.length}/2000`}>
            <Area className="tall" value={v.bodyJa} onChange={(bodyJa) => up({ bodyJa })} maxLength={2000} rows={10} lang="ja" />
          </Field>
        </fieldset>
        <fieldset>
          <LangLegend />
          <Field label="Bản dịch tiêu đề">
            <Text value={v.titleVi} onChange={(titleVi) => up({ titleVi })} maxLength={80} placeholder="VD: Điểm mạnh" />
          </Field>
          <Field label="Bản dịch nội dung" hint={`${v.bodyVi.length}/3000`}>
            <Area className="tall" value={v.bodyVi} onChange={(bodyVi) => up({ bodyVi })} maxLength={3000} rows={10} />
          </Field>
        </fieldset>
      </div>
    </EditPanel>
  );
}

// ═══════════════ Interview Q&A: một câu hỏi ═══════════════
export function QaForm({
  initial,
  isNew,
  onSave,
  onClose,
  onDelete,
}: {
  initial: QaItem;
  isNew: boolean;
  onSave: (v: QaItem) => void;
  onClose: () => void;
  onDelete?: () => void;
}) {
  const [v, setV] = useState(initial);
  const [err, setErr] = useState<Errors>({});
  const up = (p: Partial<QaItem>) => setV((x) => ({ ...x, ...p }));
  const submit = () => {
    const e: Errors = {};
    if (!v.qJa.trim()) e.qJa = "Cần câu hỏi tiếng Nhật.";
    setErr(e);
    if (Object.keys(e).length) return false;
    onSave({ ...v, qJa: v.qJa.trim(), qVi: v.qVi.trim(), aJa: v.aJa.trim(), aVi: v.aVi.trim() });
    return true;
  };
  return (
    <EditPanel
      eyebrow="Interview Q&A · 面接Q&A"
      title={isNew ? "Thêm câu hỏi mới" : "Sửa câu hỏi"}
      lead="Viết câu hỏi và câu trả lời bằng tiếng Nhật ở cột trái, bản dịch tiếng Việt ở cột phải."
      onClose={onClose}
      onSubmit={submit}
      submitLabel={isNew ? "Thêm câu hỏi" : "Lưu"}
      onDelete={onDelete}
      deleteLabel="Xóa câu hỏi"
    >
      <fieldset>
        <legend>
          <span className="n">1</span> Chủ đề
        </legend>
        <div className="seg" role="group" aria-label="Chủ đề">
          {QA_CATS.map((c) => (
            <button key={c.key} type="button" aria-pressed={v.cat === c.key} onClick={() => up({ cat: c.key as QaCat })}>
              <span className="font-jp" lang="ja">
                {c.ja}
              </span>{" "}
              · {c.vi}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="cols2">
        <fieldset>
          <LangLegend ja />
          <Field label="質問 · Câu hỏi" error={err.qJa}>
            <Text value={v.qJa} onChange={(qJa) => up({ qJa })} invalid={!!err.qJa} maxLength={300} lang="ja" placeholder="例：簡単に自己紹介をお願いします。" />
          </Field>
          <Field label="回答 · Câu trả lời" hint={`${v.aJa.length}/2000`}>
            <Area className="tall" value={v.aJa} onChange={(aJa) => up({ aJa })} maxLength={2000} rows={10} lang="ja" />
          </Field>
        </fieldset>
        <fieldset>
          <LangLegend />
          <Field label="Bản dịch câu hỏi">
            <Text value={v.qVi} onChange={(qVi) => up({ qVi })} maxLength={400} placeholder="VD: Xin hãy giới thiệu ngắn gọn về bản thân." />
          </Field>
          <Field label="Bản dịch câu trả lời" hint={`${v.aVi.length}/3000`}>
            <Area className="tall" value={v.aVi} onChange={(aVi) => up({ aVi })} maxLength={3000} rows={10} />
          </Field>
        </fieldset>
      </div>
    </EditPanel>
  );
}
