"""
Sinh furigana cho câu ví dụ (exampleSentence) và lưu vào trường
exampleSentenceFurigana theo định dạng: {漢字|かんじ}.

Ví dụ: 青春時代を懐かしく思い出す。
    -> {青春|せいしゅん}{時代|じだい}を{懐|なつ}かしく{思|おも}い{出|だ}す。

Cài đặt (nên dùng virtualenv):
    pip install fugashi unidic-lite

Chạy lại mỗi khi thêm/sửa câu ví dụ:
    python scripts/generate_furigana.py

Cách đọc sai của MeCab được sửa thủ công trong READING_OVERRIDES.
"""

import json
import re
from pathlib import Path

from fugashi import Tagger

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "public" / "data" / "bjt-1000.json"
TS_PATH = ROOT / "src" / "data" / "vocabulary-groups.ts"

KANJI = r"[㐀-䶿一-鿿豈-﫿々〆ヶ]"
KANJI_RE = re.compile(KANJI)

# Sửa cách đọc của MeCab cho mọi câu: mặt chữ token -> hiragana đúng
READING_OVERRIDES: dict[str, str] = {
    "稟議": "りんぎ",
    "貴信": "きしん",
    "直納": "ちょくのう",
    "日本": "にほん",
    "私": "わたし",
    "言う": "いう",
    "金茶": "きんちゃ",
}

# Sửa theo ngữ cảnh trên kết quả đã đánh dấu: (đoạn sai, đoạn đúng)
MARKUP_FIXES: list[tuple[str, str]] = [
    ("{一|いち}{本|ぽん}{締|し}め", "{一|いっ}{本|ぽん}{締|じ}め"),
    ("{第|だい}{一|いち}{歩|ほ}", "{第|だい}{一|いっ}{歩|ぽ}"),
    ("{第|だい}{一|いち}{線|せん}", "{第|だい}{一|いっ}{線|せん}"),
    ("{第|だい}{一|いち}{課|か}", "{第|だい}{一|いっ}{課|か}"),
    ("{一|いち}{直線|ちょくせん}", "{一|いっ}{直線|ちょくせん}"),
    ("その{節|ふし}", "その{節|せつ}"),
    ("{印|しるし}", "{印|いん}"),
    ("{賛成|さんせい}の{方|ほう}", "{賛成|さんせい}の{方|かた}"),
    ("{未満|みまん}の{方|ほう}", "{未満|みまん}の{方|かた}"),
    ("いただいた{方|ほう}", "いただいた{方|かた}"),
    ("{何|なん}が", "{何|なに}が"),
    ("{何|なん}か", "{何|なに}か"),
    ("5{分|ぶん}", "5{分|ふん}"),
    ("1{日|か}", "{1日|いちにち}"),
    ("2{日|か}", "{2日|ふつか}"),
    ("8{日|か}", "{8日|ようか}"),
    ("10{日|か}", "{10日|とおか}"),
    ("りなく{行|い}って", "りなく{行|おこな}って"),
    ("に{行|い}ってしまっ", "に{行|おこな}ってしまっ"),
    ("{無|む}{遠慮|えんりょ}", "{無|ぶ}{遠慮|えんりょ}"),
    ("{先行|せんこう}{組|くみ}", "{先行|せんこう}{組|ぐみ}"),
    ("{事業|じぎょう}{主|しゅ}", "{事業|じぎょう}{主|ぬし}"),
    ("{親|おや}しき", "{親|した}しき"),
    ("{水泡|すいほう}に{帰|かえ}", "{水泡|すいほう}に{帰|き}"),
]

tagger = Tagger()


def kata_to_hira(text: str) -> str:
    return "".join(
        chr(ord(c) - 0x60) if "ァ" <= c <= "ヶ" else c for c in text
    )


def align(surface: str, reading: str) -> list[tuple[str, str | None]]:
    """Tách token thành các đoạn (chữ, furigana | None) để furigana chỉ nằm trên kanji."""
    parts = re.findall(rf"{KANJI}+|[^㐀-䶿一-鿿豈-﫿々〆ヶ]+", surface)
    pattern = "^"
    for p in parts:
        pattern += "(.+?)" if KANJI_RE.match(p) else "(" + re.escape(kata_to_hira(p)) + ")"
    pattern += "$"
    m = re.match(pattern, reading)
    if not m:
        return [(surface, reading)]
    out = []
    for p, r in zip(parts, m.groups()):
        out.append((p, r) if KANJI_RE.match(p) else (p, None))
    return out


def to_furigana(sentence: str) -> str:
    result = []
    for word in tagger(sentence):
        surface = word.surface
        # MeCab bỏ khoảng trắng; giữ lại khoảng trắng gốc
        ws = word.white_space
        if ws:
            result.append(ws)
        kana = getattr(word.feature, "kana", None)
        if not KANJI_RE.search(surface) or not kana or kana == "*":
            result.append(surface)
            continue
        reading = READING_OVERRIDES.get(surface) or kata_to_hira(kana)
        for text, ruby in align(surface, reading):
            result.append(f"{{{text}|{ruby}}}" if ruby else text)
    markup = "".join(result)
    for wrong, right in MARKUP_FIXES:
        if wrong in markup:
            markup = markup.replace(wrong, right)
            FIXES_USED.add(wrong)
    return markup


FIXES_USED: set[str] = set()


def strip_furigana(markup: str) -> str:
    return re.sub(r"\{([^|}]+)\|[^}]+\}", r"\1", markup)


def process_json() -> int:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    count = 0
    for group in data:
        new_items = []
        for item in group["items"]:
            sentence = item.get("exampleSentence")
            rebuilt = {}
            for k, v in item.items():
                if k == "exampleSentenceFurigana":
                    continue
                rebuilt[k] = v
                if k == "exampleSentence" and sentence:
                    furi = to_furigana(sentence)
                    assert strip_furigana(furi) == sentence, (item["id"], furi)
                    rebuilt["exampleSentenceFurigana"] = furi
                    count += 1
            new_items.append(rebuilt)
        group["items"] = new_items
    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return count


def process_ts() -> int:
    src = TS_PATH.read_text(encoding="utf-8")
    # Xoá kết quả cũ để có thể chạy lại nhiều lần
    src = re.sub(r"\n[ \t]*exampleSentenceFurigana: \".*?\",", "", src)
    count = 0

    def repl(m: re.Match) -> str:
        nonlocal count
        indent, sentence = m.group(1), m.group(2)
        furi = to_furigana(sentence)
        assert strip_furigana(furi) == sentence, furi
        count += 1
        return f'{m.group(0)}\n{indent}exampleSentenceFurigana: {json.dumps(furi, ensure_ascii=False)},'

    src = re.sub(r'([ \t]*)exampleSentence: "(.*?)",', repl, src)
    TS_PATH.write_text(src, encoding="utf-8")
    return count


if __name__ == "__main__":
    n_json = process_json()
    n_ts = process_ts()
    print(f"bjt-1000.json: {n_json} câu | vocabulary-groups.ts: {n_ts} câu")
    unused = [w for w, _ in MARKUP_FIXES if w not in FIXES_USED]
    if unused:
        print("Cảnh báo - MARKUP_FIXES không còn khớp câu nào:", unused)
