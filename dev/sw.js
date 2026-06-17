const CACHE = "workout-tracker-0.5.9";
const APP_FILES = ['./', './index.html', './style.css', './app.js', './manifest.json'];

// On install — cache core files and immediately activate (skipWaiting)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

// On activate — remove all old caches and claim all clients immediately
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Message handler: app sends SKIP_WAITING to force new SW to take over
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch strategy:
//   - App shell files (html/js/css): Network-first with cache fallback
//   - version.json: Always network (never cache)
//   - Everything else: Cache-first with network fallback
self.addEventListener('fetch', e => {
  var url = e.request.url;

  // Never cache version.json — always check network
  if (url.includes('version.json')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Network-first for the app shell
  var isAppShell = APP_FILES.some(f => url.endsWith(f) || url.endsWith('/'));
  if (isAppShell) {
    e.respondWith(
      fetch(e.request)
        .then(networkRes => {
          if (networkRes && networkRes.status === 200) {
            var clone = networkRes.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return networkRes;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for everything else (icons, fonts, etc.)
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(networkRes => {
        if (networkRes && networkRes.status === 200) {
          var clone = networkRes.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return networkRes;
      });
    })
  );
});
