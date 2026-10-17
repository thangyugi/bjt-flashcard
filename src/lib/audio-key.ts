/**
 * Khóa cho file âm thanh thu sẵn: băm chuỗi tiếng Nhật đã bỏ markup (xem toSpeech).
 * Dùng chung cho script tạo âm thanh (scripts/generate-audio.ts) và trình phát trong app,
 * nên hai bên luôn tìm ra cùng một file.
 */
export function speechKey(text: string): string {
  // cyrb53 — băm 53 bit, đủ để không trùng với vài chục nghìn câu
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

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

/** public/audio/manifest.json */
export interface AudioManifest {
  /** Tên giọng (ghi công theo điều khoản VOICEVOX, ví dụ "VOICEVOX:青山龍星") */
  voices: Partial<Record<"male" | "female", string>>;
  /** giọng → khóa → đuôi file (m4a / mp3 / wav) */
  clips: Partial<Record<"male" | "female", Record<string, string>>>;
}

/** Chuỗi tiếng Anh để đọc: bỏ [[…]] (đánh dấu tô đậm), gộp khoảng trắng. */
export function toEnSpeech(text: string): string {
  return text.replace(/\[\[|\]\]/g, "").replace(/\s+/g, " ").trim();
}

/** Giọng tiếng Anh thu sẵn: giọng Anh/Mỹ × nam/nữ */
export type EnVoiceId = "uk-male" | "uk-female" | "us-male" | "us-female";

/** public/audio/en/manifest.json */
export interface EnAudioManifest {
  /** Tên giọng, ví dụ "Kokoro · George" */
  voices: Partial<Record<EnVoiceId, string>>;
  /** giọng → khóa (speechKey(toEnSpeech(câu))) → đuôi file */
  clips: Partial<Record<EnVoiceId, Record<string, string>>>;
}
