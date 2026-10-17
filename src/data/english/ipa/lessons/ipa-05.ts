import type { IpaLesson } from "../types";

export const ipa05: IpaLesson = {
  id: "ipa-05",
  num: 5,
  title: "ɒ và ɔː — shot hay short?",
  mark: "ɒ · ɔː",
  level: "Cơ bản",
  group: "Nguyên âm đơn",
  intro:
    "Hai âm \"o\" tròn môi của giọng Anh. Người Việt hay đọc cả hai thành \"o\" hoặc \"ô\" tiếng Việt, nên \"shot\" (cú bắn) và \"short\" (ngắn), \"spot\" và \"sport\" nghe như nhau. Bí quyết: /ɒ/ NGẮN, hàm mở to, môi hơi tròn; /ɔː/ DÀI, môi tròn hơn và chu ra.",
  phonemes: [
    {
      id: "o-short",
      symbol: "ɒ",
      kind: "short-vowel",
      name: "o ngắn",
      keyword: { w: "hot", ipa: "hɒt", vi: "nóng" },
      viLike:
        "Gần \"o\" trong \"học\", \"lọc\" của tiếng Việt — ngắn và dứt khoát, nhưng miệng mở to hơn, hàm hạ thấp hơn. KHÔNG phải \"ô\" (môi khép tròn nhỏ).",
      how: [
        "Môi: hơi tròn nhẹ, không chu ra.",
        "Lưỡi: hạ thấp và lùi về phía sau, cuống lưỡi hơi kéo về họng.",
        "Hàm: mở to, gần như khi nói /ɑː/.",
        "Độ dài: rất ngắn, gọn như tiếng \"óp!\".",
        "Dây thanh rung; cơ miệng thả lỏng.",
      ],
      vowel: { x: 0.95, y: 0.85, round: true },
      spellings: [
        { pattern: "o (âm tiết đóng)", words: ["hot", "dog", "stop", "box", "shop"] },
        { pattern: "a sau w / qu", words: ["what", "want", "watch", "wash", "quality"] },
        { pattern: "o + phụ âm + nguyên âm (âm tiết nhấn)", words: ["body", "holiday", "problem", "sorry"] },
        { pattern: "au / ou / ow (ngoại lệ)", words: ["because", "sausage", "cough", "knowledge"] },
      ],
      words: [
        { w: "hot", ipa: "hɒt", vi: "nóng" },
        { w: "dog", ipa: "dɒɡ", vi: "con chó" },
        { w: "stop", ipa: "stɒp", vi: "dừng lại" },
        { w: "shop", ipa: "ʃɒp", vi: "cửa hàng" },
        { w: "coffee", ipa: "ˈkɒf.i", vi: "cà phê" },
        { w: "watch", ipa: "wɒtʃ", vi: "xem, đồng hồ đeo tay" },
        { w: "holiday", ipa: "ˈhɒl.ə.deɪ", vi: "kỳ nghỉ" },
        { w: "knowledge", ipa: "ˈnɒl.ɪdʒ", vi: "kiến thức" },
      ],
      sentences: [
        { en: "[[Tom]] [[got]] a [[hot]] [[coffee]] from the [[shop]].", vi: "Tom mua một cốc cà phê nóng ở cửa hàng.", ipa: "tɒm ɡɒt ə hɒt ˈkɒf.i frəm ðə ʃɒp" },
        { en: "[[What]] do you [[want]] to [[watch]]?", vi: "Bạn muốn xem gì?" },
        { en: "[[Sorry]], the [[doctor]] is [[on]] [[holiday]].", vi: "Xin lỗi, bác sĩ đang đi nghỉ." },
      ],
      pairs: [
        { a: { w: "shot", ipa: "ʃɒt", vi: "cú bắn, cú sút" }, b: { w: "short", ipa: "ʃɔːt", vi: "ngắn" } },
        { a: { w: "spot", ipa: "spɒt", vi: "đốm, địa điểm" }, b: { w: "sport", ipa: "spɔːt", vi: "thể thao" } },
        { a: { w: "cot", ipa: "kɒt", vi: "giường cũi em bé" }, b: { w: "caught", ipa: "kɔːt", vi: "đã bắt được" } },
        { a: { w: "pot", ipa: "pɒt", vi: "cái nồi" }, b: { w: "port", ipa: "pɔːt", vi: "cảng" } },
        { a: { w: "fox", ipa: "fɒks", vi: "con cáo" }, b: { w: "forks", ipa: "fɔːks", vi: "những cái nĩa" } },
        { a: { w: "don", ipa: "dɒn", vi: "mặc vào (trang trọng)" }, b: { w: "dawn", ipa: "dɔːn", vi: "bình minh" } },
      ],
      mistakes: [
        "Đọc thành \"ô\" tiếng Việt (môi khép tròn) → \"hot\" thành \"hốt\", \"stop\" thành \"xtốp\". Phải mở hàm to hơn.",
        "Đọc chữ a sau w thành /æ/: \"what\" thành /wæt/, \"want\" thành /wænt/, \"watch\" thành /wætʃ/. Đúng là /ɒ/.",
        "Nuốt phụ âm cuối: \"dog\" thành \"đo\", \"shop\" thành \"sho\". Giữ /ɡ/, /p/ cuối.",
      ],
      tips: [
        "Nói \"a\" tiếng Việt rồi tròn môi nhẹ mà KHÔNG khép hàm — ra /ɒ/.",
        "Nói thật ngắn, như bị ngắt: \"hot!\" — như vừa chạm vào cốc nước nóng.",
        "Luyện chuỗi \"shot – short – shot – short\": /ɒ/ ngắn, môi ít tròn; /ɔː/ dài, môi chu ra.",
      ],
      memo: "Ký hiệu ɒ giống chữ a viết tay bị lật ngược — miệng mở to như /ɑ/ nhưng tròn môi. Từ khóa: \"hot\" — chạm cốc nóng, thốt ra thật nhanh: /hɒt/.",
      usUk: "Giọng Mỹ KHÔNG có /ɒ/: phần lớn đọc thành /ɑː/ (hot US /hɑːt/, stop /stɑːp/, coffee /ˈkɑː.fi/), một số từ thành /ɔː/ (dog, long). Khi nghe người Mỹ nói \"hot\", bạn sẽ thấy giống \"hát\" kéo dài.",
    },
    {
      id: "o-long",
      symbol: "ɔː",
      kind: "long-vowel",
      name: "o dài",
      keyword: { w: "door", ipa: "dɔː", vi: "cánh cửa" },
      viLike:
        "Nằm giữa \"o\" và \"ô\" của tiếng Việt, kéo dài gấp đôi; môi tròn và chu ra phía trước, như khi nói \"ồ\" ngạc nhiên nhưng không có dấu.",
      how: [
        "Môi: tròn rõ và chu nhẹ ra phía trước (tròn hơn /ɒ/).",
        "Lưỡi: lùi về phía sau, cao hơn /ɒ/ một chút.",
        "Hàm: mở vừa — khép hơn /ɒ/.",
        "Độ dài: kéo dài \"ooo\" — dấu ː nghĩa là âm DÀI.",
        "Với chữ \"or\", \"oor\", \"our\": giọng Anh không đọc r, chỉ kéo dài nguyên âm.",
      ],
      vowel: { x: 0.92, y: 0.5, round: true },
      spellings: [
        { pattern: "or / ore / oor / oar / our", words: ["short", "more", "door", "board", "four"] },
        { pattern: "aw / au", words: ["saw", "law", "draw", "August", "author"] },
        { pattern: "al / all (l thường câm trước k)", words: ["walk", "talk", "all", "small", "call"] },
        { pattern: "ought / aught", words: ["thought", "bought", "caught", "daughter"] },
        { pattern: "ar sau w / qu", words: ["war", "warm", "quarter"] },
      ],
      words: [
        { w: "four", ipa: "fɔː", vi: "số bốn" },
        { w: "door", ipa: "dɔː", vi: "cánh cửa" },
        { w: "saw", ipa: "sɔː", vi: "đã nhìn thấy" },
        { w: "walk", ipa: "wɔːk", vi: "đi bộ" },
        { w: "morning", ipa: "ˈmɔː.nɪŋ", vi: "buổi sáng" },
        { w: "water", ipa: "ˈwɔː.tə", vi: "nước" },
        { w: "daughter", ipa: "ˈdɔː.tə", vi: "con gái" },
        { w: "important", ipa: "ɪmˈpɔː.tənt", vi: "quan trọng" },
      ],
      sentences: [
        { en: "I [[saw]] [[four]] [[horses]] this [[morning]].", vi: "Sáng nay tôi thấy bốn con ngựa.", ipa: "aɪ sɔː fɔː ˈhɔː.sɪz ðɪs ˈmɔː.nɪŋ" },
        { en: "[[Walk]] to the [[door]] and [[call]] her [[daughter]].", vi: "Đi ra cửa và gọi con gái bà ấy." },
        { en: "I [[thought]] you [[bought]] [[more]] [[water]].", vi: "Tôi tưởng bạn đã mua thêm nước rồi." },
      ],
      pairs: [
        { a: { w: "short", ipa: "ʃɔːt", vi: "ngắn" }, b: { w: "shot", ipa: "ʃɒt", vi: "cú bắn, cú sút" } },
        { a: { w: "sport", ipa: "spɔːt", vi: "thể thao" }, b: { w: "spot", ipa: "spɒt", vi: "đốm, địa điểm" } },
        { a: { w: "caught", ipa: "kɔːt", vi: "đã bắt được" }, b: { w: "cot", ipa: "kɒt", vi: "giường cũi em bé" } },
        { a: { w: "port", ipa: "pɔːt", vi: "cảng" }, b: { w: "pot", ipa: "pɒt", vi: "cái nồi" } },
        { a: { w: "forks", ipa: "fɔːks", vi: "những cái nĩa" }, b: { w: "fox", ipa: "fɒks", vi: "con cáo" } },
      ],
      mistakes: [
        "Đọc ngắn → \"short\" nghe thành \"shot\", \"sport\" thành \"spot\". Phải kéo dài và chu môi.",
        "Đọc chữ l trong \"walk\", \"talk\": l câm — walk /wɔːk/, không phải \"oan-k\". (Còn \"all\", \"call\", \"small\" thì vẫn có /l/.)",
        "Đọc \"ought\", \"aught\" thành \"âu\" theo mặt chữ: \"bought\" thành \"bâu\". Đúng là /bɔːt/.",
      ],
      tips: [
        "Nói \"ồ!\" ngạc nhiên, chu môi tròn và kéo dài — gần đúng /ɔː/.",
        "Đặt ngón trỏ trước môi: với /ɔː/ môi chu ra chạm nhẹ ngón tay; với /ɒ/ thì không.",
        "Đếm nhịp: /ɔː/ 2 nhịp, /ɒ/ nửa nhịp. Luyện \"pot – port – pot – port\".",
      ],
      memo: "Ký hiệu ɔ giống chữ c quay ngược — như cái miệng tròn há ra; ː kéo dài. Từ khóa: \"door\" — gõ cửa, chủ nhà ngạc nhiên \"ồồ\": /dɔː/.",
      usUk: "Giọng Mỹ đọc r: four /fɔːr/, door /dɔːr/, morning /ˈmɔːr.nɪŋ/. Nhiều người Mỹ đọc caught giống cot, saw thành /sɑː/, thought thành /θɑːt/. water (US) /ˈwɑː.t̬ɚ/.",
    },
  ],
  rules: [
    {
      title: "w và qu \"kéo\" chữ a thành âm o",
      body:
        "Sau âm /w/ (viết w, wh, qu), chữ a thường KHÔNG đọc /æ/ mà đọc /ɒ/: what, want, watch, wash, swan, quality, quantity. Nếu sau a có r thì đọc /ɔː/: war, warm, ward, quarter, reward. Ngoại lệ hay gặp: \"swam\", \"wax\" vẫn là /æ/.",
      examples: [
        { w: "wash", ipa: "wɒʃ", vi: "rửa, giặt" },
        { w: "quality", ipa: "ˈkwɒl.ə.ti", vi: "chất lượng" },
        { w: "war", ipa: "wɔː", vi: "chiến tranh" },
        { w: "warm", ipa: "wɔːm", vi: "ấm áp" },
        { w: "quarter", ipa: "ˈkwɔː.tə", vi: "một phần tư" },
      ],
      sentences: [
        { en: "I [[want]] [[warm]] [[water]] to [[wash]] my hands.", vi: "Tôi muốn nước ấm để rửa tay." },
      ],
    },
    {
      title: "\"al\" + k → /ɔːk/ (l câm); \"all\" → /ɔːl/",
      body:
        "Trong walk, talk, chalk, stalk chữ l không đọc, âm là /ɔː/. Còn all, ball, call, fall, small, tall, wall đọc /ɔːl/ — có /l/ cuối. Từ ghép giữ nguyên: football /ˈfʊt.bɔːl/, also /ˈɔːl.səʊ/.",
      examples: [
        { w: "talk", ipa: "tɔːk", vi: "nói chuyện" },
        { w: "chalk", ipa: "tʃɔːk", vi: "phấn" },
        { w: "small", ipa: "smɔːl", vi: "nhỏ" },
        { w: "also", ipa: "ˈɔːl.səʊ", vi: "cũng" },
      ],
    },
    {
      title: "\"ought\" và \"aught\" → /ɔːt/",
      body:
        "Đây là nhóm động từ quá khứ rất thông dụng: buy → bought, bring → brought, think → thought, fight → fought, catch → caught, teach → taught. Tất cả kết thúc bằng /ɔːt/. Chữ gh câm hoàn toàn.",
      examples: [
        { w: "bought", ipa: "bɔːt", vi: "đã mua" },
        { w: "brought", ipa: "brɔːt", vi: "đã mang" },
        { w: "taught", ipa: "tɔːt", vi: "đã dạy" },
        { w: "caught", ipa: "kɔːt", vi: "đã bắt" },
      ],
      sentences: [
        { en: "She [[taught]] me, and I [[caught]] on fast.", vi: "Cô ấy dạy tôi, và tôi hiểu ra nhanh." },
      ],
    },
    {
      title: "/ɒ/ là âm \"đặc sản\" giọng Anh",
      body:
        "Cùng một từ, người Anh đọc /ɒ/ còn người Mỹ đọc /ɑː/ (hoặc /ɔː/). Vì thế nghe phim Mỹ, \"stop\" gần như \"xtáp\", \"job\" gần như \"giáp\". Khi tra Cambridge, hãy so dòng UK và US để không bị bối rối.",
      examples: [
        { w: "stop", ipa: "stɒp", vi: "dừng (US: stɑːp)" },
        { w: "job", ipa: "dʒɒb", vi: "công việc (US: dʒɑːb)" },
        { w: "long", ipa: "lɒŋ", vi: "dài (US: lɑːŋ)" },
        { w: "box", ipa: "bɒks", vi: "cái hộp (US: bɑːks)" },
      ],
    },
  ],
  story: {
    title: "Cú sút ngắn",
    paras: [
      {
        en: "On a [[warm]] Saturday [[morning]], Tom took Linh to [[watch]] [[football]]. They [[bought]] two [[hot]] [[coffees]] at a [[small]] [[shop]] near the stadium.",
        vi: "Một buổi sáng thứ Bảy ấm áp, Tom dẫn Linh đi xem bóng đá. Họ mua hai cốc cà phê nóng ở một cửa hàng nhỏ gần sân vận động.",
      },
      {
        en: "Late in the game, a player [[got]] the ball and [[shot]]. \"What a [[short]]!\" Linh shouted. Tom grinned: \"You mean [[shot]] — quick and [[short]]! [[Short]] is long and round.\"",
        vi: "Gần cuối trận, một cầu thủ nhận bóng và sút. \"Cú 'ngắn' đẹp quá!\" Linh hét lên. Tom cười toe: \"Ý em là 'shot' — nhanh và ngắn! Còn 'short' thì dài và tròn môi.\"",
      },
      {
        en: "Jake texted from New York: \"Who won? I'm [[watching]] it [[online]].\" Linh replied with a voice message, and Jake said she sounded \"so British\": [[hot]], [[not]], [[got]] — all with Tom's round vowel.",
        vi: "Jake nhắn tin từ New York: \"Đội nào thắng? Tớ đang xem trực tuyến.\" Linh trả lời bằng tin nhắn thoại, và Jake bảo cô nói \"Anh quá\": hot, not, got — đều tròn môi như Tom.",
      },
      {
        en: "When she [[walked]] in the [[door]], Mrs Brown asked, \"[[Fought]] your way through the crowd, dear?\" Linh laughed: \"Yes! And I [[caught]] a cold — [[sorry]]!\" Mrs Brown put the kettle [[on]].",
        vi: "Khi Linh bước vào cửa, bà Brown hỏi: \"Phải chen chúc qua đám đông hả cháu?\" Linh cười: \"Vâng ạ! Mà cháu bị cảm mất rồi — xin lỗi bà!\" Bà Brown liền bắc ấm nước lên.",
      },
    ],
  },
  twister: {
    en: "Tom bought a hot dog and walked along the short shore.",
    vi: "Tom mua một cái bánh mì xúc xích rồi đi dọc bờ biển ngắn. (Luân phiên /ɒ/ – /ɔː/.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "sport",
      opts: ["sport /spɔːt/", "spot /spɒt/"],
      answer: 0,
      explain: "sport /spɔːt/ — dài, môi chu tròn. spot /spɒt/ ngắn, hàm mở to.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy câu nào?",
      say: "Put it in the pot.",
      opts: ["Put it in the pot. /pɒt/", "Put it in the port. /pɔːt/"],
      answer: 0,
      explain: "pot /pɒt/ — cái nồi, âm ngắn. port /pɔːt/ — cảng, âm dài.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Từ nào chứa âm /ɒ/?",
      opts: ["want", "walk", "warm", "water"],
      answer: 0,
      explain: "want /wɒnt/. walk /wɔːk/, warm /wɔːm/, water /ˈwɔː.tə/ đều có /ɔː/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "\"bought\", \"caught\", \"thought\" có chung âm nào?",
      opts: ["/ɔː/", "/aʊ/", "/ɒ/", "/əʊ/"],
      answer: 0,
      explain: "ought / aught → /ɔːt/: bought /bɔːt/, caught /kɔːt/, thought /θɔːt/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm đúng (giọng Anh) của \"walk\" là?",
      opts: ["/wɔːk/", "/wɔːlk/", "/wɒk/", "/wæk/"],
      answer: 0,
      explain: "walk /wɔːk/ — chữ l câm, nguyên âm dài /ɔː/. Đừng nhầm với \"work\" /wɜːk/.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Từ nào KHÔNG chứa âm /ɔː/?",
      opts: ["stop", "four", "saw", "daughter"],
      answer: 0,
      explain: "stop /stɒp/ có /ɒ/ ngắn. four /fɔː/, saw /sɔː/, daughter /ˈdɔː.tə/ đều có /ɔː/.",
    },
    {
      type: "judge",
      q: "Giọng Mỹ chuẩn cũng dùng âm /ɒ/ trong \"hot\" giống giọng Anh.",
      ok: false,
      explain: "Sai. Giọng Mỹ không có /ɒ/: hot đọc /hɑːt/. /ɒ/ là đặc trưng của giọng Anh.",
    },
  ],
};
