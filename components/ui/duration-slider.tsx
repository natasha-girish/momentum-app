import { View, StyleSheet } from 'react-native';
import RNSlider from '@react-native-community/slider';
import { useThemeColor } from '@/hooks/use-theme-color';

interface DurationSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function Slider({
  value,
  onValueChange,
  min = 5,
  max = 180,
  step = 5,
}: DurationSliderProps) {
  const tint = useThemeColor({}, 'tint');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');

  const styles = StyleSheet.create({
    container: {
      height: 40,
    },
  });

  return (
    <View style={styles.container}>
      <RNSlider
        style={{ flex: 1 }}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={tint}
        maximumTrackTintColor={tabIconDefault}
        thumbTintColor={tint}
      />
    </View>
  );
}
