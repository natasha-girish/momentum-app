import * as Notifications from 'expo-notifications';
import { DailyRecommendation } from '../types';

// Set notification handler for when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
    return status === 'granted';
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return false;
  }
}

export async function getNotificationPermissionStatus(): Promise<string> {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  } catch (err) {
    console.error('Error checking notification permission:', err);
    return 'undetermined';
  }
}

export async function scheduleCheckInReminder(
  timeHHmm: string,
  recommendationState?: 'push' | 'maintain' | 'recover'
): Promise<string> {
  try {
    const [hours, minutes] = timeHHmm.split(':').map(Number);

    let body = 'Time for your daily check-in';
    if (recommendationState) {
      const bodyMap = {
        push: 'Your signals look good—time for a push day!',
        maintain: 'Mixed signals today—keep it moderate.',
        recover: 'Recovery day recommended.',
      };
      body = bodyMap[recommendationState];
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Momentum check-in',
        body,
        sound: true,
        badge: 1,
        data: { type: 'checkin_reminder' },
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });

    return notificationId;
  } catch (err) {
    console.error('Error scheduling notification:', err);
    throw err;
  }
}

export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (err) {
    console.error('Error canceling notifications:', err);
    throw err;
  }
}

export async function cancelNotification(notificationId: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (err) {
    console.error('Error canceling notification:', err);
    throw err;
  }
}

export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (err) {
    console.error('Error getting scheduled notifications:', err);
    return [];
  }
}
