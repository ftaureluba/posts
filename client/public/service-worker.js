const CACHE_NAME = "Fitness-app-v1"


const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
  //ACA TIENEN QUE IR LAS DEMAS PAGINAS PARA CACHEARLAS 
]


self.addEventListener('install', (event) => {
  event.waitUntill(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response)=>{
      //return cached version OR fetch from network,
      return response || fetch(event.request);
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME){
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
