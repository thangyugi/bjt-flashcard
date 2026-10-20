import { AudioLines, BookOpenText, GitCompareArrows, Lightbulb, Link2, MessageSquareQuote, PenLine } from "lucide-react";
import type { KanjiInfo, VocabWord } from "@/data/jlpt-n1/vocab/types";
import { POS_LABEL } from "@/data/jlpt-n1/vocab/types";
import { display, rubyOf } from "@/data/jlpt-n1/vocab/quiz";
import { Jp } from "./Jp";
import { Reveal } from "./Reveal";
import { SpeakButton } from "./Speak";
import { PitchAccent } from "./PitchAccent";

const KANJI = /[㐀-䶿一-鿿豈-﫿々〆ヶ]/;

function Label({ icon: Icon, children }: { icon: typeof BookOpenText; children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-1.5 text-[12px] font-bold tracking-[0.06em] text-ink-3 uppercase">
      <Icon className="h-3.5 w-3.5 text-brand" aria-hidden />
      {children}
    </h4>
  );
}

/**
 * Thẻ một từ vựng. `fw` là bản đã gắn furigana (ví dụ, cụm từ…), `raw` là dữ liệu gốc
 * (dùng để tạo furigana cho từ chính theo đúng cách đọc của nó).
 */
export function WordCard({
  raw,
  fw,
  anchor,
  kanji,
}: {
  raw: VocabWord;
  fw: VocabWord;
  anchor: string;
  kanji: Record<string, KanjiInfo>;
}) {
  const head = rubyOf(display(raw), raw.pos === "na-adj" ? `${raw.r}な` : raw.r);
  const chars = [...new Set([...raw.w].filter((c) => KANJI.test(c)))];

  return (
    <article id={anchor} className="scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-surface">
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-line bg-surface-2/60 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2 text-[12px]">
            <span className="rounded-md bg-ink px-1.5 py-0.5 font-bold text-paper">#{String(raw.no).padStart(3, "0")}</span>
            <span className="rounded-full bg-surface px-2 py-0.5 font-semibold text-ink-2">{POS_LABEL[raw.pos]}</span>
            {raw.hv && <span className="font-semibold tracking-[0.08em] text-brand">{raw.hv}</span>}
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-[32px] leading-[1.55] font-bold text-ink">
              {raw.p && <span className="mr-1 align-middle font-jp text-lg font-medium text-ink-3">〜{raw.p}</span>}
              <Jp t={head} className="font-mincho" />
            </h3>
            <SpeakButton text={raw.say ?? display(raw)} label={`Nghe từ ${display(raw)}`} size="md" />
          </div>
          {raw.alt && (
            <span className="text-[13px] text-ink-3">
              Cách viết khác: <Jp t={fw.alt!} />
            </span>
          )}
        </div>
        <p className="max-w-[420px] text-[17px] font-bold text-brand-soft-ink">{raw.m}</p>
      </header>

      <div className="grid gap-5 px-5 py-5 sm:px-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] xl:gap-8">
        <div className="flex min-w-0 flex-col gap-5">
        {raw.acc !== undefined && (
          <section className="flex flex-col gap-2.5">
            <Label icon={AudioLines}>Phát âm · cao – thấp</Label>
            <PitchAccent
              kana={raw.r}
              acc={raw.acc}
              particle={raw.pos === "na-adj" ? "な" : raw.pos === "verb" || raw.pos === "i-adj" || raw.pos === "adv" ? "" : "が"}
            />
          </section>
        )}

        <section className="flex flex-col gap-2">
          <Label icon={BookOpenText}>Cách dùng · khi nào dùng</Label>
          <p className="text-[15px] leading-relaxed text-ink">
            <Jp t={fw.use} vi />
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <Label icon={Link2}>Kết hợp thường gặp · vị trí trong câu</Label>
          <div className="flex flex-wrap gap-2">
            {fw.col.map((c) => (
              <span key={c} className="rounded-xl border border-dashed border-line-strong bg-paper px-3 py-1 text-[15px] leading-[2] text-ink">
                <Jp t={c} />
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <Label icon={MessageSquareQuote}>Ví dụ</Label>
          <ol className="flex flex-col gap-2">
            {fw.ex.map(([jp, vi], i) => (
              <li key={i} className="rounded-2xl border border-line px-4 py-2.5">
                <div className="flex items-start gap-2">
                  <p className="min-w-0 flex-1 text-[16.5px] leading-[2.2] text-ink">
                    <Jp t={jp} />
                  </p>
                  <SpeakButton text={jp} label="Nghe câu ví dụ" className="mt-1.5" />
                </div>
                <Reveal className="text-[14px] leading-relaxed text-ink-2">{vi}</Reveal>
              </li>
            ))}
          </ol>
        </section>

        </div>
        <div className="flex min-w-0 flex-col gap-5">
        {fw.cmp && fw.cmp.length > 0 && (
          <section className="flex flex-col gap-2">
            <Label icon={GitCompareArrows}>So sánh</Label>
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-1">
              {fw.cmp.map(([other, diff]) => (
                <div key={other} className="rounded-2xl bg-surface-2 px-4 py-3">
                  <span className="text-[15px] leading-[2] font-bold text-ink">
                    <Jp t={head} /> <span className="text-ink-3">vs</span> <Jp t={other} />
                  </span>
                  <p className="text-[14px] leading-relaxed text-ink-2">
                    <Jp t={diff} vi />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
          {chars.length > 0 && (
            <section className="flex flex-col gap-2 rounded-2xl border border-line px-4 py-3">
              <Label icon={PenLine}>Chữ Hán</Label>
              <ul className="flex flex-col gap-2.5">
                {chars.map((c) => {
                  const k = kanji[c];
                  return (
                    <li key={c} className="flex gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft font-mincho text-[28px] text-brand-soft-ink">
                        {c}
                      </span>
                      <span className="flex min-w-0 flex-col text-[13.5px] leading-snug">
                        {k ? (
                          <>
                            <span>
                              <b className="tracking-[0.06em] text-ink">{k.hv}</b>
                              <span className="text-ink-2"> · {k.m}</span>
                            </span>
                            {k.memo && <span className="text-ink-3">{k.memo}</span>}
                          </>
                        ) : (
                          <span className="text-ink-3">—</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          <section className="flex gap-3 rounded-2xl border border-[#e7c46a]/60 bg-[#fdf6e3] px-4 py-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[#b7791f]" aria-hidden />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink">Mẹo nhớ</span>
              <p className="text-[14.5px] leading-relaxed text-ink">
                <Jp t={fw.memo} vi />
              </p>
            </div>
          </section>
        </div>
        </div>
      </div>
    </article>
  );
}
