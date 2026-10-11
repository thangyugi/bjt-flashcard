import type { OciModule } from "./types";
import { cards, d, example, figure, flow, memo, note, steps, sum, sumGrid, table, ul } from "./authoring";

/* Phần 7 — module 8 khóa gốc "OCI AI Services". Nguồn: docs/OCIAI/From 6. OCI Enterprise AI.txt (mục "====== 8. OCI AI Services") */

const sentimentSvg = `<svg class="svg-diagram" viewBox="0 0 680 190" role="img" aria-label="Aspect-based sentiment: câu The food was great but the service sucked cho khía cạnh food tích cực và service tiêu cực, thay vì một điểm tổng bị kéo về trung tính.">
<g fill="currentColor" text-anchor="middle">
  <rect x="140" y="12" width="400" height="44" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="340" y="39" font-size="13" font-style="italic">"The food was great, but the service sucked."</text>
  <rect x="20" y="104" width="190" height="68" rx="12" fill="none" stroke="currentColor" stroke-dasharray="5 4" opacity=".7"/>
  <text x="115" y="130" font-size="12" font-weight="700">1 điểm tổng</text><text x="115" y="150" font-size="10.5" opacity=".75">tích cực bị "kéo" xuống → mất chi tiết</text>
  <rect x="260" y="104" width="190" height="68" rx="12" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="2"/>
  <text x="355" y="130" font-size="12.5" font-weight="700">food → Positive</text><text x="355" y="150" font-size="10.5" opacity=".75">kèm confidence score</text>
  <rect x="470" y="104" width="190" height="68" rx="12" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="2"/>
  <text x="565" y="130" font-size="12.5" font-weight="700">service → Negative</text><text x="565" y="150" font-size="10.5" opacity=".75">kèm confidence score</text>
</g>
<g stroke="currentColor" stroke-width="1.3" opacity=".7"><line x1="250" y1="56" x2="115" y2="102"/><line x1="340" y1="56" x2="355" y2="102"/><line x1="430" y1="56" x2="565" y2="102"/></g>
</svg>`;

