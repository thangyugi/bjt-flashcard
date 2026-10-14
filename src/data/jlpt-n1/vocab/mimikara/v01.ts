import type { VocabLesson } from "../types";

export const v01: VocabLesson = {
  id: "mk-01",
  num: 1,
  title: "Đời người & dáng vẻ",
  titleJa: "人生・身なり",
  scene:
    "Một đêm mưa lớn, Mai về nhà ướt như chuột lột. Bà Yamamoto pha trà, rồi kể cho Mai nghe về tuổi trẻ của bà — một câu chuyện đi qua cả đời người: thanh xuân, rời nhà, những năm tháng cuối đời.",
  story: [
    {
      jp: "その夜、マイは傘を忘れて、[[ずぶぬれ]]で家に帰ってきた。玄関の[[戸締まり]]をしていた山本さんが驚いて、タオルを持ってきてくれた。",
      vi: "Đêm đó Mai quên ô, về đến nhà ướt sũng. Bà Yamamoto đang khóa cửa ra vào thì giật mình, vội mang khăn tới.",
    },
    {
      jp: "「[[夜更かし]]はだめよ。体を壊すから」と言いながら、山本さんはお茶をいれて、自分の[[青春]]時代の話を始めた。",
      vi: "\"Đừng thức khuya nhé, hại sức khỏe đấy\", vừa nói bà vừa pha trà rồi bắt đầu kể về thời thanh xuân của mình.",
    },
    {
      jp: "山本さんは小さな村のごく普通の[[庶民]]の家に生まれた。十七歳のとき、親に反対されて[[家出]]をし、東京へ来たという。最初は東京の言葉も[[片言]]しか話せなかったそうだ。",
      vi: "Bà sinh ra trong một gia đình thường dân rất bình thường ở một ngôi làng nhỏ. Năm mười bảy tuổi, bị cha mẹ phản đối, bà bỏ nhà lên Tokyo. Nghe kể lúc đầu đến tiếng Tokyo bà cũng chỉ nói bập bẹ.",
    },
    {
      jp: "「[[世間]]を知らない娘だったわ」と山本さんは笑った。昔の写真の中の彼女は、地味な[[身なり]]だったが、[[顔つき]]はとても強そうだった。",
      vi: "\"Hồi đó bà là đứa con gái chẳng biết gì về đời\", bà cười. Trong tấm ảnh cũ, bà ăn mặc giản dị nhưng gương mặt trông rất cứng cỏi.",
    },
    {
      jp: "夫の[[葬式]]のあと、今は一人だけの[[世帯]]だ。それでも[[身の回り]]のことは全部自分でする。「[[晩年]]を楽しく生きるのが、私の目標なの」",
      vi: "Sau đám tang của chồng, giờ nhà bà chỉ có một người. Dù vậy, mọi việc thường ngày bà đều tự làm. \"Sống vui những năm cuối đời — đó là mục tiêu của bà.\"",
    },
    {
      jp: "そのとき、孫を[[おんぶ]]した娘さんが訪ねてきた。孫は大きな[[身振り]]で「おばあちゃん！」と手を振った。",
      vi: "Đúng lúc đó, con gái bà ghé thăm, trên lưng cõng đứa cháu. Đứa bé vung tay thật to, gọi \"Bà ơi!\".",
    },
  ],
  words: [
    {
      no: 1, w: "青春", r: "せいしゅん", pos: "noun", hv: "THANH XUÂN", m: "thanh xuân, tuổi trẻ",
      use: "Chỉ quãng đời tươi đẹp nhất của tuổi trẻ (khoảng 10–20 tuổi), mang sắc thái hoài niệm, lãng mạn. Hay dùng khi nhìn lại quá khứ. Không dùng để nói tuổi tác cụ thể.",
      col: ["青春時代", "青春を送る", "青春を楽しむ", "青春の思い出"],
      ex: [
        ["高校の部活に[[青春]]をかけた。", "Tôi đã dồn cả tuổi thanh xuân cho câu lạc bộ thời cấp ba."],
        ["この歌を聞くと、[[青春]]時代を思い出す。", "Nghe bài hát này là tôi nhớ lại thời thanh xuân."],
      ],
      cmp: [["若さ", "若さ là \"sự trẻ trung\" (tính chất, ai cũng có thể có). 青春 là một GIAI ĐOẠN đời người, mang màu hoài niệm."]],
      memo: "青 (xanh) + 春 (mùa xuân) = \"mùa xuân xanh\" của đời người — đúng như chữ \"thanh xuân\" trong tiếng Việt.",
    },
    {
      no: 2, w: "晩年", r: "ばんねん", pos: "noun", hv: "VÃN NIÊN", m: "những năm cuối đời, tuổi già",
      use: "Giai đoạn cuối của cuộc đời một người (thường là người đã mất hoặc đã cao tuổi). Văn viết, dùng khi kể tiểu sử. Không dùng cho người còn trẻ.",
      col: ["晩年を過ごす", "晩年の作品", "晩年になって"],
      ex: [
        ["祖父は[[晩年]]を故郷で静かに過ごした。", "Ông tôi sống những năm cuối đời yên bình ở quê nhà."],
        ["これはその画家が[[晩年]]に描いた作品だ。", "Đây là tác phẩm họa sĩ ấy vẽ lúc cuối đời."],
      ],
      cmp: [["老後", "老後: quãng đời sau khi nghỉ hưu (nói về kế hoạch, tiền bạc: 老後の資金). 晩年: chặng cuối cả cuộc đời, hay dùng trong tiểu sử."]],
      memo: "晩 (buổi tối, muộn) + 年 (năm) = \"những năm buổi tối\" của cuộc đời — như hoàng hôn.",
    },
    {
      no: 3, w: "葬式", r: "そうしき", pos: "noun", hv: "TÁNG THỨC", m: "đám tang, tang lễ",
      use: "Nghi lễ tiễn biệt người đã mất. Dùng trong đời thường; văn trang trọng hơn là 葬儀 (そうぎ).",
      col: ["葬式に出る", "葬式を行う", "お葬式"],
      ex: [
        ["恩師の[[葬式]]に出るため、実家に帰った。", "Tôi về quê để dự đám tang thầy cũ."],
        ["[[葬式]]では黒い服を着るのがマナーだ。", "Ở đám tang, mặc đồ đen là phép lịch sự."],
      ],
      cmp: [["葬儀", "葬儀 trang trọng, dùng trong thông báo (葬儀場, 葬儀社). 葬式 dùng trong hội thoại thường ngày."]],
      memo: "葬 (chôn cất, \"mai táng\") + 式 (nghi thức) = nghi thức mai táng.",
    },
    {
      no: 4, w: "世帯", r: "せたい", pos: "noun", hv: "THẾ ĐỚI", m: "hộ gia đình (đơn vị cư trú)",
      use: "Đơn vị gồm những người sống chung, cùng chi tiêu — dùng trong thống kê, hành chính, thuế. Đếm bằng 〜世帯.",
      col: ["世帯主", "単身世帯", "〜世帯が住む", "世帯収入"],
      ex: [
        ["このマンションには百[[世帯]]が住んでいる。", "Khu chung cư này có 100 hộ gia đình sinh sống."],
        ["一人暮らしの[[世帯]]が年々増えている。", "Số hộ sống một mình tăng lên mỗi năm."],
      ],
      cmp: [["家庭", "家庭: gia đình theo nghĩa tình cảm, nếp sống (温かい家庭). 世帯: đơn vị hành chính, thống kê."]],
      memo: "世 (đời, thế) + 帯 (đai, vùng) — như một \"vòng đai\" gói những người sống chung một mái nhà. Đừng đọc せいたい (đó là 生態 – sinh thái)!",
    },
    {
      no: 5, w: "世間", r: "せけん", pos: "noun", hv: "THẾ GIAN", m: "thế gian, xã hội, thiên hạ",
      use: "Xã hội xung quanh, những người khác — thường gắn với \"ánh mắt, dư luận\" của thiên hạ. Hay dùng trong thành ngữ.",
      col: ["世間の目", "世間知らず", "世間話", "世間に知られる"],
      ex: [
        ["彼は[[世間]]知らずで、すぐ人にだまされる。", "Anh ta chẳng hiểu sự đời nên dễ bị lừa."],
        ["近所の人と[[世間]]話をした。", "Tôi tán gẫu chuyện đời thường với hàng xóm."],
      ],
      cmp: [["社会", "社会: xã hội như một hệ thống (社会問題). 世間: \"người đời\", dư luận, gần gũi và cảm tính hơn."]],
      memo: "世 (đời) + 間 (khoảng giữa) = khoảng không giữa những con người — nơi lời ra tiếng vào lan truyền.",
    },
    {
      no: 6, w: "庶民", r: "しょみん", pos: "noun", hv: "THỨ DÂN", m: "thường dân, dân thường",
      use: "Người dân bình thường, không giàu có hay quyền thế. Thường đặt đối lập với giới thượng lưu, chính trị gia.",
      col: ["庶民的な", "庶民の生活", "庶民の味"],
      ex: [
        ["増税は[[庶民]]の生活を苦しくする。", "Tăng thuế làm đời sống người dân thường khó khăn."],
        ["この店は値段が安くて[[庶民]]的だ。", "Quán này giá rẻ, rất bình dân."],
      ],
      memo: "庶 (đông đảo, thứ) + 民 (dân) = \"đám đông dân chúng\". 庶民的 = bình dân.",
    },
    {
      no: 7, w: "おんぶ", r: "おんぶ", pos: "suru", m: "cõng (trên lưng)",
      use: "Cõng ai đó trên lưng (thường là trẻ con). Dạng する: 〜をおんぶする. Nghĩa bóng: ỷ lại vào người khác (おんぶにだっこ).",
      col: ["子供をおんぶする", "おんぶひも", "おんぶにだっこ"],
      ex: [
        ["寝てしまった子供を[[おんぶ]]して帰った。", "Tôi cõng đứa bé đã ngủ thiếp về nhà."],
        ["何でも親に[[おんぶ]]にだっこではいけない。", "Không thể việc gì cũng dựa dẫm vào bố mẹ."],
      ],
      cmp: [["だっこ", "だっこ: bế (phía trước, trong vòng tay). おんぶ: cõng (sau lưng)."]],
      memo: "\"ON-bu\" — đứa bé ở ON (trên) lưng bố. おんぶにだっこ = vừa cõng vừa bế → ỷ lại hoàn toàn.",
    },
    {
      no: 8, w: "片言", r: "かたこと", pos: "noun", hv: "PHIẾN NGÔN", m: "nói bập bẹ, vài câu ít ỏi",
      use: "Cách nói chưa trọn câu, ngắt quãng — của trẻ nhỏ hoặc người nói ngoại ngữ chưa giỏi. Thường: 片言の〜, 片言で話す.",
      col: ["片言の英語", "片言で話す", "片言しか話せない"],
      ex: [
        ["[[片言]]の日本語でも、気持ちは伝わった。", "Dù chỉ là tiếng Nhật bập bẹ, tình cảm vẫn truyền đạt được."],
        ["一歳の娘が[[片言]]を話し始めた。", "Con gái một tuổi bắt đầu nói bi bô."],
      ],
      memo: "片 (một mảnh, một nửa) + 言 (lời) = \"lời nói một nửa\" — chỉ từng mảnh câu.",
    },
    {
      no: 9, w: "夜更かし", r: "よふかし", pos: "suru", hv: "DẠ CANH", m: "thức khuya",
      use: "Thức đến khuya (thường là thói quen không tốt). Dùng như danh từ hoặc 夜更かしする.",
      col: ["夜更かしする", "夜更かしは体に悪い", "夜更かしの習慣"],
      ex: [
        ["ゲームで[[夜更かし]]して、朝起きられなかった。", "Thức khuya chơi game nên sáng không dậy nổi."],
        ["[[夜更かし]]は肌に良くないそうだ。", "Nghe nói thức khuya không tốt cho da."],
      ],
      cmp: [["徹夜", "徹夜: thức trắng cả đêm. 夜更かし: chỉ thức khuya hơn bình thường rồi vẫn đi ngủ."]],
      memo: "夜 (đêm) + 更ける (đêm khuya dần) → để đêm \"khuya dần\" mà vẫn chưa ngủ.",
    },
    {
      no: 10, w: "家出", r: "いえで", pos: "suru", hv: "GIA XUẤT", m: "bỏ nhà đi",
      use: "Tự ý rời nhà, không về (thường là người trẻ, do mâu thuẫn gia đình). Khác với chuyển nhà hay đi xa.",
      col: ["家出する", "家出少年", "家出をする"],
      ex: [
        ["父とけんかして[[家出]]したことがある。", "Tôi từng bỏ nhà đi vì cãi nhau với bố."],
        ["[[家出]]した娘が三日後に帰ってきた。", "Đứa con gái bỏ nhà đi ba ngày sau đã quay về."],
      ],
      cmp: [["外出", "外出: ra ngoài (rồi về). 家出: bỏ nhà đi, không định quay về."]],
      memo: "家 (nhà) + 出る (ra đi) = ra khỏi nhà… và không quay lại.",
    },
    {
      no: 11, w: "戸締まり", r: "とじまり", pos: "suru", hv: "HỘ ĐẾ", m: "khóa cửa, đóng cửa nẻo",
      use: "Việc khóa, đóng chặt cửa nẻo (để phòng trộm, trước khi ra ngoài hoặc đi ngủ).",
      col: ["戸締まりをする", "戸締まりを確認する", "戸締まりに気をつける"],
      ex: [
        ["出かける前に[[戸締まり]]を確認した。", "Trước khi ra ngoài tôi kiểm tra lại cửa nẻo."],
        ["最近空き巣が多いので、[[戸締まり]]に気をつけてください。", "Dạo này nhiều vụ trộm nên hãy chú ý khóa cửa."],
      ],
      memo: "戸 (cánh cửa) + 締める (siết, khóa) = siết chặt cửa lại.",
    },
    {
      no: 12, w: "ずぶぬれ", r: "ずぶぬれ", pos: "noun", m: "ướt sũng, ướt như chuột lột",
      use: "Bị ướt hoàn toàn từ đầu đến chân (vì mưa, nước). Hay dùng: ずぶぬれになる.",
      col: ["ずぶぬれになる", "雨でずぶぬれだ"],
      ex: [
        ["急な雨で[[ずぶぬれ]]になった。", "Gặp mưa bất chợt, tôi ướt sũng."],
        ["川に落ちた犬は[[ずぶぬれ]]だった。", "Con chó rơi xuống sông ướt như chuột lột."],
      ],
      cmp: [["びしょぬれ", "Gần như đồng nghĩa; びしょぬれ cũng là ướt sũng, ずぶぬれ nhấn mạnh ướt \"thấm tận người\"."]],
      memo: "\"ZUBU\" như tiếng lội \"lõm bõm\" + ぬれる (bị ướt) → ướt lõm bõm cả người.",
    },
    {
      no: 13, w: "顔つき", r: "かおつき", pos: "noun", hv: "NHAN", m: "nét mặt, vẻ mặt",
      use: "Vẻ mặt thể hiện cảm xúc hoặc tính cách (hiền, nghiêm, buồn…). Thường có tính từ đi trước: 真剣な顔つき.",
      col: ["真剣な顔つき", "顔つきが変わる", "優しい顔つき"],
      ex: [
        ["試合が始まると、選手たちの[[顔つき]]が変わった。", "Khi trận đấu bắt đầu, nét mặt các cầu thủ thay đổi hẳn."],
        ["彼は怒ったような[[顔つき]]で黙っていた。", "Anh ta im lặng với vẻ mặt như đang giận."],
      ],
      cmp: [["表情", "表情: biểu cảm khuôn mặt (thay đổi theo lúc). 顔つき: vẻ mặt — cả cảm xúc lẫn \"tướng mạo\", nét đặc trưng."]],
      memo: "顔 (mặt) + つき (dáng vẻ — như 体つき, 目つき) = \"dáng\" của gương mặt.",
    },
    {
      no: 14, w: "身なり", r: "みなり", pos: "noun", hv: "THÂN", m: "cách ăn mặc, diện mạo bên ngoài",
      use: "Quần áo và vẻ bề ngoài của một người. Hay đi với tính từ đánh giá: きちんとした身なり, 立派な身なり.",
      col: ["身なりを整える", "きちんとした身なり", "身なりがいい"],
      ex: [
        ["面接の前に[[身なり]]を整えた。", "Trước buổi phỏng vấn tôi chỉnh trang lại quần áo."],
        ["彼は質素な[[身なり]]をしているが、実は社長だ。", "Ông ấy ăn mặc giản dị nhưng thật ra là giám đốc."],
      ],
      cmp: [["服装", "服装: trang phục (nói về quần áo cụ thể). 身なり: tổng thể vẻ ngoài, kèm đánh giá chỉnh tề hay không."]],
      memo: "身 (thân) + なり (dáng, hình) = \"dáng của thân\" nhìn từ bên ngoài.",
    },
    {
      no: 15, w: "身の回り", r: "みのまわり", pos: "noun", hv: "THÂN HỒI", m: "chuyện thường ngày, đồ dùng cá nhân quanh mình",
      use: "Những thứ, những việc ở ngay quanh bản thân: đồ dùng cá nhân, sinh hoạt hằng ngày.",
      col: ["身の回りの物", "身の回りの世話", "身の回りを片付ける"],
      ex: [
        ["入院する母の[[身の回り]]の物をかばんに詰めた。", "Tôi xếp đồ dùng cá nhân của mẹ vào túi để mẹ nhập viện."],
        ["[[身の回り]]のことは自分でできるようになりたい。", "Tôi muốn tự lo được những việc sinh hoạt của mình."],
      ],
      memo: "身 (thân) + 回り (xung quanh) = mọi thứ \"xoay quanh\" thân mình.",
    },
    {
      no: 16, w: "身振り", r: "みぶり", pos: "noun", hv: "THÂN CHẤN", m: "cử chỉ, điệu bộ",
      use: "Động tác của tay, thân người để diễn đạt ý. Thường đi cặp 身振り手振り (khoa tay múa chân).",
      col: ["身振り手振り", "身振りで伝える", "大きな身振り"],
      ex: [
        ["言葉が通じないので、[[身振り]]手振りで説明した。", "Không hiểu tiếng nhau nên tôi khoa tay múa chân để giải thích."],
        ["彼は話すとき[[身振り]]が大きい。", "Anh ấy nói chuyện hay điệu bộ rất to."],
      ],
      cmp: [["ジェスチャー", "ジェスチャー thường chỉ cử chỉ có chủ ý (giơ ngón cái…). 身振り rộng hơn, cả điệu bộ tự nhiên."]],
      memo: "身 (thân) + 振る (vung, lắc) = vung vẩy thân mình để \"nói\".",
    },
  ],
  quiz: [
    {
      type: "choice",
      label: "Dùng từ đúng (用法)",
      q: "「世間」の使い方が正しい文はどれか。",
      opts: [
        "彼は世間の目を気にして、本当のことが言えなかった。",
        "世間の天気は晴れでしょう。",
        "私の世間は東京です。",
        "この本は世間が多くて読みにくい。",
      ],
      answer: 0,
      explain: "世間の目 = ánh mắt thiên hạ. Các câu khác dùng 世間 như \"trời\", \"quê\", \"trang\" — sai nghĩa.",
    },
    {
      type: "choice",
      label: "Dùng từ đúng (用法)",
      q: "「身なり」の使い方が正しい文はどれか。",
      opts: [
        "お客様に会う前に、身なりをきちんとしておきなさい。",
        "彼の身なりは百八十センチもある。",
        "身なりが痛くて、病院へ行った。",
        "この料理は身なりがいい。",
      ],
      answer: 0,
      explain: "身なり = cách ăn mặc, vẻ ngoài. Không dùng cho chiều cao, cơ thể đau, hay món ăn.",
    },
    {
      type: "choice",
      label: "Từ gần nghĩa (言い換え)",
      q: "昨日は[[夜更かし]]をしてしまった。",
      opts: ["夜遅くまで起きていた", "朝早く起きた", "夜に出かけた", "一晩中働いた"],
      answer: 0,
      explain: "夜更かし = thức đến khuya. \"Thức trắng cả đêm làm việc\" là 徹夜.",
    },
    {
      type: "judge",
      q: "祖母は晩年を楽しく過ごした。",
      ok: true,
      explain: "晩年を過ごす = sống những năm cuối đời → tự nhiên.",
    },
    {
      type: "judge",
      q: "大学に入って、晩年の生活が始まった。",
      ok: false,
      explain: "Vào đại học là tuổi trẻ, không phải \"cuối đời\". Nên dùng 青春 hoặc 新しい生活.",
      fix: "大学に入って、新しい生活が始まった。",
    },
  ],
};
