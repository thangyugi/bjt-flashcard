/**
 * Tạo file âm thanh tiếng Nhật thu sẵn bằng VOICEVOX (miễn phí, chạy trên máy bạn).
 *
 *   1. Cài & mở app VOICEVOX (https://voicevox.hiroshiba.jp) — engine chạy ở http://127.0.0.1:50021
 *   2. npm run audio                       → Ngữ pháp Bài 1 + Từ vựng Bài 19
 *      npm run audio -- bai-02 mk-20       → chọn bài
 *      npm run audio -- --all              → toàn bộ
 *      npm run audio -- phongvan           → trang /phongvan (kịch bản phỏng vấn)
 *      npm run audio -- bjt                → thẻ flashcard BJT (905 từ + câu ví dụ; không nằm trong --all)
 *
 * Tùy chọn: --male "青山龍星" --female "冥鳴ひまり" --voices male,female --engine URL --force
 * Kết quả: public/audio/{male|female}/<khóa>.m4a và public/audio/manifest.json (xem docs/AUDIO.md).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { N1_LESSONS } from "../src/data/jlpt-n1/course";
import { VOCAB_LESSONS } from "../src/data/jlpt-n1/vocab";
import { speechKey, toSpeech, type AudioManifest } from "../src/lib/audio-key";
import { INTERVIEW } from "../src/data/interview/phongvan";

type Gender = "male" | "female";

const args = process.argv.slice(2);
const opt = (name: string, def: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const ENGINE = opt("engine", "http://127.0.0.1:50021").replace(/\/$/, "");
const SPEAKER: Record<Gender, string> = { male: opt("male", "青山龍星"), female: opt("female", "冥鳴ひまり") };
const VOICES = opt("voices", "male,female").split(",") as Gender[];
const FORCE = args.includes("--force");
const valueOpts = new Set(["--engine", "--male", "--female", "--voices"]);
const ids = args.filter((a, i) => !a.startsWith("--") && !valueOpts.has(args[i - 1]));
const ALL = args.includes("--all");
const wanted = ALL ? null : new Set(ids.length ? ids : ["bai-01", "mk-19"]);

const OUT = join(process.cwd(), "public", "audio");
const MANIFEST = join(OUT, "manifest.json");

/** Các câu mà trang bài học cho nghe — phải khớp với các nút loa trong app. */
function collectTexts(): string[] {
  const texts: string[] = [];
  for (const l of N1_LESSONS) {
    if (wanted && !wanted.has(l.id)) continue;
    texts.push(...l.story.map((p) => p.jp));
    for (const p of l.patterns) {
      texts.push(p.pattern, ...p.examples.map((e) => e.jp));
      for (const c of p.compare) if (c.ex) texts.push(c.ex.jp);
      for (const d of p.donts) if (d.good) texts.push(d.good);
      if (p.storyLine) texts.push(p.storyLine);
    }
  }
  for (const l of VOCAB_LESSONS) {
    if (wanted && !wanted.has(l.id)) continue;
    texts.push(...l.story.map((p) => p.jp));
    for (const w of l.words) {
      texts.push(w.say ?? (w.pos === "na-adj" ? `${w.w}な` : w.w), ...w.ex.map(([jp]) => jp));
    }
  }
  if (wanted?.has("bjt")) {
    const groups = JSON.parse(readFileSync(join(process.cwd(), "public", "data", "bjt-1000.json"), "utf8")) as {
      items: { kanji: string; exampleSentence?: string }[];
    }[];
    for (const g of groups) for (const it of g.items) texts.push(it.kanji, ...(it.exampleSentence ? [it.exampleSentence] : []));
  }
  if (!wanted || wanted.has("phongvan")) {
    for (const sec of INTERVIEW) texts.push(...sec.paragraphs);
  }
    return [...new Set(texts.map(toSpeech).filter(Boolean))];
}

async function engine<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(ENGINE + path, init);
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}: ${await res.text()}`);
  return (res.headers.get("content-type") ?? "").includes("json") ? ((await res.json()) as T) : (Buffer.from(await res.arrayBuffer()) as T);
}

interface Speaker {
  name: string;
  styles: { name: string; id: number }[];
}

async function findSpeaker(name: string) {
  const list = await engine<Speaker[]>("/speakers");
  const sp = list.find((s) => s.name === name) ?? list.find((s) => s.name.includes(name));
  if (!sp) throw new Error(`Không thấy giọng "${name}". Các giọng có: ${list.map((s) => s.name).join("、")}`);
  const style = sp.styles.find((s) => /ノーマル|ふつう|通常/.test(s.name)) ?? sp.styles[0];
  return { id: style.id, label: `VOICEVOX:${sp.name}` };
}

function which(cmd: string) {
  try {
    execFileSync(process.platform === "win32" ? "where" : "which", [cmd], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/** wav → m4a (AAC). Dùng ffmpeg, hoặc afconvert có sẵn trên macOS; không có thì giữ wav. */
function encode(wav: Buffer, outBase: string): string {
  const tmp = join(tmpdir(), `vv-${process.pid}.wav`);
  writeFileSync(tmp, wav);
  try {
    if (which("ffmpeg")) {
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", tmp, "-c:a", "aac", "-b:a", "64k", `${outBase}.m4a`]);
      return "m4a";
    }
    if (which("afconvert")) {
      execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-b", "64000", tmp, `${outBase}.m4a`]);
      return "m4a";
    }
    writeFileSync(`${outBase}.wav`, wav);
    return "wav";
  } finally {
    rmSync(tmp, { force: true });
  }
}

async function main() {
  try {
    await engine("/version");
  } catch {
    console.error(`Không kết nối được VOICEVOX ở ${ENGINE}. Hãy mở app VOICEVOX (hoặc VOICEVOX Engine) rồi chạy lại.`);
    process.exit(1);
  }

  const texts = collectTexts();
  const manifest: AudioManifest = existsSync(MANIFEST)
    ? JSON.parse(readFileSync(MANIFEST, "utf8"))
    : { voices: {}, clips: {} };

  for (const g of VOICES) {
    const sp = await findSpeaker(SPEAKER[g]);
    manifest.voices[g] = sp.label;
    const clips = (manifest.clips[g] ??= {});
    mkdirSync(join(OUT, g), { recursive: true });
    let made = 0;
    for (const [n, text] of texts.entries()) {
      const key = speechKey(text);
      if (clips[key] && !FORCE && existsSync(join(OUT, g, `${key}.${clips[key]}`))) continue;
      const query = await engine<Record<string, unknown>>(
        `/audio_query?speaker=${sp.id}&text=${encodeURIComponent(text)}`,
        { method: "POST" }
      );
      query.prePhonemeLength = 0.12;
      query.postPhonemeLength = 0.2;
      const wav = await engine<Buffer>(`/synthesis?speaker=${sp.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
      clips[key] = encode(wav, join(OUT, g, key));
      made++;
      process.stdout.write(`\r${sp.label}: ${n + 1}/${texts.length} câu (mới ${made})   `);
      if (made % 20 === 0) writeFileSync(MANIFEST, JSON.stringify(manifest));
    }
    console.log(`\n${sp.label}: xong, tạo mới ${made} file.`);
  }
  writeFileSync(MANIFEST, JSON.stringify(manifest));
  console.log(`Đã ghi ${MANIFEST}. Nhớ ghi công giọng đọc theo điều khoản VOICEVOX (app tự hiện tên giọng).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
