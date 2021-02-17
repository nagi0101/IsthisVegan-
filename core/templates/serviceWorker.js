// pwa
const STATIC_CACHE_NAME = "static-cache-v1";
const STATIC_ASSETS = [
  "offline/",
  "static/css/reset.css",
  "static/css/layout.css",
  "static/css/offline.css",
  "static/img/back1.png",
  "static/img/back2.png",
  "static/img/back3.png",
  "static/img/back4.png",
];

const OFFLINE_CACHE_NAME = "offline-cache-v1";
const OFFLINE_ASSETS = ["offline/"];

self.addEventListener("install", async (event) => {
  const staticCache = await caches.open(STATIC_CACHE_NAME);
  staticCache.addAll(STATIC_ASSETS);

  //const offlineCache = await caches.open(OFFLINE_CACHE_NAME);
  //offlineCache.addAll(OFFLINE_ASSETS);
});

async function cacheFirst(req) {
  const cachedResponse = caches.match(req);
  return cachedResponse || fetch(req);
}

async function networkFirst(req) {
  const cache = await caches.open("dynamic-cache");

  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    return await cache.match(req);
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") {
    // page navigation 제외
    return;
  }

  /*
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches
        .open(OFFLINE_CACHE_NAME)
        .then((cache) => cache.match("/offline"));
    })
  );
  */

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches
        .open(STATIC_CACHE_NAME)
        .then((cache) => cache.match("offline/"));
    })
  );

  /*
  if (url.origin === location.url) {
    {% comment %} event.respondWith(cacheFirst(req)); {% endcomment %}
  } else {
    {% comment %} event.respondWith(networkFirst(req)); {% endcomment %}
  }
  */
});
