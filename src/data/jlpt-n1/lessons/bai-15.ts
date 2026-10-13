import type { N1Lesson } from "../types";

export const bai15: N1Lesson = {
  id: "bai-15",
  num: 15,
  topicJa: "比較対照",
  topicVi: "So sánh · đối chiếu",
  chapterJa: "新しい年の誓い",
  chapterVi: "Lời hứa năm mới",
  scene:
    "Tháng Một. Mai đi lễ đầu năm (初詣) cùng chị Satō và Kenta. Nhìn lại năm cũ, so sánh với năm mới, mỗi người tự đặt cho mình một mục tiêu. Chương này học cách SO SÁNH – ĐỐI CHIẾU.",
  story: [
    {
      jp: "元日の朝、三人は神社へ初詣に出かけた。今年の冬は、いつ[[にもまして]]寒い。マイは何度も手に息を吹きかけた。",
      vi: "Sáng mùng một Tết, ba người đến đền đi lễ đầu năm. Mùa đông năm nay lạnh hơn bao giờ hết. Mai liên tục hà hơi vào tay.",
    },
    {
      jp: "佐藤先輩が笑った。「ミスばかりだった去年の健太君[[にひきかえ]]、最近の健太君は本当に頼もしくなったよね。」健太は照れて頭をかいた。",
      vi: "Chị Satō cười: \"So với Kenta năm ngoái toàn mắc lỗi, Kenta dạo này đáng tin cậy hẳn lên nhỉ.\" Kenta ngượng ngùng gãi đầu.",
    },
    {
      jp: "お賽銭を入れて、マイは手を合わせた。「七月のN1試験、満点とは言わない[[までも]]、必ず合格できますように。」",
      vi: "Bỏ tiền công đức rồi chắp tay, Mai khấn: \"Kỳ thi N1 tháng Bảy, không dám mong điểm tuyệt đối, nhưng xin cho con nhất định đỗ.\"",
    },
    {
      jp: "帰り道、健太がつぶやいた。「俺も今年は、部長とは言わないまでも、せめて後輩に頼られる先輩になりたいな。」",
      vi: "Trên đường về, Kenta lẩm bẩm: \"Năm nay tớ cũng vậy, chưa dám nói đến chức trưởng phòng, nhưng ít ra muốn thành một đàn anh được đàn em tin cậy.\"",
    },
  ],
  patterns: [
    {
      id: "nihikikae",
      pattern: "〜にひきかえ",
      meaning: "Trái hẳn với…, so với… thì (ngược lại)",
      nuance:
        "Đặt hai đối tượng cạnh nhau để làm nổi bật sự TƯƠNG PHẢN, kèm đánh giá chủ quan tốt – xấu của người nói. Không chỉ so sánh sự thật đơn thuần.",
      forms: ["N + にひきかえ", "Vthể thường + の + にひきかえ", "Aな-な／N-な + の + にひきかえ"],
      position: {
        before: "Đối tượng A (thường tốt / xấu rõ rệt)",
        after: "Đối tượng B trái ngược + đánh giá",
      },
      register: "Văn viết & nói · chủ quan",
      usage: [
        "Có đánh giá chủ quan (khen một bên, chê một bên).",
        "Không dùng để so sánh những điều chỉ là phỏng đoán.",
      ],
      examples: [
        {
          jp: "姉がきれい好きなの[[にひきかえ]]、妹はいつも部屋を散らかしている。",
          vi: "Trái hẳn với người chị ưa sạch sẽ, cô em lúc nào cũng bày bừa phòng.",
        },
        {
          jp: "大変な時代を一生懸命に生きた主人公[[にひきかえ]]、今の私は何とだらしないのだろう。",
          vi: "So với nhân vật chính sống hết mình trong thời đại khó khăn, tôi bây giờ sao mà lười biếng thế.",
        },
        {
          jp: "去年の猛暑[[にひきかえ]]、今年の夏は過ごしやすい。",
          vi: "Trái với cái nóng khủng khiếp năm ngoái, mùa hè năm nay dễ chịu.",
        },
      ],
      dos: ["So sánh hai người/sự việc trái ngược kèm khen – chê."],
      donts: [
        {
          text: "So sánh khách quan, không có đánh giá → dùng に比べて.",
          bad: "東京にひきかえ、大阪は人口が少ない。",
          good: "東京に比べて、大阪は人口が少ない。",
        },
      ],
      compare: [
        {
          other: "〜に比べて (N3)",
          diff: "に比べて: so sánh khách quan, số liệu. にひきかえ: tương phản + cảm xúc khen/chê.",
        },
        {
          other: "〜に対して (N3)",
          diff: "に対して: đối lập trung tính (A thì…, còn B thì…). にひきかえ: có đánh giá chủ quan.",
        },
      ],
      memo: "引き換え = \"đổi lấy\" → đặt hai thứ lên bàn cân thấy NGƯỢC hẳn ⚖️. 去年の健太にひきかえ、最近の健太は頼もしい.",
      storyLine: "ミスばかりだった去年の健太君[[にひきかえ]]、最近の健太君は本当に頼もしくなったよね。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "よく働く兄＿＿＿、弟は毎日ゴロゴロしてばかりいる。",
          opts: ["にひきかえ", "にもまして", "ないまでも", "に至っては"],
          answer: 0,
          explain: "Tương phản + chê người em → にひきかえ.",
        },
        {
          type: "judge",
          q: "北海道にひきかえ、沖縄の面積は小さい。",
          ok: false,
          explain: "So sánh khách quan (diện tích), không có đánh giá → に比べて.",
          fix: "北海道に比べて、沖縄の面積は小さい。",
        },
      ],
    },
    {
      id: "nimomashite",
      pattern: "〜にもまして",
      meaning: "Hơn cả… / hơn bao giờ hết",
      nuance:
        "So với cái thông thường / trước đây (vốn đã ở mức cao), thì cái hiện tại còn ở mức CAO HƠN NỮA. Với từ để hỏi: いつにもまして = hơn bao giờ hết, 何にもまして = hơn tất cả.",
      forms: ["N + にもまして", "Từ để hỏi（いつ・何・誰）+ にもまして"],
      position: {
        before: "Mốc so sánh vốn đã cao: 去年・以前・いつ・何",
        after: "Mức độ còn cao hơn (thường là tính từ)",
      },
      register: "Văn viết & nói trang trọng",
      usage: [
        "Vế sau không dùng thể phủ định.",
        "いつにもまして／何にもまして là cụm rất hay gặp.",
      ],
      examples: [
        {
          jp: "去年は連日三十三度を超えたが、今年は去年[[にもまして]]暑さが厳しい。",
          vi: "Năm ngoái ngày nào cũng trên 33 độ, nhưng năm nay còn nóng gắt hơn cả năm ngoái.",
        },
        {
          jp: "結婚式の日の彼女は、いつ[[にもまして]]美しかった。",
          vi: "Cô ấy trong ngày cưới đẹp hơn bao giờ hết.",
        },
        {
          jp: "何[[にもまして]]大切なのは、家族の健康だ。",
          vi: "Điều quan trọng hơn tất cả là sức khỏe của gia đình.",
        },
      ],
      dos: ["Nhấn mạnh mức độ tăng lên so với trước, so với thường lệ."],
      donts: [
        {
          text: "Vế sau phủ định → không dùng.",
          bad: "今年は去年にもまして暑くない。",
          good: "今年は去年ほど暑くない。",
        },
      ],
      compare: [
        {
          other: "〜より (N4)",
          diff: "より: so sánh đơn thuần. にもまして: hàm ý A vốn đã cao, B còn CAO HƠN NỮA.",
        },
        {
          other: "〜にひきかえ",
          diff: "にひきかえ: hai thứ TRÁI NGƯỢC. にもまして: cùng chiều, B vượt A.",
        },
      ],
      memo: "増して = \"tăng thêm\" 📈 → \"đã cao rồi, còn tăng thêm\". 今年の冬は、いつにもまして寒い.",
      storyLine: "今年の冬は、いつ[[にもまして]]寒い。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "今日の彼は、いつ＿＿＿元気がいい。何かいいことがあったのだろう。",
          opts: ["にもまして", "にひきかえ", "ないまでも", "なりに"],
          answer: 0,
          explain: "いつにもまして = hơn bao giờ hết.",
        },
        {
          type: "order",
          before: "",
          pieces: ["前回", "にも", "まして", "今回の"],
          after: "試験は難しかった。",
          star: 3,
          vi: "Kỳ thi lần này còn khó hơn cả lần trước.",
          explain: "前回にもまして今回の試験は難しかった.",
        },
      ],
    },
    {
      id: "naimademo",
      pattern: "〜ないまでも",
      variants: ["〜とは言わないまでも", "〜とはいかないまでも"],
      meaning: "Tuy không đến mức… nhưng ít ra cũng…",
      nuance:
        "Chưa đạt đến mức cao nhất / lý tưởng A, nhưng ít nhất ở mức thấp hơn một chút B. Vế sau hay có せめて, 少なくとも, 〜たい／〜てほしい／〜べきだ.",
      forms: ["Vない + までも", "N + とは言わないまでも", "N + とはいかないまでも"],
      position: {
        before: "Mức lý tưởng / cực đoan (満点・毎日・プロ)",
        after: "Mức thấp hơn một chút (せめて・少なくとも〜)",
      },
      register: "Văn nói & viết",
      usage: [
        "Với danh từ dùng とは言わないまでも／とはいかないまでも.",
        "Vế sau thường là nguyện vọng, nghĩa vụ, nhận định ở mức vừa phải.",
      ],
      examples: [
        {
          jp: "プロにはなれ[[ないまでも]]、演劇はずっと続けていくつもりだ。",
          vi: "Dù không thể thành chuyên nghiệp, tôi vẫn định tiếp tục diễn kịch mãi.",
        },
        {
          jp: "明日はハイキングだ。快晴とはいか[[ないまでも]]、雨は降らないでほしい。",
          vi: "Mai đi dã ngoại. Không cần trời quang đãng, nhưng ít ra đừng mưa.",
        },
        {
          jp: "毎日とは言わ[[ないまでも]]、週に一度は親に電話するべきだ。",
          vi: "Không cần ngày nào, nhưng ít ra mỗi tuần nên gọi cho bố mẹ một lần.",
        },
      ],
      dos: ["Đặt mục tiêu thực tế: \"không cần đến A, nhưng ít nhất B\"."],
      donts: [
        {
          text: "Vế sau ở mức CAO hơn vế trước → mâu thuẫn.",
          bad: "合格しないまでも、満点を取りたい。",
          good: "満点とは言わないまでも、合格はしたい。",
        },
      ],
      compare: [
        {
          other: "〜とまでは言えないが",
          diff: "Cùng ý, nhưng ないまでも ngắn gọn, văn viết hơn.",
        },
        {
          other: "〜までもない (Chương 18)",
          diff: "までもない = \"không cần đến mức phải…\". ないまでも = \"chưa đến mức… nhưng ít ra…\". Rất dễ nhầm!",
        },
      ],
      memo: "Bậc thang 🪜: không lên tới bậc cao nhất (ないまでも) — nhưng ít ra đứng ở bậc ngay dưới. Mai: 満点とは言わないまでも、必ず合格を.",
      storyLine: "満点とは言わない[[までも]]、必ず合格できますように。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "優勝は＿＿＿、せめて決勝までは進みたい。",
          opts: ["できないまでも", "できるまでもなく", "にもまして", "にひきかえ"],
          answer: 0,
          explain: "Không vô địch được thì ít ra vào chung kết → ないまでも.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "完璧とはいかないまでも、かなりいい出来だ。",
          opts: [
            "Tuy chưa hoàn hảo nhưng làm khá tốt.",
            "Hoàn hảo đến mức không cần nói.",
            "Không hoàn hảo nên làm không tốt.",
            "Hoàn hảo hơn bao giờ hết.",
          ],
          answer: 0,
          explain: "とはいかないまでも = chưa đến mức (hoàn hảo) nhưng…",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Quan hệ A – B", "Ghi nhớ"],
    rows: [
      ["〜にひきかえ", "Trái hẳn với", "Ngược chiều + khen/chê", "Không dùng cho so sánh khách quan"],
      ["〜にもまして", "Hơn cả", "Cùng chiều, B vượt A", "いつにもまして"],
      ["〜ないまでも", "Tuy không đến… nhưng ít ra", "B thấp hơn A một chút", "せめて・少なくとも"],
    ],
  },
  links: [
    "Ôn N3–N2: に比べて, に対して, より, ほど. N1 gắn cảm xúc: tương phản có đánh giá (にひきかえ), tăng tiến (にもまして).",
    "ないまでも (Ch.15) ≠ までもない (Ch.18): đảo trật tự là đổi nghĩa!",
    "にもまして và いつにもまして thường xuất hiện trong bài đọc hiểu, thư từ.",
  ],
  hook: "Lễ đầu năm: lạnh hơn bao giờ hết (いつにもまして) · Kenta khác hẳn năm ngoái (にひきかえ) · không mơ điểm tuyệt đối nhưng ít ra phải đỗ (ないまでも).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜にひきかえ", "Trái hẳn với (có khen/chê)"],
        ["〜にもまして", "Còn hơn cả…"],
        ["〜ないまでも", "Tuy không đến… nhưng ít ra"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "以前＿＿＿、最近は外国人観光客が増えている。",
      opts: ["にもまして", "にひきかえ", "ないまでも", "をよそに"],
      answer: 0,
      explain: "Trước đã nhiều, nay còn tăng hơn → にもまして.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "毎日運動しているAさん＿＿＿、私は休日も寝てばかりだ。",
      opts: ["にひきかえ", "にもまして", "ないまでも", "に至るまで"],
      answer: 0,
      explain: "Tương phản (siêng – lười) + tự chê → にひきかえ.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "全部とは言わ＿＿＿、せめて半分は手伝ってほしい。",
      opts: ["ないまでも", "ないで", "ずにはいられず", "までもなく"],
      answer: 0,
      explain: "Không cần tất cả, ít ra một nửa → とは言わないまでも.",
    },
    {
      type: "judge",
      q: "今年の売り上げは、去年にもまして悪くなかった。",
      ok: false,
      explain: "にもまして không đi với vế sau phủ định.",
      fix: "今年の売り上げは、去年にもまして好調だった。",
    },
  ],
};
