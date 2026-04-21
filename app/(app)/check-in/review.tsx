import { View, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/theme/themed-text';
import { Card } from '@/components/ui/card';
import { Spacing } from '@/constants/sizes';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useCheckInForm } from '@/lib/context/check-in-context';
import { useCheckins } from '@/lib/hooks/use-checkins';
import { getTodayISO } from '@/lib/utils/date';

export default function ReviewStep() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { formData } = useCheckInForm();
  const { saveCheckIn } = useCheckins();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      await saveCheckIn({
        date: getTodayISO(),
        weight: formData.weight,
        sleepHours: formData.sleepHours,
        energy: formData.energy,
        soreness: formData.soreness,
        workoutStatus: formData.workoutStatus,
        workoutType: formData.workoutType,
        workoutDuration: formData.workoutDuration,
        workoutIntensity: formData.workoutIntensity,
        workoutNotes: formData.workoutNotes,
      });

      Alert.alert('Success', 'Check-in saved!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(app)'),
        },
      ]);
    } catch (err) {
      console.error('Save check-in error:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to save check-in');
    } finally {
      setSaving(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: Spacing.lg,
      paddingTop: 80,
      paddingBottom: Spacing.lg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.md,
    },
    progressContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: Spacing.sm,
      alignItems: 'center',
    },
    progressBar: {
      flex: 1,
      height: 4,
      backgroundColor: colors.tint,
      borderRadius: 2,
    },
    closeButton: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepCounter: {
      minWidth: 28,
      textAlign: 'right',
      fontSize: 12,
      color: colors.icon,
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
    },
    topSection: {
      gap: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    stepLabel: {
      fontSize: 12,
      color: colors.icon,
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 32,
      fontFamily: 'Lora',
      fontWeight: '400',
      color: colors.text,
      lineHeight: 40,
    },
    subtitle: {
      fontSize: 14,
      color: colors.icon,
      lineHeight: 20,
    },
    cardContent: {
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      padding: Spacing.lg,
      gap: Spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    rowLast: {
      borderBottomWidth: 0,
    },
    label: {
      color: colors.icon,
      fontSize: 14,
    },
    value: {
      fontWeight: '600',
      fontSize: 14,
      color: colors.text,
    },
    footer: {
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.lg,
      gap: Spacing.md,
    },
    saveButton: {
      backgroundColor: colors.tint,
      paddingVertical: Spacing.lg,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    editButton: {
      paddingVertical: Spacing.lg,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.icon,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    editButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
  });

  const workoutLabels = {
    rest_day: 'Rest day',
    completed_workout: 'Completed',
    planned_workout: 'Planned',
  };

  const workoutTypeLabels = {
    strength: 'Strength',
    run: 'Run',
    cycling: 'Cycling',
    hiit: 'HIIT',
    yoga: 'Yoga',
    swim: 'Swim',
    pilates: 'Pilates',
    walk: 'Walk',
    other: 'Other',
  };

  const intensityLabels = {
    easy: 'Easy',
    steady: 'Steady',
    moderate: 'Moderate',
    hard: 'Hard',
    all_out: 'All out',
  };

  const sorenessLabels = {
    none: 'None',
    mild: 'Mild',
    moderate: 'Moderate',
    high: 'High',
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const showWorkoutDetails = formData.workoutStatus === 'completed_workout' || formData.workoutImportedFromAppleWatch;

  const getLastRowStyle = () => {
    if (formData.weight) return undefined;
    return styles.rowLast;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <Pressable
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <ThemedText style={{ fontSize: 24 }}>×</ThemedText>
          </Pressable>
          <View style={styles.progressBar} />
        </View>
        <ThemedText style={styles.stepCounter}>7/7</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <View>
            <ThemedText style={styles.stepLabel}>REVIEW</ThemedText>
            <ThemedText style={styles.title}>Looks great!</ThemedText>
            <ThemedText style={styles.subtitle}>Everything looks good. Save when ready.</ThemedText>
          </View>

          <Card padding="none" style={styles.cardContent}>
            <View style={styles.row}>
              <ThemedText style={styles.label}>Workout</ThemedText>
              <ThemedText style={styles.value}>
                {workoutLabels[formData.workoutStatus]}
              </ThemedText>
            </View>

            {showWorkoutDetails && formData.workoutType && (
              <View style={styles.row}>
                <ThemedText style={styles.label}>Type</ThemedText>
                <ThemedText style={styles.value}>
                  {workoutTypeLabels[formData.workoutType]}
                </ThemedText>
              </View>
            )}

            {showWorkoutDetails && formData.workoutDuration && (
              <View style={styles.row}>
                <ThemedText style={styles.label}>Duration</ThemedText>
                <ThemedText style={styles.value}>
                  {formatDuration(formData.workoutDuration)}
                </ThemedText>
              </View>
            )}

            {showWorkoutDetails && formData.workoutIntensity && (
              <View style={styles.row}>
                <ThemedText style={styles.label}>Intensity</ThemedText>
                <ThemedText style={styles.value}>
                  {intensityLabels[formData.workoutIntensity]}
                </ThemedText>
              </View>
            )}

            <View style={styles.row}>
              <ThemedText style={styles.label}>Sleep</ThemedText>
              <ThemedText style={styles.value}>{formData.sleepHours}h</ThemedText>
            </View>

            <View style={styles.row}>
              <ThemedText style={styles.label}>Energy</ThemedText>
              <ThemedText style={styles.value}>{formData.energy}/5</ThemedText>
            </View>

            <View style={[styles.row, !formData.weight && styles.rowLast]}>
              <ThemedText style={styles.label}>Soreness</ThemedText>
              <ThemedText style={styles.value}>
                {sorenessLabels[formData.soreness]}
              </ThemedText>
            </View>

            {formData.weight && (
              <View style={[styles.row, styles.rowLast]}>
                <ThemedText style={styles.label}>Weight</ThemedText>
                <ThemedText style={styles.value}>{formData.weight} {formData.weight ? 'lbs' : ''}</ThemedText>
              </View>
            )}
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.editButton}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.editButtonText}>Edit</ThemedText>
        </Pressable>
        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          <ThemedText style={styles.buttonText}>
            {saving ? 'Saving...' : 'Save ✓'}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
