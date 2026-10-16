# Giọng đọc tiếng Nhật tự nhiên (VOICEVOX — miễn phí)

App phát **file âm thanh thu sẵn** trong `public/audio/` nếu có; câu nào chưa có file thì mới dùng giọng của máy.
File thu sẵn được tạo bằng **VOICEVOX** — phần mềm đọc tiếng Nhật miễn phí, giọng người tự nhiên, chạy ngay trên máy bạn.

## Cách tạo (macOS, làm một lần cho mỗi đợt bài mới)

1. Tải & cài VOICEVOX: <https://voicevox.hiroshiba.jp> → bản cho Mac (Apple Silicon hoặc Intel).
2. **Mở app VOICEVOX** và để nó chạy (lần đầu mất chút thời gian tải giọng). Engine của nó chạy ở `http://127.0.0.1:50021`.
3. Trong thư mục dự án:

   ```bash
   npm install          # lần đầu (cài tsx)
   npm run audio        # Ngữ pháp Bài 1 + Từ vựng Bài 19, giọng nam + nữ
   ```

   - Chọn bài: `npm run audio -- bai-02 bai-03 mk-20`
   - Trang phỏng vấn /phongvan: `npm run audio -- phongvan`
   - Flashcard BJT (905 từ + ví dụ, ~70 MB/giọng): `npm run audio -- bjt`
   - Tất cả bài: `npm run audio -- --all` (lâu, file nhiều — xem phần dung lượng bên dưới)
   - Đổi giọng: `npm run audio -- --male "玄野武宏" --female "春日部つむぎ"`
   - Tạo lại file đã có: thêm `--force`
4. Kiểm tra: `npm run dev` → mở bài, chọn **Nam / Nữ**, bấm nút loa. Dòng "Giọng thu sẵn: VOICEVOX:…" hiện dưới nút chọn giọng.
5. Đưa lên app:

   ```bash
   git add public/audio && git commit -m "Add VOICEVOX audio" && git push
   ```

Script chạy lại sẽ **bỏ qua câu đã có file**, chỉ tạo câu mới/đã sửa. File được đặt tên theo nội dung câu,
nên sửa câu nào thì chỉ câu đó cần tạo lại.

## Giọng gợi ý

| | Giọng | Đặc điểm |
|---|---|---|
| Nam (mặc định) | **青山龍星** | Trầm, rõ, giống người dẫn chương trình |
| Nam | 玄野武宏 | Trẻ, tự nhiên, hội thoại thường ngày |
| Nam | 白上虎太郎 | Trẻ, sáng |
| Nữ (mặc định) | **冥鳴ひまり** | Dịu, tự nhiên, dễ nghe |
| Nữ | 春日部つむぎ | Trẻ, tươi |
| Nữ | No.7 | Người lớn, kiểu đọc tin |

Nghe thử các giọng ngay trong app VOICEVOX trước khi chọn.

## Điều khoản

VOICEVOX miễn phí kể cả dùng thương mại, nhưng **phải ghi công giọng đọc** dạng `VOICEVOX:青山龍星`.
App tự hiện tên giọng ở phần "Giọng đọc" trên mỗi bài. Mỗi nhân vật có điều khoản riêng — xem trang của nhân vật trên web VOICEVOX.

## Dung lượng

Mỗi câu ~15–40 KB (AAC 64 kbps). Ngữ pháp Bài 1 + Từ vựng Bài 19 ≈ 116 câu × 2 giọng ≈ 5–8 MB.
Toàn bộ 20 chương ngữ pháp + 27 bài từ vựng ước ~3.000 câu × 2 giọng ≈ 150 MB — nên tạo dần theo bài đang học,
hoặc chỉ một giọng (`--voices male`).

## Ghi chú kỹ thuật

- Script: `scripts/generate-audio.ts`. Khóa file = băm câu đã bỏ furigana (`src/lib/audio-key.ts`), dùng chung với trình phát.
- Chuyển WAV → M4A bằng `ffmpeg` nếu có, nếu không dùng `afconvert` có sẵn trên macOS.
- Service worker lưu file âm thanh đã nghe để dùng offline.
