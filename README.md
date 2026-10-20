# LeoEdu

LeoEdu là ứng dụng học ngôn ngữ và chứng chỉ bằng tiếng Việt: ngữ pháp và từ vựng JLPT N1, phát âm tiếng Anh (IPA),
OCI AI Foundations và từ vựng tiếng Nhật thương mại (BJT), lịch ôn thông minh (thuật toán FSRS), dùng được offline (PWA).

## Tài khoản và quyền truy cập

Học trên LeoEdu cần tài khoản (miễn phí). Không cần đăng nhập: trang chủ (bản giới thiệu cho khách), `/login`, `/register`,
`/forgot-password`, `/reset-password`, `/auth/callback`, `/privacy`, `/offline`. Mọi trang khác (khóa học, học bài, trắc nghiệm,
ôn tập, tiến độ, vùng đất, tài khoản…) hiện màn "Bạn cần tài khoản để học" cho khách, với nút Đăng ký / Đăng nhập quay lại đúng trang.
Cổng đăng nhập chạy phía trình duyệt (`src/components/account/RequireAuth.tsx`, đặt một lần trong `src/app/layout.tsx`);
danh sách trang công khai là `PUBLIC_PATHS` trong file đó. Người đã đăng nhập vẫn vào học được khi mất mạng nhờ phiên lưu trên máy.
Chưa đặt `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` thì các trang học hiện màn mời đăng nhập kèm ghi chú chưa bật tài khoản.

Tên repo (`bjt-flashcard`) và các khóa lưu trữ trên trình duyệt giữ nguyên để không mất dữ liệu học của người dùng.

## Phát triển

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
