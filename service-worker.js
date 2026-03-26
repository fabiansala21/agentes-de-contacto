
const CACHE = 'agenda-v1';

const ARCHIVOS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE)
      .then(cache => {
        console.log('📦 Guardando archivos...');
        return cache.addAll(ARCHIVOS);
      })
  );
});


self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(nombres =>
        Promise.all(
          nombres
            .filter(n => n !== CACHE)
            .map(n    => caches.delete(n))
        )
      )
  );
});



self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request)
      .then(respuesta => respuesta || fetch(evento.request))
  );
});
