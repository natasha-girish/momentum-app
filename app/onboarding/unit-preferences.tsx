import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/theme/themed-text';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Card } from '@/components/ui/card';
import { Spacing, BorderRadius } from '@/constants/sizes';
import { Copy } from '@/constants/copy';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function UnitPreferences() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');
  const tint = useThemeColor({}, 'tint');

  const handleNext = () => {
    router.push({
      pathname: '/onboarding/confirmation',
      params: {
        goal: params.goal,
        frequency: params.frequency,
        sleep: params.sleep,
        unit,
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
    unitButtons: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginTop: Spacing.lg,
    },
    unitButton: {
      flex: 1,
      paddingVertical: Spacing.lg,
      borderRadius: BorderRadius.md,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    unitButtonSelected: {
      borderColor: tint,
      backgroundColor: '#EAF0F3',
    },
    unitButtonUnselected: {
      borderColor: '#E0E0E0',
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
          <ThemedText variant="headingM">{Copy.unitPreferences}</ThemedText>
          <ThemedText variant="bodyMedium" color="#666">
            Choose your preferred unit for weight.
          </ThemedText>
        </View>

        <View style={styles.unitButtons}>
          <Pressable
            onPress={() => setUnit('lbs')}
            style={[
              styles.unitButton,
              unit === 'lbs' ? styles.unitButtonSelected : styles.unitButtonUnselected,
            ]}
            accessible
            accessibilityRole="radio"
            accessibilityState={{ selected: unit === 'lbs' }}
          >
            <ThemedText weight="semibold" variant="headingS" color={unit === 'lbs' ? tint : '#999'}>
              Pounds (lbs)
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => setUnit('kg')}
            style={[
              styles.unitButton,
              unit === 'kg' ? styles.unitButtonSelected : styles.unitButtonUnselected,
            ]}
            accessible
            accessibilityRole="radio"
            accessibilityState={{ selected: unit === 'kg' }}
          >
            <ThemedText weight="semibold" variant="headingS" color={unit === 'kg' ? tint : '#999'}>
              Kilograms (kg)
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.buttons}>
          <Button label={Copy.next} onPress={handleNext} fullWidth />
          <Button label={Copy.skip} onPress={handleSkip} variant="text" fullWidth />
        </View>
      </View>
    </ScreenWrapper>
  );
}
