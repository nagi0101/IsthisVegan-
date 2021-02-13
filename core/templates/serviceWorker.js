if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker.getRegistrations().then(function (registrations) {
  //     for (let registration of registrations) {
  //       registration.unregister();
  //     }
  //   });
  navigator.serviceWorker
    .register("/serviceWorker.js", { scope: "/" })
    .then((reg) => {
      console.log("Registration successful", reg);
    })
    .catch((e) =>
      console.error("Error during service worker registration:", e)
    );
} else {
  console.warn("Service Worker is not supported");
}

const STATIC_CACHE_NAME = "static-cache";
const STATIC_ASSETS = [
  "/",
  "/static/css/layout.css",
  "/static/css/reset.css",
  "/static/css/scrollbar.css",
];

const OFFLINE_CACHE_NAME = "offline-cache";
const OFFLINE_URL = "/offline";
const OFFLINE_ASSETS = ["/offline"];

self.addEventListener("install", async (event) => {
  /* static */
  const staticCache = await caches.open(STATIC_CACHE_NAME);
  staticCache.addAll(STATIC_ASSETS); 

  /* offline */
  const offlineCache = await caches.open(OFFLINE_CACHE_NAME);
  offlineCache.addAll(OFFLINE_ASSETS);
});

async function cacheFirst(req) {
  const cachedResponse = caches.match(req);
  return cachedResponse || fetch(req);
}

async function networkFirst(req) {
  {% comment %} const cache = await caches.open("dynamic-cache"); {% endcomment %}

  try {
    const res = await fetch(req);
    {% comment %} cache.put(req, res.clone()); {% endcomment %}
    return res;
  } catch (error) {
    const cache = await caches.open(OFFLINE_CACHE_NAME);
    const cachedResponse = await cache.match(OFFLINE_URL);
    return cachedResponse;
  }
}

self.addEventListener("fetch", async (event) => {
  const req = event.request;
  const url = new URL(req.url);

  try {
    if (url.origin === location.url) {
      event.respondWith(cacheFirst(req));
    } else {
      event.respondWith(networkFirst(req));
    }
  } catch (error) {
    // catch is only triggered if an exception is thrown, which is likely
    // due to a network error.
    // If fetch() returns a valid HTTP response with a response code in
    // the 4xx or 5xx range, the catch() will NOT be called.
    console.log("Fetch failed; returning offline page instead.", error);

    const cache = await caches.open(OFFLINE_CACHE_NAME);
    const cachedResponse = await cache.match(OFFLINE_URL);
    return cachedResponse;
  }
});
