import type { IpaLesson } from "../types";

export const ipa02: IpaLesson = {
  id: "ipa-02",
  num: 2,
  title: "i dài và i ngắn — sheep hay ship?",
  mark: "iː · ɪ",
  level: "Cơ bản",
  group: "Nguyên âm đơn",
  intro:
    "Cặp âm gây hiểu lầm nhiều nhất với người Việt: nói \"ship\" (con tàu) thành \"sheep\" (con cừu), \"live\" (sống) thành \"leave\" (rời đi). Bí quyết: /iː/ CĂNG và DÀI, /ɪ/ CHÙNG và NGẮN — khác cả độ dài lẫn khẩu hình, không chỉ độ dài.",
  phonemes: [
    {
      id: "i-long",
      symbol: "iː",
      kind: "long-vowel",
      name: "i dài",
      keyword: { w: "see", ipa: "siː", vi: "nhìn thấy" },
      viLike:
        "Gần giống \"i\" trong \"đi\", \"bi\" nhưng kéo dài gấp đôi và căng hơn. Môi kéo sang hai bên như đang cười.",
      how: [
        "Môi: kéo căng sang hai bên như cười mỉm (nói \"cheese\" khi chụp ảnh).",
        "Lưỡi: nâng cao, đẩy về phía trước, mặt lưỡi gần chạm vòm miệng; hai bên lưỡi chạm răng hàm trên.",
        "Hàm: gần khép, răng trên và dưới cách nhau chừng 1 đầu ngón tay út.",
        "Độ dài: kéo dài \"iiii\" — dấu ː trong ký hiệu nghĩa là âm DÀI.",
        "Cơ miệng căng — đặt ngón tay dưới cằm sẽ thấy cơ hơi cứng lại.",
      ],
      vowel: { x: 0.04, y: 0.02, round: false },
      spellings: [
        { pattern: "ee", words: ["see", "tree", "sheep", "meet"] },
        { pattern: "ea", words: ["eat", "sea", "teach", "leave"] },
        { pattern: "e (cuối từ ngắn)", words: ["he", "she", "we", "me"] },
        { pattern: "ie / ei", words: ["piece", "field", "receive", "ceiling"] },
        { pattern: "i (từ gốc nước ngoài)", words: ["police", "machine", "pizza"] },
      ],
      words: [
        { w: "see", ipa: "siː", vi: "nhìn thấy" },
        { w: "eat", ipa: "iːt", vi: "ăn" },
        { w: "sheep", ipa: "ʃiːp", vi: "con cừu" },
        { w: "leave", ipa: "liːv", vi: "rời đi" },
        { w: "people", ipa: "ˈpiː.pəl", vi: "mọi người" },
        { w: "meeting", ipa: "ˈmiː.tɪŋ", vi: "cuộc họp" },
        { w: "police", ipa: "pəˈliːs", vi: "cảnh sát" },
        { w: "receive", ipa: "rɪˈsiːv", vi: "nhận" },
      ],
      sentences: [
        { en: "Please [[speak]] [[clearly]] at the [[meeting]].", vi: "Vui lòng nói rõ ràng trong cuộc họp.", ipa: "pliːz spiːk ˈklɪə.li ət ðə ˈmiː.tɪŋ" },
        { en: "We [[need]] three [[cheap]] [[seats]].", vi: "Chúng tôi cần ba chỗ ngồi giá rẻ." },
        { en: "The [[sheep]] [[eat]] green [[leaves]].", vi: "Đàn cừu ăn lá xanh." },
      ],
      pairs: [
        { a: { w: "sheep", ipa: "ʃiːp", vi: "con cừu" }, b: { w: "ship", ipa: "ʃɪp", vi: "con tàu" } },
        { a: { w: "leave", ipa: "liːv", vi: "rời đi" }, b: { w: "live", ipa: "lɪv", vi: "sống" } },
        { a: { w: "seat", ipa: "siːt", vi: "chỗ ngồi" }, b: { w: "sit", ipa: "sɪt", vi: "ngồi" } },
        { a: { w: "feel", ipa: "fiːl", vi: "cảm thấy" }, b: { w: "fill", ipa: "fɪl", vi: "làm đầy" } },
        { a: { w: "beach", ipa: "biːtʃ", vi: "bãi biển" }, b: { w: "bitch", ipa: "bɪtʃ", vi: "(từ tục — tránh nói nhầm!)" } },
        { a: { w: "sheet", ipa: "ʃiːt", vi: "tờ giấy" }, b: { w: "shit", ipa: "ʃɪt", vi: "(từ tục — tránh nói nhầm!)" } },
      ],
      mistakes: [
        "Đọc ngắn như \"i\" tiếng Việt → \"sheep\" nghe thành \"ship\". Phải kéo dài và căng môi.",
        "Thêm âm \"i\" cuối: \"see\" đọc thành \"xi-i\" hai nhịp. /iː/ là MỘT âm dài liền mạch.",
        "Nuốt phụ âm cuối: \"seat\" đọc thành \"xi\". Luôn bật nhẹ /t/ ở cuối.",
      ],
      tips: [
        "Cười khi nói: kéo môi như nói \"cheese\" — tự khắc ra /iː/.",
        "Đếm nhịp: /iː/ dài khoảng 2 nhịp vỗ tay, /ɪ/ chỉ nửa nhịp.",
        "Trước phụ âm vô thanh (/p t k s f/) nguyên âm dài sẽ ngắn lại một chút (\"seat\" ngắn hơn \"seed\") — nhưng vẫn căng.",
      ],
      memo: "Dấu hai chấm ː trông như hai giọt nước kéo dài → âm DÀI. Từ khóa: \"see\" — mắt mở to nhìn, miệng cười rộng: /siː/.",
      usUk: "Anh và Mỹ đọc giống nhau. Một số từ điển Mỹ ghi /i/ thay cho /iː/.",
    },
    {
      id: "i-short",
      symbol: "ɪ",
      kind: "short-vowel",
      name: "i ngắn",
      keyword: { w: "sit", ipa: "sɪt", vi: "ngồi" },
      viLike:
        "Nằm giữa \"i\" và \"ê\" của tiếng Việt, rất ngắn và thả lỏng — giống \"i\" trong \"ít\" nhưng miệng mở hơn một chút.",
      how: [
        "Môi: thả lỏng, hơi mở, KHÔNG kéo căng (mặt bình thường, không cười).",
        "Lưỡi: cao nhưng thấp hơn và lùi hơn /iː/ một chút; thả lỏng.",
        "Hàm: mở hơn /iː/ một chút (cách khoảng 1 đầu ngón tay trỏ).",
        "Độ dài: rất ngắn, dứt khoát — như bị ngắt.",
        "Cơ miệng chùng, không căng.",
      ],
      vowel: { x: 0.18, y: 0.16, round: false },
      spellings: [
        { pattern: "i (âm tiết đóng)", words: ["sit", "big", "fish", "this"] },
        { pattern: "y (giữa từ)", words: ["gym", "system", "myth"] },
        { pattern: "e trong tiền tố be-/de-/re-/e-", words: ["become", "decide", "return", "enjoy"] },
        { pattern: "-age / -ate / -ed (không nhấn)", words: ["village", "private", "wanted"] },
        { pattern: "Ngoại lệ hay gặp", words: ["women", "busy", "English", "pretty"] },
      ],
      words: [
        { w: "sit", ipa: "sɪt", vi: "ngồi" },
        { w: "fish", ipa: "fɪʃ", vi: "con cá" },
        { w: "big", ipa: "bɪɡ", vi: "to lớn" },
        { w: "city", ipa: "ˈsɪt.i", vi: "thành phố" },
        { w: "busy", ipa: "ˈbɪz.i", vi: "bận rộn" },
        { w: "women", ipa: "ˈwɪm.ɪn", vi: "phụ nữ (số nhiều)" },
        { w: "English", ipa: "ˈɪŋ.ɡlɪʃ", vi: "tiếng Anh" },
        { w: "village", ipa: "ˈvɪl.ɪdʒ", vi: "ngôi làng" },
      ],
      sentences: [
        { en: "[[This]] [[city]] [[is]] [[big]] and [[busy]].", vi: "Thành phố này lớn và nhộn nhịp.", ipa: "ðɪs ˈsɪt.i ɪz bɪɡ ən ˈbɪz.i" },
        { en: "[[Sit]] down and [[drink]] a [[little]] milk.", vi: "Ngồi xuống uống chút sữa đi." },
        { en: "The [[women]] [[live]] in a [[little]] [[village]].", vi: "Những người phụ nữ sống trong một ngôi làng nhỏ." },
      ],
      pairs: [
        { a: { w: "ship", ipa: "ʃɪp", vi: "con tàu" }, b: { w: "sheep", ipa: "ʃiːp", vi: "con cừu" } },
        { a: { w: "hit", ipa: "hɪt", vi: "đánh" }, b: { w: "heat", ipa: "hiːt", vi: "hơi nóng" } },
        { a: { w: "fit", ipa: "fɪt", vi: "vừa vặn" }, b: { w: "feet", ipa: "fiːt", vi: "bàn chân (số nhiều)" } },
        { a: { w: "bin", ipa: "bɪn", vi: "thùng rác" }, b: { w: "bean", ipa: "biːn", vi: "hạt đậu" } },
      ],
      mistakes: [
        "Đọc thành \"i\" Việt căng → \"ship\" lại nghe thành \"sheep\". Hãy thả lỏng miệng.",
        "Đọc \"women\" thành /ˈwoʊ.mən/ theo mặt chữ — thực ra là /ˈwɪm.ɪn/.",
        "Đọc chữ e trong \"English\", \"pretty\" thành /e/ — đúng là /ɪ/.",
      ],
      tips: [
        "Nói \"ít\" của tiếng Việt nhưng bỏ dấu sắc, mở miệng hơn một chút và thả lỏng.",
        "Luyện bằng chuỗi \"sit – sit – seat – sit\": cảm nhận cơ miệng chùng ↔ căng.",
        "Âm /ɪ/ cũng là âm hay gặp trong âm tiết KHÔNG nhấn: \"village\" /ˈvɪl.ɪdʒ/, \"wanted\" /ˈwɒn.tɪd/.",
      ],
      memo: "Ký hiệu ɪ là chữ I viết hoa thu nhỏ — \"i bé\" → âm ngắn, nhỏ, thả lỏng. Từ khóa: \"sit\" — ngồi xuống thả lỏng: /sɪt/.",
      usUk: "Giống nhau ở cả Anh và Mỹ. Ở cuối từ như \"happy\", \"city\", từ điển hiện đại ghi /i/ (âm trung gian, ngắn nhưng căng).",
    },
  ],
  rules: [
    {
      title: "Quy luật độ dài: dài + căng ↔ ngắn + chùng",
      body:
        "Trong tiếng Anh, nhiều cặp nguyên âm khác nhau ở cả ĐỘ DÀI lẫn ĐỘ CĂNG: /iː–ɪ/, /uː–ʊ/, /ɔː–ɒ/, /ɑː–ʌ/, /ɜː–ə/. Nếu chỉ nói ngắn hơn mà vẫn căng miệng thì người bản xứ vẫn nghe ra âm dài. Hãy đổi cả khẩu hình.",
    },
    {
      title: "Nhìn chữ đoán âm: \"e câm\" kéo dài nguyên âm",
      body:
        "Âm tiết đóng (kết thúc bằng phụ âm) thường cho âm ngắn: sit, bit, fin. Thêm \"e\" câm ở cuối → nguyên âm thường đổi thành dạng dài/đôi: site /saɪt/, bite /baɪt/, fine /faɪn/. Với chữ i, \"e câm\" cho /aɪ/ chứ không phải /iː/.",
      examples: [
        { w: "fill", ipa: "fɪl", vi: "làm đầy" },
        { w: "feel", ipa: "fiːl", vi: "cảm thấy" },
        { w: "file", ipa: "faɪl", vi: "tập tin" },
      ],
    },
    {
      title: "Đuôi -y và -ie ở cuối từ đọc là /i/",
      body:
        "happy, city, money, movie… kết thúc bằng /i/ — ngắn như /ɪ/ nhưng căng như /iː/. Đây là âm thứ ba nằm giữa hai âm của bài, đọc gần giống \"i\" tiếng Việt.",
      examples: [
        { w: "happy", ipa: "ˈhæp.i", vi: "vui vẻ" },
        { w: "money", ipa: "ˈmʌn.i", vi: "tiền" },
        { w: "coffee", ipa: "ˈkɒf.i", vi: "cà phê" },
      ],
    },
  ],
  story: {
    title: "Linh và con tàu chở cừu",
    paras: [
      {
        en: "On her first day in London, Linh wanted to [[visit]] the river. She asked a man, \"Where is the [[sheep]]?\" He looked confused. \"There are no [[sheep]] in the [[city]],\" he said.",
        vi: "Ngày đầu ở London, Linh muốn đi thăm bờ sông. Cô hỏi một người đàn ông: \"Con cừu ở đâu ạ?\" Ông ấy bối rối: \"Trong thành phố làm gì có cừu.\"",
      },
      {
        en: "Linh laughed. \"Sorry — I mean the [[ship]]! The big [[ship]] on the river.\" Her [[teeth]] were [[still]] chattering: it was [[freezing]].",
        vi: "Linh bật cười: \"Xin lỗi — ý cháu là con tàu! Con tàu lớn trên sông ạ.\" Răng cô vẫn còn đánh lập cập: trời lạnh cóng.",
      },
      {
        en: "At work, her colleague Tom said, \"Don't worry. [[Feel]] the [[sheep]], [[fill]] the [[ship]]: long and smiling for /iː/, short and lazy for /ɪ/.\"",
        vi: "Ở công ty, đồng nghiệp Tom bảo: \"Đừng lo. 'Feel the sheep, fill the ship': dài và cười cho /iː/, ngắn và lười cho /ɪ/.\"",
      },
      {
        en: "That evening Linh sat on the [[beach]] by the river with a cup of [[tea]] and practised: \"[[Sit]] — [[seat]], [[live]] — [[leave]], [[ship]] — [[sheep]].\" A [[little]] [[kid]] [[repeated]] [[it]] with her.",
        vi: "Tối đó Linh ngồi trên bãi cát bên sông với tách trà và luyện: \"sit — seat, live — leave, ship — sheep\". Một cậu bé con nhắc lại cùng cô.",
      },
    ],
  },
  twister: {
    en: "Six sick sheep sit on a big ship.",
    vi: "Sáu con cừu ốm ngồi trên một con tàu lớn. (Đổi luân phiên /ɪ/ – /iː/ – /ɪ/.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "leave",
      opts: ["leave /liːv/", "live /lɪv/"],
      answer: 0,
      explain: "leave /liːv/ có nguyên âm dài, căng. live /lɪv/ ngắn, chùng.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Từ nào chứa âm /ɪ/ (i ngắn)?",
      opts: ["busy", "machine", "piece", "receive"],
      answer: 0,
      explain: "busy /ˈbɪz.i/: chữ u đọc là /ɪ/. Ba từ còn lại có /iː/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Chữ \"ea\" trong từ nào KHÔNG đọc là /iː/?",
      opts: ["bread", "teach", "sea", "leave"],
      answer: 0,
      explain: "bread /bred/ — \"ea\" đọc /e/. Ngoại lệ hay gặp: bread, head, weather, breakfast.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm đúng của \"women\" là?",
      opts: ["/ˈwɪm.ɪn/", "/ˈwoʊ.mən/", "/ˈwuː.men/", "/ˈwiː.mɪn/"],
      answer: 0,
      explain: "women /ˈwɪm.ɪn/ — chữ o đọc là /ɪ/, rất bất quy tắc nên cần nhớ riêng.",
    },
    {
      type: "judge",
      q: "Để đọc /ɪ/ đúng, chỉ cần đọc /iː/ thật ngắn là đủ.",
      ok: false,
      explain: "Sai. /ɪ/ khác /iː/ cả về khẩu hình: lưỡi thấp và lùi hơn, môi và cơ miệng thả lỏng.",
    },
  ],
};
