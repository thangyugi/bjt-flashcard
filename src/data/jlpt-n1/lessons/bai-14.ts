import type { N1Lesson } from "../types";

export const bai14: N1Lesson = {
  id: "bai-14",
  num: 14,
  topicJa: "話題・評価の基準",
  topicVi: "Chủ đề · tiêu chuẩn đánh giá",
  chapterJa: "発表の日",
  chapterVi: "Ngày công bố",
  scene:
    "Giữa tháng Mười Hai. Kết quả được công bố — và đề xuất của Mai giành giải nhất! Mọi người nhìn nhau qua \"tiêu chuẩn\" của từng vai trò: trưởng phòng, giám đốc, người mới. Chương này học cách nêu CHỦ ĐỀ và TIÊU CHUẨN ĐÁNH GIÁ.",
  story: [
    {
      jp: "年末[[ともなると]]、会社中が忙しくなる。その慌ただしい朝、社内メールで結果が発表された。最優秀賞は「ベトナム茶ラテ」。マイの企画だった。",
      vi: "Hễ đến cuối năm là cả công ty bận rộn. Vào một buổi sáng tất bật như thế, kết quả được công bố qua email nội bộ. Giải xuất sắc nhất: \"Trà sữa Việt Nam\" — đề xuất của Mai.",
    },
    {
      jp: "健太は文句を言った。「うちの部長[[ときたら]]、昨日から結果を知ってたくせに、何も教えてくれないんだから！」",
      vi: "Kenta càu nhàu: \"Nói đến ông trưởng phòng nhà mình thì, biết kết quả từ hôm qua rồi mà chẳng hé răng gì cả!\"",
    },
    {
      jp: "でも、マイは見てしまった。いつも厳しい部長[[ともあろう]]人が、メールを読みながら目頭を押さえていたのを。",
      vi: "Nhưng Mai đã nhìn thấy: con người như trưởng phòng, vốn luôn nghiêm khắc, vừa đọc email vừa đưa tay day khóe mắt.",
    },
    {
      jp: "授賞式で社長が言った。「リーダー[[たるもの]]、部下の挑戦を支えなければならない。田中部長はそれを見事にやってくれた。」",
      vi: "Tại lễ trao giải, giám đốc nói: \"Đã là người lãnh đạo thì phải nâng đỡ thử thách của cấp dưới. Trưởng phòng Tanaka đã làm điều đó thật xuất sắc.\"",
    },
    {
      jp: "マイはマイクの前で、少し震える声で言った。「まだ新人ですが、新人[[なりに]]精一杯考えました。皆さんのおかげです。」",
      vi: "Đứng trước micro, Mai nói bằng giọng hơi run: \"Tôi vẫn còn là người mới, nhưng tôi đã nghĩ hết sức mình theo cách của một người mới. Tất cả là nhờ mọi người.\"",
    },
  ],
  patterns: [
    {
      id: "tokitara",
      pattern: "〜ときたら",
      meaning: "Nói đến… thì (thật là, bực mình…)",
      nuance:
        "Nêu một người/vật thân quen làm chủ đề để than phiền, chê trách. Vế sau là lời phê bình, bất mãn — thường mang cảm xúc mạnh, khẩu ngữ.",
      forms: ["N + ときたら"],
      position: {
        before: "Người / vật gần gũi: うちの夫・最近の若者・このパソコン",
        after: "Lời than phiền, chê trách",
      },
      register: "Khẩu ngữ · than phiền",
      usage: [
        "Vế sau là đánh giá TIÊU CỰC.",
        "Không dùng với ý chí, yêu cầu, rủ rê ở vế sau.",
      ],
      examples: [
        {
          jp: "最近の若い人[[ときたら]]、言葉の使い方を知らない。",
          vi: "Nói đến giới trẻ dạo này thì, chẳng biết cách dùng từ gì cả.",
        },
        {
          jp: "うちの父[[ときたら]]、何でも母にやってもらっていて、だらしない。",
          vi: "Nói đến bố tôi thì, cái gì cũng để mẹ làm cho, thật luộm thuộm.",
        },
        {
          jp: "このパソコン[[ときたら]]、肝心な時にいつも動かなくなる。",
          vi: "Cái máy tính này thì, lúc quan trọng là y như rằng đứng hình.",
        },
      ],
      dos: ["Than vãn với bạn bè về người/vật quen thuộc."],
      donts: [
        {
          text: "Vế sau khen ngợi → không dùng.",
          bad: "うちの娘ときたら、本当に優しくていい子だ。",
          good: "うちの娘は、本当に優しくていい子だ。",
        },
      ],
      compare: [
        {
          other: "〜といったら (N2)",
          diff: "といったら: nêu chủ đề, có thể khen hoặc chê (cảm thán). ときたら: chủ yếu CHÊ, than phiền.",
        },
        {
          other: "〜にしたら／〜にとって",
          diff: "Nêu lập trường người cảm nhận, không phải chủ đề bị chê.",
        },
      ],
      memo: "と + 来たら = \"hễ nhắc đến… là (bực mình)\" 😤. Kenta: うちの部長ときたら、何も教えてくれない!",
      storyLine: "うちの部長[[ときたら]]、昨日から結果を知ってたくせに、何も教えてくれないんだから！",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "隣の部屋の人＿＿＿、毎晩遅くまで大きな音で音楽を聞いている。",
          opts: ["ときたら", "ともなると", "たるもの", "なりに"],
          answer: 0,
          explain: "Than phiền về người hàng xóm → ときたら.",
        },
        {
          type: "judge",
          q: "うちの母ときたら、料理が上手で何でもおいしく作ってくれる。",
          ok: false,
          explain: "ときたら dùng để than phiền, không dùng để khen.",
          fix: "うちの母は料理が上手で、何でもおいしく作ってくれる。",
        },
      ],
    },
    {
      id: "tomonaruto",
      pattern: "〜ともなると／〜ともなれば",
      meaning: "Hễ đã (đến mức / đến dịp)… thì (đương nhiên)…",
      nuance:
        "Khi đạt đến một giai đoạn, vị trí, thời điểm đặc biệt N thì đương nhiên trạng thái sẽ khác hẳn so với bình thường. Nhấn mạnh sự thay đổi tất yếu theo \"cấp độ\".",
      forms: ["N + ともなると／ともなれば", "V辞書形 + ともなると"],
      position: {
        before: "Giai đoạn / địa vị / dịp: 中学生・部長・年末・五十歳",
        after: "Trạng thái tất yếu thay đổi",
      },
      register: "Văn nói & viết",
      usage: [
        "Vế sau là trạng thái, nhận định; không dùng với ý chí/yêu cầu của người nói.",
        "Chủ ngữ hay có も (子供も…) để nhấn mạnh sự thay đổi.",
      ],
      examples: [
        {
          jp: "子供も小さいときは素直だが、中学生[[ともなると]]、親の言うことを聞かなくなる。",
          vi: "Lúc nhỏ con trẻ ngoan ngoãn, nhưng hễ lên cấp hai là không nghe lời bố mẹ nữa.",
        },
        {
          jp: "人間、五十歳[[ともなれば]]、親の介護や自分の老後のことを考え始める。",
          vi: "Con người ta hễ đến tuổi năm mươi là bắt đầu nghĩ đến việc chăm sóc bố mẹ và tuổi già của mình.",
        },
        {
          jp: "部長[[ともなると]]、責任も重くなる。",
          vi: "Đã lên đến trưởng phòng thì trách nhiệm cũng nặng hơn.",
        },
      ],
      dos: ["Giải thích sự thay đổi tất yếu khi lên một cấp độ, đến một dịp đặc biệt."],
      donts: [
        {
          text: "Vế sau là ý chí / yêu cầu → không dùng.",
          bad: "大学生ともなると、アルバイトをしよう。",
          good: "大学生になったら、アルバイトをしよう。",
        },
      ],
      compare: [
        {
          other: "〜となると (N2)",
          diff: "となると: \"nếu thế thì\" (giả định, suy luận) — 留学するとなると、お金がかかる. ともなると: nhấn mạnh CẤP ĐỘ đặc biệt.",
        },
        {
          other: "〜ともあろう",
          diff: "ともあろう + N: \"người như X mà lại…\" (bất ngờ, chê). ともなると: \"đến cấp X thì đương nhiên…\".",
        },
      ],
      memo: "とも + なる = \"cho đến khi TRỞ THÀNH (cấp) ấy\" 📈. 年末ともなると、会社中が忙しくなる.",
      storyLine: "年末[[ともなると]]、会社中が忙しくなる。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "週末＿＿＿、この観光地は若者でにぎわう。",
          opts: ["ともなると", "ときたら", "ともあろう", "たるもの"],
          answer: 0,
          explain: "Đến dịp đặc biệt (cuối tuần) → trạng thái tất yếu (đông người) → ともなると.",
        },
        {
          type: "order",
          before: "",
          pieces: ["一流", "の", "料理人", "ともなれば"],
          after: "、材料選びにもこだわるものだ。",
          star: 2,
          vi: "Đã là đầu bếp hạng nhất thì đương nhiên kỹ tính cả khâu chọn nguyên liệu.",
          explain: "一流の料理人ともなれば、…こだわるものだ.",
        },
      ],
    },
    {
      id: "tomo-arou",
      pattern: "〜ともあろう",
      meaning: "Người (có địa vị cao) như… mà lại…",
      nuance:
        "N là người có địa vị, năng lực đáng kính trọng; vậy mà lại có hành động không xứng đáng → bất ngờ, bất mãn. Cũng dùng để nói người như thế thì NÊN hành động xứng đáng.",
      forms: ["N + ともあろう + N(者・人・機関)"],
      position: {
        before: "Người / tổ chức có địa vị: 国会議員・大学教授・警察",
        after: "ともあろう + 人／者 + が + hành động không xứng đáng",
      },
      register: "Văn viết · phê phán",
      usage: [
        "Bắt buộc có danh từ chỉ người/tổ chức sau ともあろう (人, 者, 会社…).",
        "Vế sau thường là sự bất ngờ, không thể tin, hoặc 〜べきだ.",
      ],
      examples: [
        {
          jp: "国会議員[[ともあろう]]人が、差別的な発言をするなんて信じられない。",
          vi: "Người như một nghị sĩ quốc hội mà lại phát ngôn phân biệt đối xử, thật không thể tin được.",
        },
        {
          jp: "学会の会長[[ともあろう]]人は、最近の研究についてしっかり把握しておくべきだ。",
          vi: "Người ở cương vị chủ tịch hội học thuật thì nên nắm vững các nghiên cứu gần đây.",
        },
        {
          jp: "警察[[ともあろう]]組織が、証拠を隠すとは何事だ。",
          vi: "Một tổ chức như cảnh sát mà lại che giấu chứng cứ, thật là chuyện gì thế này!",
        },
      ],
      dos: ["Phê phán người có địa vị hành động không xứng; hoặc (như truyện) bất ngờ khi thấy mặt khác của họ."],
      donts: [
        {
          text: "Không có danh từ sau ともあろう → sai.",
          bad: "大学教授ともあろうが、こんな間違いをした。",
          good: "大学教授ともあろう人が、こんな間違いをした。",
        },
      ],
      compare: [
        {
          other: "〜たるもの",
          diff: "たるもの: \"đã là X thì PHẢI…\" (chuẩn mực). ともあろう: \"X mà lại…\" (bất ngờ vì không đúng chuẩn).",
        },
        {
          other: "〜にあるまじき (Chương 13)",
          diff: "あるまじき: hành vi không được phép. ともあろう: nhấn vào sự BẤT NGỜ của người nói.",
        },
      ],
      memo: "あろう = \"đáng lẽ là\" → \"người ĐÁNG LẼ như thế mà…\" 😲. 厳しい部長ともあろう人が、目頭を押さえていた.",
      storyLine: "いつも厳しい部長[[ともあろう]]人が、メールを読みながら目頭を押さえていたのを。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "医者＿＿＿者が、患者の秘密を他人に話すべきではない。",
          opts: ["ともあろう", "ともなると", "ときたら", "なりの"],
          answer: 0,
          explain: "Người ở địa vị bác sĩ + danh từ 者 → ともあろう.",
        },
        {
          type: "judge",
          q: "社長ともあろう人が、社員の前でそんな言い訳をするとは驚いた。",
          ok: true,
          explain: "Người địa vị cao + hành động không xứng → bất ngờ → đúng.",
        },
      ],
    },
    {
      id: "tarumono",
      pattern: "〜たるもの（は）",
      meaning: "Đã là… thì (phải)…",
      nuance:
        "Người ở địa vị cao quý hoặc có trọng trách như N thì PHẢI có tư cách, hành động xứng đáng. Vế sau là chuẩn mực: 〜べきだ, 〜なければならない, 〜ものだ.",
      forms: ["N + たるもの（は）", "N + たる + N"],
      position: {
        before: "Địa vị / vai trò: 教師・経営者・社会人・男",
        after: "Chuẩn mực: べきだ・なければならない・当然だ",
      },
      register: "Văn viết · cứng, khuôn mẫu",
      usage: [
        "Vế sau là nghĩa vụ, chuẩn mực.",
        "Dạng N たる N: 指導者たる者, 教師たる資格.",
      ],
      examples: [
        {
          jp: "経営者[[たるもの]]は、一般的な法律や年金制度について知っておかなければならない。",
          vi: "Đã là người kinh doanh thì phải nắm được luật pháp cơ bản và chế độ lương hưu.",
        },
        {
          jp: "社会人[[たるもの]]、挨拶や時間を守ることなどできて当然だろう。",
          vi: "Đã là người đi làm thì chào hỏi, đúng giờ là điều đương nhiên.",
        },
        {
          jp: "教師[[たるもの]]、生徒の手本とならなければならない。",
          vi: "Đã là giáo viên thì phải làm gương cho học sinh.",
        },
      ],
      dos: ["Phát biểu về chuẩn mực, đạo đức nghề nghiệp."],
      donts: [
        {
          text: "Vế sau không phải chuẩn mực / nghĩa vụ → không tự nhiên.",
          bad: "学生たるもの、昨日映画を見た。",
          good: "学生たるもの、勉強を第一にすべきだ。",
        },
      ],
      compare: [
        {
          other: "〜として (N3)",
          diff: "として: \"với tư cách\" trung tính. たるもの: nhấn mạnh địa vị cao + chuẩn mực PHẢI.",
        },
        {
          other: "〜まじき (Chương 13)",
          diff: "たるもの = PHẢI làm (chuẩn mực tích cực). まじき = KHÔNG được làm.",
        },
      ],
      memo: "たる (= である) + もの = \"kẻ LÀ X\" 👑 — giọng của châm ngôn. 社長: リーダーたるもの、部下の挑戦を支えなければならない.",
      storyLine: "リーダー[[たるもの]]、部下の挑戦を支えなければならない。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "政治家＿＿＿、国民の声に耳を傾けるべきだ。",
          opts: ["たるもの", "ときたら", "ともあろう", "なりに"],
          answer: 0,
          explain: "Đã là chính trị gia thì phải… (chuẩn mực) → たるもの.",
        },
        {
          type: "choice",
          label: "Phân biệt",
          q: "A: プロ＿＿、体調管理も仕事のうちだ。 B: プロ＿＿人が、こんな基本的なミスをするとは。",
          opts: [
            "A: たるもの／B: ともあろう",
            "A: ともあろう／B: たるもの",
            "A: ときたら／B: たるもの",
            "A: たるもの／B: ときたら",
          ],
          answer: 0,
          explain: "A: chuẩn mực → たるもの. B: người như X mà lại… → ともあろう.",
        },
      ],
    },
    {
      id: "narini",
      pattern: "〜なりに",
      variants: ["〜なりの N"],
      meaning: "Theo cách / theo khả năng (có hạn) của…",
      nuance:
        "Tuy mức độ không cao (người mới, trẻ con, ít tiền…) nhưng trong phạm vi đó vẫn làm hết sức / có giá trị riêng tương ứng. Cụm それなりに = ở mức tương ứng, tạm được.",
      forms: ["N／Vthể thường／Aい + なりに", "Aな (bỏ な) + なりに", "N + なりの + N"],
      position: {
        before: "Mức độ có hạn: 子供・新人・私・それ",
        after: "Hành động / thái độ tương ứng (考える・努力する・価値がある)",
      },
      register: "Văn nói & viết",
      usage: [
        "Hay dùng khiêm tốn về bản thân: 私なりに頑張りました.",
        "それなりに / それなりの = ở mức tương xứng.",
      ],
      examples: [
        {
          jp: "あの子も子供[[なりに]]、親のことを心配して気を遣っているのだ。",
          vi: "Đứa bé ấy cũng theo cách của một đứa trẻ mà lo lắng, để ý đến bố mẹ.",
        },
        {
          jp: "少し傷があっても、この作家の皿ならそれ[[なりの]]価値は十分ある。",
          vi: "Dù có hơi xước, nếu là đĩa của nghệ nhân này thì vẫn có giá trị tương xứng.",
        },
        {
          jp: "分からないなりに、自分で調べてみた。",
          vi: "Dù không hiểu lắm, tôi vẫn tự tìm hiểu theo khả năng của mình.",
        },
      ],
      dos: ["Nói khiêm tốn: \"theo cách của tôi\"; ghi nhận nỗ lực của người có điều kiện hạn chế."],
      donts: [
        {
          text: "Đối tượng ở mức cao, xuất sắc → không hợp với sắc thái \"có hạn\".",
          bad: "天才なりに、よく考えた。",
          good: "さすが天才だけあって、よく考えた。",
        },
      ],
      compare: [
        {
          other: "〜なり (Chương 1) / 〜なり〜なり (Chương 4)",
          diff: "Ba chữ なり: vừa… là (Ch.1) · A hay B (Ch.4) · theo cách của (Ch.14). Nhìn từ đứng trước: V辞書形 / cặp lặp / N-に.",
        },
        {
          other: "〜らしく (N3)",
          diff: "らしく: đúng kiểu, xứng với (学生らしく). なりに: trong giới hạn của… (学生なりに).",
        },
      ],
      memo: "なりに = \"theo DÁNG của mình\" 🌱 — cây nhỏ thì vươn theo kiểu cây nhỏ. Mai: 新人なりに精一杯考えました.",
      storyLine: "新人[[なりに]]精一杯考えました。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "経験は少ないですが、私＿＿＿一生懸命がんばります。",
          opts: ["なりに", "たるもの", "ときたら", "ともなると"],
          answer: 0,
          explain: "Khiêm tốn: theo khả năng của tôi → 私なりに.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "安いホテルだったが、それなりに快適だった。",
          opts: [
            "Khách sạn rẻ nhưng cũng thoải mái ở mức tương xứng.",
            "Khách sạn rẻ nên hoàn toàn không thoải mái.",
            "Khách sạn đắt nhưng không thoải mái.",
            "Khách sạn rẻ nhưng thoải mái hơn khách sạn đắt.",
          ],
          answer: 0,
          explain: "それなりに = ở mức tương xứng (với giá rẻ).",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Vế sau", "Sắc thái"],
    rows: [
      ["〜ときたら", "Nói đến… thì (bực)", "Than phiền", "Khẩu ngữ, chê"],
      ["〜ともなると", "Đến cấp/dịp… thì đương nhiên", "Thay đổi tất yếu", "Trung tính"],
      ["〜ともあろう", "Người như… mà lại", "Hành động không xứng", "Bất ngờ, phê phán"],
      ["〜たるもの", "Đã là… thì phải", "Chuẩn mực", "Châm ngôn, cứng"],
      ["〜なりに", "Theo cách / mức của", "Nỗ lực tương ứng", "Khiêm tốn, ghi nhận"],
    ],
  },
  links: [
    "Bộ ba \"địa vị\": たるもの (phải…) · ともあろう (mà lại…) · あるまじき (không được… — Ch.13). Học cùng để không nhầm.",
    "ともなると ↔ となると (N2): một chữ も khác hẳn sắc thái.",
    "Ôn N2: といえば・といったら・にしたら. N1 thêm ときたら (chủ đề để than phiền).",
    "なり lần thứ ba trong khóa! Ch.1 (vừa… là), Ch.4 (A なり B なり), Ch.14 (なりに).",
  ],
  hook: "Ngày công bố: cuối năm thì bận (ともなると) · Kenta than về sếp (ときたら) · ông sếp nghiêm khắc mà lại rơi lệ (ともあろう) · đã là lãnh đạo thì phải nâng đỡ (たるもの) · người mới cố gắng theo cách của người mới (なりに).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜ときたら", "Nói đến… thì (than phiền)"],
        ["〜ともなると", "Đến cấp/dịp… thì đương nhiên"],
        ["〜ともあろう", "Người như… mà lại…"],
        ["〜たるもの", "Đã là… thì phải…"],
        ["〜なりに", "Theo cách / khả năng của…"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "うちの犬＿＿＿、来客があるたびに吠えてうるさくてしかたがない。",
      opts: ["ときたら", "たるもの", "なりに", "ともあろう"],
      answer: 0,
      explain: "Than phiền về con chó nhà mình → ときたら.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "大企業の社長＿＿＿人が、こんな簡単な質問にも答えられないとは。",
      opts: ["ともあろう", "ともなると", "たるもの", "ときたら"],
      answer: 0,
      explain: "Người địa vị cao + 人 + hành động không xứng → ともあろう.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "十二月＿＿＿、街はクリスマスの飾りで華やかになる。",
      opts: ["ともなると", "ともあろう", "たるもの", "なりに"],
      answer: 0,
      explain: "Đến dịp (tháng 12) → đương nhiên phố xá rực rỡ → ともなると.",
    },
    {
      type: "order",
      before: "",
      pieces: ["子供", "には", "子供なりの", "悩みが"],
      after: "あるものだ。",
      star: 2,
      vi: "Trẻ con cũng có những nỗi lo riêng của trẻ con.",
      explain: "子供には子供なりの悩みがある.",
    },
    {
      type: "judge",
      q: "医者たるもの、患者の話をよく聞くべきだ。",
      ok: true,
      explain: "Địa vị + chuẩn mực (べきだ) → đúng.",
    },
  ],
};
