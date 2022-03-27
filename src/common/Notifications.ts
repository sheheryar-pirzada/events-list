import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }
  scheduleNotification(date, message, sub) {
    PushNotification.localNotificationSchedule({
      channelId: 'events',
      title: 'You have an upcoming event',
      message,
      date: new Date(date),
      bigText: sub,
      subtitle: sub,
    });
  }

  createNotificationChannel() {
    console.log('here');
    PushNotification.createChannel(
      {
        channelId: 'events', // (required)
        channelName: 'Events Channel', // (required)
        channelDescription: 'Events Channel', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
}

export default new Notifications();
