import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="history" />
      <Stack.Screen name="insights" />
      <Stack.Screen name="accounts" />
      <Stack.Screen name="about" />
    </Stack>
  );
}
