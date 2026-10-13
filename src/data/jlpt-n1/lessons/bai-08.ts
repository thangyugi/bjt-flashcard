import type { N1Lesson } from "../types";

export const bai08: N1Lesson = {
  id: "bai-08",
  num: 8,
  topicJa: "逆接",
  topicVi: "Nghịch tiếp (nhưng · vậy mà · tưởng là…)",
  chapterJa: "お詫びの訪問",
  chapterVi: "Chuyến đi xin lỗi",
  scene:
    "Tháng Chín. Kenta gửi nhầm số lượng đơn hàng cho khách lớn nhất. Mai cùng trưởng phòng Tanaka đến xin lỗi. Một chương về những điều \"NGƯỢC VỚI MONG ĐỢI\": vậy mà, giá như…, tuy… nhưng, tưởng là… hóa ra.",
  story: [
    {
      jp: "健太が取引先に送った注文書の数字が、一けた間違っていた。一言相談してくれれば手伝った[[ものを]]、健太は一人で抱え込んでいたのだ。",
      vi: "Đơn đặt hàng Kenta gửi cho đối tác sai mất một chữ số. Giá mà cậu ấy hỏi một câu thì Mai đã giúp rồi, vậy mà Kenta lại ôm một mình.",
    },
    {
      jp: "田中部長とマイはすぐに取引先へ向かった。部長は深く頭を下げた。「お忙しい[[ところを]]、お時間をいただき申し訳ございません。」",
      vi: "Trưởng phòng Tanaka và Mai lập tức đến chỗ đối tác. Trưởng phòng cúi đầu thật sâu: \"Chúng tôi thành thật xin lỗi vì đã làm phiền thời gian quý báu trong lúc ngài đang bận.\"",
    },
    {
      jp: "帰りの電車で、部長はマイに言った。「新人[[とはいえ]]、ミスはミスだ。だが、責任を取るのは上司の仕事だよ。」",
      vi: "Trên chuyến tàu về, trưởng phòng nói với Mai: \"Tuy là nhân viên mới, nhưng sai vẫn là sai. Có điều, chịu trách nhiệm là việc của cấp trên.\"",
    },
    {
      jp: "相手の社長は厳しい人だと聞いていたので、きっと怒られる[[と思いきや]]、「正直に来てくれてありがとう」と笑って、さらに大きな注文をくれた。",
      vi: "Nghe nói giám đốc bên kia là người khó tính nên ai cũng tưởng chắc chắn bị mắng, ai ngờ ông lại cười: \"Cảm ơn các anh chị đã thành thật đến đây\", rồi còn đặt thêm một đơn hàng lớn hơn.",
    },
    {
      jp: "社長の最後の言葉が、マイの心に残った。「いかに大きな会社[[といえども]]、誠実さがなければ信頼されないものです。」",
      vi: "Câu nói cuối của vị giám đốc đọng lại trong lòng Mai: \"Dù là công ty lớn đến đâu đi nữa, không có sự thành thật thì sẽ không được tin tưởng.\"",
    },
  ],
  patterns: [
    {
      id: "tokorowo",
      pattern: "〜ところを",
      meaning: "Trong lúc (đang…) vậy mà (làm phiền) — xin lỗi/cảm ơn",
      nuance:
        "Cách nói lịch sự: dù đối phương đang ở tình huống như vậy (bận, nghỉ ngơi…) mà mình lại làm phiền → thể hiện sự áy náy, cảm ơn. Cũng dùng: \"lẽ ra phải… vậy mà…\".",
      forms: ["Vthể thường／Aい + ところを", "Aな-な／N-の + ところを"],
      position: {
        before: "Tình huống của đối phương: お忙しい・お休みの・お疲れの",
        after: "Lời xin lỗi / cảm ơn / nhờ vả: すみません・ありがとうございます",
      },
      register: "Kính ngữ · giao tiếp công việc",
      usage: [
        "Cụm cố định: お忙しいところを, お休みのところを, ご多忙のところを.",
        "Dạng \"V-なければならないところを…\" = lẽ ra phải… vậy mà…",
      ],
      examples: [
        {
          jp: "お急ぎの[[ところを]]すみません。ちょっと伺ってもよろしいでしょうか。",
          vi: "Xin lỗi đã làm phiền lúc anh đang vội. Tôi hỏi một chút được không ạ?",
        },
        {
          jp: "すぐにご報告しなければならない[[ところを]]、遅くなってしまい申し訳ありません。",
          vi: "Lẽ ra phải báo cáo ngay, vậy mà lại để chậm trễ, thành thật xin lỗi.",
        },
        {
          jp: "お休みの[[ところを]]お電話してしまい、失礼いたしました。",
          vi: "Xin lỗi vì đã gọi điện vào lúc anh đang nghỉ ngơi.",
        },
      ],
      dos: ["Mở đầu email/cuộc gọi với cấp trên, khách hàng: お忙しいところを…"],
      donts: [
        {
          text: "Không có ý xin lỗi/cảm ơn/làm phiền → không dùng.",
          bad: "雨が降っているところを、散歩した。",
          good: "雨が降っているのに、散歩した。",
        },
      ],
      compare: [
        {
          other: "〜のに (N4)",
          diff: "のに: \"vậy mà\" trung tính, thường bất mãn. ところを: lịch sự, hướng tới đối phương (xin lỗi / cảm ơn).",
        },
        {
          other: "〜ところ（を）+ 受身 (N2)",
          diff: "Nghĩa khác: \"đúng lúc đang…\" (いたずらしているところを見つかった = bị bắt gặp đúng lúc đang nghịch).",
        },
      ],
      memo: "ところ = \"tình huống\" — chen vào tình huống của người ta thì phải nói \"xin lỗi\" 🙇. お忙しいところを申し訳ございません.",
      storyLine: "「お忙しい[[ところを]]、お時間をいただき申し訳ございません。」",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống (email công việc)",
          q: "本日はご多忙の＿＿＿、お越しいただきありがとうございました。",
          opts: ["ところを", "ものを", "とはいえ", "と思いきや"],
          answer: 0,
          explain: "Cảm ơn đối phương đến dù đang bận → ご多忙のところを.",
        },
        {
          type: "judge",
          q: "お疲れのところを、ありがとうございました。",
          ok: true,
          explain: "Cảm ơn đối phương dù đang mệt → đúng.",
        },
      ],
    },
    {
      id: "monowo",
      pattern: "〜ものを",
      meaning: "Giá mà… thì đã…, vậy mà (tiếc nuối / trách móc)",
      nuance:
        "Giả định một điều khác thực tế: \"nếu làm thế thì đã tốt rồi\", nhưng thực tế không như vậy. Cả câu thể hiện TIẾC NUỐI hoặc BẤT MÃN của người nói. Vế sau có thể bị lược bỏ.",
      forms: ["Vthể thường／Aい + ものを", "Aな-な + ものを"],
      position: {
        before: "Giả định tốt đẹp (〜ば…た・〜たら…のに)",
        after: "Thực tế đáng tiếc (có thể bỏ trống: 〜ものを。)",
      },
      register: "Văn nói & viết · cảm xúc",
      usage: [
        "Hay đi với 〜ば／〜たら ở đầu câu: 言ってくれれば手伝ったものを.",
        "Thường kết thúc câu luôn bằng ものを (lửng lơ, tiếc nuối).",
      ],
      examples: [
        {
          jp: "一言声をかけてくれれば手伝った[[ものを]]。",
          vi: "Giá mà nói với tôi một tiếng thì tôi đã giúp rồi…",
        },
        {
          jp: "すぐ病院に行けば治った[[ものを]]、彼は我慢してしまった。",
          vi: "Nếu đi viện ngay thì đã khỏi rồi, vậy mà anh ta lại cố chịu.",
        },
        {
          jp: "黙っていれば分からない[[ものを]]、彼は自分から話してしまった。",
          vi: "Cứ im lặng thì chẳng ai biết, vậy mà anh ta lại tự khai ra.",
        },
      ],
      dos: ["Tiếc nuối, trách móc nhẹ về một việc đã rồi."],
      donts: [
        {
          text: "Không có giả định trái thực tế → không dùng.",
          bad: "雨が降ったものを、試合は中止になった。",
          good: "雨が降ったので、試合は中止になった。",
        },
      ],
      compare: [
        {
          other: "〜のに (cuối câu)",
          diff: "Gần nghĩa nhất (言ってくれればよかったのに). ものを văn chương hơn, cảm xúc tiếc nuối mạnh hơn.",
        },
        {
          other: "〜ものの (N2)",
          diff: "ものの: \"tuy… nhưng\" (sự thật, trung tính): 買ったものの、使っていない. ものを: giả định trái thực tế + tiếc nuối.",
        },
      ],
      memo: "ものを = \"cái điều (tốt) ấy… thế mà\" 😔. Mai nghĩ về Kenta: 一言相談してくれれば手伝ったものを.",
      storyLine: "一言相談してくれれば手伝った[[ものを]]、健太は一人で抱え込んでいたのだ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "もう少し早く家を出れば間に合った＿＿＿、寝坊してしまった。",
          opts: ["ものを", "ところを", "とはいえ", "といえども"],
          answer: 0,
          explain: "Giả định trái thực tế (ra khỏi nhà sớm thì kịp) + tiếc nuối → ものを.",
        },
        {
          type: "choice",
          label: "Phân biệt",
          q: "「〜ものを」と「〜ものの」、正しい組み合わせはどれか。\nA: 免許は取った＿＿、まだ運転したことがない。\nB: 言ってくれれば貸した＿＿。",
          opts: ["A: ものの／B: ものを", "A: ものを／B: ものの", "A: ものを／B: ものを", "A: ものの／B: ものの"],
          answer: 0,
          explain: "A là sự thật \"tuy đã có bằng nhưng…\" → ものの. B là giả định + tiếc nuối → ものを.",
        },
      ],
    },
    {
      id: "towaie",
      pattern: "〜とはいえ",
      meaning: "Tuy nói là… nhưng (thực tế vẫn…)",
      nuance:
        "Thừa nhận sự thật A, nhưng vế sau là đánh giá/nhận định của người nói không giống như những gì A gợi ra. Văn viết, hơi trang trọng.",
      forms: ["N／Vthể thường／Aい + とはいえ", "Aな／N（だ）+ とはいえ"],
      position: {
        before: "Sự thật được thừa nhận (新人・春・ダイエット中・時間がある)",
        after: "Đánh giá / ý kiến của người nói trái với dự đoán",
      },
      register: "Văn viết · lập luận",
      usage: [
        "Vế trước là SỰ THẬT (không phải giả định).",
        "Vế sau thường là nhận định, lời khuyên: 〜べきだ, 〜ほうがいい, 〜だ.",
      ],
      examples: [
        {
          jp: "ダイエット中[[とはいえ]]、出された料理に手をつけないのは失礼だと思う。",
          vi: "Tuy đang ăn kiêng, nhưng không động đũa vào món được mời thì tôi nghĩ là thất lễ.",
        },
        {
          jp: "締め切りまでまだ時間がある[[とはいえ]]、早めに完成させておいたほうがいい。",
          vi: "Tuy còn thời gian đến hạn chót, nhưng nên hoàn thành sớm thì hơn.",
        },
        {
          jp: "春[[とはいえ]]、朝晩はまだ寒い。",
          vi: "Tuy nói là mùa xuân, nhưng sáng tối vẫn còn lạnh.",
        },
      ],
      dos: ["Lập luận: \"đúng là A, nhưng không vì thế mà…\"."],
      donts: [
        {
          text: "Vế trước là giả định cực đoan → dùng といえども.",
          bad: "たとえ大金持ちとはいえ、この絵は買えない。",
          good: "たとえ大金持ちといえども、この絵は買えない。",
        },
      ],
      compare: [
        {
          other: "〜といえども",
          diff: "といえども: cứng hơn, thường đi với たとえ/いかに, có thể là giả định; vế sau là nghĩa vụ, chủ trương. とはいえ: thường là sự thật hiện tại.",
        },
        {
          other: "〜とはいっても／〜といっても (N3)",
          diff: "Bản khẩu ngữ, thường để giảm nhẹ mức độ (料理ができるといっても、簡単な物だけ).",
        },
      ],
      memo: "とは + いえ（言え）= \"dù có NÓI là… đi nữa\" 🌸❄️: 春とはいえ、まだ寒い. Trưởng phòng: 新人とはいえ、ミスはミスだ.",
      storyLine: "新人[[とはいえ]]、ミスはミスだ。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "円安になった＿＿＿、海外旅行の人気は衰えていない。",
          opts: ["とはいえ", "ものを", "ところを", "と思いきや"],
          answer: 0,
          explain: "Sự thật (đồng yên giảm) + thực tế trái dự đoán (du lịch nước ngoài vẫn hút khách) → とはいえ.",
        },
        {
          type: "order",
          before: "",
          pieces: ["九月", "とはいえ", "まだ", "真夏の"],
          after: "ような暑さだ。",
          star: 2,
          vi: "Tuy đã là tháng Chín nhưng vẫn nóng như giữa hè.",
          explain: "九月とはいえ、まだ真夏のような暑さだ.",
        },
      ],
    },
    {
      id: "toiedomo",
      pattern: "〜といえども",
      meaning: "Cho dù là… đi nữa (thì cũng…)",
      nuance:
        "Dù là người/hoàn cảnh N (vốn được coi là đặc biệt), thực tế vẫn không khác. Vế sau thường là NGHĨA VỤ, quy tắc, chủ trương, sự quyết tâm. Rất trang trọng, hay đi với たとえ, いかに, どんな.",
      forms: ["N／Vthể thường + といえども"],
      position: {
        before: "Người / hoàn cảnh đặc biệt (子供・専門家・いかに困難な状況)",
        after: "Nghĩa vụ / chủ trương (〜てはならない・〜べきだ・〜できない)",
      },
      register: "Rất trang trọng · văn viết, diễn văn",
      usage: [
        "Hay đi với たとえ／いかに／どんな.",
        "Vế sau mang tính quy phạm: không được, phải, không thể.",
      ],
      examples: [
        {
          jp: "未成年者[[といえども]]、公共の場で勝手なことをしてはならない。",
          vi: "Dù là trẻ vị thành niên, cũng không được làm điều tùy tiện nơi công cộng.",
        },
        {
          jp: "いかに困難な状況にあった[[といえども]]、罪を犯したことは許されない。",
          vi: "Dù đã ở trong hoàn cảnh khó khăn đến đâu, việc phạm tội cũng không thể tha thứ.",
        },
        {
          jp: "どんな大富豪[[といえども]]、この有名な絵を買うことはできない。",
          vi: "Dù là tỷ phú cỡ nào đi nữa cũng không thể mua được bức tranh nổi tiếng này.",
        },
      ],
      dos: ["Diễn văn, luật lệ, lập luận mạnh: \"ngay cả X cũng phải / không được…\"."],
      donts: [
        {
          text: "Chuyện thường ngày nhẹ nhàng → quá cứng.",
          bad: "日曜日といえども、ちょっとコンビニに行ってくるね。",
          good: "日曜日だけど、ちょっとコンビニに行ってくるね。",
        },
      ],
      compare: [
        {
          other: "〜とはいえ",
          diff: "とはいえ: thừa nhận sự thật + nhận xét. といえども: cứng hơn, nhấn mạnh \"ngay cả X\" + nghĩa vụ/chủ trương.",
        },
        {
          other: "〜であれ (Chương 10)",
          diff: "たとえ N であれ cũng là \"dù là…\" nhưng thiên về \"không phân biệt\"; といえども nhấn mạnh địa vị đặc biệt của N.",
        },
      ],
      memo: "いえ + ども (cổ: dù) = \"dù có nói là…\" ⚖️ — giọng của luật pháp. Vị giám đốc: いかに大きな会社といえども、誠実さがなければ信頼されない.",
      storyLine: "いかに大きな会社[[といえども]]、誠実さがなければ信頼されないものです。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "たとえ社長＿＿＿、会社のルールは守らなければならない。",
          opts: ["といえども", "ものを", "ところを", "と思いきや"],
          answer: 0,
          explain: "たとえ + địa vị đặc biệt + nghĩa vụ → といえども.",
        },
        {
          type: "judge",
          q: "いかに優秀な医者といえども、すべての病気を治せるわけではない。",
          ok: true,
          explain: "いかに + N (đặc biệt) + といえども + nhận định → đúng.",
        },
      ],
    },
    {
      id: "to-omoikiya",
      pattern: "〜と思いきや",
      meaning: "Cứ tưởng là… ai ngờ (thực tế lại khác)",
      nuance:
        "Người nói đã nghĩ chắc chắn là A, nhưng kết quả thực tế lại ngược lại, gây bất ngờ. Vế sau là sự thật khác với dự đoán.",
      forms: ["Vthể thường／Aい + と思いきや", "N／Aな（だ）+ と思いきや", "〜（か）と思いきや"],
      position: {
        before: "Dự đoán của người nói (きっと〜だろう)",
        after: "Kết quả bất ngờ (thì quá khứ)",
      },
      register: "Văn viết · kể chuyện, báo chí nhẹ nhàng",
      usage: [
        "Vế sau là sự thật đã xảy ra, không phải ý chí.",
        "Hay dùng dạng 〜かと思いきや.",
      ],
      examples: [
        {
          jp: "試験は簡単だったので満点を取れた[[と思いきや]]、名前を書き忘れて零点になってしまった。",
          vi: "Bài thi dễ nên cứ tưởng được điểm tuyệt đối, ai ngờ quên ghi tên nên bị 0 điểm.",
        },
        {
          jp: "あの政党は選挙で圧勝したので長く政権が続くか[[と思いきや]]、一年ももたなかった。",
          vi: "Đảng đó thắng áp đảo nên cứ tưởng sẽ nắm quyền lâu, ai ngờ chưa được một năm.",
        },
        {
          jp: "高いレストランだからおいしい[[と思いきや]]、意外と普通の味だった。",
          vi: "Nhà hàng đắt nên cứ tưởng ngon, ai ngờ vị cũng bình thường.",
        },
      ],
      dos: ["Kể chuyện có \"cú twist\": dự đoán → kết quả ngược lại."],
      donts: [
        {
          text: "Kết quả đúng như dự đoán → không dùng.",
          bad: "雨が降ると思いきや、やはり雨が降った。",
          good: "雨が降ると思ったら、やはり降ってきた。",
        },
      ],
      compare: [
        {
          other: "〜と思ったら (N2)",
          diff: "と思ったら: có thể là đúng hoặc trái dự đoán, khẩu ngữ. と思いきや: luôn TRÁI dự đoán, văn viết.",
        },
        {
          other: "〜にもかかわらず",
          diff: "にもかかわらず: \"mặc dù\" (sự thật vs sự thật). と思いきや: dự đoán vs thực tế.",
        },
      ],
      memo: "思い + きや (cổ: \"đã… chăng?\") = \"Đã nghĩ thế… ai dè!\" 🎭. Ai cũng tưởng bị mắng (怒られると思いきや), ai ngờ được đơn hàng lớn hơn!",
      storyLine: "きっと怒られる[[と思いきや]]、「正直に来てくれてありがとう」と笑って、さらに大きな注文をくれた。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "息子はもう寝ている＿＿＿、まだ部屋でゲームをしていた。",
          opts: ["かと思いきや", "とはいえ", "ものを", "ところを"],
          answer: 0,
          explain: "Tưởng đã ngủ, ai ngờ vẫn chơi game → と思いきや.",
        },
        {
          type: "judge",
          q: "明日は晴れると思いきや、晴れるでしょう。",
          ok: false,
          explain: "と思いきや cần kết quả TRÁI với dự đoán và là sự thật đã xảy ra.",
          fix: "今日は晴れると思いきや、午後から雨が降り出した。",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Vế trước", "Sắc thái"],
    rows: [
      ["〜ところを", "Trong lúc… vậy mà (làm phiền)", "Tình huống đối phương", "Kính ngữ, xin lỗi/cảm ơn"],
      ["〜ものを", "Giá mà… thì đã…", "Giả định trái thực tế", "Tiếc nuối, trách móc"],
      ["〜とはいえ", "Tuy nói là… nhưng", "Sự thật", "Lập luận, nhận xét"],
      ["〜といえども", "Dù là… đi nữa", "Địa vị/hoàn cảnh đặc biệt", "Rất trang trọng, nghĩa vụ"],
      ["〜と思いきや", "Cứ tưởng… ai ngờ", "Dự đoán", "Bất ngờ, kể chuyện"],
    ],
  },
  links: [
    "Ôn N3–N2: のに, ものの, けれども, にもかかわらず. N1 tách nhỏ theo sắc thái: lịch sự (ところを), tiếc nuối (ものを), trang trọng (とはいえ・といえども), bất ngờ (と思いきや).",
    "ものを ≠ ものの: một chữ khác, nghĩa khác hẳn — đề thi rất thích bẫy này.",
    "といえども đi cùng たとえ/いかに — giống ようと (Chương 10) và であれ. Gom thành nhóm \"たとえ…\".",
    "Chương 12 có 〜手前 — cũng là chuyện thể diện, lịch sự trong công việc.",
  ],
  hook: "Chuyến xin lỗi: giá mà Kenta hỏi một câu (ものを) · xin lỗi đã làm phiền lúc ngài bận (ところを) · tuy là người mới nhưng sai vẫn là sai (とはいえ) · tưởng bị mắng, ai ngờ được đơn hàng (と思いきや) · dù là công ty lớn đến đâu (といえども).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜ところを", "Trong lúc (bận)… xin lỗi đã làm phiền"],
        ["〜ものを", "Giá mà… thì đã… (tiếc nuối)"],
        ["〜とはいえ", "Tuy nói là… nhưng"],
        ["〜といえども", "Dù là… đi nữa (trang trọng)"],
        ["〜と思いきや", "Cứ tưởng… ai ngờ"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "簡単な仕事だからすぐ終わる＿＿＿、結局夜中までかかってしまった。",
      opts: ["と思いきや", "とはいえ", "ところを", "といえども"],
      answer: 0,
      explain: "Tưởng xong ngay, ai ngờ đến nửa đêm → と思いきや.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "早く言ってくれれば迎えに行った＿＿＿。どうして黙っていたの？",
      opts: ["ものを", "ところを", "とはいえ", "ものの"],
      answer: 0,
      explain: "Giả định (nói sớm thì đã đi đón) + trách móc → ものを.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "お休みの＿＿＿お邪魔して、申し訳ありません。",
      opts: ["ところを", "ものを", "とはいえ", "と思いきや"],
      answer: 0,
      explain: "Làm phiền lúc đối phương nghỉ ngơi → ところを.",
    },
    {
      type: "order",
      before: "",
      pieces: ["プロ", "といえども", "ミスを", "する"],
      after: "ことはある。",
      star: 1,
      vi: "Dù là dân chuyên nghiệp thì cũng có lúc mắc lỗi.",
      explain: "プロといえども、ミスをすることはある.",
    },
    {
      type: "judge",
      q: "日曜日とはいえ、店は混んでいなかった。",
      ok: true,
      explain: "Sự thật (Chủ nhật) → thực tế trái dự đoán (quán không đông) → đúng.",
    },
    {
      type: "choice",
      label: "Chọn câu dùng đúng",
      q: "「〜と思いきや」の使い方が正しい文はどれか。",
      opts: [
        "電車が遅れると思いきや、時間通りに到着した。",
        "電車が遅れると思いきや、早く家を出よう。",
        "電車が遅れると思いきや、電車が遅れた。",
        "電車が遅れると思いきや、遅れないでほしい。",
      ],
      answer: 0,
      explain: "Câu 1: dự đoán (trễ) → thực tế ngược lại (đúng giờ). Các câu khác là ý chí, đúng dự đoán hoặc mong muốn.",
    },
  ],
};
