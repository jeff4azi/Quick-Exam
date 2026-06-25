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

self.skipWaiting()
self.addEventListener('activate', () => self.clients.claim())
