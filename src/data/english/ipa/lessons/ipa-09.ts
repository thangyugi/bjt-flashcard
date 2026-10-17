import type { IpaLesson } from "../types";

export const ipa09: IpaLesson = {
  id: "ipa-09",
  num: 9,
  title: "Nguyên âm đôi lướt về /ʊ/ — go home, now",
  mark: "əʊ · aʊ",
  level: "Trung cấp",
  group: "Nguyên âm đôi",
  intro:
    "Hai nguyên âm đôi này đều kết thúc bằng cú lướt về /ʊ/ (môi tròn lại). Người Việt hay đọc /əʊ/ thành \"ô\" đơn, khiến \"coat\" lẫn với \"caught\", \"won't\" lẫn với \"want\". Chữ \"ow\" và \"ou\" lại có nhiều cách đọc (now – know, house – country), nên bài này kèm các quy luật nhìn chữ đoán âm quan trọng.",
  phonemes: [
    {
      id: "ou",
      symbol: "əʊ",
      kind: "diphthong",
      name: "âu (ơ → u)",
      keyword: { w: "go", ipa: "ɡəʊ", vi: "đi" },
      viLike:
        "Giọng Anh: rất gần \"âu\" trong \"câu\", \"đâu\" — bắt đầu từ \"ơ\" lướt về \"u\". Giọng Mỹ /oʊ/ gần \"ô-u\". Lỗi lớn nhất là đọc thành \"ô\" đơn của tiếng Việt, không có cú lướt.",
      how: [
        "Bắt đầu: môi thả lỏng, lưỡi nằm giữa miệng ở vị trí /ə/ (\"ơ\").",
        "Lướt: tròn môi dần và nâng lưỡi phía sau lên về vị trí /ʊ/.",
        "Phần đầu \"ơ\" mạnh hơn; phần cuối /ʊ/ nhẹ, chỉ chạm tới.",
        "Hàm khép nhẹ trong lúc lướt.",
        "Dây thanh rung suốt; một âm tiết.",
      ],
      spellings: [
        { pattern: "o + phụ âm + e câm", words: ["home", "phone", "note", "hope"] },
        { pattern: "oa", words: ["road", "coat", "boat", "soap"] },
        { pattern: "ow (một nhóm từ)", words: ["slow", "know", "show", "window"] },
        { pattern: "o cuối từ / trước ld, lt, st", words: ["go", "so", "old", "cold", "most", "both"] },
        { pattern: "oe / ou / ew (ngoại lệ)", words: ["toe", "soul", "shoulder", "though", "sew"] },
      ],
      words: [
        { w: "go", ipa: "ɡəʊ", vi: "đi" },
        { w: "no", ipa: "nəʊ", vi: "không" },
        { w: "home", ipa: "həʊm", vi: "nhà" },
        { w: "phone", ipa: "fəʊn", vi: "điện thoại" },
        { w: "road", ipa: "rəʊd", vi: "con đường" },
        { w: "open", ipa: "ˈəʊ.pən", vi: "mở" },
        { w: "hotel", ipa: "həʊˈtel", vi: "khách sạn" },
        { w: "won't", ipa: "wəʊnt", vi: "sẽ không (will not)" },
      ],
      sentences: [
        { en: "[[Don't]] [[go]] [[home]] [[alone]].", vi: "Đừng về nhà một mình.", ipa: "dəʊnt ɡəʊ həʊm əˈləʊn" },
        { en: "[[Close]] the [[window]] — it's [[cold]].", vi: "Đóng cửa sổ lại — trời lạnh." },
        { en: "I [[know]] the [[road]] to the [[hotel]].", vi: "Tôi biết đường đến khách sạn." },
      ],
      pairs: [
        { a: { w: "coat", ipa: "kəʊt", vi: "áo khoác" }, b: { w: "cot", ipa: "kɒt", vi: "nôi, giường cũi" } },
        { a: { w: "note", ipa: "nəʊt", vi: "ghi chú" }, b: { w: "not", ipa: "nɒt", vi: "không" } },
        { a: { w: "hope", ipa: "həʊp", vi: "hy vọng" }, b: { w: "hop", ipa: "hɒp", vi: "nhảy lò cò" } },
        { a: { w: "won't", ipa: "wəʊnt", vi: "sẽ không" }, b: { w: "want", ipa: "wɒnt", vi: "muốn" } },
        { a: { w: "boat", ipa: "bəʊt", vi: "con thuyền" }, b: { w: "bought", ipa: "bɔːt", vi: "đã mua" } },
        { a: { w: "low", ipa: "ləʊ", vi: "thấp" }, b: { w: "law", ipa: "lɔː", vi: "luật" } },
      ],
      mistakes: [
        "Đọc thành \"ô\" đơn, không lướt: \"coat\" nghe giống \"caught\", \"boat\" giống \"bought\". Phải có cú lướt về /ʊ/.",
        "Nhầm \"won't\" /wəʊnt/ với \"want\" /wɒnt/ — \"I won't go\" thành \"I want go\", nghĩa ngược hẳn!",
        "Đọc chữ o nào cũng là /əʊ/: \"love\", \"come\", \"money\" thực ra là /ʌ/; \"hot\", \"stop\" là /ɒ/.",
      ],
      tips: [
        "Người miền Bắc có sẵn âm này: nói \"âu\" (trong \"đâu\") là gần đúng /əʊ/ giọng Anh.",
        "Nhìn gương khi nói \"go\": môi phải TRÒN LẠI ở cuối. Nếu môi đứng yên, bạn đang đọc \"ô\".",
        "Luyện cặp \"won't – want\" trong câu: \"I won't go.\" ↔ \"I want to go.\"",
      ],
      memo: "əʊ = ə (ơ lười) + ʊ (u ngắn) — \"ơ… rồi chu môi u\" → \"âu\". Từ khóa: \"go\" — đi đâu? /ɡəʊ/ \"gâu\".",
      usUk: "Khác biệt lớn nhất Anh – Mỹ: UK /əʊ/ (bắt đầu từ \"ơ\"), US /oʊ/ (bắt đầu từ \"ô\"): go UK /ɡəʊ/, US /ɡoʊ/; home UK /həʊm/, US /hoʊm/.",
    },
    {
      id: "au",
      symbol: "aʊ",
      kind: "diphthong",
      name: "ao",
      keyword: { w: "now", ipa: "naʊ", vi: "bây giờ" },
      viLike:
        "Rất gần \"ao\" trong \"cao\", \"sao\" của tiếng Việt. Khác ở chỗ phần \"a\" mở rộng hơn và điểm cuối khép về /ʊ/ (môi tròn, hơi chu) chứ không dừng ở \"o\".",
      how: [
        "Bắt đầu: mở hàm rộng, lưỡi thấp, môi không tròn — như \"a\" tiếng Việt.",
        "Lướt: khép hàm, kéo lưỡi lên phía sau và tròn môi dần về vị trí /ʊ/.",
        "Phần \"a\" dài và mạnh; phần /ʊ/ ngắn.",
        "Môi chuyển rõ từ mở rộng sang tròn nhỏ.",
        "Dây thanh rung suốt; một âm tiết.",
      ],
      spellings: [
        { pattern: "ou", words: ["house", "out", "loud", "mouth", "about"] },
        { pattern: "ow", words: ["now", "how", "town", "down", "brown"] },
        { pattern: "ough (hiếm)", words: ["drought", "plough"] },
        { pattern: "our / ower → /aʊə/", words: ["our", "hour", "flower", "power"] },
      ],
      words: [
        { w: "now", ipa: "naʊ", vi: "bây giờ" },
        { w: "how", ipa: "haʊ", vi: "thế nào" },
        { w: "out", ipa: "aʊt", vi: "ra ngoài" },
        { w: "house", ipa: "haʊs", vi: "ngôi nhà" },
        { w: "town", ipa: "taʊn", vi: "thị trấn" },
        { w: "mouth", ipa: "maʊθ", vi: "cái miệng" },
        { w: "mountain", ipa: "ˈmaʊn.tɪn", vi: "ngọn núi" },
        { w: "thousand", ipa: "ˈθaʊ.zənd", vi: "nghìn" },
      ],
      sentences: [
        { en: "[[How]] [[about]] a walk [[around]] [[town]]?", vi: "Đi dạo quanh thị trấn nhé?", ipa: "haʊ əˈbaʊt ə wɔːk əˈraʊnd taʊn" },
        { en: "The [[clouds]] are [[down]] on the [[mountain]].", vi: "Mây đang sà xuống núi." },
        { en: "Please don't [[shout]] in the [[house]].", vi: "Làm ơn đừng la hét trong nhà." },
      ],
      pairs: [
        { a: { w: "now", ipa: "naʊ", vi: "bây giờ" }, b: { w: "know", ipa: "nəʊ", vi: "biết" } },
        { a: { w: "town", ipa: "taʊn", vi: "thị trấn" }, b: { w: "tone", ipa: "təʊn", vi: "giọng điệu" } },
        { a: { w: "loud", ipa: "laʊd", vi: "to, ồn" }, b: { w: "load", ipa: "ləʊd", vi: "chất hàng" } },
        { a: { w: "found", ipa: "faʊnd", vi: "đã tìm thấy" }, b: { w: "phoned", ipa: "fəʊnd", vi: "đã gọi điện" } },
      ],
      mistakes: [
        "Nuốt phụ âm cuối: \"house\", \"out\", \"town\", \"mouth\" đều thành \"hao\", \"ao\", \"tao\", \"mao\". Giữ /s/, /t/, /n/, /θ/ ở cuối.",
        "Đọc \"ow\" luôn là /aʊ/: \"know\", \"show\", \"slow\" thực ra là /əʊ/. Ngược lại \"now\", \"how\" mới là /aʊ/.",
        "Đọc \"ou\" luôn là /aʊ/: \"country\" /ˈkʌn.tri/, \"young\" /jʌŋ/, \"soup\" /suːp/ là ngoại lệ thường gặp.",
      ],
      tips: [
        "Dùng \"ao\" tiếng Việt làm điểm xuất phát, rồi mở \"a\" rộng hơn và chu môi tròn hơn ở cuối.",
        "Tự tưởng tượng bị đau: \"Ouch!\" /aʊtʃ/ — chính là âm /aʊ/.",
        "Luyện \"How now, brown cow?\" chậm rồi nhanh dần — câu luyện kinh điển của người Anh.",
      ],
      memo: "aʊ = a (há to) + ʊ (chu môi) — \"há miệng rồi tròn môi: ao!\". Từ khóa: \"now\" — làm ngay bây giờ: /naʊ/ \"nao\".",
      usUk: "Anh và Mỹ đọc gần giống nhau. Giọng Mỹ phát âm r trong \"our\", \"hour\", \"flower\": UK /aʊə/, US /aʊɚ/.",
    },
  ],
  rules: [
    {
      title: "\"ow\" có hai cách đọc: /aʊ/ hay /əʊ/?",
      body:
        "Không có quy luật tuyệt đối, phải học theo nhóm. /aʊ/: now, how, cow, town, down, brown, flower, power. /əʊ/: know, show, slow, low, grow, window, yellow, tomorrow. Mẹo: \"ow\" ở âm tiết không nhấn cuối từ hai âm tiết gần như luôn là /əʊ/ (window, yellow, follow). Một số từ đọc hai cách với hai nghĩa: bow /baʊ/ (cúi chào) – bow /bəʊ/ (cái nơ, cây cung); row /raʊ/ (cãi nhau) – row /rəʊ/ (hàng, chèo thuyền).",
      examples: [
        { w: "now", ipa: "naʊ", vi: "bây giờ" },
        { w: "know", ipa: "nəʊ", vi: "biết" },
        { w: "window", ipa: "ˈwɪn.dəʊ", vi: "cửa sổ" },
        { w: "flower", ipa: "ˈflaʊ.ə", vi: "bông hoa" },
      ],
    },
    {
      title: "\"ou\" — chữ nhiều mặt nhất tiếng Anh",
      body:
        "Cách đọc phổ biến nhất của \"ou\" là /aʊ/ (house, out, about). Nhưng có ít nhất 5 cách khác thường gặp: /ʌ/ (country, young, double), /uː/ (soup, group, you), /ɔː/ (bought, four, thought), /əʊ/ (soul, shoulder, though), /ə/ ở âm tiết không nhấn (famous, colour). Gặp từ mới có \"ou\" hãy tra phiên âm.",
      examples: [
        { w: "house", ipa: "haʊs", vi: "ngôi nhà" },
        { w: "country", ipa: "ˈkʌn.tri", vi: "đất nước" },
        { w: "group", ipa: "ɡruːp", vi: "nhóm" },
        { w: "thought", ipa: "θɔːt", vi: "đã nghĩ" },
        { w: "shoulder", ipa: "ˈʃəʊl.də", vi: "vai" },
        { w: "famous", ipa: "ˈfeɪ.məs", vi: "nổi tiếng" },
      ],
    },
    {
      title: "o trước ld, lt, st và o + e câm → /əʊ/",
      body:
        "Chữ o trước cụm ld, lt và trong nhiều từ có st thường đọc /əʊ/ dù âm tiết đóng: old, cold, gold, bolt, most, post, both. Ngoại lệ: lost, cost /ɒ/. Quy luật \"e câm\" cũng áp dụng: not → note, hop → hope, rob → robe.",
      examples: [
        { w: "cold", ipa: "kəʊld", vi: "lạnh" },
        { w: "most", ipa: "məʊst", vi: "hầu hết" },
        { w: "lost", ipa: "lɒst", vi: "bị lạc (ngoại lệ /ɒ/)" },
        { w: "note", ipa: "nəʊt", vi: "ghi chú" },
      ],
    },
    {
      title: "Nguyên âm ba /aʊə/: hour, our, flower",
      body:
        "Khi /aʊ/ đứng trước chữ r (hoặc -er) giọng Anh thêm một /ə/ nhẹ ở cuối: /aʊə/. Đọc thành một khối liền, gần \"ao-ơ\" (hai âm tiết rất nhanh hoặc gộp làm một). Chữ h trong \"hour\" câm, nên \"hour\" và \"our\" đọc giống nhau.",
      examples: [
        { w: "our", ipa: "aʊə", vi: "của chúng ta" },
        { w: "hour", ipa: "aʊə", vi: "giờ, tiếng đồng hồ" },
        { w: "flower", ipa: "ˈflaʊ.ə", vi: "bông hoa" },
        { w: "shower", ipa: "ˈʃaʊ.ə", vi: "vòi sen" },
      ],
      sentences: [
        { en: "I'll be [[home]] in an [[hour]].", vi: "Một tiếng nữa tôi sẽ về đến nhà.", ipa: "aɪl bi həʊm ɪn ən aʊə" },
      ],
    },
  ],
  story: {
    title: "Mái nhà dột của bà Brown",
    paras: [
      {
        en: "Linh's [[phone]] rang. It was Mrs [[Brown]]: \"There's a problem with the [[house]] — water's coming [[down]] from the roof!\"",
        vi: "Điện thoại của Linh đổ chuông. Là bà Brown: \"Nhà có chuyện rồi — nước đang chảy xuống từ mái nhà!\"",
      },
      {
        en: "Linh [[rode]] Jake's bike [[home]] across [[town]]. Dark [[clouds]] hung [[low]] [[over]] the [[houses]].",
        vi: "Linh đạp chiếc xe của Jake băng qua thị trấn về nhà. Những đám mây đen treo thấp trên các mái nhà.",
      },
      {
        en: "Tom came [[round]] with some tools. \"I [[know]] [[how]] to fix this,\" he said. \"[[Hold]] this [[bowl]] and [[don't]] move.\"",
        vi: "Tom ghé qua với ít đồ nghề. \"Anh biết cách sửa cái này,\" anh nói. \"Em giữ cái bát này và đừng nhúc nhích nhé.\"",
      },
      {
        en: "An [[hour]] later the water had stopped. Mrs [[Brown]] made [[toast]] and [[cocoa]]. \"[[Now]] you [[know]] [[how]] an [[old]] English [[house]] works!\" she laughed.",
        vi: "Một tiếng sau nước đã ngừng chảy. Bà Brown làm bánh mì nướng và ca cao. \"Giờ thì cháu biết một ngôi nhà Anh cũ nó thế nào rồi đấy!\" bà cười.",
      },
    ],
  },
  twister: {
    en: "How now, brown cow? Go slowly home, and don't go alone.",
    vi: "Sao rồi, cô bò nâu? Đi chậm về nhà, và đừng đi một mình. (/aʊ/ trong how, now, brown, cow; /əʊ/ trong go, slowly, home, don't, alone.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "coat",
      opts: ["coat /kəʊt/", "caught /kɔːt/", "cot /kɒt/"],
      answer: 0,
      explain: "coat /kəʊt/ có cú lướt \"ơ → u\". caught /kɔːt/ là \"o\" dài không lướt; cot /kɒt/ là \"o\" ngắn.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "now",
      opts: ["now /naʊ/", "know /nəʊ/"],
      answer: 0,
      explain: "now /naʊ/ mở miệng rộng như \"ao\"; know /nəʊ/ bắt đầu từ \"ơ\" như \"âu\". Chữ k trong \"know\" câm.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Chữ \"ow\" trong từ nào đọc là /aʊ/?",
      opts: ["town", "know", "show", "window"],
      answer: 0,
      explain: "town /taʊn/. know /nəʊ/, show /ʃəʊ/, window /ˈwɪn.dəʊ/ đều có /əʊ/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Chữ \"ou\" trong từ nào đọc là /aʊ/?",
      opts: ["mouth", "country", "soup", "four"],
      answer: 0,
      explain: "mouth /maʊθ/. country /ˈkʌn.tri/ có /ʌ/, soup /suːp/ có /uː/, four /fɔː/ có /ɔː/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm giọng Anh đúng của \"won't\" là?",
      opts: ["/wəʊnt/", "/wɒnt/", "/wɑːnt/", "/waʊnt/"],
      answer: 0,
      explain: "won't /wəʊnt/ (will not). /wɒnt/ là \"want\" — nhầm hai từ này sẽ đổi nghĩa câu hoàn toàn.",
    },
    {
      type: "choice",
      label: "Trọng âm",
      q: "\"hotel\" được nhấn ở âm tiết nào?",
      opts: ["Âm thứ hai: ho-TEL /həʊˈtel/", "Âm thứ nhất: HO-tel /ˈhəʊ.tel/"],
      answer: 0,
      explain: "hotel /həʊˈtel/ nhấn âm sau. Âm đầu tuy không nhấn vẫn giữ nguyên âm đôi /əʊ/.",
    },
    {
      type: "judge",
      q: "Giọng Mỹ đọc \"go\" là /ɡoʊ/, còn giọng Anh là /ɡəʊ/.",
      ok: true,
      explain: "Đúng. Đây là khác biệt dễ nhận ra nhất: UK bắt đầu từ \"ơ\" (/əʊ/), US bắt đầu từ \"ô\" (/oʊ/).",
    },
  ],
};
