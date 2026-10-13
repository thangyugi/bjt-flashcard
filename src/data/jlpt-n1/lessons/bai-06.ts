import type { N1Lesson } from "../types";

export const bai06: N1Lesson = {
  id: "bai-06",
  num: 6,
  topicJa: "様子",
  topicVi: "Dáng vẻ · trạng thái",
  chapterJa: "割れんばかりの拍手",
  chapterVi: "Tràng pháo tay như vỡ hội trường",
  scene:
    "Cuối tháng Bảy. Sự kiện thành công, Mai báo cáo kết quả trước cả công ty. Một ngày nhiều cảm xúc — và đầy những cách miêu tả DÁNG VẺ: \"như sắp…\", \"như muốn nói…\", \"vô tình…\", \"vẫn nguyên như thế…\", \"có tật…\".",
  story: [
    {
      jp: "全社会議でマイがイベントの結果を発表すると、会場には割れ[[んばかりの]]拍手が起こった。マイは胸がいっぱいになった。",
      vi: "Khi Mai công bố kết quả sự kiện trong cuộc họp toàn công ty, hội trường vang lên tràng pháo tay như muốn vỡ tung. Mai xúc động nghẹn ngào.",
    },
    {
      jp: "隣の健太は「やっと終わった」[[とばかりに]]、大きく伸びをした。部長がにらんだが、本人は全く気づいていない。",
      vi: "Kenta ngồi cạnh vươn vai thật dài như muốn nói \"cuối cùng cũng xong\". Trưởng phòng lườm, nhưng cậu ta chẳng hề hay biết.",
    },
    {
      jp: "健太には、仕事をぎりぎりまで先延ばしにする[[きらいがある]]。今回の資料も、完成したのは会議の十分前だった。",
      vi: "Kenta có tật để việc đến phút chót mới làm. Tài liệu lần này cũng chỉ xong trước cuộc họp mười phút.",
    },
    {
      jp: "その夜、マイは部屋でラジオを聞く[[ともなく]]聞いていた。すると、どこから[[ともなく]]懐かしいベトナムの歌が流れてきた。",
      vi: "Tối đó, Mai nằm trong phòng nghe radio một cách vô thức. Bỗng từ đâu đó vang lên một bài hát Việt Nam thân thuộc.",
    },
    {
      jp: "翌日、その話をすると、山本さんは若いころ戦争で家族と別れた思い出を涙[[ながらに]]語ってくれた。「歌はね、遠くにいる人をつなぐのよ。」",
      vi: "Hôm sau, khi Mai kể chuyện đó, bà Yamamoto vừa khóc vừa kể lại kỷ niệm thời trẻ phải xa gia đình vì chiến tranh. \"Bài hát ấy mà, nó nối những người ở xa nhau đấy con.\"",
    },
  ],
  patterns: [
    {
      id: "nbakarida",
      pattern: "〜んばかりだ",
      variants: ["〜んばかりに", "〜んばかりの N"],
      meaning: "Như thể sắp… / gần như muốn…",
      nuance:
        "Cách nói CƯỜNG ĐIỆU: thực tế chưa đến mức đó, nhưng trạng thái gần như là như thế. 割れんばかりの拍手 = tràng pháo tay như sắp làm vỡ hội trường.",
      forms: ["Vない (bỏ ない) + んばかりだ／んばかりに／んばかりの N", "Ngoại lệ: する → せんばかり"],
      position: {
        before: "Động từ cực đoan (割れる・泣き出す・飛び上がる・頭を下げる)",
        after: "Miêu tả trạng thái/hành động thực tế",
      },
      register: "Văn viết · miêu tả",
      usage: [
        "Dùng cho trạng thái thấy được bằng mắt, không phải cảm xúc bên trong của mình.",
        "Hay gặp: 割れんばかりの拍手, 泣き出さんばかりの顔, あふれんばかりの笑顔.",
      ],
      examples: [
        {
          jp: "頭を畳につけ[[んばかりに]]して謝ったのに、父は許してくれなかった。",
          vi: "Tôi xin lỗi như sắp dập đầu xuống chiếu vậy mà bố vẫn không tha thứ.",
        },
        {
          jp: "演奏が終わったとき、会場には割れ[[んばかりの]]拍手が起こった。",
          vi: "Khi buổi biểu diễn kết thúc, hội trường vang lên tràng pháo tay như muốn vỡ tung.",
        },
        {
          jp: "合格の知らせを聞いて、妹は飛び上がら[[んばかりに]]喜んだ。",
          vi: "Nghe tin đỗ, em gái tôi mừng như muốn nhảy cẫng lên.",
        },
      ],
      dos: ["Miêu tả sinh động một trạng thái mãnh liệt: vui mừng, tức giận, tiếng động lớn."],
      donts: [
        {
          text: "Việc đã thực sự xảy ra hoàn toàn → không phải \"gần như\".",
          bad: "コップが割れんばかりに床に落ちて割れた。",
          good: "コップが床に落ちて割れた。",
        },
      ],
      compare: [
        {
          other: "〜とばかりに",
          diff: "んばかり: gần như SẮP xảy ra một hành động (gắn với động từ). とばかりに: dáng vẻ như MUỐN NÓI một câu (gắn với lời nói 「…」).",
        },
        {
          other: "〜そうだ (様態)",
          diff: "そうだ: dự đoán trung tính (泣きそうだ). んばかり: cường điệu, văn chương.",
        },
      ],
      memo: "ん = ぬ (thể phủ định cổ) + ばかり = \"chỉ thiếu mỗi việc chưa…\" 👏💥. \"割れんばかり\" = chỉ còn thiếu mỗi là chưa vỡ!",
      storyLine: "会場には割れ[[んばかりの]]拍手が起こった。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "彼女は今にも泣き出さ＿＿＿顔で、私を見つめた。",
          opts: ["んばかりの", "んばかりに", "ないばかりの", "るばかりの"],
          answer: 0,
          explain: "泣き出さない → bỏ ない + んばかり; đứng trước danh từ (顔) → の.",
        },
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "「する」を「〜んばかり」にすると？",
          opts: ["せんばかり", "しんばかり", "さんばかり", "するんばかり"],
          answer: 0,
          explain: "Ngoại lệ: する → せん（ばかり）, giống せんがため (Chương 11).",
        },
      ],
    },
    {
      id: "tobakarini",
      pattern: "〜とばかりに",
      meaning: "Như thể muốn nói rằng…",
      nuance:
        "Không nói ra thành lời, nhưng hành động, thái độ thể hiện rõ như đang nói câu đó. Dùng để miêu tả người khác.",
      forms: ["Câu nói / thể thường + とばかりに", "「Lời thoại」+ とばかりに"],
      position: {
        before: "Câu nói ngầm (「帰れ」・もう待てない・この時)",
        after: "Hành động, thái độ thể hiện câu đó",
      },
      register: "Văn viết · kể chuyện",
      usage: [
        "Hay dùng với mệnh lệnh/lời cảm thán ngắn trong ngoặc 「」.",
        "Không dùng cho bản thân người nói.",
        "Cụm cố định: この時とばかり(に) = như thể \"đúng lúc rồi!\" (chớp lấy cơ hội).",
      ],
      examples: [
        {
          jp: "ケーキを買って帰ったら、「待ってました」[[とばかりに]]、みんながテーブルに集まった。",
          vi: "Mua bánh về, cả nhà liền tụ lại quanh bàn như thể muốn nói \"Chờ mãi rồi đấy\".",
        },
        {
          jp: "子供はもう歩けない[[とばかりに]]、その場にしゃがみ込んでしまった。",
          vi: "Đứa bé ngồi thụp xuống tại chỗ như muốn nói \"con không đi nổi nữa\".",
        },
        {
          jp: "意見交換会で、住民たちはこの時[[とばかり]]、いろいろな意見を言った。",
          vi: "Ở buổi trao đổi ý kiến, người dân như chớp lấy cơ hội, đưa ra đủ loại ý kiến.",
        },
      ],
      dos: ["Miêu tả \"ngôn ngữ cơ thể\" của người khác trong truyện, bài viết."],
      donts: [
        {
          text: "Chủ ngữ là bản thân → không dùng.",
          bad: "私は「もう帰りたい」とばかりに、時計を見た。",
          good: "彼は「もう帰りたい」とばかりに、何度も時計を見た。",
        },
      ],
      compare: [
        {
          other: "〜んばかりに",
          diff: "んばかり gắn với ĐỘNG TỪ (sắp làm gì). とばかり gắn với LỜI NÓI (như muốn nói gì).",
        },
        {
          other: "〜と言わんばかりに",
          diff: "Dạng đầy đủ = とばかりに + 言う. Nghĩa giống nhau: \"như thể muốn nói\".",
        },
      ],
      memo: "と (trích dẫn) + ばかり = \"chỉ thiếu mỗi việc nói ra\" 🙄. Kenta vươn vai: 「やっと終わった」とばかりに.",
      storyLine: "健太は「やっと終わった」[[とばかりに]]、大きく伸びをした。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "店員は「早く帰れ」＿＿＿、閉店の準備を始めた。",
          opts: ["とばかりに", "んばかりに", "ともなく", "ながらに"],
          answer: 0,
          explain: "Câu nói ngầm 「早く帰れ」+ hành động → とばかりに.",
        },
        {
          type: "order",
          before: "犬は",
          pieces: ["「遊んで」", "と", "ばかりに", "しっぽを"],
          after: "振っている。",
          star: 2,
          vi: "Con chó vẫy đuôi như muốn nói \"chơi với tớ đi\".",
          explain: "「遊んで」とばかりに、しっぽを振っている.",
        },
      ],
    },
    {
      id: "tomonaku",
      pattern: "〜ともなく／〜ともなしに",
      meaning: "① Vô tình, không chủ đích mà… ② Không rõ (ai/đâu/lúc nào)…",
      nuance:
        "Cách 1: V辞書形 + ともなく + cùng động từ: làm một việc một cách vô thức, không có ý định rõ ràng. Cách 2: Từ để hỏi (+trợ từ) + ともなく: không xác định được rõ ai/đâu/khi nào.",
      forms: ["V辞書形 + ともなく + V (lặp lại)", "Từ để hỏi（どこ・だれ・いつ）+（から）+ ともなく"],
      position: {
        before: "Cách 1: 見る・聞く・待つ… / Cách 2: どこから・だれ・いつ",
        after: "Cách 1: cùng động từ + phát hiện bất ngờ / Cách 2: sự việc xảy ra",
      },
      register: "Văn viết · miêu tả",
      usage: [
        "Cách 1 chỉ đi với một số động từ: 見る, 聞く, 待つ, 言う, 考える…",
        "Cách 2 hay gặp: どこからともなく, だれともなく, いつからともなく.",
      ],
      examples: [
        {
          jp: "テレビを見る[[ともなく]]見ていたら、友達が映っていてびっくりした。",
          vi: "Đang xem tivi một cách vô thức thì bất ngờ thấy bạn mình xuất hiện.",
        },
        {
          jp: "どこから[[ともなく]]、おいしそうなカレーのにおいがしてきた。",
          vi: "Không biết từ đâu, mùi cà ri thơm lừng bay tới.",
        },
        {
          jp: "だれ[[ともなく]]、熊田さんのことを「クマちゃん」と呼ぶようになった。",
          vi: "Không rõ ai bắt đầu, mọi người dần gọi chị Kumada là \"Kuma-chan\".",
        },
      ],
      dos: ["Miêu tả hành động vô thức dẫn đến phát hiện bất ngờ; hiện tượng không rõ nguồn gốc."],
      donts: [
        {
          text: "Hành động có mục đích rõ ràng → không dùng.",
          bad: "試験のために、教科書を読むともなく読んだ。",
          good: "試験のために、教科書を何度も読んだ。",
        },
      ],
      compare: [
        {
          other: "〜ながら (N4)",
          diff: "ながら: làm 2 việc cùng lúc. ともなく: làm 1 việc mà KHÔNG có ý thức/chủ đích.",
        },
        {
          other: "なんとなく",
          diff: "なんとなく: phó từ \"chẳng hiểu sao\". ともなく: mẫu ngữ pháp gắn vào động từ / từ để hỏi.",
        },
      ],
      memo: "とも + なく = \"cũng chẳng (định)…\" 📻. Mai nghe radio \"聞くともなく聞いていた\" thì một bài hát Việt \"どこからともなく\" vang lên — hai cách dùng trong một cảnh!",
      storyLine: "マイは部屋でラジオを聞く[[ともなく]]聞いていた。すると、どこから[[ともなく]]懐かしいベトナムの歌が流れてきた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "窓の外を見る＿＿＿見ていると、虹が出ているのに気がついた。",
          opts: ["ともなく", "とばかりに", "んばかりに", "ながらに"],
          answer: 0,
          explain: "Nhìn một cách vô thức (V + ともなく + V) → phát hiện cầu vồng.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "いつからともなく、この道は「恋人の道」と呼ばれるようになった。",
          opts: [
            "Không rõ từ bao giờ, con đường này được gọi là \"đường tình nhân\".",
            "Từ trước đến giờ chưa bao giờ gọi là \"đường tình nhân\".",
            "Không ai muốn gọi con đường này là \"đường tình nhân\".",
            "Từ hôm nay con đường này sẽ được gọi là \"đường tình nhân\".",
          ],
          answer: 0,
          explain: "Từ để hỏi (いつから) + ともなく = không rõ (từ khi nào).",
        },
      ],
    },
    {
      id: "nagarani",
      pattern: "〜ながらに（して）",
      variants: ["〜ながらの N"],
      meaning: "Vẫn nguyên trong trạng thái… / ngay từ khi…",
      nuance:
        "Giữ nguyên trạng thái N/V mà làm việc khác, hoặc trạng thái vốn có từ lúc đó. Chỉ đi với một số từ cố định: 生まれながら, 涙ながら, 居ながら, 昔ながら.",
      forms: ["Vます + ながらに（して）", "N + ながらに（して）／ながらの N"],
      position: {
        before: "Từ cố định: 生まれ・涙・居（い）・昔・いつもながら",
        after: "Hành động/đặc điểm diễn ra trong trạng thái đó",
      },
      register: "Văn viết · cụm cố định",
      usage: [
        "生まれながらに = bẩm sinh; 涙ながらに = vừa khóc vừa; 居ながらにして = ngồi một chỗ mà vẫn…; 昔ながらの = như xưa.",
        "Không tự do gắn với động từ bất kỳ.",
      ],
      examples: [
        {
          jp: "この子は生まれ[[ながらに]]優れた音感を持っていた。",
          vi: "Đứa trẻ này bẩm sinh đã có cảm âm xuất sắc.",
        },
        {
          jp: "その女性は母親との別れを涙[[ながらに]]語った。",
          vi: "Người phụ nữ ấy vừa khóc vừa kể về cuộc chia ly với mẹ.",
        },
        {
          jp: "インターネットのおかげで、家に居[[ながらにして]]世界中の買い物ができる。",
          vi: "Nhờ Internet, ngồi ở nhà mà vẫn mua sắm được khắp thế giới.",
        },
      ],
      dos: ["Dùng các cụm cố định: 生まれながら, 涙ながら, 居ながらにして, 昔ながらの."],
      donts: [
        {
          text: "Gắn tự do với động từ bất kỳ → sai.",
          bad: "音楽を聞きながらにして勉強した。",
          good: "音楽を聞きながら勉強した。",
        },
      ],
      compare: [
        {
          other: "〜ながら (vừa… vừa…)",
          diff: "ながら thông thường: 2 hành động song song, động từ tự do. ながらに: TRẠNG THÁI giữ nguyên, chỉ vài từ cố định.",
        },
        {
          other: "〜まま (N4)",
          diff: "まま: giữ nguyên trạng thái (thường do sơ suất). ながらに: văn viết, cụm cố định, sắc thái trang trọng.",
        },
      ],
      memo: "Nhớ bộ 4 cụm 💧: 生まれながら (bẩm sinh) · 涙ながら (trong nước mắt) · 居ながら (ngồi một chỗ) · 昔ながら (như xưa). Bà Yamamoto: 涙ながらに語った.",
      storyLine: "山本さんは若いころの思い出を涙[[ながらに]]語ってくれた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "この店では、昔＿＿＿製法でしょうゆを作っている。",
          opts: ["ながらの", "ばかりの", "ともなく", "きらいの"],
          answer: 0,
          explain: "昔ながらの = theo cách xưa (cụm cố định).",
        },
        {
          type: "judge",
          q: "彼女は生まれながらにして、人を引きつける魅力を持っている。",
          ok: true,
          explain: "生まれながらにして = bẩm sinh → đúng.",
        },
      ],
    },
    {
      id: "kirai-ga-aru",
      pattern: "〜きらいがある",
      meaning: "Có tật / có khuynh hướng (không tốt)…",
      nuance:
        "Phê bình nhẹ nhàng một khuynh hướng, tính cách không tốt của ai đó. Không phải lời chỉ trích gay gắt; hay đi kèm phó từ làm dịu: どうも, 少し, ともすれば.",
      forms: ["V辞書形／Vない + きらいがある", "N + の + きらいがある"],
      position: {
        before: "Khuynh hướng xấu: 考えすぎる・人の話を聞かない・誇張",
        after: "(cuối câu) きらいがある",
        note: "Thường đứng cuối câu.",
      },
      register: "Văn viết · nhận xét",
      usage: [
        "Dùng để nhận xét người khác hoặc xu hướng xã hội.",
        "Không dùng cho khuynh hướng tốt.",
      ],
      examples: [
        {
          jp: "彼はどうも物事を悲観的に考える[[きらいがある]]。",
          vi: "Anh ấy hình như có tật suy nghĩ bi quan về mọi chuyện.",
        },
        {
          jp: "うちの部長は、自分と違う考え方を認めようとしない[[きらいがある]]。",
          vi: "Trưởng phòng tôi có xu hướng không chịu chấp nhận cách nghĩ khác mình.",
        },
        {
          jp: "最近の若者は、何でもネットで済ませる[[きらいがある]]。",
          vi: "Giới trẻ gần đây có xu hướng việc gì cũng giải quyết qua mạng.",
        },
      ],
      dos: ["Nhận xét tế nhị về tật xấu, khuynh hướng tiêu cực của ai đó / xã hội."],
      donts: [
        {
          text: "Khuynh hướng tốt → không dùng.",
          bad: "彼女は人に親切にするきらいがある。",
          good: "彼女は人に親切にする傾向がある。",
        },
      ],
      compare: [
        {
          other: "〜がちだ (N3)",
          diff: "がちだ: hay bị (病気がち, 忘れがち), dùng cả cho mình. きらいがある: nhận xét KHUYNH HƯỚNG tính cách người khác, văn viết.",
        },
        {
          other: "〜傾向がある",
          diff: "傾向がある trung tính (tốt/xấu đều được). きらいがある chỉ cho cái XẤU.",
        },
      ],
      memo: "きらい (嫌い) = \"ghét\" → khuynh hướng \"đáng ghét\" 😤. Kenta: 仕事をぎりぎりまで先延ばしにするきらいがある.",
      storyLine: "健太には、仕事をぎりぎりまで先延ばしにする[[きらいがある]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "彼は自分の失敗を人のせいにする＿＿＿。",
          opts: ["きらいがある", "んばかりだ", "とばかりだ", "ともなくだ"],
          answer: 0,
          explain: "Tật xấu (đổ lỗi cho người khác) → きらいがある.",
        },
        {
          type: "judge",
          q: "姉は毎朝早起きして運動するきらいがある。",
          ok: false,
          explain: "Dậy sớm tập thể dục là thói quen TỐT → không dùng きらいがある.",
          fix: "姉は毎朝早起きして運動する習慣がある。",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Gắn với", "Ghi nhớ"],
    rows: [
      ["〜んばかりだ", "Như sắp… (cường điệu)", "Vない bỏ ない (する→せん)", "割れんばかりの拍手"],
      ["〜とばかりに", "Như muốn nói…", "Lời nói 「…」", "この時とばかり"],
      ["〜ともなく", "Vô thức / không rõ ai-đâu", "V + ともなく + V / từ để hỏi", "どこからともなく"],
      ["〜ながらに", "Vẫn nguyên trạng thái", "Từ cố định", "生まれ・涙・居・昔"],
      ["〜きらいがある", "Có tật xấu", "V辞書形 / Nの", "Chỉ cho cái xấu"],
    ],
  },
  links: [
    "んばかり ↔ とばかり: một bên \"sắp LÀM\", một bên \"như muốn NÓI\". Cách nhớ: と = dấu ngoặc trích dẫn lời nói.",
    "Cách chia ない bỏ ない + ん (する→せん) xuất hiện lại ở Chương 11: 〜んがため（に）.",
    "Ôn N3–N2: 〜がちだ, 〜っぽい, 〜気味 cũng là \"khuynh hướng\" — きらいがある là bản văn viết, phê bình nhẹ.",
    "ながらに ≠ ながら (vừa…vừa…) và ≠ ながらも (mặc dù, N2).",
  ],
  hook: "Một ngày nhiều cảm xúc: pháo tay như vỡ hội trường (んばかり) · Kenta như muốn nói \"xong rồi!\" (とばかりに) · tật để nước đến chân (きらいがある) · nghe radio vô thức, bài hát từ đâu vọng tới (ともなく) · bà Yamamoto kể chuyện trong nước mắt (ながらに).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜んばかりだ", "Như sắp… (cường điệu)"],
        ["〜とばかりに", "Như thể muốn nói…"],
        ["〜ともなく", "Vô thức / không rõ từ đâu"],
        ["〜ながらに", "Vẫn nguyên trạng thái ấy"],
        ["〜きらいがある", "Có tật xấu, khuynh hướng không tốt"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "優勝が決まった瞬間、選手たちは「やった！」＿＿＿、抱き合った。",
      opts: ["とばかりに", "んばかりに", "ともなく", "きらいがあって"],
      answer: 0,
      explain: "Lời cảm thán 「やった！」 + hành động → とばかりに.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "彼女はあふれ＿＿＿笑顔で、私たちを迎えてくれた。",
      opts: ["んばかりの", "とばかりの", "ともなしの", "ながらに"],
      answer: 0,
      explain: "あふれる → あふれない → あふれん + ばかりの + danh từ: nụ cười như tràn ra.",
    },
    {
      type: "choice",
      label: "Chọn câu dùng đúng",
      q: "「〜ともなく」の使い方が正しい文はどれか。",
      opts: [
        "公園のベンチで、だれを待つともなく座っていた。",
        "明日の試験のために、ともなく勉強した。",
        "彼は「帰れ」ともなく、ドアを指さした。",
        "生まれともなく、彼は才能があった。",
      ],
      answer: 0,
      explain: "だれを待つともなく = không định chờ ai cụ thể → đúng cách 2.",
    },
    {
      type: "order",
      before: "この町には、",
      pieces: ["昔", "ながらの", "町並みが", "今も"],
      after: "残っている。",
      star: 2,
      vi: "Thị trấn này đến nay vẫn còn những dãy phố như ngày xưa.",
      explain: "昔ながらの町並みが今も残っている.",
    },
    {
      type: "judge",
      q: "日本人は、自分の意見をはっきり言わないきらいがあると言われる。",
      ok: true,
      explain: "Nhận xét khuynh hướng (không tốt lắm) của một nhóm người → đúng.",
    },
  ],
};
