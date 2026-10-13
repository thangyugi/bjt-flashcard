import type { N1Lesson } from "../types";

export const bai20: N1Lesson = {
  id: "bai-20",
  num: 20,
  topicJa: "心情・強制",
  topicVi: "Tâm trạng · sự bắt buộc",
  chapterJa: "新しい春",
  chapterVi: "Mùa xuân mới",
  scene:
    "Chương cuối. Ngày Mai lên đường về Việt Nam, chuyến bay bị hoãn vì bão, và những người thân thương ở Tokyo có thêm vài giờ bên cô. Chương này học cách nói về TÂM TRẠNG mãnh liệt và SỰ BẮT BUỘC — để khép lại một năm đầy cảm xúc.",
  story: [
    {
      jp: "出発の日、台風の影響で、マイの乗る飛行機は欠航[[を余儀なくされた]]。出発は翌朝に延びた。",
      vi: "Ngày lên đường, do ảnh hưởng của bão, chuyến bay của Mai buộc phải hủy. Giờ khởi hành lùi sang sáng hôm sau.",
    },
    {
      jp: "その知らせを聞いた健太は、「あいつにはさんざん世話になったんだ。見送りに行か[[ないではすまない]]よ」と言って、仕事を早めに切り上げた。",
      vi: "Nghe tin, Kenta nói: \"Mai giúp tớ bao nhiêu chuyện rồi. Không đi tiễn thì không được\", rồi kết thúc công việc sớm.",
    },
    {
      jp: "その夜、山本さんの家に皆が集まった。マイは一人一人の顔を見ながら言った。「この一年、本当にありがとうございました。皆さんには感謝の念[[に堪えません]]。」",
      vi: "Tối hôm ấy, mọi người tụ họp ở nhà bà Yamamoto. Mai nhìn từng gương mặt và nói: \"Một năm qua, thật sự cảm ơn mọi người. Lòng biết ơn của cháu không sao kể xiết.\"",
    },
    {
      jp: "マイの飾らない言葉は、聞く人の心を動かさ[[ずにはおかなかった]]。いつもは冷静な佐藤先輩も、涙[[を禁じ得なかった]]。",
      vi: "Những lời giản dị của Mai đã lay động trái tim của tất cả những ai lắng nghe. Ngay cả chị Satō vốn luôn điềm tĩnh cũng không cầm được nước mắt.",
    },
    {
      jp: "翌朝、空港で田中部長が手を差し出した。「君の成功を心から願って[[やまない]]。いつでも帰っておいで。」",
      vi: "Sáng hôm sau ở sân bay, trưởng phòng Tanaka chìa tay ra: \"Tôi luôn mong em thành công từ tận đáy lòng. Lúc nào cũng có thể quay về nhé.\"",
    },
    {
      jp: "飛行機の窓から、満開の桜が小さく見えた。一年前と同じ春。でも、マイにとっては、まったく新しい春だった。",
      vi: "Từ ô cửa máy bay, những cây anh đào nở rộ hiện lên nhỏ xíu. Vẫn là mùa xuân như một năm trước. Nhưng với Mai, đó là một mùa xuân hoàn toàn mới.",
    },
  ],
  patterns: [
    {
      id: "teyamanai",
      pattern: "〜てやまない",
      meaning: "Luôn luôn (mong, yêu…) từ tận đáy lòng",
      nuance:
        "Một cảm xúc mạnh mẽ tiếp diễn không ngừng. Chỉ đi với động từ tình cảm lâu dài: 願う, 祈る, 期待する, 愛する, 尊敬する. Chủ ngữ thường là người nói (không nêu ra).",
      forms: ["Vて + やまない"],
      position: {
        before: "願う・祈る・期待する・愛する・尊敬する",
        after: "やまない (cuối câu) / やまない + N",
      },
      register: "Văn viết · trang trọng (phát biểu, thư)",
      usage: [
        "Không dùng với cảm xúc nhất thời: 失望する, 腹を立てる, 驚く.",
        "Hay dùng trong lời chúc: ご活躍を願ってやみません.",
      ],
      examples: [
        {
          jp: "この写真に写っているのは、私が愛して[[やまない]]ふるさとの風景だ。",
          vi: "Trong bức ảnh này là phong cảnh quê hương mà tôi luôn yêu tha thiết.",
        },
        {
          jp: "卒業生の皆さんの幸せを願って[[やみません]]。",
          vi: "Tôi luôn cầu chúc hạnh phúc cho tất cả các em tốt nghiệp.",
        },
        {
          jp: "親は子供の将来に期待して[[やまない]]ものだ。",
          vi: "Cha mẹ thì luôn kỳ vọng vào tương lai của con cái.",
        },
      ],
      dos: ["Lời chúc, phát biểu trang trọng, cảm xúc bền lâu."],
      donts: [
        {
          text: "Cảm xúc nhất thời → không dùng.",
          bad: "彼の態度に腹を立ててやまない。",
          good: "彼の態度に腹が立って仕方がない。",
        },
      ],
      compare: [
        {
          other: "〜てならない／〜てたまらない (N2)",
          diff: "てならない/てたまらない: cảm xúc trào dâng (cả nhất thời: 暑くてたまらない). てやまない: cảm xúc tốt đẹp, BỀN LÂU, trang trọng.",
        },
      ],
      memo: "やむ (止む) = ngừng → やまない = KHÔNG NGỪNG 💐. 部長: 君の成功を心から願ってやまない.",
      storyLine: "君の成功を心から願って[[やまない]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "被災地の一日も早い復興を祈って＿＿＿。",
          opts: ["やみません", "禁じ得ません", "おきません", "すみません"],
          answer: 0,
          explain: "Lời cầu chúc bền lâu, trang trọng → 祈ってやみません.",
        },
        {
          type: "judge",
          q: "試合に負けて、私は失望してやまなかった。",
          ok: false,
          explain: "失望 là cảm xúc nhất thời → không dùng てやまない.",
          fix: "試合に負けて、私はひどく失望した。",
        },
      ],
    },
    {
      id: "ni-taenai-kanjou",
      pattern: "〜に堪えない（感情）",
      meaning: "Vô cùng (cảm kích, vui mừng…) — không sao kìm được",
      nuance:
        "Cảm xúc mạnh đến mức không kìm nén nổi. Rất trang trọng, dùng trong phát biểu, thư cảm ơn. Đi với vài danh từ cảm xúc: 感謝, 感激, 喜び, 同情, 遺憾.",
      forms: ["N(感謝・感激・喜び・同情) + に堪えない"],
      position: {
        before: "感謝・感激・喜び・同情・遺憾",
        after: "(cuối câu) に堪えません",
      },
      register: "Rất trang trọng · diễn văn, thư",
      usage: [
        "Chủ ngữ là người nói (không nêu ra).",
        "Khác nghĩa với 見る／聞くに堪えない (Ch.19).",
      ],
      examples: [
        {
          jp: "お忙しいところ多くの方にお集まりいただき、感激[[に堪えません]]。",
          vi: "Được đông đảo quý vị đến dự trong lúc bận rộn, tôi vô cùng cảm kích.",
        },
        {
          jp: "友人の田中君がこのような賞を受けたことは、喜び[[に堪えません]]。",
          vi: "Việc bạn tôi, anh Tanaka, nhận giải thưởng này khiến tôi vui mừng khôn xiết.",
        },
        {
          jp: "被害に遭われた皆様には、同情[[に堪えません]]。",
          vi: "Tôi vô cùng thương cảm với những người đã gặp nạn.",
        },
      ],
      dos: ["Phát biểu, thư cảm ơn trang trọng."],
      donts: [
        {
          text: "Hội thoại thân mật → quá cứng.",
          bad: "プレゼントありがとう！感謝に堪えないよ。",
          good: "プレゼントありがとう！本当にうれしい。",
        },
      ],
      compare: [
        {
          other: "〜に堪えない（評価）(Chương 19)",
          diff: "見る／聞くに堪えない = tệ không chịu nổi. 感謝／喜びに堪えない = cảm xúc tràn đầy. Nhìn từ đứng trước!",
        },
        {
          other: "〜を禁じ得ない",
          diff: "を禁じ得ない: không kìm được cảm xúc (thường do chứng kiến điều gì). に堪えない: cảm xúc của chính mình, lời lẽ lễ nghi.",
        },
      ],
      memo: "堪える = chịu → \"lòng biết ơn nhiều đến mức trái tim KHÔNG CHỨA NỔI\" 🙏. 皆さんには感謝の念に堪えません.",
      storyLine: "皆さんには感謝の念[[に堪えません]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "このような栄誉ある賞をいただき、感激＿＿＿。",
          opts: ["に堪えません", "を禁じ得ません", "てやみません", "ずにはおきません"],
          answer: 0,
          explain: "Danh từ cảm xúc 感激 + lời phát biểu trang trọng → に堪えません.",
        },
        {
          type: "choice",
          label: "Phân biệt",
          q: "A: 彼の自慢話は聞くに＿＿。 B: 皆様のご支援に感謝に＿＿。",
          opts: [
            "A: 堪えない（tệ）／B: 堪えない（biết ơn）",
            "A: 足らない／B: 堪えない",
            "A: 堪える／B: 足る",
            "A: 堪えない／B: 足る",
          ],
          answer: 0,
          explain: "Cùng hình thức 堪えない nhưng A là đánh giá tiêu cực, B là cảm xúc trang trọng.",
        },
      ],
    },
    {
      id: "naidewa-sumanai",
      pattern: "〜ないではすまない／〜ずにはすまない",
      meaning: "Không… thì không xong (nhất định phải…)",
      nuance:
        "Xét theo lẽ thường xã hội hoặc tình huống thì việc đó KHÔNG THỂ TRÁNH: nhất định phải làm (xin lỗi, bồi thường, bị phạt…). Không phải mong muốn cá nhân mà là nghĩa vụ khách quan.",
      forms: ["Vない + ではすまない", "Vない (bỏ ない) + ずにはすまない（する → せずにはすまない）"],
      position: {
        before: "Hành động bắt buộc theo lẽ thường: 謝る・弁償する・叱られる",
        after: "(cuối câu) すまない",
      },
      register: "Văn nói & viết",
      usage: [
        "Lý do là chuẩn mực xã hội / tình huống, không phải cảm xúc cá nhân.",
        "Hay đi với 〜たら／〜なら ở vế trước.",
      ],
      examples: [
        {
          jp: "人の心を傷つけてしまったなら、謝ら[[ないではすまない]]。",
          vi: "Nếu đã làm tổn thương người khác thì không xin lỗi là không xong.",
        },
        {
          jp: "家のお金を黙って持ち出したなんて、親に知られたら叱られ[[ないではすまない]]ぞ。",
          vi: "Lén lấy tiền nhà đi, bố mẹ mà biết thì không bị mắng là không xong đâu.",
        },
        {
          jp: "借りた車を壊したのだから、弁償せ[[ずにはすまない]]だろう。",
          vi: "Đã làm hỏng xe đi mượn thì chắc chắn phải bồi thường.",
        },
      ],
      dos: ["Nghĩa vụ đạo lý, xã hội: xin lỗi, đền bù, chịu phạt, đi tiễn người đã giúp mình."],
      donts: [
        {
          text: "Lý do chỉ là cảm xúc cá nhân → dùng ずにはいられない.",
          bad: "その映画を見て、泣かずにはすまなかった。",
          good: "その映画を見て、泣かずにはいられなかった。",
        },
      ],
      compare: [
        {
          other: "〜ずにはいられない (N2)",
          diff: "ずにはいられない: CẢM XÚC không kìm được (泣かずにはいられない). ずにはすまない: NGHĨA VỤ xã hội (謝らずにはすまない).",
        },
        {
          other: "〜ずにはおかない",
          diff: "ずにはおかない: quyết tâm / tác động tất yếu. ずにはすまない: tình huống bắt buộc phải làm.",
        },
      ],
      memo: "すむ (済む) = xong xuôi → \"KHÔNG làm thì chuyện KHÔNG xong\" 🙇. Kenta: 見送りに行かないではすまない.",
      storyLine: "あいつにはさんざん世話になったんだ。見送りに行か[[ないではすまない]]よ。",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách chia đúng",
          q: "会社に大きな損害を与えたのだから、責任を取ら＿＿＿。",
          opts: ["ずにはすまない", "ずにはすまず", "ないにはすまない", "なくてはすまないで"],
          answer: 0,
          explain: "取る → 取らない → 取ら + ずにはすまない.",
        },
        {
          type: "choice",
          label: "Phân biệt",
          q: "A: 約束を破ったのだから、謝ら＿＿。 B: あまりにおかしくて、笑わ＿＿。",
          opts: [
            "A: ずにはすまない／B: ずにはいられない",
            "A: ずにはいられない／B: ずにはすまない",
            "A: ずにはおかない／B: ずにはすまない",
            "A: ずにはすまない／B: ずにはおかない",
          ],
          answer: 0,
          explain: "A: nghĩa vụ xã hội → すまない. B: cảm xúc không kìm được → いられない.",
        },
      ],
    },
    {
      id: "zuniwa-okanai",
      pattern: "〜ないではおかない／〜ずにはおかない",
      meaning: "① Nhất định sẽ… (quyết tâm) ② Không thể không (gây ra)…",
      nuance:
        "① Chủ ngữ là người: quyết tâm mạnh mẽ nhất định làm (bắt khai, trả thù…). ② Chủ ngữ là sự vật/tác phẩm: tất yếu gây ra tác động tự nhiên (làm cảm động, khiến lo lắng…).",
      forms: ["Vない + ではおかない", "Vない (bỏ ない) + ずにはおかない（する → せずにはおかない）"],
      position: {
        before: "① hành động quyết tâm ② V使役 (感動させる・考えさせる)",
        after: "(cuối câu) おかない",
      },
      register: "Văn viết · mạnh",
      usage: [
        "Nghĩa ② hay dùng thể sai khiến: 人を感動させずにはおかない.",
        "Nghĩa ① chủ ngữ ngôi thứ nhất, thể hiện ý chí mạnh.",
      ],
      examples: [
        {
          jp: "あの話が嘘だったと、絶対に白状させ[[ないではおかない]]ぞ。",
          vi: "Nhất định tao sẽ bắt hắn khai ra câu chuyện đó là bịa.",
        },
        {
          jp: "警察署長の話から、必ず犯人を捕らえ[[ずにはおかない]]という意気込みを感じた。",
          vi: "Từ lời của cảnh sát trưởng, tôi cảm nhận được quyết tâm nhất định bắt được thủ phạm.",
        },
        {
          jp: "彼の映画は、見る人の心を動かさ[[ずにはおかない]]。",
          vi: "Phim của anh ấy không thể không lay động trái tim người xem.",
        },
      ],
      dos: ["① Tuyên bố quyết tâm. ② Bình luận tác động mạnh của tác phẩm, sự kiện."],
      donts: [
        {
          text: "Cảm xúc của chính mình không kìm được → dùng ずにはいられない.",
          bad: "その話を聞いて、私は泣かずにはおかなかった。",
          good: "その話を聞いて、私は泣かずにはいられなかった。",
        },
      ],
      compare: [
        {
          other: "〜ずにはいられない (N2)",
          diff: "いられない: cảm xúc CỦA MÌNH trào lên. おかない: quyết tâm, hoặc tác động lên NGƯỜI KHÁC.",
        },
        {
          other: "〜ずにはすまない",
          diff: "すまない: nghĩa vụ xã hội. おかない: ý chí / tác động tất yếu.",
        },
      ],
      memo: "おく (置く) = để yên → \"KHÔNG để yên đâu!\" 🔥. 彼女の言葉は聞く人の心を動かさずにはおかなかった.",
      storyLine: "マイの飾らない言葉は、聞く人の心を動かさ[[ずにはおかなかった]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "この小説は、読む人に戦争の悲惨さを考えさせ＿＿＿。",
          opts: ["ずにはおかない", "ずにはすまない", "てやまない", "を禁じ得ない"],
          answer: 0,
          explain: "Tác phẩm tất yếu tác động lên người đọc (使役) → ずにはおかない.",
        },
        {
          type: "order",
          before: "今度こそ、",
          pieces: ["必ず", "優勝", "せずには", "おかない"],
          after: "。",
          star: 2,
          vi: "Lần này nhất định phải vô địch.",
          explain: "必ず優勝せずにはおかない (する → せずにはおかない).",
        },
      ],
    },
    {
      id: "wo-kinjienai",
      pattern: "〜を禁じ得ない",
      meaning: "Không thể kìm nén (cảm xúc)…",
      nuance:
        "Trước một tình huống, cảm xúc trào dâng đến mức không thể kiềm chế: nước mắt, phẫn nộ, đồng cảm, kinh ngạc. Văn viết trang trọng. Chủ ngữ là người nói (không nêu).",
      forms: ["N(涙・怒り・同情・驚き) + を禁じ得ない"],
      position: {
        before: "Danh từ cảm xúc: 涙・怒り・同情・驚き・失望",
        after: "(cuối câu) を禁じ得ない",
      },
      register: "Văn viết · trang trọng",
      usage: [
        "Thường có nguyên nhân rõ ràng ở vế trước (見て, 聞いて).",
        "Chỉ đi với danh từ cảm xúc.",
      ],
      examples: [
        {
          jp: "生々しい戦争の傷跡を目の当たりにし、涙[[を禁じ得なかった]]。",
          vi: "Tận mắt chứng kiến những vết thương chiến tranh còn rỉ máu, tôi không cầm được nước mắt.",
        },
        {
          jp: "犯人の供述を聞き、犯行動機の身勝手さに怒り[[を禁じ得なかった]]。",
          vi: "Nghe lời khai của thủ phạm, tôi không kìm được phẫn nộ trước động cơ ích kỷ.",
        },
        {
          jp: "被災者の話には同情[[を禁じ得ない]]。",
          vi: "Nghe chuyện của người gặp nạn, tôi không thể không thương cảm.",
        },
      ],
      dos: ["Văn viết, báo chí, phát biểu: bày tỏ cảm xúc không kìm nén được."],
      donts: [
        {
          text: "Đi với động từ → sai (phải là danh từ).",
          bad: "その話を聞いて、泣くを禁じ得なかった。",
          good: "その話を聞いて、涙を禁じ得なかった。",
        },
      ],
      compare: [
        {
          other: "〜ずにはいられない (N2)",
          diff: "Gần nghĩa. ずにはいられない gắn ĐỘNG TỪ, nói & viết. を禁じ得ない gắn DANH TỪ cảm xúc, rất trang trọng.",
        },
      ],
      memo: "禁じ得ない = \"không thể cấm (cảm xúc)\" 💧. いつもは冷静な佐藤先輩も、涙を禁じ得なかった.",
      storyLine: "いつもは冷静な佐藤先輩も、涙[[を禁じ得なかった]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "弱い者をいじめる彼の行為には、怒り＿＿＿。",
          opts: ["を禁じ得ない", "に堪えない", "てやまない", "を余儀なくされる"],
          answer: 0,
          explain: "Danh từ cảm xúc 怒り + không kìm được → を禁じ得ない.",
        },
        {
          type: "judge",
          q: "あまりの不公平さに、驚きを禁じ得なかった。",
          ok: true,
          explain: "Danh từ cảm xúc (驚き) + を禁じ得ない → đúng.",
        },
      ],
    },
    {
      id: "wo-yoginaku",
      pattern: "〜を余儀なくされる／〜を余儀なくさせる",
      meaning: "Buộc phải… (không còn cách nào khác) / Buộc (ai) phải…",
      nuance:
        "Do hoàn cảnh bất khả kháng, buộc phải làm việc không mong muốn. される: chủ ngữ là NGƯỜI (bị buộc). させる: chủ ngữ là SỰ VIỆC (gây ra sự bắt buộc).",
      forms: ["N(danh động từ) + を余儀なくされる", "N(nguyên nhân) が + N + を余儀なくさせる"],
      position: {
        before: "Danh động từ: 中止・引退・入院・変更・撤退",
        after: "を余儀なくされる (người) / を余儀なくさせる (sự việc)",
      },
      register: "Văn viết · báo chí",
      usage: [
        "Danh từ phía trước là danh động từ (中止, 延期, 引退…).",
        "Chủ yếu dùng thể bị động 〜を余儀なくされる.",
      ],
      examples: [
        {
          jp: "中川選手はまだ若いが、度重なるけがにより引退[[を余儀なくされた]]。",
          vi: "Tuyển thủ Nakagawa còn trẻ nhưng vì chấn thương liên tiếp nên buộc phải giải nghệ.",
        },
        {
          jp: "彼は病気で入院[[を余儀なくされている]]間に、この小説を書いた。",
          vi: "Anh ấy viết cuốn tiểu thuyết này trong thời gian buộc phải nằm viện vì bệnh.",
        },
        {
          jp: "円高が、多くの企業に海外移転[[を余儀なくさせた]]。",
          vi: "Đồng yên tăng giá đã buộc nhiều doanh nghiệp phải chuyển ra nước ngoài.",
        },
      ],
      dos: ["Tin tức, báo cáo: hủy bỏ, rút lui, thay đổi do hoàn cảnh bất khả kháng."],
      donts: [
        {
          text: "Chủ ngữ là người mà dùng させる → sai vai.",
          bad: "私は台風で旅行の中止を余儀なくさせた。",
          good: "私は台風で旅行の中止を余儀なくされた。",
        },
      ],
      compare: [
        {
          other: "〜ざるを得ない (N2)",
          diff: "ざるを得ない: gắn ĐỘNG TỪ (やめざるを得ない), nói & viết. を余儀なくされる: gắn DANH TỪ, báo chí, rất trang trọng.",
        },
        {
          other: "〜ずにはすまない",
          diff: "ずにはすまない: nghĩa vụ đạo lý. 余儀なく: hoàn cảnh khách quan ép buộc.",
        },
      ],
      memo: "余儀 = \"cách khác\" → 余儀ない = không còn cách khác ✈️❌. マイの飛行機は欠航を余儀なくされた.",
      storyLine: "マイの乗る飛行機は欠航[[を余儀なくされた]]。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "大雪のため、試合は延期＿＿＿。",
          opts: ["を余儀なくされた", "を余儀なくさせた", "を禁じ得なかった", "に堪えなかった"],
          answer: 0,
          explain: "Trận đấu (đối tượng) bị buộc hoãn → を余儀なくされた.",
        },
        {
          type: "choice",
          label: "Chọn câu dùng đúng",
          q: "「〜を余儀なくさせる」の使い方が正しい文はどれか。",
          opts: [
            "不景気が、その会社に工場の閉鎖を余儀なくさせた。",
            "その会社は不景気で工場の閉鎖を余儀なくさせた。",
            "私は病気で仕事を余儀なくさせた。",
            "雨が降ったので、遠足を余儀なくさせた。",
          ],
          answer: 0,
          explain: "させる: chủ ngữ là nguyên nhân (不景気) gây ra sự bắt buộc cho đối tượng (その会社に).",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Đi với", "Chủ ngữ"],
    rows: [
      ["〜てやまない", "Luôn luôn (mong, yêu)", "願う・祈る・期待する", "Người nói"],
      ["〜に堪えない", "Vô cùng (cảm kích…)", "感謝・感激・喜び", "Người nói (trang trọng)"],
      ["〜ずにはすまない", "Không… thì không xong", "謝る・弁償する", "Nghĩa vụ xã hội"],
      ["〜ずにはおかない", "Nhất định / tất yếu gây ra", "V使役・quyết tâm", "Người hoặc sự vật"],
      ["〜を禁じ得ない", "Không kìm được (cảm xúc)", "涙・怒り・同情", "Người nói"],
      ["〜を余儀なくされる", "Buộc phải", "中止・引退・入院", "Người (される) / sự việc (させる)"],
    ],
  },
  links: [
    "Bộ \"ずには〜\": ずにはいられない (N2 — cảm xúc mình) · ずにはすまない (nghĩa vụ) · ずにはおかない (quyết tâm / tác động tất yếu). Đây là nhóm hay ra đề nhất!",
    "に堪えない hai nghĩa: Ch.19 (tệ không chịu nổi) · Ch.20 (cảm xúc tràn đầy).",
    "Ôn N2: ざるを得ない ≈ を余儀なくされる (danh từ, báo chí); てたまらない ≈ てやまない (trang trọng, bền lâu).",
    "Bạn đã đi hết 20 chương — 97 mẫu ngữ pháp N1! Hãy quay lại Chương 1 đọc lại câu chuyện: lần này bạn sẽ hiểu từng chữ.",
  ],
  hook: "Mùa xuân mới: chuyến bay buộc phải hủy (を余儀なくされた) · không đi tiễn thì không được (ないではすまない) · lòng biết ơn không kể xiết (に堪えません) · lời nói lay động trái tim mọi người (ずにはおかない) · không cầm được nước mắt (を禁じ得ない) · luôn cầu chúc em thành công (てやまない).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜てやまない", "Luôn mong / yêu từ đáy lòng"],
        ["感謝に堪えない", "Biết ơn khôn xiết"],
        ["〜ずにはすまない", "Không… thì không xong (nghĩa vụ)"],
        ["〜ずにはおかない", "Nhất định / tất yếu gây ra"],
        ["〜を禁じ得ない", "Không kìm được cảm xúc"],
        ["〜を余儀なくされる", "Buộc phải (do hoàn cảnh)"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "不況のため、その工場は閉鎖＿＿＿。",
      opts: ["を余儀なくされた", "を禁じ得なかった", "てやまなかった", "に堪えなかった"],
      answer: 0,
      explain: "Hoàn cảnh (suy thoái) buộc phải đóng cửa → を余儀なくされた.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "皆様のご健康とご多幸を心より祈って＿＿＿。",
      opts: ["やみません", "おきません", "すみません", "禁じ得ません"],
      answer: 0,
      explain: "Lời chúc trang trọng, bền lâu → 祈ってやみません.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "ひどい言葉で人を傷つけたのだから、謝ら＿＿＿だろう。",
      opts: ["ずにはすまない", "ずにはおかない", "ずにはいられない", "てやまない"],
      answer: 0,
      explain: "Nghĩa vụ xã hội (đã làm tổn thương thì phải xin lỗi) → ずにはすまない.",
    },
    {
      type: "order",
      before: "その写真を見て、",
      pieces: ["私は", "涙", "を", "禁じ得なかった"],
      after: "。",
      star: 1,
      vi: "Nhìn bức ảnh ấy, tôi không cầm được nước mắt.",
      explain: "私は涙を禁じ得なかった.",
    },
    {
      type: "judge",
      q: "彼の熱意は、周りの人を動かさずにはおかない。",
      ok: true,
      explain: "Sự vật (nhiệt huyết) tất yếu tác động lên người khác (使役) → đúng.",
    },
    {
      type: "judge",
      q: "おいしそうなケーキを見て、食べずにはすまなかった。",
      ok: false,
      explain: "Đây là cảm xúc/ham muốn cá nhân → ずにはいられない.",
      fix: "おいしそうなケーキを見て、食べずにはいられなかった。",
    },
  ],
};
