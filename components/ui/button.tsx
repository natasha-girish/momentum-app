import { Pressable, StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../theme/themed-text';
import { Spacing, ComponentSizes, Shadows, BorderRadius, Duration } from '@/constants/sizes';
import { FontWeights } from '@/constants/typography';
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const tint = useThemeColor({}, 'tint');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const border = useThemeColor({}, 'tabIconDefault');

  const styles = StyleSheet.create({
    button: {
      height:
        size === 'small'
          ? ComponentSizes.buttonHeightSmall
          : size === 'large'
            ? ComponentSizes.buttonHeightLarge
            : ComponentSizes.buttonHeight,
      borderRadius: BorderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      flexDirection: 'row',
      gap: Spacing.md,
      opacity: disabled ? 0.5 : 1,
    },
    primary: {
      backgroundColor: tint,
      ...Shadows.md,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: tint,
    },
    text: {
      backgroundColor: 'transparent',
    },
    pressed: {
      opacity: 0.8,
    },
    container: {
      width: fullWidth ? '100%' : 'auto',
    },
  });

  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.primary : variant === 'secondary' ? styles.secondary : styles.text,
    pressed && !disabled ? styles.pressed : {},
  ];

  const textColor = variant === 'primary' ? background : tint;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={buttonStyle}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        {icon && icon}
        <ThemedText color={textColor} weight="semibold">
          {loading ? '...' : label}
        </ThemedText>
      </Pressable>
    </View>
  );
}
