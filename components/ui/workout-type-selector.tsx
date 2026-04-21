import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../theme/themed-text';
import { Spacing, BorderRadius } from '@/constants/sizes';

interface WorkoutType {
  value: 'strength' | 'run' | 'cycling' | 'hiit' | 'yoga' | 'swim' | 'pilates' | 'walk' | 'other';
  label: string;
  icon: string;
}

const WORKOUT_TYPES: WorkoutType[] = [
  { value: 'strength', label: 'Strength', icon: 'fitness-center' },
  { value: 'run', label: 'Run', icon: 'directions-run' },
  { value: 'cycling', label: 'Cycling', icon: 'two-wheeler' },
  { value: 'hiit', label: 'HIIT', icon: 'bolt' },
  { value: 'yoga', label: 'Yoga', icon: 'self-improvement' },
  { value: 'swim', label: 'Swim', icon: 'pool' },
  { value: 'pilates', label: 'Pilates', icon: 'self-improvement' },
  { value: 'walk', label: 'Walk', icon: 'directions-walk' },
  { value: 'other', label: 'Other', icon: 'more-horiz' },
];

interface WorkoutTypeSelectorProps {
  value?: 'strength' | 'run' | 'cycling' | 'hiit' | 'yoga' | 'swim' | 'pilates' | 'walk' | 'other';
  onValueChange: (value: 'strength' | 'run' | 'cycling' | 'hiit' | 'yoga' | 'swim' | 'pilates' | 'walk' | 'other') => void;
}

export function WorkoutTypeSelector({
  value,
  onValueChange,
}: WorkoutTypeSelectorProps) {
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');
  const muted = useThemeColor({}, 'icon');
  const background = useThemeColor({}, 'background');

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.md,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    option: {
      width: '31%',
      aspectRatio: 1,
      borderRadius: BorderRadius.md,
      borderWidth: 2,
      borderColor: '#E0E0E0',
      backgroundColor: surface,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: Spacing.xs,
    },
    optionSelected: {
      backgroundColor: '#EAF0F3',
      borderColor: tint,
    },
    label: {
      fontSize: 11,
      textAlign: 'center',
      fontWeight: '500',
      maxWidth: '90%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {WORKOUT_TYPES.map((type) => (
          <Pressable
            key={type.value}
            onPress={() => onValueChange(type.value)}
            style={[
              styles.option,
              value === type.value && styles.optionSelected,
            ]}
            accessible
            accessibilityRole="radio"
            accessibilityState={{ selected: value === type.value }}
            accessibilityLabel={type.label}
          >
            <MaterialIcons
              name={type.icon}
              size={24}
              color={value === type.value ? tint : muted}
            />
            <ThemedText style={styles.label} numberOfLines={2}>{type.label}</ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
