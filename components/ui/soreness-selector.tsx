import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../theme/themed-text';
import { Spacing, BorderRadius } from '@/constants/sizes';

interface SorenessOption {
  value: 'none' | 'mild' | 'moderate' | 'high';
  label: string;
  description: string;
  dotColor: string;
}

const OPTIONS: SorenessOption[] = [
  {
    value: 'none',
    label: 'None',
    description: 'Loose and ready',
    dotColor: '#7FA0B3',
  },
  {
    value: 'mild',
    label: 'Mild',
    description: 'Background whisper',
    dotColor: '#7FA0B3',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'I feel yesterday',
    dotColor: '#D9B178',
  },
  {
    value: 'high',
    label: 'High',
    description: 'Ouch on stairs',
    dotColor: '#CE9D8F',
  },
];

interface SorenessSelectorProps {
  value: 'none' | 'mild' | 'moderate' | 'high';
  onValueChange: (value: 'none' | 'mild' | 'moderate' | 'high') => void;
  disabled?: boolean;
}

export function SorenessSelector({
  value,
  onValueChange,
  disabled = false,
}: SorenessSelectorProps) {
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');
  const muted = useThemeColor({}, 'icon');

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
      borderColor: '#E0E0E0',
    },
    dot: {
      width: 16,
      height: 16,
      borderRadius: 8,
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
          <View style={[styles.dot, { backgroundColor: option.dotColor }]} />
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
