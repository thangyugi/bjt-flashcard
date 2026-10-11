import type { GlossaryItem } from "./types";
import { glossaryBase } from "./glossary-base";
import { glossaryNew } from "./glossary-new";

/** Từ điển thuật ngữ đầy đủ: Phần 1–4 (từ tài liệu gốc) + Phần 5–8 (bổ sung). */
export const GLOSSARY: GlossaryItem[] = [...glossaryBase, ...glossaryNew];
