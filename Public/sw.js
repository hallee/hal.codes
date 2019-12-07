const version = "3.0.2";
const cacheName = `hal-codes-${version}`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/styles/style.css`,
        `/styles/0.style.css`,
        `/styles/1.style.css`,
        `/styles/2.style.css`,
        `/styles/3.style.css`,
        `/styles/4.style.css`,
        `/scripts/bundle.js`,
        `/scripts/1.bundle.js`,
        `/scripts/2.bundle.js`,
        `/scripts/3.bundle.js`,
        `/scripts/4.bundle.js`,
        `/scripts/5.bundle.js`,
        `/scripts/6.bundle.js`,
        `/fonts/ibmplexsans-regular.woff2`,
        `/fonts/ibmplexsans-italic.woff2`,
        `/fonts/basiersquare-bold-webfont.woff2`,
        `/fonts/iosevka-brew-regular.woff2`,
        `/images/fail.svg`,
        `/images/reset.svg`,
        `/images/run.svg`,
        `/images/success.svg`,
        `/images/forePhone.png`, `/images/forePhone@2x.png`,
        `/images/objectsPhone.png`, `/images/objectsPhone@2x.png`,
        `/images/objectsPhoneStraight.jpg`, `/images/objectsPhoneStraight@2x.jpg`,
        `/images/relaunchPhone.png`, `/images/relaunchPhone@2x.png`,
        `/images/relaunchPhoneStraight.jpg`, `/images/relaunchPhoneStraight@2x.jpg`,
      ])
      .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('activate', event => {
  // delete all outdated caches
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if(cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method != 'GET') return;
  if (event.request.headers.get('range')) return;

  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request))
      .then(response => {
        return fetch(event.request).catch(function() {
          return response;
        });
      })
  );
});
