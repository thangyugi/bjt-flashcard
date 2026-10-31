import { newId, type Interview, type Introduce, type PortfolioDoc } from "./types";

/**
 * Portfolio mẫu cho tài khoản mới: một kỹ sư frontend cấp cao HƯ CẤU ở một công ty lớn (không phải người thật,
 * không có tên công ty thật). Mọi phần đều gắn `sample: true` để hiện nhãn "Mẫu" cho tới khi người dùng sửa / xóa.
 */
export function samplePortfolio(): PortfolioDoc {
  return {
    introduce: sampleIntroduce(),
    interview: sampleInterview(),
    header: {
      sample: true,
      name: "Kenta Morimoto",
      role: "Senior Frontend Engineer · フロントエンドテックリード",
      location: "東京都",
      intro:
        "大手ECプラットフォームで、月間数千万PVのWebフロントを支えるフロントエンドテックリード。React / Next.js / TypeScript を軸に、デザインシステムとマイクロフロントエンドで「速く、壊れにくく、チームが育つ」フロントエンド基盤をつくってきました。",
      links: [
        { label: "ポートフォリオサイト", url: "https://example.com/portfolio" },
        { label: "技術ブログ", url: "https://example.com/blog" },
      ],
      facts: [
        { value: "12年", label: "ITの経験" },
        { value: "8年", label: "フロントエンド専任" },
        { value: "20名", label: "リードしたチーム規模" },
        { value: "−48%", label: "LCP改善（モバイル p75）" },
        { value: "3件", label: "社外カンファレンス登壇" },
      ],
    },
    pr: {
      sample: true,
      sections: [
        {
          id: "pr-tech",
          title: "技術",
          bullets: [
            "大規模トラフィックを前提としたWebパフォーマンス改善（Core Web Vitals）を、計測設計から施策の優先度付け、効果検証まで一貫して推進できます。",
            "デザインシステムとコンポーネント設計により、複数チームが同じ品質で速く開発できる仕組みをつくることを得意としています。",
            "Next.js App Router / React Server Components への段階的移行など、止められないサービスのアーキテクチャ刷新をリスクを抑えて進めてきました。",
          ],
        },
        {
          id: "pr-lead",
          title: "リーダーシップ・姿勢",
          bullets: [
            "約20名のフロントエンド組織で、技術方針の策定、コードレビュー文化の定着、メンバーの育成を担ってきました。",
            "企画・デザイナー・バックエンドと早い段階から対話し、「なぜ作るのか」を共有したうえで最適な実装を提案します。",
            "数字で語ることを大切にし、施策は必ず計測可能な指標とセットで提案・報告します。",
          ],
        },
      ],
    },
    skills: {
      sample: true,
      groups: [
        {
          id: "sk-lang",
          title: "言語",
          items: [
            { name: "HTML/CSS", years: 12 },
            { name: "JavaScript", years: 12 },
            { name: "TypeScript", years: 8 },
            { name: "SQL", years: 4 },
            { name: "Go", years: 1.5 },
          ],
        },
        {
          id: "sk-fw",
          title: "FW・ライブラリ",
          items: [
            { name: "React", years: 8 },
            { name: "Node.js", years: 7 },
            { name: "Next.js", years: 6 },
            { name: "Storybook", years: 5 },
            { name: "Playwright", years: 3 },
          ],
        },
        {
          id: "sk-infra",
          title: "インフラ・ツール",
          items: [
            { name: "AWS", years: 6 },
            { name: "Docker", years: 6 },
            { name: "GitHub Actions", years: 5 },
            { name: "Datadog", years: 4 },
            { name: "Terraform", years: 3 },
          ],
        },
        {
          id: "sk-phase",
          title: "開発工程",
          items: [
            { name: "実装", years: 12 },
            { name: "詳細設計", years: 9 },
            { name: "テスト設計", years: 9 },
            { name: "基本設計", years: 7 },
            { name: "進捗管理", years: 5 },
          ],
        },
      ],
    },
    education: {
      sample: true,
      entries: [
        { id: "ed-univ", title: "私立大学 理工学部 情報工学科", detail: "2014年3月 卒業 · 最終学歴" },
        { id: "ed-aws", title: "AWS認定 ソリューションアーキテクト – アソシエイト", detail: "2021年 取得" },
        { id: "ed-ap", title: "応用情報技術者試験", detail: "2016年 合格" },
        { id: "ed-toeic", title: "TOEIC 860", detail: "英語：技術文書の読解・海外OSSとのやり取り" },
      ],
    },
    projects: [
      {
        id: newId(), // id dự án là khóa chính toàn cục → mỗi tài khoản một id riêng
        data: {
          sample: true,
          title: "大規模ECサイトのWebフロント刷新 ～ Next.js App Router移行・マイクロフロントエンド化・デザインシステム構築",
          from: "2023-04",
          to: null,
          industry: "EC・小売（大手ECプラットフォーム企業／従業員数千名規模）",
          teamSize: 20,
          role: "フロントエンドテックリード",
          phases: ["requirements", "basic", "detail", "impl", "unit", "integration", "system", "qa", "progress", "ops"],
          tech: {
            lang: ["TypeScript", "JavaScript", "HTML/CSS", "Go"],
            fw: ["Next.js (App Router)", "React", "React Server Components", "Module Federation", "TanStack Query", "Tailwind CSS", "Storybook", "Vitest", "Playwright"],
            db: ["PostgreSQL", "Redis", "Elasticsearch"],
            infra: ["AWS (CloudFront / ECS / Lambda@Edge)", "Docker", "Terraform", "Linux"],
            other: ["GitHub Actions", "Turborepo", "Datadog RUM", "Sentry", "Figma"],
          },
          summary:
            "月間PV数千万規模の総合ECサイトにおいて、10年以上運用されてきたモノリシックなSPA（React＋独自SSR）を、Next.js App Routerを基盤としたマイクロフロントエンド構成へ段階的に移行するプロジェクト。商品検索・商品詳細・カート・購入の4ドメインを独立してデプロイできる単位に分割し、全社共通のデザインシステムを新たに構築。売上を止めないことを前提に、トラフィックを段階的に切り替えながら移行を進めている。",
          duties: [
            "フロントエンド全体のアーキテクチャ設計（ドメイン分割方針、Module Federationとルーティングの責務分担、RSC／クライアントコンポーネントの境界設計）",
            "移行計画の策定とロードマップ管理（ドメインごとのカナリアリリース、CloudFrontでのトラフィック段階切替、ロールバック手順の整備）",
            "デザイナーと共同でデザインシステムを立ち上げ、デザイントークン設計・80以上の共通コンポーネント・Storybookによるドキュメントを整備",
            "Core Web Vitalsの計測基盤を構築（Datadog RUMとLighthouse CIによる継続計測、パフォーマンスバジェットをCIに組み込み）",
            "商品詳細・検索ページのRSC化、画像最適化、ストリーミングSSRによる表示速度改善の実装",
            "4チーム・約20名のフロントエンドエンジニアの技術リード（設計レビュー、コードレビュー基準の策定、勉強会の運営、新メンバーのオンボーディング）",
            "Vitest／Playwrightによるテスト戦略の策定と、E2Eテストの並列化によるCI時間の短縮",
            "リリース後の監視・改善と障害対応フローの整備（Sentryでのエラー監視、オンコール体制の見直し）",
          ],
          results: [
            "モバイルのLCP（p75）を 4.1秒 → 2.1秒 に改善（約48%短縮）、INPを 380ms → 160ms に改善",
            "初期表示のJavaScriptバンドルサイズを 1.2MB → 420KB（gzip前）に削減",
            "商品詳細ページのCVRが前年同期比 +6.8%、検索結果ページからの離脱率が 12% 低下",
            "ドメインごとの独立デプロイにより、リリース頻度を 週1回 → 1日平均3回 に向上、CI所要時間を 25分 → 9分 に短縮",
            "デザインシステムの導入により、新規画面の実装工数を平均 約30% 削減",
          ],
          learnings: [
            "止められない大規模サービスのアーキテクチャ移行では、「段階的に切り替え、いつでも戻せる」設計がすべてであること",
            "RSCとクライアントコンポーネントの境界設計が、パフォーマンスと開発体験の両方を大きく左右すること",
            "計測できない改善は合意を得られない。指標の定義と可視化を最初に用意することの重要性",
            "複数チームで共通基盤を育てるには、技術そのものよりもドキュメントと合意形成のプロセスが鍵になること",
          ],
        },
      },
    ],
  };
}

