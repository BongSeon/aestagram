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
  import { NetworkFirst } from 'workbox-strategies'
  import { ExpirationPlugin } from 'workbox-expiration'
  import { CacheableResponsePlugin } from 'workbox-cacheable-response'
  import { Queue } from 'workbox-background-sync'

/*
  config
*/
  // disable workbox logs
  self.__WB_DISABLE_DEV_LOGS = false

  precacheAndRoute(self.__WB_MANIFEST) // Use with precache injection
  
  // Background sync is natively supported.
  let backgroundSyncSupported = 'sync' in self.registration ? true : false

/*
  queue - createPost
  큐(createPostQueue)에 저장된 request를 수행하는 부분 
  성공시에 offline post의 스타일이 제거될 수 있도록 
  client 측에도 message를 보내준다.
*/
  let createPostQueue = null
  if (backgroundSyncSupported) {
    createPostQueue = new Queue('createPostQueue', {
      onSync: async ({queue}) => {
        console.log('onSync start!');
        let entry;
        while (entry = await queue.shiftRequest()) {
          try {
            await fetch(entry.request);
            console.log('Replay successful for request', entry.request);

            // send message from service worker 메시지 보내는 부분
            const channel = new BroadcastChannel('sw-messages')
            channel.postMessage({ msg: 'offline-post-uploaded' })
          } catch (error) {
            console.error('Replay failed for request', entry.request, error);
    
            // Put the entry back in the queue and re-throw the error:
            await queue.unshiftRequest(entry);
            throw error;
          }
        }
        console.log('Replay complete!');
      }
    });
  }

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
  
  // 3. 나머지는 StaleWhileRevalidate 정책 적용 
  registerRoute (
    ({url}) => url.href.startsWith('http'),
    new StaleWhileRevalidate()
  )

/*
  events -fetch
*/
  if (backgroundSyncSupported) {
    self.addEventListener('fetch', (event) => {
      if (event.request.method !== 'POST') {
        console.log('it is not post');
        return;
      }
      
      console.log('url: ', event.request.url);
      if (event.request.url.endsWith('/createPost')) {
        const promiseChain = fetch(event.request.clone()).catch((err) => {
          return createPostQueue.pushRequest({request: event.request})
        })
  
        event.waitUntil(promiseChain)
      }
    })
  }