import type { VocabLesson } from "../types";

export const v07: VocabLesson = {
  id: "mk-07",
  num: 7,
  title: "Động tác của bàn tay",
  titleJa: "手の動作",
  scene:
    "Kenta về Tokyo dưỡng thương. Chủ nhật, cả nhóm đến nhà bà Yamamoto nấu ăn. Một buổi chiều toàn những động tác tay: hái, khuấy, xé, vặn, bó, quạt…",
  story: [
    {
      jp: "庭でハーブを[[摘んで]]いると、山本さんの猫が足元に来た。マイが頭を[[なでる]]と、猫は手をぺろりと[[なめた]]。",
      vi: "Đang hái rau thơm ngoài vườn thì con mèo của bà Yamamoto lại gần chân. Mai xoa đầu nó, nó liền liếm tay cô một cái.",
    },
    {
      jp: "台所では山本さんが鍋のスープをゆっくり[[かき回して]]いる。健太はパンを手で[[ちぎって]]お皿に並べた。",
      vi: "Trong bếp, bà Yamamoto đang chậm rãi khuấy nồi súp. Kenta lấy tay xé bánh mì xếp ra đĩa.",
    },
    {
      jp: "ジャムのふたが固くて、健太がいくら[[ひねって]]も開かない。力を入れすぎて、ふたが[[ねじれて]]しまった。",
      vi: "Nắp lọ mứt chặt quá, Kenta vặn mãi không mở được. Dùng sức mạnh quá, cái nắp bị vặn méo luôn.",
    },
    {
      jp: "佐藤先輩は井戸から水を[[くんで]]きた。「昔はこうして毎日水を運んだのよ」と山本さんは懐かしそうだ。",
      vi: "Chị Satō múc nước từ giếng lên. \"Ngày xưa ngày nào cũng phải xách nước thế này đấy\", bà Yamamoto nói đầy hoài niệm.",
    },
    {
      jp: "納豆のにおいに健太は鼻を[[つまんだ]]。マイは眠そうに目を[[こすり]]、ずっとスマホを[[いじって]]いる健太の手からスマホを取り上げた。",
      vi: "Ngửi mùi natto, Kenta bịt mũi. Mai dụi mắt ngái ngủ, rồi giật lấy chiếc điện thoại Kenta cứ mân mê suốt.",
    },
    {
      jp: "食後、山本さんは古い手紙をひもで[[束ねて]]いた。暑いので、うちわで顔を[[あおぎ]]ながら、腰を[[さすって]]いる。",
      vi: "Sau bữa ăn, bà Yamamoto lấy dây bó những lá thư cũ lại. Trời nóng, bà vừa phe phẩy quạt vừa xoa lưng.",
    },
    {
      jp: "近所の犬が木の枝を[[くわえて]]走ってきた。健太が引っ張ると、古いリードが[[ちぎれた]]。犬はチャンスを[[つかんで]]、庭中を走り回った。",
      vi: "Con chó hàng xóm ngậm cành cây chạy tới. Kenta kéo thì sợi dây dắt cũ bị đứt. Con chó chớp lấy cơ hội chạy khắp vườn.",
    },
  ],
  words: [
    {
      no: 101, w: "こする", r: "こする", p: "を", pos: "verb", m: "chà, cọ, dụi",
      use: "Áp mạnh và chà qua lại trên bề mặt (dụi mắt, cọ vết bẩn). Chữ Hán 擦る ít dùng. Mạnh hơn さする.",
      col: ["目をこする", "汚れをこすって落とす", "手をこすり合わせる"],
      ex: [
        ["眠くて目を[[こすった]]。", "Buồn ngủ nên tôi dụi mắt."],
        ["鍋の焦げをスポンジで[[こすって]]落とした。", "Tôi lấy miếng bọt biển cọ sạch vết cháy ở nồi."],
      ],
      cmp: [["さする", "さする: xoa nhẹ nhàng (để giảm đau). こする: chà mạnh (để làm sạch, dụi)."]],
      memo: "\"KO-SU-RU\" như tiếng \"kèn kẹt\" khi chà mạnh. Mạnh: こする; nhẹ: さする; vuốt ve: なでる.",
    },
    {
      no: 102, w: "さする", r: "さする", p: "を", pos: "verb", m: "xoa nhẹ, xoa bóp",
      use: "Xoa nhẹ nhàng bằng lòng bàn tay (vùng đau, lưng người khác) — mang sự dịu dàng, chăm sóc.",
      col: ["背中をさする", "痛いところをさする"],
      ex: [
        ["気分が悪い友人の背中を[[さすった]]。", "Tôi xoa lưng cho người bạn đang khó chịu."],
        ["祖母はひざを[[さすり]]ながら立ち上がった。", "Bà vừa xoa đầu gối vừa đứng dậy."],
      ],
      cmp: [["なでる", "なでる: vuốt ve theo một chiều (đầu, lông). さする: xoa qua lại để giảm đau."]],
      memo: "\"SA-SU\" — nhẹ như tiếng \"sột soạt\" của bàn tay xoa lưng.",
    },
    {
      no: 103, w: "なでる", r: "なでる", p: "を", pos: "verb", m: "vuốt ve, xoa (đầu)",
      use: "Vuốt nhẹ theo một chiều để thể hiện yêu thương (xoa đầu trẻ, vuốt lông mèo). Chữ Hán 撫でる.",
      col: ["頭をなでる", "猫をなでる", "胸をなで下ろす"],
      ex: [
        ["母は子供の頭を優しく[[なでた]]。", "Người mẹ dịu dàng xoa đầu đứa con."],
        ["無事だと聞いて、胸を[[なで]]下ろした。", "Nghe tin bình an, tôi thở phào nhẹ nhõm."],
      ],
      memo: "胸をなで下ろす = vuốt ngực xuống → thở phào. \"NA-DE\" nghe như \"nâng niu\".",
    },
    {
      no: 104, w: "いじる", r: "いじる", p: "を", pos: "verb", m: "mân mê, nghịch, táy máy; chỉnh sửa (tùy tiện)",
      use: "Đụng chạm, nghịch ngợm đồ vật không có mục đích rõ ràng (スマホをいじる), hoặc sửa đổi linh tinh (設定をいじる). Khẩu ngữ.",
      col: ["スマホをいじる", "髪をいじる", "設定をいじる"],
      ex: [
        ["授業中にスマホを[[いじって]]いて、先生に注意された。", "Nghịch điện thoại trong giờ học nên bị thầy nhắc."],
        ["パソコンの設定を勝手に[[いじらないで]]。", "Đừng tự ý chỉnh lung tung cài đặt máy tính."],
      ],
      memo: "\"I-JI-RU\" — ngón tay cứ \"ịch ịch\" chọc vào đồ vật.",
    },
    {
      no: 105, w: "かき回す", r: "かきまわす", p: "を", pos: "verb", hv: "HỒI", m: "khuấy; lục tung; làm rối loạn",
      use: "Khuấy chất lỏng (スープをかき回す), lục lọi (引き出しをかき回す), hoặc làm xáo trộn tập thể (チームをかき回す).",
      col: ["スープをかき回す", "引き出しをかき回す", "場をかき回す"],
      ex: [
        ["コーヒーに砂糖を入れて[[かき回した]]。", "Tôi cho đường vào cà phê rồi khuấy."],
        ["新人の発言が会議を[[かき回した]]。", "Phát ngôn của người mới làm cuộc họp rối tung."],
      ],
      memo: "かく (cào) + 回す (xoay) = cào xoay tròn.",
    },
    {
      no: 106, w: "摘む", r: "つむ", p: "を", pos: "verb", hv: "TRÍCH", m: "hái, ngắt (bằng đầu ngón tay)",
      use: "Hái hoa, lá, chè bằng đầu ngón tay. Nghĩa bóng: 芽を摘む (bóp chết từ trong trứng).",
      col: ["花を摘む", "お茶を摘む", "芽を摘む"],
      ex: [
        ["野原で花を[[摘んだ]]。", "Tôi hái hoa ngoài đồng."],
        ["問題は小さいうちに芽を[[摘んで]]おこう。", "Hãy dập tắt vấn đề từ khi còn nhỏ."],
      ],
      cmp: [["つまむ", "Cùng chữ 摘 nhưng つまむ = nhón, gắp; 摘む (つむ) = hái."]],
      memo: "摘 có 扌(tay) — dùng tay ngắt lấy. 摘む đọc つむ; 摘まむ đọc つまむ.",
    },
    {
      no: 107, w: "つまむ", r: "つまむ", p: "を", pos: "verb", m: "nhón, gắp, véo; bịt (mũi); ăn vặt",
      use: "Kẹp bằng đầu ngón tay cái và ngón trỏ (塩をつまむ, 鼻をつまむ); ăn nhẹ bằng tay (お菓子をつまむ).",
      col: ["鼻をつまむ", "お菓子をつまむ", "つまみ食い"],
      ex: [
        ["臭いがひどくて、鼻を[[つまんだ]]。", "Mùi kinh quá nên tôi bịt mũi."],
        ["仕事中にお菓子を[[つまむ]]のが好きだ。", "Tôi thích nhón đồ ăn vặt trong lúc làm việc."],
      ],
      memo: "つまみ (đồ nhắm) cũng từ động từ này — thứ nhón tay ăn kèm rượu.",
    },
    {
      no: 108, w: "つかむ", r: "つかむ", p: "を", pos: "verb", m: "nắm, tóm chặt; nắm bắt (cơ hội, nội dung)",
      use: "Nắm chặt trong cả bàn tay (腕をつかむ). Nghĩa bóng: nắm được cơ hội, bí quyết, lòng người (チャンスをつかむ, 心をつかむ).",
      col: ["腕をつかむ", "チャンスをつかむ", "人の心をつかむ", "要点をつかむ"],
      ex: [
        ["転びそうになって、手すりを[[つかんだ]]。", "Suýt ngã nên tôi bám chặt tay vịn."],
        ["彼の歌は若者の心を[[つかんだ]]。", "Bài hát của anh ấy đã chiếm được trái tim giới trẻ."],
      ],
      cmp: [["にぎる", "握る: nắm (trong lòng bàn tay, như nắm tay). つかむ: chộp lấy, tóm chặt — có lực và tốc độ."]],
      memo: "Chữ Hán 掴む. Hình dung bàn tay \"tóm\" con cá đang quẫy — つかむ!",
    },
    {
      no: 109, w: "ねじれる", r: "ねじれる", p: "が", pos: "verb", m: "bị xoắn, bị vặn; (tính cách) méo mó",
      use: "Tự động từ của ねじる: bị xoắn lại (コード, ネクタイ). Nghĩa bóng: tình trạng lệch lạc (ねじれ国会).",
      col: ["コードがねじれる", "ネクタイがねじれる", "ねじれた性格"],
      ex: [
        ["電話のコードが[[ねじれて]]しまった。", "Dây điện thoại bị xoắn lại."],
        ["ネクタイが[[ねじれて]]いますよ。", "Cà vạt của anh bị xoắn kìa."],
      ],
      memo: "Cặp tự–tha: ねじる (vặn) → ねじれる (bị vặn). Giống ちぎる → ちぎれる.",
    },
    {
      no: 110, w: "ねじる", r: "ねじる", p: "を", pos: "verb", m: "xoắn, vặn",
      use: "Vặn xoắn vật bằng hai tay theo hai chiều ngược nhau, hoặc vặn người (体をねじる).",
      col: ["体をねじる", "タオルをねじる", "ねじ（ốc vít）"],
      ex: [
        ["ぬれたタオルを[[ねじって]]水を絞った。", "Tôi vặn khăn ướt để vắt nước."],
        ["体を[[ねじる]]ストレッチをしよう。", "Cùng tập động tác giãn cơ vặn người nào."],
      ],
      cmp: [["ひねる", "ひねる: vặn một chiều bằng đầu ngón tay (vòi nước). ねじる: xoắn mạnh, hai đầu ngược chiều."]],
      memo: "ねじ = con ốc vít — thứ được \"vặn\". ねじる = vặn như vặn ốc.",
    },
    {
      no: 111, w: "ひねる", r: "ひねる", p: "を", pos: "verb", m: "vặn (vòi, núm); trẹo; vắt óc suy nghĩ",
      use: "Vặn xoay bằng đầu ngón tay (蛇口をひねる); bị trẹo (足首をひねる); 頭をひねる = vắt óc suy nghĩ; 首をひねる = nghiêng đầu nghi hoặc.",
      col: ["蛇口をひねる", "足首をひねる", "頭をひねる", "首をひねる"],
      ex: [
        ["蛇口を[[ひねる]]と、お湯が出た。", "Vặn vòi là nước nóng chảy ra."],
        ["いいアイデアがないか、頭を[[ひねった]]。", "Tôi vắt óc xem có ý tưởng hay nào không."],
      ],
      memo: "首をひねる (vặn cổ) = nghiêng đầu khó hiểu 🤔; 頭をひねる = \"vặn não\".",
    },
    {
      no: 112, w: "ちぎれる", r: "ちぎれる", p: "が", pos: "verb", m: "bị đứt, bị rách rời ra",
      use: "Tự động từ: bị đứt, rách thành mảnh do lực kéo (ボタンがちぎれる). ちぎれんばかりに = như muốn đứt (vẫy tay).",
      col: ["ボタンがちぎれる", "ちぎれるほど手を振る"],
      ex: [
        ["満員電車でコートのボタンが[[ちぎれた]]。", "Trên tàu đông người, cúc áo khoác bị đứt."],
        ["子供たちは手が[[ちぎれる]]ほど振っていた。", "Lũ trẻ vẫy tay như muốn đứt cả tay."],
      ],
      memo: "ちぎる (xé) → ちぎれる (bị đứt). Nhớ cặp này cùng ねじる/ねじれる.",
    },
    {
      no: 113, w: "ちぎる", r: "ちぎる", p: "を", pos: "verb", m: "xé (bằng tay) thành miếng nhỏ",
      use: "Dùng tay xé vật mềm thành miếng nhỏ (パン, 紙, レタス).",
      col: ["パンをちぎる", "紙をちぎる", "レタスを手でちぎる"],
      ex: [
        ["パンを小さく[[ちぎって]]鳥にあげた。", "Tôi xé bánh mì thành miếng nhỏ cho chim ăn."],
        ["レタスは包丁を使わず、手で[[ちぎる]]とおいしい。", "Rau xà lách xé bằng tay thay vì dùng dao sẽ ngon hơn."],
      ],
      cmp: [["破る", "破る: xé rách (giấy, vải — làm hỏng). ちぎる: xé nhỏ thành miếng, thường có chủ đích."]],
      memo: "\"CHI-GI\" như tiếng xé \"xoẹt xoẹt\" từng miếng nhỏ.",
    },
    {
      no: 114, w: "束ねる", r: "たばねる", p: "を", pos: "verb", hv: "THÚC", m: "bó lại, buộc thành bó; thống lĩnh",
      use: "Gom nhiều vật dài/mỏng buộc thành bó (髪, 新聞, 花). Nghĩa bóng: lãnh đạo, thống lĩnh tập thể (チームを束ねる).",
      col: ["髪を束ねる", "新聞を束ねる", "組織を束ねる"],
      ex: [
        ["古新聞をひもで[[束ねて]]出した。", "Tôi lấy dây bó báo cũ lại rồi đem bỏ."],
        ["彼女は百人の社員を[[束ねる]]リーダーだ。", "Cô ấy là người lãnh đạo thống lĩnh một trăm nhân viên."],
      ],
      memo: "束 (bó) = 木 (cây) bị buộc dây ngang (口). 花束 = bó hoa.",
    },
    {
      no: 115, w: "扇ぐ", r: "あおぐ", p: "を", pos: "verb", hv: "PHIẾN", m: "quạt (bằng quạt tay)",
      use: "Dùng quạt tay, giấy… tạo gió (うちわで扇ぐ). Đồng âm 仰ぐ (ngước nhìn, tôn làm).",
      col: ["うちわで扇ぐ", "顔を扇ぐ", "火を扇ぐ"],
      ex: [
        ["暑いので下敷きで顔を[[扇いだ]]。", "Nóng quá nên tôi lấy tấm lót quạt mặt."],
        ["炭火をうちわで[[扇いで]]強くした。", "Tôi quạt than cho lửa to hơn."],
      ],
      cmp: [["仰ぐ", "Đồng âm あおぐ: 仰ぐ = ngước nhìn (空を仰ぐ), tôn làm (師と仰ぐ)."]],
      memo: "扇 = 戸 (cánh cửa) + 羽 (lông vũ) — chiếc quạt lông như cánh cửa đóng mở.",
    },
    {
      no: 116, w: "くむ", r: "くむ", p: "を", pos: "verb", m: "múc (nước); thông cảm, thấu hiểu (心情をくむ)",
      use: "Múc chất lỏng (水をくむ). Nghĩa bóng: thấu hiểu tâm tư (気持ちをくむ). Chữ Hán 汲む / 酌む.",
      col: ["水をくむ", "気持ちをくむ", "意図をくむ"],
      ex: [
        ["井戸から水を[[くんだ]]。", "Tôi múc nước từ giếng."],
        ["相手の気持ちを[[くんで]]、何も言わなかった。", "Hiểu thấu tâm tư người kia nên tôi chẳng nói gì."],
      ],
      cmp: [["組む", "Đồng âm くむ: 組む = khoanh (tay), lập (nhóm). 汲む = múc."]],
      memo: "Múc nước từ giếng sâu — cũng như \"múc\" tâm tư từ đáy lòng người khác.",
    },
    {
      no: 117, w: "くわえる", r: "くわえる", p: "を", pos: "verb", m: "ngậm (ở miệng), cắn giữ",
      use: "Giữ vật bằng miệng (không nuốt): タバコをくわえる, 犬が骨をくわえる. 指をくわえて見る = đứng nhìn thèm thuồng mà bất lực.",
      col: ["タバコをくわえる", "骨をくわえる", "指をくわえて見る"],
      ex: [
        ["犬がボールを[[くわえて]]戻ってきた。", "Con chó ngậm quả bóng chạy về."],
        ["指を[[くわえて]]見ているだけではだめだ。", "Không thể chỉ đứng nhìn suông mà không làm gì."],
      ],
      cmp: [["加える", "Đồng âm くわえる: 加える = thêm vào. 咥える (くわえる) = ngậm."]],
      memo: "Hình dung con chó \"khư khư\" ngậm khúc xương — くわえる.",
    },
    {
      no: 118, w: "なめる", r: "なめる", p: "を", pos: "verb", m: "liếm, ngậm (kẹo); coi thường",
      use: "Liếm bằng lưỡi (アイスをなめる, あめをなめる). Nghĩa bóng: coi thường, xem nhẹ (相手をなめる, 試験をなめる).",
      col: ["あめをなめる", "相手をなめる", "なめるなよ"],
      ex: [
        ["子供がアイスを[[なめて]]いる。", "Đứa bé đang liếm que kem."],
        ["相手が弱いと[[なめて]]いたら、負けてしまった。", "Coi thường đối thủ yếu nên đã thua."],
      ],
      memo: "Chữ Hán 舐める (có bộ 舌 lưỡi). \"Liếm\" qua loa → xem nhẹ người khác.",
    },
  ],
  quiz: [
    {
      type: "choice",
      label: "Phân biệt",
      q: "痛そうにしている子供の背中を優しく＿＿＿。",
      opts: ["さすった", "こすった", "ちぎった", "ねじった"],
      answer: 0,
      explain: "Xoa nhẹ để giảm đau → さする. こする là chà mạnh.",
    },
    {
      type: "choice",
      label: "Dùng từ đúng (用法)",
      q: "「つかむ」の使い方が正しい文はどれか。",
      opts: [
        "彼は少ないチャンスをつかんで成功した。",
        "風邪をつかんで、学校を休んだ。",
        "毎朝コーヒーをつかんでいる。",
        "彼女は歌をつかむのが上手だ。",
      ],
      answer: 0,
      explain: "チャンスをつかむ = nắm bắt cơ hội. Bị cảm là 風邪をひく.",
    },
    {
      type: "choice",
      label: "Chọn từ thích hợp",
      q: "どうすれば売り上げが伸びるか、みんなで頭を＿＿＿。",
      opts: ["ひねった", "なでた", "なめた", "くわえた"],
      answer: 0,
      explain: "頭をひねる = vắt óc suy nghĩ.",
    },
    {
      type: "choice",
      label: "Từ gần nghĩa (言い換え)",
      q: "あのチームは私たちを[[なめて]]いる。",
      opts: ["軽く見て", "尊敬して", "怖がって", "応援して"],
      answer: 0,
      explain: "なめる (nghĩa bóng) = coi thường, xem nhẹ.",
    },
    {
      type: "judge",
      q: "引っ張ったら、シャツのボタンがちぎった。",
      ok: false,
      explain: "Chủ ngữ là cái cúc (tự đứt) → dùng tự động từ ちぎれる với が.",
      fix: "引っ張ったら、シャツのボタンがちぎれた。",
    },
  ],
  kanji: {
    摘: { hv: "TRÍCH", m: "hái, chỉ ra", memo: "扌(tay) — tay ngắt lấy; 指摘 = chỉ ra." },
    束: { hv: "THÚC", m: "bó, buộc", memo: "木 (cây) bị buộc lại." },
    扇: { hv: "PHIẾN", m: "cái quạt", memo: "戸 (cửa) + 羽 (lông vũ)." },
  },
};
