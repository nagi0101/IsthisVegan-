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

const staticAssets = [
  "/",
  "/static/css/layout.css",
  "/static/css/reset.css",
  "/static/css/scrollbar.css",
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open("static-cache");
  cache.addAll(staticAssets);
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
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === location.url) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkFirst(req));
  }
});
