import type { OciModule } from "./types";
import { arrowDefs, cards, chat, code, d, example, figure, flow, memo, note, steps, sum, sumGrid, table, ul } from "./authoring";

/* Phần 8 — module 9 khóa gốc "Agentic AI for Database". Nguồn: docs/OCIAI/From 6. OCI Enterprise AI.txt (mục "====== 9. Agentic AI for Database") */

const mapSvg = `<svg class="svg-diagram" viewBox="0 0 640 290" role="img" aria-label="Bản đồ ngữ nghĩa: dog, puppy, canine nằm gần nhau; car nằm xa.">
<g fill="none" stroke="currentColor" opacity=".3"><line x1="40" y1="250" x2="600" y2="250"/><line x1="40" y1="250" x2="40" y2="20"/></g>
<ellipse cx="200" cy="120" rx="120" ry="60" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-dasharray="5 4"/>
<g fill="currentColor" font-size="13" font-weight="600">
  <circle cx="150" cy="105" r="6"/><text x="162" y="101">dog</text>
  <circle cx="230" cy="95" r="6"/><text x="242" y="91">puppy</text>
  <circle cx="200" cy="145" r="6"/><text x="212" y="149">canine</text>
  <circle cx="500" cy="200" r="6" opacity=".6"/><text x="512" y="204">car</text>
</g>
<text x="200" y="45" font-size="11" fill="currentColor" opacity=".75" text-anchor="middle">cụm “chó” — gần nhau vì cùng nghĩa</text>
<text x="500" y="230" font-size="11" fill="currentColor" opacity=".75" text-anchor="middle">khác nghĩa → ở xa</text>
</svg>`;

const [inDefs, inId] = arrowDefs();
const insideSvg = `<svg class="svg-diagram" viewBox="0 0 700 250" role="img" aria-label="So sánh: bên trái agent bên ngoài database phải xuất dữ liệu, gọi LLM ở tầng ứng dụng; bên phải Select AI Agent nằm trong database, dùng lại bảo mật, audit và connection pool.">
${inDefs}
<g fill="currentColor" text-anchor="middle">
  <text x="170" y="22" font-size="12.5" font-weight="700">Cách phổ biến: agent ở NGOÀI</text>
  <rect x="40" y="38" width="260" height="56" rx="12" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="170" y="62" font-size="12" font-weight="700">Orchestrator (Python / JS)</text><text x="170" y="80" font-size="10" opacity=".75">LangChain · LangGraph · script</text>
  <rect x="40" y="160" width="260" height="56" rx="12" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="170" y="192" font-size="12" font-weight="700">Oracle AI Database</text>
  <text x="104" y="132" font-size="10" opacity=".8">xuất dữ liệu</text>
  <text x="236" y="132" font-size="10" opacity=".8">glue code</text>

  <text x="530" y="22" font-size="12.5" font-weight="700">Select AI Agent: agent ở TRONG</text>
  <rect x="380" y="38" width="300" height="190" rx="14" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="2"/>
  <text x="530" y="60" font-size="12" font-weight="700">Oracle AI Database</text>
  <rect x="410" y="74" width="240" height="44" rx="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="530" y="100" font-size="12" font-weight="700">Agent (PL/SQL) + tables</text>
  <g font-size="10.5"><text x="530" y="146">RBAC · Virtual Private Database</text><text x="530" y="166">encryption · audit logs</text><text x="530" y="186">connection pool</text></g>
  <text x="530" y="214" font-size="10" opacity=".75">dùng lại sẵn — không thêm hạ tầng</text>
</g>
<g stroke="currentColor" stroke-width="1.5"><line x1="120" y1="158" x2="120" y2="98" marker-end="url(#${inId})"/><line x1="220" y1="96" x2="220" y2="156" marker-end="url(#${inId})"/></g>
</svg>`;

