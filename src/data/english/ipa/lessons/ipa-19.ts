import type { IpaLesson } from "../types";

export const ipa19: IpaLesson = {
  id: "ipa-19",
  num: 19,
  title: "Trọng âm từ & câu",
  mark: "ˈ",
  level: "Nâng cao",
  group: "Nâng cao",
  intro:
    "Tiếng Việt mỗi âm tiết có thanh điệu riêng và dài gần bằng nhau; tiếng Anh thì ngược lại — một âm tiết được NHẤN (to, dài, cao), các âm tiết còn lại bị nói nhẹ và nhanh. Nhấn sai trọng âm khiến người nghe không nhận ra từ dù từng âm đều đúng (\"deˈsert\" thành \"ˈdesert\" là đổi từ \"món tráng miệng\" sang \"sa mạc\"). Bài này cho bạn các quy luật đoán trọng âm từ và cách nhấn nhá cả câu để nói có nhịp như người bản xứ.",
  phonemes: [],
  rules: [
    {
      title: "Trọng âm là gì? Bốn dấu hiệu của âm tiết được nhấn",
      body:
        "Âm tiết mang trọng âm (1) TO hơn, (2) DÀI hơn, (3) CAO giọng hơn, và (4) giữ nguyên âm đầy đủ. Các âm tiết không nhấn bị rút gọn, nguyên âm thường biến thành /ə/ (schwa) hoặc /ɪ/. Trong phiên âm, dấu ˈ đặt TRƯỚC âm tiết nhấn chính, dấu ˌ trước âm tiết nhấn phụ. Ví dụ \"banana\" có ba chữ a nhưng chỉ chữ a giữa được đọc đầy đủ /ɑː/, hai chữ a kia là /ə/.",
      examples: [
        { w: "banana", ipa: "bəˈnɑː.nə", vi: "quả chuối" },
        { w: "computer", ipa: "kəmˈpjuː.tə", vi: "máy tính" },
        { w: "today", ipa: "təˈdeɪ", vi: "hôm nay" },
        { w: "understand", ipa: "ˌʌn.dəˈstænd", vi: "hiểu" },
      ],
      sentences: [
        { en: "I'd like a [[banana]] and a [[tomato]], please.", vi: "Cho tôi một quả chuối và một quả cà chua.", ipa: "aɪd ˈlaɪk ə bəˈnɑː.nə ənd ə təˈmɑː.təʊ pliːz" },
      ],
    },
    {
      title: "Từ hai âm tiết: danh từ nhấn đầu, động từ nhấn sau",
      body:
        "Đa số danh từ và tính từ hai âm tiết nhấn âm tiết ĐẦU (ˈtable, ˈteacher, ˈhappy, ˈmorning). Đa số động từ hai âm tiết nhấn âm tiết SAU (beˈgin, deˈcide, reˈlax, forˈget). Nhiều từ viết giống hệt nhau đổi nghĩa theo trọng âm — và nguyên âm cũng đổi theo: ˈrecord /ˈrek.ɔːd/ (bản ghi, đĩa nhạc) ↔ reˈcord /rɪˈkɔːd/ (ghi âm). Ngoại lệ hay gặp: động từ ˈanswer, ˈvisit, ˈhappen, ˈlisten, ˈopen, ˈfollow nhấn đầu; danh từ hoˈtel, misˈtake, reˈsult, adˈvice nhấn sau.",
      examples: [
        { w: "record (n)", ipa: "ˈrek.ɔːd", vi: "bản ghi, kỷ lục" },
        { w: "record (v)", ipa: "rɪˈkɔːd", vi: "ghi lại, thu âm" },
        { w: "present (n/adj)", ipa: "ˈprez.ənt", vi: "món quà; hiện tại, có mặt" },
        { w: "present (v)", ipa: "prɪˈzent", vi: "trình bày, trao tặng" },
        { w: "object (n)", ipa: "ˈɒb.dʒɪkt", vi: "đồ vật" },
        { w: "object (v)", ipa: "əbˈdʒekt", vi: "phản đối" },
        { w: "increase (n)", ipa: "ˈɪŋ.kriːs", vi: "sự tăng lên" },
        { w: "increase (v)", ipa: "ɪnˈkriːs", vi: "tăng lên" },
      ],
      sentences: [
        { en: "They [[record]] a new [[record]] every year.", vi: "Năm nào họ cũng thu âm một đĩa nhạc mới.", ipa: "ðeɪ rɪˈkɔːd ə njuː ˈrek.ɔːd ˈev.ri jɪə" },
        { en: "I want to [[present]] you with a small [[present]].", vi: "Tôi muốn tặng bạn một món quà nhỏ.", ipa: "aɪ ˈwɒnt tə prɪˈzent ju wɪð ə smɔːl ˈprez.ənt" },
      ],
    },
    {
      title: "Hậu tố kéo trọng âm: -tion, -sion, -ic, -ical, -ity, -ian, -ious",
      body:
        "Với các đuôi này, trọng âm rơi vào âm tiết NGAY TRƯỚC hậu tố — bất kể từ gốc nhấn ở đâu. Vì vậy trọng âm \"nhảy\" khi từ đổi đuôi: ˈphotograph → phoˈtographer → ˌphotoˈgraphic; eˈconomy → ˌecoˈnomic; ˈpossible → ˌpossiˈbility. Ngoại lệ nên nhớ: ˈpolitics, ˈArabic, ˈCatholic, ˈlunatic.",
      examples: [
        { w: "information", ipa: "ˌɪn.fəˈmeɪ.ʃən", vi: "thông tin" },
        { w: "decision", ipa: "dɪˈsɪʒ.ən", vi: "quyết định" },
        { w: "economic", ipa: "ˌiː.kəˈnɒm.ɪk", vi: "thuộc kinh tế" },
        { w: "electricity", ipa: "ɪˌlekˈtrɪs.ə.ti", vi: "điện" },
        { w: "musician", ipa: "mjuːˈzɪʃ.ən", vi: "nhạc sĩ" },
        { w: "delicious", ipa: "dɪˈlɪʃ.əs", vi: "ngon" },
      ],
      sentences: [
        { en: "The [[photographer]] took a [[photograph]] for a [[photographic]] magazine.", vi: "Nhiếp ảnh gia chụp một bức ảnh cho tạp chí nhiếp ảnh.", ipa: "ðə fəˈtɒɡ.rə.fə tʊk ə ˈfəʊ.tə.ɡrɑːf fər ə ˌfəʊ.təˈɡræf.ɪk ˌmæɡ.əˈziːn" },
      ],
    },
    {
      title: "Hậu tố nhận trọng âm: -ee, -eer, -ese, -ique, -ette, -oon",
      body:
        "Ngược với quy luật trên, các đuôi này TỰ mang trọng âm chính. Rất có ích với tên quốc tịch: Vietnaˈmese, Japaˈnese, Chiˈnese. Các hậu tố -ment, -ness, -ful, -less, -er, -ly, -able thì KHÔNG làm đổi trọng âm: emˈploy → emˈployment, ˈhappy → ˈhappiness, ˈcare → ˈcareful. Ngoại lệ: ˈcoffee, comˈmittee không nhấn -ee.",
      examples: [
        { w: "Vietnamese", ipa: "ˌvjet.nəˈmiːz", vi: "người / tiếng Việt" },
        { w: "Japanese", ipa: "ˌdʒæp.ənˈiːz", vi: "người / tiếng Nhật" },
        { w: "refugee", ipa: "ˌref.juˈdʒiː", vi: "người tị nạn" },
        { w: "engineer", ipa: "ˌen.dʒɪˈnɪə", vi: "kỹ sư" },
        { w: "volunteer", ipa: "ˌvɒl.ənˈtɪə", vi: "tình nguyện viên" },
        { w: "technique", ipa: "tekˈniːk", vi: "kỹ thuật" },
        { w: "balloon", ipa: "bəˈluːn", vi: "bóng bay" },
      ],
      sentences: [
        { en: "My [[Vietnamese]] friend is an [[engineer]] and a [[volunteer]].", vi: "Bạn người Việt của tôi là kỹ sư và cũng là tình nguyện viên.", ipa: "maɪ ˌvjet.nəˈmiːz frend ɪz ən ˌen.dʒɪˈnɪər ənd ə ˌvɒl.ənˈtɪə" },
      ],
    },
    {
      title: "Từ ghép: danh từ ghép nhấn đầu, tính từ ghép nhấn sau",
      body:
        "Danh từ ghép (viết liền, có gạch nối hay viết rời) thường nhấn từ ĐẦU: ˈbedroom, ˈbus stop, ˈtoothbrush, ˈcoffee shop. Tính từ ghép thường nhấn phần SAU: well-ˈknown, old-ˈfashioned, bad-ˈtempered. Cụm động từ (phrasal verb) nhấn tiểu từ: get ˈup, turn ˈoff; còn danh từ tạo từ nó lại nhấn đầu: a ˈcheckout, a ˈbreakdown. Trọng âm giúp phân biệt nghĩa: a ˈgreenhouse (nhà kính) ↔ a green ˈhouse (ngôi nhà màu xanh).",
      examples: [
        { w: "greenhouse", ipa: "ˈɡriːn.haʊs", vi: "nhà kính" },
        { w: "green house", ipa: "ˌɡriːn ˈhaʊs", vi: "ngôi nhà màu xanh lá" },
        { w: "blackboard", ipa: "ˈblæk.bɔːd", vi: "bảng đen" },
        { w: "well-known", ipa: "ˌwelˈnəʊn", vi: "nổi tiếng" },
        { w: "check out (v)", ipa: "ˌtʃek ˈaʊt", vi: "trả phòng" },
        { w: "checkout (n)", ipa: "ˈtʃek.aʊt", vi: "quầy thanh toán" },
      ],
      sentences: [
        { en: "Please [[check out]] before noon and pay at the [[checkout]].", vi: "Vui lòng trả phòng trước buổi trưa và thanh toán ở quầy.", ipa: "pliːz ˌtʃek ˈaʊt bɪˈfɔː nuːn ən ˈpeɪ ət ðə ˈtʃek.aʊt" },
      ],
    },
    {
      title: "Số đếm: -teen nhấn sau, -ty nhấn đầu",
      body:
        "thirˈteen /θɜːˈtiːn/ và ˈthirty /ˈθɜː.ti/ dễ nghe nhầm. Khi đọc riêng, -teen nhấn sau và kéo dài /iːn/ rõ âm n; -ty nhấn đầu và kết thúc bằng /ti/ ngắn (giọng Mỹ thành âm vỗ /t̬i/). Khi -teen đứng trước danh từ, trọng âm thường lùi về đầu (ˌfifteen ˈpounds), nên hãy nghe kỹ đuôi /n/.",
      examples: [
        { w: "thirteen", ipa: "θɜːˈtiːn", vi: "13" },
        { w: "thirty", ipa: "ˈθɜː.ti", vi: "30" },
        { w: "fifteen", ipa: "fɪfˈtiːn", vi: "15" },
        { w: "fifty", ipa: "ˈfɪf.ti", vi: "50" },
      ],
      sentences: [
        { en: "Not [[fifty]] — [[fifteen]]! One five.", vi: "Không phải năm mươi — mười lăm! Một năm.", ipa: "nɒt ˈfɪf.ti fɪfˈtiːn wʌn faɪv" },
      ],
    },
    {
      title: "Trọng âm câu: từ nội dung được nhấn, từ chức năng đọc lướt",
      body:
        "Trong câu, người bản xứ nhấn các TỪ NỘI DUNG (danh từ, động từ chính, tính từ, trạng từ, từ để hỏi wh-, từ phủ định not/never, this/that) và đọc lướt các TỪ CHỨC NĂNG (mạo từ a/the, giới từ, đại từ, trợ động từ, liên từ and/but, to be). Từ chức năng thường dùng dạng yếu với /ə/: to /tə/, of /əv/, for /fə/, can /kən/. Nghe được từ nội dung là hiểu được ý chính.",
      examples: [
        { w: "content words", ipa: "ˈkɒn.tent wɜːdz", vi: "từ nội dung: nhấn" },
        { w: "function words", ipa: "ˈfʌŋk.ʃən wɜːdz", vi: "từ chức năng: lướt" },
      ],
      sentences: [
        { en: "I [[want]] to [[buy]] a [[new]] [[car]].", vi: "Tôi muốn mua một chiếc xe mới.", ipa: "aɪ ˈwɒnt tə ˈbaɪ ə ˈnjuː ˈkɑː" },
        { en: "[[Where]] did you [[put]] the [[keys]]?", vi: "Bạn để chìa khóa ở đâu?", ipa: "ˈweə dɪd ju ˈpʊt ðə ˈkiːz" },
        { en: "She [[can't]] [[come]] to the [[party]] on [[Friday]].", vi: "Cô ấy không thể đến bữa tiệc vào thứ Sáu.", ipa: "ʃi ˈkɑːnt ˈkʌm tə ðə ˈpɑː.ti ɒn ˈfraɪ.deɪ" },
      ],
    },
    {
      title: "Nhịp điệu: tiếng Anh đếm theo trọng âm, không theo âm tiết",
      body:
        "Tiếng Việt có nhịp theo âm tiết (mỗi tiếng dài như nhau). Tiếng Anh có nhịp theo trọng âm: các âm tiết nhấn lặp lại cách đều nhau như tiếng trống, còn các âm tiết yếu ở giữa bị nén lại cho vừa nhịp. Vì thế hai câu dưới đây mất thời gian gần như nhau dù câu sau dài gấp đôi số âm tiết. Hãy gõ tay theo các từ nhấn và \"nhét\" phần còn lại vào giữa.",
      sentences: [
        { en: "[[Cats]] [[chase]] [[mice]].", vi: "Mèo đuổi chuột. (3 âm tiết, 3 nhịp)", ipa: "ˈkæts ˈtʃeɪs ˈmaɪs" },
        { en: "The [[cats]] have been [[chasing]] the [[mice]].", vi: "Lũ mèo vẫn đang đuổi lũ chuột. (8 âm tiết, vẫn 3 nhịp)", ipa: "ðə ˈkæts əv bɪn ˈtʃeɪ.sɪŋ ðə ˈmaɪs" },
      ],
    },
    {
      title: "Nhấn mạnh tương phản: đổi trọng âm để đổi ý",
      body:
        "Người nói có thể dời trọng âm câu sang bất kỳ từ nào để nhấn mạnh hoặc sửa thông tin — kể cả từ chức năng. Cùng một câu, nhấn từ khác nhau sẽ cho ý khác nhau. Đây là cách người Anh \"sửa lời\" rất lịch sự mà không cần nói thêm.",
      sentences: [
        { en: "I want the [[red]] one, not the blue one.", vi: "Tôi muốn cái màu ĐỎ, không phải màu xanh." },
        { en: "[[I]] didn't take your pen.", vi: "TÔI không lấy bút của bạn (người khác lấy)." },
        { en: "I didn't take [[your]] pen.", vi: "Tôi không lấy bút của BẠN (tôi lấy bút của người khác)." },
        { en: "It's on the table, not [[under]] it.", vi: "Nó ở TRÊN bàn, không phải DƯỚI bàn." },
      ],
    },
  ],
  story: {
    title: "Bài thuyết trình đầu tiên của Linh",
    paras: [
      {
        en: "On Monday, Linh had to give her first [[presentation]]. She practised all weekend. \"Today I will [[present]] our new [[project]],\" she said to the mirror. \"Verb: preˈsent. Noun: ˈproject. Nouns stress the first syllable, verbs the second!\"",
        vi: "Thứ Hai, Linh phải làm bài thuyết trình đầu tiên. Cô luyện suốt cuối tuần: \"Hôm nay tôi sẽ trình bày dự án mới\", cô nói với gương. \"Động từ: preˈsent. Danh từ: ˈproject. Danh từ nhấn âm tiết đầu, động từ nhấn âm tiết sau!\"",
      },
      {
        en: "At the meeting, she talked about [[economic]] [[information]] and [[electricity]] costs. Tom smiled: everything was clear. Then she said \"We need to ˈdevelop...\" and stopped. \"[[Develop]],\" Tom whispered. \"Stress the second syllable.\"",
        vi: "Trong cuộc họp, cô nói về thông tin kinh tế và chi phí điện. Tom mỉm cười: mọi thứ đều rõ ràng. Rồi cô nói \"We need to ˈdevelop...\" (nhấn sai) và ngập ngừng. \"deˈvelop\", Tom thì thầm. \"Nhấn âm tiết thứ hai.\"",
      },
      {
        en: "After work, Linh and Jake had dinner. \"How was it?\" Jake asked. \"I was [[nervous]], but I [[think]] it went [[well]],\" she said. Jake laughed: \"Hear that? You stressed the [[right]] [[words]] — [[nervous]], [[think]], [[well]]. Very [[natural]]!\"",
        vi: "Sau giờ làm, Linh và Jake đi ăn tối. \"Thế nào rồi?\" Jake hỏi. \"Tớ hồi hộp, nhưng tớ nghĩ là ổn\", cô nói. Jake cười: \"Nghe thấy chưa? Cậu nhấn đúng những từ quan trọng — nervous, think, well. Rất tự nhiên!\"",
      },
      {
        en: "At home, Mrs Brown asked, \"Was it [[thirteen]] or [[thirty]] people at the meeting?\" \"[[Thirteen]],\" said Linh, stretching the end: thirˈteen. \"Not ˈthirty. That would be [[terrifying]]!\"",
        vi: "Về nhà, bà Brown hỏi: \"Cuộc họp có mười ba hay ba mươi người hả cháu?\" \"Mười ba ạ\", Linh nói, kéo dài phần cuối: thirˈteen. \"Không phải ˈthirty. Ba mươi thì đáng sợ lắm!\"",
      },
    ],
  },
  twister: {
    en: "A photographer takes photographs for a photographic magazine.",
    vi: "Một nhiếp ảnh gia chụp ảnh cho tạp chí nhiếp ảnh. (ˈphotograph → phoˈtographer → ˌphotoˈgraphic: trọng âm nhảy ba vị trí.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Trọng âm",
      q: "\"record\" là ĐỘNG TỪ (ghi âm) được nhấn thế nào?",
      opts: ["reˈcord /rɪˈkɔːd/", "ˈrecord /ˈrek.ɔːd/"],
      answer: 0,
      explain: "Động từ hai âm tiết thường nhấn sau: reˈcord /rɪˈkɔːd/. Danh từ ˈrecord /ˈrek.ɔːd/ nhấn đầu.",
    },
    {
      type: "choice",
      label: "Trọng âm",
      q: "Trọng âm đúng của \"information\"?",
      opts: ["inforˈmation /ˌɪn.fəˈmeɪ.ʃən/", "ˈinformation", "inˈformation", "informaˈtion"],
      answer: 0,
      explain: "Đuôi -tion kéo trọng âm về âm tiết ngay trước nó: inforˈmation /ˌɪn.fəˈmeɪ.ʃən/.",
    },
    {
      type: "choice",
      label: "Trọng âm",
      q: "Trọng âm đúng của \"photographer\"?",
      opts: ["phoˈtographer /fəˈtɒɡ.rə.fə/", "ˈphotographer", "photoˈgrapher", "photograˈpher"],
      answer: 0,
      explain: "photographer /fəˈtɒɡ.rə.fə/ nhấn âm tiết thứ hai, khác với ˈphotograph /ˈfəʊ.tə.ɡrɑːf/.",
    },
    {
      type: "choice",
      label: "Trọng âm",
      q: "Trọng âm đúng của \"Vietnamese\"?",
      opts: ["Vietnaˈmese /ˌvjet.nəˈmiːz/", "ˈVietnamese", "Vietˈnamese"],
      answer: 0,
      explain: "Đuôi -ese tự mang trọng âm: Vietnaˈmese, Japaˈnese, Chiˈnese.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy số nào?",
      say: "thirteen",
      opts: ["thirteen /θɜːˈtiːn/", "thirty /ˈθɜː.ti/"],
      answer: 0,
      explain: "thirteen nhấn âm tiết sau và kết thúc bằng /iːn/ dài; thirty nhấn đầu và kết thúc bằng /ti/ ngắn.",
    },
    {
      type: "choice",
      label: "Trọng âm",
      q: "\"greenhouse\" (nhà kính) được nhấn thế nào?",
      opts: ["ˈgreenhouse /ˈɡriːn.haʊs/", "greenˈhouse /ˌɡriːn ˈhaʊs/"],
      answer: 0,
      explain: "Danh từ ghép nhấn từ đầu: ˈgreenhouse. Nhấn sau (green ˈhouse) nghĩa là \"ngôi nhà màu xanh\".",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Trong câu \"I'd like a cup of tea\", từ nào thường KHÔNG được nhấn?",
      opts: ["of", "like", "cup", "tea"],
      answer: 0,
      explain: "\"of\" là từ chức năng, đọc yếu /əv/ hoặc /ə/. like, cup, tea là từ nội dung nên được nhấn.",
    },
    {
      type: "judge",
      q: "Trong tiếng Anh, mọi âm tiết trong câu đều dài bằng nhau, giống tiếng Việt.",
      ok: false,
      explain: "Sai. Tiếng Anh có nhịp theo trọng âm: âm tiết nhấn dài và rõ, âm tiết không nhấn bị rút gọn (thường thành /ə/).",
    },
  ],
};
