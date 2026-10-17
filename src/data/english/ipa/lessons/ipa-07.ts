import type { IpaLesson } from "../types";

export const ipa07: IpaLesson = {
  id: "ipa-07",
  num: 7,
  title: "Schwa /ə/ và ơ dài /ɜː/ — âm \"lười\" nhất tiếng Anh",
  mark: "ə · ɜː",
  level: "Cơ bản",
  group: "Nguyên âm đơn",
  intro:
    "/ə/ (schwa) là âm xuất hiện NHIỀU NHẤT trong tiếng Anh, nhưng gần như không có chữ cái riêng: a, e, o, u, -er, -or… đều có thể đọc là /ə/ khi không được nhấn. Người Việt quen đọc rõ từng chữ, từng âm tiết nên nói tiếng Anh bị \"cứng\" và khó nghe. Học /ə/ (ngắn, lười, không nhấn) cùng /ɜː/ (dài, có nhấn — bird, work) là chìa khóa để nói có nhịp điệu tự nhiên.",
  phonemes: [
    {
      id: "schwa",
      symbol: "ə",
      kind: "short-vowel",
      name: "ơ lười (schwa)",
      keyword: { w: "about", ipa: "əˈbaʊt", vi: "về, khoảng" },
      viLike:
        "Gần giống \"ơ\" tiếng Việt nhưng NGẮN, NHẸ và lười hơn nhiều — như tiếng \"ơ\" bật ra khi đang ngập ngừng suy nghĩ. Không bao giờ mang trọng âm, không có dấu thanh.",
      how: [
        "Môi: hoàn toàn thả lỏng, hơi hé, không tròn, không kéo.",
        "Lưỡi: nằm yên ở giữa khoang miệng, không nâng, không hạ, không đẩy trước hay sau.",
        "Hàm: mở rất ít, gần như tư thế nghỉ.",
        "Độ dài: cực ngắn, nhẹ, nhanh — chỉ như một \"tiếng thở có giọng\".",
        "Dây thanh rung nhẹ; không dồn hơi, không lên giọng.",
      ],
      vowel: { x: 0.5, y: 0.5, round: false },
      spellings: [
        { pattern: "a (không nhấn)", words: ["about", "banana", "sofa", "America"] },
        { pattern: "e (không nhấn)", words: ["open", "problem", "garden", "seven"] },
        { pattern: "o (không nhấn)", words: ["today", "London", "tomorrow", "police"] },
        { pattern: "u (không nhấn)", words: ["support", "upon", "success"] },
        { pattern: "-er / -or / -ar / -ure cuối từ (UK)", words: ["teacher", "doctor", "sugar", "picture"] },
        { pattern: "-ous / -ion / -ment", words: ["famous", "station", "moment"] },
      ],
      words: [
        { w: "about", ipa: "əˈbaʊt", vi: "về, khoảng" },
        { w: "sofa", ipa: "ˈsəʊ.fə", vi: "ghế sô-pha" },
        { w: "today", ipa: "təˈdeɪ", vi: "hôm nay" },
        { w: "teacher", ipa: "ˈtiː.tʃə", vi: "giáo viên" },
        { w: "London", ipa: "ˈlʌn.dən", vi: "Luân Đôn" },
        { w: "problem", ipa: "ˈprɒb.ləm", vi: "vấn đề" },
        { w: "banana", ipa: "bəˈnɑː.nə", vi: "quả chuối" },
        { w: "photographer", ipa: "fəˈtɒɡ.rə.fə", vi: "nhiếp ảnh gia" },
      ],
      sentences: [
        { en: "My [[mother]] is [[a]] [[teacher]] in [[London]].", vi: "Mẹ tôi là giáo viên ở London.", ipa: "maɪ ˈmʌð.ər ɪz ə ˈtiː.tʃər ɪn ˈlʌn.dən" },
        { en: "The [[doctor]] will [[arrive]] [[at]] [[seven]].", vi: "Bác sĩ sẽ đến lúc bảy giờ." },
        { en: "Call me [[tomorrow]] [[afternoon]].", vi: "Gọi cho tôi chiều mai nhé." },
      ],
      pairs: [
        { a: { w: "accept", ipa: "əkˈsept", vi: "chấp nhận" }, b: { w: "except", ipa: "ɪkˈsept", vi: "ngoại trừ" } },
        { a: { w: "affect", ipa: "əˈfekt", vi: "ảnh hưởng (động từ)" }, b: { w: "effect", ipa: "ɪˈfekt", vi: "tác động (danh từ)" } },
        { a: { w: "Rosa's", ipa: "ˈrəʊ.zəz", vi: "của Rosa" }, b: { w: "roses", ipa: "ˈrəʊ.zɪz", vi: "hoa hồng (số nhiều)" } },
      ],
      mistakes: [
        "Đọc rõ mặt chữ mọi nguyên âm: \"banana\" thành \"ba-na-na\" (ba âm đều nhau). Đúng là /bəˈnɑː.nə/ — chỉ âm giữa rõ, hai âm kia lướt /ə/.",
        "Đọc đuôi -er, -or thành \"ơ-rờ\" hoặc \"o\": \"doctor\" thành \"đốc-to\". Giọng Anh chỉ là /ˈdɒk.tə/ — /ə/ nhẹ, không r.",
        "Nhấn hoặc kéo dài /ə/ thành \"ơ\" có dấu thanh, khiến cả từ mất trọng âm và nghe như đọc từng tiếng.",
      ],
      tips: [
        "Tìm trọng âm trước: âm tiết nhấn đọc rõ, các âm tiết còn lại hầu hết \"lười\" xuống /ə/ hoặc /ɪ/.",
        "Luyện nhịp \"da-DA-da\": a-BOUT, ba-NA-na, to-DAY — âm nhỏ thật nhỏ, âm to thật to.",
        "Đừng cố đọc /ə/ — hãy thả lỏng miệng và để nó tự bật ra. Càng cố, càng sai.",
      ],
      memo: "Ký hiệu ə là chữ e lộn ngược — chữ cái \"nằm lăn ra ngủ\" → âm lười nhất, không bao giờ được nhấn. Từ khóa: \"about\" — /ə/ nhẹ như hơi thở trước /ˈbaʊt/.",
      usUk: "Giọng Mỹ phát âm r sau /ə/: teacher /ˈtiː.tʃɚ/, doctor /ˈdɑːk.tɚ/ — ký hiệu ɚ là schwa có cong lưỡi. Giọng Anh bỏ r: /ˈtiː.tʃə/, /ˈdɒk.tə/.",
    },
    {
      id: "er-long",
      symbol: "ɜː",
      kind: "long-vowel",
      name: "ơ dài",
      keyword: { w: "bird", ipa: "bɜːd", vi: "con chim" },
      viLike:
        "Gần \"ơ\" tiếng Việt kéo dài (như \"ơơ\") nhưng miệng hơi dẹt và căng hơn. Khác /ə/: /ɜː/ dài, rõ và luôn nằm ở âm tiết ĐƯỢC NHẤN.",
      how: [
        "Môi: hơi dẹt, thả tự nhiên, không tròn (đừng chu môi như \"ô\").",
        "Lưỡi: nằm giữa miệng, cao hơn /ə/ một chút, căng hơn; đầu lưỡi chạm nhẹ sau răng cửa dưới.",
        "Hàm: hé vừa phải, khoảng một đầu ngón tay út.",
        "Độ dài: kéo dài hai nhịp \"ơơ\" — dấu ː báo âm dài.",
        "Giọng Anh: KHÔNG cong lưỡi, không có r dù chữ viết có r (bird, her, work).",
      ],
      vowel: { x: 0.5, y: 0.42, round: false },
      spellings: [
        { pattern: "er (nhấn)", words: ["her", "term", "person", "prefer"] },
        { pattern: "ir", words: ["bird", "girl", "first", "shirt"] },
        { pattern: "ur", words: ["nurse", "turn", "Thursday", "burn"] },
        { pattern: "ear + phụ âm", words: ["learn", "early", "earth", "search"] },
        { pattern: "or sau w", words: ["work", "word", "world", "worse"] },
        { pattern: "Ngoại lệ hay gặp", words: ["journey", "were", "colonel"] },
      ],
      words: [
        { w: "her", ipa: "hɜː", vi: "cô ấy (tân ngữ)" },
        { w: "bird", ipa: "bɜːd", vi: "con chim" },
        { w: "work", ipa: "wɜːk", vi: "làm việc" },
        { w: "girl", ipa: "ɡɜːl", vi: "cô gái" },
        { w: "first", ipa: "fɜːst", vi: "đầu tiên" },
        { w: "learn", ipa: "lɜːn", vi: "học" },
        { w: "Thursday", ipa: "ˈθɜːz.deɪ", vi: "thứ Năm" },
        { w: "journey", ipa: "ˈdʒɜː.ni", vi: "chuyến đi" },
      ],
      sentences: [
        { en: "The [[girl]] [[heard]] the [[birds]] [[early]] on [[Thursday]].", vi: "Cô gái nghe tiếng chim từ sáng sớm thứ Năm.", ipa: "ðə ɡɜːl hɜːd ðə bɜːdz ˈɜː.li ɒn ˈθɜːz.deɪ" },
        { en: "I [[work]] on the [[third]] floor.", vi: "Tôi làm việc ở tầng ba." },
        { en: "She [[prefers]] to [[learn]] new [[words]] [[first]].", vi: "Cô ấy thích học từ mới trước." },
      ],
      pairs: [
        { a: { w: "work", ipa: "wɜːk", vi: "làm việc" }, b: { w: "walk", ipa: "wɔːk", vi: "đi bộ" } },
        { a: { w: "bird", ipa: "bɜːd", vi: "con chim" }, b: { w: "board", ipa: "bɔːd", vi: "tấm bảng" } },
        { a: { w: "shirt", ipa: "ʃɜːt", vi: "áo sơ mi" }, b: { w: "short", ipa: "ʃɔːt", vi: "ngắn" } },
        { a: { w: "heard", ipa: "hɜːd", vi: "đã nghe" }, b: { w: "hard", ipa: "hɑːd", vi: "khó, cứng" } },
        { a: { w: "firm", ipa: "fɜːm", vi: "công ty" }, b: { w: "farm", ipa: "fɑːm", vi: "trang trại" } },
      ],
      mistakes: [
        "Chu tròn môi thành \"ô\" hoặc \"ơ-u\": \"work\" nghe thành \"walk\" /wɔːk/. Giữ môi dẹt, thả lỏng.",
        "Đọc theo mặt chữ: \"bird\" thành \"bia-đ\", \"girl\" thành \"gơ-rồ\". Chỉ có MỘT nguyên âm /ɜː/ dài, rồi phụ âm cuối.",
        "Bỏ phụ âm cuối: \"work\", \"word\", \"world\" đều thành \"wơ\". Phải giữ /k/, /d/, /ld/ ở cuối.",
      ],
      tips: [
        "Nói \"ơ\" tiếng Việt, rồi kéo dài và hơi dẹt môi như đang ngạc nhiên nhẹ: \"ơơ…\".",
        "Luyện cặp \"work – walk\" trước gương: /ɜː/ môi dẹt, /ɔː/ môi tròn — nhìn thấy khác biệt.",
        "/ɜː/ là \"anh lớn\" của /ə/: cùng vị trí lưỡi, nhưng dài, rõ và được nhấn — \"prefer\" /prɪˈfɜː/ ↔ \"offer\" /ˈɒf.ə/.",
      ],
      memo: "Ký hiệu ɜ như số 3 lật ngược kèm hai chấm dài — \"ơ dài 3 nhịp cho chú chim\". Từ khóa: \"bird\" — chú chim hót \"ơơơ\" /bɜːd/.",
      usUk: "Giọng Mỹ cong lưỡi (r-coloured): bird /bɝːd/, work /wɝːk/, her /hɝː/. Giọng Anh không cong lưỡi, không có r.",
    },
  ],
  rules: [
    {
      title: "Schwa sống ở âm tiết KHÔNG nhấn",
      body:
        "Trong một từ, thường chỉ một âm tiết được nhấn; nguyên âm ở các âm tiết còn lại rất hay \"yếu\" đi thành /ə/, bất kể viết bằng chữ gì. Khi trọng âm dịch chuyển, nguyên âm cũng đổi theo: âm nào nhận trọng âm thì rõ, âm nào mất trọng âm thì thành /ə/. Đây là lý do cùng một gốc từ lại có nhiều cách đọc.",
      examples: [
        { w: "photograph", ipa: "ˈfəʊ.tə.ɡrɑːf", vi: "bức ảnh" },
        { w: "photographer", ipa: "fəˈtɒɡ.rə.fə", vi: "nhiếp ảnh gia" },
        { w: "photographic", ipa: "ˌfəʊ.təˈɡræf.ɪk", vi: "thuộc về nhiếp ảnh" },
      ],
    },
    {
      title: "/ɜː/ nhấn — /ə/ không nhấn (dù cùng viết -er, -ur, -or)",
      body:
        "Chữ er/ir/ur/or ở âm tiết ĐƯỢC NHẤN đọc /ɜː/; ở âm tiết KHÔNG nhấn (đặc biệt cuối từ) đọc /ə/. Giọng Anh không phát âm chữ r ở cả hai trường hợp, trừ khi từ sau bắt đầu bằng nguyên âm (r nối).",
      examples: [
        { w: "prefer", ipa: "prɪˈfɜː", vi: "thích hơn" },
        { w: "offer", ipa: "ˈɒf.ə", vi: "đề nghị" },
        { w: "Saturday", ipa: "ˈsæt.ə.deɪ", vi: "thứ Bảy" },
        { w: "Thursday", ipa: "ˈθɜːz.deɪ", vi: "thứ Năm" },
      ],
    },
    {
      title: "Âm /ə/ biến mất: chocolate chỉ có hai âm tiết",
      body:
        "Trong nhiều từ thông dụng, schwa yếu tới mức rơi mất hẳn, làm từ ngắn đi một âm tiết. Người Việt thường đọc đủ theo mặt chữ nên nghe rất \"sách vở\". Đây là các dạng chuẩn, từ điển cũng ghi như vậy.",
      examples: [
        { w: "chocolate", ipa: "ˈtʃɒk.lət", vi: "sô-cô-la" },
        { w: "family", ipa: "ˈfæm.əl.i", vi: "gia đình (nói nhanh: /ˈfæm.li/)" },
        { w: "vegetable", ipa: "ˈvedʒ.tə.bəl", vi: "rau" },
        { w: "comfortable", ipa: "ˈkʌmf.tə.bəl", vi: "thoải mái" },
        { w: "interesting", ipa: "ˈɪn.trəs.tɪŋ", vi: "thú vị" },
      ],
    },
    {
      title: "Xem trước: dạng yếu (weak forms) của từ chức năng",
      body:
        "Các từ nhỏ như a, the, to, for, of, and, can, from, at, was, are, some… gần như luôn được đọc ở dạng YẾU với /ə/ khi nằm giữa câu: to /tə/, for /fə/, of /əv/, and /ən/, can /kən/, from /frəm/, at /ət/, was /wəz/. Chỉ khi được nhấn mạnh hoặc đứng cuối câu chúng mới dùng dạng mạnh: \"Yes, I can.\" /kæn/, \"What are you looking at?\" /æt/. Bài về nhịp điệu câu sẽ học kỹ hơn.",
      examples: [
        { w: "to", ipa: "tə", vi: "dạng yếu (mạnh: tuː)" },
        { w: "for", ipa: "fə", vi: "dạng yếu (mạnh: fɔː)" },
        { w: "of", ipa: "əv", vi: "dạng yếu (mạnh: ɒv)" },
        { w: "can", ipa: "kən", vi: "dạng yếu (mạnh: kæn)" },
      ],
      sentences: [
        { en: "I want [[to]] go [[for]] [[a]] cup [[of]] tea.", vi: "Tôi muốn đi uống một tách trà.", ipa: "aɪ wɒnt tə ɡəʊ fər ə kʌp əv tiː" },
        { en: "I [[can]] swim. — Yes, I can!", vi: "Tôi biết bơi. — Có, tôi biết mà!", ipa: "aɪ kən swɪm — jes aɪ kæn" },
      ],
    },
  ],
  story: {
    title: "Linh và cuộc họp thứ Năm",
    paras: [
      {
        en: "On [[Thursday]] Linh had [[her]] [[first]] big meeting [[at]] [[work]]. She knew every [[word]] [[of]] [[her]] [[presentation]] by heart.",
        vi: "Thứ Năm, Linh có cuộc họp lớn đầu tiên ở công ty. Cô thuộc lòng từng chữ trong bài thuyết trình.",
      },
      {
        en: "Tom listened and smiled. \"It's [[correct]], but you're strong on every syllable. Say '[[banana]]' [[the]] lazy way: only the middle part is strong.\"",
        vi: "Tom nghe rồi mỉm cười: \"Đúng rồi, nhưng âm tiết nào em cũng đọc mạnh. Thử nói 'banana' kiểu lười xem: chỉ phần giữa là mạnh thôi.\"",
      },
      {
        en: "Jake laughed on the phone. \"In [[America]] we [[turn]] our tongue for '[[teacher]]' and '[[bird]]'. In London, [[nurses]] and [[doctors]] just relax their mouths.\"",
        vi: "Jake cười qua điện thoại: \"Ở Mỹ bọn tớ cong lưỡi khi nói 'teacher' và 'bird'. Ở London thì y tá với bác sĩ cứ thả lỏng miệng thôi.\"",
      },
      {
        en: "Back home, Mrs Brown [[offered]] [[her]] [[a]] cup [[of]] tea. Linh [[heard]] it [[at]] once: nobody says \"a cup OF tea\" — it's \"[[a]] cup [[of]] tea\", soft and quick. She had [[learned]] [[her]] [[first]] weak forms.",
        vi: "Về nhà, bà Brown mời cô một tách trà. Linh nhận ra ngay: chẳng ai nói \"a cup OF tea\" cả — mà là \"a cup of tea\", nhẹ và nhanh. Cô vừa học được những dạng yếu đầu tiên.",
      },
    ],
  },
  twister: {
    en: "Thirty thirsty girls learned a dozen words about a banana on Thursday.",
    vi: "Ba mươi cô gái khát nước học một tá từ về quả chuối vào thứ Năm. (/ɜː/ dài trong thirty, thirsty, girls, learned, words, Thursday; /ə/ nhẹ trong a, dozen, about, banana.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "word",
      opts: ["word /wɜːd/", "ward /wɔːd/"],
      answer: 0,
      explain: "word /wɜːd/: môi dẹt, âm \"ơ dài\". ward /wɔːd/: môi tròn như \"o\" dài.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Từ nào chứa âm /ɜː/?",
      opts: ["learn", "heart", "bear", "near"],
      answer: 0,
      explain: "learn /lɜːn/. Cùng viết \"ear\" nhưng heart /hɑːt/, bear /beə/, near /nɪə/ đều khác.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Trong \"banana\" /bəˈnɑː.nə/, những chữ a nào đọc là /ə/?",
      opts: ["Chữ a thứ nhất và thứ ba", "Cả ba chữ a", "Chỉ chữ a thứ hai", "Không chữ nào"],
      answer: 0,
      explain: "Âm tiết giữa được nhấn nên đọc /ɑː/; hai âm tiết không nhấn yếu xuống /ə/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm giọng Anh đúng của \"doctor\" là?",
      opts: ["/ˈdɒk.tə/", "/ˈdɒk.tɔː/", "/dɒkˈtɜː/", "/ˈdɑːk.tɔː/"],
      answer: 0,
      explain: "doctor /ˈdɒk.tə/: nhấn âm đầu, đuôi -or không nhấn nên đọc /ə/, giọng Anh không đọc r.",
    },
    {
      type: "choice",
      label: "Trọng âm",
      q: "\"photographer\" được nhấn ở âm tiết nào?",
      opts: ["Âm thứ hai: pho-TO-gra-pher", "Âm thứ nhất: PHO-to-gra-pher", "Âm thứ ba: pho-to-GRA-pher", "Âm cuối: pho-to-gra-PHER"],
      answer: 0,
      explain: "/fəˈtɒɡ.rə.fə/ — nhấn \"to\" /ˈtɒɡ/, ba âm tiết còn lại đều là /ə/. So sánh \"photograph\" /ˈfəʊ.tə.ɡrɑːf/ nhấn âm đầu.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Trong câu vừa nghe, \"to\" và \"for\" được đọc thế nào?",
      say: "I want to go for a walk.",
      opts: ["/tə/ và /fə/ (dạng yếu)", "/tuː/ và /fɔː/ (dạng mạnh)", "/tuː/ và /fə/", "/tə/ và /fɔː/"],
      answer: 0,
      explain: "Giữa câu, từ chức năng không được nhấn nên dùng dạng yếu có /ə/: /tə/, /fə/.",
    },
    {
      type: "judge",
      q: "Âm /ə/ chỉ được viết bằng chữ a.",
      ok: false,
      explain: "Sai. /ə/ có thể viết bằng mọi nguyên âm: a (about), e (open), o (today), u (support), và các đuôi -er, -or, -ous…",
    },
  ],
};