export const m8: OciModule = {
  id: "m8",
  num: 8,
  origModule: 9,
  title: "Agentic AI for Oracle AI Database",
  desc: "AI Vector Search ngay trong Oracle Database, quy trình embedding – index – truy vấn, khung Select AI Agent, Agent Factory và MCP Server được quản lý sẵn.",
  lessons: [
    /* ───────────────────────────── 8.1 ───────────────────────────── */
    {
      id: "m8-l1",
      code: "8.1",
      kind: "lesson",
      title: "Agentic AI trong Oracle AI Database: toàn cảnh",
      navTitle: "Tổng quan Agentic AI cho Database",
      minutes: 6,
      source: "Agentic AI for Oracle AI Database",
      html: `<p>Bài này nhìn tổng quan các năng lực <strong>agentic AI</strong> có sẵn trong <strong>Oracle AI Database</strong>. Các bài sau sẽ đi sâu từng mảng.</p>

${table(
  ["Thành phần", "Là gì"],
  [
    ["<strong>Oracle AI Vector Search</strong>", "Tính năng tích hợp sẵn trong Oracle AI Database: lưu, đánh chỉ mục và tìm kiếm vector embedding <strong>ngay cạnh dữ liệu nghiệp vụ truyền thống</strong>, tất cả trong một hệ thống"],
    ["<strong>Autonomous AI Vector Database</strong>", "Vector database được quản lý hoàn toàn, giúp lập trình viên AI nhanh chóng xây semantic search, RAG và ứng dụng agentic"],
    ["<strong>Agent Factory</strong>", "Nền tảng <strong>no-code</strong> cho người dùng nghiệp vụ và kỹ sư để nhanh chóng xây, kiểm thử, triển khai agent thông minh mà không viết code. Có sẵn hai agent dựng sẵn — <strong>knowledge agent</strong> và <strong>data analysis agent</strong> — cùng Visual Builder và template cho workflow agentic tùy chỉnh"],
    ["<strong>Select AI Agent</strong>", "Khung agent tự hành (autonomous agent framework) đi kèm Oracle AI Database. Agent là “công dân” của database: dùng LLM cấu hình qua <strong>AI profile</strong>, truy cập dữ liệu doanh nghiệp qua SQL và tools, quản lý bằng các gói PL/SQL"],
    ["<strong>Autonomous AI Database MCP Server</strong>", "Cho agent và MCP client bên ngoài truy cập Autonomous AI Database an toàn, không cần code tích hợp tùy biến hay quản trị bảo mật thủ công. Không phải MCP server bên thứ ba tải về chạy cạnh database — nó là <strong>một phần của Database Service</strong>: bật lên là chính database trả lời request MCP"],
    ["<strong>Oracle Deep Data Security</strong>", "Thế hệ kiểm soát truy cập dữ liệu mới để chống các mối đe dọa của thời đại AI"],
  ]
)}

<h2>Từ khóa quan trọng: “inside”</h2>
<p>Đa số framework agent ngày nay (vd. LangChain, OpenAI Agents SDK) sống trong <em>code ứng dụng</em> và với vào database từ <em>bên ngoài</em>. Select AI Agent <strong>lật ngược</strong> điều đó: agent nằm <strong>bên trong</strong> database. Đây là sợi chỉ xuyên suốt Phần 8.</p>
${flow([{ t: "Vector Search", s: "8.2 · 8.3" }, { t: "Select AI Agent", s: "8.4" }, { t: "MCP Server", s: "8.5" }], "Lộ trình Phần 8: vector search, Select AI Agent, MCP Server")}

${memo(`<p>Oracle AI Database mang AI vào <strong>bên trong</strong> database: <strong>AI Vector Search</strong> (vector cạnh dữ liệu nghiệp vụ), <strong>Autonomous AI Vector Database</strong> (managed), <strong>Agent Factory</strong> (no-code, knowledge agent + data analysis agent), <strong>Select AI Agent</strong> (agent là công dân của database, PL/SQL), <strong>MCP Server</strong> (do database cung cấp), <strong>Deep Data Security</strong>.</p>`)}`,
    },

    /* ───────────────────────────── 8.2 ───────────────────────────── */
    {
      id: "m8-l2",
      code: "8.2",
      kind: "lesson",
      title: "Giới thiệu Oracle AI Vector Search",
      navTitle: "Oracle AI Vector Search",
      minutes: 7,
      source: "Introduction to Oracle AI Vector Search",
      html: `<p>Bài này nói về embeddings, vectors và giới thiệu Oracle AI Vector Search. (Nếu cần ôn, xem lại bài 5.5 về embeddings &amp; vector stores.)</p>

<h2>Bài toán cốt lõi</h2>
<p>Tìm kiếm database truyền thống dựa trên <strong>so khớp từ khóa chính xác</strong>. Tìm "canine" sẽ không ra tài liệu nói về "dog" — gây khó chịu cho người dùng, vì họ quan tâm tới <em>ý nghĩa</em>, không phải từng chữ. ${d("Semantic search", "tìm kiếm ngữ nghĩa")} chạy bằng vector giải quyết điều này: chuyển văn bản thành biểu diễn toán học nắm bắt ý nghĩa, nên "canine" và "dog" nằm gần nhau trong không gian vector và một phép tìm tương đồng sẽ ra cả hai. Oracle AI Vector Search đưa năng lực này <strong>vào thẳng Oracle Database</strong>, kết hợp được với truy vấn SQL thông thường.</p>

<h2>Khái niệm cốt lõi</h2>
${cards([
  { title: "Vector", body: "<p>Chỉ là một <strong>danh sách số</strong>. Hãy nghĩ như tọa độ GPS — nhưng có hàng trăm hoặc hàng nghìn chiều thay vì 2.</p>" },
  { title: "Embedding model", body: "<p>Mạng nơ-ron chuyển dữ liệu — văn bản, ảnh, âm thanh — thành vector. Điều kỳ diệu: <strong>thứ giống nhau có vector giống nhau</strong>.</p>" },
])}
${figure(mapSvg, "Hình dung một tấm bản đồ nơi mỗi từ, câu, tài liệu có một vị trí: “dog”, “puppy”, “canine” tụ lại vì cùng nghĩa; “car” ở rất xa.")}
<p>Oracle thậm chí có thể chạy embedding model định dạng ${d("ONNX", "Open Neural Network Exchange — định dạng mô hình mở")} <strong>ngay trong database</strong>.</p>

<h2>Pipeline tạo embedding</h2>
${flow([{ t: "Input", s: "văn bản, ảnh, âm thanh" }, { t: "Tokenizer", s: "cắt thành token" }, { t: "Neural network", s: "thường là transformer" }, { t: "Vector", s: "= embedding" }], "Pipeline tạo embedding: dữ liệu đầu vào, tokenizer, mạng nơ-ron transformer, ra vector embedding", 3)}
${steps([
  "Dữ liệu đầu vào (văn bản, ảnh, âm thanh) đi vào pipeline.",
  `${d("Tokenizer", "bộ tách token")} cắt văn bản thành token (các mảnh từ). Ví dụ tokenizer của BERT tách câu <em>"embedding use case for chunking"</em> thành <strong>8 token</strong>.`,
  "Một mạng nơ-ron (thường là transformer) xử lý các token và sinh ra một vector nắm bắt ý nghĩa của toàn bộ đầu vào — gọi là <strong>embedding</strong>.",
])}
${note("Giới hạn token", `<p>Tokenizer giới hạn số token xử lý được mỗi lần — thường khoảng <strong>512</strong>. Vì vậy tài liệu lớn cần <strong>chunking</strong> (bài 8.3).</p>`)}

<h2>Không phải sản phẩm riêng — nằm ngay trong Oracle Database</h2>
${cards([
  { title: "Không thêm vector database", body: "<p>Không phải dựng và bảo trì một vector database riêng (như Pinecone). Vector nằm ngay cạnh khách hàng, đơn hàng, sản phẩm — tất cả một chỗ.</p>" },
  { title: "SQL chuẩn", body: "<p>Hàm <code>VECTOR_DISTANCE</code> tìm các mục tương tự, kết hợp được với mệnh đề <code>WHERE</code> thông thường.</p>" },
  { title: "Tính năng doanh nghiệp", body: "<p>Có đủ bảo mật, giao dịch (transactions), sao lưu và khả năng mở rộng của Oracle.</p>" },
])}
${example(`<p>“Tìm những căn nhà <strong>trông giống bức ảnh này</strong>, giá <strong>dưới 500 nghìn USD</strong>, ở <strong>New York City</strong>” — tất cả trong <strong>một truy vấn</strong>: một phần là tìm theo vector, một phần là lọc SQL thông thường.</p>`, "Sức mạnh của kết hợp")}
${code(`SELECT house_id, price, city
FROM   houses
WHERE  price < 500000 AND city = 'New York City'
ORDER  BY VECTOR_DISTANCE(photo_embedding, :photo_vector, COSINE)
FETCH  FIRST 10 ROWS ONLY;   -- minh họa`)}

${memo(`<p>Từ khóa khớp chữ ("canine" ≠ "dog"); vector khớp nghĩa. Vector = danh sách số nhiều chiều; embedding model biến dữ liệu thành vector. Pipeline: input → <strong>tokenizer</strong> → <strong>transformer</strong> → embedding; giới hạn ~512 token nên cần chunking. Oracle AI Vector Search nằm <strong>trong</strong> database, dùng SQL chuẩn + <code>VECTOR_DISTANCE</code>, chạy được mô hình <strong>ONNX</strong> tại chỗ.</p>`)}`,
    },

    /* ───────────────────────────── 8.3 ───────────────────────────── */
    {
      id: "m8-l3",
      code: "8.3",
      kind: "lesson",
      title: "Quy trình Oracle AI Vector Search",
      navTitle: "Vector Search Workflow",
      minutes: 11,
      source: "Oracle AI Vector Search Workflow",
      html: `<p>Bài này đi qua <strong>toàn bộ quy trình</strong> Oracle AI Vector Search — từ tạo embedding tới dùng kết quả cho RAG — cùng các lựa chọn về kiểu dữ liệu, chỉ mục và thước đo khoảng cách.</p>

<h2>Quy trình 5 bước</h2>
${steps([
  "<strong>Generate embeddings</strong> — trong database bằng mô hình ONNX, hoặc bên ngoài qua REST API của OpenAI, Cohere…",
  "<strong>Store vectors</strong> — lưu trong bảng Oracle bằng kiểu dữ liệu <code>VECTOR</code>, cạnh dữ liệu nghiệp vụ.",
  "<strong>Create vector indexes</strong> — không có index, tìm tương đồng phải quét mọi vector: ổn với hàng nghìn, nhưng rất chậm với hàng triệu.",
  "<strong>Run similarity queries</strong> — <code>VECTOR_DISTANCE</code> kết hợp các điều kiện SQL chuẩn.",
  "<strong>Use for RAG</strong> — đưa các đoạn liên quan cho LLM (retrieval-augmented generation).",
])}

<h2>Hai cách tạo embedding</h2>
${table(
  ["", "In-database (trong database)", "External (bên ngoài)"],
  [
    ["Cách làm", "Import mô hình định dạng ONNX (vd. <em>all-MiniLM-L12-v2</em> của Hugging Face) vào database, rồi dùng hàm SQL <code>VECTOR_EMBEDDING</code>", "Gọi REST API bên thứ ba (OpenAI, Cohere) qua PL/SQL"],
    ["Ưu điểm", "<strong>Không gọi mạng, không độ trễ mạng, dữ liệu không rời database</strong>", "Truy cập các mô hình embedding <strong>mới nhất, mạnh nhất</strong>"],
    ["Engine", "ONNX Runtime tích hợp sẵn của Oracle", "Gói <code>DBMS_VECTOR_CHAIN</code> với các hàm tiện ích nối chuỗi được"],
  ]
)}

<h2>Chunking: chia tài liệu lớn</h2>
<p>Embedding model chỉ xử lý được số token giới hạn mỗi lần — thường khoảng <strong>512</strong>. Một file PDF 100 trang phải được chia thành các ${d("chunk", "đoạn nhỏ có nghĩa")} trước. Oracle cung cấp ba hàm tiện ích nối chuỗi được:</p>
${flow([{ t: "UTL_TO_TEXT", s: "PDF, Word → văn bản" }, { t: "UTL_TO_CHUNKS", s: "chia thành đoạn" }, { t: "UTL_TO_EMBEDDINGS", s: "sinh vector mỗi đoạn" }], "Ba hàm tiện ích: UTL_TO_TEXT chuyển PDF và Word thành văn bản, UTL_TO_CHUNKS chia đoạn, UTL_TO_EMBEDDINGS sinh vector")}
<p>Điều tuyệt vời: <strong>nối cả ba trong một câu lệnh SQL INSERT duy nhất</strong> — nhận PDF, chuyển thành văn bản, chia đoạn, sinh embedding và lưu tất cả một lượt. Hàm chunking hỗ trợ nhiều chiến lược — theo <strong>từ, câu, hoặc đoạn văn</strong> — và tùy chỉnh được tham số như <strong>kích thước chunk</strong> và <strong>độ chồng lấn (overlap)</strong>.</p>
${code(`-- minh họa ý tưởng: PDF -> text -> chunks -> embeddings trong 1 câu INSERT
INSERT INTO doc_chunks (doc_id, chunk_text, embedding)
SELECT d.id, c.chunk_text, c.embedding
FROM   docs d,
       DBMS_VECTOR_CHAIN.UTL_TO_EMBEDDINGS(
         DBMS_VECTOR_CHAIN.UTL_TO_CHUNKS(
           DBMS_VECTOR_CHAIN.UTL_TO_TEXT(d.file_blob),
           :chunk_params),
         :embed_params) c;`)}
${note("Ví dụ minh họa", `<p>Câu lệnh trên minh họa cách <em>nối chuỗi</em> ba hàm; cú pháp chính xác (tham số JSON, cách tách cột từ kết quả) xem trong tài liệu <code>DBMS_VECTOR_CHAIN</code>.</p>`)}

<h2>Kiểu dữ liệu VECTOR</h2>
<p>Linh hoạt và mạnh mẽ. Đơn giản nhất: khai báo <code>VECTOR</code> không tham số — chấp nhận mọi số chiều và định dạng. Hoặc chặt chẽ: <code>VECTOR(768, INT8)</code> bắt buộc mọi vector có đúng <strong>768 chiều</strong>, lưu dạng số nguyên 8-bit.</p>
${table(
  ["Định dạng lưu", "Kích thước mỗi chiều", "Ghi chú"],
  [
    ["<code>FLOAT32</code>", "4 byte", "Mặc định"],
    ["<code>FLOAT64</code>", "8 byte", "Thêm độ chính xác"],
    ["<code>INT8</code>", "1 byte", "Rất gọn"],
    ["<code>BINARY</code>", "1 bit", "Siêu gọn"],
  ]
)}
${ul([
  "<strong>Dense</strong> — lưu mọi chiều; <strong>Sparse</strong> — chỉ lưu các chiều khác 0, rất hợp với mô hình embedding thưa (sparse).",
  "Bên trong, vector được lưu dạng <strong>SecureFile BLOB</strong>; đa số vector embedding nặng khoảng <strong>1,5 KB – 12 KB</strong>.",
])}

<h2>Hai loại vector index</h2>
${table(
  ["Index", "Cách hoạt động", "Điểm mạnh"],
  [
    [`<strong>HNSW</strong> — ${d("Hierarchical Navigable Small World", "đồ thị thế giới nhỏ phân tầng")}`, "Xây một <strong>đồ thị nhiều tầng trong bộ nhớ</strong>", "Truy vấn <strong>nhanh nhất</strong>"],
    ["<strong>IVF</strong> — Inverted File Flat", "Chia vector thành các cụm (partition) bằng <strong>k-means</strong>; lúc truy vấn chỉ tìm trong các cụm gần nhất", "Không phải duyệt hết dữ liệu"],
  ]
)}

<h2>Bốn thước đo khoảng cách</h2>
${table(
  ["Thước đo", "Đo gì", "Hợp với"],
  [
    ["<strong>COSINE</strong>", "Góc giữa hai vector", "Phổ biến nhất cho văn bản; là <strong>mặc định</strong> nếu không chỉ định"],
    ["<strong>EUCLIDEAN</strong> (L2)", "Khoảng cách đường thẳng", "Dữ liệu không gian (spatial)"],
    ["<strong>DOT PRODUCT</strong> (inner product)", "Cả hướng lẫn độ lớn", "—"],
    ["<strong>MANHATTAN</strong> (L1)", "Tổng các hiệu tuyệt đối", "Bền vững trước giá trị ngoại lai (outliers)"],
  ]
)}
<p>Hàm <code>VECTOR_DISTANCE</code> nhận hai vector và một thước đo, trả về khoảng cách — <strong>càng nhỏ càng giống</strong>. Thường bạn <code>ORDER BY</code> khoảng cách rồi <code>FETCH FIRST N ROWS</code> để lấy top-K kết quả giống nhất.</p>
${memo(`<p><strong>Luôn dùng đúng thước đo khoảng cách mà embedding model được huấn luyện với.</strong> Đa số mô hình văn bản khuyên dùng <code>COSINE</code>.</p>`, "Quy tắc quan trọng")}

${memo(`<p>5 bước: <strong>generate → store → index → query → RAG</strong>. Embedding trong DB (ONNX + <code>VECTOR_EMBEDDING</code>, dữ liệu không rời DB) hoặc ngoài (REST qua PL/SQL, <code>DBMS_VECTOR_CHAIN</code>). Chunking ~512 token: <code>UTL_TO_TEXT</code> → <code>UTL_TO_CHUNKS</code> → <code>UTL_TO_EMBEDDINGS</code>, nối trong một INSERT. <code>VECTOR(768, INT8)</code>; FLOAT32 (mặc định) / FLOAT64 / INT8 / BINARY; dense vs sparse. Index <strong>HNSW</strong> (nhanh nhất, trong bộ nhớ) và <strong>IVF</strong> (k-means). Khoảng cách: COSINE (mặc định), EUCLIDEAN, DOT, MANHATTAN.</p>`)}`,
    },

    /* ───────────────────────────── 8.4 ───────────────────────────── */
    {
      id: "m8-l4",
      code: "8.4",
      kind: "lesson",
      title: "Select AI Agent: agent sống bên trong database",
      navTitle: "Select AI Agent Framework",
      minutes: 11,
      source: "Oracle AI Database Private Agent Factory · Oracle Select AI Agent Framework",
      html: `<p><strong>Select AI Agent</strong> là khung agent tự hành đi kèm Oracle AI Database. Điểm mấu chốt nằm ở chữ <strong>“inside”</strong>: đa số framework agent sống trong code ứng dụng — LangChain, LangGraph hay một script Python — và với vào database từ bên ngoài. Select AI Agent lật ngược: <strong>agent là một công dân của database</strong>. Nó dùng LLM cấu hình qua một ${d("AI profile", "hồ sơ cấu hình LLM trong database")}, truy cập dữ liệu doanh nghiệp qua SQL và tools, và được quản lý qua các API PL/SQL như <code>DBMS_CLOUD_AI_AGENT</code>.</p>
${note("Về nguồn", `<p>Trong bản ghi gốc, nội dung về Select AI Agent nằm dưới tiêu đề “Oracle AI Database Private Agent Factory”, còn mục “Oracle Select AI Agent Framework” để trống. Phần về <strong>Agent Factory</strong> (nền tảng no-code) được tóm ở bài 8.1 và cuối bài này.</p>`)}

<h2>Bốn hành vi của mọi agent</h2>
${cards([
  { tag: "Plan", title: "Lập kế hoạch", body: "<p>Tìm ra các bước cần làm.</p>" },
  { tag: "Use tools", title: "Dùng công cụ", body: "<p>RAG, NL2SQL, hàm PL/SQL tùy chỉnh, hoặc gọi REST bên ngoài.</p>" },
  { tag: "Reflect", title: "Tự kiểm tra", body: "<p>Kết quả đó có thật sự trả lời câu hỏi không?</p>" },
  { tag: "Remember", title: "Ghi nhớ", body: "<p>Giữ ngữ cảnh trong một cuộc hội thoại và xuyên các cuộc hội thoại.</p>" },
])}
<p>Các năng lực Select AI trải trên các bản triển khai Oracle AI Database; nhiều ví dụ công khai hiện được tài liệu hóa qua Autonomous AI Database.</p>

<h2>Vì sao đặt agent bên trong database?</h2>
${figure(insideSvg, "Bên trái: orchestrator bên ngoài phải xuất dữ liệu, gọi LLM và suy luận ở tầng ứng dụng. Bên phải: agent định nghĩa bằng PL/SQL nằm cùng engine với bảng dữ liệu và dùng lại mọi thứ database đã có.")}
${table(
  ["", "Agent bên ngoài (phổ biến)", "Select AI Agent (bên trong)"],
  [
    ["Cách chạy", "Orchestrator Python/JS nói chuyện với DB, xuất các dòng dữ liệu, gọi LLM, suy luận ở tầng ứng dụng", "Agent định nghĩa bằng PL/SQL, sống trong cùng engine với bảng"],
    ["Chi phí", "Di chuyển dữ liệu, hạ tầng riêng, mô hình bảo mật riêng, nhiều glue code", "Dùng lại role-based access, Virtual Private Database, mã hóa, audit log, connection pool"],
    ["Hiệu quả thực tế", "—", "<strong>Ít di chuyển dữ liệu hơn, ít credential phải quản lý hơn</strong>, chính sách bảo mật tự động áp dụng — vì thao tác của agent được quản trị bằng mô hình bảo mật và đặc quyền chuẩn của Oracle Database"],
  ]
)}

<h2>Bốn lớp cộng tác</h2>
<p>Select AI Agent có bốn lớp, tương ứng gần đúng bốn bước của ${d("ReAct", "mẫu reason + act")} nhưng tách bạch trách nhiệm. Các lớp này chạy <strong>cho mỗi lượt</strong> của người dùng.</p>
${table(
  ["Lớp", "Vai trò"],
  [
    ["<strong>Planning</strong> — chiến lược", "Diễn giải yêu cầu, xác định chi tiết còn thiếu, đề xuất chuỗi hành động có thứ tự"],
    ["<strong>Tool use</strong> — thực thi", "Với mỗi hành động, chọn đúng tool (ba nhóm tool bên dưới)"],
    ["<strong>Reflection</strong> — kiểm tra chất lượng", "So kết quả tool trả về với điều agent mong đợi. Kết quả trông sai, tool lỗi, hoặc con người không duyệt một hành động → agent <strong>sửa lại kế hoạch</strong>"],
    ["<strong>Memory management</strong> — ngữ cảnh", "<strong>Short-term</strong>: giữ hội thoại hiện tại mạch lạc (tin nhắn gần đây, kết quả tool trung gian). <strong>Long-term</strong>: lưu xuyên phiên — sở thích người dùng, chiến lược trước đó, lịch sử"],
  ]
)}

<h2>Ba nhóm tool</h2>
<p>Tools là cách agent làm được việc có ích. Khung có sẵn các năng lực như RAG, sinh SQL, thông báo (notifications) và web search.</p>
${cards(
  [
    {
      tag: "Built-in",
      title: "RAG & NL2SQL",
      body: `<p><strong>RAG</strong> chạy truy xuất trên một vector index bạn đã dựng: tìm tài liệu, lấy đoạn liên quan để ground câu trả lời. <strong>${d("NL2SQL", "natural language to SQL")}</strong> biến câu hỏi tự nhiên thành truy vấn SQL chạy trên các bảng và view <strong>được phép</strong>.</p>`,
    },
    {
      tag: "Custom PL/SQL",
      title: "Nơi tạo ra giá trị production",
      body: "<p>Bạn có lẽ đã có hàng trăm stored procedure cập nhật đơn hàng, kiểm tra địa chỉ, chạy tính toán. Bọc một procedure trong định nghĩa tool là agent gọi được. Điều phối cốt lõi ở sát dữ liệu doanh nghiệp.</p>",
    },
    {
      tag: "External REST",
      title: "Vươn ra ngoài",
      body: "<p>Web search để lấy thông tin mới, email và Slack để thông báo, hay bất kỳ HTTP endpoint nào. Bọc lời gọi HTTP trong một hàm PL/SQL nhỏ rồi đăng ký.</p>",
    },
  ],
  3
)}
<p>Sức mạnh đến từ việc <strong>kết hợp</strong>: một workflow có thể dùng NL2SQL lấy dữ liệu đơn hàng, một hàm PL/SQL tùy chỉnh cập nhật trạng thái, và một tool email báo khách — tất cả trong một lần chạy agent.</p>

<h2>Ví dụ thực tế: agent xử lý trả hàng</h2>
<p>Tài liệu của Oracle có một ví dụ hoàn chỉnh: <strong>customer return agent</strong> xử lý hội thoại trả hàng nhiều lượt.</p>
${chat([
  ["user", "Tôi muốn trả lại đơn hàng của mình."],
  ["sys", "plan: tìm đơn → kiểm tra điều kiện → cập nhật trạng thái → thông báo"],
  ["sys", "tool NL2SQL: lấy đơn hàng từ database → reflect: đơn còn trong thời hạn trả hàng"],
  ["sys", "tool Update_Order_Status_Tool (PL/SQL): đổi trạng thái → “return approved” → reflect: cập nhật thành công"],
  ["bot", "Yêu cầu trả hàng của bạn đã được chấp thuận."],
])}
${code(`-- Ý tưởng: tạo agent bằng PL/SQL (minh họa, xem DBMS_CLOUD_AI_AGENT)
BEGIN
  DBMS_CLOUD_AI_AGENT.CREATE_AGENT(
    agent_name => 'CUSTOMER_RETURN_AGENT',
    attributes => '{"profile_name": "MY_AI_PROFILE",
                    "role": "You help customers return products."}'
  );
END;
-- sau đó gắn tools, tasks và agent teams`)}
<p>Workflow bắt đầu bằng <code>CREATE_AGENT</code>, rồi gắn <strong>tools, tasks và agent teams</strong>. Bạn đặt tên, trỏ tới một AI profile và viết <strong>một câu vai trò</strong> — câu đó chính là <strong>system prompt</strong>, cho LLM biết phải cư xử thế nào. Thông điệp của ví dụ: một agent hữu ích trong production chỉ khoảng <strong>20–30 dòng PL/SQL</strong> cộng các tool nó cần — nhỏ hơn nhiều so với người ta tưởng.</p>

<h2>Còn Agent Factory?</h2>
<p>Nếu không muốn viết PL/SQL: <strong>Agent Factory</strong> là nền tảng <strong>no-code</strong> để người dùng nghiệp vụ và kỹ sư xây, kiểm thử, triển khai agent — có sẵn <strong>knowledge agent</strong>, <strong>data analysis agent</strong>, cùng <strong>Visual Builder</strong> và template cho workflow tùy chỉnh.</p>

${memo(`<p>Select AI Agent: agent là <strong>công dân của database</strong> — LLM qua AI profile, dữ liệu qua SQL &amp; tools, quản lý bằng PL/SQL (<code>DBMS_CLOUD_AI_AGENT</code>). Bốn hành vi <strong>plan, use tools, reflect, remember</strong> ↔ bốn lớp planning, tool use, reflection, memory. Tools: built-in (RAG, NL2SQL…), <strong>custom PL/SQL</strong> (giá trị production), external REST. Lợi ích: ít di chuyển dữ liệu, ít credential, bảo mật tự áp dụng. Agent production ≈ 20–30 dòng PL/SQL.</p>`)}`,
    },

    /* ───────────────────────────── 8.5 ───────────────────────────── */
    {
      id: "m8-l5",
      code: "8.5",
      kind: "lesson",
      title: "Autonomous AI Database MCP Server",
      navTitle: "Autonomous AI Database MCP Server",
      minutes: 6,
      source: "Oracle Autonomous AI Database MCP Server",
      html: `<p>Bài ngắn này giới thiệu một <strong>MCP server được quản lý</strong> hoàn toàn mới của Oracle — chạy <strong>ngay bên trong database</strong>. (Ôn MCP ở bài 5.9.)</p>

<h2>Không phải MCP server bên thứ ba</h2>
${ul([
  "Không phải thứ bạn tải về rồi chạy cạnh database — nó là <strong>một phần của Database Service</strong>. Bật lên là chính database bắt đầu trả lời request MCP.",
  "<strong>Không có tiến trình riêng</strong>: Oracle lo triển khai, vá lỗi, mở rộng và tính sẵn sàng cao (high availability).",
  "Nói MCP thuần qua <strong>HTTPS</strong>, nên mọi MCP client tương thích kết nối theo cùng một cách — mọi client LangChain hay OpenAI Agents SDK đều dùng được.",
])}

<h2>Kiến trúc</h2>
${flow([{ t: "MCP client", s: "bất kỳ thứ gì nói MCP" }, { t: "HTTPS endpoint", s: "Streamable HTTP" }, { t: "MCP server endpoint", s: "trong database" }, { t: "Select AI Agent tools", s: "đã định nghĩa sẵn" }], "Kiến trúc: MCP client gọi một HTTPS endpoint duy nhất, tới MCP server endpoint bên trong database, phơi bày các Select AI Agent tools", 2)}
<p>Client nói chuyện với <strong>một HTTPS endpoint duy nhất</strong> — đó là toàn bộ bề mặt transport. Streamable HTTP chính là chế độ transport của MCP đã học. Bên trong database có hai thứ:</p>
${cards([
  {
    tag: "Phần mới",
    title: "MCP server endpoint",
    body: "<p><strong>Multi-tenant</strong>: cùng một dịch vụ do Oracle quản lý phục vụ nhiều instance ADB, mỗi instance có <strong>URL riêng</strong> dựa trên OCID của nó. <strong>Oracle-managed</strong>: Oracle lo uptime, vá lỗi, scaling.</p>",
  },
  {
    tag: "Có sẵn",
    title: "Select AI Agent tools",
    body: "<p>MCP server <strong>không phát minh định dạng tool mới</strong>: nó chỉ phơi bày các tool Select AI Agent bạn đã định nghĩa. Tạo 3 tool hôm nay → 3 tool đó lập tức thành MCP tool gọi được.</p>",
  },
])}

<h2>Các loại tool phơi bày qua MCP</h2>
${table(
  ["Tool", "Vai trò"],
  [
    ["<strong>NL2SQL</strong>", "Use case chủ lực: ngôn ngữ tự nhiên → SQL dùng AI profile — “mẹo” giúp <strong>bỏ qua bước khám phá schema</strong>"],
    ["<strong>RAG</strong>", "Cho AI tìm trên dữ liệu bạn đã đánh chỉ mục"],
    ["<strong>Custom PL/SQL</strong>", "“Lối thoát hiểm”: bất cứ thứ gì viết được thành hàm PL/SQL đều đăng ký được làm MCP tool"],
  ]
)}

<h2>Endpoint và xác thực</h2>
${ul([
  "<strong>Region</strong> — home region của bạn, vd. Chicago.",
  "<strong>Database OCID</strong> — định danh duy nhất một instance Autonomous AI Database. Có 10 instance ADB → có <strong>10 MCP endpoint</strong> khác nhau.",
])}
${note("Xác thực", `<p>AI client dùng <strong>credential database thông thường</strong>. Người dùng được phép làm gì trong database thì AI được làm đúng chừng đó qua MCP server. <strong>RBAC, ACL và VPD</strong> (Virtual Private Database) đều áp dụng nguyên vẹn.</p>`)}

${memo(`<p>MCP Server của Autonomous AI Database là <strong>một phần của Database Service</strong> — không có tiến trình riêng, Oracle lo vận hành. Một HTTPS endpoint (Streamable HTTP), <strong>multi-tenant</strong>, mỗi ADB một URL theo OCID. Phơi bày chính các <strong>Select AI Agent tools</strong>: NL2SQL, RAG, custom PL/SQL. Xác thực bằng credential DB thường; <strong>RBAC, ACL, VPD áp dụng nguyên vẹn</strong>.</p>`)}`,
    },

    /* ───────────────────────────── Tổng kết ───────────────────────────── */
    {
      id: "m8-summary",
      code: "★",
      kind: "summary",
      title: "★ Tổng kết Phần 8 & Trắc nghiệm",
      navTitle: "Tổng kết & Trắc nghiệm",
      note: "Ôn lại 5 bài học + làm 8 câu trắc nghiệm",
      html: `<p>Phần 8 khép lại khóa học bằng một ý tưởng mạnh: <strong>đưa AI vào bên trong database</strong> thay vì kéo dữ liệu ra ngoài — tìm kiếm theo nghĩa bằng SQL, agent viết bằng PL/SQL, và MCP server do chính database cung cấp.</p>

${sumGrid([
  sum("8.1 — Toàn cảnh", ["AI Vector Search, Autonomous AI Vector Database, Agent Factory (no-code), Select AI Agent, MCP Server, Deep Data Security.", "Từ khóa: inside."]),
  sum("8.2 — AI Vector Search", ["Keyword “canine” ≠ “dog”; vector khớp nghĩa.", "Input → tokenizer → transformer → embedding; ~512 token.", "Không cần vector DB riêng; SQL + VECTOR_DISTANCE + WHERE; chạy ONNX trong DB."]),
  sum("8.3 — Workflow", ["Generate → store → index → query → RAG.", "UTL_TO_TEXT → UTL_TO_CHUNKS → UTL_TO_EMBEDDINGS trong 1 INSERT.", "HNSW (nhanh nhất) vs IVF (k-means); COSINE mặc định."]),
  sum("8.4 — Select AI Agent", ["Plan · use tools · reflect · remember.", "Tools: built-in (RAG, NL2SQL), custom PL/SQL, external REST.", "Dùng lại RBAC, VPD, mã hóa, audit; ~20–30 dòng PL/SQL."]),
  sum("8.5 — MCP Server", ["Một phần của Database Service, Oracle-managed, multi-tenant.", "Mỗi ADB một endpoint theo OCID; phơi bày Select AI Agent tools.", "Credential DB thường; RBAC, ACL, VPD giữ nguyên."]),
])}

<h2>Trắc nghiệm ôn tập Phần 8</h2>
<p>Chọn một đáp án cho mỗi câu rồi bấm <strong>Nộp bài</strong>.</p>`,
      quiz: [
        {
          q: "Điểm khác biệt cốt lõi của Select AI Agent so với LangChain hay OpenAI Agents SDK?",
          options: [
            { text: "Select AI Agent chỉ chạy trên máy cá nhân của lập trình viên.", correct: false, explain: "Sai." },
            { text: "Agent nằm bên trong database (định nghĩa bằng PL/SQL) thay vì ở code ứng dụng với vào database từ ngoài.", correct: true, explain: "Đúng — từ khóa “inside” (bài 8.1, 8.4)." },
            { text: "Select AI Agent không dùng LLM.", correct: false, explain: "Sai — nó dùng LLM cấu hình qua AI profile." },
            { text: "Select AI Agent bắt buộc phải xuất dữ liệu ra ngoài để xử lý.", correct: false, explain: "Sai — ngược lại, nó giảm di chuyển dữ liệu." },
          ],
        },
        {
          q: "Vì sao tài liệu lớn (vd. PDF 100 trang) cần chunking trước khi embed?",
          options: [
            { text: "Vì embedding model chỉ xử lý được số token giới hạn mỗi lần, thường khoảng 512.", correct: true, explain: "Đúng (bài 8.2, 8.3)." },
            { text: "Vì Oracle không lưu được file PDF.", correct: false, explain: "Sai — UTL_TO_TEXT còn chuyển PDF thành văn bản ngay trong DB." },
            { text: "Vì chunking giúp mã hóa dữ liệu.", correct: false, explain: "Sai." },
            { text: "Vì COSINE không dùng được với tài liệu dài.", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Lợi ích lớn nhất của việc tạo embedding <strong>trong database</strong> bằng mô hình ONNX là gì?",
          options: [
            { text: "Luôn dùng được mô hình mới nhất của OpenAI.", correct: false, explain: "Sai — đó là ưu điểm của cách external (REST API)." },
            { text: "Không gọi mạng, không độ trễ mạng, dữ liệu không rời database.", correct: true, explain: "Đúng — dùng VECTOR_EMBEDDING với ONNX Runtime tích hợp (bài 8.3)." },
            { text: "Không cần kiểu dữ liệu VECTOR.", correct: false, explain: "Sai." },
            { text: "Không cần index.", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "<code>VECTOR(768, INT8)</code> nghĩa là gì?",
          options: [
            { text: "Tối đa 768 vector mỗi bảng, mỗi vector 8 byte.", correct: false, explain: "Sai." },
            { text: "Mỗi vector phải có đúng 768 chiều, lưu dạng số nguyên 8-bit (1 byte/chiều).", correct: true, explain: "Đúng (bài 8.3)." },
            { text: "Vector có 8 chiều, giá trị tối đa 768.", correct: false, explain: "Sai." },
            { text: "Dùng thước đo khoảng cách INT8.", correct: false, explain: "Sai — INT8 là định dạng lưu, không phải thước đo." },
          ],
        },
        {
          q: "Loại vector index nào xây đồ thị nhiều tầng trong bộ nhớ và cho truy vấn nhanh nhất?",
          options: [
            { text: "IVF (Inverted File Flat)", correct: false, explain: "Sai — IVF chia cụm bằng k-means." },
            { text: "HNSW (Hierarchical Navigable Small World)", correct: true, explain: "Đúng (bài 8.3)." },
            { text: "B-tree", correct: false, explain: "Sai — không phải vector index trong bài." },
            { text: "MANHATTAN", correct: false, explain: "Sai — đó là thước đo khoảng cách." },
          ],
        },
        {
          q: "Nếu không chỉ định, <code>VECTOR_DISTANCE</code> dùng thước đo nào?",
          options: [
            { text: "EUCLIDEAN", correct: false, explain: "Sai — hợp với dữ liệu không gian." },
            { text: "COSINE", correct: true, explain: "Đúng — phổ biến nhất cho văn bản và là mặc định (bài 8.3)." },
            { text: "DOT PRODUCT", correct: false, explain: "Sai." },
            { text: "MANHATTAN", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Trong Select AI Agent, lớp nào so kết quả tool với kỳ vọng và sửa kế hoạch khi có lỗi hoặc con người không duyệt?",
          options: [
            { text: "Planning", correct: false, explain: "Sai — planning đề xuất chuỗi hành động ban đầu." },
            { text: "Tool use", correct: false, explain: "Sai — tool use chọn và chạy tool." },
            { text: "Reflection", correct: true, explain: "Đúng — lớp kiểm tra chất lượng (bài 8.4)." },
            { text: "Memory management", correct: false, explain: "Sai — lớp ngữ cảnh." },
          ],
        },
        {
          q: "Qua Autonomous AI Database MCP Server, AI client được phép làm gì?",
          options: [
            { text: "Mọi thứ, vì MCP server dùng tài khoản quản trị riêng.", correct: false, explain: "Sai." },
            { text: "Đúng những gì người dùng (credential DB) được phép trong database; RBAC, ACL, VPD áp dụng nguyên vẹn.", correct: true, explain: "Đúng (bài 8.5)." },
            { text: "Chỉ đọc schema, không chạy được tool.", correct: false, explain: "Sai — nó phơi bày NL2SQL, RAG, custom PL/SQL." },
            { text: "Chỉ dùng được với client của Oracle.", correct: false, explain: "Sai — mọi MCP client tương thích, kể cả LangChain hay OpenAI Agents SDK." },
          ],
        },
      ],
    },
  ],
};
