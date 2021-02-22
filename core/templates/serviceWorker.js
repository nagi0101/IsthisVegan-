// pwa
const STATIC_CACHE_NAME = "static-cache-v1";
const STATIC_ASSETS = [
  "core/offline/",
  "static/css/reset.css",
  "static/css/layout.css",
  "static/css/offline.css",
  "static/img/back1.jpg",
  "static/img/back2.jpg",
  "static/img/back3.jpg",
  "static/img/back4.jpg",
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
        .then((cache) => cache.match("core/offline/"));
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

// firebase
// 포그라운드 메시지 수신 설정
self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification.data);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow)
          return clients.openWindow(event.notification.data);
      })
  );
});
