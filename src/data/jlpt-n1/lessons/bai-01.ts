import type { N1Lesson } from "../types";

export const bai01: N1Lesson = {
  id: "bai-01",
  num: 1,
  topicJa: "時間関係",
  topicVi: "Quan hệ thời gian",
  chapterJa: "東京の最初の日",
  chapterVi: "Ngày đầu tiên ở Tokyo",
  scene:
    "Tháng Tư, hoa anh đào vừa nở. Mai hạ cánh xuống Narita, bắt đầu công việc ở công ty さくら商事. Một ngày mà mọi thứ xảy ra \"vừa… là ngay lập tức…\" — đúng chủ đề của chương này: các mẫu nói về thời gian.",
  story: [
    {
      jp: "四月一日。マイは成田空港に着く[[が早いか]]、スマホを取り出して母に電話をかけた。「無事に着いたよ！」",
      vi: "Ngày 1 tháng 4. Mai vừa đặt chân tới sân bay Narita là lập tức rút điện thoại gọi cho mẹ: \"Con tới nơi an toàn rồi!\"",
    },
    {
      jp: "会社のドアを開ける[[や否や]]、「マイさん、ようこそ！」という明るい声が聞こえてきた。声の主は、教育係の佐藤先輩だった。",
      vi: "Vừa mở cửa công ty, Mai đã nghe một giọng nói rộn ràng: \"Chào mừng em, Mai!\". Chủ nhân giọng nói là chị Satō — người phụ trách hướng dẫn.",
    },
    {
      jp: "そこへ同期の健太が飛び込んできた。健太は席に座る[[なり]]、「腹減った！」と叫んで、おにぎりを食べ始めた。マイは目を丸くした。",
      vi: "Đúng lúc ấy Kenta, đồng nghiệp cùng đợt, lao vào. Kenta vừa ngồi xuống ghế đã hét \"Đói quá!\" rồi ngấu nghiến cơm nắm. Mai tròn mắt.",
    },
    {
      jp: "最初の仕事はメールの整理だった。ところが、返事を書く[[そばから]]、新しいメールが次々に届く。「これじゃ終わらない…」とマイはため息をついた。",
      vi: "Việc đầu tiên là xử lý email. Thế nhưng cứ trả lời xong thư này thì thư mới lại liên tiếp tới. \"Thế này thì bao giờ mới xong…\" — Mai thở dài.",
    },
    {
      jp: "夕方、田中部長が全員の前で話した。「この不況[[にあって]]、わが社が成長を続けられるのは、社員一人一人の努力のおかげだ。」マイは思わず背筋を伸ばした。",
      vi: "Chiều tối, trưởng phòng Tanaka phát biểu trước mọi người: \"Giữa thời buổi suy thoái này mà công ty ta vẫn tiếp tục tăng trưởng được là nhờ nỗ lực của từng người.\" Mai bất giác ngồi thẳng lưng.",
    },
    {
      jp: "あれから三か月。東京に来て[[からというもの]]、マイの毎日は驚きの連続だ。でも、不思議と嫌ではない。窓の外では、東京タワーが静かに光っていた。",
      vi: "Ba tháng trôi qua. Kể từ khi tới Tokyo, mỗi ngày của Mai là một chuỗi bất ngờ. Nhưng lạ thay, cô không hề thấy khó chịu. Ngoài cửa sổ, tháp Tokyo lặng lẽ toả sáng.",
    },
  ],
  patterns: [
    {
      id: "ga-hayaika",
      pattern: "〜が早いか",
      meaning: "Vừa… là ngay lập tức…",
      nuance:
        "Hành động A vừa xảy ra (thậm chí chưa kịp xong) thì hành động B đã diễn ra. Nhấn mạnh phản ứng NHANH đến mức đáng ngạc nhiên của một người. Thường dùng để kể lại sự việc đã xảy ra của người khác.",
      forms: ["V辞書形 + が早いか", "(ít gặp) Vた形 + が早いか"],
      position: {
        before: "Hành động A diễn ra trong khoảnh khắc (着く・開ける・鳴る…)",
        after: "Hành động B xảy ra ngay — thường ở thể quá khứ",
        note: "Đứng giữa câu, nối hai vế. Thường cùng một chủ ngữ.",
      },
      register: "Văn viết · văn kể chuyện",
      usage: [
        "Vế sau thường ở thể quá khứ: kể lại sự việc thực tế đã xảy ra.",
        "Vế sau KHÔNG phải ý chí, mệnh lệnh, rủ rê, nhờ vả (〜よう, 〜てください).",
        "Động từ ở vế A là hành động tức thời, không kéo dài.",
      ],
      examples: [
        {
          jp: "山田さんは空港に着く[[が早いか]]、コンビニに駆け込んだ。",
          vi: "Anh Yamada vừa tới sân bay là chạy ngay vào cửa hàng tiện lợi.",
        },
        {
          jp: "寝坊した夫は、朝ご飯を口に押し込む[[が早いか]]、玄関を出て行った。",
          vi: "Ông chồng ngủ dậy muộn, vừa nhét bữa sáng vào miệng là lao ra khỏi cửa.",
          note: "Hành động B (ra khỏi cửa) xảy ra khi A còn chưa xong hẳn.",
        },
        {
          jp: "ベルが鳴る[[が早いか]]、生徒たちは教室を飛び出した。",
          vi: "Chuông vừa reo là đám học sinh ùa ra khỏi lớp.",
        },
      ],
      dos: [
        "Kể lại phản ứng rất nhanh của ai đó (ngôi thứ ba) trong quá khứ.",
        "Văn miêu tả, tiểu thuyết, bài kể chuyện — muốn câu văn có nhịp nhanh, sinh động.",
      ],
      donts: [
        {
          text: "Vế sau là nhờ vả / mệnh lệnh / ý chí → không dùng.",
          bad: "家に着くが早いか、電話してください。",
          good: "家に着いたらすぐ電話してください。",
        },
        {
          text: "Vế A là hành động kéo dài (読む・勉強する…) → không tự nhiên.",
          bad: "本を読むが早いか、寝てしまった。",
          good: "本を読み終わるが早いか、寝てしまった。",
        },
      ],
      compare: [
        {
          other: "〜たとたん（に）(N2)",
          diff: "たとたん: B là việc BẤT NGỜ xảy ra, thường ngoài ý muốn (không phải hành động có chủ ý). が早いか: B là hành động của chủ thể, nhấn mạnh tốc độ.",
          ex: { jp: "ドアを開けた[[とたん]]、猫が飛び出してきた。", vi: "Vừa mở cửa thì con mèo lao vụt ra (bất ngờ)." },
        },
        {
          other: "〜や否や",
          diff: "Gần nghĩa nhất. や否や trang trọng hơn và B có thể là hiện tượng (tiếng động, tin tức…), không nhất thiết là hành động của chủ thể.",
        },
      ],
      memo: "早い = NHANH. Hình dung tiếng súng xuất phát 🏁: A vừa \"đoàng\" là B đã chạy — nhanh hơn cả lúc bạn kịp nói chữ \"が\".",
      storyLine: "マイは成田空港に着く[[が早いか]]、スマホを取り出して母に電話をかけた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "彼女は電話を切る＿＿＿、部屋を飛び出していった。",
          opts: ["が早いか", "からには", "うちに", "ついでに"],
          answer: 0,
          explain: "Cúp máy → lập tức lao ra khỏi phòng: hành động B xảy ra ngay sau A, kể lại trong quá khứ → が早いか.",
        },
        {
          type: "judge",
          q: "駅に着くが早いか、私に電話してください。",
          ok: false,
          explain: "Vế sau là lời nhờ vả (〜てください) nên không dùng が早いか.",
          fix: "駅に着いたらすぐ、私に電話してください。",
        },
      ],
    },
    {
      id: "ya-inaya",
      pattern: "〜や否や",
      variants: ["〜や"],
      meaning: "Ngay khi… thì… (gần như đồng thời)",
      nuance:
        "A vừa xảy ra thì B diễn ra gần như cùng lúc. B thường là sự việc người nói chứng kiến — có thể là hành động của người khác hoặc một hiện tượng. Sắc thái trang trọng, văn chương.",
      forms: ["V辞書形 + や否や", "V辞書形 + や"],
      position: {
        before: "Sự việc A (始まる・見る・発表される…)",
        after: "Sự việc B xảy ra ngay — thường thể quá khứ",
        note: "Không phân biệt chủ ngữ: A và B có thể khác chủ thể.",
      },
      register: "Văn viết · trang trọng",
      usage: [
        "Vế sau là sự việc đã xảy ra (quá khứ), không phải ý chí/nguyện vọng của người nói.",
        "Dạng rút gọn 〜や còn văn chương hơn.",
      ],
      examples: [
        {
          jp: "私はその人の顔を一目見る[[や]]、三十年前に別れた恋人だと気が付いた。",
          vi: "Vừa thoáng nhìn gương mặt người ấy, tôi đã nhận ra đó là người yêu chia tay ba mươi năm trước.",
        },
        {
          jp: "選挙戦が始まる[[や否や]]、あちこちからにぎやかな声が聞こえてきた。",
          vi: "Chiến dịch tranh cử vừa bắt đầu là khắp nơi đã vang lên tiếng ồn ào náo nhiệt.",
        },
        {
          jp: "新商品が発売される[[や否や]]、あっという間に売り切れた。",
          vi: "Sản phẩm mới vừa được tung ra là bán hết sạch trong chớp mắt.",
        },
      ],
      dos: [
        "Văn viết, tin tức, kể chuyện trang trọng.",
        "Khi B là phản ứng của xã hội / hiện tượng xảy ra ngay sau A (bán hết, tiếng ồn, điện thoại reo…).",
      ],
      donts: [
        {
          text: "Vế sau là rủ rê / ý chí → không dùng.",
          bad: "授業が終わるや否や、一緒に帰ろう。",
          good: "授業が終わったらすぐ、一緒に帰ろう。",
        },
      ],
      compare: [
        {
          other: "〜が早いか",
          diff: "が早いか nhấn mạnh tốc độ của CHỦ THỂ hành động; や否や rộng hơn, B có thể là hiện tượng, khác chủ ngữ.",
        },
        {
          other: "〜次第 (N2)",
          diff: "次第 dùng được cho yêu cầu/ý chí trong tương lai (分かり次第ご連絡します). や否や thì chỉ kể sự việc đã xảy ra.",
          ex: { jp: "結果が分かり[[次第]]、ご連絡します。", vi: "Ngay khi có kết quả, tôi sẽ liên lạc." },
        },
      ],
      memo: "否 = \"không\". \"Có (や) hay không (否)?\" — còn chưa kịp xác nhận A đã xảy ra hay chưa thì B đã tới rồi!",
      storyLine: "会社のドアを開ける[[や否や]]、「マイさん、ようこそ！」という明るい声が聞こえてきた。",
      quiz: [
        {
          type: "order",
          before: "ニュースが",
          pieces: ["流れる", "や否や", "問い合わせの", "電話が"],
          after: "鳴り始めた。",
          star: 2,
          vi: "Tin tức vừa phát ra là điện thoại hỏi thăm đã bắt đầu reo.",
          explain: "流れる（V辞書形）+ や否や → vế sau: 問い合わせの電話が鳴り始めた.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "彼は部屋に入るや否や、窓を開けた。",
          opts: [
            "Anh ấy vừa vào phòng là mở ngay cửa sổ.",
            "Anh ấy vào phòng hay không thì cũng mở cửa sổ.",
            "Anh ấy định vào phòng để mở cửa sổ.",
            "Anh ấy chưa vào phòng nhưng đã mở cửa sổ.",
          ],
          answer: 0,
          explain: "や否や = vừa A thì B ngay. Đừng nhầm 否 với nghĩa \"có hay không\".",
        },
      ],
    },
    {
      id: "nari",
      pattern: "〜なり",
      meaning: "Vừa… là liền (làm một việc bất ngờ)",
      nuance:
        "Ngay sau hành động A, cũng chính người đó làm luôn hành động B — mà B thường đột ngột, khác thường khiến người nói ngạc nhiên. Hai vế CÙNG chủ ngữ, thường là ngôi thứ ba.",
      forms: ["V辞書形 + なり"],
      position: {
        before: "Hành động A của người X",
        after: "Hành động B (bất ngờ) cũng của người X — thể quá khứ",
        note: "Không dùng cho chính mình và không dùng cho tương lai.",
      },
      register: "Văn viết & nói · kể chuyện",
      usage: [
        "Hai vế phải cùng chủ ngữ.",
        "Vế sau là hành động có chủ ý nhưng gây bất ngờ (hét, khóc, bỏ đi…).",
        "Không dùng cho bản thân người nói, không dùng ý chí/mệnh lệnh.",
      ],
      examples: [
        {
          jp: "彼はコーヒーを一口飲む[[なり]]、吐き出してしまった。",
          vi: "Anh ta vừa nhấp một ngụm cà phê là phun ra ngay.",
        },
        {
          jp: "課長は部屋に入ってくる[[なり]]、大声でどなった。",
          vi: "Tổ trưởng vừa bước vào phòng là quát ầm lên.",
        },
        {
          jp: "娘は私の顔を見る[[なり]]、わっと泣き出した。",
          vi: "Con gái vừa nhìn thấy mặt tôi là oà khóc.",
        },
      ],
      dos: ["Miêu tả hành động đột ngột, gây ngạc nhiên của người khác ngay sau một hành động."],
      donts: [
        {
          text: "Chủ ngữ là chính mình → không dùng.",
          bad: "私は家に帰るなり、寝た。",
          good: "私は家に帰るとすぐ、寝た。",
        },
        {
          text: "Hai vế khác chủ ngữ → không dùng.",
          bad: "私が家に着くなり、雨が降り出した。",
          good: "私が家に着いたとたん、雨が降り出した。",
        },
      ],
      compare: [
        {
          other: "〜が早いか",
          diff: "が早いか nhấn mạnh TỐC ĐỘ; なり nhấn mạnh sự BẤT NGỜ của hành động B, và bắt buộc cùng chủ ngữ.",
        },
        {
          other: "〜なり…〜なり (Chương 4) · 〜なりに (Chương 14)",
          diff: "Cùng chữ なり nhưng khác hẳn: なり…なり = \"A hay B gì cũng được\"; なりに = \"theo cách/mức của…\".",
        },
      ],
      memo: "なり ≈ \"NẢY\": vừa làm A xong là \"nảy\" ra hành động B khiến ai cũng giật mình. Như Kenta vừa ngồi xuống đã hét \"Đói quá!\".",
      storyLine: "健太は席に座る[[なり]]、「腹減った！」と叫んで、おにぎりを食べ始めた。",
      quiz: [
        {
          type: "choice",
          label: "Chọn câu dùng đúng",
          q: "「〜なり」の使い方が正しい文はどれか。",
          opts: [
            "部長は会議室に入るなり、資料を投げつけた。",
            "私はご飯を食べるなり、歯を磨きます。",
            "駅に着くなり、電話してください。",
            "彼が出かけるなり、雨が降ってきた。",
          ],
          answer: 0,
          explain: "Câu 1 cùng chủ ngữ (部長), hành động bất ngờ, quá khứ. Câu 2: chủ ngữ là mình + thói quen. Câu 3: nhờ vả. Câu 4: khác chủ ngữ.",
        },
        {
          type: "judge",
          q: "子供は母親の顔を見るなり、泣き出した。",
          ok: true,
          explain: "Cùng chủ ngữ (子供), hành động bất ngờ (泣き出す), kể chuyện đã xảy ra → đúng.",
        },
      ],
    },
    {
      id: "sobakara",
      pattern: "〜そばから",
      meaning: "Vừa… xong thì lại… (cứ lặp đi lặp lại)",
      nuance:
        "Vừa làm xong A thì ngay lập tức B xảy ra như phá hỏng A, và chuyện đó lặp đi lặp lại nhiều lần. Thường dùng cho việc không mong muốn, gây bực mình hoặc bất lực.",
      forms: ["V辞書形 + そばから", "Vた形 + そばから"],
      position: {
        before: "Việc A (làm đi làm lại: 片付ける・書く・覚える…)",
        after: "Việc B phá hỏng A, cũng lặp lại",
        note: "Thường đi với 次々に, また, すぐ.",
      },
      register: "Văn nói & viết",
      usage: [
        "Diễn tả sự lặp lại nhiều lần, không phải sự việc xảy ra một lần.",
        "Thường mang sắc thái than phiền, bất lực.",
      ],
      examples: [
        {
          jp: "毎日返事を書く[[そばから]]、次々に新しいメールが来る。",
          vi: "Ngày nào cũng vậy, vừa viết thư trả lời xong là thư mới lại tới liên tiếp.",
        },
        {
          jp: "このテキストは漢字が多くて大変だ。調べた[[そばから]]新しい漢字が出てくる。",
          vi: "Giáo trình này nhiều kanji quá. Vừa tra xong chữ này là lại hiện ra chữ mới.",
        },
        {
          jp: "子供はおもちゃを片付ける[[そばから]]、また散らかしてしまう。",
          vi: "Vừa dọn đồ chơi xong là bọn trẻ lại bày bừa ra.",
        },
      ],
      dos: ["Than phiền về một vòng lặp: làm xong lại hỏng, học xong lại quên, dọn xong lại bừa."],
      donts: [
        {
          text: "Sự việc chỉ xảy ra một lần → không dùng.",
          bad: "家を出たそばから、雨が降り出した。",
          good: "家を出たとたん、雨が降り出した。",
        },
      ],
      compare: [
        {
          other: "〜たとたん",
          diff: "たとたん: chuyện xảy ra MỘT lần, bất ngờ. そばから: LẶP ĐI LẶP LẠI.",
        },
        {
          other: "〜かと思うと／〜かと思ったら (N2)",
          diff: "かと思うと: hai việc trái ngược nối nhau (vừa khóc đã cười) — không mang nghĩa lặp lại để phá hỏng.",
        },
      ],
      memo: "そば = \"bên cạnh\": việc vừa làm còn nằm ngay bên cạnh thì đã bị phá. Như dọn đồ chơi — dọn bên này, bé bày bên kia, mãi không hết! (Tài liệu gốc in nhầm thành \"そばなら\".)",
      storyLine: "返事を書く[[そばから]]、新しいメールが次々に届く。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "単語を覚える＿＿＿忘れてしまうので、なかなか語彙が増えない。",
          opts: ["そばから", "なり", "や否や", "が早いか"],
          answer: 0,
          explain: "Học thuộc xong lại quên — vòng lặp không mong muốn → そばから.",
        },
        {
          type: "judge",
          q: "駅に着いたそばから、電車が来た。",
          ok: false,
          explain: "Chỉ xảy ra một lần và cũng không phải chuyện \"phá hỏng\" A → dùng とたん hoặc と.",
          fix: "駅に着いたとたん、電車が来た。",
        },
      ],
    },
    {
      id: "tekara-toiumono",
      pattern: "〜てからというもの（は）",
      meaning: "Kể từ khi… thì (thay đổi hẳn và cứ thế kéo dài)",
      nuance:
        "Sau một mốc quan trọng A, trạng thái hay cuộc sống thay đổi hẳn và tiếp diễn liên tục cho đến bây giờ. Mang cảm xúc của người nói về sự thay đổi lớn ấy.",
      forms: ["Vて形 + からというもの（は）"],
      position: {
        before: "Mốc thay đổi A (vào đại học, sinh con, đến Nhật…)",
        after: "Trạng thái mới kéo dài liên tục",
        note: "Vế sau là TRẠNG THÁI kéo dài, không phải một hành động đơn lẻ.",
      },
      register: "Văn viết · hơi cảm xúc",
      usage: [
        "Mốc A không quá gần hiện tại (không dùng cho \"hôm qua\").",
        "Không dùng để nói chuyện thường ngày lặp lại, mà về một biến cố cụ thể.",
      ],
      examples: [
        {
          jp: "娘が大学に入り家を出て行って[[からというもの]]、家の中は寂しくなった。",
          vi: "Kể từ khi con gái vào đại học và rời nhà, trong nhà trở nên vắng lặng hẳn.",
        },
        {
          jp: "子供が生まれて[[からというもの]]、おもちゃ屋の前で足が止まるようになった。",
          vi: "Từ khi có con, đi qua cửa hàng đồ chơi là tôi lại dừng chân.",
        },
        {
          jp: "犬を飼い始めて[[からというもの]]、毎朝散歩するのが習慣になった。",
          vi: "Từ ngày bắt đầu nuôi chó, đi dạo mỗi sáng đã thành thói quen.",
        },
      ],
      dos: ["Kể về một bước ngoặt trong đời và cuộc sống mới kéo dài sau đó."],
      donts: [
        {
          text: "Vế sau là một hành động xảy ra một lần → không dùng.",
          bad: "日本に来てからというもの、富士山に登った。",
          good: "日本に来てから、富士山に登った。",
        },
        {
          text: "Mốc quá gần → không tự nhiên.",
          bad: "昨日入社してからというもの、ずっと忙しい。",
          good: "入社してからというもの、休む暇もないほど忙しい。",
        },
      ],
      compare: [
        {
          other: "〜て以来 (N2)",
          diff: "て以来: trung tính, nêu sự thật \"từ đó đến nay\". てからというもの: nhấn mạnh sự THAY ĐỔI LỚN và cảm xúc của người nói.",
          ex: { jp: "卒業して[[以来]]、彼に会っていない。", vi: "Từ khi tốt nghiệp đến nay tôi chưa gặp anh ấy." },
        },
      ],
      memo: "というもの = \"cả quãng thời gian ấy\" → mốc A mở ra một CHƯƠNG MỚI của cuộc đời. Như Mai: từ khi đến Tokyo, mỗi ngày đều là bất ngờ.",
      storyLine: "東京に来て[[からというもの]]、マイの毎日は驚きの連続だ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "禁煙して＿＿＿、食事がおいしく感じられるようになった。",
          opts: ["からというもの", "からでないと", "からには", "からして"],
          answer: 0,
          explain: "Từ khi bỏ thuốc → trạng thái mới kéo dài (thấy đồ ăn ngon hơn) → てからというもの.",
        },
        {
          type: "judge",
          q: "日本に来てからというもの、一度だけ京都へ行った。",
          ok: false,
          explain: "\"Đi Kyoto một lần\" là hành động đơn lẻ, không phải trạng thái kéo dài.",
          fix: "日本に来てから、一度だけ京都へ行った。",
        },
      ],
    },
    {
      id: "niatte",
      pattern: "〜にあって",
      variants: ["〜にあっても"],
      meaning: "Ở trong (hoàn cảnh đặc biệt)… / Dù ở trong… vẫn…",
      nuance:
        "N là một hoàn cảnh, thời kỳ, vị trí ĐẶC BIỆT. 〜にあって: chính vì ở hoàn cảnh ấy nên mới có B. 〜にあっても: dù ở hoàn cảnh ấy, B vẫn trái ngược với điều dự đoán.",
      forms: ["N + にあって", "N + にあっても"],
      position: {
        before: "Danh từ chỉ hoàn cảnh/thời kỳ/địa vị đặc biệt (不況・戦時中・社長という立場…)",
        after: "Sự việc phù hợp — hoặc trái ngược (với にあっても)",
      },
      register: "Văn viết · rất trang trọng (bài phát biểu, báo chí)",
      usage: [
        "Danh từ phía trước phải mang tính \"đặc biệt\"; không dùng cho địa điểm bình thường.",
        "にあっても = dù ở trong… (nghịch tiếp).",
      ],
      examples: [
        {
          jp: "らくだは乾燥地[[にあって]]、こぶに栄養を蓄えることで生き延びている。",
          vi: "Ở vùng đất khô hạn, lạc đà sống sót được nhờ tích trữ dinh dưỡng trong bướu.",
        },
        {
          jp: "最近の不況下[[にあっても]]、この会社の製品は売れ行きが落ちていない。",
          vi: "Dù giữa thời kỳ suy thoái gần đây, sản phẩm của công ty này vẫn không giảm doanh số.",
        },
        {
          jp: "社長という立場[[にあって]]、軽率な発言は許されない。",
          vi: "Ở cương vị giám đốc thì không được phép phát ngôn khinh suất.",
        },
      ],
      dos: ["Bài phát biểu, báo chí: nói về thời đại, hoàn cảnh khắc nghiệt, cương vị quan trọng."],
      donts: [
        {
          text: "Địa điểm/tình huống bình thường → không dùng.",
          bad: "私は今、駅にあって、電車を待っている。",
          good: "私は今、駅で電車を待っている。",
        },
      ],
      compare: [
        {
          other: "〜において (N2)",
          diff: "において: trung tính, chỉ nơi chốn/phạm vi (会議において). にあって: hoàn cảnh ĐẶC BIỆT và kèm đánh giá của người nói.",
          ex: { jp: "式は大ホール[[において]]行われる。", vi: "Buổi lễ được tổ chức tại hội trường lớn." },
        },
      ],
      memo: "ある = \"đang ở\". にあって = \"đang ở GIỮA\" một hoàn cảnh nặng ký — như hoa sen giữa bùn: chính ở đó mới thấy giá trị.",
      storyLine: "この不況[[にあって]]、わが社が成長を続けられるのは、社員一人一人の努力のおかげだ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "物があふれる現代＿＿＿、本当の豊かさとは何かを考えたい。",
          opts: ["にあって", "そばから", "なり", "が早いか"],
          answer: 0,
          explain: "現代 (thời đại hiện nay) là bối cảnh đặc biệt, văn trang trọng → にあって.",
        },
        {
          type: "order",
          before: "この厳しい",
          pieces: ["時代", "にあって", "新しい", "挑戦を"],
          after: "続ける企業は少ない。",
          star: 2,
          vi: "Giữa thời đại khắc nghiệt này, ít doanh nghiệp tiếp tục thử thách mới.",
          explain: "厳しい時代 + にあって → 新しい挑戦を続ける企業.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Vế sau", "Lưu ý"],
    rows: [
      ["〜が早いか", "Vừa A là B ngay (tốc độ)", "Quá khứ, không ý chí", "Văn kể chuyện"],
      ["〜や否や", "Vừa A thì B (gần như đồng thời)", "Quá khứ, có thể là hiện tượng", "Trang trọng, khác chủ ngữ được"],
      ["〜なり", "Vừa A là làm B (bất ngờ)", "Hành động bất ngờ", "Cùng chủ ngữ, không dùng cho mình"],
      ["〜そばから", "Vừa A xong B lại phá", "Lặp đi lặp lại", "Than phiền"],
      ["〜てからというもの", "Kể từ A, thay đổi hẳn", "Trạng thái kéo dài", "Mốc không quá gần"],
      ["〜にあって", "Ở trong hoàn cảnh đặc biệt", "Phù hợp / trái ngược (ても)", "Rất trang trọng"],
    ],
  },
  links: [
    "Ôn N2: 〜たとたん, 〜次第, 〜かと思うと cũng là \"vừa… thì…\". N1 thêm sắc thái văn viết, tốc độ và bất ngờ.",
    "Bộ ba が早いか・や否や・なり đều KHÔNG dùng vế sau là ý chí / nhờ vả. Muốn nhờ vả → dùng 〜次第 hoặc 〜たらすぐ: 着き次第ご連絡ください.",
    "Chữ なり sẽ gặp lại ở Chương 4 (なり…なり: liệt kê lựa chọn) và Chương 14 (なりに: theo cách của…). Đánh dấu ngay để không nhầm!",
    "にあって thuộc \"họ trợ từ ghép văn viết\" cùng 〜をもって (Chương 2, 11), 〜において, 〜に際して.",
  ],
  hook: "Ba anh em \"vừa… là…\": が早いか (nhanh như chớp) · や否や (trang trọng) · なり (bất ngờ, cùng người). Một kẻ \"lặp lại hoài\": そばから. Một \"chương mới\": てからというもの. Và một \"hoàn cảnh đặc biệt\": にあって.",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜が早いか", "Vừa A là B ngay — nhấn mạnh tốc độ"],
        ["〜なり", "Vừa A là làm B bất ngờ (cùng người)"],
        ["〜そばから", "Vừa làm xong lại bị phá — lặp lại"],
        ["〜てからというもの", "Kể từ A, cuộc sống thay đổi hẳn"],
        ["〜にあって", "Ở trong hoàn cảnh đặc biệt"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "部長は会議室に入ってくる＿＿＿、「全員集合！」と叫んだ。",
      opts: ["なり", "そばから", "からというもの", "にあって"],
      answer: 0,
      explain: "Cùng chủ ngữ (部長), hành động bất ngờ ngay sau khi vào phòng → なり.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "掃除する＿＿＿、子供たちが部屋を汚していく。",
      opts: ["そばから", "や否や", "が早いか", "なり"],
      answer: 0,
      explain: "Dọn xong lại bị bẩn, lặp đi lặp lại → そばから.",
    },
    {
      type: "choice",
      label: "Chọn nghĩa đúng",
      q: "彼は手紙を読むなり、泣き出した。",
      opts: [
        "Anh ấy vừa đọc thư là bật khóc.",
        "Anh ấy vừa đọc thư vừa khóc.",
        "Anh ấy đọc thư theo cách của mình rồi khóc.",
        "Anh ấy đọc thư hay không thì cũng khóc.",
      ],
      answer: 0,
      explain: "なり (sau V辞書形) = vừa A là B bất ngờ. \"Vừa… vừa…\" là ながら; \"theo cách của\" là なりに.",
    },
    {
      type: "judge",
      q: "結果が分かるや否や、ご連絡いたします。",
      ok: false,
      explain: "Vế sau là ý chí của người nói (sẽ liên lạc) → dùng 〜次第.",
      fix: "結果が分かり次第、ご連絡いたします。",
    },
    {
      type: "order",
      before: "息子は",
      pieces: ["家に", "帰って", "くる", "が早いか"],
      after: "冷蔵庫を開けた。",
      star: 3,
      vi: "Con trai tôi vừa về đến nhà là mở ngay tủ lạnh.",
      explain: "家に帰ってくる（V辞書形）+ が早いか → 冷蔵庫を開けた.",
    },
    {
      type: "choice",
      label: "Chọn cách dùng phù hợp",
      q: "戦時下という困難な状況＿＿＿、彼は研究を続けた。",
      opts: ["にあっても", "そばから", "なり", "からというもの"],
      answer: 0,
      explain: "Hoàn cảnh đặc biệt (thời chiến) + vế sau trái với dự đoán (vẫn nghiên cứu) → にあっても.",
    },
    {
      type: "judge",
      q: "彼女と付き合い始めてからというもの、彼は毎日楽しそうだ。",
      ok: true,
      explain: "Mốc thay đổi (bắt đầu hẹn hò) → trạng thái kéo dài (ngày nào cũng vui) → đúng.",
    },
  ],
};
