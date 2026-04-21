import { View, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { CheckInStepWrapper } from '@/components/check-in/step-wrapper';
import { useRouter } from 'expo-router';
import { useCheckInForm } from '@/lib/context/check-in-context';
import { WorkoutTypeSelector } from '@/components/ui/workout-type-selector';
import { Slider } from '@/components/ui/duration-slider';
import { IntensitySelector } from '@/components/ui/intensity-selector';
import { ThemedText } from '@/components/theme/themed-text';
import { Spacing, BorderRadius } from '@/constants/sizes';
import { useThemeColor } from '@/hooks/use-theme-color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';

export default function WorkoutDetailsStep() {
  const router = useRouter();
  const { formData, updateFormData } = useCheckInForm();
  const textColor = useThemeColor({}, 'text');
  const muted = useThemeColor({}, 'icon');
  const tint = useThemeColor({}, 'tint');
  const [imported, setImported] = useState(false);
  const [importedData, setImportedData] = useState<{
    type: string;
    duration: number;
    intensity: string;
  } | null>(null);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const handleImportFromAppleWatch = () => {
    // Mock data - simulating Apple Watch import
    const mockData = {
      type: 'strength',
      duration: 47,
      intensity: 'moderate',
    };

    setImported(true);
    setImportedData(mockData);
    updateFormData({
      workoutType: mockData.type as any,
      workoutDuration: mockData.duration,
      workoutIntensity: mockData.intensity as any,
      workoutImportedFromAppleWatch: true,
    });
  };

  const styles = StyleSheet.create({
    scrollContent: {
      gap: 0,
      paddingBottom: Spacing.xl,
      width: '100%',
    },
    section: {
      gap: Spacing.xs,
    },
    typeSection: {
      gap: Spacing.xs,
      marginBottom: -24,
    },
    durationSection: {
      gap: Spacing.xs,
      marginBottom: Spacing.lg,
    },
    intensitySection: {
      gap: Spacing.xs,
      marginBottom: Spacing.lg,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'uppercase',
      color: muted,
    },
    durationContainer: {
      gap: Spacing.md,
    },
    durationValue: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'right',
      marginBottom: Spacing.md,
    },
    durationLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.sm,
    },
    durationLabel: {
      fontSize: 12,
      color: muted,
    },
    notesInput: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      marginTop: Spacing.sm,
      color: textColor,
      minHeight: 80,
      fontFamily: 'System',
      fontSize: 14,
    },
    notesLabel: {
      fontSize: 12,
      color: muted,
    },
    importButton: {
      backgroundColor: '#2C3E50',
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    importButtonImported: {
      backgroundColor: '#8FA68E',
    },
    importButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
      flex: 1,
    },
    importArrow: {
      color: '#FFFFFF',
    },
  });

  return (
    <CheckInStepWrapper
      step={6}
      totalSteps={7}
      stepLabel="STEP 6"
      title="What'd you do?"
      subtitle="Log the session by hand, or pull the details from a connected device."
      beforeCard={
        <Pressable
          style={[styles.importButton, imported && styles.importButtonImported]}
          onPress={handleImportFromAppleWatch}
          disabled={imported}
        >
          <MaterialIcons name="apple" size={20} color="#FFFFFF" />
          <ThemedText style={styles.importButtonText}>
            {imported && importedData
              ? `${importedData.type.charAt(0).toUpperCase() + importedData.type.slice(1)} training ${formatDuration(importedData.duration)}`
              : 'Import from Apple Watch'}
          </ThemedText>
          {imported ? (
            <MaterialIcons name="check" size={20} style={styles.importArrow} />
          ) : (
            <MaterialIcons name="chevron-right" size={20} style={styles.importArrow} />
          )}
        </Pressable>
      }
      children={
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} scrollEnabled={true}>
          <View style={styles.scrollContent}>
            {/* Workout Type */}
            <View style={styles.typeSection}>
              <ThemedText style={styles.sectionLabel}>Type</ThemedText>
              <WorkoutTypeSelector
                value={formData.workoutType}
                onValueChange={(type) =>
                  updateFormData({ workoutType: type })
                }
              />
            </View>

            {/* Duration */}
            <View style={styles.durationSection}>
              <ThemedText style={styles.sectionLabel}>Duration</ThemedText>
              <ThemedText style={styles.durationValue}>
                {formatDuration(formData.workoutDuration || 45)}
              </ThemedText>
              <View style={styles.durationContainer}>
                <Slider
                  value={formData.workoutDuration || 45}
                  onValueChange={(duration) =>
                    updateFormData({ workoutDuration: duration })
                  }
                  min={5}
                  max={180}
                  step={5}
                />
                <View style={styles.durationLabels}>
                  <ThemedText style={styles.durationLabel}>5m</ThemedText>
                  <ThemedText style={styles.durationLabel}>90m</ThemedText>
                  <ThemedText style={styles.durationLabel}>3h</ThemedText>
                </View>
              </View>
            </View>

            {/* Perceived Intensity */}
            <View style={styles.intensitySection}>
              <ThemedText style={styles.sectionLabel}>
                Perceived intensity
              </ThemedText>
              <IntensitySelector
                value={formData.workoutIntensity}
                onValueChange={(intensity) =>
                  updateFormData({ workoutIntensity: intensity })
                }
              />
            </View>

            {/* Notes */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel}>
                Notes <ThemedText style={styles.notesLabel}>(optional)</ThemedText>
              </ThemedText>
              <TextInput
                style={styles.notesInput}
                placeholder="Add any notes about your workout..."
                placeholderTextColor={muted}
                value={formData.workoutNotes || ''}
                onChangeText={(notes) =>
                  updateFormData({ workoutNotes: notes })
                }
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>
      }
      onContinue={() => router.push('/(app)/check-in/review')}
      continueLabel="Continue"
    />
  );
}
