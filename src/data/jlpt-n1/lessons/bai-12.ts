import type { N1Lesson } from "../types";

export const bai12: N1Lesson = {
  id: "bai-12",
  num: 12,
  topicJa: "原因・理由",
  topicVi: "Nguyên nhân · lý do",
  chapterJa: "プレゼン当日",
  chapterVi: "Ngày thuyết trình",
  scene:
    "Cuối tháng Mười Một. Ngày Mai thuyết trình trước ban lãnh đạo. Hồi hộp, run rẩy, những lời động viên và cả lời nghiêm khắc — tất cả đều có LÝ DO của nó. Chương này học 5 cách nói \"VÌ…\" với sắc thái khác nhau.",
  story: [
    {
      jp: "社長も出席する[[とあって]]、会議室は朝から張り詰めた空気に包まれていた。",
      vi: "Vì có cả giám đốc tham dự, phòng họp từ sáng đã bao trùm bầu không khí căng thẳng.",
    },
    {
      jp: "手が震えるマイに、健太が小声で言った。「子供[[じゃあるまいし]]、そんな顔するなよ。いつも通りでいいんだ。」マイは思わず笑ってしまった。",
      vi: "Thấy tay Mai run, Kenta nói nhỏ: \"Có phải trẻ con đâu mà mặt mũi thế kia. Cứ như mọi khi là được.\" Mai bất giác bật cười.",
    },
    {
      jp: "健太は昨夜、徹夜で資料の印刷を手伝ってくれた。「みんなの前で『全力で応援する』と言った[[手前]]、何もしないわけにはいかないだろ」と照れくさそうに言いながら。",
      vi: "Đêm qua Kenta đã thức trắng giúp in tài liệu. Vừa ngượng ngùng vừa nói: \"Lỡ tuyên bố trước mặt mọi người là 'sẽ ủng hộ hết mình' rồi, chẳng lẽ lại không làm gì.\"",
    },
    {
      jp: "マイは深呼吸をして話し始めた。「この企画は、ベトナムと日本の両方を知る者である[[がゆえに]]生まれたものです。」",
      vi: "Mai hít một hơi thật sâu rồi bắt đầu: \"Đề xuất này ra đời chính vì tôi là người hiểu cả Việt Nam lẫn Nhật Bản.\"",
    },
    {
      jp: "質疑応答では、部長から一番厳しい質問が飛んだ。終わった後、部長は言った。「厳しく聞いたのは、君に期待していれ[[ばこそ]]だ。よく答えたね。」",
      vi: "Trong phần hỏi đáp, câu hỏi gắt nhất lại đến từ trưởng phòng. Xong buổi, ông nói: \"Chính vì kỳ vọng ở em nên tôi mới hỏi gắt như thế. Em trả lời tốt lắm.\"",
    },
  ],
  patterns: [
    {
      id: "bakoso",
      pattern: "〜ばこそ",
      meaning: "Chính vì… nên mới…",
      nuance:
        "Nhấn mạnh lý do: chính vì A (lý do tích cực, thường bị hiểu lầm) nên mới có B. Hay kết thúc bằng 〜のだ. Thường giải thích động cơ tốt đẹp đằng sau một hành động có vẻ trái ngược.",
      forms: ["Vば + こそ", "Aければ + こそ", "Aな／N + であれば + こそ"],
      position: {
        before: "Lý do (thường là tình cảm, giá trị tích cực)",
        after: "Kết quả (thường kết thúc bằng 〜のだ／〜のです)",
      },
      register: "Văn viết & nói · nhấn mạnh",
      usage: [
        "Vế sau thường có のだ／んです.",
        "Lý do thường là tích cực, ngược với vẻ ngoài của hành động (nghiêm khắc vì thương…).",
      ],
      examples: [
        {
          jp: "心身ともに健康であれ[[ばこそ]]、大きな仕事に挑戦できるのだ。",
          vi: "Chính vì khỏe mạnh cả thể chất lẫn tinh thần nên mới có thể thử thách những công việc lớn.",
        },
        {
          jp: "愛していれ[[ばこそ]]、別れるのです。私の気持ち、分かってください。",
          vi: "Chính vì yêu nên mới chia tay. Xin hãy hiểu cho lòng em.",
        },
        {
          jp: "あなたのことを思え[[ばこそ]]、厳しいことを言うのだ。",
          vi: "Chính vì nghĩ cho con nên mới nói lời nghiêm khắc.",
        },
      ],
      dos: ["Giải thích động cơ tốt đằng sau hành động: nghiêm khắc vì thương, chia tay vì yêu."],
      donts: [
        {
          text: "Lý do bình thường, không cần nhấn mạnh động cơ → không tự nhiên.",
          bad: "雨が降ればこそ、試合が中止になったのだ。",
          good: "雨が降ったため、試合が中止になった。",
        },
      ],
      compare: [
        {
          other: "〜からこそ (N2)",
          diff: "Cùng nghĩa \"chính vì\". からこそ thông dụng; ばこそ văn viết, cảm xúc hơn.",
          ex: { jp: "信じている[[からこそ]]、任せたのだ。", vi: "Chính vì tin nên mới giao phó." },
        },
      ],
      memo: "ば (nếu) + こそ (chính) = \"CHÍNH VÌ có điều đó\" 💗. Trưởng phòng: 君に期待していればこそだ.",
      storyLine: "厳しく聞いたのは、君に期待していれ[[ばこそ]]だ。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "家族が健康で＿＿＿、安心して仕事ができるのだ。",
          opts: ["あればこそ", "あるばこそ", "あったばこそ", "あれこそば"],
          answer: 0,
          explain: "N/Aな + であれば + こそ: 健康であればこそ.",
        },
        {
          type: "judge",
          q: "子供の将来を思えばこそ、親は厳しくするのです。",
          ok: true,
          explain: "Lý do tích cực (nghĩ cho tương lai con) → hành động có vẻ trái ngược (nghiêm khắc) + のです → đúng.",
        },
      ],
    },
    {
      id: "toatte",
      pattern: "〜とあって",
      meaning: "Vì là (dịp/tình huống đặc biệt) nên (đương nhiên)…",
      nuance:
        "Vì tình huống đặc biệt khác thường A, nên kết quả B cũng đặc biệt như dự đoán. Người nói quan sát và mô tả — không dùng cho bản thân.",
      forms: ["N／Vthể thường + とあって"],
      position: {
        before: "Tình huống đặc biệt (久しぶりの連休・社長が来る・初めての主役)",
        after: "Kết quả đương nhiên quan sát được (込んでいる・緊張している)",
      },
      register: "Văn viết · tin tức, phóng sự",
      usage: [
        "Hay dùng trong tin tức: 〜とあって、会場は大勢の人でにぎわった.",
        "Không dùng cho ý chí của người nói.",
      ],
      examples: [
        {
          jp: "久しぶりに晴れた連休[[とあって]]、行楽地はどこも人でいっぱいだった。",
          vi: "Vì là kỳ nghỉ dài trời đẹp hiếm hoi, khu vui chơi nào cũng chật kín người.",
        },
        {
          jp: "その女優は初めて映画の主役を務める[[とあって]]、とても緊張している様子だ。",
          vi: "Vì lần đầu đóng vai chính trong phim, nữ diễn viên ấy trông rất căng thẳng.",
        },
        {
          jp: "人気歌手が来る[[とあって]]、会場の前には朝から長い列ができた。",
          vi: "Vì ca sĩ nổi tiếng đến, trước hội trường từ sáng đã có hàng dài.",
        },
      ],
      dos: ["Phóng sự, mô tả: dịp đặc biệt → cảnh tượng đặc biệt."],
      donts: [
        {
          text: "Chủ ngữ là người nói / vế sau là ý chí → không dùng.",
          bad: "明日は休みとあって、私は遊びに行くつもりだ。",
          good: "明日は休みなので、遊びに行くつもりだ。",
        },
      ],
      compare: [
        {
          other: "〜とあれば (Chương 9)",
          diff: "とあれば: NẾU là… thì (điều kiện, ý chí). とあって: VÌ là… nên (sự thật, quan sát).",
        },
        {
          other: "〜だけあって (N2)",
          diff: "だけあって: \"quả xứng đáng là\" (khen). とあって: \"vì là dịp đặc biệt\" (giải thích hiện tượng).",
        },
      ],
      memo: "とあって ≈ \"vì CÓ chuyện ấy\" 📸 — giọng phóng viên đứng trước đám đông. 社長も出席するとあって、会議室は張り詰めていた.",
      storyLine: "社長も出席する[[とあって]]、会議室は朝から張り詰めた空気に包まれていた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "年に一度の花火大会＿＿＿、川沿いは見物客であふれていた。",
          opts: ["とあって", "とあれば", "ばこそ", "手前"],
          answer: 0,
          explain: "Dịp đặc biệt (một năm một lần) → cảnh tượng quan sát được → とあって.",
        },
        {
          type: "choice",
          label: "Phân biệt",
          q: "A: 社長の命令＿＿、従うしかない。 B: 年末＿＿、デパートは混雑している。",
          opts: ["A: とあれば／B: とあって", "A: とあって／B: とあれば", "A: とあって／B: とあって", "A: とあれば／B: とあれば"],
          answer: 0,
          explain: "A: điều kiện + ý chí (phải theo) → とあれば. B: sự thật quan sát → とあって.",
        },
      ],
    },
    {
      id: "dewa-arumaishi",
      pattern: "〜ではあるまいし",
      variants: ["〜じゃあるまいし"],
      meaning: "Có phải là… đâu mà…",
      nuance:
        "Vì KHÔNG phải là N nên đừng/không cần làm thế. Vế sau là lời phê bình, khuyên nhủ, phán đoán của người nói. Khẩu ngữ (じゃあるまいし) dùng nhiều.",
      forms: ["N + ではあるまいし／じゃあるまいし", "V + わけではあるまいし"],
      position: {
        before: "Thứ mà đối tượng rõ ràng KHÔNG phải (子供・神様・初めて)",
        after: "Lời khuyên / phê bình (〜な・〜ことはない・〜はずだ)",
      },
      register: "Văn nói · thân mật, có phần trách móc",
      usage: [
        "Vế sau thường là mệnh lệnh phủ định, lời khuyên, nhận định.",
        "Không dùng với cấp trên (nghe như mỉa mai).",
      ],
      examples: [
        {
          jp: "子供[[ではあるまいし]]、眠いくらいでそんなに不機嫌な顔をするものではない。",
          vi: "Có phải trẻ con đâu, chỉ vì buồn ngủ mà mặt mày khó chịu thế thì không nên.",
        },
        {
          jp: "あなたが悪かったわけ[[ではあるまいし]]、そんなに自分を責めることはないよ。",
          vi: "Có phải lỗi của cậu đâu, đừng tự trách mình như thế.",
        },
        {
          jp: "神様[[じゃあるまいし]]、明日のことなんて分かるわけがない。",
          vi: "Có phải thần thánh đâu mà biết được chuyện ngày mai.",
        },
      ],
      dos: ["Trêu, khuyên bạn bè, người thân: \"có phải… đâu mà…\"."],
      donts: [
        {
          text: "Nói với cấp trên → thất lễ.",
          bad: "部長、子供じゃあるまいし、自分でやってください。",
          good: "（Không nên nói với cấp trên.）",
        },
      ],
      compare: [
        {
          other: "〜ならいざしらず (Chương 5)",
          diff: "ならいざしらず: \"(ngoại lệ) thì còn được, chứ…\" — văn hơn. ではあるまいし: \"có phải… đâu\" — khẩu ngữ, khuyên trực tiếp.",
        },
        {
          other: "〜わけではない (N3)",
          diff: "わけではない: phủ định một phần, trung tính. ではあるまいし: dùng phủ định đó để phê bình/khuyên.",
        },
      ],
      memo: "ある + まい (phủ định cổ) + し (lý do) = \"có PHẢI đâu mà…\" 👶❌. Kenta: 子供じゃあるまいし、そんな顔するなよ.",
      storyLine: "子供[[じゃあるまいし]]、そんな顔するなよ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "一生会えないわけ＿＿＿、そんなに泣かないでよ。",
          opts: ["じゃあるまいし", "とあって", "ばこそ", "手前"],
          answer: 0,
          explain: "Có phải không bao giờ gặp lại đâu mà khóc thế → わけじゃあるまいし.",
        },
        {
          type: "order",
          before: "",
          pieces: ["初めて", "の", "旅行", "ではあるまいし"],
          after: "、そんなに荷物はいらないでしょう。",
          star: 2,
          vi: "Có phải đi du lịch lần đầu đâu, đâu cần nhiều hành lý thế.",
          explain: "初めての旅行ではあるまいし、…",
        },
      ],
    },
    {
      id: "temae",
      pattern: "〜手前",
      meaning: "Vì (đã lỡ…/trước mặt…) nên (phải giữ thể diện)…",
      nuance:
        "Vì đã nói/làm A (hoặc vì đứng trước mặt ai đó), để giữ thể diện thì không thể không làm B. Vế sau hay là 〜わけにはいかない, 〜なければならない, 〜ざるをえない.",
      forms: ["V辞書形／Vた／Vている + 手前", "N + の + 手前"],
      position: {
        before: "Lời đã nói / hành động đã làm / người đang nhìn (約束した・子供の)",
        after: "Nghĩa vụ giữ thể diện: わけにはいかない・なければならない",
      },
      register: "Văn nói & viết",
      usage: [
        "Chủ thể thường là người nói.",
        "N の手前: \"trước mặt N (nên phải…)\" — 子供の手前, 客の手前.",
      ],
      examples: [
        {
          jp: "五月末までに問題を解決すると約束した[[手前]]、どうしても頑張らなければならない。",
          vi: "Vì đã hứa sẽ giải quyết vấn đề trước cuối tháng Năm, nên bằng mọi giá phải cố gắng.",
        },
        {
          jp: "いつも手伝ってもらっている[[手前]]、今回はこちらから手伝いを申し出なければ。",
          vi: "Vì lúc nào cũng được giúp, nên lần này mình phải chủ động đề nghị giúp lại.",
        },
        {
          jp: "子供の[[手前]]、親がルールを破るわけにはいかない。",
          vi: "Trước mặt con cái, bố mẹ không thể phá luật được.",
        },
      ],
      dos: ["Giải thích hành động vì thể diện, vì lời đã nói ra."],
      donts: [
        {
          text: "Không có yếu tố thể diện / người nhìn → không tự nhiên.",
          bad: "お腹が空いた手前、ご飯を食べた。",
          good: "お腹が空いたので、ご飯を食べた。",
        },
      ],
      compare: [
        {
          other: "〜以上（は）(N2)",
          diff: "以上は: \"một khi đã… thì phải\" (trách nhiệm logic). 手前: nhấn mạnh THỂ DIỆN trước người khác.",
        },
        {
          other: "〜からには (N2)",
          diff: "からには: quyết tâm (đã làm thì làm đến cùng). 手前: sợ mất mặt.",
        },
      ],
      memo: "手前 = \"phía trước tay mình\" → đứng TRƯỚC mặt mọi người rồi thì phải giữ lời 😅. Kenta: 『全力で応援する』と言った手前…",
      storyLine: "みんなの前で『全力で応援する』と言った[[手前]]、何もしないわけにはいかないだろ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "「絶対に合格する」と宣言した＿＿＿、今さら試験を受けないわけにはいかない。",
          opts: ["手前", "とあって", "ばこそ", "ゆえ"],
          answer: 0,
          explain: "Đã tuyên bố rồi → giữ thể diện → không thể không thi → 手前.",
        },
        {
          type: "judge",
          q: "部下の手前、課長は自分のミスを認めざるを得なかった。",
          ok: true,
          explain: "Trước mặt cấp dưới (thể diện) → buộc phải thừa nhận → đúng.",
        },
      ],
    },
    {
      id: "yue",
      pattern: "〜ゆえ（に）",
      variants: ["〜がゆえ（に）", "〜ゆえの N"],
      meaning: "Vì… (văn viết, trang trọng)",
      nuance:
        "Chỉ nguyên nhân, lý do theo lối văn viết cổ, trang trọng. Dùng trong thư từ, văn bản, bài luận.",
      forms: ["N（の）+ ゆえ（に）", "Vthể thường + (が)ゆえ（に）", "Aな-な／である + (が)ゆえ（に）", "N + ゆえの + N"],
      position: {
        before: "Nguyên nhân",
        after: "Kết quả",
      },
      register: "Văn viết cổ · rất trang trọng",
      usage: [
        "Dạng がゆえに nhấn mạnh hơn.",
        "N ゆえの N: \"(cái) do… mà có\" — 若さゆえの過ち (sai lầm do tuổi trẻ).",
      ],
      examples: [
        {
          jp: "慣れないこと[[ゆえ]]、不手際も多いかと存じますが、どうぞお許しください。",
          vi: "Vì là việc chưa quen nên có lẽ còn nhiều sơ suất, mong quý vị thứ lỗi.",
        },
        {
          jp: "若さ[[ゆえの]]過ちは、誰にでもあるものだ。",
          vi: "Sai lầm do tuổi trẻ thì ai cũng từng có.",
        },
        {
          jp: "彼は正直である[[がゆえに]]、損をすることも多い。",
          vi: "Chính vì quá thật thà mà anh ấy cũng hay chịu thiệt.",
        },
      ],
      dos: ["Phát biểu, thư trang trọng, bài luận."],
      donts: [
        {
          text: "Hội thoại đời thường → quá cổ, cứng.",
          bad: "お腹が空いたゆえ、ラーメン食べに行こう。",
          good: "お腹が空いたから、ラーメン食べに行こう。",
        },
      ],
      compare: [
        {
          other: "〜ため（に）(N3)",
          diff: "ため: trang trọng vừa, phổ biến trong văn viết. ゆえ: cổ, trang trọng hơn nữa.",
        },
      ],
      memo: "ゆえ (故) ≈ \"cố\" trong \"duyên cố\" (lý do) 📜 — giọng văn cổ. Mai: 両方を知る者であるがゆえに生まれた企画.",
      storyLine: "この企画は、ベトナムと日本の両方を知る者である[[がゆえに]]生まれたものです。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "経験不足＿＿＿判断ミスでした。申し訳ございません。",
          opts: ["ゆえの", "ゆえに", "手前の", "とあっての"],
          answer: 0,
          explain: "Trước danh từ (判断ミス) → ゆえの.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "美しいがゆえに、彼女は多くの苦労をした。",
          opts: [
            "Chính vì xinh đẹp mà cô ấy đã chịu nhiều vất vả.",
            "Dù xinh đẹp nhưng cô ấy không vất vả.",
            "Cô ấy vất vả để trở nên xinh đẹp.",
            "Cô ấy xinh đẹp như thể chưa từng vất vả.",
          ],
          answer: 0,
          explain: "がゆえに = chính vì.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Sắc thái", "Vế sau"],
    rows: [
      ["〜ばこそ", "Chính vì… nên mới", "Nhấn mạnh động cơ tốt", "〜のだ"],
      ["〜とあって", "Vì là dịp đặc biệt", "Quan sát, tin tức", "Kết quả đương nhiên"],
      ["〜ではあるまいし", "Có phải… đâu mà", "Khẩu ngữ, trách nhẹ", "Lời khuyên, phê bình"],
      ["〜手前", "Vì thể diện", "Giữ lời, giữ mặt", "わけにはいかない"],
      ["〜ゆえ（に）", "Vì (văn cổ)", "Rất trang trọng", "Kết quả"],
    ],
  },
  links: [
    "Ôn N3–N2: から・ので・ため・からこそ・だけに. N1 thêm sắc thái: động cơ (ばこそ), phóng sự (とあって), trách nhẹ (ではあるまいし), thể diện (手前), cổ văn (ゆえ).",
    "とあって (vì, Chương 12) ↔ とあれば (nếu, Chương 9). Cặp bẫy kinh điển!",
    "ではあるまいし ↔ ならいざしらず (Chương 5): cùng ý \"có phải X đâu\".",
    "手前 dùng với 〜わけにはいかない, 〜ざるをえない — ôn N2 song song.",
  ],
  hook: "Ngày thuyết trình: vì có giám đốc nên căng thẳng (とあって) · có phải trẻ con đâu (ではあるまいし) · đã lỡ hứa nên phải giúp (手前) · vì hiểu cả hai nước nên có ý tưởng (ゆえに) · hỏi gắt CHÍNH VÌ kỳ vọng (ばこそ).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜ばこそ", "Chính vì… nên mới…"],
        ["〜とあって", "Vì là dịp đặc biệt nên…"],
        ["〜ではあるまいし", "Có phải… đâu mà…"],
        ["〜手前", "Vì thể diện / đã lỡ nói"],
        ["〜ゆえに", "Vì (văn viết cổ)"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "新製品の発売日＿＿＿、店の前には開店前から長い行列ができていた。",
      opts: ["とあって", "とあれば", "手前", "ではあるまいし"],
      answer: 0,
      explain: "Ngày ra mắt sản phẩm (dịp đặc biệt) → cảnh tượng quan sát → とあって.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "部下に「残業するな」と言っている＿＿＿、自分が遅くまで残るわけにはいかない。",
      opts: ["手前", "ばこそ", "ゆえ", "とあって"],
      answer: 0,
      explain: "Đã nói với cấp dưới → giữ thể diện → 手前.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "プロの選手＿＿＿、そんなに完璧を求めなくてもいいよ。",
      opts: ["じゃあるまいし", "とあって", "ばこそ", "ゆえに"],
      answer: 0,
      explain: "Có phải vận động viên chuyên nghiệp đâu → じゃあるまいし + lời khuyên.",
    },
    {
      type: "order",
      before: "",
      pieces: ["君を", "信頼して", "いればこそ", "この"],
      after: "仕事を任せるのだ。",
      star: 3,
      vi: "Chính vì tin tưởng cậu nên tôi mới giao việc này.",
      explain: "君を信頼していればこそ、この仕事を任せるのだ.",
    },
    {
      type: "judge",
      q: "明日は日曜日とあって、私は早く寝るつもりだ。",
      ok: false,
      explain: "とあって không dùng cho ý chí của bản thân người nói.",
      fix: "明日は日曜日なので、早く寝るつもりだ。",
    },
  ],
};
