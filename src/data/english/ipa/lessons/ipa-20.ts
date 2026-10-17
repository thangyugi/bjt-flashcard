import type { IpaLesson } from "../types";

export const ipa20: IpaLesson = {
  id: "ipa-20",
  num: 20,
  title: "Nối âm, nuốt âm & ngữ điệu",
  mark: "‿",
  level: "Nâng cao",
  group: "Nâng cao",
  intro:
    "Người Việt đọc tiếng Anh thường tách rời từng từ như từng tiếng trong tiếng Việt, nên nghe \"cứng\" và — quan trọng hơn — không nghe kịp người bản xứ, vì họ nối, nuốt và biến đổi âm giữa các từ. \"Would you\" thành /wʊdʒu/, \"next day\" mất /t/, \"and\" chỉ còn /n/. Bài cuối này gom các quy luật nói liền, dạng yếu và ngữ điệu lên–xuống, kèm phương pháp shadowing để luyện cả câu.",
  phonemes: [],
  rules: [
    {
      title: "Nối phụ âm → nguyên âm",
      body:
        "Khi một từ kết thúc bằng PHỤ ÂM và từ sau bắt đầu bằng NGUYÊN ÂM, phụ âm cuối \"nhảy\" sang ghép với nguyên âm của từ sau, như thể không có khoảng trống. \"pick it up\" nghe như \"pi-ki-tắp\". Lưu ý: tính theo ÂM chứ không theo chữ — \"an hour\" vẫn nối /ə.ˈnaʊ.ə/ vì h câm; \"have a\" nối /hæ.və/ dù chữ e câm.",
      examples: [
        { w: "pick it up", ipa: "ˌpɪk‿ɪt‿ˈʌp", vi: "nhặt nó lên" },
        { w: "an apple", ipa: "ən‿ˈæp.əl", vi: "một quả táo" },
        { w: "turn off", ipa: "ˌtɜːn‿ˈɒf", vi: "tắt" },
        { w: "look at it", ipa: "ˈlʊk‿ət‿ɪt", vi: "nhìn nó đi" },
        { w: "an hour", ipa: "ən‿ˈaʊ.ə", vi: "một tiếng đồng hồ" },
      ],
      sentences: [
        { en: "[[Turn it off]] and [[put it on]] the shelf.", vi: "Tắt nó đi và đặt lên kệ.", ipa: "ˌtɜːn‿ɪt‿ˈɒf ən ˌpʊt‿ɪt‿ˈɒn ðə ʃelf" },
        { en: "[[Can I have an egg]]?", vi: "Cho tôi một quả trứng được không?", ipa: "kən‿aɪ ˌhæv‿ən‿ˈeɡ" },
      ],
    },
    {
      title: "Nối nguyên âm → nguyên âm: chèn /j/ hoặc /w/",
      body:
        "Hai nguyên âm gặp nhau thì người bản xứ chèn một âm lướt nhỏ để không bị \"đứt\". Sau nguyên âm kết thúc bằng môi dẹt/lưỡi trước (/iː/, /ɪ/, /eɪ/, /aɪ/, /ɔɪ/) → chèn /j/. Sau nguyên âm kết thúc bằng môi tròn (/uː/, /əʊ/, /aʊ/) → chèn /w/. Người Việt hay ngắt bằng một cú tắc họng (\"I | am\") — hãy để giọng chảy liền.",
      examples: [
        { w: "I am", ipa: "aɪ‿jæm", vi: "tôi là (chèn /j/)" },
        { w: "see it", ipa: "ˈsiː‿jɪt", vi: "thấy nó (chèn /j/)" },
        { w: "the end", ipa: "ðiː‿ˈjend", vi: "kết thúc (chèn /j/)" },
        { w: "go out", ipa: "ˌɡəʊ‿ˈwaʊt", vi: "đi ra ngoài (chèn /w/)" },
        { w: "do it", ipa: "ˈduː‿wɪt", vi: "làm đi (chèn /w/)" },
        { w: "how are you", ipa: "ˌhaʊ‿wə ˈjuː", vi: "bạn khỏe không (chèn /w/)" },
      ],
      sentences: [
        { en: "[[Do it]] now, then [[go out]] and [[enjoy it]].", vi: "Làm ngay đi, rồi ra ngoài tận hưởng.", ipa: "ˈduː‿wɪt naʊ ðen ˌɡəʊ‿ˈwaʊt ənd ɪnˈdʒɔɪ‿jɪt" },
      ],
    },
    {
      title: "Linking r (giọng Anh)",
      body:
        "Giọng Anh không đọc r cuối từ (car /kɑː/, far /fɑː/). Nhưng khi từ sau bắt đầu bằng nguyên âm, chữ r cuối \"sống lại\" để nối: far away /ˌfɑːr‿əˈweɪ/, four apples /ˌfɔːr‿ˈæp.əlz/. Nhiều người Anh còn chèn /r/ cả khi không có chữ r (intrusive r): \"law and order\" /ˌlɔːr‿ən ˈɔː.də/, \"the idea of\" /ði aɪˈdɪər‿əv/ — nghe được là đủ, không bắt buộc bắt chước. Giọng Mỹ vốn đọc mọi chữ r nên tự nhiên nối.",
      examples: [
        { w: "far away", ipa: "ˌfɑːr‿əˈweɪ", vi: "xa xôi" },
        { w: "four apples", ipa: "ˌfɔːr‿ˈæp.əlz", vi: "bốn quả táo" },
        { w: "where is", ipa: "ˈweər‿ɪz", vi: "ở đâu" },
        { w: "her eyes", ipa: "hər‿ˈaɪz", vi: "đôi mắt cô ấy" },
      ],
      sentences: [
        { en: "[[Where is]] the [[car a]]nd [[your umbrella]]?", vi: "Xe và ô của bạn đâu rồi?", ipa: "ˈweər‿ɪz ðə ˈkɑːr‿ənd jɔːr‿ʌmˈbrel.ə" },
      ],
    },
    {
      title: "Nuốt âm (elision): /t/, /d/ giữa hai phụ âm và schwa bị lược",
      body:
        "Khi /t/ hoặc /d/ bị kẹp giữa hai phụ âm, người bản xứ thường bỏ hẳn: next day, last night, must be, hands. Trong từ, nguyên âm /ə/ sau âm tiết nhấn cũng hay bị nuốt, làm từ ngắn đi một âm tiết: chocolate, different, family, camera, vegetable, interesting. Người Việt đọc đủ mọi âm sẽ nghe chậm và nặng — nhưng KHÔNG được bỏ /t/, /d/ khi chúng đứng trước nguyên âm.",
      examples: [
        { w: "next day", ipa: "ˌneks ˈdeɪ", vi: "ngày hôm sau" },
        { w: "last night", ipa: "ˌlɑːs ˈnaɪt", vi: "tối qua" },
        { w: "must be", ipa: "ˈmʌs bi", vi: "chắc hẳn là" },
        { w: "chocolate", ipa: "ˈtʃɒk.lət", vi: "sô-cô-la" },
        { w: "different", ipa: "ˈdɪf.rənt", vi: "khác" },
        { w: "vegetable", ipa: "ˈvedʒ.tə.bəl", vi: "rau củ" },
      ],
      sentences: [
        { en: "I saw him [[last night]], and he [[must be]] tired the [[next day]].", vi: "Tối qua tôi gặp anh ấy, chắc hôm sau anh ấy mệt lắm.", ipa: "aɪ ˈsɔː ɪm ˌlɑːs ˈnaɪt ən i ˈmʌs bi ˈtaɪəd ðə ˌneks ˈdeɪ" },
      ],
    },
    {
      title: "Đồng hóa (assimilation): âm biến đổi theo âm bên cạnh",
      body:
        "Khi nói nhanh, âm cuối từ trước biến đổi cho dễ chuyển sang âm đầu từ sau. (1) /t/, /d/ + /j/ → /tʃ/, /dʒ/: would you → /wʊdʒu/, did you → /dɪdʒu/, meet you → /miːtʃu/, don't you → /dəʊntʃu/. (2) /s/, /z/ + /j/ → /ʃ/, /ʒ/: this year → /ðɪʃ jɪə/. (3) /n/ trước /p b m/ → /m/: ten boys → /tem bɔɪz/, in bed → /ɪm bed/; /n/ trước /k ɡ/ → /ŋ/: in case → /ɪŋ keɪs/. (4) /t/ trước /p b m/ → /p/, trước /k ɡ/ → /k/: that boy → /ðæp bɔɪ/, that girl → /ðæk ɡɜːl/.",
      examples: [
        { w: "would you", ipa: "wʊdʒu", vi: "bạn có muốn / có thể" },
        { w: "nice to meet you", ipa: "ˌnaɪs tə ˈmiːtʃu", vi: "rất vui được gặp bạn" },
        { w: "this year", ipa: "ðɪʃ ˈjɪə", vi: "năm nay" },
        { w: "ten boys", ipa: "ˌtem ˈbɔɪz", vi: "mười cậu bé" },
        { w: "in case", ipa: "ɪŋ ˈkeɪs", vi: "phòng khi" },
        { w: "that girl", ipa: "ðæk ˈɡɜːl", vi: "cô gái đó" },
      ],
      sentences: [
        { en: "[[Would you]] like to [[meet you]]r friends [[this year]]?", vi: "Năm nay bạn có muốn gặp bạn bè không?", ipa: "wʊdʒu ˈlaɪk tə ˈmiːtʃə ˈfrendz ðɪʃ ˈjɪə" },
        { en: "[[Did you]] see [[ten boys]] [[in bed]]?", vi: "Bạn có thấy mười cậu bé trên giường không?", ipa: "dɪdʒu ˈsiː ˌtem ˈbɔɪz ɪm ˈbed" },
      ],
    },
    {
      title: "Dạng yếu (weak forms) của từ chức năng",
      body:
        "Các từ chức năng không nhấn có dạng yếu, hầu hết chứa /ə/: and /ən/, /n/; to /tə/; of /əv/, /ə/; can /kən/; for /fə/; at /ət/; was /wəz/; them /ðəm/; some /səm/; a /ə/; the /ðə/. Dạng mạnh chỉ dùng khi từ đứng CUỐI câu hoặc được nhấn mạnh: \"What are you looking for?\" /fɔː/, \"Yes, I can.\" /kæn/. Mẹo nghe: \"I can go\" /aɪ kən ˈɡəʊ/ (can yếu) ↔ \"I can't go\" /aɪ ˈkɑːnt ˈɡəʊ/ (can't luôn mạnh, nguyên âm dài).",
      examples: [
        { w: "fish and chips", ipa: "ˌfɪʃ ən ˈtʃɪps", vi: "cá và khoai tây chiên" },
        { w: "a cup of tea", ipa: "ə ˌkʌp əv ˈtiː", vi: "một tách trà" },
        { w: "I can swim", ipa: "aɪ kən ˈswɪm", vi: "tôi biết bơi" },
        { w: "I can't swim", ipa: "aɪ ˈkɑːnt ˈswɪm", vi: "tôi không biết bơi" },
        { w: "for you", ipa: "fə ˈjuː", vi: "cho bạn" },
      ],
      sentences: [
        { en: "I [[want to]] go [[to]] the shop [[for]] a bottle [[of]] milk [[and]] some bread.", vi: "Tôi muốn đi ra cửa hàng mua một chai sữa và ít bánh mì.", ipa: "aɪ ˈwɒnt tə ˈɡəʊ tə ðə ˈʃɒp fər‿ə ˈbɒt.əl əv ˈmɪlk ən səm ˈbred" },
        { en: "\"Who's it [[for]]?\" — \"It's [[for]] you.\"", vi: "\"Cái này cho ai?\" — \"Cho bạn đấy.\" (for cuối câu: /fɔː/; for giữa câu: /fə/)", ipa: "ˈhuːz ɪt ˈfɔː ɪts fə ˈjuː" },
      ],
    },
    {
      title: "Dạng rút gọn (contractions)",
      body:
        "Trong lời nói (và văn viết thân mật), trợ động từ dính vào từ trước: I'm, you're, he's, it's, we've, they'll, I'd, don't, can't, won't. Chú ý các cặp dễ nhầm: won't /wəʊnt/ (sẽ không) ↔ want /wɒnt/ (muốn); I'd = I would / I had; it's (it is) ↔ its (của nó) đọc giống nhau. Dạng rút gọn của have sau modal đọc /əv/: should've /ˈʃʊd.əv/, could've, would've — vì vậy người bản xứ hay viết sai thành \"should of\". Khẩu ngữ Mỹ còn có gonna (going to), wanna (want to), gotta (got to) — hiểu được, chỉ dùng khi nói thân mật.",
      examples: [
        { w: "won't", ipa: "wəʊnt", vi: "sẽ không" },
        { w: "want", ipa: "wɒnt", vi: "muốn" },
        { w: "should've", ipa: "ˈʃʊd.əv", vi: "lẽ ra nên" },
        { w: "they'll", ipa: "ðeɪl", vi: "họ sẽ" },
        { w: "we're", ipa: "wɪə", vi: "chúng tôi là / đang" },
      ],
      sentences: [
        { en: "I [[won't]] go — I [[don't]] [[want]] to.", vi: "Tôi sẽ không đi — tôi không muốn.", ipa: "aɪ ˈwəʊnt ˈɡəʊ aɪ ˈdəʊnt ˈwɒnt tuː" },
        { en: "You [[should've]] told me [[you'd]] be late.", vi: "Lẽ ra bạn nên nói với tôi là bạn sẽ đến muộn.", ipa: "ju ˈʃʊd.əv ˈtəʊld mi juːd bi ˈleɪt" },
      ],
    },
    {
      title: "Ngữ điệu xuống ↘: câu kể, câu hỏi Wh-, câu mệnh lệnh",
      body:
        "Giọng tiếng Anh lên xuống trên TỪ NHẤN CUỐI CÙNG của câu (nucleus). Ngữ điệu xuống ↘ thể hiện sự chắc chắn, hoàn tất: dùng cho câu kể, câu hỏi bắt đầu bằng Wh- (what, where, why, how…) và câu mệnh lệnh. Người Việt hay lên giọng ở cuối câu hỏi Wh- vì nghĩ \"câu hỏi thì lên giọng\" — trong tiếng Anh nghe như đang ngạc nhiên hoặc hỏi lại.",
      sentences: [
        { en: "I live in [[London]]. ↘", vi: "Tôi sống ở London." },
        { en: "Where do you [[live]]? ↘", vi: "Bạn sống ở đâu?" },
        { en: "What time is it [[now]]? ↘", vi: "Bây giờ là mấy giờ?" },
        { en: "Close the [[door]], please. ↘", vi: "Làm ơn đóng cửa lại." },
      ],
    },
    {
      title: "Ngữ điệu lên ↗: câu hỏi Yes/No, liệt kê, câu hỏi đuôi",
      body:
        "Ngữ điệu lên ↗ thể hiện điều chưa xong, chưa chắc: dùng cho câu hỏi Yes/No (Do you…? Are you…? Can I…?), các mục đầu khi liệt kê (lên, lên… mục cuối xuống), và lời hỏi lại vì ngạc nhiên. Câu hỏi đuôi có hai kiểu: lên ↗ khi thật sự hỏi (không chắc), xuống ↘ khi chỉ muốn người nghe xác nhận điều mình đã biết.",
      sentences: [
        { en: "Do you like [[coffee]]? ↗", vi: "Bạn có thích cà phê không?" },
        { en: "I bought [[apples]] ↗, [[bananas]] ↗ and [[grapes]]. ↘", vi: "Tôi mua táo, chuối và nho." },
        { en: "It's a nice day, [[isn't it]]? ↘", vi: "Hôm nay trời đẹp nhỉ? (chờ xác nhận)" },
        { en: "You're coming tomorrow, [[aren't you]]? ↗", vi: "Ngày mai bạn đến phải không? (thật sự không chắc)" },
      ],
    },
    {
      title: "Phương pháp luyện: shadowing (nói đuổi)",
      body:
        "Shadowing giúp bạn luyện CẢ trọng âm, nối âm, nuốt âm và ngữ điệu cùng lúc. Bước 1: chọn một đoạn ghi âm ngắn 15–30 giây có kèm lời (hội thoại, podcast cho người học). Bước 2: nghe 2–3 lần, đọc lời, đánh dấu từ nhấn, chỗ nối ‿ và mũi tên ↗↘. Bước 3: nghe từng câu rồi bấm dừng và nhại lại y hệt — cả tốc độ lẫn giai điệu. Bước 4: nói đuổi cùng lúc với bản ghi, chậm hơn nửa nhịp, như cái bóng. Bước 5: tự ghi âm và so sánh với bản gốc. Luyện 10–15 phút mỗi ngày hiệu quả hơn 2 tiếng mỗi tuần. Mẹo: hãy bắt chước \"giai điệu\" trước, từng âm sau.",
      sentences: [
        { en: "[[What do you]] [[want to do]] [[this evening]]?", vi: "Tối nay bạn muốn làm gì? (câu mẫu để shadowing)", ipa: "ˈwɒt də jə ˈwɒnt tə ˈduː ðɪs‿ˈiːv.nɪŋ" },
      ],
    },
  ],
  story: {
    title: "Đêm ở quán rượu",
    paras: [
      {
        en: "On Friday, Tom took Linh to a pub. \"[[What do you]] [[want to]] drink?\" he asked — but it sounded like \"Wodja wanna drink?\" Linh blinked. \"Sorry, [[could you]] say [[that again]]?\"",
        vi: "Thứ Sáu, Tom đưa Linh đến một quán rượu. \"Em muốn uống gì?\" anh hỏi — nhưng nghe như \"Wodja wanna drink?\" Linh chớp mắt: \"Xin lỗi, anh nói lại được không?\"",
      },
      {
        en: "Tom laughed and slowed down. \"In fast English we [[join it all]] together. [[Pick it up]] becomes 'pi-ki-tup'. [[Next day]] loses its t. [[Would you]] becomes 'wudju'.\" Linh wrote it all [[in a]] notebook: ‿ for linking, ↘ for falling.",
        vi: "Tom cười và nói chậm lại: \"Khi nói nhanh, bọn anh nối hết vào nhau. 'Pick it up' thành 'pi-ki-tắp'. 'Next day' mất âm t. 'Would you' thành 'wúd-giu'.\" Linh ghi hết vào sổ: ‿ là nối âm, ↘ là xuống giọng.",
      },
      {
        en: "Then Jake joined them on a video call from New York. \"[[Are you]] [[having a]] good time?\" ↗ he asked. \"Yes! [[I am]]!\" Linh said, linking \"I‿y‿am\" without a break. Jake whistled: \"[[Now you]] sound like a local!\"",
        vi: "Rồi Jake gọi video từ New York: \"Mọi người vui không?\" ↗ anh hỏi. \"Có! Vui lắm!\" Linh nói, nối \"I‿y‿am\" không ngắt quãng. Jake huýt sáo: \"Giờ cậu nói như người bản xứ rồi đấy!\"",
      },
      {
        en: "Back home, Mrs Brown was waiting [[up]]. \"[[Did you]] have fun, dear?\" ↗ \"It was the [[best evening]] [[of all]],\" Linh smiled. \"And I finally understood [[fish and chips]]: fish'n'chips!\"",
        vi: "Về đến nhà, bà Brown vẫn thức đợi. \"Cháu chơi vui chứ?\" ↗ \"Đó là buổi tối tuyệt nhất từ trước đến giờ\", Linh mỉm cười. \"Và cuối cùng cháu cũng hiểu 'fish and chips': nghe là 'fish'n'chips'!\"",
      },
    ],
  },
  twister: {
    en: "Would you like an apple or an orange in an hour?",
    vi: "Một tiếng nữa bạn muốn một quả táo hay một quả cam? (Luyện /wʊdʒu/ và nối: lai‿kə‿næp.əl ɔː‿rə‿nɒr.ɪndʒ ɪ‿nə‿naʊ.ə.)",
  },
  quiz: [
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Khi nói nhanh, \"would you\" trong câu này nghe như thế nào?",
      say: "Would you like some tea?",
      opts: ["/wʊdʒu/", "/wʊd juː/ (tách rời)", "/wʊ juː/", "/wʊz juː/"],
      answer: 0,
      explain: "/d/ + /j/ đồng hóa thành /dʒ/: would you → /wʊdʒu/. Tương tự did you /dɪdʒu/, meet you /miːtʃu/.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Nói liền \"go out\", người bản xứ chèn âm nào giữa hai từ?",
      opts: ["/w/", "/j/", "/r/", "/h/"],
      answer: 0,
      explain: "/əʊ/ kết thúc bằng môi tròn → chèn /w/: /ˌɡəʊ‿ˈwaʊt/. Sau /iː/, /aɪ/, /eɪ/ thì chèn /j/.",
    },
    {
      type: "choice",
      label: "Phiên âm",
      q: "Khi nói nhanh tự nhiên, \"ten boys\" thường nghe là?",
      opts: ["/tem bɔɪz/", "/teŋ bɔɪz/", "/te bɔɪz/", "/ten ə bɔɪz/"],
      answer: 0,
      explain: "/n/ trước /b/ (âm môi) đồng hóa thành /m/: ten boys → /tem bɔɪz/.",
    },
    {
      type: "choice",
      label: "Nhìn chữ đoán âm",
      q: "Trong \"last night\" nói nhanh, âm nào thường bị nuốt?",
      opts: ["/t/ trong last", "/s/ trong last", "/n/ trong night", "/t/ trong night"],
      answer: 0,
      explain: "/t/ bị kẹp giữa hai phụ âm /s/ và /n/ nên bị lược: /ˌlɑːs ˈnaɪt/.",
    },
    {
      type: "choice",
      label: "Chọn âm",
      q: "Trong câu \"I can swim.\", \"can\" thường được đọc là?",
      opts: ["/kən/", "/kæn/", "/kɑːn/", "/kɑːnt/"],
      answer: 0,
      explain: "can không nhấn ở giữa câu dùng dạng yếu /kən/. Dạng mạnh /kæn/ khi đứng cuối câu (\"Yes, I can.\"). can't luôn mạnh: /kɑːnt/.",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Câu hỏi Yes/No này thường kết thúc bằng ngữ điệu nào?",
      say: "Do you like coffee?",
      opts: ["Lên giọng ↗", "Xuống giọng ↘"],
      answer: 0,
      explain: "Câu hỏi Yes/No thường lên giọng ↗ ở từ nhấn cuối (coffee).",
    },
    {
      type: "choice",
      label: "Nghe và chọn",
      q: "Câu hỏi Wh- này thường kết thúc bằng ngữ điệu nào?",
      say: "Where do you live?",
      opts: ["Xuống giọng ↘", "Lên giọng ↗"],
      answer: 0,
      explain: "Câu hỏi Wh- (what, where, why, how…) thường xuống giọng ↘, giống câu kể.",
    },
    {
      type: "judge",
      q: "Trong giọng Anh (UK), chữ r ở cuối \"far\" được phát âm khi nói \"far away\".",
      ok: true,
      explain: "Đúng. Đó là linking r: r cuối từ \"sống lại\" khi từ sau bắt đầu bằng nguyên âm → /ˌfɑːr‿əˈweɪ/.",
    },
  ],
};
