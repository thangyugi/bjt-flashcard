import type { OciModule } from "./types";

/** Phần 3 — trích nguyên văn từ docs/OCIAI/Nền Tảng AI Cùng OCI.html (module 4 khóa gốc). */
export const m3: OciModule = {
  id: "m3",
  num: 3,
  origModule: 4,
  title: "Deep Learning Foundations",
  desc: "Artificial Neural Network, mô hình chuỗi RNN/LSTM và Convolutional Neural Network (CNN).",
  lessons: [
    {
      id: "m3-l1",
      code: "3.1",
      kind: "lesson",
      title: "Deep Learning là gì? Vì sao mạnh hơn ML truyền thống?",
      navTitle: "Deep Learning là gì?",
      minutes: 9,
      source: "Introduction to Deep Learning",
      html: `<p><dfn>Deep Learning</dfn> <span class="gloss">(học sâu, viết tắt DL)</span> là tập con của Machine Learning, huấn luyện <dfn>Artificial Neural Network</dfn> <span class="gloss">(ANN — mạng nơ-ron nhân tạo)</span> để giải quyết các bài toán như phân loại ảnh. Khác biệt lớn nhất so với ML truyền thống: ANN có thể xử lý dữ liệu thô (như từng pixel của ảnh) và <strong>tự động trích xuất mẫu hình (pattern)</strong> — con người không cần mô tả thủ công đặc trưng nào là quan trọng.</p>

<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Ví dụ: nhận diện chữ số viết tay</div>
  <p>Mỗi người viết số 7 theo một kiểu hơi khác nhau. Ta không thể viết ra một "luật" cứng để nhận diện mọi kiểu chữ số 7. ANN giải quyết bằng cách: nhận pixel ảnh làm đầu vào, tự trích xuất các mẫu hình như nét cong, nét thẳng, rồi kết hợp các mẫu hình đó để đoán ra chữ số.</p>
</div>

<h2>Vì sao ML truyền thống cần "feature engineering" còn DL thì không?</h2>
<p>Với ML truyền thống, con người phải tự tay chỉ ra đặc trưng nào quan trọng (ví dụ: màu lông để phân biệt mèo/chó). Với DL, mạng nơ-ron tự xây dựng <dfn>internal representation</dfn> <span class="gloss">(biểu diễn nội tại — cách mô hình tự "hiểu" và mã hóa dữ liệu qua nhiều lớp)</span> của đặc trưng và cách kết hợp chúng — điều mà con người khó làm thủ công với dữ liệu phức tạp (ảnh, âm thanh). Đổi lại, DL cần nhiều dữ liệu và tính toán hơn — nhưng bù lại nhờ <dfn>parallel computation</dfn> <span class="gloss">(tính toán song song — xử lý nhiều lô dữ liệu nhỏ cùng lúc)</span>, DL có thể xử lý khối lượng dữ liệu khổng lồ trong thời gian ngắn.</p>

<h2>Lược sử phát triển Deep Learning</h2>
<figure>
  <svg class="svg-diagram" viewBox="0 0 700 150" role="img" aria-label="Dòng thời gian phát triển Deep Learning: thập niên 1950 xuất hiện perceptron, 1980s có backpropagation, 1990s có CNN, năm 2000 GPU ra đời, 2010 GPU phổ biến và rẻ hơn, 2012 có AlexNet và Deep Q-Network, từ 2016 các ứng dụng generative bắt đầu xuất hiện.">
    <line x1="30" y1="75" x2="670" y2="75" stroke="currentColor" stroke-width="1.6"/>
    <g font-family="Sora, sans-serif" fill="currentColor" text-anchor="middle">
      <g transform="translate(60,75)"><circle r="5"/><text y="-14" font-size="11" font-weight="700">1950s</text><text y="28" font-size="9.5" opacity=".75">Perceptron, MLP</text></g>
      <g transform="translate(200,75)"><circle r="5"/><text y="-14" font-size="11" font-weight="700">1980s</text><text y="28" font-size="9.5" opacity=".75">Backpropagation</text></g>
      <g transform="translate(320,75)"><circle r="5"/><text y="-14" font-size="11" font-weight="700">1990s</text><text y="28" font-size="9.5" opacity=".75">CNN cho ảnh</text></g>
      <g transform="translate(420,75)"><circle r="5"/><text y="-14" font-size="11" font-weight="700">2000</text><text y="28" font-size="9.5" opacity=".75">GPU ra đời</text></g>
      <g transform="translate(510,75)"><circle r="5"/><text y="-14" font-size="11" font-weight="700">2010+</text><text y="28" font-size="9.5" opacity=".75">GPU rẻ, phổ biến</text></g>
      <g transform="translate(600,75)"><circle r="6" fill="var(--accent)" stroke="none"/><text y="-14" font-size="11" font-weight="700">2012</text><text y="28" font-size="9.5" opacity=".75">AlexNet, DQN</text></g>
      <g transform="translate(660,75)"><circle r="5"/><text y="-14" font-size="11" font-weight="700">2016+</text><text y="28" font-size="9.5" opacity=".75">Generative AI</text></g>
    </g>
  </svg>
  <figcaption>Ba cột mốc hạ tầng quan trọng nhất: backpropagation (thuật toán học), GPU giá rẻ (sức mạnh tính toán), và các mạng đột phá 2012 mở đường cho làn sóng generative từ 2016.</figcaption>
</figure>

<h2>Chọn kiến trúc theo loại dữ liệu &amp; tác vụ</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Loại dữ liệu</th><th>Tác vụ ví dụ</th><th>Kiến trúc phù hợp</th></tr></thead>
<tbody>
<tr><td>Ảnh (image)</td><td>Phân loại, phát hiện vật thể, nhận diện khuôn mặt</td><td>CNN</td></tr>
<tr><td>Văn bản (text)</td><td>Dịch thuật, phát hiện cảm xúc</td><td>Transformer, LSTM, RNN</td></tr>
<tr><td>Văn bản (sinh)</td><td>Tóm tắt, hỏi-đáp</td><td>Transformer</td></tr>
<tr><td>Ảnh (sinh)</td><td>Tạo ảnh từ văn bản</td><td>Transformer, GAN, Diffusion models</td></tr>
<tr><td>Âm thanh (audio)</td><td>Sáng tác nhạc, speech-to-text</td><td>RNN, LSTM, waveform models</td></tr>
</tbody>
</table></div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>DL khác ML truyền thống ở chỗ: <strong>tự động trích xuất đặc trưng</strong> từ dữ liệu thô, nhờ mạng nơ-ron nhiều lớp và tính toán song song. Ba cột mốc hạ tầng: backpropagation (1980s) → CNN (1990s) → GPU giá rẻ (2010+) đã mở đường cho làn sóng Generative AI từ 2016.</p>
</div>`,
    },
    {
      id: "m3-l2",
      code: "3.2",
      kind: "lesson",
      title: "Artificial Neural Network (ANN) — kiến trúc & cách huấn luyện",
      navTitle: "Artificial Neural Network",
      minutes: 9,
      source: "Deep Learning history & ANN",
      html: `<p><dfn>Artificial Neural Network</dfn> <span class="gloss">(ANN — mạng nơ-ron nhân tạo)</span> lấy cảm hứng từ não bộ: nhiều <dfn>neuron</dfn> <span class="gloss">(nơ-ron — đơn vị tính toán nhận đầu vào và tạo đầu ra)</span> kết nối với nhau. Mỗi kết nối có một <dfn>weight</dfn> <span class="gloss">(trọng số — độ mạnh của kết nối giữa hai nơ-ron)</span>; các đầu vào có trọng số được cộng lại, và nếu tổng vượt một ngưỡng, nơ-ron sẽ "kích hoạt" (fire) và truyền tín hiệu sang lớp tiếp theo.</p>

<h2>4 thành phần cấu tạo nên ANN</h2>
<ul>
  <li><strong>Layers</strong> <span class="gloss">(lớp)</span>: gồm input layer (bắt buộc), output layer (bắt buộc), và các hidden layer (lớp ẩn, không bắt buộc nhưng thường có nhiều).</li>
  <li><strong>Neurons</strong> <span class="gloss">(nơ-ron)</span>: đơn vị tính toán nhận đầu vào, tạo đầu ra.</li>
  <li><strong>Weights</strong> <span class="gloss">(trọng số)</span>: quyết định độ mạnh giữa các kết nối (input↔neuron hoặc neuron↔neuron).</li>
  <li><strong><dfn>Activation function</dfn></strong> <span class="gloss">(hàm kích hoạt — xử lý tổng có trọng số của đầu vào để tạo đầu ra của nơ-ron)</span> và <strong><dfn>bias</dfn></strong> <span class="gloss">(một đầu vào phụ thêm cho nơ-ron sự linh hoạt nhất định)</span>.</li>
</ul>

<h2>Ví dụ: nhận diện chữ số viết tay (0–9)</h2>
<figure>
  <svg class="svg-diagram" viewBox="0 0 500 260" role="img" aria-label="Sơ đồ mạng nơ-ron: một lớp đầu vào 3 nút đại diện cho pixel ảnh, kết nối đầy đủ tới một lớp ẩn 4 nút, kết nối đầy đủ tới lớp đầu ra 3 nút đại diện các chữ số.">
      <line x1="70" y1="70" x2="250" y2="40" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="70" x2="250" y2="100" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="70" x2="250" y2="160" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="70" x2="250" y2="220" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="140" x2="250" y2="40" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="140" x2="250" y2="100" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="140" x2="250" y2="160" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="140" x2="250" y2="220" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="210" x2="250" y2="40" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="210" x2="250" y2="100" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="210" x2="250" y2="160" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="70" y1="210" x2="250" y2="220" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="40" x2="430" y2="70" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="40" x2="430" y2="140" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="40" x2="430" y2="210" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="100" x2="430" y2="70" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="100" x2="430" y2="140" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="100" x2="430" y2="210" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="160" x2="430" y2="70" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="160" x2="430" y2="140" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="160" x2="430" y2="210" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="220" x2="430" y2="70" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="220" x2="430" y2="140" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
      <line x1="250" y1="220" x2="430" y2="210" stroke="currentColor" stroke-width="0.8" opacity=".3"/>
    <g fill="currentColor">
      <circle cx="70" cy="70" r="9"/><circle cx="70" cy="140" r="9"/><circle cx="70" cy="210" r="9"/>
      <circle cx="250" cy="40" r="9"/><circle cx="250" cy="100" r="9"/><circle cx="250" cy="160" r="9"/><circle cx="250" cy="220" r="9"/>
      <circle cx="430" cy="70" r="9" fill="var(--accent)"/><circle cx="430" cy="140" r="9" fill="var(--accent)"/><circle cx="430" cy="210" r="9" fill="var(--accent)"/>
    </g>
    <g font-family="Sora, sans-serif" font-size="11" fill="currentColor" text-anchor="middle">
      <text x="70" y="245">Input layer</text>
      <text x="70" y="258" font-size="9.5" opacity=".7">28×28 pixel ảnh</text>
      <text x="250" y="245">Hidden layer(s)</text>
      <text x="250" y="258" font-size="9.5" opacity=".7">thường có ≥2 lớp</text>
      <text x="430" y="245">Output layer</text>
      <text x="430" y="258" font-size="9.5" opacity=".7">10 nơ-ron: chữ số 0–9</text>
    </g>
  </svg>
  <figcaption>Ảnh chữ số viết tay 28×28 pixel được đưa vào lớp đầu vào, qua các lớp ẩn (ví dụ 2 lớp × 16 nơ-ron), tới lớp đầu ra gồm 10 nơ-ron — mỗi nơ-ron đại diện một chữ số từ 0 đến 9.</figcaption>
</figure>

<h2>Huấn luyện bằng Backpropagation</h2>
<p>Khi cho ANN xem một ảnh chữ số "2", ta kỳ vọng nơ-ron đầu ra tương ứng với số 2 sẽ kích hoạt. Nếu thực tế nơ-ron số 6 lại kích hoạt, đó là một lỗi. Để sửa lỗi, thuật toán <dfn>backpropagation</dfn> <span class="gloss">(lan truyền ngược — thuật toán tính toán và điều chỉnh trọng số dựa trên mức độ sai của dự đoán)</span> sẽ điều chỉnh lại các trọng số kết nối. Lặp lại việc này qua hàng nghìn ảnh, ANN dần dự đoán đúng cho phần lớn ảnh đầu vào — quá trình điều chỉnh trọng số lặp đi lặp lại này chính là <strong>model training</strong>.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>ANN = layers + neurons + weights + activation function + bias. Huấn luyện = <strong>backpropagation</strong> điều chỉnh trọng số lặp đi lặp lại để giảm sai số giữa dự đoán và nhãn thật.</p>
</div>`,
    },
    {
      id: "m3-l3",
      code: "3.3",
      kind: "lesson",
      title: "Mô hình chuỗi: Recurrent Neural Network (RNN) & LSTM",
      navTitle: "Mô hình chuỗi: RNN & LSTM",
      minutes: 9,
      source: "Deep Learning Models — Sequence Models",
      html: `<p><dfn>Sequence models</dfn> <span class="gloss">(mô hình chuỗi)</span> xử lý dữ liệu có thứ tự quan trọng — một đoạn văn, một bản nhạc, một chuỗi giá cổ phiếu. Mục tiêu là tìm mẫu hình và quan hệ phụ thuộc giữa các phần tử trong chuỗi để dự đoán, phân loại, hoặc sinh ra chuỗi mới.</p>

<div class="tbl-wrap"><table>
<thead><tr><th>Lĩnh vực</th><th>Ứng dụng</th></tr></thead>
<tbody>
<tr><td>Xử lý ngôn ngữ tự nhiên (NLP)</td><td>Dịch máy, phân tích cảm xúc, sinh văn bản</td></tr>
<tr><td>Nhận dạng giọng nói</td><td>Chuyển audio ghi âm thành văn bản</td></tr>
<tr><td>Âm nhạc</td><td>Sáng tác bản nhạc mới</td></tr>
<tr><td>Ngôn ngữ ký hiệu</td><td>Diễn giải chuỗi cử chỉ tay</td></tr>
<tr><td>Tài chính / thời tiết</td><td>Dự báo giá trị tương lai từ dữ liệu chuỗi thời gian</td></tr>
</tbody>
</table></div>

<h2>Recurrent Neural Network (RNN)</h2>
<p><dfn>RNN</dfn> có một <dfn>feedback loop</dfn> <span class="gloss">(vòng phản hồi — cho phép thông tin "truyền lại" qua các bước thời gian)</span>: nó duy trì một <dfn>hidden state</dfn> <span class="gloss">(trạng thái ẩn — bộ nhớ nội bộ được cập nhật liên tục khi xử lý từng phần tử trong chuỗi)</span>, được truyền tiếp làm đầu vào cho bước thời gian kế tiếp.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 640 170" role="img" aria-label="RNN xử lý tuần tự theo từng bước thời gian: mỗi ô RNN nhận một từ đầu vào và trạng thái ẩn từ bước trước, tạo ra trạng thái ẩn mới truyền tiếp cho bước sau.">
    <defs><marker id="arr7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g font-family="Sora, sans-serif" fill="currentColor" text-anchor="middle">
      <rect x="60" y="50" width="110" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <text x="115" y="85" font-size="12.5" font-weight="700">RNN</text>
      <text x="115" y="140" font-size="11">"Jane"</text>

      <line x1="170" y1="80" x2="234" y2="80" stroke="currentColor" stroke-width="1.6" marker-end="url(#arr7)"/>
      <text x="202" y="70" font-size="10" opacity=".8">hidden state</text>

      <rect x="240" y="50" width="110" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <text x="295" y="85" font-size="12.5" font-weight="700">RNN</text>
      <text x="295" y="140" font-size="11">"threw"</text>

      <line x1="350" y1="80" x2="414" y2="80" stroke="currentColor" stroke-width="1.6" marker-end="url(#arr7)"/>
      <text x="382" y="70" font-size="10" opacity=".8">hidden state</text>

      <rect x="420" y="50" width="110" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <text x="475" y="85" font-size="12.5" font-weight="700">RNN</text>
      <text x="475" y="140" font-size="11">"the frisbee"</text>

      <line x1="530" y1="80" x2="590" y2="80" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3" marker-end="url(#arr7)"/>
      <text x="560" y="70" font-size="10" opacity=".6">…"it"?</text>
    </g>
  </svg>
  <figcaption>Với câu "Jane threw the frisbee and her dog fetched <strong>it</strong>", RNN xử lý từng từ một và chỉ nhớ được ngữ cảnh gần — nên rất khó liên kết "it" với "frisbee" ở xa phía trước.</figcaption>
</figure>

<p>Hạn chế lớn của RNN: nó chỉ xử lý tốt các phụ thuộc <strong>ở gần nhau</strong>. Với câu dài, khả năng ghi nhớ ngữ cảnh xa dần yếu đi — hiện tượng gọi là <dfn>vanishing gradient</dfn> <span class="gloss">(triệt tiêu đạo hàm — tín hiệu học giảm dần về 0 khi lan truyền qua nhiều bước, khiến mô hình "quên" ngữ cảnh xa)</span>.</p>

<h2>4 kiểu kiến trúc RNN theo bài toán</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Kiểu</th><th>Mô tả</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td>One-to-one</td><td>1 đầu vào → 1 đầu ra (giống mạng feedforward thường)</td><td>Không phù hợp dữ liệu chuỗi</td></tr>
<tr><td>One-to-many</td><td>1 đầu vào → nhiều đầu ra</td><td>Sinh nhạc, sinh chuỗi</td></tr>
<tr><td>Many-to-one</td><td>Nhiều đầu vào → 1 đầu ra</td><td>Phân tích cảm xúc theo review</td></tr>
<tr><td>Many-to-many</td><td>Nhiều đầu vào → nhiều đầu ra</td><td>Dịch máy, nhận diện thực thể (NER)</td></tr>
</tbody>
</table></div>

<h2>LSTM — khắc phục điểm yếu của RNN</h2>
<p><dfn>LSTM</dfn> dùng một <dfn>memory cell</dfn> <span class="gloss">(ô nhớ — nơi lưu trữ thông tin dài hạn)</span> cùng cơ chế <dfn>gate</dfn> <span class="gloss">(cổng — bộ lọc kiểm soát luồng thông tin ra/vào ô nhớ)</span> để chọn lọc nhớ hoặc quên thông tin theo thời gian:</p>
<ul>
  <li><strong>Input gate</strong>: quyết định thông tin mới nào được thêm vào bộ nhớ.</li>
  <li><strong>Forget gate</strong>: quyết định thông tin cũ nào bị loại bỏ khỏi bộ nhớ.</li>
  <li><strong>Output gate</strong>: quyết định phần nào của bộ nhớ được xuất ra làm kết quả bước hiện tại.</li>
</ul>
<p>Nhờ ba cổng này, LSTM giữ được ngữ cảnh xa tốt hơn nhiều so với RNN thuần, khắc phục phần lớn vấn đề vanishing gradient.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>RNN xử lý tuần tự, nhớ qua <strong>hidden state</strong>, nhưng yếu với ngữ cảnh xa (vanishing gradient). LSTM thêm <strong>3 cổng</strong> (input, forget, output) quanh một memory cell để nhớ ngữ cảnh xa tốt hơn.</p>
</div>`,
    },
    {
      id: "m3-l4",
      code: "3.4",
      kind: "lesson",
      title: "Convolutional Neural Network (CNN) — mạng nơ-ron tích chập",
      navTitle: "Convolutional Neural Network",
      minutes: 10,
      source: "Deep Learning Models - CNN",
      html: `<p>Trước khi đào sâu CNN, đây là toàn cảnh 7 kiến trúc deep learning phổ biến để bạn định vị CNN nằm ở đâu:</p>
<div class="tbl-wrap"><table>
<thead><tr><th>Kiến trúc</th><th>Vai trò chính</th></tr></thead>
<tbody>
<tr><td>FNN / MLP <span class="gloss">(Feedforward / Multilayer Perceptron)</span></td><td>Dạng đơn giản nhất, dữ liệu chỉ đi một chiều qua các lớp.</td></tr>
<tr><td><strong>CNN</strong></td><td>Tự động học mẫu hình cục bộ trong ảnh/video.</td></tr>
<tr><td>RNN</td><td>Xử lý dữ liệu tuần tự nhờ hidden state.</td></tr>
<tr><td>Autoencoder</td><td>Học không giám sát, nén &amp; tái tạo dữ liệu, phát hiện bất thường.</td></tr>
<tr><td>LSTM</td><td>Biến thể RNN, xử lý phụ thuộc dài hạn.</td></tr>
<tr><td>GAN</td><td>Hai mạng đối đầu nhau để sinh dữ liệu (ảnh, âm thanh) trông như thật.</td></tr>
<tr><td>Transformer</td><td>Xử lý song song toàn chuỗi nhờ self-attention — nền tảng của LLM hiện đại.</td></tr>
</tbody>
</table></div>

<h2>Vì sao ảnh cần CNN thay vì ANN thường?</h2>
<p>ANN thường phải "làm phẳng" ảnh 2 chiều thành một mảng 1 chiều trước khi xử lý — cách này phá vỡ cấu trúc không gian vốn có của ảnh (vị trí tương đối giữa các pixel). <dfn>CNN</dfn> giữ nguyên cấu trúc 2 chiều, giúp giảm kích thước dữ liệu cần xử lý mà không mất các đặc trưng quan trọng.</p>

<h2>Kiến trúc CNN: 3 nhóm lớp</h2>
<figure>
  <svg class="svg-diagram" viewBox="0 0 700 130" role="img" aria-label="Pipeline CNN: ảnh đầu vào đi qua các lớp trích xuất đặc trưng gồm Convolution, ReLU và Pooling lặp lại, rồi tới lớp phân loại Fully Connected và Softmax để cho ra nhãn dự đoán.">
    <defs><marker id="arr8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g font-family="Sora, sans-serif" font-size="11.5" fill="currentColor" text-anchor="middle">
      <g transform="translate(10,35)"><rect width="95" height="55" rx="9" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="47" y="32" font-weight="700">Ảnh đầu vào</text></g>
      <line x1="115" y1="62" x2="129" y2="62" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr8)"/>
      <g transform="translate(135,35)"><rect width="95" height="55" rx="9" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="47" y="26" font-weight="700">Convolution</text><text x="47" y="40" font-size="9.5" opacity=".7">+ ReLU</text></g>
      <line x1="240" y1="62" x2="254" y2="62" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr8)"/>
      <g transform="translate(260,35)"><rect width="95" height="55" rx="9" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="47" y="32" font-weight="700">Pooling</text></g>
      <line x1="365" y1="62" x2="379" y2="62" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr8)"/>
      <g transform="translate(385,10)" font-size="9.5" opacity=".6"><text x="0" y="0">(lặp lại nhiều lần)</text></g>
      <g transform="translate(385,35)"><rect width="115" height="55" rx="9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/><text x="57" y="26" font-weight="700">Conv+ReLU</text><text x="57" y="40" font-size="9.5" opacity=".7">+ Pooling…</text></g>
      <line x1="500" y1="62" x2="514" y2="62" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr8)"/>
      <g transform="translate(520,35)"><rect width="80" height="55" rx="9" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="40" y="32" font-weight="700">Fully</text><text x="40" y="46" font-size="9.5" opacity=".7">Connected</text></g>
      <line x1="600" y1="62" x2="614" y2="62" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr8)"/>
      <g transform="translate(620,35)"><rect width="70" height="55" rx="9" fill="none" stroke="currentColor" stroke-width="2"/><text x="35" y="32" font-weight="700">Softmax</text></g>
    </g>
  </svg>
  <figcaption>Lớp trích xuất đặc trưng (Convolution → ReLU → Pooling, lặp lại) rồi tới lớp phân loại (Fully Connected → Softmax) cho ra xác suất từng lớp.</figcaption>
</figure>

<h2>Phép ẩn dụ dễ nhớ: "robot thanh tra nhà"</h2>
<p>Hãy tưởng tượng một robot đi thanh tra một căn nhà để đoán xem đó là loại nhà gì. Mỗi "công cụ" nó dùng tương ứng với một lớp trong CNN:</p>
<div class="tbl-wrap"><table>
<thead><tr><th>Công cụ của robot</th><th>Lớp CNN tương ứng</th><th>Vai trò</th></tr></thead>
<tbody>
<tr><td>Máy dò bản vẽ (blueprint detector)</td><td><dfn>Convolutional layer</dfn></td><td>Dùng các bộ lọc nhỏ (<dfn>kernel</dfn> <span class="gloss">(bộ lọc — ma trận nhỏ trượt qua ảnh để phát hiện đặc trưng)</span>) trượt qua ảnh để phát hiện cạnh, góc, kết cấu.</td></tr>
<tr><td>Bút đánh dấu mẫu (pattern highlighter)</td><td><dfn>Activation function</dfn> (thường là <dfn>ReLU</dfn>)</td><td>Giúp mạng học được quan hệ phi tuyến, phức tạp hơn.</td></tr>
<tr><td>Người tóm tắt phòng (room summarizer)</td><td><dfn>Pooling layer</dfn></td><td>Thu nhỏ kích thước feature map, giữ lại thông tin quan trọng nhất.</td></tr>
<tr><td>Chuyên gia nhà đất (house expert)</td><td><dfn>Fully connected layer</dfn></td><td>Tổng hợp mọi đặc trưng đã học để đưa ra dự đoán cuối.</td></tr>
<tr><td>Người đoán (guess maker)</td><td><dfn>Softmax layer</dfn></td><td>Chuyển đầu ra thành xác suất; lớp có xác suất cao nhất là dự đoán cuối.</td></tr>
<tr><td>Người kiểm tra chất lượng (quality checker)</td><td><dfn>Dropout layer</dfn> <span class="gloss">(loại bỏ ngẫu nhiên một số nơ-ron khi huấn luyện, chống overfitting)</span></td><td>Đảm bảo mô hình không phụ thuộc quá mức vào một vài đặc trưng đơn lẻ.</td></tr>
</tbody>
</table></div>

<h2>Hạn chế của CNN</h2>
<ul>
  <li>Huấn luyện tốn kém về thời gian &amp; tính toán với tập dữ liệu lớn.</li>
  <li>Dễ overfitting khi dữ liệu huấn luyện ít hoặc mất cân bằng.</li>
  <li>Là mô hình "hộp đen" (black box) — khó diễn giải vì sao nó ra quyết định đó.</li>
  <li>Nhạy cảm với thay đổi nhỏ ở đầu vào, có thể gây dự đoán không ổn định.</li>
</ul>

<h2>Ứng dụng thực tế của CNN</h2>
<p>Phân loại ảnh, phát hiện vật thể (vẽ bounding box), phân đoạn ảnh theo từng pixel (segmentation), nhận diện khuôn mặt, phân tích ảnh y tế (phát hiện khối u), xe tự lái (nhận diện biển báo, người đi bộ), và phân tích ảnh vệ tinh/viễn thám.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>CNN = <strong>Convolution (dò mẫu) → Activation (phi tuyến) → Pooling (thu nhỏ)</strong> lặp lại, rồi <strong>Fully Connected → Softmax</strong> để phân loại. Dropout giúp chống overfitting. CNN mạnh với ảnh nhưng là "hộp đen" khó diễn giải.</p>
</div>`,
    },
    {
      id: "m3-summary",
      code: "★",
      kind: "summary",
      title: "★ Tổng kết Phần 3 & Trắc nghiệm",
      navTitle: "Tổng kết & Trắc nghiệm",
      note: "Ôn lại 4 bài học + làm 5 câu trắc nghiệm",
      html: `<p>Phần 3 xây từ nền tảng ANN, rồi rẽ thành hai nhánh kiến trúc chuyên biệt theo loại dữ liệu: CNN cho dữ liệu không gian (ảnh), RNN/LSTM cho dữ liệu tuần tự (chuỗi).</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 620 220" role="img" aria-label="Sơ đồ: Artificial Neural Network là nền tảng, phân nhánh thành CNN chuyên xử lý dữ liệu ảnh không gian hai chiều, và RNN/LSTM chuyên xử lý dữ liệu chuỗi tuần tự.">
    <defs><marker id="arr9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g stroke="currentColor" stroke-width="1.4" fill="none">
      <line x1="310" y1="66" x2="180" y2="120" marker-end="url(#arr9)"/>
      <line x1="310" y1="66" x2="440" y2="120" marker-end="url(#arr9)"/>
    </g>
    <g font-family="Sora, sans-serif" fill="currentColor" text-anchor="middle">
      <rect x="210" y="16" width="200" height="50" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="310" y="46" font-size="13" font-weight="700">Artificial Neural Network</text>

      <rect x="90" y="126" width="180" height="70" rx="10" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="180" y="152" font-size="12.5" font-weight="700">CNN</text>
      <text x="180" y="170" font-size="10.5" opacity=".75">Dữ liệu không gian 2D</text>
      <text x="180" y="184" font-size="10.5" opacity=".75">(ảnh, video)</text>

      <rect x="350" y="126" width="180" height="70" rx="10" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="440" y="152" font-size="12.5" font-weight="700">RNN / LSTM</text>
      <text x="440" y="170" font-size="10.5" opacity=".75">Dữ liệu tuần tự</text>
      <text x="440" y="184" font-size="10.5" opacity=".75">(văn bản, audio, chuỗi)</text>
    </g>
  </svg>
  <figcaption>ANN là nền tảng chung; CNN và RNN/LSTM là hai đặc hóa kiến trúc cho hai loại cấu trúc dữ liệu khác nhau.</figcaption>
</figure>

<div class="summary-grid">
  <div class="sum-card"><h4>3.1 — Deep Learning là gì?</h4><ul><li>Tự động trích xuất đặc trưng, không cần feature engineering thủ công.</li><li>Cột mốc: backprop (1980s) → CNN (1990s) → GPU rẻ (2010+) → Generative AI (2016+).</li></ul></div>
  <div class="sum-card"><h4>3.2 — Artificial Neural Network</h4><ul><li>Cấu tạo: layers, neurons, weights, activation function, bias.</li><li>Huấn luyện bằng backpropagation — điều chỉnh trọng số lặp lại.</li></ul></div>
  <div class="sum-card"><h4>3.3 — RNN &amp; LSTM</h4><ul><li>RNN dùng hidden state nhưng yếu với ngữ cảnh xa (vanishing gradient).</li><li>LSTM thêm 3 cổng (input/forget/output) quanh memory cell.</li></ul></div>
  <div class="sum-card"><h4>3.4 — CNN</h4><ul><li>Convolution → Activation → Pooling (lặp lại) → Fully Connected → Softmax.</li><li>Mạnh với ảnh nhưng là "hộp đen", dễ overfitting.</li></ul></div>
</div>

<h2>Trắc nghiệm ôn tập Phần 3</h2>`,
      quiz: [
        {
          q: "Câu 1. Điểm khác biệt cốt lõi giữa Deep Learning và Machine Learning truyền thống là gì?",
          options: [
            { text: "Deep Learning luôn chạy nhanh hơn về tốc độ xử lý phần cứng.", correct: false, explain: "Sai. Bài học không so sánh về tốc độ phần cứng — thực tế DL thường tốn nhiều tài nguyên tính toán hơn ML truyền thống." },
            { text: "DL tự động trích xuất đặc trưng từ dữ liệu thô qua mạng nơ-ron nhiều lớp, không cần con người mô tả đặc trưng thủ công.", correct: true, explain: "Đúng. Đây chính là khác biệt cốt lõi được nêu trong bài 3.1: DL tự học biểu diễn đặc trưng, ML truyền thống cần con người chỉ định đặc trưng." },
            { text: "DL chỉ xử lý được dữ liệu dạng số thuần túy, không thể xử lý ảnh.", correct: false, explain: "Sai. Ngược lại — DL (đặc biệt CNN) rất mạnh với dữ liệu ảnh, đây là một trong những ứng dụng nổi bật nhất của nó." },
            { text: "DL không cần bất kỳ dữ liệu huấn luyện nào để hoạt động.", correct: false, explain: "Sai. DL thường cần RẤT NHIỀU dữ liệu huấn luyện — nhiều hơn hẳn so với các mô hình ML truyền thống." },
          ],
        },
        {
          q: "Câu 2. Thành phần nào của ANN quyết định độ mạnh của kết nối giữa hai nơ-ron?",
          options: [
            { text: "Activation function", correct: false, explain: "Sai. Activation function xử lý tổng có trọng số để tạo đầu ra, không phải thứ quyết định độ mạnh kết nối." },
            { text: "Weight (trọng số)", correct: true, explain: "Đúng. Weight chính là con số biểu diễn độ mạnh của một kết nối, và đây cũng là thứ được backpropagation điều chỉnh khi huấn luyện." },
            { text: "Bias", correct: false, explain: "Sai. Bias là một đầu vào phụ tạo độ linh hoạt cho nơ-ron, không đại diện cho độ mạnh giữa hai kết nối." },
            { text: "Layer", correct: false, explain: "Sai. Layer chỉ là một nhóm nơ-ron, không phải khái niệm biểu diễn độ mạnh kết nối." },
          ],
        },
        {
          q: "Câu 3. Vì sao RNN thông thường gặp khó khi xử lý các câu văn dài?",
          options: [
            { text: "Vì RNN không thể nhận đầu vào là dữ liệu văn bản.", correct: false, explain: "Sai. RNN được thiết kế chuyên để xử lý dữ liệu tuần tự như văn bản — vấn đề nằm ở việc ghi nhớ ngữ cảnh xa, không phải khả năng nhận đầu vào." },
            { text: "Vì hiện tượng vanishing gradient khiến mô hình dần \"quên\" các từ ở xa về phía trước.", correct: true, explain: "Đúng. Đây chính xác là hạn chế nêu trong bài 3.3 — ví dụ câu \"Jane threw the frisbee… it\" rất khó để RNN liên kết \"it\" với \"frisbee\"." },
            { text: "Vì RNN chỉ được thiết kế để xử lý ảnh, không phải văn bản.", correct: false, explain: "Sai. Đây mô tả nhầm CNN — RNN vốn chuyên trị dữ liệu tuần tự như văn bản, âm thanh." },
            { text: "Vì RNN xử lý song song toàn bộ câu cùng một lúc.", correct: false, explain: "Sai. Ngược lại — RNN xử lý TUẦN TỰ từng phần tử một, chứ không song song (xử lý song song là đặc điểm của Transformer, học ở Phần 4)." },
          ],
        },
        {
          q: "Câu 4. Trong phép ẩn dụ \"robot thanh tra nhà\" của CNN, lớp nào đóng vai trò \"người tóm tắt phòng\" — thu nhỏ kích thước dữ liệu mà vẫn giữ thông tin quan trọng?",
          options: [
            { text: "Convolutional layer", correct: false, explain: "Sai. Convolutional layer tương ứng với \"máy dò bản vẽ\" — phát hiện đặc trưng, không phải thu nhỏ dữ liệu." },
            { text: "Pooling layer", correct: true, explain: "Đúng. Pooling layer chính là \"room summarizer\" — giảm kích thước feature map trong khi giữ lại thông tin cốt lõi." },
            { text: "Fully connected layer", correct: false, explain: "Sai. Đây là \"chuyên gia nhà đất\" — tổng hợp mọi đặc trưng để ra dự đoán cuối, không phải bước thu nhỏ dữ liệu." },
            { text: "Dropout layer", correct: false, explain: "Sai. Đây là \"người kiểm tra chất lượng\" — chống overfitting bằng cách loại bỏ ngẫu nhiên một số nơ-ron, không liên quan tới thu nhỏ dữ liệu." },
          ],
        },
        {
          q: "Câu 5. LSTM cải tiến so với RNN thông thường bằng cách nào?",
          options: [
            { text: "Loại bỏ hoàn toàn khái niệm hidden state.", correct: false, explain: "Sai. LSTM vẫn giữ khái niệm trạng thái (cả hidden state và cell state), chỉ bổ sung thêm cơ chế cổng để kiểm soát nó tốt hơn." },
            { text: "Thêm 3 cổng (input, forget, output) quanh một memory cell để chọn lọc nhớ/quên thông tin theo thời gian.", correct: true, explain: "Đúng. Đây đúng cơ chế LSTM học ở bài 3.3: input gate, forget gate, output gate quanh một memory cell." },
            { text: "Chỉ cho phép xử lý các chuỗi có độ dài cố định, bằng nhau.", correct: false, explain: "Sai. Đây không phải cải tiến của LSTM — cả RNN và LSTM đều xử lý được chuỗi độ dài khác nhau." },
            { text: "Thay toàn bộ cơ chế tuần tự bằng các phép convolution như CNN.", correct: false, explain: "Sai. LSTM vẫn là một biến thể của RNN, xử lý tuần tự — nó không dùng cơ chế convolution của CNN." },
          ],
        },
      ],
    },
  ],
};
