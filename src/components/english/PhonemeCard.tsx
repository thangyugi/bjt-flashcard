import type { LucideIcon } from "lucide-react";
import { AlertTriangle, BookOpenText, Footprints, Lightbulb, ListChecks, MessageSquareQuote, SpellCheck, Split, Globe2 } from "lucide-react";
import type { Phoneme } from "@/data/english/ipa/types";
import { KIND_LABEL } from "@/data/english/ipa/types";
import { EnSpeakButton } from "./EnSpeak";
import { EnText, Ipa } from "./EnText";
import { VowelChart } from "./VowelChart";
import { Reveal } from "@/components/jlpt-n1/Reveal";

function Label({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-1.5 text-[12px] font-bold tracking-[0.06em] text-ink-3 uppercase">
      <Icon className="h-3.5 w-3.5 text-[#1d4ed8]" aria-hidden />
      {children}
    </h4>
  );
}

/** Thẻ học một âm IPA: cách đặt miệng → cách viết → từ → câu → cặp tối thiểu → lỗi hay gặp → bí quyết → mẹo nhớ. */
export function PhonemeCard({ p }: { p: Phoneme }) {
  const kindTone =
    p.kind === "consonant" ? "bg-[#e8f5ee] text-[#1f6b45]" : p.kind === "diphthong" ? "bg-[#f3e8ff] text-[#6b21a8]" : "bg-[#e8efff] text-[#1e40af]";
  return (
    <article id={p.id} className="scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-surface">
      <header className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-line bg-surface-2/60 px-5 py-5 sm:px-7">
        <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-3xl bg-ink text-paper">
          <span className="font-ipa text-[40px] leading-none font-semibold">/{p.symbol}/</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2 text-[12px]">
            <span className={`rounded-full px-2.5 py-0.5 font-semibold ${kindTone}`}>{KIND_LABEL[p.kind]}</span>
            {p.consonant && (
              <span className="rounded-full bg-surface px-2.5 py-0.5 font-semibold text-ink-2">
                {p.consonant.voiced ? "Hữu thanh — dây thanh rung" : "Vô thanh — chỉ có hơi"}
              </span>
            )}
            {p.vowel?.round && <span className="rounded-full bg-[#fde7c9] px-2.5 py-0.5 font-semibold text-[#7a4b12]">Tròn môi</span>}
          </div>
          <h3 className="text-[24px] leading-tight font-extrabold text-ink">“{p.name}”</h3>
          <div className="flex flex-wrap items-center gap-2 text-[15px] text-ink-2">
            Từ khóa:
            <b className="text-[18px] text-ink">{p.keyword.w}</b>
            <Ipa ipa={p.keyword.ipa} className="text-[16px] text-[#1d4ed8]" />
            <span className="text-ink-3">— {p.keyword.vi}</span>
            <EnSpeakButton text={p.keyword.w} label={`Nghe "${p.keyword.w}"`} size="md" />
            <EnSpeakButton text={p.keyword.w} label="Nghe chậm" slow showLabel size="sm" />
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-6 px-5 py-6 sm:px-7">
        <section className="flex flex-col gap-2">
          <Label icon={BookOpenText}>Nghe giống âm nào trong tiếng Việt?</Label>
          <p className="text-[15.5px] leading-relaxed text-ink">{p.viLike}</p>
        </section>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <section className="flex flex-col gap-2">
            <Label icon={Footprints}>Cách đặt miệng — từng bước</Label>
            <ol className="flex flex-col gap-2">
              {p.how.map((h, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1d4ed8] text-[12px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ol>
          </section>
          {p.vowel ? (
            <VowelChart highlight={[p.symbol]} className="rounded-2xl border border-line bg-paper p-3" />
          ) : p.consonant ? (
            <div className="flex flex-col justify-center gap-2 rounded-2xl border border-line bg-paper p-4 text-[14px]">
              <div className="flex justify-between gap-3">
                <span className="text-ink-3">Vị trí</span>
                <b className="text-ink">{p.consonant.place}</b>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-ink-3">Cách phát</span>
                <b className="text-ink">{p.consonant.manner}</b>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-ink-3">Dây thanh</span>
                <b className="text-ink">{p.consonant.voiced ? "rung (hữu thanh)" : "không rung (vô thanh)"}</b>
              </div>
              <p className="pt-1 text-[12.5px] text-ink-3">Mẹo: đặt tay lên cổ họng — âm hữu thanh làm cổ rung.</p>
            </div>
          ) : null}
        </div>

        <section className="flex flex-col gap-2">
          <Label icon={SpellCheck}>Thường viết bằng chữ</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {p.spellings.map((s) => (
              <div key={s.pattern} className="rounded-xl border border-dashed border-line-strong bg-paper px-3.5 py-2">
                <span className="mr-2 rounded-md bg-ink px-1.5 py-0.5 text-[13px] font-bold text-paper">{s.pattern}</span>
                <span className="text-[14.5px] text-ink-2">{s.words.join(" · ")}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <Label icon={ListChecks}>Từ ví dụ — bấm để nghe</Label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {p.words.map((w) => (
              <div key={w.w} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2">
                <EnSpeakButton text={w.w} label={`Nghe "${w.w}"`} />
                <span className="flex min-w-0 flex-col leading-tight">
                  <b className="text-[15px] text-ink">{w.w}</b>
                  <Ipa ipa={w.ipa} className="text-[13.5px] text-[#1d4ed8]" />
                  <span className="truncate text-[12px] text-ink-3">{w.vi}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <Label icon={MessageSquareQuote}>Câu ví dụ</Label>
          <ol className="flex flex-col gap-2">
            {p.sentences.map((s, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl border border-line px-4 py-3">
                <EnSpeakButton text={s.en} label="Nghe câu" className="mt-0.5" />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="text-[16px] leading-relaxed text-ink">
                    <EnText t={s.en} />
                  </p>
                  {s.ipa && <Ipa ipa={s.ipa} className="text-[13.5px] text-ink-3" />}
                  <Reveal className="text-[14px] text-ink-2">{s.vi}</Reveal>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {p.pairs && p.pairs.length > 0 && (
          <section className="flex flex-col gap-2">
            <Label icon={Split}>Cặp tối thiểu — chỉ khác đúng một âm</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {p.pairs.map((pr) => (
                <div key={pr.a.w + pr.b.w} className="grid grid-cols-2 overflow-hidden rounded-xl border border-line">
                  {[pr.a, pr.b].map((w, k) => (
                    <div key={k} className={`flex items-center gap-2 px-3 py-2 ${k ? "bg-surface-2/60" : ""}`}>
                      <EnSpeakButton text={w.w} label={`Nghe "${w.w}"`} />
                      <span className="flex min-w-0 flex-col leading-tight">
                        <b className="text-[14.5px] text-ink">{w.w}</b>
                        <Ipa ipa={w.ipa} className="text-[13px] text-[#1d4ed8]" />
                        <span className="truncate text-[11.5px] text-ink-3">{w.vi}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-[12.5px] text-ink-3">Nghe lần lượt hai từ, rồi tự đọc theo — chú ý chỗ khác nhau duy nhất.</p>
          </section>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          <section className="flex flex-col gap-2 rounded-2xl bg-brand-soft px-4 py-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-brand-soft-ink">
              <AlertTriangle className="h-4 w-4" aria-hidden /> Lỗi người Việt hay mắc
            </h4>
            <ul className="flex flex-col gap-1.5">
              {p.mistakes.map((m) => (
                <li key={m} className="text-[14.5px] leading-relaxed text-ink">
                  ✗ {m}
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-2 rounded-2xl bg-ok-soft px-4 py-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-ok-ink">
              <ListChecks className="h-4 w-4" aria-hidden /> Bí quyết luyện
            </h4>
            <ul className="flex flex-col gap-1.5">
              {p.tips.map((t) => (
                <li key={t} className="text-[14.5px] leading-relaxed text-ink">
                  ✓ {t}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <section className="flex gap-3 rounded-2xl border border-[#e7c46a]/60 bg-[#fdf6e3] px-4 py-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[#b7791f]" aria-hidden />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink">Mẹo nhớ</span>
              <p className="font-ipa text-[14.5px] leading-relaxed text-ink">{p.memo}</p>
            </div>
          </section>
          {p.usUk && (
            <section className="flex gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
              <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1d4ed8]" aria-hidden />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-ink">Anh – Mỹ</span>
                <p className="font-ipa text-[14.5px] leading-relaxed text-ink">{p.usUk}</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
