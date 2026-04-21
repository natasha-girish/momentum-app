import { View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '../theme/themed-text';
import { Spacing } from '@/constants/sizes';
import { useThemeColor } from '@/hooks/use-theme-color';

interface FactorRowProps {
  iconName: string;
  label: string;
  value: string;
  signal?: 'good' | 'ok' | 'warn';
  showDivider?: boolean;
}

export function FactorRow({ iconName, label, value, signal = 'ok', showDivider = false }: FactorRowProps) {
  const signalColor = {
    good: '#8FA68E',
    ok: '#3E5C6E',
    warn: '#B47C6E',
  }[signal];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.md,
      gap: Spacing.md,
      borderBottomWidth: showDivider ? 1 : 0,
      borderBottomColor: '#EBE4D9',
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
      flex: 1,
      minHeight: 24,
    },
    iconContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 15,
      lineHeight: 20,
      color: '#1B2830',
      flex: 1,
    },
    value: {
      fontSize: 15,
      fontWeight: '600',
      color: signalColor,
      minWidth: 60,
      textAlign: 'right',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={iconName} size={20} color={signalColor} />
        </View>
        <ThemedText style={styles.label}>{label}</ThemedText>
      </View>
      <ThemedText style={styles.value}>{value}</ThemedText>
    </View>
  );
}
