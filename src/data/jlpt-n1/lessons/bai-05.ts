import type { N1Lesson } from "../types";

export const bai05: N1Lesson = {
  id: "bai-05",
  num: 5,
  topicJa: "関連・無関係",
  topicVi: "Liên quan · không liên quan",
  chapterJa: "台風が来る前に",
  chapterVi: "Trước khi bão đến",
  scene:
    "Tháng Bảy. Sự kiện ngoài trời ở Tokyo — phát súng mở màn của chiến dịch — sắp diễn ra thì có tin bão. Mọi thứ \"tùy thuộc vào…\", nhưng cũng có những việc \"bất chấp…\". Chương này học cách nói về sự LIÊN QUAN và KHÔNG LIÊN QUAN.",
  story: [
    {
      jp: "イベントの三日前、大型の台風が近づいているというニュースが流れた。開催できるかどうかは、台風の進路[[いかんだ]]。",
      vi: "Ba ngày trước sự kiện, có tin một cơn bão lớn đang tiến gần. Tổ chức được hay không là tùy vào đường đi của cơn bão.",
    },
    {
      jp: "田中部長は落ち着いていた。「天候の[[いかんにかかわらず]]、準備は予定通り進める。中止になっても、準備は無駄にならない。」",
      vi: "Trưởng phòng Tanaka vẫn bình tĩnh: \"Bất kể thời tiết thế nào, việc chuẩn bị vẫn tiến hành như dự kiến. Dù có hủy thì công chuẩn bị cũng không phí.\"",
    },
    {
      jp: "佐藤先輩は熱があったが、それ[[をものともせず]]、夜遅くまで会場の図面を直していた。",
      vi: "Chị Satō bị sốt, nhưng chẳng hề nao núng, vẫn sửa bản vẽ hội trường đến tận khuya.",
    },
    {
      jp: "一方、健太はみんなの心配[[をよそに]]、休憩室でのんきにゲームをしていた。それを見た部長は言った。「学生[[ならいざしらず]]、社会人がそんな態度では困るぞ。」",
      vi: "Trong khi đó Kenta, mặc kệ nỗi lo của mọi người, thản nhiên chơi game trong phòng nghỉ. Thấy vậy, trưởng phòng nói: \"Sinh viên thì còn đỡ, chứ người đi làm mà thái độ thế thì không được đâu.\"",
    },
    {
      jp: "当日の朝、台風は進路を変え、空は嘘のように晴れた。会場には予想の二倍の人が集まった。",
      vi: "Sáng hôm đó, cơn bão đổi hướng, trời quang đãng như chưa từng có chuyện gì. Hội trường đón gấp đôi số người dự kiến.",
    },
  ],
  patterns: [
    {
      id: "ikanda",
      pattern: "〜いかんだ",
      variants: ["〜いかんで", "〜いかんによっては", "〜いかんでは"],
      meaning: "Tùy thuộc vào… (mà quyết định / thay đổi)",
      nuance:
        "Kết quả B thay đổi hoặc được quyết định tùy theo N \"như thế nào\" (いかん = 如何, như thế nào). Văn viết, cứng hơn 〜次第だ.",
      forms: ["N（の）+ いかんだ", "N（の）+ いかんで／いかんによって（は）"],
      position: {
        before: "Danh từ có thể biến đổi nhiều mức: 結果・成績・態度・努力・天候",
        after: "Sự việc được quyết định / thay đổi (決まる・変わる)",
        note: "いかんだ đứng cuối câu; いかんで/いかんによっては đứng giữa câu.",
      },
      register: "Văn viết · trang trọng",
      usage: [
        "N phải là thứ có nhiều mức độ / khả năng (結果, 努力, 内容…).",
        "いかんによっては = tùy trường hợp thì có khi…",
      ],
      examples: [
        {
          jp: "世界大会をこの国で開催できるかどうかは、国民の協力[[いかんだ]]。",
          vi: "Có tổ chức được giải thế giới ở nước này hay không là tùy vào sự hợp tác của người dân.",
        },
        {
          jp: "筆記試験はパスした。明日の面接の結果[[いかんで]]採用が決まるそうだ。",
          vi: "Đã qua bài thi viết. Nghe nói việc tuyển dụng được quyết định tùy vào kết quả phỏng vấn ngày mai.",
        },
        {
          jp: "検査の結果[[いかんによっては]]、手術が必要になるかもしれない。",
          vi: "Tùy vào kết quả xét nghiệm mà có thể cần phẫu thuật.",
        },
      ],
      dos: ["Văn bản, thông báo: kết quả phụ thuộc vào điều kiện có nhiều khả năng."],
      donts: [
        {
          text: "Danh từ không có \"mức độ\" để thay đổi → không tự nhiên.",
          bad: "旅行に行くかどうかは、私の弟いかんだ。",
          good: "旅行に行くかどうかは、弟の都合いかんだ。",
        },
      ],
      compare: [
        {
          other: "〜次第だ (N2)",
          diff: "Cùng nghĩa \"tùy vào\". 次第だ dùng rộng rãi cả văn nói; いかんだ cứng, văn bản.",
          ex: { jp: "成功するかどうかは、君の努力[[次第だ]]。", vi: "Thành công hay không là tùy vào nỗ lực của cậu." },
        },
        {
          other: "〜いかんにかかわらず",
          diff: "Ngược nghĩa: いかんだ = PHỤ THUỘC vào; いかんにかかわらず = KHÔNG phụ thuộc vào.",
        },
      ],
      memo: "いかん = 如何 = \"như thế nào\". \"Kết quả như thế nào → quyết định\" ⚖️. Cơn bão đi đường nào — sự kiện sống hay chết.",
      storyLine: "開催できるかどうかは、台風の進路[[いかんだ]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "今後の売り上げ＿＿＿、新しい店を出すかどうかを決めるつもりだ。",
          opts: ["いかんで", "をよそに", "をものともせず", "ならいざしらず"],
          answer: 0,
          explain: "Tùy doanh số mà quyết định → いかんで.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "交渉の結果いかんによっては、契約を取り消すこともあり得る。",
          opts: [
            "Tùy kết quả đàm phán, cũng có thể hủy hợp đồng.",
            "Bất kể kết quả đàm phán, hợp đồng sẽ bị hủy.",
            "Kết quả đàm phán không liên quan đến hợp đồng.",
            "Vì đàm phán thất bại nên hợp đồng đã bị hủy.",
          ],
          answer: 0,
          explain: "いかんによっては = tùy (trường hợp) mà có khi…",
        },
      ],
    },
    {
      id: "ikan-nikakawarazu",
      pattern: "〜いかんにかかわらず",
      variants: ["〜いかんによらず", "〜いかんを問わず"],
      meaning: "Bất kể… như thế nào",
      nuance:
        "Sự việc B được thực hiện / thành lập mà không bị N ảnh hưởng, dù N ra sao. Văn bản quy định, thông báo chính thức.",
      forms: ["N（の）+ いかんにかかわらず", "N（の）+ いかんによらず", "N の + いかんを問わず"],
      position: {
        before: "Điều kiện có nhiều khả năng: 理由・結果・内容・天候",
        after: "Quy định / sự việc không đổi",
      },
      register: "Rất trang trọng · thông báo, quy định",
      usage: [
        "Hay gặp trong quy chế, thông báo: 理由のいかんにかかわらず…",
        "いかんを問わず cần の phía trước: 国籍のいかんを問わず.",
      ],
      examples: [
        {
          jp: "内容の[[いかんにかかわらず]]、個人情報に関する問い合わせにはお答えしておりません。",
          vi: "Bất kể nội dung gì, chúng tôi không trả lời các câu hỏi liên quan đến thông tin cá nhân.",
        },
        {
          jp: "明日の試合の結果[[いかんによらず]]、優勝できないことはもう決まってしまった。",
          vi: "Bất kể kết quả trận ngày mai, việc không thể vô địch đã được định đoạt rồi.",
        },
        {
          jp: "理由の[[いかんを問わず]]、一度払った代金はお返しできません。",
          vi: "Bất kể lý do gì, số tiền đã thanh toán sẽ không được hoàn lại.",
        },
      ],
      dos: ["Quy định, điều khoản, thông báo: \"dù trường hợp nào cũng áp dụng\"."],
      donts: [
        {
          text: "Chuyện cá nhân thường ngày → quá cứng.",
          bad: "天気のいかんにかかわらず、明日友達と遊ぶよ。",
          good: "天気がどうであっても、明日友達と遊ぶよ。",
        },
      ],
      compare: [
        {
          other: "〜にかかわらず／〜を問わず (N2)",
          diff: "Bản N2 gắn trực tiếp với danh từ (性別を問わず). Thêm いかん → cứng hơn, nhấn mạnh \"dù NHƯ THẾ NÀO\".",
        },
        {
          other: "〜をものともせず",
          diff: "をものともせず: vượt qua KHÓ KHĂN (khen ngợi người). いかんにかかわらず: không phụ thuộc ĐIỀU KIỆN (quy định).",
        },
      ],
      memo: "かかわらず = \"không dính dáng\". Bất kể bão đi đường nào, trưởng phòng Tanaka vẫn chuẩn bị 🧱: 天候のいかんにかかわらず.",
      storyLine: "天候の[[いかんにかかわらず]]、準備は予定通り進める。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "国籍の＿＿＿、だれでもこのコンテストに参加できます。",
          opts: ["いかんを問わず", "いかんで", "をよそに", "ならいざしらず"],
          answer: 0,
          explain: "Bất kể quốc tịch, ai cũng tham gia được → いかんを問わず.",
        },
        {
          type: "judge",
          q: "試験の結果のいかんにかかわらず、合格者には連絡します。",
          ok: false,
          explain: "\"Bất kể kết quả\" nhưng lại chỉ liên lạc với người đỗ → mâu thuẫn logic.",
          fix: "試験の結果のいかんにかかわらず、受験者全員に連絡します。",
        },
      ],
    },
    {
      id: "wo-monotomosezu",
      pattern: "〜をものともせず（に）",
      meaning: "Bất chấp (khó khăn), không hề nao núng",
      nuance:
        "Bình thường gặp trở ngại N thì người ta sẽ chùn bước, vậy mà người đó vẫn dũng cảm vượt qua. Cả câu mang ý KHEN NGỢI sự can đảm của người khác.",
      forms: ["N + をものともせず（に）"],
      position: {
        before: "Khó khăn, nguy hiểm: 嵐・病気・障害・反対・危険",
        after: "Hành động dũng cảm, vượt qua",
      },
      register: "Văn viết · ca ngợi",
      usage: [
        "Chủ ngữ là người khác (ngôi 3) — không dùng cho bản thân.",
        "Vế sau là hành động đã/đang làm, không phải ý chí/mệnh lệnh.",
      ],
      examples: [
        {
          jp: "彼は体の障害[[をものともせずに]]、精力的に活動している。",
          vi: "Anh ấy không hề nao núng trước khuyết tật cơ thể, vẫn hoạt động đầy năng lượng.",
        },
        {
          jp: "母は強かった。がんの宣告[[をものともせず]]、最期まで明るくふるまった。",
          vi: "Mẹ thật mạnh mẽ. Bất chấp lời chẩn đoán ung thư, mẹ vẫn sống vui tươi đến phút cuối.",
        },
        {
          jp: "救助隊は激しい雨[[をものともせず]]、行方不明者の捜索を続けた。",
          vi: "Đội cứu hộ bất chấp mưa lớn, vẫn tiếp tục tìm kiếm người mất tích.",
        },
      ],
      dos: ["Ca ngợi người vượt khó: vận động viên, đội cứu hộ, người bệnh kiên cường."],
      donts: [
        {
          text: "Nói về chính mình → nghe như tự khen.",
          bad: "私は熱をものともせず、会社に行った。",
          good: "私は熱があったが、無理して会社に行った。",
        },
      ],
      compare: [
        {
          other: "〜をよそに",
          diff: "をものともせず: vượt qua KHÓ KHĂN, được KHEN. をよそに: phớt lờ sự lo lắng/phản đối của NGƯỜI KHÁC, thường bị CHÊ.",
        },
        {
          other: "〜にもかかわらず (N3)",
          diff: "にもかかわらず: \"mặc dù\" trung tính. をものともせず: nhấn mạnh sự dũng cảm.",
        },
      ],
      memo: "もの (cái gì đó) + とも + せず = \"không coi nó là cái gì cả\" 💪. Chị Satō sốt vẫn làm đến khuya: 熱をものともせず.",
      storyLine: "佐藤先輩は熱があったが、それ[[をものともせず]]、夜遅くまで会場の図面を直していた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "その選手はけが＿＿＿、最後まで走り抜いた。",
          opts: ["をものともせず", "をよそに", "いかんで", "ならいざしらず"],
          answer: 0,
          explain: "Vượt qua chấn thương, chạy đến cùng — khen ngợi → をものともせず.",
        },
        {
          type: "order",
          before: "登山隊は",
          pieces: ["吹雪", "を", "ものともせず", "頂上を"],
          after: "目指した。",
          star: 3,
          vi: "Đoàn leo núi bất chấp bão tuyết, vẫn hướng lên đỉnh.",
          explain: "吹雪をものともせず、頂上を目指した.",
        },
      ],
    },
    {
      id: "wo-yosoni",
      pattern: "〜をよそに",
      meaning: "Mặc kệ, phớt lờ (sự lo lắng / phản đối của người khác)",
      nuance:
        "Hành động như thể hoàn toàn không liên quan đến mình, chẳng bận tâm đến tình hình/cảm xúc xung quanh. Người nói ngạc nhiên, sốc, có khi bất mãn.",
      forms: ["N + をよそに"],
      position: {
        before: "Trạng thái xung quanh: 心配・期待・反対・抗議・不安",
        after: "Hành động phớt lờ điều đó",
      },
      register: "Văn viết · báo chí, kể chuyện",
      usage: [
        "N thường là cảm xúc/hành động của người khác (心配, 反対, 期待).",
        "Không dùng cho bản thân người nói.",
      ],
      examples: [
        {
          jp: "家族の心配[[をよそに]]、息子は退院したその日から友達と遊びに出かけた。",
          vi: "Mặc kệ gia đình lo lắng, cậu con trai ngay hôm xuất viện đã đi chơi với bạn.",
        },
        {
          jp: "住民の反対[[をよそに]]、ダムの建設計画が進められている。",
          vi: "Bất chấp sự phản đối của cư dân, kế hoạch xây đập vẫn đang được tiến hành.",
        },
        {
          jp: "周囲の期待[[をよそに]]、彼は家業を継がずに画家になった。",
          vi: "Phớt lờ kỳ vọng của mọi người xung quanh, anh ấy không nối nghiệp gia đình mà trở thành họa sĩ.",
        },
      ],
      dos: ["Kể về ai đó hành động bất chấp sự lo lắng, phản đối, kỳ vọng xung quanh."],
      donts: [
        {
          text: "N là khó khăn vật lý (bão, bệnh) mà người ta dũng cảm vượt qua → dùng をものともせず.",
          bad: "彼は大雪をよそに、山に登った。（khen dũng cảm）",
          good: "彼は大雪をものともせず、山に登った。",
        },
      ],
      compare: [
        {
          other: "〜をものともせず",
          diff: "をよそに = phớt lờ người khác (thường chê). をものともせず = vượt khó khăn (khen).",
        },
        {
          other: "〜もかまわず (N2)",
          diff: "もかまわず: không để ý đến (ánh mắt người khác, quần áo bẩn…) — thường thói quen cá nhân. をよそに: bối cảnh rộng hơn, văn viết.",
        },
      ],
      memo: "よそ (余所) = \"chỗ khác, người ngoài\" → coi nỗi lo của mọi người như chuyện \"nhà hàng xóm\" 🎮. Kenta: みんなの心配をよそにゲーム.",
      storyLine: "健太はみんなの心配[[をよそに]]、休憩室でのんきにゲームをしていた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "親の心配＿＿＿、娘は一人で世界一周の旅に出た。",
          opts: ["をよそに", "をものともせず", "いかんで", "いかんにかかわらず"],
          answer: 0,
          explain: "Phớt lờ nỗi lo của bố mẹ → をよそに.",
        },
        {
          type: "judge",
          q: "私は先生の注意をよそに、教室で騒いだ。",
          ok: false,
          explain: "をよそに thường dùng để kể về người khác, không dùng cho bản thân.",
          fix: "彼は先生の注意をよそに、教室で騒いでいた。",
        },
      ],
    },
    {
      id: "nara-izashirazu",
      pattern: "〜ならいざしらず",
      meaning: "Nếu là… thì còn chưa nói, chứ (đằng này)…",
      nuance:
        "Nếu là trường hợp N (đặc biệt, cực đoan) thì còn có thể chấp nhận / chưa biết, nhưng thực tế khác hẳn nên kết quả không thể chấp nhận. Thể hiện rõ sự bất mãn, phê phán.",
      forms: ["N + ならいざしらず", "Vthể thường + の + ならいざしらず"],
      position: {
        before: "Trường hợp cực đoan/ngoại lệ: 子供・神様・大昔・安いホテル",
        after: "Thực tế trái ngược + phê phán (許せない・困る・おかしい)",
      },
      register: "Văn nói & viết · phê phán",
      usage: [
        "Trước là ví dụ \"ngoại lệ có thể tha thứ\"; sau là thực tế \"không thể tha thứ\".",
        "いざしらず = 知らない (không biết) dạng cổ.",
      ],
      examples: [
        {
          jp: "安いホテル[[ならいざしらず]]、一流ホテルでこんなにサービスが悪いなんて許せない。",
          vi: "Khách sạn rẻ tiền thì còn chưa nói, đằng này khách sạn hạng nhất mà phục vụ tệ thế thì không chấp nhận được.",
        },
        {
          jp: "祖父母の時代[[ならいざしらず]]、今の時代に手ぬぐいなんてあまり使わないよ。",
          vi: "Thời ông bà thì không nói, chứ thời nay chẳng mấy ai dùng khăn tenugui nữa.",
        },
        {
          jp: "子供[[ならいざしらず]]、大人がこんな簡単なことも分からないとは。",
          vi: "Trẻ con thì còn đỡ, chứ người lớn mà chuyện đơn giản thế này cũng không hiểu thì thật là…",
        },
      ],
      dos: ["Phê phán: \"nếu là X thì còn hiểu được, nhưng bạn là Y mà…\"."],
      donts: [
        {
          text: "Vế sau không mang phê phán, bất mãn → không tự nhiên.",
          bad: "子供ならいざしらず、大人も楽しめる映画だ。",
          good: "子供はもちろん、大人も楽しめる映画だ。",
        },
      ],
      compare: [
        {
          other: "〜ではあるまいし (Chương 12)",
          diff: "ではあるまいし: \"có phải là X đâu mà…\" + lời khuyên/phê phán (khẩu ngữ). ならいざしらず: \"X thì còn được, chứ…\" — văn hơn.",
          ex: { jp: "子供[[ではあるまいし]]、一人で行けるでしょう。", vi: "Có phải con nít đâu, tự đi được mà." },
        },
      ],
      memo: "いざ知らず = \"thì không biết (sao)\" 🤨. Trưởng phòng: 学生ならいざしらず、社会人がそんな態度では困る.",
      storyLine: "学生[[ならいざしらず]]、社会人がそんな態度では困るぞ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "初心者＿＿＿、プロがこんなミスをするなんて信じられない。",
          opts: ["ならいざしらず", "をよそに", "いかんで", "をものともせず"],
          answer: 0,
          explain: "Người mới thì còn chưa nói, chứ dân chuyên mà sai thế này → ならいざしらず.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "昔ならいざしらず、今はスマホで何でも調べられる。",
          opts: [
            "Ngày xưa thì không nói, chứ bây giờ cái gì cũng tra được bằng điện thoại.",
            "Ngày xưa cũng như bây giờ, cái gì cũng tra được.",
            "Ngày xưa không ai biết dùng điện thoại.",
            "Bây giờ không tra được gì nếu không biết chuyện xưa.",
          ],
          answer: 0,
          explain: "ならいざしらず: \"(ngoại lệ) thì còn chưa nói, chứ (thực tế) thì…\".",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "N phía trước", "Sắc thái"],
    rows: [
      ["〜いかんだ", "Tùy thuộc vào", "Điều có nhiều mức (結果・努力)", "Trang trọng"],
      ["〜いかんにかかわらず", "Bất kể… thế nào", "理由・内容・天候", "Quy định, thông báo"],
      ["〜をものともせず", "Không nao núng trước khó khăn", "嵐・病気・障害", "Khen ngợi"],
      ["〜をよそに", "Phớt lờ (lo lắng, phản đối)", "心配・反対・期待", "Ngạc nhiên, chê"],
      ["〜ならいざしらず", "X thì còn được, chứ…", "Ví dụ ngoại lệ", "Phê phán"],
    ],
  },
  links: [
    "Ôn N2: 〜次第だ ≈ いかんだ; 〜にかかわらず／〜を問わず ≈ いかんにかかわらず. N1 thêm いかん → trang trọng hơn.",
    "Cặp dễ nhầm nhất đề thi: をものともせず (vượt khó — KHEN) ↔ をよそに (phớt lờ người khác — CHÊ).",
    "ならいざしらず ↔ ではあるまいし (Chương 12): cùng ý \"có phải X đâu mà…\".",
    "Chương 10 (逆接条件) tiếp tục chủ đề \"dù… thì cũng không ảnh hưởng\": ようと, ようとまいと, であれ.",
  ],
  hook: "Bão đến: tùy đường đi của bão (いかんだ) · bất kể thời tiết vẫn chuẩn bị (いかんにかかわらず) · chị Satō sốt vẫn làm (をものともせず) · Kenta mặc kệ mọi người (をよそに) · \"sinh viên thì còn được, chứ…\" (ならいざしらず).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜いかんだ", "Tùy thuộc vào"],
        ["〜いかんを問わず", "Bất kể… như thế nào"],
        ["〜をものともせず", "Không nao núng trước khó khăn"],
        ["〜をよそに", "Phớt lờ nỗi lo của người khác"],
        ["〜ならいざしらず", "X thì còn được, chứ…"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "周囲の反対＿＿＿、彼は会社を辞めて起業した。",
      opts: ["をよそに", "をものともせず", "いかんで", "ならいざしらず"],
      answer: 0,
      explain: "Phản đối của người xung quanh = cảm xúc/ý kiến của người khác → をよそに.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "彼女は足のけが＿＿＿、見事な演技を見せた。",
      opts: ["をものともせず", "をよそに", "いかんによらず", "ならいざしらず"],
      answer: 0,
      explain: "Chấn thương = khó khăn, vượt qua và được khen → をものともせず.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "本人のやる気＿＿＿、留学の成果は大きく変わるだろう。",
      opts: ["いかんで", "いかんにかかわらず", "をよそに", "をものともせず"],
      answer: 0,
      explain: "Kết quả thay đổi tùy vào động lực → いかんで (phụ thuộc).",
    },
    {
      type: "judge",
      q: "子供たちは親の心配をものともせず、夜遅くまで遊んでいた。",
      ok: false,
      explain: "\"Nỗi lo của bố mẹ\" không phải khó khăn để dũng cảm vượt qua, và câu mang ý chê → dùng をよそに.",
      fix: "子供たちは親の心配をよそに、夜遅くまで遊んでいた。",
    },
    {
      type: "order",
      before: "",
      pieces: ["神様", "なら", "いざしらず", "人間に"],
      after: "完璧を求めるのは無理だ。",
      star: 3,
      vi: "Thần thánh thì không nói, chứ đòi hỏi con người hoàn hảo là không thể.",
      explain: "神様ならいざしらず、人間に完璧を求めるのは無理だ.",
    },
  ],
};
