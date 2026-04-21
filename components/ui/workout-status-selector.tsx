import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../theme/themed-text';
import { Spacing, BorderRadius } from '@/constants/sizes';

interface WorkoutStatusOption {
  value: 'rest_day' | 'completed_workout' | 'planned_workout';
  label: string;
  description: string;
  icon: string;
}

const OPTIONS: WorkoutStatusOption[] = [
  {
    value: 'rest_day',
    label: 'Rest day',
    description: 'Nothing planned',
    icon: 'nights-stay',
  },
  {
    value: 'completed_workout',
    label: 'Workout done',
    description: 'Already trained today — log it',
    icon: 'check-circle',
  },
  {
    value: 'planned_workout',
    label: 'Workout planned',
    description: 'Training later today',
    icon: 'fitness-center',
  },
];

interface WorkoutStatusSelectorProps {
  value: 'rest_day' | 'completed_workout' | 'planned_workout';
  onValueChange: (
    value: 'rest_day' | 'completed_workout' | 'planned_workout'
  ) => void;
  disabled?: boolean;
}

export function WorkoutStatusSelector({
  value,
  onValueChange,
  disabled = false,
}: WorkoutStatusSelectorProps) {
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');
  const muted = useThemeColor({}, 'icon');
  const background = useThemeColor({}, 'background');

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.md,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: surface,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
      gap: Spacing.lg,
      width: '100%',
    },
    optionSelected: {
      backgroundColor: '#EAF0F3',
      borderColor: tint,
      borderWidth: 2,
    },
    iconWrapper: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      gap: Spacing.xs,
    },
    label: {
      fontWeight: '600',
      fontSize: 16,
    },
    description: {
      fontSize: 14,
      color: muted,
    },
    checkmark: {
      marginLeft: 'auto',
    },
  });

  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => onValueChange(option.value)}
          disabled={disabled}
          style={[
            styles.option,
            value === option.value && styles.optionSelected,
          ]}
          accessible
          accessibilityRole="radio"
          accessibilityState={{ selected: value === option.value, disabled }}
          accessibilityLabel={`${option.label}, ${option.description}`}
        >
          <View style={styles.iconWrapper}>
            <MaterialIcons
              name={option.icon}
              size={24}
              color={value === option.value ? tint : muted}
            />
          </View>
          <View style={styles.content}>
            <ThemedText style={styles.label}>{option.label}</ThemedText>
            <ThemedText style={styles.description}>
              {option.description}
            </ThemedText>
          </View>
          {value === option.value && (
            <MaterialIcons
              name="check"
              size={24}
              color={tint}
              style={styles.checkmark}
            />
          )}
        </Pressable>
      ))}
    </View>
  );
}
