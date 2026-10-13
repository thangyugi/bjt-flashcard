import type { N1Lesson } from "../types";

export const bai18: N1Lesson = {
  id: "bai-18",
  num: 18,
  topicJa: "主張・断定",
  topicVi: "Chủ trương · khẳng định",
  chapterJa: "一周年のインタビュー",
  chapterVi: "Buổi phỏng vấn tròn một năm",
  scene:
    "Tháng Tư — tròn một năm Mai đến Tokyo. Sản phẩm bán chạy, Mai được tạp chí kinh doanh phỏng vấn, rồi nhận được một đề nghị lớn. Chương này học cách KHẲNG ĐỊNH, NÊU CHỦ TRƯƠNG một cách dứt khoát.",
  story: [
    {
      jp: "「ベトナム茶ラテ」がヒットしたことは、言う[[までもなく]]、チーム全員の力によるものだ。",
      vi: "Việc \"Trà sữa Việt Nam\" thành công, khỏi phải nói, là nhờ sức lực của cả đội.",
    },
    {
      jp: "雑誌の記者に「成功の秘訣は？」と聞かれ、マイは首を振った。「秘訣なんてありません。私はただ、やるべきことをやった[[までです]]。」",
      vi: "Phóng viên tạp chí hỏi \"Bí quyết thành công là gì?\", Mai lắc đầu: \"Chẳng có bí quyết gì đâu ạ. Tôi chỉ làm những việc mình nên làm mà thôi.\"",
    },
    {
      jp: "取材の後、部長がマイを呼んだ。「ベトナムで新しい事業を立ち上げる話がある。君に任せたい。」驚くマイに、部長は続けた。「君の成長ぶりを見れば、驚く[[には当たらない]]よ。」",
      vi: "Sau buổi phỏng vấn, trưởng phòng gọi Mai: \"Công ty có kế hoạch mở mảng kinh doanh mới ở Việt Nam. Tôi muốn giao cho em.\" Thấy Mai ngạc nhiên, ông nói tiếp: \"Nhìn sự trưởng thành của em thì việc này chẳng có gì đáng ngạc nhiên cả.\"",
    },
    {
      jp: "佐藤先輩は真剣な顔で言った。「どんなにいい商品でも、現地の人に愛されなけれ[[ばそれまでだ]]よ。市場をよく見てね。」健太は「もし反対する人がいたら、説得する[[までだ]]！」と胸をたたいた。",
      vi: "Chị Satō nghiêm túc nói: \"Sản phẩm tốt mấy mà không được người dân bản địa yêu thích thì cũng hết chuyện. Hãy quan sát thị trường thật kỹ.\" Kenta đấm ngực: \"Nếu có ai phản đối thì chỉ việc thuyết phục thôi!\"",
    },
    {
      jp: "その夜、マイは窓の外を見ながら思った。この人たちと出会えたことは、運命[[でなくてなんだろう]]。",
      vi: "Đêm đó, nhìn ra ngoài cửa sổ, Mai nghĩ: được gặp những con người này, nếu không phải định mệnh thì là gì chứ.",
    },
  ],
  patterns: [
    {
      id: "mademonai",
      pattern: "〜までもない",
      variants: ["〜までもなく"],
      meaning: "Không cần phải (đến mức)…",
      nuance:
        "Việc đó đơn giản / hiển nhiên đến mức không cần tốn công làm A. 言うまでもない = khỏi phải nói, ai cũng biết.",
      forms: ["V辞書形 + までもない", "V辞書形 + までもなく、〜"],
      position: {
        before: "Hành động có ý chí: 言う・説明する・確認する・行く",
        after: "までもない (cuối câu) / までもなく + câu",
      },
      register: "Văn nói & viết",
      usage: [
        "Cụm hay gặp: 言うまでもない, 言うまでもなく.",
        "Động từ phía trước là hành động có chủ ý.",
      ],
      examples: [
        {
          jp: "このくらいの雨なら、傘をさす[[までもない]]。",
          vi: "Mưa cỡ này thì chẳng cần phải che ô.",
        },
        {
          jp: "確認する[[までもない]]ことですが、明日の集合場所は駅前の広場です。",
          vi: "Chuyện không cần phải xác nhận lại, nhưng điểm tập trung ngày mai là quảng trường trước ga.",
        },
        {
          jp: "言う[[までもなく]]、健康は何よりも大切だ。",
          vi: "Khỏi phải nói, sức khỏe là quan trọng hơn tất cả.",
        },
      ],
      dos: ["Nêu điều hiển nhiên; từ chối nhẹ nhàng một việc không cần thiết."],
      donts: [
        {
          text: "Động từ không có chủ ý → không tự nhiên.",
          bad: "雨が降るまでもない。",
          good: "わざわざ傘を持っていくまでもない。",
        },
      ],
      compare: [
        {
          other: "〜ないまでも (Chương 15)",
          diff: "ないまでも = \"chưa đến mức… nhưng ít ra\". までもない = \"không cần đến mức…\".",
        },
        {
          other: "〜必要はない／〜ことはない (N3)",
          diff: "Cùng nghĩa \"không cần\". までもない nhấn mạnh việc đó quá đơn giản/hiển nhiên.",
        },
      ],
      memo: "まで (đến mức) + も + ない → \"chẳng cần ĐẾN MỨC ấy\" 🤲. 言うまでもなく、チーム全員の力だ.",
      storyLine: "言う[[までもなく]]、チーム全員の力によるものだ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "簡単な手続きなので、わざわざ窓口に行く＿＿＿。ネットでできます。",
          opts: ["までもない", "までだ", "ばそれまでだ", "には当たらない"],
          answer: 0,
          explain: "Thủ tục đơn giản → không cần phải đến tận quầy → までもない.",
        },
        {
          type: "judge",
          q: "言うまでもなく、日本の首都は東京だ。",
          ok: true,
          explain: "Điều hiển nhiên → 言うまでもなく đúng.",
        },
      ],
    },
    {
      id: "madeda",
      pattern: "〜までだ／〜までのことだ",
      meaning: "① Chỉ việc… thôi (không còn cách khác) ② Chỉ là… mà thôi",
      nuance:
        "① V辞書形: nếu không được thì chỉ việc làm cách khác — thể hiện sự quyết tâm, thản nhiên. ② Vた: việc mình làm chỉ là chuyện nhỏ, không có ý gì khác (khiêm tốn / thanh minh).",
      forms: ["① V辞書形 + までだ／までのことだ", "② Vた + までだ／までのことだ"],
      position: {
        before: "① 〜なら／〜ば + (phương án cuối) ② hành động đã làm",
        after: "(cuối câu)",
      },
      register: "Văn nói & viết",
      usage: [
        "① hay đi với câu điều kiện: 〜なら、〜までだ. Chỉ nói về hiện tại/tương lai.",
        "② hay đi với ただ: ただ〜たまでです.",
      ],
      examples: [
        {
          jp: "誰も協力してくれないのなら、一人でやってみる[[までだ]]。",
          vi: "Nếu không ai chịu giúp thì tôi chỉ việc tự làm một mình thôi.",
        },
        {
          jp: "その日に作業が終わらなければ、次の日に続きをやる[[までのことだ]]。",
          vi: "Nếu hôm đó chưa xong việc thì chỉ việc làm tiếp vào hôm sau thôi.",
        },
        {
          jp: "お褒めの言葉をいただきましたが、私はただ自分のするべきことをした[[までです]]。",
          vi: "Được khen ngợi nhưng tôi chỉ làm những việc mình nên làm mà thôi.",
        },
      ],
      dos: ["① Thể hiện quyết tâm bình thản. ② Khiêm tốn khi được khen, thanh minh không có ý gì."],
      donts: [
        {
          text: "Nghĩa ① dùng cho quá khứ → sai.",
          bad: "電車がなかったので、歩いて帰るまでだった。",
          good: "電車がないなら、歩いて帰るまでだ。",
        },
      ],
      compare: [
        {
          other: "〜しかない (N3)",
          diff: "しかない: \"đành phải\" (miễn cưỡng). までだ: \"chỉ việc…\" — bình thản, quyết đoán.",
        },
        {
          other: "〜ばそれまでだ",
          diff: "ばそれまでだ: \"nếu… thì hết chuyện\" (vô nghĩa). までだ: \"chỉ việc / chỉ là\".",
        },
      ],
      memo: "まで = \"đến đó là hết\" ✋. ① Kenta: 反対する人がいたら、説得するまでだ！ ② Mai: やるべきことをやったまでです.",
      storyLine: "私はただ、やるべきことをやった[[までです]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "バスがもうないなら、タクシーで帰る＿＿＿。",
          opts: ["までだ", "までもない", "には当たらない", "でなくてなんだろう"],
          answer: 0,
          explain: "Không còn xe buýt → chỉ việc đi taxi → までだ (nghĩa ①).",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "怒らないでください。私は事実を言ったまでです。",
          opts: [
            "Đừng giận, tôi chỉ nói sự thật mà thôi.",
            "Đừng giận, tôi sẽ nói sự thật đến cùng.",
            "Đừng giận, tôi chưa nói hết sự thật.",
            "Đừng giận, tôi không cần nói sự thật.",
          ],
          answer: 0,
          explain: "Vた + までです (nghĩa ②) = chỉ là… mà thôi.",
        },
      ],
    },
    {
      id: "ba-soremadeda",
      pattern: "〜ばそれまでだ",
      meaning: "Nếu… thì cũng hết chuyện (mọi thứ vô nghĩa)",
      nuance:
        "Nếu tình trạng A xảy ra thì mọi thứ trước đó trở nên vô nghĩa, chấm hết. Hay dùng dạng 〜ても、〜ばそれまでだ. Cụm: と言われればそれまでだ = bị nói thế thì cũng chịu.",
      forms: ["Vば + それまでだ", "〜と言われればそれまでだ"],
      position: {
        before: "Điều kiện làm mọi thứ vô nghĩa (死ぬ・使わない・負ける)",
        after: "それまでだ (cuối câu)",
      },
      register: "Văn nói & viết",
      usage: [
        "Thường có cấu trúc: どんなに〜ても、〜ばそれまでだ.",
        "と言われればそれまでだが… = bị nói vậy thì cũng chịu, nhưng…",
      ],
      examples: [
        {
          jp: "人間、死んでしまえ[[ばそれまでだ]]。生きているうちにやりたいことをやろう。",
          vi: "Con người ta chết đi là hết. Hãy làm điều mình muốn khi còn sống.",
        },
        {
          jp: "好みの問題だと言われれ[[ばそれまでだ]]が、私はこの店の内装がどうも好きになれない。",
          vi: "Bị bảo là chuyện sở thích thì cũng chịu, nhưng tôi không thể nào thích nội thất quán này.",
        },
        {
          jp: "どんなに高い薬でも、飲まなけれ[[ばそれまでだ]]。",
          vi: "Thuốc đắt đến mấy mà không uống thì cũng vô ích.",
        },
      ],
      dos: ["Nhấn mạnh điều kiện then chốt: thiếu nó thì mọi công sức đổ sông đổ biển."],
      donts: [
        {
          text: "Kết quả tích cực → không dùng.",
          bad: "毎日練習すればそれまでだ。上手になるよ。",
          good: "毎日練習すれば、上手になるよ。",
        },
      ],
      compare: [
        {
          other: "〜たら最後 (Chương 9)",
          diff: "たら最後: một khi đã… thì hậu quả tồi tệ kéo theo. ばそれまでだ: nếu… thì mọi thứ thành vô nghĩa.",
        },
      ],
      memo: "それまで = \"đến đó là hết\" 🔚. Chị Satō: 現地の人に愛されなければそれまでだ.",
      storyLine: "どんなにいい商品でも、現地の人に愛されなけれ[[ばそれまでだ]]よ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "いくら準備をしても、当日寝坊すれ＿＿＿。",
          opts: ["ばそれまでだ", "ばこそだ", "までもない", "には当たらない"],
          answer: 0,
          explain: "Chuẩn bị bao nhiêu mà ngủ quên thì cũng hết chuyện → ばそれまでだ.",
        },
        {
          type: "order",
          before: "いい資格を持っていても、",
          pieces: ["使わなければ", "それ", "まで", "だ"],
          after: "。",
          star: 1,
          vi: "Có chứng chỉ tốt mà không dùng thì cũng vô ích.",
          explain: "使わなければそれまでだ.",
        },
      ],
    },
    {
      id: "niwa-ataranai",
      pattern: "〜には当たらない",
      meaning: "Không đáng để (ngạc nhiên / phê phán…)",
      nuance:
        "Chuyện đó không to tát đến mức phải phản ứng như vậy. Dùng để kiềm chế phản ứng quá mức của người khác (ngạc nhiên, bi quan, chỉ trích, khen ngợi).",
      forms: ["V辞書形 + には当たらない", "N(する) + には当たらない"],
      position: {
        before: "Động từ phản ứng/đánh giá: 驚く・悲観する・非難する・賞賛する",
        after: "には当たらない (cuối câu)",
      },
      register: "Văn viết · bình luận",
      usage: [
        "Chỉ đi với vài động từ: 驚く, 悲観する, 非難する, 責める, 賞賛する, 心配する.",
      ],
      examples: [
        {
          jp: "山田さんは通勤に一時間半かかるそうだが、驚く[[には当たらない]]。日本では珍しくない。",
          vi: "Nghe nói anh Yamada đi làm mất một tiếng rưỡi, nhưng chẳng có gì đáng ngạc nhiên. Ở Nhật chuyện đó không hiếm.",
        },
        {
          jp: "今度の大会の成績を悲観する[[には当たらない]]。チャンスはまだたくさんある。",
          vi: "Không đáng phải bi quan về thành tích giải lần này. Vẫn còn nhiều cơ hội.",
        },
        {
          jp: "彼の判断は当時としては妥当で、非難する[[には当たらない]]。",
          vi: "Quyết định của anh ấy là hợp lý vào thời điểm đó, không đáng bị chỉ trích.",
        },
      ],
      dos: ["Trấn an, điều chỉnh đánh giá quá mức của người khác."],
      donts: [
        {
          text: "Động từ không phải phản ứng/đánh giá → không dùng.",
          bad: "このくらいの距離なら、走るには当たらない。",
          good: "このくらいの距離なら、走るまでもない。",
        },
      ],
      compare: [
        {
          other: "〜までもない",
          diff: "までもない: không cần LÀM (hành động). には当たらない: không đáng PHẢN ỨNG (cảm xúc, đánh giá).",
        },
        {
          other: "〜ことはない (N3)",
          diff: "ことはない: \"không cần\" khẩu ngữ. には当たらない: văn viết, nhấn mạnh \"không đáng\".",
        },
      ],
      memo: "当たる = \"trúng, xứng\" → \"không TRÚNG mức để phải ngạc nhiên\" 🎯❌. 部長: 驚くには当たらないよ.",
      storyLine: "君の成長ぶりを見れば、驚く[[には当たらない]]よ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "一度失敗したからといって、そんなに自分を責める＿＿＿。",
          opts: ["には当たらない", "までだ", "ばそれまでだ", "でなくてなんだろう"],
          answer: 0,
          explain: "Không đáng tự trách (phản ứng quá mức) → には当たらない.",
        },
        {
          type: "judge",
          q: "彼が合格したのは、毎日努力していたのだから、驚くには当たらない。",
          ok: true,
          explain: "Không đáng ngạc nhiên vì đã cố gắng mỗi ngày → đúng.",
        },
      ],
    },
    {
      id: "denakute-nandarou",
      pattern: "〜でなくてなんだろう（か）",
      meaning: "Nếu không phải… thì là gì (chính là…)",
      nuance:
        "Câu hỏi tu từ khẳng định mạnh: \"điều này chắc chắn là N\". Thể hiện cảm xúc mãnh liệt (cảm động, khâm phục, đau buồn). N thường là từ trừu tượng, lớn lao: 運命, 愛, 天才, 奇跡.",
      forms: ["N + でなくてなんだろう（か）"],
      position: {
        before: "Danh từ trừu tượng: 運命・愛・天職・奇跡・悲劇",
        after: "(cuối câu)",
      },
      register: "Văn viết · cảm xúc, văn chương",
      usage: [
        "Dùng trong văn chương, bài phát biểu cảm động.",
        "Hay có これが／それが ở đầu câu.",
      ],
      examples: [
        {
          jp: "毎日仕事が楽しくて仕方がない。これが天職[[でなくてなんだろう]]。",
          vi: "Ngày nào làm việc cũng vui không tả được. Nếu đây không phải thiên chức thì là gì?",
        },
        {
          jp: "一度聞いただけの曲を完璧に演奏できるなんて、彼は天才[[でなくてなんだろうか]]。",
          vi: "Nghe một lần mà chơi lại hoàn hảo bản nhạc — anh ấy không phải thiên tài thì là gì?",
        },
        {
          jp: "全員が無事に救出された。これが奇跡[[でなくてなんだろう]]。",
          vi: "Tất cả đều được cứu an toàn. Đây không phải phép màu thì là gì?",
        },
      ],
      dos: ["Kết thúc bài phát biểu, đoạn văn đầy cảm xúc."],
      donts: [
        {
          text: "Danh từ bình thường, cụ thể → nghe kỳ.",
          bad: "これは鉛筆でなくてなんだろう。",
          good: "これは鉛筆だ。",
        },
      ],
      compare: [
        {
          other: "〜にほかならない (N2)",
          diff: "にほかならない: \"không gì khác hơn là\" — khẳng định logic. でなくてなんだろう: khẳng định bằng câu hỏi tu từ, giàu CẢM XÚC.",
        },
      ],
      memo: "\"Không phải N thì là cái gì?!\" ❤️ — câu hỏi mà ai cũng biết câu trả lời. Mai: この出会いは運命でなくてなんだろう.",
      storyLine: "この人たちと出会えたことは、運命[[でなくてなんだろう]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "自分の命をかけて子供を守った母親。これが愛＿＿＿。",
          opts: ["でなくてなんだろう", "には当たらない", "までもない", "ばそれまでだ"],
          answer: 0,
          explain: "Câu hỏi tu từ cảm xúc mạnh → でなくてなんだろう.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "これが悲劇でなくてなんだろうか。",
          opts: [
            "Đây chính là bi kịch.",
            "Đây không phải là bi kịch.",
            "Không biết đây có phải bi kịch không.",
            "Đây sẽ trở thành bi kịch.",
          ],
          answer: 0,
          explain: "でなくてなんだろう = khẳng định mạnh: chính là…",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Đi với", "Sắc thái"],
    rows: [
      ["〜までもない", "Không cần phải", "Động từ có ý chí (言う・行く)", "Hiển nhiên"],
      ["〜までだ ①", "Chỉ việc… thôi", "V辞書形", "Quyết tâm bình thản"],
      ["〜たまでだ ②", "Chỉ là… mà thôi", "Vた", "Khiêm tốn, thanh minh"],
      ["〜ばそれまでだ", "Nếu… thì hết chuyện", "Vば", "Vô nghĩa"],
      ["〜には当たらない", "Không đáng (phản ứng)", "驚く・悲観する・非難する", "Trấn an"],
      ["〜でなくてなんだろう", "Không phải… thì là gì", "Danh từ trừu tượng", "Cảm xúc mạnh"],
    ],
  },
  links: [
    "Họ まで: までもない · までだ · ばそれまでだ (Ch.18) · ないまでも (Ch.15) · に至るまで (Ch.2). Vẽ một sơ đồ cho cả họ!",
    "Ôn N2: にほかならない, に決まっている, ほかない. N1 thêm sắc thái cảm xúc và tu từ.",
    "までだ ① ↔ たら最後: một bên bình thản (\"chỉ việc…\"), một bên sợ hãi (\"thế là hết\").",
  ],
  hook: "Tròn một năm: khỏi phải nói, nhờ cả đội (までもなく) · tôi chỉ làm việc mình nên làm (たまでです) · chẳng có gì đáng ngạc nhiên (には当たらない) · không được yêu thích thì hết chuyện (ばそれまでだ) · có ai phản đối thì chỉ việc thuyết phục (までだ) · không phải định mệnh thì là gì (でなくてなんだろう).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜までもない", "Không cần phải…"],
        ["〜たまでだ", "Chỉ là… mà thôi (khiêm tốn)"],
        ["〜ばそれまでだ", "Nếu… thì hết chuyện"],
        ["〜には当たらない", "Không đáng để (ngạc nhiên…)"],
        ["〜でなくてなんだろう", "Không phải… thì là gì"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "この程度のけがなら、病院に行く＿＿＿。",
      opts: ["までもない", "までだ", "ばそれまでだ", "には当たらない"],
      answer: 0,
      explain: "Vết thương nhẹ → không cần đi viện → までもない.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "失敗しても、またやり直す＿＿＿。",
      opts: ["までのことだ", "までもない", "には当たらない", "ばそれまでだ"],
      answer: 0,
      explain: "Thất bại thì chỉ việc làm lại → までのことだ (nghĩa ①).",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "子供が言うことを聞かないのは成長の証だから、心配する＿＿＿。",
      opts: ["には当たらない", "までだ", "でなくてなんだろう", "ばそれまでだ"],
      answer: 0,
      explain: "Không đáng lo lắng (phản ứng) → には当たらない.",
    },
    {
      type: "judge",
      q: "どんなにいい計画でも、実行しなければそれまでだ。",
      ok: true,
      explain: "Kế hoạch tốt mà không thực hiện thì vô nghĩa → đúng.",
    },
    {
      type: "judge",
      q: "昨日は雨だったので、家にいるまでだった。",
      ok: false,
      explain: "までだ (nghĩa ①) không dùng cho quá khứ.",
      fix: "雨なら、家にいるまでだ。",
    },
  ],
};
