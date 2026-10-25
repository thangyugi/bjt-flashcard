import { newId, type PortfolioDoc } from "./types";

/**
 * Portfolio mẫu cho tài khoản mới: một kỹ sư frontend cấp cao HƯ CẤU ở một công ty lớn (không phải người thật,
 * không có tên công ty thật). Mọi phần đều gắn `sample: true` để hiện nhãn "Mẫu" cho tới khi người dùng sửa / xóa.
 */
export function samplePortfolio(): PortfolioDoc {
  return {
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

export const hasSample = (d: PortfolioDoc) =>
  Boolean(d.header.sample || d.pr.sample || d.skills.sample || d.education.sample || d.projects.some((p) => p.data.sample));
