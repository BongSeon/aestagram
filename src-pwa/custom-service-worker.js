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
  import { ExpirationPlugin } from 'workbox-expiration'
  import { CacheableResponsePlugin } from 'workbox-cacheable-response'


/*
  config
*/
  precacheAndRoute(self.__WB_MANIFEST) // Use with precache injection

/*
  caching strategies
*/

  // font request 에 대해 CacheFirst 적용 
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

  registerRoute (
    ({url}) => url.href.startsWith('http'),
    new StaleWhileRevalidate()
  )