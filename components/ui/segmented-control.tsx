import { View, Pressable, StyleSheet, ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../theme/themed-text';
import { Spacing, BorderRadius, ComponentSizes } from '@/constants/sizes';

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps extends ViewProps {
  label?: string;
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function SegmentedControl({
  label,
  options,
  selectedValue,
  onValueChange,
  disabled = false,
  style,
  ...props
}: SegmentedControlProps) {
  const tint = useThemeColor({}, 'tint');
  const background = useThemeColor({}, 'background');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.md,
    },
    label: {
      marginBottom: Spacing.sm,
    },
    segmentedControl: {
      flexDirection: 'row',
      backgroundColor: tabIconDefault,
      borderRadius: BorderRadius.md,
      padding: 2,
      gap: 2,
    },
    segment: {
      flex: 1,
      height: ComponentSizes.inputHeight - 8,
      borderRadius: BorderRadius.sm,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
    },
    segmentSelected: {
      backgroundColor: tint,
    },
    segmentText: {
      fontSize: 14,
      fontWeight: '600',
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      {label && (
        <ThemedText weight="semibold" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <View style={styles.segmentedControl}>
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => onValueChange(option.value)}
            disabled={disabled}
            style={[
              styles.segment,
              selectedValue === option.value && styles.segmentSelected,
            ]}
            accessible
            accessibilityRole="radio"
            accessibilityState={{ selected: selectedValue === option.value, disabled }}
            accessibilityLabel={option.label}
          >
            <ThemedText
              style={styles.segmentText}
              color={selectedValue === option.value ? background : tabIconDefault}
            >
              {option.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
