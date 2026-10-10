import type { OciModule } from "./types";
import { arrowDefs, cards, code, d, example, figure, flow, memo, note, steps, sum, sumGrid, table, ul } from "./authoring";

/* Phần 6 — module 7 khóa gốc "OCI AI Portfolio". Nguồn: docs/OCIAI/From 6. OCI Enterprise AI.txt (mục "==== 7. OCI AI Portfolio") */

const stackSvg = `<svg class="svg-diagram" viewBox="0 0 700 260" role="img" aria-label="Các lớp AI của Oracle: dưới cùng là dữ liệu và hạ tầng, ở giữa là AI services và ML services, trên cùng là ứng dụng tiêu thụ chúng.">
<g fill="currentColor" text-anchor="middle">
  <rect x="20" y="14" width="660" height="50" rx="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="350" y="37" font-size="13.5" font-weight="700">Applications</text>
  <text x="350" y="54" font-size="10.5" opacity=".7">ứng dụng · quy trình nghiệp vụ · hệ thống phân tích — nơi AI được "tiêu thụ"</text>
  <rect x="20" y="78" width="660" height="50" rx="12" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="2"/>
  <text x="350" y="101" font-size="13.5" font-weight="700">AI Services</text>
  <text x="350" y="118" font-size="10.5" opacity=".7">mô hình dựng sẵn: Language · Vision · Speech · Document Understanding · Digital Assistant</text>
  <rect x="20" y="142" width="660" height="50" rx="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="350" y="165" font-size="13.5" font-weight="700">ML Services</text>
  <text x="350" y="182" font-size="10.5" opacity=".7">OCI Data Science — xây, huấn luyện, triển khai mô hình của riêng bạn</text>
  <rect x="20" y="206" width="660" height="44" rx="12" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="1.5"/>
  <text x="350" y="233" font-size="13.5" font-weight="700">Data &amp; Infrastructure — nền móng</text>
</g>
</svg>`;

const [gpuDefs, gpuId] = arrowDefs();
const gpuTimelineSvg = `<svg class="svg-diagram" viewBox="0 0 700 170" role="img" aria-label="Dòng thời gian GPU NVIDIA: A100 Ampere 2020, H100 Hopper 2022, H200 2024, Blackwell B200 và GB200 2025.">
${gpuDefs}
<line x1="30" y1="80" x2="672" y2="80" stroke="currentColor" stroke-width="1.6" marker-end="url(#${gpuId})"/>
<g fill="currentColor" text-anchor="middle">
  ${[
    [90, "2020", "A100", "Ampere · Tensor Cores"],
    [250, "2022", "H100", "Hopper · Transformer Engine"],
    [410, "2024", "H200", "như H100, nhiều bộ nhớ hơn"],
    [580, "2025", "B200 · GB200", "Blackwell · Grace CPU"],
  ]
    .map(
      ([x, y, n, s]) =>
        `<circle cx="${x}" cy="80" r="7"/><text x="${x}" y="56" font-size="12" font-weight="700" opacity=".7">${y}</text><text x="${x}" y="110" font-size="13.5" font-weight="800">${n}</text><text x="${x}" y="128" font-size="10.5" opacity=".75">${s}</text>`
    )
    .join("")}
</g>
</svg>`;

const superSvg = `<svg class="svg-diagram" viewBox="0 0 700 290" role="img" aria-label="RDMA Supercluster: mạng Clos ba tầng gồm nhiều block; mỗi GPU node có 8 GPU A100 nối bằng NVLink, nối vào fabric với 1,6 Tbps. Độ trễ trong block khoảng 6,5 micro giây, xuyên block tệ nhất khoảng 20 micro giây.">
<g fill="currentColor" text-anchor="middle">
  <rect x="190" y="12" width="320" height="40" rx="10" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1.8"/>
  <text x="350" y="37" font-size="12.5" font-weight="700">Tầng 3 — spine nối các block</text>
  <rect x="20" y="86" width="300" height="190" rx="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <rect x="380" y="86" width="300" height="190" rx="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="170" y="108" font-size="12.5" font-weight="700">Block 1</text><text x="530" y="108" font-size="12.5" font-weight="700">Block n</text>
  <rect x="40" y="120" width="260" height="30" rx="8" fill="none" stroke="currentColor"/><text x="170" y="140" font-size="11">Tầng 1–2 Clos fabric (non-blocking)</text>
  <rect x="400" y="120" width="260" height="30" rx="8" fill="none" stroke="currentColor"/><text x="530" y="140" font-size="11">Tầng 1–2 Clos fabric (non-blocking)</text>
  <rect x="40" y="180" width="120" height="78" rx="8" fill="none" stroke="currentColor"/><text x="100" y="204" font-size="11" font-weight="700">GPU node</text><text x="100" y="222" font-size="10">8 × A100</text><text x="100" y="238" font-size="10">NVLink</text>
  <rect x="180" y="180" width="120" height="78" rx="8" fill="none" stroke="currentColor"/><text x="240" y="204" font-size="11" font-weight="700">GPU node</text><text x="240" y="222" font-size="10">8 × A100</text><text x="240" y="238" font-size="10">NVLink</text>
  <rect x="400" y="180" width="120" height="78" rx="8" fill="none" stroke="currentColor"/><text x="460" y="222" font-size="11" font-weight="700">GPU node</text>
  <rect x="540" y="180" width="120" height="78" rx="8" fill="none" stroke="currentColor"/><text x="600" y="222" font-size="11" font-weight="700">GPU node</text>
  <text x="170" y="172" font-size="10" opacity=".75">1,6 Tbps / node · 200 Gbps / GPU</text>
  <text x="350" y="196" font-size="10" opacity=".8">trong block</text><text x="350" y="210" font-size="11" font-weight="700">~6,5 µs</text>
  <text x="350" y="76" font-size="10" opacity=".8">xuyên block (tệ nhất) ~20 µs</text>
</g>
<g stroke="currentColor" stroke-width="1.3" opacity=".7">
  <line x1="170" y1="86" x2="300" y2="52"/><line x1="530" y1="86" x2="400" y2="52"/>
  <line x1="100" y1="180" x2="120" y2="150"/><line x1="240" y1="180" x2="220" y2="150"/><line x1="460" y1="180" x2="480" y2="150"/><line x1="600" y1="180" x2="580" y2="150"/>
</g>
</svg>`;

