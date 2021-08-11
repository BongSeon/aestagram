/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/*
  dependencies
*/
  import { precacheAndRoute } from 'workbox-precaching'
  import { registerRoute } from 'workbox-routing'
  import { StaleWhileRevalidate } from 'workbox-strategies'
  import { CacheFirst } from 'workbox-strategies'
  import { NetworkFirst } from 'workbox-strategies';
  import { ExpirationPlugin } from 'workbox-expiration'
  import { CacheableResponsePlugin } from 'workbox-cacheable-response'


/*
  config
*/
  precacheAndRoute(self.__WB_MANIFEST) // Use with precache injection

/*
  caching strategies
*/

  // 1. CacheFirst : 바뀔일이 거의없는 font request 에 대해 적용
  registerRoute (
    ({url}) => url.host.startsWith('fonts.g'),
    new CacheFirst({
      cacheName: 'google-fonts',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 30,
        }),
        new CacheableResponsePlugin({
          statuses: [0, 200]
        })
      ]
    })
  )

  // 2. NetworkFirst : 항상 최신을 유지해야하는 get posts request 에 대해 적용
  registerRoute(
    ({url}) => url.pathname.startsWith('/posts'),
    new NetworkFirst()
  )

  registerRoute (
    ({url}) => url.href.startsWith('http'),
    new StaleWhileRevalidate()
  )