import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

async function GetFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old Token\n', fcmToken);
  try {
    if (!fcmToken) {
      let fcmToken = await messaging().getToken();

      if (fcmToken) {
        {
          console.log('FCM Token\n', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    //navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //setLoading(false);
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification in foreground state...', remoteMessage);
  });
};
