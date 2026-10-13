import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenText,
  CircleCheck,
  CircleX,
  GitCompareArrows,
  Lightbulb,
  ListChecks,
  MapPin,
  MessageSquareQuote,
  Puzzle,
  ScrollText,
  Wrench,
} from "lucide-react";
import type { N1Pattern } from "@/data/jlpt-n1/types";
import { Jp } from "./Jp";
import { Reveal } from "./Reveal";
import { QuizBlock } from "./QuizBlock";

const CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩";

function Section({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h4 className="flex items-center gap-2 text-[13px] font-bold tracking-[0.06em] text-ink-3 uppercase">
        <Icon className="h-4 w-4 text-brand" aria-hidden />
        {title}
      </h4>
      {children}
    </section>
  );
}

/** Thẻ một mẫu ngữ pháp: nghĩa → cách chia → vị trí → ví dụ → nên/không nên → so sánh → mẹo nhớ → kiểm tra. */
export function PatternCard({ p, index, lessonId }: { p: N1Pattern; index: number; lessonId: string }) {
  return (
    <article id={p.id} className="scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-surface">
      {/* Đầu thẻ */}
      <header className="flex flex-col gap-3 border-b border-line bg-surface-2/60 px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-center gap-2.5">
          <span className="font-mincho text-2xl text-brand">{CIRCLED[index] ?? index + 1}</span>
          <span className="rounded-full bg-surface px-2.5 py-1 text-[11.5px] font-semibold text-ink-2">{p.register}</span>
        </div>
        <h3 className="text-[30px] leading-[1.5] font-bold text-ink sm:text-[36px]">
          <Jp t={p.pattern} className="font-mincho" />
        </h3>
        {p.variants && (
          <div className="flex flex-wrap gap-2 text-sm text-ink-2">
            Biến thể:
            {p.variants.map((v) => (
              <span key={v} className="rounded-md border border-line bg-surface px-2 py-0.5">
                <Jp t={v} />
              </span>
            ))}
          </div>
        )}
        <p className="text-lg font-bold text-brand-soft-ink">{p.meaning}</p>
      </header>

      <div className="flex flex-col gap-7 px-5 py-6 sm:px-7">
        <Section icon={BookOpenText} title="Ý nghĩa & sắc thái">
          <p className="text-[15px] leading-relaxed text-ink">
            <Jp t={p.nuance} vi />
          </p>
        </Section>

        <div className="grid gap-7 md:grid-cols-2">
          <Section icon={Wrench} title="Cách chia">
            <ul className="flex flex-col gap-2">
              {p.forms.map((f) => (
                <li key={f} className="rounded-xl border border-dashed border-line-strong bg-paper px-3.5 py-2 text-[16px] leading-[2] text-ink">
                  <Jp t={f} />
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={MapPin} title="Vị trí trong câu">
            <div className="flex flex-col items-stretch gap-1.5 text-[13.5px] leading-snug">
              <div className="rounded-xl bg-surface-2 px-3 py-2 text-ink-2">
                <span className="mr-1 font-bold text-ink">Vế trước:</span>
                <Jp t={p.position.before} vi />
              </div>
              <div className="flex items-center justify-center gap-2 py-0.5">
                <ArrowRight className="h-4 w-4 rotate-90 text-ink-3" aria-hidden />
                <span className="rounded-lg bg-brand px-3 py-1 text-[15px] leading-[1.9] font-bold text-white">
                  <Jp t={p.pattern.replace(/^〜/, "")} className="[&_rt]:text-white/80" />
                </span>
                <ArrowRight className="h-4 w-4 rotate-90 text-ink-3" aria-hidden />
              </div>
              <div className="rounded-xl bg-surface-2 px-3 py-2 text-ink-2">
                <span className="mr-1 font-bold text-ink">Vế sau:</span>
                <Jp t={p.position.after} vi />
              </div>
              {p.position.note && (
                <p className="pt-1 text-[13px] text-ink-3">
                  <Jp t={p.position.note} vi />
                </p>
              )}
            </div>
          </Section>
        </div>

        <Section icon={ListChecks} title="Cách dùng">
          <ul className="flex flex-col gap-1.5 pl-1">
            {p.usage.map((u) => (
              <li key={u} className="flex gap-2 text-[15px] leading-relaxed text-ink">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <Jp t={u} vi />
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={MessageSquareQuote} title="Ví dụ">
          <ol className="flex flex-col gap-3">
            {p.examples.map((e, i) => (
              <li key={i} className="flex gap-3 rounded-2xl border border-line px-4 py-3">
                <span className="mt-1.5 text-sm font-bold text-ink-3">{i + 1}</span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-[17px] leading-[2.2] text-ink">
                    <Jp t={e.jp} />
                  </p>
                  <Reveal className="text-[14px] leading-relaxed text-ink-2">{e.vi}</Reveal>
                  {e.note && (
                    <p className="text-[13px] text-ink-3">
                      💡 <Jp t={e.note} vi />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className="text-[12.5px] text-ink-3">Mẹo: tự dịch trong đầu trước, rồi chạm vào dòng mờ để kiểm tra.</p>
        </Section>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2.5 rounded-2xl bg-ok-soft px-4 py-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-ok-ink">
              <CircleCheck className="h-4 w-4" aria-hidden /> Khi nào nên dùng
            </h4>
            <ul className="flex flex-col gap-1.5">
              {p.dos.map((d) => (
                <li key={d} className="text-[14.5px] leading-relaxed text-ink">
                  ✓ <Jp t={d} vi />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2.5 rounded-2xl bg-brand-soft px-4 py-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-brand-soft-ink">
              <CircleX className="h-4 w-4" aria-hidden /> Khi nào không nên dùng
            </h4>
            <ul className="flex flex-col gap-3">
              {p.donts.map((d) => (
                <li key={d.text} className="flex flex-col gap-1 text-[14.5px] leading-relaxed text-ink">
                  <span>
                    ✗ <Jp t={d.text} vi />
                  </span>
                  {d.bad && (
                    <span className="text-[15px] leading-[2] text-brand-soft-ink">
                      <span className="mr-1 text-xs font-bold">SAI</span>
                      <Jp t={d.bad} className="line-through decoration-brand/50" />
                    </span>
                  )}
                  {d.good && (
                    <span className="text-[15px] leading-[2] text-ok-ink">
                      <span className="mr-1 text-xs font-bold">ĐÚNG</span>
                      <Jp t={d.good} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {p.compare.length > 0 && (
          <Section icon={GitCompareArrows} title="So sánh với mẫu gần nghĩa">
            <div className="grid gap-3 md:grid-cols-2">
              {p.compare.map((c) => (
                <div key={c.other} className="flex flex-col gap-1.5 rounded-2xl border border-line px-4 py-3.5">
                  <span className="text-[16px] leading-[2] font-bold text-ink">
                    <Jp t={p.pattern} /> <span className="text-ink-3">vs</span> <Jp t={c.other} />
                  </span>
                  <p className="text-[14px] leading-relaxed text-ink-2">
                    <Jp t={c.diff} vi />
                  </p>
                  {c.ex && (
                    <div className="rounded-xl bg-surface-2 px-3 py-2">
                      <p className="text-[15px] leading-[2.1] text-ink">
                        <Jp t={c.ex.jp} />
                      </p>
                      <p className="text-[13px] text-ink-2">{c.ex.vi}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex gap-3 rounded-2xl border border-[#e7c46a]/60 bg-[#fdf6e3] px-4 py-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[#b7791f]" aria-hidden />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink">Mẹo nhớ</span>
              <p className="text-[14.5px] leading-relaxed text-ink">
                <Jp t={p.memo} vi />
              </p>
            </div>
          </div>
          {p.storyLine && (
            <div className="flex gap-3 rounded-2xl border border-line bg-paper px-4 py-4">
              <ScrollText className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-ink">Trong câu chuyện</span>
                <p className="text-[16px] leading-[2.1] text-ink">
                  <Jp t={p.storyLine} />
                </p>
              </div>
            </div>
          )}
        </div>

        <Section icon={Puzzle} title="Kiểm tra nhanh">
          <QuizBlock storeKey={`${lessonId}/${p.id}`} questions={p.quiz} compact />
        </Section>
      </div>
    </article>
  );
}
