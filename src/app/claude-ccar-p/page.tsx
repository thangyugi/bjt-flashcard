import { BANK, DOMAINS, getCourseMeta, guideSection, mockExams, renderBlocks, renderSections } from "@/data/ccar-p/course";
import { CcarHome } from "@/components/ccar-p/CcarHome";

const blocksOf = (title: string, skipTables = false) =>
  renderBlocks((guideSection(title)?.blocks ?? []).filter((b) => !(skipTables && b.t === "table")), false);

export default function CcarHomePage() {
  const { domains, lessons } = getCourseMeta();
  return (
    <CcarHome
      domains={domains.map((d) => ({
        ...d,
        intro: DOMAINS.find((x) => x.num === d.num)!.intro.map((b) => (b.t === "p" ? b.text : "")).join(" ").trim(),
        questions: BANK.filter((q) => q.domain === d.num).length,
      }))}
      lessons={lessons}
      stats={{ questions: BANK.length, exams: mockExams().length }}
      html={{
        facts: blocksOf("Số liệu kỳ thi"),
        order: blocksOf("Mục lục ＋ tỉ trọng CHÍNH CHỦ", true),
        layers: blocksOf("CCAR-P · Claude Certified Architect – Professional"),
        register: renderSections(
          ["Đăng ký thi — làm theo từng bước", "Chặng A · Tạo tài khoản ＋ thanh toán", "Chặng B · Đặt lịch bên Pearson VUE", "Trước ngày thi ＋ hôm thi", "Chặng C · Trước ngày thi", "Chặng D · Hôm thi"],
          3
        ),
        weights: blocksOf("Tỉ trọng hãng so với tỉ trọng ngân hàng đề trong app"),
      }}
    />
  );
}
