import type { IpaLesson } from "../types";

export const ipa18: IpaLesson = {
  id: "ipa-18",
  num: 18,
  title: "Âm cuối & cụm phụ âm",
  mark: "-s · -ed",
  level: "Nâng cao",
  group: "Nâng cao",
  intro:
    "Bỏ âm cuối là lỗi phát âm phổ biến và gây hiểu lầm nhiều nhất của người Việt: \"nice\", \"night\", \"nine\", \"knife\" đều thành \"nai\"; \"I walked\" thành \"I walk\", \"two books\" thành \"two book\". Trong tiếng Anh, âm cuối mang cả nghĩa từ vựng lẫn ngữ pháp (số nhiều, thì quá khứ, ngôi thứ ba). Bài này hệ thống lại toàn bộ: âm cuối, cụm phụ âm cuối, quy tắc đọc đuôi -s/-es và -ed, độ dài nguyên âm và cách nối âm cuối sang từ sau.",
  phonemes: [],
  rules: [
    {
      title: "Vì sao người Việt hay bỏ âm cuối?",
      body:
        "Tiếng Việt chỉ có rất ít phụ âm cuối (p, t, c/ch, m, n, ng/nh) và các âm tắc cuối p, t, c đều \"nuốt\" — miệng đóng lại nhưng không bật hơi. Vì vậy ta quen đọc nhẹ hoặc bỏ hẳn âm cuối. Trong tiếng Anh, âm cuối phân biệt nghĩa: thiếu nó, người nghe phải đoán. Âm tắc cuối (/p t k b d ɡ/) có thể không bật mạnh, nhưng PHẢI đóng miệng đúng vị trí; còn các âm xát như /s z f v θ ʃ/ thì phải nghe rõ.",
      examples: [
        { w: "nine", ipa: "naɪn", vi: "số chín" },
        { w: "nice", ipa: "naɪs", vi: "dễ chịu" },
        { w: "night", ipa: "naɪt", vi: "ban đêm" },
        { w: "knife", ipa: "naɪf", vi: "con dao" },
        { w: "rice", ipa: "raɪs", vi: "cơm, gạo" },
        { w: "ride", ipa: "raɪd", vi: "cưỡi, đi xe" },
      ],
      sentences: [
        { en: "Is it [[nice]] to [[ride]] at [[night]]?", vi: "Đạp xe ban đêm có thích không?" },
      ],
    },
    {
      title: "Những âm cuối KHÔNG có trong tiếng Việt",
      body:
        "Các âm /s z f v θ ð ʃ ʒ tʃ dʒ l b d ɡ/ không bao giờ đứng cuối trong tiếng Việt, nên rất dễ bị bỏ hoặc biến dạng: \"bus\" thành \"bớt\", \"five\" thành \"phai\", \"page\" thành \"pây\", \"school\" thành \"xì-cun\". Cách sửa: kéo dài âm cuối một chút khi luyện (\"busss\", \"fivvv\") rồi rút ngắn dần, và đừng thêm nguyên âm phía sau (\"bus-xơ\").",
      examples: [
        { w: "bus", ipa: "bʌs", vi: "xe buýt" },
        { w: "five", ipa: "faɪv", vi: "số năm" },
        { w: "fish", ipa: "fɪʃ", vi: "con cá" },
        { w: "watch", ipa: "wɒtʃ", vi: "xem; đồng hồ" },
        { w: "page", ipa: "peɪdʒ", vi: "trang giấy" },
        { w: "mouth", ipa: "maʊθ", vi: "cái miệng" },
        { w: "school", ipa: "skuːl", vi: "trường học" },
        { w: "job", ipa: "dʒɒb", vi: "công việc" },
      ],
      sentences: [
        { en: "I [[love]] [[this]] [[bus]] — it [[goes]] to my [[school]].", vi: "Tôi thích chiếc xe buýt này — nó đi tới trường tôi." },
      ],
    },
    {
      title: "Âm cuối /n/ – /ŋ/ – /l/",
      body:
        "Người Việt (nhất là giọng miền Nam) dễ lẫn \"n\" và \"ng\" ở cuối, còn /l/ cuối hay bị đọc thành \"n\" hoặc \"u\" (\"milk\" thành \"miu\"). /n/: đầu lưỡi chạm lợi trên. /ŋ/: đầu lưỡi để yên, cuống lưỡi chạm ngạc mềm. /l/ cuối (\"l tối\"): đầu lưỡi chạm lợi trên, cuống lưỡi nâng lên, âm hơi giống \"ồ\" — nhưng đầu lưỡi PHẢI chạm.",
      examples: [
        { w: "thin", ipa: "θɪn", vi: "gầy, mỏng" },
        { w: "thing", ipa: "θɪŋ", vi: "đồ vật" },
        { w: "ran", ipa: "ræn", vi: "đã chạy" },
        { w: "rang", ipa: "ræŋ", vi: "đã reo (chuông)" },
        { w: "milk", ipa: "mɪlk", vi: "sữa" },
        { w: "feel", ipa: "fiːl", vi: "cảm thấy" },
      ],
      sentences: [
        { en: "The [[phone]] [[rang]] and I [[ran]] to answer it.", vi: "Điện thoại reo và tôi chạy ra nghe." },
      ],
    },
    {
      title: "Cụm phụ âm cuối: đọc đủ, không chèn nguyên âm",
      body:
        "Tiếng Anh có những cụm 2–4 phụ âm ở cuối từ: desks /sks/, texts /ksts/, months /nθs/, asked /skt/, sixth /ksθ/, twelfth /lfθ/. Người Việt thường bỏ bớt (desks → \"đét\") hoặc chèn nguyên âm (\"đét-xờ-kờ-xờ\"). Hãy đọc các phụ âm liền nhau trong một hơi, không có nguyên âm xen giữa. Khi nói nhanh, người bản xứ cũng rút gọn (texts → /teks/, months → /mʌns/), nhưng người học nên luyện dạng đầy đủ trước.",
      examples: [
        { w: "desks", ipa: "desks", vi: "những cái bàn" },
        { w: "texts", ipa: "teksts", vi: "tin nhắn, văn bản (số nhiều)" },
        { w: "months", ipa: "mʌnθs", vi: "các tháng" },
        { w: "asked", ipa: "ɑːskt", vi: "đã hỏi" },
        { w: "world", ipa: "wɜːld", vi: "thế giới" },
        { w: "helped", ipa: "helpt", vi: "đã giúp" },
        { w: "sixth", ipa: "sɪksθ", vi: "thứ sáu (số thứ tự)" },
        { w: "twelfth", ipa: "twelfθ", vi: "thứ mười hai" },
      ],
      sentences: [
        { en: "She [[asked]] me to check the [[texts]] on the [[desks]].", vi: "Cô ấy nhờ tôi kiểm tra các văn bản trên bàn." },
        { en: "I've [[lived]] here for [[six]] [[months]].", vi: "Tôi đã sống ở đây được sáu tháng." },
      ],
    },
    {
      title: "Hữu thanh hay vô thanh — chìa khóa của đuôi -s và -ed",
      body:
        "Đặt tay lên cổ họng: nếu cổ rung khi phát âm là âm HỮU THANH, không rung là VÔ THANH. Vô thanh: /p t k f θ s ʃ tʃ/. Hữu thanh: /b d ɡ v ð z ʒ dʒ m n ŋ l r w j/ và TẤT CẢ nguyên âm. Đuôi -s và -ed \"bắt chước\" âm đứng trước nó: sau âm vô thanh thì vô thanh (/s/, /t/), sau âm hữu thanh thì hữu thanh (/z/, /d/). Lưu ý: xét theo ÂM cuối, không phải chữ cái cuối (laugh kết thúc bằng âm /f/, \"fix\" kết thúc bằng /s/).",
      examples: [
        { w: "cap", ipa: "kæp", vi: "mũ lưỡi trai — /p/ vô thanh" },
        { w: "cab", ipa: "kæb", vi: "xe taxi — /b/ hữu thanh" },
        { w: "laugh", ipa: "lɑːf", vi: "cười — chữ gh nhưng âm /f/" },
      ],
    },
    {
      title: "Đuôi -s / -es: /s/, /z/ hay /ɪz/",
      body:
        "Áp dụng cho danh từ số nhiều, động từ ngôi thứ ba số ít, sở hữu cách 's và dạng rút gọn (it's, he's).\n① /ɪz/ — sau các âm \"xuýt\" /s z ʃ ʒ tʃ dʒ/: buses, roses, wishes, watches, pages, boxes. Thêm hẳn một âm tiết.\n② /s/ — sau âm vô thanh /p t k f θ/: cups, cats, books, laughs, months.\n③ /z/ — sau âm hữu thanh và nguyên âm: dogs, bags, days, cars, plays, rooms. Đây là trường hợp NHIỀU NHẤT, nhưng người Việt hay đọc nhầm thành /s/.",
      examples: [
        { w: "watches", ipa: "ˈwɒtʃ.ɪz", vi: "xem (ngôi 3); đồng hồ — /ɪz/" },
        { w: "pages", ipa: "ˈpeɪ.dʒɪz", vi: "các trang — /ɪz/" },
        { w: "books", ipa: "bʊks", vi: "những cuốn sách — /s/" },
        { w: "cats", ipa: "kæts", vi: "những con mèo — /s/" },
        { w: "dogs", ipa: "dɒɡz", vi: "những con chó — /z/" },
        { w: "plays", ipa: "pleɪz", vi: "chơi (ngôi 3) — /z/" },
        { w: "cars", ipa: "kɑːz", vi: "những chiếc xe — /z/" },
      ],
      sentences: [
        { en: "Tom [[watches]] [[films]], [[reads]] [[books]] and [[plays]] [[games]].", vi: "Tom xem phim, đọc sách và chơi trò chơi.", ipa: "tɒm ˈwɒtʃ.ɪz fɪlmz riːdz bʊks ən pleɪz ɡeɪmz" },
        { en: "[[Linh's]] boss [[likes]] [[cats]].", vi: "Sếp của Linh thích mèo." },
      ],
    },
    {
      title: "Đuôi -ed: /t/, /d/ hay /ɪd/",
      body:
        "① /ɪd/ — chỉ sau /t/ và /d/: wanted, needed, started, decided. Thêm một âm tiết.\n② /t/ — sau âm vô thanh /p k f s ʃ tʃ θ/: stopped, looked, laughed, missed, washed, watched.\n③ /d/ — sau âm hữu thanh và nguyên âm: played, lived, called, cleaned, opened, changed.\nLỗi hay gặp: đọc mọi đuôi -ed thành \"ét\" hoặc thêm âm tiết (\"looked\" thành \"lúc-két\"). \"looked\" chỉ có MỘT âm tiết /lʊkt/. Ngoại lệ: một số tính từ đuôi -ed luôn đọc /ɪd/: naked /ˈneɪ.kɪd/, wicked /ˈwɪk.ɪd/, crooked /ˈkrʊk.ɪd/, beloved, aged (rất già) /ˈeɪ.dʒɪd/.",
      examples: [
        { w: "wanted", ipa: "ˈwɒn.tɪd", vi: "đã muốn — /ɪd/" },
        { w: "needed", ipa: "ˈniː.dɪd", vi: "đã cần — /ɪd/" },
        { w: "stopped", ipa: "stɒpt", vi: "đã dừng — /t/" },
        { w: "looked", ipa: "lʊkt", vi: "đã nhìn — /t/" },
        { w: "laughed", ipa: "lɑːft", vi: "đã cười — /t/" },
        { w: "played", ipa: "pleɪd", vi: "đã chơi — /d/" },
        { w: "lived", ipa: "lɪvd", vi: "đã sống — /d/" },
        { w: "naked", ipa: "ˈneɪ.kɪd", vi: "trần trụi — tính từ, ngoại lệ /ɪd/" },
      ],
      sentences: [
        { en: "She [[stopped]], [[looked]] around and [[smiled]].", vi: "Cô ấy dừng lại, nhìn quanh và mỉm cười.", ipa: "ʃi stɒpt lʊkt əˈraʊnd ən smaɪld" },
        { en: "We [[waited]] and [[waited]], then [[decided]] to go home.", vi: "Chúng tôi chờ mãi, rồi quyết định về nhà." },
      ],
    },
    {
      title: "Nguyên âm dài hơn trước âm cuối hữu thanh",
      body:
        "Cùng một nguyên âm, đứng trước phụ âm cuối HỮU THANH (/b d ɡ v z/) sẽ dài hơn hẳn so với trước phụ âm VÔ THANH (/p t k f s/). Vì âm cuối hữu thanh thường bị \"mất tiếng\" một phần ở cuối câu, người bản xứ chủ yếu dựa vào ĐỘ DÀI NGUYÊN ÂM để phân biệt \"seat\" và \"seed\". Người Việt đọc mọi nguyên âm dài như nhau và nuốt âm cuối, nên các cặp này nghe giống hệt nhau. Hãy kéo dài nguyên âm trước âm hữu thanh, cắt ngắn trước âm vô thanh.",
      examples: [
        { w: "seat", ipa: "siːt", vi: "chỗ ngồi (ngắn)" },
        { w: "seed", ipa: "siːd", vi: "hạt giống (dài)" },
        { w: "back", ipa: "bæk", vi: "lưng; phía sau (ngắn)" },
        { w: "bag", ipa: "bæɡ", vi: "cái túi (dài)" },
        { w: "rice", ipa: "raɪs", vi: "cơm (ngắn)" },
        { w: "rise", ipa: "raɪz", vi: "tăng lên (dài)" },
        { w: "safe", ipa: "seɪf", vi: "an toàn (ngắn)" },
        { w: "save", ipa: "seɪv", vi: "cứu, tiết kiệm (dài)" },
      ],
      sentences: [
        { en: "Put the [[bag]] at the [[back]].", vi: "Để cái túi ở phía sau." },
      ],
    },
    {
      title: "Xem trước: nối âm cuối với nguyên âm của từ sau",
      body:
        "Khi một từ kết thúc bằng phụ âm và từ sau bắt đầu bằng nguyên âm, người bản xứ \"chuyển\" phụ âm cuối sang đầu từ sau, nên nghe như một từ dài: \"pick it up\" nghe như \"pi-ki-tắp\", \"an apple\" như \"ơ-náp-pồ\". Đây cũng là \"cứu cánh\" cho người Việt: âm cuối khó đọc sẽ trở thành âm ĐẦU — dễ hơn nhiều. Bài về nối âm sẽ học kỹ hơn.",
      examples: [
        { w: "pick it up", ipa: "pɪk ɪt ʌp", vi: "nhặt lên — nghe như \"pi-ki-tắp\"" },
        { w: "an apple", ipa: "ən ˈæp.əl", vi: "một quả táo — \"ơ-náp-pồ\"" },
        { w: "turn off", ipa: "tɜːn ˈɒf", vi: "tắt — \"tơ-nóp\"" },
        { w: "asked a question", ipa: "ɑːskt ə ˈkwes.tʃən", vi: "đã hỏi một câu — \"ás-kờ-tờ…\"" },
      ],
      sentences: [
        { en: "[[Check it out]]! [[Turn it off]] and [[pick it up]].", vi: "Xem này! Tắt nó đi rồi nhặt nó lên." },
      ],
    },
  ],
  story: {
    title: "Linh và những âm cuối bị \"mất tích\"",
    paras: [
      {
        en: "On Monday Tom [[asked]] Linh about her [[weekend]]. \"I walk to the park and watch two film,\" she said. Tom smiled: \"You [[walked]] and you [[watched]] two [[films]]. [[Don't]] forget the [[endings]]!\"",
        vi: "Thứ Hai, Tom hỏi Linh về cuối tuần của cô. \"Em đi bộ ra công viên và xem hai phim,\" cô nói (nhưng quên hết đuôi). Tom cười: \"Em ĐÃ đi bộ và ĐÃ xem hai bộ PHIM. Đừng quên âm cuối nhé!\"",
      },
      {
        en: "Linh [[practised]] at her [[desk]]: \"[[Desks]], [[texts]], [[months]], [[asked]].\" The [[clusters]] [[felt]] like [[stones]] in her mouth, but she [[kept]] going.",
        vi: "Linh luyện ngay tại bàn làm việc: \"desks, texts, months, asked\". Các cụm phụ âm cứ như đá sỏi trong miệng, nhưng cô vẫn kiên trì.",
      },
      {
        en: "Jake [[laughed]] on the phone. \"[[Relax]]! In [[fast]] speech we often say 'tex' for '[[texts]]'. But [[first]] you [[learn]] the full form.\"",
        vi: "Jake cười qua điện thoại: \"Thư giãn đi! Khi nói nhanh bọn tớ cũng hay nói 'tex' thay cho 'texts'. Nhưng trước hết cậu phải học dạng đầy đủ đã.\"",
      },
      {
        en: "That evening Mrs Brown [[cooked]] fish and [[chips]]. \"[[Thanks]] — it [[smells]] amazing!\" Linh said, and every final [[sound]] was there. Mrs Brown [[clapped]].",
        vi: "Tối đó bà Brown nấu món cá chiên khoai tây. \"Cảm ơn bà — thơm quá ạ!\" Linh nói, và không âm cuối nào bị mất. Bà Brown vỗ tay.",
      },
    ],
  },
  twister: {
    en: "The sixth sick sheikh's sixth sheep's sick.",
    vi: "Con cừu thứ sáu của vị tù trưởng ốm thứ sáu bị ốm. (Luyện cụm /ksθ/ và /ks/ — một trong những câu khó nhất tiếng Anh.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "watched",
      opts: ["watched /wɒtʃt/", "watch /wɒtʃ/"],
      answer: 0,
      explain: "watched /wɒtʃt/ có thêm /t/ rất ngắn ở cuối — chỉ một âm tiết, nhưng mang nghĩa quá khứ.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Bạn nghe thấy từ nào?",
      say: "bag",
      opts: ["bag /bæɡ/", "back /bæk/"],
      answer: 0,
      explain: "bag có nguyên âm DÀI hơn vì đứng trước âm hữu thanh /ɡ/; back ngắn và dứt khoát trước /k/.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Đuôi -ed trong từ nào đọc là /ɪd/?",
      opts: ["needed", "played", "stopped", "called"],
      answer: 0,
      explain: "needed /ˈniː.dɪd/: sau /d/ → /ɪd/. played /pleɪd/, called /kɔːld/ → /d/; stopped /stɒpt/ → /t/.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Đuôi -ed trong từ nào đọc là /t/?",
      opts: ["laughed", "lived", "wanted", "opened"],
      answer: 0,
      explain: "laughed /lɑːft/: âm cuối là /f/ vô thanh (dù viết gh) → /t/. lived, opened → /d/; wanted → /ɪd/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Đuôi -es trong từ nào đọc là /ɪz/?",
      opts: ["watches", "books", "dogs", "plays"],
      answer: 0,
      explain: "watches /ˈwɒtʃ.ɪz/: sau âm xuýt /tʃ/ → /ɪz/. books → /s/; dogs, plays → /z/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Đuôi -s trong từ nào đọc là /s/?",
      opts: ["months", "cars", "days", "bags"],
      answer: 0,
      explain: "months /mʌnθs/: sau /θ/ vô thanh → /s/. cars /kɑːz/, days /deɪz/, bags /bæɡz/ → /z/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Phiên âm đúng của \"texts\" là?",
      opts: ["/teksts/", "/teks/", "/tekst/", "/ˈtek.sɪz/"],
      answer: 0,
      explain: "texts /teksts/ — cụm bốn phụ âm cuối /ksts/, một âm tiết, không chèn nguyên âm.",
    },
    {
      type: "judge",
      q: "Trong tính từ \"naked\", đuôi -ed đọc là /t/ vì đứng sau âm /k/.",
      ok: false,
      explain: "Sai. \"naked\" /ˈneɪ.kɪd/ là ngoại lệ: một số tính từ (naked, wicked, crooked, beloved) luôn đọc đuôi -ed là /ɪd/.",
    },
  ],
};
