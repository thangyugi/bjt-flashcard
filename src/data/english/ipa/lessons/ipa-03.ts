import type { IpaLesson } from "../types";

export const ipa03: IpaLesson = {
  id: "ipa-03",
  num: 3,
  title: "e và æ — bed hay bad?",
  mark: "e · æ",
  level: "Cơ bản",
  group: "Nguyên âm đơn",
  intro:
    "Người Việt thường đọc cả hai âm này thành \"e\" tiếng Việt, nên \"bed\" (cái giường) và \"bad\" (tệ), \"men\" và \"man\" nghe y như nhau. Bí quyết: /e/ miệng mở VỪA, gần \"ê\"; /æ/ miệng mở RẤT TO, hàm hạ xuống như sắp nói \"a\" nhưng lưỡi vẫn ở tư thế \"e\".",
  phonemes: [
    {
      id: "e",
      symbol: "e",
      kind: "short-vowel",
      name: "e ngắn",
      keyword: { w: "bed", ipa: "bed", vi: "cái giường" },
      viLike:
        "Nằm giữa \"ê\" và \"e\" của tiếng Việt — gần \"ê\" trong \"bết\" nhưng miệng mở hơn một chút. Ngắn và dứt khoát.",
      how: [
        "Môi: thả lỏng, hơi kéo sang hai bên, không tròn.",
        "Lưỡi: ở phía trước, đầu lưỡi chạm nhẹ sau răng cửa dưới; độ cao vừa phải (thấp hơn /ɪ/).",
        "Hàm: mở vừa — đặt vừa một ngón tay trỏ nằm ngang giữa hai hàm răng.",
        "Độ dài: ngắn, gọn, không kéo.",
        "Dây thanh rung như mọi nguyên âm; cơ miệng không căng.",
      ],
      vowel: { x: 0.12, y: 0.45, round: false },
      spellings: [
        { pattern: "e (âm tiết đóng)", words: ["bed", "pen", "red", "ten", "desk"] },
        { pattern: "ea (ngoại lệ hay gặp)", words: ["head", "bread", "ready", "weather", "breakfast"] },
        { pattern: "a (ngoại lệ)", words: ["any", "many", "Thames"] },
        { pattern: "ai / ay", words: ["said", "again", "says"] },
        { pattern: "ie / ue / u", words: ["friend", "guess", "bury"] },
      ],
      words: [
        { w: "bed", ipa: "bed", vi: "cái giường" },
        { w: "ten", ipa: "ten", vi: "số mười" },
        { w: "red", ipa: "red", vi: "màu đỏ" },
        { w: "head", ipa: "hed", vi: "cái đầu" },
        { w: "friend", ipa: "frend", vi: "bạn bè" },
        { w: "many", ipa: "ˈmen.i", vi: "nhiều" },
        { w: "breakfast", ipa: "ˈbrek.fəst", vi: "bữa sáng" },
        { w: "weather", ipa: "ˈweð.ə", vi: "thời tiết" },
      ],
      sentences: [
        { en: "[[Ten]] [[friends]] [[said]] [[yes]].", vi: "Mười người bạn đã đồng ý.", ipa: "ten frendz sed jes" },
        { en: "[[Ben]] [[left]] his [[red]] [[pen]] on the [[bed]].", vi: "Ben để quên cây bút đỏ trên giường." },
        { en: "The [[weather]] is [[wet]], so [[let's]] have [[breakfast]] inside.", vi: "Trời ẩm ướt, nên mình ăn sáng trong nhà nhé." },
      ],
      pairs: [
        { a: { w: "bed", ipa: "bed", vi: "cái giường" }, b: { w: "bad", ipa: "bæd", vi: "tệ" } },
        { a: { w: "men", ipa: "men", vi: "những người đàn ông" }, b: { w: "man", ipa: "mæn", vi: "người đàn ông" } },
        { a: { w: "pen", ipa: "pen", vi: "cây bút" }, b: { w: "pan", ipa: "pæn", vi: "cái chảo" } },
        { a: { w: "said", ipa: "sed", vi: "đã nói" }, b: { w: "sad", ipa: "sæd", vi: "buồn" } },
        { a: { w: "set", ipa: "set", vi: "bộ, đặt" }, b: { w: "sat", ipa: "sæt", vi: "đã ngồi" } },
        { a: { w: "beg", ipa: "beɡ", vi: "van xin" }, b: { w: "bag", ipa: "bæɡ", vi: "cái túi" } },
      ],
      mistakes: [
        "Mở miệng quá to như \"e\" tiếng Việt → \"bed\" nghe thành \"bad\", \"men\" thành \"man\". Khép hàm lại một chút, gần \"ê\".",
        "Đọc theo mặt chữ: \"many\", \"any\" thành /ˈmæn.i/; \"said\" thành /seɪd/. Đúng là /ˈmen.i/, /ˈen.i/, /sed/.",
        "Nuốt phụ âm cuối: \"bed\" thành \"be\", \"friend\" thành \"phren\". Giữ /d/ cuối, nhẹ nhưng rõ.",
      ],
      tips: [
        "Nói \"ê\" tiếng Việt rồi hạ hàm xuống một chút — đó là /e/.",
        "Đặt một ngón tay ngang giữa hai hàm răng: /e/ vừa đủ một ngón, /æ/ phải mở rộng hơn thế.",
        "Luyện chuỗi \"bed – bad – bed – bad\" trước gương: chỉ hàm dưới di chuyển, lưỡi gần như đứng yên.",
      ],
      memo: "Ký hiệu e giống chữ e thường — âm \"e\" bình thường, mở vừa, không đặc biệt. Từ khóa: \"bed\" — nằm trên giường, miệng mở vừa phải mà ngáp nhẹ: /bed/.",
      usUk: "Cambridge ghi /e/ cho cả UK và US; nhiều sách Mỹ ghi /ɛ/ — cùng một âm. Giọng Mỹ thường mở miệng rộng hơn một chút.",
    },
    {
      id: "ae",
      symbol: "æ",
      kind: "short-vowel",
      name: "a bẹt",
      keyword: { w: "cat", ipa: "kæt", vi: "con mèo" },
      viLike:
        "Tiếng Việt không có. Giống như nói \"e\" nhưng mở miệng to như khi nói \"a\" — một âm lai \"a–e\", hơi bẹt ra hai bên.",
      how: [
        "Môi: kéo bẹt sang hai bên, khóe miệng hơi căng.",
        "Lưỡi: ở phía trước và hạ THẤP, đầu lưỡi tì sau răng cửa dưới; mặt lưỡi hơi căng.",
        "Hàm: hạ xuống rất thấp — mở to gần bằng khi nói \"a\" (đặt vừa hai ngón tay).",
        "Độ dài: là âm ngắn nhưng thực tế dài hơn /e/ một chút, nhất là trước phụ âm hữu thanh (bad, bag, man).",
        "Dây thanh rung; nếu soi gương, bạn thấy hàm dưới hạ xuống rõ rệt so với /e/.",
      ],
      vowel: { x: 0.12, y: 0.85, round: false },
      spellings: [
        { pattern: "a (âm tiết đóng)", words: ["cat", "bag", "map", "hand", "black"] },
        { pattern: "a + phụ âm + nguyên âm (âm tiết nhấn)", words: ["happy", "family", "travel", "apple"] },
        { pattern: "a + ng / nk", words: ["thank", "bank", "hang", "language"] },
        { pattern: "a + phụ âm đôi (âm tiết nhấn)", words: ["matter", "rabbit", "carry", "Saturday"] },
      ],
      words: [
        { w: "cat", ipa: "kæt", vi: "con mèo" },
        { w: "bag", ipa: "bæɡ", vi: "cái túi" },
        { w: "map", ipa: "mæp", vi: "bản đồ" },
        { w: "black", ipa: "blæk", vi: "màu đen" },
        { w: "happy", ipa: "ˈhæp.i", vi: "vui vẻ" },
        { w: "apple", ipa: "ˈæp.əl", vi: "quả táo" },
        { w: "family", ipa: "ˈfæm.əl.i", vi: "gia đình" },
        { w: "language", ipa: "ˈlæŋ.ɡwɪdʒ", vi: "ngôn ngữ" },
      ],
      sentences: [
        { en: "The [[black]] [[cat]] [[sat]] on my [[bag]].", vi: "Con mèo đen ngồi lên túi của tôi.", ipa: "ðə blæk kæt sæt ɒn maɪ bæɡ" },
        { en: "[[Thanks]] for the [[map]] — I'm so [[happy]]!", vi: "Cảm ơn tấm bản đồ — mình vui quá!" },
        { en: "My [[family]] [[has]] a [[cabin]] in [[Manchester]].", vi: "Gia đình tôi có một căn nhà gỗ ở Manchester." },
      ],
      pairs: [
        { a: { w: "bad", ipa: "bæd", vi: "tệ" }, b: { w: "bed", ipa: "bed", vi: "cái giường" } },
        { a: { w: "man", ipa: "mæn", vi: "người đàn ông" }, b: { w: "men", ipa: "men", vi: "những người đàn ông" } },
        { a: { w: "had", ipa: "hæd", vi: "đã có" }, b: { w: "head", ipa: "hed", vi: "cái đầu" } },
        { a: { w: "sat", ipa: "sæt", vi: "đã ngồi" }, b: { w: "set", ipa: "set", vi: "bộ, đặt" } },
        { a: { w: "pan", ipa: "pæn", vi: "cái chảo" }, b: { w: "pen", ipa: "pen", vi: "cây bút" } },
        { a: { w: "track", ipa: "træk", vi: "đường ray" }, b: { w: "trek", ipa: "trek", vi: "chuyến đi bộ đường dài" } },
      ],
      mistakes: [
        "Đọc thành \"e\" tiếng Việt → \"man\" nghe giống \"men\", \"bad\" giống \"bed\". Phải hạ hàm thấp hơn hẳn.",
        "Đọc thành \"a\" tiếng Việt → \"cat\" thành \"cát\", \"black\" thành \"bờ-lách\". /æ/ bẹt hơn và có màu \"e\".",
        "Bỏ hoặc đọc nhầm phụ âm cuối: \"bag\" thành \"bách\", \"black\" thành \"bờ-lắc\". Giữ /ɡ/, /k/ cuối nhẹ nhàng.",
      ],
      tips: [
        "Nói \"e\" rồi từ từ hạ hàm xuống như sắp ngáp mà KHÔNG đổi vị trí lưỡi — âm bạn nghe được là /æ/.",
        "Làm mặt \"ghê ghê\" (nhăn mũi, kéo môi bẹt) khi nói \"cat\" — khẩu hình đúng ngay.",
        "Trước phụ âm hữu thanh (/b d ɡ m n/) kéo /æ/ dài hơn: \"bad\" dài hơn \"bat\", \"man\" dài hơn \"mat\".",
      ],
      memo: "Ký hiệu æ là chữ a và e dính liền — đúng là âm lai giữa \"a\" và \"e\". Từ khóa: \"cat\" — con mèo há miệng thật to kêu \"meo\": /kæt/.",
      usUk: "Giọng Mỹ dùng /æ/ nhiều hơn: các từ như bath, class, after, can't, dance, ask — Anh đọc /ɑː/, Mỹ đọc /æ/ (bath: UK bɑːθ, US bæθ). Trước m, n, giọng Mỹ thường kéo /æ/ thành gần /eə/ (man, can).",
    },
  ],
  rules: [
    {
      title: "Chữ a: âm tiết đóng → /æ/, thêm \"e câm\" → /eɪ/",
      body:
        "Chữ a trong âm tiết nhấn kết thúc bằng phụ âm thường đọc /æ/: cat, hat, plan, mad. Thêm \"e\" câm ở cuối → chữ a đọc theo tên của nó /eɪ/: hate, plane, made. Quy luật này giúp bạn đoán đúng phần lớn từ ngắn.",
      examples: [
        { w: "hat", ipa: "hæt", vi: "cái mũ" },
        { w: "hate", ipa: "heɪt", vi: "ghét" },
        { w: "plan", ipa: "plæn", vi: "kế hoạch" },
        { w: "plane", ipa: "pleɪn", vi: "máy bay" },
        { w: "mad", ipa: "mæd", vi: "điên" },
        { w: "made", ipa: "meɪd", vi: "đã làm" },
      ],
    },
    {
      title: "\"ea\" đôi khi đọc /e/ chứ không phải /iː/",
      body:
        "Đa số \"ea\" đọc /iː/ (eat, sea), nhưng một nhóm từ RẤT thông dụng đọc /e/: head, bread, dead, ready, heavy, weather, breakfast, sweater, already, instead. Hãy học thuộc nhóm này như một danh sách riêng.",
      examples: [
        { w: "bread", ipa: "bred", vi: "bánh mì" },
        { w: "ready", ipa: "ˈred.i", vi: "sẵn sàng" },
        { w: "heavy", ipa: "ˈhev.i", vi: "nặng" },
        { w: "instead", ipa: "ɪnˈsted", vi: "thay vào đó" },
      ],
      sentences: [
        { en: "Is the [[bread]] [[ready]] for [[breakfast]]?", vi: "Bánh mì cho bữa sáng xong chưa?", ipa: "ɪz ðə bred ˈred.i fə ˈbrek.fəst" },
      ],
    },
    {
      title: "Ngoại lệ phải nhớ: any, many, said, says, again, friend",
      body:
        "Đây là những từ dùng hằng ngày nhưng chữ viết \"đánh lừa\": chữ a, ai, ay, ie đều đọc là /e/. Người Việt rất hay đọc \"said\" thành /seɪd/ hay \"many\" thành /ˈmæn.i/. Riêng \"again\" có hai cách đọc chuẩn ở Anh: /əˈɡen/ và /əˈɡeɪn/.",
      examples: [
        { w: "any", ipa: "ˈen.i", vi: "bất kỳ" },
        { w: "said", ipa: "sed", vi: "đã nói" },
        { w: "says", ipa: "sez", vi: "nói (ngôi thứ ba)" },
        { w: "again", ipa: "əˈɡen", vi: "lại, lần nữa" },
      ],
      sentences: [
        { en: "She [[said]] it [[again]] and [[again]].", vi: "Cô ấy nói đi nói lại điều đó." },
      ],
    },
    {
      title: "Nguyên âm dài ra trước phụ âm hữu thanh",
      body:
        "Mọi nguyên âm đều đọc dài hơn khi đứng trước phụ âm cuối hữu thanh (/b d ɡ v z m n/) và ngắn lại trước phụ âm vô thanh (/p t k f s/). Vì thế \"bad\" dài hơn \"bat\", \"bag\" dài hơn \"back\". Người bản xứ dùng chính độ dài này để nhận ra phụ âm cuối — nên dù phụ âm cuối có nhẹ, hãy giữ đúng độ dài nguyên âm.",
      examples: [
        { w: "bad", ipa: "bæd", vi: "tệ (æ dài hơn)" },
        { w: "bat", ipa: "bæt", vi: "con dơi, gậy (æ ngắn)" },
        { w: "bag", ipa: "bæɡ", vi: "cái túi (æ dài hơn)" },
        { w: "back", ipa: "bæk", vi: "phía sau (æ ngắn)" },
      ],
    },
  ],
  story: {
    title: "Cái giường tệ hay cái giường đỏ?",
    paras: [
      {
        en: "After a week in London, Linh [[had]] a problem with her room. She went downstairs and told Mrs Brown, \"My [[bed]] is [[bad]].\" But it came out as \"My [[bed]] is [[bed]].\" Mrs Brown looked puzzled.",
        vi: "Sau một tuần ở London, Linh gặp rắc rối với căn phòng. Cô xuống tầng và nói với bà Brown: \"Giường của cháu tệ lắm.\" Nhưng câu nói lại thành \"Giường của cháu là giường.\" Bà Brown ngơ ngác.",
      },
      {
        en: "Linh tried [[again]]: she opened her mouth wide like a [[cat]]. \"It's [[bad]]! The [[legs]] are [[bent]].\" Now Mrs Brown understood. \"Oh dear! I'll [[get]] you a [[fresh]] one, [[pet]].\"",
        vi: "Linh thử lại: cô há miệng thật to như con mèo. \"Nó tệ ạ! Chân giường bị cong rồi.\" Lần này bà Brown hiểu ngay: \"Ôi trời! Bà sẽ đổi cho cháu cái mới, cháu cưng.\"",
      },
      {
        en: "At work, Tom [[chuckled]] at the story. \"In English, one [[man]], [[ten]] [[men]]. One [[pan]], [[ten]] [[pens]] — open wide for [[apple]], [[less]] for [[egg]].\"",
        vi: "Ở công ty, Tom cười khúc khích khi nghe chuyện. \"Trong tiếng Anh: một man, mười men. Một cái chảo, mười cây bút — há to cho 'apple', ít hơn cho 'egg'.\"",
      },
      {
        en: "That evening Jake [[sent]] a message: \"In America we say bath with the [[cat]] vowel, not like Tom!\" Linh [[sat]] on her [[fresh]] [[bed]] and practised: \"[[bed]] – [[bad]], [[men]] – [[man]], [[said]] – [[sad]].\"",
        vi: "Tối đó Jake nhắn tin: \"Ở Mỹ bọn tớ đọc 'bath' bằng nguyên âm của 'cat', không giống Tom đâu!\" Linh ngồi trên chiếc giường mới và luyện: \"bed – bad, men – man, said – sad.\"",
      },
    ],
  },
  twister: {
    en: "Ten fat cats sat on Ben's red bed.",
    vi: "Mười con mèo béo ngồi trên chiếc giường đỏ của Ben. (Luân phiên /e/ – /æ/ – /æ/ – /æ/ – /e/ – /e/ – /e/.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "man",
      opts: ["man /mæn/", "men /men/"],
      answer: 0,
      explain: "man /mæn/ — hàm hạ thấp, miệng mở to. men /men/ mở vừa phải.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy câu nào?",
      say: "I need a new pen.",
      opts: ["I need a new pen. /pen/", "I need a new pan. /pæn/"],
      answer: 0,
      explain: "pen /pen/ — cây bút, miệng mở vừa. pan /pæn/ — cái chảo, miệng mở to.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Từ nào chứa âm /e/?",
      opts: ["many", "cat", "make", "happy"],
      answer: 0,
      explain: "many /ˈmen.i/ — chữ a đọc /e/, ngoại lệ hay gặp. cat, happy có /æ/; make có /eɪ/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Chữ \"ea\" trong từ nào đọc là /e/?",
      opts: ["weather", "teacher", "meat", "speak"],
      answer: 0,
      explain: "weather /ˈweð.ə/ — \"ea\" đọc /e/. Ba từ còn lại đọc /iː/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm đúng của \"said\" là?",
      opts: ["/sed/", "/seɪd/", "/sæd/", "/saɪd/"],
      answer: 0,
      explain: "said /sed/ — \"ai\" ở đây đọc /e/. /sæd/ là \"sad\" (buồn).",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Khẩu hình nào đúng với /æ/?",
      opts: [
        "Hàm hạ thấp, môi bẹt, lưỡi phía trước",
        "Hàm mở vừa, môi thả lỏng như \"ê\"",
        "Môi tròn, lưỡi lùi về sau",
        "Hàm gần khép, môi cười như \"i\"",
      ],
      answer: 0,
      explain: "/æ/ là nguyên âm trước, thấp: hàm hạ gần như \"a\", môi kéo bẹt. Hàm mở vừa là /e/.",
    },
    {
      type: "judge",
      q: "Từ \"bad\" có nguyên âm dài hơn từ \"bat\".",
      ok: true,
      explain: "Đúng. Nguyên âm dài hơn trước phụ âm hữu thanh /d/ và ngắn lại trước phụ âm vô thanh /t/.",
    },
  ],
};
