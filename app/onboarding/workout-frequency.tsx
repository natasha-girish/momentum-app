import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/theme/themed-text';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { SliderInput } from '@/components/ui/slider';
import { Spacing } from '@/constants/sizes';
import { Copy } from '@/constants/copy';

export default function WorkoutFrequency() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [frequency, setFrequency] = useState(3);

  const handleNext = () => {
    router.push({
      pathname: '/onboarding/sleep-baseline',
      params: {
        goal: params.goal,
        frequency: String(frequency),
      },
    });
  };

  const handleSkip = () => {
    router.push('/(app)');
  };

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
      flex: 1,
      justifyContent: 'space-between',
    },
    header: {
      gap: Spacing.md,
    },
    buttons: {
      gap: Spacing.md,
      marginTop: Spacing.lg,
    },
  });

  return (
    <ScreenWrapper padding="large" scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText variant="headingM">{Copy.workoutFrequency}</ThemedText>
          <ThemedText variant="bodyMedium" color="#666">
            This helps us calibrate your recommendation.
          </ThemedText>
        </View>

        <SliderInput
          label="Days per week"
          value={frequency}
          onValueChange={setFrequency}
          min={1}
          max={7}
          step={1}
          unit="days"
          showValue={true}
        />

        <View style={styles.buttons}>
          <Button label={Copy.next} onPress={handleNext} fullWidth />
          <Button label={Copy.skip} onPress={handleSkip} variant="text" fullWidth />
        </View>
      </View>
    </ScreenWrapper>
  );
}