export const m7: OciModule = {
  id: "m7",
  num: 7,
  origModule: 8,
  title: "OCI AI Services",
  desc: "Đi sâu bốn dịch vụ AI dựng sẵn — Language, Speech, Vision, Document Understanding — mỗi dịch vụ kèm một demo trên OCI Console.",
  lessons: [
    /* ───────────────────────────── 7.1 ───────────────────────────── */
    {
      id: "m7-l1",
      code: "7.1",
      kind: "lesson",
      title: "OCI Language: hiểu văn bản ở quy mô lớn",
      navTitle: "OCI Language",
      minutes: 11,
      source: "OCI Language",
      html: `<p><strong>OCI Language</strong> là dịch vụ ${d("NLP", "natural language processing — xử lý ngôn ngữ tự nhiên")} <strong>managed hoàn toàn, serverless</strong>. Nó phân tích văn bản phi cấu trúc ở quy mô lớn bằng mô hình pre-trained, hoặc cho bạn huấn luyện custom model — <strong>không cần chuyên môn data science hay ML</strong>. Hãy coi nó là AI "dùng ngay": hiểu văn bản ngay khi bạn gửi tới. Bài này đi qua năm năng lực pre-trained, custom model, dịch thời gian thực, rồi hai năng lực chuyên biệt: phát hiện PII/PHI và Health NLP.</p>

<h2>Năm năng lực pre-trained</h2>
<h3>1. Language detection — nhận diện ngôn ngữ</h3>
<p>Ví dụ: <em>hello</em> (Anh), <em>konnichiwa</em> (Nhật), <em>hola</em> (Tây Ban Nha), <em>bonjour</em> (Pháp). OCI Language tự xác định văn bản thuộc ngôn ngữ nào trong <strong>hơn 75 ngôn ngữ</strong> được hỗ trợ (từ Afrikaans tới Welsh), trả về ngôn ngữ kèm <strong>confidence score</strong>.</p>

<h3>2. Named Entity Recognition (NER)</h3>
<p>Quét văn bản và nhặt ra ${d("named entities", "thực thể có tên — vật thể thực tế có tên gọi")}: người, tổ chức, địa điểm, ngày tháng, số tiền, email, số điện thoại. Ví dụ: dịch vụ nhận "3.3.22" là ngày, cùng một giá trị tiền tệ và một tên người — mỗi thực thể kèm <strong>vị trí trong văn bản</strong> và confidence score.</p>
${ul([
  "Gắn thẻ bài báo theo người và địa điểm được nhắc tới.",
  "Định tuyến phản hồi hỗ trợ khách hàng.",
  "Tăng tốc tìm kiếm: so khớp câu hỏi với thực thể đã trích thay vì cả tài liệu.",
  "Sàng lọc hồ sơ ứng viên theo địa điểm, nơi làm việc, kỹ năng.",
])}

<h3>3. Sentiment analysis — vì sao cần theo từng khía cạnh</h3>
${figure(sentimentSvg, "Một câu có cả khen lẫn chê: chấm một điểm tổng sẽ làm mất chi tiết; aspect-based sentiment chấm riêng từng khía cạnh.")}
<p>Với câu <em>"The food was great, but the service sucked"</em>, nếu chấm cả câu bằng một điểm, lời chê dịch vụ có thể triệt tiêu hoặc kéo tụt lời khen món ăn. OCI Language dùng ${d("aspect-based sentiment analysis", "phân tích cảm xúc theo khía cạnh")}: coi <em>food</em> và <em>service</em> là thuộc tính của bài đánh giá và chấm <strong>độc lập</strong> — food tích cực, service tiêu cực, mỗi cái kèm confidence score. Dịch vụ cũng hỗ trợ cấp <strong>câu</strong>; bạn chọn mức chi tiết phù hợp — tài liệu, câu, hay khía cạnh — cho theo dõi thương hiệu, khảo sát sản phẩm, phản hồi nhân viên, phân tích đánh giá khách hàng.</p>

<h3>4. Key phrase extraction — trích cụm từ khóa</h3>
<p>Tự rút ra những từ và cụm mang nhiều ý nghĩa nhất thay vì trả về mọi từ — cách nhanh để tóm tắt hoặc nêu chủ đề chính mà không phải đọc hết. Ví dụ với đoạn văn về Java: trích được "Java Development Kit", "Java 18". Hữu ích để gắn thẻ hoặc tóm tắt khối lượng nội dung lớn.</p>

<h3>5. Text classification — phân loại văn bản</h3>
<p>Gán cho văn bản một chủ đề tổng thể từ bộ phân loại định sẵn khoảng <strong>600 danh mục và danh mục con</strong>, trả về dạng <strong>domain</strong> và <strong>subdomain</strong>, mỗi cái kèm confidence score. Ví dụ: đoạn văn về mèo con "Kitten Digest Meow" → domain <em>animals and plants</em>, subdomain <em>pets</em>. Cùng cơ chế có thể phân loại tài liệu tài chính (banking, investing) hay xếp bài báo theo chủ đề.</p>

<h2>Ba cách dùng OCI Language</h2>
${table(
  ["Cách dùng", "Mô tả"],
  [
    ["<strong>Pre-trained models</strong>", "Các mô hình vừa học (language detection, sentiment, key phrase…) — dùng ngay, không cần huấn luyện"],
    ["<strong>Custom models</strong>", "Huấn luyện trên dữ liệu có nhãn của bạn cho hai tác vụ: <strong>NER</strong> và <strong>text classification</strong> — khi danh mục/loại thực thể có sẵn không khớp nghiệp vụ (vd. danh mục ticket hỗ trợ riêng, thuật ngữ ngành)"],
    ["<strong>Text translation</strong>", "Neural machine translation dịch <strong>thời gian thực</strong> giữa nhiều ngôn ngữ — cho ticket hỗ trợ đa ngôn ngữ, chatbot, kiểm duyệt nội dung"],
  ]
)}

<h2>Vì sao cần custom model? Ví dụ định tuyến ticket</h2>
<p>Một đội hỗ trợ nhận <strong>hàng nghìn ticket mỗi ngày</strong>, mỗi ticket cần tới đúng phòng ban. Trước đây một người đọc từng ticket rồi quyết định — chậm, lặp lại, khó mở rộng. Với OCI Language, bạn tạo một <strong>custom text classification model</strong>, huấn luyện trên các ticket mà con người đã định tuyến trước đó; mô hình học được quy luật đằng sau mỗi quyết định (từ và cụm nào thường trỏ tới phòng ban nào).</p>
${steps([
  "Chuẩn bị bộ dữ liệu huấn luyện <strong>có nhãn</strong>.",
  "<strong>Huấn luyện</strong> mô hình.",
  `<strong>Đánh giá</strong> bằng các chỉ số ${d("precision", "độ chính xác của các dự đoán dương")}, ${d("recall", "độ phủ — bắt được bao nhiêu trường hợp đúng")} và ${d("F1 score", "trung bình điều hòa của precision và recall")}.`,
  "<strong>Triển khai</strong> lên một endpoint khi hài lòng với các chỉ số.",
  "<strong>Dùng endpoint</strong> để phân tích văn bản mới — ticket mới tự động về đúng phòng ban.",
])}

<h2>Năng lực chuyên biệt 1: phát hiện PII &amp; PHI</h2>
<p>${d("PII", "Personally Identifiable Information — tên, địa chỉ, số điện thoại, số giấy tờ")} và ${d("PHI", "Protected Health Information — thông tin sức khỏe được bảo vệ, phiên bản riêng của ngành y")}. Dịch vụ phát hiện các thực thể nhạy cảm trong văn bản phi cấu trúc, phân loại từng loại, rồi cho bạn tùy chọn <strong>khử định danh</strong>: <strong>che (mask)</strong>, <strong>thay bằng placeholder</strong>, hoặc <strong>xóa hẳn</strong> trước khi lưu hay chia sẻ.</p>
${ul([
  "Tự cảnh báo người dùng khi họ sắp gửi dữ liệu cá nhân trong form phản hồi.",
  "Quét khối lượng lớn tài liệu trong Object Storage để chắc thông tin nhạy cảm không nằm sai chỗ.",
])}

<h2>Năng lực chuyên biệt 2: Health NLP</h2>
<p>Bộ mô hình xây riêng cho văn bản lâm sàng và y tế — hồ sơ sức khỏe điện tử, ghi chú tiến triển của bác sĩ, tài liệu thử nghiệm lâm sàng. Thực chất là nhiều mô hình phối hợp:</p>
${table(
  ["Mô hình", "Làm gì"],
  [
    ["<strong>Health NER</strong>", "Tìm thực thể lâm sàng: bệnh, thuốc, liều lượng, triệu chứng, kết quả xét nghiệm, điều trị, thủ thuật"],
    ["<strong>Medical entity linking</strong>", "Nối thực thể đã trích tới hệ mã y khoa chuẩn <strong>SNOMED-CT</strong> và <strong>ICD-10</strong> → văn bản tự do thành dữ liệu có mã, có cấu trúc"],
    ["<strong>Relationship extraction</strong>", "Xác định quan hệ giữa các thực thể, vd. nối một thuốc với đúng liều lượng hoặc thời gian dùng"],
  ]
)}
<p>Cùng nhau, chúng tự động hóa việc rà soát tài liệu lâm sàng, mã hóa y khoa (medical coding) và hỗ trợ ra quyết định lâm sàng.</p>

${memo(`<p>OCI Language: NLP <strong>serverless</strong>, không cần chuyên môn data science. 5 năng lực pre-trained: <strong>language detection</strong> (75+ ngôn ngữ), <strong>NER</strong>, <strong>sentiment</strong> (tài liệu / câu / khía cạnh), <strong>key phrase</strong>, <strong>text classification</strong> (~600 danh mục, domain/subdomain). Custom model cho <strong>NER và classification</strong> (5 bước, đánh giá bằng precision/recall/F1). Dịch thời gian thực. PII/PHI: mask, placeholder, remove. Health NLP: Health NER, entity linking (SNOMED-CT, ICD-10), relationship extraction.</p>`)}`,
    },

    /* ───────────────────────────── 7.2 ───────────────────────────── */
    {
      id: "m7-l2",
      code: "7.2",
      kind: "lesson",
      title: "Demo: OCI Language trên Console",
      navTitle: "Demo: Language",
      minutes: 4,
      source: "Demo: Language",
      html: `<p>Cùng xem OCI Language trên Console. Màn hình chính của bạn có thể khác tùy nhiều yếu tố; điều cần làm là vào menu <strong>Analytics &amp; AI → AI Services → Language</strong>.</p>

<h2>Trang Language</h2>
${ul([
  "Có các liên kết vào tài liệu theo từng chủ đề bạn quan tâm.",
  "Có tài nguyên như API reference, SDK guide và danh sách blog về OCI Language.",
])}

<h2>Thử phân tích văn bản</h2>
${steps([
  "Vào <strong>Text Analytics</strong> — đã có sẵn đoạn văn mặc định.",
  "Bấm <strong>Analyze</strong>.",
  "Xem các loại phân tích dịch vụ trả về (bảng dưới).",
])}
${table(
  ["Kết quả", "Trong demo"],
  [
    ["Language detection", "English, confidence <strong>rất cao</strong>"],
    ["Text classification", "<em>Science and technology</em>, subcategory <em>Earth sciences</em> — xác suất khá thấp nhưng thực tế lại chính xác"],
    ["Named entities", "Văn bản được tô sáng thực thể: hiện cả thực thể, loại thực thể và confidence; mỗi loại một màu (địa điểm, số lượng, sản phẩm, ngày giờ…)"],
    ["Key phrase extraction", "Liệt kê mọi cụm từ khóa đã trích"],
    ["Sentiment — cấp tài liệu", "Toàn văn bản: <strong>mixed</strong> (lẫn lộn)"],
    ["Sentiment — theo khía cạnh", "Các khía cạnh được nhận diện, mỗi khía cạnh một cảm xúc — ở đây đều <strong>negative</strong>"],
    ["Sentiment — cấp câu", "Mỗi câu được gán positive, neutral hoặc negative — ví dụ có đủ cả ba"],
  ]
)}
${example(`<p>Một điểm đáng chú ý: confidence của phân loại chủ đề thấp nhưng kết quả vẫn đúng. Confidence score là <em>xác suất</em>, không phải phán quyết tuyệt đối (như đã học ở bài 1.3).</p>`, "Quan sát")}

${memo(`<p>Console: <strong>Analytics &amp; AI → Language → Text Analytics → Analyze</strong>. Một lần bấm cho ra: ngôn ngữ, phân loại chủ đề, thực thể (tô màu theo loại), cụm từ khóa, và cảm xúc ở <strong>ba cấp</strong> — tài liệu, khía cạnh, câu.</p>`)}`,
    },

    /* ───────────────────────────── 7.3 ───────────────────────────── */
    {
      id: "m7-l3",
      code: "7.3",
      kind: "lesson",
      title: "OCI Speech: từ âm thanh thành văn bản",
      navTitle: "OCI Speech",
      minutes: 10,
      source: "OCI Speech",
      html: `<p><strong>OCI Speech</strong> dùng ${d("ASR — Automatic Speech Recognition", "nhận dạng giọng nói tự động: mô hình AI ánh xạ sóng âm thành chữ viết")} để biến file âm thanh, video thành văn bản chính xác, dễ đọc — không cần nền tảng data science. Bài này đi qua cách OCI Speech hoạt động, transcription job với mô hình Oracle và Whisper, chép lời thời gian thực, cùng các tính năng như chuẩn hóa văn bản và lọc từ tục.</p>

<h2>OCI Speech hoạt động thế nào?</h2>
${flow([{ t: "Âm thanh / video", s: "vd. cuộc gọi báo cáo KQKD" }, { t: "ASR", s: "mô hình âm học + ngôn ngữ" }, { t: "Văn bản", s: "có dấu câu, định dạng" }], "OCI Speech: tín hiệu âm thanh đi qua ASR thành văn bản đã có dấu câu")}
<p>OCI Speech "mở khóa" dữ liệu trong track âm thanh bằng cách chuyển giọng nói thành chữ, dùng các mô hình âm học (acoustic) và ngôn ngữ đã qua thử thách thời gian của Oracle, cho bản chép lời chính xác, đúng ngữ pháp, đa ngôn ngữ. Khác ứng dụng đọc chính tả đơn giản, nó được xây để xử lý <strong>âm thanh thực tế, không hoàn hảo</strong>: hội nghị qua điện thoại, ghi âm chăm sóc khách hàng, cuộc họp có tạp âm và nhiều người nói.</p>
${ul([
  "<strong>Không cần chuyên môn data science:</strong> gọi API managed, nhận văn bản — không huấn luyện hay tinh chỉnh mô hình.",
  "<strong>Xử lý dữ liệu ngay trong Object Storage:</strong> trỏ dịch vụ tới file trong bucket, kết quả ghi lại vào bucket bạn chọn — không phải di chuyển file.",
  "<strong>Bản chép lời có timestamp, đúng ngữ pháp:</strong> mỗi từ có mốc thời gian để nhảy thẳng tới đoạn đó — rất tiện khi tìm trong bản ghi dài.",
])}

<h2>Transcription job</h2>
<p>Một ${d("transcription job", "tác vụ chép lời")} là một request <strong>bất đồng bộ</strong>: bạn gửi một hoặc nhiều file media, dịch vụ xử lý ngầm rồi ghi kết quả vào Object Storage khi xong. Mỗi job chứa tối đa <strong>100 file</strong> (gọi là <em>tasks</em>), và job được giữ <strong>90 ngày</strong> để bạn quay lại lấy kết quả.</p>

<h2>Hai mô hình: Oracle ASR và Whisper</h2>
${table(
  ["", "Oracle ASR model", "Whisper model"],
  [
    ["Nguồn gốc", "Mô hình âm học &amp; ngôn ngữ riêng của Oracle, xây cho OCI Speech", "Do <strong>OpenAI</strong> xây, huấn luyện trên lượng lớn âm thanh đa ngôn ngữ từ web; cung cấp qua cùng dịch vụ"],
    ["Ngôn ngữ", "Khoảng 7: Anh, Tây Ban Nha, Pháp, Đức, Bồ Đào Nha, Hindi, Ý", "<strong>Hơn 50</strong> ngôn ngữ — chọn khi cần phủ rộng"],
    ["Diarization", "Có", "Có"],
    ["Tích hợp", "Endpoint, API, SDK của OCI Speech", "Dùng <strong>đúng cùng</strong> endpoint, API và SDK như Oracle ASR"],
  ]
)}
<p>${d("Diarization", "phân tách người nói — gán đoạn nào do ai nói")} gồm hai bước: <strong>speaker segmentation</strong> (tìm điểm đổi người nói) và <strong>speaker clustering</strong> (gom các đoạn theo người nói). Vì Whisper dùng chung giao diện, <strong>đổi mô hình chỉ là một lựa chọn cấu hình</strong> khi tạo job — code tích hợp không phải sửa.</p>

<h2>Live Transcribe: chép lời thời gian thực</h2>
<p>Transcription job là bất đồng bộ (gửi file, nhận kết quả sau). <strong>Live Transcribe</strong> thì khác: gửi luồng âm thanh trực tiếp và nhận chữ trong <strong>vài giây</strong> — cho các trường hợp không thể chờ batch job.</p>
${cards(
  [
    { title: "Tổng đài", body: "<p>Hiện phụ đề trực tiếp cho nhân viên trong lúc khách đang nói.</p>" },
    { title: "Truyền hình", body: "<p>Công ty media thêm phụ đề trực tiếp cho chương trình phát sóng.</p>" },
    { title: "Y tế", body: "<p>Bác sĩ, điều dưỡng đọc chính tả khi khám; chữ hiện ra ngay khi nói, không phải vài phút sau.</p>" },
  ],
  3
)}
<p>Bên dưới, bạn cấu hình được mô hình, ngôn ngữ và cách áp dấu câu.</p>

<h2>Các tính năng khác</h2>
${table(
  ["Tính năng", "Chi tiết"],
  [
    ["Batching", "Gửi nhiều file trong một job (tối đa 100 tasks) thay vì mỗi file một lời gọi — hiệu quả khi có tồn đọng bản ghi"],
    ["Xử lý cực nhanh", "Chép <strong>10 giờ âm thanh trong dưới 10 phút</strong>: chia nhỏ âm thanh, chép song song từng đoạn rồi ghép lại thành một file"],
    ["Confidence score", "Theo từng <strong>từ</strong> và từng <strong>bản chép</strong> — nhanh chóng thấy từ nào mô hình kém chắc chắn để người kiểm tra lại"],
    ["Tự thêm dấu câu", "Dấu phẩy, chấm, hỏi — dễ đọc hơn và hệ thống phía sau xử lý trơn tru hơn"],
    ["Xuất SRT", `${d("SRT", "định dạng file phụ đề phổ biến nhất")} — thêm phụ đề (closed caption) vào video mà không cần công cụ riêng`],
  ]
)}

<h3>Text normalization &amp; profanity filtering</h3>
<p>${d("Text normalization", "chuẩn hóa văn bản")} chuyển số, tiền tệ, ngày tháng, địa chỉ được <em>nói</em> thành dạng người ta <em>viết</em> — vd. nói "one thousand three hundred fifty-five dollars" thì bản chép ghi <strong>$1,355</strong>. ${d("Profanity filtering", "lọc từ tục")} xử lý từ xúc phạm theo ba cách:</p>
${table(
  ["Chế độ", "Kết quả"],
  [
    ["<strong>Remove</strong>", "Thay toàn bộ từ bằng dấu sao — không còn dấu vết"],
    ["<strong>Mask</strong>", "Tương tự nhưng <strong>giữ chữ cái đầu</strong> để gợi ý"],
    ["<strong>Tag</strong>", "Giữ nguyên từ gốc nhưng gắn cờ là từ tục — hữu ích khi người kiểm duyệt cần thấy chính xác đã nói gì"],
  ]
)}
<p>Tổng hợp lại, OCI Speech là khối xây dựng thực tế cho phân tích tổng đài, làm phụ đề, và kho media tìm kiếm được.</p>

${memo(`<p>OCI Speech = <strong>ASR</strong> managed, xử lý file ngay trong Object Storage, bản chép có <strong>timestamp</strong>. Transcription job bất đồng bộ: ≤100 tasks/job, lưu 90 ngày. <strong>Oracle ASR</strong> (~7 ngôn ngữ) hoặc <strong>Whisper</strong> (50+), cùng API, cả hai có diarization. <strong>Live Transcribe</strong> cho thời gian thực. 10 giờ âm thanh &lt; 10 phút; confidence theo từ; tự thêm dấu câu; SRT; normalization; profanity: remove / mask / tag.</p>`)}`,
    },

    /* ───────────────────────────── 7.4 ───────────────────────────── */
    {
      id: "m7-l4",
      code: "7.4",
      kind: "lesson",
      title: "Demo: OCI Speech trên Console",
      navTitle: "Demo: Speech",
      minutes: 4,
      source: "Demo: Speech",
      html: `<p>Vào menu <strong>Analytics &amp; AI → AI Services → Speech</strong> để mở trang console của dịch vụ Speech.</p>

${note("Điều kiện trước", `<p>Dữ liệu (file âm thanh) phải <strong>có sẵn trong Object Storage</strong>, và ta cần tạo một <strong>transcription job</strong> để chuyển giọng nói thành chữ. Trong demo, compartment đã chọn sẵn là nơi có dữ liệu.</p>`)}

<h2>Tạo transcription job</h2>
${steps([
  "Bấm tạo job, đặt tên — demo dùng tên <em>Training</em>; compartment đã chọn sẵn.",
  "Chọn đúng <strong>Object Storage bucket</strong> trong compartment chứa dữ liệu.",
  "Danh sách file trong bucket hiện ra — chọn file <strong>WAV</strong> đã upload trước đó.",
  "Chạy job. Job chỉ mất vài giây; trạng thái chuyển từ <em>in progress</em> sang <em>succeeded</em>.",
  "Chọn file trong job để xem <strong>kết quả chép lời</strong>.",
])}

<h2>Kết quả</h2>
<div class="chat"><div class="msg bot"><span class="who">Người nói 1</span>I'm having an issue with my wireless headphones. I think my Bluetooth connectivity to the TV is not working. I have high quality headphones. I know the issue is not with them.</div><div class="msg bot"><span class="who">Người nói 2</span>Hi, thanks for contacting support. I'm sorry to hear about your Bluetooth issue.</div></div>
${ul([
  "Hai giọng nói khác nhau được nhận ra (cuộc gọi hỗ trợ khách hàng).",
  "<strong>Dấu câu</strong> được tự động thêm vào.",
  "<strong>Chuẩn hóa</strong>: thay vì viết chữ \"one hundred percent\", bản chép hiện ký hiệu <strong>100%</strong>.",
])}

${memo(`<p>Console: <strong>Analytics &amp; AI → Speech</strong> → tạo transcription job → chọn bucket &amp; file (WAV) → chạy (vài giây) → xem bản chép: có dấu câu, nhận nhiều người nói, số được chuẩn hóa thành ký hiệu.</p>`)}`,
    },

    /* ───────────────────────────── 7.5 ───────────────────────────── */
    {
      id: "m7-l5",
      code: "7.5",
      kind: "lesson",
      title: "OCI Vision: cho ứng dụng \"đôi mắt\"",
      navTitle: "OCI Vision",
      minutes: 8,
      source: "OCI Vision",
      html: `<p><strong>OCI Vision</strong> là dịch vụ ${d("computer vision", "thị giác máy tính")} <strong>serverless</strong>: bạn upload ảnh, nó cho biết trong ảnh có gì — vật thể, cảnh, chữ, khuôn mặt — không cần chuyên môn data science. Hãy hình dung nó cho ứng dụng khả năng <em>nhìn</em> một bức ảnh và mô tả lại, như cách một người liếc qua tấm ảnh là nhận ra ngay vật thể, chữ và khuôn mặt.</p>

<h2>Hai năng lực chính</h2>
${cards([
  { tag: "Ảnh", title: "Image analysis", body: "<p>Phân tích ảnh chụp để tìm vật thể, cảnh, chữ và khuôn mặt. (Trọng tâm của bài này.)</p>" },
  { tag: "Video", title: "Stored & real-time video analysis", body: "<p>Phân tích video đã lưu và thời gian thực, với object detection, face detection và <strong>object tracking</strong>.</p>" },
])}

<h2>Bốn tính năng pre-trained của image analysis</h2>
${table(
  ["Tính năng", "Làm gì", "Ví dụ trong bài"],
  [
    ["<strong>Image classification</strong>", "Gán nhãn cho <strong>cả cảnh</strong>: xác định đặc trưng và vật thể chính, không nhất thiết vẽ khung quanh từng cái", "Ảnh đường ray cắt ngang → <em>train, line, tree, cables, track, wires, poles</em>"],
    ["<strong>Object detection</strong>", "Tìm <strong>từng vật thể</strong> riêng, vẽ bounding box và cho mỗi cái một confidence score", "Ảnh ô tô → <em>auto design, car, bumper, wheel</em>, mỗi cái &gt; 98%"],
    ["<strong>Text detection</strong> (OCR)", "Tìm và số hóa chữ in hoặc viết tay trong ảnh; bounding box + confidence cho từng mảng chữ", "—"],
    ["<strong>Face detection</strong>", "Tìm khuôn mặt; trả về vị trí, các điểm mốc (mắt, mũi, miệng) và <strong>điểm chất lượng hình ảnh</strong>", "5 khuôn mặt: từ 94,59% (mặt 1) tới 89,83% (mặt 5)"],
  ]
)}
${example(`<ul><li>Dùng vị trí khuôn mặt để <strong>làm mờ mặt</strong> bảo vệ quyền riêng tư.</li><li>Dùng điểm chất lượng để quyết định mặt có đủ rõ cho bước kiểm tra sinh trắc học phía sau không.</li><li>Gắn thẻ thông tin khuôn mặt vào ảnh để tìm kiếm dễ hơn trong thư viện media.</li></ul>`, "Ứng dụng thực tế của face detection")}

<h2>Custom models: khi danh mục có sẵn không vừa</h2>
<p>Mô hình pre-trained chạy ngay trên ảnh đa dụng. Khi danh mục có sẵn không khớp nghiệp vụ, <strong>custom model</strong> cho bạn đi xa hơn — vd. <strong>custom object detection</strong> học tìm vị trí vật thể riêng của bạn và vẽ bounding box: một thiết bị sản xuất cụ thể, hay logo công ty.</p>
${flow([{ t: "Tạo dataset", s: "ảnh mẫu có nhãn" }, { t: "Train", s: "Vision huấn luyện" }, { t: "Gọi custom model", s: "đánh giá ảnh mới" }], "Xây custom model trên Vision: tạo bộ ảnh có nhãn, huấn luyện, rồi gọi mô hình để đánh giá ảnh mới")}
<p>Đó cũng là mẫu <em>train – evaluate – deploy</em> đã gặp với custom model của OCI Language.</p>

${memo(`<p>OCI Vision: computer vision <strong>serverless</strong>. Image analysis pre-trained: <strong>image classification</strong> (nhãn cả cảnh), <strong>object detection</strong> (từng vật + bounding box + confidence), <strong>text detection/OCR</strong>, <strong>face detection</strong> (vị trí, điểm mốc, điểm chất lượng). Còn có phân tích video (tracking). Custom model: dataset có nhãn → train → gọi mô hình.</p>`)}`,
    },

    /* ───────────────────────────── 7.6 ───────────────────────────── */
    {
      id: "m7-l6",
      code: "7.6",
      kind: "lesson",
      title: "Demo: OCI Vision trên Console",
      navTitle: "Demo: Vision",
      minutes: 5,
      source: "Demo: Vision",
      html: `<p>Từ trang chủ Console, vào <strong>Analytics &amp; AI → Vision</strong>. Trang Vision có nhiều tài nguyên và cho thử các tính năng: image analysis (image classification, object detection) hoặc Document AI; cũng có mục tạo custom model (không làm trong demo này).</p>

<h2>Image classification</h2>
${table(
  ["Ảnh", "Nhãn được gán"],
  [
    ["Ảnh mặc định (đường dây điện)", "<em>overhead power line, transmission tower, plant, sky, line</em> — kết quả khá tốt"],
    ["Ảnh London kéo thả từ desktop (các địa danh nổi tiếng)", "<em>skyscraper, water, building, bridge, boat</em> — đều hợp lý"],
  ]
)}

<h2>Object detection</h2>
<p>Bây giờ dịch vụ tìm các <strong>vật thể cụ thể</strong>, vẽ bounding box và gắn nhãn — đúng như dữ liệu trả về qua API.</p>
${table(
  ["Cảnh", "Phát hiện được"],
  [
    ["Phố có xe cộ", "Ô tô ở giữa, xe buýt phía sau, người trên vỉa hè, thêm một ô tô khác — kể cả ô tô chỉ lộ <strong>một phần nhỏ</strong>. Thêm chữ: biển số xe, logo Oracle trên xe, số tuyến xe buýt (mắt người khó đọc), quảng cáo trên taxi, tuyến xe buýt ở tít phía sau"],
    ["Ảnh nhỏ, độ phân giải thấp", "Nhận ra một <strong>người đứng trên mái nhà</strong>. Nhưng <em>không</em> nhận các vật tròn — ăng-ten vi ba — vì mô hình không được huấn luyện cho chúng → có thể xây <strong>custom model</strong> nếu cần"],
    ["Người đi xe đạp trên đường", "Nhận người dù đang cúi người, quay lưng; nhận họ đang <strong>trên xe đạp</strong> (các khung lồng nhau); nhận cả <strong>bánh xe</strong> gắn với xe đạp. Không có chữ trong cảnh, trừ một vệt nó đoán là dấu gạch trên áo"],
  ]
)}
${example(`<p>Mô hình pre-trained mạnh với vật thể phổ biến (người, xe, chữ) nhưng "mù" với vật thể chuyên biệt như ăng-ten vi ba — đó chính là lúc cần custom object detection.</p>`, "Bài học từ demo")}

${memo(`<p>Console: <strong>Analytics &amp; AI → Vision</strong>. Image classification gắn nhãn cả cảnh; object detection vẽ khung từng vật (cả vật bị che một phần, khung lồng nhau người–xe đạp–bánh xe) và đọc chữ trong cảnh. Vật thể ngoài tập huấn luyện → cần custom model.</p>`)}`,
    },

    /* ───────────────────────────── 7.7 ───────────────────────────── */
    {
      id: "m7-l7",
      code: "7.7",
      kind: "lesson",
      title: "OCI Document Understanding: tài liệu thành dữ liệu",
      navTitle: "Document Understanding",
      minutes: 8,
      source: "OCI Document Understanding",
      html: `<p><strong>Document Understanding</strong> là dịch vụ AI <strong>serverless</strong> đọc tài liệu như hóa đơn, biên lai, biểu mẫu, giấy tờ tùy thân và biến chúng thành <strong>dữ liệu có cấu trúc</strong> để hành động — không cần chuyên môn data science. Nó làm việc với <em>ảnh tài liệu và file</em> thay vì ảnh chụp thông thường: PDF, ảnh JPEG, PNG, TIFF — upload từ máy hoặc lấy thẳng từ OCI Object Storage.</p>

<h2>Bốn năng lực pre-trained</h2>
${cards([
  { tag: "1", title: "Text extraction", body: `<p>Dùng ${d("OCR", "nhận dạng ký tự quang học")} lấy chữ khỏi trang — kể cả chữ viết tay, chữ bị nghiêng, bị tô bóng hay xoay.</p>` },
  { tag: "2", title: "Table extraction", body: "<p>Nhận diện bảng trong tài liệu, trích nội dung dạng bảng, <strong>giữ nguyên quan hệ hàng–cột</strong>. Rất hữu ích cho hóa đơn, đơn đặt hàng, biên lai.</p>" },
  { tag: "3", title: "Key-value extraction", body: "<p>Tìm giá trị của một tập trường thông dụng định sẵn và các dòng hàng (line items) — vd. tên người bán, ngày giao dịch — mà bạn không phải chỉ chỗ.</p>" },
  { tag: "4", title: "Document classification", body: "<p>Xếp tài liệu vào loại (hóa đơn, biên lai, CV…) dựa trên hình thức, đặc trưng tổng thể và từ khóa trích được — để định tuyến đúng.</p>" },
])}

<h2>1. Text extraction — nền móng</h2>
<p>Trả về hai mức chi tiết: chữ <strong>mức từ</strong> (bounding box quanh từng từ) và chữ <strong>mức dòng</strong> (bounding box quanh cả dòng). Có tọa độ đi kèm nên bạn biết chính xác mỗi từ/dòng nằm <em>ở đâu</em> trên trang, không chỉ nó nói gì — hữu ích để tô sáng thuật ngữ khớp trong hợp đồng scan hay dựng lại bản tìm kiếm được của tài liệu giấy.</p>
${note("Vì sao gọi là nền móng?", `<p>Ba năng lực còn lại — table extraction, key-value extraction, document classification — đều <strong>dựa vào việc nhận dạng chữ trước</strong> rồi mới hiểu được cấu trúc hay ý nghĩa.</p>`)}

<h2>2. Table extraction</h2>
<p>Hóa đơn, đơn đặt hàng, biên lai, sao kê ngân hàng thường trình bày dữ liệu dạng bảng. Chỉ trích chữ thì bạn nhận một danh sách từ lộn xộn, không biết từ nào thuộc ô nào. Table extraction nhận diện bảng <em>và từng ô</em>, giữ quan hệ hàng–cột → dữ liệu bảng có cấu trúc nạp thẳng vào spreadsheet hay database. Use case phổ biến: <strong>tự động hóa hóa đơn</strong> — trích sản phẩm, số lượng, đơn giá từ bảng để xử lý tự động thay vì gõ lại bằng tay.</p>

<h2>3. Key-value extraction</h2>
<p>Vượt khỏi chữ và bảng: nó hiểu <strong>ý nghĩa</strong> của các trường cụ thể. Nhận diện tập trường định sẵn trên các loại tài liệu như <strong>biên lai, hóa đơn, giấy phép lái xe, thẻ bảo hiểm y tế, hộ chiếu</strong>. Với hóa đơn, nó không chỉ đưa toàn bộ chữ mà cho biết cụ thể đoạn nào là <em>địa chỉ nhà cung cấp</em>, đoạn nào là <em>ngày hóa đơn</em>… kèm confidence cho từng trường.</p>

<h2>4. Document classification</h2>
<p>Nhìn vào <strong>hình thức trực quan</strong> và đặc trưng tổng thể — không chỉ chữ — để gán loại tài liệu. Tám loại ví dụ:</p>
${table(
  ["Loại tài liệu", ""],
  [
    ["Invoice — hóa đơn", "Receipt — biên lai"],
    ["Bank statement — sao kê ngân hàng", "Health insurance ID — thẻ bảo hiểm y tế"],
    ["Driver license — giấy phép lái xe", "Passport — hộ chiếu"],
    ["Tax form — tờ khai thuế", "Resume — sơ yếu lý lịch"],
  ]
)}
${flow([{ t: "Classification", s: "đây là loại gì?" }, { t: "Key-value", s: "trích trường theo loại" }, { t: "Hệ thống phía sau", s: "kế toán, nhân sự…" }], "Pipeline xử lý tài liệu: phân loại trước, sau đó trích key-value theo đúng loại tài liệu, rồi đưa vào hệ thống phía sau", 0)}
<p>Đây thường là <strong>bước đầu tiên</strong> trong pipeline xử lý tài liệu: trước khi chạy key-value extraction cho hóa đơn hay giấy phép lái xe, bạn cần biết mình đang nhìn loại nào — document classification trả lời tự động.</p>

${memo(`<p>Document Understanding: <strong>serverless</strong>, cho PDF, JPEG, PNG, TIFF. Bốn năng lực: <strong>text extraction</strong> (OCR, mức từ &amp; dòng + tọa độ — nền móng), <strong>table extraction</strong> (giữ hàng–cột), <strong>key-value extraction</strong> (biên lai, hóa đơn, bằng lái, thẻ BHYT, hộ chiếu), <strong>document classification</strong> (8 loại; thường là bước đầu pipeline).</p>`)}`,
    },

    /* ───────────────────────────── 7.8 ───────────────────────────── */
    {
      id: "m7-l8",
      code: "7.8",
      kind: "lesson",
      title: "Demo: Document Understanding (Document AI)",
      navTitle: "Demo: Document Understanding",
      minutes: 4,
      source: "Demo: Document Understanding",
      html: `<p>Mở <strong>Document AI</strong> trên Console (nằm trong trang Vision ở bài demo trước).</p>

<h2>Ví dụ 1 — Biên lai (receipt)</h2>
${steps([
  "Ảnh mặc định là một biên lai, được nhận diện là tiếng <strong>Anh</strong>.",
  "<strong>Raw text</strong>: toàn bộ nội dung biên lai được tô sáng và trích ra, xem được ở dạng dòng hoặc từng từ.",
  "<strong>Key values</strong>: với biên lai, dịch vụ có sẵn một số khóa cần tìm; khớp được giá trị nào thì gán vào khóa đó — merchant name (<em>example cafe</em>), merchant address, merchant phone number, transaction time, transaction date… rất hữu ích khi xử lý chi phí (expense).",
  "<strong>Line items / tabular data</strong>: nhặt ra hai món — <em>Americano</em> và <em>water</em>.",
])}

<h2>Ví dụ 2 — Hóa đơn (invoice) có đóng dấu</h2>
${ul([
  "Mọi đoạn chữ trên ảnh đều được tô sáng và trích ra.",
  "Hóa đơn này có <strong>con dấu</strong> đóng sau khi nhận, kế toán công nợ (accounts payable) dùng để xử lý; một phần viết tay, một phần là dấu, bản scan không rõ lắm — nhưng dịch vụ vẫn trích được một số thông tin.",
  "Vì là hóa đơn, lúc này <strong>không</strong> chạy key-value extraction, nhưng vẫn lấy được <strong>dữ liệu bảng</strong>: số lượng, mô tả, đơn giá, thành tiền.",
  "Một ít thông tin từ con dấu bị đưa vào cột mô tả — nhưng <strong>không ảnh hưởng</strong> tới các thông tin trích xuất khác.",
])}
${example(`<p>Dữ liệu thực tế lộn xộn (chữ tay, dấu mờ) vẫn được xử lý khá tốt; lỗi nhỏ được "cô lập" trong một ô thay vì làm hỏng cả bảng — đó là giá trị của việc giữ quan hệ hàng–cột.</p>`, "Quan sát")}

${memo(`<p>Document AI: biên lai → raw text (dòng/từ) + <strong>key values</strong> (tên, địa chỉ, SĐT cửa hàng, ngày giờ giao dịch) + line items. Hóa đơn có dấu, chữ tay → vẫn trích chữ và <strong>bảng</strong> (số lượng, mô tả, đơn giá, tổng).</p>`)}`,
    },

    /* ───────────────────────────── Skill check ───────────────────────────── */
    {
      id: "m7-summary",
      code: "★",
      kind: "summary",
      title: "★ Tổng kết Phần 7 & Skill Check",
      navTitle: "Tổng kết & Skill Check",
      note: "Ôn lại 8 bài học + Skill Check 10 câu (đạt ≥ 80%)",
      passPct: 80,
      html: `<p>Bốn dịch vụ AI của Phần 7 có chung một triết lý: <strong>serverless, mô hình pre-trained dùng ngay, không cần chuyên môn data science</strong>, và có thể đi xa hơn bằng custom model khi danh mục sẵn có không vừa.</p>

${table(
  ["Dịch vụ", "Đầu vào", "Năng lực chính", "Custom model"],
  [
    ["Language", "Văn bản", "Language detection, NER, sentiment, key phrase, text classification, dịch, PII/PHI, Health NLP", "NER, text classification"],
    ["Speech", "Âm thanh / video", "ASR (Oracle / Whisper), Live Transcribe, diarization, SRT, normalization, profanity filter", "—"],
    ["Vision", "Ảnh / video", "Image classification, object detection, OCR, face detection, video tracking", "Object detection, image classification"],
    ["Document Understanding", "PDF, JPEG, PNG, TIFF", "Text, table, key-value extraction; document classification", "—"],
  ]
)}

${sumGrid([
  sum("7.1–7.2 — OCI Language", ["75+ ngôn ngữ; NER; sentiment tài liệu / câu / khía cạnh; ~600 danh mục.", "Custom: 5 bước, đánh giá precision/recall/F1.", "PII/PHI: mask, placeholder, remove; Health NLP: SNOMED-CT, ICD-10."]),
  sum("7.3–7.4 — OCI Speech", ["Job bất đồng bộ: ≤100 tasks, lưu 90 ngày.", "Oracle ASR ~7 ngôn ngữ, Whisper 50+, cùng API, đều có diarization.", "10 giờ < 10 phút; normalization; profanity remove/mask/tag."]),
  sum("7.5–7.6 — OCI Vision", ["Classification (cả cảnh) vs detection (từng vật + box).", "OCR, face detection (vị trí, mốc, chất lượng).", "Vật thể lạ (ăng-ten vi ba) → custom model."]),
  sum("7.7–7.8 — Document Understanding", ["Text extraction là nền móng.", "Table giữ hàng–cột; key-value hiểu nghĩa trường.", "Classification (8 loại) thường là bước đầu."]),
])}

<h2>Skill Check: OCI AI Services</h2>
<p>Cần đúng <strong>từ 80% trở lên</strong> để đạt, như bài kiểm tra kỹ năng của khóa gốc.</p>`,
      quiz: [
        {
          q: "Vì sao OCI Language dùng <strong>aspect-based</strong> sentiment analysis cho câu “The food was great, but the service sucked”?",
          options: [
            { text: "Để chấm cả câu bằng một điểm trung tính.", correct: false, explain: "Sai. Một điểm tổng chính là thứ làm mất chi tiết." },
            { text: "Để chấm riêng từng khía cạnh (food tích cực, service tiêu cực) thay vì để lời chê kéo tụt lời khen.", correct: true, explain: "Đúng (bài 7.1)." },
            { text: "Để dịch câu sang ngôn ngữ khác.", correct: false, explain: "Sai. Đó là text translation." },
            { text: "Để phát hiện PII trong câu.", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Text classification của OCI Language trả về kết quả dạng nào?",
          options: [
            { text: "Domain và subdomain từ ~600 danh mục, kèm confidence score.", correct: true, explain: "Đúng — vd. “Kitten Digest Meow” → animals and plants / pets (bài 7.1)." },
            { text: "Danh sách mọi từ trong văn bản.", correct: false, explain: "Sai." },
            { text: "Một bản dịch sang tiếng Anh.", correct: false, explain: "Sai." },
            { text: "Vị trí bounding box của từng từ.", correct: false, explain: "Sai — đó là text extraction của Document Understanding." },
          ],
        },
        {
          q: "Health NLP nối các thực thể lâm sàng tới hệ mã chuẩn nào?",
          options: [
            { text: "JSON và SRT", correct: false, explain: "Sai — đó là định dạng đầu ra của OCI Speech." },
            { text: "SNOMED-CT và ICD-10", correct: true, explain: "Đúng — nhờ medical entity linking (bài 7.1)." },
            { text: "JSONL và Parquet", correct: false, explain: "Sai." },
            { text: "ONNX và PyTorch", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Khi cần chép lời một ngôn ngữ ngoài khoảng 7 ngôn ngữ của Oracle ASR, nên làm gì?",
          options: [
            { text: "Viết lại toàn bộ code tích hợp cho một API khác.", correct: false, explain: "Sai. Whisper dùng đúng cùng endpoint, API, SDK." },
            { text: "Chọn mô hình Whisper khi tạo transcription job — chỉ là một lựa chọn cấu hình.", correct: true, explain: "Đúng. Whisper hỗ trợ hơn 50 ngôn ngữ (bài 7.3)." },
            { text: "Dùng Live Transcribe.", correct: false, explain: "Sai. Live Transcribe là chế độ thời gian thực, không phải giải pháp cho phạm vi ngôn ngữ." },
            { text: "Không thể làm được.", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Một transcription job của OCI Speech có tối đa bao nhiêu file và được giữ bao lâu?",
          options: [
            { text: "10 file, 30 ngày", correct: false, explain: "Sai." },
            { text: "100 file (tasks), 90 ngày", correct: true, explain: "Đúng (bài 7.3)." },
            { text: "1.000 file, 7 ngày", correct: false, explain: "Sai." },
            { text: "Không giới hạn, lưu vĩnh viễn", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Chế độ lọc từ tục nào <strong>giữ nguyên</strong> từ gốc nhưng gắn cờ cho người kiểm duyệt?",
          options: [
            { text: "Remove", correct: false, explain: "Sai — Remove thay toàn bộ bằng dấu sao." },
            { text: "Mask", correct: false, explain: "Sai — Mask giữ chữ cái đầu, phần còn lại bị che." },
            { text: "Tag", correct: true, explain: "Đúng (bài 7.3)." },
            { text: "Normalize", correct: false, explain: "Sai — normalization là chuẩn hóa số, tiền, ngày, địa chỉ." },
          ],
        },
        {
          q: "Khác biệt giữa image classification và object detection trong OCI Vision?",
          options: [
            { text: "Classification gán nhãn cả cảnh; detection tìm từng vật thể, vẽ bounding box và cho confidence riêng.", correct: true, explain: "Đúng (bài 7.5)." },
            { text: "Classification chỉ dùng cho video.", correct: false, explain: "Sai." },
            { text: "Detection chỉ đọc chữ.", correct: false, explain: "Sai — đọc chữ là text detection/OCR." },
            { text: "Hai tính năng hoàn toàn giống nhau.", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Trong demo Vision, mô hình không nhận ra các ăng-ten vi ba trên mái nhà. Giải pháp được gợi ý là gì?",
          options: [
            { text: "Tăng độ phân giải màn hình.", correct: false, explain: "Sai." },
            { text: "Xây một custom model để phát hiện chúng.", correct: true, explain: "Đúng — mô hình pre-trained không được huấn luyện cho vật thể này (bài 7.6)." },
            { text: "Dùng OCI Speech.", correct: false, explain: "Sai." },
            { text: "Chuyển sang face detection.", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Năng lực nào của Document Understanding là “nền móng” cho ba năng lực còn lại?",
          options: [
            { text: "Document classification", correct: false, explain: "Sai — classification là bước đầu pipeline nhưng tự nó dựa vào chữ đã nhận dạng." },
            { text: "Text extraction (OCR)", correct: true, explain: "Đúng. Table, key-value và classification đều cần nhận dạng chữ trước (bài 7.7)." },
            { text: "Table extraction", correct: false, explain: "Sai." },
            { text: "Key-value extraction", correct: false, explain: "Sai." },
          ],
        },
        {
          q: "Vì sao document classification thường là bước <strong>đầu tiên</strong> trong pipeline xử lý tài liệu?",
          options: [
            { text: "Vì nó nén file nhỏ lại.", correct: false, explain: "Sai." },
            { text: "Vì cần biết đó là hóa đơn hay giấy phép lái xe… trước khi chạy key-value extraction phù hợp.", correct: true, explain: "Đúng (bài 7.7)." },
            { text: "Vì nó là năng lực duy nhất hỗ trợ PDF.", correct: false, explain: "Sai — mọi năng lực đều làm việc với PDF, JPEG, PNG, TIFF." },
            { text: "Vì nó dịch tài liệu sang tiếng Anh.", correct: false, explain: "Sai." },
          ],
        },
      ],
    },
  ],
};
