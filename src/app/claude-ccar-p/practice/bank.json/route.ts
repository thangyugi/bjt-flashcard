import { BANK } from "@/data/ccar-p/course";

export const dynamic = "force-static";

/** Toàn bộ ngân hàng câu hỏi CCAR-P (EN + VI, đáp án, giải thích) cho các trang luyện tập / thi thử. */
export function GET() {
  return Response.json(BANK);
}
