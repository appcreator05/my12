const CACHE_NAME = 'vdo-sky-cache-v1';
const ASSETS_TO_CACHE = [
  '/', // apnar index page
  '/index.html'
];

// Install: Cache store kora
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
});

// Fetch: Internet na thakle cache theke data show kora
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        // Natun image ba json asle cache e save kora
        if (event.request.url.includes('movies.json') || event.request.destination === 'image') {
          let cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
        }
        return networkResponse;
      });
    }).catch(() => {
      // Internet o nei, cache o nei (Optional)
    })
  );
});