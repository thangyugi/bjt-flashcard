"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Square, Volume2 } from "lucide-react";
import {
  enVoiceId,
  getEnManifest,
  getPlaying,
  loadEnAudioManifest,
  pickEnglishVoice,
  speakEnglish,
  stopSpeaking,
  subscribeManifest,
  subscribePlaying,
  ttsSupported,
} from "@/lib/tts";
import { useTtsStore } from "@/store/tts-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

let seq = 0;

/** Nút loa đọc tiếng Anh (giọng Anh/Mỹ, Nam/Nữ theo tùy chọn chung). */
export function EnSpeakButton({
  text,
  label = "Nghe",
  size = "sm",
  showLabel = false,
  slow = false,
  className,
}: {
  text: string | string[];
  label?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  /** Đọc chậm hơn (để nghe rõ từng âm) */
  slow?: boolean;
  className?: string;
}) {
  const hydrated = useHydrated();
  const [id] = useState(() => `en-${++seq}`);
  const playing = useSyncExternalStore(subscribePlaying, getPlaying, () => null) === id;
  const { gender, rate, enAccent } = useTtsStore();
  if (!hydrated || !ttsSupported()) return null;

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) stopSpeaking();
    else speakEnglish(id, Array.isArray(text) ? text : [text], { gender, rate: slow ? 0.6 : rate, accent: enAccent });
  };
  const Icon = playing ? Square : Volume2;
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => e.stopPropagation()}
      aria-label={playing ? "Dừng" : label}
      title={playing ? "Dừng" : label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border transition-colors",
        size === "lg" ? "h-12 min-w-12 px-3" : size === "md" ? "h-10 min-w-10 px-2.5" : "h-8 min-w-8 px-1.5",
        playing ? "border-[#1d4ed8] bg-[#1d4ed8] text-white" : "border-line-strong bg-surface text-[#1d4ed8] hover:bg-[#e8efff]",
        showLabel && "px-3",
        className
      )}
    >
      <Icon className={cn(size === "lg" ? "h-5 w-5" : "h-4 w-4", playing && "fill-current")} aria-hidden />
      {showLabel && <span className="text-[13px] font-semibold">{playing ? "Dừng" : label}</span>}
    </button>
  );
}

/** Chọn giọng Anh (UK) / Mỹ (US) + tốc độ; hiện tên giọng máy đang dùng. */
export function EnVoiceSettings({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const { gender, rate, enAccent, setEnAccent, setRate } = useTtsStore();
  const [, force] = useState(0);
  const enManifest = useSyncExternalStore(subscribeManifest, getEnManifest, () => null);
  useEffect(() => {
    loadEnAudioManifest();
    if (!ttsSupported()) return;
    const f = () => force((n) => n + 1);
    speechSynthesis.addEventListener("voiceschanged", f);
    return () => speechSynthesis.removeEventListener("voiceschanged", f);
  }, []);
  if (!hydrated) return null;
  const recorded = enManifest?.voices[enVoiceId(enAccent, gender)];
  if (!ttsSupported() && !recorded)
    return <p className={cn("text-[13px] text-ink-3", className)}>Trình duyệt này chưa hỗ trợ đọc. Hãy dùng Safari, Chrome hoặc Edge.</p>;
  const pick = ttsSupported() ? pickEnglishVoice(enAccent, gender) : { voice: null, simulated: false };
  const seg = (on: boolean) =>
    cn("rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors", on ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink");
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-semibold text-ink-2">Giọng</span>
        <div className="flex rounded-xl bg-surface-2 p-1" role="group" aria-label="Giọng Anh hay Mỹ">
          <button type="button" className={seg(enAccent === "uk")} aria-pressed={enAccent === "uk"} onClick={() => setEnAccent("uk")}>
            🇬🇧 Anh
          </button>
          <button type="button" className={seg(enAccent === "us")} aria-pressed={enAccent === "us"} onClick={() => setEnAccent("us")}>
            🇺🇸 Mỹ
          </button>
        </div>
        <div className="flex rounded-xl bg-surface-2 p-1" role="group" aria-label="Tốc độ">
          <button type="button" className={seg(rate < 0.8)} aria-pressed={rate < 0.8} onClick={() => setRate(0.7)}>
            Chậm
          </button>
          <button type="button" className={seg(rate >= 0.8)} aria-pressed={rate >= 0.8} onClick={() => setRate(0.9)}>
            Thường
          </button>
        </div>
        <span className="text-[12px] text-ink-3">Nam / Nữ: nút trên thanh tiêu đề</span>
      </div>
      {recorded ? (
        <p className="text-[12px] text-ink-3">
          Giọng thu sẵn: {recorded} ({enAccent === "uk" ? "Anh" : "Mỹ"}, {gender === "male" ? "nam" : "nữ"}) — nghe được cả khi offline.
        </p>
      ) : (
        <p className="text-[12px] text-ink-3">
          {pick.voice ? `Đang dùng giọng: ${pick.voice.name} (${pick.voice.lang})` : "Chưa thấy giọng tiếng Anh trên máy."}
          {pick.voice && !pick.voice.lang.toLowerCase().replace("_", "-").startsWith(enAccent === "uk" ? "en-gb" : "en-us") &&
            ` — máy chưa có giọng ${enAccent === "uk" ? "Anh" : "Mỹ"}, đang dùng giọng gần nhất.`}
        </p>
      )}
    </div>
  );
}
