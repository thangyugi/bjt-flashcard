import type { N1Lesson } from "../types";

export const bai02: N1Lesson = {
  id: "bai-02",
  num: 2,
  topicJa: "範囲の始まり・限度",
  topicVi: "Điểm bắt đầu · phạm vi · giới hạn",
  chapterJa: "初めてのプロジェクト",
  chapterVi: "Dự án đầu tiên",
  scene:
    "Tháng Năm. Phòng Marketing nhận nhiệm vụ quảng bá thức uống mới \"さくら茶\". Mai lần đầu tham gia một dự án thật: lịch roadshow, bảng kế hoạch chi tiết đến từng phút, và… lời thề bỏ thuốc lá của Kenta. Chương này học cách nói về KHỞI ĐẦU, PHẠM VI và GIỚI HẠN.",
  story: [
    {
      jp: "「さくら茶」のキャンペーンは、来月の東京イベント[[を皮切りに]]、大阪、福岡と全国を回ることになった。",
      vi: "Chiến dịch \"Sakura-cha\" sẽ mở màn bằng sự kiện ở Tokyo tháng sau, rồi lần lượt đi khắp cả nước: Osaka, Fukuoka…",
    },
    {
      jp: "田中部長が作った計画表は驚くほど細かい。会場の広さはもちろん、ポスターの文字の大きさ[[に至るまで]]決められていた。",
      vi: "Bảng kế hoạch trưởng phòng Tanaka làm chi tiết đến kinh ngạc. Diện tích hội trường thì khỏi nói, đến cả cỡ chữ trên poster cũng đã được quy định.",
    },
    {
      jp: "休憩室で、健太が急に宣言した。「今日[[を限りに]]タバコをやめる！イベントで倒れたら困るからな。」佐藤先輩は「それ、先月も聞いたよ」と笑った。",
      vi: "Trong phòng nghỉ, Kenta bỗng tuyên bố: \"Từ hôm nay tôi bỏ thuốc! Lỡ ngất ở sự kiện thì toi.\" Chị Satō cười: \"Câu đó tháng trước chị cũng nghe rồi.\"",
    },
    {
      jp: "帰り道、マイは駅前の古い喫茶店にはり紙を見つけた。「当店は五月末日[[をもちまして]]閉店いたします。」いつか入ってみたいと思っていた店だった。",
      vi: "Trên đường về, Mai thấy tờ giấy dán ở quán cà phê cũ trước ga: \"Quán chúng tôi xin đóng cửa vào ngày cuối tháng Năm.\" Đó là quán cô vẫn định một ngày nào đó ghé vào.",
    },
    {
      jp: "その夜、母からメッセージが来た。「日本語、上手になった？」マイは少し考えて返事を書いた。「仕事で使えるのは、まだ六割[[といったところ]]かな。」",
      vi: "Tối đó mẹ nhắn tin: \"Tiếng Nhật giỏi lên chưa con?\" Mai nghĩ một chút rồi trả lời: \"Dùng được trong công việc thì chắc cũng chỉ khoảng 60% thôi mẹ ạ.\"",
    },
  ],
  patterns: [
    {
      id: "wo-kawakirini",
      pattern: "〜を皮切りに（して）",
      variants: ["〜を皮切りとして"],
      meaning: "Mở đầu bằng… rồi liên tiếp…",
      nuance:
        "Lấy N làm điểm khởi đầu, sau đó những sự việc cùng loại liên tiếp diễn ra, lan rộng, phát triển. 皮切り vốn là \"vết châm cứu đầu tiên\" → \"phát súng mở màn\".",
      forms: ["N + を皮切りに（して）", "N + を皮切りとして"],
      position: {
        before: "Sự kiện mở màn cụ thể (公演・発表・東京…)",
        after: "Nhiều sự việc cùng loại tiếp nối, lan rộng (次々に・全国で…)",
      },
      register: "Văn viết · tin tức, thông báo",
      usage: [
        "Vế sau là chuỗi sự việc tương tự liên tiếp xảy ra, mở rộng ra nhiều.",
        "Dùng cho sự việc cụ thể, mang tính tích cực/trung tính.",
        "Hầu như không dùng cho hiện tượng tự nhiên hay chuyện xấu.",
      ],
      examples: [
        {
          jp: "この作家は父親のことを書いた小説[[を皮切りに]]、次々に話題作を発表している。",
          vi: "Mở đầu bằng cuốn tiểu thuyết viết về cha mình, nhà văn này liên tiếp cho ra những tác phẩm gây chú ý.",
        },
        {
          jp: "私たちのバンドは来月三日の東京公演[[を皮切りにして]]、全国ツアーを予定しています。",
          vi: "Ban nhạc chúng tôi dự định lưu diễn toàn quốc, mở màn bằng buổi diễn ở Tokyo ngày 3 tháng sau.",
        },
        {
          jp: "彼の発言[[を皮切りに]]、参加者から次々と意見が出された。",
          vi: "Mở đầu bằng phát biểu của anh ấy, các thành viên lần lượt đưa ra ý kiến.",
        },
      ],
      dos: ["Kế hoạch / sự kiện có khởi đầu rõ ràng rồi lan rộng: tour diễn, chuỗi cửa hàng, loạt phát biểu."],
      donts: [
        {
          text: "Hiện tượng tự nhiên, chuyện xấu → không dùng.",
          bad: "九州を皮切りに、台風の被害が広がった。",
          good: "九州から始まって、台風の被害が広がった。",
        },
        {
          text: "Vế sau chỉ có MỘT sự việc → không dùng.",
          bad: "東京を皮切りに、大阪で公演した。",
          good: "東京を皮切りに、大阪、名古屋など各地で公演した。",
        },
      ],
      compare: [
        {
          other: "〜をはじめ（として）(N2)",
          diff: "をはじめ: nêu ví dụ TIÊU BIỂU nhất trong nhóm (không có thứ tự thời gian). を皮切りに: điểm KHỞI ĐẦU theo thời gian rồi lan ra.",
          ex: { jp: "東京[[をはじめ]]、日本の大都市は物価が高い。", vi: "Các thành phố lớn của Nhật, tiêu biểu là Tokyo, đều đắt đỏ." },
        },
      ],
      memo: "皮切り = \"nhát cắt đầu tiên vào vỏ\" → tiếng súng mở màn 🎉. Tưởng tượng băng rôn khai trương ở Tokyo, rồi pháo hoa lần lượt nổ ở Osaka, Fukuoka…",
      storyLine: "キャンペーンは、来月の東京イベント[[を皮切りに]]、大阪、福岡と全国を回ることになった。",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "新しいカフェは渋谷店＿＿＿、都内に十店舗を次々とオープンさせた。",
          opts: ["を皮切りに", "を限りに", "をもって", "に至るまで"],
          answer: 0,
          explain: "Cửa hàng Shibuya là khởi đầu, sau đó mở liên tiếp 10 cửa hàng → を皮切りに.",
        },
        {
          type: "judge",
          q: "北海道を皮切りに、大雪の被害が全国に広がった。",
          ok: false,
          explain: "Thiên tai / chuyện xấu thì không dùng を皮切りに.",
          fix: "北海道から始まり、大雪の被害が全国に広がった。",
        },
      ],
    },
    {
      id: "ni-itarumade",
      pattern: "〜に至るまで",
      meaning: "Đến cả… / cho đến tận…",
      nuance:
        "Nhấn mạnh phạm vi lan rộng đến mức VƯỢT ngoài suy nghĩ thông thường. Thường nêu một ví dụ bình thường rồi đến một ví dụ \"chi li, không ngờ tới\" kèm に至るまで.",
      forms: ["N + に至るまで", "N1 から N2 + に至るまで"],
      position: {
        before: "Ví dụ ở mức \"không ngờ tới\" (chi tiết nhỏ, giới hạn xa)",
        after: "Cũng đều… (được ghi, bị nhắc nhở, có bán…)",
        note: "Hay đi với 〜はもちろん、〜から〜に至るまで.",
      },
      register: "Văn viết · hơi trang trọng",
      usage: [
        "Thường dùng cặp \"A はもちろん／A から … B に至るまで\".",
        "B là thứ mà bình thường người ta không nghĩ là cũng bao gồm.",
      ],
      examples: [
        {
          jp: "私の学校は服装に厳しい。制服の着方はもちろん、髪形やスカートの長さ[[に至るまで]]注意される。",
          vi: "Trường tôi rất khắt khe về trang phục. Cách mặc đồng phục thì khỏi nói, đến cả kiểu tóc và độ dài váy cũng bị nhắc nhở.",
        },
        {
          jp: "今度の旅行のスケジュール表は綿密だ。起床時間から機内の食事時間[[に至るまで]]書いてある。",
          vi: "Lịch trình chuyến đi lần này rất tỉ mỉ. Từ giờ thức dậy cho đến tận giờ ăn trên máy bay đều được ghi.",
        },
        {
          jp: "この店では、日用品から高級ブランド品[[に至るまで]]、何でもそろう。",
          vi: "Ở cửa hàng này, từ đồ dùng hằng ngày đến tận hàng hiệu cao cấp, thứ gì cũng có.",
        },
      ],
      dos: ["Nhấn mạnh độ \"phủ rộng\" đáng ngạc nhiên: quy định khắt khe, danh sách dài, sự tỉ mỉ."],
      donts: [
        {
          text: "Chỉ nói giới hạn thời gian bình thường → dùng まで.",
          bad: "会議は五時に至るまで続く。",
          good: "会議は五時まで続く。",
        },
      ],
      compare: [
        {
          other: "〜まで",
          diff: "まで: giới hạn trung tính. に至るまで: nhấn mạnh \"đến TẬN cả cái đó\" — vượt ngoài dự đoán.",
        },
        {
          other: "〜に至って／〜に至っては (Chương 16)",
          diff: "Cùng động từ 至る nhưng: に至って = \"đến mức (tình trạng xấu) mới…\"; に至っては = \"riêng ví dụ cực đoan này thì…\".",
        },
      ],
      memo: "至る = \"đi tới tận cùng\". Hình dung chiếc kính lúp 🔍 của trưởng phòng Tanaka: soi từ hội trường đến TẬN cỡ chữ trên poster.",
      storyLine: "会場の広さはもちろん、ポスターの文字の大きさ[[に至るまで]]決められていた。",
      quiz: [
        {
          type: "order",
          before: "この辞書には、古い言葉",
          pieces: ["から", "最新の", "若者言葉", "に至るまで"],
          after: "載っている。",
          star: 2,
          vi: "Cuốn từ điển này có từ từ ngữ cổ cho đến tận tiếng lóng mới nhất của giới trẻ.",
          explain: "Cấu trúc A から B に至るまで: 古い言葉から最新の若者言葉に至るまで.",
        },
        {
          type: "choice",
          label: "Chọn nghĩa đúng",
          q: "彼は食事から服装に至るまで、母親に決めてもらっている。",
          opts: [
            "Từ chuyện ăn uống đến tận quần áo, anh ta đều để mẹ quyết định.",
            "Anh ta tự quyết từ ăn uống cho đến quần áo.",
            "Anh ta để mẹ quyết chuyện ăn uống, riêng quần áo thì không.",
            "Đến lúc ăn cơm anh ta mới nhờ mẹ chọn quần áo.",
          ],
          answer: 0,
          explain: "に至るまで nhấn mạnh phạm vi bao trùm đến cả quần áo — mức không ngờ tới.",
        },
      ],
    },
    {
      id: "wo-kagirini",
      pattern: "〜を限りに",
      meaning: "Lấy (thời điểm) … làm mốc cuối — từ sau đó sẽ chấm dứt",
      nuance:
        "Tuyên bố CHẤM DỨT một việc kéo dài từ trước đến nay, lấy thời điểm N làm lần cuối. Hay dùng trong lời hứa, lời tuyên bố, thông báo cá nhân.",
      forms: ["N(thời điểm) + を限りに"],
      position: {
        before: "Mốc thời gian: 今日・今回・本年度・今月…",
        after: "Việc sẽ chấm dứt: やめる・引退する・終了する",
      },
      register: "Văn nói & viết · tuyên bố",
      usage: [
        "Đi với danh từ chỉ thời điểm gần: 今日, 今回, 今年度…",
        "Vế sau là sự kết thúc, từ bỏ, chia tay.",
      ],
      examples: [
        {
          jp: "今日[[を限りに]]タバコをやめるぞ！",
          vi: "Hôm nay là lần cuối — tôi bỏ thuốc lá đây!",
        },
        {
          jp: "あの歌手は今回のコンサート[[を限りに]]引退するそうだ。",
          vi: "Nghe nói ca sĩ ấy sẽ giải nghệ sau buổi hòa nhạc lần này.",
        },
        {
          jp: "これ[[を限りに]]お前とは縁を切る。",
          vi: "Lần này là lần cuối — tao cắt đứt quan hệ với mày.",
        },
      ],
      dos: ["Lời tuyên bố, lời hứa bỏ một thói quen; thông báo nghỉ hưu, giải nghệ, ngừng dịch vụ."],
      donts: [
        {
          text: "Mốc xa trong tương lai / không phải lần cuối của việc đang kéo dài → không dùng.",
          bad: "十年後を限りに結婚したい。",
          good: "十年後までに結婚したい。",
        },
      ],
      compare: [
        {
          other: "〜をもって (kết thúc)",
          diff: "をもって: thông báo CHÍNH THỨC, rất trang trọng (cửa hàng, cơ quan). を限りに: tuyên bố mang tính cá nhân, cảm xúc hơn.",
        },
      ],
      memo: "限り = \"giới hạn\". Vạch một đường kẻ ✂️ dưới hôm nay: qua vạch này là chấm dứt. Như Kenta: \"今日を限りにタバコをやめる！\" (lần thứ n…).",
      storyLine: "「今日[[を限りに]]タバコをやめる！」",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "本日＿＿＿、この番組は終了いたします。長い間ありがとうございました。",
          opts: ["を限りに", "を皮切りに", "に至るまで", "といったところで"],
          answer: 0,
          explain: "Hôm nay là lần cuối, chương trình kết thúc → を限りに (をもって cũng được nếu có trong lựa chọn).",
        },
        {
          type: "judge",
          q: "来年を限りに、日本語の勉強を始めるつもりだ。",
          ok: false,
          explain: "を限りに đi với sự CHẤM DỨT, không dùng cho việc bắt đầu.",
          fix: "来年から、日本語の勉強を始めるつもりだ。",
        },
      ],
    },
    {
      id: "wo-motte-owari",
      pattern: "〜をもって（終了）",
      variants: ["〜をもちまして"],
      meaning: "Vào (thời điểm)… thì kết thúc — thông báo chính thức",
      nuance:
        "Thông báo trang trọng rằng một việc đang diễn ra sẽ KẾT THÚC tại thời điểm N. Dạng をもちまして còn lịch sự hơn, dùng khi phát biểu, thông báo với khách hàng.",
      forms: ["N(thời điểm/kỳ hạn) + をもって", "N + をもちまして (lịch sự)"],
      position: {
        before: "Thời điểm, kỳ hạn: 本日・三月末日・これ…",
        after: "Kết thúc / đóng cửa / hết hạn: 終了する・閉店する・締め切る",
      },
      register: "Rất trang trọng · thông báo chính thức",
      usage: [
        "Dùng cho thông báo chính thức: đóng cửa, hết hạn nhận hồ sơ, bế mạc.",
        "Không dùng cho chuyện thường ngày.",
        "Cùng hình thức với 〜をもって (phương tiện, Chương 11) — phân biệt nhờ danh từ phía trước.",
      ],
      examples: [
        {
          jp: "二月二十日[[をもって]]願書の受け付けを締め切ります。",
          vi: "Chúng tôi sẽ ngừng nhận hồ sơ vào ngày 20 tháng 2.",
        },
        {
          jp: "当店は九月末日[[をもちまして]]閉店いたしました。長い間のご利用、ありがとうございました。",
          vi: "Cửa hàng chúng tôi đã đóng cửa vào ngày cuối tháng 9. Xin cảm ơn quý khách đã ủng hộ suốt thời gian qua.",
        },
        {
          jp: "これ[[をもちまして]]、本日の会議を終了いたします。",
          vi: "Đến đây, cuộc họp hôm nay xin được kết thúc.",
        },
      ],
      dos: ["Thông báo của cửa hàng, công ty, trường học; câu kết thúc buổi lễ, cuộc họp."],
      donts: [
        {
          text: "Chuyện cá nhân thường ngày → quá cứng.",
          bad: "今日をもって、ダイエットをやめた。",
          good: "今日でダイエットをやめた。",
        },
      ],
      compare: [
        {
          other: "〜を限りに",
          diff: "を限りに: tuyên bố cá nhân, cảm xúc (từ hôm nay tôi bỏ…). をもって: thông báo hành chính, khách quan.",
        },
        {
          other: "〜をもって（手段）(Chương 11)",
          diff: "Danh từ phía trước là PHƯƠNG TIỆN (書面・実力) → \"bằng…\". Là THỜI ĐIỂM → \"vào lúc… kết thúc\".",
          ex: { jp: "結果は書面[[をもって]]お知らせします。", vi: "Kết quả sẽ được thông báo bằng văn bản." },
        },
      ],
      memo: "Nghe giọng loa ở nhà ga 📢: \"本日をもちまして…\" — luôn là lúc tấm rèm hạ xuống. Thời điểm + をもって = tiếng chuông kết thúc.",
      storyLine: "「当店は五月末日[[をもちまして]]閉店いたします。」",
      quiz: [
        {
          type: "choice",
          label: "Chọn cách nói phù hợp",
          q: "（会社のお知らせ）三月三十一日＿＿＿、本サービスの提供を終了いたします。",
          opts: ["をもちまして", "を皮切りに", "に至るまで", "といったところで"],
          answer: 0,
          explain: "Thông báo chính thức của công ty về thời điểm kết thúc → をもちまして.",
        },
        {
          type: "choice",
          label: "Phân biệt nghĩa",
          q: "「彼の実力をもってすれば、優勝も夢ではない。」の「をもって」と同じ使い方はどれか。",
          opts: [
            "合否は電話をもってお知らせします。",
            "本日をもって閉店します。",
            "これをもちまして式を終わります。",
            "今月末をもって退職します。",
          ],
          answer: 0,
          explain: "実力をもって = bằng thực lực (phương tiện). Chỉ câu 電話をもって (bằng điện thoại) cùng nghĩa; ba câu còn lại là \"kết thúc vào lúc…\".",
        },
      ],
    },
    {
      id: "to-itta-tokoroda",
      pattern: "〜といったところだ",
      meaning: "Cùng lắm cũng chỉ khoảng…",
      nuance:
        "Đánh giá của người nói: dù ở mức cao nhất thì cũng KHÔNG nhiều/không cao lắm. Đi với con số, mức độ nhỏ, hoạt động ít ỏi.",
      forms: ["N(số lượng) + といったところだ", "V辞書形 + といったところだ"],
      position: {
        before: "Con số / mức độ nhỏ (せいぜい・多くても + 数)",
        after: "(cuối câu) といったところだ／といったところです",
        note: "Đứng CUỐI câu. Hay đi với せいぜい, 多くても, まあ.",
      },
      register: "Văn nói & viết · nhận xét",
      usage: [
        "Hay đi kèm せいぜい (cùng lắm), 多くても, まあ…",
        "Thể hiện đánh giá chủ quan \"chẳng nhiều nhặn gì\".",
      ],
      examples: [
        {
          jp: "当地は夏もそれほど暑くありません。最高でも二十六、七度[[といったところ]]です。",
          vi: "Vùng này mùa hè cũng không nóng lắm. Cao nhất cũng chỉ khoảng 26–27 độ.",
        },
        {
          jp: "夏休みも遠出はしません。せいぜい一泊で温泉に行く[[といったところ]]でしょうか。",
          vi: "Nghỉ hè tôi cũng không đi xa. Cùng lắm là đi suối nước nóng nghỉ một đêm thôi.",
        },
        {
          jp: "この店の客は、平日だと一日に二十人[[といったところ]]だ。",
          vi: "Khách của quán này ngày thường cũng chỉ khoảng 20 người một ngày.",
        },
      ],
      dos: ["Nói khiêm tốn hoặc đánh giá thấp một con số, mức độ: lương, nhiệt độ, số khách, trình độ."],
      donts: [
        {
          text: "Con số được nhấn mạnh là LỚN → không dùng.",
          bad: "このビルは高さ六百メートルといったところだ。すごい！",
          good: "このビルは高さ六百メートルもある。すごい！",
        },
      ],
      compare: [
        {
          other: "〜からある／〜からする (Chương 17)",
          diff: "Ngược nghĩa: からある nhấn mạnh con số LỚN (\"lên tới hơn…\"); といったところだ nhấn mạnh con số NHỎ (\"cùng lắm chỉ…\").",
        },
        {
          other: "〜程度だ／〜くらいだ",
          diff: "程度だ, くらいだ trung tính. といったところだ có thêm sắc thái đánh giá chủ quan \"chẳng đáng là bao\".",
        },
      ],
      memo: "Hình dung Mai nhún vai 🤷: \"六割といったところかな\" — cùng lắm chỉ bằng ngần ấy thôi. せいぜい + といったところ là cặp đôi hoàn hảo.",
      storyLine: "「仕事で使えるのは、まだ六割[[といったところ]]かな。」",
      quiz: [
        {
          type: "choice",
          label: "Điền vào chỗ trống",
          q: "アルバイトの給料は、月にせいぜい五万円＿＿＿。",
          opts: ["といったところだ", "に至るまでだ", "を限りだ", "を皮切りだ"],
          answer: 0,
          explain: "せいぜい + con số nhỏ + といったところだ: cùng lắm cũng chỉ 50.000 yên.",
        },
        {
          type: "judge",
          q: "彼の年収は一億円といったところだ。うらやましい限りだ。",
          ok: false,
          explain: "Con số được coi là RẤT LỚN (đáng ghen tị) → không hợp với sắc thái \"chẳng là bao\".",
          fix: "彼の年収は一億円にもなるそうだ。うらやましい限りだ。",
        },
      ],
    },
  ],
  table: {
    head: ["Mẫu", "Ý chính", "Danh từ phía trước", "Sắc thái"],
    rows: [
      ["〜を皮切りに", "Mở màn rồi lan rộng", "Sự kiện đầu tiên", "Tích cực, chuỗi sự việc"],
      ["〜に至るまで", "Đến tận cả…", "Chi tiết ngoài dự đoán", "Nhấn mạnh phạm vi rộng"],
      ["〜を限りに", "Lần cuối, từ nay chấm dứt", "今日・今回…", "Tuyên bố cá nhân"],
      ["〜をもって", "Kết thúc vào lúc…", "Ngày, kỳ hạn", "Thông báo chính thức"],
      ["〜といったところだ", "Cùng lắm chỉ…", "Con số nhỏ", "Đánh giá thấp, cuối câu"],
    ],
  },
  links: [
    "Ôn N2: 〜をはじめ (tiêu biểu) ≠ 〜を皮切りに (khởi đầu theo thời gian).",
    "をもって có HAI nghĩa: kết thúc (chương này) và phương tiện (Chương 11). Nhìn danh từ phía trước: thời điểm hay công cụ?",
    "に至るまで (phạm vi) — に至って / に至っては (Chương 16): cùng gốc 至る \"đi tới\", nhớ thành một nhóm.",
    "といったところだ (con số nhỏ) ↔ からある (Chương 17, con số lớn): một cặp đối lập dễ ra đề.",
  ],
  hook: "Một dự án có: phát súng MỞ MÀN (を皮切りに) → kế hoạch chi tiết ĐẾN TẬN… (に至るまで) → lời thề LẦN CUỐI (を限りに) → thông báo KẾT THÚC (をもって) → và lời tự đánh giá \"CÙNG LẮM CHỈ…\" (といったところだ).",
  quiz: [
    {
      type: "match",
      q: "Nối mẫu ngữ pháp với ý nghĩa",
      pairs: [
        ["〜を皮切りに", "Mở màn bằng… rồi liên tiếp"],
        ["〜に至るまで", "Đến tận cả… (ngoài dự đoán)"],
        ["〜を限りに", "Lấy lần này làm lần cuối"],
        ["〜をもって", "Kết thúc vào (thông báo chính thức)"],
        ["〜といったところだ", "Cùng lắm chỉ khoảng…"],
      ],
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "この博物館には、恐竜の化石から最新のロボット＿＿＿、さまざまな物が展示されている。",
      opts: ["に至るまで", "を限りに", "をもって", "を皮切りに"],
      answer: 0,
      explain: "A から B に至るまで: từ hóa thạch khủng long đến tận robot mới nhất.",
    },
    {
      type: "choice",
      label: "Điền vào chỗ trống",
      q: "社長の挨拶＿＿＿、新年会が始まった。その後、各部長が次々にスピーチをした。",
      opts: ["を皮切りに", "をもって", "を限りに", "に至るまで"],
      answer: 0,
      explain: "Lời chào của giám đốc là mở màn, sau đó lần lượt các trưởng phòng phát biểu → を皮切りに.",
    },
    {
      type: "order",
      before: "長年続いたこの雑誌は、",
      pieces: ["今月号", "を", "もって", "休刊"],
      after: "することになった。",
      star: 3,
      vi: "Tạp chí lâu năm này sẽ tạm ngừng phát hành từ số tháng này.",
      explain: "今月号をもって休刊する: thông báo chính thức về thời điểm kết thúc.",
    },
    {
      type: "judge",
      q: "会議の参加者は、多くても十人といったところでしょう。",
      ok: true,
      explain: "多くても + con số nhỏ + といったところ → tự nhiên.",
    },
    {
      type: "choice",
      label: "Chọn câu dùng đúng",
      q: "「〜を限りに」の使い方が正しい文はどれか。",
      opts: [
        "今月を限りに、このアルバイトを辞めることにした。",
        "今月を限りに、新しいアルバイトを始めた。",
        "このビルは五十階を限りに高い。",
        "東京を限りに、全国でイベントを行う。",
      ],
      answer: 0,
      explain: "を限りに = lấy mốc này làm lần cuối rồi chấm dứt → câu 1.",
    },
    {
      type: "choice",
      label: "Chọn nghĩa đúng",
      q: "このあたりの家賃は、高くても八万円といったところだ。",
      opts: [
        "Tiền nhà quanh đây cao nhất cũng chỉ khoảng 80.000 yên.",
        "Tiền nhà quanh đây cao tới hơn 80.000 yên.",
        "Tiền nhà quanh đây từ 80.000 yên trở lên.",
        "Tiền nhà quanh đây đã tăng đến 80.000 yên.",
      ],
      answer: 0,
      explain: "高くても…といったところだ = cùng lắm cũng chỉ khoảng…",
    },
  ],
};
