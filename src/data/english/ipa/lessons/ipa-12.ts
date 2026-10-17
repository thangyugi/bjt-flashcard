import type { IpaLesson } from "../types";

export const ipa12: IpaLesson = {
  id: "ipa-12",
  num: 12,
  title: "/k/ và /ɡ/ — coat hay goat?",
  mark: "k · ɡ",
  level: "Trung cấp",
  group: "Phụ âm",
  intro:
    "Hai âm cuống lưỡi này có tới hàng chục cách viết: c, k, ck, ch, qu, x, g, gu, gh… nên người Việt hay đọc theo mặt chữ và sai. Thêm nữa, \"g\" tiếng Việt là âm xát còn /ɡ/ tiếng Anh là âm tắc, và âm cuối /k/ /ɡ/ thường bị nuốt khiến \"back\" và \"bag\" nghe như nhau.",
  phonemes: [
    {
      id: "k",
      symbol: "k",
      kind: "consonant",
      name: "k bật hơi",
      keyword: { w: "key", ipa: "kiː", vi: "chìa khóa" },
      viLike:
        "Cùng vị trí với \"c/k\" tiếng Việt (ca, kê) nhưng đầu âm tiết nhấn phải bật hơi mạnh — nghe gần \"kh\" song KHÔNG xát như \"kh\" Việt (\"khá\"). Cuối từ phải thả nhẹ ra, không nuốt như \"c\" trong \"các\", \"học\".",
      how: [
        "Lưỡi: nâng cuống lưỡi (phần sau) chạm vào ngạc mềm ở cuối vòm miệng.",
        "Hơi: chặn kín luồng hơi phía sau chỗ tiếp xúc.",
        "Bật: hạ cuống lưỡi đột ngột cho hơi bật ra.",
        "Dây thanh: không rung (vô thanh).",
        "Đầu âm tiết nhấn (key, cat): bật hơi mạnh [kʰ]; sau s (school, sky) không bật hơi; cuối từ (back) thả nhẹ.",
      ],
      consonant: { place: "ngạc mềm", manner: "âm tắc (bật)", voiced: false },
      spellings: [
        { pattern: "c (trước a, o, u hoặc phụ âm)", words: ["cat", "cold", "cup", "class"] },
        { pattern: "k (trước e, i, y)", words: ["key", "kind", "kitchen", "sky"] },
        { pattern: "ck (sau nguyên âm ngắn)", words: ["back", "clock", "ticket", "chicken"] },
        { pattern: "ch (gốc Hy Lạp)", words: ["school", "chemistry", "stomach", "character"] },
        { pattern: "qu = /kw/, -que = /k/", words: ["queen", "quick", "question", "unique"] },
        { pattern: "x = /ks/", words: ["six", "box", "taxi", "next"] },
      ],
      words: [
        { w: "key", ipa: "kiː", vi: "chìa khóa" },
        { w: "cat", ipa: "kæt", vi: "con mèo" },
        { w: "book", ipa: "bʊk", vi: "quyển sách" },
        { w: "school", ipa: "skuːl", vi: "trường học" },
        { w: "kitchen", ipa: "ˈkɪtʃ.ɪn", vi: "nhà bếp" },
        { w: "question", ipa: "ˈkwes.tʃən", vi: "câu hỏi" },
        { w: "chemistry", ipa: "ˈkem.ɪ.stri", vi: "hóa học" },
        { w: "character", ipa: "ˈkær.ək.tə", vi: "nhân vật, tính cách" },
      ],
      sentences: [
        { en: "[[Kate]] [[can]] [[cook]] [[chicken]] [[curry]].", vi: "Kate biết nấu cà ri gà.", ipa: "keɪt kən kʊk ˈtʃɪk.ɪn ˈkʌr.i" },
        { en: "[[Take]] [[six]] [[cakes]] to the [[kitchen]].", vi: "Mang sáu cái bánh vào bếp." },
        { en: "The [[school]] [[clock]] is [[quick]].", vi: "Đồng hồ ở trường chạy nhanh." },
      ],
      pairs: [
        { a: { w: "coat", ipa: "kəʊt", vi: "áo khoác" }, b: { w: "goat", ipa: "ɡəʊt", vi: "con dê" } },
        { a: { w: "cold", ipa: "kəʊld", vi: "lạnh" }, b: { w: "gold", ipa: "ɡəʊld", vi: "vàng" } },
        { a: { w: "class", ipa: "klɑːs", vi: "lớp học" }, b: { w: "glass", ipa: "ɡlɑːs", vi: "cái cốc thủy tinh" } },
        { a: { w: "back", ipa: "bæk", vi: "phía sau" }, b: { w: "bag", ipa: "bæɡ", vi: "cái túi" } },
        { a: { w: "pick", ipa: "pɪk", vi: "nhặt, chọn" }, b: { w: "pig", ipa: "pɪɡ", vi: "con lợn" } },
        { a: { w: "card", ipa: "kɑːd", vi: "tấm thẻ" }, b: { w: "guard", ipa: "ɡɑːd", vi: "bảo vệ" } },
      ],
      mistakes: [
        "Không bật hơi ở đầu từ → \"coat\" nghe thành \"goat\", \"class\" thành \"glass\".",
        "Nuốt /k/ cuối như \"c\" trong \"học\" → \"book\" nghe như \"bu\", \"back\" lẫn với \"bag\". Phải thả nhẹ cuống lưỡi.",
        "Đọc ch gốc Hy Lạp thành /tʃ/: \"school\" thành \"s-chun\", \"chemistry\" thành \"che-mít-try\". Đúng: /skuːl/, /ˈkem.ɪ.stri/.",
      ],
      tips: [
        "Thử tờ giấy như với /p/: nói \"key\" — giấy phải lay; nói \"ski\" — giấy gần như đứng yên.",
        "Khi gặp \"ch\" trong từ khoa học, y học, âm nhạc (chemistry, stomach, orchestra, choir), nghĩ ngay tới /k/.",
        "\"qu\" luôn có /w/ đi kèm: \"quick\" là /kw/ + /ɪk/ — tròn môi ngay khi bật /k/.",
      ],
      memo: "Chữ k trông như cái chân đá ra — cuống lưỡi \"đá\" hơi bật ra từ cuối miệng. Từ khóa: \"key\" — chìa khóa mở cửa họng: /kiː/.",
      usUk:
        "Phát âm /k/ giống nhau. Một số từ khác nhau: \"schedule\" Anh /ˈʃedʒ.uːl/, Mỹ /ˈskedʒ.uːl/. Chính tả: Anh \"cheque\" — Mỹ \"check\" (đều /tʃek/).",
    },
    {
      id: "g",
      symbol: "ɡ",
      kind: "consonant",
      name: "g tắc",
      keyword: { w: "go", ipa: "ɡəʊ", vi: "đi" },
      viLike:
        "\"g\" tiếng Việt (ga, gà, gỗ) là âm XÁT — cuống lưỡi chỉ tiến gần ngạc mềm, hơi lách qua khe hẹp. /ɡ/ tiếng Anh là âm TẮC — cuống lưỡi chạm KÍN rồi bật ra, giống /k/ nhưng có rung dây thanh. Gần với \"g\" khi người Việt nói thật dứt khoát \"gờ!\".",
      how: [
        "Lưỡi: cuống lưỡi chạm kín ngạc mềm — cùng vị trí với /k/.",
        "Dây thanh: rung từ đầu (hữu thanh).",
        "Bật: hạ cuống lưỡi nhẹ nhàng, không có luồng hơi mạnh.",
        "Không để hơi lách ra trước khi bật (đó là \"g\" tiếng Việt).",
        "Cuối từ (big, egg): chạm kín, giữ rung một chút rồi thả nhẹ; nguyên âm trước dài hơn so với /k/.",
      ],
      consonant: { place: "ngạc mềm", manner: "âm tắc (bật)", voiced: true },
      spellings: [
        { pattern: "g (trước a, o, u hoặc phụ âm)", words: ["go", "game", "good", "green"] },
        { pattern: "gg", words: ["egg", "bigger", "luggage", "jogging"] },
        { pattern: "gu (u câm giữ g cứng)", words: ["guess", "guest", "guide", "guitar"] },
        { pattern: "gh đầu từ", words: ["ghost", "spaghetti"] },
        { pattern: "-gue cuối từ", words: ["league", "dialogue", "catalogue"] },
        { pattern: "x = /ɡz/ (ex- trước nguyên âm nhấn)", words: ["exam", "example", "exact"] },
      ],
      words: [
        { w: "go", ipa: "ɡəʊ", vi: "đi" },
        { w: "big", ipa: "bɪɡ", vi: "to lớn" },
        { w: "egg", ipa: "eɡ", vi: "quả trứng" },
        { w: "again", ipa: "əˈɡen", vi: "lại, lần nữa" },
        { w: "guess", ipa: "ɡes", vi: "đoán" },
        { w: "guitar", ipa: "ɡɪˈtɑː", vi: "đàn ghi-ta" },
        { w: "language", ipa: "ˈlæŋ.ɡwɪdʒ", vi: "ngôn ngữ" },
        { w: "example", ipa: "ɪɡˈzɑːm.pəl", vi: "ví dụ" },
      ],
      sentences: [
        { en: "[[Give]] the [[girl]] a [[big]] [[green]] [[bag]].", vi: "Đưa cho cô bé một cái túi xanh lá to.", ipa: "ɡɪv ðə ɡɜːl ə bɪɡ ɡriːn bæɡ" },
        { en: "My [[guest]] [[forgot]] his [[guitar]].", vi: "Khách của tôi để quên cây đàn ghi-ta." },
        { en: "[[Good]] [[English]] needs [[good]] [[grammar]].", vi: "Tiếng Anh tốt cần ngữ pháp tốt." },
      ],
      pairs: [
        { a: { w: "goat", ipa: "ɡəʊt", vi: "con dê" }, b: { w: "coat", ipa: "kəʊt", vi: "áo khoác" } },
        { a: { w: "gold", ipa: "ɡəʊld", vi: "vàng" }, b: { w: "cold", ipa: "kəʊld", vi: "lạnh" } },
        { a: { w: "girl", ipa: "ɡɜːl", vi: "cô gái" }, b: { w: "curl", ipa: "kɜːl", vi: "lọn tóc xoăn" } },
        { a: { w: "bag", ipa: "bæɡ", vi: "cái túi" }, b: { w: "back", ipa: "bæk", vi: "phía sau" } },
        { a: { w: "pig", ipa: "pɪɡ", vi: "con lợn" }, b: { w: "pick", ipa: "pɪk", vi: "nhặt, chọn" } },
        { a: { w: "dog", ipa: "dɒɡ", vi: "con chó" }, b: { w: "dock", ipa: "dɒk", vi: "bến tàu" } },
      ],
      mistakes: [
        "Đọc /ɡ/ thành \"g\" xát tiếng Việt → nghe mềm và mờ: \"go\" thành \"gâu\" lơ lớ. Cuống lưỡi phải chặn kín.",
        "Nuốt /ɡ/ cuối hoặc biến nó thành /k/: \"bag\" nghe như \"back\", \"dog\" như \"dock\". Kéo dài nguyên âm và giữ rung.",
        "Bỏ /w/ hoặc /ɡ/ trong \"language\" (/ˈlæŋ.ɡwɪdʒ/) và nhầm \"finger\" /ˈfɪŋ.ɡə/ với \"singer\" /ˈsɪŋ.ə/ — \"finger\" CÓ /ɡ/, \"singer\" thì KHÔNG.",
      ],
      tips: [
        "Nói \"k\" rồi thêm tiếng rung cổ họng (tay đặt ở cổ): \"k → ɡ\", \"coat → goat\".",
        "Cuối từ, luyện cặp \"back — bag\", \"pick — pig\": từ có /ɡ/ nguyên âm kéo dài gần gấp rưỡi.",
        "Thấy \"gu\" trước e/i (guess, guide, guitar) thì chữ u câm — nó chỉ giữ cho g đọc cứng /ɡ/.",
      ],
      memo: "Ký hiệu ɡ là chữ g có móc đơn — móc như cái cuống lưỡi kéo lên chặn họng rồi buông. Từ khóa: \"go\" — \"Go!\" dứt khoát: /ɡəʊ/.",
      usUk:
        "Phát âm /ɡ/ giống nhau. Khác ở vài từ: \"garage\" Anh /ˈɡær.ɑːʒ/ hoặc /ˈɡær.ɪdʒ/, Mỹ /ɡəˈrɑːʒ/. Chính tả: Anh \"dialogue, catalogue\" — Mỹ thường viết \"dialog, catalog\".",
    },
  ],
  rules: [
    {
      title: "Sáu cách viết của /k/: c, k, ck, ch, q(u), x",
      body:
        "c đứng trước a, o, u hoặc phụ âm (cat, cold, cup, class). k đứng trước e, i, y (key, kind, sky) — vì c trước e, i sẽ đọc /s/. ck dùng ngay sau nguyên âm ngắn (back, neck, ticket). ch đọc /k/ trong từ gốc Hy Lạp (school, chemistry, stomach, technology, ache). q luôn đi với u và đọc /kw/ (queen, quiet); riêng đuôi -que đọc /k/ (unique, technique). x thường đọc /ks/ (six, box), nhưng ex- trước nguyên âm nhấn đọc /ɡz/ (exam, exact).",
      examples: [
        { w: "ticket", ipa: "ˈtɪk.ɪt", vi: "vé" },
        { w: "stomach", ipa: "ˈstʌm.ək", vi: "dạ dày" },
        { w: "technique", ipa: "tekˈniːk", vi: "kỹ thuật" },
        { w: "quiet", ipa: "ˈkwaɪ.ət", vi: "yên lặng" },
        { w: "exam", ipa: "ɪɡˈzæm", vi: "kỳ thi" },
      ],
    },
    {
      title: "Chữ k câm (know) và các chữ \"câm\" khác",
      body:
        "kn- ở đầu từ: chữ k câm, chỉ đọc /n/ — know, knee, knife, knock, knowledge. Tương tự gn đọc /n/: sign, design, foreign (g câm). gh giữa/cuối từ thường câm (night, high, daughter), nhưng gh đầu từ đọc /ɡ/ (ghost). Chú ý: \"know\" và \"no\" đọc giống hệt nhau /nəʊ/, \"knight\" và \"night\" cũng vậy.",
      examples: [
        { w: "know", ipa: "nəʊ", vi: "biết" },
        { w: "knife", ipa: "naɪf", vi: "con dao" },
        { w: "knowledge", ipa: "ˈnɒl.ɪdʒ", vi: "kiến thức" },
        { w: "sign", ipa: "saɪn", vi: "biển báo, ký" },
        { w: "foreign", ipa: "ˈfɒr.ən", vi: "nước ngoài" },
      ],
      sentences: [
        { en: "I [[know]] my [[knee]] hurts — don't [[knock]] it!", vi: "Tôi biết đầu gối tôi đau — đừng va vào nó!" },
      ],
    },
    {
      title: "c cứng /k/ và c mềm /s/",
      body:
        "c + a, o, u, phụ âm, hoặc cuối từ → c cứng /k/: cat, cost, cut, clean, music. c + e, i, y → c mềm /s/: centre, city, cycle, nice. Một từ có thể có cả hai: \"accept\" /əkˈsept/ (cc = /ks/), \"bicycle\" /ˈbaɪ.sɪ.kəl/, \"circle\" /ˈsɜː.kəl/. Quy luật này giúp bạn đoán đúng hơn 90% các từ mới.",
      examples: [
        { w: "cost", ipa: "kɒst", vi: "chi phí — c cứng" },
        { w: "city", ipa: "ˈsɪt.i", vi: "thành phố — c mềm" },
        { w: "circle", ipa: "ˈsɜː.kəl", vi: "hình tròn — mềm rồi cứng" },
        { w: "accept", ipa: "əkˈsept", vi: "chấp nhận — cc = /ks/" },
      ],
    },
    {
      title: "g cứng /ɡ/ và g mềm /dʒ/",
      body:
        "g + a, o, u, phụ âm → g cứng /ɡ/: game, go, gun, green. g + e, i, y → THƯỜNG là g mềm /dʒ/: gym, giant, page, orange, energy. Nhưng có nhiều ngoại lệ rất thông dụng vẫn đọc /ɡ/: get, give, girl, begin, together, gift, tiger, forget. Muốn giữ g cứng trước e/i, tiếng Anh chèn u câm (guess, guide) hoặc gấp đôi g (bigger, foggy).",
      examples: [
        { w: "gym", ipa: "dʒɪm", vi: "phòng tập — g mềm" },
        { w: "page", ipa: "peɪdʒ", vi: "trang — g mềm" },
        { w: "give", ipa: "ɡɪv", vi: "cho — ngoại lệ g cứng" },
        { w: "girl", ipa: "ɡɜːl", vi: "cô gái — ngoại lệ g cứng" },
        { w: "guide", ipa: "ɡaɪd", vi: "hướng dẫn — u câm giữ g cứng" },
      ],
    },
  ],
  story: {
    title: "Con dê trong tủ áo",
    paras: [
      {
        en: "The [[weekend]] was [[cold]], so Linh went to buy a winter [[coat]]. At the shop she said, \"I'm looking for a warm [[goat]].\" The shop assistant [[giggled]]: \"We don't sell [[goats]], love — but our [[coats]] are on the [[second]] floor.\"",
        vi: "Cuối tuần trời lạnh, Linh đi mua áo khoác mùa đông. Ở cửa hàng cô nói: \"Cháu đang tìm một con dê ấm áp.\" Cô bán hàng cười khúc khích: \"Ở đây không bán dê đâu cháu — nhưng áo khoác ở tầng hai nhé.\"",
      },
      {
        en: "On Monday she told Tom. He [[grinned]] and [[took]] out a [[pack]] of [[cards]]. \"[[Cold]] — [[gold]], [[class]] — [[glass]], [[back]] — [[bag]]. [[K]] is a [[kick]] of air; g is the same with a buzz in your throat.\"",
        vi: "Thứ Hai cô kể với Tom. Anh cười toe và rút ra một xấp thẻ. \"Cold — gold, class — glass, back — bag. K là một cú đá hơi; g cũng thế nhưng cổ họng rung.\"",
      },
      {
        en: "Jake [[called]] in the evening. \"Did you [[get]] the [[coat]]? Is it in the [[garage]]?\" He said \"[[garage]]\" with the stress at the end, the American way. Linh laughed: \"No, it's in my [[closet]] — I mean my wardrobe!\"",
        vi: "Buổi tối Jake gọi điện. \"Cậu mua được áo chưa? Để trong ga-ra à?\" Cậu nói \"garage\" nhấn ở cuối, kiểu Mỹ. Linh cười: \"Không, nó ở trong tủ — à, ý tớ là tủ quần áo kiểu Anh!\"",
      },
      {
        en: "Later, Mrs Brown [[knocked]] and [[asked]] if Linh knew where the [[kitchen]] knife was. Linh [[quickly]] wrote two words on a [[card]]: \"know\" and \"knife\". \"The k is silent,\" she said proudly. \"[[Exactly]], dear,\" said Mrs Brown. \"Now — [[biscuit]]?\"",
        vi: "Sau đó bà Brown gõ cửa hỏi Linh có biết con dao bếp ở đâu không. Linh nhanh tay viết hai chữ lên một tấm thẻ: \"know\" và \"knife\". \"Chữ k câm ạ,\" cô nói đầy tự hào. \"Đúng rồi, cháu yêu,\" bà Brown đáp. \"Giờ thì — ăn bánh quy nhé?\"",
      },
    ],
  },
  twister: {
    en: "A good cook could cook as many cookies as a good cook who could cook cookies.",
    vi: "Một đầu bếp giỏi có thể nướng nhiều bánh quy như một đầu bếp giỏi biết nướng bánh quy. (Luân phiên /ɡ/ và /k/, chú ý /d/ /k/ cuối từ.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "glass",
      opts: ["glass /ɡlɑːs/", "class /klɑːs/"],
      answer: 0,
      explain: "glass /ɡlɑːs/ bắt đầu bằng /ɡ/ hữu thanh, không bật hơi. class /klɑːs/ có /k/ bật hơi.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Chữ c trong từ nào đọc là /s/?",
      opts: ["city", "cup", "clock", "music"],
      answer: 0,
      explain: "city /ˈsɪt.i/: c đứng trước i → c mềm /s/. cup, clock, music: c cứng /k/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Từ nào có chữ k câm?",
      opts: ["knife", "kitchen", "kind", "keep"],
      answer: 0,
      explain: "knife /naɪf/: kn- đầu từ → k câm. Các từ còn lại đều đọc /k/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm đúng của \"chemistry\" là?",
      opts: ["/ˈkem.ɪ.stri/", "/ˈtʃem.ɪ.stri/", "/ˈʃem.ɪ.stri/", "/ˈkiː.mɪ.stri/"],
      answer: 0,
      explain: "chemistry /ˈkem.ɪ.stri/ — ch gốc Hy Lạp đọc /k/, giống school, stomach.",
    },
    {
      type: "choice",
      label: "Trọng âm",
      q: "Trọng âm của \"guitar\" rơi vào đâu?",
      opts: ["Âm tiết 2: /ɡɪˈtɑː/", "Âm tiết 1: /ˈɡɪt.ɑː/"],
      answer: 0,
      explain: "guitar /ɡɪˈtɑː/ nhấn âm tiết thứ hai; chữ u sau g câm, chỉ giữ cho g đọc /ɡ/.",
    },
    {
      type: "judge",
      q: "Chữ g đứng trước e hoặc i luôn đọc là /dʒ/.",
      ok: false,
      explain: "Sai. Thường là /dʒ/ (gym, page), nhưng nhiều từ thông dụng vẫn đọc /ɡ/: get, give, girl, begin, together.",
    },
  ],
};
