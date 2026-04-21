import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CheckInStepWrapper } from '@/components/check-in/step-wrapper';
import { ThemedText } from '@/components/theme/themed-text';
import { useRouter } from 'expo-router';
import { useCheckInForm } from '@/lib/context/check-in-context';
import { useUserProfile } from '@/lib/hooks/use-user-profile';
import { useCheckins } from '@/lib/hooks/use-checkins';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Spacing } from '@/constants/sizes';
import { getDaysAgo } from '@/lib/utils/date';

export default function WeightStep() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { profile } = useUserProfile();
  const { formData, updateFormData } = useCheckInForm();
  const { checkIns } = useCheckins(2);
  const [inputValue, setInputValue] = useState(formData.weight ? String(formData.weight) : '');

  const yesterdayCheckIn = checkIns.find(c => c.date === getDaysAgo(1));
  const yesterdayWeight = yesterdayCheckIn?.weight;

  const styles = StyleSheet.create({
    weightCard: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.lg,
      width: '100%',
    },
    iconContainer: {
      marginBottom: Spacing.sm,
    },
    weightDisplay: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: Spacing.sm,
      height: 90,
      width: '100%',
    },
    input: {
      fontSize: 72,
      fontFamily: 'Lora',
      fontWeight: '300',
      color: colors.text,
      textAlign: 'center',
      padding: 0,
      margin: 0,
      height: 90,
      minWidth: 150,
      flex: 1,
      maxWidth: 200,
    },
    unit: {
      fontSize: 18,
      color: colors.icon,
      marginBottom: Spacing.md,
    },
    yesterday: {
      fontSize: 14,
      color: colors.icon,
      marginTop: Spacing.md,
    },
  });

  return (
    <CheckInStepWrapper
      step={1}
      totalSteps={6}
      stepLabel="STEP 1"
      title="Morning weight?"
      subtitle="Optional. We smooth raw fluctuations into a 7-day trend, so don't worry about a bad reading."
      children={
        <View style={styles.weightCard}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="scale" size={24} color={colors.tint} />
          </View>
          <View style={styles.weightDisplay}>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={(v) => {
                setInputValue(v);
                if (v === '') {
                  updateFormData({ weight: undefined });
                } else if (/^\d+\.?\d*$/.test(v)) {
                  const parsed = parseFloat(v);
                  if (!isNaN(parsed)) {
                    updateFormData({ weight: parsed });
                  }
                }
              }}
              onBlur={() => {
                if (inputValue && !/^\d+\.?\d*$/.test(inputValue)) {
                  setInputValue('');
                  updateFormData({ weight: undefined });
                }
              }}
              placeholder="0"
              placeholderTextColor={colors.icon}
              keyboardType="decimal-pad"
              maxLength={8}
            />
            <ThemedText style={styles.unit}>{profile?.weightUnit}</ThemedText>
          </View>
          {yesterdayWeight && (
            <ThemedText style={styles.yesterday}>
              Yesterday: {yesterdayWeight} {profile?.weightUnit}
            </ThemedText>
          )}
        </View>
      }
      onContinue={() => router.push('/(app)/check-in/sleep')}
      onSkip={() => router.push('/(app)/check-in/sleep')}
      continueLabel="Continue"
      showSkip={true}
    />
  );
}
