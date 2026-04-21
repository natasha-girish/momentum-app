import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '../theme/themed-text';
import { Spacing } from '@/constants/sizes';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface EnergyBarSelectorProps {
  value: number;
  onValueChange: (value: number) => void;
}

const LABELS = ['Drained', 'Low', 'OK', 'Good', 'Great'];

export function EnergyBarSelector({
  value,
  onValueChange,
}: EnergyBarSelectorProps) {
  const tint = useThemeColor({}, 'tint');
  const icon = useThemeColor({}, 'icon');
  const background = useThemeColor({}, 'background');

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      gap: Spacing.md,
    },
    barsContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      gap: Spacing.md,
      height: 120,
    },
    barWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '100%',
    },
    bar: {
      width: '100%',
      borderRadius: 8,
      backgroundColor: background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    barSelected: {
      backgroundColor: tint,
    },
    barNumber: {
      fontSize: 16,
      fontWeight: '600',
    },
    barNumberUnselected: {
      color: '#8B7355',
    },
    barNumberSelected: {
      color: '#FFFFFF',
    },
    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 12,
      color: icon,
      flex: 1,
      textAlign: 'center',
    },
  });

  const getBarHeight = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.barsContainer}>
        {[1, 2, 3, 4, 5].map((level) => (
          <Pressable
            key={level}
            style={styles.barWrapper}
            onPress={() => onValueChange(level)}
          >
            <View
              style={[
                styles.bar,
                {
                  height: getBarHeight(level),
                },
                value === level && styles.barSelected,
              ]}
            >
              <ThemedText
                style={[
                  styles.barNumber,
                  value === level
                    ? styles.barNumberSelected
                    : styles.barNumberUnselected,
                ]}
              >
                {level}
              </ThemedText>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.labelsContainer}>
        {LABELS.map((label, idx) => (
          <ThemedText key={idx} style={styles.label}>
            {label}
          </ThemedText>
        ))}
      </View>
    </View>
  );
}
