import type { IpaLesson } from "../types";

export const ipa01: IpaLesson = {
  id: "ipa-01",
  num: 1,
  title: "Nhập môn IPA — chìa khóa để đọc đúng mọi từ",
  mark: "IPA",
  level: "Cơ bản",
  group: "Nhập môn",
  intro:
    "Tiếng Anh viết một đằng đọc một nẻo, nên người Việt hay đoán cách đọc theo mặt chữ và đọc sai từ bé đến lớn. IPA (bảng phiên âm quốc tế) cho bạn MỘT ký hiệu cho MỘT âm: học xong 44 ký hiệu, bạn tự đọc đúng bất kỳ từ nào trong từ điển mà không cần ai đọc mẫu. Bài này là tấm bản đồ cho cả khóa học.",
  phonemes: [],
  rules: [
    {
      title: "IPA là gì và vì sao phải học?",
      body:
        "IPA (International Phonetic Alphabet) là bộ ký hiệu ghi lại ÂM THANH, không phải chữ viết. Mỗi ký hiệu luôn chỉ một âm duy nhất, dù trong tiếng Anh âm đó được viết bằng bao nhiêu cách. Ví dụ âm /iː/ có thể viết là ee, ea, ie, e, i… nhưng trong IPA chỉ có một ký hiệu iː. Lợi ích: (1) tra từ điển là biết đọc ngay, không phụ thuộc giọng người khác; (2) nhìn ra những âm tiếng Việt không có (θ, ð, æ, ʒ…) để luyện có chủ đích; (3) nghe tốt hơn vì não đã có \"ngăn kéo\" riêng cho từng âm; (4) hiểu vì sao người bản xứ không hiểu mình khi nói sai một âm (ship ↔ sheep). Lưu ý: phiên âm trong khóa được ghi không kèm dấu gạch chéo, giao diện tự thêm /…/.",
      examples: [
        { w: "see", ipa: "siː", vi: "nhìn thấy" },
        { w: "sea", ipa: "siː", vi: "biển" },
        { w: "receive", ipa: "rɪˈsiːv", vi: "nhận" },
        { w: "police", ipa: "pəˈliːs", vi: "cảnh sát" },
      ],
      sentences: [
        {
          en: "I [[see]] the [[sea]].",
          vi: "Tôi nhìn thấy biển. (Hai cách viết khác nhau, cùng một âm /iː/.)",
          ipa: "aɪ siː ðə siː",
        },
      ],
    },
    {
      title: "44 âm tiếng Anh — phần 1: 12 nguyên âm đơn",
      body:
        "Giọng Anh chuẩn có 44 âm: 12 nguyên âm đơn + 8 nguyên âm đôi + 24 phụ âm. Bảng chữ cái chỉ có 26 chữ, nên một chữ phải gánh nhiều âm — đó là lý do cần IPA. 12 nguyên âm đơn gồm 7 âm ngắn và 5 âm dài: ɪ – e – æ – ʌ – ɒ – ʊ – ə (ngắn) và iː – ɑː – ɔː – uː – ɜː (dài). Khóa học dạy chúng theo cặp dễ nhầm: iː/ɪ, e/æ, ʌ/ɑː, ɒ/ɔː, ʊ/uː, ɜː/ə. Mỗi âm có MỘT từ khóa neo trí nhớ, liệt kê dưới đây.",
      examples: [
        { w: "see", ipa: "siː", vi: "iː — nhìn thấy" },
        { w: "sit", ipa: "sɪt", vi: "ɪ — ngồi" },
        { w: "bed", ipa: "bed", vi: "e — cái giường" },
        { w: "cat", ipa: "kæt", vi: "æ — con mèo" },
        { w: "cup", ipa: "kʌp", vi: "ʌ — cái cốc" },
        { w: "car", ipa: "kɑː", vi: "ɑː — ô tô" },
        { w: "hot", ipa: "hɒt", vi: "ɒ — nóng" },
        { w: "door", ipa: "dɔː", vi: "ɔː — cánh cửa" },
        { w: "book", ipa: "bʊk", vi: "ʊ — quyển sách" },
        { w: "food", ipa: "fuːd", vi: "uː — đồ ăn" },
        { w: "bird", ipa: "bɜːd", vi: "ɜː — con chim" },
        { w: "about", ipa: "əˈbaʊt", vi: "ə — về (âm schwa)" },
      ],
    },
    {
      title: "44 âm tiếng Anh — phần 2: 8 nguyên âm đôi",
      body:
        "Nguyên âm đôi là một âm TRƯỢT từ vị trí này sang vị trí khác trong cùng một nhịp: eɪ – aɪ – ɔɪ – əʊ – aʊ (trượt về i hoặc u) và ɪə – eə – ʊə (trượt về ə). Phần đầu đọc rõ và mạnh, phần sau nhẹ dần. Người Việt hay đọc thiếu phần trượt (\"go\" thành \"gô\", \"day\" thành \"đê\") — sai lầm này làm giọng bị cứng và khó nghe.",
      examples: [
        { w: "day", ipa: "deɪ", vi: "eɪ — ngày" },
        { w: "my", ipa: "maɪ", vi: "aɪ — của tôi" },
        { w: "boy", ipa: "bɔɪ", vi: "ɔɪ — cậu bé" },
        { w: "go", ipa: "ɡəʊ", vi: "əʊ — đi" },
        { w: "now", ipa: "naʊ", vi: "aʊ — bây giờ" },
        { w: "near", ipa: "nɪə", vi: "ɪə — gần" },
        { w: "hair", ipa: "heə", vi: "eə — tóc" },
        { w: "tour", ipa: "tʊə", vi: "ʊə — chuyến du lịch" },
      ],
    },
    {
      title: "44 âm tiếng Anh — phần 3: 24 phụ âm",
      body:
        "24 phụ âm: p (pen), b (bad), t (tea), d (dog), k (cat), ɡ (go), f (fan), v (van), θ (think), ð (this), s (see), z (zoo), ʃ (she), ʒ (vision), h (hat), tʃ (chair), dʒ (job), m (man), n (no), ŋ (sing), l (leg), r (red), w (wet), j (yes). Phần lớn có trong tiếng Việt, nhưng các âm sau tiếng Việt KHÔNG có hoặc khác hẳn: θ, ð, ʃ, ʒ, tʃ, dʒ, z, và r tiếng Anh (không rung lưỡi). Chú ý: ký hiệu j trong IPA là âm \"d\" nhẹ như \"yes\", không phải chữ j trong \"job\" (đó là dʒ).",
      examples: [
        { w: "think", ipa: "θɪŋk", vi: "θ — nghĩ" },
        { w: "this", ipa: "ðɪs", vi: "ð — cái này" },
        { w: "she", ipa: "ʃiː", vi: "ʃ — cô ấy" },
        { w: "vision", ipa: "ˈvɪʒ.ən", vi: "ʒ — tầm nhìn" },
        { w: "chair", ipa: "tʃeə", vi: "tʃ — cái ghế" },
        { w: "job", ipa: "dʒɒb", vi: "dʒ — công việc" },
        { w: "sing", ipa: "sɪŋ", vi: "ŋ — hát" },
        { w: "yes", ipa: "jes", vi: "j — vâng" },
      ],
    },
    {
      title: "Dấu ː — âm DÀI",
      body:
        "Dấu ː (hai tam giác nhỏ, trông giống dấu hai chấm) đứng sau một nguyên âm nghĩa là âm đó được kéo DÀI. Tiếng Anh có 5 nguyên âm dài: iː, ɑː, ɔː, uː, ɜː. Nhưng lưu ý: âm dài và âm ngắn tương ứng còn khác nhau cả về khẩu hình (căng ↔ chùng), không chỉ độ dài. Đọc sai độ dài có thể đổi nghĩa của từ.",
      examples: [
        { w: "ship", ipa: "ʃɪp", vi: "con tàu" },
        { w: "sheep", ipa: "ʃiːp", vi: "con cừu" },
        { w: "full", ipa: "fʊl", vi: "đầy" },
        { w: "fool", ipa: "fuːl", vi: "kẻ ngốc" },
        { w: "shot", ipa: "ʃɒt", vi: "cú bắn" },
        { w: "short", ipa: "ʃɔːt", vi: "ngắn" },
      ],
      sentences: [
        {
          en: "Is the [[pool]] [[full]]?",
          vi: "Bể bơi đầy nước chưa? (pool có /uː/ dài, full có /ʊ/ ngắn.)",
          ipa: "ɪz ðə puːl fʊl",
        },
      ],
    },
    {
      title: "Dấu trọng âm ˈ ˌ và dấu chấm tách âm tiết",
      body:
        "Dấu ˈ (phẩy trên) đặt TRƯỚC âm tiết nhấn chính: âm tiết đó đọc to hơn, dài hơn, cao giọng hơn. Dấu ˌ (phẩy dưới) đặt trước âm tiết nhấn phụ — nhấn nhẹ hơn. Dấu chấm . tách các âm tiết, giúp bạn đếm nhịp. Ví dụ information /ˌɪn.fəˈmeɪ.ʃən/: 4 âm tiết, nhấn chính \"meɪ\", nhấn phụ \"ɪn\". Người Việt quen nói đều từng tiếng như nhau, nên nhấn sai trọng âm là lỗi khiến người nghe khó hiểu nhất — đôi khi còn hơn sai một âm. Cùng gốc từ, trọng âm có thể dịch chuyển: photo → photographer → photographic.",
      examples: [
        { w: "information", ipa: "ˌɪn.fəˈmeɪ.ʃən", vi: "thông tin" },
        { w: "photograph", ipa: "ˈfəʊ.tə.ɡrɑːf", vi: "bức ảnh" },
        { w: "photographer", ipa: "fəˈtɒɡ.rə.fə", vi: "nhiếp ảnh gia" },
        { w: "photographic", ipa: "ˌfəʊ.təˈɡræf.ɪk", vi: "thuộc về nhiếp ảnh" },
        { w: "banana", ipa: "bəˈnɑː.nə", vi: "quả chuối" },
      ],
      sentences: [
        {
          en: "The [[photographer]] took a [[photograph]] of a [[banana]].",
          vi: "Nhiếp ảnh gia chụp một bức ảnh quả chuối.",
          ipa: "ðə fəˈtɒɡ.rə.fə tʊk ə ˈfəʊ.tə.ɡrɑːf əv ə bəˈnɑː.nə",
        },
      ],
    },
    {
      title: "Hữu thanh và vô thanh",
      body:
        "Đặt ngón tay lên cổ họng rồi nói \"zzzz\": bạn thấy rung — đó là âm HỮU THANH (dây thanh rung). Nói \"ssss\": không rung — âm VÔ THANH (chỉ có hơi). Nhiều phụ âm đi thành cặp, khẩu hình y hệt nhau, chỉ khác có rung hay không: p/b, t/d, k/ɡ, f/v, θ/ð, s/z, ʃ/ʒ, tʃ/dʒ. Mọi nguyên âm đều hữu thanh. Điều này rất quan trọng với phụ âm cuối (người Việt hay bỏ) và với đuôi -s, -ed: \"cats\" /kæts/ nhưng \"dogs\" /dɒɡz/.",
      examples: [
        { w: "fan", ipa: "fæn", vi: "cái quạt (f vô thanh)" },
        { w: "van", ipa: "væn", vi: "xe tải nhỏ (v hữu thanh)" },
        { w: "sip", ipa: "sɪp", vi: "nhấp một ngụm (s vô thanh)" },
        { w: "zip", ipa: "zɪp", vi: "khóa kéo (z hữu thanh)" },
        { w: "pea", ipa: "piː", vi: "hạt đậu (p vô thanh)" },
        { w: "bee", ipa: "biː", vi: "con ong (b hữu thanh)" },
      ],
      sentences: [
        {
          en: "Two [[cats]] and two [[dogs]].",
          vi: "Hai con mèo và hai con chó. (cats → /s/, dogs → /z/.)",
          ipa: "tuː kæts ən tuː dɒɡz",
        },
      ],
    },
    {
      title: "Đọc một mục từ trong từ điển (Cambridge / Oxford)",
      body:
        "Từ điển Cambridge và Oxford Learner's ghi hai phiên âm: UK (giọng Anh) và US (giọng Mỹ), kèm nút loa để nghe. Khóa này dùng giọng Anh làm chuẩn. Những khác biệt hay gặp: (1) Mỹ đọc âm r sau nguyên âm (car UK /kɑː/, US /kɑːr/), Anh thì không; (2) Mỹ dùng /oʊ/ thay cho /əʊ/ (go UK /ɡəʊ/, US /ɡoʊ/); (3) Mỹ không có /ɒ/, thay bằng /ɑː/ (hot UK /hɒt/, US /hɑːt/); (4) Mỹ đọc t giữa hai nguyên âm gần như d nhẹ, Cambridge ghi là t̬ (water US /ˈwɑː.t̬ɚ/). Cách đọc một mục từ: nhìn số dấu chấm để đếm âm tiết → tìm dấu ˈ để biết nhấn đâu → đọc từng ký hiệu → bấm loa nghe lại để kiểm tra.",
      examples: [
        { w: "water", ipa: "ˈwɔː.tə", vi: "nước (UK; US: ˈwɑː.t̬ɚ)" },
        { w: "go", ipa: "ɡəʊ", vi: "đi (UK; US: ɡoʊ)" },
        { w: "hot", ipa: "hɒt", vi: "nóng (UK; US: hɑːt)" },
        { w: "car", ipa: "kɑː", vi: "ô tô (UK; US: kɑːr)" },
        { w: "schedule", ipa: "ˈʃedʒ.uːl", vi: "lịch trình (UK; US: ˈskedʒ.uːl)" },
      ],
    },
    {
      title: "Chữ viết ≠ âm thanh",
      body:
        "Đừng bao giờ đoán cách đọc chỉ từ mặt chữ. Bốn từ cùng có \"ough\" nhưng đọc bốn kiểu khác nhau: though, through, tough, cough. Có chữ viết ra mà không đọc (k trong knife, s trong island, l trong walk), có chữ đọc khác hẳn (o trong women là /ɪ/). Ngược lại, cùng một âm có nhiều cách viết. Thói quen tốt: gặp từ mới là tra phiên âm NGAY, trước khi tự đọc sai và quen miệng.",
      examples: [
        { w: "though", ipa: "ðəʊ", vi: "mặc dù" },
        { w: "through", ipa: "θruː", vi: "xuyên qua" },
        { w: "tough", ipa: "tʌf", vi: "khó khăn, dai" },
        { w: "cough", ipa: "kɒf", vi: "ho" },
        { w: "knife", ipa: "naɪf", vi: "con dao" },
        { w: "island", ipa: "ˈaɪ.lənd", vi: "hòn đảo" },
        { w: "women", ipa: "ˈwɪm.ɪn", vi: "phụ nữ (số nhiều)" },
        { w: "Wednesday", ipa: "ˈwenz.deɪ", vi: "thứ Tư" },
      ],
      sentences: [
        {
          en: "[[Though]] the [[cough]] was [[tough]], she got [[through]] it.",
          vi: "Dù cơn ho rất dai dẳng, cô ấy đã vượt qua được.",
          ipa: "ðəʊ ðə kɒf wəz tʌf ʃi ɡɒt θruː ɪt",
        },
      ],
    },
    {
      title: "Phương pháp 5 bước của khóa học",
      body:
        "Mỗi bài học một cặp âm theo đúng 5 bước: (1) TỪ KHÓA — gắn mỗi âm với một từ quen thuộc (iː = see, æ = cat…); quên ký hiệu thì nhớ từ khóa. (2) KHẨU HÌNH — đặt môi, lưỡi, hàm theo từng bước; soi gương và dùng tay sờ cổ họng, cằm để kiểm tra. (3) CẶP TỐI THIỂU — luyện hai từ chỉ khác đúng một âm (ship/sheep); nếu nghe và nói phân biệt được cặp này là bạn đã nắm âm. (4) CÂU CHUYỆN — đọc to đoạn truyện về Linh ở London, các từ chứa âm đang học được đánh dấu; ngữ cảnh giúp nhớ lâu. (5) ÔN NGẮT QUÃNG — ôn lại sau 1 ngày, 3 ngày, 1 tuần, 1 tháng bằng thẻ và bài trắc nghiệm; mỗi lần chỉ 5–10 phút nhưng đều đặn.",
      examples: [
        { w: "see", ipa: "siː", vi: "từ khóa của /iː/" },
        { w: "sit", ipa: "sɪt", vi: "từ khóa của /ɪ/" },
      ],
      sentences: [
        {
          en: "[[Ship]] or [[sheep]]? [[Sit]] or [[seat]]?",
          vi: "Tàu hay cừu? Ngồi hay chỗ ngồi? (Luyện cặp tối thiểu.)",
          ipa: "ʃɪp ɔː ʃiːp sɪt ɔː siːt",
        },
      ],
    },
  ],
  story: {
    title: "Linh đến London",
    paras: [
      {
        en: "Linh landed in London on a grey Sunday. Her landlady, Mrs Brown, opened the door with a big smile. \"Would you like some [[water]], love?\" Linh did not understand. In her textbook, [[water]] sounded like \"oát-tơ\", but Mrs Brown said something like \"woː-tə\".",
        vi: "Linh hạ cánh xuống London vào một ngày Chủ nhật xám xịt. Bà chủ nhà, bà Brown, mở cửa với nụ cười rạng rỡ: \"Cháu uống chút nước không, cháu yêu?\" Linh không hiểu. Trong sách của cô, \"water\" nghe như \"oát-tơ\", còn bà Brown lại nói gần như \"wo-tơ\".",
      },
      {
        en: "On Monday, at her new office, she met Tom. He showed her the Cambridge dictionary on his phone. \"Look — every word has a code: ˈwɔː.tə. Learn the 44 symbols and you can read any word, even [[though]], [[through]], [[tough]] and [[cough]].\"",
        vi: "Thứ Hai, ở văn phòng mới, cô gặp Tom. Anh mở từ điển Cambridge trên điện thoại cho cô xem: \"Nhìn này — từ nào cũng có một mã: ˈwɔː.tə. Học 44 ký hiệu là em đọc được mọi từ, kể cả though, through, tough và cough.\"",
      },
      {
        en: "That night, her American friend Jake called. \"Hey Linh! Drink lots of [[water]]!\" He said it like \"wah-der\". Linh laughed: the dictionary had a second line, marked US: ˈwɑː.t̬ɚ. Same word, two accents.",
        vi: "Tối đó, Jake — người bạn Mỹ — gọi điện: \"Chào Linh! Nhớ uống nhiều nước nhé!\" Cậu ấy nói gần như \"woa-đơ\". Linh bật cười: từ điển có thêm một dòng ghi US: ˈwɑː.t̬ɚ. Cùng một từ, hai giọng.",
      },
      {
        en: "Before bed, Linh wrote a plan in her notebook: one keyword for every sound, check the mouth in the mirror, practise pairs like [[ship]] and [[sheep]], read a little story, and review every few days.",
        vi: "Trước khi ngủ, Linh viết kế hoạch vào sổ: mỗi âm một từ khóa, soi gương kiểm tra khẩu hình, luyện các cặp như ship và sheep, đọc một câu chuyện nhỏ, và ôn lại sau vài ngày.",
      },
    ],
  },
  twister: {
    en: "Though the tough cough went through the town, I thought it was fine.",
    vi: "Dù trận ho dai dẳng lan khắp thị trấn, tôi vẫn nghĩ mọi thứ ổn. (Bốn cách đọc \"ough\": ðəʊ – tʌf – kɒf – θruː, và thought /θɔːt/.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Chọn âm",
      q: "Giọng Anh chuẩn có tất cả bao nhiêu âm?",
      opts: ["44", "26", "29", "36"],
      answer: 0,
      explain: "44 âm = 12 nguyên âm đơn + 8 nguyên âm đôi + 24 phụ âm. 26 là số chữ cái, không phải số âm.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Dấu ː trong /siː/ có nghĩa là gì?",
      opts: ["Nguyên âm được kéo dài", "Âm tiết được nhấn mạnh", "Chữ cái câm, không đọc", "Tách hai âm tiết"],
      answer: 0,
      explain: "ː là dấu âm dài. Trọng âm dùng ˈ, tách âm tiết dùng dấu chấm.",
    },
    {
      type: "choice",
      label: "Trọng âm",
      q: "Trong /ˌɪn.fəˈmeɪ.ʃən/ (information), âm tiết nào được nhấn CHÍNH?",
      opts: ["meɪ", "ɪn", "fə", "ʃən"],
      answer: 0,
      explain: "Dấu ˈ đứng trước \"meɪ\" → nhấn chính. Dấu ˌ trước \"ɪn\" chỉ là nhấn phụ.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "through",
      opts: ["through /θruː/", "though /ðəʊ/", "tough /tʌf/", "cough /kɒf/"],
      answer: 0,
      explain: "through /θruː/ — xuyên qua. Bốn từ cùng viết \"ough\" nhưng đọc bốn kiểu khác nhau.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Trong từ nào, \"ough\" đọc là /ʌf/?",
      opts: ["tough", "though", "through", "thought"],
      answer: 0,
      explain: "tough /tʌf/. though /ðəʊ/, through /θruː/, thought /θɔːt/.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Âm nào là âm HỮU THANH (dây thanh rung)?",
      opts: ["/v/", "/f/", "/p/", "/ʃ/"],
      answer: 0,
      explain: "/v/ hữu thanh — sờ cổ thấy rung. /f/, /p/, /ʃ/ vô thanh, chỉ có hơi. f/v có khẩu hình giống hệt nhau.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Từ điển ghi \"go\": UK /ɡəʊ/ — US /ɡoʊ/. Khóa học này dùng phiên âm nào làm chuẩn?",
      opts: ["/ɡəʊ/ (UK)", "/ɡoʊ/ (US)", "/ɡoː/", "/ɡuː/"],
      answer: 0,
      explain: "Khóa học theo chuẩn Anh (Cambridge/Oxford UK): /əʊ/. Giọng Mỹ dùng /oʊ/ — vẫn đúng, chỉ là giọng khác.",
    },
    {
      type: "judge",
      q: "Hai từ có cùng cụm chữ (ví dụ \"ough\") thì luôn đọc giống nhau.",
      ok: false,
      explain: "Sai. though /ðəʊ/, through /θruː/, tough /tʌf/, cough /kɒf/ — chữ viết không quyết định âm. Luôn tra phiên âm.",
    },
  ],
};
