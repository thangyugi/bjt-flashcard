"""
Sinh furigana cho toàn bộ chuỗi tiếng Nhật của khóa JLPT N1
(src/data/jlpt-n1/**/*.ts) và lưu vào src/data/jlpt-n1/furigana.json:

    { "chuỗi gốc": "chuỗi có {漢字|かんじ}" }

Trang web tra chuỗi gốc trong bảng này để hiện cách đọc nhỏ phía trên kanji,
nên khi viết dữ liệu KHÔNG cần tự gõ furigana.

- [[...]] (đánh dấu mẫu ngữ pháp) được giữ nguyên; mỗi đoạn được phân tích riêng.
- Chuỗi đã có sẵn {漢字|かな} thì giữ nguyên phần đó.

Cài đặt (nên dùng virtualenv):
    pip install fugashi unidic-lite

Chạy lại mỗi khi thêm/sửa nội dung:
    python scripts/generate_n1_furigana.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from fugashi import Tagger

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "src" / "data" / "jlpt-n1"
OUT_PATH = DATA_DIR / "furigana.json"

KANJI_CLASS = "㐀-䶿一-鿿豈-﫿々〆ヶ"
KANJI = rf"[{KANJI_CLASS}]"
KANJI_RE = re.compile(KANJI)
STRING_RE = re.compile(r'"((?:[^"\\\n]|\\.)*)"')
MANUAL_RE = re.compile(r"(\{[^|}]+\|[^}]+\})")
MARK_RE = re.compile(r"(\[\[|\]\])")

# Sửa cách đọc của MeCab: mặt chữ token -> hiragana đúng
READING_OVERRIDES: dict[str, str] = {
    "私": "わたし",
    "日本": "にほん",
    "言う": "いう",
    "健太": "けんた",
    "否や": "いなや",
    "皮切り": "かわきり",
    "如何": "いかん",
    "余儀": "よぎ",
    "禁じ得": "きんじえ",
    "堪え": "たえ",
    "堪える": "たえる",
    "堪えない": "たえない",
    "始末": "しまつ",
    "手前": "てまえ",
    "故": "ゆえ",
    "所": "ところ",
    "極まる": "きわまる",
    "極まりない": "きわまりない",
    "極まり": "きわまり",
    "辛い": "つらい",
    "大家": "おおや",
    "上手": "じょうず",
    "下手": "へた",
    "今日": "きょう",
    "明日": "あした",
    "昨日": "きのう",
    "今年": "ことし",
    "去年": "きょねん",
    "一人": "ひとり",
    "二人": "ふたり",
    "大人": "おとな",
    "部長": "ぶちょう",
    "先輩": "せんぱい",
}

# Sửa theo ngữ cảnh trên kết quả đã đánh dấu: (đoạn sai, đoạn đúng)
MARKUP_FIXES: list[tuple[str, str]] = [
    ("{四|よん}{月|がつ}", "{四月|しがつ}"),
    ("{四月|しがつ}{一|いっ}{日|にち}", "{四月|しがつ}{一日|ついたち}"),
    ("{四月|しがつ}{一日|いちにち}", "{四月|しがつ}{一日|ついたち}"),
    ("{何|なん}が", "{何|なに}が"),
    ("{何|なん}か{買|", "{何|なに}か{買|"),
    ("{何|なん}を", "{何|なに}を"),
    ("{何人|なんにん}たりとも", "{何人|なんぴと}たりとも"),
    ("{一|いち}{日|にち}たりとも", "{一|いち}{日|にち}たりとも"),
    ("{方|ほう}が{来|", "{方|かた}が{来|"),
    ("{行|い}って{い|", "{行|い}って{い|"),
    ("{上|うえ}{京|きょう}", "{上京|じょうきょう}"),
    ("{空|そら}{腹|はら}", "{空腹|くうふく}"),
    ("{其|そ}れ", "それ"),
]
FIXES_USED: set[str] = set()

tagger = Tagger()


def kata_to_hira(text: str) -> str:
    return "".join(chr(ord(c) - 0x60) if "ァ" <= c <= "ヶ" else c for c in text)


def align(surface: str, reading: str) -> list[tuple[str, str | None]]:
    """Tách token thành các đoạn (chữ, furigana | None) để furigana chỉ nằm trên kanji."""
    parts = re.findall(rf"{KANJI}+|[^{KANJI_CLASS}]+", surface)
    pattern = "^"
    for p in parts:
        pattern += "(.+?)" if KANJI_RE.match(p) else "(" + re.escape(kata_to_hira(p)) + ")"
    pattern += "$"
    m = re.match(pattern, reading)
    if not m:
        return [(surface, reading)]
    return [(p, r) if KANJI_RE.match(p) else (p, None) for p, r in zip(parts, m.groups())]


def analyze(text: str) -> str:
    if not KANJI_RE.search(text):
        return text
    out: list[str] = []
    for word in tagger(text):
        if word.white_space:
            out.append(word.white_space)
        surface = word.surface
        kana = getattr(word.feature, "kana", None)
        if not KANJI_RE.search(surface) or not kana or kana == "*":
            out.append(surface)
            continue
        reading = READING_OVERRIDES.get(surface) or kata_to_hira(kana)
        for chunk, ruby in align(surface, reading):
            out.append(f"{{{chunk}|{ruby}}}" if ruby else chunk)
    return "".join(out)


def to_furigana(text: str) -> str:
    pieces: list[str] = []
    for seg in MARK_RE.split(text):
        if seg in ("[[", "]]"):
            pieces.append(seg)
            continue
        for part in MANUAL_RE.split(seg):
            pieces.append(part if MANUAL_RE.fullmatch(part) else analyze(part))
    markup = "".join(pieces)
    for wrong, right in MARKUP_FIXES:
        if wrong in markup:
            markup = markup.replace(wrong, right)
            FIXES_USED.add(wrong)
    return markup


def strip_furigana(markup: str) -> str:
    return re.sub(r"\{([^|}]+)\|[^}]+\}", r"\1", markup)


def main() -> None:
    strings: set[str] = set()
    for path in sorted(DATA_DIR.rglob("*.ts")):
        for m in STRING_RE.finditer(path.read_text(encoding="utf-8")):
            s = json.loads(f'"{m.group(1)}"')
            if KANJI_RE.search(s):
                strings.add(s)
    result: dict[str, str] = {}
    for s in sorted(strings):
        markup = to_furigana(s)
        if markup == s:
            continue
        expected = MANUAL_RE.sub(lambda m: m.group(0), s)
        assert strip_furigana(markup) == strip_furigana(expected), (s, markup)
        result[s] = markup
    OUT_PATH.write_text(json.dumps(result, ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
    print(f"furigana.json: {len(result)} chuỗi")
    unused = [w for w, _ in MARKUP_FIXES if w not in FIXES_USED]
    if unused:
        print("Ghi chú - MARKUP_FIXES chưa khớp chuỗi nào:", unused)


if __name__ == "__main__":
    main()
