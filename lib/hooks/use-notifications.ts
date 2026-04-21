import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import {
  getNotificationPermissionStatus,
  requestNotificationPermission,
  scheduleCheckInReminder,
  cancelAllNotifications,
  cancelNotification,
} from '../utils/notification-handler';

export function useNotifications() {
  const [permissionStatus, setPermissionStatus] = useState<string>('undetermined');
  const [notificationId, setNotificationId] = useState<string | null>(null);

  useEffect(() => {
    checkPermission();
    setupListeners();
  }, []);

  async function checkPermission() {
    try {
      const status = await getNotificationPermissionStatus();
      setPermissionStatus(status);
    } catch (err) {
      console.error('Error checking notification permission:', err);
    }
  }

  async function requestPermission() {
    try {
      const granted = await requestNotificationPermission();
      const status = granted ? 'granted' : 'denied';
      setPermissionStatus(status);
      return granted;
    } catch (err) {
      console.error('Error requesting notification permission:', err);
      return false;
    }
  }

  async function scheduleCheckIn(timeHHmm: string, recommendation?: 'push' | 'maintain' | 'recover') {
    try {
      // Request permission first if needed
      if (permissionStatus !== 'granted') {
        const granted = await requestPermission();
        if (!granted) {
          throw new Error('Notification permission denied');
        }
      }

      // Cancel existing notification
      if (notificationId) {
        await cancelNotification(notificationId);
      }

      // Schedule new one
      const id = await scheduleCheckInReminder(timeHHmm, recommendation);
      setNotificationId(id);
      return id;
    } catch (err) {
      console.error('Error scheduling check-in reminder:', err);
      throw err;
    }
  }

  async function cancelAll() {
    try {
      await cancelAllNotifications();
      setNotificationId(null);
    } catch (err) {
      console.error('Error canceling notifications:', err);
      throw err;
    }
  }

  function setupListeners() {
    // Handle notification tap when app is in background/closed
    const subscription = Notifications.addNotificationResponseListener((response) => {
      console.log('User tapped notification:', response);
      // Could navigate to check-in screen here
    });

    return () => {
      subscription.remove();
    };
  }

  return {
    permissionStatus,
    checkPermission,
    requestPermission,
    scheduleCheckIn,
    cancelAll,
  };
}
