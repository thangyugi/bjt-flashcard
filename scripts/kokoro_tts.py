"""Đọc danh sách câu tiếng Anh bằng Kokoro, ghi ra file wav (được scripts/generate-en-audio.ts gọi).

Cách dùng: python3 scripts/kokoro_tts.py jobs.json
jobs.json = {"model", "voices", "voice", "accent": "uk"|"us", "jobs": [{"text", "out", "ipa"?}]}
Cần: pip install kokoro-onnx soundfile

Cách đọc:
- Câu: phiên âm tự động bằng espeak-ng (Anh: giọng RP chuẩn "en-gb-x-rp"; Mỹ: "en-us").
- Từ có phiên âm trong bài (`ipa`): nếu espeak đọc khác phiên âm của bài (từ đồng tự khác âm như live/record,
  dạng yếu tə/kən, nối âm…) thì đọc theo đúng phiên âm của bài, để tiếng nghe khớp với ký hiệu người học thấy.
"""
import json
import re
import sys

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

PAD = 0.12  # giây im lặng thêm vào đầu/cuối cho khỏi mất âm đầu khi phát
VOWELS = set("iɪeɛæaɑɒɔʊuʌəɜoɐɚ")


def clean(text: str) -> str:
    """Bỏ nhãn như "(n)", "(v)" — chỉ để hiển thị."""
    return re.sub(r"\s*\([^)]*\)", "", text).strip()


def norm(ph: str) -> str:
    """Đưa phiên âm của bài và của espeak về cùng dạng để so sánh."""
    s = re.sub(r"[ˈˌ.‿ ()]", "", ph)
    s = s.replace("ɹ", "r").replace("ɛ", "e").replace("iə", "ɪə").replace("ɐ", "ə").replace("æ", "a").replace("ᵻ", "ɪ")
    s = re.sub(r"ɪ$", "i", s)
    return s


def to_kokoro(ipa: str, accent: str, spelling: str) -> str:
    """Phiên âm kiểu từ điển (ˈhæp.i) → chuỗi âm vị cho Kokoro (hˈæpi), dấu nhấn đặt trước nguyên âm."""
    # Đổi ký hiệu khi dấu "." còn phân biệt được nguyên âm đôi ɪə với hai âm tiết i.ə
    if accent == "us":
        # Phiên âm của bài là giọng Anh → đổi sang Mỹ: o đôi, o ngắn, và âm r sau nguyên âm
        ipa = ipa.replace("əʊ", "oʊ").replace("ɒ", "ɑː").replace("ɜː", "ɜːr")
        ipa = ipa.replace("ɪə", "ɪr").replace("eə", "ɛr").replace("ʊə", "ʊr")
        if re.search(r"[aeiou]r([^aeiouy]|$)", spelling.lower()):
            ipa = re.sub(r"(ɑː|ɔː)(?!r)", r"\1r", ipa, count=1)
            ipa = re.sub(r"ə$", "ɚ", ipa)
    else:
        ipa = ipa.replace("ɪə", "iə")
    words = []
    for word in ipa.replace("‿", "").split():
        out, mark, has_stress = "", "", "ˈ" in word or "ˌ" in word
        for ch in word.replace(".", ""):
            if ch in "ˈˌ":
                mark = ch
                continue
            if ch in VOWELS and mark:
                out += mark
                mark = ""
            out += ch
        # Từ một âm tiết không ghi dấu nhấn: nhấn vào nguyên âm đầu, trừ dạng yếu (ə)
        if not has_stress:
            m = re.search(f"[{''.join(VOWELS)}]", out)
            if m and m.group() != "ə":
                out = out[: m.start()] + "ˈ" + out[m.start() :]
        words.append(out)
    s = " ".join(words).replace("e", "ɛ").replace("ɛɪ", "eɪ").replace("ɛə", "eə")
    return re.sub(r"r+", "ɹ", s)


def main() -> None:
    cfg = json.load(open(sys.argv[1], encoding="utf-8"))
    kokoro = Kokoro(cfg["model"], cfg["voices"])
    tok = kokoro.tokenizer
    accent = cfg["accent"]
    lang = "en-gb-x-rp" if accent == "uk" else "en-us"
    jobs = cfg["jobs"]
    custom = 0
    for n, job in enumerate(jobs, 1):
        text = clean(job["text"])
        ph = tok.phonemize(text, lang)
        ipa = job.get("ipa")
        if ipa and norm(tok.phonemize(text, "en-gb-x-rp")) != norm(ipa):
            ph = to_kokoro(ipa, accent, text)
            custom += 1
            lost = set(ph) - set(tok.known(ph))
            if lost:
                print(f"\n  ! {job['text']}: bỏ ký hiệu không có trong mô hình {lost}", file=sys.stderr)
        samples, sr = kokoro.create(ph, voice=cfg["voice"], speed=1.0, is_phonemes=True)
        pad = np.zeros(int(sr * PAD), dtype=samples.dtype)
        sf.write(job["out"], np.concatenate([pad, samples, pad]), sr)
        if n % 25 == 0 or n == len(jobs):
            print(f"\r{cfg['voice']}: {n}/{len(jobs)}", end="", flush=True)
    print(f"\n{cfg['voice']}: {custom} từ đọc theo phiên âm của bài.")


if __name__ == "__main__":
    main()
