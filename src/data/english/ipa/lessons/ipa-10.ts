import type { IpaLesson } from "../types";

export const ipa10: IpaLesson = {
  id: "ipa-10",
  num: 10,
  title: "Nguyên âm đôi lướt về /ə/ — here, there, tour",
  mark: "ɪə · eə · ʊə",
  level: "Trung cấp",
  group: "Nguyên âm đôi",
  intro:
    "Ba nguyên âm đôi này gần như luôn đi với chữ r (here, hair, tour) — và chính chữ r là thứ khiến người học bối rối. Giọng Anh chuẩn KHÔNG phát âm r sau nguyên âm, mà thay bằng một /ə/ nhẹ; giọng Mỹ thì cong lưỡi đọc r. Hiểu điều này, bạn sẽ nghe được cả hai giọng và không còn đọc \"here\" thành \"hia-rờ\". Tin vui: \"ia\", \"ua\" tiếng Việt rất gần /ɪə/ và /ʊə/!",
  phonemes: [
    {
      id: "ia",
      symbol: "ɪə",
      kind: "diphthong",
      name: "ia",
      keyword: { w: "ear", ipa: "ɪə", vi: "cái tai" },
      viLike:
        "Rất gần \"ia\" trong \"bia\", \"mía\", \"kìa\" của tiếng Việt — bắt đầu từ \"i\" lướt về \"ơ\" nhẹ. Khác ở chỗ phần \"i\" thả lỏng (/ɪ/), không căng, và không có dấu thanh.",
      how: [
        "Bắt đầu: miệng ở vị trí /ɪ/ — lưỡi cao, phía trước, môi thả lỏng hơi dẹt.",
        "Lướt: hạ lưỡi về giữa miệng, hàm mở nhẹ đến vị trí /ə/.",
        "Phần /ɪ/ mạnh và rõ hơn; phần /ə/ nhẹ, mờ.",
        "Giọng Anh: KHÔNG cong lưỡi đọc r ở cuối.",
        "Dây thanh rung suốt; một âm tiết.",
      ],
      spellings: [
        { pattern: "eer", words: ["beer", "cheer", "career", "engineer"] },
        { pattern: "ear", words: ["ear", "near", "clear", "year"] },
        { pattern: "ere", words: ["here", "mere", "sphere"] },
        { pattern: "ier / ea / eu (trước nguyên âm)", words: ["pier", "fierce", "idea", "theatre"] },
        { pattern: "er + nguyên âm", words: ["serious", "period", "series"] },
      ],
      words: [
        { w: "ear", ipa: "ɪə", vi: "cái tai" },
        { w: "here", ipa: "hɪə", vi: "ở đây" },
        { w: "near", ipa: "nɪə", vi: "gần" },
        { w: "beer", ipa: "bɪə", vi: "bia" },
        { w: "year", ipa: "jɪə", vi: "năm" },
        { w: "idea", ipa: "aɪˈdɪə", vi: "ý tưởng" },
        { w: "serious", ipa: "ˈsɪə.ri.əs", vi: "nghiêm túc" },
        { w: "career", ipa: "kəˈrɪə", vi: "sự nghiệp" },
      ],
      sentences: [
        { en: "Is there a [[theatre]] [[near]] [[here]]?", vi: "Gần đây có rạp hát nào không?", ipa: "ɪz ðər ə ˈθɪə.tər nɪə hɪə" },
        { en: "That's a [[really]] [[clear]] [[idea]].", vi: "Đó là một ý tưởng thật rõ ràng." },
        { en: "[[Cheers]]! Happy New [[Year]]!", vi: "Cạn ly! Chúc mừng năm mới!" },
      ],
      pairs: [
        { a: { w: "beer", ipa: "bɪə", vi: "bia" }, b: { w: "bear", ipa: "beə", vi: "con gấu" } },
        { a: { w: "ear", ipa: "ɪə", vi: "cái tai" }, b: { w: "air", ipa: "eə", vi: "không khí" } },
        { a: { w: "here", ipa: "hɪə", vi: "ở đây" }, b: { w: "hair", ipa: "heə", vi: "tóc" } },
        { a: { w: "cheer", ipa: "tʃɪə", vi: "cổ vũ" }, b: { w: "chair", ipa: "tʃeə", vi: "cái ghế" } },
        { a: { w: "fear", ipa: "fɪə", vi: "nỗi sợ" }, b: { w: "fair", ipa: "feə", vi: "công bằng" } },
      ],
      mistakes: [
        "Đọc thêm \"rờ\" ở cuối: \"here\" thành \"hia-rờ\", \"beer\" thành \"bia-rờ\". Giọng Anh kết thúc ở /ə/ nhẹ.",
        "Đọc thành \"i\" dài /iː/: \"near\" thành \"ni\", \"here\" thành \"hi\". Phải có cú lướt về /ə/.",
        "Đọc \"year\" giống \"ear\" — \"year\" /jɪə/ có thêm bán âm /j/ (\"y\") ở đầu.",
      ],
      tips: [
        "Nói \"bia\" tiếng Việt, bỏ dấu, thả lỏng phần \"i\" → gần như đúng \"beer\" /bɪə/ giọng Anh.",
        "Nhớ cặp \"ear – year\": \"ear\" bắt đầu thẳng bằng nguyên âm; \"year\" bắt đầu bằng \"y\" lướt.",
        "Luyện cặp với /eə/: \"beer – bear\", \"here – hair\", \"cheer – chair\" — phần đầu khác (i ↔ e), phần cuối giống.",
      ],
      memo: "ɪə = ɪ (i bé) + ə (ơ lười) — đúng là \"ia\" tiếng Việt. Từ khóa: \"ear\" — cái tai nghe \"ia\": /ɪə/.",
      usUk: "Giọng Mỹ không có nguyên âm đôi này mà đọc /ɪ/ + r cong lưỡi: here UK /hɪə/, US /hɪr/; beer UK /bɪə/, US /bɪr/. Với idea, cả hai giọng đều có /ə/: US /aɪˈdiː.ə/.",
    },
    {
      id: "ea",
      symbol: "eə",
      kind: "diphthong",
      name: "e-ơ",
      keyword: { w: "hair", ipa: "heə", vi: "tóc" },
      viLike:
        "Gần \"e\" tiếng Việt lướt nhẹ về \"ơ\" — như \"e-ơ\" nói liền, giống \"eo\" nhưng không tròn môi ở cuối. Giọng Anh hiện đại thường đọc gần như \"e\" kéo dài (/ɛː/), cú lướt rất nhẹ.",
      how: [
        "Bắt đầu: lưỡi phía trước, hàm mở vừa, môi hơi dẹt — vị trí \"e\" tiếng Việt (mở hơn \"ê\").",
        "Lướt: lưỡi lùi nhẹ về giữa miệng, vị trí /ə/.",
        "Phần \"e\" dài và rõ; phần /ə/ rất nhẹ (có khi gần như mất).",
        "Môi không tròn trong suốt quá trình.",
        "Giọng Anh: KHÔNG đọc r ở cuối; dây thanh rung suốt.",
      ],
      spellings: [
        { pattern: "air", words: ["air", "hair", "chair", "fair"] },
        { pattern: "are", words: ["care", "share", "square", "rare"] },
        { pattern: "ear (một nhóm từ)", words: ["bear", "pear", "wear", "swear"] },
        { pattern: "ere / eir", words: ["where", "there", "their", "heir"] },
        { pattern: "ar + nguyên âm", words: ["parents", "Mary", "various"] },
      ],
      words: [
        { w: "air", ipa: "eə", vi: "không khí" },
        { w: "hair", ipa: "heə", vi: "tóc" },
        { w: "where", ipa: "weə", vi: "ở đâu" },
        { w: "chair", ipa: "tʃeə", vi: "cái ghế" },
        { w: "care", ipa: "keə", vi: "quan tâm" },
        { w: "square", ipa: "skweə", vi: "quảng trường; hình vuông" },
        { w: "parents", ipa: "ˈpeə.rənts", vi: "bố mẹ" },
        { w: "airport", ipa: "ˈeə.pɔːt", vi: "sân bay" },
      ],
      sentences: [
        { en: "[[Where]] are the [[chairs]]? — Over [[there]].", vi: "Mấy cái ghế đâu rồi? — Ở đằng kia.", ipa: "weər ə ðə tʃeəz — ˈəʊ.və ðeə" },
        { en: "Take [[care]] on the [[stairs]].", vi: "Cẩn thận ở cầu thang nhé." },
        { en: "My [[parents]] [[wear]] [[rare]] [[pairs]] of shoes.", vi: "Bố mẹ tôi đi những đôi giày hiếm có." },
      ],
      pairs: [
        { a: { w: "air", ipa: "eə", vi: "không khí" }, b: { w: "ear", ipa: "ɪə", vi: "cái tai" } },
        { a: { w: "chair", ipa: "tʃeə", vi: "cái ghế" }, b: { w: "cheer", ipa: "tʃɪə", vi: "cổ vũ" } },
        { a: { w: "where", ipa: "weə", vi: "ở đâu" }, b: { w: "were", ipa: "wɜː", vi: "đã là (số nhiều)" } },
        { a: { w: "hair", ipa: "heə", vi: "tóc" }, b: { w: "her", ipa: "hɜː", vi: "cô ấy" } },
        { a: { w: "stairs", ipa: "steəz", vi: "cầu thang" }, b: { w: "stars", ipa: "stɑːz", vi: "những ngôi sao" } },
      ],
      mistakes: [
        "Đọc \"ear\" trong \"bear\", \"wear\" thành /ɪə/: \"wear\" (mặc) nghe thành \"we're\" hay \"weir\". \"bear, pear, wear\" là /eə/.",
        "Thêm \"rờ\" cuối: \"where\" thành \"oe-rờ\", \"care\" thành \"ke-rờ\". Giọng Anh không đọc r.",
        "Nhầm \"where\" /weə/ với \"were\" /wɜː/: \"Where you?\" ↔ \"Were you?\" — miệng phải mở ra \"e\", không phải \"ơ\".",
      ],
      tips: [
        "Nói \"e\" tiếng Việt kéo dài rồi thả lỏng cuối: \"eee-ơ\" → \"air\" /eə/.",
        "Nhớ nhóm \"ear\" đọc /eə/: chỉ có vài từ — bear, pear, wear, swear, tear (xé). Còn lại hầu hết là /ɪə/.",
        "\"there\", \"their\", \"they're\" đều đọc /ðeə/ — phân biệt bằng ngữ cảnh, không phải bằng âm.",
      ],
      memo: "eə = e (mở miệng như \"e\") + ə (thả lỏng) — \"tóc bay trong gió: e-ơ\". Từ khóa: \"hair\" — /heə/.",
      usUk: "Giọng Mỹ đọc /e/ + r cong lưỡi: hair UK /heə/, US /her/; where UK /weə/, US /wer/. Giọng Anh trẻ hiện nay thường đọc /ɛː/ dài: hair /hɛː/.",
    },
    {
      id: "ua",
      symbol: "ʊə",
      kind: "diphthong",
      name: "ua",
      keyword: { w: "tour", ipa: "tʊə", vi: "chuyến tham quan" },
      viLike:
        "Rất gần \"ua\" trong \"mua\", \"cua\" của tiếng Việt — bắt đầu từ \"u\" tròn môi, lướt về \"ơ\" nhẹ. Phần \"u\" ngắn và thả lỏng hơn \"u\" tiếng Việt.",
      how: [
        "Bắt đầu: môi tròn, hơi chu; lưỡi phía sau, nâng cao — vị trí /ʊ/.",
        "Lướt: thả môi ra không tròn, lưỡi về giữa miệng, vị trí /ə/.",
        "Phần /ʊ/ rõ hơn; phần /ə/ nhẹ.",
        "Giọng Anh: không đọc r ở cuối.",
        "Dây thanh rung suốt; một âm tiết.",
      ],
      spellings: [
        { pattern: "our", words: ["tour", "tourist", "gourmet"] },
        { pattern: "oor (một số từ)", words: ["poor", "moor"] },
        { pattern: "ure (thường sau /j/ → /jʊə/)", words: ["sure", "cure", "pure", "mature"] },
        { pattern: "ur / eu + nguyên âm", words: ["during", "jury", "Europe", "curious"] },
        { pattern: "Ngoại lệ: oor/our đọc /ɔː/", words: ["door", "floor", "your", "four"] },
      ],
      words: [
        { w: "tour", ipa: "tʊə", vi: "chuyến tham quan" },
        { w: "poor", ipa: "pʊə", vi: "nghèo; tội nghiệp" },
        { w: "sure", ipa: "ʃʊə", vi: "chắc chắn" },
        { w: "pure", ipa: "pjʊə", vi: "tinh khiết" },
        { w: "tourist", ipa: "ˈtʊə.rɪst", vi: "khách du lịch" },
        { w: "during", ipa: "ˈdʒʊə.rɪŋ", vi: "trong suốt" },
        { w: "Europe", ipa: "ˈjʊə.rəp", vi: "châu Âu" },
        { w: "curious", ipa: "ˈkjʊə.ri.əs", vi: "tò mò" },
      ],
      sentences: [
        { en: "Are you [[sure]] about the [[tour]]?", vi: "Bạn có chắc về chuyến tham quan không?", ipa: "ə ju ʃʊər əˈbaʊt ðə tʊə" },
        { en: "The [[tourists]] were [[curious]] about [[Europe]].", vi: "Các du khách tò mò về châu Âu." },
        { en: "The [[poor]] dog slept [[during]] the film.", vi: "Chú chó tội nghiệp ngủ suốt bộ phim." },
      ],
      pairs: [
        { a: { w: "tour", ipa: "tʊə", vi: "chuyến tham quan" }, b: { w: "tear", ipa: "tɪə", vi: "nước mắt" } },
        { a: { w: "poor", ipa: "pʊə", vi: "nghèo" }, b: { w: "pair", ipa: "peə", vi: "một đôi" } },
        { a: { w: "sure", ipa: "ʃʊə", vi: "chắc chắn" }, b: { w: "share", ipa: "ʃeə", vi: "chia sẻ" } },
      ],
      mistakes: [
        "Đọc \"tour\" như \"tao\" (/taʊ/) theo chữ \"ou\" của \"house\". Đúng là /tʊə/ — \"tua\".",
        "Đọc thêm \"rờ\" cuối: \"sure\" thành \"sua-rờ\", \"poor\" thành \"pua-rờ\".",
        "Bỏ /j/ trước /ʊə/: \"pure\" /pjʊə/ đọc thành \"pua\", \"Europe\" /ˈjʊə.rəp/ thành \"ơ-rốp\". Phải có \"y\" lướt: \"piua\", \"yua-rợp\".",
      ],
      tips: [
        "Nói \"mua\", \"cua\" tiếng Việt, thả lỏng môi hơn — đó là /ʊə/ giọng Anh.",
        "Đừng lo nếu nghe người Anh trẻ đọc \"sure\", \"poor\" là /ʃɔː/, /pɔː/ — đó là cách đọc hiện đại phổ biến, cũng đúng.",
        "Âm này hiếm nhất trong 44 âm; học kỹ vài từ quen thuộc: tour, tourist, sure, poor, during, Europe.",
      ],
      memo: "ʊə = ʊ (u chu môi) + ə (thả lỏng) — đúng \"ua\" tiếng Việt. Từ khóa: \"tour\" — đi \"tua\" du lịch: /tʊə/.",
      usUk: "Giọng Mỹ đọc /ʊ/ + r cong lưỡi: tour UK /tʊə/, US /tʊr/; sure UK /ʃʊə/ hoặc /ʃɔː/, US /ʃʊr/.",
    },
  ],
  rules: [
    {
      title: "Giọng Anh không đọc r sau nguyên âm (non-rhotic)",
      body:
        "Trong giọng Anh chuẩn, chữ r chỉ được phát âm khi đứng TRƯỚC một nguyên âm (red, very, around). Khi r đứng sau nguyên âm ở cuối từ hoặc trước phụ âm, nó không được đọc — dấu vết còn lại là một /ə/ nhẹ, tạo ra ba nguyên âm đôi /ɪə/, /eə/, /ʊə/ (hoặc kéo dài nguyên âm: car /kɑː/, more /mɔː/, bird /bɜːd/). Giọng Mỹ là giọng \"rhotic\": luôn đọc r bằng cách cong lưỡi, nên dùng /ɪr/, /er/, /ʊr/ thay cho ba âm này. Cả hai đều chuẩn — chọn một giọng và giữ nhất quán.",
      examples: [
        { w: "here", ipa: "hɪə", vi: "UK — US: hɪr" },
        { w: "hair", ipa: "heə", vi: "UK — US: her" },
        { w: "tour", ipa: "tʊə", vi: "UK — US: tʊr" },
        { w: "very", ipa: "ˈver.i", vi: "r trước nguyên âm → cả UK và US đều đọc" },
      ],
    },
    {
      title: "Âm r nối (linking r): r \"sống lại\" trước nguyên âm",
      body:
        "Khi từ kết thúc bằng chữ r (hoặc re) đứng ngay trước một từ bắt đầu bằng nguyên âm, giọng Anh phát âm lại /r/ để nối hai từ cho trơn tru. \"Where\" đứng một mình là /weə/, nhưng \"Where is…\" là /weər ɪz/.",
      examples: [
        { w: "where is", ipa: "weər ɪz", vi: "ở đâu" },
        { w: "here and there", ipa: "hɪər ən ðeə", vi: "chỗ này chỗ kia" },
        { w: "your ear", ipa: "jɔːr ɪə", vi: "tai bạn" },
      ],
      sentences: [
        { en: "[[Where]] are you? I'm over [[here]]!", vi: "Bạn ở đâu? Mình ở đằng này!", ipa: "weər ə ju — aɪm ˈəʊ.və hɪə" },
        { en: "[[Their]] office is [[near]] a [[square]].", vi: "Văn phòng của họ gần một quảng trường.", ipa: "ðeər ˈɒf.ɪs ɪz nɪər ə skweə" },
      ],
    },
    {
      title: "Chữ \"ear\" có bốn cách đọc",
      body:
        "Đây là cụm chữ dễ đọc sai nhất. Thường gặp nhất là /ɪə/ (hear, near, year). Nhóm nhỏ đọc /eə/ (bear, pear, wear, swear). Trước phụ âm thường là /ɜː/ (learn, early, heard). Và vài từ có /ɑː/ (heart, hearth). Chữ \"tear\" có hai nghĩa: /tɪə/ (nước mắt) và /teə/ (xé).",
      examples: [
        { w: "hear", ipa: "hɪə", vi: "nghe" },
        { w: "wear", ipa: "weə", vi: "mặc" },
        { w: "learn", ipa: "lɜːn", vi: "học" },
        { w: "heart", ipa: "hɑːt", vi: "trái tim" },
      ],
    },
    {
      title: "Xu hướng hiện đại: eə → ɛː, ʊə → ɔː",
      body:
        "Trong giọng Anh trẻ hiện nay, /eə/ thường được đọc thành nguyên âm dài /ɛː/ (hair /hɛː/), và /ʊə/ trong nhiều từ phổ biến chuyển thành /ɔː/: sure /ʃɔː/, poor /pɔː/, your /jɔː/. Từ điển Cambridge và Oxford ghi cả hai. Bạn nên nhận biết được cả hai cách khi nghe; khi nói, cách nào cũng được chấp nhận.",
      examples: [
        { w: "sure", ipa: "ʃɔː", vi: "cách đọc hiện đại (truyền thống: ʃʊə)" },
        { w: "poor", ipa: "pɔː", vi: "cách đọc hiện đại (truyền thống: pʊə)" },
      ],
    },
  ],
  story: {
    title: "Một tối ở rạp hát",
    paras: [
      {
        en: "Tom had tickets for the [[theatre]] and invited Linh. \"[[Where]] are our seats?\" she asked. \"[[Near]] the [[stairs]], over [[there]],\" said Tom.",
        vi: "Tom có vé xem kịch và mời Linh đi cùng. \"Ghế của mình ở đâu anh?\" cô hỏi. \"Gần cầu thang, ở đằng kia,\" Tom nói.",
      },
      {
        en: "Jake met them [[there]]. \"In America we say '[[here]]' and '[[there]]' with a strong r,\" he [[declared]], and Tom rolled his eyes.",
        vi: "Jake gặp họ ở đó. \"Ở Mỹ bọn tôi nói 'here' với 'there' có âm r rõ ràng,\" cậu tuyên bố, còn Tom thì đảo mắt.",
      },
      {
        en: "The play was about a [[poor]] [[tourist]] on a [[European]] [[tour]]. Linh wasn't [[sure]] about every [[idea]], but the story was [[really]] [[clear]].",
        vi: "Vở kịch kể về một du khách nghèo trong chuyến du lịch châu Âu. Linh không chắc mình hiểu hết mọi ý, nhưng câu chuyện thật sự rất dễ theo dõi.",
      },
      {
        en: "Back home, Mrs Brown was in her [[armchair]]. \"Did you have a nice evening, [[dear]]?\" \"[[Yeah]]! I want to go again next [[year]],\" said Linh, climbing the [[stairs]].",
        vi: "Về đến nhà, bà Brown đang ngồi trên ghế bành. \"Tối nay vui chứ cháu?\" \"Vâng ạ! Sang năm cháu muốn đi nữa,\" Linh vừa nói vừa leo cầu thang.",
      },
    ],
  },
  twister: {
    en: "Here and there, a pair of poor tourists share a beer on chairs near the pier.",
    vi: "Chỗ này chỗ kia, một cặp du khách nghèo chia nhau cốc bia trên những chiếc ghế gần cầu tàu. (Luân phiên /ɪə/ – /eə/ – /ʊə/.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "beer",
      opts: ["beer /bɪə/", "bear /beə/"],
      answer: 0,
      explain: "beer /bɪə/ bắt đầu từ \"i\" (như \"bia\"); bear /beə/ bắt đầu từ \"e\" mở hơn.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "chair",
      opts: ["chair /tʃeə/", "cheer /tʃɪə/"],
      answer: 0,
      explain: "chair /tʃeə/ mở miệng \"e\"; cheer /tʃɪə/ khép hơn, bắt đầu từ \"i\".",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Chữ \"ear\" trong từ nào đọc là /eə/?",
      opts: ["wear", "near", "learn", "heart"],
      answer: 0,
      explain: "wear /weə/. near /nɪə/, learn /lɜːn/, heart /hɑːt/ — cùng chữ \"ear\" mà bốn cách đọc!",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Từ nào chứa âm /ɪə/?",
      opts: ["idea", "where", "there", "pair"],
      answer: 0,
      explain: "idea /aɪˈdɪə/. where /weə/, there /ðeə/, pair /peə/ đều có /eə/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm giọng Anh của \"tourist\" là?",
      opts: ["/ˈtʊə.rɪst/", "/ˈtaʊ.rɪst/", "/ˈtuː.rɪst/", "/ˈtʌ.rɪst/"],
      answer: 0,
      explain: "tourist /ˈtʊə.rɪst/ — chữ \"our\" ở đây là /ʊə/ (\"tua\"), không phải /aʊ/ như trong \"house\".",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Giọng Anh (UK) đọc \"here\" đứng một mình thế nào?",
      opts: ["/hɪə/ — không có r", "/hɪr/ — cong lưỡi đọc r", "/hiː/ — i dài", "/her/ — như hair kiểu Mỹ"],
      answer: 0,
      explain: "Giọng Anh không đọc r sau nguyên âm: /hɪə/. /hɪr/ là cách đọc giọng Mỹ.",
    },
    {
      type: "judge",
      q: "Trong câu \"Where are you?\", giọng Anh phát âm /r/ ở cuối \"where\" vì từ tiếp theo bắt đầu bằng nguyên âm.",
      ok: true,
      explain: "Đúng. Đó là \"r nối\" (linking r): /weər ə ju/. Đứng một mình thì \"where\" là /weə/.",
    },
  ],
};
