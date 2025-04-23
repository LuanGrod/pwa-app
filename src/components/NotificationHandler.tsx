"use client";

type Props = {}

export default function NotificationHandler({}: Props) {

  const sendNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Título da Notificação', {
            body: 'Conteúdo da notificação.',
            icon: '/icon512.png'
          });
        }
      });
    }
  }

  return (
    <button className="p-2 rounded border hover:cursor-pointer hover:bg-neutral-600 hover:border-neutral-600" onClick={sendNotification}>clique aqui</button>
  )
}