export const m6: OciModule = {
  id: "m6",
  num: 6,
  origModule: 7,
  title: "OCI AI Portfolio",
  desc: "Toàn cảnh danh mục AI của OCI: AI Services, ML Services (OCI Data Science), hạ tầng GPU & Supercluster, nguyên tắc Responsible AI và demo Data Science.",
  lessons: [
    /* ───────────────────────────── 6.1 ───────────────────────────── */
    {
      id: "m6-l1",
      code: "6.1",
      kind: "lesson",
      title: "Tổng quan OCI AI Services",
      navTitle: "Tổng quan AI Services",
      minutes: 8,
      source: "Module Intro · AI Services Overview",
      html: `<p>Module này (do Hemant — senior principal training lead tại Oracle University — giới thiệu) đi qua bốn chủ đề: <strong>OCI AI services</strong>, <strong>OCI machine learning services</strong>, <strong>OCI AI infrastructure</strong>, và khép lại bằng các <strong>nguyên tắc Responsible AI</strong>. Bài đầu tiên: tổng quan về AI services.</p>

<h2>AI ở mọi tầng của Oracle</h2>
<p>Oracle tập trung đưa AI vào doanh nghiệp ở <strong>mọi tầng</strong> của stack. Mọi thứ bắt đầu từ tầng dữ liệu và hạ tầng; AI services <em>tiêu thụ</em> dữ liệu, và đến lượt mình AI services lại được <em>các ứng dụng tiêu thụ</em>. Cách tiếp cận này là khoản đầu tư rộng — từ hạ tầng tới ứng dụng SaaS; Generative AI và các mô hình quy mô cực lớn là những bước gần đây nhất. <strong>Oracle AI</strong> là danh mục dịch vụ cloud giúp tổ chức dùng dữ liệu họ có cho các mục đích riêng của doanh nghiệp.</p>
${figure(stackSvg, "Ứng dụng nghiệp vụ tiêu thụ AI services và ML services; nền móng của cả hai là dữ liệu và hạ tầng.")}

<h2>AI services là gì?</h2>
${ul([
  "Chứa các <strong>mô hình dựng sẵn</strong> (prebuilt models) cho từng mục đích cụ thể.",
  "Một số đã <strong>pre-trained</strong> dùng ngay; một số có thể được khách hàng <strong>huấn luyện thêm</strong> bằng dữ liệu riêng.",
  "Cách dùng: <strong>gọi API</strong> của dịch vụ, truyền dữ liệu cần xử lý, dịch vụ trả về kết quả.",
  "<strong>Không có hạ tầng nào phải quản lý</strong> khi dùng AI services.",
])}

<h2>Bốn cách truy cập</h2>
${table(
  ["Cách truy cập", "Đặc điểm"],
  [
    ["<strong>OCI Console</strong>", "Phổ biến nhất: giao diện web dễ dùng, truy cập notebook sessions và mọi tính năng của Data Science cũng như AI services"],
    ["<strong>REST API</strong>", "Truy cập chức năng dịch vụ nhưng cần kỹ năng lập trình; có API reference trong tài liệu sản phẩm"],
    ["<strong>Language SDK</strong>", "SDK cho Java, Python, TypeScript/JavaScript, .NET, Go và Ruby"],
    ["<strong>CLI</strong> (command line interface)", "Truy cập nhanh và đầy đủ chức năng mà không cần viết script"],
  ]
)}

<h2>Các dịch vụ trong OCI AI Services</h2>
<p>OCI AI services là tập hợp dịch vụ với mô hình machine learning dựng sẵn, giúp lập trình viên dễ dàng xây nhiều loại ứng dụng nghiệp vụ; các mô hình cũng có thể được huấn luyện tùy chỉnh để kết quả chính xác hơn với nghiệp vụ. Gồm: <strong>Digital Assistant, Language, Vision, Speech, Document Understanding</strong>.</p>
${cards([
  {
    tag: "Language",
    title: "OCI Language",
    body: `<p>Phân tích văn bản tinh vi ở quy mô lớn, không cần chuyên môn data science. Ba nhóm: <strong>pretrained models</strong> (phát hiện ngôn ngữ, phân tích cảm xúc, trích cụm từ khóa, phân loại văn bản, ${d("NER", "named entity recognition — nhận dạng thực thể có tên")}, phát hiện PII), <strong>custom models</strong> (NER và phân loại văn bản với dữ liệu chuyên ngành), và <strong>text translation</strong> (${d("neural machine translation", "dịch máy bằng mạng nơ-ron")} giữa nhiều ngôn ngữ).</p>`,
  },
  {
    tag: "Vision",
    title: "OCI Vision",
    body: `<p>Upload ảnh để phát hiện và phân loại đối tượng. <strong>Image analysis pretrained:</strong> object detection, image classification, ${d("OCR", "optical character recognition — nhận dạng ký tự quang học")}. <strong>Custom:</strong> custom object detection (định vị đối tượng riêng bằng ${d("bounding box", "khung bao quanh đối tượng")}) và custom image classification (nhận diện đối tượng và đặc trưng cảnh).</p>`,
  },
  {
    tag: "Speech",
    title: "OCI Speech",
    body: `<p>Chuyển file media thành văn bản đọc được, lưu ở định dạng <strong>JSON</strong> và <strong>SRT</strong>. Biến file chứa giọng người thành bản chép lời (transcription) có độ chính xác cao.</p>`,
  },
  {
    tag: "Document Understanding",
    title: "OCI Document Understanding",
    body: `<p>Upload tài liệu để phát hiện và phân loại chữ và đối tượng; xử lý từng file hoặc theo lô. <strong>Text extraction</strong> (chữ mức từ và mức dòng + tọa độ bounding box), <strong>key-value extraction</strong> (hóa đơn, biên lai, hộ chiếu, giấy phép lái xe), <strong>table extraction</strong> (giữ quan hệ hàng–cột), <strong>document classification</strong>.</p>`,
  },
])}

<h2>Oracle Digital Assistant</h2>
<p>Nền tảng để tạo và triển khai ${d("digital assistant", "trợ lý số — giao diện do AI điều khiển giúp người dùng làm việc qua hội thoại tự nhiên")}. Khi người dùng tương tác, Digital Assistant đánh giá input và <strong>định tuyến</strong> cuộc hội thoại tới/từ các ${d("skill", "kỹ năng — các bot chuyên một nhiệm vụ")} phù hợp. Cụ thể, nó:</p>
${ul([
  "Chào người dùng khi truy cập.",
  "Khi được hỏi, liệt kê những gì nó làm được và cung cấp lối vào các skill.",
  "Định tuyến yêu cầu rõ ràng tới đúng skill.",
  "Xử lý việc người dùng ngắt ngang luồng (interruptions) và làm rõ khi mơ hồ (disambiguation).",
  "Xử lý yêu cầu thoát khỏi bot.",
])}
<p>(Phần 7 đi sâu vào từng dịch vụ Language, Speech, Vision, Document Understanding kèm demo.)</p>

${memo(`<p>Ứng dụng tiêu thụ AI &amp; ML services; nền móng là <strong>dữ liệu</strong>. AI services = <strong>mô hình dựng sẵn</strong>, gọi qua API, <strong>không phải quản lý hạ tầng</strong>; một số pretrained, một số huấn luyện thêm được. Truy cập qua Console, REST API, SDK (Java, Python, TS/JS, .NET, Go, Ruby), CLI. Năm dịch vụ: Digital Assistant, Language, Vision, Speech, Document Understanding.</p>`)}`,
    },

    /* ───────────────────────────── 6.2 ───────────────────────────── */
    {
      id: "m6-l2",
      code: "6.2",
      kind: "lesson",
      title: "ML Services: OCI Data Science",
      navTitle: "ML Services & OCI Data Science",
      minutes: 9,
      source: "ML Services Overview",
      html: `<p>Như đã thấy, nền móng của cả AI services lẫn ML services là <strong>dữ liệu</strong>. Tầng trên cùng là <em>ứng dụng</em> — mọi cách AI được tiêu thụ (ứng dụng, quy trình nghiệp vụ, hệ thống phân tích). Giữa ứng dụng và dữ liệu có hai nhóm: AI services ở trên (bài 6.1) và <strong>machine learning services</strong> ở dưới. Bài này tập trung vào <strong>OCI Data Science</strong>.</p>

<h2>OCI Data Science là gì?</h2>
<p>Dịch vụ cloud phục vụ <strong>data scientist</strong> trong suốt <strong>toàn bộ vòng đời machine learning</strong>, hỗ trợ Python và mã nguồn mở. Các tính năng: model catalog, projects, JupyterLab Notebook, model deployment, model training, quản lý, giải thích mô hình (model explanation), thư viện mã nguồn mở và ${d("AutoML", "tự động hóa việc chọn và huấn luyện mô hình")}.</p>
${table(
  ["Câu hỏi", "Trả lời"],
  [
    ["<strong>What</strong> — là gì?", "Dịch vụ cloud để nhanh chóng build, train, deploy và manage mô hình ML"],
    ["<strong>Who</strong> — phục vụ ai?", "Data scientist và đội data science, suốt vòng đời ML, hỗ trợ Python &amp; mã nguồn mở"],
    ["<strong>Where</strong> — dùng ở đâu?", "Giao diện JupyterLab Notebook quen thuộc, viết code Python"],
    ["<strong>How</strong> — dùng thế nào?", "Lưu mô hình trong model catalog và deploy lên hạ tầng được quản lý"],
  ]
)}

<h2>Ba nguyên tắc cốt lõi</h2>
${cards(
  [
    { tag: "1", title: "Accelerated — tăng tốc", body: "<p>Tăng tốc công việc của từng data scientist: thư viện mã nguồn mở, dễ truy cập nhiều mức compute mà không phải quản lý hạ tầng, kèm thư viện riêng của Oracle giúp tinh gọn nhiều khâu.</p>" },
    { tag: "2", title: "Collaborative — cộng tác", body: "<p>Vượt khỏi năng suất cá nhân để cả đội cùng làm: chia sẻ tài sản, giảm việc trùng lặp, đảm bảo khả năng tái lập (reproducibility) và kiểm toán (auditability) của mô hình cho cộng tác và quản trị rủi ro.</p>" },
    { tag: "3", title: "Enterprise-grade — cấp doanh nghiệp", body: "<p>Tích hợp mọi giao thức bảo mật và truy cập của OCI. Hạ tầng được quản lý hoàn toàn: không phải nghĩ tới cấp phát compute/storage; dịch vụ lo bảo trì, vá lỗi, nâng cấp.</p>" },
  ],
  3
)}

<h2>Thuật ngữ quan trọng của OCI Data Science</h2>
${table(
  ["Thuật ngữ", "Ý nghĩa"],
  [
    ["<strong>Projects</strong>", "Vùng chứa giúp đội tổ chức công việc — không gian cộng tác để sắp xếp và ghi chép tài sản (notebook sessions, models). Một tenancy có <strong>bao nhiêu project cũng được</strong>, không giới hạn"],
    ["<strong>Notebook sessions</strong>", "Nơi data scientist làm việc: môi trường JupyterLab cài sẵn thư viện mã nguồn mở, thêm được thư viện khác. Chạy trên hạ tầng managed; chọn CPU/GPU, compute shape, dung lượng storage mà không phải cấp phát thủ công"],
    ["<strong>Conda environment</strong>", "Hệ thống quản lý môi trường và gói mã nguồn mở cho Python — cài, chạy, cập nhật gói và phụ thuộc nhanh; tạo, lưu, nạp, chuyển đổi môi trường trong notebook session"],
    ["<strong>ADS SDK</strong> (Accelerated Data Science)", "Thư viện Python của Oracle có sẵn trong Data Science: tự động hóa/đơn giản hóa kết nối dữ liệu, khám phá &amp; trực quan hóa, huấn luyện với AutoML, đánh giá và giải thích mô hình; giao diện đơn giản tới Data Science, Model Catalog và các dịch vụ OCI khác như Object Storage"],
    ["<strong>Models</strong>", "Biểu diễn toán học của dữ liệu và quy trình nghiệp vụ; được tạo trong notebook sessions và projects"],
    ["<strong>Model Catalog</strong>", "Kho tập trung, được quản lý, để lưu, theo dõi, chia sẻ, quản lý model artifacts. Mô hình lưu kèm metadata về nguồn gốc (thông tin Git, script/notebook đã đẩy mô hình lên); chia sẻ được cho cả đội và nạp lại vào notebook session"],
    ["<strong>Model deployments</strong>", "Triển khai mô hình trong catalog thành <strong>HTTP endpoint</strong> trên hạ tầng managed — phục vụ dự đoán thời gian thực, cách phổ biến nhất để đưa mô hình vào vận hành"],
    ["<strong>Jobs</strong>", "Định nghĩa và chạy các tác vụ ML <strong>lặp lại được</strong> trên hạ tầng managed hoàn toàn"],
  ]
)}
${flow([{ t: "Notebook session", s: "build & train" }, { t: "Model Catalog", s: "lưu & chia sẻ" }, { t: "Model deployment", s: "HTTP endpoint" }, { t: "Dự đoán", s: "thời gian thực" }], "Luồng làm việc OCI Data Science: notebook session, model catalog, model deployment, dự đoán thời gian thực")}

${memo(`<p>OCI Data Science phục vụ data scientist <strong>suốt vòng đời ML</strong> với Python &amp; mã nguồn mở. Ba nguyên tắc: <strong>accelerated, collaborative, enterprise-grade</strong>. Thuật ngữ: project → notebook session (JupyterLab, chọn CPU/GPU) → conda environment → ADS SDK → model → <strong>Model Catalog</strong> → <strong>model deployment</strong> (HTTP endpoint) → jobs.</p>`)}`,
    },

    /* ───────────────────────────── 6.3 ───────────────────────────── */
    {
      id: "m6-l3",
      code: "6.3",
      kind: "lesson",
      title: "Hạ tầng AI: vì sao cần GPU?",
      navTitle: "AI Infrastructure & GPU",
      minutes: 7,
      source: "AI Infrastructure",
      html: `<p>${d("GPU — Graphics Processing Unit", "bộ xử lý đồ họa")} là thành phần rất quan trọng của hạ tầng AI. Bài này giải thích GPU là gì, vì sao cần nó, điểm qua các thế hệ GPU NVIDIA và cách dùng hạ tầng AI của OCI qua Data Science.</p>

<h2>Vì sao AI cần GPU?</h2>
<p>Workload ML và AI cần <strong>rất nhiều phép tính lặp lại trên lượng dữ liệu khổng lồ</strong> — đặc biệt khi huấn luyện mô hình, và cả khi suy luận (inference). GPU là phần cứng cực giỏi ở một số loại phép tính nhất định.</p>
${cards([
  { title: "Tính toán song song", body: "<p>GPU được thiết kế để chạy nhiều tiến trình cùng lúc: có <strong>hàng nghìn lõi nhẹ</strong>, mỗi lõi xử lý phần dữ liệu của mình song song → nghiền tập dữ liệu cực lớn với tốc độ rất cao.</p>" },
  { title: "Thông lượng suy luận", body: `<p>GPU xử lý song song nhiều tác vụ inference, cho ${d("throughput", "thông lượng")} cao hơn hẳn CPU — rất hữu ích cho batch processing hoặc phục vụ nhiều request đồng thời.</p>` },
])}
<p>GPU hiện đại được tối ưu cho các framework deep learning như <strong>TensorFlow, PyTorch, ONNX Runtime</strong>; các framework này dùng thư viện riêng cho GPU để tăng tốc tính toán.</p>

<h2>Các thế hệ GPU NVIDIA</h2>
${figure(gpuTimelineSvg, "Từ Ampere (A100, 2020) qua Hopper (H100 2022, H200 2024) tới Blackwell (B200, GB200 — 2025).")}
${table(
  ["GPU / kiến trúc", "Năm", "Điểm nổi bật"],
  [
    ["<strong>A100</strong> — Ampere", "2020", `${d("Tensor Cores", "lõi tensor")} thực hiện nhiều phép fused multiply-accumulate trong một chu kỳ xung nhịp → tăng tốc deep learning`],
    ["<strong>H100</strong> — Hopper", "2022", "Có <strong>transformer engine</strong> chuyên dụng để tối ưu hiệu năng mô hình transformer"],
    ["<strong>H200</strong>", "2024", "Giống H100 nhưng <strong>nhiều bộ nhớ hơn</strong>"],
    ["<strong>Blackwell</strong> (B200)", "2025", "Thiết kế để tăng tốc mô hình AI quy mô lớn — đúng xu hướng tập trung vào LLM"],
    ["<strong>Grace CPU</strong>", "—", "Bộ xử lý đột phá cho trung tâm dữ liệu hiện đại chạy AI, cloud và HPC"],
    ["<strong>GB200</strong> Grace Blackwell superchip", "2025", "Hợp nhất GPU Blackwell với CPU Grace để mở khóa hiệu năng"],
  ]
)}

<h2>Danh mục GPU trên OCI</h2>
<p>Để phục vụ từ use case nhỏ, vừa tới lớn, OCI mở rộng dòng GPU compute: compute với <strong>H100</strong> và <strong>L40S</strong> đã sẵn sàng rộng rãi (generally available); OCI nhận đặt hàng compute với <strong>H200, B200</strong> và superchip <strong>GB200</strong> (sẵn sàng rộng rãi trong 2025), cùng các <strong>supercluster</strong> xây từ những GPU này. Từ H200, supercluster có thể đạt khoảng <strong>4 lần</strong> hiệu năng supercluster H100; B200 và GB200 còn cao hơn nữa cho workload AI.</p>
${note("Về số liệu", `<p>Bản ghi gốc (phiên âm tự động) có vài chỗ đọc không rõ tên sản phẩm/số liệu; phần trên giữ đúng các mốc chắc chắn: H100 và L40S đã có, H200/B200/GB200 và supercluster đang nhận đặt hàng cho 2025, H200 supercluster ≈ 4× H100.</p>`)}

<h2>Dùng hạ tầng AI của OCI qua Data Science</h2>
${ul([
  "<strong>AI Quick Actions</strong> trong OCI Data Science: triển khai trực tiếp các LLM phổ biến lên VM hoặc bare metal có GPU.",
  "Fine-tune base model rồi triển khai custom model để suy luận, cũng qua AI Quick Actions.",
  `Có thể đăng ký bất kỳ model nào được hỗ trợ bởi các container ${d("vLLM", "thư viện phục vụ LLM hiệu năng cao")}, Text Generation Inference hoặc Text Embedding Inference trong AI Quick Actions.`,
])}

${memo(`<p>AI cần GPU vì có <strong>hàng nghìn lõi chạy song song</strong> → huấn luyện nhanh, thông lượng suy luận cao hơn CPU. NVIDIA: <strong>A100</strong> (Ampere, Tensor Cores, 2020) → <strong>H100</strong> (Hopper, transformer engine, 2022) → <strong>H200</strong> (thêm bộ nhớ, 2024) → <strong>Blackwell B200 / GB200</strong> (2025). Trên OCI, dùng GPU để deploy và fine-tune LLM qua <strong>AI Quick Actions</strong> của Data Science.</p>`)}`,
    },

    /* ───────────────────────────── 6.4 ───────────────────────────── */
    {
      id: "m6-l4",
      code: "6.4",
      kind: "lesson",
      title: "GPU & Supercluster trên OCI: mạng RDMA",
      navTitle: "GPUs & Superclusters",
      minutes: 9,
      source: "GPUs and Superclusters in OCI",
      html: `<p>Bài này là một tập trong loạt video "First Principles" của OCI — nơi Pradeep (OCI) trò chuyện với Jack, kiến trúc sư trưởng mạng RDMA, về kiến trúc đằng sau <strong>RDMA Supercluster</strong>. Mục tiêu của OCI: hiệu năng tối đa với chi phí thấp nhất cho khách hàng.</p>

<h2>RDMA và RoCE là gì?</h2>
<p>${d("RDMA — Remote Direct Memory Access", "truy cập bộ nhớ trực tiếp từ xa")} là công nghệ truyền dữ liệu/giao tiếp mạng <strong>bỏ qua CPU</strong>: dữ liệu đi từ máy này sang máy kia mà CPU không phải can thiệp. Nhờ đó GPU giao tiếp với nhau ở <strong>độ trễ cực thấp, băng thông cao</strong>, gần như không tốn CPU.</p>
${ul([
  "RDMA là nền tảng của nhiều dịch vụ OCI gần như từ đầu: dịch vụ database (ExaCS, Autonomous Database), workload HPC và workload GPU.",
  `Vài năm trước, OCI đặt cược chiến lược vào ${d("RoCE — RDMA over Converged Ethernet", "RDMA chạy trên Ethernet hội tụ")}: một fabric Ethernet hỗ trợ RoCE, trên đó chạy cả HPC, GPU và database.`,
  "Sau quan hệ đối tác chiến lược với NVIDIA, nhu cầu rõ ràng là workload GPU quy mô <strong>hàng nghìn tới hàng chục nghìn GPU</strong> chạy trong <strong>một mạng RDMA duy nhất</strong> → OCI cải tiến kiến trúc để ra mắt <strong>RDMA Supercluster</strong>.",
])}

<h2>Kiến trúc Supercluster</h2>
${figure(superSvg, "Mỗi GPU node có 8 GPU lớp A100 nối nhau bằng NVLink, nối vào fabric non-blocking ở 1,6 Tbps. Supercluster gồm nhiều block, mỗi block hai tầng Clos, thêm tầng thứ ba nối các block.")}
${table(
  ["Thành phần", "Chi tiết"],
  [
    ["GPU node", "8 GPU NVIDIA lớp A100, nối nội bộ bằng <strong>NVLink</strong>"],
    ["Kết nối node ↔ fabric", "<strong>1,6 Tbps</strong> (1.600 Gbps) mỗi node → mỗi GPU có <strong>200 Gbps</strong> băng thông tương ứng"],
    ["Network fabric", `${d("Non-blocking", "không nghẽn — GPU bất kỳ nói chuyện được với GPU bất kỳ cùng lúc")}: cung cấp đủ băng thông mà mọi GPU node cần`],
    ["Supercluster", "Lớn hơn nhiều so với cluster network thông thường; gồm nhiều <strong>block</strong>, mỗi block hai tầng Clos → tổng cộng mạng <strong>Clos ba tầng</strong>"],
    ["Quy mô", "Dự kiến hàng chục nghìn GPU; có thể hình dung thiết kế vượt <strong>100.000 GPU</strong>"],
  ]
)}

<h2>Bài toán độ trễ</h2>
<p>Quy mô lớn như vậy, với giới hạn vật lý về điện và không gian, nghĩa là cáp rất dài và nhiều chặng hơn:</p>
${table(
  ["Phạm vi", "Độ trễ khứ hồi (round trip)"],
  [
    ["Trong một block", "≈ <strong>6,5 µs</strong>"],
    ["Xuyên block — trường hợp tệ nhất", "≈ <strong>20 µs</strong> — vẫn thấp hơn 10–20 lần so với mạng cloud thông thường"],
  ]
)}
<p>OCI xử lý theo ba cách:</p>
${steps([
  `<strong>Buffer được tinh chỉnh — mạng lossless:</strong> mạng có QoS; switch và chip được chọn với lượng buffer phù hợp, và buffer được cấp đúng cho hàng đợi mà workload GPU dùng. Đây là mạng RDMA ${d("lossless", "không mất gói — switch không làm rơi packet")}, có hệ thống thông báo tắc nghẽn thông minh; buffer được tính cho độ trễ tệ nhất để packet không bao giờ bị rơi.`,
  `<strong>Placement trong control plane:</strong> control plane quyết định đặt workload ở đâu, có tính tới độ trễ. Workload đủ nhỏ (vd. ~1.000 GPU, HPC, cluster database cần độ trễ thấp) được đặt gọn trong <strong>một block</strong> để hưởng độ trễ thấp — cân bằng giữa quy mô và độ trễ.`,
  `<strong>Network locality hints:</strong> với workload trải nhiều block, OCI công khai thông tin vị trí mạng cho khách hàng để họ xây topology ML tận dụng nó.`,
])}

<h2>Locality hints hiệu quả ra sao?</h2>
<p>Ví dụ workload 8 host sau 4 switch top-of-rack (ToR), nằm ở 2 block. Nếu không biết vị trí, GPU nào cũng có thể nói chuyện với GPU nào và độ trễ cao hơn cần thiết. Khi khách hàng sắp xếp GPU theo locality:</p>
${ul([
  "Với hai GPU cùng một ToR switch, <strong>một nửa</strong> lưu lượng ở lại ngay ToR — độ trễ còn thấp hơn 6,5 µs.",
  "Trong block, khoảng <strong>85%</strong> lưu lượng ở lại nội bộ block.",
  "Chỉ thỉnh thoảng mới có liên kết xuyên block (~20 µs) → <strong>độ trễ trung bình thấp hơn nhiều</strong>.",
])}
${example(`<p>Lợi ích phụ: giảm ${d("flow collision", "va chạm luồng — hai luồng cùng dồn vào một đường truyền")}, hiện tượng phổ biến trong mọi mạng. Lưu lượng gói gọn trong ToR/block nên xác suất va chạm giảm → không chỉ độ trễ thấp hơn mà <strong>thông lượng cũng cao hơn</strong>.</p>`, "Lợi ích bất ngờ")}

${memo(`<p>RDMA truyền dữ liệu <strong>bỏ qua CPU</strong>; OCI chạy RoCE trên Ethernet. Supercluster = mạng <strong>Clos ba tầng</strong> nhiều block, node 8 GPU (NVLink), 1,6 Tbps/node, non-blocking, hướng tới &gt;100.000 GPU. Độ trễ: ~6,5 µs trong block, ~20 µs tệ nhất. Ba tối ưu: <strong>buffer cho mạng lossless</strong>, <strong>placement</strong> trong control plane, <strong>network locality hints</strong> → độ trễ thấp, thông lượng cao.</p>`)}`,
    },

    /* ───────────────────────────── 6.5 ───────────────────────────── */
    {
      id: "m6-l5",
      code: "6.5",
      kind: "lesson",
      title: "Responsible AI: AI đáng tin cậy",
      navTitle: "Responsible AI",
      minutes: 8,
      source: "Responsible AI",
      html: `<p>Ta dùng AI ngày càng nhiều trong công việc hằng ngày. Nhưng <strong>có thể tin AI không?</strong> Ta có hoàn toàn tin xe tự lái? Có chấp nhận chẩn đoán bệnh do AI đưa ra mà không cần ý kiến thứ hai?</p>

<h2>Ba nguyên tắc định hướng cho AI đáng tin cậy</h2>
${cards(
  [
    { tag: "Lawful", title: "Hợp pháp", body: "<p>Tuân thủ mọi luật và quy định hiện hành.</p>" },
    { tag: "Ethical", title: "Có đạo đức", body: "<p>Tuân theo các nguyên tắc và giá trị đạo đức mà con người đề cao.</p>" },
    { tag: "Robust", title: "Vững vàng", body: "<p>Cả về kỹ thuật lẫn xã hội — vì kể cả với ý định tốt, hệ thống AI vẫn có thể gây hại ngoài ý muốn.</p>" },
  ],
  3
)}

<h2>AI không hoạt động trong "vùng vô luật"</h2>
<p>Nhiều quy định ràng buộc pháp lý ở cấp quốc gia và quốc tế đã áp dụng cho việc phát triển, triển khai và sử dụng AI. Luật không chỉ <em>cấm</em> một số hành động mà còn <em>tạo điều kiện</em> cho hành động khác — như bảo vệ quyền của nhóm thiểu số hay bảo vệ môi trường. Ngoài các quy định áp dụng chung (horizontal), còn có quy định theo lĩnh vực, ví dụ quy định về thiết bị y tế trong ngành y.</p>

<h2>Đạo đức con người &amp; quyền cơ bản</h2>
${table(
  ["Giá trị", "Với AI nghĩa là"],
  [
    ["<strong>Human dignity</strong> — phẩm giá con người", "Mỗi người có giá trị nội tại không bao giờ được hạ thấp; hệ thống phải tôn trọng và bảo vệ sự toàn vẹn thể chất lẫn tinh thần"],
    ["<strong>Freedom of the individual</strong> — tự do cá nhân", "Bảo vệ tự do ngôn luận, quyền đời tư và quyền riêng tư"],
    ["<strong>Democracy</strong> — dân chủ", "Duy trì, thúc đẩy tiến trình dân chủ, tôn trọng lựa chọn cá nhân; không được phá hoại tiến trình hay hệ thống bầu cử"],
    ["<strong>Equality</strong> — bình đẳng", "Hoạt động của hệ thống không được tạo ra đầu ra thiên lệch bất công"],
    ["<strong>Citizens' rights</strong> — quyền công dân", "Phải được bảo vệ khi áp dụng AI"],
  ]
)}

<h2>Từ đạo đức tới yêu cầu Responsible AI</h2>
<p>Ba nguyên tắc đạo đức AI chính: AI dùng để <strong>giúp con người và cho phép giám sát</strong>; <strong>không bao giờ gây hại</strong> thể chất hay xã hội; quyết định của AI phải <strong>minh bạch, công bằng và giải thích được</strong>. Ánh xạ thành yêu cầu:</p>
${table(
  ["Nguyên tắc", "Yêu cầu Responsible AI"],
  [
    ["Giúp con người, cho phép giám sát", "Thiết kế lấy con người làm trung tâm, để lại cơ hội lựa chọn thật sự cho con người → đảm bảo <strong>human oversight</strong>"],
    ["Không gây hại", "Hệ thống và môi trường vận hành phải <strong>an toàn, bảo mật</strong>, vững vàng về kỹ thuật, không để bị lợi dụng ác ý"],
    ["Công bằng", "Phát triển, triển khai, sử dụng phải <strong>công bằng</strong> — phân bổ đều và công bằng cả lợi ích lẫn chi phí; không thiên lệch, phân biệt đối xử"],
    ["Minh bạch, giải thích được", "Quyết định của AI, trong phạm vi có thể, phải <strong>giải thích được</strong> cho những người bị ảnh hưởng trực tiếp và gián tiếp"],
  ]
)}

<h2>Quy trình triển khai Responsible AI</h2>
${flow([{ t: "Governance", s: "thiết lập quản trị" }, { t: "Policies & procedures", s: "chính sách, quy trình" }, { t: "Compliance", s: "giám sát, đánh giá định kỳ" }], "Quy trình triển khai Responsible AI: thiết lập governance, xây chính sách và quy trình, đảm bảo tuân thủ bằng giám sát và đánh giá định kỳ")}
<p>Các vai trò điển hình tham gia: <strong>developers</strong> (người phát triển), <strong>deployers</strong> (người triển khai) và <strong>end users</strong> (người dùng cuối) của AI.</p>

<h2>Ví dụ: AI trong y tế</h2>
${cards([
  { tag: "Thách thức 1", title: "Công bằng & thiên lệch", body: "<p>AI chỉ tốt bằng dữ liệu huấn luyện. Nếu dữ liệu chủ yếu từ một giới tính hay một nhóm chủng tộc, hệ thống có thể kém hiệu quả với các nhóm khác.</p>" },
  { tag: "Thách thức 2", title: "Minh bạch & giải thích được", body: "<p>Quyết định dựa trên thuật toán phức tạp khó hiểu với con người → bệnh nhân và nhân viên y tế khó tin. Hệ thống phải được <strong>đánh giá thường xuyên</strong> để đảm bảo hoạt động đúng ý và không gây hại cho bệnh nhân.</p>" },
])}

${memo(`<p>AI đáng tin: <strong>lawful – ethical – robust</strong>. Dựa trên phẩm giá, tự do, dân chủ, bình đẳng, quyền công dân. Yêu cầu: <strong>human oversight</strong>, an toàn &amp; bảo mật, <strong>công bằng</strong> không thiên lệch, <strong>giải thích được</strong>. Triển khai: governance → policies &amp; procedures → compliance (giám sát, đánh giá); vai trò developers, deployers, end users.</p>`)}`,
    },

    /* ───────────────────────────── 6.6 ───────────────────────────── */
    {
      id: "m6-l6",
      code: "6.6",
      kind: "lesson",
      title: "Demo: OCI Data Science từ project tới model catalog",
      navTitle: "Demo: Data Science",
      minutes: 9,
      source: "Demo: Data Science",
      html: `<p>Đã quen với các tính năng và thuật ngữ của OCI Data Science (bài 6.2), giờ ta tái hiện bài demo machine learning trước đó (bài 2.4 — Iris với scikit-learn) ngay trong môi trường Data Science. Bạn có thể đăng ký tài khoản Oracle để tự thử. Demo không đi vào thiết lập policies và workspaces — phần đó thuộc khóa <strong>OCI Data Science Professional</strong>, bước tiếp theo nên học trong hành trình AI/ML với Oracle.</p>

<h2>1. Vào dịch vụ và tạo project</h2>
<p>Data Science là nền tảng managed hoàn toàn để đội data scientist build, train, deploy và manage mô hình ML bằng Python và công cụ mã nguồn mở. Tìm nó trong menu <strong>Analytics &amp; AI → Machine Learning → Data Science</strong>.</p>
${steps([
  "Trang Data Science hiện các điều kiện tiên quyết cơ bản và danh sách project.",
  "Bấm <strong>Create Project</strong>, chọn compartment, nhập tên và mô tả, bấm <strong>Create</strong>.",
  "Mở project đang active: thấy các notebook session (trạng thái, compute shape, network, endpoint). Thanh bên trái còn có <strong>Jobs, Pipelines, Models, Model deployments</strong>.",
])}

<h2>2. Tạo notebook session</h2>
${steps([
  "Bấm <strong>Create Notebook Session</strong>, chọn compartment, đặt tên (không đặt thì hệ thống tự tạo).",
  "Chọn <strong>Compute Shape</strong>: <em>Change Shape</em> cho nhiều lựa chọn loại instance, dòng shape (AMD, Intel…), số CPU và dung lượng bộ nhớ.",
  "Khai báo block storage, tài nguyên mạng và kiểu endpoint, rồi bấm <strong>Create</strong>.",
  "Mở session đang active (trang chi tiết có thêm các metric) → vào môi trường <strong>Jupyter</strong>.",
])}

<h2>3. Cài conda environment</h2>
${steps([
  "Mở <strong>Launcher</strong> (gồm các kernel môi trường và tài nguyên khác).",
  "Mở <strong>Environment Explorer</strong>: danh sách conda environment — mỗi cái có mô tả, các thư viện/gói, và lệnh cài đặt. Copy lệnh.",
  "Quay lại Launcher → <strong>Terminal</strong> → dán và chạy lệnh để cài.",
  "Làm mới, kernel mới xuất hiện; chọn kernel conda đó → <strong>Create Notebook</strong>.",
])}
<p>Trong demo, notebook dùng conda environment <em>General ML</em> với Python 3.8 (đổi kernel ngay trong notebook được).</p>

<h2>4. Huấn luyện mô hình</h2>
<p>Code gần giống bài demo ở Phần 2, thêm vài thư viện như <strong>ADS</strong> và các bước để trình diễn dịch vụ:</p>
${code(`# 1) import thư viện (sklearn, pandas, ads ...)
# 2) nạp bộ dữ liệu iris
# 3) tách features (X) và biến mục tiêu (y)
# 4) chia train / test
# 5) huấn luyện bộ phân loại
from sklearn.ensemble import RandomForestClassifier
clf = RandomForestClassifier().fit(X_train, y_train)`)}

<h2>5. Vòng đời mô hình với ADS</h2>
<p>Sau khi huấn luyện bằng framework tùy chọn, tạo một <strong>model object</strong> của ADS và gọi lần lượt các phương thức:</p>
${table(
  ["Phương thức", "Làm gì"],
  [
    ["<code>prepare()</code>", "Sinh mọi <strong>model artifact</strong> cần để triển khai mô hình chạy được — không cần tự cấu hình hay viết code"],
    ["<code>summary_status()</code>", "Trả về một pandas DataFrame hướng dẫn toàn bộ workflow: các bước <em>initiate, prepare, verify, save, deploy, predict</em>, trạng thái, hành động cần làm và chi tiết"],
    ["<code>verify()</code>", "<strong>Giả lập</strong> việc triển khai — debug file hoặc test mô hình mà không cần deploy thật (demo: dự đoán thành công 10 dòng đầu của tập test)"],
    ["<code>save()</code>", "Đưa model artifact vào <strong>Model Catalog</strong>"],
    ["<code>deploy()</code>", "Triển khai mô hình thành một <strong>REST endpoint</strong>"],
    ["<code>predict()</code>", "Sinh dự đoán bằng cách gọi endpoint đã triển khai"],
  ]
)}
${flow([{ t: "initiate" }, { t: "prepare" }, { t: "verify" }, { t: "save" }, { t: "deploy → predict" }], "Các bước vòng đời mô hình với ADS: initiate, prepare, verify, save, deploy rồi predict", 3)}
<p>Trong demo, bốn bước đầu (initiate, prepare, verify, save) hoàn tất; deploy và predict nằm ngoài phạm vi nhưng các bước đã được viết sẵn để bạn tự làm tiếp. Quay lại project → <strong>Models</strong> sẽ thấy mô hình sklearn vừa tạo.</p>

${memo(`<p>Đường đi trong Console: <strong>Analytics &amp; AI → Data Science</strong> → tạo project → tạo notebook session (chọn compute shape) → cài <strong>conda environment</strong> qua Environment Explorer + Terminal → train (Random Forest trên Iris) → ADS: <code>prepare</code> → <code>summary_status</code> → <code>verify</code> → <code>save</code> (Model Catalog) → <code>deploy</code> → <code>predict</code>.</p>`)}`,
    },

    /* ───────────────────────────── Skill check ───────────────────────────── */
    {
      id: "m6-summary",
      code: "★",
      kind: "summary",
      title: "★ Tổng kết Phần 6 & Skill Check",
      navTitle: "Tổng kết & Skill Check",
      note: "Ôn lại 6 bài học + Skill Check 10 câu (đạt ≥ 80%)",
      passPct: 80,
      html: `<p>Phần 6 vẽ toàn cảnh danh mục AI của OCI: <em>dịch vụ AI dựng sẵn</em> để gọi qua API, <em>dịch vụ ML</em> để tự xây mô hình, <em>hạ tầng GPU</em> để chạy tất cả, và <em>nguyên tắc Responsible AI</em> để dùng chúng đúng cách.</p>

${sumGrid([
  sum("6.1 — AI Services", ["Ứng dụng tiêu thụ AI/ML services; nền móng là dữ liệu.", "Mô hình dựng sẵn, gọi qua API, không quản lý hạ tầng.", "Console · REST API · SDK · CLI. Digital Assistant, Language, Vision, Speech, Document Understanding."]),
  sum("6.2 — OCI Data Science", ["Phục vụ data scientist suốt vòng đời ML (Python, mã nguồn mở).", "Accelerated · collaborative · enterprise-grade.", "Project, notebook session, conda, ADS, Model Catalog, model deployment, jobs."]),
  sum("6.3 — AI Infrastructure", ["GPU: hàng nghìn lõi song song, thông lượng suy luận cao.", "A100 (Ampere) → H100 (Hopper) → H200 → Blackwell B200/GB200.", "AI Quick Actions để deploy/fine-tune LLM trên GPU."]),
  sum("6.4 — Supercluster", ["RDMA bỏ qua CPU; RoCE trên Ethernet.", "Clos 3 tầng, 8 GPU/node, 1,6 Tbps/node, >100.000 GPU.", "~6,5 µs trong block, ~20 µs tệ nhất; buffer lossless, placement, locality hints."]),
  sum("6.5 — Responsible AI", ["Lawful, ethical, robust.", "Human oversight, an toàn, công bằng, giải thích được.", "Governance → policies → compliance; developers, deployers, end users."]),
  sum("6.6 — Demo Data Science", ["Project → notebook session → conda environment → notebook.", "ADS: prepare, summary_status, verify, save, deploy, predict."]),
])}

<h2>Skill Check: OCI AI Portfolio</h2>
<p>Giống bài kiểm tra kỹ năng của khóa gốc: cần đúng <strong>từ 80% trở lên</strong> để đạt. Sau khi nộp, mọi lựa chọn đều hiện giải thích.</p>`,
      quiz: [
        {
          q: "Phát biểu nào đúng về OCI AI services?",
          options: [
            { text: "Bạn phải tự cấp phát và quản lý GPU để chạy các mô hình dựng sẵn.", correct: false, explain: "Sai. Dùng AI services <strong>không có hạ tầng nào phải quản lý</strong>." },
            { text: "Chứa mô hình dựng sẵn cho từng mục đích, dùng bằng cách gọi API; một số có thể huấn luyện thêm bằng dữ liệu của khách hàng.", correct: true, explain: "Đúng. Gọi API, truyền dữ liệu, nhận kết quả; một số pretrained, một số huấn luyện thêm được (bài 6.1)." },
            { text: "Chỉ truy cập được qua REST API.", correct: false, explain: "Sai. Còn có Console, SDK nhiều ngôn ngữ và CLI." },
            { text: "AI services là tầng nền móng, còn dữ liệu nằm ở trên cùng.", correct: false, explain: "Sai. Dữ liệu (và hạ tầng) mới là nền móng; ứng dụng ở trên cùng." },
          ],
        },
        {
          q: "Tính năng nào của OCI Language cho phép huấn luyện <strong>custom model</strong>?",
          options: [
            { text: "Language detection và sentiment analysis.", correct: false, explain: "Sai. Đây là các mô hình pretrained." },
            { text: "Named entity recognition và text classification.", correct: true, explain: "Đúng. Custom models được huấn luyện cho NER và phân loại văn bản với dữ liệu chuyên ngành (bài 6.1, 7.1)." },
            { text: "Text translation.", correct: false, explain: "Sai. Dịch dùng neural machine translation, không phải custom model trong danh sách này." },
            { text: "OCR.", correct: false, explain: "Sai. OCR thuộc Vision/Document Understanding." },
          ],
        },
        {
          q: "Oracle Digital Assistant làm gì khi người dùng gửi một yêu cầu rõ ràng?",
          options: [
            { text: "Chuyển yêu cầu sang OCI Speech để chép lời.", correct: false, explain: "Sai. Không liên quan." },
            { text: "Định tuyến (route) yêu cầu tới skill phù hợp.", correct: true, explain: "Đúng. Digital Assistant đánh giá input và định tuyến hội thoại tới/từ đúng skill; còn xử lý ngắt ngang, làm rõ và thoát bot (bài 6.1)." },
            { text: "Từ chối mọi yêu cầu không phải bằng tiếng Anh.", correct: false, explain: "Sai. Không có nội dung này trong bài." },
            { text: "Huấn luyện lại mô hình ngay lập tức.", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Trong OCI Data Science, <strong>Model Catalog</strong> là gì?",
          options: [
            { text: "Môi trường JupyterLab để viết code.", correct: false, explain: "Sai. Đó là notebook session." },
            { text: "Kho tập trung, được quản lý, để lưu, theo dõi, chia sẻ và quản lý model artifacts kèm metadata nguồn gốc.", correct: true, explain: "Đúng. Mô hình trong catalog chia sẻ được cho đội và nạp lại vào notebook session (bài 6.2)." },
            { text: "Hệ thống quản lý gói Python.", correct: false, explain: "Sai. Đó là conda environment." },
            { text: "Dịch vụ chạy các tác vụ ML lặp lại.", correct: false, explain: "Sai. Đó là Jobs." },
          ],
        },
        {
          q: "Nguyên tắc <strong>enterprise-grade</strong> của OCI Data Science nghĩa là gì?",
          options: [
            { text: "Chỉ doanh nghiệp lớn mới được dùng.", correct: false, explain: "Sai." },
            { text: "Tích hợp bảo mật & truy cập của OCI; hạ tầng managed hoàn toàn, dịch vụ lo bảo trì, vá lỗi, nâng cấp.", correct: true, explain: "Đúng. Người dùng không phải nghĩ tới cấp phát compute/storage (bài 6.2)." },
            { text: "Chia sẻ tài sản để giảm việc trùng lặp.", correct: false, explain: "Sai. Đó là nguyên tắc <strong>collaborative</strong>." },
            { text: "Cung cấp thư viện mã nguồn mở và compute dễ truy cập cho từng data scientist.", correct: false, explain: "Sai. Đó là nguyên tắc <strong>accelerated</strong>." },
          ],
        },
        {
          q: "Vì sao GPU phù hợp với workload AI hơn CPU?",
          options: [
            { text: "Vì GPU có ít lõi nhưng mỗi lõi rất mạnh.", correct: false, explain: "Sai — ngược lại." },
            { text: "Vì GPU có hàng nghìn lõi nhẹ xử lý song song, nghiền dữ liệu lớn nhanh và cho thông lượng suy luận cao.", correct: true, explain: "Đúng (bài 6.3)." },
            { text: "Vì GPU không cần bộ nhớ.", correct: false, explain: "Sai. H200 nổi bật chính nhờ nhiều bộ nhớ hơn." },
            { text: "Vì GPU chỉ chạy được TensorFlow.", correct: false, explain: "Sai. GPU tối ưu cho TensorFlow, PyTorch, ONNX Runtime." },
          ],
        },
        {
          q: "Kiến trúc NVIDIA nào giới thiệu <strong>transformer engine</strong> chuyên dụng?",
          options: [
            { text: "Ampere (A100)", correct: false, explain: "Sai. Ampere nổi bật với Tensor Cores (2020)." },
            { text: "Hopper (H100)", correct: true, explain: "Đúng. Hopper ra mắt cùng H100 năm 2022, có transformer engine tối ưu mô hình transformer (bài 6.3)." },
            { text: "Grace CPU", correct: false, explain: "Sai. Grace là CPU cho trung tâm dữ liệu." },
            { text: "L40S", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "RDMA mang lại điều gì cho workload GPU?",
          options: [
            { text: "Truyền dữ liệu giữa các máy qua CPU để kiểm tra từng gói.", correct: false, explain: "Sai. RDMA bỏ qua CPU." },
            { text: "Truyền dữ liệu giữa máy này và máy khác bỏ qua CPU → độ trễ cực thấp, băng thông cao, ít tốn CPU.", correct: true, explain: "Đúng (bài 6.4)." },
            { text: "Nén dữ liệu để tiết kiệm ổ đĩa.", correct: false, explain: "Sai." },
            { text: "Mã hóa dữ liệu bằng khóa trong OCI Vault.", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Workload nhỏ, nhạy độ trễ (vd. HPC hay cluster database) được Supercluster xử lý thế nào?",
          options: [
            { text: "Luôn trải đều trên mọi block để cân bằng tải.", correct: false, explain: "Sai — làm vậy sẽ tăng độ trễ." },
            { text: "Control plane đặt (placement) gọn trong một block để hưởng độ trễ ~6,5 µs.", correct: true, explain: "Đúng. Placement cân bằng giữa quy mô và độ trễ (bài 6.4)." },
            { text: "Chuyển sang mạng Internet công khai.", correct: false, explain: "Sai." },
            { text: "Tắt chế độ lossless để chạy nhanh hơn.", correct: false, explain: "Sai. Mạng luôn lossless." },
          ],
        },
        {
          q: "Ba nguyên tắc định hướng để AI đáng tin cậy là gì?",
          options: [
            { text: "Nhanh, rẻ, chính xác.", correct: false, explain: "Sai." },
            { text: "Lawful (hợp pháp), ethical (có đạo đức), robust (vững vàng về kỹ thuật và xã hội).", correct: true, explain: "Đúng (bài 6.5)." },
            { text: "Inform, block, mask.", correct: false, explain: "Sai. Đó là các khái niệm guardrail ở bài 5.12." },
            { text: "Developers, deployers, end users.", correct: false, explain: "Sai. Đó là các vai trò trong quy trình triển khai." },
          ],
        },
      ],
    },
  ],
};
