import type { N1Lesson } from "../types";

export const bai04: N1Lesson = {
  id: "bai-04",
  num: 4,
  topicJa: "例示",
  topicVi: "Nêu ví dụ (A hay B…)",
  chapterJa: "大家さんの庭",
  chapterVi: "Khu vườn của bà chủ nhà",
  scene:
    "Cuối tuần tháng Sáu. Mai và Kenta giúp bà Yamamoto — bà chủ nhà trọ — sơn lại hàng rào và chăm vườn. Một buổi chiều đầy những cặp \"A hay B\": các mẫu NÊU VÍ DỤ theo cặp.",
  story: [
    {
      jp: "土曜日の朝、山本さんがマイの部屋をノックした。「垣根のペンキを塗り直したいの。手伝ってくれる人がいたら助かるわ。」マイはすぐに健太に連絡した。",
      vi: "Sáng thứ Bảy, bà Yamamoto gõ cửa phòng Mai: \"Bà muốn sơn lại hàng rào. Có ai giúp thì đỡ quá.\" Mai lập tức liên lạc với Kenta.",
    },
    {
      jp: "山本さんの庭は、花の色[[といい]]香り[[といい]]、まるで絵本の中のようだった。「毎日手入れしているからね。晴れ[[であれ]]雨[[であれ]]、一日も休まないのよ。」",
      vi: "Khu vườn của bà Yamamoto, nói về màu hoa hay hương thơm, đều đẹp như trong truyện tranh. \"Vì ngày nào bà cũng chăm. Nắng hay mưa, bà chẳng nghỉ ngày nào.\"",
    },
    {
      jp: "健太はペンキ塗りに夢中になり、気がつくと手[[といわず]]顔[[といわず]]、全身ペンキだらけになっていた。",
      vi: "Kenta mải mê sơn, đến khi để ý thì tay chân mặt mũi gì cũng dính đầy sơn.",
    },
    {
      jp: "作業が終わると、山本さんがお茶をいれてくれた。「困ったことがあったら、電話[[なり]]メール[[なり]]、いつでも連絡してね。遠慮はいらないよ。」",
      vi: "Làm xong, bà Yamamoto pha trà cho hai người. \"Có chuyện gì khó khăn, gọi điện hay nhắn tin gì cũng được, cứ liên lạc với bà bất cứ lúc nào nhé. Đừng ngại.\"",
    },
    {
      jp: "その夜、マイは日記に書いた。「東京にも、もう一人のおばあちゃんができた。」",
      vi: "Tối đó Mai viết vào nhật ký: \"Ở Tokyo, mình đã có thêm một người bà nữa.\"",
    },
  ],
  patterns: [
    {
      id: "nari-nari",
      pattern: "〜なり〜なり",
      meaning: "A hay B gì cũng được — hãy chọn một cách mà làm",
      nuance:
        "Đưa ra vài ví dụ cùng loại như các phương án, ý là \"cái nào cũng được, cứ làm đi\". Dùng để đề xuất, khuyên nhủ, yêu cầu — không dùng để kể chuyện quá khứ.",
      forms: ["N（+ trợ từ）+ なり、N（+ trợ từ）+ なり", "V辞書形 + なり、V辞書形 + なり"],
      position: {
        before: "Hai phương án cùng loại",
        after: "Đề xuất / yêu cầu / ý chí (〜たらいい・〜てください・〜しよう)",
      },
      register: "Văn nói · khuyên nhủ (với người ngang hàng/dưới)",
      usage: [
        "Vế sau là lời khuyên, đề nghị, mệnh lệnh, ý định — KHÔNG ở thể quá khứ.",
        "Có sắc thái hơi suồng sã/ra lệnh, tránh dùng với cấp trên.",
      ],
      examples: [
        {
          jp: "昼休みは四十分しかないんだから、おにぎり[[なり]]サンドイッチ[[なり]]買って、早く食べたほうがいい。",
          vi: "Nghỉ trưa chỉ có 40 phút, cơm nắm hay sandwich gì đó mua rồi ăn nhanh đi thì hơn.",
        },
        {
          jp: "この魚、僕が釣ったんだ。焼く[[なり]]煮る[[なり]]して食べてみて。",
          vi: "Con cá này tôi câu đấy. Nướng hay kho gì cũng được, ăn thử đi.",
        },
        {
          jp: "分からないことがあったら、先生に[[なり]]先輩に[[なり]]聞きなさい。",
          vi: "Có gì không hiểu thì hỏi thầy cô hay đàn anh gì đó đi.",
        },
      ],
      dos: ["Gợi ý phương án cho người nghe: \"cứ làm cách nào đó đi\"."],
      donts: [
        {
          text: "Kể sự việc đã xảy ra → không dùng.",
          bad: "昨日は、テレビなり映画なり見た。",
          good: "昨日は、テレビを見たり映画を見たりした。",
        },
        {
          text: "Nói với cấp trên → nghe như ra lệnh.",
          bad: "部長、電話なりメールなりしてください。",
          good: "部長、お電話かメールでご連絡いただけますか。",
        },
      ],
      compare: [
        {
          other: "〜たり〜たり (N4)",
          diff: "たり〜たり: liệt kê việc ĐÃ/ĐANG làm. なり〜なり: đưa phương án để CHỌN cho hành động sắp tới.",
        },
        {
          other: "〜なり (Chương 1)",
          diff: "なり (một lần, sau V辞書形) = \"vừa… là liền\". なり〜なり (lặp hai lần) = \"A hay B\".",
        },
      ],
      memo: "Hai chữ なり như hai cánh cửa 🚪🚪: mở cửa nào cũng được, miễn là bước qua! Bà Yamamoto: 電話なりメールなり、いつでも連絡してね.",
      storyLine: "電話[[なり]]メール[[なり]]、いつでも連絡してね。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "そんなに疲れているなら、少し休む＿＿＿、早く帰る＿＿＿したらどう？",
          opts: ["なり／なり", "であれ／であれ", "といい／といい", "といわず／といわず"],
          answer: 0,
          explain: "Đề xuất phương án cho người nghe (〜したらどう？) → なり〜なり.",
        },
        {
          type: "judge",
          q: "先週の休みは、本なり雑誌なり読んで過ごした。",
          ok: false,
          explain: "Kể việc đã làm trong quá khứ → không dùng なり〜なり.",
          fix: "先週の休みは、本や雑誌を読んで過ごした。",
        },
      ],
    },
    {
      id: "deare-deare",
      pattern: "〜であれ〜であれ",
      variants: ["〜であろうと〜であろうと"],
      meaning: "Dù là A hay B thì cũng như nhau",
      nuance:
        "Đưa ra các ví dụ cùng nhóm và khẳng định: dù là cái nào thì đánh giá/kết luận cũng giống nhau. Văn viết, khẳng định mạnh.",
      forms: ["N + であれ、N + であれ", "N + であろうと、N + であろうと"],
      position: {
        before: "Hai ví dụ cùng loại",
        after: "Kết luận chung, không đổi (phán đoán, quy tắc)",
      },
      register: "Văn viết · khẳng định",
      usage: [
        "Hai danh từ thuộc cùng một nhóm ý nghĩa (rượu bia, động đất hỏa hoạn…).",
        "Vế sau là phán đoán / nguyên tắc chung.",
      ],
      examples: [
        {
          jp: "地震[[であれ]]火事[[であれ]]、緊急の時に冷静でいられる人は少ないだろう。",
          vi: "Dù là động đất hay hỏa hoạn, người giữ được bình tĩnh lúc khẩn cấp chắc là ít.",
        },
        {
          jp: "ビール[[であろうと]]ワイン[[であろうと]]、酒は酒だ。運転前に飲んではいけない。",
          vi: "Bia hay rượu vang thì rượu vẫn là rượu. Trước khi lái xe không được uống.",
        },
        {
          jp: "社長[[であれ]]新入社員[[であれ]]、ルールは守らなければならない。",
          vi: "Dù là giám đốc hay nhân viên mới, đều phải tuân thủ quy định.",
        },
      ],
      dos: ["Nêu nguyên tắc áp dụng cho mọi trường hợp trong nhóm."],
      donts: [
        {
          text: "Hai ví dụ không cùng loại → không tự nhiên.",
          bad: "犬であれ雨であれ、私は好きだ。",
          good: "犬であれ猫であれ、動物は好きだ。",
        },
      ],
      compare: [
        {
          other: "〜であれ (một lần, Chương 10)",
          diff: "Dạng đơn (どんな N であれ・たとえ N であれ) = \"dù là… đi nữa\" — điều kiện nghịch. Dạng cặp = nêu ví dụ.",
        },
        {
          other: "〜にしても〜にしても (N2)",
          diff: "Gần nghĩa, nhưng にしても thân mật hơn; であれ trang trọng, cứng.",
        },
      ],
      memo: "である = \"là\" (văn viết) → であれ = \"là gì thì là\" ☂️☀️. Bà Yamamoto: 晴れであれ雨であれ、一日も休まない.",
      storyLine: "晴れ[[であれ]]雨[[であれ]]、一日も休まないのよ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "大人＿＿＿子供＿＿＿、命の重さに変わりはない。",
          opts: ["であれ／であれ", "なり／なり", "といわず／といわず", "といい／といい"],
          answer: 0,
          explain: "Dù người lớn hay trẻ em, sức nặng sinh mạng không khác → kết luận chung → であれ〜であれ.",
        },
        {
          type: "order",
          before: "",
          pieces: ["和食", "であれ", "洋食", "であれ"],
          after: "、彼は何でもおいしそうに食べる。",
          star: 1,
          vi: "Món Nhật hay món Âu, anh ấy ăn gì cũng ngon lành.",
          explain: "和食であれ洋食であれ — hai ví dụ cùng nhóm (món ăn).",
        },
      ],
    },
    {
      id: "toii-toii",
      pattern: "〜といい〜といい",
      meaning: "Xét về A hay về B thì đều…",
      nuance:
        "Đưa ra hai khía cạnh của một đối tượng để nhận xét: khía cạnh nào cũng cho thấy cùng một đánh giá (thường là khen, đôi khi chê). Vế sau là lời ĐÁNH GIÁ của người nói.",
      forms: ["N + といい、N + といい"],
      position: {
        before: "Hai khía cạnh của cùng một đối tượng (色・形・味・値段…)",
        after: "Đánh giá chung (最高だ・そっくりだ・ひどい…)",
      },
      register: "Văn nói & viết · nhận xét",
      usage: [
        "Vế sau là câu đánh giá, không phải ý chí/yêu cầu.",
        "Hai danh từ là hai mặt của cùng một thứ.",
      ],
      examples: [
        {
          jp: "この映画は映像の美しさ[[といい]]音楽の素晴らしさ[[といい]]、最高の作品だ。",
          vi: "Bộ phim này, về vẻ đẹp hình ảnh hay sự tuyệt vời của âm nhạc, đều là một tác phẩm đỉnh cao.",
        },
        {
          jp: "この虫は色[[といい]]形[[といい]]、木の葉にそっくりだ。",
          vi: "Con côn trùng này, cả màu sắc lẫn hình dáng, đều giống hệt chiếc lá.",
        },
        {
          jp: "部屋の広さ[[といい]]駅からの近さ[[といい]]、このマンションは申し分ない。",
          vi: "Cả độ rộng của phòng lẫn sự gần ga, căn hộ này không chê vào đâu được.",
        },
      ],
      dos: ["Nhận xét tổng thể một người/vật qua 2 tiêu chí."],
      donts: [
        {
          text: "Vế sau là ý chí / đề nghị → không dùng.",
          bad: "値段といいデザインといい、これを買おう。",
          good: "値段といいデザインといい、これは理想的だ。だから買おう。",
        },
      ],
      compare: [
        {
          other: "〜といわず〜といわず",
          diff: "といい〜といい: hai KHÍA CẠNH → ĐÁNH GIÁ. といわず〜といわず: hai BỘ PHẬN / thời điểm → \"chỗ nào/lúc nào cũng\" (thường là trạng thái tiêu cực).",
        },
        {
          other: "〜も〜も",
          diff: "も〜も liệt kê đơn thuần. といい〜といい nhấn mạnh rằng xét kiểu gì cũng ra cùng một đánh giá.",
        },
      ],
      memo: "いい = \"nói\" → \"nói về A cũng được, nói về B cũng được — đều 💯!\" Khu vườn: 花の色といい香りといい、まるで絵本のよう.",
      storyLine: "山本さんの庭は、花の色[[といい]]香り[[といい]]、まるで絵本の中のようだった。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "このレストランは、味＿＿＿雰囲気＿＿＿、デートにぴったりだ。",
          opts: ["といい／といい", "といわず／といわず", "なり／なり", "であれ／であれ"],
          answer: 0,
          explain: "Hai khía cạnh (vị, không khí) → đánh giá chung \"rất hợp để hẹn hò\" → といい〜といい.",
        },
        {
          type: "judge",
          q: "彼の態度といい言葉遣いといい、社会人として問題がある。",
          ok: true,
          explain: "といい〜といい cũng dùng được cho đánh giá tiêu cực, miễn vế sau là nhận xét.",
        },
      ],
    },
    {
      id: "toiwazu-toiwazu",
      pattern: "〜といわず〜といわず",
      meaning: "Bất kể A hay B — chỗ nào / lúc nào cũng…",
      nuance:
        "Không phân biệt A hay B, tất cả đều trong cùng trạng thái. A, B thường là các bộ phận cơ thể, nơi chốn, thời gian liền kề nhau. Thường mô tả trạng thái tiêu cực, tràn lan.",
      forms: ["N + といわず、N + といわず"],
      position: {
        before: "Hai bộ phận / nơi / thời điểm (手と足・昼と夜・廊下と部屋)",
        after: "Trạng thái phủ khắp (〜だらけ・いっぱい・休まず働く)",
      },
      register: "Văn viết · miêu tả",
      usage: [
        "Hay kết hợp với 〜だらけ, 〜中, いつも, khắp nơi.",
        "Không dùng với câu phủ định ở vế sau.",
      ],
      examples: [
        {
          jp: "砂浜で遊んでいた子供たちは、手[[といわず]]足[[といわず]]全身砂だらけだ。",
          vi: "Lũ trẻ chơi ở bãi cát, tay chân gì cũng dính cát khắp người.",
        },
        {
          jp: "犬を室内で飼っているので、廊下[[といわず]]部屋[[といわず]]、家中に毛が落ちている。",
          vi: "Vì nuôi chó trong nhà nên hành lang hay trong phòng, khắp nhà đều có lông chó.",
        },
        {
          jp: "営業の島田さんは平日[[といわず]]週末[[といわず]]、休む暇なく外で働いている。",
          vi: "Anh Shimada bên kinh doanh, ngày thường hay cuối tuần cũng không có lúc nghỉ, lúc nào cũng ra ngoài làm việc.",
        },
      ],
      dos: ["Miêu tả sự tràn lan khắp nơi, khắp lúc — thường không mấy dễ chịu."],
      donts: [
        {
          text: "Vế sau phủ định → không dùng.",
          bad: "手といわず足といわず、全然汚れていない。",
          good: "手も足も、全然汚れていない。",
        },
      ],
      compare: [
        {
          other: "〜といい〜といい",
          diff: "といい: ĐÁNH GIÁ một đối tượng qua các mặt. といわず: TRẠNG THÁI phủ khắp các bộ phận/thời điểm.",
        },
      ],
      memo: "わず = \"không nói\" → \"chẳng cần nói tay hay chân\" — đều lấm lem cả! 🎨 Kenta: 手といわず顔といわず、全身ペンキだらけ.",
      storyLine: "手[[といわず]]顔[[といわず]]、全身ペンキだらけになっていた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "彼は朝＿＿＿夜＿＿＿、いつもゲームばかりしている。",
          opts: ["といわず／といわず", "といい／といい", "なり／なり", "であれ／であれ"],
          answer: 0,
          explain: "Sáng hay tối gì cũng (lúc nào cũng) chơi game → trạng thái tràn lan → といわず〜といわず.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "台風の後、道路といわず庭といわず、木の枝が散らばっていた。",
          opts: [
            "Sau bão, đường sá hay sân vườn chỗ nào cũng vương vãi cành cây.",
            "Sau bão, đường thì sạch nhưng vườn có cành cây.",
            "Sau bão, không ai nói gì về cành cây trên đường.",
            "Sau bão, nên dọn cành cây ở đường hoặc vườn.",
          ],
          answer: 0,
          explain: "といわず〜といわず = bất kể A hay B, đâu đâu cũng…",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Vế sau", "Đặc điểm"],
    rows: [
      ["〜なり〜なり", "A hay B, chọn đi", "Đề xuất / yêu cầu", "Không dùng quá khứ"],
      ["〜であれ〜であれ", "Dù A hay B thì như nhau", "Kết luận chung", "Trang trọng"],
      ["〜といい〜といい", "Xét A hay B đều…", "Đánh giá", "Hai mặt của 1 đối tượng"],
      ["〜といわず〜といわず", "Bất kể A hay B, khắp nơi…", "Trạng thái tràn lan", "Bộ phận / nơi / thời gian"],
    ],
  },
  links: [
    "Cả 4 mẫu đều có dạng CẶP: X〜X. Mẹo phân biệt: nhìn VẾ SAU — đề xuất (なり), kết luận chung (であれ), đánh giá (といい), trạng thái khắp nơi (といわず).",
    "なり xuất hiện 3 lần trong khóa: Chương 1 (vừa… là liền), Chương 4 (A なり B なり), Chương 14 (なりに).",
    "であれ còn có dạng đơn ở Chương 10 (たとえ N であれ = dù là…) — cùng gốc である.",
    "Ôn N4–N3: 〜たり〜たり, 〜や〜など, 〜も〜も là nền của nhóm này.",
  ],
  hook: "Một buổi chiều ở vườn: gọi điện HAY nhắn tin cũng được (なり〜なり) · nắng HAY mưa cũng vậy (であれ〜であれ) · màu HAY hương đều đẹp (といい〜といい) · tay HAY mặt đều dính sơn (といわず〜といわず).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với vế sau thường gặp",
      pairs: [
        ["〜なり〜なり", "…してください／したらどう？"],
        ["〜であれ〜であれ", "…に変わりはない（kết luận chung）"],
        ["〜といい〜といい", "…最高だ（đánh giá）"],
        ["〜といわず〜といわず", "…だらけだ（khắp nơi）"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "辞書を引く＿＿＿、ネットで調べる＿＿＿して、自分で答えを見つけなさい。",
      opts: ["なり／なり", "といい／といい", "といわず／といわず", "であれ／であれ"],
      answer: 0,
      explain: "Đưa phương án + mệnh lệnh (見つけなさい) → なり〜なり.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "壁＿＿＿床＿＿＿、部屋中に子供の落書きがある。",
      opts: ["といわず／といわず", "といい／といい", "なり／なり", "であれ／であれ"],
      answer: 0,
      explain: "Tường hay sàn — khắp phòng đều có hình vẽ bậy → といわず〜といわず.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "この服は、デザイン＿＿＿着心地＿＿＿、文句のつけようがない。",
      opts: ["といい／といい", "といわず／といわず", "なり／なり", "であれ／であれ"],
      answer: 0,
      explain: "Hai khía cạnh của chiếc áo → đánh giá \"không chê được\" → といい〜といい.",
    },
    {
      type: "order",
      before: "",
      pieces: ["日本人", "であれ", "外国人", "であれ"],
      after: "、この国の法律を守る義務がある。",
      star: 2,
      vi: "Dù là người Nhật hay người nước ngoài, đều có nghĩa vụ tuân thủ luật pháp nước này.",
      explain: "日本人であれ外国人であれ → nguyên tắc chung.",
    },
    {
      type: "judge",
      q: "子供のころは、夏休みに海なり山なり行った。",
      ok: false,
      explain: "Kể chuyện quá khứ → なり〜なり không dùng.",
      fix: "子供のころは、夏休みに海や山へ行った。",
    },
  ],
};
