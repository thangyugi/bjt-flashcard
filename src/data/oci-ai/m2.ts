import type { OciModule } from "./types";

/** Phần 2 — trích nguyên văn từ docs/OCIAI/Nền Tảng AI Cùng OCI.html (module 3 khóa gốc). */
export const m2: OciModule = {
  id: "m2",
  num: 2,
  origModule: 3,
  title: "Machine Learning Foundations",
  desc: "Supervised (hồi quy, phân loại), demo Jupyter Notebook, Unsupervised và Reinforcement Learning.",
  lessons: [
    {
      id: "m2-l1",
      code: "2.1",
      kind: "lesson",
      title: "Machine Learning là gì? Hoạt động ra sao?",
      navTitle: "Machine Learning là gì?",
      minutes: 8,
      source: "Introduction to Machine Learning",
      html: `<p><dfn>Machine Learning</dfn> <span class="gloss">(học máy — tập con của AI)</span> là các hệ thống máy tính học và dự đoán kết quả từ ví dụ có sẵn, <strong>mà không cần lập trình tường minh từng luật</strong>. Bạn đã dùng ML hằng ngày: gợi ý sản phẩm khi mua sắm online, gợi ý phim trên Netflix dựa theo lịch sử xem, cảnh báo thư rác trong hộp mail, hay xe tự lái tính toán đường đi.</p>

<h2>ML học như thế nào? Ví dụ: phân biệt mèo và chó</h2>
<p>Giả sử ta muốn máy phân biệt được mèo và chó. Ta mô tả các đặc điểm phân biệt — màu lông, kết cấu lông, màu mắt — gọi là <dfn>input data / features</dfn> <span class="gloss">(dữ liệu đầu vào / đặc trưng — các thuộc tính mô tả một mẫu dữ liệu)</span>, và cho biết đáp án đúng — mèo hay chó — gọi là <dfn>label</dfn> <span class="gloss">(nhãn — đáp án/kết quả đúng đi kèm dữ liệu huấn luyện)</span>.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 700 260" role="img" aria-label="Sơ đồ quy trình Machine Learning: giai đoạn Training dùng features và labels để tạo Trained Model, giai đoạn Inference đưa dữ liệu mới vào Trained Model để có Prediction.">
    <defs>
      <marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>
    </defs>
    <g font-family="Sora, sans-serif" fill="currentColor">
      <text x="20" y="24" font-size="11.5" font-weight="700" opacity=".7">GIAI ĐOẠN HUẤN LUYỆN (TRAINING)</text>
      <rect x="20" y="40" width="150" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="95" y="63" text-anchor="middle" font-size="12" font-weight="700">Features + Labels</text>
      <text x="95" y="80" text-anchor="middle" font-size="10" opacity=".7">màu lông, mắt… + "mèo/chó"</text>

      <line x1="170" y1="68" x2="214" y2="68" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr3)"/>
      <text x="192" y="58" text-anchor="middle" font-size="10.5" opacity=".8">huấn luyện</text>

      <rect x="220" y="40" width="150" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="295" y="63" text-anchor="middle" font-size="12" font-weight="700">Trained Model</text>
      <text x="295" y="80" text-anchor="middle" font-size="10" opacity=".7">đã học quy luật ánh xạ</text>

      <text x="20" y="150" font-size="11.5" font-weight="700" opacity=".7">GIAI ĐOẠN SUY LUẬN (INFERENCE)</text>
      <rect x="20" y="166" width="150" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="95" y="189" text-anchor="middle" font-size="12" font-weight="700">Dữ liệu mới</text>
      <text x="95" y="206" text-anchor="middle" font-size="10" opacity=".7">chưa có nhãn</text>

      <line x1="170" y1="194" x2="214" y2="194" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr3)"/>

      <rect x="220" y="166" width="150" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="295" y="189" text-anchor="middle" font-size="12" font-weight="700">Trained Model</text>
      <text x="295" y="206" text-anchor="middle" font-size="10" opacity=".7">(giống mô hình bên trên)</text>

      <line x1="370" y1="194" x2="414" y2="194" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr3)"/>
      <text x="392" y="184" text-anchor="middle" font-size="10.5" opacity=".8">dự đoán</text>

      <rect x="420" y="166" width="150" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="495" y="189" text-anchor="middle" font-size="12" font-weight="700">Prediction</text>
      <text x="495" y="206" text-anchor="middle" font-size="10" opacity=".7">"Đây là con mèo"</text>
    </g>
  </svg>
  <figcaption>Hai giai đoạn tách biệt: huấn luyện (học từ dữ liệu có nhãn) và suy luận / inference (dùng mô hình đã học để dự đoán trên dữ liệu mới, chưa có nhãn).</figcaption>
</figure>

<p>Sau khi mô hình học xong quan hệ giữa đặc trưng và nhãn, ta có một <dfn>trained model</dfn> <span class="gloss">(mô hình đã huấn luyện)</span>. Đưa dữ liệu mới (chưa có nhãn) vào mô hình để lấy dự đoán gọi là <dfn>inference</dfn> <span class="gloss">(suy luận — quá trình lấy dự đoán bằng cách đưa một điểm dữ liệu mới vào mô hình đã huấn luyện)</span>.</p>

<h2>Ba kiểu học — và ứng dụng thực tế</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Kiểu học</th><th>Đặc điểm</th><th>Ứng dụng thực tế</th></tr></thead>
<tbody>
<tr><td><strong>Supervised</strong><br><span class="gloss">có giám sát</span></td><td>Học từ dữ liệu có nhãn, tìm quan hệ đặc trưng → nhãn.</td><td>Phát hiện bệnh, dự báo thời tiết, dự đoán giá cổ phiếu, lọc spam, chấm điểm tín dụng.</td></tr>
<tr><td><strong>Unsupervised</strong><br><span class="gloss">không giám sát</span></td><td>Không có nhãn; tự tìm cấu trúc/quan hệ ẩn trong dữ liệu.</td><td>Phát hiện giao dịch gian lận, phân khúc khách hàng, phát hiện ngoại lệ, marketing mục tiêu.</td></tr>
<tr><td><strong>Reinforcement</strong><br><span class="gloss">tăng cường</span></td><td>Agent học qua kết quả thử-sai, tối ưu theo phần thưởng.</td><td>Robot tự động, xe tự lái, chơi game.</td></tr>
</tbody>
</table></div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>ML luôn có 2 pha tách biệt: <strong>Training</strong> (học từ ví dụ) và <strong>Inference</strong> (dùng cái đã học để dự đoán trên dữ liệu mới). Ba lựa chọn kiểu học phụ thuộc vào việc dữ liệu <strong>có nhãn hay không</strong>, và mục tiêu là <strong>dự đoán hay khám phá cấu trúc</strong>.</p>
</div>`,
    },
    {
      id: "m2-l2",
      code: "2.2",
      kind: "lesson",
      title: "Supervised Learning — Hồi quy (Regression)",
      navTitle: "Supervised — Hồi quy",
      minutes: 9,
      source: "Supervised Learning - Regression",
      html: `<p><dfn>Supervised learning</dfn> <span class="gloss">(học có giám sát)</span> học ánh xạ giữa đầu vào và đầu ra từ dữ liệu đã có nhãn — giống như một giáo viên (dữ liệu quá khứ) dạy học trò (mô hình) bằng các ví dụ đã biết đáp án. Khi đầu ra là một <strong>con số liên tục</strong>, ta dùng kỹ thuật <dfn>regression</dfn> <span class="gloss">(hồi quy — dự đoán một giá trị số liên tục, ví dụ giá tiền)</span>.</p>

<div class="tbl-wrap"><table>
<thead><tr><th>Bài toán</th><th>Đầu vào (input)</th><th>Đầu ra (output)</th></tr></thead>
<tbody>
<tr><td>Dự đoán giá nhà</td><td>Diện tích (sq ft)</td><td>Giá nhà ($) — <em>liên tục → regression</em></td></tr>
<tr><td>Phát hiện ung thư</td><td>Hồ sơ y tế bệnh nhân</td><td>Khối u ác tính hay không — <em>phân loại → classification</em></td></tr>
<tr><td>Phân tích cảm xúc</td><td>Đánh giá của khách hàng</td><td>Tích cực / tiêu cực / trung lập</td></tr>
<tr><td>Dự đoán giá cổ phiếu</td><td>Giá mở cửa, giá đóng cửa, khối lượng giao dịch</td><td>Giá cổ phiếu ($) — <em>liên tục</em></td></tr>
</tbody>
</table></div>

<h2>Ví dụ: dự đoán giá nhà theo diện tích</h2>
<p>Diện tích là <dfn>independent feature</dfn> <span class="gloss">(đặc trưng độc lập — biến đầu vào)</span>, giá nhà là <dfn>dependent feature</dfn> <span class="gloss">(đặc trưng phụ thuộc — biến đầu ra, phụ thuộc vào đầu vào)</span>. Mỗi dòng dữ liệu (một căn nhà) là một <dfn>training example</dfn> <span class="gloss">(mẫu huấn luyện — một cặp đầu vào/đầu ra dùng để dạy mô hình)</span>.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 460 300" role="img" aria-label="Biểu đồ phân tán minh họa: trục ngang là diện tích nhà tính bằng sq ft, trục dọc là giá nhà tính bằng đô la, các điểm dữ liệu có xu hướng tăng dần và một đường thẳng hồi quy khớp qua các điểm đó.">
    <g stroke="currentColor" stroke-width="1" opacity=".18">
      <line x1="50" y1="260" x2="450" y2="260"/>
      <line x1="50" y1="164" x2="450" y2="164"/>
      <line x1="50" y1="68" x2="450" y2="68"/>
    </g>
    <g stroke="currentColor" stroke-width="1.4" fill="none">
      <line x1="50" y1="20" x2="50" y2="260"/>
      <line x1="50" y1="260" x2="450" y2="260"/>
    </g>
    <g font-family="Sora, sans-serif" font-size="10" fill="currentColor" opacity=".75">
      <text x="44" y="264" text-anchor="end">150k$</text>
      <text x="44" y="168" text-anchor="end">250k$</text>
      <text x="44" y="72" text-anchor="end">350k$</text>
      <text x="74" y="276" text-anchor="middle">900</text>
      <text x="221" y="276" text-anchor="middle">1500</text>
      <text x="367" y="276" text-anchor="middle">2100</text>
    </g>
    <text x="250" y="294" text-anchor="middle" font-size="11" fill="currentColor" font-family="Sora, sans-serif" font-weight="600">Diện tích nhà (sq ft)</text>
    <text x="18" y="140" text-anchor="middle" font-size="11" fill="currentColor" font-family="Sora, sans-serif" font-weight="600" transform="rotate(-90 18 140)">Giá nhà ($)</text>

    <line x1="62" y1="255" x2="446" y2="63" stroke="currentColor" stroke-width="2.2"/>

    <g fill="currentColor">
      <circle cx="74" cy="250" r="4.5"/>
      <circle cx="148" cy="222" r="4.5"/>
      <circle cx="221" cy="188" r="4.5"/>
      <circle cx="294" cy="154" r="4.5"/>
      <circle cx="367" cy="116" r="4.5"/>
      <circle cx="440" cy="73" r="4.5"/>
    </g>
  </svg>
  <figcaption>Ví dụ minh họa: mỗi chấm là một căn nhà (diện tích, giá bán). Đường thẳng là "đường khớp tốt nhất" mà thuật toán hồi quy tuyến tính tìm ra.</figcaption>
</figure>

<p>Đường thẳng khớp qua các điểm được biểu diễn bằng phương trình: <code>f(x) = w·x + b</code>, trong đó:</p>
<ul>
  <li><code>w</code> là <dfn>weight / slope</dfn> <span class="gloss">(trọng số / độ dốc — tốc độ giá nhà thay đổi khi diện tích thay đổi)</span>.</li>
  <li><code>b</code> là <dfn>bias</dfn> <span class="gloss">(độ chệch — điểm cắt trục tung, giúp dịch đường thẳng lên/xuống)</span>.</li>
</ul>
<p>Thuật toán <dfn>linear regression</dfn> <span class="gloss">(hồi quy tuyến tính)</span> liên tục điều chỉnh <code>w</code> và <code>b</code> để đường thẳng khớp dữ liệu tốt nhất có thể.</p>

<h2>Loss — "hình phạt" cho dự đoán sai</h2>
<p><dfn>Error</dfn> <span class="gloss">(sai số)</span> là khoảng cách giữa giá trị thực tế và giá trị mô hình dự đoán. <dfn>Loss</dfn> <span class="gloss">(hàm mất mát — hình phạt cho một dự đoán tệ)</span> thường được tính bằng bình phương của sai số: dự đoán hoàn hảo → loss bằng 0; dự đoán càng lệch → loss càng lớn. Thuật toán lặp đi lặp lại việc chỉnh <code>w</code>, <code>b</code> để loss nhỏ nhất có thể — quá trình này gọi là <dfn>training</dfn> <span class="gloss">(huấn luyện)</span>.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Regression = dự đoán một <strong>con số liên tục</strong>. Công thức cốt lõi: <code>f(x) = w·x + b</code>. Huấn luyện = tìm <code>w, b</code> sao cho <strong>loss</strong> (sai số bình phương) là nhỏ nhất.</p>
</div>`,
    },
    {
      id: "m2-l3",
      code: "2.3",
      kind: "lesson",
      title: "Supervised Learning — Phân loại (Classification)",
      navTitle: "Supervised — Phân loại",
      minutes: 8,
      source: "Supervised Learning - Classification",
      html: `<p>Khi đầu ra là một <strong>nhãn/hạng mục</strong> thay vì một con số liên tục, ta dùng <dfn>classification</dfn> <span class="gloss">(phân loại — gán một nhãn/hạng mục cho dữ liệu đầu vào dựa trên đặc trưng của nó)</span>. Có hai dạng:</p>
<ul>
  <li><dfn>Binary classification</dfn> <span class="gloss">(phân loại nhị phân — chỉ 2 lựa chọn)</span>: ví dụ email là spam hay không.</li>
  <li><dfn>Multi-class classification</dfn> <span class="gloss">(phân loại đa lớp — từ 3 lựa chọn trở lên)</span>: ví dụ cảm xúc tích cực / tiêu cực / trung lập.</li>
</ul>

<h2>Logistic Regression — thuật toán phân loại kinh điển</h2>
<p>Dù tên có chữ "regression", <dfn>logistic regression</dfn> <span class="gloss">(hồi quy logistic — thuật toán phân loại, không phải hồi quy dự đoán số)</span> thực chất dùng để <strong>phân loại</strong>: dự đoán một điều là đúng hay sai (có/không).</p>
<p>Ví dụ: dự đoán học sinh đậu/rớt dựa theo số giờ tự học. Khác với hồi quy tuyến tính dùng đường thẳng, logistic regression dùng một đường cong hình chữ S gọi là <dfn>sigmoid function</dfn> <span class="gloss">(hàm sigmoid — nén mọi giá trị số thực về khoảng 0 đến 1, để đọc như một xác suất)</span>.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 460 280" role="img" aria-label="Đường cong sigmoid: trục ngang là số giờ học từ 0 đến 10, trục dọc là xác suất đậu từ 0 đến 1. Đường cong hình chữ S tăng dần, với ngưỡng 0.5 và hai điểm ví dụ: 4 giờ học ứng với 20% xác suất (rớt), 6 giờ học ứng với 80% xác suất (đậu).">
    <g stroke="currentColor" stroke-width="1.4" fill="none">
      <line x1="50" y1="20" x2="50" y2="240"/>
      <line x1="50" y1="240" x2="450" y2="240"/>
    </g>
    <line x1="50" y1="130" x2="450" y2="130" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity=".6"/>
    <text x="454" y="134" font-size="10" fill="currentColor" opacity=".75" font-family="Sora, sans-serif">0.5</text>

    <polyline points="50,239.8 89,239.1 128,236.6 167,227.0 206,196 245,130 284,64 323,33 362,23.4 401,20.9 440,20.2" fill="none" stroke="currentColor" stroke-width="2.4"/>

    <g fill="currentColor">
      <circle cx="206" cy="196" r="5"/>
      <circle cx="284" cy="64" r="5"/>
    </g>
    <g font-family="Sora, sans-serif" font-size="10.5" fill="currentColor">
      <text x="206" y="214" text-anchor="middle">4h → 20%</text>
      <text x="206" y="227" text-anchor="middle" opacity=".7">Fail</text>
      <text x="284" y="50" text-anchor="middle">6h → 80%</text>
      <text x="284" y="37" text-anchor="middle" opacity=".7" font-weight="700">Pass</text>
    </g>
    <g font-family="Sora, sans-serif" font-size="10" fill="currentColor" opacity=".75">
      <text x="50" y="256" text-anchor="middle">0</text>
      <text x="245" y="256" text-anchor="middle">5</text>
      <text x="440" y="256" text-anchor="middle">10</text>
    </g>
    <text x="250" y="274" text-anchor="middle" font-size="11" fill="currentColor" font-family="Sora, sans-serif" font-weight="600">Số giờ học (hours)</text>
    <text x="18" y="130" text-anchor="middle" font-size="11" fill="currentColor" font-family="Sora, sans-serif" font-weight="600" transform="rotate(-90 18 130)">Xác suất đậu</text>
  </svg>
  <figcaption>Sigmoid nén mọi đầu vào về khoảng [0,1]. So kết quả với ngưỡng (threshold) 0.5: trên ngưỡng → "Pass", dưới ngưỡng → "Fail".</figcaption>
</figure>

<p>Quy tắc quyết định dùng <dfn>threshold</dfn> <span class="gloss">(ngưỡng — mốc so sánh để ra quyết định cuối, thường là 0.5)</span>: xác suất &gt; 0.5 → "Pass", xác suất &lt; 0.5 → "Fail". Với ví dụ trong bài: học 6 giờ → 80% xác suất đậu → <strong>Pass</strong>; học 4 giờ → 20% xác suất đậu → <strong>Fail</strong>.</p>

<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Bộ dữ liệu Iris — ví dụ phân loại đa lớp kinh điển</div>
  <p>Bộ dữ liệu <strong>Iris</strong> có 150 mẫu hoa thuộc 3 loài: <em>Iris-setosa, Iris-versicolor, Iris-virginica</em>. Mỗi mẫu có 4 đặc trưng: chiều dài/rộng đài hoa (sepal length/width) và chiều dài/rộng cánh hoa (petal length/width). Vì có 3 nhãn đầu ra, đây là bài toán <strong>phân loại đa lớp</strong> — logistic regression sẽ được minh họa với bộ dữ liệu này ở bài demo tiếp theo.</p>
</div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Classification = dự đoán một <strong>nhãn/hạng mục</strong>. Logistic regression dùng <strong>hàm sigmoid</strong> để nén kết quả về [0,1], rồi so với <strong>ngưỡng 0.5</strong> để ra quyết định nhị phân. Nhiều hơn 2 lớp → phân loại đa lớp (ví dụ Iris: 3 loài hoa).</p>
</div>`,
    },
    {
      id: "m2-l4",
      code: "2.4",
      kind: "lesson",
      title: "Demo thực hành: Anaconda, Jupyter Notebook & scikit-learn",
      navTitle: "Demo: Jupyter & scikit-learn",
      minutes: 12,
      source: "Demo: Basic Machine Learning Part 1 & 2",
      html: `<p>Trước khi code, cần biết 2 công cụ nền tảng của giới data science: <dfn>Anaconda</dfn> <span class="gloss">(bộ phân phối Python/R mã nguồn mở, đóng gói sẵn hầu hết thư viện khoa học dữ liệu và giúp quản lý các "environment" tách biệt cho từng dự án)</span> và <dfn>Jupyter Notebook</dfn> <span class="gloss">(môi trường lập trình tương tác — IDE — cho phép viết code, xem kết quả, vẽ biểu đồ và ghi chú trong cùng một tài liệu)</span>.</p>

<h2>Quy trình Machine Learning điển hình</h2>
<figure>
  <svg class="svg-diagram" viewBox="0 0 700 120" role="img" aria-label="Quy trình 5 bước của Machine Learning: Load Data, Preprocess, Train, Evaluate, Predict, nối tiếp nhau bằng mũi tên.">
    <defs><marker id="arr4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g font-family="Sora, sans-serif" font-size="12" fill="currentColor">
      <g transform="translate(10,30)"><rect width="120" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="60" y="32" text-anchor="middle" font-weight="700">Load Data</text></g>
      <line x1="140" y1="57" x2="154" y2="57" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr4)"/>
      <g transform="translate(160,30)"><rect width="120" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="60" y="32" text-anchor="middle" font-weight="700">Preprocess</text></g>
      <line x1="290" y1="57" x2="304" y2="57" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr4)"/>
      <g transform="translate(310,30)"><rect width="120" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="60" y="32" text-anchor="middle" font-weight="700">Train</text></g>
      <line x1="440" y1="57" x2="454" y2="57" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr4)"/>
      <g transform="translate(460,30)"><rect width="120" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="60" y="32" text-anchor="middle" font-weight="700">Evaluate</text></g>
      <line x1="590" y1="57" x2="604" y2="57" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr4)"/>
      <g transform="translate(610,30)"><rect width="80" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="40" y="32" text-anchor="middle" font-weight="700">Predict</text></g>
    </g>
  </svg>
  <figcaption>5 bước lặp lại trong hầu hết dự án ML: nạp dữ liệu, tiền xử lý, huấn luyện, đánh giá, rồi mới dùng để dự đoán.</figcaption>
</figure>

<h2>Demo 1 — Phân loại hoa Iris với Logistic Regression</h2>
<pre><code><span class="cmt"># Nhập các thư viện cần thiết</span>
import pandas as pd                              <span class="cmt"># xử lý dữ liệu dạng bảng</span>
from sklearn.linear_model import LogisticRegression  <span class="cmt"># thuật toán phân loại</span>

<span class="cmt"># Nạp dữ liệu và xem 5 dòng đầu</span>
iris_data = pd.read_csv("iris.csv")
iris_data.head()

<span class="cmt"># Tách đặc trưng (X) và nhãn (y)</span>
X = iris_data.drop(["id", "species"], axis=1)
y = iris_data["species"]

<span class="cmt"># Khởi tạo và huấn luyện mô hình</span>
model = LogisticRegression()
model.fit(X, y)

<span class="cmt"># Dự đoán trên dữ liệu mới, chưa từng thấy</span>
prediction = model.predict(new_data)
print(prediction)   <span class="cmt"># → ['Iris-setosa']</span></code></pre>
<p>Chỉ với vài dòng, ta đã đi qua đủ 3 bước: nạp dữ liệu, huấn luyện (<code>model.fit</code>), và suy luận (<code>model.predict</code>). Tham số <code>X</code> (chữ hoa, quy ước cho ma trận đặc trưng) và <code>y</code> (nhãn) là ký hiệu chuẩn trong toàn bộ giới ML.</p>

<h2>Demo 2 — Thêm chuẩn hóa dữ liệu &amp; đánh giá mô hình</h2>
<p>Bản demo mở rộng thêm 3 khái niệm quan trọng trước khi huấn luyện thật sự nghiêm túc:</p>

<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Vì sao phải chuẩn hóa (standardization)?</div>
  <p>Giả sử dự đoán giá nhà dùng 2 đặc trưng: diện tích (1.000–5.000 sq ft) và số phòng ngủ (1–6). Vì diện tích có giá trị lớn hơn hẳn, mô hình có thể "thiên vị" đặc trưng này dù số phòng ngủ cũng quan trọng không kém. <dfn>Standardization</dfn> <span class="gloss">(chuẩn hóa — biến đổi dữ liệu để có trung bình 0, độ lệch chuẩn 1)</span> đưa mọi đặc trưng về cùng thang đo, giúp mô hình đối xử công bằng với tất cả.</p>
</div>

<pre><code>import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

<span class="cmt"># Chia dữ liệu thành tập huấn luyện (train) và tập kiểm tra (test)</span>
<span class="cmt"># random_state=42 giúp việc chia là ngẫu nhiên NHƯNG lặp lại được y hệt mỗi lần chạy</span>
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

<span class="cmt"># Chuẩn hóa đặc trưng: fit trên tập train, áp dụng cho cả train & test</span>
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

<span class="cmt"># Huấn luyện trên dữ liệu ĐÃ chuẩn hóa</span>
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

<span class="cmt"># Đánh giá độ chính xác trên dữ liệu CHƯA từng huấn luyện</span>
predictions = model.predict(X_test_scaled)
print(accuracy_score(y_test, predictions))   <span class="cmt"># → 1.0 (100%)</span></code></pre>

<p><dfn>Train/test split</dfn> <span class="gloss">(chia tập huấn luyện/kiểm tra)</span> giữ lại một phần dữ liệu mà mô hình <strong>chưa từng nhìn thấy</strong> trong lúc huấn luyện, để kiểm tra xem nó có thực sự học được quy luật chung hay không. Đây gọi là <dfn>validation</dfn> <span class="gloss">(kiểm định — đánh giá mô hình trên dữ liệu tách biệt để đảm bảo nó khái quát hóa tốt)</span>. <dfn>Accuracy score</dfn> <span class="gloss">(độ chính xác)</span> = tỉ lệ dự đoán đúng trên tổng số mẫu kiểm tra.</p>

<div class="callout note">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>Overfitting — "học vẹt"</div>
  <p><dfn>Overfitting</dfn> <span class="gloss">(quá khớp — mô hình học thuộc lòng cả dữ liệu huấn luyện, kể cả nhiễu, thay vì học quy luật chung)</span> là khi mô hình đạt độ chính xác rất cao trên tập train nhưng lại kém trên dữ liệu mới. Ví dụ: mô hình lọc spam đạt 99% trên email đã thấy nhưng chỉ 60% với email lạ — dấu hiệu overfitting rõ ràng. Đây là lý do <em>bắt buộc</em> phải đánh giá trên tập test riêng biệt.</p>
</div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Quy trình chuẩn: <strong>load → chia train/test → chuẩn hóa → huấn luyện (.fit) → dự đoán (.predict) → đánh giá (accuracy_score)</strong>. Luôn đánh giá trên dữ liệu mô hình chưa từng thấy để tránh bị đánh lừa bởi overfitting.</p>
</div>`,
    },
    {
      id: "m2-l5",
      code: "2.5",
      kind: "lesson",
      title: "Unsupervised Learning — Học không giám sát",
      navTitle: "Unsupervised Learning",
      minutes: 8,
      source: "Unsupervised Learning",
      html: `<p><dfn>Unsupervised learning</dfn> <span class="gloss">(học không giám sát)</span> làm việc với dữ liệu <strong>không có nhãn</strong> — thuật toán tự khám phá mẫu hình và cấu trúc ẩn bên trong, không ai "mách" trước đáp án. Giống như đưa một hộp Lego nhiều màu cho một đứa trẻ và bảo "sắp xếp đi" — đứa trẻ sẽ tự nhóm theo màu, kích thước hay hình dạng mà không ai chỉ dẫn.</p>

<h2>Clustering — nhóm các đối tượng giống nhau</h2>
<p><dfn>Clustering</dfn> <span class="gloss">(phân cụm — nhóm các đối tượng có đặc điểm tương đồng lại với nhau)</span> dựa trên khái niệm <dfn>similarity</dfn> <span class="gloss">(độ tương đồng — một giá trị từ 0 đến 1 đo mức độ "giống nhau" giữa hai đối tượng)</span>: trong một cụm (cluster), các phần tử giống nhau hơn so với phần tử ở cụm khác. Dữ liệu không rơi vào cụm nào được gọi là <dfn>outlier</dfn> <span class="gloss">(điểm ngoại lệ — dữ liệu bất thường, không giống nhóm nào)</span>.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 460 260" role="img" aria-label="Sơ đồ phân cụm: ba nhóm điểm dữ liệu gần nhau tạo thành ba cụm (Cluster A, B, C), và một điểm đứng riêng lẻ được đánh dấu là Outlier.">
    <g fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" opacity=".55">
      <ellipse cx="112" cy="78" rx="55" ry="45"/>
      <ellipse cx="126" cy="203" rx="60" ry="42"/>
      <ellipse cx="338" cy="122" rx="70" ry="48"/>
    </g>
    <g fill="currentColor">
      <circle cx="100" cy="70" r="5"/><circle cx="130" cy="55" r="5"/><circle cx="115" cy="90" r="5"/><circle cx="85" cy="95" r="5"/><circle cx="140" cy="80" r="5"/>
      <circle cx="110" cy="190" r="5"/><circle cx="140" cy="205" r="5"/><circle cx="95" cy="210" r="5"/><circle cx="160" cy="185" r="5"/><circle cx="125" cy="225" r="5"/>
      <circle cx="330" cy="120" r="5"/><circle cx="360" cy="100" r="5"/><circle cx="345" cy="150" r="5"/><circle cx="300" cy="140" r="5"/><circle cx="370" cy="130" r="5"/><circle cx="320" cy="92" r="5"/>
    </g>
    <circle cx="250" cy="228" r="6" fill="var(--bad)"/>
    <g font-family="Sora, sans-serif" font-size="11.5" fill="currentColor" opacity=".85">
      <text x="112" y="30" text-anchor="middle" font-weight="700">Cluster A</text>
      <text x="126" y="252" text-anchor="middle" font-weight="700">Cluster B</text>
      <text x="338" y="66" text-anchor="middle" font-weight="700">Cluster C</text>
    </g>
    <text x="250" y="245" text-anchor="middle" font-size="11" fill="var(--bad)" font-family="Sora, sans-serif" font-weight="700">Outlier</text>
  </svg>
  <figcaption>Ba cụm dữ liệu (mỗi cụm gồm các điểm gần nhau) và một điểm ngoại lệ (outlier) không thuộc cụm nào.</figcaption>
</figure>

<h2>Ba ứng dụng thực tế phổ biến</h2>
<div class="tbl-wrap"><table>
<thead><tr><th>Ứng dụng</th><th>Cách hoạt động</th></tr></thead>
<tbody>
<tr><td><strong>Market segmentation</strong><br><span class="gloss">phân khúc thị trường</span></td><td>Nhóm khách hàng theo hành vi mua sắm — ví dụ nhóm thích ăn nhiều đạm có thể được quảng cáo sản phẩm thể thao.</td></tr>
<tr><td><strong>Outlier analysis</strong><br><span class="gloss">phân tích ngoại lệ</span></td><td>Phát hiện giao dịch thẻ tín dụng bất thường (số tiền quá lớn hoặc lặp lại đáng ngờ) → nghi ngờ gian lận.</td></tr>
<tr><td><strong>Recommendation systems</strong><br><span class="gloss">hệ gợi ý</span></td><td>Nhóm người dùng theo lịch sử xem phim/nghe nhạc để gợi ý nội dung tương tự (như Netflix).</td></tr>
</tbody>
</table></div>

<h2>4 bước của một quy trình clustering</h2>
<ol>
  <li><strong>Prepare the data</strong> <span class="gloss">(chuẩn bị dữ liệu)</span>: loại giá trị thiếu, chuẩn hóa, scale đặc trưng.</li>
  <li><strong>Create similarity matrix</strong> <span class="gloss">(tạo ma trận tương đồng)</span>: chọn thước đo phù hợp — <dfn>Euclidean distance</dfn> <span class="gloss">(khoảng cách Euclid — khoảng cách đường thẳng thông thường)</span>, <dfn>Manhattan distance</dfn> <span class="gloss">(khoảng cách theo lưới ô vuông, như đi bộ trên phố bàn cờ)</span>, <dfn>cosine similarity</dfn>, hoặc <dfn>Jaccard similarity</dfn> <span class="gloss">(đo tỉ lệ trùng lặp giữa hai tập hợp)</span>.</li>
  <li><strong>Run the clustering algorithm</strong>: các họ thuật toán chính là partition-based, hierarchical-based, density-based, distribution-based.</li>
  <li><strong>Interpret &amp; adjust</strong> <span class="gloss">(diễn giải &amp; điều chỉnh)</span>: vì không có nhãn "đúng" để đối chiếu, việc đánh giá clustering luôn mang tính lặp đi lặp lại và khám phá.</li>
</ol>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Unsupervised learning = <strong>không có nhãn</strong>, mục tiêu là tìm cấu trúc/nhóm ẩn (clustering) dựa trên <strong>độ tương đồng</strong>. Vì không có "đáp án đúng" để so sánh, đánh giá kết quả luôn mang tính khám phá và lặp lại.</p>
</div>`,
    },
    {
      id: "m2-l6",
      code: "2.6",
      kind: "lesson",
      title: "Reinforcement Learning — Học tăng cường",
      navTitle: "Reinforcement Learning",
      minutes: 7,
      source: "Reinforcement Learning",
      html: `<p><dfn>Reinforcement learning</dfn> <span class="gloss">(học tăng cường, viết tắt RL)</span> giống hệt cách bạn dạy một chú chó làm trò mới: thưởng khi nó làm đúng, không thưởng (hoặc cảnh cáo nhẹ) khi làm sai. Qua nhiều lần lặp lại, chú chó dần học được hành động nào mang lại phần thưởng nhiều nhất.</p>

<h2>5 thuật ngữ cốt lõi</h2>
<figure>
  <svg class="svg-diagram" viewBox="0 0 460 220" role="img" aria-label="Vòng lặp Reinforcement Learning: Agent thực hiện Action tác động lên Environment; Environment phản hồi lại State mới và Reward cho Agent, tạo thành một vòng lặp khép kín.">
    <defs>
      <marker id="arr5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>
    </defs>
    <g fill="none" stroke="currentColor" stroke-width="1.6">
      <rect x="30" y="70" width="130" height="70" rx="12"/>
      <rect x="300" y="70" width="130" height="70" rx="12"/>
    </g>
    <g font-family="Sora, sans-serif" fill="currentColor" text-anchor="middle">
      <text x="95" y="100" font-size="14" font-weight="700">Agent</text>
      <text x="95" y="118" font-size="10" opacity=".7">(tác nhân học)</text>
      <text x="365" y="100" font-size="14" font-weight="700">Environment</text>
      <text x="365" y="118" font-size="10" opacity=".7">(môi trường)</text>
    </g>
    <path d="M160 90 C 220 60, 260 60, 300 88" fill="none" stroke="currentColor" stroke-width="1.6" marker-end="url(#arr5)"/>
    <text x="230" y="58" text-anchor="middle" font-size="11.5" fill="currentColor" font-family="Sora, sans-serif">Action</text>
    <path d="M300 122 C 260 152, 220 152, 160 124" fill="none" stroke="currentColor" stroke-width="1.6" marker-end="url(#arr5)"/>
    <text x="230" y="178" text-anchor="middle" font-size="11.5" fill="currentColor" font-family="Sora, sans-serif">State + Reward</text>
  </svg>
  <figcaption>Vòng lặp bất tận: Agent hành động (action) lên môi trường, môi trường phản hồi trạng thái mới (state) và phần thưởng/hình phạt (reward), agent dùng phản hồi đó để cải thiện chính sách hành động.</figcaption>
</figure>

<div class="tbl-wrap"><table>
<thead><tr><th>Thuật ngữ</th><th>Định nghĩa</th><th>Ví dụ: xe tự lái</th></tr></thead>
<tbody>
<tr><td><dfn>Agent</dfn></td><td>Người học/ra quyết định, tương tác với môi trường.</td><td>Bộ điều khiển của xe.</td></tr>
<tr><td><dfn>Environment</dfn></td><td>Hệ thống bên ngoài mà agent tương tác và nhận phản hồi.</td><td>Con đường và bối cảnh xung quanh.</td></tr>
<tr><td><dfn>State</dfn></td><td>Biểu diễn tình huống hiện tại tại một thời điểm.</td><td>Hình ảnh camera thấy được ngay lúc đó.</td></tr>
<tr><td><dfn>Action</dfn></td><td>Tập các hành động agent có thể chọn.</td><td>Rẽ trái / phải / đi thẳng.</td></tr>
<tr><td><dfn>Policy</dfn> <span class="gloss">(chính sách)</span></td><td>Chiến lược ánh xạ từ trạng thái sang hành động — "bộ não" của agent.</td><td>Quy luật học được: thấy cảnh này thì nên rẽ trái.</td></tr>
</tbody>
</table></div>

<p>Mục tiêu của RL là tìm ra <dfn>optimal policy</dfn> <span class="gloss">(chính sách tối ưu — chiến lược mang lại tổng phần thưởng lớn nhất)</span>, thường được học qua các thuật toán như <dfn>Q-learning</dfn> hay <dfn>Deep Q-learning</dfn> <span class="gloss">(Q-learning kết hợp mạng nơ-ron sâu, xử lý được không gian trạng thái phức tạp)</span>.</p>

<h2>Ví dụ: huấn luyện cánh tay robot trong kho hàng</h2>
<ol>
  <li><strong>Thiết lập môi trường:</strong> cánh tay robot, bố cục kho, hàng hóa và vị trí đích.</li>
  <li><strong>Định nghĩa state:</strong> vị trí/góc của cánh tay, vị trí món hàng, vị trí đích.</li>
  <li><strong>Định nghĩa action space:</strong> mọi động tác cánh tay có thể thực hiện.</li>
  <li><strong>Quyết định thưởng/phạt:</strong> thưởng khi đặt đúng vị trí, phạt khi làm rơi/hỏng hàng hoặc đặt sai chỗ.</li>
</ol>
<p>Ban đầu robot hành động ngẫu nhiên, quan sát kết quả thưởng/phạt; dần dần nó ưu tiên các hành động cho thưởng cao và tránh hành động bị phạt — qua hàng nghìn lượt lặp, nó học được chiến lược đặt hàng hiệu quả.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>RL không cần dữ liệu có nhãn — nó học qua <strong>thử-sai</strong> với phần thưởng/hình phạt từ môi trường. 5 khái niệm cốt lõi: <strong>Agent, Environment, State, Action, Policy</strong>. Mục tiêu cuối cùng: tìm optimal policy.</p>
</div>`,
    },
    {
      id: "m2-summary",
      code: "★",
      kind: "summary",
      title: "★ Tổng kết Phần 2 & Trắc nghiệm",
      navTitle: "Tổng kết & Trắc nghiệm",
      note: "Ôn lại 6 bài học + làm 5 câu trắc nghiệm",
      html: `<p>Phần 2 đi từ định nghĩa Machine Learning tổng quát, đào sâu vào Supervised Learning (2 bài lý thuyết + 1 bài demo code thật), rồi khép lại với Unsupervised và Reinforcement Learning. Sơ đồ dưới đây tóm tắt cách 3 kiểu học liên hệ với nhau.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 680 260" role="img" aria-label="Sơ đồ Machine Learning phân nhánh thành ba kiểu học: Supervised (chia tiếp thành Regression và Classification), Unsupervised (Clustering), và Reinforcement (Policy qua thử-sai).">
    <defs><marker id="arr6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g stroke="currentColor" stroke-width="1.4" fill="none" opacity=".85">
      <line x1="120" y1="40" x2="60" y2="80" marker-end="url(#arr6)"/>
      <line x1="120" y1="40" x2="340" y2="80" marker-end="url(#arr6)"/>
      <line x1="120" y1="40" x2="600" y2="80" marker-end="url(#arr6)"/>
      <line x1="40" y1="120" x2="40" y2="160" marker-end="url(#arr6)"/>
      <line x1="80" y1="120" x2="80" y2="160" marker-end="url(#arr6)"/>
    </g>
    <g font-family="Sora, sans-serif" fill="currentColor" text-anchor="middle">
      <rect x="30" y="10" width="180" height="46" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="120" y="38" font-size="13" font-weight="700">Machine Learning</text>

      <rect x="10" y="82" width="100" height="42" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="60" y="107" font-size="11" font-weight="700">Supervised</text>

      <rect x="290" y="82" width="100" height="42" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="340" y="107" font-size="11" font-weight="700">Unsupervised</text>
      <text x="340" y="150" font-size="10.5" opacity=".8">Clustering (phân cụm)</text>

      <rect x="550" y="82" width="100" height="42" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="600" y="107" font-size="11" font-weight="700">Reinforcement</text>
      <text x="600" y="150" font-size="10.5" opacity=".8">Policy qua thử-sai</text>

      <rect x="2" y="164" width="76" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <text x="40" y="188" font-size="10" font-weight="700">Regression</text>
      <rect x="86" y="164" width="82" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <text x="127" y="188" font-size="10" font-weight="700">Classification</text>
    </g>
  </svg>
  <figcaption>Machine Learning chia thành 3 kiểu học; riêng Supervised còn chia tiếp thành Regression (đầu ra liên tục) và Classification (đầu ra nhãn).</figcaption>
</figure>

<div class="summary-grid">
  <div class="sum-card"><h4>2.1 — ML là gì?</h4><ul><li>Học từ ví dụ (features + labels), không lập trình luật cứng.</li><li>2 pha: Training (học) và Inference (dự đoán).</li></ul></div>
  <div class="sum-card"><h4>2.2 — Hồi quy (Regression)</h4><ul><li>Dự đoán số liên tục: <code>f(x)=w·x+b</code>.</li><li>Huấn luyện = giảm thiểu loss (sai số bình phương).</li></ul></div>
  <div class="sum-card"><h4>2.3 — Phân loại (Classification)</h4><ul><li>Logistic regression dùng sigmoid, so với ngưỡng 0.5.</li><li>Nhị phân (2 lớp) hoặc đa lớp (≥3 lớp, ví dụ Iris).</li></ul></div>
  <div class="sum-card"><h4>2.4 — Demo Jupyter</h4><ul><li>Quy trình: load → chuẩn hóa → train → evaluate → predict.</li><li>Train/test split &amp; standardization giúp tránh overfitting.</li></ul></div>
  <div class="sum-card"><h4>2.5 — Unsupervised Learning</h4><ul><li>Không có nhãn, phân cụm theo similarity.</li><li>Ứng dụng: phân khúc khách hàng, phát hiện gian lận, gợi ý.</li></ul></div>
  <div class="sum-card"><h4>2.6 — Reinforcement Learning</h4><ul><li>Agent học qua reward/penalty từ environment.</li><li>5 khái niệm: Agent, Environment, State, Action, Policy.</li></ul></div>
</div>

<h2>Trắc nghiệm ôn tập Phần 2</h2>`,
      quiz: [
        {
          q: "Câu 1. Giai đoạn nào của Machine Learning dùng dữ liệu đã có nhãn để mô hình học ra quy luật ánh xạ?",
          options: [
            { text: "Inference", correct: false, explain: "Sai. Inference là bước dùng mô hình ĐÃ học để dự đoán trên dữ liệu mới, không phải bước học." },
            { text: "Training", correct: true, explain: "Đúng. Training là giai đoạn mô hình học quan hệ giữa đặc trưng và nhãn từ dữ liệu huấn luyện." },
            { text: "Standardization", correct: false, explain: "Sai. Đây chỉ là bước tiền xử lý (đưa đặc trưng về cùng thang đo), không phải bước học quy luật." },
            { text: "Accuracy scoring", correct: false, explain: "Sai. Đây là bước đánh giá kết quả SAU khi đã huấn luyện xong, không phải bước học." },
          ],
        },
        {
          q: "Câu 2. Bài toán nào dưới đây là REGRESSION (chứ không phải classification)?",
          options: [
            { text: "Xác định một email có phải thư rác hay không.", correct: false, explain: "Sai. Đầu ra chỉ có 2 lựa chọn (spam/không spam) → đây là bài toán phân loại nhị phân." },
            { text: "Dự đoán giá cổ phiếu ngày mai, tính bằng đô la.", correct: true, explain: "Đúng. Giá cổ phiếu là một con số liên tục — đây chính là ví dụ regression được nêu trong bài 2.2." },
            { text: "Phân loại một bông hoa thuộc 1 trong 3 loài Iris.", correct: false, explain: "Sai. Đầu ra là một trong 3 nhãn loài hoa → đây là phân loại đa lớp (multi-class classification)." },
            { text: "Gắn nhãn một bình luận là tích cực, tiêu cực hay trung lập.", correct: false, explain: "Sai. Có 3 nhãn rời rạc để chọn → đây cũng là phân loại đa lớp, không phải regression." },
          ],
        },
        {
          q: "Câu 3. Logistic regression trả về xác suất 0.35 cho một mẫu, với ngưỡng (threshold) là 0.5. Mẫu này được phân loại là gì?",
          options: [
            { text: "Lớp dương (Pass/Positive), vì 0.35 vẫn là một xác suất hợp lệ.", correct: false, explain: "Sai. Quy tắc là so với ngưỡng: 0.35 &lt; 0.5 nên phải phân vào lớp âm, không phải lớp dương." },
            { text: "Lớp âm (Fail/Negative), vì 0.35 nhỏ hơn ngưỡng 0.5.", correct: true, explain: "Đúng. Đúng quy tắc trong bài 2.3: dưới ngưỡng 0.5 → phân vào lớp âm (Fail)." },
            { text: "Không thể kết luận, cần thêm dữ liệu mới xác định được.", correct: false, explain: "Sai. Với ngưỡng cố định 0.5, quyết định luôn có thể đưa ra ngay từ xác suất đã tính được." },
            { text: "Kết quả luôn mặc định là 50%, bất kể xác suất tính được.", correct: false, explain: "Sai. 50% chỉ là giá trị của ngưỡng, không phải kết quả đầu ra của mọi mẫu." },
          ],
        },
        {
          q: "Câu 4. Vì sao cần chuẩn hóa (standardization) các đặc trưng trước khi huấn luyện?",
          options: [
            { text: "Để bảng dữ liệu hiển thị đẹp và gọn hơn khi in ra.", correct: false, explain: "Sai. Chuẩn hóa không phục vụ mục đích trình bày — nó ảnh hưởng trực tiếp tới cách mô hình học." },
            { text: "Để các đặc trưng có thang đo khác nhau (ví dụ sq ft và số phòng ngủ) không \"lấn át\" nhau khi mô hình học.", correct: true, explain: "Đúng. Đây đúng lý do nêu trong bài 2.4 — tránh việc đặc trưng có giá trị lớn hơn \"áp đảo\" đặc trưng khác." },
            { text: "Để tự động tăng số lượng mẫu dữ liệu huấn luyện.", correct: false, explain: "Sai. Chuẩn hóa không thêm dữ liệu — nó chỉ biến đổi lại thang đo của dữ liệu đã có." },
            { text: "Để loại bỏ hoàn toàn nhiễu (noise) khỏi dữ liệu.", correct: false, explain: "Sai. Chuẩn hóa là đổi thang đo (mean=0, std=1), không phải kỹ thuật khử nhiễu dữ liệu." },
          ],
        },
        {
          q: "Câu 5. Điểm khác biệt cốt lõi giữa Unsupervised Learning và Reinforcement Learning là gì?",
          options: [
            { text: "Unsupervised học qua phần thưởng từ môi trường, còn Reinforcement tìm cấu trúc ẩn trong dữ liệu tĩnh.", correct: false, explain: "Sai. Hai vế bị đảo ngược — đây là mô tả bị hoán đổi giữa hai kiểu học." },
            { text: "Unsupervised tìm cấu trúc/nhóm ẩn trong dữ liệu tĩnh có sẵn; Reinforcement học qua tương tác thử-sai với môi trường và nhận phần thưởng.", correct: true, explain: "Đúng. Unsupervised (bài 2.5) làm việc trên tập dữ liệu có sẵn để phân cụm; Reinforcement (bài 2.6) học liên tục qua tương tác thời gian thực với môi trường." },
            { text: "Cả hai đều bắt buộc phải có dữ liệu gán nhãn đầy đủ mới huấn luyện được.", correct: false, explain: "Sai. Cả hai đều KHÔNG cần dữ liệu có nhãn theo kiểu supervised — đây chính là điểm chung, không phải điểm khác biệt, và phát biểu này còn sai về bản chất." },
            { text: "Cả hai chỉ áp dụng được cho dữ liệu dạng hình ảnh.", correct: false, explain: "Sai. Cả hai áp dụng cho rất nhiều loại dữ liệu — giao dịch, hành vi người dùng, cảm biến robot — không giới hạn ở ảnh." },
          ],
        },
      ],
    },
  ],
};
