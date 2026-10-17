/**
 * Tạo file âm thanh tiếng Anh thu sẵn cho khóa IPA bằng Kokoro (mã nguồn mở, miễn phí, chạy trên máy bạn).
 *
 *   1. Cài Python 3.10+ và ffmpeg (macOS có sẵn afconvert), rồi: pip install kokoro-onnx soundfile
 *   2. npm run audio:en                   → mọi bài IPA, 4 giọng (Anh nam/nữ, Mỹ nam/nữ)
 *      npm run audio:en -- ipa-02 ipa-03  → chọn bài
 *
 * Lần đầu script tự tải mô hình (~120 MB) về ~/.cache/kokoro.
 * Tùy chọn: --voices uk-male,us-female  --uk-male bm_george --uk-female bf_emma --us-male am_michael --us-female af_heart
 *           --python python3  --force
 * Kết quả: public/audio/en/<giọng>/<khóa>.m4a và public/audio/en/manifest.json (xem docs/AUDIO.md).
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { IPA_LESSONS } from "../src/data/english/ipa";
import { CHART } from "../src/data/english/ipa/chart";
import type { IpaWord } from "../src/data/english/ipa/types";
import { speechKey, toEnSpeech, type EnAudioManifest, type EnVoiceId } from "../src/lib/audio-key";

const args = process.argv.slice(2);
const opt = (name: string, def: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const KOKORO: Record<EnVoiceId, string> = {
  "uk-male": opt("uk-male", "bm_george"),
  "uk-female": opt("uk-female", "bf_emma"),
  "us-male": opt("us-male", "am_michael"),
  "us-female": opt("us-female", "af_heart"),
};
const NAMES: Record<string, string> = {
  bm_george: "George", bm_fable: "Fable", bm_lewis: "Lewis", bm_daniel: "Daniel",
  bf_emma: "Emma", bf_isabella: "Isabella", bf_alice: "Alice", bf_lily: "Lily",
  am_michael: "Michael", am_fenrir: "Fenrir", am_puck: "Puck", am_adam: "Adam", am_eric: "Eric", am_liam: "Liam",
  af_heart: "Heart", af_bella: "Bella", af_nicole: "Nicole", af_sarah: "Sarah", af_jessica: "Jessica",
};
const VOICES = opt("voices", "uk-male,uk-female,us-male,us-female").split(",") as EnVoiceId[];
const PYTHON = opt("python", process.platform === "win32" ? "python" : "python3");
const FORCE = args.includes("--force");
const valueOpts = new Set(["--voices", "--python", ...Object.keys(KOKORO).map((k) => `--${k}`)]);
const ids = args.filter((a, i) => !a.startsWith("--") && !valueOpts.has(args[i - 1]));
const wanted = ids.length ? new Set(ids) : null;

const OUT = join(process.cwd(), "public", "audio", "en");
const MANIFEST = join(OUT, "manifest.json");
const MODEL_DIR = join(homedir(), ".cache", "kokoro");
const MODEL_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0";
const MODEL_FILES = ["kokoro-v1.0.int8.onnx", "voices-v1.0.bin"];

/** Phiên âm của bài cho từng từ (để giọng đọc khớp với ký hiệu người học thấy) */
function ipaOf(): Map<string, string> {
  const map = new Map<string, string>();
  const add = (w: IpaWord) => {
    const k = toEnSpeech(w.w);
    if (map.has(k) && map.get(k) !== w.ipa) console.warn(`! "${w.w}" có hai phiên âm: ${map.get(k)} / ${w.ipa} — dùng cái đầu`);
    else map.set(k, w.ipa);
  };
  for (const l of IPA_LESSONS) {
    for (const r of l.rules ?? []) (r.examples ?? []).forEach(add);
    for (const p of l.phonemes) {
      [p.keyword, ...p.words].forEach(add);
      for (const pr of p.pairs ?? []) [pr.a, pr.b].forEach(add);
    }
  }
  return map;
}

