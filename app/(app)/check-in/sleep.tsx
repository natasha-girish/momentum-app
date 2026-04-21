import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CheckInStepWrapper } from '@/components/check-in/step-wrapper';
import { ThemedText } from '@/components/theme/themed-text';
import { useRouter } from 'expo-router';
import { useCheckInForm } from '@/lib/context/check-in-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Spacing } from '@/constants/sizes';

export default function SleepStep() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { formData, updateFormData } = useCheckInForm();

  const hours = Math.floor(formData.sleepHours);
  const minutes = Math.round((formData.sleepHours - hours) * 60);

  const getSleepQuality = () => {
    if (formData.sleepHours >= 7.5) return 'Solid Night';
    if (formData.sleepHours >= 6) return 'Good';
    return 'Short';
  };

  const styles = StyleSheet.create({
    sleepCard: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.md,
      width: '100%',
    },
    sleepDisplay: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.md,
      marginVertical: Spacing.md,
    },
    timeText: {
      fontSize: 64,
      fontFamily: 'Lora',
      fontWeight: '300',
      color: colors.text,
      lineHeight: 72,
    },
    timeUnit: {
      fontSize: 16,
      color: colors.icon,
      marginLeft: Spacing.xs,
      lineHeight: 72,
    },
    sliderContainer: {
      width: '100%',
      gap: Spacing.sm,
      marginVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
    },
    slider: {
      height: 50,
      width: '100%',
    },
    sliderLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.sm,
      width: '100%',
    },
    label: {
      fontSize: 13,
      color: colors.icon,
    },
    badge: {
      backgroundColor: colors.surface2,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: Spacing.sm,
    },
    badgeText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
  });

  return (
    <CheckInStepWrapper
      step={2}
      totalSteps={6}
      stepLabel="STEP 2"
      title="How long did you sleep?"
      subtitle="Rough estimate is fine. We care about the trend, not the minute."
      children={
        <View style={styles.sleepCard}>
          <MaterialIcons name="bed" size={32} color={colors.tint} />

          <View style={styles.sleepDisplay}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
              <ThemedText style={styles.timeText}>{hours}</ThemedText>
              <ThemedText style={styles.timeUnit}>h</ThemedText>
              <ThemedText style={styles.timeText}>{minutes}</ThemedText>
              <ThemedText style={styles.timeUnit}>m</ThemedText>
            </View>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={120}
              step={5}
              value={formData.sleepHours * 10}
              onValueChange={(v) => updateFormData({ sleepHours: v / 10 })}
              minimumTrackTintColor="#3E5C6E"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#3E5C6E"
            />
            <View style={styles.sliderLabels}>
              <ThemedText style={styles.label}>0h</ThemedText>
              <ThemedText style={styles.label}>6h</ThemedText>
              <ThemedText style={styles.label}>12h</ThemedText>
            </View>
          </View>

          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>• {getSleepQuality()}</ThemedText>
          </View>
        </View>
      }
      onContinue={() => router.push('/(app)/check-in/energy')}
      continueLabel="Continue"
    />
  );
}
