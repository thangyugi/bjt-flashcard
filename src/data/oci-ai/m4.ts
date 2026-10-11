import type { OciModule } from "./types";

/** Phần 4 — trích nguyên văn từ docs/OCIAI/Nền Tảng AI Cùng OCI.html (module 5 khóa gốc). */
export const m4: OciModule = {
  id: "m4",
  num: 4,
  origModule: 5,
  title: "Generative AI & LLM Foundations",
  desc: "Generative AI, Large Language Model, kiến trúc Transformer, Prompt Engineering, RAG & Fine-tuning.",
  lessons: [
    {
      id: "m4-l1",
      code: "4.1",
      kind: "lesson",
      title: "Generative AI là gì? Khác gì Machine Learning truyền thống?",
      navTitle: "Generative AI là gì?",
      minutes: 9,
      source: "Introduction to Generative AI",
      html: `<p><dfn>Generative AI</dfn> <span class="gloss">(AI tạo sinh, viết tắt GenAI)</span> là loại AI có thể <strong>tạo ra nội dung mới</strong> — văn bản, ảnh, nhạc, video — thay vì chỉ nhận diện hay phân loại nội dung có sẵn. Về vị trí, GenAI là tập con của Deep Learning (đã học ở Phần 3).</p>

<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Ví dụ: dạy AI vẽ một chú chó</div>
  <p>Bạn cho mô hình xem thật nhiều ảnh chó. Mô hình không "biết" chó là gì, nhưng qua hàng nghìn bức ảnh, nó tự nhận ra các mẫu hình chung: tai nhọn, răng sắc, ria mép… Khi được yêu cầu "vẽ một con chó", mô hình <strong>không sao chép</strong> bất kỳ ảnh nào đã thấy — nó tạo ra một ảnh hoàn toàn mới dựa trên các mẫu hình đã học được.</p>
</div>

<h2>Generative AI khác Machine Learning truyền thống ở đâu?</h2>
<figure>
  <svg class="svg-diagram" viewBox="0 0 680 240" role="img" aria-label="So sánh hai luồng: Machine Learning truyền thống cần dữ liệu có nhãn, huấn luyện ra mô hình phân loại, rồi dự đoán một nhãn cho dữ liệu mới. Generative AI học từ dữ liệu không nhãn, huấn luyện ra mô hình sinh, rồi tạo ra nội dung hoàn toàn mới.">
    <defs><marker id="arr10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g font-family="Sora, sans-serif" font-size="11.5" fill="currentColor">
      <text x="10" y="24" font-size="12" font-weight="700" opacity=".8">Machine Learning truyền thống</text>
      <rect x="10" y="36" width="140" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="80" y="58" text-anchor="middle" font-weight="700">Ảnh + nhãn</text>
      <text x="80" y="74" text-anchor="middle" font-size="9.5" opacity=".7">"đây là con mèo"</text>
      <line x1="150" y1="61" x2="194" y2="61" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr10)"/>
      <rect x="200" y="36" width="140" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <text x="270" y="58" text-anchor="middle" font-weight="700">Mô hình phân loại</text>
      <text x="270" y="74" text-anchor="middle" font-size="9.5" opacity=".7">đã huấn luyện</text>
      <line x1="340" y1="61" x2="384" y2="61" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr10)"/>
      <rect x="390" y="36" width="140" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="460" y="58" text-anchor="middle" font-weight="700">Ảnh mới (không nhãn)</text>
      <line x1="530" y1="61" x2="574" y2="61" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr10)"/>
      <rect x="580" y="36" width="90" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="625" y="58" text-anchor="middle" font-weight="700">Nhãn</text>
      <text x="625" y="74" text-anchor="middle" font-size="9.5" opacity=".7">"con chó"</text>

      <text x="10" y="140" font-size="12" font-weight="700" opacity=".8">Generative AI</text>
      <rect x="10" y="152" width="140" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="80" y="174" text-anchor="middle" font-weight="700">Ảnh KHÔNG nhãn</text>
      <text x="80" y="190" text-anchor="middle" font-size="9.5" opacity=".7">(unlabeled data)</text>
      <line x1="150" y1="177" x2="194" y2="177" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr10)"/>
      <rect x="200" y="152" width="140" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <text x="270" y="174" text-anchor="middle" font-weight="700">Mô hình sinh (GenAI)</text>
      <text x="270" y="190" text-anchor="middle" font-size="9.5" opacity=".7">đã pre-train</text>
      <line x1="340" y1="177" x2="384" y2="177" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr10)"/>
      <rect x="390" y="152" width="140" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="460" y="174" text-anchor="middle" font-weight="700">Yêu cầu / Prompt</text>
      <text x="460" y="190" text-anchor="middle" font-size="9.5" opacity=".7">"vẽ một con chó"</text>
      <line x1="530" y1="177" x2="574" y2="177" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr10)"/>
      <rect x="580" y="152" width="90" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <text x="625" y="174" text-anchor="middle" font-weight="700">Nội dung</text>
      <text x="625" y="190" text-anchor="middle" font-size="9.5" opacity=".7">mới, chưa từng có</text>
    </g>
  </svg>
  <figcaption>ML truyền thống cần dữ liệu có nhãn và trả về một nhãn/dự đoán. GenAI học từ dữ liệu không nhãn (unstructured) và tạo ra nội dung hoàn toàn mới theo yêu cầu.</figcaption>
</figure>

<div class="tbl-wrap"><table>
<thead><tr><th></th><th>Machine Learning truyền thống</th><th>Generative AI</th></tr></thead>
<tbody>
<tr><td>Dữ liệu huấn luyện</td><td>Cần dữ liệu có nhãn (data + label)</td><td>Học từ dữ liệu không nhãn (pre-training)</td></tr>
<tr><td>Đầu ra</td><td>Nhãn / dự đoán / phân loại</td><td>Nội dung hoàn toàn mới (văn bản, ảnh…)</td></tr>
<tr><td>Mục tiêu học</td><td>Quan hệ giữa đặc trưng và nhãn</td><td>Mẫu hình ẩn trong nội dung phi cấu trúc</td></tr>
</tbody>
</table></div>

<h2>Hai loại mô hình Generative AI</h2>
<ul>
  <li><strong>Text-based</strong> <span class="gloss">(dựa trên văn bản)</span>: sinh văn bản, code, hội thoại, bài viết — học từ lượng lớn dữ liệu văn bản để nắm mẫu hình ngôn ngữ.</li>
  <li><strong><dfn>Multimodal</dfn></strong> <span class="gloss">(đa phương thức — xử lý và sinh nhiều loại dữ liệu cùng lúc: văn bản, ảnh, âm thanh, video)</span>.</li>
</ul>

<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Ứng dụng nổi bật: y tế &amp; khám phá thuốc</div>
  <p>GenAI đang tăng tốc đáng kể tiến bộ khoa học trong y học — từ hỗ trợ phát triển thuốc mới, chẩn đoán hình ảnh y tế, đến đẩy nhanh tốc độ nghiên cứu khoa học nói chung.</p>
</div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>GenAI = mô hình <strong>tạo nội dung mới</strong>, học từ dữ liệu <strong>không nhãn</strong> — khác với ML truyền thống cần nhãn để phân loại/dự đoán. Hai loại: text-based và multimodal.</p>
</div>`,
    },
    {
      id: "m4-l2",
      code: "4.2",
      kind: "lesson",
      title: "Large Language Model (LLM) — nguyên lý hoạt động",
      navTitle: "Large Language Model (LLM)",
      minutes: 9,
      source: "Introduction to Large Language Models",
      html: `<p>Một <dfn>language model</dfn> <span class="gloss">(mô hình ngôn ngữ)</span> là mô hình xác suất của văn bản: nó tính xác suất cho một chuỗi từ xuất hiện trong câu, dựa trên các từ đứng trước — nói cách khác, nó dự đoán từ nào có khả năng xuất hiện tiếp theo.</p>

<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Ví dụ: điền vào chỗ trống</div>
  <p>Câu (mở đầu một cuốn truyện thiếu nhi): <em>"I wrote to the zoo to send me a pet. They sent me ___ ."</em> Mô hình tính một <dfn>probability distribution</dfn> <span class="gloss">(phân phối xác suất — gán một xác suất cho mỗi từ có thể xuất hiện)</span> trên toàn bộ <dfn>vocabulary</dfn> <span class="gloss">(từ vựng — tập hợp mọi từ mô hình "biết")</span>. Chỉ những từ liên quan tới ngữ cảnh (ở đây là các loài động vật — vì câu chuyện nói về sở thú) mới nhận xác suất đáng kể; từ không liên quan (như "xe hơi", "tòa nhà") gần như bằng 0.</p>
</div>

<figure>
  <svg class="svg-diagram" viewBox="0 0 460 250" role="img" aria-label="Biểu đồ cột thể hiện xác suất từ tiếp theo trong câu, với dog nhận xác suất 45%, elephant 2%, lion 3%, và các từ khác gộp lại 50%.">
    <g stroke="currentColor" stroke-width="1.2" fill="none">
      <line x1="40" y1="200" x2="440" y2="200"/>
    </g>
    <g fill="currentColor">
      <rect x="60" y="189.8" width="70" height="10.2"/>
      <rect x="160" y="193.2" width="70" height="6.8"/>
      <rect x="260" y="47" width="70" height="153"/>
      <rect x="360" y="30" width="70" height="170"/>
    </g>
    <g font-family="Sora, sans-serif" font-size="11" fill="currentColor" text-anchor="middle">
      <text x="95" y="183">3%</text>
      <text x="195" y="186">2%</text>
      <text x="295" y="40">45%</text>
      <text x="395" y="23">50%</text>
      <text x="95" y="216">lion</text>
      <text x="195" y="216">elephant</text>
      <text x="295" y="216" font-weight="700">dog</text>
      <text x="395" y="216">từ khác</text>
    </g>
    <text x="250" y="235" text-anchor="middle" font-size="11" fill="currentColor" opacity=".75" font-family="Sora, sans-serif">"…They sent me ___ " — xác suất cho mỗi từ trong vocabulary</text>
  </svg>
  <figcaption>"Dog" có xác suất cao nhất (45%) nên được chọn làm từ tiếp theo — mô hình chỉ chọn từ có xác suất cao nhất trong phân phối.</figcaption>
</figure>

<h2>Cách LLM sinh văn bản: chọn từng token một</h2>
<p>Sau khi có phân phối xác suất, cách đơn giản nhất là chọn từ có xác suất cao nhất — ở đây là "dog". Từ này được nối vào câu và đưa ngược lại vào mô hình để dự đoán từ kế tiếp. Quá trình lặp lại tới khi mô hình sinh ra token <dfn>EOS</dfn> <span class="gloss">(End Of Sequence / End Of Sentence — token đặc biệt báo hiệu câu đã kết thúc)</span> với xác suất cao nhất.</p>
<p>Kết quả cuối: <em>"I wrote to the zoo to send me a pet. They sent me a dog."</em></p>

<h2>"Large" trong Large Language Model nghĩa là gì?</h2>
<p>Từ "Large" chỉ số lượng <dfn>parameters</dfn> <span class="gloss">(tham số — các trọng số có thể điều chỉnh trong mạng nơ-ron, được tối ưu trong lúc huấn luyện để dự đoán từ tiếp theo)</span>, có thể từ hàng trăm triệu tới hàng trăm tỷ. Không có ngưỡng thống nhất để phân biệt mô hình "nhỏ" hay "lớn" — đây là một quy ước chung của ngành. <dfn>Model size</dfn> <span class="gloss">(kích thước mô hình — dung lượng bộ nhớ cần để lưu trữ các tham số của mô hình)</span> tăng theo số tham số.</p>

<div class="callout note">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>Càng nhiều tham số càng tốt?</div>
  <p>Không hẳn. Một mô hình quá lớn với quá nhiều tham số có thể bị <strong>overfitting</strong> với chính dữ liệu huấn luyện, khiến hiệu năng thực tế không tương xứng với kích thước.</p>
</div>

<h2>LLM làm được gì?</h2>
<p>Trả lời câu hỏi (thủ đô Pháp là gì → Paris), suy luận qua các câu đố phức tạp, viết bài luận, và dịch thuật ("how are you" → tiếng Pháp). Nền tảng cho mọi khả năng này là kiến trúc <dfn>Transformer</dfn> — chủ đề của hai bài tiếp theo — cho phép mô hình "chú ý có chọn lọc" (selective attention) tới các phần khác nhau của đầu vào khi dự đoán từ tiếp theo, mang lại khả năng hiểu ngữ cảnh vượt trội.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>LLM = mô hình xác suất dự đoán <strong>từ tiếp theo</strong>, lặp lại từng token tới khi gặp EOS. "Large" ám chỉ số lượng <strong>parameters</strong> khổng lồ — nhưng nhiều tham số hơn không đồng nghĩa tốt hơn (rủi ro overfitting).</p>
</div>`,
    },
    {
      id: "m4-l3",
      code: "4.3",
      kind: "lesson",
      title: "Kiến trúc Transformer (Phần 1) — vì sao cần Self-Attention",
      navTitle: "Transformer (P1) — Self-Attention",
      minutes: 9,
      source: "Transformers Part 1",
      html: `<p>Máy hiểu ngôn ngữ khó hơn con người tưởng. Câu <em>"Jane threw the frisbee and her dog fetched it"</em> rất dễ hiểu với người: Jane ném, chó tha, và "it" ám chỉ cái đĩa (frisbee). Nhưng để một mạng nơ-ron suy ra được điều đó, cần một cơ chế đặc biệt.</p>

<h2>RNN xử lý từng từ — Transformer nhìn toàn cảnh</h2>
<p>Như đã học ở Phần 3, RNN xử lý từng từ một và chỉ nhớ tốt ngữ cảnh gần. <dfn>Transformer</dfn> <span class="gloss">(kiến trúc deep learning giới thiệu trong bài báo "Attention Is All You Need", xử lý toàn bộ câu cùng lúc thay vì tuần tự)</span> nhìn toàn bộ câu <strong>cùng một lúc</strong>, như thể có "cái nhìn từ trên cao" bao quát mọi từ và mối quan hệ giữa chúng.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 460 300" role="img" aria-label="Sơ đồ self-attention: 9 từ trong câu được xếp thành vòng tròn, mọi từ đều có liên kết mờ tới mọi từ khác, riêng liên kết giữa 'it' và 'frisbee' được tô đậm màu nhấn để thể hiện self-attention giúp mô hình hiểu 'it' ám chỉ 'frisbee'.">
      <line x1="230.0" y1="30.0" x2="307.1" y2="58.1" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="230.0" y1="30.0" x2="348.2" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="230.0" y1="30.0" x2="333.9" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="230.0" y1="30.0" x2="271.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="230.0" y1="30.0" x2="189.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="230.0" y1="30.0" x2="126.1" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="230.0" y1="30.0" x2="111.8" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="230.0" y1="30.0" x2="152.9" y2="58.1" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="307.1" y1="58.1" x2="348.2" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="307.1" y1="58.1" x2="333.9" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="307.1" y1="58.1" x2="271.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="307.1" y1="58.1" x2="189.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="307.1" y1="58.1" x2="126.1" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="307.1" y1="58.1" x2="111.8" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="307.1" y1="58.1" x2="152.9" y2="58.1" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="348.2" y1="129.2" x2="333.9" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="348.2" y1="129.2" x2="271.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="348.2" y1="129.2" x2="189.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="348.2" y1="129.2" x2="126.1" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="348.2" y1="129.2" x2="111.8" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="348.2" y1="129.2" x2="152.9" y2="58.1" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="333.9" y1="210.0" x2="271.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="333.9" y1="210.0" x2="189.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="333.9" y1="210.0" x2="126.1" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="333.9" y1="210.0" x2="111.8" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="271.0" y1="262.8" x2="189.0" y2="262.8" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="271.0" y1="262.8" x2="126.1" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="271.0" y1="262.8" x2="111.8" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="271.0" y1="262.8" x2="152.9" y2="58.1" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="189.0" y1="262.8" x2="126.1" y2="210.0" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="189.0" y1="262.8" x2="111.8" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="189.0" y1="262.8" x2="152.9" y2="58.1" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="126.1" y1="210.0" x2="111.8" y2="129.2" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="126.1" y1="210.0" x2="152.9" y2="58.1" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="111.8" y1="129.2" x2="152.9" y2="58.1" stroke="currentColor" stroke-width="0.7" opacity=".15"/>
      <line x1="333.9" y1="210.0" x2="152.9" y2="58.1" stroke="var(--accent)" stroke-width="2.4"/>
    <g fill="currentColor">
      <circle cx="230.0" cy="30.0" r="5"/>
      <circle cx="307.1" cy="58.1" r="5"/>
      <circle cx="348.2" cy="129.2" r="5"/>
      <circle cx="333.9" cy="210.0" r="6" fill="var(--accent)"/>
      <circle cx="271.0" cy="262.8" r="5"/>
      <circle cx="189.0" cy="262.8" r="5"/>
      <circle cx="126.1" cy="210.0" r="5"/>
      <circle cx="111.8" cy="129.2" r="5"/>
      <circle cx="152.9" cy="58.1" r="6" fill="var(--accent)"/>
    </g>
    <g font-family="Sora, sans-serif" font-size="12" fill="currentColor">
      <text x="230" y="18" text-anchor="middle">Jane</text>
      <text x="320" y="50" text-anchor="start">threw</text>
      <text x="362" y="133" text-anchor="start">the</text>
      <text x="345" y="232" text-anchor="middle" fill="var(--accent)" font-weight="700">frisbee</text>
      <text x="271" y="284" text-anchor="middle">and</text>
      <text x="189" y="284" text-anchor="middle">her</text>
      <text x="112" y="232" text-anchor="middle">dog</text>
      <text x="98" y="133" text-anchor="end">fetched</text>
      <text x="140" y="50" text-anchor="end" fill="var(--accent)" font-weight="700">it</text>
    </g>
  </svg>
  <figcaption>Self-attention cho phép mọi từ "nhìn thấy" mọi từ khác cùng lúc — nhờ đó mô hình xác định được "it" liên hệ chặt với "frisbee", dù hai từ nằm cách xa nhau trong câu.</figcaption>
</figure>

<h2>Self-Attention — trái tim của Transformer</h2>
<p><dfn>Self-attention</dfn> <span class="gloss">(tự chú ý — cơ chế cho phép mô hình cân nhắc mức độ quan trọng của từng từ khác trong câu so với từ đang xét)</span> giúp mô hình "thêm ngữ cảnh" vào từng từ: nó nhận ra "dog" đứng sau "her", "fetched" đứng sau "dog", "it" đứng sau "fetched" — và bằng cách xem xét toàn bộ các mối quan hệ này cùng lúc (không chỉ từ liền kề như RNN), mô hình suy luận được "it" nhiều khả năng ám chỉ "frisbee".</p>
<p>Đây chính là điểm khác biệt cốt lõi: self-attention giúp mô hình nắm bắt được các <dfn>long-range dependencies</dfn> <span class="gloss">(phụ thuộc tầm xa — mối quan hệ giữa các từ ở cách xa nhau trong câu)</span> mà RNN thường gặp khó khăn.</p>

<h2>Hai khối kiến trúc: Encoder &amp; Decoder</h2>
<p>Transformer gồm 2 khối con: <dfn>encoder</dfn> <span class="gloss">(bộ mã hóa — xử lý văn bản đầu vào, mã hóa thành các vector số chứa thông tin ngữ cảnh)</span> và <dfn>decoder</dfn> <span class="gloss">(bộ giải mã — nhận các vector đã mã hóa và sinh ra văn bản đầu ra)</span>. Cả hai đều gồm nhiều lớp kết nối bằng cơ chế self-attention. Bài tiếp theo (Phần 2 của loạt Transformer) sẽ đi sâu vào chi tiết cách encoder và decoder phối hợp với nhau.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Transformer xử lý <strong>toàn câu cùng lúc</strong> nhờ <strong>self-attention</strong>, khắc phục điểm yếu "chỉ nhớ ngữ cảnh gần" của RNN. Kiến trúc gồm 2 khối: <strong>encoder</strong> (mã hóa đầu vào) và <strong>decoder</strong> (sinh đầu ra).</p>
</div>`,
    },
    {
      id: "m4-l4",
      code: "4.4",
      kind: "lesson",
      title: "Kiến trúc Transformer (Phần 2) — Token, Embedding, Encoder/Decoder",
      navTitle: "Transformer (P2) — Encoder/Decoder",
      minutes: 11,
      source: "Transformers Part 2",
      html: `<p>Trước khi xem chi tiết bên trong Transformer, hai khái niệm nền tảng cần nắm: <strong>token</strong> và <strong>embedding</strong>.</p>

<h2>Token &amp; Tokenization</h2>
<p>LLM không hiểu từ (word) — nó hiểu <dfn>token</dfn> <span class="gloss">(đơn vị nhỏ nhất mô hình xử lý — có thể là cả một từ, một phần của từ, hoặc một dấu câu)</span>. Một từ thông dụng như "apple" thường là 1 token; một từ ít gặp hơn như "friendship" có thể bị tách thành 2 token: "friend" + "ship".</p>
<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Quy tắc ước lượng nhanh</div>
  <p>Văn bản đơn giản, từ thông dụng → trung bình 1 token/từ. Văn bản phức tạp, nhiều từ hiếm → trung bình 2–3 token/từ. Dấu câu (dấu phẩy, hai chấm, chấm câu) thường có token riêng.</p>
</div>

<h2>Embedding — biến văn bản thành số</h2>
<p><dfn>Embedding</dfn> là biểu diễn số của một đoạn văn bản (từ, cụm từ, câu, hay cả đoạn văn), ở dạng <dfn>vector</dfn> <span class="gloss">(vec-tơ — một dãy số nhiều chiều)</span>. Ví dụ với cụm "they sent me a": sau khi tokenize thành 4 token, đưa qua một <strong>encoder model</strong> sẽ cho ra 5 vector — 4 vector cho từng token, cộng thêm 1 vector đại diện cho toàn câu.</p>
<p>Embedding giúp máy tính "đo" được quan hệ giữa các đoạn văn bản — nền tảng cho <dfn>vector database</dfn> <span class="gloss">(cơ sở dữ liệu vector — lưu trữ embedding để tìm kiếm theo độ tương đồng)</span> và <dfn>semantic search</dfn> <span class="gloss">(tìm kiếm theo ngữ nghĩa — tìm tài liệu có ý nghĩa gần giống câu truy vấn, thay vì khớp từ khóa chính xác)</span>: mã hóa mọi tài liệu thành embedding, lưu vào vector database; khi có câu hỏi, mã hóa câu hỏi rồi tìm tài liệu có embedding gần nhất.</p>

<h2>Ba kiểu kiến trúc Transformer</h2>
<figure>
  <svg class="svg-diagram" viewBox="0 0 700 210" role="img" aria-label="So sánh ba kiến trúc Transformer: Encoder-only biến chuỗi đầu vào thành vector, dùng cho semantic search; Decoder-only sinh từng token tiếp theo, dùng cho sinh văn bản; Encoder-Decoder kết hợp cả hai, dùng cho dịch máy.">
    <g font-family="Sora, sans-serif" font-size="11" fill="currentColor">
      <text x="115" y="20" text-anchor="middle" font-weight="700">Encoder-only</text>
      <rect x="60" y="30" width="110" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="115" y="54" text-anchor="middle" font-size="10.5">"they sent me a"</text>
      <text x="115" y="90" text-anchor="middle" font-size="16" opacity=".6">↓</text>
      <rect x="60" y="100" width="110" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="115" y="124" text-anchor="middle" font-weight="700">Vector / Embedding</text>
      <text x="115" y="164" text-anchor="middle" font-size="10" opacity=".75">→ Semantic search, RAG,</text>
      <text x="115" y="178" text-anchor="middle" font-size="10" opacity=".75">vector database</text>

      <line x1="240" y1="105" x2="240" y2="105" />
      <text x="350" y="20" text-anchor="middle" font-weight="700">Decoder-only</text>
      <rect x="295" y="30" width="110" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="350" y="54" text-anchor="middle" font-size="10.5">"they sent me a"</text>
      <text x="350" y="90" text-anchor="middle" font-size="16" opacity=".6">↓</text>
      <rect x="295" y="100" width="110" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="350" y="124" text-anchor="middle" font-weight="700">Token tiếp theo</text>
      <text x="350" y="164" text-anchor="middle" font-size="10" opacity=".75">→ Sinh văn bản</text>
      <text x="350" y="178" text-anchor="middle" font-size="10" opacity=".75">(text generation)</text>

      <text x="590" y="20" text-anchor="middle" font-weight="700">Encoder–Decoder</text>
      <rect x="530" y="30" width="120" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="590" y="54" text-anchor="middle" font-size="10.5">"Hello there"</text>
      <text x="590" y="90" text-anchor="middle" font-size="16" opacity=".6">↓ encode → decode ↓</text>
      <rect x="530" y="100" width="120" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="590" y="124" text-anchor="middle" font-weight="700">"Xin chào"</text>
      <text x="590" y="164" text-anchor="middle" font-size="10" opacity=".75">→ Dịch máy</text>
      <text x="590" y="178" text-anchor="middle" font-size="10" opacity=".75">(machine translation)</text>
    </g>
  </svg>
  <figcaption>Ba biến thể Transformer phục vụ ba mục đích khác nhau: hiểu/biểu diễn (encoder-only), sinh nội dung (decoder-only), và chuyển đổi chuỗi-sang-chuỗi (encoder-decoder).</figcaption>
</figure>

<div class="tbl-wrap"><table>
<thead><tr><th>Kiến trúc</th><th>Cách hoạt động</th><th>Dùng khi nào</th></tr></thead>
<tbody>
<tr><td><dfn>Encoder-only</dfn></td><td>Chuyển chuỗi đầu vào thành vector, không sinh chuỗi mới.</td><td>Semantic search, vector database, các tác vụ hiểu văn bản (không cần sinh).</td></tr>
<tr><td><dfn>Decoder-only</dfn></td><td>Nhận một chuỗi, sinh ra <strong>từng token một</strong>, mỗi lần gọi lại chỉ tạo 1 token mới.</td><td>Sinh văn bản: viết bài, hội thoại, tiếp tục đoạn văn.</td></tr>
<tr><td><dfn>Encoder-Decoder</dfn></td><td>Encoder mã hóa đầu vào thành embedding; decoder dùng embedding đó để sinh đầu ra, từng token, có vòng lặp tự tham chiếu.</td><td>Sequence-to-sequence: dịch máy, tóm tắt có kèm chuyển đổi ngôn ngữ.</td></tr>
</tbody>
</table></div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>Văn bản → <strong>token</strong> → <strong>embedding</strong> (vector số). Ba kiến trúc Transformer: <strong>encoder-only</strong> (biểu diễn/tìm kiếm), <strong>decoder-only</strong> (sinh văn bản, từng token một), <strong>encoder-decoder</strong> (dịch máy, seq-to-seq).</p>
</div>`,
    },
    {
      id: "m4-l5",
      code: "4.5",
      kind: "lesson",
      title: "Prompt Engineering & Hallucination",
      navTitle: "Prompt Engineering & Hallucination",
      minutes: 10,
      source: "Prompt Engineering",
      html: `<p><dfn>Prompt</dfn> <span class="gloss">(lời nhắc — văn bản đầu vào ban đầu đưa cho LLM)</span> là cách chính để con người tương tác với LLM. <dfn>Prompt engineering</dfn> <span class="gloss">(kỹ thuật thiết kế prompt — quá trình tinh chỉnh lặp đi lặp lại một prompt để nhận được kiểu phản hồi mong muốn)</span> là kỹ năng cốt lõi để khai thác LLM hiệu quả.</p>

<h2>Vì sao LLM "thô" (completion LLM) khó nghe lời?</h2>
<p>Nhớ lại bài 4.2: LLM về bản chất chỉ dự đoán từ tiếp theo có khả năng xảy ra nhất. Nếu bạn đưa vào câu mở đầu bài diễn văn Gettysburg nổi tiếng, một <dfn>completion LLM</dfn> <span class="gloss">(LLM chỉ biết hoàn thành văn bản — được huấn luyện để đoán từ tiếp theo, không phải để làm theo chỉ dẫn)</span> sẽ tiếp tục viết ra… đúng bài diễn văn đó, vì nó đã "thấy" văn bản này khi huấn luyện — chứ không hiểu bạn đang muốn nó trả lời câu hỏi hay làm theo yêu cầu gì.</p>

<p>Để LLM biết "nghe lời" thay vì chỉ đoán chữ tiếp theo, cần <dfn>instruction tuning</dfn> <span class="gloss">(tinh chỉnh theo chỉ dẫn — huấn luyện thêm mô hình trên các cặp chỉ dẫn/phản hồi mong muốn)</span>, thường kết hợp <dfn>RLHF</dfn> <span class="gloss">(Reinforcement Learning from Human Feedback — học tăng cường từ phản hồi con người: con người so sánh và chấm điểm các câu trả lời, dùng điểm đó để huấn luyện tiếp mô hình theo hướng con người ưa thích)</span>. Hầu hết LLM bạn dùng hằng ngày (ChatGPT và tương tự) đều đã qua bước này.</p>

<h2>Hai kỹ thuật prompt engineering hiệu quả</h2>
<h3>1. In-context learning &amp; k-shot prompting</h3>
<p><dfn>In-context learning</dfn> <span class="gloss">(học trong ngữ cảnh — cung cấp ví dụ mẫu ngay trong prompt để mô hình "bắt chước" theo, không thay đổi trọng số mô hình)</span> cho mô hình xem trước vài ví dụ mẫu về nhiệm vụ cần làm:</p>
<ul>
  <li><strong>0-shot</strong>: không có ví dụ mẫu nào.</li>
  <li><strong>1-shot</strong>: có đúng 1 ví dụ mẫu.</li>
  <li><strong>k-shot / few-shot</strong>: có k ví dụ mẫu (nghiên cứu cho thấy few-shot thường cho kết quả tốt hơn 0-shot).</li>
</ul>
<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Ví dụ: dịch thuật bằng 3-shot prompting</div>
  <p>Prompt gồm: mô tả nhiệm vụ ("dịch văn bản Anh → Pháp"), rồi 3 cặp ví dụ Anh–Pháp đã dịch sẵn, cuối cùng là từ cần dịch: "cheese" → [model điền tiếp]. Ba ví dụ mẫu giúp mô hình "hiểu" định dạng và phong cách mong muốn trước khi thực hiện yêu cầu thật.</p>
</div>

<h3>2. Chain-of-Thought Prompting</h3>
<p><dfn>Chain-of-thought prompting</dfn> <span class="gloss">(gợi ý theo chuỗi suy luận — yêu cầu mô hình trình bày từng bước lý luận trước khi đưa ra đáp án cuối)</span> chia bài toán phức tạp thành các bước nhỏ, giống cách con người tự giải quyết vấn đề.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 680 200" role="img" aria-label="So sánh không dùng và có dùng Chain-of-Thought: không có bước lý luận trung gian, mô hình dễ đưa ra đáp án sai; có các bước lý luận trung gian rõ ràng, mô hình đưa ra đáp án đúng.">
    <defs><marker id="arr11" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g font-family="Sora, sans-serif" font-size="11" fill="currentColor">
      <text x="10" y="24" font-weight="700" opacity=".8">Không có Chain-of-Thought</text>
      <rect x="10" y="36" width="170" height="46" rx="8" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="95" y="55" text-anchor="middle" font-size="10">"20 chuối −10 dùng +8 mua"</text>
      <text x="95" y="70" text-anchor="middle" font-size="10">"→ còn bao nhiêu?"</text>
      <line x1="180" y1="59" x2="224" y2="59" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr11)"/>
      <rect x="230" y="36" width="90" height="46" rx="8" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="275" y="63" text-anchor="middle" font-weight="700">Model</text>
      <line x1="320" y1="59" x2="364" y2="59" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr11)"/>
      <rect x="370" y="36" width="120" height="46" rx="8" fill="none" stroke="var(--bad)" stroke-width="2"/>
      <text x="430" y="63" text-anchor="middle" fill="var(--bad)" font-weight="700">Có thể sai</text>

      <text x="10" y="126" font-weight="700" opacity=".8">Có Chain-of-Thought</text>
      <rect x="10" y="138" width="170" height="46" rx="8" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="95" y="157" text-anchor="middle" font-size="10">Cùng câu hỏi + yêu cầu</text>
      <text x="95" y="172" text-anchor="middle" font-size="10">"hãy giải thích từng bước"</text>
      <line x1="180" y1="161" x2="224" y2="161" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr11)"/>
      <rect x="230" y="138" width="220" height="46" rx="8" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="340" y="157" text-anchor="middle" font-size="10">"20−10=10; 10+8=18"</text>
      <text x="340" y="172" text-anchor="middle" font-size="9.5" opacity=".7">(các bước lý luận trung gian)</text>
      <line x1="450" y1="161" x2="494" y2="161" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr11)"/>
      <rect x="500" y="138" width="120" height="46" rx="8" fill="none" stroke="var(--good)" stroke-width="2"/>
      <text x="560" y="165" text-anchor="middle" fill="var(--good)" font-weight="700">18 — Đúng</text>
    </g>
  </svg>
  <figcaption>Ví dụ chuối ở căng-tin Oracle: yêu cầu mô hình trình bày từng bước lý luận (verbal equation) giúp giảm sai sót so với hỏi thẳng đáp án.</figcaption>
</figure>

<h2>Hallucination — khi mô hình "bịa" thông tin</h2>
<p><dfn>Hallucination</dfn> <span class="gloss">(ảo giác / bịa đặt thông tin — mô hình sinh ra nội dung không đúng sự thật hoặc không dựa trên bất kỳ dữ liệu nào nó từng học)</span> là một rủi ro nghiêm trọng của LLM. Điều nguy hiểm: văn bản bịa đặt thường được viết rất trôi chảy và tự tin, khiến người đọc khó nhận ra ngay là nó sai.</p>
<div class="callout note">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>Ví dụ hallucination</div>
  <p>Một đoạn văn được sinh ra khẳng định rằng "người Mỹ dần chuyển sang lái xe bên trái đường" — một câu trôi chảy, viết đúng ngữ pháp, nhưng <strong>hoàn toàn sai sự thật</strong> (Mỹ lái xe bên phải). Đây là ví dụ điển hình của hallucination: sai nhưng nghe rất thuyết phục.</p>
</div>
<p>Hiện chưa có phương pháp nào loại bỏ triệt để hallucination, nhưng có bằng chứng cho thấy các hệ thống <dfn>retrieval-augmented</dfn> <span class="gloss">(có truy xuất bổ trợ — xem thêm bài 4.6 về RAG)</span> ít bị hallucination hơn so với 0-shot LLM thuần túy, vì câu trả lời được "neo" vào tài liệu thật.</p>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>LLM thô chỉ "hoàn thành văn bản" — cần <strong>instruction tuning + RLHF</strong> để biết nghe lời. Hai kỹ thuật prompt hiệu quả: <strong>few-shot prompting</strong> (cho ví dụ mẫu) và <strong>chain-of-thought</strong> (yêu cầu giải thích từng bước). <strong>Hallucination</strong> = mô hình bịa thông tin một cách trôi chảy — RAG giúp giảm rủi ro này.</p>
</div>`,
    },
    {
      id: "m4-l6",
      code: "4.6",
      kind: "lesson",
      title: "Tùy chỉnh LLM: Prompt Engineering, RAG & Fine-tuning",
      navTitle: "Tùy chỉnh LLM: RAG & Fine-tuning",
      minutes: 10,
      source: "Customize LLMs with your data",
      html: `<p>Một LLM nền tảng (foundation model) đã học kiến thức tổng quát, nhưng khi cần nó hiểu <strong>dữ liệu riêng</strong> của bạn hoặc làm tốt một nhiệm vụ chuyên biệt, có 3 cách tiếp cận — và chúng có thể <strong>kết hợp cộng dồn</strong> với nhau.</p>

<h2>Khung tư duy 2 trục</h2>
<figure>
  <svg class="svg-diagram" viewBox="0 0 460 360" role="img" aria-label="Sơ đồ hành trình tùy chỉnh LLM theo hai trục: trục ngang là Context Optimization (RAG), trục dọc là LLM Optimization (Fine-tuning). Hành trình thường bắt đầu từ Prompt Engineering ở góc dưới trái, qua Few-shot, RAG, rồi Fine-tuning, tiến dần lên góc trên phải khi cần tối ưu cả hai trục.">
    <defs><marker id="arr12" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g stroke="currentColor" stroke-width="1.6" fill="none">
      <line x1="60" y1="320" x2="60" y2="30" marker-end="url(#arr12)"/>
      <line x1="60" y1="320" x2="430" y2="320" marker-end="url(#arr12)"/>
    </g>
    <g font-family="Sora, sans-serif" font-size="11" fill="currentColor" opacity=".8">
      <text x="64" y="24">LLM Optimization</text>
      <text x="64" y="38" font-size="9.5" opacity=".75">(Fine-tuning)</text>
      <text x="340" y="336" text-anchor="middle">Context Optimization</text>
      <text x="340" y="349" text-anchor="middle" font-size="9.5" opacity=".75">(RAG)</text>
    </g>
    <path d="M90 300 L150 262 L270 222 L270 112 L380 72" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#arr12)"/>
    <g fill="currentColor">
      <circle cx="90" cy="300" r="6"/>
      <circle cx="150" cy="262" r="6"/>
      <circle cx="270" cy="222" r="7" fill="var(--accent)"/>
      <circle cx="270" cy="112" r="7" fill="var(--accent)"/>
      <circle cx="380" cy="72" r="6"/>
    </g>
    <g font-family="Sora, sans-serif" font-size="10.5" fill="currentColor">
      <text x="98" y="298">① Prompt + đánh giá (baseline)</text>
      <text x="158" y="256">② Thêm ví dụ few-shot</text>
      <text x="280" y="216" fill="var(--accent)" font-weight="700">③ Kết nối RAG</text>
      <text x="280" y="106" fill="var(--accent)" font-weight="700">④ Fine-tune mô hình đã RAG</text>
      <text x="322" y="66">⑤ Tối ưu tiếp retrieval</text>
    </g>
  </svg>
  <figcaption>Hành trình thực tế thường lặp đi lặp lại: bắt đầu từ prompt engineering rẻ và nhanh, thêm RAG khi cần dữ liệu mới/giảm hallucination, rồi fine-tune khi cần đúng phong cách/định dạng, và tiếp tục tối ưu.</figcaption>
</figure>

<h2>1. Prompt Engineering — nhanh, rẻ, không cần huấn luyện</h2>
<p>Đã học ở bài 4.5. Ưu điểm: đơn giản, không tốn chi phí huấn luyện. Dùng khi: LLM đã "biết" đủ kiến thức cần thiết cho nhiệm vụ, chỉ cần diễn đạt yêu cầu tốt hơn.</p>

<h2>2. RAG — Retrieval-Augmented Generation</h2>
<p><dfn>RAG</dfn> <span class="gloss">(sinh có truy xuất bổ trợ — mô hình truy vấn một kho tri thức bên ngoài trước khi trả lời)</span> cho phép LLM truy vấn cơ sở tri thức doanh nghiệp (vector database, wiki nội bộ…) để trả lời có căn cứ (<dfn>grounded</dfn> <span class="gloss">(có căn cứ — câu trả lời được hỗ trợ bởi một tài liệu thật, không phải "đoán mò")</span>).</p>
<div class="callout example">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Ví dụ: chatbot đổi trả hàng</div>
  <p>Khách: "Tôi muốn trả váy vừa mua." Chatbot cần kiểm tra chính sách đổi trả → truy vấn cơ sở dữ liệu doanh nghiệp → tìm ra "30–90 ngày, hàng không được giảm giá" → hỏi khách có hóa đơn không → khách gửi ảnh hóa đơn → chatbot dùng dịch vụ thị giác (vision) trích xuất giá &amp; ngày mua → tra lại cơ sở dữ liệu → xác nhận được phép trả hàng. Toàn bộ câu trả lời đều <strong>neo vào dữ liệu thật</strong>, không phải suy đoán.</p>
</div>
<p>RAG có 2 thành phần: <strong>retrieval</strong> <span class="gloss">(truy xuất — tìm tài liệu liên quan trong kho tri thức)</span> và <strong>augmented generation</strong> <span class="gloss">(sinh có bổ trợ — dùng tài liệu tìm được để tạo câu trả lời đầy đủ hơn)</span>. Ưu điểm lớn: <strong>không cần fine-tuning</strong>, luôn truy cập được dữ liệu mới nhất. Nhược điểm: cần nguồn dữ liệu tương thích, chất lượng phụ thuộc vào chất lượng truy xuất, và triển khai phức tạp hơn prompt engineering đơn thuần.</p>

<h2>3. Fine-tuning — huấn luyện thêm cho tác vụ chuyên biệt</h2>
<p><dfn>Fine-tuning</dfn> <span class="gloss">(tinh chỉnh — huấn luyện tiếp một mô hình đã pre-train trên một tập dữ liệu nhỏ hơn, chuyên biệt hơn)</span> lấy một pre-trained model và huấn luyện thêm trên dữ liệu riêng (domain-specific), giúp mô hình học phong cách, thuật ngữ, hoặc kỹ năng mới. Trong OCI, kỹ thuật <dfn>T-Few fine-tuning</dfn> <span class="gloss">(kỹ thuật fine-tuning hiệu quả của OCI — chỉ chèn và cập nhật một phần nhỏ trọng số thay vì toàn bộ mô hình)</span> giúp giảm đáng kể thời gian và chi phí huấn luyện so với việc cập nhật toàn bộ các lớp.</p>
<p>Lợi ích: cải thiện hiệu năng trên tác vụ cụ thể, và cải thiện hiệu suất (dùng ít token hơn, "cô đọng" kiến thức từ mô hình lớn vào mô hình nhỏ gọn hơn). Nhược điểm: cần dữ liệu <strong>có nhãn</strong>, tốn thời gian/chi phí thu thập, và cần nhiều tài nguyên tính toán hơn.</p>

<h2>Khi nào dùng cách nào?</h2>
<div class="tbl-wrap"><table>
<thead><tr><th></th><th>Ưu điểm</th><th>Nhược điểm</th><th>Dùng khi nào</th></tr></thead>
<tbody>
<tr><td><strong>Prompt Engineering</strong></td><td>Đơn giản, không tốn chi phí huấn luyện</td><td>Giới hạn bởi kiến thức có sẵn của mô hình</td><td>Mô hình đã biết đủ kiến thức cần thiết</td></tr>
<tr><td><strong>RAG</strong></td><td>Dữ liệu luôn mới, giảm hallucination, không cần fine-tune</td><td>Cần nguồn dữ liệu tốt; phức tạp hơn khi triển khai</td><td>Dữ liệu thay đổi nhanh, cần câu trả lời có căn cứ</td></tr>
<tr><td><strong>Fine-tuning</strong></td><td>Tăng hiệu năng &amp; hiệu suất cho tác vụ cụ thể</td><td>Cần dữ liệu có nhãn, tốn thời gian &amp; tài nguyên</td><td>Mô hình chưa làm tốt tác vụ, cần phong cách/định dạng riêng</td></tr>
</tbody>
</table></div>

<div class="callout memo">
  <div class="callout-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Ghi nhớ nhanh</div>
  <p>3 cách tùy chỉnh LLM có thể <strong>cộng dồn</strong>: bắt đầu từ Prompt Engineering (rẻ nhất) → thêm RAG khi cần dữ liệu mới/giảm hallucination → Fine-tuning khi cần đúng phong cách/kỹ năng chuyên biệt. Hành trình thực tế thường đi qua cả ba, theo thứ tự tăng dần độ phức tạp.</p>
</div>`,
    },
    {
      id: "m4-summary",
      code: "★",
      kind: "summary",
      title: "★ Tổng kết Phần 4 & Trắc nghiệm",
      navTitle: "Tổng kết & Trắc nghiệm",
      note: "Ôn lại 6 bài học + làm 5 câu trắc nghiệm",
      html: `<p>Phần 4 đi từ khái niệm GenAI, qua nguyên lý LLM, đào sâu kiến trúc Transformer (self-attention, token, embedding), rồi tới cách tương tác và tùy chỉnh LLM trong thực tế.</p>

<figure>
  <svg class="svg-diagram" viewBox="0 0 700 210" role="img" aria-label="Sơ đồ: Generative AI được xây trên nền Large Language Model, vốn dựa trên kiến trúc Transformer với self-attention, và được tương tác/tùy chỉnh qua ba cách: Prompt Engineering, RAG, Fine-tuning.">
    <defs><marker id="arr13" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    <g stroke="currentColor" stroke-width="1.4" fill="none">
      <line x1="130" y1="45" x2="184" y2="45" marker-end="url(#arr13)"/>
      <line x1="330" y1="45" x2="384" y2="45" marker-end="url(#arr13)"/>
      <line x1="440" y1="70" x2="340" y2="130" marker-end="url(#arr13)"/>
      <line x1="470" y1="70" x2="470" y2="130" marker-end="url(#arr13)"/>
      <line x1="500" y1="70" x2="600" y2="130" marker-end="url(#arr13)"/>
    </g>
    <g font-family="Sora, sans-serif" font-size="11" fill="currentColor" text-anchor="middle">
      <rect x="10" y="20" width="120" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="70" y="42" font-weight="700">Generative</text><text x="70" y="56" font-weight="700">AI</text>

      <rect x="190" y="20" width="140" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="260" y="50" font-weight="700">Large Language Model</text>

      <rect x="390" y="20" width="160" height="50" rx="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="470" y="42" font-weight="700">Transformer</text>
      <text x="470" y="57" font-size="9.5" opacity=".75">(self-attention)</text>

      <rect x="272" y="132" width="136" height="46" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="340" y="159" font-size="10.5" font-weight="700">Prompt Engineering</text>

      <rect x="418" y="132" width="104" height="46" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="470" y="159" font-size="10.5" font-weight="700">RAG</text>

      <rect x="538" y="132" width="124" height="46" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="600" y="159" font-size="10.5" font-weight="700">Fine-tuning</text>
    </g>
  </svg>
  <figcaption>GenAI dựa trên LLM, LLM dựa trên kiến trúc Transformer; ba cách tương tác/tùy chỉnh chính là Prompt Engineering, RAG và Fine-tuning — có thể cộng dồn với nhau.</figcaption>
</figure>

<div class="summary-grid">
  <div class="sum-card"><h4>4.1 — Generative AI</h4><ul><li>Tạo nội dung mới, học từ dữ liệu không nhãn.</li><li>Hai loại: text-based và multimodal.</li></ul></div>
  <div class="sum-card"><h4>4.2 — Large Language Model</h4><ul><li>Mô hình xác suất dự đoán từ tiếp theo, dựa trên parameters khổng lồ.</li><li>Sinh văn bản = lặp lại chọn token tới khi gặp EOS.</li></ul></div>
  <div class="sum-card"><h4>4.3 — Transformer (Self-Attention)</h4><ul><li>Xử lý toàn câu cùng lúc, khắc phục điểm yếu RNN.</li><li>Self-attention giúp nắm long-range dependencies.</li></ul></div>
  <div class="sum-card"><h4>4.4 — Token, Embedding, Encoder/Decoder</h4><ul><li>Văn bản → token → embedding (vector).</li><li>3 kiến trúc: encoder-only, decoder-only, encoder-decoder.</li></ul></div>
  <div class="sum-card"><h4>4.5 — Prompt Engineering &amp; Hallucination</h4><ul><li>Few-shot &amp; chain-of-thought là 2 kỹ thuật hiệu quả.</li><li>Hallucination = mô hình bịa thông tin trôi chảy.</li></ul></div>
  <div class="sum-card"><h4>4.6 — RAG &amp; Fine-tuning</h4><ul><li>RAG: truy xuất dữ liệu ngoài, không cần huấn luyện lại.</li><li>Fine-tuning: học phong cách/kỹ năng chuyên biệt từ dữ liệu có nhãn.</li></ul></div>
</div>

<h2>Trắc nghiệm ôn tập Phần 4</h2>`,
      quiz: [
        {
          q: "Câu 1. Vì sao Generative AI được xem là khác biệt so với Machine Learning truyền thống?",
          options: [
            { text: "Vì GenAI luôn cần lượng dữ liệu có nhãn nhiều hơn hẳn ML truyền thống.", correct: false, explain: "Sai. Ngược lại — GenAI học từ dữ liệu KHÔNG nhãn (pre-training), trong khi ML truyền thống mới là bên cần dữ liệu có nhãn." },
            { text: "GenAI học mẫu hình từ dữ liệu không nhãn và tạo ra nội dung hoàn toàn mới, thay vì chỉ dự đoán một nhãn có sẵn.", correct: true, explain: "Đúng. Đây đúng khác biệt cốt lõi nêu ở bài 4.1: GenAI sinh nội dung mới từ dữ liệu phi cấu trúc, ML truyền thống dự đoán nhãn từ dữ liệu có nhãn." },
            { text: "Vì GenAI chỉ hoạt động được với dữ liệu dạng bảng số.", correct: false, explain: "Sai. GenAI hoạt động rất mạnh với văn bản, ảnh, âm thanh — không giới hạn ở dữ liệu bảng số." },
            { text: "Vì GenAI không thể áp dụng cho văn bản, chỉ áp dụng được cho hình ảnh.", correct: false, explain: "Sai. Mô hình text-based (như ChatGPT) chính là một loại GenAI phổ biến nhất — GenAI áp dụng rất tốt cho văn bản." },
          ],
        },
        {
          q: "Câu 2. Cơ chế nào giúp Transformer hiểu từ \"it\" trong một câu dài đang ám chỉ tới từ nào, dù chúng cách xa nhau?",
          options: [
            { text: "Backpropagation", correct: false, explain: "Sai. Backpropagation là cơ chế điều chỉnh trọng số khi huấn luyện, không phải cơ chế \"nhìn\" mối quan hệ giữa các từ." },
            { text: "Self-attention", correct: true, explain: "Đúng. Self-attention (bài 4.3) cho phép mô hình xem xét mối quan hệ giữa mọi từ trong câu cùng lúc, kể cả các từ ở xa nhau." },
            { text: "Pooling", correct: false, explain: "Sai. Pooling là một khái niệm của CNN (Phần 3), không liên quan tới Transformer." },
            { text: "Standardization", correct: false, explain: "Sai. Đây là bước tiền xử lý dữ liệu số (Phần 2), không liên quan tới việc hiểu mối quan hệ ngữ nghĩa trong câu." },
          ],
        },
        {
          q: "Câu 3. Kỹ thuật prompt nào yêu cầu mô hình trình bày từng bước lý luận trước khi đưa ra đáp án cuối cùng?",
          options: [
            { text: "Zero-shot prompting", correct: false, explain: "Sai. Zero-shot chỉ là prompt không kèm ví dụ mẫu — không nhất thiết yêu cầu trình bày lý luận." },
            { text: "Chain-of-thought prompting", correct: true, explain: "Đúng. Đây đúng định nghĩa ở bài 4.5: yêu cầu mô hình chia nhỏ bài toán và trình bày từng bước lý luận trước khi kết luận." },
            { text: "Fine-tuning", correct: false, explain: "Sai. Fine-tuning là huấn luyện thêm mô hình bằng dữ liệu mới, không phải một kỹ thuật viết prompt." },
            { text: "Tokenization", correct: false, explain: "Sai. Tokenization là bước tách văn bản thành token, không liên quan tới kỹ thuật viết prompt." },
          ],
        },
        {
          q: "Câu 4. Đâu là mô tả đúng nhất về RAG (Retrieval-Augmented Generation)?",
          options: [
            { text: "RAG luôn yêu cầu huấn luyện lại toàn bộ trọng số của mô hình.", correct: false, explain: "Sai. Một trong những ưu điểm lớn nhất của RAG (bài 4.6) chính là KHÔNG cần fine-tuning/huấn luyện lại mô hình." },
            { text: "RAG cho phép mô hình truy vấn một kho tri thức bên ngoài để đưa ra câu trả lời có căn cứ, mà không cần huấn luyện lại mô hình.", correct: true, explain: "Đúng. Đúng như ví dụ chatbot đổi trả hàng ở bài 4.6: RAG truy vấn dữ liệu thật để \"neo\" câu trả lời vào căn cứ cụ thể." },
            { text: "RAG chỉ hoạt động được nếu mô hình đã được fine-tune từ trước.", correct: false, explain: "Sai. RAG và fine-tuning độc lập với nhau — RAG có thể dùng ngay trên một mô hình pre-trained thông thường." },
            { text: "RAG là một kỹ thuật chỉ áp dụng được cho dữ liệu hình ảnh.", correct: false, explain: "Sai. RAG chủ yếu áp dụng cho dữ liệu văn bản/tri thức doanh nghiệp — ví dụ chính trong bài học là chính sách đổi trả hàng dạng văn bản." },
          ],
        },
        {
          q: "Câu 5. Trong ba cách tùy chỉnh LLM, khi nào nên ưu tiên dùng Fine-tuning?",
          options: [
            { text: "Khi cần câu trả lời luôn cập nhật theo dữ liệu mới nhất, thay đổi liên tục theo thời gian thực.", correct: false, explain: "Sai. Đây là điểm mạnh của RAG, không phải fine-tuning — fine-tuning \"đóng băng\" kiến thức tại thời điểm huấn luyện." },
            { text: "Khi mô hình chưa làm tốt một tác vụ cụ thể, cần học phong cách/kỹ năng chuyên biệt, và đã có sẵn dữ liệu gán nhãn phù hợp.", correct: true, explain: "Đúng. Đúng như bảng so sánh ở bài 4.6: fine-tuning phù hợp khi cần cải thiện hiệu năng cho một tác vụ cụ thể và có dữ liệu có nhãn." },
            { text: "Khi hoàn toàn không có bất kỳ dữ liệu huấn luyện nào.", correct: false, explain: "Sai. Fine-tuning CẦN dữ liệu có nhãn để huấn luyện — không có dữ liệu thì không thể fine-tune." },
            { text: "Khi chỉ cần diễn đạt lại prompt cho rõ ràng và cụ thể hơn.", correct: false, explain: "Sai. Đây là phạm vi của Prompt Engineering — cách tiếp cận đơn giản và rẻ nhất, không phải fine-tuning." },
          ],
        },
      ],
    },
  ],
};
