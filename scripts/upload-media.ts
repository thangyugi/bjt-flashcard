/**
 * Đưa thư mục public/audio lên Cloudflare R2 (giai đoạn 0) để bản deploy Vercel không phải chứa ~400 MB âm thanh.
 *
 *   R2_ACCOUNT_ID=… R2_ACCESS_KEY_ID=… R2_SECRET_ACCESS_KEY=… R2_BUCKET=bjt-media npm run media:upload
 *
 * - Bỏ qua file đã có cùng kích thước (chạy lại chỉ tải phần mới).
 * - File âm thanh đặt tên theo nội dung → cache 1 năm; manifest.json cache 5 phút.
 * Xem docs/MEDIA.md cho các bước tạo bucket, tên miền công khai và CORS.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const need = (k: string) => {
  const v = process.env[k];
  if (!v) {
    console.error(`Thiếu biến môi trường ${k}. Xem docs/MEDIA.md.`);
    process.exit(1);
  }
  return v;
};
const BUCKET = need("R2_BUCKET");
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${need("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: need("R2_ACCESS_KEY_ID"), secretAccessKey: need("R2_SECRET_ACCESS_KEY") },
});

const ROOT = join(process.cwd(), "public");
const TYPES: Record<string, string> = { m4a: "audio/mp4", mp3: "audio/mpeg", wav: "audio/wav", json: "application/json" };

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

async function remoteSizes(prefix: string) {
  const sizes = new Map<string, number>();
  let token: string | undefined;
  do {
    const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix, ContinuationToken: token }));
    for (const o of r.Contents ?? []) if (o.Key) sizes.set(o.Key, o.Size ?? -1);
    token = r.IsTruncated ? r.NextContinuationToken : undefined;
  } while (token);
  return sizes;
}

async function main() {
  const files = walk(join(ROOT, "audio"));
  const remote = await remoteSizes("audio/");
  const todo = files
    .map((f) => ({ f, key: relative(ROOT, f).split(sep).join("/"), size: statSync(f).size }))
    .filter(({ key, size }) => key.endsWith("manifest.json") || remote.get(key) !== size);
  console.log(`${files.length} file, cần tải ${todo.length}.`);

  let done = 0;
  const put = async (it: (typeof todo)[number]) => {
    const manifest = it.key.endsWith("manifest.json");
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: it.key,
        Body: readFileSync(it.f),
        ContentType: TYPES[it.key.split(".").pop() ?? ""] ?? "application/octet-stream",
        CacheControl: manifest ? "public, max-age=300" : "public, max-age=31536000, immutable",
      })
    );
    done++;
    if (done % 100 === 0 || done === todo.length) process.stdout.write(`\r${done}/${todo.length}`);
  };
  // Âm thanh trước (8 luồng song song), manifest.json sau cùng: app chỉ thấy file mới khi file đã lên đủ
  const audio = todo.filter((t) => !t.key.endsWith("manifest.json"));
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      for (let it = audio.shift(); it; it = audio.shift()) await put(it);
    })
  );
  for (const it of todo.filter((t) => t.key.endsWith("manifest.json"))) await put(it);
  console.log("\nXong. Đặt NEXT_PUBLIC_MEDIA_BASE_URL trên Vercel rồi deploy lại.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
