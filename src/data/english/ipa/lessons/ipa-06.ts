import type { IpaLesson } from "../types";

export const ipa06: IpaLesson = {
  id: "ipa-06",
  num: 6,
  title: "ʊ và uː — full hay fool?",
  mark: "ʊ · uː",
  level: "Cơ bản",
  group: "Nguyên âm đơn",
  intro:
    "Hai âm \"u\" của tiếng Anh: /ʊ/ ngắn, môi thả lỏng như \"u\" nói vội; /uː/ dài, môi tròn chu ra như thổi nến. Người Việt hay đọc cả hai bằng \"u\" tiếng Việt nên \"full\" (no, đầy) và \"fool\" (kẻ ngốc), \"pull\" (kéo) và \"pool\" (bể bơi) nghe như nhau — dễ thành chuyện cười.",
  phonemes: [
    {
      id: "u-short",
      symbol: "ʊ",
      kind: "short-vowel",
      name: "u ngắn",
      keyword: { w: "book", ipa: "bʊk", vi: "quyển sách" },
      viLike:
        "Giống \"u\" trong \"cúp\", \"núp\" nhưng ngắn hơn và lỏng hơn — môi chỉ hơi tròn, nghe hơi ngả về \"ư\". Không chu môi.",
      how: [
        "Môi: hơi tròn nhẹ, thả lỏng, KHÔNG chu ra.",
        "Lưỡi: lùi về phía sau và nâng khá cao, nhưng thấp hơn và lỏng hơn /uː/.",
        "Hàm: gần khép, hơi mở hơn /uː/ một chút.",
        "Độ dài: rất ngắn, dứt khoát.",
        "Dây thanh rung; cơ môi và má thả lỏng hoàn toàn.",
      ],
      vowel: { x: 0.8, y: 0.16, round: true },
      spellings: [
        { pattern: "oo (thường trước k, d, t)", words: ["book", "look", "cook", "good", "foot", "wood"] },
        { pattern: "u (sau p, b, f, sh…)", words: ["put", "push", "pull", "full", "bush", "sugar"] },
        { pattern: "ould (l câm)", words: ["could", "would", "should"] },
        { pattern: "o (ngoại lệ)", words: ["woman", "wolf", "bosom"] },
      ],
      words: [
        { w: "book", ipa: "bʊk", vi: "quyển sách" },
        { w: "good", ipa: "ɡʊd", vi: "tốt" },
        { w: "look", ipa: "lʊk", vi: "nhìn" },
        { w: "put", ipa: "pʊt", vi: "đặt, để" },
        { w: "full", ipa: "fʊl", vi: "đầy, no" },
        { w: "could", ipa: "kʊd", vi: "có thể (quá khứ)" },
        { w: "woman", ipa: "ˈwʊm.ən", vi: "người phụ nữ" },
        { w: "sugar", ipa: "ˈʃʊɡ.ə", vi: "đường" },
      ],
      sentences: [
        { en: "[[Look]] at this [[good]] [[cookbook]]!", vi: "Nhìn quyển sách dạy nấu ăn hay này!", ipa: "lʊk ət ðɪs ɡʊd ˈkʊk.bʊk" },
        { en: "[[Could]] you [[put]] some [[sugar]] in it?", vi: "Bạn có thể cho chút đường vào không?" },
        { en: "The [[woman]] [[stood]] by the [[wood]] and [[took]] a [[look]].", vi: "Người phụ nữ đứng cạnh khu rừng nhỏ và nhìn một lượt." },
      ],
      pairs: [
        { a: { w: "full", ipa: "fʊl", vi: "đầy, no" }, b: { w: "fool", ipa: "fuːl", vi: "kẻ ngốc" } },
        { a: { w: "pull", ipa: "pʊl", vi: "kéo" }, b: { w: "pool", ipa: "puːl", vi: "bể bơi" } },
        { a: { w: "look", ipa: "lʊk", vi: "nhìn" }, b: { w: "Luke", ipa: "luːk", vi: "Luke (tên người)" } },
        { a: { w: "hood", ipa: "hʊd", vi: "mũ trùm đầu" }, b: { w: "who'd", ipa: "huːd", vi: "ai sẽ / ai đã" } },
        { a: { w: "should", ipa: "ʃʊd", vi: "nên" }, b: { w: "shoed", ipa: "ʃuːd", vi: "đã đóng móng (ngựa)" } },
      ],
      mistakes: [
        "Chu môi và kéo dài như \"u\" tiếng Việt → \"full\" nghe thành \"fool\", \"pull\" thành \"pool\". Thả lỏng môi, nói ngắn.",
        "Đọc chữ l trong \"could\", \"would\", \"should\": l câm — /kʊd/, /wʊd/, /ʃʊd/.",
        "Đọc \"put\" thành /pʌt/ theo kiểu \"but\", hoặc \"woman\" thành \"wô-men\". Đúng là /pʊt/, /ˈwʊm.ən/ (còn \"women\" là /ˈwɪm.ɪn/).",
      ],
      tips: [
        "Nói \"u\" tiếng Việt thật nhanh, như đang mệt và lười cử động môi — ra /ʊ/.",
        "Soi gương: với /ʊ/ môi gần như không chu; với /uː/ môi chu tròn rõ.",
        "Luyện chuỗi \"full – fool – full – fool\" và \"pull – pool\": thay đổi cả độ dài lẫn độ tròn môi.",
      ],
      memo: "Ký hiệu ʊ giống hình móng ngựa — cái miệng mở lỏng, không chu. Từ khóa: \"book\" — mở sách đọc nhanh một chữ: /bʊk/.",
      usUk: "Anh và Mỹ đọc giống nhau. Một số từ có \"oo\" + r như \"poor\", \"tour\" — giọng Anh hiện đại thường đọc /ɔː/, giọng Mỹ /ʊr/.",
    },
    {
      id: "u-long",
      symbol: "uː",
      kind: "long-vowel",
      name: "u dài",
      keyword: { w: "food", ipa: "fuːd", vi: "đồ ăn" },
      viLike:
        "Giống \"u\" trong \"bú\", \"thu\" của tiếng Việt nhưng kéo dài gấp đôi và môi tròn, chu ra nhiều hơn — như đang huýt sáo hoặc thổi nến.",
      how: [
        "Môi: tròn nhỏ và chu ra phía trước như thổi nến.",
        "Lưỡi: lùi về sau và nâng cao, cuống lưỡi gần chạm vòm mềm.",
        "Hàm: gần khép.",
        "Độ dài: kéo dài \"uuu\" — dấu ː nghĩa là âm DÀI.",
        "Cơ môi căng; giữ môi tròn đến hết âm, không để trượt thành \"uy\" hay \"ư\".",
      ],
      vowel: { x: 0.96, y: 0.02, round: true },
      spellings: [
        { pattern: "oo", words: ["food", "moon", "school", "room", "too"] },
        { pattern: "u-e / u / ue", words: ["rule", "June", "true", "blue"] },
        { pattern: "ew", words: ["flew", "grew", "crew", "new"] },
        { pattern: "ou", words: ["soup", "group", "you", "through"] },
        { pattern: "o (ngoại lệ)", words: ["do", "who", "two", "move", "lose"] },
        { pattern: "ui", words: ["fruit", "juice", "suit"] },
      ],
      words: [
        { w: "too", ipa: "tuː", vi: "cũng, quá" },
        { w: "food", ipa: "fuːd", vi: "đồ ăn" },
        { w: "blue", ipa: "bluː", vi: "màu xanh dương" },
        { w: "school", ipa: "skuːl", vi: "trường học" },
        { w: "move", ipa: "muːv", vi: "di chuyển" },
        { w: "fruit", ipa: "fruːt", vi: "trái cây" },
        { w: "choose", ipa: "tʃuːz", vi: "chọn" },
        { w: "beautiful", ipa: "ˈbjuː.tɪ.fəl", vi: "đẹp" },
      ],
      sentences: [
        { en: "[[Who]] [[moved]] my [[blue]] [[shoes]]?", vi: "Ai đã dời đôi giày xanh của tôi?", ipa: "huː muːvd maɪ bluː ʃuːz" },
        { en: "[[You]] can [[choose]] [[soup]] or [[fruit]] [[juice]].", vi: "Bạn có thể chọn súp hoặc nước ép trái cây." },
        { en: "We [[flew]] to [[Cuba]] in [[June]] — the [[view]] was [[beautiful]].", vi: "Chúng tôi bay đến Cuba vào tháng Sáu — cảnh đẹp tuyệt vời." },
      ],
      pairs: [
        { a: { w: "fool", ipa: "fuːl", vi: "kẻ ngốc" }, b: { w: "full", ipa: "fʊl", vi: "đầy, no" } },
        { a: { w: "pool", ipa: "puːl", vi: "bể bơi" }, b: { w: "pull", ipa: "pʊl", vi: "kéo" } },
        { a: { w: "Luke", ipa: "luːk", vi: "Luke (tên người)" }, b: { w: "look", ipa: "lʊk", vi: "nhìn" } },
        { a: { w: "who'd", ipa: "huːd", vi: "ai sẽ / ai đã" }, b: { w: "hood", ipa: "hʊd", vi: "mũ trùm đầu" } },
        { a: { w: "suit", ipa: "suːt", vi: "bộ com-lê" }, b: { w: "soot", ipa: "sʊt", vi: "bồ hóng" } },
      ],
      mistakes: [
        "Đọc ngắn như \"u\" tiếng Việt → \"pool\" nghe thành \"pull\", \"fool\" thành \"full\". Kéo dài và chu môi.",
        "Đọc \"ui\" theo mặt chữ: \"fruit\" thành \"phờ-ruýt\", \"juice\" thành \"giuýt\". Đúng là /fruːt/, /dʒuːs/ — không có âm \"i\".",
        "Nuốt phụ âm cuối: \"food\" thành \"phu\", \"school\" thành \"xờ-cu\". Giữ /d/, /l/ cuối.",
      ],
      tips: [
        "Thổi tắt một ngọn nến tưởng tượng, rồi cho tiếng vào: \"uuu\" — đó là /uː/.",
        "Đếm nhịp: /uː/ 2 nhịp, /ʊ/ nửa nhịp. Luyện \"pool – pull – pool – pull\".",
        "Để ý chữ u đọc /juː/ (có \"j\" chen vào): music /ˈmjuː.zɪk/, use /juːz/, cute /kjuːt/, beautiful /ˈbjuː.tɪ.fəl/.",
      ],
      memo: "Ký hiệu u giống cái miệng tròn há lên, dấu ː kéo dài → \"uuu\" dài như tiếng gió. Từ khóa: \"food\" — thấy đồ ăn ngon, chu môi \"uuu\": /fuːd/.",
      usUk: "Giọng Anh thường giữ /j/ sau t, d, n: new /njuː/, student /ˈstjuː.dənt/, Tuesday /ˈtʃuːz.deɪ/. Giọng Mỹ bỏ /j/: new /nuː/, student /ˈstuː.dənt/, Tuesday /ˈtuːz.deɪ/.",
    },
  ],
  rules: [
    {
      title: "\"oo\": thường /uː/, nhưng trước k (và vài từ) là /ʊ/",
      body:
        "Chữ \"oo\" đa số đọc /uː/: food, moon, school, room, soon. Nhưng trước k hầu như luôn là /ʊ/: book, look, cook, took, hook. Ngoài ra nhớ nhóm /ʊ/: good, foot, wood, wool, stood, hood. Và hai ngoại lệ đọc /ʌ/: blood, flood.",
      examples: [
        { w: "room", ipa: "ruːm", vi: "căn phòng" },
        { w: "took", ipa: "tʊk", vi: "đã lấy" },
        { w: "foot", ipa: "fʊt", vi: "bàn chân" },
        { w: "blood", ipa: "blʌd", vi: "máu" },
      ],
      sentences: [
        { en: "[[Look]], the [[food]] is [[good]] and the [[room]] is [[cool]].", vi: "Nhìn này, đồ ăn ngon và phòng mát mẻ." },
      ],
    },
    {
      title: "could / would / should: l câm, nguyên âm /ʊ/",
      body:
        "Ba động từ khuyết thiếu này đọc /kʊd/, /wʊd/, /ʃʊd/ — không có /l/, không phải \"âu\". Trong câu nói nhanh, chúng thường còn yếu đi thành /kəd/, /wəd/, /ʃəd/. Lưu ý \"would\" và \"wood\" đọc giống hệt nhau: /wʊd/.",
      examples: [
        { w: "could", ipa: "kʊd", vi: "có thể (quá khứ)" },
        { w: "would", ipa: "wʊd", vi: "sẽ (quá khứ)" },
        { w: "should", ipa: "ʃʊd", vi: "nên" },
        { w: "wood", ipa: "wʊd", vi: "gỗ (đồng âm với would)" },
      ],
      sentences: [
        { en: "You [[should]] [[look]] at this [[book]].", vi: "Bạn nên xem quyển sách này." },
      ],
    },
    {
      title: "Chữ u đọc /juː/ — có âm \"j\" chen vào",
      body:
        "Ở đầu từ và sau nhiều phụ âm (b, c, f, h, m, p…), chữ u và ew đọc /juː/ chứ không chỉ /uː/: use, music, cute, human, few, pupil, computer. Riêng sau t, d, n, s… giọng Anh vẫn giữ /j/ (new /njuː/), còn giọng Mỹ thường bỏ (new /nuː/). Sau r, l, ch, j thì không có /j/: rule, blue, June, chew.",
      examples: [
        { w: "music", ipa: "ˈmjuː.zɪk", vi: "âm nhạc" },
        { w: "few", ipa: "fjuː", vi: "ít" },
        { w: "computer", ipa: "kəmˈpjuː.tə", vi: "máy tính" },
        { w: "student", ipa: "ˈstjuː.dənt", vi: "học sinh (US: ˈstuː.dənt)" },
      ],
    },
    {
      title: "Chữ o đọc /uː/: do, who, two, move, lose, prove",
      body:
        "Một nhóm nhỏ nhưng xuất hiện liên tục trong hội thoại: do, to, who, two, whose, move, lose, prove, shoe, tomb. Người Việt hay đọc theo mặt chữ thành \"ô\" (\"lose\" thành \"lâu\", \"move\" thành \"mâu-v\"). Lưu ý: lose /luːz/ (mất) khác loose /luːs/ (lỏng) ở âm cuối.",
      examples: [
        { w: "who", ipa: "huː", vi: "ai" },
        { w: "two", ipa: "tuː", vi: "số hai" },
        { w: "lose", ipa: "luːz", vi: "mất, thua" },
        { w: "loose", ipa: "luːs", vi: "lỏng" },
      ],
    },
  ],
  story: {
    title: "Bể bơi hay cái kéo?",
    paras: [
      {
        en: "In [[June]], Mrs Brown's house was [[too]] hot, so Tom said, \"Let's go to the [[pool]] after work. It's [[cool]] and there's [[good]] [[food]] nearby.\"",
        vi: "Tháng Sáu, nhà bà Brown nóng quá, nên Tom bảo: \"Tan làm đi bể bơi đi. Ở đó mát, lại có đồ ăn ngon gần đó.\"",
      },
      {
        en: "At the door, Linh saw a sign and [[pushed]] it hard. It didn't [[move]]. A lifeguard smiled: \"[[Pull]], not [[push]]!\" Linh blushed — she had read [[pull]] as [[pool]] and thought it said \"swimming here\".",
        vi: "Ở cửa, Linh thấy một tấm biển và đẩy thật mạnh. Cửa không nhúc nhích. Anh cứu hộ mỉm cười: \"Kéo, đừng đẩy!\" Linh đỏ mặt — cô đã đọc \"pull\" thành \"pool\" và tưởng biển ghi \"bơi ở đây\".",
      },
      {
        en: "After swimming, she ate a huge plate of [[noodles]] and said, \"I'm so [[fool]]!\" Tom almost dropped his [[spoon]]. \"You mean [[full]]! Short and lazy for [[full]], long and round for [[fool]].\"",
        vi: "Bơi xong, cô ăn một đĩa mì to và nói: \"Em ngốc quá!\" Tom suýt đánh rơi thìa: \"Ý em là 'no' chứ! 'Full' ngắn và lười, 'fool' dài và tròn môi.\"",
      },
      {
        en: "That night Jake called: \"[[Who]] [[would]] [[choose]] a [[pool]] over the beach?\" Linh laughed and [[took]] out her [[notebook]]: \"[[full]] – [[fool]], [[pull]] – [[pool]], [[look]] – [[Luke]]. I [[should]] practise!\"",
        vi: "Tối đó Jake gọi: \"Ai lại chọn bể bơi thay vì bãi biển chứ?\" Linh bật cười và lấy sổ ra: \"full – fool, pull – pool, look – Luke. Mình phải luyện thôi!\"",
      },
    ],
  },
  twister: {
    en: "Good cooks should choose cool blue spoons for food.",
    vi: "Đầu bếp giỏi nên chọn những chiếc thìa xanh mát cho món ăn. (Ba từ /ʊ/ rồi năm từ /uː/.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "pool",
      opts: ["pool /puːl/", "pull /pʊl/"],
      answer: 0,
      explain: "pool /puːl/ — dài, môi chu tròn. pull /pʊl/ ngắn, môi thả lỏng.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy câu nào?",
      say: "The glass is full.",
      opts: ["The glass is full. /fʊl/", "The glass is fool. /fuːl/"],
      answer: 0,
      explain: "full /fʊl/ — đầy, âm ngắn và lỏng. fool /fuːl/ — kẻ ngốc, âm dài.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Từ nào chứa âm /ʊ/?",
      opts: ["cook", "food", "moon", "blue"],
      answer: 0,
      explain: "cook /kʊk/ — \"oo\" trước k đọc /ʊ/. food, moon, blue đều có /uː/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Chữ \"oo\" trong từ nào đọc là /ʌ/?",
      opts: ["blood", "book", "school", "good"],
      answer: 0,
      explain: "blood /blʌd/ — ngoại lệ (cùng với flood). book, good có /ʊ/; school có /uː/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm đúng của \"fruit\" là?",
      opts: ["/fruːt/", "/fruɪt/", "/frʊt/", "/fraɪt/"],
      answer: 0,
      explain: "fruit /fruːt/ — \"ui\" đọc /uː/, không có âm \"i\".",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm đúng của \"would\" là?",
      opts: ["/wʊd/", "/wuːld/", "/wəʊld/", "/waʊd/"],
      answer: 0,
      explain: "would /wʊd/ — l câm, nguyên âm ngắn /ʊ/. Đọc giống hệt \"wood\".",
    },
    {
      type: "judge",
      q: "Trong giọng Anh, \"new\" thường được đọc là /njuː/, có âm /j/ chen vào.",
      ok: true,
      explain: "Đúng. Giọng Anh: new /njuː/. Giọng Mỹ thường bỏ /j/: /nuː/.",
    },
  ],
};
