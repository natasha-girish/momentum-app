import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/theme/themed-text';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { SliderInput } from '@/components/ui/slider';
import { Spacing } from '@/constants/sizes';
import { Copy } from '@/constants/copy';

export default function SleepBaseline() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [sleep, setSleep] = useState(7);

  const handleNext = () => {
    router.push({
      pathname: '/onboarding/unit-preferences',
      params: {
        goal: params.goal,
        frequency: params.frequency,
        sleep: String(Math.round(sleep)),
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
          <ThemedText variant="headingM">{Copy.sleepBaseline}</ThemedText>
          <ThemedText variant="bodyMedium" color="#666">
            How many hours of sleep do you typically get?
          </ThemedText>
        </View>

        <SliderInput
          label="Sleep hours"
          value={sleep}
          onValueChange={setSleep}
          min={4}
          max={10}
          step={1}
          unit="hours"
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
