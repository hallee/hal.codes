const version = "1.0";
const cacheName = `hal-codes-${version}`;

self.addEventListener('install', e => {
  e.waitUntil(
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
        `/scripts/0.bundle.js`,
        `/scripts/1.bundle.js`,
        `/scripts/2.bundle.js`,
        `/scripts/3.bundle.js`,
        `/scripts/4.bundle.js`,
        `/scripts/5.bundle.js`,
        `https://fonts.gstatic.com/s/ibmplexsans/v2/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZJW9XjDg.woff2`,
        `https://fonts.gstatic.com/s/ibmplexsans/v2/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2`,
        `/fonts/basiersquare-bold-webfont.woff2`,
        `/fonts/iosevka-brew-regular.woff2`,
        `/images/fail.svg`,
        `/images/reset.svg`,
        `/images/run.svg`,
        `/images/success.svg`,
        `/images/forePhone.png`, `/images/forePhone@2x.png`,
        `/images/objectsPhone.png`, `/images/objectsPhone@2x.png`,
        `/images/objectsPhoneStraight.png`, `/images/objectsPhoneStraight@2x.png`,
      ])
      .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // service workers are broken on ranged headers (mp4 video for example)
  // https://samdutton.github.io/samples/service-worker/prefetch-video/
  // const range = event.request.headers.get('range');
  // if (range) {
  //   const pos = Number(/^bytes=(\d+)-$/g.exec(range)[1]);
  //   event.respondWith(
  //     caches.open(cacheName)
  //     .then(cache => cache.match(event.request, {ignoreSearch: true}))
  //     .then(response => {
  //       if (!response) {
  //         return fetch(event.request)
  //         .then(response => {

  //           if (response) {
  //             return response.arrayBuffer();
  //           }
  //         });
  //       }
  //       return response.arrayBuffer();
  //     }).then(ab => {
  //       return new Response(
  //         ab.slice(pos),
  //         {
  //           status: 206,
  //           statusText: 'Partial Content',
  //           headers: [
  //             ['Content-Range', 'bytes ' + pos + '-' +
  //               (ab.byteLength - 1) + '/' + ab.byteLength]]
  //         });
  //     }));
  // } else {
    event.respondWith(
      caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then(response => {
        const range = event.request.headers.get('range');
        if (range) {
          const pos = Number(/^bytes=(\d+)-$/g.exec(range)[1]);
          return fetch(event.request)
          .then(response => {
            const ab = response.arrayBuffer();
            if (ab) {
              return new Response(
              ab.slice(pos),
              {
                status: 206,
                statusText: 'Partial Content',
                headers: [
                  ['Content-Range', 'bytes ' + pos + '-' +
                    (ab.byteLength - 1) + '/' + ab.byteLength]]
              });
            }
            return response
          })
          .catch(function() {
            return response
          });
        } else {
          return fetch(event.request).catch(function() {
            return response
          });
        }
      })
    );
  // }
});