/** Mọi câu/từ mà các nút loa trong khóa IPA đọc — phải khớp với EnSpeakButton trong app. */
function collectTexts(): string[] {
  const texts: string[] = [];
  if (!wanted) for (const g of CHART) for (const row of g.rows) for (const c of row) texts.push(c.key);
  for (const l of IPA_LESSONS) {
    if (wanted && !wanted.has(l.id)) continue;
    texts.push(...l.story.paras.map((p) => p.en));
    if (l.twister) texts.push(l.twister.en);
    for (const q of l.quiz) if (q.say) texts.push(q.say);
    for (const r of l.rules ?? []) texts.push(...(r.examples ?? []).map((w) => w.w), ...(r.sentences ?? []).map((s) => s.en));
    for (const p of l.phonemes) {
      texts.push(p.keyword.w, ...p.words.map((w) => w.w), ...p.sentences.map((s) => s.en));
      for (const pr of p.pairs ?? []) texts.push(pr.a.w, pr.b.w);
    }
  }
  return [...new Set(texts.map(toEnSpeech).filter(Boolean))];
}

async function ensureModel() {
  mkdirSync(MODEL_DIR, { recursive: true });
  for (const f of MODEL_FILES) {
    const path = join(MODEL_DIR, f);
    if (existsSync(path)) continue;
    console.log(`Đang tải mô hình ${f}…`);
    const res = await fetch(`${MODEL_URL}/${f}`);
    if (!res.ok) throw new Error(`Tải ${f} lỗi: HTTP ${res.status}`);
    writeFileSync(path, Buffer.from(await res.arrayBuffer()));
  }
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
function encode(wav: string, outBase: string): string {
  if (which("ffmpeg")) {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-ac", "1", "-c:a", "aac", "-b:a", "48k", `${outBase}.m4a`]);
    return "m4a";
  }
  if (which("afconvert")) {
    execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-b", "48000", wav, `${outBase}.m4a`]);
    return "m4a";
  }
  writeFileSync(`${outBase}.wav`, readFileSync(wav));
  return "wav";
}

async function main() {
  await ensureModel();
  const texts = collectTexts();
  const ipa = ipaOf();
  const manifest: EnAudioManifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : { voices: {}, clips: {} };
  const tmp = join(tmpdir(), `kokoro-${process.pid}`);
  mkdirSync(tmp, { recursive: true });

  try {
    for (const v of VOICES) {
      const kv = KOKORO[v];
      const clips = (manifest.clips[v] ??= {});
      mkdirSync(join(OUT, v), { recursive: true });
      const todo = texts
        .map((text) => ({ text, key: speechKey(text) }))
        .filter(({ key }) => FORCE || !clips[key] || !existsSync(join(OUT, v, `${key}.${clips[key]}`)));
      console.log(`${v} (Kokoro ${kv}): ${todo.length}/${texts.length} câu cần tạo`);
      if (!todo.length) {
        manifest.voices[v] = `Kokoro · ${NAMES[kv] ?? kv}`;
        continue;
      }
      // Python đọc danh sách, tạo wav vào thư mục tạm (nạp mô hình một lần cho cả giọng)
      const jobs = join(tmp, "jobs.json");
      writeFileSync(
        jobs,
        JSON.stringify({
          model: join(MODEL_DIR, MODEL_FILES[0]),
          voices: join(MODEL_DIR, MODEL_FILES[1]),
          voice: kv,
          accent: v.startsWith("uk") ? "uk" : "us",
          jobs: todo.map(({ text, key }) => ({ text, ipa: ipa.get(text), out: join(tmp, `${key}.wav`) })),
        })
      );
      const r = spawnSync(PYTHON, [join(process.cwd(), "scripts", "kokoro_tts.py"), jobs], { stdio: "inherit" });
      if (r.status !== 0) throw new Error(`kokoro_tts.py lỗi. Đã cài chưa: ${PYTHON} -m pip install kokoro-onnx soundfile`);
      for (const [n, { key }] of todo.entries()) {
        const wav = join(tmp, `${key}.wav`);
        clips[key] = encode(wav, join(OUT, v, key));
        rmSync(wav, { force: true });
        if (n % 50 === 0) process.stdout.write(`\r${v}: nén ${n + 1}/${todo.length}   `);
      }
      manifest.voices[v] = `Kokoro · ${NAMES[kv] ?? kv}`;
      writeFileSync(MANIFEST, JSON.stringify(manifest));
      console.log(`\n${v}: xong.`);
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  writeFileSync(MANIFEST, JSON.stringify(manifest));
  console.log(`Đã ghi ${MANIFEST}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
