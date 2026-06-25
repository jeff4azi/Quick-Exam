import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkOnly, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// Precache manifest - Workbox injects this automatically
precacheAndRoute(self.__WB_MANIFEST)

// Supabase API: network only, never cache
registerRoute(
  /supabase\.co/,
  new NetworkOnly()
)

// Images: cache first
registerRoute(
  /\.(?:png|jpg|jpeg|webp|svg|ico)$/,
  new CacheFirst({
    cacheName: 'quizbolt-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
)

// JS/CSS: stale while revalidate
registerRoute(
  /\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: 'quizbolt-assets',
  })
)

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title || 'Reminder'
  const options = {
    body: data.body || "You haven't taken a test today!",
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    data: { url: data.url || '/' },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      for (const client of clients) {
        if (client.url === url && 'focus' in client) return client.focus()
      }
      return self.clients.openWindow(url)
    })
  )
})

// Activate and claim clients immediately
self.skipWaiting()
self.addEventListener('activate', () => self.clients.claim())
