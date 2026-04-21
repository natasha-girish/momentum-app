import { View, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/theme/themed-text';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Card } from '@/components/ui/card';
import { Spacing } from '@/constants/sizes';
import { Copy } from '@/constants/copy';
import { useUserProfile } from '@/lib/hooks/use-user-profile';
import { useProfileContext } from '@/lib/context/profile-context';
import { formatGoal } from '@/lib/utils/formatting';

export default function Confirmation() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { createProfile } = useUserProfile();
  const { refetch } = useProfileContext();
  const [loading, setLoading] = useState(false);

  const goal = (params.goal as string) || 'general_fitness';
  const frequency = parseInt(params.frequency as string) || 3;
  const sleep = Math.round(parseFloat(params.sleep as string) || 7);
  const unit = (params.unit as 'lbs' | 'kg') || 'lbs';

  const handleStart = async () => {
    try {
      setLoading(true);
      await createProfile({
        goal: goal as any,
        weeklyWorkoutFrequency: frequency,
        sleepBaseline: sleep,
        weightUnit: unit,
        notificationTime: '08:00',
        notificationEnabled: true,
      });

      // Refresh profile context
      await refetch();

      // Navigate to app
      router.replace('/(app)');
    } catch (err) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
      flex: 1,
      justifyContent: 'space-between',
    },
    header: {
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    detailCard: {
      gap: Spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    disclaimer: {
      backgroundColor: '#fef3c7',
      padding: Spacing.lg,
      borderRadius: 8,
      gap: Spacing.md,
    },
    buttons: {
      gap: Spacing.md,
      marginTop: Spacing.lg,
    },
  });

  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText variant="headingM">{Copy.confirmDetails}</ThemedText>
          <ThemedText variant="bodyMedium" color="#666">
            Here's what we'll use to guide you.
          </ThemedText>
        </View>

        <Card style={styles.detailCard} padding="large" shadow="sm">
          <View style={styles.detailRow}>
            <ThemedText weight="semibold">Primary goal</ThemedText>
            <ThemedText>{formatGoal(goal)}</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText weight="semibold">Workout frequency</ThemedText>
            <ThemedText>{frequency}x per week</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText weight="semibold">Sleep baseline</ThemedText>
            <ThemedText>{sleep}h per night</ThemedText>
          </View>

          <View style={[styles.detailRow, styles.lastRow]}>
            <ThemedText weight="semibold">Weight unit</ThemedText>
            <ThemedText>{unit === 'lbs' ? 'Pounds' : 'Kilograms'}</ThemedText>
          </View>
        </Card>

        <View style={styles.disclaimer}>
          <ThemedText weight="semibold" color="#92400e">
            {Copy.disclaimerTitle}
          </ThemedText>
          <ThemedText variant="bodySmall" color="#78350f">
            {Copy.disclaimerText}
          </ThemedText>
        </View>

        <View style={styles.buttons}>
          <Button
            label={Copy.done}
            onPress={handleStart}
            fullWidth
            loading={loading}
          />
          <Button
            label={Copy.back}
            onPress={handleBack}
            variant="text"
            fullWidth
            disabled={loading}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
