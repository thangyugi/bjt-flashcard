import type { N1Lesson } from "../types";

export const bai10: N1Lesson = {
  id: "bai-10",
  num: 10,
  topicJa: "逆接条件",
  topicVi: "Điều kiện nghịch (dù… thì cũng…)",
  chapterJa: "企画書との戦い",
  chapterVi: "Cuộc chiến với bản đề xuất",
  scene:
    "Cuối tháng Mười. Mai thức khuya viết bản đề xuất sản phẩm mới: dòng trà sữa vị Việt Nam \"ベトナム茶ラテ\". Ai cũng góp một câu \"DÙ… THÌ CŨNG…\" — chương của điều kiện NGHỊCH.",
  story: [
    {
      jp: "マイの企画は「ベトナム茶ラテ」。周りからは「日本人の口に合うかな」という声もあった。でもマイは決めていた。たとえ反対され[[ようと]]、この企画を出す。",
      vi: "Đề xuất của Mai là \"Trà sữa Việt Nam\". Có người xung quanh lo \"Liệu có hợp khẩu vị người Nhật không?\". Nhưng Mai đã quyết: dù bị phản đối thì cô vẫn nộp.",
    },
    {
      jp: "田中部長は言った。「採用され[[ようとされまいと]]、挑戦したこと自体に意味がある。思い切りやってみなさい。」",
      vi: "Trưởng phòng Tanaka nói: \"Dù có được chọn hay không, bản thân việc thử thách đã có ý nghĩa. Cứ làm hết sức đi.\"",
    },
    {
      jp: "意外にも、健太がいいアドバイスをくれた。「どんな企画[[であれ]]、最後はデータが勝負だよ。数字で説得しなきゃ。」",
      vi: "Bất ngờ là Kenta lại cho một lời khuyên hay: \"Đề xuất gì đi nữa thì cuối cùng cũng phải đấu bằng số liệu. Phải thuyết phục bằng con số.\"",
    },
    {
      jp: "締め切り前夜、マイはグラフを全部作り直そうとした。健太が止めた。「今から全部直し[[たところで]]、朝までには終わらないよ。」",
      vi: "Đêm trước hạn chót, Mai định làm lại toàn bộ biểu đồ. Kenta cản: \"Giờ có sửa hết thì cũng không xong trước sáng đâu.\"",
    },
    {
      jp: "佐藤先輩も笑って言った。「時間がなけれ[[ばないで]]、できることだけやればいいの。完璧じゃなくても、マイさんの思いは伝わるから。」",
      vi: "Chị Satō cũng cười: \"Không có thời gian thì làm những gì làm được thôi. Không hoàn hảo cũng được, tâm huyết của em sẽ truyền tới người đọc.\"",
    },
  ],
  patterns: [
    {
      id: "youto",
      pattern: "〜（よ）うと（も）",
      variants: ["〜（よ）うが"],
      meaning: "Dù có… đi nữa thì cũng (không ảnh hưởng)",
      nuance:
        "Dù điều kiện A xảy ra thì kết quả/quyết tâm B vẫn không đổi. Vế sau là phán đoán, quyết tâm của người nói. Hay đi với たとえ, いくら, どんなに, 何が.",
      forms: ["Vう・よう形 + と（も）／が", "Aい → かろう + と／が", "Aな／N → だろう・であろう + と／が"],
      position: {
        before: "Điều kiện giả định (たとえ〜, どんなに〜, 何を言われ〜)",
        after: "Quyết tâm / phán đoán không đổi",
      },
      register: "Văn viết & nói mạnh mẽ",
      usage: [
        "Thường có từ để hỏi hoặc たとえ／いくら／どんなに phía trước.",
        "Vế sau không ở dạng quá khứ cụ thể (không kể sự việc đã xảy ra).",
      ],
      examples: [
        {
          jp: "たとえ地震が起ころ[[うと]]、このビルは安全なはずだ。",
          vi: "Dù có động đất xảy ra, tòa nhà này chắc chắn vẫn an toàn.",
        },
        {
          jp: "目標までどんなに遠かろ[[うと]]、僕は夢を捨てないぞ。",
          vi: "Mục tiêu có xa đến đâu, tôi cũng không từ bỏ ước mơ.",
        },
        {
          jp: "人に何と言われ[[ようが]]、自分の道を進むつもりだ。",
          vi: "Dù người ta nói gì, tôi vẫn định đi con đường của mình.",
        },
      ],
      dos: ["Bày tỏ quyết tâm, khẳng định mạnh: \"dù thế nào cũng…\"."],
      donts: [
        {
          text: "Kể sự việc cụ thể đã xảy ra → dùng ても／のに.",
          bad: "昨日は雨が降ろうと、出かけた。",
          good: "昨日は雨が降っていたのに、出かけた。",
        },
      ],
      compare: [
        {
          other: "〜ても (N4)",
          diff: "ても trung tính, dùng cả quá khứ. ようと: văn viết, mạnh mẽ, thường cho giả định / quyết tâm.",
        },
        {
          other: "〜たところで",
          diff: "たところで: \"dù có làm cũng VÔ ÍCH\" (đánh giá phủ định). ようと: \"dù thế nào cũng KHÔNG ẢNH HƯỞNG đến quyết tâm\".",
        },
      ],
      memo: "Thể ý chí (よう) + と = \"dù có muốn thế nào đi nữa\" 🛡️. Mai: たとえ反対されようと、この企画を出す.",
      storyLine: "たとえ反対され[[ようと]]、この企画を出す。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "どんなに忙し＿＿＿、毎日三十分は日本語を勉強する。",
          opts: ["かろうと", "いようと", "くようと", "かろうとも言わず"],
          answer: 0,
          explain: "Tính từ い: 忙しい → 忙しかろう + と.",
        },
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "周りが何と言お＿＿＿、私は彼を信じている。",
          opts: ["うと", "うにも", "うものなら", "うとしない"],
          answer: 0,
          explain: "何と言おうと = dù (người ta) nói gì đi nữa.",
        },
      ],
    },
    {
      id: "youto-maito",
      pattern: "〜（よ）うと〜まいと",
      variants: ["〜（よ）うが〜まいが"],
      meaning: "Dù có… hay không… thì cũng (không liên quan)",
      nuance:
        "Lặp lại cùng một động từ ở dạng khẳng định (う/よう) và phủ định (まい): làm hay không làm cũng không ảnh hưởng đến B. Vế sau là quyết tâm, phán đoán.",
      forms: ["Vう・よう形 + と + V辞書形 + まい + と", "Nhóm II・III: Vます／V辞書形 + まい（する → するまい／すまい, 来る → こまい／くるまい）"],
      position: {
        before: "Cặp khẳng định – phủ định của cùng một động từ",
        after: "Kết quả / quyết tâm không đổi",
      },
      register: "Văn viết · khẳng định mạnh",
      usage: [
        "Hai động từ phải giống nhau.",
        "まい = phủ định cổ (≈ ない).",
      ],
      examples: [
        {
          jp: "田中先生は、学生が理解し[[ようとするまいと]]、どんどん難しい話を続けた。",
          vi: "Thầy Tanaka chẳng cần biết sinh viên có hiểu hay không, cứ thế giảng ngày càng khó.",
        },
        {
          jp: "雨が降ろ[[うが降るまいが]]、サッカーの練習は休みにならない。",
          vi: "Dù mưa hay không mưa, buổi tập bóng đá cũng không nghỉ.",
        },
        {
          jp: "あなたが行こ[[うと行くまいと]]、私は行きます。",
          vi: "Dù anh có đi hay không, tôi vẫn đi.",
        },
      ],
      dos: ["Nhấn mạnh rằng một lựa chọn có/không đều không thay đổi được kết quả."],
      donts: [
        {
          text: "Hai động từ khác nhau → sai cấu trúc.",
          bad: "行こうと帰るまいと、自由だ。",
          good: "行こうと行くまいと、あなたの自由だ。",
        },
      ],
      compare: [
        {
          other: "〜かどうかにかかわらず (N2)",
          diff: "Cùng nghĩa \"có hay không cũng không liên quan\". かどうかにかかわらず trung tính; ようとまいと mạnh, văn viết.",
        },
        {
          other: "〜（よ）うと",
          diff: "ようと: một điều kiện. ようとまいと: cả hai khả năng có/không.",
        },
      ],
      memo: "う と まい = \"CÓ và KHÔNG\" — như tung đồng xu 🪙: mặt nào cũng ra một kết quả. Trưởng phòng: 採用されようとされまいと、挑戦に意味がある.",
      storyLine: "採用され[[ようとされまいと]]、挑戦したこと自体に意味がある。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "彼が来よう＿＿＿、パーティーは予定通り始めます。",
          opts: ["と来るまいと", "と来ないと", "が来ようが", "と来まいでも"],
          answer: 0,
          explain: "来よう + と + 来る + まい + と (cùng động từ, khẳng định – phủ định).",
        },
        {
          type: "order",
          before: "",
          pieces: ["勝とう", "が", "勝つまいが", "全力を"],
          after: "尽くすだけだ。",
          star: 2,
          vi: "Dù thắng hay không, tôi chỉ việc dốc hết sức.",
          explain: "勝とうが勝つまいが（cùng động từ 勝つ）、全力を尽くすだけだ.",
        },
      ],
    },
    {
      id: "deare",
      pattern: "〜であれ",
      variants: ["〜であろうと"],
      meaning: "Dù là… đi nữa (thì cũng)",
      nuance:
        "Dù N là gì / như thế nào thì cũng không ảnh hưởng đến B. Hay đi với たとえ, どんな, 何, 誰. Vế sau là phán đoán, quyết tâm.",
      forms: ["N + であれ／であろうと", "Từ để hỏi (+N) + であれ"],
      position: {
        before: "たとえ N / どんな N / 何 / 誰",
        after: "Kết luận, quyết tâm không đổi",
      },
      register: "Văn viết · trang trọng",
      usage: [
        "Dạng đơn (một lần) — khác với cặp 〜であれ〜であれ (Chương 4).",
        "Vế sau là phán đoán chung, quyết ý.",
      ],
      examples: [
        {
          jp: "たとえ嵐の夜[[であれ]]、仕事のためなら私は出かける。",
          vi: "Dù là đêm giông bão đi nữa, nếu vì công việc tôi vẫn ra ngoài.",
        },
        {
          jp: "どんな権力者[[であれ]]、いつかは命の終わりが来る。",
          vi: "Dù là kẻ quyền lực đến đâu, rồi cũng có ngày chết.",
        },
        {
          jp: "理由が何[[であれ]]、暴力は許されない。",
          vi: "Dù lý do là gì, bạo lực cũng không được dung thứ.",
        },
      ],
      dos: ["Khẳng định nguyên tắc chung: \"dù là gì đi nữa…\"."],
      donts: [
        {
          text: "Đi với động từ → sai (であれ gắn với danh từ).",
          bad: "どんなに走るであれ、間に合わない。",
          good: "どんなに走ろうと、間に合わない。",
        },
      ],
      compare: [
        {
          other: "〜であれ〜であれ (Chương 4)",
          diff: "Dạng cặp: nêu hai ví dụ (A hay B). Dạng đơn: \"dù là N gì đi nữa\".",
        },
        {
          other: "〜といえども (Chương 8)",
          diff: "といえども nhấn mạnh địa vị đặc biệt của N (ngay cả X cũng…). であれ nhấn mạnh \"N là gì cũng vậy\".",
        },
      ],
      memo: "であれ = \"là gì thì là\" 🤷. Kenta (hiếm khi sâu sắc): どんな企画であれ、最後はデータが勝負.",
      storyLine: "どんな企画[[であれ]]、最後はデータが勝負だよ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "相手が誰＿＿＿、失礼な態度をとってはいけない。",
          opts: ["であれ", "たところで", "ばそれで", "であったら最後"],
          answer: 0,
          explain: "誰であれ = dù là ai đi nữa.",
        },
        {
          type: "judge",
          q: "どんな仕事であれ、責任を持って最後までやるべきだ。",
          ok: true,
          explain: "どんな N であれ + nguyên tắc chung → đúng.",
        },
      ],
    },
    {
      id: "tatokorode",
      pattern: "〜たところで",
      meaning: "Dù có… thì cũng (vô ích, chẳng được gì)",
      nuance:
        "Dù có thử làm A thì kết quả cũng vô ích, không như mong muốn. Vế sau là phán đoán mang tính PHỦ ĐỊNH, thường ở dạng ない／だろう. Hay đi với いくら, どんなに, 今さら.",
      forms: ["Vた + ところで"],
      position: {
        before: "Hành động thử làm (いくら謝った・今さら急いだ)",
        after: "Phán đoán phủ định: 無駄だ・〜ないだろう・どうにもならない",
      },
      register: "Văn nói & viết",
      usage: [
        "Vế sau không ở thể quá khứ, không là ý chí/mệnh lệnh.",
        "Còn nghĩa \"cùng lắm chỉ…\" (どんなに高くても一万円といったところ) — nhưng nghĩa chính là \"vô ích\".",
      ],
      examples: [
        {
          jp: "今さら駆けつけ[[たところで]]、もう会議は終わっているだろう。",
          vi: "Giờ có chạy tới thì cuộc họp chắc cũng đã kết thúc rồi.",
        },
        {
          jp: "どんなに説明し[[たところで]]、私の気持ちは分かってもらえないだろう。",
          vi: "Dù có giải thích thế nào thì chắc cũng không ai hiểu được cảm xúc của tôi.",
        },
        {
          jp: "いくら後悔し[[たところで]]、過ぎた時間は戻らない。",
          vi: "Dù có hối hận bao nhiêu, thời gian đã qua cũng không quay lại.",
        },
      ],
      dos: ["Can ngăn, an ủi, bình luận về sự vô ích: \"có làm cũng chẳng được gì\"."],
      donts: [
        {
          text: "Vế sau là kết quả tốt / khẳng định → không dùng.",
          bad: "毎日練習したところで、上手になった。",
          good: "毎日練習したので、上手になった。",
        },
      ],
      compare: [
        {
          other: "〜ても (N4)",
          diff: "ても trung tính. たところで: nhấn mạnh \"VÔ ÍCH\", đánh giá phủ định.",
        },
        {
          other: "〜（よ）うと",
          diff: "ようと: quyết tâm không bị ảnh hưởng. たところで: hành động là vô nghĩa.",
        },
      ],
      memo: "ところ = \"điểm\": làm xong đến \"điểm\" đó rồi nhìn lại… trắng tay 🫥. Kenta: 今から全部直したところで、朝までには終わらない.",
      storyLine: "今から全部直し[[たところで]]、朝までには終わらないよ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "いくら頼ん＿＿＿、あの頑固な父は許してくれないだろう。",
          opts: ["だところで", "でところで", "だところを", "でものを"],
          answer: 0,
          explain: "頼む → 頼んだ + ところで: dù có xin bao nhiêu cũng vô ích.",
        },
        {
          type: "judge",
          q: "急いだところで、次の電車には間に合わない。",
          ok: true,
          explain: "Dù có vội cũng không kịp → phán đoán phủ định → đúng.",
        },
      ],
    },
    {
      id: "ba-de",
      pattern: "〜ば〜で／〜たら〜たで",
      variants: ["〜なら〜で"],
      meaning: "Nếu… thì cũng (có cái khó/cái được riêng)",
      nuance:
        "Lặp lại cùng một từ: dù tình trạng là thế này thì cũng có vấn đề riêng (ví dụ: rộng thì tốt nhưng rộng thì dọn mệt), hoặc ngược lại: không có thì cũng chẳng sao, có cách khác.",
      forms: ["Vば + Vた + で", "Vたら + Vた + で", "Aければ + Aい + で", "Aななら + Aな + で"],
      position: {
        before: "Tình trạng (lặp lại cùng một từ)",
        after: "Vấn đề mới phát sinh — hoặc \"cũng chẳng sao\"",
      },
      register: "Văn nói · đời thường",
      usage: [
        "Dùng cùng một từ ở hai vị trí.",
        "Hai hướng: (1) có thì có cái phiền riêng; (2) không có thì cũng xoay xở được.",
      ],
      examples: [
        {
          jp: "家は広いほうがいいが、広けれ[[ば広いで]]、掃除が大変だろう。",
          vi: "Nhà rộng thì tốt, nhưng rộng thì lại vất vả dọn dẹp.",
        },
        {
          jp: "食材がなかっ[[たらなかったで]]、簡単な料理で済ませましょう。",
          vi: "Không có nguyên liệu thì thôi, làm món đơn giản cho xong.",
        },
        {
          jp: "お金はなければ困るが、あれ[[ばあるで]]、悩みが増える。",
          vi: "Không có tiền thì khổ, nhưng có tiền thì lại thêm nỗi lo.",
        },
      ],
      dos: ["Nhận xét \"cái gì cũng có hai mặt\"; khuyên \"không có thì thôi, có cách khác\"."],
      donts: [
        {
          text: "Dùng hai từ khác nhau → sai cấu trúc.",
          bad: "広ければ大きいで、掃除が大変だ。",
          good: "広ければ広いで、掃除が大変だ。",
        },
      ],
      compare: [
        {
          other: "〜ば〜ほど (N3)",
          diff: "ば〜ほど: \"càng… càng…\". ば〜で: \"nếu… thì cũng có vấn đề riêng / cũng không sao\".",
        },
      ],
      memo: "Lặp từ như tấm gương 🪞: 広ければ広いで — mặt nào cũng có chuyện. Chị Satō: 時間がなければないで、できることをやればいい.",
      storyLine: "時間がなけれ[[ばないで]]、できることだけやればいいの。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "子供は、いなければ寂しいし、いれ＿＿＿うるさい。",
          opts: ["ばいるで", "ばいたで", "たらいるで", "ばいても"],
          answer: 0,
          explain: "Vば + V辞書形/た + で: いれば + いる + で.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "休みが長ければ長いで、何をしたらいいか困る。",
          opts: [
            "Kỳ nghỉ dài thì lại khó nghĩ không biết làm gì.",
            "Kỳ nghỉ càng dài càng vui.",
            "Vì kỳ nghỉ ngắn nên không biết làm gì.",
            "Kỳ nghỉ dài hay ngắn cũng không quan trọng.",
          ],
          answer: 0,
          explain: "ば〜で: có điều đó thì lại phát sinh vấn đề riêng.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Vế sau", "Ghi nhớ"],
    rows: [
      ["〜（よ）うと", "Dù có… đi nữa", "Quyết tâm không đổi", "たとえ・どんなに"],
      ["〜（よ）うと〜まいと", "Dù có hay không", "Không ảnh hưởng", "Cùng động từ"],
      ["〜であれ", "Dù là N gì", "Nguyên tắc chung", "誰・何・どんな"],
      ["〜たところで", "Có làm cũng vô ích", "Phủ định", "いくら・今さら"],
      ["〜ば〜で", "Nếu… thì cũng có cái riêng", "Vấn đề mới / không sao", "Lặp cùng từ"],
    ],
  },
  links: [
    "Ôn N4–N2: 〜ても, 〜にしても, 〜としても. N1 thêm sắc thái mạnh (ようと), có/không (ようとまいと), vô ích (たところで).",
    "Thể ý chí (う・よう) xuất hiện trong: ようと, ようとまいと, ようにも〜ない (Chương 13). Hãy ôn chia thể ý chí thật chắc.",
    "まい (phủ định cổ) gặp lại ở 〜まじき (Chương 13) và ではあるまいし (Chương 12).",
    "であれ: cặp (Chương 4) và đơn (Chương 10) — cùng gốc である.",
  ],
  hook: "Bản đề xuất của Mai: dù bị phản đối vẫn nộp (ようと) · được chọn hay không cũng có ý nghĩa (ようとまいと) · đề xuất gì cũng phải có số liệu (であれ) · giờ sửa cũng không kịp (たところで) · không có thời gian thì làm được gì làm (ば〜で).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜ようと", "Dù có… đi nữa (quyết tâm)"],
        ["〜ようと〜まいと", "Dù có hay không"],
        ["〜であれ", "Dù là (N) gì đi nữa"],
        ["〜たところで", "Có làm cũng vô ích"],
        ["〜ば〜で", "Có thì cũng có cái phiền riêng"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "今になって謝っ＿＿＿、彼女はもう戻ってこない。",
      opts: ["たところで", "ようと", "であれ", "たらたで"],
      answer: 0,
      explain: "Giờ có xin lỗi cũng vô ích → たところで.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "親が反対し＿＿＿、私は彼と結婚する。",
      opts: ["ようと", "たところで", "であれ", "ばしたで"],
      answer: 0,
      explain: "Dù bố mẹ phản đối, tôi vẫn kết hôn — quyết tâm → ようと.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "車は便利だが、持っていれば持っている＿＿＿、維持費がかかる。",
      opts: ["で", "と", "が", "も"],
      answer: 0,
      explain: "ば〜で: 持っていれば持っているで (có thì lại tốn tiền duy trì).",
    },
    {
      type: "order",
      before: "",
      pieces: ["信じよう", "と", "信じまいと", "それは"],
      after: "本当の話だ。",
      star: 3,
      vi: "Dù bạn có tin hay không, đó là chuyện thật.",
      explain: "信じようと信じまいと、それは本当の話だ.",
    },
    {
      type: "judge",
      q: "どんなに練習したところで、彼に勝てるようになった。",
      ok: false,
      explain: "たところで cần vế sau phủ định (vô ích). Câu này kết quả tích cực.",
      fix: "どんなに練習したところで、彼には勝てないだろう。",
    },
  ],
};
