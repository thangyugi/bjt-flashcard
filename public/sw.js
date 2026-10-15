/* Service worker của BJT Flashcard — cho phép cài app (PWA) và học khi mất mạng.
 *
 * - Tài nguyên tĩnh có hash (/_next/static, icon): lấy từ cache trước.
 * - Trang HTML & dữ liệu RSC: lấy mạng trước, lưu bản mới vào cache; mất mạng thì dùng bản đã lưu,
 *   chưa từng mở thì hiện trang /offline.
 * - File dữ liệu khác (json…): dùng bản cache ngay, đồng thời cập nhật ngầm.
 * Đổi VERSION khi cần xóa sạch cache cũ.
 */
const VERSION = "v1";
const STATIC_CACHE = `bjt-static-${VERSION}`;
const PAGE_CACHE = `bjt-pages-${VERSION}`;
const DATA_CACHE = `bjt-data-${VERSION}`;
const OFFLINE_URL = "/offline";
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
  const keep = [STATIC_CACHE, PAGE_CACHE, DATA_CACHE];
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
  if (url.origin !== self.location.origin) return;
  if (url.pathname === "/sw.js") return;

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

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DATA_CACHE);
  const hit = await cache.match(request);
  const fresh = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => hit || Response.error());
  return hit || fresh;
}
