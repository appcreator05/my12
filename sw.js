const CACHE_NAME = 'vdo-sky-cache-v1';
// আপনার সিনেমার ডেটা এবং প্রয়োজনীয় ফাইলগুলো এখানে দিন
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  'https://raw.githubusercontent.com/appcreator05/my12/main/movies.json' 
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        let cacheCopy = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
        return networkResponse;
      });
    }).catch(() => {
        // এখানে অফলাইন fallback হিসেবে একটি ছোট ইমেজ বা টেক্সট দিতে পারেন
    })
  );
});
