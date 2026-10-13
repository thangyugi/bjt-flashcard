import type { N1Lesson } from "../types";

export const bai17: N1Lesson = {
  id: "bai-17",
  num: 17,
  topicJa: "強調",
  topicVi: "Nhấn mạnh",
  chapterJa: "発売の日",
  chapterVi: "Ngày ra mắt",
  scene:
    "Tháng Ba. Nhờ bà Yamamoto giới thiệu một người bạn cũ trồng trà ở Shizuoka, sản phẩm kịp ra mắt. Ngày đầu tiên vượt mọi dự đoán. Chương này học 6 cách NHẤN MẠNH: \"dù chỉ một…\", \"ngay cả…\", \"đến tận…\".",
  story: [
    {
      jp: "山本さんが紹介してくれた静岡の茶農家・木村さんは、八十歳[[にして]]なお現役で畑に立つ人だった。「いいお茶を作るには、一日[[たりとも]]畑を休ませるわけにはいかんよ。」",
      vi: "Ông Kimura — người trồng trà ở Shizuoka mà bà Yamamoto giới thiệu — đã 80 tuổi mà vẫn còn ra đồng. \"Muốn làm ra trà ngon thì dù chỉ một ngày cũng không được để ruộng nghỉ đâu.\"",
    },
    {
      jp: "発売初日。店の前には、開店前から千人[[からの]]客が列を作った。",
      vi: "Ngày đầu ra mắt. Trước cửa hàng, từ trước giờ mở cửa đã có tới hơn một nghìn khách xếp hàng.",
    },
    {
      jp: "この売れ行きは、市場の専門家[[ですら]]予想していなかったという。",
      vi: "Nghe nói đến cả các chuyên gia thị trường cũng không dự đoán được doanh số này.",
    },
    {
      jp: "マイは行列を見つめながら思った。一年前、ベトナムを出るときには、自分の企画が商品になるなんて、夢[[にだに]]思わなかった。",
      vi: "Nhìn hàng người dài, Mai nghĩ: một năm trước khi rời Việt Nam, cô chưa từng dám nghĩ đến, dù chỉ trong mơ, rằng ý tưởng của mình sẽ trở thành sản phẩm.",
    },
    {
      jp: "取材に来た記者に、マイははっきり答えた。「商品は、お客様[[あっての]]ものです。そして、支えてくれた仲間がいたからこそです。」",
      vi: "Trả lời phóng viên đến phỏng vấn, Mai nói rõ ràng: \"Sản phẩm là nhờ có khách hàng mới tồn tại. Và cũng là nhờ có những người đồng đội đã nâng đỡ tôi.\"",
    },
  ],
  patterns: [
    {
      id: "taritomo",
      pattern: "〜たりとも〜ない",
      meaning: "Dù chỉ một… cũng không…",
      nuance:
        "Đưa ra đơn vị NHỎ NHẤT (thường là \"1\") để nhấn mạnh: hoàn toàn không có / tuyệt đối không được. Vế sau phủ định hoặc cấm đoán.",
      forms: ["1 + đơn vị（一日・一円・一秒・一人）+ たりとも〜ない", "何人+ たりとも"],
      position: {
        before: "Đơn vị nhỏ nhất: 一日・一円・一瞬・一人",
        after: "Phủ định / cấm: 〜ない・〜てはならない・許されない",
      },
      register: "Văn viết · nhấn mạnh mạnh",
      usage: [
        "Không dùng với đơn vị lớn (一年, 一トン).",
        "何人たりとも = bất kỳ ai cũng không.",
      ],
      examples: [
        {
          jp: "あなたのことは一日[[たりとも]]忘れたことはありません。",
          vi: "Chuyện về em, dù chỉ một ngày anh cũng chưa từng quên.",
        },
        {
          jp: "何人[[たりとも]]この神聖な場所に立ち入ることは許されない。",
          vi: "Bất kỳ ai cũng không được phép bước vào nơi linh thiêng này.",
        },
        {
          jp: "税金は一円[[たりとも]]無駄にしてはならない。",
          vi: "Tiền thuế thì dù một yên cũng không được lãng phí.",
        },
      ],
      dos: ["Lời thề, quy định, cảm xúc mạnh: \"dù chỉ một… cũng không\"."],
      donts: [
        {
          text: "Đơn vị lớn → không dùng.",
          bad: "一年たりとも休まなかった。",
          good: "一日たりとも休まなかった。",
        },
      ],
      compare: [
        {
          other: "〜も〜ない (N4)",
          diff: "一人も来なかった: trung tính. 一人たりとも: nhấn mạnh hơn nhiều, văn viết.",
        },
        {
          other: "〜すら／〜さえ",
          diff: "すら: ví dụ cực đoan bất kỳ. たりとも: chỉ dùng với đơn vị nhỏ nhất \"1\".",
        },
      ],
      memo: "たり (= である) + とも (dù) → \"dù LÀ một thôi\" ☝️. Ông Kimura: 一日たりとも畑を休ませるわけにはいかん.",
      storyLine: "一日[[たりとも]]畑を休ませるわけにはいかんよ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "試験中は、一瞬＿＿＿気を抜いてはいけない。",
          opts: ["たりとも", "からの", "あっての", "にして"],
          answer: 0,
          explain: "Đơn vị nhỏ nhất (一瞬) + cấm → たりとも.",
        },
        {
          type: "judge",
          q: "この十年たりとも、彼は一度も故郷に帰らなかった。",
          ok: false,
          explain: "十年 là đơn vị lớn → không dùng たりとも.",
          fix: "彼は一日たりとも故郷を忘れたことはなかった。",
        },
      ],
    },
    {
      id: "sura",
      pattern: "〜すら",
      variants: ["〜ですら"],
      meaning: "Ngay cả… (cũng)",
      nuance:
        "Nêu ví dụ cực đoan: đến cả cái này còn như vậy thì những cái khác đương nhiên cũng vậy. Văn viết của さえ. ですら dùng sau danh từ chỉ người/chủ ngữ.",
      forms: ["N（+ trợ từ）+ すら", "N + ですら"],
      position: {
        before: "Ví dụ cực đoan (専門家・名前・水)",
        after: "Thường phủ định hoặc trạng thái bất ngờ",
      },
      register: "Văn viết",
      usage: [
        "Thay được cho さえ trong văn viết.",
        "Hay đi với ない, できない.",
      ],
      examples: [
        {
          jp: "彼のうそには、怒りだけでなく悲しみ[[すら]]覚えた。",
          vi: "Trước lời nói dối của anh ta, tôi không chỉ giận mà còn thấy cả nỗi buồn.",
        },
        {
          jp: "これは専門家[[ですら]]直すのが難しい故障だ。素人の私には手がつけられない。",
          vi: "Đây là hỏng hóc mà ngay cả chuyên gia cũng khó sửa. Kẻ nghiệp dư như tôi không động vào được.",
        },
        {
          jp: "忙しくて、食事をする時間[[すら]]ない。",
          vi: "Bận đến mức đến cả thời gian ăn cơm cũng không có.",
        },
      ],
      dos: ["Văn viết: nhấn mạnh bằng ví dụ cực đoan."],
      donts: [
        {
          text: "Dùng trong điều kiện \"chỉ cần… là đủ\" → phải dùng さえ〜ば.",
          bad: "お金すらあれば、何でも買える。",
          good: "お金さえあれば、何でも買える。",
        },
      ],
      compare: [
        {
          other: "〜さえ (N3)",
          diff: "さえ có thêm nghĩa \"chỉ cần\" (さえ〜ば). すら không có nghĩa này, văn viết hơn.",
        },
        {
          other: "〜だに",
          diff: "だに: chỉ đi với vài động từ (想像する・考える・夢にも). すら: rộng hơn.",
        },
      ],
      memo: "すら ≈ \"SỐ RA\": đến số không cũng ra… 🔎. 専門家ですら予想していなかった.",
      storyLine: "この売れ行きは、市場の専門家[[ですら]]予想していなかったという。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "このニュースは日本人＿＿＿知らない人が多い。",
          opts: ["ですら", "たりとも", "からの", "あっての"],
          answer: 0,
          explain: "Ngay cả người Nhật cũng nhiều người không biết → ですら.",
        },
        {
          type: "choice",
          label: "Phân biệt",
          q: "「〜すら」に言い換えられないのはどれか。",
          opts: [
            "時間さえあれば、もっと勉強できるのに。",
            "子供でさえ知っている。",
            "水さえ飲めなかった。",
            "名前さえ覚えていない。",
          ],
          answer: 0,
          explain: "さえ〜ば (chỉ cần… là) không thay bằng すら được.",
        },
      ],
    },
    {
      id: "dani",
      pattern: "〜だに",
      meaning: "Chỉ cần (nghĩ/nghe)… thôi đã… / dù chỉ… cũng không",
      nuance:
        "① V辞書形 + だに: chỉ mới tưởng tượng/nghe thôi đã (sợ, rùng mình…). ② N + だに + phủ định: dù chỉ… cũng không (夢にだに思わない, 微動だにしない). Chỉ đi với vài từ cố định.",
      forms: ["V辞書形（想像する・考える・聞く）+ だに", "N（夢・微動）+ (に) + だに + ない"],
      position: {
        before: "想像する・考える・聞く / 夢に・微動",
        after: "① 恐ろしい・ぞっとする ② 〜ない",
      },
      register: "Văn viết · cổ",
      usage: [
        "Cụm cố định: 想像するだに恐ろしい, 考えるだに, 聞くだに, 夢にだに思わない, 微動だにしない.",
      ],
      examples: [
        {
          jp: "病気が広まって百万人もの人が死ぬなど、想像する[[だに]]恐ろしい。",
          vi: "Dịch bệnh lan rộng làm cả triệu người chết — chỉ tưởng tượng thôi đã thấy kinh hoàng.",
        },
        {
          jp: "まさか私が歌手として舞台に立つなんて、夢に[[だに]]思わなかった。",
          vi: "Tôi đứng trên sân khấu với tư cách ca sĩ — điều đó dù trong mơ cũng chưa từng nghĩ tới.",
        },
        {
          jp: "衛兵は微動[[だに]]しなかった。",
          vi: "Người lính gác không hề nhúc nhích dù chỉ một chút.",
        },
      ],
      dos: ["Dùng đúng các cụm cố định trong văn viết."],
      donts: [
        {
          text: "Gắn với động từ tự do → sai.",
          bad: "ご飯を食べるだに、おいしい。",
          good: "このご飯は、食べるたびにおいしい。",
        },
      ],
      compare: [
        {
          other: "〜すら",
          diff: "すら dùng rộng. だに chỉ vài cụm cố định, cổ hơn.",
        },
      ],
      memo: "Nhớ 3 cụm 🌙: 想像するだに恐ろしい · 夢にだに思わない · 微動だにしない. Mai: 夢にだに思わなかった.",
      storyLine: "自分の企画が商品になるなんて、夢[[にだに]]思わなかった。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "あの事故のことは、思い出す＿＿＿体が震える。",
          opts: ["だに", "たりとも", "からの", "あっての"],
          answer: 0,
          explain: "Chỉ cần nhớ lại thôi đã run → V辞書形 + だに.",
        },
        {
          type: "judge",
          q: "彼は先生にしかられても、微動だにしなかった。",
          ok: true,
          explain: "微動だにしない = không nhúc nhích chút nào → đúng.",
        },
      ],
    },
    {
      id: "nishite",
      pattern: "〜にして",
      meaning: "Phải đến (mức/giai đoạn)… mới… / Ngay cả… cũng…",
      nuance:
        "① N (giai đoạn đặc biệt) + にして + mới… (八年目にしてようやく). ② N (người giỏi) + にして + cũng (プロにして失敗する) → huống chi người khác. ③ N + にして + N: vừa là… vừa là… (詩人にして画家).",
      forms: ["N + にして"],
      position: {
        before: "Giai đoạn / mức độ / người đặc biệt (八十歳・プロ・三度目)",
        after: "① ようやく〜 ② 〜も〜 (thì người khác càng) ③ N",
      },
      register: "Văn viết · trang trọng",
      usage: [
        "Nghĩa ① hay đi với ようやく, 初めて.",
        "Cụm: 八十歳にしてなお, 〜にしてようやく, 〜にして初めて.",
      ],
      examples: [
        {
          jp: "結婚してすぐ子供が欲しかったが、八年目[[にして]]ようやく授かった。",
          vi: "Kết hôn xong muốn có con ngay, nhưng phải đến năm thứ tám mới được trời cho.",
        },
        {
          jp: "プロの職人[[にして]]失敗するのだ。君がうまくいかなくても仕方がない。",
          vi: "Đến thợ lành nghề còn thất bại cơ mà. Cậu làm không tốt cũng phải thôi.",
        },
        {
          jp: "彼は詩人[[にして]]画家でもある。",
          vi: "Ông ấy vừa là nhà thơ vừa là họa sĩ.",
        },
      ],
      dos: ["Văn viết: nhấn mạnh mốc đặc biệt hoặc người đặc biệt."],
      donts: [
        {
          text: "Mốc bình thường, không đặc biệt → không tự nhiên.",
          bad: "朝七時にして、起きた。",
          good: "朝七時に起きた。",
        },
      ],
      compare: [
        {
          other: "〜てはじめて (N3)",
          diff: "てはじめて gắn động từ. にして gắn danh từ chỉ mốc, văn viết hơn.",
        },
        {
          other: "〜でさえ",
          diff: "Nghĩa ② của にして ≈ でさえ (ngay cả). にして trang trọng hơn.",
        },
      ],
      memo: "にして = \"ở mức N\" 🎂: 八十歳にしてなお現役 (80 tuổi mà vẫn còn làm).",
      storyLine: "八十歳[[にして]]なお現役で畑に立つ人だった。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "三度目の挑戦＿＿＿、彼はようやく司法試験に合格した。",
          opts: ["にして", "たりとも", "すら", "からある"],
          answer: 0,
          explain: "Mốc đặc biệt + ようやく → にして.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "天才の彼にして解けない問題なら、私に解けるはずがない。",
          opts: [
            "Đến thiên tài như anh ấy còn không giải được thì tôi sao giải nổi.",
            "Vì anh ấy là thiên tài nên giải được mọi bài.",
            "Tôi giải được bài mà thiên tài không giải được.",
            "Anh ấy trở thành thiên tài nhờ giải bài này.",
          ],
          answer: 0,
          explain: "にして (nghĩa ②) = ngay cả… cũng.",
        },
      ],
    },
    {
      id: "atteno",
      pattern: "〜あっての",
      meaning: "Nhờ có… mới có… / không có… thì không có…",
      nuance:
        "Nhấn mạnh ân huệ, vai trò không thể thiếu của A: chính vì có A thì B mới tồn tại. Thường dùng khi cảm ơn, hoặc nhắc nhở về điều quan trọng.",
      forms: ["N1 + あっての + N2"],
      position: {
        before: "Điều không thể thiếu (お客様・健康・相手・海)",
        after: "あっての + N2 (thứ tồn tại nhờ A)",
      },
      register: "Văn viết & nói trang trọng",
      usage: [
        "Hay gặp: お客様あっての商売, 健康あっての人生, 命あっての物種.",
        "Thường kết thúc bằng 〜だ／〜ものだ／〜ことだ.",
      ],
      examples: [
        {
          jp: "結婚は相手[[あっての]]ことだから、相手がいなければどうしようもない。",
          vi: "Kết hôn là việc phải có người kia mới thành, không có đối tượng thì chịu.",
        },
        {
          jp: "海[[あっての]]漁業なのだから、海を汚してはいけない。",
          vi: "Ngư nghiệp có được là nhờ biển, nên không được làm bẩn biển.",
        },
        {
          jp: "健康[[あっての]]人生だ。無理をしすぎないように。",
          vi: "Có sức khỏe mới có cuộc sống. Đừng cố quá sức.",
        },
      ],
      dos: ["Phát biểu cảm ơn, nhắc nhở về điều cốt lõi."],
      donts: [
        {
          text: "A không phải điều kiện thiết yếu của B → không tự nhiên.",
          bad: "傘あっての雨だ。",
          good: "雨の日は傘が必要だ。",
        },
      ],
      compare: [
        {
          other: "〜なしには (Chương 9)",
          diff: "Hai mặt: あっての = có A mới có B; なしには = không có A thì không có B.",
        },
        {
          other: "〜からこそ (N2)",
          diff: "からこそ: nhấn lý do. あっての: nhấn vai trò không thể thiếu, cấu trúc N あっての N.",
        },
      ],
      memo: "あって = \"có\" → \"CÓ A thì mới CÓ B\" 🙏. Mai: 商品は、お客様あってのものです.",
      storyLine: "商品は、お客様[[あっての]]ものです。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "選手は、ファン＿＿＿存在だということを忘れてはいけない。",
          opts: ["あっての", "たりとも", "すら", "からの"],
          answer: 0,
          explain: "Cầu thủ tồn tại nhờ có người hâm mộ → ファンあっての存在.",
        },
        {
          type: "order",
          before: "",
          pieces: ["社員", "あっての", "会社", "だと"],
          after: "社長はいつも言っている。",
          star: 2,
          vi: "Giám đốc luôn nói rằng có nhân viên mới có công ty.",
          explain: "社員あっての会社だと…",
        },
      ],
    },
    {
      id: "karaaru",
      pattern: "〜からある／〜からする／〜からの",
      meaning: "Lên tới hơn… (con số lớn)",
      nuance:
        "Nhấn mạnh con số LỚN: \"không dưới, lên tới hơn…\". からある: trọng lượng, chiều dài, kích thước. からする: giá tiền. からの: số người, số lượng (và cả các loại trên) + danh từ.",
      forms: ["Số lượng + からある + N", "Giá tiền + からする + N", "Số lượng + からの + N"],
      position: {
        before: "Con số lớn: 二トン・十万円・千人",
        after: "Danh từ tương ứng (岩・服・人々)",
      },
      register: "Văn viết & nói",
      usage: [
        "Không dùng với con số nhỏ hay thời gian.",
        "Danh từ phía sau là thứ được đo bằng con số đó.",
      ],
      examples: [
        {
          jp: "二トン[[からある]]この岩を、昔の人はどうやって運んだのだろう。",
          vi: "Tảng đá nặng tới hơn hai tấn này, người xưa đã vận chuyển bằng cách nào nhỉ?",
        },
        {
          jp: "彼女は十万円[[からする]]服を、値段も見ないで何着も買った。",
          vi: "Cô ấy mua mấy bộ quần áo giá tới hơn 100.000 yên mà chẳng thèm nhìn giá.",
        },
        {
          jp: "そのデモには十万人[[からの]]人々が参加したそうだ。",
          vi: "Nghe nói cuộc biểu tình đó có tới hơn 100.000 người tham gia.",
        },
      ],
      dos: ["Nhấn mạnh độ lớn đáng kinh ngạc của trọng lượng, giá, số người."],
      donts: [
        {
          text: "Con số nhỏ → không dùng.",
          bad: "三人からの人が来た。",
          good: "三人ほどの人が来た。",
        },
        {
          text: "Giá tiền mà dùng からある → sai loại.",
          bad: "百万円からある時計。",
          good: "百万円からする時計。",
        },
      ],
      compare: [
        {
          other: "〜といったところだ (Chương 2)",
          diff: "Đối lập: といったところだ = cùng lắm chỉ (nhỏ). からある = lên tới hơn (lớn).",
        },
        {
          other: "〜も (N3: 三時間も)",
          diff: "も nhấn mạnh nhiều, trung tính. からある/する/の chỉ cho con số lớn + danh từ.",
        },
      ],
      memo: "から = \"từ (mức đó) trở lên\" 🏋️: ある (nặng/dài) · する (giá) · の (người). Ngày ra mắt: 千人からの客が列を作った.",
      storyLine: "店の前には、開店前から千人[[からの]]客が列を作った。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "この島には、高さ三十メートル＿＿＿大木がある。",
          opts: ["からある", "からする", "たりとも", "あっての"],
          answer: 0,
          explain: "Chiều cao/kích thước → からある.",
        },
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "一本五万円＿＿＿ワインを、彼は毎晩飲んでいる。",
          opts: ["からする", "からある", "すら", "にして"],
          answer: 0,
          explain: "Giá tiền → からする.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Đi với", "Ghi nhớ"],
    rows: [
      ["〜たりとも〜ない", "Dù chỉ một… cũng không", "一日・一円・何人", "Đơn vị nhỏ nhất"],
      ["〜すら", "Ngay cả", "N（ですら）", "Văn viết của さえ"],
      ["〜だに", "Chỉ nghĩ thôi đã / dù chỉ", "想像する・夢に・微動", "Cụm cố định"],
      ["〜にして", "Phải đến… mới / ngay cả", "八十歳・プロ・三度目", "Văn viết"],
      ["〜あっての", "Có A mới có B", "N あっての N", "Ân huệ, cốt lõi"],
      ["〜からある／する／の", "Lên tới hơn", "Trọng lượng / giá / người", "Con số lớn"],
    ],
  },
  links: [
    "Ôn N3: さえ, も, まで. N1: すら (văn viết), だに (cụm cố định), たりとも (đơn vị nhỏ nhất).",
    "あっての (Ch.17) ↔ なしには (Ch.9) — hai mặt của một ý.",
    "からある (Ch.17, số lớn) ↔ といったところだ (Ch.2, số nhỏ).",
    "Chương 3: はおろか〜さえ/すら — すら đi cùng はおろか rất tự nhiên: 漢字はおろか、ひらがなすら書けない.",
  ],
  hook: "Ngày ra mắt: 80 tuổi vẫn ra đồng (にして) · dù một ngày cũng không nghỉ (たりとも) · hơn nghìn khách xếp hàng (からの) · đến chuyên gia cũng không ngờ (ですら) · trong mơ cũng chưa dám nghĩ (だに) · có khách hàng mới có sản phẩm (あっての).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜たりとも", "Dù chỉ một… cũng không"],
        ["〜すら", "Ngay cả… (văn viết)"],
        ["〜だに", "Chỉ nghĩ thôi đã…"],
        ["〜にして", "Phải đến (mốc)… mới"],
        ["〜あっての", "Nhờ có… mới có…"],
        ["〜からする", "Giá lên tới hơn…"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "五十キロ＿＿＿荷物を、彼は一人で運んだ。",
      opts: ["からある", "からする", "たりとも", "すら"],
      answer: 0,
      explain: "Trọng lượng → からある.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "地震で家族を失うなんて、考える＿＿＿つらい。",
      opts: ["だに", "たりとも", "あっての", "からの"],
      answer: 0,
      explain: "Chỉ nghĩ thôi đã đau → 考えるだに.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "この仕事は一秒＿＿＿気が抜けない。",
      opts: ["たりとも", "すら", "だに", "にして"],
      answer: 0,
      explain: "Đơn vị nhỏ nhất + phủ định → たりとも.",
    },
    {
      type: "order",
      before: "",
      pieces: ["健康", "あっての", "仕事", "だから"],
      after: "、無理をしないでね。",
      star: 3,
      vi: "Có sức khỏe mới làm việc được, nên đừng cố quá nhé.",
      explain: "健康あっての仕事だから、…",
    },
    {
      type: "judge",
      q: "五十歳にして、初めて海外旅行をした。",
      ok: true,
      explain: "Mốc đặc biệt (50 tuổi) + 初めて → にして đúng.",
    },
  ],
};
