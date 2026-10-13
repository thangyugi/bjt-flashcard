import type { N1Lesson } from "../types";

export const bai19: N1Lesson = {
  id: "bai-19",
  num: 19,
  topicJa: "評価・感想",
  topicVi: "Đánh giá · cảm tưởng",
  chapterJa: "送別会",
  chapterVi: "Tiệc chia tay",
  scene:
    "Tháng Năm. Mai sắp sang Việt Nam phụ trách dự án mới. Phòng Marketing tổ chức tiệc chia tay. Ai cũng đánh giá, cảm thán — người khen, người khóc, người hát dở tệ. Chương này học cách nói ĐÁNH GIÁ và CẢM TƯỞNG mạnh.",
  story: [
    {
      jp: "送別会の最初に、田中部長が挨拶した。「マイさんは、この一年で信頼する[[に足る]]仲間になった。ベトナムでもきっと活躍してくれるだろう。」",
      vi: "Mở đầu tiệc chia tay, trưởng phòng Tanaka phát biểu: \"Chỉ trong một năm, Mai đã trở thành một người đồng nghiệp đáng tin cậy. Ở Việt Nam chắc chắn em cũng sẽ tỏa sáng.\"",
    },
    {
      jp: "佐藤先輩からのプレゼントは、あの「新しい春」の絵だった。プロの鑑賞にも[[堪える]]見事な作品だ。マイは胸がいっぱいになった。",
      vi: "Quà của chị Satō chính là bức \"Mùa xuân mới\". Một tác phẩm tuyệt đẹp, đủ sức để giới chuyên môn thưởng lãm. Mai xúc động nghẹn ngào.",
    },
    {
      jp: "ところが、健太の歌は聞くに[[堪えない]]ほど下手で、会場は笑いに包まれた。しかも途中で歌詞を忘れて黙り込むとは、失礼[[極まりない]]、と部長は笑いながら怒った。",
      vi: "Thế nhưng bài hát của Kenta dở đến mức không thể nghe nổi, cả phòng cười ồ. Lại còn quên lời giữa chừng rồi im bặt — thật là vô lễ hết chỗ nói, trưởng phòng vừa cười vừa mắng.",
    },
    {
      jp: "最後に、健太が小さな声で言った。「マイがいなくなるのは…さびしい[[限りだ]]よ。」まさか健太が泣く[[とは]]。マイもつられて涙がこぼれた。",
      vi: "Cuối cùng, Kenta nói khẽ: \"Mai đi rồi… buồn biết bao.\" Không ngờ Kenta lại khóc. Mai cũng bất giác rơi nước mắt theo.",
    },
    {
      jp: "帰り道、マイは夜空を見上げた。この一年のうれしさ[[といったらない]]。そして、少しの寂しさも。",
      vi: "Trên đường về, Mai ngước nhìn bầu trời đêm. Niềm hạnh phúc của một năm qua thật không lời nào tả xiết. Và cả một chút nỗi buồn.",
    },
  ],
  patterns: [
    {
      id: "ni-taru",
      pattern: "〜に足る／〜に足らない",
      meaning: "Đủ (xứng đáng) để… / không đáng để…",
      nuance:
        "N/V có đủ giá trị để được đánh giá như vậy. Thường đứng trước danh từ để bổ nghĩa. 取るに足らない = vặt vãnh, không đáng kể.",
      forms: ["V辞書形 + に足る + N", "N(する) + に足る + N", "取るに足らない (cụm cố định)"],
      position: {
        before: "信頼する・尊敬する・満足する・語る",
        after: "に足る + danh từ (人物・内容・理由)",
      },
      register: "Văn viết · đánh giá",
      usage: [
        "Hay gặp: 信頼に足る, 尊敬に足る, 満足するに足る, 取るに足らない.",
        "Câu phủ định: 〜に足るものとは思えない / 〜に足らない.",
      ],
      examples: [
        {
          jp: "次の首相は、国民の代表と呼ぶ[[に足る]]人物であってほしい。",
          vi: "Mong thủ tướng tiếp theo là người xứng đáng được gọi là đại diện của nhân dân.",
        },
        {
          jp: "ネットで得たその情報は、信頼[[に足る]]ものとは思えない。",
          vi: "Thông tin lấy từ mạng đó, tôi không nghĩ là đủ đáng tin.",
        },
        {
          jp: "誰が離婚したとかしないとかなんて、取る[[に足らない]]ニュースだ。",
          vi: "Ai ly hôn hay không ly hôn — đó là loại tin vặt không đáng bận tâm.",
        },
      ],
      dos: ["Đánh giá giá trị, độ tin cậy của người / thông tin."],
      donts: [
        {
          text: "Dùng với động từ không mang tính đánh giá → không tự nhiên.",
          bad: "このかばんは持つに足る。",
          good: "このかばんは持ちやすい。",
        },
      ],
      compare: [
        {
          other: "〜に値する (N2)",
          diff: "Gần nghĩa nhất (尊敬に値する). に値する: \"có giá trị\"; に足る: \"đủ để\". Cả hai văn viết.",
        },
        {
          other: "〜に堪える",
          diff: "に堪える: \"chịu được (sự thưởng lãm, phê bình)\" — chất lượng đủ cao. に足る: đủ giá trị để (tin, kính trọng).",
        },
      ],
      memo: "足る = \"đủ\" ✅. 信頼するに足る仲間 — người đồng đội đủ để tin.",
      storyLine: "マイさんは、この一年で信頼する[[に足る]]仲間になった。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "彼の説明は、私たちを納得させる＿＿＿ものではなかった。",
          opts: ["に足る", "に堪えない", "限りの", "極まる"],
          answer: 0,
          explain: "Đủ để thuyết phục → に足る + もの.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "そんな取るに足らないことで悩むな。",
          opts: [
            "Đừng phiền lòng vì chuyện vặt vãnh như thế.",
            "Đừng lấy những thứ không đủ.",
            "Đừng lo vì thiếu đồ.",
            "Đừng bỏ qua chuyện quan trọng như thế.",
          ],
          answer: 0,
          explain: "取るに足らない = không đáng kể, vặt vãnh.",
        },
      ],
    },
    {
      id: "ni-taeru",
      pattern: "〜に堪える／〜に堪えない（評価）",
      meaning: "Đủ (chất lượng) để… / Không thể (nhìn, nghe) nổi",
      nuance:
        "に堪える: có đủ giá trị để chịu được sự thưởng lãm, phê bình. に堪えない: tệ đến mức không chịu nổi khi nhìn/nghe. Chỉ đi với vài từ: 見る, 聞く, 読む, 鑑賞, 批判.",
      forms: ["V辞書形／N + に堪える", "V辞書形（見る・聞く・読む）+ に堪えない"],
      position: {
        before: "見る・聞く・読む・鑑賞・批判・使用",
        after: "に堪える (đủ chất lượng) / に堪えない (không thể chịu nổi)",
      },
      register: "Văn viết",
      usage: [
        "Cụm hay gặp: 鑑賞に堪える, 批判に堪える, 見るに堪えない, 聞くに堪えない.",
        "Khác với 〜に堪えない (cảm xúc) ở Chương 20: 感謝に堪えない.",
      ],
      examples: [
        {
          jp: "優れた児童文学は、大人の鑑賞にも[[堪える]]ものだ。",
          vi: "Văn học thiếu nhi xuất sắc thì cũng đủ sức để người lớn thưởng thức.",
        },
        {
          jp: "人の悪口は、聞くに[[堪えない]]。",
          vi: "Những lời nói xấu người khác thì không thể nghe nổi.",
        },
        {
          jp: "事故現場は、見るに[[堪えない]]ほどひどい状態だった。",
          vi: "Hiện trường tai nạn thảm khốc đến mức không thể nhìn nổi.",
        },
      ],
      dos: ["Đánh giá chất lượng tác phẩm; diễn tả sự khó chịu khi nhìn/nghe điều tệ."],
      donts: [
        {
          text: "Đi với động từ tự do → sai.",
          bad: "この料理は食べるに堪えない。",
          good: "この料理はまずくて食べられたものではない。",
        },
      ],
      compare: [
        {
          other: "〜に堪えない（感情）(Chương 20)",
          diff: "Ch.19: 見る／聞くに堪えない = tệ không chịu nổi. Ch.20: 感謝／喜びに堪えない = cảm xúc tràn đầy (trang trọng). Cùng hình thức, khác nghĩa!",
        },
        {
          other: "〜に足る",
          diff: "に足る: đủ giá trị để (tin, tôn trọng). に堪える: đủ chất lượng để (thưởng lãm, phê bình).",
        },
      ],
      memo: "堪える = \"chịu đựng\" 🎨: tác phẩm CHỊU ĐƯỢC con mắt chuyên gia (堪える); giọng hát Kenta thì tai không CHỊU NỔI (聞くに堪えない).",
      storyLine: "プロの鑑賞にも[[堪える]]見事な作品だ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "彼の暴言は、聞く＿＿＿ものだった。",
          opts: ["に堪えない", "に足る", "限りの", "といったらない"],
          answer: 0,
          explain: "Lời lẽ thô tục → không thể nghe nổi → 聞くに堪えない.",
        },
        {
          type: "judge",
          q: "この論文は専門家の批判にも十分堪える内容だ。",
          ok: true,
          explain: "批判に堪える = đủ chất lượng để chịu được phê bình → đúng.",
        },
      ],
    },
    {
      id: "to-ittaranai",
      pattern: "〜といったらない",
      variants: ["〜といったらありはしない", "〜ったらない"],
      meaning: "…không tả xiết, hết chỗ nói",
      nuance:
        "Mức độ cực hạn đến mức không thể diễn tả bằng lời. Dùng được cho cả tốt lẫn xấu. Hay đi với danh từ hóa tính từ bằng さ (美しさ, 寂しさ). Có thể bỏ ない: 〜といったら…",
      forms: ["Aい／Aな（だ）／N + といったらない", "Aさ + といったらない"],
      position: {
        before: "Tính từ / danh từ chỉ trạng thái (うれしさ・だらしない・恥ずかしさ)",
        after: "(cuối câu)",
      },
      register: "Văn nói & viết · cảm thán",
      usage: [
        "Có thể bỏ lửng: 〜の美しさといったら…",
        "Khẩu ngữ: 〜ったらない.",
      ],
      examples: [
        {
          jp: "あいつのだらしなさ[[といったらない]]。物はよくなくすし、時間にもルーズだし。",
          vi: "Sự luộm thuộm của gã đó thì hết chỗ nói. Đồ đạc hay mất, giờ giấc cũng chẳng ra gì.",
        },
        {
          jp: "富士山の頂上から見た景色の素晴らしさ[[といったら]]…。いつかきっとまた行きたい。",
          vi: "Cảnh nhìn từ đỉnh Phú Sĩ đẹp thì… không lời nào tả. Nhất định có ngày tôi sẽ quay lại.",
        },
        {
          jp: "みんなの前で転んだときの恥ずかしさ[[といったらなかった]]。",
          vi: "Lúc ngã trước mặt mọi người, xấu hổ không để đâu cho hết.",
        },
      ],
      dos: ["Cảm thán mạnh về cảm xúc, trạng thái cực độ."],
      donts: [
        {
          text: "Mức độ bình thường → không tự nhiên.",
          bad: "今日の天気は少し寒いといったらない。",
          good: "今日は寒いといったらない。（cực lạnh）",
        },
      ],
      compare: [
        {
          other: "〜限りだ",
          diff: "限りだ: cảm xúc CỦA NGƯỜI NÓI (うれしい限りだ). といったらない: cả đặc điểm của đối tượng (だらしなさ), mạnh hơn.",
        },
        {
          other: "〜極まりない",
          diff: "極まりない: chủ yếu đánh giá XẤU, từ Hán (失礼極まりない). といったらない: tốt hoặc xấu.",
        },
      ],
      memo: "\"Nếu nói về… thì — KHÔNG có (từ nào để tả)!\" 🤩. この一年のうれしさといったらない.",
      storyLine: "この一年のうれしさ[[といったらない]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "初めて自分の子供を抱いたときの感動＿＿＿。",
          opts: ["といったらなかった", "に足らなかった", "に堪えなかった", "極まった"],
          answer: 0,
          explain: "Cảm xúc cực độ không tả được → といったらない.",
        },
        {
          type: "order",
          before: "あの店の店員の",
          pieces: ["態度の", "悪さ", "と", "いったらない"],
          after: "。",
          star: 1,
          vi: "Thái độ nhân viên quán đó thì tệ hết chỗ nói.",
          explain: "態度の悪さといったらない.",
        },
      ],
    },
    {
      id: "kagirida",
      pattern: "〜限りだ",
      meaning: "Thật là… vô cùng (cảm xúc của người nói)",
      nuance:
        "Người nói cảm thấy một cảm xúc ở mức cao nhất. Đi với tính từ chỉ CẢM XÚC: うれしい, 寂しい, 心強い, 恐ろしい, うらやましい.",
      forms: ["Aい + 限りだ", "Aな-な + 限りだ"],
      position: {
        before: "Tính từ cảm xúc: うれしい・寂しい・心細い・うらやましい",
        after: "(cuối câu)",
      },
      register: "Văn nói & viết trang trọng vừa",
      usage: [
        "Chủ thể cảm xúc là NGƯỜI NÓI.",
        "Không dùng với tính từ mô tả khách quan (高い, 大きい).",
      ],
      examples: [
        {
          jp: "最近友達はみんな忙しいのか、誰からも連絡がなく、寂しい[[限りだ]]。",
          vi: "Dạo này bạn bè chắc bận cả, chẳng ai liên lạc, buồn ơi là buồn.",
        },
        {
          jp: "この近所で強盗事件があったらしい。恐ろしい[[限りだ]]。",
          vi: "Hình như khu này có vụ cướp. Thật đáng sợ vô cùng.",
        },
        {
          jp: "皆様に応援していただき、心強い[[限りです]]。",
          vi: "Được mọi người ủng hộ, tôi thấy vững tâm vô cùng.",
        },
      ],
      dos: ["Bày tỏ cảm xúc mạnh của bản thân trong phát biểu, thư từ."],
      donts: [
        {
          text: "Tính từ mô tả khách quan → không dùng.",
          bad: "このビルは高い限りだ。",
          good: "このビルは本当に高い。",
        },
      ],
      compare: [
        {
          other: "〜といったらない",
          diff: "といったらない dùng cả đặc điểm của đối tượng (người khác luộm thuộm). 限りだ chỉ CẢM XÚC của mình.",
        },
        {
          other: "〜てならない (N2)",
          diff: "てならない: cảm xúc trào lên tự nhiên, không kìm được (心配でならない). 限りだ: mức cao nhất, cảm thán.",
        },
      ],
      memo: "限り = \"giới hạn\" → cảm xúc chạm tới giới hạn 🌊. Kenta: マイがいなくなるのはさびしい限りだ.",
      storyLine: "マイがいなくなるのは…さびしい[[限りだ]]よ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "後輩が大きな賞をもらって、うれしい＿＿＿。",
          opts: ["限りだ", "に足る", "に堪えない", "とは"],
          answer: 0,
          explain: "Cảm xúc của người nói ở mức cao nhất → うれしい限りだ.",
        },
        {
          type: "judge",
          q: "この部屋は広い限りだ。",
          ok: false,
          explain: "広い là tính từ mô tả khách quan, không phải cảm xúc.",
          fix: "こんな広い部屋に住めるなんて、うらやましい限りだ。",
        },
      ],
    },
    {
      id: "kiwamaru",
      pattern: "〜極まる／〜極まりない",
      meaning: "…hết mức, cực kỳ… (thường là xấu)",
      nuance:
        "Trạng thái đạt đến cực điểm. Hay đi với tính từ な gốc Hán mang nghĩa tiêu cực: 失礼, 危険, 不愉快, 退屈. 極まる và 極まりない cùng nghĩa (đều là \"cực kỳ\"). Cụm 感極まる = xúc động tột độ.",
      forms: ["Aな (bỏ な) + 極まる", "Aな (bỏ な) + 極まりない", "感極まって (cụm cố định)"],
      position: {
        before: "Từ Hán chỉ trạng thái xấu: 失礼・危険・無礼・退屈・不愉快",
        after: "(cuối câu) hoặc + danh từ",
      },
      register: "Văn viết · rất cứng",
      usage: [
        "Chủ yếu với tính từ な gốc Hán (2 chữ kanji).",
        "Lưu ý: 極まりない KHÔNG phải phủ định — vẫn là \"cực kỳ\".",
      ],
      examples: [
        {
          jp: "このような不当な判決が出たことは、残念[[極まる]]。",
          vi: "Việc đưa ra phán quyết bất công như thế này thật đáng tiếc vô cùng.",
        },
        {
          jp: "運転中にスマホを見るなんて、危険[[極まりない]]。",
          vi: "Vừa lái xe vừa xem điện thoại thì nguy hiểm hết mức.",
        },
        {
          jp: "初優勝を決めた選手は、インタビュー中、感[[極まって]]涙を流した。",
          vi: "Vận động viên lần đầu vô địch, trong lúc phỏng vấn đã xúc động tột độ mà rơi lệ.",
        },
      ],
      dos: ["Phê phán gay gắt (văn viết); cụm 感極まる khi xúc động."],
      donts: [
        {
          text: "Tính từ い thuần Nhật → không tự nhiên.",
          bad: "この映画はつまらない極まりない。",
          good: "この映画は退屈極まりない。",
        },
      ],
      compare: [
        {
          other: "〜といったらない",
          diff: "といったらない: tốt/xấu, nói & viết. 極まりない: chủ yếu xấu, từ Hán, rất cứng.",
        },
        {
          other: "〜の極み",
          diff: "N の極み = đỉnh cao của (光栄の極み — vinh hạnh tột cùng), dùng cả nghĩa tốt.",
        },
      ],
      memo: "極 = \"cực\" (Bắc cực, cực điểm) 🧊. \"極まりない\" = không có điểm cực (vô cực) → vẫn là CỰC KỲ! 失礼極まりない.",
      storyLine: "途中で歌詞を忘れて黙り込むとは、失礼[[極まりない]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "約束の時間に二時間も遅れて謝りもしないなんて、失礼＿＿＿。",
          opts: ["極まりない", "限りだ", "に足る", "に堪える"],
          answer: 0,
          explain: "Từ Hán 失礼 + đánh giá xấu tột độ → 極まりない.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "彼の態度は不愉快極まりない。",
          opts: [
            "Thái độ của anh ta khó chịu hết mức.",
            "Thái độ của anh ta không hề khó chịu.",
            "Thái độ của anh ta hơi khó chịu một chút.",
            "Thái độ của anh ta dễ chịu vô cùng.",
          ],
          answer: 0,
          explain: "極まりない = cực kỳ (không phải phủ định).",
        },
      ],
    },
    {
      id: "towa",
      pattern: "〜とは",
      meaning: "…thật không ngờ! / Không ngờ lại…",
      nuance:
        "Bày tỏ sự kinh ngạc, sửng sốt, cảm phục trước một sự thật. Vế sau là cảm xúc (驚いた, 信じられない, 思わなかった) — có thể lược bỏ: 〜とは…",
      forms: ["Vthể thường／Aい + とは", "Aな／N（だ）+ とは"],
      position: {
        before: "Sự thật gây bất ngờ",
        after: "Cảm xúc: 驚きだ・信じられない・思わなかった (có thể lược)",
      },
      register: "Văn nói & viết · cảm thán",
      usage: [
        "Hay đi với まさか: まさか〜とは.",
        "Thường không dùng về chính hành động của mình.",
      ],
      examples: [
        {
          jp: "鳥の足が二本であることさえ知らない子供がいる[[とは]]驚きだ。",
          vi: "Có những đứa trẻ không biết chim có hai chân — thật đáng kinh ngạc.",
        },
        {
          jp: "滝があると聞いてここまで歩いてきたのに、行き止まり[[とは]]…。",
          vi: "Nghe nói có thác nên mới đi bộ tới đây, ai ngờ lại là đường cụt…",
        },
        {
          jp: "まさか彼が会社を辞める[[とは]]思わなかった。",
          vi: "Không ngờ anh ấy lại nghỉ việc.",
        },
      ],
      dos: ["Cảm thán khi gặp sự thật ngoài dự đoán."],
      donts: [
        {
          text: "Đừng nhầm với とは định nghĩa: 「N とは〜のことだ」 = \"N là…\" — không mang nghĩa kinh ngạc.",
          good: "民主主義とは、国民が主権を持つ政治のことだ。",
        },
      ],
      compare: [
        {
          other: "〜なんて (N3)",
          diff: "なんて: khẩu ngữ, có thể khinh thường. とは: văn viết hơn, kinh ngạc thuần túy.",
        },
        {
          other: "〜と思いきや (Chương 8)",
          diff: "と思いきや: dự đoán → kết quả ngược. とは: kinh ngạc trực tiếp trước sự thật.",
        },
      ],
      memo: "とは… 😮 — câu nói bỏ lửng vì quá bất ngờ. まさか健太が泣くとは!",
      storyLine: "まさか健太が泣く[[とは]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "あんなに元気だった祖父が入院する＿＿＿、思ってもみなかった。",
          opts: ["とは", "限り", "に足る", "極まり"],
          answer: 0,
          explain: "Kinh ngạc trước sự thật → とは.",
        },
        {
          type: "judge",
          q: "十歳の子供が大学に合格するとは、本当に驚いた。",
          ok: true,
          explain: "Kinh ngạc trước sự thật về người khác → đúng.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Đi với", "Tốt / xấu"],
    rows: [
      ["〜に足る", "Đủ (xứng đáng) để", "信頼・尊敬・取るに足らない", "Đánh giá giá trị"],
      ["〜に堪える／堪えない", "Đủ chất lượng / không chịu nổi", "鑑賞・見る・聞く", "Cả hai"],
      ["〜といったらない", "Không tả xiết", "Aさ / N", "Cả hai"],
      ["〜限りだ", "Vô cùng (cảm xúc của mình)", "Tính từ cảm xúc", "Cả hai"],
      ["〜極まりない", "Cực kỳ", "Từ Hán な", "Chủ yếu xấu"],
      ["〜とは", "Không ngờ!", "Sự thật bất ngờ", "Kinh ngạc"],
    ],
  },
  links: [
    "Bộ ba \"cực độ\": といったらない (tả xiết) · 限りだ (cảm xúc mình) · 極まりない (từ Hán, xấu). Đề hay hỏi phân biệt!",
    "に堪えない có HAI nghĩa: tệ không chịu nổi (Ch.19) và cảm xúc tràn đầy (Ch.20).",
    "Ôn N2: に値する, てたまらない, てならない, ことか.",
    "とは: kinh ngạc (Ch.19) ≠ とは: định nghĩa (N3: 〜とは〜のことだ).",
  ],
  hook: "Tiệc chia tay: người đồng nghiệp đáng tin (に足る) · bức tranh đủ tầm thưởng lãm (に堪える) · giọng hát không nghe nổi (に堪えない) · vô lễ hết mức (極まりない) · buồn vô cùng (限りだ) · không ngờ Kenta khóc (とは) · hạnh phúc không tả xiết (といったらない).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜に足る", "Đủ (xứng đáng) để"],
        ["聞くに堪えない", "Không thể nghe nổi"],
        ["〜といったらない", "Không lời nào tả xiết"],
        ["〜限りだ", "Vô cùng (cảm xúc của mình)"],
        ["〜極まりない", "Cực kỳ (thường xấu)"],
        ["〜とは", "Thật không ngờ!"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "一人で異国の地に住むのは、心細い＿＿＿。",
      opts: ["限りだ", "極まりない", "に足る", "とは"],
      answer: 0,
      explain: "Tính từ cảm xúc của người nói → 心細い限りだ.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "夜中に大音量で音楽を流すなんて、迷惑＿＿＿。",
      opts: ["極まりない", "限りだ", "に足る", "に堪える"],
      answer: 0,
      explain: "Từ Hán 迷惑 + đánh giá xấu → 迷惑極まりない.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "この作品は、世界の美術館での展示に＿＿＿完成度だ。",
      opts: ["堪える", "堪えない", "足らない", "極まる"],
      answer: 0,
      explain: "Đủ chất lượng để trưng bày → 展示に堪える.",
    },
    {
      type: "order",
      before: "",
      pieces: ["まさか", "あの二人が", "結婚する", "とは"],
      after: "思わなかった。",
      star: 2,
      vi: "Không ngờ hai người đó lại kết hôn.",
      explain: "まさかあの二人が結婚するとは思わなかった.",
    },
    {
      type: "judge",
      q: "この映画の退屈さといったらない。途中で寝てしまった。",
      ok: true,
      explain: "Đánh giá cực độ (chán) → といったらない đúng.",
    },
  ],
};
