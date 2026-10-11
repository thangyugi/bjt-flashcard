import { PRACTICE } from "@/data/oci-ai/practice";

export const dynamic = "force-static";

/** Toàn bộ ngân hàng câu hỏi (dùng cho chế độ trộn ngẫu nhiên). */
export function GET() {
  const qs = PRACTICE.flatMap((p) => p.qs.map((x) => ({ ...x, part: Number(p.lessonId.slice(1, p.lessonId.indexOf("-"))) })));
  return Response.json(qs);
}
