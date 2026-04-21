// Initialize web demo environment on load
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEMO_PROFILE, initializeDemoData } from './db/seed-data.web';

export async function initWebDemo() {
  if (typeof window === 'undefined') return;

  try {
    // Initialize demo data in localStorage
    initializeDemoData();

    // Set auth credentials
    await AsyncStorage.setItem('auth_user', 'alex');
    await AsyncStorage.setItem('momentum_current_account_id', 'alex');
    await AsyncStorage.setItem('user_profile_alex', JSON.stringify(DEMO_PROFILE));

    console.log('[Web Demo] Initialized with profile:', DEMO_PROFILE);
  } catch (err) {
    console.error('[Web Demo] Init error:', err);
  }
}
