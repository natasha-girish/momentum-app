import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="goal-select" />
      <Stack.Screen name="workout-frequency" />
      <Stack.Screen name="sleep-baseline" />
      <Stack.Screen name="unit-preferences" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
}
