import type { N1Lesson } from "../types";

export const bai09: N1Lesson = {
  id: "bai-09",
  num: 9,
  topicJa: "条件",
  topicVi: "Điều kiện",
  chapterJa: "打ち上げの夜",
  chapterVi: "Đêm liên hoan",
  scene:
    "Tháng Mười. Cả phòng đi liên hoan mừng đơn hàng lớn. Giữa tiếng karaoke, mỗi người nói một câu \"NẾU…\" — và Mai quyết định một việc quan trọng. Chương này học 5 sắc thái của ĐIỀU KIỆN.",
  story: [
    {
      jp: "乾杯のあと、田中部長が言った。「お客様のため[[とあれば]]、北海道でも沖縄でも飛んでいく。それが営業というものだ。」",
      vi: "Sau khi cụng ly, trưởng phòng Tanaka nói: \"Nếu là vì khách hàng thì Hokkaido hay Okinawa tôi cũng bay tới. Kinh doanh là như vậy.\"",
    },
    {
      jp: "二次会はカラオケだった。健太はマイクを握っ[[たら最後]]、朝まで離さない。みんなは苦笑いしながら手拍子をした。",
      vi: "Tăng hai là karaoke. Kenta mà đã cầm micro thì đến sáng cũng không buông. Mọi người vừa cười trừ vừa vỗ tay theo nhịp.",
    },
    {
      jp: "部屋の隅で、佐藤先輩がマイに聞いた。「社内の新商品コンテスト、出さないの？」「まだ自信がなくて…」「失敗を怖がる[[ようでは]]、いつまでも成長できないよ。」",
      vi: "Ở góc phòng, chị Satō hỏi Mai: \"Cuộc thi ý tưởng sản phẩm mới trong công ty, em không nộp à?\" \"Em vẫn chưa tự tin lắm…\" \"Cứ sợ thất bại như thế thì mãi không trưởng thành được đâu.\"",
    },
    {
      jp: "帰り際、部長がしみじみと言った。「今回の成功は、みんなのチームワーク[[なしには]]あり得なかった。ありがとう。」",
      vi: "Lúc ra về, trưởng phòng trầm ngâm nói: \"Thành công lần này, nếu không có tinh thần đồng đội của mọi người thì đã không thể có. Cảm ơn các bạn.\"",
    },
    {
      jp: "家に帰ったマイは、ノートを開いた。「やらずに後悔する[[くらいなら]]、やって失敗したほうがいい。」その夜、マイは企画書を書き始めた。",
      vi: "Về đến nhà, Mai mở sổ ra: \"Thà làm rồi thất bại còn hơn không làm rồi hối hận.\" Đêm đó, Mai bắt đầu viết bản đề xuất.",
    },
  ],
  patterns: [
    {
      id: "toareba",
      pattern: "〜とあれば",
      meaning: "Nếu là (vì)… thì (sẵn sàng / đương nhiên)…",
      nuance:
        "Nếu điều kiện đặc biệt A được đưa ra thì sẽ có hành động/trạng thái tương ứng. Thường: \"vì A thì chuyện gì cũng làm\" hoặc \"nếu là A thì đương nhiên…\".",
      forms: ["N／Vthể thường + とあれば", "N + のためとあれば"],
      position: {
        before: "Điều kiện đặc biệt: 子供のため・社長の命令・必要",
        after: "Phán đoán, ý chí, quyết tâm của người nói (どんなことでも〜)",
      },
      register: "Văn viết & nói · trang trọng vừa",
      usage: [
        "Hay gặp: 〜のためとあれば, 必要とあれば, 〜の頼みとあれば.",
        "Vế sau thường thể hiện sự sẵn sàng làm bất cứ điều gì.",
      ],
      examples: [
        {
          jp: "子供のため[[とあれば]]、私はどんなことでも我慢しますよ。",
          vi: "Nếu là vì con thì tôi chịu đựng được mọi thứ.",
        },
        {
          jp: "小さい島での一人暮らし[[とあれば]]、不自由なことも多いだろう。",
          vi: "Nếu là sống một mình trên đảo nhỏ thì chắc cũng nhiều bất tiện.",
        },
        {
          jp: "必要[[とあれば]]、いつでも説明に伺います。",
          vi: "Nếu cần thiết, tôi sẵn sàng đến giải thích bất cứ lúc nào.",
        },
      ],
      dos: ["Thể hiện sự sẵn lòng vì một lý do đặc biệt; phán đoán \"trường hợp đặc biệt thì đương nhiên…\"."],
      donts: [
        {
          text: "Điều kiện bình thường, mang tính giả định đơn thuần → dùng なら／ば.",
          bad: "明日雨とあれば、傘を持っていこう。",
          good: "明日雨なら、傘を持っていこう。",
        },
      ],
      compare: [
        {
          other: "〜とあって (Chương 12)",
          diff: "とあって: \"VÌ là (dịp đặc biệt) nên…\" — nguyên nhân, sự thật. とあれば: \"NẾU là… thì\" — điều kiện.",
        },
        {
          other: "〜なら (N4)",
          diff: "なら trung tính. とあれば nhấn mạnh điều kiện ĐẶC BIỆT khiến người ta sẵn sàng hành động.",
        },
      ],
      memo: "と + あれ + ば = \"nếu đã CÓ lý do đó\" ✈️. Trưởng phòng: お客様のためとあれば、どこへでも飛んでいく.",
      storyLine: "お客様のため[[とあれば]]、北海道でも沖縄でも飛んでいく。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "大好きな歌手のコンサート＿＿＿、どんなに遠くても行きます。",
          opts: ["とあれば", "とあって", "たら最後", "くらいなら"],
          answer: 0,
          explain: "Nếu là concert của ca sĩ yêu thích thì xa mấy cũng đi → とあれば.",
        },
        {
          type: "judge",
          q: "社長の命令とあれば、従わないわけにはいかない。",
          ok: true,
          explain: "Điều kiện đặc biệt (lệnh của giám đốc) → không thể không theo → đúng.",
        },
      ],
    },
    {
      id: "tara-saigo",
      pattern: "〜たら最後",
      variants: ["〜たが最後"],
      meaning: "Một khi đã… thì (chắc chắn hậu quả tồi tệ / không dừng được)",
      nuance:
        "Nếu việc A xảy ra thì chắc chắn sẽ dẫn đến tình trạng tệ hại, không thể cứu vãn. Dùng cho thói quen xấu đã biết hoặc giả định.",
      forms: ["Vた + ら最後", "Vた + が最後"],
      position: {
        before: "Hành động khởi đầu (飲み始める・見つかる・渡す)",
        after: "Hậu quả xấu, không dừng lại được (〜まで…・終わりだ・わからない)",
      },
      register: "Văn nói & viết · cảm xúc mạnh",
      usage: [
        "Vế sau là kết quả tồi tệ, thường ở thể hiện tại (thói quen) hoặc phỏng đoán.",
        "たが最後 văn viết hơn.",
      ],
      examples: [
        {
          jp: "兄は大酒飲みだから、飲み始め[[たら最後]]、酔いつぶれるまで飲んでしまう。",
          vi: "Anh tôi là bợm rượu, một khi đã bắt đầu uống là uống đến say mềm.",
        },
        {
          jp: "彼にお金を持たせ[[たら最後]]、何に使われるかわからない。",
          vi: "Một khi đã để anh ta giữ tiền thì không biết sẽ bị tiêu vào việc gì.",
        },
        {
          jp: "この秘密を知られ[[たが最後]]、もう会社にはいられない。",
          vi: "Một khi bí mật này bị lộ thì tôi không thể ở lại công ty nữa.",
        },
      ],
      dos: ["Cảnh báo, than phiền về chuyện \"đã bắt đầu là không dừng được\"."],
      donts: [
        {
          text: "Kết quả tốt → không dùng.",
          bad: "この薬を飲んだら最後、すぐに元気になる。",
          good: "この薬を飲めば、すぐに元気になる。",
        },
      ],
      compare: [
        {
          other: "〜たら (N4)",
          diff: "たら trung tính. たら最後 = \"đã… là HẾT đường quay lại\", luôn kết quả xấu.",
        },
        {
          other: "〜が早いか (Chương 1)",
          diff: "が早いか: kể tốc độ (vừa A là B). たら最後: nhấn mạnh hậu quả không thể dừng.",
        },
      ],
      memo: "最後 = \"cuối cùng\" → bước qua A là đến hồi KẾT 🎤🔚. Kenta cầm micro là hát đến sáng: マイクを握ったら最後.",
      storyLine: "健太はマイクを握っ[[たら最後]]、朝まで離さない。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "このゲームは一度始め＿＿＿、やめられなくなる。",
          opts: ["たら最後", "とあれば", "ようでは", "くらいなら"],
          answer: 0,
          explain: "Một khi đã bắt đầu là không dừng được → たら最後.",
        },
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "あの人に話＿＿＿、次の日には会社中に広まってしまう。",
          opts: ["したが最後", "するが最後", "したら最後に", "して最後"],
          answer: 0,
          explain: "Vた + が最後: 話した → 話したが最後.",
        },
      ],
    },
    {
      id: "youdewa",
      pattern: "〜ようでは",
      meaning: "Nếu cứ (như thế) thì… (kết quả không tốt)",
      nuance:
        "Với thái độ/tình trạng không tốt như vậy thì kết quả chắc chắn cũng không tốt. Thường dùng để phê bình, khuyên răn.",
      forms: ["Vthể thường + ようでは", "Aな-な／N-の + ようでは"],
      position: {
        before: "Tình trạng/thái độ không như mong đợi (遅刻する・忘れる・怖がる)",
        after: "Dự đoán kết quả xấu (〜できない・困る・心配だ)",
      },
      register: "Văn nói & viết · phê bình, khuyên",
      usage: [
        "Vế sau thường là phủ định hoặc đánh giá tiêu cực.",
        "Có thể dùng tự phê bình bản thân.",
      ],
      examples: [
        {
          jp: "小さな失敗をいちいち気にする[[ようでは]]、この会社ではやっていけないよ。",
          vi: "Nếu cứ để ý từng lỗi nhỏ như thế thì không trụ nổi ở công ty này đâu.",
        },
        {
          jp: "こんなにすぐ忘れる[[ようでは]]、この先が心配だ。",
          vi: "Nếu cứ quên nhanh thế này thì tương lai thật đáng lo.",
        },
        {
          jp: "この程度の問題が解けない[[ようでは]]、合格は難しいだろう。",
          vi: "Nếu bài cỡ này mà không giải được thì khó đỗ lắm.",
        },
      ],
      dos: ["Khuyên răn, phê bình: \"cứ thế này thì không ổn\"."],
      donts: [
        {
          text: "Vế sau là kết quả tốt → không dùng.",
          bad: "毎日練習するようでは、きっと上手になる。",
          good: "毎日練習すれば、きっと上手になる。",
        },
      ],
      compare: [
        {
          other: "〜ては (N3)",
          diff: "ては: \"nếu… thì (không tốt)\" khá trung tính. ようでは: thêm sắc thái \"với tình trạng/thái độ như thế\" → phê bình rõ hơn.",
        },
        {
          other: "〜くらいなら",
          diff: "くらいなら: so sánh với phương án tốt hơn (thà…). ようでは: chỉ dự đoán kết quả xấu.",
        },
      ],
      memo: "よう (様) = \"kiểu, dạng như\" → \"với cái kiểu này thì…\" 🙅. Chị Satō: 失敗を怖がるようでは、いつまでも成長できない.",
      storyLine: "失敗を怖がる[[ようでは]]、いつまでも成長できないよ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "約束の時間に毎回遅れる＿＿＿、信用してもらえないよ。",
          opts: ["ようでは", "とあれば", "たら最後", "なしには"],
          answer: 0,
          explain: "Thái độ xấu (lần nào cũng trễ) → kết quả xấu (không được tin) → ようでは.",
        },
        {
          type: "order",
          before: "",
          pieces: ["こんな", "簡単な", "漢字が", "読めないようでは"],
          after: "、N1合格は無理だ。",
          star: 2,
          vi: "Nếu chữ Hán đơn giản thế này mà không đọc được thì không đỗ N1 nổi.",
          explain: "こんな簡単な漢字が読めないようでは、…無理だ.",
        },
      ],
    },
    {
      id: "nashiniwa",
      pattern: "〜なしには／〜なくしては",
      variants: ["〜なしでは", "〜なくして（は）"],
      meaning: "Nếu không có… thì không thể…",
      nuance:
        "A là điều KIỆN TUYỆT ĐỐI cần thiết: không có A thì B không thể thực hiện. Vế sau thường phủ định (〜ない, あり得ない, 語れない).",
      forms: ["N + なしには／なしでは", "N + なくして（は）", "V辞書形 + こと + なしには"],
      position: {
        before: "Điều không thể thiếu: 努力・協力・資金・あなた",
        after: "Phủ định: 〜できない・あり得ない・語れない",
      },
      register: "Văn viết · trang trọng (なくしては cứng nhất)",
      usage: [
        "Vế sau là phủ định khả năng.",
        "Cụm hay gặp: 〜なしには語れない (không thể nói về… mà không nhắc đến).",
      ],
      examples: [
        {
          jp: "資金を確保すること[[なしには]]、どんな計画も実行できない。",
          vi: "Không đảm bảo được vốn thì kế hoạch nào cũng không thực hiện được.",
        },
        {
          jp: "祖母はもう高齢で、周りの人の助け[[なしでは]]暮らせない。",
          vi: "Bà tôi đã cao tuổi, không có sự giúp đỡ của mọi người xung quanh thì không sống được.",
        },
        {
          jp: "国民の理解[[なくしては]]、改革は成功しない。",
          vi: "Không có sự thấu hiểu của người dân thì cải cách không thể thành công.",
        },
      ],
      dos: ["Nhấn mạnh vai trò không thể thiếu của một điều gì đó: lời cảm ơn, phát biểu, lập luận."],
      donts: [
        {
          text: "Vế sau khẳng định, không có ý \"không thể\" → không tự nhiên.",
          bad: "砂糖なしには、コーヒーを飲む。",
          good: "砂糖なしで、コーヒーを飲む。",
        },
      ],
      compare: [
        {
          other: "〜なしで (N3)",
          diff: "なしで: \"không có… mà vẫn (làm)\" — trung tính. なしには／なくしては: \"không có… thì KHÔNG THỂ\".",
        },
        {
          other: "〜あっての (Chương 17)",
          diff: "Hai mặt của một đồng xu: あっての = \"nhờ có A mới có B\"; なしには = \"không có A thì không có B\".",
        },
      ],
      memo: "なし = \"không có\" ❌ → \"không có viên gạch này thì cả bức tường sụp\" 🧱. Trưởng phòng: チームワークなしにはあり得なかった.",
      storyLine: "今回の成功は、みんなのチームワーク[[なしには]]あり得なかった。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "このプロジェクトの成功は、現地スタッフの協力＿＿＿考えられない。",
          opts: ["なしには", "とあれば", "ようでは", "たら最後"],
          answer: 0,
          explain: "Không có sự hợp tác thì không thể nghĩ đến thành công → なしには.",
        },
        {
          type: "judge",
          q: "日本の食文化は、米なくしては語れない。",
          ok: true,
          explain: "なくしては + 語れない (không thể nói về… mà không nhắc đến) → đúng.",
        },
      ],
    },
    {
      id: "kurainara",
      pattern: "〜くらいなら",
      variants: ["〜ぐらいなら"],
      meaning: "Nếu phải… thì thà… còn hơn",
      nuance:
        "A là điều người nói rất ghét / cho là tồi tệ. So với việc phải làm A, thì làm B (cũng không lý tưởng) vẫn tốt hơn.",
      forms: ["V辞書形 + くらいなら／ぐらいなら"],
      position: {
        before: "Việc tồi tệ mà người nói ghét",
        after: "Phương án khác tốt hơn: 〜ほうがいい・〜ほうがましだ・〜ろ",
      },
      register: "Văn nói & viết · ý kiến mạnh",
      usage: [
        "Vế sau hay là 〜ほうがいい／ほうがましだ／〜（命令形）.",
        "Thể hiện ý chí, đánh giá chủ quan rõ ràng.",
      ],
      examples: [
        {
          jp: "満員のバスに乗る[[くらいなら]]、駅まで二十五分歩くほうがいい。",
          vi: "Nếu phải đi xe buýt chật cứng thì thà đi bộ 25 phút ra ga còn hơn.",
        },
        {
          jp: "その服、捨てるんですか。捨てる[[くらいなら]]、私にください。",
          vi: "Cái áo đó bỏ à? Nếu bỏ thì thà cho tôi đi.",
        },
        {
          jp: "途中でやめる[[くらいなら]]、最初からやらないほうがましだ。",
          vi: "Nếu bỏ giữa chừng thì thà đừng làm ngay từ đầu.",
        },
      ],
      dos: ["Bày tỏ lựa chọn mạnh mẽ: \"thà… còn hơn…\"."],
      donts: [
        {
          text: "Vế trước là điều tốt đẹp → mâu thuẫn.",
          bad: "旅行に行けるくらいなら、家で寝ていたい。",
          good: "混んでいる観光地に行くくらいなら、家で寝ていたい。",
        },
      ],
      compare: [
        {
          other: "〜より（むしろ）(N3)",
          diff: "より: so sánh trung tính. くらいなら: nhấn mạnh A tồi tệ đến mức B vẫn hơn.",
        },
        {
          other: "〜ようでは",
          diff: "ようでは chỉ cảnh báo kết quả xấu; くらいなら đưa ra phương án thay thế.",
        },
      ],
      memo: "くらい = \"mức độ\": \"đến mức phải làm A thì…\" 😤 → thà B. Mai: やらずに後悔するくらいなら、やって失敗したほうがいい.",
      storyLine: "やらずに後悔する[[くらいなら]]、やって失敗したほうがいい。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "あんな人に頭を下げる＿＿＿、会社を辞めたほうがましだ。",
          opts: ["くらいなら", "とあれば", "なしには", "ようでは"],
          answer: 0,
          explain: "Ghét cúi đầu trước người đó đến mức thà nghỉ việc → くらいなら.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "嘘をつくくらいなら、黙っていたほうがいい。",
          opts: [
            "Nếu phải nói dối thì thà im lặng còn hơn.",
            "Nói dối một chút thì vẫn tốt hơn im lặng.",
            "Vì đã nói dối nên phải im lặng.",
            "Im lặng cũng là một kiểu nói dối.",
          ],
          answer: 0,
          explain: "くらいなら = nếu phải (A tồi tệ) thì thà (B).",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Vế sau", "Sắc thái"],
    rows: [
      ["〜とあれば", "Nếu là (vì)… thì", "Sẵn sàng / đương nhiên", "Điều kiện đặc biệt"],
      ["〜たら最後", "Một khi đã… là hết", "Hậu quả tồi tệ", "Không dừng được"],
      ["〜ようでは", "Nếu cứ như thế thì", "Kết quả xấu (phủ định)", "Phê bình, khuyên"],
      ["〜なしには", "Không có… thì không thể", "Phủ định khả năng", "Điều kiện tuyệt đối"],
      ["〜くらいなら", "Nếu phải… thì thà", "ほうがいい／ましだ", "Lựa chọn mạnh"],
    ],
  },
  links: [
    "Ôn N4–N2: ば・たら・なら・ては. N1 mỗi mẫu gắn thêm một CẢM XÚC: sẵn lòng (とあれば), sợ hãi (たら最後), phê bình (ようでは), tuyệt đối (なしには), thà (くらいなら).",
    "とあれば (điều kiện) ≠ とあって (Chương 12, nguyên nhân). Chữ れば = nếu; って = vì.",
    "なしには ↔ あっての (Chương 17): \"không có A thì không B\" ↔ \"có A mới có B\".",
    "Chương 10 tiếp nối: điều kiện NGHỊCH (dù… thì cũng): ようと, たところで, ば〜で.",
  ],
  hook: "Đêm liên hoan: vì khách hàng thì đi đâu cũng được (とあれば) · Kenta cầm micro là hết (たら最後) · cứ sợ thất bại thì không lớn được (ようでは) · không có đồng đội thì không có thành công (なしには) · thà làm rồi thất bại còn hơn hối hận (くらいなら).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜とあれば", "Nếu là vì… thì sẵn sàng"],
        ["〜たら最後", "Một khi đã… là không cứu vãn"],
        ["〜ようでは", "Nếu cứ (như thế) thì không ổn"],
        ["〜なしには", "Không có… thì không thể"],
        ["〜くらいなら", "Nếu phải… thì thà…"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "あの犬は一度かみつい＿＿＿、絶対に離さない。",
      opts: ["たら最後", "とあれば", "くらいなら", "ようでは"],
      answer: 0,
      explain: "Một khi đã cắn là không nhả → たら最後.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "親友の頼み＿＿＿、断るわけにはいかない。",
      opts: ["とあれば", "たら最後", "ようでは", "くらいなら"],
      answer: 0,
      explain: "Nếu là lời nhờ của bạn thân thì không thể từ chối → とあれば.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "毎日残業する＿＿＿、給料が安くても定時に帰れる会社で働きたい。",
      opts: ["くらいなら", "ようでは", "とあれば", "なしには"],
      answer: 0,
      explain: "Ghét tăng ca mỗi ngày → thà làm công ty lương thấp nhưng về đúng giờ → くらいなら.",
    },
    {
      type: "order",
      before: "",
      pieces: ["彼の", "努力", "なくしては", "この"],
      after: "成功はなかった。",
      star: 2,
      vi: "Nếu không có nỗ lực của anh ấy thì đã không có thành công này.",
      explain: "彼の努力なくしては、この成功はなかった.",
    },
    {
      type: "judge",
      q: "こんな基本的なミスをするようでは、まだ一人で仕事は任せられない。",
      ok: true,
      explain: "Thái độ/tình trạng xấu → kết quả xấu (không thể giao việc) → đúng.",
    },
    {
      type: "judge",
      q: "この本を読んだら最後、日本語が上手になります。",
      ok: false,
      explain: "たら最後 dùng cho hậu quả xấu, không dùng cho kết quả tốt.",
      fix: "この本を読めば、日本語が上手になります。",
    },
  ],
};
