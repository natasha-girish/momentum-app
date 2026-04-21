import { Stack } from 'expo-router';

export default function CheckInLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="weight" />
      <Stack.Screen name="sleep" />
      <Stack.Screen name="energy" />
      <Stack.Screen name="soreness" />
      <Stack.Screen name="workout" />
      <Stack.Screen name="workout-details" />
      <Stack.Screen name="review" />
    </Stack>
  );
}
