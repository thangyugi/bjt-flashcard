import type { OciLesson } from "./types";
import { arrowDefs, cards, chat, code, d, example, figure, flow, memo, note, steps, table, ul } from "./authoring";

/* Phần 5 (module 6 khóa gốc: "OCI Enterprise AI") — bài 5.1 → 5.6
   Nguồn: docs/OCIAI/From 6. OCI Enterprise AI.txt */

const [loopDefs, loopId] = arrowDefs();
const agentLoopSvg = `<svg class="svg-diagram" viewBox="0 0 700 300" role="img" aria-label="Vòng lặp của agent: nhận mục tiêu, LLM suy luận chọn bước tiếp theo, hành động qua tool, quan sát kết quả rồi lặp lại cho tới khi trả lời; memory lưu ngữ cảnh xuyên suốt.">
${loopDefs}
<g fill="currentColor" font-size="13" text-anchor="middle">
  <rect x="20" y="118" width="130" height="62" rx="12" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="85" y="145" font-weight="700">Mục tiêu</text><text x="85" y="163" font-size="10.5" opacity=".7">"Reset VPN cho tôi"</text>

  <rect x="230" y="30" width="170" height="66" rx="12" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="2.2"/>
  <text x="315" y="58" font-weight="700">LLM suy luận</text><text x="315" y="76" font-size="10.5" opacity=".7">Reason — bước tiếp theo là gì?</text>

  <rect x="470" y="118" width="170" height="62" rx="12" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="555" y="145" font-weight="700">Hành động</text><text x="555" y="163" font-size="10.5" opacity=".7">Act — gọi tool / API</text>

  <rect x="230" y="200" width="170" height="62" rx="12" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="315" y="227" font-weight="700">Quan sát kết quả</text><text x="315" y="245" font-size="10.5" opacity=".7">Observe — đủ chưa?</text>

  <rect x="470" y="226" width="200" height="56" rx="12" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/>
  <text x="570" y="250" font-weight="700" font-size="12">Memory</text><text x="570" y="267" font-size="10.5" opacity=".7">nhớ ngữ cảnh các lượt trước</text>
</g>
<g stroke="currentColor" stroke-width="1.6" fill="none">
  <path d="M150 140 C 190 120, 200 90, 228 70" marker-end="url(#${loopId})"/>
  <path d="M402 70 C 450 80, 520 90, 552 116" marker-end="url(#${loopId})"/>
  <path d="M552 182 C 520 210, 450 228, 404 230" marker-end="url(#${loopId})"/>
  <path d="M260 198 C 240 160, 250 130, 270 100" marker-end="url(#${loopId})"/>
</g>
<text x="200" y="200" font-size="11" fill="currentColor" opacity=".75" text-anchor="middle">lặp lại tới khi xong</text>
</svg>`;

const [layDefs, layId] = arrowDefs();
const threeLayersSvg = `<svg class="svg-diagram" viewBox="0 0 700 330" role="img" aria-label="Ba lớp của mọi hệ thống agent: trên cùng là người dùng hoặc ứng dụng, giữa là runtime với tám thành phần, dưới cùng là agent logic do bạn viết.">
${layDefs}
<g fill="currentColor" text-anchor="middle">
  <rect x="140" y="12" width="420" height="52" rx="12" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="350" y="35" font-size="13.5" font-weight="700">① User / Application</text>
  <text x="350" y="53" font-size="10.5" opacity=".7">cách con người thực sự chạm tới agent</text>

  <rect x="20" y="88" width="660" height="140" rx="14" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="2.2"/>
  <text x="350" y="112" font-size="13.5" font-weight="700">② Runtime — phần "ở giữa"</text>
  <g font-size="11">
    <rect x="40" y="126" width="145" height="36" rx="8" fill="none" stroke="currentColor" opacity=".6"/><text x="112" y="148">Request handling</text>
    <rect x="200" y="126" width="145" height="36" rx="8" fill="none" stroke="currentColor" opacity=".6"/><text x="272" y="148">Execution env.</text>
    <rect x="360" y="126" width="145" height="36" rx="8" fill="none" stroke="currentColor" opacity=".6"/><text x="432" y="148">Orchestration &amp; state</text>
    <rect x="520" y="126" width="145" height="36" rx="8" fill="none" stroke="currentColor" opacity=".6"/><text x="592" y="148">Tool sandbox</text>
    <rect x="40" y="174" width="145" height="36" rx="8" fill="none" stroke="currentColor" opacity=".6"/><text x="112" y="196">Integrations</text>
    <rect x="200" y="174" width="145" height="36" rx="8" fill="none" stroke="currentColor" opacity=".6"/><text x="272" y="196">Scaling</text>
    <rect x="360" y="174" width="145" height="36" rx="8" fill="none" stroke="currentColor" opacity=".6"/><text x="432" y="196">Reliability</text>
    <rect x="520" y="174" width="145" height="36" rx="8" fill="none" stroke="currentColor" opacity=".6"/><text x="592" y="196">Observability</text>
  </g>

  <rect x="140" y="252" width="420" height="58" rx="12" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="350" y="276" font-size="13.5" font-weight="700">③ Agent logic — "bộ não" bạn viết</text>
  <text x="350" y="295" font-size="10.5" opacity=".7">LangChain · OpenAI Agents SDK · framework tùy chọn</text>
</g>
<g stroke="currentColor" stroke-width="1.5"><line x1="350" y1="64" x2="350" y2="86" marker-end="url(#${layId})"/><line x1="350" y1="250" x2="350" y2="230" marker-end="url(#${layId})"/></g>
</svg>`;

const pillarsSvg = `<svg class="svg-diagram" viewBox="0 0 700 250" role="img" aria-label="Ba trụ cột của OCI Enterprise AI: Models là lớp bộ não, Agents là lớp hành động, Governance là lớp niềm tin bao trùm cả hai.">
<g fill="currentColor" text-anchor="middle">
  <rect x="20" y="20" width="660" height="210" rx="16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="6 5"/>
  <text x="350" y="214" font-size="12.5" font-weight="700">Governance — lớp niềm tin (trust layer): áp dụng ở MỌI giai đoạn</text>
  <rect x="60" y="44" width="270" height="140" rx="14" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.8"/>
  <text x="195" y="72" font-size="14" font-weight="700">Models</text>
  <text x="195" y="90" font-size="11" opacity=".75">lớp "bộ não" (brain layer)</text>
  <text x="195" y="118" font-size="11">OpenAI · xAI · Google</text>
  <text x="195" y="136" font-size="11">Meta · Cohere</text>
  <text x="195" y="160" font-size="10.5" opacity=".7">qua một API thống nhất</text>
  <rect x="370" y="44" width="270" height="140" rx="14" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.8"/>
  <text x="505" y="72" font-size="14" font-weight="700">Agents</text>
  <text x="505" y="90" font-size="11" opacity=".75">lớp hành động (action layer)</text>
  <text x="505" y="118" font-size="11">build · orchestrate · launch</text>
  <text x="505" y="136" font-size="11">managed tools · MCP · A2A</text>
  <text x="505" y="160" font-size="10.5" opacity=".7">framework mã nguồn mở</text>
</g>
</svg>`;