/** Trang My Portfolio (職務経歴書) còn phần mẫu */
export const hasSample = (d: PortfolioDoc) =>
  Boolean(d.header.sample || d.pr.sample || d.skills.sample || d.education.sample || d.projects.some((p) => p.data.sample));

/** Introduce mẫu: cùng kỹ sư hư cấu, tiếng Nhật kèm bản dịch tiếng Việt */
export function sampleIntroduce(): Introduce {
  return {
    sample: true,
    profile: {
      name: "Kenta Morimoto",
      kana: "もりもと けんた",
      role: "Senior Frontend Engineer・テックリード",
      location: "東京都",
      years: "12 năm IT · 8 năm frontend",
      langs: "Tiếng Nhật (bản ngữ) · Tiếng Anh (TOEIC 860)",
      catchJa: "速く、壊れにくく、チームが育つフロントエンドをつくる",
      catchVi: "Xây dựng frontend nhanh, khó hỏng và giúp đội ngũ cùng phát triển.",
    },
    blocks: [
      {
        id: "in-1min",
        titleJa: "1分自己紹介",
        titleVi: "Giới thiệu bản thân trong 1 phút",
        bodyJa:
          "はじめまして、森本健太と申します。大学で情報工学を学んだ後、Web制作会社でエンジニアとしてのキャリアをスタートしました。現在は大手ECプラットフォームで、フロントエンドのテックリードを務めています。\nReact・Next.js・TypeScriptを軸に、サイトの表示速度改善やデザインシステムの構築に取り組み、モバイルの表示速度を約48%改善しました。チームでは約20名のエンジニアの技術リードとして、レビュー文化づくりや育成にも力を入れています。\n今後は、技術とチームの両面からプロダクトの成長に貢献したいと考えています。どうぞよろしくお願いいたします。",
        bodyVi:
          "Xin chào, tôi tên là Kenta Morimoto. Sau khi học ngành kỹ thuật thông tin ở đại học, tôi bắt đầu sự nghiệp kỹ sư tại một công ty làm web. Hiện tôi là tech lead frontend tại một nền tảng thương mại điện tử lớn.\nVới React, Next.js và TypeScript làm trọng tâm, tôi tập trung cải thiện tốc độ hiển thị và xây dựng design system, giúp tốc độ hiển thị trên di động cải thiện khoảng 48%. Trong đội, tôi dẫn dắt kỹ thuật cho khoảng 20 kỹ sư, chú trọng xây dựng văn hóa review và đào tạo thành viên.\nSắp tới, tôi muốn đóng góp vào sự phát triển của sản phẩm từ cả hai mặt kỹ thuật và đội ngũ. Rất mong được giúp đỡ.",
      },
      {
        id: "in-career",
        titleJa: "経歴の概要",
        titleVi: "Tóm tắt kinh nghiệm",
        bodyJa:
          "2014年に大学を卒業し、Web制作会社で4年間、企業サイトや業務システムのフロントエンド開発を担当しました。2018年に現職の大手ECプラットフォームへ移り、商品検索や購入フローの開発を経て、2023年からはフロントエンド全体のテックリードを務めています。",
        bodyVi:
          "Tốt nghiệp đại học năm 2014, tôi làm 4 năm ở một công ty web, phụ trách phát triển frontend cho website doanh nghiệp và hệ thống nghiệp vụ. Năm 2018 tôi chuyển sang nền tảng thương mại điện tử hiện tại, phát triển tính năng tìm kiếm sản phẩm và luồng mua hàng, và từ năm 2023 là tech lead của toàn bộ mảng frontend.",
      },
      {
        id: "in-strength",
        titleJa: "強み",
        titleVi: "Điểm mạnh",
        bodyJa:
          "一番の強みは「数字で考え、チームで形にする力」です。改善施策は必ず計測できる指標とセットで提案し、効果を確認しながら進めます。また、デザイナーやバックエンドなど他職種と早い段階から対話し、全員が納得できる形に落とし込むことを得意としています。",
        bodyVi:
          "Điểm mạnh lớn nhất của tôi là «suy nghĩ bằng số liệu và cùng đội ngũ biến nó thành sản phẩm». Mỗi đề xuất cải thiện tôi luôn đi kèm chỉ số đo được, và vừa làm vừa kiểm chứng hiệu quả. Tôi cũng giỏi trao đổi sớm với designer, backend và các vai trò khác để đưa ra giải pháp mà mọi người đều đồng thuận.",
      },
      {
        id: "in-value",
        titleJa: "大切にしていること",
        titleVi: "Điều tôi coi trọng",
        bodyJa: "ユーザーにとって本当に価値があるかどうかを常に考えることです。技術的に面白いことよりも、使う人が「速い」「わかりやすい」と感じられることを優先しています。",
        bodyVi: "Luôn suy nghĩ xem điều mình làm có thực sự mang lại giá trị cho người dùng hay không. Thay vì những thứ thú vị về mặt kỹ thuật, tôi ưu tiên việc người dùng cảm thấy «nhanh» và «dễ hiểu».",
      },
      {
        id: "in-hobby",
        titleJa: "趣味・プライベート",
        titleVi: "Sở thích & cuộc sống riêng",
        bodyJa: "週末はランニングとカメラを楽しんでいます。年に一度はフルマラソンに出場しています。最近は、子どもと一緒にプログラミング教材で遊ぶことも楽しみの一つです。",
        bodyVi: "Cuối tuần tôi thích chạy bộ và chụp ảnh. Mỗi năm tôi tham gia một giải marathon. Gần đây, chơi cùng con với các bộ học lập trình cũng là một niềm vui của tôi.",
      },
    ],
  };
}

