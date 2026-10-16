"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Square, Volume2 } from "lucide-react";
import {
  getManifest,
  getPlaying,
  japaneseVoices,
  loadAudioManifest,
  pickVoice,
  speak,
  stopSpeaking,
  subscribeManifest,
  subscribePlaying,
  ttsSupported,
} from "@/lib/tts";
import { useTtsStore } from "@/store/tts-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

let seq = 0;

/** Danh sách giọng tiếng Nhật trên máy (được nạp không đồng bộ). */
function useVoicesReady() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!ttsSupported()) return;
    const update = () => setN(japaneseVoices().length);
    update();
    speechSynthesis.addEventListener("voiceschanged", update);
    return () => speechSynthesis.removeEventListener("voiceschanged", update);
  }, []);
  return n;
}

/**
 * Nút loa: đọc một hoặc nhiều đoạn tiếng Nhật (chuỗi có markup furigana).
 * Bấm lần nữa để dừng.
 */
export function SpeakButton({
  text,
  label = "Nghe",
  size = "sm",
  className,
  showLabel = false,
}: {
  text: string | string[];
  label?: string;
  size?: "sm" | "md";
  className?: string;
  showLabel?: boolean;
}) {
  const hydrated = useHydrated();
  const [id] = useState(() => `sp-${++seq}`);
  const playing = useSyncExternalStore(subscribePlaying, getPlaying, () => null) === id;
  const { gender, rate } = useTtsStore();

  useEffect(() => {
    loadAudioManifest();
  }, []);

  if (!hydrated) return null;

  const onClick = (e: React.MouseEvent) => {
    // Không kích hoạt hành động của khung chứa (ví dụ lật flashcard)
    e.stopPropagation();
    if (playing) stopSpeaking();
    else speak(id, Array.isArray(text) ? text : [text], { gender, rate });
  };
  const Icon = playing ? Square : Volume2;

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => e.stopPropagation()}
      aria-label={playing ? "Dừng đọc" : label}
      title={playing ? "Dừng đọc" : label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border transition-colors",
        size === "md" ? "h-10 min-w-10 px-2.5" : "h-8 min-w-8 px-1.5",
        playing
          ? "border-brand bg-brand text-white"
          : "border-line-strong bg-surface text-brand hover:bg-brand-soft",
        showLabel && "px-3",
        className
      )}
    >
      <Icon className={cn(size === "md" ? "h-[18px] w-[18px]" : "h-4 w-4", playing && "h-3.5 w-3.5 fill-current")} aria-hidden />
      {showLabel && <span className="text-[13px] font-semibold">{playing ? "Dừng" : label}</span>}
    </button>
  );
}

/** Chọn giọng đọc Nữ / Nam và tốc độ. */
export function VoiceSettings({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const voices = useVoicesReady();
  const { gender, rate, setGender, setRate } = useTtsStore();
  const manifest = useSyncExternalStore(subscribeManifest, getManifest, () => null);
  useEffect(() => {
    loadAudioManifest();
  }, []);

  if (!hydrated) return null;
  const recorded = manifest?.voices[gender];
  if (!ttsSupported() && !recorded)
    return (
      <p className={cn("text-[13px] text-ink-3", className)}>
        Trình duyệt này chưa hỗ trợ đọc tiếng Nhật. Hãy dùng Safari (iPhone/iPad), Chrome hoặc Edge.
      </p>
    );

  const pick = voices ? pickVoice(gender) : null;
  const seg = (on: boolean) =>
    cn("rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors", on ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink");

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-semibold text-ink-2">Giọng đọc</span>
        <div className="flex rounded-xl bg-surface-2 p-1" role="group" aria-label="Giọng đọc">
          <button type="button" className={seg(gender === "female")} aria-pressed={gender === "female"} onClick={() => setGender("female")}>
            Nữ
          </button>
          <button type="button" className={seg(gender === "male")} aria-pressed={gender === "male"} onClick={() => setGender("male")}>
            Nam
          </button>
        </div>
        <div className="flex rounded-xl bg-surface-2 p-1" role="group" aria-label="Tốc độ đọc">
          <button type="button" className={seg(rate < 0.8)} aria-pressed={rate < 0.8} onClick={() => setRate(0.7)}>
            Chậm
          </button>
          <button type="button" className={seg(rate >= 0.8)} aria-pressed={rate >= 0.8} onClick={() => setRate(0.9)}>
            Thường
          </button>
        </div>
      </div>
      {recorded && (
        <p className="text-[12px] text-ink-3">
          Giọng thu sẵn: <b className="text-ink-2">{recorded}</b>
          {" "}(câu nào chưa có file thu sẵn sẽ dùng giọng của máy).
        </p>
      )}
      {!recorded && pick && (
        <p className="text-[12px] text-ink-3">
          {pick.voice ? `Đang dùng giọng: ${pick.voice.name}` : "Chưa tìm thấy giọng tiếng Nhật trên máy."}
          {pick.simulated && " — máy chưa có giọng nam tiếng Nhật nên đang hạ tông giọng nữ."}
        </p>
      )}
      {!recorded && voices === 0 && (
        <p className="text-[12px] text-ink-3">
          Chưa thấy giọng tiếng Nhật trên máy. Cài thêm trong Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → Tiếng Nhật
          (iPhone/iPad) hoặc Cài đặt → Chuyển văn bản thành giọng nói (Android).
        </p>
      )}
    </div>
  );
}

/** Nút gọn trên thanh tiêu đề: đổi giọng đọc Nam ↔ Nữ cho mọi nút loa trong app. */
export function VoiceToggle({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const { gender, setGender } = useTtsStore();
  if (!hydrated) return <span className={cn("h-8 w-[72px]", className)} aria-hidden />;
  const male = gender === "male";
  return (
    <button
      type="button"
      onClick={() => setGender(male ? "female" : "male")}
      aria-label={`Giọng đọc: ${male ? "Nam" : "Nữ"} — bấm để đổi sang giọng ${male ? "Nữ" : "Nam"}`}
      title="Giọng đọc tiếng Nhật (bấm để đổi Nam / Nữ)"
      className={cn(
        "flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface pr-2.5 pl-2 text-[12.5px] font-semibold text-ink-2 transition-colors hover:border-brand hover:text-ink",
        className
      )}
    >
      <Volume2 className="h-4 w-4 text-brand" aria-hidden />
      <span className={cn(male ? "text-ink" : "text-ink-3")}>Nam</span>
      <span className="text-ink-3">/</span>
      <span className={cn(!male ? "text-ink" : "text-ink-3")}>Nữ</span>
    </button>
  );
}
