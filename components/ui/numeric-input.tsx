import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../theme/themed-text';
import { Spacing, ComponentSizes, BorderRadius } from '@/constants/sizes';

interface NumericInputProps {
  label: string;
  value: string | number;
  onChangeText: (value: string) => void;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  allowDecimal?: boolean;
}

export function NumericInput({
  label,
  value,
  onChangeText,
  placeholder,
  unit = '',
  min,
  max,
  step = 1,
  disabled = false,
  allowDecimal = true,
}: NumericInputProps) {
  const text = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const background = useThemeColor({}, 'background');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');

  const handleIncrement = () => {
    const current = parseFloat(String(value)) || 0;
    const newValue = current + (step || 1);
    if (max === undefined || newValue <= max) {
      onChangeText(allowDecimal ? newValue.toString() : Math.round(newValue).toString());
    }
  };

  const handleDecrement = () => {
    const current = parseFloat(String(value)) || 0;
    const newValue = current - (step || 1);
    if (min === undefined || newValue >= min) {
      onChangeText(allowDecimal ? newValue.toString() : Math.round(newValue).toString());
    }
  };

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.md,
    },
    label: {
      marginBottom: Spacing.sm,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      height: ComponentSizes.inputHeight,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: tabIconDefault,
      paddingHorizontal: Spacing.lg,
      backgroundColor: background,
    },
    button: {
      width: 32,
      height: 32,
      borderRadius: BorderRadius.sm,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tint,
      opacity: 0.1,
    },
    buttonPressed: {
      opacity: 0.2,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      color: text,
      padding: 0,
      textAlign: 'center',
    },
    unit: {
      marginLeft: Spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <ThemedText weight="semibold" style={styles.label}>
        {label}
      </ThemedText>
      <View style={styles.inputContainer}>
        <Pressable
          onPress={handleDecrement}
          disabled={disabled || (min !== undefined && parseFloat(String(value)) <= min)}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <ThemedText>−</ThemedText>
        </Pressable>

        <TextInput
          style={styles.input}
          value={String(value)}
          onChangeText={onChangeText}
          placeholder={placeholder || '0'}
          placeholderTextColor={tabIconDefault}
          keyboardType={allowDecimal ? 'decimal-pad' : 'number-pad'}
          editable={!disabled}
          selectTextOnFocus
          maxLength={6}
        />

        {unit && (
          <ThemedText style={styles.unit} color={tabIconDefault}>
            {unit}
          </ThemedText>
        )}

        <Pressable
          onPress={handleIncrement}
          disabled={disabled || (max !== undefined && parseFloat(String(value)) >= max)}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <ThemedText>+</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
