import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../theme/themed-text';
import { Spacing } from '@/constants/sizes';

interface SliderInputProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  showValue?: boolean;
  disabled?: boolean;
}

export function SliderInput({
  label,
  value,
  onValueChange,
  min,
  max,
  step = 1,
  unit = '',
  showValue = true,
  disabled = false,
}: SliderInputProps) {
  const tint = useThemeColor({}, 'tint');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    slider: {
      height: 40,
      borderRadius: 20,
      overflow: 'hidden',
    },
  });

  // Use integer math to avoid precision issues with decimal steps
  const multiplier = step < 1 ? 10 : 1;
  const intMin = Math.round(min * multiplier);
  const intMax = Math.round(max * multiplier);
  const intValue = Math.round(value * multiplier);
  const intStep = Math.round(step * multiplier);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText weight="semibold">{label}</ThemedText>
        {showValue && (
          <ThemedText type="default-bold">
            {value.toFixed(step < 1 ? 1 : 0)} {unit}
          </ThemedText>
        )}
      </View>
      <View style={styles.slider}>
        <Slider
          style={{ flex: 1 }}
          minimumValue={intMin}
          maximumValue={intMax}
          step={intStep}
          value={intValue}
          onValueChange={(v) => onValueChange(v / multiplier)}
          minimumTrackTintColor={tint}
          maximumTrackTintColor={tabIconDefault}
          thumbTintColor={tint}
          disabled={disabled}
          accessible
          accessibilityLabel={label}
          accessibilityValue={{ min, max, now: value, text: `${value} ${unit}` }}
        />
      </View>
    </View>
  );
}
