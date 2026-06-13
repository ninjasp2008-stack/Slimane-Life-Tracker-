const cacheName = 'v1';
const cacheAssets = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'images/icon-192.png',
  'images/icon-512.png'
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching Files...');
      return cache.addAll(cacheAssets);
    }).then(() => self.skipWaiting())
  );
});

// تشغيل الـ Service Worker وحذف الكاش القديم
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Clearing Old Cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// جلب الملفات من الكاش في حالة الـ Offline
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});