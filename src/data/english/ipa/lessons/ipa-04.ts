import type { IpaLesson } from "../types";

export const ipa04: IpaLesson = {
  id: "ipa-04",
  num: 4,
  title: "ʌ và ɑː — cup hay car?",
  mark: "ʌ · ɑː",
  level: "Cơ bản",
  group: "Nguyên âm đơn",
  intro:
    "Hai âm \"a\" của tiếng Anh: /ʌ/ ngắn, gọn như \"ă\" trong \"ăn\"; /ɑː/ dài, sâu, mở to như khi bác sĩ bảo \"há miệng ra\". Người Việt hay đọc \"cut\" (cắt) và \"cart\" (xe đẩy), \"much\" và \"march\" giống nhau, lại thường đọc chữ o trong \"love\", \"money\" thành \"o\" — trong khi đó chính là /ʌ/.",
  phonemes: [
    {
      id: "a-short",
      symbol: "ʌ",
      kind: "short-vowel",
      name: "ă ngắn",
      keyword: { w: "cup", ipa: "kʌp", vi: "cái cốc" },
      viLike:
        "Rất gần \"ă\" trong \"ăn\", \"cắt\" của tiếng Việt — ngắn, gọn, miệng mở vừa. Chỉ khác là lưỡi hơi lùi về giữa miệng và không có thanh điệu.",
      how: [
        "Môi: thả lỏng, không tròn, không bẹt — mặt tự nhiên.",
        "Lưỡi: nằm ở giữa miệng, hơi lùi về sau; đầu lưỡi thả lỏng sau răng cửa dưới.",
        "Hàm: mở vừa phải, khoảng một ngón tay.",
        "Độ dài: rất ngắn, bật ra gọn như tiếng \"ắ!\" khi bị bất ngờ.",
        "Dây thanh rung; cơ miệng thả lỏng hoàn toàn.",
      ],
      vowel: { x: 0.62, y: 0.72, round: false },
      spellings: [
        { pattern: "u (âm tiết đóng)", words: ["cup", "bus", "sun", "much", "run"] },
        { pattern: "o (nhóm từ thông dụng)", words: ["love", "come", "son", "money", "Monday"] },
        { pattern: "ou", words: ["young", "country", "touch", "enough", "double"] },
        { pattern: "oo (ngoại lệ)", words: ["blood", "flood"] },
        { pattern: "oe (ngoại lệ)", words: ["does"] },
      ],
      words: [
        { w: "cup", ipa: "kʌp", vi: "cái cốc" },
        { w: "bus", ipa: "bʌs", vi: "xe buýt" },
        { w: "sun", ipa: "sʌn", vi: "mặt trời" },
        { w: "love", ipa: "lʌv", vi: "yêu" },
        { w: "money", ipa: "ˈmʌn.i", vi: "tiền" },
        { w: "mother", ipa: "ˈmʌð.ə", vi: "mẹ" },
        { w: "young", ipa: "jʌŋ", vi: "trẻ" },
        { w: "country", ipa: "ˈkʌn.tri", vi: "đất nước, nông thôn" },
      ],
      sentences: [
        { en: "My [[mother]] [[loves]] a [[cup]] of tea.", vi: "Mẹ tôi rất thích một tách trà.", ipa: "maɪ ˈmʌð.ə lʌvz ə kʌp əv tiː" },
        { en: "[[Come]] on — the [[bus]] [[comes]] at [[one]].", vi: "Nhanh lên — xe buýt đến lúc một giờ." },
        { en: "My [[young]] [[cousin]] [[doesn't]] have [[much]] [[money]].", vi: "Cậu em họ trẻ của tôi không có nhiều tiền." },
      ],
      pairs: [
        { a: { w: "cut", ipa: "kʌt", vi: "cắt" }, b: { w: "cart", ipa: "kɑːt", vi: "xe đẩy" } },
        { a: { w: "much", ipa: "mʌtʃ", vi: "nhiều" }, b: { w: "march", ipa: "mɑːtʃ", vi: "diễu hành" } },
        { a: { w: "hut", ipa: "hʌt", vi: "túp lều" }, b: { w: "heart", ipa: "hɑːt", vi: "trái tim" } },
        { a: { w: "duck", ipa: "dʌk", vi: "con vịt" }, b: { w: "dark", ipa: "dɑːk", vi: "tối" } },
        { a: { w: "bun", ipa: "bʌn", vi: "bánh bao ngọt" }, b: { w: "barn", ipa: "bɑːn", vi: "nhà kho" } },
        { a: { w: "come", ipa: "kʌm", vi: "đến" }, b: { w: "calm", ipa: "kɑːm", vi: "bình tĩnh" } },
      ],
      mistakes: [
        "Đọc chữ o thành \"o\" tiếng Việt: \"love\" thành \"lo-v\", \"money\" thành \"mo-ni\", \"come\" thành \"cơm\". Đúng là /ʌ/: lʌv, ˈmʌn.i, kʌm.",
        "Đọc chữ u thành \"u\" tiếng Việt: \"bus\" thành \"buýt\", \"sun\" thành \"xun\". Chữ u ở đây đọc /ʌ/.",
        "Mở miệng quá to và kéo dài → \"cut\" nghe thành \"cart\", hoặc quá bẹt → \"cup\" nghe thành \"cap\" /kæp/.",
      ],
      tips: [
        "Nói \"ăn\" tiếng Việt thật ngắn, bỏ \"n\" — gần như đã có /ʌ/.",
        "Tưởng tượng bị ai đấm nhẹ vào bụng: \"ắ!\" — âm bật ra tự nhiên đó chính là /ʌ/.",
        "Học thuộc nhóm chữ o đọc /ʌ/: come, some, love, son, month, Monday, money, mother, brother, other, nothing, above.",
      ],
      memo: "Ký hiệu ʌ giống chữ V lộn ngược — như cái nắp cốc úp xuống. Từ khóa: \"cup\" — cái cốc, nói nhanh, gọn: /kʌp/.",
      usUk: "Giọng Mỹ cũng dùng /ʌ/ ở âm tiết nhấn (cup, love). Trong âm tiết không nhấn, cả hai giọng đều đọc yếu thành /ə/.",
    },
    {
      id: "a-long",
      symbol: "ɑː",
      kind: "long-vowel",
      name: "a dài",
      keyword: { w: "car", ipa: "kɑː", vi: "xe ô tô" },
      viLike:
        "Giống \"a\" trong \"ba\", \"cha\" nhưng kéo dài gấp đôi, miệng mở to hơn và âm phát ra từ sâu trong họng — như khi bác sĩ bảo \"há miệng ra, nói 'aaa'\".",
      how: [
        "Môi: thả lỏng, mở rộng tự nhiên, không tròn.",
        "Lưỡi: hạ thấp và lùi về phía sau; cuống lưỡi hạ xuống như khi khám họng.",
        "Hàm: mở TO, thấp nhất trong các nguyên âm — đặt vừa hai ngón tay.",
        "Độ dài: kéo dài \"aaa\" — dấu ː nghĩa là âm DÀI.",
        "Với chữ \"ar\": giọng Anh KHÔNG đọc r (car = kɑː); chỉ kéo dài nguyên âm.",
      ],
      vowel: { x: 0.92, y: 0.95, round: false },
      spellings: [
        { pattern: "ar", words: ["car", "park", "star", "hard", "garden"] },
        { pattern: "a + ss / st / sk / th / nt / nce (giọng Anh)", words: ["class", "fast", "ask", "bath", "can't", "dance"] },
        { pattern: "al (l câm)", words: ["calm", "half", "palm"] },
        { pattern: "au / ear (ngoại lệ)", words: ["aunt", "laugh", "heart"] },
        { pattern: "a (từ gốc nước ngoài)", words: ["father", "banana", "drama", "pasta"] },
      ],
      words: [
        { w: "car", ipa: "kɑː", vi: "xe ô tô" },
        { w: "park", ipa: "pɑːk", vi: "công viên" },
        { w: "start", ipa: "stɑːt", vi: "bắt đầu" },
        { w: "father", ipa: "ˈfɑː.ðə", vi: "bố" },
        { w: "glass", ipa: "ɡlɑːs", vi: "cái ly, thủy tinh" },
        { w: "half", ipa: "hɑːf", vi: "một nửa" },
        { w: "garden", ipa: "ˈɡɑː.dən", vi: "khu vườn" },
        { w: "banana", ipa: "bəˈnɑː.nə", vi: "quả chuối" },
      ],
      sentences: [
        { en: "My [[father]] [[parked]] the [[car]] in the [[dark]].", vi: "Bố tôi đỗ xe trong bóng tối.", ipa: "maɪ ˈfɑː.ðə pɑːkt ðə kɑːr ɪn ðə dɑːk" },
        { en: "[[Can't]] we [[start]] the [[class]] [[after]] lunch?", vi: "Mình không thể bắt đầu lớp học sau bữa trưa sao?" },
        { en: "[[Half]] a [[banana]] and a [[glass]] of milk.", vi: "Nửa quả chuối và một ly sữa." },
      ],
      pairs: [
        { a: { w: "cart", ipa: "kɑːt", vi: "xe đẩy" }, b: { w: "cut", ipa: "kʌt", vi: "cắt" } },
        { a: { w: "heart", ipa: "hɑːt", vi: "trái tim" }, b: { w: "hut", ipa: "hʌt", vi: "túp lều" } },
        { a: { w: "march", ipa: "mɑːtʃ", vi: "diễu hành" }, b: { w: "much", ipa: "mʌtʃ", vi: "nhiều" } },
        { a: { w: "dark", ipa: "dɑːk", vi: "tối" }, b: { w: "duck", ipa: "dʌk", vi: "con vịt" } },
        { a: { w: "calm", ipa: "kɑːm", vi: "bình tĩnh" }, b: { w: "come", ipa: "kʌm", vi: "đến" } },
      ],
      mistakes: [
        "Đọc ngắn như \"a\" tiếng Việt → \"cart\" nghe thành \"cut\", \"heart\" thành \"hut\". Phải kéo dài và mở sâu.",
        "Cố đọc r theo kiểu tiếng Việt (rung lưỡi) trong \"car\", \"park\": giọng Anh không đọc r sau nguyên âm.",
        "Đọc l trong \"half\", \"calm\", \"palm\": chữ l câm — half /hɑːf/, calm /kɑːm/.",
      ],
      tips: [
        "Há miệng như khám họng, nói \"aaa\" trầm và dài — đó là /ɑː/.",
        "Vỗ tay đếm: /ɑː/ kéo 2 nhịp, /ʌ/ chỉ nửa nhịp. Luyện \"cut – cart – cut – cart\".",
        "Khi chọn giọng Anh, nhớ nhóm từ BATH (class, fast, ask, after, can't, dance) đọc /ɑː/; nếu thích giọng Mỹ thì đọc /æ/ — nhưng giữ nhất quán.",
      ],
      memo: "Ký hiệu ɑ là chữ a \"viết tay\" tròn trịa, cộng dấu ː kéo dài → miệng há tròn to, \"aaa\" dài. Từ khóa: \"car\" — chiếc xe nổ máy \"kaaa\": /kɑː/.",
      usUk: "Giọng Mỹ đọc r: car /kɑːr/, park /pɑːrk/. Nhóm từ BATH đọc /æ/ ở Mỹ: glass /ɡlæs/, half /hæf/, can't /kænt/, after /ˈæf.tɚ/. Âm /ɑː/ của Mỹ còn xuất hiện trong \"hot\", \"stop\" (Anh đọc /ɒ/).",
    },
  ],
  rules: [
    {
      title: "Chữ o đọc /ʌ/ — nhóm từ hằng ngày",
      body:
        "Rất nhiều từ thông dụng viết bằng chữ o nhưng đọc /ʌ/, thường đứng trước m, n, v, th: come, some, love, glove, son, ton, won, month, Monday, money, honey, mother, brother, other, nothing, above, wonder. Đây là lỗi phát âm phổ biến nhất của người Việt với âm này — hãy học thuộc danh sách.",
      examples: [
        { w: "some", ipa: "sʌm", vi: "một vài" },
        { w: "month", ipa: "mʌnθ", vi: "tháng" },
        { w: "brother", ipa: "ˈbrʌð.ə", vi: "anh/em trai" },
        { w: "nothing", ipa: "ˈnʌθ.ɪŋ", vi: "không có gì" },
        { w: "Monday", ipa: "ˈmʌn.deɪ", vi: "thứ Hai" },
      ],
      sentences: [
        { en: "My [[brother]] [[comes]] on [[Monday]] [[once]] a [[month]].", vi: "Anh trai tôi đến vào thứ Hai, mỗi tháng một lần." },
      ],
    },
    {
      title: "\"ar\" → /ɑː/, r câm — nhưng sẽ \"sống lại\" khi nối với nguyên âm",
      body:
        "Trong giọng Anh, r sau nguyên âm không được đọc: car /kɑː/, far /fɑː/, star /stɑː/. Tuy nhiên khi từ tiếp theo bắt đầu bằng nguyên âm, r được đọc để nối hai từ cho mượt (r nối): \"far away\" /fɑːr əˈweɪ/, \"car is\" /kɑːr ɪz/.",
      examples: [
        { w: "far", ipa: "fɑː", vi: "xa" },
        { w: "star", ipa: "stɑː", vi: "ngôi sao" },
        { w: "hard", ipa: "hɑːd", vi: "khó, cứng" },
      ],
      sentences: [
        { en: "The [[car]] is [[far]] away.", vi: "Chiếc xe ở xa lắm.", ipa: "ðə kɑːr ɪz fɑːr əˈweɪ" },
      ],
    },
    {
      title: "Nhóm từ BATH: Anh /ɑː/ — Mỹ /æ/",
      body:
        "Chữ a đứng trước ss, st, sk, th, nt, nce, ff (và một số từ khác) đọc /ɑː/ trong giọng Anh miền Nam (chuẩn từ điển) nhưng /æ/ trong giọng Mỹ. Không có quy luật tuyệt đối: \"mass\", \"cat\", \"fantastic\" vẫn là /æ/ ở cả hai giọng. Tra từ điển để chắc chắn.",
      examples: [
        { w: "class", ipa: "klɑːs", vi: "lớp học (US: klæs)" },
        { w: "after", ipa: "ˈɑːf.tə", vi: "sau khi (US: ˈæf.tɚ)" },
        { w: "ask", ipa: "ɑːsk", vi: "hỏi (US: æsk)" },
        { w: "dance", ipa: "dɑːns", vi: "nhảy múa (US: dæns)" },
        { w: "can't", ipa: "kɑːnt", vi: "không thể (US: kænt)" },
      ],
    },
    {
      title: "/ʌ/ nhấn và /ə/ không nhấn",
      body:
        "/ʌ/ chỉ xuất hiện trong âm tiết được nhấn. Khi các từ chức năng như but, us, some, must, just không được nhấn trong câu, chúng yếu đi thành /ə/: \"but\" /bʌt/ → /bət/. Người Việt hay đọc rõ tất cả các từ, làm câu nói mất nhịp. Nhấn từ nội dung, làm nhẹ từ chức năng.",
      examples: [
        { w: "but", ipa: "bʌt", vi: "nhưng (dạng mạnh; dạng yếu: bət)" },
        { w: "us", ipa: "ʌs", vi: "chúng tôi (dạng mạnh; dạng yếu: əs)" },
        { w: "some", ipa: "sʌm", vi: "một vài (dạng mạnh; dạng yếu: səm)" },
      ],
      sentences: [
        { en: "Give us some bread, but not much.", vi: "Cho chúng tôi ít bánh mì, nhưng đừng nhiều.", ipa: "ɡɪv əs səm bred bət nɒt mʌtʃ" },
      ],
    },
  ],
  story: {
    title: "Cốc trà và chiếc xe",
    paras: [
      {
        en: "On [[Sunday]], Tom invited Linh to a [[barbecue]] in his [[garden]]. \"[[Come]] by [[bus]], it's not [[far]],\" he said. But Linh got lost in the [[dark]] and ran in circles round the [[park]].",
        vi: "Chủ nhật, Tom mời Linh đến tiệc nướng trong vườn nhà anh. \"Đi xe buýt nhé, không xa đâu,\" anh nói. Nhưng Linh lạc đường trong bóng tối và đi vòng vòng quanh công viên.",
      },
      {
        en: "She phoned Tom. \"I'm next to a big [[hut]]!\" Tom was confused: \"A [[heart]]?\" Linh [[laughed]] and tried again, short and quick: \"[[Hut]]! A wooden [[hut]]!\" Two minutes later, Tom's [[father]] arrived in his [[car]].",
        vi: "Cô gọi cho Tom: \"Em đang đứng cạnh một túp lều to!\" Tom bối rối: \"Một trái tim á?\" Linh bật cười và nói lại thật ngắn, gọn: \"Túp lều! Một túp lều gỗ!\" Hai phút sau, bố Tom lái xe tới.",
      },
      {
        en: "At the party, Tom's [[mother]] offered her a [[cup]] of tea and [[half]] a [[banana]] cake. Jake was there too. \"Wanna dance?\" he asked, with an American accent. Tom [[laughed]]: \"Here we say [[dance]], [[class]], [[bath]] — long and [[calm]].\"",
        vi: "Ở bữa tiệc, mẹ Tom mời cô một tách trà và nửa cái bánh chuối. Jake cũng ở đó. \"Nhảy không?\" cậu hỏi bằng âm \"a\" kiểu Mỹ. Tom cười: \"Ở đây bọn tớ đọc dance, class, bath — dài và thong thả.\"",
      },
      {
        en: "Back home, Mrs Brown asked, \"Did you have [[fun]], [[love]]?\" Linh smiled: \"[[Much]] [[fun]]! But next time I'll take a [[car]], not a [[bus]].\"",
        vi: "Về nhà, bà Brown hỏi: \"Vui không cháu yêu?\" Linh cười: \"Vui lắm ạ! Nhưng lần sau cháu sẽ đi ô tô, không đi xe buýt nữa.\"",
      },
    ],
  },
  twister: {
    en: "Mum's fast car can't park in the dark by the bus stop.",
    vi: "Chiếc xe nhanh của mẹ không thể đỗ trong bóng tối cạnh trạm xe buýt. (Đổi luân phiên /ʌ/ – /ɑː/.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "heart",
      opts: ["heart /hɑːt/", "hut /hʌt/"],
      answer: 0,
      explain: "heart /hɑːt/ — miệng mở to, kéo dài. hut /hʌt/ ngắn, gọn.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy câu nào?",
      say: "Don't cut it.",
      opts: ["Don't cut it. /kʌt/", "Don't cart it. /kɑːt/"],
      answer: 0,
      explain: "cut /kʌt/ — ngắn như \"cắt\". cart /kɑːt/ dài và sâu.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Từ nào chứa âm /ʌ/?",
      opts: ["money", "home", "car", "hot"],
      answer: 0,
      explain: "money /ˈmʌn.i/ — chữ o đọc /ʌ/. home /həʊm/, car /kɑː/, hot /hɒt/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Theo giọng Anh, chữ a trong từ nào đọc là /ɑː/?",
      opts: ["fast", "cat", "map", "happy"],
      answer: 0,
      explain: "fast /fɑːst/ (UK) — nhóm BATH. cat, map, happy có /æ/. Giọng Mỹ đọc fast là /fæst/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm đúng (giọng Anh) của \"half\" là?",
      opts: ["/hɑːf/", "/hælf/", "/hʌlf/", "/hɔːf/"],
      answer: 0,
      explain: "half /hɑːf/ — chữ l câm. Giọng Mỹ: /hæf/.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Từ nào KHÔNG chứa âm /ʌ/?",
      opts: ["move", "love", "come", "blood"],
      answer: 0,
      explain: "move /muːv/ có /uː/. love /lʌv/, come /kʌm/, blood /blʌd/ đều có /ʌ/.",
    },
    {
      type: "judge",
      q: "Trong giọng Anh, \"car\" được đọc có âm r ở cuối khi đứng một mình.",
      ok: false,
      explain: "Sai. Giọng Anh: car /kɑː/, r câm. Chỉ đọc r khi nối với nguyên âm (car is → /kɑːr ɪz/). Giọng Mỹ thì luôn đọc r: /kɑːr/.",
    },
  ],
};
