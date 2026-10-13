import type { N1Lesson } from "../types";

export const bai16: N1Lesson = {
  id: "bai-16",
  num: 16,
  topicJa: "結末・最終の状態",
  topicVi: "Kết cục · trạng thái cuối cùng",
  chapterJa: "思わぬトラブル",
  chapterVi: "Rắc rối bất ngờ",
  scene:
    "Tháng Hai. Sản phẩm của Mai chuẩn bị ra mắt thì nhà cung cấp trà gặp sự cố, rồi Kenta lại gây thêm chuyện. Mọi thứ trượt dần đến \"kết cục\" tệ — chương này học cách nói về KẾT CỤC và TRẠNG THÁI CUỐI CÙNG.",
  story: [
    {
      jp: "茶葉の仕入れ先は、納品の遅れを何度も繰り返し、ついには電話にも出なくなる[[始末だ]]。",
      vi: "Nhà cung cấp lá trà hết lần này đến lần khác giao hàng trễ, rốt cuộc đến điện thoại cũng không bắt máy.",
    },
    {
      jp: "発売日に間に合わない可能性が出てくる[[に至って]]、ようやく役員会が動き出した。",
      vi: "Phải đến khi xuất hiện khả năng không kịp ngày ra mắt, ban giám đốc mới bắt đầu vào cuộc.",
    },
    {
      jp: "同じ仕入れ先と取引していた会社はどこも困っていた。ある大手メーカー[[に至っては]]、新商品の発売そのものを中止したという。",
      vi: "Các công ty giao dịch với cùng nhà cung cấp ấy đều điêu đứng. Một hãng lớn nọ thậm chí còn hủy luôn việc ra mắt sản phẩm mới.",
    },
    {
      jp: "そんな中、健太が試作室の機械を一晩中つけ[[っぱなし]]にして帰り、翌朝、部屋中が煙だらけになっていた。部長の雷が落ちたのは言うまでもない。",
      vi: "Giữa lúc đó, Kenta lại để máy trong phòng thử nghiệm chạy suốt đêm rồi về, sáng hôm sau cả phòng ngập khói. Khỏi phải nói trưởng phòng nổi trận lôi đình thế nào.",
    },
    {
      jp: "落ち込む健太に、マイは言った。「大丈夫。失敗しても、ここから立て直せばいいんだよ。」いつの間にか、マイが励ます側になっていた。",
      vi: "Thấy Kenta ủ rũ, Mai nói: \"Không sao đâu. Có thất bại thì gây dựng lại từ đây là được.\" Chẳng biết từ lúc nào, Mai đã thành người động viên người khác.",
    },
  ],
  patterns: [
    {
      id: "ni-itatte",
      pattern: "〜に至って（は）／〜に至っても",
      meaning: "Phải đến mức… mới… / Dù đến mức… vẫn không…",
      nuance:
        "Sự việc tiến triển đến một giai đoạn cực đoan (thường là xấu). に至って: đến mức đó MỚI chịu thay đổi (hay đi với ようやく, 初めて). に至っても: dù đến mức đó VẪN không thay đổi.",
      forms: ["N／V辞書形 + に至って", "N／V辞書形 + に至っても"],
      position: {
        before: "Giai đoạn cực đoan: 死者が出る・倒産寸前・ひどい症状",
        after: "に至って: ようやく／初めて〜 / に至っても: まだ〜ない",
      },
      register: "Văn viết · báo chí",
      usage: [
        "に至って: vế sau hay có ようやく, 初めて, やっと.",
        "に至っても: vế sau phủ định, まだ, 〜ようとしない.",
      ],
      examples: [
        {
          jp: "死者が出る[[に至って]]、国は初めて感染拡大の深刻さに気がついた。",
          vi: "Phải đến khi có người chết, nhà nước mới nhận ra mức nghiêm trọng của dịch bệnh.",
        },
        {
          jp: "ひどい症状が出る[[に至っても]]、彼は病院へ行こうとしなかった。",
          vi: "Dù triệu chứng đã nặng đến thế, anh ta vẫn không chịu đi viện.",
        },
        {
          jp: "会社が倒産寸前になる[[に至って]]、社長はやっと自分の過ちを認めた。",
          vi: "Đến khi công ty sắp phá sản, giám đốc mới chịu thừa nhận sai lầm.",
        },
      ],
      dos: ["Phê bình sự chậm trễ: \"phải đến lúc ấy mới…\" / \"đến thế mà vẫn không…\"."],
      donts: [
        {
          text: "Giai đoạn bình thường, không cực đoan → không tự nhiên.",
          bad: "朝になるに至って、起きた。",
          good: "朝になって、起きた。",
        },
      ],
      compare: [
        {
          other: "〜に至っては",
          diff: "に至っては (có は): nêu VÍ DỤ CỰC ĐOAN nhất trong nhóm. に至って: GIAI ĐOẠN cuối của tiến trình.",
        },
        {
          other: "〜てはじめて (N3)",
          diff: "てはじめて: \"phải… mới\" trung tính. に至って: nhấn mạnh mức CỰC ĐOAN, phê phán.",
        },
      ],
      memo: "至る = \"tới tận\" → \"tới tận vực thẳm mới chịu dừng\" 🧗. 間に合わない可能性が出てくるに至って、ようやく役員会が動き出した.",
      storyLine: "発売日に間に合わない可能性が出てくる[[に至って]]、ようやく役員会が動き出した。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "事故が起きる＿＿＿、ようやく市はその交差点に信号を設置した。",
          opts: ["に至って", "に至っては", "始末で", "っぱなしで"],
          answer: 0,
          explain: "Đến mức có tai nạn → ようやく → に至って.",
        },
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "借金が一千万円を超える＿＿＿、彼はまだギャンブルをやめようとしない。",
          opts: ["に至っても", "に至って", "に至るまで", "始末に"],
          answer: 0,
          explain: "Dù đến mức đó vẫn không chịu dừng → に至っても.",
        },
      ],
    },
    {
      id: "ni-itattewa",
      pattern: "〜に至っては",
      meaning: "Đến như… thì (còn tệ / cực đoan hơn nữa)",
      nuance:
        "Trong một nhóm sự việc cùng xu hướng, nêu ra VÍ DỤ CỰC ĐOAN NHẤT để nhấn mạnh. Người nói ngạc nhiên, sốc, thường là đánh giá tiêu cực.",
      forms: ["N + に至っては"],
      position: {
        before: "Ví dụ cực đoan nhất trong nhóm (đã nêu tình hình chung trước)",
        after: "Mức độ tệ nhất / đáng ngạc nhiên nhất",
        note: "Thường câu trước nêu tình hình chung, câu sau dùng に至っては.",
      },
      register: "Văn viết · báo chí",
      usage: [
        "Hay xuất hiện sau một câu nêu tình hình chung.",
        "Nhấn mạnh mức độ cực đoan, gây sốc.",
      ],
      examples: [
        {
          jp: "デパートの閉店が相次いでいる。Aデパート[[に至っては]]、一度に三つの支店を閉めた。",
          vi: "Các trung tâm thương mại liên tiếp đóng cửa. Đến như trung tâm A thì đóng một lúc ba chi nhánh.",
        },
        {
          jp: "毎年この地方は洪水の被害を受ける。長崎県[[に至っては]]、今年もう三回目だ。",
          vi: "Năm nào vùng này cũng chịu lũ lụt. Đến như tỉnh Nagasaki thì năm nay đã là lần thứ ba.",
        },
        {
          jp: "家族はみんな朝が苦手だ。弟[[に至っては]]、昼まで起きてこない。",
          vi: "Cả nhà ai cũng khó dậy sớm. Đến như em trai tôi thì trưa mới dậy.",
        },
      ],
      dos: ["Nêu ví dụ cực đoan nhất trong một nhóm."],
      donts: [
        {
          text: "Không có \"nhóm\" để so sánh, chỉ một sự việc lẻ → không dùng.",
          bad: "田中さんに至っては、今日会社を休んだ。",
          good: "今日はみんな体調が悪い。田中さんに至っては、会社を休んだ。",
        },
      ],
      compare: [
        {
          other: "〜に至って",
          diff: "Không có は: giai đoạn cuối của tiến trình. Có は: ví dụ cực đoan nhất trong nhóm.",
        },
        {
          other: "〜なんか／〜なんて (N3)",
          diff: "Khẩu ngữ, khinh thường. に至っては: văn viết, nhấn mạnh mức cực đoan.",
        },
      ],
      memo: "Xếp hàng theo độ \"tệ\" 📉: ai cũng điêu đứng… ĐẾN NHƯ hãng lớn kia thì hủy luôn sản phẩm! (に至っては)",
      storyLine: "ある大手メーカー[[に至っては]]、新商品の発売そのものを中止したという。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "最近の子供は外で遊ばない。うちの息子＿＿＿、一日中ゲームをしている。",
          opts: ["に至っては", "に至って", "始末で", "にひきかえ"],
          answer: 0,
          explain: "Nhóm (trẻ con dạo này) → ví dụ cực đoan nhất (con trai tôi) → に至っては.",
        },
        {
          type: "order",
          before: "物価が上がっている。",
          pieces: ["野菜", "に", "至っては", "去年の"],
          after: "二倍の値段だ。",
          star: 3,
          vi: "Vật giá đang tăng. Đến như rau thì giá gấp đôi năm ngoái.",
          explain: "野菜に至っては去年の二倍の値段だ.",
        },
      ],
    },
    {
      id: "shimatsuda",
      pattern: "〜始末だ",
      meaning: "Rốt cuộc thì (đến nỗi)… — kết cục tồi tệ",
      nuance:
        "Sau một chuỗi tình trạng xấu kéo dài, cuối cùng dẫn đến một kết cục tệ hại. Người nói than phiền, bực bội. Hay đi với ついに, とうとう, 〜まで.",
      forms: ["V辞書形 + 始末だ", "この／あの + 始末だ"],
      position: {
        before: "Chuỗi tình trạng xấu (〜し、〜し、ついには)",
        after: "(cuối câu) kết cục tệ + 始末だ",
      },
      register: "Văn nói & viết · than phiền",
      usage: [
        "Câu trước thường mô tả quá trình xấu dần.",
        "この始末だ = ra nông nỗi này đây.",
      ],
      examples: [
        {
          jp: "おいは遊んでばかりでまじめに働かず、とうとう会社を辞めてしまう[[始末だ]]。",
          vi: "Thằng cháu suốt ngày ăn chơi, chẳng chịu làm ăn, rốt cuộc nghỉ luôn việc công ty.",
        },
        {
          jp: "田中さんはお酒を飲んで大声でしゃべり続けた後、ついに泣き出す[[始末だった]]。",
          vi: "Anh Tanaka uống rượu, nói oang oang mãi, rồi cuối cùng còn khóc òa lên.",
        },
        {
          jp: "あれほど注意したのに、また遅刻して、この[[始末だ]]。",
          vi: "Đã nhắc bao nhiêu lần rồi mà lại đi trễ, ra nông nỗi này đây.",
        },
      ],
      dos: ["Than phiền về kết cục xấu sau một quá trình tệ dần."],
      donts: [
        {
          text: "Kết quả tốt → không dùng.",
          bad: "毎日努力して、ついに合格する始末だ。",
          good: "毎日努力して、ついに合格した。",
        },
      ],
      compare: [
        {
          other: "〜あげく (N2)",
          diff: "あげく: \"sau khi… rốt cuộc\" (đứng giữa câu: 悩んだあげく). 始末だ: đứng CUỐI câu, nhấn mạnh kết cục tệ, than phiền.",
        },
        {
          other: "〜っぱなしだ",
          diff: "っぱなし: trạng thái bỏ mặc kéo dài. 始末だ: kết cục sau chuỗi sự việc.",
        },
      ],
      memo: "始末 = \"đầu đuôi\" → đầu thì tệ, ĐUÔI còn tệ hơn 🌀. 仕入れ先は、ついには電話にも出なくなる始末だ.",
      storyLine: "ついには電話にも出なくなる[[始末だ]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "彼は約束を何度も破り、ついには嘘までつく＿＿＿。",
          opts: ["始末だ", "に至っては", "っぱなしだ", "ないまでもだ"],
          answer: 0,
          explain: "Chuỗi việc xấu → kết cục tệ (nói dối) + cuối câu → 始末だ.",
        },
        {
          type: "judge",
          q: "彼女は一生懸命練習して、優勝する始末だった。",
          ok: false,
          explain: "始末だ chỉ dùng cho kết cục xấu.",
          fix: "彼女は一生懸命練習して、ついに優勝した。",
        },
      ],
    },
    {
      id: "ppanashi",
      pattern: "〜っぱなし",
      variants: ["〜っぱなしだ", "〜っぱなしで", "〜っぱなしの N"],
      meaning: "Để nguyên (bỏ mặc) / suốt (cứ… mãi)",
      nuance:
        "① Làm xong rồi bỏ mặc trạng thái đó, không xử lý (để đèn sáng, để cửa mở). ② Một trạng thái kéo dài liên tục, khác thường (đứng suốt, thua liên tiếp). Thường mang ý không tốt, bất mãn.",
      forms: ["Vます + っぱなし（だ／で／の N）"],
      position: {
        before: "Động từ: つける・開ける・出す・立つ・負ける",
        after: "Trạng thái bị bỏ mặc / kéo dài",
      },
      register: "Văn nói · đời thường",
      usage: [
        "Nghĩa ①: 電気をつけっぱなし, ドアを開けっぱなし, 出しっぱなし.",
        "Nghĩa ②: 立ちっぱなし, 負けっぱなし, 働きっぱなし.",
      ],
      examples: [
        {
          jp: "昨日は電気をつけ[[っぱなし]]で寝てしまった。",
          vi: "Hôm qua tôi để đèn sáng nguyên như thế mà ngủ quên.",
        },
        {
          jp: "友達に本を半年も借り[[っぱなし]]になっている。",
          vi: "Tôi mượn sách của bạn rồi để đó suốt nửa năm chưa trả.",
        },
        {
          jp: "満員電車で一時間立ち[[っぱなし]]だった。",
          vi: "Tôi phải đứng suốt một tiếng trên tàu chật cứng.",
        },
      ],
      dos: ["Than phiền về sự bất cẩn (bỏ mặc) hoặc trạng thái kéo dài mệt mỏi."],
      donts: [
        {
          text: "Trạng thái tốt, có chủ ý giữ nguyên → không tự nhiên.",
          bad: "部屋をきれいにしっぱなしにしている。",
          good: "部屋をいつもきれいにしている。",
        },
      ],
      compare: [
        {
          other: "〜たまま (N4)",
          diff: "たまま: giữ nguyên trạng thái, trung tính. っぱなし: nhấn mạnh sự BỎ MẶC, cẩu thả, khó chịu.",
        },
        {
          other: "〜続ける (N4)",
          diff: "続ける: tiếp tục trung tính. っぱなし (nghĩa ②): kéo dài một cách mệt mỏi, khác thường.",
        },
      ],
      memo: "放し (はなし) = \"buông tay\" 🤷 → buông tay bỏ mặc. Kenta: 機械を一晩中つけっぱなしにして帰った.",
      storyLine: "健太が試作室の機械を一晩中つけ[[っぱなし]]にして帰り、翌朝、部屋中が煙だらけになっていた。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "水を出し＿＿＿にしないでください。",
          opts: ["っぱなし", "ぱなし", "たっぱなし", "てっぱなし"],
          answer: 0,
          explain: "Vます (出し) + っぱなし.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "今シーズン、このチームは負けっぱなしだ。",
          opts: [
            "Mùa này đội này thua liên tục.",
            "Mùa này đội này không bao giờ thua.",
            "Mùa này đội này bỏ cuộc giữa chừng.",
            "Mùa này đội này thua một trận rồi thắng mãi.",
          ],
          answer: 0,
          explain: "っぱなし (nghĩa ②) = trạng thái kéo dài liên tục.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Vị trí", "Sắc thái"],
    rows: [
      ["〜に至って", "Phải đến mức… mới", "Giữa câu + ようやく", "Phê bình chậm trễ"],
      ["〜に至っても", "Đến mức… vẫn không", "Giữa câu + phủ định", "Phê bình"],
      ["〜に至っては", "Đến như… thì (cực đoan)", "Nêu ví dụ trong nhóm", "Sốc, tiêu cực"],
      ["〜始末だ", "Rốt cuộc đến nỗi", "Cuối câu", "Than phiền"],
      ["〜っぱなし", "Bỏ mặc / suốt", "Vます + っぱなし", "Bất mãn"],
    ],
  },
  links: [
    "Họ 至る: に至るまで (Ch.2, phạm vi) · に至って / に至っても / に至っては (Ch.16). Một động từ, bốn mẫu!",
    "Ôn N2: あげく, 末に, ついに. N1 thêm 始末だ (kết cục tệ, cuối câu).",
    "Ôn N4: たまま. N1 thêm っぱなし (bỏ mặc, khó chịu).",
  ],
  hook: "Rắc rối: nhà cung cấp rốt cuộc mất liên lạc (始末だ) · đến lúc sắp trễ mới chịu vào cuộc (に至って) · có hãng còn hủy luôn sản phẩm (に至っては) · Kenta để máy chạy suốt đêm (っぱなし).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜に至って", "Phải đến mức… mới…"],
        ["〜に至っても", "Đến mức… vẫn không…"],
        ["〜に至っては", "Đến như… thì (cực đoan nhất)"],
        ["〜始末だ", "Rốt cuộc đến nỗi (kết cục tệ)"],
        ["〜っぱなし", "Để nguyên, bỏ mặc / suốt"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "窓を開け＿＿＿で出かけたら、部屋に雨が入ってしまった。",
      opts: ["っぱなし", "始末", "に至って", "ないまでも"],
      answer: 0,
      explain: "Để cửa mở nguyên rồi đi → っぱなし.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "社員の半数が辞める＿＿＿、社長はようやく職場環境の改善に乗り出した。",
      opts: ["に至って", "に至っては", "始末で", "っぱなしで"],
      answer: 0,
      explain: "Phải đến mức nửa số nhân viên nghỉ việc → ようやく → に至って.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "このクラスは成績が悪い。山田君＿＿＿、全科目が零点だった。",
      opts: ["に至っては", "に至って", "始末で", "にひきかえ"],
      answer: 0,
      explain: "Nhóm (cả lớp kém) → ví dụ cực đoan (Yamada 0 điểm) → に至っては.",
    },
    {
      type: "order",
      before: "息子は勉強もせず、",
      pieces: ["ついには", "学校を", "やめる", "始末だ"],
      after: "。",
      star: 2,
      vi: "Con trai tôi chẳng học hành gì, rốt cuộc còn bỏ học.",
      explain: "ついには学校をやめる始末だ.",
    },
  ],
};
