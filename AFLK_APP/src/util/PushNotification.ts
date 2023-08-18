import notifee from '@notifee/react-native';
export const onDisplayNotification = async ({title = '', body = ''}: {title?: string, body?: string}) => {

  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'kpay',
    name: 'payment_receipt'
  })

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      pressAction: {
        id: 'receipt_open'
      }
    },
  })
}