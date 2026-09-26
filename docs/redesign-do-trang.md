# Thiết kế lại giao diện Đỏ – Trắng

Tài liệu theo dõi các thay đổi khi áp dụng thiết kế "Đỏ – Trắng" (chủ đề Nhật Bản) vào code.
Mỗi mục ghi rõ trang nào, phần nào, file nào đã sửa.

## 0. Nền tảng (áp dụng cho mọi trang)

| Phần | File | Thay đổi |
|---|---|---|
| Bảng màu | `src/app/globals.css` | Thêm token mới: `paper` (nền washi #FAF8F5), `surface`, `surface-2`, `line`, `line-strong`, `track`, `ink` / `ink-2` / `ink-3` (chữ), `brand` (đỏ #B8202F), `brand-hover`, `brand-muted`, `brand-soft`, `brand-soft-ink`, `ok` / `ok-soft` / `ok-ink` (màu "Đúng"). Token shadcn (`primary`, `border`…) trỏ về bảng màu mới. Bỏ toàn bộ indigo / tím / xanh / vàng. |
| Font | `src/app/layout.tsx`, `globals.css` | Be Vietnam Pro (giao diện, tiếng Việt), Shippori Mincho (kanji trên thẻ, class `font-mincho`), Zen Kaku Gothic New (kana, câu ví dụ, furigana, class `font-jp`). Bỏ Inter. Biến font đặt trên `<html>`. `lang` đổi `ja` → `vi` vì giao diện là tiếng Việt. |
| Tiện ích CSS | `globals.css` | `.fade-right` (mép mờ hàng thẻ), `.kbd` (phím tắt), furigana `rt` dùng font Nhật + màu `ink-3`, bo góc mặt thẻ 18px. Bỏ `.glow-animate` không dùng. |
| Icon nhóm | `src/components/ui/group-icon.tsx` (mới) | Icon nét mảnh (lucide) theo từng nhóm, thay cho emoji. |
| Nhãn dùng chung | `src/lib/vocab-labels.ts` (mới) | Tên từ loại tiếng Việt, cách đọc, nhãn cấp độ. |
| Thống kê tiến độ | `src/hooks/useProgressStats.ts` (mới) | Đã thuộc / đang học / tổng / % — dùng cho Header và trang chủ. |

## 1. Khung trang

| Phần | File | Thay đổi |
|---|---|---|
| Header | `src/components/layout/Header.tsx` | Logo 語 nền đỏ, menu dạng thanh gạt (Tổng quan / Học bài / Trắc nghiệm — thêm mục Trắc nghiệm), thanh tiến độ đỏ. Không có nút sáng/tối. Trên mobile, header ẩn ở trang học bài và trắc nghiệm (các trang này có thanh trên riêng). |
| Thanh điều hướng mobile | `src/components/layout/MobileTabBar.tsx` (mới) | Thanh tab dưới đáy (< 768px): Tổng quan / Học bài / Trắc nghiệm. Ẩn khi đang làm trắc nghiệm. |
| Layout gốc | `src/app/layout.tsx` | Gắn `MobileTabBar`, font mới. |

## 2. Trang chủ — `src/app/page.tsx`

| Phần | Thay đổi |
|---|---|
| Hero | Nền trắng, tiêu đề "Học từ vựng tiếng Nhật **thương mại** mỗi ngày", nút "Bắt đầu học" (đỏ) + "Thi trắc nghiệm tổng hợp". Hàng số liệu: số từ, số nhóm, furigana. |
| Từ của hôm nay | Mới. Thẻ từ đặt trên vòng tròn đỏ (hinomaru), chữ dọc 一日一語. Từ đổi theo ngày. Chỉ hiện trên desktop. |
| Tiến độ | 3 ô: Tiến độ tổng (thanh 2 lớp đã thuộc / đang học), số Đã thuộc / Đang học / Chưa học, ô "Tiếp tục học" (nhóm học gần nhất). |
| Bộ lọc | Thanh gạt Tất cả / BJT / JLPT N1 (bỏ emoji). |
| Tìm kiếm | Mới. Lọc từ theo kanji, kana, romaji, nghĩa. |
| Mẹo học | Nền trung tính, icon bóng đèn, cập nhật nội dung nhắc nút "Mở rộng". |
| Footer | Mới. 継続は力なり. |

### 2a. Nhóm từ — `src/components/flashcard/FlashCardGroup.tsx`
Icon nhóm mới, nhãn BJT viền mảnh, số từ + tên tiếng Nhật, thanh tiến độ đỏ, nút "Trắc nghiệm" (viền) + "Học ngay →" (đỏ). Mép phải mờ theo màu nền mới.

### 2b. Thẻ nhỏ — `src/components/flashcard/FlashCard.tsx` (viết lại)
- Kích thước 224×316, viền mảnh, bóng rất nhẹ, kanji font Mincho.
- **Chạm thân thẻ = lật**; **nút "Mở rộng" ở đáy = mở thẻ lớn** (tách riêng, không bấm nhầm).
- Mặt trước: nhãn từ loại, chấm trạng thái (đỏ = đã thuộc, hồng = đang học, rỗng = chưa học), kana + kanji, gợi ý "Chạm thẻ để lật".
- Mặt sau: hiện **đủ** kanji, cách đọc, nghĩa, câu ví dụ có furigana và bản dịch (không cắt "…"), khối ví dụ vừa khít nội dung; nội dung dài thì cuộn trong thẻ.
- Chỉ còn dùng cho thẻ nhỏ; thẻ lớn tách sang `FlashCardDetail`.

### 2c. Thẻ mở rộng (modal)
- `src/components/flashcard/FlashCardDetail.tsx` (mới): thẻ lớn dùng chung cho modal và trang học bài. Header: nhãn cấp độ + từ loại + nhóm; thanh gạt "Mặt trước / Mặt sau"; nút đóng. Chạm vào thân thẻ để lật. Mặt sau: desktop 2 cột (từ + nghĩa | ví dụ, ngữ cảnh business, lưu ý cách dùng, đồng/trái nghĩa); tablet/mobile xếp dọc. Footer: "Chưa nhớ / Đang học" và "Đã thuộc".
- `src/components/flashcard/FlashCardModal.tsx` (mới): desktop 880×560 giữa màn hình; tablet 720px; mobile là bottom sheet có thanh kéo. Render qua portal, khoá cuộn trang, Esc để đóng.

## 3. Học bài

### 3a. Chọn nhóm — `src/app/study/page.tsx`
Thẻ nhóm nền trắng, icon nhóm mới, nhãn nguồn, thêm thanh tiến độ từng nhóm.

### 3b. Học theo nhóm — `src/app/study/[groupId]/page.tsx`, `src/components/flashcard/FlashCardDeck.tsx`
| Kích thước | Bố cục |
|---|---|
| Desktop (≥1024px) | Cột trái 336px: "Danh sách từ vựng", thanh tỉ lệ + 3 ô Đã thuộc / Đang học / Chưa học, lưới số 6 cột. Cột phải: Quay lại · tên nhóm · bộ đếm, thanh tiến độ, thẻ lớn 880×560, nút Trước / Tiếp, gợi ý phím ← → / Space. |
| Tablet (768–1023px) | Xếp dọc: tiêu đề, tiến độ, thẻ lớn (2 cột), nút "Từ trước / Từ tiếp", bảng danh sách với 3 nhãn thống kê + lưới 12 cột. |
| Mobile (<768px) | Thanh trên: quay lại, tên nhóm + "Từ x / y", nút mở danh sách. Thẻ 1 cột, nút "Từ trước / Từ tiếp", thanh tab dưới đáy. Danh sách từ mở dạng bottom sheet. |
- Ô trong lưới: đỏ đặc = đã thuộc, hồng = đang học, viền = chưa học; ô đang xem có vòng viền đậm.
- Loading / lỗi dùng màu mới, bỏ emoji.
- Giữ nguyên logic: bấm trạng thái → lưu tiến độ → sang từ tiếp; phím ← → Space (tắt khi đang mở danh sách).

## 4. Trắc nghiệm — `src/components/quiz/QuizRunner.tsx` (viết lại giao diện), `src/app/quiz/page.tsx`

Logic tạo đề giữ nguyên (tối đa 30 câu, 4 đáp án, 3 đáp án sai ngẫu nhiên).

### 4a. Làm bài
| Kích thước | Bố cục |
|---|---|
| Desktop | Cột trái: danh sách câu hỏi (2 ô Đã / Chưa trả lời, lưới 6 cột, nút "Nộp bài" đỏ). Cột phải: tiến độ, thẻ câu hỏi (nhãn "Câu x / y", kanji Mincho, kana), 4 đáp án lưới 2×2 có ô chữ A–D, nút "Câu trước / Câu sau" (câu cuối → "Nộp bài"). |
| Tablet | Xếp dọc: câu hỏi → đáp án 2×2 → nút điều hướng → bảng danh sách (lưới 10 cột + Nộp bài). |
| Mobile | Chế độ tập trung (ẩn tab bar). Thanh trên: thoát, "Câu x / y", nút danh sách; thanh tiến độ mỏng. Đáp án xếp dọc. Thanh dưới cố định: nút ‹ và "Câu sau" / "Nộp bài". Danh sách câu là bottom sheet. |

### 4b. Xác nhận nộp bài
Thay `window.confirm` bằng hộp thoại riêng: số câu đã trả lời, cảnh báo số câu bỏ trống, nút "Làm tiếp" / "Nộp bài". Mobile: bottom sheet; tablet/desktop: giữa màn hình.

### 4c. Kết quả
| Kích thước | Bố cục |
|---|---|
| Desktop | Cột trái: vòng điểm, 3 ô Đúng / Sai / Bỏ trống (có icon ✓ ✕ –), nút "Làm lại bài thi" / "Thoát". Cột phải: "Chi tiết bài làm" + bộ lọc Tất cả / Sai / Bỏ trống / Đúng, danh sách cuộn. |
| Tablet | Thẻ tổng kết nằm ngang (vòng điểm · tiêu đề + 3 ô · 2 nút), rồi bộ lọc và danh sách. |
| Mobile | Thanh trên "Kết quả", thẻ tổng kết, bộ lọc 4 mục, danh sách; 2 nút cố định dưới đáy. |
- Mỗi câu: dòng gọn (số, kanji, kana, nhãn trạng thái), bấm để mở/thu. Câu sai và bỏ trống mở sẵn. Khi mở: "Bạn chọn" (gạch ngang nếu sai) và "Đáp án đúng" (xanh lá trầm), ví dụ có furigana, ngữ cảnh business, lưu ý cách dùng.
- Bỏ emoji 🏆 ✅ ❌ 💼 📝 💡.

## Kiểm tra
- `npx tsc --noEmit`: đạt.
- `npx next build`: đạt.
- `npx eslint src`: còn 1 lỗi có từ trước (`react-hooks/set-state-in-effect` ở effect tạo đề trong `QuizRunner`, logic cũ giữ nguyên) và 1 cảnh báo cũ trong `flashcard-store.ts`.
- Đã chạy app và chụp màn hình ở 1440 / 834 / 390px cho trang chủ, thẻ lật, modal, học bài, trắc nghiệm, xác nhận và kết quả; không có lỗi console.
