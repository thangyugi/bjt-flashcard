import type { N1Lesson } from "../types";

export const bai13: N1Lesson = {
  id: "bai-13",
  num: 13,
  topicJa: "可能・不可能・禁止",
  topicVi: "Có thể · không thể · cấm đoán",
  chapterJa: "結果を待つ日々",
  chapterVi: "Những ngày chờ kết quả",
  scene:
    "Tháng Mười Hai. Kết quả cuộc thi chưa có. Mai mất ngủ, Kenta không ngồi yên được, và một tin xấu về công ty đối thủ khiến cả phòng bàng hoàng. Chương này học cách nói KHẢ NĂNG — BẤT KHẢ — CẤM ĐOÁN.",
  story: [
    {
      jp: "結果発表まで一週間。待つ間のマイの不安は、想像[[にかたくない]]。夜、寝[[ようにも]]寝られず、何度も企画書を読み返した。",
      vi: "Còn một tuần nữa mới công bố kết quả. Nỗi bất an của Mai trong lúc chờ đợi thì không khó để tưởng tượng. Đêm muốn ngủ cũng không ngủ được, cô đọc đi đọc lại bản đề xuất.",
    },
    {
      jp: "健太も「ただ待って[[はいられない]]」と言って、試作品の味見を毎日手伝ってくれた。",
      vi: "Kenta cũng bảo \"không thể cứ ngồi chờ được\", ngày nào cũng giúp nếm thử sản phẩm mẫu.",
    },
    {
      jp: "試作室のドアには、部長の字で「関係者以外、立ち入る[[べからず]]」と書かれた紙が貼られていた。健太は「ちょっと大げさだな」と笑った。",
      vi: "Trên cửa phòng thử nghiệm dán tờ giấy chữ trưởng phòng: \"Người không phận sự miễn vào\". Kenta cười: \"Hơi làm quá nhỉ.\"",
    },
    {
      jp: "だが、その理由はすぐに分かった。ライバル会社の社員が他社のアイデアを盗んで逮捕されたというニュースが流れたのだ。「社会人として、ある[[まじき]]行為だ」と部長は厳しい顔で言った。",
      vi: "Nhưng lý do sớm sáng tỏ. Có tin một nhân viên công ty đối thủ bị bắt vì ăn cắp ý tưởng của công ty khác. \"Đó là hành vi không thể chấp nhận ở một người đi làm\", trưởng phòng nói với gương mặt nghiêm nghị.",
    },
    {
      jp: "金曜日の夜、マイは山本さんに打ち明けた。「新人の私が選ばれるなんて、望む[[べくもない]]ですよね。」山本さんは首を振った。「結果は、開けてみるまで分からないものよ。」",
      vi: "Tối thứ Sáu, Mai tâm sự với bà Yamamoto: \"Người mới như cháu được chọn thì đúng là không dám mơ đâu bà nhỉ.\" Bà Yamamoto lắc đầu: \"Kết quả thì phải mở ra mới biết được con ạ.\"",
    },
  ],
  patterns: [
    {
      id: "ni-katakunai",
      pattern: "〜にかたくない",
      meaning: "Không khó để (hình dung / hiểu được)…",
      nuance:
        "Nhìn vào tình hình thì dù không thấy tận mắt cũng có thể dễ dàng tưởng tượng / hiểu được. Chỉ đi với một số từ về nhận thức, cảm nhận: 想像, 察する, 理解.",
      forms: ["N(想像・理解) + にかたくない", "V辞書形(察する) + にかたくない"],
      position: {
        before: "想像・察する・理解・推測",
        after: "(cuối câu) にかたくない",
      },
      register: "Văn viết · trang trọng",
      usage: [
        "Cụm cố định: 想像にかたくない, 察するにかたくない.",
        "かたい = 難い (khó) → \"không khó\".",
      ],
      examples: [
        {
          jp: "完成した作品を見れば、彼のこれまでの努力は想像[[にかたくない]]。",
          vi: "Nhìn tác phẩm đã hoàn thành thì không khó để hình dung nỗ lực của anh ấy từ trước đến nay.",
        },
        {
          jp: "愛する人を失った彼女の悲しみは、察する[[にかたくない]]。",
          vi: "Nỗi đau của cô ấy khi mất người mình yêu thì không khó để cảm nhận.",
        },
        {
          jp: "この計画に反対する住民が多いことは、理解[[にかたくない]]。",
          vi: "Việc nhiều cư dân phản đối kế hoạch này là điều dễ hiểu.",
        },
      ],
      dos: ["Văn viết, bình luận: \"dễ dàng hình dung được…\"."],
      donts: [
        {
          text: "Gắn với động từ hành động thông thường → sai.",
          bad: "この本は読むにかたくない。",
          good: "この本は読みやすい。",
        },
      ],
      compare: [
        {
          other: "〜に難くない ↔ 〜がたい (N2)",
          diff: "〜がたい = khó mà… (信じがたい). にかたくない = KHÔNG khó (想像にかたくない). Đều từ 難い.",
        },
      ],
      memo: "かたい = 難い (khó) + ない → \"chẳng khó gì\" 🧠. 不安は想像にかたくない.",
      storyLine: "待つ間のマイの不安は、想像[[にかたくない]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "一人で子供を育てながら働く彼女の苦労は、想像＿＿＿。",
          opts: ["にかたくない", "べくもない", "べからず", "てはいられない"],
          answer: 0,
          explain: "想像にかたくない = không khó để hình dung.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "彼が怒るのも、察するにかたくない。",
          opts: [
            "Việc anh ấy nổi giận cũng dễ hiểu thôi.",
            "Khó mà hiểu được vì sao anh ấy nổi giận.",
            "Anh ấy không bao giờ nổi giận.",
            "Không được làm anh ấy nổi giận.",
          ],
          answer: 0,
          explain: "察するにかたくない = dễ dàng cảm nhận / hiểu được.",
        },
      ],
    },
    {
      id: "ni-nai",
      pattern: "〜に〜ない／〜（よ）うにも〜ない",
      meaning: "Muốn… cũng không thể… (vì hoàn cảnh)",
      nuance:
        "Lặp lại cùng động từ: muốn làm nhưng vì lý do nào đó nên không thể. 〜に〜ない thường do lý do TÂM LÝ (ngại, khó xử); 〜ようにも〜ない thường do lý do KHÁCH QUAN (không có phương tiện, điều kiện).",
      forms: ["V辞書形 + に + V可能形ない", "Vう・よう形 + にも + V可能形ない"],
      position: {
        before: "Động từ (lần 1)",
        after: "Cùng động từ ở thể khả năng phủ định",
      },
      register: "Văn nói & viết",
      usage: [
        "Hai động từ phải giống nhau.",
        "Cụm hay gặp: 泣くに泣けない, 笑うに笑えない, 言うに言えない.",
      ],
      examples: [
        {
          jp: "野菜をたくさんもらったが食べきれない。捨てる[[に]]捨てられず困っている。",
          vi: "Được cho nhiều rau quá ăn không hết. Vứt thì không nỡ vứt, đang khó xử.",
        },
        {
          jp: "連絡先が分からなくて、連絡し[[ようにも]]できなかった。",
          vi: "Không biết địa chỉ liên lạc nên muốn liên lạc cũng không được.",
        },
        {
          jp: "あまりにひどい失敗で、笑う[[に]]笑えなかった。",
          vi: "Thất bại thảm quá, muốn cười cũng không cười nổi.",
        },
      ],
      dos: ["Diễn tả tình huống khó xử, bất lực: muốn mà không thể."],
      donts: [
        {
          text: "Hai động từ khác nhau → sai.",
          bad: "帰ろうにも、休めない。",
          good: "帰ろうにも、帰れない。",
        },
      ],
      compare: [
        {
          other: "〜たくても〜ない (N4)",
          diff: "Cùng nghĩa \"muốn mà không được\". Mẫu N1 lặp động từ, nhấn mạnh sự bất lực, văn chương hơn.",
        },
      ],
      memo: "Động từ đi hai lần như người đứng trước cửa khóa 🚪🔒: 寝ようにも寝られない — muốn ngủ mà ngủ không được.",
      storyLine: "夜、寝[[ようにも]]寝られず、何度も企画書を読み返した。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "財布を忘れたので、買お＿＿＿買えなかった。",
          opts: ["うにも", "うと", "うにか", "うに"],
          answer: 0,
          explain: "Vう + にも + V可能形ない: 買おうにも買えない.",
        },
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "上司の誘いなので、断る＿＿＿断れない。",
          opts: ["に", "にも", "と", "が"],
          answer: 0,
          explain: "V辞書形 + に + V可能形ない (lý do tâm lý): 断るに断れない.",
        },
      ],
    },
    {
      id: "tewa-irarenai",
      pattern: "〜て（は）いられない",
      meaning: "Không thể cứ (ngồi yên)… mãi được",
      nuance:
        "Vì tình hình gấp, không có thời gian/tâm trí dư dả, nên không thể duy trì trạng thái như thế → phải hành động ngay. Chủ ngữ thường là người nói.",
      forms: ["Vて + （は）いられない"],
      position: {
        before: "Trạng thái thụ động: のんびりする・待つ・黙る",
        after: "(thường) + hành động tiếp theo ngay lập tức",
      },
      register: "Văn nói & viết",
      usage: [
        "Hay đi với のんびり, じっと, 黙って, 泣いて.",
        "Thể hiện sự sốt ruột, quyết định hành động.",
      ],
      examples: [
        {
          jp: "やると決めたら、のんびりして[[はいられない]]。今すぐ準備を始めよう。",
          vi: "Đã quyết làm thì không thể thong thả được. Bắt đầu chuẩn bị ngay thôi.",
        },
        {
          jp: "あれだけひどいことを言われて、私も黙って[[いられなかった]]。",
          vi: "Bị nói những lời tệ hại đến thế, tôi cũng không thể im lặng.",
        },
        {
          jp: "試験まであと一週間だ。遊んで[[はいられない]]。",
          vi: "Còn một tuần nữa là thi. Không thể ham chơi được.",
        },
      ],
      dos: ["Thể hiện sự sốt ruột, quyết tâm hành động ngay."],
      donts: [
        {
          text: "Chỉ muốn nói \"không biết / không có năng lực làm\" → dùng thể khả năng.",
          bad: "私は泳いではいられない。",
          good: "私は泳げない。",
        },
      ],
      compare: [
        {
          other: "〜ずにはいられない (N2)",
          diff: "ずにはいられない: không thể KHÔNG làm (cảm xúc trào lên). てはいられない: không thể CỨ làm mãi (phải dừng để làm việc khác).",
          ex: { jp: "その話を聞いて、泣か[[ずにはいられなかった]]。", vi: "Nghe chuyện đó, tôi không thể không khóc." },
        },
      ],
      memo: "いられない = \"không thể Ở (trong trạng thái đó)\" ⏰. Kenta: ただ待ってはいられない!",
      storyLine: "健太も「ただ待って[[はいられない]]」と言って、試作品の味見を毎日手伝ってくれた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "ライバルが新商品を出した。うちもぐずぐずして＿＿＿。",
          opts: ["はいられない", "にかたくない", "べくもない", "べからず"],
          answer: 0,
          explain: "Không thể chần chừ mãi → てはいられない.",
        },
        {
          type: "choice",
          label: "Phân biệt",
          q: "A: かわいそうで、助けず＿＿＿。 B: 時間がないから、休んで＿＿＿。",
          opts: [
            "A: にはいられない／B: はいられない",
            "A: はいられない／B: にはいられない",
            "A: にはいられない／B: にはいられない",
            "A: はいられない／B: はいられない",
          ],
          answer: 0,
          explain: "A: không thể không giúp → ずにはいられない. B: không thể nghỉ mãi → てはいられない.",
        },
      ],
    },
    {
      id: "bekumonai",
      pattern: "〜べくもない",
      meaning: "Không thể nào (mà)… / không dám mơ…",
      nuance:
        "Với tình trạng như thế thì đương nhiên không thể làm được. Thường đi với động từ về suy nghĩ, mong muốn, so sánh: 望む, 知る, 比べる, 否定する.",
      forms: ["V辞書形 + べくもない", "する → すべくもない"],
      position: {
        before: "望む・知る・比べる・否定する",
        after: "(cuối câu / trước danh từ)",
      },
      register: "Văn viết · cứng",
      usage: [
        "Cụm hay gặp: 望むべくもない, 知るべくもない, 比ぶべくもない, 否定すべくもない.",
      ],
      examples: [
        {
          jp: "その絵が偽物であることなど、素人の私には知る[[べくもなかった]]。",
          vi: "Chuyện bức tranh là đồ giả thì người nghiệp dư như tôi không thể nào biết được.",
        },
        {
          jp: "状況から見て、この男が犯人であることは否定す[[べくもない]]事実だろう。",
          vi: "Xét tình hình thì việc người đàn ông này là thủ phạm là sự thật không thể chối cãi.",
        },
        {
          jp: "今の給料では、都心に家を買うなど望む[[べくもない]]。",
          vi: "Với mức lương hiện tại, mua nhà ở trung tâm thì không dám mơ.",
        },
      ],
      dos: ["Văn viết: \"đương nhiên không thể\", đặc biệt với mong ước xa vời."],
      donts: [
        {
          text: "Diễn tả khả năng vật lý tạm thời → không dùng.",
          bad: "足をけがして、歩くべくもない。",
          good: "足をけがして、歩けない。",
        },
      ],
      compare: [
        {
          other: "〜べく (Chương 11)",
          diff: "べく = \"để\" (mục đích). べくもない = \"không thể nào\". Đừng nhầm!",
        },
        {
          other: "〜ようがない (N2)",
          diff: "ようがない: không có cách nào (方法). べくもない: hoàn cảnh khiến đương nhiên không thể (văn viết).",
        },
      ],
      memo: "べく (nên) + も + ない = \"chẳng có lý gì mà có thể\" 🌙. Mai: 新人の私が選ばれるなんて、望むべくもない.",
      storyLine: "新人の私が選ばれるなんて、望む[[べくもない]]ですよね。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "小さな町の病院では、大学病院のような設備は望む＿＿＿。",
          opts: ["べくもない", "べく", "べからず", "まじき"],
          answer: 0,
          explain: "望むべくもない = không thể nào mong được.",
        },
        {
          type: "judge",
          q: "二人の実力の差は比べるべくもない。",
          ok: true,
          explain: "比べるべくもない = (chênh lệch quá lớn) không thể so sánh → đúng.",
        },
      ],
    },
    {
      id: "bekarazu",
      pattern: "〜べからず／〜べからざる",
      meaning: "Cấm…, không được… / (N) không được phép…",
      nuance:
        "べからず: lệnh cấm trên biển báo, nội quy (văn cổ). べからざる + N: \"N không thể/không được…\" — dùng trong văn viết trang trọng (欠くべからざる = không thể thiếu).",
      forms: ["V辞書形 + べからず", "V辞書形 + べからざる + N", "する → するべからず／すべからず"],
      position: {
        before: "Hành động bị cấm",
        after: "べからず: cuối câu (biển báo) / べからざる: + danh từ",
      },
      register: "Văn cổ · biển báo, châm ngôn",
      usage: [
        "Biển báo: 立ち入るべからず, 芝生に入るべからず.",
        "Cụm hay gặp: 欠くべからざる (không thể thiếu), 許すべからざる (không thể tha thứ).",
      ],
      examples: [
        {
          jp: "（工事現場の張り紙）危険。立ち入る[[べからず]]。",
          vi: "(Giấy dán ở công trường) Nguy hiểm. Cấm vào.",
        },
        {
          jp: "経営者にとって決断力は欠く[[べからざる]]ものである。",
          vi: "Đối với người kinh doanh, sự quyết đoán là thứ không thể thiếu.",
        },
        {
          jp: "初心忘る[[べからず]]。",
          vi: "Chớ quên tâm thế ban đầu. (châm ngôn)",
        },
      ],
      dos: ["Biển báo, nội quy, châm ngôn; văn bản trang trọng (〜べからざる N)."],
      donts: [
        {
          text: "Hội thoại thông thường → quá cổ.",
          bad: "ここでタバコを吸うべからず、だよ。",
          good: "ここでタバコを吸っちゃだめだよ。",
        },
      ],
      compare: [
        {
          other: "〜まじき",
          diff: "まじき: \"không được phép (về mặt ĐẠO ĐỨC, với tư cách…)\" + N. べからず: lệnh cấm chung (biển báo).",
        },
        {
          other: "〜てはいけない (N4)",
          diff: "Bản thông thường. べからず là bản cổ, trang nghiêm.",
        },
      ],
      memo: "べから + ず = \"không nên chút nào\" 🚫 — giọng của tấm biển gỗ ở đền chùa. 関係者以外、立ち入るべからず.",
      storyLine: "「関係者以外、立ち入る[[べからず]]」",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "（公園の看板）芝生に入る＿＿＿。",
          opts: ["べからず", "べくもない", "まじき", "べく"],
          answer: 0,
          explain: "Biển báo cấm → べからず.",
        },
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "水は人間の生活に欠く＿＿＿ものだ。",
          opts: ["べからざる", "べからず", "べくもない", "まじく"],
          answer: 0,
          explain: "Trước danh từ (もの) → べからざる: không thể thiếu.",
        },
      ],
    },
    {
      id: "majiki",
      pattern: "〜まじき",
      meaning: "(Với tư cách…) không được phép, không thể chấp nhận…",
      nuance:
        "Từ lập trường, địa vị của một người, về mặt đạo đức thì hành động đó tuyệt đối không được phép. Luôn đứng trước danh từ (行為, 発言, 態度…). Hay dùng: N にあるまじき N.",
      forms: ["V辞書形 + まじき + N", "N + として／に + あるまじき + N"],
      position: {
        before: "Địa vị: 政治家・教師・親・社会人",
        after: "まじき + danh từ (行為・発言・態度)",
      },
      register: "Văn viết · phê phán mạnh",
      usage: [
        "Cụm cố định nhất: 〜にあるまじき行為／発言.",
        "Bắt buộc có danh từ phía sau.",
      ],
      examples: [
        {
          jp: "その大臣は政治家にある[[まじき]]発言で、辞任に追い込まれた。",
          vi: "Vị bộ trưởng đó vì phát ngôn không thể chấp nhận ở một chính trị gia mà bị buộc từ chức.",
        },
        {
          jp: "これは、子を持つ親として許す[[まじき]]犯罪である。",
          vi: "Đây là tội ác mà với tư cách cha mẹ có con thì không thể tha thứ.",
        },
        {
          jp: "生徒に暴力をふるうなど、教師にある[[まじき]]行為だ。",
          vi: "Dùng bạo lực với học sinh là hành vi không thể chấp nhận ở một giáo viên.",
        },
      ],
      dos: ["Phê phán gay gắt hành vi trái đạo đức so với địa vị."],
      donts: [
        {
          text: "Không có danh từ phía sau → sai.",
          bad: "彼の行為は教師にあるまじきだ。",
          good: "彼の行為は教師にあるまじきものだ。",
        },
      ],
      compare: [
        {
          other: "〜べからず",
          diff: "べからず: lệnh cấm chung. まじき: phê phán ĐẠO ĐỨC dựa trên địa vị.",
        },
        {
          other: "〜たるもの (Chương 14)",
          diff: "Hai mặt: たるもの = \"đã là X thì PHẢI…\"; まじき = \"là X thì KHÔNG ĐƯỢC…\".",
        },
      ],
      memo: "まじ (= まい, phủ định mạnh) + き → \"tuyệt đối không được\" ⚠️. 社会人としてあるまじき行為.",
      storyLine: "「社会人として、ある[[まじき]]行為だ」",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "患者の個人情報を外部に漏らすなど、医者にある＿＿＿行為だ。",
          opts: ["まじき", "べからず", "べくもない", "べく"],
          answer: 0,
          explain: "Với tư cách bác sĩ, hành vi trái đạo đức + danh từ (行為) → あるまじき.",
        },
        {
          type: "order",
          before: "それは",
          pieces: ["警察官", "に", "あるまじき", "態度"],
          after: "だ。",
          star: 2,
          vi: "Đó là thái độ không thể chấp nhận ở một cảnh sát.",
          explain: "警察官にあるまじき態度.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Đi với", "Văn phong"],
    rows: [
      ["〜にかたくない", "Không khó để…", "想像・察する", "Văn viết"],
      ["〜に〜ない", "Muốn… mà không thể", "Cùng động từ", "Nói & viết"],
      ["〜てはいられない", "Không thể cứ… mãi", "のんびり・待つ", "Sốt ruột"],
      ["〜べくもない", "Không thể nào", "望む・知る・比べる", "Văn viết"],
      ["〜べからず", "Cấm", "Biển báo; べからざる + N", "Cổ"],
      ["〜まじき", "Không được phép (đạo đức)", "にあるまじき + N", "Phê phán"],
    ],
  },
  links: [
    "Họ べし trọn bộ: べく (để — Ch.11) · べくもない (không thể) · べからず (cấm). Học bằng một câu: 合格すべく努力したが、満点は望むべくもない。カンニングするべからず。",
    "まじき ↔ たるもの (Chương 14): \"không được\" ↔ \"phải\" — hai mặt của chuẩn mực địa vị.",
    "てはいられない ≠ ずにはいられない (N2): \"không thể cứ…\" vs \"không thể không…\".",
    "にかたくない ↔ 〜がたい (N2: 信じがたい): cùng chữ 難.",
  ],
  hook: "Chờ kết quả: nỗi lo dễ hình dung (にかたくない) · muốn ngủ mà không ngủ được (ようにも〜ない) · không thể ngồi chờ (てはいられない) · cấm vào phòng thử nghiệm (べからず) · hành vi không thể chấp nhận (まじき) · không dám mơ được chọn (べくもない).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜にかたくない", "Không khó để hình dung"],
        ["〜ようにも〜ない", "Muốn… mà không thể"],
        ["〜てはいられない", "Không thể cứ… mãi"],
        ["〜べくもない", "Không thể nào (mơ tới)"],
        ["〜べからず", "Cấm (biển báo)"],
        ["〜まじき", "Không được phép (với tư cách…)"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "電車が止まってしまい、会社に行こう＿＿＿行けない。",
      opts: ["にも", "に", "と", "とも"],
      answer: 0,
      explain: "Lý do khách quan (tàu dừng) → Vう + にも + V可能形ない.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "部下の手柄を自分のものにするなど、上司にある＿＿＿行為だ。",
      opts: ["まじき", "べからず", "べくもない", "にかたくない"],
      answer: 0,
      explain: "Phê phán đạo đức theo địa vị + danh từ → あるまじき.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "台風が近づいている。のんきに寝て＿＿＿。",
      opts: ["はいられない", "べくもない", "にかたくない", "べからず"],
      answer: 0,
      explain: "Tình hình gấp → không thể ngủ ngon mãi → てはいられない.",
    },
    {
      type: "order",
      before: "長年の努力が",
      pieces: ["実った", "彼の", "喜びは", "想像にかたくない"],
      after: "。",
      star: 2,
      vi: "Niềm vui của anh ấy khi nỗ lực nhiều năm đơm hoa kết trái thì không khó để hình dung.",
      explain: "長年の努力が実った彼の喜びは想像にかたくない.",
    },
    {
      type: "judge",
      q: "この先危険につき、泳ぐべからず。",
      ok: true,
      explain: "Biển báo cấm (văn cổ) → べからず đúng.",
    },
  ],
};
