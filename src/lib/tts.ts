/**
 * Đọc tiếng Nhật.
 * 1. Ưu tiên file thu sẵn (public/audio, tạo bằng VOICEVOX — xem docs/AUDIO.md): giọng người tự nhiên, nghe offline.
 * 2. Câu chưa có file: dùng giọng có sẵn trên máy (Web Speech API).
 * - Ưu tiên giọng chất lượng cao (Neural / Natural / Enhanced / Premium).
 * - Phân biệt giọng nam / nữ theo tên giọng của từng hệ điều hành.
 * - Máy không có giọng nam: dùng giọng nữ và hạ tông (báo cho người dùng biết).
 * Chuỗi đầu vào có thể chứa markup furigana {漢字|かな}, [[…]], ＿＿＿.
 */

import { speechKey, toSpeech, type AudioManifest } from "./audio-key";

export type VoiceGender = "female" | "male";

const MALE = /otoya|hattori|ichiro|keita|daichi|naoki|takumi|shinji|kenji|hiroshi|\bmale\b|男性/i;
const FEMALE = /kyoko|o-?ren|haruka|ayumi|nanami|mizuki|sayaka|shiori|aoi|mayu|sakura|\bfemale\b|女性|google\s*日本語/i;
const QUALITY = /neural|natural|online|enhanced|premium|siri/i;

export { toSpeech };

export function ttsSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function japaneseVoices(): SpeechSynthesisVoice[] {
  if (!ttsSupported()) return [];
  return speechSynthesis.getVoices().filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("ja"));
}

function genderOf(v: SpeechSynthesisVoice): VoiceGender | null {
  if (MALE.test(v.name)) return "male";
  if (FEMALE.test(v.name)) return "female";
  return null;
}

export interface VoicePick {
  voice: SpeechSynthesisVoice | null;
  /** true nếu không có giọng đúng giới tính → giả lập bằng cao độ */
  simulated: boolean;
}

export function pickVoice(gender: VoiceGender): VoicePick {
  const all = japaneseVoices();
  const rank = (v: SpeechSynthesisVoice) => (QUALITY.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1);
  const sorted = [...all].sort((a, b) => rank(b) - rank(a));
  const exact = sorted.find((v) => genderOf(v) === gender);
  if (exact) return { voice: exact, simulated: false };
  // Giọng không rõ giới tính: phần lớn giọng tiếng Nhật mặc định là giọng nữ
  const fallback = sorted.find((v) => genderOf(v) === null) ?? sorted[0] ?? null;
  return { voice: fallback, simulated: gender === "male" };
}

/** Câu dài bị Chrome cắt ngang sau ~15 giây → tách theo dấu câu. */
function chunks(text: string): string[] {
  const parts = text.match(/[^。！？!?]+[。！？!?」』]*/g) ?? [text];
  const out: string[] = [];
  for (const p of parts) {
    const s = p.trim();
    if (!s) continue;
    if (s.length <= 120) out.push(s);
    else out.push(...(s.match(/[^、，]+[、，]?/g) ?? [s]));
  }
  return out;
}

// ── Trạng thái phát (một nút phát tại một thời điểm) ──
let current: string | null = null;
let token = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function subscribePlaying(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
export const getPlaying = () => current;

// ── File thu sẵn ──
let manifest: AudioManifest | null = null;
let manifestLoad: Promise<AudioManifest | null> | null = null;
const manifestListeners = new Set<() => void>();

/** Nạp public/audio/manifest.json một lần (service worker lưu lại để dùng offline). */
export function loadAudioManifest(): Promise<AudioManifest | null> {
  if (!manifestLoad) {
    manifestLoad = fetch("/audio/manifest.json")
      .then((r) => (r.ok ? (r.json() as Promise<AudioManifest>) : null))
      .catch(() => null)
      .then((m) => {
        manifest = m;
        manifestListeners.forEach((l) => l());
        return m;
      });
  }
  return manifestLoad;
}
export function subscribeManifest(cb: () => void) {
  manifestListeners.add(cb);
  return () => manifestListeners.delete(cb);
}
export const getManifest = () => manifest;

/** Đường dẫn file thu sẵn cho câu này (nếu có). */
export function clipUrl(text: string, gender: VoiceGender): string | null {
  const ext = manifest?.clips[gender]?.[speechKey(text)];
  return ext ? `/audio/${gender}/${speechKey(text)}.${ext}` : null;
}

let audio: HTMLAudioElement | null = null;

export function stopSpeaking() {
  token++;
  if (ttsSupported()) speechSynthesis.cancel();
  if (audio) {
    audio.onended = audio.onerror = null;
    audio.pause();
  }
  current = null;
  emit();
}

export interface SpeakOptions {
  gender: VoiceGender;
  /** 0.9 = tốc độ thường, 0.7 = chậm */
  rate: number;
}

type Item = { kind: "clip"; url: string } | { kind: "tts"; text: string };

/** Đọc lần lượt các đoạn; `id` dùng để nút biết mình đang phát. */
export async function speak(id: string, texts: string[], { gender, rate }: SpeakOptions) {
  stopSpeaking();
  const my = ++token;
  current = id;
  emit();
  // Phải tạo Audio ngay trong lượt bấm để iOS cho phép phát
  if (!audio && typeof Audio !== "undefined") audio = new Audio();
  // Bình thường danh sách file đã được nạp sẵn → phát ngay trong lượt bấm (iOS yêu cầu)
  if (!manifest) {
    await loadAudioManifest();
    if (my !== token) return;
  }

  const items: Item[] = texts
    .map(toSpeech)
    .filter(Boolean)
    .flatMap((t): Item[] => {
      const url = clipUrl(t, gender);
      if (url) return [{ kind: "clip", url }];
      return ttsSupported() ? chunks(t).map((c) => ({ kind: "tts", text: c }) as Item) : [];
    });
  const { voice, simulated } = pickVoice(gender);

  let i = 0;
  const finish = () => {
    if (my !== token) return;
    current = null;
    emit();
  };
  const next = () => {
    if (my !== token) return;
    if (i >= items.length) return finish();
    const it = items[i++];
    if (it.kind === "clip" && audio) {
      audio.src = it.url;
      audio.playbackRate = rate / 0.9;
      audio.onended = next;
      audio.onerror = next;
      audio.play().catch(finish);
      return;
    }
    if (it.kind !== "tts") return next();
    const u = new SpeechSynthesisUtterance(it.text);
    u.lang = "ja-JP";
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = simulated ? 0.6 : 1;
    u.onend = next;
    u.onerror = finish;
    speechSynthesis.speak(u);
  };
  next();
}
