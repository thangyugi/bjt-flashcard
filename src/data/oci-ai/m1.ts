import type { OciModule } from "./types";

/** Phần 1 — trích nguyên văn từ docs/OCIAI/Nền Tảng AI Cùng OCI.html (module 2 khóa gốc). */
export const m1: OciModule = {
  id: "m1",
  num: 1,
  origModule: 2,
  title: "Nhập môn AI Foundations",
  desc: "AI là gì, vì sao cần AI, các tác vụ AI theo dữ liệu (ngôn ngữ, âm thanh, hình ảnh) và phân biệt AI – ML – DL.",
  lessons: [
    {
      id: "m1-l1",
      code: "1.1",
      kind: "lesson",
      title: "AI là gì? Vì sao thế giới cần AI?",
      navTitle: "AI là gì? Vì sao cần AI?",
      minutes: 7,
      source: "Introduction to AI",
      html: `<h2>Trí tuệ con người có những gì?</h2>
<p>Trước khi định nghĩa AI, hãy liệt kê xem trí tuệ con người thực sự làm được những gì: học kỹ năng mới qua quan sát, hiểu các khái niệm trừu tượng và suy luận, giao tiếp bằng ngôn ngữ lẫn cử chỉ phi ngôn ngữ (biểu cảm khuôn mặt, ngữ điệu, ngôn ngữ cơ thể), xử lý tình huống bất ngờ trong thời gian thực, lập kế hoạch ngắn và dài hạn, và — quan trọng nhất — sáng tạo ra thứ hoàn toàn mới như âm nhạc, nghệ thuật hay một ý tưởng gốc.</p>
<p>Nếu một cỗ máy có thể tái hiện <em>bất kỳ</em> khả năng nào ở trên, đó gọi là <dfn>AGI</dfn> <span class="gloss">(Artificial General Intelligence — trí tuệ nhân tạo tổng quát, máy có thể tự học và xử lý mọi loại nhiệm vụ như con người, không giới hạn một việc cụ thể)</span>. Khi ta chỉ áp dụng AGI để giải một bài toán hẹp, có mục tiêu cụ thể, ta gọi đó là <dfn>AI</dfn> <span class="gloss">(Artificial Intelligence — trí tuệ nhân tạo: khả năng của máy móc mô phỏng năng lực nhận thức và giải quyết vấn đề của con người)</span>.</p>

<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Ví dụ đời thường</div>
  <p>Bạn đã dùng AI nhiều hơn bạn nghĩ: nhìn một tấm ảnh và nói đó là quả táo hay quả cam, đọc một email và xác định nó có phải thư rác (spam) không, viết code tự động, hay dự đoán giá một chiếc xe cũ — tất cả đều là các bài toán AI hẹp, có mục tiêu rõ ràng.</p>
</div>

<h2>Vì sao cả thế giới đổ xô học AI?</h2>
<p>Một khảo sát của Microsoft &amp; LinkedIn trên 31.000 người tại 31 quốc gia cho thấy ba xu hướng đáng chú ý:</p>
<div class="tbl-wrap"><table>
<thead><tr><th>Xu hướng</th><th>Con số</th></tr></thead>
<tbody>
<tr><td>Nhân viên tri thức đã dùng AI trong công việc</td><td>75%</td></tr>
<tr><td>Bắt đầu dùng AI trong 6 tháng gần nhất</td><td>46%</td></tr>
<tr><td>Lãnh đạo sẽ không tuyển người thiếu kỹ năng AI</td><td>66%</td></tr>
<tr><td>Lãnh đạo thà tuyển người ít kinh nghiệm hơn nhưng biết AI</td><td>71%</td></tr>
</tbody>
</table></div>
<p>Nói cách khác: năng lực AI đang thay thế thâm niên làm tiêu chí tuyển dụng, ở mọi ngành nghề — kinh doanh, kỹ thuật, sáng tạo.</p>

<h2>Hai lý do cốt lõi cần AI</h2>
<ol>
  <li><strong>Giảm tải công việc lặp lại (routine tasks):</strong> duyệt thẻ tín dụng, xử lý hồ sơ bảo hiểm, gợi ý sản phẩm cho khách hàng — những việc khối lượng lớn, quy tắc rõ, rất phù hợp để máy làm thay.</li>
  <li><strong>Một "người bạn thông minh":</strong> con người muốn có một cộng sự có thể viết truyện, làm thơ, thiết kế, sáng tác nhạc và thậm chí hiểu được sự hài hước — đây là phần việc sáng tạo mà AI hiện đại (đặc biệt Generative AI) đang làm được.</li>
</ol>

<h2>AI len lỏi vào mọi lĩnh vực</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Lĩnh vực AI</th><th>Ví dụ ứng dụng</th></tr></thead>
<tbody>
<tr><td>Ngôn ngữ (Language)</td><td>Dịch thuật tự động</td></tr>
<tr><td>Thị giác (Vision)</td><td>Phân loại hình ảnh</td></tr>
<tr><td>Giọng nói (Speech)</td><td>Chuyển văn bản → giọng nói (text-to-speech)</td></tr>
<tr><td>Gợi ý (Recommendation)</td><td>Bán chéo sản phẩm (cross-sell)</td></tr>
<tr><td>Phát hiện bất thường (Anomaly detection)</td><td>Phát hiện giao dịch gian lận</td></tr>
<tr><td>Học theo phần thưởng (Reinforcement)</td><td>Xe tự lái</td></tr>
<tr><td>Dự báo (Forecasting)</td><td>Dự báo thời tiết</td></tr>
<tr><td>Sinh nội dung (Generative)</td><td>Tạo ảnh từ mô tả văn bản</td></tr>
</tbody>
</table></div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p><strong>AGI</strong> = máy làm được mọi việc như người. <strong>AI</strong> = AGI thu hẹp lại để giải một việc cụ thể. Thế giới cần AI vì hai lý do: cắt giảm việc lặp lại quy mô lớn, và có thêm một "cộng sự sáng tạo". AI đã hiện diện trong tám lĩnh vực chính, từ ngôn ngữ đến sinh nội dung.</p>
</div>`,
    },
    {
      id: "m1-l2",
      code: "1.2",
      kind: "lesson",
      title: "Dữ liệu & tác vụ AI: ngôn ngữ, âm thanh, hình ảnh",
      navTitle: "Dữ liệu & tác vụ AI",
      minutes: 9,
      source: "AI - Tasks and Data",
      html: `<p>AI được chia theo <strong>loại dữ liệu đầu vào</strong>. Bài này đi qua ba miền dữ liệu chính trong khóa học: ngôn ngữ (language), âm thanh/giọng nói (speech), và hình ảnh (vision) — mỗi miền lại chia thành hai nhóm tác vụ: <dfn>tác vụ liên quan (related tasks)</dfn> <span class="gloss">(nhận dữ liệu, trả về nhãn/thông tin — ví dụ: đây có phải spam không)</span> và <dfn>tác vụ sinh (generative tasks)</dfn> <span class="gloss">(mô hình tự tạo ra dữ liệu mới, ví dụ viết một đoạn văn mới)</span>.</p>

<h2>1. Ngôn ngữ (Language)</h2>
<p>Tác vụ liên quan tới văn bản: nhận diện ngôn ngữ, trích xuất thực thể (entity), trích xuất cụm từ khóa… Tác vụ sinh: viết truyện/thơ, tóm tắt văn bản, trả lời câu hỏi — ví dụ điển hình là ChatGPT.</p>
<p>Để máy "đọc hiểu" văn bản, có 3 bước biến đổi bắt buộc:</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 720 150" role="img" aria-label="Pipeline xử lý văn bản: câu văn qua Tokenization thành token, qua Padding để đồng độ dài, qua Embedding thành vector số.">
    <defs>
      <marker id="arr1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="currentColor"/>
      </marker>
    </defs>
    <g font-size="12.5" fill="currentColor">
      <rect x="10" y="45" width="150" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <text x="85" y="68" text-anchor="middle" font-weight="700">Câu văn</text>
      <text x="85" y="86" text-anchor="middle" font-size="11" opacity=".75">"AI is useful"</text>

      <line x1="160" y1="75" x2="204" y2="75" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr1)"/>
      <text x="182" y="65" text-anchor="middle" font-size="11" opacity=".8">Tokenization</text>

      <rect x="210" y="45" width="150" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <text x="285" y="68" text-anchor="middle" font-weight="700">Token / số</text>
      <text x="285" y="86" text-anchor="middle" font-size="11" opacity=".75">[54, 12, 903]</text>

      <line x1="360" y1="75" x2="404" y2="75" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr1)"/>
      <text x="382" y="65" text-anchor="middle" font-size="11" opacity=".8">Padding</text>

      <rect x="410" y="45" width="150" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <text x="485" y="68" text-anchor="middle" font-weight="700">Độ dài bằng nhau</text>
      <text x="485" y="86" text-anchor="middle" font-size="11" opacity=".75">[54,12,903,0,0]</text>

      <line x1="560" y1="75" x2="604" y2="75" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr1)"/>
      <text x="582" y="65" text-anchor="middle" font-size="11" opacity=".8">Embedding</text>

      <rect x="610" y="45" width="100" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="660" y="68" text-anchor="middle" font-weight="700">Vector</text>
      <text x="660" y="86" text-anchor="middle" font-size="11" opacity=".75">[.2,-.7,…]</text>
    </g>
  </svg>
  <figcaption>Ba bước bắt buộc để máy hiểu văn bản: cắt thành token, đệm cho bằng độ dài, rồi mã hóa thành vector số (embedding).</figcaption>
</figure>

<ul>
  <li><dfn>Tokenization</dfn> <span class="gloss">(token hóa — cắt câu thành từng từ/mảnh từ và gán một con số cho mỗi mảnh, vì mô hình chỉ hiểu số)</span>.</li>
  <li><dfn>Padding</dfn> <span class="gloss">(đệm — các câu dài ngắn khác nhau, cần "độn" cho bằng độ dài để xử lý hàng loạt)</span>.</li>
  <li><dfn>Embedding</dfn> <span class="gloss">(nhúng — biểu diễn một từ/câu bằng một vector số; hai từ càng giống nghĩa thì vector càng gần nhau)</span>, đo độ gần bằng <dfn>cosine similarity</dfn> <span class="gloss">(độ tương đồng cô-sin — thước đo góc giữa hai vector, giá trị càng gần 1 càng giống nhau)</span> hoặc <dfn>dot similarity</dfn> <span class="gloss">(tích vô hướng — một cách khác để đo độ giống nhau giữa hai vector)</span>.</li>
</ul>
<p>Kiến trúc deep learning hay dùng cho ngôn ngữ: <dfn>RNN</dfn> <span class="gloss">(Recurrent Neural Network — mạng hồi quy, xử lý dữ liệu tuần tự, nhớ trạng thái ẩn)</span>, <dfn>LSTM</dfn> <span class="gloss">(Long Short-Term Memory — biến thể RNN nhớ ngữ cảnh tốt hơn nhờ các "cổng")</span>, và <dfn>Transformer</dfn> <span class="gloss">(kiến trúc xử lý song song toàn câu, dùng cơ chế tự chú ý self-attention)</span>.</p>

<h2>2. Âm thanh &amp; giọng nói (Speech)</h2>
<p>Tác vụ liên quan: chuyển giọng nói thành văn bản (speech-to-text), nhận diện người nói, chuyển đổi giọng. Tác vụ sinh: sáng tác nhạc, tổng hợp giọng nói (speech synthesis).</p>
<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Ví dụ: đĩa CD được "số hóa" như thế nào?</div>
  <p>Âm thanh được ghi lại dưới dạng các lát cắt theo thời gian. <dfn>Sample rate</dfn> <span class="gloss">(tần số lấy mẫu — số lần "chụp" âm thanh trong một giây)</span> tiêu chuẩn của CD là 44.1kHz, tức 44.100 lần/giây. <dfn>Bit depth</dfn> <span class="gloss">(độ sâu bit — mỗi lần chụp lưu bao nhiêu thông tin)</span> quyết định độ chi tiết của mỗi lát cắt đó. Nghe một mẫu duy nhất thì vô nghĩa — phải nghe nhiều mẫu liên tiếp mới "ra bài hát".</p>
</div>
<p>Kiến trúc hay dùng: RNN, LSTM, Transformer, <dfn>Variational Autoencoder</dfn> <span class="gloss">(bộ mã hóa tự động biến phân — học cách nén rồi tái tạo lại dữ liệu)</span>, waveform models, Siamese networks — tất cả đều tận dụng tính chất tuần tự của âm thanh.</p>

<h2>3. Hình ảnh (Vision)</h2>
<p>Tác vụ liên quan: phân loại ảnh, nhận diện vật thể, đặc biệt là <dfn>facial recognition</dfn> <span class="gloss">(nhận diện khuôn mặt — dùng trong an ninh, sinh trắc học, mạng xã hội)</span>. Tác vụ sinh: tạo ảnh từ mô tả văn bản, tạo ảnh độ phân giải cao, tạo mô hình 3D.</p>
<p>Ảnh gồm các <dfn>pixel</dfn> <span class="gloss">(điểm ảnh — đơn vị nhỏ nhất của ảnh số, có thể là mức xám hoặc màu)</span> — nhìn một pixel đơn lẻ thì vô nghĩa, phải nhìn cả cụm mới "ra hình". Kiến trúc phổ biến: <dfn>CNN</dfn> <span class="gloss">(Convolutional Neural Network — mạng nơ-ron tích chập, giỏi phát hiện mẫu hình trong ảnh)</span>, <dfn>YOLO</dfn> <span class="gloss">(You Only Look Once — mô hình phát hiện vật thể xử lý cả ảnh trong một lượt duy nhất)</span>, và <dfn>GAN</dfn> <span class="gloss">(Generative Adversarial Network — mạng đối nghịch tạo sinh, sinh ảnh giả trông như thật)</span>.</p>

<h2>Các tác vụ AI khác</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Tác vụ</th><th>Loại dữ liệu cần</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td><dfn>Anomaly detection</dfn> <span class="gloss">(phát hiện bất thường)</span></td><td>Dữ liệu chuỗi thời gian (đơn/đa biến)</td><td>Gian lận thẻ, máy hỏng</td></tr>
<tr><td>Recommendation (gợi ý)</td><td>Dữ liệu sản phẩm/người dùng tương tự</td><td>Gợi ý phim, sản phẩm</td></tr>
<tr><td>Forecasting (dự báo)</td><td>Dữ liệu chuỗi thời gian</td><td>Thời tiết, giá cổ phiếu</td></tr>
</tbody>
</table></div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Mọi loại dữ liệu (chữ, âm thanh, ảnh) đều phải được chuyển thành <strong>số</strong> trước khi AI xử lý được. Mỗi miền dữ liệu có tác vụ "liên quan" (nhận diện, phân loại) và tác vụ "sinh" (tạo cái mới), và mỗi miền có bộ kiến trúc mạng nơ-ron riêng phù hợp với đặc tính tuần tự (ngôn ngữ, âm thanh) hoặc không gian hai chiều (ảnh) của nó.</p>
</div>`,
    },
    {
      id: "m1-l3",
      code: "1.3",
      kind: "lesson",
      title: "Demo thực tế: các dịch vụ AI của OCI",
      navTitle: "Demo: dịch vụ AI của OCI",
      minutes: 8,
      source: "Demo: AI",
      html: `<p>Bài này tóm tắt lại một demo trực quan trên hai dịch vụ AI có sẵn của OCI (Oracle Cloud Infrastructure): <strong>Vision AI</strong> và <strong>Language AI</strong>. Mục tiêu không phải nhớ từng thao tác bấm chuột, mà hiểu được <em>đầu vào → đầu ra</em> của mỗi dịch vụ trông như thế nào trong thực tế.</p>

<h2>OCI Vision AI Service</h2>
<p>Dịch vụ này cho 4 khả năng: <dfn>image classification</dfn> <span class="gloss">(phân loại ảnh — gắn nhãn mô tả nội dung ảnh)</span>, <dfn>object detection</dfn> <span class="gloss">(phát hiện vật thể — khoanh vùng và định vị từng vật thể trong ảnh)</span>, <dfn>text detection</dfn> <span class="gloss">(phát hiện văn bản trong ảnh — OCR)</span>, và <dfn>Document AI</dfn> <span class="gloss">(hiện đã đổi tên thành Document Understanding — trích xuất dữ liệu có cấu trúc từ tài liệu)</span>.</p>

<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Kết quả phân loại ảnh (ví dụ trong demo)</div>
  <div class="tbl-wrap"><table>
  <thead><tr><th>Ảnh đầu vào</th><th>Nhãn được gán</th><th>Độ tin cậy (confidence score)</th></tr></thead>
  <tbody>
    <tr><td>Ảnh phong cảnh</td><td>Vegetation (thảm thực vật)</td><td>99.23%</td></tr>
    <tr><td>Ảnh ngựa vằn</td><td>Zebra, Animal, Grassland, Vegetation</td><td>Nhiều nhãn, mỗi nhãn một điểm tin cậy riêng</td></tr>
    <tr><td>Ảnh 2 con ngựa vằn</td><td>Zebra, Animal, Vegetation, Sky, Mammal</td><td>—</td></tr>
  </tbody>
  </table></div>
  <p><strong>Điểm mấu chốt:</strong> mô hình không trả lời "đúng/sai" tuyệt đối — nó trả về xác suất. 99.23% nghĩa là mô hình "gần như chắc chắn" chứ không phải 100% chắc chắn.</p>
</div>

<p>Với <strong>object detection</strong>, thay vì một nhãn cho cả ảnh, dịch vụ vẽ nhiều khung bao (bounding box) — ví dụ ảnh giao thông cho ra nhiều khung: "car", "taxi", "person"; ảnh giỏ trái cây cho ra "orange", "banana", "apple", "bowl" — mỗi khung kèm một điểm tin cậy riêng.</p>

<p>Với <strong>text detection</strong>, dịch vụ đọc chữ trên ảnh theo từng dòng — kể cả biển số xe, chữ nhỏ, hay nhiều kiểu phông chữ khác nhau trong cùng một ảnh.</p>

<p>Với <strong>Document Understanding</strong> (áp dụng cho hóa đơn/biên lai), dịch vụ không chỉ đọc chữ thô mà còn:</p>
<ul>
  <li>Trích xuất <dfn>key-value pairs</dfn> <span class="gloss">(cặp khóa–giá trị — ví dụ: "Ngày giao dịch" → "05/09/2026")</span> như ngày giờ giao dịch, subtotal, thuế, tổng tiền.</li>
  <li>Trích xuất <strong>bảng biểu</strong> — ví dụ biên lai có 3 bảng: bảng mặt hàng, bảng tổng, bảng mã xác thực thẻ.</li>
</ul>

<h2>OCI Language AI Service</h2>
<p>Dịch vụ này có 2 nhóm chức năng chính: <strong>phân tích văn bản (text analysis)</strong> và <strong>dịch văn bản (text translation)</strong>.</p>

<div class="tbl-wrap"><table>
<thead><tr><th>Chức năng phân tích</th><th>Kết quả trả về</th></tr></thead>
<tbody>
<tr><td>Language detection (nhận diện ngôn ngữ)</td><td>Ví dụ: "English"</td></tr>
<tr><td>Text classification (phân loại chủ đề)</td><td>Ví dụ: "Science &amp; Technology"</td></tr>
<tr><td>Entity extraction (trích xuất thực thể)</td><td>Gắn nhãn thực thể: product, event…, kèm điểm tin cậy</td></tr>
<tr><td>Key phrase extraction (trích cụm từ khóa)</td><td>Ví dụ: "early computers", "simple manual instruments"</td></tr>
<tr><td>Aspect-based sentiment (cảm xúc theo khía cạnh)</td><td>Mỗi khía cạnh (vd: "food", "service") có điểm và nhãn tích cực/tiêu cực riêng</td></tr>
<tr><td>Sentence-level sentiment (cảm xúc theo câu)</td><td>Nhãn: tiêu cực / trung lập / tích cực</td></tr>
<tr><td>PII detection (dữ liệu cá nhân nhạy cảm)</td><td>Gắn cờ cảnh báo, ví dụ mốc thời gian lịch sử nhạy cảm</td></tr>
</tbody>
</table></div>

<p>Với <strong>text translation</strong>: chọn ngôn ngữ nguồn và đích (ví dụ tiếng Anh → tiếng Pháp, tiếng Anh → tiếng Nhật), bấm dịch và nhận kết quả gần như tức thì. Dịch vụ cũng cho phép huấn luyện <dfn>custom model</dfn> <span class="gloss">(mô hình tùy chỉnh — huấn luyện thêm bằng dữ liệu riêng của bạn để tăng độ chính xác cho lĩnh vực cụ thể)</span> nếu có dữ liệu riêng.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Vision AI xử lý <strong>ảnh</strong> (phân loại, phát hiện vật thể, đọc chữ, hiểu tài liệu); Language AI xử lý <strong>văn bản</strong> (phân tích ngôn ngữ + dịch thuật). Cả hai đều trả về kết quả kèm <strong>điểm tin cậy (confidence score)</strong> — một con số xác suất, không phải khẳng định tuyệt đối.</p>
</div>`,
    },
    {
      id: "m1-l4",
      code: "1.4",
      kind: "lesson",
      title: "AI so với ML so với DL — phân biệt rạch ròi",
      navTitle: "AI so với ML so với DL",
      minutes: 6,
      source: "AI vs ML vs DL",
      html: `<p>Ba thuật ngữ <dfn>AI</dfn>, <dfn>ML</dfn> <span class="gloss">(Machine Learning — học máy)</span>, <dfn>DL</dfn> <span class="gloss">(Deep Learning — học sâu)</span> hay bị dùng lẫn lộn. Thực ra chúng là các vòng tròn <strong>lồng nhau</strong>, vòng sau là tập con của vòng trước:</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 460 340" role="img" aria-label="Sơ đồ vòng tròn lồng nhau: AI là vòng ngoài cùng, chứa Machine Learning, chứa Deep Learning, chứa Generative AI ở trong cùng.">
    <g fill="none" stroke="currentColor">
      <circle cx="230" cy="180" r="150" stroke-width="1.5" opacity=".55"/>
      <circle cx="230" cy="195" r="112" stroke-width="1.5" opacity=".7"/>
      <circle cx="230" cy="210" r="74" stroke-width="1.5" opacity=".85"/>
      <circle cx="230" cy="225" r="38" stroke-width="2"/>
    </g>
    <g font-family="Sora, sans-serif" text-anchor="middle" fill="currentColor">
      <text x="230" y="45" font-size="15" font-weight="700">AI</text>
      <text x="230" y="61" font-size="10.5" opacity=".7">Trí tuệ nhân tạo</text>
      <text x="230" y="98" font-size="13.5" font-weight="700">Machine Learning</text>
      <text x="230" y="113" font-size="10" opacity=".7">Học máy</text>
      <text x="230" y="148" font-size="12.5" font-weight="700">Deep Learning</text>
      <text x="230" y="162" font-size="10" opacity=".7">Học sâu</text>
      <text x="230" y="221" font-size="11.5" font-weight="700">Generative AI</text>
      <text x="230" y="234" font-size="9.5" opacity=".75">AI tạo sinh</text>
    </g>
  </svg>
  <figcaption>AI là khái niệm rộng nhất; ML là một cách để đạt AI; DL là một kỹ thuật ML dùng mạng nơ-ron nhiều lớp; Generative AI là một nhánh của DL chuyên tạo nội dung mới.</figcaption>
</figure>

<div class="tbl-wrap"><table>
<thead><tr><th></th><th>Định nghĩa</th><th>Ví dụ minh họa</th></tr></thead>
<tbody>
<tr><td><strong>AI</strong></td><td>Khái niệm rộng: xây dựng máy/hệ thống làm được việc vốn cần trí tuệ con người.</td><td>Xe tự lái quyết định như tài xế: né người đi bộ, chuyển làn an toàn.</td></tr>
<tr><td><strong>ML</strong></td><td>Tập con của AI: các thuật toán học từ dữ liệu để dự đoán/quyết định, thay vì lập trình luật cứng.</td><td>Bộ lọc thư rác tự học và chuyển email spam vào đúng thư mục, dựa trên hành vi người dùng.</td></tr>
<tr><td><strong>DL</strong></td><td>Tập con của ML: dùng mạng nơ-ron sâu (nhiều lớp) để học các mẫu hình phức tạp.</td><td>Phần mềm nhận diện ảnh nhận ra con mèo trong hàng triệu bức ảnh trên internet.</td></tr>
</tbody>
</table></div>

<h2>Thuật toán (algorithm) trong ML nghĩa là gì?</h2>
<p>Trong ngữ cảnh ML, <dfn>algorithm</dfn> <span class="gloss">(thuật toán — tập hợp quy tắc, công thức toán học hoặc quy trình mà mô hình dùng để học từ dữ liệu và đưa ra dự đoán)</span> không phải đoạn code cố định, mà là "công thức học" — nó tự điều chỉnh dựa trên dữ liệu được đưa vào.</p>

<h2>Ba kiểu học của Machine Learning</h2>
<ul>
  <li><strong>Supervised learning</strong> <span class="gloss">(học có giám sát)</span>: học từ dữ liệu đã có nhãn (label), tìm quy luật ánh xạ từ đầu vào ra đầu ra.</li>
  <li><strong>Unsupervised learning</strong> <span class="gloss">(học không giám sát)</span>: dữ liệu không có nhãn, thuật toán tự tìm cấu trúc/nhóm ẩn bên trong.</li>
  <li><strong>Reinforcement learning</strong> <span class="gloss">(học tăng cường)</span>: agent (tác nhân) học qua thử-sai, dựa vào phần thưởng và hình phạt từ môi trường.</li>
</ul>
<p>Ba kiểu học này sẽ được đào sâu lần lượt trong Phần 2 của khóa học.</p>

<h2>Neural Network &amp; Generative AI — vài khái niệm lót đường</h2>
<p><dfn>Neural network</dfn> <span class="gloss">(mạng nơ-ron — nhiều "tế bào" tính toán kết nối với nhau, mô phỏng lỏng lẻo theo não bộ)</span> là công cụ cốt lõi của DL, đặc biệt mạnh cho bài toán <dfn>functional approximation</dfn> <span class="gloss">(xấp xỉ hàm số — ước lượng một hàm ẩn dựa trên dữ liệu quan sát được)</span>.</p>
<p><dfn>Generative AI</dfn> <span class="gloss">(AI tạo sinh — tập con của ML/DL, các mô hình tạo ra nội dung mới: văn bản, ảnh, âm thanh…)</span> học các mẫu hình từ dữ liệu có sẵn rồi "sáng tác" nội dung mới dựa trên các mẫu hình đó — ví dụ ChatGPT sinh câu trả lời dựa trên các mẫu hình ngôn ngữ nó học được. Đây chính là chủ đề của Phần 4.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Hãy nhớ theo thứ tự lồng nhau: <strong>AI ⊃ ML ⊃ DL ⊃ Generative AI</strong>. Mỗi vòng trong là một cách "chuyên biệt hóa" hơn để đạt được AI. ML có 3 kiểu học: có giám sát, không giám sát, tăng cường.</p>
</div>`,
    },
    {
      id: "m1-summary",
      code: "★",
      kind: "summary",
      title: "★ Tổng kết Phần 1 & Trắc nghiệm",
      navTitle: "Tổng kết & Trắc nghiệm",
      note: "Ôn lại 4 bài học + làm 5 câu trắc nghiệm",
      html: `<p>Bốn bài vừa qua trả lời 4 câu hỏi nền tảng: <em>AI là gì và vì sao cần nó, dữ liệu AI trông ra sao, các dịch vụ AI thật trông ra sao, và AI/ML/DL khác nhau thế nào.</em> Hãy nhìn lại bức tranh tổng thể trước khi làm trắc nghiệm.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 680 320" role="img" aria-label="Sơ đồ liên hệ 4 bài học Phần 1, xoay quanh chủ đề trung tâm AI Foundations, nối tới bốn nhánh: vì sao cần AI, dữ liệu và tác vụ AI, dịch vụ OCI AI, và phân biệt AI-ML-DL.">
    <defs>
      <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="currentColor"/>
      </marker>
    </defs>
    <g stroke="currentColor" stroke-width="1.4" fill="none" opacity=".8">
      <line x1="340" y1="160" x2="150" y2="60" marker-end="url(#arr2)"/>
      <line x1="340" y1="160" x2="530" y2="60" marker-end="url(#arr2)"/>
      <line x1="340" y1="160" x2="150" y2="260" marker-end="url(#arr2)"/>
      <line x1="340" y1="160" x2="530" y2="260" marker-end="url(#arr2)"/>
    </g>
    <g font-family="Sora, sans-serif" text-anchor="middle" fill="currentColor">
      <circle cx="340" cy="160" r="58" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="340" y="156" font-size="13.5" font-weight="700">AI</text>
      <text x="340" y="172" font-size="13.5" font-weight="700">Foundations</text>

      <rect x="55" y="25" width="190" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="150" y="46" font-size="11.5" font-weight="700">1.1 Vì sao cần AI</text>
      <text x="150" y="63" font-size="10" opacity=".7">AGI vs AI · 2 lý do cốt lõi</text>

      <rect x="435" y="25" width="190" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="530" y="46" font-size="11.5" font-weight="700">1.2 Dữ liệu &amp; tác vụ</text>
      <text x="530" y="63" font-size="10" opacity=".7">Ngôn ngữ · Giọng nói · Ảnh</text>

      <rect x="55" y="225" width="190" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="150" y="246" font-size="11.5" font-weight="700">1.3 Demo dịch vụ OCI</text>
      <text x="150" y="263" font-size="10" opacity=".7">Vision AI · Language AI</text>

      <rect x="435" y="225" width="190" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="530" y="246" font-size="11.5" font-weight="700">1.4 AI vs ML vs DL</text>
      <text x="530" y="263" font-size="10" opacity=".7">Vòng tròn lồng nhau</text>
    </g>
  </svg>
  <figcaption>Bốn bài học Phần 1 bổ trợ nhau: hiểu "vì sao" trước, rồi tới "dữ liệu trông ra sao", "dịch vụ thật hoạt động thế nào", và cuối cùng "định vị các khái niệm".</figcaption>
</figure>

<div class="summary-grid">
  <div class="sum-card">
    <h4>1.1 — AI là gì? Vì sao cần AI?</h4>
    <ul>
      <li>AGI = mô phỏng mọi năng lực người; AI = AGI áp cho một mục tiêu hẹp.</li>
      <li>2 lý do cần AI: giảm việc lặp lại quy mô lớn, và có "cộng sự sáng tạo".</li>
      <li>8 lĩnh vực AI: ngôn ngữ, thị giác, giọng nói, gợi ý, bất thường, tăng cường, dự báo, sinh nội dung.</li>
    </ul>
  </div>
  <div class="sum-card">
    <h4>1.2 — Dữ liệu &amp; tác vụ AI</h4>
    <ul>
      <li>Văn bản: tokenization → padding → embedding, đo bằng cosine/dot similarity.</li>
      <li>Âm thanh: số hóa theo sample rate &amp; bit depth.</li>
      <li>Ảnh: đơn vị là pixel; CNN, YOLO, GAN là kiến trúc chủ lực.</li>
    </ul>
  </div>
  <div class="sum-card">
    <h4>1.3 — Demo dịch vụ OCI AI</h4>
    <ul>
      <li>Vision AI: phân loại ảnh, phát hiện vật thể, đọc chữ, hiểu tài liệu.</li>
      <li>Language AI: phân tích văn bản (ngôn ngữ, chủ đề, thực thể, cảm xúc, PII) + dịch thuật.</li>
      <li>Mọi kết quả đều kèm điểm tin cậy (confidence score) — là xác suất, không phải khẳng định tuyệt đối.</li>
    </ul>
  </div>
  <div class="sum-card">
    <h4>1.4 — AI vs ML vs DL</h4>
    <ul>
      <li>Quan hệ lồng nhau: AI ⊃ ML ⊃ DL ⊃ Generative AI.</li>
      <li>ML có 3 kiểu học: có giám sát, không giám sát, tăng cường.</li>
      <li>DL dùng neural network nhiều lớp để học mẫu hình phức tạp.</li>
    </ul>
  </div>
</div>

<h2>Trắc nghiệm ôn tập Phần 1</h2>
<p>Chọn một đáp án cho mỗi câu rồi bấm <strong>Nộp bài</strong>. Sau khi nộp, mọi lựa chọn sẽ hiện giải thích vì sao đúng / vì sao sai.</p>`,
      quiz: [
        {
          q: "Câu 1. AGI khác AI ở điểm nào?",
          options: [
            { text: "AGI chỉ là tên gọi cũ, thực chất không khác gì AI.", correct: false, explain: "Sai. Bài học phân biệt rõ: AGI có phạm vi rộng hơn AI, không phải cùng một khái niệm đổi tên." },
            { text: "AGI mô phỏng mọi năng lực trí tuệ người trên nhiều nhiệm vụ; AI là khi áp dụng AGI cho một mục tiêu hẹp, cụ thể.", correct: true, explain: "Đúng. Đây đúng như định nghĩa trong bài 1.1: AGI = tổng quát, đa nhiệm; AI = áp dụng cho một bài toán cụ thể, có mục tiêu hẹp." },
            { text: "AGI chỉ dùng để xử lý ảnh, AI chỉ dùng để xử lý văn bản.", correct: false, explain: "Sai. Sự khác biệt giữa AGI và AI không nằm ở loại dữ liệu (ảnh/văn bản) mà ở phạm vi năng lực (tổng quát hay chuyên biệt)." },
            { text: "AGI là AI đã thương mại hóa, AI là AI còn trong phòng thí nghiệm.", correct: false, explain: "Sai. Đây không phải tiêu chí phân biệt được đề cập — bài học không nói về mức độ thương mại hóa." },
          ],
        },
        {
          q: "Câu 2. Đâu là MỘT trong hai lý do cốt lõi khiến thế giới cần AI, theo bài học?",
          options: [
            { text: "Giảm chi phí lưu trữ dữ liệu trên máy chủ.", correct: false, explain: "Sai. Bài học không nhắc tới chi phí lưu trữ — đây không phải lý do được nêu." },
            { text: "Giảm bớt khối lượng công việc lặp lại (routine tasks) quy mô lớn, ví dụ duyệt hồ sơ vay hay bảo hiểm.", correct: true, explain: "Đúng. Đây chính là lý do thứ nhất trong bài 1.1: loại bỏ/giảm việc lặp lại số lượng lớn như duyệt thẻ, xử lý bảo hiểm, gợi ý sản phẩm." },
            { text: "Tăng số lượng nhân viên cần tuyển dụng mỗi năm.", correct: false, explain: "Sai. Ngược lại — AI được dùng để giảm việc lặp lại chứ không phải để tăng nhu cầu tuyển dụng." },
            { text: "Thay thế hoàn toàn nhu cầu sáng tạo của con người.", correct: false, explain: "Sai. Bài học mô tả AI như một \"người bạn/cộng sự sáng tạo\" bổ trợ con người, không phải để thay thế hoàn toàn." },
          ],
        },
        {
          q: "Câu 3. Bước nào trong xử lý văn bản giúp các câu có độ dài khác nhau được xử lý đồng loạt?",
          options: [
            { text: "Tokenization", correct: false, explain: "Sai. Tokenization chỉ cắt câu thành token và gán số, không xử lý vấn đề độ dài khác nhau." },
            { text: "Padding", correct: true, explain: "Đúng. Padding \"đệm\" thêm để mọi câu trong lô dữ liệu có cùng độ dài, phục vụ xử lý hàng loạt." },
            { text: "Embedding", correct: false, explain: "Sai. Embedding biến token thành vector số để biểu diễn ý nghĩa, không liên quan tới độ dài câu." },
            { text: "Cosine similarity", correct: false, explain: "Sai. Đây là thước đo độ giống nhau giữa hai vector, không phải bước chuẩn hóa độ dài câu." },
          ],
        },
        {
          q: "Câu 4. \"Confidence score\" mà Vision AI trả về (ví dụ 99.23%) có nghĩa là gì?",
          options: [
            { text: "Ảnh có độ phân giải càng cao thì điểm càng cao.", correct: false, explain: "Sai. Confidence score không đo độ phân giải ảnh, mà đo độ tin cậy của nhãn được gán." },
            { text: "Là xác suất mô hình \"tin\" nhãn nó gán là đúng — một con số xác suất, không phải khẳng định tuyệt đối 100%.", correct: true, explain: "Đúng. Bài 1.3 nhấn mạnh: 99.23% nghĩa là mô hình gần như chắc chắn, chứ không phải \"chắc chắn tuyệt đối\"." },
            { text: "Là tốc độ xử lý ảnh, tính bằng mili-giây.", correct: false, explain: "Sai. Đây không liên quan tới tốc độ xử lý — confidence score là một chỉ số về độ tin cậy của dự đoán." },
            { text: "Là tổng số nhãn được gán cho ảnh đó.", correct: false, explain: "Sai. Mỗi nhãn có một confidence score riêng — nó không phải là số đếm nhãn." },
          ],
        },
        {
          q: "Câu 5. Phát biểu nào đúng về quan hệ giữa AI, ML và DL?",
          options: [
            { text: "DL là tập hợp lớn nhất, chứa cả AI và ML bên trong.", correct: false, explain: "Sai. Thứ tự bị đảo ngược — DL là tập con nhỏ nhất trong ba khái niệm, không phải lớn nhất." },
            { text: "ML và DL là hai lĩnh vực hoàn toàn tách biệt, không liên quan tới nhau.", correct: false, explain: "Sai. DL thực chất là một kỹ thuật/nhánh con nằm bên trong ML, không tách biệt." },
            { text: "AI là khái niệm rộng nhất; ML là tập con của AI; DL là tập con của ML (dùng mạng nơ-ron nhiều lớp).", correct: true, explain: "Đúng. Đây đúng như sơ đồ vòng tròn lồng nhau trong bài 1.4: AI ⊃ ML ⊃ DL." },
            { text: "Generative AI là khái niệm bao trùm tất cả, chứa cả AI, ML, DL bên trong nó.", correct: false, explain: "Sai. Thứ tự lại bị đảo ngược — Generative AI là vòng trong cùng, nhỏ nhất, là tập con của DL." },
          ],
        },
      ],
    },
  ],
};
