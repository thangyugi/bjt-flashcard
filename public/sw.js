/* Service worker của BJT Flashcard — cho phép cài app (PWA) và học khi mất mạng.
 *
 * - Tài nguyên tĩnh có hash (/_next/static, icon): lấy từ cache trước.
 * - Trang HTML & dữ liệu RSC: lấy mạng trước, lưu bản mới vào cache; mất mạng thì dùng bản đã lưu,
 *   chưa từng mở thì hiện trang /offline.
 * - File dữ liệu khác (json…): dùng bản cache ngay, đồng thời cập nhật ngầm.
 * Đổi VERSION khi cần xóa sạch cache cũ.
 */
const VERSION = "v2";
const STATIC_CACHE = `bjt-static-${VERSION}`;
const PAGE_CACHE = `bjt-pages-${VERSION}`;
const DATA_CACHE = `bjt-data-${VERSION}`;
const AUDIO_CACHE = "bjt-audio-v1";
const OFFLINE_URL = "/offline";
// Tên miền chứa âm thanh khi đã chuyển sang Cloudflare R2 (truyền qua /sw.js?media=…)
const MEDIA_ORIGIN = new URL(self.location.href).searchParams.get("media");
const PRECACHE = ["/", OFFLINE_URL, "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const keep = [STATIC_CACHE, PAGE_CACHE, DATA_CACHE, AUDIO_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (MEDIA_ORIGIN && url.origin === MEDIA_ORIGIN && url.pathname.startsWith("/audio/")) {
    event.respondWith(url.pathname.endsWith("/manifest.json") ? staleWhileRevalidate(request, true) : audioCache(request, url, true));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname === "/sw.js") return;

  // File giọng đọc thu sẵn: lưu lại để nghe offline (trả 206 cho yêu cầu Range — Safari cần)
  if (url.pathname.startsWith("/audio/") && !url.pathname.endsWith("/manifest.json")) {
    event.respondWith(audioCache(request, url));
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  const isRsc = request.headers.get("RSC") === "1" || url.searchParams.has("_rsc");
  if (request.mode === "navigate" || isRsc) {
    event.respondWith(networkFirst(request, request.mode === "navigate"));
    return;
  }

  if (url.pathname.startsWith("/_next/")) return;
  event.respondWith(staleWhileRevalidate(request));
});

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

async function networkFirst(request, isPage) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(request, { ignoreVary: true });
    if (hit) return hit;
    if (isPage) {
      const offline = await cache.match(OFFLINE_URL);
      if (offline) return offline;
    }
    throw err;
  }
}

async function staleWhileRevalidate(request, cors = false) {
  const cache = await caches.open(DATA_CACHE);
  const hit = await cache.match(request.url);
  const fresh = fetch(cors ? new Request(request.url, { mode: "cors" }) : request)
    .then((res) => {
      if (res.ok) cache.put(request.url, res.clone());
      return res;
    })
    .catch(() => hit || Response.error());
  return hit || fresh;
}

async function audioCache(request, url, cors = false) {
  const cache = await caches.open(AUDIO_CACHE);
  const key = url.origin + url.pathname;
  let res = await cache.match(key);
  if (!res) {
    res = await fetch(key, cors ? { mode: "cors" } : undefined);
    if (!res.ok) return res;
    await cache.put(key, res.clone());
  }
  const range = request.headers.get("Range");
  if (!range) return res;
  const buf = await res.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  const start = m && m[1] ? Number(m[1]) : 0;
  const end = m && m[2] ? Math.min(Number(m[2]), buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "audio/mp4",
      "Content-Range": `bytes ${start}-${end}/${buf.byteLength}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}