const meaningSpaceSvg = `<svg class="svg-diagram" viewBox="0 0 640 300" role="img" aria-label="Không gian ý nghĩa giản lược: vacation, PTO và annual leave nằm sát nhau thành một cụm; invoices và VPN reset nằm cách xa.">
<g fill="none" stroke="currentColor" opacity=".35"><line x1="40" y1="260" x2="610" y2="260"/><line x1="40" y1="260" x2="40" y2="20"/></g>
<g fill="currentColor" font-size="12.5" font-weight="600">
  <ellipse cx="190" cy="110" rx="125" ry="62" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-dasharray="5 4"/>
  <circle cx="140" cy="95" r="6"/><text x="152" y="91">vacation</text>
  <circle cx="200" cy="130" r="6"/><text x="212" y="134">PTO</text>
  <circle cx="160" cy="150" r="6"/><text x="100" y="172">annual leave</text>
  <circle cx="470" cy="80" r="6" opacity=".6"/><text x="482" y="84">invoices</text>
  <circle cx="430" cy="215" r="6" opacity=".6"/><text x="442" y="219">VPN reset</text>
  <circle cx="250" cy="70" r="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="262" y="66" font-style="italic">"time off?"</text>
</g>
<text x="190" y="38" font-size="11" fill="currentColor" opacity=".7" text-anchor="middle">cụm "nghỉ phép"</text>
</svg>`;

const [simDefs, simId] = arrowDefs();
const cosineSvg = `<svg class="svg-diagram narrow" viewBox="0 0 420 240" role="img" aria-label="Cosine similarity: góc nhỏ giữa vector A và B nghĩa là giống nhau; góc lớn giữa B và C nghĩa là khác nhau.">
${simDefs}
<g stroke="currentColor" stroke-width="2" fill="none">
  <line x1="60" y1="200" x2="330" y2="70" marker-end="url(#${simId})"/>
  <line x1="60" y1="200" x2="350" y2="120" marker-end="url(#${simId})"/>
  <line x1="60" y1="200" x2="110" y2="30" marker-end="url(#${simId})" opacity=".6"/>
  <path d="M150 157 A 100 100 0 0 0 160 172" stroke-width="2.4"/>
  <path d="M95 140 A 70 70 0 0 1 125 168" opacity=".6" stroke-dasharray="4 3"/>
</g>
<g fill="currentColor" font-size="13" font-weight="700"><text x="336" y="66">A</text><text x="356" y="124">B</text><text x="100" y="26">C</text></g>
<g fill="currentColor" font-size="11" opacity=".8"><text x="180" y="185">góc nhỏ → A, B giống nhau</text><text x="22" y="120">góc lớn → khác nhau</text></g>
</svg>`;

