import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { initWebDemo } from '@/lib/web-init';
import {
  Lora_400Regular,
  Lora_700Bold,
} from '@expo-google-fonts/lora';
import {
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ProfileProvider, useProfileContext } from '@/lib/context/profile-context';
import { CheckInProvider } from '@/lib/context/check-in-context';
import { AuthProvider, useAuth } from '@/lib/context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'onboarding',
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { profile, loading } = useProfileContext();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (profile) {
        router.replace('/(app)');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [profile, loading, isAuthenticated, authLoading]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="login"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="(app)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [dbReady, setDbReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  useEffect(() => {
    async function init() {
      try {
        // Only initialize database on native platforms
        const { Platform } = require('react-native');
        if (Platform.OS === 'web') {
          await initWebDemo();
          setDbReady(true);
          return;
        }

        const { initializeDatabase } = await import('@/lib/db/database');

        const db = await initializeDatabase();
      } catch (err) {
        console.error('Init error:', err);
      } finally {
        setDbReady(true);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (fontsLoaded && dbReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, dbReady]);

  if (!fontsLoaded || !dbReady) {
    return null;
  }

  return (
    <AuthProvider>
      <ProfileProvider>
        <CheckInProvider>
          <RootLayoutContent />
        </CheckInProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
