import { View, Pressable, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../theme/themed-text';
import { Spacing, BorderRadius } from '@/constants/sizes';

interface IntensityOption {
  value: 'easy' | 'steady' | 'moderate' | 'hard' | 'all_out';
  label: string;
}

const OPTIONS: IntensityOption[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'steady', label: 'Steady' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'hard', label: 'Hard' },
  { value: 'all_out', label: 'All out' },
];

interface IntensitySelectorProps {
  value?: 'easy' | 'steady' | 'moderate' | 'hard' | 'all_out';
  onValueChange: (value: 'easy' | 'steady' | 'moderate' | 'hard' | 'all_out') => void;
}

export function IntensitySelector({
  value,
  onValueChange,
}: IntensitySelectorProps) {
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');
  const muted = useThemeColor({}, 'icon');
  const background = useThemeColor({}, 'background');

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: Spacing.sm,
      flexWrap: 'wrap',
    },
    option: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.md,
      backgroundColor: surface,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    optionSelected: {
      backgroundColor: tint,
      borderColor: tint,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: muted,
    },
    labelSelected: {
      color: '#FFFFFF',
    },
  });

  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => onValueChange(option.value)}
          style={[
            styles.option,
            value === option.value && styles.optionSelected,
          ]}
          accessible
          accessibilityRole="radio"
          accessibilityState={{ selected: value === option.value }}
          accessibilityLabel={option.label}
        >
          <ThemedText
            style={[
              styles.label,
              value === option.value && styles.labelSelected,
            ]}
          >
            {option.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}
