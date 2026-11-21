const CACHE='kalorio-v7';
const ASSETS=['./','./index.html','./styles.css?v=5','./app.js?v=6','./firebase-config.js?v=5','./manifest.webmanifest?v=3','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png?v=2'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method==='GET')e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./'))))});