export const m5a: OciLesson[] = [
  /* ───────────────────────────── 5.1 ───────────────────────────── */
  {
    id: "m5-l1",
    code: "5.1",
    kind: "lesson",
    title: "AI Agent là gì? Khác gì chatbot và workflow?",
    navTitle: "Tổng quan về AI Agent",
    minutes: 7,
    source: "Agents Overview",
    html: `<p>Module này mở đầu bằng câu hỏi nền tảng nhất: <em>chính xác thì một AI agent là gì?</em> Sau bài này bạn sẽ: định nghĩa được agent bằng một mô hình đơn giản, phân biệt agent với chatbot và với workflow cố định, nêu được các đặc điểm khiến một hệ thống trở nên "agentic", hiểu vòng lặp vận hành nó, gọi tên bốn khối xây dựng, và lần theo cách một agent xử lý vài tác vụ thực tế.</p>

<h2>So sánh với những thứ bạn đã biết</h2>
<p>Trước khi định nghĩa, hãy đặt agent cạnh hai thứ quen thuộc:</p>
${table(
  ["", "Cách hoạt động", "Ví von", "Ai quyết định bước tiếp theo?"],
  [
    ["Chatbot", "Trả lời đúng câu bạn hỏi", "Một lễ tân nhiệt tình", "Người dùng — hỏi gì đáp nấy"],
    ["Workflow", "Đi theo một chuỗi bước <strong>định sẵn, cố định</strong>", "Dây chuyền lắp ráp trong nhà máy", "Người thiết kế quy trình — từ trước"],
    ["AI Agent", "<strong>Tự suy nghĩ và quyết định</strong> làm gì tiếp theo, một cách linh hoạt", "Một nhân viên tự xoay xở để hoàn thành mục tiêu", "Chính agent — trong lúc chạy"],
  ]
)}
<p>Điểm khác biệt cốt lõi: chatbot <em>phản hồi</em>, workflow <em>tuân thủ</em>, còn agent <em>tự quyết định</em> bước kế tiếp dựa trên tình huống (dynamic).</p>

<h2>Mô hình đơn giản: agent = LLM + tools + loop + memory</h2>
<p>Trong suốt module, ta dùng một mô hình gọn để nghĩ về agent: <strong>một LLM có tools, chạy trong một vòng lặp, có memory, và tự quyết định các bước của mình</strong>. Đó cũng chính là bốn khối xây dựng (building blocks):</p>
${cards([
  { tag: "Khối 1", title: "LLM — bộ não", body: `<p>${d("Large Language Model", "mô hình ngôn ngữ lớn")} suy luận xem cần làm gì. Các bài 5.3–5.4 bàn kỹ cách chọn và tùy chỉnh nó.</p>` },
  { tag: "Khối 2", title: "Tools — đôi tay", body: `<p>${d("Tool", "công cụ — hàm, API, hệ thống bên ngoài mà agent được phép gọi")} giúp agent <em>hành động</em> chứ không chỉ nói. Xem bài 5.8–5.9.</p>` },
  { tag: "Khối 3", title: "Loop — vòng lặp", body: `<p>Agent lặp "suy luận → hành động → quan sát" cho tới khi đạt mục tiêu, thay vì trả lời một phát là xong.</p>` },
  { tag: "Khối 4", title: "Memory — trí nhớ", body: `<p>${d("Memory", "trí nhớ — ngữ cảnh các lượt trước, thậm chí giữa nhiều cuộc hội thoại")} giúp agent không "quên" bạn vừa nói gì. Xem bài 5.10.</p>` },
])}

<h2>Vòng lặp vận hành agent</h2>
${figure(agentLoopSvg, "Vòng lặp reason → act → observe: LLM chọn bước tiếp theo, gọi tool để hành động, xem kết quả rồi quyết định lặp tiếp hay trả lời. Memory giữ ngữ cảnh suốt quá trình.")}
<p>Chính vòng lặp này tạo nên các đặc điểm "agentic": agent <strong>lập kế hoạch</strong> (chia mục tiêu thành bước), <strong>dùng công cụ</strong>, <strong>tự kiểm tra</strong> kết quả xem đã đúng ý chưa, và <strong>ghi nhớ</strong> ngữ cảnh. (Phần 8 sẽ gặp lại đúng bốn hành vi này trong Select AI Agent: <em>plan, use tools, reflect, remember</em>.)</p>

<h2>Lần theo agent qua hai tác vụ thật</h2>
<p>Ví dụ xuyên suốt cả module là một <strong>Helpdesk agent</strong> nội bộ giúp nhân viên công ty.</p>
${chat([
  ["user", "Tôi còn bao nhiêu ngày phép (PTO)?"],
  ["sys", "suy luận: cần số dư phép → gọi tool get_pto_balance(user_id)"],
  ["bot", "Bạn còn 8 ngày phép."],
])}
${chat([
  ["user", "Reset VPN giúp tôi với."],
  ["sys", "suy luận: cần hành động → gọi tool reset_vpn(user_id) → kết quả: thành công"],
  ["bot", "Xong rồi, VPN của bạn đã được reset. Kiểm tra email để đặt mật khẩu mới."],
])}
<p>Một chatbot thuần chỉ có thể nói "tôi không có quyền truy cập dữ liệu đó". Agent thì <em>tự quyết định</em> cần gọi công cụ nào, gọi, đọc kết quả rồi mới trả lời.</p>

${note("Lưu ý về nguồn", `<p>Bản ghi gốc của bài "Agents Overview" khá ngắn (chỉ phần mở đầu). Mô hình 4 khối và vòng lặp ở trên được tổng hợp từ chính các bài tiếp theo trong module 6 — nơi giảng viên nhắc lại: <em>"an agent is an LLM with tools, a loop, and memory deciding its own steps"</em>.</p>`)}

${memo(`<p><strong>Chatbot</strong> trả lời câu hỏi; <strong>workflow</strong> chạy chuỗi bước cố định; <strong>agent</strong> tự quyết định bước tiếp theo. Agent = <strong>LLM + tools + loop + memory</strong>. Vòng lặp cốt lõi: <em>reason → act → observe</em>, lặp đến khi xong.</p>`)}`,
  },

  /* ───────────────────────────── 5.2 ───────────────────────────── */
  {
    id: "m5-l2",
    code: "5.2",
    kind: "lesson",
    title: "OCI Enterprise AI: đưa agent lên production",
    navTitle: "Tổng quan OCI Enterprise AI",
    minutes: 12,
    source: "Enterprise AI Overview",
    html: `<p>Bạn đã có một agent chạy được. Câu hỏi tiếp theo: <strong>làm sao vận hành nó trong production cho người dùng thật?</strong> Đó chính là việc OCI Enterprise AI sinh ra để giải quyết. Bài này đi qua: thế nào là agent "production-ready", ba lớp của mọi hệ thống agent, hai cách triển khai, rồi tới nền tảng OCI Enterprise AI với ba trụ cột — models, agents, governance. Bài có nhắc nhiều khái niệm mới; đừng lo, các bài sau sẽ đi sâu từng cái.</p>

<h2>"Nó chạy rồi!"… rồi các câu hỏi bắt đầu</h2>
<p>Bạn viết 10 dòng code, agent trả lời đúng "15 × 8 ÷ 3". Ngay khi có người hỏi cách dùng, ba nhóm câu hỏi ập tới:</p>
${cards(
  [
    { tag: "Runtime", title: "Chạy ở đâu, chịu tải ra sao?", body: ul(["Chạy ở đâu? 300 — hay 3.000 người dùng thì sao?", "Memory nằm ở đâu?", "Tool bị lỗi thì chuyện gì xảy ra?", "Làm sao xem hôm qua nó đã làm gì?"]) },
    { tag: "Model", title: "Dùng model nào?", body: ul(["Chọn model nào bây giờ?", "Tháng sau có model tốt hơn thì sao?"]) },
    { tag: "Trust", title: "Có tin được không?", body: ul(["Chặn rò rỉ dữ liệu, chặn prompt injection thế nào?", "Ai được phép gọi agent này?"]) },
  ],
  3
)}
<p>Để ý: <strong>không câu nào là về việc viết code agent hay hơn</strong>. Đây là các bài toán <em>nền tảng</em> (platform problems), và mỗi nhóm trỏ tới một phần của nền tảng mà ta sắp gặp.</p>

<h2>Ba lớp của mọi hệ thống agent</h2>
${figure(threeLayersSvg, "Trên cùng: cách người dùng chạm tới agent. Dưới cùng: logic bạn viết (bộ não). Toàn bộ khối ở giữa — runtime — vẫn là việc của bạn, trừ khi một dịch vụ managed lo giúp.")}
<p>Phần <dfn>agent logic</dfn> <span class="gloss">(code bạn viết bằng LangChain, OpenAI Agents SDK hay framework bất kỳ)</span> là thứ bạn đã biết làm. Còn ${d("runtime", "môi trường thực thi — mọi thứ cần để agent chạy ổn định cho người dùng thật")} gồm: xử lý request, môi trường thực thi, điều phối &amp; trạng thái, ${d("tool sandbox", "vùng cách ly để chạy công cụ an toàn")}, tích hợp, mở rộng quy mô, độ tin cậy và ${d("observability", "khả năng quan sát — log, metric, trace để biết hệ thống đang làm gì")}.</p>

<h2>Hai con đường triển khai</h2>
${table(
  ["", "Path A — Tự làm (DIY)", "Path B — Managed agent runtime"],
  [
    ["Cách làm", "Bọc LangChain / OpenAI thuần trong hạ tầng của riêng bạn", "Dùng OCI Enterprise AI Agent service"],
    ["Bạn phải lo", "Toàn bộ runtime — mỗi hạng mục là <strong>nhiều tuần</strong> kỹ sư, sau đó còn gánh trực vận hành (on-call)", "Agent logic + vài lời gọi API"],
    ["OCI lo giúp", "—", "Môi trường thực thi, xử lý request, chạy tool trong sandbox, scaling"],
    ["Thời gian lên production", "Tính bằng quý", "Tính bằng tuần"],
  ]
)}
${example(`<p>Agent logic <strong>không biến mất</strong> — bạn vẫn viết nó. Điều thay đổi là <strong>runtime không còn là gánh nặng của bạn</strong>. Với đa số đội, nhất là đội mới làm agent, giao runtime cho dịch vụ managed là cách nhanh nhất để lên production.</p>`, "Điểm mấu chốt")}

<h2>Nền tảng OCI Enterprise AI: ba trụ cột</h2>
${figure(pillarsSvg, "Models cho trí thông minh, Agents cho khả năng hành động, Governance cho sự an toàn — cùng nhau tạo thành nền tảng.")}
${table(
  ["Trụ cột", "Vai trò", "Cung cấp gì"],
  [
    ["OCI Enterprise AI <strong>Models</strong>", "Brain layer — bộ não", "Truy cập nhiều frontier model (OpenAI, xAI, Google, Meta, Cohere) qua <strong>một API nhất quán</strong>"],
    ["OCI Enterprise AI <strong>Agents</strong>", "Action layer — hành động", "Xây dựng, điều phối, triển khai workload agentic với managed tools, giao thức chuẩn (MCP, A2A), framework mã nguồn mở"],
    ["OCI Enterprise AI <strong>Governance</strong>", "Trust layer — niềm tin", "Bảo mật, tuân thủ và kiểm soát truy cập cấp doanh nghiệp ở <strong>mọi giai đoạn</strong>"],
  ]
)}

<h2>Trụ cột 1 — Models: chat, embed, rerank</h2>
${cards(
  [
    {
      tag: "Chat",
      title: "Chat models",
      body: `<p>Loại đa dụng nhất: nhận prompt (câu hỏi, chỉ dẫn, hội thoại nhiều lượt) và sinh câu trả lời. Mặc định <strong>stateless</strong> — mỗi lần gọi bắt đầu từ đầu; memory được thêm qua OCI Conversations API. Hỗ trợ ${d("tool calling", "model tự quyết định gọi hàm, nhận kết quả rồi đưa vào câu trả lời")} — nền tảng của workflow agentic.</p>`,
    },
    {
      tag: "Embed",
      title: "Embed models",
      body: `<p>Không sinh văn bản. Biến văn bản thành một <strong>vector số có số chiều cố định</strong>, giữ nguyên "hình học ý nghĩa": hai câu cùng nghĩa cho vector gần nhau dù không chung từ nào → nền tảng của ${d("semantic search", "tìm kiếm theo ngữ nghĩa")}. Một số model là ${d("multimodal", "đa phương thức")}: nhúng cả văn bản lẫn ảnh vào cùng không gian để tìm kiếm chéo.</p>`,
    },
    {
      tag: "Rerank",
      title: "Rerank models",
      body: `<p>Lớp "độ chính xác" trong pipeline RAG. Sau khi embedding lấy nhanh ~50 tài liệu ứng viên bằng ${d("approximate nearest neighbor search", "tìm láng giềng gần đúng")}, rerank chấm lại từng ứng viên so với câu hỏi bằng một mô hình đắt hơn nhưng chính xác hơn. Top 5–10 tài liệu mới được đưa cho chat model.</p>`,
    },
  ],
  3
)}
<p>${d("RAG — Retrieval-Augmented Generation", "sinh có tăng cường truy xuất: lấy dữ liệu tin cậy bên ngoài trước khi sinh câu trả lời")} là kiến trúc giúp LLM chính xác và đúng ngữ cảnh hơn. Chuỗi chất lượng của nó rất đơn giản:</p>
${flow([{ t: "Embed", s: "quyết định recall" }, { t: "Rerank", s: "quyết định precision" }, { t: "Chat", s: "quyết định generation" }], "Chuỗi chất lượng RAG: embed quyết định recall, rerank quyết định precision, chat quyết định chất lượng sinh câu trả lời")}
<p>Cần cả ba khâu tốt thì RAG mới tốt.</p>

<h2>Grounding: trả lời từ dữ liệu của bạn</h2>
<p>Thứ biến AI thành <em>Enterprise AI</em> là agent trả lời <strong>từ dữ liệu của bạn</strong>, chứ không phải từ những gì model "tình cờ nhớ". Nhân viên hỏi Helpdesk agent: <em>"Năm nay tôi được bao nhiêu ngày nghỉ?"</em> — model thô sẽ đoán. ${d("Grounding", "neo câu trả lời vào nguồn dữ liệu chính thức")} làm tốt hơn:</p>
${flow([{ t: "Embed câu hỏi", s: "→ vector" }, { t: "Truy xuất", s: "vector store tài liệu" }, { t: "Rerank", s: "giữ đoạn tốt nhất" }, { t: "Chat model", s: "viết câu trả lời" }], "Grounding: embed câu hỏi, truy xuất đoạn gần nhất từ vector store, rerank, rồi chat model viết câu trả lời", 3)}
<p>Kết quả <strong>chính xác, cập nhật, và chỉ ra được nguồn</strong> — agent trả lời thẳng từ tài liệu chính sách phúc lợi và IT của công ty.</p>

<h2>Trụ cột 2 — Agents: runtime managed cho cả vòng đời</h2>
${table(
  ["Nhóm", "Bao gồm"],
  [
    ["Agent management — xây, triển khai, quan sát", "Authoring; testing &amp; evaluation; observability; hosted deployment"],
    ["Orchestration — lập kế hoạch &amp; phối hợp", "Planning; checkpoint human-in-the-loop; giao thức chuẩn MCP và A2A (agent-to-agent); framework mã nguồn mở — để bạn <strong>không bị khóa chặt</strong> (lock-in)"],
    ["Runtime — cách agent làm việc", "Responses API, tools, vector stores, memory"],
  ]
)}
<p>Nói cách khác: <strong>tools, loop và memory</strong> từ bài 5.1 giờ được quản lý giúp bạn thay vì tự dựng tay.</p>

<h2>Trụ cột 3 — Governance: bảo vệ nhiều lớp</h2>
<p>Governance mang tính <strong>xuyên suốt</strong> (cross-cutting): áp dụng ở mọi giai đoạn, không phải "gắn thêm" vào cuối. OCI Generative AI governance tổ chức thành bốn lớp:</p>
${table(
  ["Lớp", "Công cụ", "Chặn điều gì"],
  [
    ["1. Network security", "Private endpoint giữ truy cập model trong ranh giới mạng an toàn; zero trust packet routing ép giao tiếp giữa các dịch vụ theo danh tính", "Lưu lượng trái phép từ ngoài"],
    ["2. Identity control", "OCI IAM policies: ai được truy cập / dùng / quản lý từng tài nguyên GenAI; chi tiết tới loại tài nguyên, phạm vi compartment hoặc cả tenancy", "Danh tính không đúng"],
    ["3. AI behavior", "Guardrails lúc chạy: content moderation, prompt injection defense, PII detection trên input <em>và</em> output", "Model cư xử không an toàn, bất kể cái gì lọt tới nó"],
    ["4. Observability &amp; audit", "OCI Logging, Monitoring, Audit — truy vết mọi hành động", "Trả lời câu hỏi “hôm qua nó đã làm gì?”"],
  ]
)}
<p>Bốn lớp này là cách tiếp cận ${d("defense in depth", "phòng thủ nhiều lớp — mỗi lớp là một hàng rào kẻ tấn công phải vượt qua")}.</p>

${memo(`<p>Bốn điều cần nói được sau bài này: (1) mọi hệ thống agent có <strong>3 lớp</strong> — cách người dùng chạm tới, runtime chạy nó, và logic bạn viết; (2) runtime có thể tự xây hoặc dùng dịch vụ managed — <strong>OCI Enterprise AI Agents</strong> cung cấp sẵn; (3) Enterprise AI có <strong>3 trụ cột</strong>: models (trí thông minh), agents (hành động), governance (niềm tin); (4) <strong>grounding</strong> trên dữ liệu của bạn là thứ làm nên "enterprise AI" — câu trả lời chính xác, cập nhật, kiểm chứng được.</p>`)}`,
  },

  /* ───────────────────────────── 5.3 ───────────────────────────── */
  {
    id: "m5-l3",
    code: "5.3",
    kind: "lesson",
    title: "Models: chọn model và điều khiển đầu ra",
    navTitle: "Models: chọn & điều chỉnh",
    minutes: 10,
    source: "Models",
    html: `<p>Mọi agent đều chạy trên một model. Trước khi nối tools và memory, bạn cần biết các model là gì, khác nhau ra sao và điều khiển chúng thế nào. Lộ trình bài: định nghĩa ${d("foundation model", "mô hình nền tảng")}, tách ba loại tác vụ chat/embed/rerank, các họ model trên OCI, cách chọn chat model, các tham số, hai chế độ phục vụ (on-demand / dedicated) và vòng đời model.</p>

<h2>Foundation model là gì?</h2>
<p>Một foundation model được <strong>huấn luyện một lần</strong> trên lượng dữ liệu khổng lồ, rồi <strong>tái sử dụng cho rất nhiều tác vụ</strong> mà bạn không phải tự huấn luyện gì. Từ đó suy ra ba tính chất:</p>
${cards(
  [
    { title: "Pre-trained", body: "<p>Đã được huấn luyện sẵn — đã biết ngôn ngữ và các mẫu hình.</p>" },
    { title: "General", body: "<p>Tổng quát — xử lý được cả những đầu vào chưa từng thấy.</p>" },
    { title: "Ready to use", body: "<p>Dùng ngay — gọi qua API từ hôm nay.</p>" },
  ],
  3
)}
<p>Helpdesk agent của chúng ta cần một "bộ não" — phần còn lại của bài là cách chọn nó cho tốt.</p>

<h2>Năm họ model, một API</h2>
<p>Điểm mạnh của OCI Enterprise AI: <strong>không bị khóa vào một nhà cung cấp</strong>. Oracle tuyển chọn frontier model từ năm họ — <strong>Cohere</strong>, <strong>Google Gemini</strong>, <strong>Meta Llama</strong>, <strong>OpenAI gpt-oss</strong>, <strong>xAI Grok</strong> — và bạn gọi tất cả qua <strong>một API nhất quán</strong>. Mỗi họ có thế mạnh riêng, và danh sách cụ thể liên tục thay đổi khi model mới ra mắt. Thói quen quan trọng: <em>chọn model hợp với use case</em>, vì bạn có thể đổi sau mà không phải viết lại ứng dụng.</p>

<h2>Ba loại tác vụ: vào gì, ra gì</h2>
${table(
  ["Loại", "Đầu vào", "Đầu ra", "Dùng để"],
  [
    ["Chat", "Văn bản", "Văn bản", "Động cơ hội thoại; cũng là thứ điều khiển suy luận và tool call"],
    ["Embed", "Văn bản hoặc ảnh", "Vector — danh sách số nắm bắt ý nghĩa", "Ý tưởng giống nhau nằm gần nhau → tìm kiếm ngữ nghĩa"],
    ["Rerank", "Một câu hỏi + một tập tài liệu", "Các tài liệu được sắp lại theo độ liên quan", "Tăng độ chính xác khi truy xuất"],
  ]
)}
<p>Embed và rerank chính là hai thứ vận hành pipeline grounding ở bài 5.2.</p>

<h2>Chọn chat model: không có "tốt nhất", chỉ có "hợp nhất"</h2>
<p>Câu trả lời thật thà cho "model nào tốt nhất?" là: <em>tùy việc</em>. Bốn yếu tố quan trọng nhất:</p>
${steps([
  "<strong>Đánh đổi tốc độ – chất lượng – chi phí:</strong> model lớn suy luận tốt hơn nhưng đắt hơn và chậm hơn.",
  `<strong>${d("Context window", "cửa sổ ngữ cảnh — lượng văn bản model đọc được trong một lần")}:</strong> từ khoảng 128K token tới hơn 1 triệu token cho tài liệu dài.`,
  `<strong>${d("Modality", "phương thức dữ liệu")}:</strong> chỉ văn bản, hay đọc được cả ảnh và biểu đồ.`,
  "<strong>Reasoning hay fast:</strong> model suy luận từng bước, hay model nhanh cho tác vụ đơn giản.",
])}
${example(`<p>Với Helpdesk agent, "điểm ngọt" là một <strong>model cỡ vừa, nhanh</strong>, gọi tool tốt và có context đủ lớn. Bài học: <strong>khớp model với công việc</strong>.</p>`, "Áp vào Helpdesk agent")}

<h2>Tham số: điều khiển cách model trả lời</h2>
<p>Cùng một model có thể cư xử rất khác nhau tùy tham số. Chia làm hai nhóm:</p>
${table(
  ["Nhóm", "Tham số", "Tác dụng"],
  [
    ["Độ ngẫu nhiên — “núm” sáng tạo", "<code>temperature</code>", "Tham số quan trọng nhất: <strong>thấp</strong> = tập trung, đúng sự thật; <strong>cao</strong> = sáng tạo, đa dạng"],
    ["", "<code>top-p</code>, <code>top-k</code>", "Giới hạn tập token mà model lấy mẫu"],
    ["", "<code>max output tokens</code>", "Giới hạn độ dài câu trả lời"],
    ["Điều khiển — định hình kết quả", "<code>stop sequences</code>", "Dừng sinh khi gặp chuỗi được chọn"],
    ["", "<code>frequency</code> / <code>presence penalty</code>", "Giảm lặp từ / lặp ý"],
    ["", "<code>seed</code>", "Chạy thử nghiệm có thể tái lập (reproducible)"],
    ["", "<code>preamble</code>", "Đặt vai trò cho model ngay từ đầu (chỉ dẫn mở đầu)"],
  ]
)}
<p>Với câu trả lời mang tính sự thật trong helpdesk, bạn sẽ giữ <code>temperature</code> <strong>thấp</strong>.</p>

<h2>Chạy model: On-demand hay Dedicated?</h2>
${table(
  ["", "On-demand", "Dedicated"],
  [
    ["Hạ tầng", "Dùng chung, được quản lý sẵn", "Dedicated AI cluster: GPU riêng trong tenancy của bạn"],
    ["Khởi động", "Không cần cài đặt — gọi ngay", "Cần tạo cluster"],
    ["Tính phí", "Theo token", "Theo unit-hour, có cam kết"],
    ["Hiệu năng", "Biến động theo tải chung", "Ổn định, có thể dự đoán, được cách ly"],
    ["Model tùy chỉnh / fine-tuned", "Không", "<strong>Bắt buộc</strong> dùng dedicated để host"],
    ["Hợp với", "Thử nghiệm, tải biến động", "Quy mô lớn, cần cách ly, model riêng"],
  ]
)}
<p>Quy tắc ngón tay cái: <strong>bắt đầu bằng on-demand để thử nghiệm, chuyển sang dedicated khi cần quy mô, sự cách ly hoặc model tùy chỉnh.</strong></p>

<h2>Vòng đời model: đừng để bị bất ngờ</h2>
${flow([{ t: "New / Recommended", s: "mới, được khuyên dùng" }, { t: "Deprecated", s: "vẫn dùng được, đã có bản thay" }, { t: "Retired", s: "không còn — phải migrate" }], "Vòng đời model: mới và được khuyên dùng, sau đó deprecated, cuối cùng retired")}
<p>Model có phiên bản và không tồn tại mãi. Khi bị ${d("deprecated", "ngừng khuyến nghị")}, Oracle cam kết model sẽ <strong>không bị retire sớm hơn 6 tháng</strong> kể từ khi có bản thay thế đầu tiên. Lời khuyên: ghi lại phiên bản ứng dụng đang dùng, theo dõi ngày deprecation, lên kế hoạch migrate sớm. Đây chính là câu trả lời cho "tháng sau có model tốt hơn thì sao?".</p>

<h2>Đưa vào thực hành</h2>
${cards([
  { tag: "Không cần code", title: "Console Playground", body: "<p>Chọn model, chỉnh tham số, so sánh đầu ra.</p>" },
  { tag: "Xây dựng", title: "API &amp; SDK", body: "<p>Gắn model vào agent qua giao diện tương thích OpenAI, cùng các model ấy.</p>" },
])}
<p>Vài thói quen khởi đầu: dùng tham số mặc định trước; chỉnh <code>temperature</code> <strong>đầu tiên</strong>; luôn cho model một preamble (chỉ dẫn mở đầu) rõ ràng.</p>

${memo(`<p>Foundation model = huấn luyện một lần, dùng lại nhiều lần — là bộ não của agent. OCI có nhiều họ LLM, <strong>đổi model không cần viết lại app</strong>. Ba tác vụ: <strong>chat</strong> (văn bản → văn bản), <strong>embed</strong> (văn bản → vector), <strong>rerank</strong> (sắp tài liệu theo độ liên quan). Chọn model theo tốc độ, chất lượng, chi phí, context, modality. Điều khiển bằng tham số. Bắt đầu on-demand, lên dedicated khi cần; theo dõi vòng đời model.</p>`)}`,
  },

  /* ───────────────────────────── 5.4 ───────────────────────────── */
  {
    id: "m5-l4",
    code: "5.4",
    kind: "lesson",
    title: "Tùy chỉnh LLM bằng dữ liệu của bạn",
    navTitle: "Tùy chỉnh LLM & Fine-tuning",
    minutes: 11,
    source: "Customize LLMs with your data",
    html: `<p>Bạn đã biết chọn model và điều khiển bằng tham số, nhưng <em>prompt chỉ đưa bạn đi được tới một mức</em>. Khi model cần hiểu nghiệp vụ của bạn, nói đúng giọng thương hiệu, hay tuân theo đúng định dạng — bạn <strong>tùy chỉnh</strong> nó. Bài này trải toàn bộ "dải" tùy chỉnh, từ một câu chỉ dẫn tới huấn luyện lại model, rồi đi cụ thể vào fine-tuning trên OCI. (Ôn lại khái niệm RAG &amp; fine-tuning ở bài 4.6.)</p>

<h2>Vì sao phải tùy chỉnh?</h2>
<p>Foundation model học từ dữ liệu của cả thế giới nên thông minh rộng, nhưng <strong>không biết thế giới của bạn</strong>. Ba khoảng trống lặp đi lặp lại:</p>
${cards(
  [
    { tag: "Knowledge", title: "Không biết kiến thức của bạn", body: "<p>Chính sách, sản phẩm, dữ liệu nội bộ.</p>" },
    { tag: "Tone", title: "Không có giọng của bạn", body: "<p>Giọng văn thương hiệu đang dùng.</p>" },
    { tag: "Format", title: "Không theo định dạng của bạn", body: "<p>Cấu trúc chính xác mà quy trình cần.</p>" },
  ],
  3
)}

<h2>Dải tùy chỉnh: từ dễ tới tốn công</h2>
${flow([{ t: "Prompting", s: "nói rõ điều muốn" }, { t: "Few-shot", s: "thêm vài ví dụ mẫu" }, { t: "RAG", s: "chèn dữ liệu lúc chạy" }, { t: "Fine-tuning", s: "huấn luyện lại weights" }], "Dải tùy chỉnh theo mức công sức: prompting, few-shot, RAG, fine-tuning")}
${ul([
  `<strong>Prompting</strong> — chỉ đơn giản là nói với model điều bạn muốn trong chỉ dẫn.`,
  `<strong>${d("Few-shot", "vài ví dụ mẫu")}</strong> — thêm vài ví dụ đã làm sẵn ngay trong prompt.`,
  `<strong>RAG</strong> — truy xuất dữ liệu của bạn và thêm vào prompt lúc chạy, để model trả lời từ tài liệu của bạn.`,
  `<strong>${d("Fine-tuning", "tinh chỉnh — huấn luyện thêm trọng số model bằng ví dụ của bạn")}</strong> — thực sự thay đổi weights của model.`,
])}
${memo(`<p><strong>Quy tắc vàng</strong> đọc từ trái sang phải: bắt đầu đơn giản, chỉ dịch sang phải khi lựa chọn đơn giản hơn không đủ.</p>`, "Quy tắc vàng")}

<h2>Fine-tuning chính xác là gì?</h2>
<p>Lấy một base model đã pre-train, thêm các ví dụ có nhãn của bạn; quá trình huấn luyện điều chỉnh weights trên một <strong>dedicated AI cluster</strong>. Kết quả là một ${d("custom model", "mô hình tùy chỉnh")} cư xử đúng như bạn dạy, sau đó được phục vụ trên một ${d("endpoint", "điểm cuối API để gửi request")}.</p>
${cards([
  { tag: "Lợi ích", title: "Khi nào đáng làm", body: ul(["Khóa chặt một định dạng hoặc giọng văn nhất quán", "Xử lý ngôn ngữ chuyên ngành mà base model vật lộn", "Prompt ngắn hơn vì hành vi đã \"nướng\" sẵn vào model"]) },
  { tag: "Chi phí", title: "Cái giá thật", body: ul(["Cần bộ dữ liệu có nhãn", "Cần compute huấn luyện trên dedicated cluster", "Phải huấn luyện lại mỗi khi dữ liệu / nhu cầu thay đổi"]) },
])}

<h2>Ba phương pháp fine-tuning trên OCI</h2>
${table(
  ["Phương pháp", "Họ model", "Cách hoạt động", "Hợp với"],
  [
    ["<strong>T-Few</strong>", "Cohere", "Nhanh, parameter-efficient: chỉ cập nhật một phần nhỏ của model", "Bộ dữ liệu nhỏ — dưới khoảng 100.000 ví dụ"],
    ["<strong>Vanilla</strong>", "Cohere", "Huấn luyện nhiều phần mạng hơn, cho chọn số lớp (layers) cần tune", "Bộ dữ liệu lớn, cần hiểu sâu một chủ đề"],
    ["<strong>LoRA</strong> (Low-Rank Adaptation)", "Meta Llama", "Thêm các ma trận nhỏ thay vì cập nhật toàn bộ weights", "Tune model lớn một cách hiệu quả"],
  ]
)}
<p>Cả ba đều chạy trên một <strong>fine-tuning dedicated AI cluster</strong>. Chọn phương pháp theo họ model và kích thước dữ liệu.</p>

<h2>Dữ liệu huấn luyện: định dạng JSONL</h2>
<p>Fine-tuning chỉ tốt bằng dữ liệu của nó. Dữ liệu ở định dạng ${d("JSONL", "JSON Lines — mỗi dòng là một đối tượng JSON")}, mỗi dòng có hai khóa: <code>prompt</code> và <code>completion</code> (câu trả lời bạn muốn model tạo ra).</p>
${code(`{"prompt": "Nhân viên hỏi: tôi được nghỉ phép bao nhiêu ngày?", "completion": "Theo chính sách HR-12, nhân viên chính thức có 20 ngày PTO mỗi năm."}
{"prompt": "Nhân viên hỏi: làm sao reset VPN?", "completion": "Bạn vào cổng IT > VPN > Reset, sau đó kiểm tra email để đặt mật khẩu mới."}`)}
${ul([
  "Định dạng: JSONL, mỗi dòng một cặp prompt + completion.",
  "Lưu file trong một <strong>OCI Object Storage bucket</strong>.",
  "<strong>Chất lượng hơn số lượng:</strong> ví dụ sạch, nhất quán, đại diện quan trọng hơn khối lượng.",
  `Luôn giữ lại một phần làm ${d("validation set", "tập kiểm định — dữ liệu không dùng để huấn luyện")} để kiểm tra model thực sự <em>học</em> chứ không <em>học vẹt</em>.`,
])}

<h2>Quy trình 6 bước trên OCI</h2>
${steps([
  "Chuẩn bị bộ dữ liệu dạng <strong>JSONL</strong>.",
  "Upload lên một <strong>Object Storage bucket</strong>.",
  "Tạo một <strong>fine-tuning dedicated AI cluster</strong>.",
  "Tạo <strong>custom model</strong>: chọn base model, phương pháp và bộ dữ liệu.",
  "Tạo <strong>hosting cluster</strong> và một <strong>endpoint</strong> để model phục vụ request.",
  "<strong>Kiểm thử</strong> trong playground, so với base model, rồi lặp lại.",
])}

<h2>Thiết lập huấn luyện &amp; biết nó có hiệu quả không</h2>
${table(
  ["Thiết lập", "Ý nghĩa"],
  [
    ["Epochs", "Số lượt model đi qua toàn bộ dữ liệu. Quá ít → underfit; quá nhiều → overfit"],
    ["Learning rate", "Độ lớn của mỗi lần điều chỉnh weight"],
    ["Batch size", "Số ví dụ xử lý mỗi bước"],
    ["Early stopping", "Tự dừng huấn luyện khi model không còn cải thiện"],
  ]
)}
<p>Tin tốt: OCI đặt sẵn giá trị mặc định hợp lý để bạn bắt đầu. Dấu hiệu thành công: <strong>training loss giảm</strong> và <strong>accuracy tăng</strong>. Coi chừng ${d("underfitting", "chưa khớp — model không bao giờ giỏi lên")} và ${d("overfitting", "quá khớp — giỏi trên dữ liệu train nhưng kém với đầu vào mới")}. Luôn đánh giá trên <strong>validation set</strong> bạn đã giữ lại, không phải dữ liệu đã dùng để train.</p>

${memo(`<p>Tùy chỉnh giúp model tổng quát khớp với <strong>kiến thức, giọng văn và định dạng</strong> của doanh nghiệp. Dải: prompting → few-shot → RAG → fine-tuning; bắt đầu đơn giản. <strong>RAG thêm dữ liệu lúc chạy; fine-tuning thay đổi weights.</strong> Trên OCI: dữ liệu JSONL, một trong ba phương pháp (T-Few, Vanilla, LoRA), dedicated AI cluster và endpoint. Hệ thống thực tế thường <strong>kết hợp</strong>: kiến thức từ RAG + hành vi từ fine-tuning.</p>`)}`,
  },

  /* ───────────────────────────── 5.5 ───────────────────────────── */
  {
    id: "m5-l5",
    code: "5.5",
    kind: "lesson",
    title: "Embeddings & Vector Stores: tìm theo ý nghĩa",
    navTitle: "Embeddings & Vector Stores",
    minutes: 10,
    source: "Embeddings and Vector Stores",
    html: `<p>Bài này lấp mảnh ghép ta nhắc mãi: <strong>làm sao agent tìm được đúng thông tin trong dữ liệu của bạn?</strong> Câu trả lời là embeddings và vector stores. Cùng nhau, chúng vận hành ${d("semantic search", "tìm kiếm theo ngữ nghĩa")} — xương sống của grounding.</p>

<h2>Vì sao tìm theo từ khóa là chưa đủ?</h2>
<p>Nhân viên hỏi Helpdesk agent: <em>"Tôi được bao nhiêu <strong>time off</strong>?"</em> Tìm theo từ khóa sẽ đi tìm đúng cụm "time off" — nhưng tài liệu chính sách lại viết <em>vacation</em>, <em>PTO</em> hay <em>annual leave</em>. Không chữ nào chứa "time off" → tìm trượt.</p>
${table(
  ["", "Keyword search", "Semantic search"],
  [
    ["So khớp", "Từ ngữ (literal)", "Ý nghĩa"],
    ["Từ đồng nghĩa, diễn đạt khác, ngôn ngữ khác", "Không xử lý được", "Xử lý được"],
    ["“time off” vs “vacation / PTO”", "Không tìm thấy gì hữu ích", "Coi là cùng một ý → tìm ra chính sách nghỉ phép"],
  ]
)}

<h2>Embedding là gì?</h2>
<p>${d("Embedding", "nhúng — cách biến một đoạn văn bản hoặc ảnh thành vector")} biến đầu vào thành một <strong>vector</strong> — đơn giản là một danh sách số — và vector đó nắm bắt <strong>ý nghĩa</strong> của đầu vào. "annual leave" đi qua embedding model và ra một dãy số. Tính chất "thần kỳ": <strong>nghĩa giống nhau → vector nằm gần nhau; nghĩa khác nhau → nằm xa nhau.</strong></p>
${figure(meaningSpaceSvg, "Không gian ý nghĩa (giản lược thành 2 chiều): vacation, PTO, annual leave tụ thành một cụm; invoices và VPN reset nằm riêng. Câu hỏi \"time off?\" rơi ngay cạnh cụm nghỉ phép.")}

<h2>Đo "gần" như thế nào?</h2>
${figure(cosineSvg, "Cosine similarity nhìn vào góc giữa hai vector: góc nhỏ (A–B) = giống nhau; góc lớn (B–C, A–C) = khác nhau.")}
${table(
  ["Thước đo", "Đo gì"],
  [
    ["Cosine similarity", "<strong>Góc</strong> giữa hai vector — phổ biến nhất cho văn bản"],
    ["Euclidean distance", "Khoảng cách <strong>đường thẳng</strong> giữa hai điểm"],
    ["Dot product", "Kết hợp cả <strong>hướng và độ lớn</strong>"],
  ]
)}
<p>Dùng thước đo nào thì kết quả cũng vậy: vector store tìm <strong>top-K</strong> vector gần nhất — đó là kết quả tìm kiếm.</p>

<h2>Embedding model trên OCI</h2>
<p>OCI cung cấp embedding model của <strong>Cohere</strong>. Model hiện tại — <strong>Embed 4</strong> — là multimodal: nhúng văn bản, ảnh, hoặc cả hai trong một lần gọi.</p>
${ul([
  `<strong>${d("Dimension", "số chiều — độ dài của vector")}:</strong> nhiều chiều hơn → nắm chi tiết hơn nhưng tốn lưu trữ hơn. Embed 4 hỗ trợ tới <strong>1536</strong> chiều trên cả Console lẫn API.`,
  "<strong>Đa ngôn ngữ:</strong> hơn 100 ngôn ngữ.",
])}
${note("Quy tắc không được phá", `<p>Embed <strong>tài liệu và câu hỏi bằng cùng một model</strong>. Nếu không, các vector không so sánh được với nhau và việc tìm kiếm hỏng hoàn toàn.</p>`)}

<h2>Vector store: cơ sở dữ liệu cho embeddings</h2>
<p>Có embedding rồi thì cần chỗ cất. ${d("Vector store", "kho vector — cơ sở dữ liệu xây cho embeddings")}: đưa vào một câu hỏi, nó trả về top-K kết quả gần nhất — nhanh, kể cả trên hàng triệu vector. Ba nhiệm vụ:</p>
${steps([
  "<strong>Store</strong> — lưu mỗi vector cạnh văn bản gốc và metadata (nguồn, ngày…).",
  `<strong>Index</strong> — đánh chỉ mục bằng ${d("ANN index", "approximate nearest neighbor — chỉ mục láng giềng gần đúng")} để tìm vẫn nhanh khi quy mô lớn.`,
  "<strong>Retrieve</strong> — trả về top-K mục giống nhất cho mỗi câu hỏi.",
])}
<p>Giống hệt ý tưởng của một search index, chỉ là sắp xếp theo <strong>ý nghĩa</strong> thay vì từ khóa.</p>

<h2>Vector search ngay trong Oracle Database 26ai</h2>
<p>Trên Oracle bạn không cần sản phẩm riêng: vector search được tích hợp sẵn trong <strong>Oracle Database 26ai</strong>, ngay cạnh dữ liệu nghiệp vụ. Truy vấn chỉ là SQL bình thường — sắp các dòng theo khoảng cách vector giữa cột embedding đã lưu và vector câu hỏi, dùng cosine, lấy 3 dòng đầu (ví dụ minh họa):</p>
${code(`SELECT chunk_text, source
FROM   hr_policy_chunks
ORDER  BY VECTOR_DISTANCE(embedding, :query_vector, COSINE)
FETCH  FIRST 3 ROWS ONLY;`)}
${cards([
  { title: "Kiểu dữ liệu VECTOR gốc", body: "<p>Embedding là một cột hạng nhất (first-class column).</p>" },
  { title: "Toán tử VECTOR_DISTANCE", body: "<p>Hỗ trợ cosine, Euclidean, dot product.</p>" },
  { title: "Converged database", body: "<p>Vector nằm cạnh dữ liệu quan hệ, JSON, không gian (spatial) — một truy vấn trải qua tất cả.</p>" },
  { title: "Không thêm engine", body: "<p>Không phải chạy, bảo mật hay đồng bộ thêm một hệ thống riêng.</p>" },
])}
<p>(Phần 8 sẽ đi sâu vào Oracle AI Vector Search.)</p>

<h2>Lắp ráp pipeline truy xuất</h2>
<p>Pipeline có <strong>hai nửa</strong>:</p>
${cards([
  { tag: "Làm một lần", title: "Nửa đánh chỉ mục (index)", body: steps(["Lấy tài liệu", "Chunk — chia thành các đoạn", "Embed từng đoạn", "Lưu vector vào store"]) },
  { tag: "Mỗi câu hỏi", title: "Nửa truy vấn (query)", body: steps(["Embed câu hỏi", "Tìm top-K đoạn gần nhất trong store", "Rerank để đưa đoạn tốt nhất lên đầu", "Trả về các đoạn đó"]) },
])}
<p>Embedding model và vector store là "bộ máy dùng chung" của cả hai nửa. Bước cuối — gửi các đoạn tìm được cho chat model để trả lời — chính là <strong>grounding</strong>. Với Helpdesk agent: tìm ra chính sách nghỉ phép <em>theo ý nghĩa</em>, kể cả khi nhân viên nói "time off".</p>

${memo(`<p>Keyword search khớp <strong>từ</strong>; semantic search khớp <strong>nghĩa</strong>. Embedding biến văn bản/ảnh thành vector nắm bắt ý nghĩa; nghĩa gần → vector gần, đo phổ biến nhất bằng <strong>cosine similarity</strong>. Vector store đánh chỉ mục embedding và trả về top-K nhanh ở quy mô lớn. Oracle Database 26ai tích hợp vector search ngay cạnh dữ liệu của bạn. Nhớ: <strong>cùng một embedding model</strong> cho tài liệu và câu hỏi.</p>`)}`,
  },

  /* ───────────────────────────── 5.6 ───────────────────────────── */
  {
    id: "m5-l6",
    code: "5.6",
    kind: "lesson",
    title: "Grounding & RAG: trả lời từ dữ liệu, không đoán",
    navTitle: "Grounding & RAG",
    minutes: 9,
    source: "Grounding and RAG",
    html: `<p>Ta đã dành trụ cột Models để làm đúng "bộ não": chọn model, tùy chỉnh, hiểu embeddings và vector stores. Giờ bắt đầu xây chính agent, và năng lực đầu tiên nó cần là thứ khiến nó <strong>đáng tin</strong>: ${d("grounding", "neo câu trả lời vào dữ liệu thật")}. Bài này nói về RAG — cách agent trả lời từ dữ liệu của bạn thay vì đoán.</p>

<h2>Ba vấn đề của LLM "trần" trong doanh nghiệp</h2>
${cards(
  [
    { tag: "1", title: "Hallucinates — bịa", body: "<p>Vẫn trả lời trôi chảy, tự tin ngay cả khi đang bịa.</p>" },
    { tag: "2", title: "Frozen — đóng băng", body: "<p>Kiến thức dừng ở thời điểm huấn luyện; mọi thứ mới hơn đều vô hình.</p>" },
    { tag: "3", title: "Blind to you — không biết bạn", body: "<p>Chưa từng thấy chính sách, hồ sơ, tài liệu nội bộ của bạn.</p>" },
  ],
  3
)}
<p>Grounding sửa cả ba theo cùng một cách: <strong>lấy đúng sự thật từ dữ liệu của bạn trước, rồi để model trả lời dựa trên các sự thật đó.</strong> Với helpdesk, đó là khác biệt giữa <em>đoán</em> chính sách nghỉ phép và <em>trích dẫn</em> đúng chính sách thật.</p>

<h2>RAG = Retrieve → Augment → Generate</h2>
<p>Nhân viên hỏi: <em>"Chính sách nghỉ chăm con (parental leave) của công ty là gì?"</em> RAG đảm bảo câu trả lời bám đúng chính sách. Cái tên đã nói lên ba bước:</p>
${flow([{ t: "Retrieve", s: "tìm đoạn khớp câu hỏi" }, { t: "Augment", s: "chèn vào prompt" }, { t: "Generate", s: "model viết câu trả lời" }], "RAG gồm ba bước: retrieve, augment, generate")}
${steps([
  "<strong>Retrieve</strong> — tìm các đoạn trong knowledge base khớp với câu hỏi.",
  "<strong>Augment</strong> — thêm các đoạn đó vào prompt như ngữ cảnh tin cậy.",
  "<strong>Generate</strong> — model viết câu trả lời neo vào ngữ cảnh đó.",
])}

<h3>Truy xuất tìm đúng đoạn bằng cách nào? — Hybrid retrieval</h3>
${table(
  ["Kiểu tìm", "So khớp", "Mạnh ở"],
  [
    ["Keyword / lexical search", "Đúng từng thuật ngữ", "Chính xác với tên riêng, mã, ID"],
    ["Semantic / vector search", "Ý nghĩa", "Bắt được từ đồng nghĩa, cách diễn đạt khác"],
    ["<strong>Hybrid</strong> (OCI dùng)", "Chạy cả hai rồi trộn kết quả", "Trả về những đoạn tốt nhất"],
  ]
)}
${memo(`<p><strong>Retrieval mang sự thật, model mang sự trôi chảy.</strong> Thiếu một trong hai đều không đủ: retrieval không có model chỉ cho bạn tài liệu thô; model không có retrieval chỉ cho bạn những phỏng đoán đầy tự tin.</p>`, "Điều cần nhớ")}

<h2>Knowledge base: sự thật nằm ở đâu?</h2>
<p>${d("Knowledge base", "cơ sở tri thức — kho lưu trữ dựa trên vector, kết nối tới các nguồn dữ liệu")} trên OCI có thể đứng sau bởi ba loại kho:</p>
${table(
  ["Kho dữ liệu", "Đặc điểm"],
  [
    ["OCI Object Storage", "Đơn giản nhất: chỉ cần thả file vào — PDF, text, JSON, HTML, Markdown"],
    ["OpenSearch", "Cho tài liệu đã đánh chỉ mục sẵn, khi bạn muốn tự kiểm soát việc chunking (chia tài liệu thành các phần nhỏ)"],
    ["Oracle AI Database 26ai", "Dùng AI Vector Search (bài 5.5); làm việc trên cả dữ liệu có cấu trúc lẫn phi cấu trúc, ngay cạnh dữ liệu nghiệp vụ"],
  ]
)}
<p>Chọn kho nào cũng vậy, một ${d("ingestion job", "tác vụ nạp dữ liệu")} sẽ biến tài liệu thành các vector tìm kiếm được để agent truy xuất.</p>

<h2>Hai cách xây RAG trên OCI</h2>
${cards([
  {
    tag: "Không code",
    title: "OCI Enterprise AI Agents (managed)",
    body: `<p>Trong Console: tạo knowledge base, gắn một <strong>RAG tool</strong>, trỏ tới Object Storage, OpenSearch hoặc 26ai rồi deploy. Dịch vụ còn cung cấp các tool <strong>SQL, function, HTTP và agent</strong>.</p>`,
  },
  {
    tag: "Viết code",
    title: "OCI Responses API",
    body: `<p>Dùng tool <strong>File Search</strong> trên files và vector stores. Tương thích OpenAI, chạy trên endpoint OCI — là cách chính để xây agent bằng code (hướng đi của các bài tiếp theo).</p>`,
  },
])}
<p>Cùng một ý tưởng, hai con đường: <strong>RAG nằm trong dịch vụ managed; File Search nằm trong Responses API.</strong></p>

<h2>Xây RAG không cần code: 6 bước trong Console</h2>
${steps([
  "Upload tài liệu lên một <strong>Object Storage bucket</strong>.",
  "Tạo một <strong>knowledge base</strong> — kho lưu trữ dựa trên vector.",
  "Thêm một <strong>data source</strong> trỏ tới bucket.",
  "Chạy <strong>ingestion job</strong> để biến tài liệu thành vector.",
  "Thêm <strong>RAG tool</strong> vào agent.",
  "<strong>Chat</strong> với agent, hoặc mở một endpoint để người khác dùng.",
])}
<p>Chỉ trong khoảng thời gian mô tả các bước, bạn đã có một agent "grounded" trả lời từ chính file của mình.</p>

${memo(`<p>Grounding khiến agent trả lời từ <strong>dữ liệu của bạn</strong> thay vì phỏng đoán của model. RAG: <strong>retrieve → augment → generate</strong>. Knowledge base kết nối Object Storage, OpenSearch hoặc Oracle 26ai. <strong>Hybrid retrieval</strong> trộn tìm theo từ khóa và theo ngữ nghĩa; câu trả lời grounded <strong>trích dẫn nguồn</strong>. Xây không cần code với RAG tool managed, hoặc bằng code với File Search của Responses API.</p>`)}`,
  },
];
