import {
  BookOpen,
  Briefcase,
  Building2,
  CalendarClock,
  ClipboardList,
  Cpu,
  Factory,
  FileText,
  Flower2,
  Handshake,
  Home,
  Mail,
  MessageSquare,
  Quote,
  ShieldAlert,
  Target,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon nét mảnh thay cho emoji của từng nhóm
const ICONS: Record<string, LucideIcon> = {
  "bjt-g-hop": MessageSquare,
  "bjt-g-khach": Handshake,
  "bjt-g-nhansu": Briefcase,
  "bjt-g-taichinh": Wallet,
  "bjt-g-sanxuat": Factory,
  "bjt-g-congty": Building2,
  "bjt-g-chienluoc": Target,
  "bjt-g-ruiro": ShieldAlert,
  "bjt-g-it": Cpu,
  "bjt-g-hanhchinh": ClipboardList,
  "bjt-g-vanhoa": Flower2,
  "bjt-g-kinhngu": Mail,
  "bjt-g-thanhngu": Quote,
  "bjt-g-chungtu": FileText,
  "bjt-g-tiendo": CalendarClock,
  "n1-g02": Home,
};

export function GroupIcon({
  groupId,
  className,
  size = "md",
}: {
  groupId: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const Icon = ICONS[groupId] ?? BookOpen;
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-soft-ink",
        size === "md" ? "h-11 w-11" : "h-9 w-9 rounded-[10px]",
        className
      )}
    >
      <Icon className={size === "md" ? "h-5 w-5" : "h-[17px] w-[17px]"} strokeWidth={1.9} aria-hidden />
    </div>
  );
}
