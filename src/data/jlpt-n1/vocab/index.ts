import type { KanjiInfo, VocabLesson, VocabLessonMeta, VocabSource } from "./types";
import { KANJI_BASE } from "./kanji";
import { v01 } from "./mimikara/v01";
import { v02 } from "./mimikara/v02";
import { v03 } from "./mimikara/v03";
import { v04 } from "./mimikara/v04";
import { v05 } from "./mimikara/v05";
import { v06 } from "./mimikara/v06";
import { v07 } from "./mimikara/v07";
import { v08 } from "./mimikara/v08";
import { v09 } from "./mimikara/v09";
import { v10 } from "./mimikara/v10";
import { v11 } from "./mimikara/v11";
import { v12 } from "./mimikara/v12";
import { v13 } from "./mimikara/v13";
import { v14 } from "./mimikara/v14";
import { v15 } from "./mimikara/v15";
import { v16 } from "./mimikara/v16";
import { v17 } from "./mimikara/v17";
import { v18 } from "./mimikara/v18";
import { v19 } from "./mimikara/v19";
import { v20 } from "./mimikara/v20";
import { v21 } from "./mimikara/v21";
import { v22 } from "./mimikara/v22";
import { v23 } from "./mimikara/v23";
import { v24 } from "./mimikara/v24";
import { v25 } from "./mimikara/v25";
import { v26 } from "./mimikara/v26";
import { v27 } from "./mimikara/v27";
import { v28 } from "./mimikara/v28";
import { v29 } from "./mimikara/v29";
import { v30 } from "./mimikara/v30";
import { v31 } from "./mimikara/v31";
import { v32 } from "./mimikara/v32";
import { v33 } from "./mimikara/v33";
import { v34 } from "./mimikara/v34";
import { v35 } from "./mimikara/v35";
import { v36 } from "./mimikara/v36";
import { v37 } from "./mimikara/v37";
import { v38 } from "./mimikara/v38";
import { v39 } from "./mimikara/v39";
import { v40 } from "./mimikara/v40";
import { v41 } from "./mimikara/v41";
import { v42 } from "./mimikara/v42";
import { v43 } from "./mimikara/v43";
import { v44 } from "./mimikara/v44";
import { v45 } from "./mimikara/v45";
import { v46 } from "./mimikara/v46";
import { v47 } from "./mimikara/v47";
import { v48 } from "./mimikara/v48";
import { v49 } from "./mimikara/v49";
import { v50 } from "./mimikara/v50";
import { v51 } from "./mimikara/v51";
import { v52 } from "./mimikara/v52";
import { v53 } from "./mimikara/v53";
import { v54 } from "./mimikara/v54";
import { v55 } from "./mimikara/v55";
import { v56 } from "./mimikara/v56";
import { v57 } from "./mimikara/v57";
import { v58 } from "./mimikara/v58";
import { v59 } from "./mimikara/v59";
import { v60 } from "./mimikara/v60";
import { v61 } from "./mimikara/v61";
import { v62 } from "./mimikara/v62";

/** Thư viện từ vựng N1 — mỗi nguồn là một bộ bài. Thêm nguồn mới: thêm phần tử vào mảng này. */
export const VOCAB_SOURCES: VocabSource[] = [
  {
    id: "mimikara-n1",
    name: "Mimikara Oboeru N1",
    prefix: "mk",
    lessons: [v01, v02, v03, v04, v05, v06, v07, v08, v09, v10, v11, v12,
      v13, v14, v15, v16, v17, v18, v19, v20, v21, v22, v23, v24, v25, v26, v27,
      v28, v29, v30, v31, v32, v33, v34, v35, v36, v37, v38, v39, v40, v41, v42, v43, v44,
      v45, v46, v47, v48, v49, v50, v51, v52, v53, v54, v55, v56, v57, v58, v59, v60, v61, v62,
    ],
  },
];

export const VOCAB_LESSONS: VocabLesson[] = VOCAB_SOURCES.flatMap((s) => s.lessons);

/** Bảng chữ Hán gộp từ mọi bài */
export const KANJI: Record<string, KanjiInfo> = Object.assign({}, KANJI_BASE, ...VOCAB_LESSONS.map((l) => l.kanji ?? {}));

export function getVocabLesson(id: string) {
  const i = VOCAB_LESSONS.findIndex((l) => l.id === id);
  if (i < 0) return undefined;
  const source = VOCAB_SOURCES.find((s) => s.lessons.some((l) => l.id === id))!;
  return { lesson: VOCAB_LESSONS[i], source, prev: VOCAB_LESSONS[i - 1], next: VOCAB_LESSONS[i + 1] };
}

export const wordAnchor = (prefix: string, no: number) => `${prefix}-${String(no).padStart(3, "0")}`;

export function vocabMeta(l: VocabLesson): VocabLessonMeta {
  return {
    id: l.id,
    num: l.num,
    title: l.title,
    titleJa: l.titleJa,
    range: [l.words[0].no, l.words[l.words.length - 1].no],
    words: l.words.map((w) => ({ w: w.pos === "na-adj" ? `${w.w}な` : w.w, r: w.r, m: w.m })),
  };
}

export function vocabStats() {
  return {
    lessons: VOCAB_LESSONS.length,
    words: VOCAB_LESSONS.reduce((s, l) => s + l.words.length, 0),
  };
}
