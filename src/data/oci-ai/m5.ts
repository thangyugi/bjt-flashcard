import type { OciModule } from "./types";
import { figure, sum, sumGrid } from "./authoring";
import { m5a } from "./m5a";
import { m5b } from "./m5b";

/* Phần 5 — module 6 khóa gốc "OCI Enterprise AI". Nguồn: docs/OCIAI/From 6. OCI Enterprise AI.txt */

const mapSvg = `<svg class="svg-diagram" viewBox="0 0 700 300" role="img" aria-label="Sơ đồ Phần 5: agent ở trung tâm, ba trụ cột Models, Agents, Governance cùng các bài học thuộc mỗi trụ cột.">
<g fill="currentColor" text-anchor="middle">
  <rect x="270" y="12" width="160" height="56" rx="14" fill="currentColor" fill-opacity=".09" stroke="currentColor" stroke-width="2"/>
  <text x="350" y="36" font-size="13.5" font-weight="800">AI Agent</text>
  <text x="350" y="54" font-size="10.5" opacity=".75">5.1 · 5.2 LLM + tools + loop + memory</text>

  <rect x="12" y="104" width="210" height="180" rx="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="117" y="130" font-size="13" font-weight="800">Models (brain)</text>
  <g font-size="11"><text x="117" y="160">5.3 Chọn &amp; điều chỉnh model</text><text x="117" y="184">5.4 Tùy chỉnh / fine-tuning</text><text x="117" y="208">5.5 Embeddings &amp; vector store</text></g>

  <rect x="245" y="104" width="210" height="180" rx="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="350" y="130" font-size="13" font-weight="800">Agents (action)</text>
  <g font-size="11"><text x="350" y="160">5.6 Grounding &amp; RAG</text><text x="350" y="184">5.7 Responses API</text><text x="350" y="208">5.8 Tools &amp; function calling</text><text x="350" y="232">5.9 MCP</text><text x="350" y="256">5.10 Memory</text></g>

  <rect x="478" y="104" width="210" height="180" rx="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="583" y="130" font-size="13" font-weight="800">Governance (trust)</text>
  <g font-size="11"><text x="583" y="160">5.11 Security &amp; access</text><text x="583" y="184">5.12 Guardrails &amp;</text><text x="583" y="200">Responsible AI</text></g>
</g>
<g stroke="currentColor" stroke-width="1.3" opacity=".7"><line x1="300" y1="68" x2="150" y2="102"/><line x1="350" y1="68" x2="350" y2="102"/><line x1="400" y1="68" x2="550" y2="102"/></g>
</svg>`;

