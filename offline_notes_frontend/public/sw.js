self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache").then((cache) => {
      return cache.addAll(["/", "/index.html"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // ❌ Ignore backend API calls
  if (url.pathname.startsWith("/share")) {
    return;
  }

  // Only handle GET requests for static assets
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
