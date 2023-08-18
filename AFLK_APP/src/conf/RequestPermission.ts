import messaging from '@react-native-firebase/messaging';

export const RequestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if(enabled) {
    await messaging()
      .getToken()
      .then(fcmToken => {
        console.log(fcmToken)
      })
      .catch(e => console.log('error'))
  }
}