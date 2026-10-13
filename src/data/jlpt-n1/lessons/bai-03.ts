import type { N1Lesson } from "../types";

export const bai03: N1Lesson = {
  id: "bai-03",
  num: 3,
  topicJa: "限定・非限定・付加",
  topicVi: "Giới hạn · không giới hạn · thêm vào",
  chapterJa: "京都への出張",
  chapterVi: "Chuyến công tác Kyoto",
  scene:
    "Tháng Sáu. Bao bì \"さくら茶\" cần một nhà thiết kế, và cả nhóm đi Kyoto tìm cảm hứng. Kyoto dạy Mai cách nói \"CHỈ có…\", \"KHÔNG CHỈ…\" và \"đã đành… còn…\" — các mẫu giới hạn và bổ sung.",
  story: [
    {
      jp: "会議で田中部長が言った。「パッケージのデザインを任せられるのは、佐藤さん[[をおいて]]ほかにいない。」佐藤先輩は少し照れくさそうに笑った。",
      vi: "Trong cuộc họp, trưởng phòng Tanaka nói: \"Người có thể giao thiết kế bao bì, ngoài Satō ra không còn ai khác.\" Chị Satō cười có vẻ hơi ngượng.",
    },
    {
      jp: "デザインのヒントを探しに、三人は京都へ向かった。古い町家、静かな庭、季節の和菓子。どれも京都[[ならでは]]の美しさだ。",
      vi: "Để tìm ý tưởng thiết kế, ba người lên đường đi Kyoto. Những ngôi nhà gỗ cổ, khu vườn tĩnh lặng, bánh ngọt theo mùa — tất cả đều là vẻ đẹp chỉ Kyoto mới có.",
    },
    {
      jp: "ところが、健太は京都の地理[[はおろか]]、駅の出口さえ分からず、何度も迷子になった。",
      vi: "Thế nhưng Kenta, địa lý Kyoto thì khỏi nói, đến cả cửa ra của nhà ga cũng không biết, lạc đường không biết bao nhiêu lần.",
    },
    {
      jp: "老舗の茶屋で抹茶を飲んだとき、マイは味[[もさることながら]]、器の美しさに心を奪われた。「これをパッケージに生かせないかな。」",
      vi: "Khi uống trà matcha ở một quán trà lâu đời, Mai — hương vị đã đành — còn bị vẻ đẹp của chiếc chén cuốn hút. \"Liệu có đưa được cái này vào bao bì không nhỉ?\"",
    },
    {
      jp: "マイが撮った茶碗の写真は、SNSで話題になり、国内[[にとどまらず]]、海外からも「どこの茶碗？」という質問が届いた。",
      vi: "Bức ảnh chiếc chén Mai chụp trở thành đề tài trên mạng xã hội; không chỉ trong nước mà cả từ nước ngoài cũng có người hỏi \"Chén này ở đâu vậy?\".",
    },
  ],
  patterns: [
    {
      id: "wo-oite",
      pattern: "〜をおいて",
      meaning: "Ngoài… ra thì không có (ai/cái gì) khác",
      nuance:
        "Đánh giá N cao đến mức: ngoài N ra, không ai/không gì có thể sánh được. Luôn đi với một vế phủ định ở sau (ほかにない・ほかにいない・考えられない).",
      forms: ["N + をおいて（ほかに）〜ない"],
      position: {
        before: "Người / vật được đánh giá cao nhất",
        after: "ほかに〜ない・ほかにいない・考えられない",
        note: "Vế sau bắt buộc mang ý \"không có cái khác\".",
      },
      register: "Văn viết · trang trọng",
      usage: [
        "N là đối tượng được người nói đánh giá rất cao.",
        "Vế sau phủ định: không còn ai/cái gì khác.",
      ],
      examples: [
        {
          jp: "今、こんな素晴らしい色使いの染め物ができる人は、彼[[をおいて]]ほかにはいない。",
          vi: "Hiện nay, người có thể nhuộm vải phối màu tuyệt vời như thế này, ngoài anh ấy ra không còn ai.",
        },
        {
          jp: "日本で平和会議を開くなら、広島[[をおいて]]ほかに候補地は考えられない。",
          vi: "Nếu tổ chức hội nghị hòa bình ở Nhật, ngoài Hiroshima ra tôi không nghĩ ra địa điểm nào khác.",
        },
        {
          jp: "この難しい交渉を任せられるのは、田中さん[[をおいて]]いないだろう。",
          vi: "Người có thể giao cho cuộc đàm phán khó này, ngoài anh Tanaka ra chắc không có ai.",
        },
      ],
      dos: ["Khen ngợi, tiến cử: \"chỉ có người này thôi\" — trong phát biểu, bài viết."],
      donts: [
        {
          text: "Đối tượng bị đánh giá thấp / vế sau không phủ định → không dùng.",
          bad: "遅刻するのは、彼をおいてほかにいない。",
          good: "いつも遅刻するのは、彼ぐらいだ。",
        },
      ],
      compare: [
        {
          other: "〜以外に〜ない",
          diff: "以外に: trung tính, chỉ loại trừ. をおいて: luôn kèm đánh giá CAO, văn trang trọng.",
        },
        {
          other: "〜ならでは",
          diff: "ならでは: \"chỉ N mới có được\" (đặc trưng). をおいて: \"ngoài N không ai khác\" (chọn lựa). Cả hai đều khen N.",
        },
      ],
      memo: "おく = \"đặt sang một bên\". Đặt N sang một bên rồi tìm… chẳng còn ai! 🏆 \"佐藤さんをおいてほかにいない\".",
      storyLine: "パッケージのデザインを任せられるのは、佐藤さん[[をおいて]]ほかにいない。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "このチームのリーダーにふさわしいのは、山田さん＿＿＿ほかにいない。",
          opts: ["をおいて", "はおろか", "にとどまらず", "もさることながら"],
          answer: 0,
          explain: "Vế sau ほかにいない + đánh giá cao → をおいて.",
        },
        {
          type: "judge",
          q: "この町で一番おいしいラーメン屋といえば、この店をおいてほかにない。",
          ok: true,
          explain: "Đánh giá cao + vế sau phủ định ほかにない → tự nhiên.",
        },
      ],
    },
    {
      id: "naradewa",
      pattern: "〜ならでは",
      variants: ["〜ならではの N", "〜ならではだ"],
      meaning: "Chỉ có… mới có được / đặc trưng riêng của…",
      nuance:
        "Điều tuyệt vời chỉ N mới tạo ra được; nếu không phải N thì không thể có. Luôn mang nghĩa khen ngợi.",
      forms: ["N + ならではの + N", "N + ならではだ", "N + ならでは + V-ない"],
      position: {
        before: "Người, nơi chốn, tổ chức đặc biệt",
        after: "Nét đặc sắc / trải nghiệm tốt đẹp",
        note: "Hay gặp nhất: 〜ならではの + danh từ.",
      },
      register: "Văn viết & quảng cáo",
      usage: [
        "Hay dùng trong quảng cáo, giới thiệu du lịch, đánh giá tác phẩm.",
        "N là đối tượng được đánh giá cao.",
      ],
      examples: [
        {
          jp: "さすが歌舞伎俳優[[ならではの]]演技だ。ほれぼれするほどリアリティーがある。",
          vi: "Quả là diễn xuất chỉ diễn viên Kabuki mới có. Chân thực đến mức say mê.",
        },
        {
          jp: "ぜひヨットに乗ってみてください。この体験はハワイ[[ならでは]]ですよ。",
          vi: "Nhất định hãy thử đi thuyền buồm. Trải nghiệm này chỉ Hawaii mới có đấy.",
        },
        {
          jp: "手作り[[ならではの]]温かみが、この器の魅力だ。",
          vi: "Sự ấm áp chỉ đồ thủ công mới có là sức hút của chiếc bát này.",
        },
      ],
      dos: ["Giới thiệu đặc sản, trải nghiệm, phong cách riêng có của một nơi / một người."],
      donts: [
        {
          text: "Điều xấu, tiêu cực → không dùng.",
          bad: "東京ならではの満員電車には、もううんざりだ。",
          good: "東京特有の満員電車には、もううんざりだ。",
        },
      ],
      compare: [
        {
          other: "〜特有の／〜独特の",
          diff: "特有の, 独特の trung tính (dùng được cho điều xấu). ならではの luôn KHEN.",
        },
        {
          other: "〜をおいて",
          diff: "をおいて: lựa chọn duy nhất (ngoài N không ai khác). ならでは: nét đặc trưng chỉ N có.",
        },
      ],
      memo: "なら（N thì）+ では（mới）: \"Phải là N thì mới…\" ✨. Kyoto → 京都ならではの美しさ — câu quen thuộc trên mọi tờ rơi du lịch.",
      storyLine: "どれも京都[[ならでは]]の美しさだ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "この料理は、海が近いこの町＿＿＿新鮮さが自慢です。",
          opts: ["ならではの", "をおいて", "はおろか", "にとどまらず"],
          answer: 0,
          explain: "Độ tươi chỉ thị trấn gần biển mới có → ならではの + danh từ.",
        },
        {
          type: "order",
          before: "子供たちの",
          pieces: ["自由な", "発想", "ならではの", "作品"],
          after: "が並んでいる。",
          star: 2,
          vi: "Những tác phẩm chỉ trẻ em với trí tưởng tượng tự do mới làm được đang được trưng bày.",
          explain: "子供たちの自由な発想 + ならではの + 作品.",
        },
      ],
    },
    {
      id: "ni-todomarazu",
      pattern: "〜にとどまらず",
      meaning: "Không chỉ dừng lại ở… mà còn lan rộng ra…",
      nuance:
        "Sự việc không bó hẹp trong phạm vi N mà lan ra một phạm vi rộng hơn, bao trùm cả N. とどまる = dừng lại.",
      forms: ["N + にとどまらず", "V辞書形 + にとどまらず"],
      position: {
        before: "Phạm vi giới hạn (一国・国内・若者…)",
        after: "Phạm vi rộng hơn (世界中・海外・幅広い年代…)",
      },
      register: "Văn viết · báo chí",
      usage: [
        "Vế sau là phạm vi lớn hơn, thường kèm も (海外からも, 大人にも).",
        "Hay dùng khi nói về ảnh hưởng, độ phổ biến, thiệt hại.",
      ],
      examples: [
        {
          jp: "マスメディアの情報は、今や一国[[にとどまらず]]、世界中に伝わる。",
          vi: "Thông tin trên truyền thông giờ đây không chỉ trong một nước mà lan ra toàn thế giới.",
        },
        {
          jp: "農作物は、台風が来た直後[[にとどまらず]]、一年中その影響を受ける。",
          vi: "Nông sản chịu ảnh hưởng không chỉ ngay sau khi bão đến mà suốt cả năm.",
        },
        {
          jp: "このアニメは子供[[にとどまらず]]、大人にも人気がある。",
          vi: "Bộ anime này không chỉ trẻ em mà người lớn cũng yêu thích.",
        },
      ],
      dos: ["Mô tả sự lan rộng của ảnh hưởng, độ nổi tiếng, vấn đề xã hội."],
      donts: [
        {
          text: "Hai đối tượng ngang hàng, không có quan hệ \"phạm vi nhỏ → lớn\" → không tự nhiên.",
          bad: "彼はテニスにとどまらず、ピアノも弾く。",
          good: "彼はテニスだけでなく、ピアノも弾く。",
        },
      ],
      compare: [
        {
          other: "〜だけでなく／〜ばかりか (N3–N2)",
          diff: "だけでなく: liệt kê thêm, trung tính. にとどまらず: nhấn mạnh sự LAN RỘNG vượt giới hạn.",
        },
        {
          other: "〜はおろか",
          diff: "はおろか: \"A thì khỏi nói, đến B cũng…\" (thường tiêu cực, B ở mức dễ hơn). にとどまらず: phạm vi mở rộng ra ngoài.",
        },
      ],
      memo: "とどまる = dừng lại 🛑. にとどまらず = KHÔNG chịu dừng ở biên giới — như bức ảnh của Mai bay từ Nhật ra khắp thế giới.",
      storyLine: "国内[[にとどまらず]]、海外からも「どこの茶碗？」という質問が届いた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "環境問題は一つの国＿＿＿、地球全体で考えるべき問題だ。",
          opts: ["にとどまらず", "をおいて", "ならでは", "といったところで"],
          answer: 0,
          explain: "Không chỉ một nước mà cả Trái Đất → mở rộng phạm vi → にとどまらず.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "彼の研究は日本にとどまらず、世界で高く評価されている。",
          opts: [
            "Nghiên cứu của ông không chỉ ở Nhật mà còn được đánh giá cao trên thế giới.",
            "Nghiên cứu của ông chỉ được đánh giá cao ở Nhật.",
            "Ông dừng nghiên cứu ở Nhật để ra thế giới.",
            "Nghiên cứu của ông ở Nhật thì không được đánh giá cao.",
          ],
          answer: 0,
          explain: "にとどまらず = không dừng lại ở (Nhật) mà lan rộng (thế giới).",
        },
      ],
    },
    {
      id: "wa-oroka",
      pattern: "〜はおろか",
      meaning: "…thì khỏi nói, đến cả… cũng (không)",
      nuance:
        "N là điều hiển nhiên (thường ở mức khó hơn); ngay cả điều dễ hơn cũng vậy. Câu thường mang cảm xúc tiêu cực, bất mãn, ngạc nhiên của người nói. Vế sau đi với も・さえ・まで.",
      forms: ["N（+ trợ từ）+ はおろか、〜も／さえ／まで"],
      position: {
        before: "Điều \"khỏi phải nói\" (mức cao hơn)",
        after: "Điều ở mức thấp hơn + も／さえ／まで + (thường phủ định)",
      },
      register: "Văn viết & nói · cảm xúc",
      usage: [
        "Vế sau hay là phủ định: 〜さえできない, 〜も知らない.",
        "Không dùng với câu mệnh lệnh, ý chí, rủ rê.",
      ],
      examples: [
        {
          jp: "手間がかかる料理[[はおろか]]、簡単な料理を作るのさえ面倒だ。",
          vi: "Món cầu kỳ thì khỏi nói, đến nấu món đơn giản tôi cũng thấy phiền.",
        },
        {
          jp: "私は花粉症がひどくて、外で[[はおろか]]、家の中でさえマスクが外せない。",
          vi: "Tôi bị dị ứng phấn hoa nặng, bên ngoài thì khỏi nói, ngay cả trong nhà cũng không bỏ khẩu trang ra được.",
        },
        {
          jp: "彼は漢字[[はおろか]]、ひらがなも読めない。",
          vi: "Anh ta kanji thì khỏi nói, đến hiragana cũng không đọc được.",
        },
      ],
      dos: ["Than phiền, ngạc nhiên về mức độ tệ: \"đến cái dễ nhất cũng không làm được\"."],
      donts: [
        {
          text: "Vế sau là ý chí / mệnh lệnh → không dùng.",
          bad: "英語はおろか、中国語も勉強しよう。",
          good: "英語だけでなく、中国語も勉強しよう。",
        },
      ],
      compare: [
        {
          other: "〜どころか (N2)",
          diff: "どころか có thể mang nghĩa \"trái lại\" (đã không… mà còn ngược lại). はおろか chỉ là \"A thì khỏi nói, B cũng\" — cùng chiều.",
          ex: { jp: "雨は止む[[どころか]]、ますます強くなった。", vi: "Mưa chẳng những không tạnh mà còn nặng hạt hơn." },
        },
        {
          other: "〜もさることながら",
          diff: "もさることながら: TÍCH CỰC (A đã hay, B còn hay hơn). はおろか: thường TIÊU CỰC.",
        },
      ],
      memo: "おろか (愚か) = \"ngốc\" — nhắc đến A thì đúng là ngốc vì quá hiển nhiên! Kenta: 地理はおろか、駅の出口さえ分からない 🙈.",
      storyLine: "健太は京都の地理[[はおろか]]、駅の出口さえ分からず、何度も迷子になった。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "忙しくて、旅行＿＿＿、近所の公園に行く時間さえない。",
          opts: ["はおろか", "をおいて", "ならでは", "にとどまらず"],
          answer: 0,
          explain: "Du lịch thì khỏi nói, đến công viên gần nhà cũng không có thời gian (さえ) → はおろか.",
        },
        {
          type: "judge",
          q: "日本語はおろか、韓国語も勉強してください。",
          ok: false,
          explain: "Vế sau là yêu cầu → はおろか không dùng được.",
          fix: "日本語だけでなく、韓国語も勉強してください。",
        },
      ],
    },
    {
      id: "mo-sarukotonagara",
      pattern: "〜もさることながら",
      meaning: "…đã đành (đương nhiên), nhưng … còn hơn thế",
      nuance:
        "Thừa nhận N là quan trọng/tốt, nhưng muốn nhấn mạnh điều phía sau còn quan trọng/ấn tượng hơn. Thường mang sắc thái tích cực, khen ngợi.",
      forms: ["N + もさることながら"],
      position: {
        before: "Điều thứ nhất (đã tốt / quan trọng)",
        after: "Điều thứ hai được nhấn mạnh hơn",
      },
      register: "Văn viết · trang trọng, đánh giá",
      usage: [
        "Vế sau là điều người nói muốn nhấn mạnh hơn.",
        "Thường dùng khi đánh giá tác phẩm, sản phẩm, con người.",
      ],
      examples: [
        {
          jp: "この作家の作品は、鋭い感性[[もさることながら]]、言葉の選び方が素晴らしい。",
          vi: "Tác phẩm của nhà văn này, sự nhạy cảm sắc bén đã đành, cách chọn từ ngữ còn tuyệt vời hơn.",
        },
        {
          jp: "彼は人柄[[もさることながら]]、頭の良さで周りの人を引っ張っていく。",
          vi: "Anh ấy, nhân cách thì khỏi nói, còn dẫn dắt người xung quanh bằng sự thông minh.",
        },
        {
          jp: "この店は料理の味[[もさることながら]]、サービスの良さで評判だ。",
          vi: "Quán này, hương vị món ăn đã đành, còn nổi tiếng vì phục vụ tốt.",
        },
      ],
      dos: ["Đánh giá, nhận xét tích cực có hai tầng: \"A tốt — nhưng B mới thật đáng chú ý\"."],
      donts: [
        {
          text: "Than phiền, tiêu cực → nên dùng はおろか.",
          bad: "彼は漢字もさることながら、ひらがなも書けない。",
          good: "彼は漢字はおろか、ひらがなも書けない。",
        },
      ],
      compare: [
        {
          other: "〜はもちろん (N3)",
          diff: "はもちろん: A hiển nhiên, B cũng vậy (ngang hàng). もさることながら: B được nhấn mạnh HƠN A, văn trang trọng.",
        },
        {
          other: "〜はおろか",
          diff: "Ngược sắc thái: もさることながら tích cực; はおろか tiêu cực, kèm さえ/も và phủ định.",
        },
      ],
      memo: "さる (然る) = \"như thế\" → \"A như thế đã đành, nhưng…\" 🍵. Mai ở quán trà: 味もさることながら、器の美しさに心を奪われた.",
      storyLine: "マイは味[[もさることながら]]、器の美しさに心を奪われた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "このホテルは、部屋の広さ＿＿＿、窓からの眺めが最高だ。",
          opts: ["もさることながら", "はおろか", "をおいて", "にとどまらず"],
          answer: 0,
          explain: "Tích cực: phòng rộng đã đành, cảnh nhìn ra cửa sổ còn tuyệt hơn → もさることながら.",
        },
        {
          type: "choice",
          label: "Chọn mẫu phù hợp sắc thái",
          q: "（不満）この部屋は、エアコン＿＿＿、扇風機さえない。",
          opts: ["はおろか", "もさることながら", "ならでは", "をおいて"],
          answer: 0,
          explain: "Than phiền + さえない → はおろか. もさることながら dùng cho khen ngợi.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Vế sau", "Sắc thái"],
    rows: [
      ["〜をおいて", "Ngoài N ra không ai/gì khác", "ほかに〜ない", "Đánh giá rất cao"],
      ["〜ならでは", "Chỉ N mới có", "の + danh từ / だ", "Khen, đặc trưng tốt"],
      ["〜にとどまらず", "Không dừng ở N, lan rộng", "Phạm vi lớn hơn + も", "Trung tính, báo chí"],
      ["〜はおろか", "N thì khỏi nói, đến … cũng", "も／さえ + (phủ định)", "Tiêu cực, bất mãn"],
      ["〜もさることながら", "N đã đành, … còn hơn", "Điều được nhấn mạnh hơn", "Tích cực, đánh giá"],
    ],
  },
  links: [
    "をおいて & ならでは: hai mẫu \"CHỈ CÓ\" đều KHEN. をおいて = chọn lựa duy nhất; ならでは = nét đặc trưng.",
    "はおろか (tiêu cực) ↔ もさることながら (tích cực): cùng khung \"A… B còn…\" nhưng đối lập cảm xúc — câu hỏi sắc thái hay gặp trong đề.",
    "Ôn N2: だけでなく・ばかりか・どころか. N1 thêm にとどまらず (phạm vi lan rộng) và はおろか (văn viết, cảm xúc).",
    "Chương 17 (強調) có すら・だに — họ hàng của さえ đi cùng はおろか.",
  ],
  hook: "Ở Kyoto: chỉ có chị Satō (をおいて) · vẻ đẹp chỉ Kyoto có (ならでは) · Kenta đến cửa ga cũng lạc (はおろか) · chén trà đẹp hơn cả vị trà (もさることながら) · tấm ảnh bay ra thế giới (にとどまらず).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜をおいて", "Ngoài… ra không có ai khác"],
        ["〜ならでは", "Chỉ… mới có được"],
        ["〜にとどまらず", "Không chỉ dừng ở… mà lan rộng"],
        ["〜はおろか", "…thì khỏi nói, đến… cũng không"],
        ["〜もさることながら", "…đã đành, … còn hơn"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "けがをしてから、走ること＿＿＿、歩くことさえつらい。",
      opts: ["はおろか", "もさることながら", "ならでは", "をおいて"],
      answer: 0,
      explain: "Chạy thì khỏi nói, đến đi bộ cũng khổ → tiêu cực + さえ → はおろか.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "この難しい手術ができる医者は、経験豊富な木村先生＿＿＿ほかにいない。",
      opts: ["をおいて", "はおろか", "もさることながら", "にとどまらず"],
      answer: 0,
      explain: "Đánh giá cao + vế sau ほかにいない → をおいて.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "職人の手仕事＿＿＿美しさが、この着物にはある。",
      opts: ["ならではの", "はおろか", "にとどまらず", "をおいて"],
      answer: 0,
      explain: "Vẻ đẹp chỉ tay nghề thủ công mới có → ならではの + danh từ.",
    },
    {
      type: "order",
      before: "その映画は、",
      pieces: ["ストーリー", "も", "さることながら", "音楽が"],
      after: "素晴らしかった。",
      star: 3,
      vi: "Bộ phim ấy, cốt truyện đã đành, âm nhạc còn tuyệt vời hơn.",
      explain: "ストーリーもさることながら、音楽が素晴らしかった.",
    },
    {
      type: "judge",
      q: "彼のファンは日本国内にとどまらず、アジア各国に広がっている。",
      ok: true,
      explain: "Phạm vi nhỏ (trong nước) → lan rộng (các nước châu Á) → đúng.",
    },
    {
      type: "judge",
      q: "この仕事ができるのは、新人の彼をおいてほかにもたくさんいる。",
      ok: false,
      explain: "をおいて phải đi với vế sau \"không có ai khác\". Câu này nói \"còn nhiều người khác\" → mâu thuẫn.",
      fix: "この仕事ができるのは、彼をおいてほかにいない。",
    },
  ],
};
