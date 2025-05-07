// actions.ts
'use server'

import webpush from 'web-push'

// Defina a interface para o tipo serializado
interface PushSubscriptionSerialized {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

webpush.setVapidDetails(
  'mailto:seu-email@exemplo.com', // Atualize com seu email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

let subscription: PushSubscriptionSerialized | null = null

export async function subscribeUser(sub: PushSubscriptionSerialized) {
  subscription = sub
  return { success: true }
}
 
export async function unsubscribeUser() {
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}
 
export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }

  try {
    await webpush.sendNotification(
      subscription, // Agora o tipo é compatível
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/assets/favicon/favicon-96x96.png',
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}