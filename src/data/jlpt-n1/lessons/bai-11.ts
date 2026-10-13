import type { N1Lesson } from "../types";

export const bai11: N1Lesson = {
  id: "bai-11",
  num: 11,
  topicJa: "目的・手段",
  topicVi: "Mục đích · phương tiện",
  chapterJa: "本物の味を求めて",
  chapterVi: "Đi tìm hương vị thật",
  scene:
    "Tháng Mười Một. Bản đề xuất của Mai lọt vào vòng thuyết trình trước ban giám đốc. Để tái hiện đúng vị trà Việt, Mai chạy khắp Tokyo. Còn Kenta thì… đi tập gym vì một lý do khác. Chương này học cách nói MỤC ĐÍCH và PHƯƠNG TIỆN trang trọng.",
  story: [
    {
      jp: "社内コンテストの一次審査に通ったという知らせが届いた。最終審査は役員の前でのプレゼンだ。結果は後日、書面[[をもって]]通知されるという。",
      vi: "Thông báo đến: Mai đã qua vòng một cuộc thi nội bộ. Vòng cuối là thuyết trình trước ban lãnh đạo. Kết quả sẽ được thông báo bằng văn bản sau đó.",
    },
    {
      jp: "ベトナムの本物の味を再現す[[べく]]、マイは週末ごとに都内のアジア食材店を回り、何十種類もの茶葉を試した。",
      vi: "Để tái hiện được đúng hương vị Việt Nam, cuối tuần nào Mai cũng đi khắp các cửa hàng thực phẩm châu Á ở Tokyo, thử hàng chục loại lá trà.",
    },
    {
      jp: "一方、健太は最近、急にジムに通い始めた。受付の新しいスタッフにいいところを見せ[[んがため]]らしい。佐藤先輩は「動機はともかく、健康にはいいね」と笑った。",
      vi: "Trong khi đó, gần đây Kenta bỗng chăm chỉ đi gym. Nghe đâu là vì muốn ra dáng trước cô nhân viên lễ tân mới. Chị Satō cười: \"Động cơ thì thôi bỏ qua, nhưng tốt cho sức khỏe đấy.\"",
    },
    {
      jp: "プレゼンの前日、田中部長がマイの肩をたたいた。「君の情熱[[をもって]]すれば、きっと役員にも伝わる。自信を持ちなさい。」",
      vi: "Ngày trước buổi thuyết trình, trưởng phòng Tanaka vỗ vai Mai: \"Với nhiệt huyết của em thì chắc chắn sẽ truyền được đến ban lãnh đạo. Hãy tự tin lên.\"",
    },
  ],
  patterns: [
    {
      id: "beku",
      pattern: "〜べく",
      meaning: "Để (đạt được)… (với ý chí rõ ràng)",
      nuance:
        "Thực hiện hành động B nhằm đạt mục đích A mà chủ thể đã quyết tâm. Văn viết, trang trọng. Cả hai vế cùng chủ ngữ và đều là hành động có ý chí.",
      forms: ["V辞書形 + べく", "する → するべく／すべく"],
      position: {
        before: "Mục đích có ý chí (なる・解決する・開発する)",
        after: "Hành động có ý chí để đạt mục đích",
      },
      register: "Văn viết · trang trọng",
      usage: [
        "Hai vế cùng chủ ngữ.",
        "Vế sau KHÔNG là yêu cầu, mệnh lệnh, rủ rê (không dùng 〜てください).",
      ],
      examples: [
        {
          jp: "彼はサッカー選手になる[[べく]]、毎日厳しい練習をしている。",
          vi: "Để trở thành cầu thủ bóng đá, ngày nào anh ấy cũng tập luyện khắc nghiệt.",
        },
        {
          jp: "新型の機械を購入する[[べく]]、社長はいろいろ調べている。",
          vi: "Để mua máy móc đời mới, giám đốc đang tìm hiểu đủ thứ.",
        },
        {
          jp: "介護ロボットを開発す[[べく]]、私たちは今日も実験を続ける。",
          vi: "Để phát triển robot chăm sóc người già, hôm nay chúng tôi vẫn tiếp tục thí nghiệm.",
        },
      ],
      dos: ["Văn bản, tin tức, tiểu sử: mô tả nỗ lực có mục đích rõ ràng."],
      donts: [
        {
          text: "Vế sau là yêu cầu / nhờ vả → không dùng.",
          bad: "試験に合格すべく、しっかり勉強してください。",
          good: "試験に合格するために、しっかり勉強してください。",
        },
      ],
      compare: [
        {
          other: "〜ために (N4)",
          diff: "ために: trung tính, dùng được với yêu cầu. べく: văn viết, chỉ mô tả hành động có ý chí, không yêu cầu.",
        },
        {
          other: "〜べくもない (Chương 13)",
          diff: "Cùng gốc べし nhưng べくもない = \"không thể nào…\" — nghĩa khác hẳn.",
        },
      ],
      memo: "べく ← べし (\"nên, phải\") → \"vì PHẢI đạt được nên…\" 🎯. Mai: 本物の味を再現すべく、食材店を回った.",
      storyLine: "ベトナムの本物の味を再現す[[べく]]、マイは週末ごとに都内のアジア食材店を回った。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "被災地の人々を支援す＿＿＿、多くのボランティアが集まった。",
          opts: ["べく", "べからず", "まじき", "べくもなく"],
          answer: 0,
          explain: "Để hỗ trợ người dân vùng thảm họa (mục đích) → すべく.",
        },
        {
          type: "judge",
          q: "早く元気になるべく、薬を飲みなさい。",
          ok: false,
          explain: "Vế sau là mệnh lệnh → べく không dùng được.",
          fix: "早く元気になるために、薬を飲みなさい。",
        },
      ],
    },
    {
      id: "ngatame",
      pattern: "〜んがため（に）",
      variants: ["〜んがための N"],
      meaning: "Chỉ vì muốn… (mục tiêu lớn, quyết liệt)",
      nuance:
        "Hành động vì một mục tiêu nhất định phải đạt được, thường là mục tiêu lớn, quan trọng. Sắc thái mạnh, có khi \"bất chấp tất cả\". Văn viết cổ.",
      forms: ["Vない (bỏ ない) + んがため（に）", "Ngoại lệ: する → せんがため"],
      position: {
        before: "Mục tiêu lớn: 生きる・勝つ・実現させる・得る",
        after: "Hành động quyết liệt có ý chí",
      },
      register: "Văn viết · cổ, mạnh",
      usage: [
        "Không dùng cho mục đích nhỏ nhặt hằng ngày (trừ khi đùa).",
        "Hai vế cùng chủ ngữ.",
      ],
      examples: [
        {
          jp: "彼女は歌手になるという夢を実現させ[[んがため]]、上京した。",
          vi: "Chỉ để biến giấc mơ làm ca sĩ thành hiện thực, cô ấy đã lên Tokyo.",
        },
        {
          jp: "ライオンがシマウマを食べるのは残酷に見えるが、ライオンは生き[[んがために]]そうするのだ。",
          vi: "Sư tử ăn ngựa vằn trông có vẻ tàn nhẫn, nhưng sư tử làm thế là để sống còn.",
        },
        {
          jp: "自分の利益を得[[んがための]]発言では、人の心は動かせない。",
          vi: "Những lời nói chỉ nhằm thu lợi cho bản thân thì không lay động được lòng người.",
        },
      ],
      dos: ["Văn chương, bình luận: mục đích lớn, sống còn, quyết liệt."],
      donts: [
        {
          text: "Mục đích thường ngày → nghe phóng đại (trừ khi cố ý hài hước).",
          bad: "パンを買わんがため、コンビニに行った。",
          good: "パンを買うために、コンビニに行った。",
        },
      ],
      compare: [
        {
          other: "〜べく",
          diff: "Cả hai trang trọng. んがため: mục tiêu LỚN, quyết liệt, cổ hơn. べく: mục đích có ý chí nói chung.",
        },
        {
          other: "〜んばかり (Chương 6)",
          diff: "Cùng cách chia (ない bỏ ない + ん, する → せん) nhưng nghĩa \"như sắp…\".",
        },
      ],
      memo: "ん（= む: ý chí cổ）+ が + ため = \"vì ý muốn mãnh liệt\" 🦁. Kenta đi gym: いいところを見せんがため — dùng mẫu \"to tát\" cho chuyện nhỏ để gây cười!",
      storyLine: "受付の新しいスタッフにいいところを見せ[[んがため]]らしい。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "優勝＿＿＿、選手たちは一年間厳しい練習に耐えてきた。",
          opts: ["せんがため", "しんがため", "するんがため", "さんがため"],
          answer: 0,
          explain: "する → せんがため (ngoại lệ).",
        },
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "勝た＿＿＿手段を選ばないやり方には賛成できない。",
          opts: ["んがための", "んがために", "んばかりの", "ないがための"],
          answer: 0,
          explain: "勝つ → 勝たない → 勝たん + がための + danh từ (手段).",
        },
      ],
    },
    {
      id: "wo-motte-shudan",
      pattern: "〜をもって（手段）",
      variants: ["〜をもってすれば", "〜をもってしても"],
      meaning: "Bằng (phương tiện, năng lực)…",
      nuance:
        "Thực hiện việc gì đó bằng phương tiện, cách thức, tiêu chuẩn N. Văn trang trọng. Cụm をもってすれば = \"nếu dùng (năng lực tuyệt vời) đó thì…\"; をもってしても = \"dù dùng cả… cũng không…\".",
      forms: ["N + をもって", "N + をもってすれば (đánh giá cao)", "N + をもってしても (phủ định)"],
      position: {
        before: "Phương tiện / năng lực / tiêu chuẩn: 書面・実力・技術・何",
        after: "Hành động / đánh giá",
      },
      register: "Rất trang trọng · thông báo, văn viết",
      usage: [
        "Không dùng cho phương tiện thường ngày cụ thể (bút, xe buýt…).",
        "何をもって = dựa vào tiêu chuẩn gì.",
      ],
      examples: [
        {
          jp: "本日の採用試験の結果は、後日書面[[をもって]]ご連絡いたします。",
          vi: "Kết quả kỳ thi tuyển hôm nay sẽ được thông báo bằng văn bản vào ngày sau.",
        },
        {
          jp: "何[[をもって]]人の価値を評価するかは、難しい問題だ。",
          vi: "Lấy gì làm thước đo để đánh giá giá trị con người là một vấn đề khó.",
        },
        {
          jp: "最新の医療技術[[をもってすれば]]、人はさらに寿命を延ばせるだろう。",
          vi: "Với kỹ thuật y học tối tân, con người có lẽ sẽ kéo dài tuổi thọ hơn nữa.",
        },
      ],
      dos: ["Thông báo chính thức; đánh giá năng lực (〜をもってすれば).", "をもってしても + phủ định: \"ngay cả… cũng không\"."],
      donts: [
        {
          text: "Phương tiện cụ thể, đời thường → quá cứng.",
          bad: "毎日バスをもって会社に行く。",
          good: "毎日バスで会社に行く。",
        },
      ],
      compare: [
        {
          other: "〜をもって（終了）(Chương 2)",
          diff: "N là THỜI ĐIỂM → kết thúc. N là PHƯƠNG TIỆN/NĂNG LỰC → bằng.",
        },
        {
          other: "〜によって (N3)",
          diff: "によって trung tính, nhiều nghĩa (nguyên nhân, bị động, tùy). をもって: trang trọng, chỉ phương tiện.",
        },
      ],
      memo: "もって = 持って (cầm lấy) → \"cầm lấy công cụ ấy mà làm\" 🛠️. 君の情熱をもってすれば、きっと伝わる.",
      storyLine: "君の情熱[[をもって]]すれば、きっと役員にも伝わる。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "彼の実力＿＿＿、この大会で優勝するのは難しくないだろう。",
          opts: ["をもってすれば", "をもってしても", "をもちまして", "べく"],
          answer: 0,
          explain: "Đánh giá cao năng lực + kết quả tích cực → をもってすれば.",
        },
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "現代の科学＿＿＿、この謎はまだ解明されていない。",
          opts: ["をもってしても", "をもってすれば", "べく", "んがため"],
          answer: 0,
          explain: "Ngay cả khoa học hiện đại cũng chưa giải được → をもってしても + phủ định.",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Cách chia", "Lưu ý"],
    rows: [
      ["〜べく", "Để (có ý chí)", "V辞書形（する→すべく）", "Không dùng với yêu cầu"],
      ["〜んがため", "Chỉ vì muốn (mục tiêu lớn)", "Vない→ん（する→せん）", "Cổ, mạnh"],
      ["〜をもって", "Bằng (phương tiện)", "N + をもって", "すれば (khen) / しても (phủ định)"],
    ],
  },
  links: [
    "Ôn N4–N2: ために, ように, には. N1: べく & んがため là bản văn viết, chỉ dùng cho ý chí của chủ thể.",
    "Họ べし: べく (để), べくもない (không thể — Chương 13), べからず (cấm — Chương 13). Học chung một lần!",
    "をもって hai nghĩa: kết thúc (Chương 2) / phương tiện (chương này).",
    "Cách chia ん: んばかり (Chương 6), んがため (chương này) — する → せん cho cả hai.",
  ],
  hook: "Đi tìm hương vị thật: kết quả gửi BẰNG văn bản (をもって) · để tái hiện vị trà, Mai chạy khắp Tokyo (べく) · Kenta đi gym CHỈ VÌ muốn gây ấn tượng (んがため) · với nhiệt huyết ấy thì chắc chắn thành công (をもってすれば).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜べく", "Để (đạt mục đích có ý chí)"],
        ["〜んがため", "Chỉ vì muốn (mục tiêu lớn)"],
        ["〜をもってすれば", "Nếu dùng (năng lực ấy) thì"],
        ["〜をもってしても", "Dù dùng cả… cũng không"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "真相を明らかにす＿＿＿、警察は捜査を続けている。",
      opts: ["べく", "べからず", "まじく", "べくもなく"],
      answer: 0,
      explain: "Để làm rõ sự thật → すべく.",
    },
    {
      type: "choice",
      label: "Chọn cách nói trang trọng phù hợp",
      q: "（社内通知）合否は、後日メール＿＿＿お知らせします。",
      opts: ["をもって", "べく", "んがため", "をもってしても"],
      answer: 0,
      explain: "Thông báo chính thức, phương tiện liên lạc → をもって.",
    },
    {
      type: "order",
      before: "彼は",
      pieces: ["家族を", "守らん", "がため", "必死に"],
      after: "働いた。",
      star: 2,
      vi: "Anh ấy làm việc cật lực chỉ vì muốn bảo vệ gia đình.",
      explain: "家族を守らんがため、必死に働いた.",
    },
    {
      type: "judge",
      q: "日本語を勉強すべく、私と一緒に図書館へ行きましょう。",
      ok: false,
      explain: "Vế sau là lời rủ rê (〜ましょう) → べく không dùng.",
      fix: "日本語を勉強するために、一緒に図書館へ行きましょう。",
    },
  ],
};
