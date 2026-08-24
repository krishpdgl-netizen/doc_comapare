const CACHE='diffiq-v3.1.0';
const APP_SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-192-maskable.png','./icon-512.png','./icon-512-maskable.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin===self.location.origin){
    if(event.request.mode==='navigate'){
      event.respondWith(fetch(event.request).then(res=>{const clone=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',clone));return res;}).catch(()=>caches.match('./index.html')));
      return;
    }
    event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(res=>{if(res.ok){const clone=res.clone();caches.open(CACHE).then(c=>c.put(event.request,clone));}return res;})));
    return;
  }
  // Runtime-cache third-party parsers after their first successful load.
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(res=>{if(res&&res.ok){const clone=res.clone();caches.open(CACHE).then(c=>c.put(event.request,clone));}return res;})));
});
