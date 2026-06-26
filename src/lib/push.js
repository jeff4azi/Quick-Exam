import { supabase } from '../supabaseClient'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)))
}

export async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Push notifications are not supported in this browser')
  }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    throw new Error('Notification permission denied')
  }

  const registration = await navigator.serviceWorker.ready

  let subscription = await registration.pushManager.getSubscription()
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    })
  }

  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) throw new Error('User not logged in')

  const subJson = subscription.toJSON()

  const { error } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: userData.user.id,
      endpoint: subJson.endpoint,
      p256dh: subJson.keys.p256dh,
      auth: subJson.keys.auth,
    },
    { onConflict: 'endpoint' }
  )

  if (error) throw error
  return subscription
}

export async function isSubscribedToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    
    if (!subscription) {
      return false
    }

    // Check Supabase to make sure the subscription exists there
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      // No user logged in, unsubscribe from browser
      await subscription.unsubscribe()
      return false
    }

    const subJson = subscription.toJSON()
    const { data } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userData.user.id)
      .eq('endpoint', subJson.endpoint)
      .single()

    if (!data) {
      // Subscription exists in browser but not in Supabase — clean it up
      await subscription.unsubscribe()
      return false
    }

    return true
  } catch {
    return false
  }
}

export async function unsubscribeFromPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (subscription) {
      // Delete from Supabase
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        const subJson = subscription.toJSON()
        await supabase.from('push_subscriptions').delete().eq('endpoint', subJson.endpoint)
      }

      // Unsubscribe from push service
      await subscription.unsubscribe()
    }
  } catch (err) {
    console.error('Unsubscribe failed:', err)
  }
}
