"use client";

import { useMemo } from "react";
import { useDue } from "@/hooks/useDue";
import { useHydrated } from "@/hooks/useHydrated";
import { exampleIntervals, Rating, useSrsStore } from "@/store/srs-store";
import { formatInterval } from "@/lib/learning/review";
import { fmtDate } from "./ReviewKit";
import { Cells, Section } from "@/components/ui/page";

/** Cách các khóa đưa mục học vào lịch ôn — khớp với nơi gọi enrollItems trong mã */
export const ENROLL_WAYS: { course: string; how: string }[] = [
  { course: "JLPT N1", how: "Bấm «Thêm … mục vào ôn tập» ở đầu mỗi bài từ vựng hoặc chương ngữ pháp." },
  { course: "Phát âm IPA", how: "Đánh dấu «Đã học xong» một bài, hoặc làm hết phần câu hỏi tổng hợp cuối bài: các âm của bài tự vào lịch ôn. Trang «Ôn âm IPA» có nút thêm tất cả âm." },
  { course: "Từ vựng BJT", how: "Khi học thẻ, bấm «Chưa nhớ»: từ đó vào lịch ôn. Từ bấm «Đã thuộc» thì không." },
  { course: "OCI AI", how: "Chưa có thẻ ôn; khóa này ôn bằng trắc nghiệm cuối bài và phòng luyện tập." },
];

const GRADES = [
  { g: Rating.Again, label: "Quên", text: "Không nhớ ra. Thẻ quay lại ngay trong lượt ôn này, và lần sau sẽ gần hơn." },
  { g: Rating.Hard, label: "Khó", text: "Nhớ ra nhưng chật vật. Khoảng cách tăng ít." },
  { g: Rating.Good, label: "Nhớ", text: "Nhớ đúng sau một chút suy nghĩ. Chọn nút này nhiều nhất." },
  { g: Rating.Easy, label: "Dễ", text: "Nhớ ngay lập tức. Thẻ được để xa hẳn." },
] as const;

/** Mục "Lịch ôn hoạt động thế nào?" trên trang Ôn tập: giải thích bằng lời thường, số liệu tính từ chính bộ lập lịch. */
export function ReviewExplainer() {
  const hydrated = useHydrated();
  const { due, total } = useDue();
  const cards = useSrsStore((s) => s.cards);
  const ex = useMemo(() => exampleIntervals(), []);
  const nextDue = hydrated
    ? Object.values(cards)
        .filter((c) => !c.suspended && c.due > new Date().toISOString())
        .map((c) => c.due)
        .sort()[0]
    : undefined;
  const path = ex.path.map(formatInterval);

  return (
    <Section id="cach-hoat-dong" eyebrow="Giải thích" title="Lịch ôn hoạt động thế nào?" className="scroll-mt-24">
      <p className="max-w-[72ch] text-[15px] leading-relaxed text-ink-2">
        Mỗi mục bạn học (một từ, một mẫu ngữ pháp, một âm IPA) là một <b className="text-ink">thẻ</b>. Thẻ không quay lại theo lịch cố định mà theo trí
        nhớ của riêng bạn với thẻ đó: nhớ chắc thì lâu mới gặp lại, hay quên thì gặp lại sớm. Bạn chỉ cần mở trang này mỗi ngày và ôn các thẻ đến hạn.
      </p>
      <Cells className="sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex flex-col gap-3 px-5 py-5">
          <h3 className="eyebrow-label">1 · Thẻ nào vào lịch ôn</h3>
          <ul className="flex flex-col gap-2.5 text-[14px] leading-relaxed text-ink-2">
            {ENROLL_WAYS.map((w) => (
              <li key={w.course}>
                <b className="text-ink">{w.course}:</b> {w.how}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 px-5 py-5">
          <h3 className="eyebrow-label">2 · Bốn nút sau khi lật thẻ</h3>
          <p className="text-[14px] leading-relaxed text-ink-2">Tự nhớ lại trước, rồi lật thẻ và chấm thật lòng:</p>
          <ul className="flex flex-col gap-2.5 text-[14px] leading-relaxed text-ink-2">
            {GRADES.map((b) => (
              <li key={b.g}>
                <b className="text-ink">{b.label}</b>
                <span className="text-ink-3"> · thẻ mới: sau {formatInterval(ex.first[b.g])}</span>
                <br />
                {b.text}
              </li>
            ))}
          </ul>
          <p className="text-[13px] leading-relaxed text-ink-3">Thời gian dưới mỗi nút khi ôn là lúc thẻ đó quay lại, tính riêng cho từng thẻ.</p>
        </div>

        <div className="flex flex-col gap-3 px-5 py-5">
          <h3 className="eyebrow-label">3 · Quay lại ngay trước khi bạn quên</h3>
          <p className="text-[14px] leading-relaxed text-ink-2">
            Lịch ước lượng lúc bạn sắp quên từng thẻ và hẹn thẻ quay lại đúng lúc đó, khi bạn vẫn còn khoảng <b className="text-ink">90%</b> khả năng nhớ ra.
            Mỗi lần nhớ được, khoảng cách giãn ra. Ví dụ một thẻ lần nào cũng chấm «Nhớ»:
          </p>
          <p className="text-[14px] leading-relaxed font-semibold text-ink">{path.join(" → ")}</p>
          <p className="text-[14px] leading-relaxed text-ink-2">Chấm «Quên» thì khoảng cách thu ngắn lại và thẻ được ôn kỹ hơn.</p>
          <p className="text-[12.5px] leading-relaxed text-ink-3">
            Cách tính dựa trên thuật toán FSRS (cũng được dùng trong Anki), mục tiêu nhớ 90% để ôn ít nhất mà vẫn nhớ lâu.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-5 py-5">
          <h3 className="eyebrow-label">4 · Hôm nay và mỗi ngày</h3>
          {hydrated && (
            <p className="text-[14px] leading-relaxed text-ink-2">
              Hôm nay có <b className="text-[18px] text-ink tabular-nums">{due.toLocaleString("vi-VN")}</b> thẻ đến hạn trong tổng số{" "}
              <b className="text-ink tabular-nums">{total.toLocaleString("vi-VN")}</b> thẻ.
              {nextDue && due === 0 && <> Thẻ tiếp theo đến hạn: {fmtDate(nextDue)}.</>}
            </p>
          )}
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-[14px] leading-relaxed text-ink-2">
            <li>Ôn hết thẻ đến hạn trước (thường 5–15 phút).</li>
            <li>Sau đó mới học bài mới và thêm thẻ của bài vào lịch ôn.</li>
            <li>Lỡ một ngày cũng không sao: thẻ chỉ dồn lại, không mất. Hôm sau ôn bù.</li>
          </ol>
        </div>
      </Cells>
    </Section>
  );
}