/** Bộ câu hỏi phỏng vấn IT mẫu: câu hỏi / trả lời tiếng Nhật kèm bản dịch tiếng Việt */
export function sampleInterview(): Interview {
  return {
    sample: true,
    items: [
      {
        id: "qa-intro",
        cat: "intro",
        qJa: "簡単に自己紹介をお願いします。",
        qVi: "Xin hãy giới thiệu ngắn gọn về bản thân.",
        aJa: "森本健太と申します。IT業界で12年、そのうち8年はフロントエンドを専門にしてきました。現在は大手ECプラットフォームでフロントエンドのテックリードとして、Next.jsへの移行とデザインシステムの構築をリードしています。本日はどうぞよろしくお願いいたします。",
        aVi: "Tôi tên là Kenta Morimoto. Tôi có 12 năm làm trong ngành IT, trong đó 8 năm chuyên về frontend. Hiện tôi là tech lead frontend tại một nền tảng thương mại điện tử lớn, dẫn dắt việc chuyển sang Next.js và xây dựng design system. Rất mong được anh/chị giúp đỡ trong buổi hôm nay.",
      },
      {
        id: "qa-hardest",
        cat: "intro",
        qJa: "これまでで一番大変だったプロジェクトは何ですか。",
        qVi: "Dự án khó khăn nhất mà bạn từng tham gia là gì?",
        aJa: "月間数千万PVのECサイトを、サービスを止めずにNext.jsへ移行したプロジェクトです。一度に切り替えるのは危険だったため、ドメインごとに段階的にトラフィックを切り替え、問題があればすぐに戻せる仕組みを用意しました。その結果、大きな障害を出さずに移行を進め、表示速度も約48%改善できました。",
        aVi: "Đó là dự án chuyển một trang thương mại điện tử có hàng chục triệu lượt xem mỗi tháng sang Next.js mà không dừng dịch vụ. Vì chuyển một lần rất rủi ro, tôi chuyển lưu lượng dần theo từng domain và chuẩn bị cơ chế quay lại ngay khi có sự cố. Nhờ vậy việc chuyển đổi diễn ra mà không có sự cố lớn, tốc độ hiển thị cũng cải thiện khoảng 48%.",
      },
      {
        id: "qa-rsc",
        cat: "tech",
        qJa: "Reactの Server Components と Client Components の違いを説明してください。",
        qVi: "Hãy giải thích sự khác nhau giữa Server Components và Client Components trong React.",
        aJa: "Server Componentsはサーバー側だけで実行され、データ取得を直接行えて、JavaScriptをブラウザに送らないのが特徴です。一方、Client Componentsはブラウザでも実行され、状態管理やイベント処理などのインタラクションを担当します。基本はServer Componentsで作り、操作が必要な部分だけをClient Componentsにすることで、バンドルサイズを抑えられます。",
        aVi: "Server Components chỉ chạy ở phía server, có thể lấy dữ liệu trực tiếp và không gửi JavaScript xuống trình duyệt. Ngược lại, Client Components chạy cả trên trình duyệt và đảm nhận phần tương tác như quản lý state hay xử lý sự kiện. Mặc định tôi dùng Server Components, chỉ phần nào cần thao tác mới làm Client Components, nhờ đó giảm được kích thước bundle.",
      },
      {
        id: "qa-perf",
        cat: "tech",
        qJa: "Webパフォーマンスを改善するとき、どのように進めますか。",
        qVi: "Khi cải thiện hiệu năng web, bạn tiến hành như thế nào?",
        aJa: "まず計測から始めます。Core Web Vitalsなどの指標を実際のユーザーデータで確認し、どこが遅いのかを特定します。次に、効果が大きく工数が小さい施策から優先順位をつけて実施し、改善後にもう一度計測して効果を確認します。改善が後戻りしないよう、CIにパフォーマンスバジェットを組み込むことも大切だと考えています。",
        aVi: "Tôi bắt đầu từ đo lường. Tôi kiểm tra các chỉ số như Core Web Vitals bằng dữ liệu người dùng thực để xác định chỗ nào chậm. Sau đó ưu tiên làm trước các biện pháp hiệu quả cao mà tốn ít công, rồi đo lại để xác nhận hiệu quả. Tôi cũng cho rằng việc đưa performance budget vào CI là quan trọng để hiệu năng không bị tụt lại.",
      },
      {
        id: "qa-review",
        cat: "tech",
        qJa: "コードレビューで重視していることは何ですか。",
        qVi: "Bạn coi trọng điều gì khi review code?",
        aJa: "一番重視しているのは、読みやすさと変更のしやすさです。動くかどうかだけでなく、半年後に別のメンバーが読んでも意図がわかるかを確認します。また、指摘するときは理由を添え、「提案」なのか「必須」なのかを明確にして、相手が気持ちよく直せるように心がけています。",
        aVi: "Điều tôi coi trọng nhất là code dễ đọc và dễ thay đổi. Không chỉ xem code có chạy hay không, tôi còn xem sáu tháng sau thành viên khác đọc vào có hiểu ý đồ hay không. Khi góp ý, tôi luôn kèm lý do và nói rõ đó là «đề xuất» hay «bắt buộc», để người kia có thể sửa một cách thoải mái.",
      },
      {
        id: "qa-conflict",
        cat: "team",
        qJa: "チーム内で意見が対立したとき、どう対応しますか。",
        qVi: "Khi trong nhóm có ý kiến trái chiều, bạn xử lý thế nào?",
        aJa: "まず、それぞれの意見の背景や目的を丁寧に聞くようにしています。多くの場合、目的は同じで手段が違うだけなので、ユーザーへの影響やコスト、リスクなどの共通の基準で比較します。それでも決まらない場合は、小さく試して数字で判断するようにしています。",
        aVi: "Trước tiên tôi lắng nghe kỹ bối cảnh và mục đích của từng ý kiến. Phần lớn trường hợp mục đích giống nhau, chỉ khác cách làm, nên tôi so sánh bằng tiêu chí chung như ảnh hưởng tới người dùng, chi phí và rủi ro. Nếu vẫn chưa quyết được, tôi thử nghiệm ở quy mô nhỏ và quyết định dựa trên số liệu.",
      },
      {
        id: "qa-spec",
        cat: "team",
        qJa: "仕様が曖昧なとき、どうしますか。",
        qVi: "Khi đặc tả (spec) chưa rõ ràng, bạn làm gì?",
        aJa: "自分だけで判断して進める前に、不明点を整理して早めに確認します。その際、「A案とB案がありますが、どちらがよいでしょうか」のように選択肢を用意して質問すると、相手も答えやすくなります。確認した内容はチケットやドキュメントに残し、チーム全体で共有します。",
        aVi: "Trước khi tự quyết định và làm tiếp, tôi sắp xếp các điểm chưa rõ và xác nhận sớm. Khi hỏi, tôi chuẩn bị sẵn phương án, ví dụ «Có phương án A và B, nên chọn cái nào ạ?», để người kia dễ trả lời. Nội dung đã xác nhận được ghi vào ticket hoặc tài liệu và chia sẻ cho cả nhóm.",
      },
      {
        id: "qa-motive",
        cat: "motive",
        qJa: "当社を志望した理由を教えてください。",
        qVi: "Hãy cho biết lý do bạn ứng tuyển vào công ty chúng tôi.",
        aJa: "御社が大規模なサービスを自社で開発し、ユーザー体験の改善に力を入れている点に魅力を感じました。これまで培ってきたパフォーマンス改善やデザインシステムの経験を活かし、より多くのユーザーに使いやすいサービスを届けたいと考え、志望いたしました。",
        aVi: "Tôi bị thu hút bởi việc quý công ty tự phát triển dịch vụ quy mô lớn và chú trọng cải thiện trải nghiệm người dùng. Tôi muốn tận dụng kinh nghiệm cải thiện hiệu năng và xây dựng design system đã tích lũy để mang đến dịch vụ dễ dùng cho nhiều người hơn, nên đã ứng tuyển.",
      },
      {
        id: "qa-future",
        cat: "motive",
        qJa: "5年後、どのようなエンジニアになっていたいですか。",
        qVi: "5 năm nữa, bạn muốn trở thành kỹ sư như thế nào?",
        aJa: "技術とチームの両面から、プロダクトの成長を支えられるエンジニアになりたいです。具体的には、フロントエンドだけでなくバックエンドやインフラも含めた全体設計に関わり、若手エンジニアが育つ仕組みづくりにも貢献したいと考えています。",
        aVi: "Tôi muốn trở thành kỹ sư có thể hỗ trợ sự phát triển của sản phẩm từ cả hai mặt: kỹ thuật và đội ngũ. Cụ thể, tôi muốn tham gia thiết kế tổng thể không chỉ frontend mà cả backend và hạ tầng, đồng thời góp phần xây dựng cơ chế giúp các kỹ sư trẻ phát triển.",
      },
      {
        id: "qa-reverse",
        cat: "reverse",
        qJa: "最後に、何か質問はありますか。",
        qVi: "Cuối cùng, bạn có câu hỏi nào không?",
        aJa: "はい、ありがとうございます。入社後に最初に担当するプロジェクトと、チームの開発体制について教えていただけますか。また、エンジニアの評価はどのような基準で行われているのかも伺いたいです。",
        aVi: "Vâng, cảm ơn anh/chị. Anh/chị có thể cho tôi biết dự án đầu tiên tôi sẽ phụ trách sau khi vào công ty và cách tổ chức phát triển của nhóm không ạ? Tôi cũng muốn hỏi việc đánh giá kỹ sư được thực hiện theo tiêu chí nào.",
      },
    ],
  };
}
