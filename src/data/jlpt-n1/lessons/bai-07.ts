import type { N1Lesson } from "../types";

export const bai07: N1Lesson = {
  id: "bai-07",
  num: 7,
  topicJa: "付随行動",
  topicVi: "Hành động kèm theo (nhân tiện…)",
  chapterJa: "先輩のもう一つの顔",
  chapterVi: "Gương mặt khác của chị Satō",
  scene:
    "Tháng Tám, kỳ nghỉ Obon. Mai đi dạo, ghé thăm nhà trưởng phòng và phát hiện bí mật của chị Satō. Chương ngắn nhưng dễ nhầm: ba cách nói \"NHÂN TIỆN / KIÊM / BÊN CẠNH\".",
  story: [
    {
      jp: "お盆休みの朝、マイは散歩[[がてら]]、近くのパン屋までクロワッサンを買いに行った。",
      vi: "Buổi sáng kỳ nghỉ Obon, Mai đi dạo, nhân tiện ghé tiệm bánh gần nhà mua bánh sừng bò.",
    },
    {
      jp: "午後は、田中部長のお宅を訪ねた。イベントでお世話になったので、お礼[[かたがた]]ご挨拶に伺ったのだ。部長の奥さんは、マイを温かく迎えてくれた。",
      vi: "Buổi chiều, Mai đến thăm nhà trưởng phòng Tanaka. Vì được ông giúp đỡ nhiều trong sự kiện, cô đến để cảm ơn, kiêm chào hỏi luôn. Vợ trưởng phòng đón Mai rất niềm nở.",
    },
    {
      jp: "帰り道、ギャラリーの前を通ると、見覚えのある名前があった。「佐藤 美咲 個展」。佐藤先輩は会社勤めの[[かたわら]]、ずっと絵を描き続けていたのだ。",
      vi: "Trên đường về, đi ngang một phòng tranh, Mai thấy một cái tên quen: \"Triển lãm cá nhân Satō Misaki\". Hóa ra bên cạnh công việc ở công ty, chị Satō vẫn luôn vẽ tranh.",
    },
    {
      jp: "会場の一番奥には、桜の木の下で笑う女の子の絵がかかっていた。タイトルは「新しい春」。マイは、それが自分だと気づいた。",
      vi: "Ở góc trong cùng của phòng tranh treo bức vẽ một cô gái cười dưới gốc anh đào. Tên tranh: \"Mùa xuân mới\". Mai nhận ra đó chính là mình.",
    },
  ],
  patterns: [
    {
      id: "gatera",
      pattern: "〜がてら",
      meaning: "Nhân tiện (khi làm A) thì làm luôn B",
      nuance:
        "Làm hành động A, đồng thời tận dụng cơ hội đó để làm thêm B. A thường là hành động có di chuyển (散歩, 買い物, 見物). Thân mật, dùng nhiều trong đời thường.",
      forms: ["N(danh động từ) + がてら", "Vます + がてら"],
      position: {
        before: "Hành động chính có di chuyển: 散歩・買い物・見物・送る",
        after: "Hành động kèm theo — thường là đi đâu đó (行く・寄る・来る)",
      },
      register: "Văn nói & viết · thân mật",
      usage: [
        "A và B cùng chủ ngữ.",
        "Vế sau thường là động từ di chuyển: 行く, 来る, 寄る, 出かける.",
      ],
      examples: [
        {
          jp: "散歩[[がてら]]、ちょっとパンを買いに行ってきます。",
          vi: "Tôi đi dạo, nhân tiện mua ít bánh mì rồi về.",
        },
        {
          jp: "花火を見物[[がてら]]、一度うちにも遊びに来てください。",
          vi: "Nhân dịp đi xem pháo hoa, hãy ghé chơi nhà tôi một lần.",
        },
        {
          jp: "駅まで友達を送り[[がてら]]、本屋に寄った。",
          vi: "Tiễn bạn ra ga, nhân tiện tôi ghé hiệu sách.",
        },
      ],
      dos: ["Kế hoạch đời thường: đi dạo/đi mua sắm, tiện thể làm việc khác."],
      donts: [
        {
          text: "Hành động A không có tính di chuyển / kéo dài trong nhà → không tự nhiên.",
          bad: "テレビを見がてら、ご飯を食べた。",
          good: "テレビを見ながら、ご飯を食べた。",
        },
      ],
      compare: [
        {
          other: "〜ついでに (N3)",
          diff: "ついでに: rộng rãi nhất, A có thể là bất kỳ việc gì. がてら: A thường là việc có di chuyển, B là mục đích phụ.",
          ex: { jp: "コンビニに行く[[ついでに]]、手紙を出してきて。", vi: "Tiện đi cửa hàng tiện lợi thì gửi giùm lá thư." },
        },
        {
          other: "〜かたがた",
          diff: "かたがた: trang trọng, dùng trong thư từ, giao tiếp công việc (お礼かたがた). がてら: thân mật hơn.",
        },
      ],
      memo: "がてら ≈ \"GA TÀU\": đi qua ga nào cũng tiện ghé một chút 🚉. 散歩がてらパンを買いに.",
      storyLine: "マイは散歩[[がてら]]、近くのパン屋までクロワッサンを買いに行った。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "買い物＿＿＿、新しくできたカフェに寄ってみた。",
          opts: ["がてら", "かたわら", "なり", "そばから"],
          answer: 0,
          explain: "Đi mua sắm, nhân tiện ghé quán cà phê → がてら.",
        },
        {
          type: "judge",
          q: "勉強しがてら、音楽を聞いている。",
          ok: false,
          explain: "Học bài không phải hành động di chuyển, và đây là \"vừa… vừa…\" → ながら.",
          fix: "勉強しながら、音楽を聞いている。",
        },
      ],
    },
    {
      id: "katagata",
      pattern: "〜かたがた",
      meaning: "Nhân (dịp)… kiêm luôn… (trang trọng)",
      nuance:
        "Làm một việc mang hai mục đích cùng lúc. Văn phong lịch sự, dùng trong thư từ và giao tiếp công việc. Vế sau hay là động từ khiêm nhường về việc đến thăm: 伺う, 訪ねる, 参る.",
      forms: ["N(danh động từ) + かたがた"],
      position: {
        before: "Mục đích lịch sự: お礼・ご報告・ご挨拶・お見舞い",
        after: "Việc đến thăm / liên lạc: 伺う・訪ねる・ご連絡する",
      },
      register: "Trang trọng · thư từ, kính ngữ",
      usage: [
        "Danh từ phía trước thường có お/ご: お礼かたがた, ご報告かたがた.",
        "Hay gặp trong thư: まずは御礼かたがたご報告まで。",
      ],
      examples: [
        {
          jp: "部長のお宅へお礼[[かたがた]]ご挨拶に伺おうと思っています。",
          vi: "Tôi định đến nhà trưởng phòng để cảm ơn, kiêm chào hỏi.",
        },
        {
          jp: "ご報告[[かたがた]]、一度お伺いしたいのですが。",
          vi: "Tôi muốn đến thăm một lần, kiêm báo cáo luôn ạ.",
        },
        {
          jp: "まずは、お礼[[かたがた]]ご報告まで。",
          vi: "Trước hết, xin gửi lời cảm ơn kiêm báo cáo. (câu kết thư)",
        },
      ],
      dos: ["Thư từ, email công việc, thăm hỏi cấp trên / khách hàng."],
      donts: [
        {
          text: "Chuyện đời thường thân mật → quá cứng.",
          bad: "散歩かたがた、コンビニに行った。",
          good: "散歩がてら、コンビニに行った。",
        },
      ],
      compare: [
        {
          other: "〜がてら",
          diff: "Cùng nghĩa \"nhân tiện\". かたがた: lịch sự, thư từ (お礼かたがた). がてら: đời thường (散歩がてら).",
        },
        {
          other: "〜を兼ねて (N2)",
          diff: "を兼ねて: \"kiêm\" trung tính (趣味と実益を兼ねて). かたがた: kính ngữ, công việc.",
        },
      ],
      memo: "かたがた nghe như tiếng giày tây gõ \"cạch cạch\" trên hành lang công ty 👞 → trang trọng. お礼かたがたご挨拶に伺う.",
      storyLine: "お礼[[かたがた]]ご挨拶に伺ったのだ。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách nói phù hợp (thư gửi khách hàng)",
          q: "先日はありがとうございました。まずは、御礼＿＿＿ご報告申し上げます。",
          opts: ["かたがた", "がてら", "かたわら", "ついで"],
          answer: 0,
          explain: "Thư công việc, trang trọng → お礼かたがた.",
        },
        {
          type: "order",
          before: "近いうちに、",
          pieces: ["ご挨拶", "かたがた", "御社へ", "伺います"],
          after: "。",
          star: 2,
          vi: "Trong thời gian tới tôi sẽ đến quý công ty, kiêm chào hỏi.",
          explain: "ご挨拶かたがた御社へ伺います.",
        },
      ],
    },
    {
      id: "katawara",
      pattern: "〜かたわら",
      meaning: "Bên cạnh (công việc chính)… còn làm…",
      nuance:
        "Song song với công việc/vai trò chính trong một thời gian dài, còn làm thêm một hoạt động khác (sở thích, hoạt động xã hội, nghề tay trái).",
      forms: ["N の + かたわら", "V辞書形 + かたわら"],
      position: {
        before: "Công việc / vai trò chính: 会社勤め・教師の仕事・子育て",
        after: "Hoạt động khác kéo dài: 小説を書く・ボランティア・絵を描く",
      },
      register: "Văn viết · giới thiệu tiểu sử",
      usage: [
        "Diễn tả hoạt động trong thời gian dài, không phải một lần.",
        "Hay dùng trong giới thiệu nhân vật, tiểu sử.",
      ],
      examples: [
        {
          jp: "彼は教師の仕事をする[[かたわら]]、小説を書いている。",
          vi: "Anh ấy vừa làm giáo viên, bên cạnh đó còn viết tiểu thuyết.",
        },
        {
          jp: "私は会社勤務の[[かたわら]]、子供たちにサッカーを教えています。",
          vi: "Ngoài công việc ở công ty, tôi còn dạy bóng đá cho bọn trẻ.",
        },
        {
          jp: "母は子育ての[[かたわら]]、大学で心理学を学んだ。",
          vi: "Mẹ tôi vừa nuôi con, vừa học tâm lý học ở đại học.",
        },
      ],
      dos: ["Giới thiệu người có \"hai vai trò\" song song trong thời gian dài."],
      donts: [
        {
          text: "Hành động ngắn, một lần → không dùng.",
          bad: "ご飯を食べるかたわら、テレビを見た。",
          good: "ご飯を食べながら、テレビを見た。",
        },
      ],
      compare: [
        {
          other: "〜ながら (N4)",
          diff: "ながら: hai hành động CÙNG LÚC, ngắn. かたわら: hai vai trò SONG SONG trong thời gian dài.",
        },
        {
          other: "〜がてら／〜かたがた",
          diff: "がてら, かたがた: một chuyến đi mang 2 mục đích (một lần). かたわら: hai công việc kéo dài (lâu dài).",
        },
      ],
      memo: "かたわら (傍ら) = \"bên cạnh\" 🎨💼: một tay cầm cặp công sở, tay kia cầm cọ vẽ. 佐藤先輩は会社勤めのかたわら絵を描き続けていた.",
      storyLine: "佐藤先輩は会社勤めの[[かたわら]]、ずっと絵を描き続けていたのだ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "彼女は医者として働く＿＿＿、ボランティアで外国人に日本語を教えている。",
          opts: ["かたわら", "がてら", "かたがた", "なり"],
          answer: 0,
          explain: "Công việc chính (bác sĩ) + hoạt động lâu dài khác → かたわら.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "父は農業のかたわら、地元の歴史を研究している。",
          opts: [
            "Bố tôi bên cạnh làm nông còn nghiên cứu lịch sử địa phương.",
            "Bố tôi bỏ nghề nông để nghiên cứu lịch sử.",
            "Bố tôi nhân tiện đi làm đồng thì ghé bảo tàng.",
            "Bố tôi nghiên cứu lịch sử của nghề nông.",
          ],
          answer: 0,
          explain: "かたわら = song song với công việc chính.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Thời gian", "Văn phong"],
    rows: [
      ["〜がてら", "Nhân tiện (đi đâu đó)", "Một lần", "Thân mật, đời thường"],
      ["〜かたがた", "Kiêm luôn (thăm hỏi)", "Một lần", "Trang trọng, thư từ"],
      ["〜かたわら", "Bên cạnh việc chính", "Lâu dài", "Văn viết, tiểu sử"],
    ],
  },
  links: [
    "Ôn N3–N2: 〜ついでに (nhân tiện), 〜を兼ねて (kiêm), 〜ながら (vừa… vừa…).",
    "Mẹo phân biệt nhanh: お礼／ご報告 → かたがた; 散歩／買い物 → がてら; 仕事／勤め → かたわら.",
    "Chương 8 tiếp tục chủ đề lịch sự trong công việc: 〜ところを (お忙しいところを…).",
  ],
  hook: "Một ngày nghỉ: đi dạo NHÂN TIỆN mua bánh (がてら) → cảm ơn KIÊM chào hỏi sếp (かたがた) → chị Satō BÊN CẠNH công việc vẫn vẽ tranh (かたわら).",
  quiz: [
    {
      type: "match",
      q: "Nối danh từ phía trước với mẫu phù hợp",
      pairs: [
        ["散歩 + ？", "がてら"],
        ["お礼 + ？", "かたがた"],
        ["会社勤めの + ？", "かたわら"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "お見舞い＿＿＿、先生のご自宅に伺った。",
      opts: ["かたがた", "がてら", "かたわら", "ながら"],
      answer: 0,
      explain: "Thăm bệnh (お見舞い) — lịch sự, đến nhà thầy (伺う) → かたがた.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "犬の散歩＿＿＿、郵便局まで手紙を出しに行った。",
      opts: ["がてら", "かたがた", "かたわら", "そばから"],
      answer: 0,
      explain: "Dắt chó đi dạo, tiện gửi thư — đời thường → がてら.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "その作家は銀行に勤める＿＿＿、二十年間にわたって詩を書き続けた。",
      opts: ["かたわら", "がてら", "かたがた", "なり"],
      answer: 0,
      explain: "Làm ngân hàng (việc chính) + viết thơ 20 năm (lâu dài) → かたわら.",
    },
    {
      type: "judge",
      q: "駅まで歩きがてら、明日の予定について話した。",
      ok: true,
      explain: "Đi bộ ra ga (di chuyển), nhân tiện nói chuyện → tự nhiên.",
    },
    {
      type: "judge",
      q: "お礼かたがた、彼女はテレビを見ていた。",
      ok: false,
      explain: "かたがた cần vế sau là việc đến thăm / liên lạc lịch sự, không phải xem tivi.",
      fix: "お礼かたがた、彼女は先生のお宅を訪ねた。",
    },
  ],
};
