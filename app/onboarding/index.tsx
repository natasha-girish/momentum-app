import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/theme/themed-text';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { WorkoutIllustration } from '@/components/onboarding/workout-illustration';
import { Spacing } from '@/constants/sizes';
import { Copy } from '@/constants/copy';

export default function Welcome() {
  const router = useRouter();

  return (
    <ScreenWrapper padding="large" scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText variant="headingXL">{Copy.welcome}</ThemedText>
          <ThemedText variant="bodyMedium" color="#666">
            {Copy.onboardingSubtitle}
          </ThemedText>
        </View>

        <WorkoutIllustration />

        <View style={styles.content}>
          <ThemedText variant="body" color="#666">
            Know whether to push, maintain, or recover on any given day.
          </ThemedText>
          <ThemedText variant="body" color="#666">
            We combine your workout history, sleep, energy, and recovery signals into one daily recommendation.
          </ThemedText>
        </View>

        <View style={styles.buttons}>
          <Button
            label={Copy.continue}
            onPress={() => router.push('/onboarding/goal-select')}
            fullWidth
          />
          <Button
            label={Copy.skip}
            onPress={() => router.replace('/(app)')}
            variant="text"
            fullWidth
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
  },
  header: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  content: {
    gap: Spacing.lg,
    marginVertical: Spacing.lg,
  },
  buttons: {
    gap: Spacing.md,
  },
});
