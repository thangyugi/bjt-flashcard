/**
 * Đọc tiếng Nhật bằng giọng có sẵn trên máy (Web Speech API).
 * - Ưu tiên giọng chất lượng cao (Neural / Natural / Enhanced / Premium).
 * - Phân biệt giọng nam / nữ theo tên giọng của từng hệ điều hành.
 * - Máy không có giọng nam: dùng giọng nữ và hạ tông (báo cho người dùng biết).
 * Chuỗi đầu vào có thể chứa markup furigana {漢字|かな}, [[…]], ＿＿＿.
 */

export type VoiceGender = "female" | "male";

const MALE = /otoya|hattori|ichiro|keita|daichi|naoki|takumi|shinji|kenji|hiroshi|\bmale\b|男性/i;
const FEMALE = /kyoko|o-?ren|haruka|ayumi|nanami|mizuki|sayaka|shiori|aoi|mayu|sakura|\bfemale\b|女性|google\s*日本語/i;
const QUALITY = /neural|natural|online|enhanced|premium|siri/i;

/** Bỏ markup → chữ để đọc (giữ kanji để giọng đọc có ngữ điệu tự nhiên). */
export function toSpeech(markup: string): string {
  return markup
    .replace(/\{([^|}]+)\|[^}]+\}/g, "$1")
    .replace(/\[\[|\]\]/g, "")
    .replace(/＿{2,}/g, "、")
    .replace(/[〜～★]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

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

export function stopSpeaking() {
  token++;
  if (ttsSupported()) speechSynthesis.cancel();
  current = null;
  emit();
}

export interface SpeakOptions {
  gender: VoiceGender;
  /** 1 = tốc độ thường */
  rate: number;
}

/** Đọc lần lượt các đoạn; `id` dùng để nút biết mình đang phát. */
export function speak(id: string, texts: string[], { gender, rate }: SpeakOptions) {
  if (!ttsSupported()) return;
  stopSpeaking();
  const my = ++token;
  const { voice, simulated } = pickVoice(gender);
  const queue = texts.map(toSpeech).filter(Boolean).flatMap(chunks);
  if (!queue.length) return;
  current = id;
  emit();

  let i = 0;
  const next = () => {
    if (my !== token) return;
    if (i >= queue.length) {
      current = null;
      emit();
      return;
    }
    const u = new SpeechSynthesisUtterance(queue[i++]);
    u.lang = "ja-JP";
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = simulated ? 0.6 : 1;
    u.onend = next;
    u.onerror = () => {
      if (my !== token) return;
      current = null;
      emit();
    };
    speechSynthesis.speak(u);
  };
  next();
}
