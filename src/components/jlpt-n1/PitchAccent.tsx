import { cn } from "@/lib/utils";

/**
 * Trọng âm cao–thấp tiếng Nhật (giọng Tokyo) cho người Việt:
 * vẽ đường cao/thấp trên từng mora + câu hướng dẫn đọc đơn giản.
 */

/** Tách kana thành mora: きゃ = 1 mora; っ, ん, ー mỗi cái 1 mora. */
export function moras(kana: string): string[] {
  const out: string[] = [];
  for (const ch of kana) {
    if (/[ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ]/.test(ch) && out.length) out[out.length - 1] += ch;
    else out.push(ch);
  }
  return out;
}

/** Cao (true) / thấp (false) cho từng mora, và cho trợ từ đi sau (phần tử cuối). */
export function pitchPattern(n: number, acc: number): boolean[] {
  const h: boolean[] = [];
  for (let i = 1; i <= n + 1; i++) {
    if (acc === 1) h.push(i === 1);
    else if (acc === 0) h.push(i !== 1);
    else h.push(i !== 1 && i <= acc);
  }
  return h;
}

export function pitchType(n: number, acc: number) {
  if (acc === 0) return { ja: "平板型", vi: "Kiểu bằng", how: "Âm đầu thấp, từ âm thứ 2 lên cao và giữ cao đến hết — trợ từ đi sau (が・を) cũng cao." };
  if (acc === 1) return { ja: "頭高型", vi: "Kiểu đầu cao", how: "Âm đầu cao rồi rơi xuống thấp ngay từ âm thứ 2." };
  if (acc === n) return { ja: "尾高型", vi: "Kiểu đuôi cao", how: "Âm đầu thấp, lên cao đến hết từ, trợ từ đi sau (が・を) rơi xuống thấp." };
  return { ja: "中高型", vi: "Kiểu giữa cao", how: `Âm đầu thấp, lên cao ở âm 2${acc > 2 ? `–${acc}` : ""}, rồi rơi xuống từ âm ${acc + 1}.` };
}

/** Chuỗi gợi ý kiểu は↗っこう / と↗り↘ひき (↗ lên giọng, ↘ xuống giọng). */
export function pitchHint(ms: string[], high: boolean[], particle?: string) {
  let s = ms[0];
  for (let i = 1; i < ms.length; i++) {
    if (high[i] !== high[i - 1]) s += high[i] ? "↗" : "↘";
    s += ms[i];
  }
  if (particle) {
    const last = ms.length - 1;
    s += high[last] !== high[ms.length] ? (high[ms.length] ? "↗" : "↘") : "";
    s += particle;
  }
  return s;
}

/** Đường cao–thấp vẽ trên từng mora (kèm một trợ từ mờ phía sau để thấy giọng có rơi hay không). */
export function PitchLine({ kana, acc, particle = "が", className }: { kana: string; acc: number; particle?: string; className?: string }) {
  const ms = moras(kana);
  const high = pitchPattern(ms.length, acc);
  const cells = particle ? [...ms, particle] : ms;
  return (
    <span className={cn("inline-flex items-stretch font-jp text-[19px] leading-none", className)} aria-label={pitchHint(ms, high, particle)}>
      {cells.map((m, i) => {
        const hi = high[i];
        const step = i > 0 && high[i] !== high[i - 1];
        const isParticle = i === ms.length;
        return (
          <span
            key={i}
            className={cn(
              "flex flex-col items-center px-[3px] pt-1.5 pb-1",
              hi ? "border-t-[3px] border-brand" : "border-b-[3px] border-ink-3/70",
              step && "border-l-[3px]",
              step && (hi ? "border-l-brand" : "border-l-ink-3/70"),
              isParticle && "opacity-45"
            )}
          >
            <span className={cn(hi ? "-translate-y-[2px] font-bold text-ink" : "translate-y-[2px] text-ink-2")}>{m}</span>
          </span>
        );
      })}
    </span>
  );
}