export const m5: OciModule = {
  id: "m5",
  num: 5,
  origModule: 6,
  title: "OCI Enterprise AI",
  desc: "AI agent, nền tảng OCI Enterprise AI (models · agents · governance), chọn & tùy chỉnh model, embeddings, RAG, Responses API, tools, MCP, memory, bảo mật và guardrails.",
  lessons: [
    ...m5a,
    ...m5b,
    {
      id: "m5-summary",
      code: "★",
      kind: "summary",
      title: "★ Tổng kết Phần 5 & Trắc nghiệm",
      navTitle: "Tổng kết & Trắc nghiệm",
      note: "Ôn lại 12 bài học + làm 10 câu trắc nghiệm",
      html: `<p>Mười hai bài của Phần 5 đi theo đúng hành trình đưa một agent lên production: hiểu <em>agent là gì</em>, chọn <em>bộ não</em> (models), cho nó <em>tri thức và đôi tay</em> (RAG, tools, MCP, memory), rồi làm nó <em>đáng tin</em> (security, guardrails). Xuyên suốt là ví dụ Helpdesk agent.</p>

${figure(mapSvg, "Ba trụ cột của OCI Enterprise AI và các bài học tương ứng — models cho trí thông minh, agents cho hành động, governance cho niềm tin.")}

${sumGrid([
  sum("5.1 — AI Agent", ["Chatbot trả lời; workflow chạy bước cố định; agent tự quyết bước tiếp theo.", "Agent = LLM + tools + loop + memory; vòng lặp reason → act → observe."]),
  sum("5.2 — OCI Enterprise AI", ["3 lớp: user/app · runtime · agent logic. Runtime tự xây (quý) hoặc managed (tuần).", "3 trụ cột: Models (brain), Agents (action), Governance (trust, 4 lớp).", "Grounding trên dữ liệu của bạn = enterprise AI."]),
  sum("5.3 — Models", ["Foundation model: pre-trained, general, ready to use; 5 họ, 1 API.", "Chat / embed / rerank. Chọn theo tốc độ–chất lượng–chi phí, context, modality, reasoning.", "Temperature thấp cho câu trả lời sự thật. On-demand → dedicated. Deprecated ≥ 6 tháng trước khi retire."]),
  sum("5.4 — Tùy chỉnh LLM", ["Khoảng trống: knowledge, tone, format.", "Prompting → few-shot → RAG → fine-tuning; bắt đầu đơn giản.", "T-Few, Vanilla (Cohere), LoRA (Llama); JSONL prompt/completion; 6 bước; đánh giá bằng validation set."]),
  sum("5.5 — Embeddings & Vector Stores", ["Semantic search khớp nghĩa, keyword search khớp từ.", "Cosine similarity phổ biến nhất; top-K.", "Cohere Embed 4: multimodal, ≤1536 chiều, 100+ ngôn ngữ; cùng model cho tài liệu & câu hỏi.", "Vector search có sẵn trong Oracle Database 26ai."]),
  sum("5.6 — Grounding & RAG", ["LLM trần: bịa, đóng băng, không biết bạn.", "Retrieve → augment → generate; hybrid = keyword + semantic.", "Knowledge base: Object Storage, OpenSearch, 26ai. No-code (RAG tool) hoặc code (File Search)."]),
  sum("5.7 — Responses API", ["Một lời gọi: model, suy luận, điều phối, trạng thái, tool.", "Tương thích OpenAI, dữ liệu ở lại OCI; project cách ly tài nguyên.", "4 tool: File Search, Code Interpreter, Function Calling, MCP Calling; previous_response_id."]),
  sum("5.8 — Tools & Function Calling", ["Model chỉ nói, tool cho nó hành động.", "Hai lời gọi: model chọn → app chạy → model trả lời.", "Description là phần quan trọng nhất; mỗi tool một việc."]),
  sum("5.9 — MCP", ["Chuẩn mở (2024), JSON-RPC 2.0, Agentic AI Foundation; “USB-C cho AI”.", "N×M → N+M; host / client / server; tools · resources · prompts.", "Trên OCI, nền tảng gọi thẳng remote MCP server qua Streamable HTTP."]),
  sum("5.10 — Memory", ["Mặc định stateless.", "Short-term: Conversations API + previous_response_id; compaction cho hội thoại dài.", "Long-term: gắn subject ID trong project; API-managed là mặc định."]),
  sum("5.11 — Security", ["Who / what / how. Defense in depth: network · identity · data.", "IAM: group + verb nhỏ nhất + compartment; inspect → read → use → manage.", "AuthN trước AuthZ; private endpoint; dữ liệu không lưu, không chia sẻ."]),
  sum("5.12 — Guardrails", ["Kiểm tra input và output tại ranh giới.", "Content moderation · prompt injection (0–1) · PII detection.", "Inform (báo) → block (chặn); che PII thay vì từ chối."]),
])}

<h2>Trắc nghiệm ôn tập Phần 5</h2>
<p>Chọn một đáp án cho mỗi câu rồi bấm <strong>Nộp bài</strong>. Sau khi nộp, mọi lựa chọn sẽ hiện giải thích vì sao đúng / vì sao sai.</p>`,
      quiz: [
        {
          q: "Điều gì phân biệt một AI agent với chatbot và workflow?",
          options: [
            { text: "Agent luôn chạy theo một chuỗi bước cố định do người thiết kế định sẵn.", correct: false, explain: "Sai. Đó là mô tả của <strong>workflow</strong> — như dây chuyền lắp ráp." },
            { text: "Agent tự suy nghĩ và quyết định bước tiếp theo một cách linh hoạt, dùng tools, vòng lặp và memory.", correct: true, explain: "Đúng. Agent = LLM + tools + loop + memory, tự quyết định các bước của mình (bài 5.1)." },
            { text: "Agent chỉ trả lời đúng câu người dùng hỏi, như một lễ tân.", correct: false, explain: "Sai. Đó là <strong>chatbot</strong>." },
            { text: "Agent không cần model ngôn ngữ, chỉ cần các API.", correct: false, explain: "Sai. LLM chính là “bộ não” — một trong bốn khối xây dựng của agent." },
          ],
        },
        {
          q: "Ba trụ cột của OCI Enterprise AI tương ứng với vai trò nào?",
          options: [
            { text: "Models = trust layer; Agents = brain layer; Governance = action layer.", correct: false, explain: "Sai — các vai trò bị xáo trộn." },
            { text: "Models = brain layer; Agents = action layer; Governance = trust layer.", correct: true, explain: "Đúng. Models cho trí thông minh, Agents cho khả năng hành động, Governance cho sự an toàn và tuân thủ (bài 5.2)." },
            { text: "Chỉ có hai trụ cột: Models và Agents; governance là tùy chọn gắn thêm ở cuối.", correct: false, explain: "Sai. Governance là trụ cột thứ ba và mang tính xuyên suốt — áp dụng ở mọi giai đoạn, không gắn thêm ở cuối." },
            { text: "Compute = brain; Storage = action; Network = trust.", correct: false, explain: "Sai. Đây không phải cách nền tảng được tổ chức." },
          ],
        },
        {
          q: "Trong chuỗi chất lượng RAG, khâu <strong>rerank</strong> quyết định điều gì?",
          options: [
            { text: "Recall — có tìm được tài liệu liên quan hay không.", correct: false, explain: "Sai. Recall do chất lượng <strong>embed</strong> quyết định." },
            { text: "Precision — đưa đúng những tài liệu liên quan nhất lên đầu trước khi gửi cho chat model.", correct: true, explain: "Đúng. Rerank chấm lại ~50 ứng viên bằng mô hình chính xác hơn và chỉ giữ top 5–10 (bài 5.2, 5.5)." },
            { text: "Generation — câu trả lời cuối được viết hay đến đâu.", correct: false, explain: "Sai. Generation do <strong>chat model</strong> quyết định." },
            { text: "Số chiều của vector embedding.", correct: false, explain: "Sai. Số chiều là thuộc tính của embedding model, không liên quan tới rerank." },
          ],
        },
        {
          q: "Khi nào <strong>bắt buộc</strong> phải dùng chế độ Dedicated thay vì On-demand?",
          options: [
            { text: "Khi muốn thử nghiệm nhanh với tải biến động.", correct: false, explain: "Sai. Đây chính là trường hợp hợp với <strong>on-demand</strong>." },
            { text: "Khi muốn trả tiền theo từng token.", correct: false, explain: "Sai. Trả theo token là đặc điểm của on-demand; dedicated tính theo unit-hour có cam kết." },
            { text: "Khi cần host một model tùy chỉnh / fine-tuned.", correct: true, explain: "Đúng. Model custom hoặc fine-tuned cần dedicated AI cluster; dedicated cũng hợp khi cần quy mô và sự cách ly (bài 5.3)." },
            { text: "Khi model đã bị retire.", correct: false, explain: "Sai. Model đã retire thì không còn dùng được ở chế độ nào — phải migrate." },
          ],
        },
        {
          q: "Phương pháp fine-tuning nào dành cho họ <strong>Meta Llama</strong> và hoạt động bằng cách thêm các ma trận nhỏ thay vì cập nhật toàn bộ weights?",
          options: [
            { text: "T-Few", correct: false, explain: "Sai. T-Few dành cho Cohere, hợp bộ dữ liệu nhỏ (dưới ~100.000 ví dụ)." },
            { text: "Vanilla", correct: false, explain: "Sai. Vanilla dành cho Cohere, huấn luyện nhiều lớp hơn cho bộ dữ liệu lớn." },
            { text: "LoRA (Low-Rank Adaptation)", correct: true, explain: "Đúng. LoRA thêm các ma trận low-rank nhỏ, giúp tune model lớn hiệu quả (bài 5.4)." },
            { text: "Few-shot", correct: false, explain: "Sai. Few-shot là thêm ví dụ vào prompt — không huấn luyện weights." },
          ],
        },
        {
          q: "Quy tắc “không được phá” khi dùng embedding cho tìm kiếm ngữ nghĩa là gì?",
          options: [
            { text: "Luôn dùng Euclidean distance thay vì cosine.", correct: false, explain: "Sai. Cosine là thước đo phổ biến nhất cho văn bản; không có quy định bắt buộc Euclidean." },
            { text: "Embed tài liệu và câu hỏi bằng cùng một embedding model.", correct: true, explain: "Đúng. Nếu khác model, các vector không so sánh được và việc tìm kiếm hỏng (bài 5.5)." },
            { text: "Không bao giờ chia nhỏ (chunk) tài liệu.", correct: false, explain: "Sai. Chunking là bước chuẩn của nửa đánh chỉ mục trong pipeline truy xuất." },
            { text: "Chỉ embed văn bản tiếng Anh.", correct: false, explain: "Sai. Cohere Embed 4 hỗ trợ hơn 100 ngôn ngữ." },
          ],
        },
        {
          q: "Trong function calling, ai là bên thực sự <strong>chạy</strong> hàm <code>reset_vpn</code>?",
          options: [
            { text: "Model tự chạy hàm rồi trả kết quả.", correct: false, explain: "Sai. Model chỉ trả về tên hàm và đối số JSON — nó không chạy gì cả." },
            { text: "Ứng dụng của bạn — sau đó gửi kết quả lại để model viết câu trả lời cuối.", correct: true, explain: "Đúng. “Model chọn, app thực thi, model kết luận” — vòng lặp hai lời gọi (bài 5.8)." },
            { text: "Người dùng phải tự chạy hàm.", correct: false, explain: "Sai. Người dùng không hề thấy vòng lặp hai lời gọi." },
            { text: "OCI luôn chạy mọi loại tool bên trong nền tảng.", correct: false, explain: "Sai. Đó là platform tools (File Search, Code Interpreter, MCP). Function tools chạy phía client." },
          ],
        },
        {
          q: "Vì sao MCP giảm độ phức tạp tích hợp từ 12 xuống 7 với 3 ứng dụng và 4 tool?",
          options: [
            { text: "Vì MCP gộp 4 tool thành 1 tool duy nhất.", correct: false, explain: "Sai. Các tool vẫn riêng biệt — mỗi tool cung cấp một MCP server." },
            { text: "Vì mỗi app chỉ cần một MCP client và mỗi tool chỉ cần một MCP server: 3 + 4 = 7.", correct: true, explain: "Đúng. Chuyển từ N × M (bậc hai) sang N + M (tuyến tính) nhờ chuẩn chung (bài 5.9)." },
            { text: "Vì MCP chỉ cho phép tối đa 7 kết nối.", correct: false, explain: "Sai. Không có giới hạn như vậy." },
            { text: "Vì MCP bỏ qua các tool không dùng tới.", correct: false, explain: "Sai. Lợi ích đến từ việc chuẩn hóa kết nối, không phải bỏ tool." },
          ],
        },
        {
          q: "Người dùng nói “tôi thích họp buổi chiều” vào thứ Hai, rồi trong một cuộc chat <strong>mới</strong> vào thứ Năm agent vẫn nhớ. Đó là nhờ gì?",
          options: [
            { text: "Short-term memory với previous_response_id.", correct: false, explain: "Sai. Short-term chỉ giữ ngữ cảnh trong <em>một</em> cuộc hội thoại." },
            { text: "Compaction.", correct: false, explain: "Sai. Compaction nén lịch sử của một hội thoại dài, không mang ký ức sang cuộc chat khác." },
            { text: "Long-term memory gắn với subject ID trong project.", correct: true, explain: "Đúng. Long-term memory bền vững, xuyên hội thoại, gắn với một người qua subject ID (bài 5.10)." },
            { text: "Model tự nhớ vì LLM có bộ nhớ nội tại.", correct: false, explain: "Sai. LLM mặc định stateless, không giữ bộ nhớ nội tại." },
          ],
        },
        {
          q: "Chế độ guardrail nào phát hiện vi phạm nhưng vẫn chạy request và trả kết quả kiểm tra kèm phản hồi?",
          options: [
            { text: "Block", correct: false, explain: "Sai. Block từ chối request vi phạm và trả về lỗi theo thời gian thực." },
            { text: "Inform", correct: true, explain: "Đúng. Inform phát hiện và báo cáo — hợp khi đang tinh chỉnh; sau đó chuyển sang block khi chính sách ổn định (bài 5.12)." },
            { text: "Mask", correct: false, explain: "Sai. Che (mask) là cách xử lý PII, không phải chế độ thực thi guardrail." },
            { text: "Least privilege", correct: false, explain: "Sai. Least privilege là nguyên tắc IAM (bài 5.11)." },
          ],
        },
      ],
    },
  ],
};
