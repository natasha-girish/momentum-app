import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/theme/themed-text';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Card } from '@/components/ui/card';
import { Spacing, BorderRadius } from '@/constants/sizes';
import { Copy } from '@/constants/copy';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useState } from 'react';

const GOALS = [
  { value: 'fat_loss', label: 'Fat loss', description: 'Lose weight and reduce body fat' },
  { value: 'muscle_gain', label: 'Muscle gain', description: 'Build strength and muscle' },
  { value: 'maintenance', label: 'Maintenance', description: 'Maintain current fitness level' },
  { value: 'endurance', label: 'Endurance', description: 'Build stamina and cardio' },
  { value: 'general_fitness', label: 'General fitness', description: 'Overall health and fitness' },
];

export default function GoalSelect() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string>('general_fitness');
  const tint = useThemeColor({}, 'tint');

  const handleNext = () => {
    router.push({
      pathname: '/onboarding/workout-frequency',
      params: { goal: selectedGoal },
    });
  };

  const handleSkip = () => {
    router.push('/(app)');
  };

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    header: {
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    goalCard: {
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.lg,
      borderWidth: 2,
      borderRadius: BorderRadius.md,
      marginBottom: 4,
      backgroundColor: '#FFFFFF',
    },
    goalCardSelected: {
      borderColor: tint,
      backgroundColor: '#EAF0F3',
    },
    goalCardUnselected: {
      borderColor: '#E0E0E0',
    },
    goalLabel: {
      marginBottom: Spacing.xs,
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
          <ThemedText variant="headingM">{Copy.selectGoal}</ThemedText>
        </View>

        {GOALS.map((goal) => {
          const isSelected = selectedGoal === goal.value;
          return (
            <Pressable
              key={goal.value}
              onPress={() => setSelectedGoal(goal.value)}
              accessible
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <Card
                shadow="none"
                style={[
                  styles.goalCard,
                  isSelected ? styles.goalCardSelected : styles.goalCardUnselected,
                ]}
              >
                <ThemedText weight="semibold" style={styles.goalLabel} color={tint}>
                  {goal.label}
                </ThemedText>
                <ThemedText variant="bodySmall" color={isSelected ? '#666' : '#999'}>
                  {goal.description}
                </ThemedText>
              </Card>
            </Pressable>
          );
        })}

        <View style={styles.buttons}>
          <Button label={Copy.next} onPress={handleNext} fullWidth />
          <Button label={Copy.skip} onPress={handleSkip} variant="text" fullWidth />
        </View>
      </View>
    </ScreenWrapper>
  );
}