/** Khối trọng âm đầy đủ của một từ: đường cao–thấp + gợi ý ↗↘ + mô tả kiểu. */
export function PitchAccent({ kana, acc, particle = "が" }: { kana: string; acc: number | number[]; particle?: string }) {
  const list = Array.isArray(acc) ? acc : [acc];
  const ms = moras(kana);
  return (
    <div className="flex flex-col gap-3">
      {list.map((a, i) => {
        const high = pitchPattern(ms.length, a);
        const t = pitchType(ms.length, a);
        return (
          <div key={a} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {i > 0 && <span className="w-full text-[12px] text-ink-3">Cũng có người đọc:</span>}
            <PitchLine kana={kana} acc={a} particle={particle} />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[15px] font-bold tracking-wide text-ink">
                {pitchHint(ms, high, particle)}
                <span className="ml-2 rounded-md bg-surface-2 px-1.5 py-0.5 text-[12px] font-semibold text-ink-2">
                  {t.vi} · <span className="font-jp">{t.ja}</span> [{a}]
                </span>
              </span>
              <span className="text-[13px] leading-snug text-ink-2">{t.how}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Hộp giải thích cách đọc ký hiệu — dùng ví dụ あめ (雨 mưa / 飴 kẹo). */
export function PitchGuide() {
  return (
    <details className="group rounded-2xl border border-line bg-surface px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-3 text-[15px] font-bold text-ink">
        Cách đọc ký hiệu cao–thấp (trọng âm) — xem ví dụ あめ
        <span className="shrink-0 text-[13px] font-semibold text-brand group-open:hidden">Mở</span>
        <span className="hidden shrink-0 text-[13px] font-semibold whitespace-nowrap text-brand group-open:inline">Thu gọn</span>
      </summary>
      <div className="mt-4 flex flex-col gap-4 text-[14px] leading-relaxed text-ink-2">
        <p>
          Tiếng Nhật không có dấu như tiếng Việt, nhưng mỗi âm (mora) được đọc <b className="text-brand">cao</b> hoặc{" "}
          <b className="text-ink">thấp</b>. Cùng cách viết kana mà khác cao–thấp thì khác nghĩa:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-xl bg-surface-2 px-4 py-3">
            <span className="font-jp text-[15px] font-bold text-ink">雨 (mưa)</span>
            <PitchLine kana="あめ" acc={1} />
            <span>
              <b>あ↘め</b> — “Á” cao rồi rơi xuống “me”, nghe gần như <i>“á-mề”</i>.
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-surface-2 px-4 py-3">
            <span className="font-jp text-[15px] font-bold text-ink">飴 (kẹo)</span>
            <PitchLine kana="あめ" acc={0} />
            <span>
              <b>あ↗め</b> — “a” thấp rồi lên “me” và giữ ngang, nghe gần như <i>“a-me”</i> (thanh ngang).
            </span>
          </div>
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>
            <b className="text-brand">Gạch đỏ phía trên</b> = âm đọc cao (như thanh ngang, giọng hơi cao lên).{" "}
            <b>Gạch xám phía dưới</b> = âm đọc thấp (hạ giọng nhẹ, gần thanh huyền).
          </li>
          <li>
            <b>↗</b> = lên giọng, <b>↘</b> = xuống giọng. Không nhấn mạnh hay kéo dài — chỉ đổi cao độ.
          </li>
          <li>
            Ô <span className="opacity-60">が</span> mờ ở cuối là trợ từ đi sau: nhìn vào đó để phân biệt <b>kiểu bằng</b>{" "}
            (trợ từ vẫn cao) với <b>kiểu đuôi cao</b> (trợ từ rơi xuống).
          </li>
          <li>Số trong ngoặc [0], [1], [2]… là vị trí âm mà sau đó giọng rơi xuống ([0] = không rơi).</li>
          <li>Đây là giọng chuẩn Tokyo (giọng trên tin tức NHK). Vùng Kansai có thể đọc khác.</li>
        </ul>
      </div>
    </details>
  );
}
