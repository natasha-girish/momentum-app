import { View, ViewProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius, Shadows } from '@/constants/sizes';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'small' | 'medium' | 'large';
  rounded?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({
  children,
  shadow = 'md',
  padding = 'medium',
  rounded = 'medium',
  style,
  ...props
}: CardProps) {
  const backgroundColor = useThemeColor({}, 'background');

  const paddingMap = {
    none: 0,
    small: Spacing.md,
    medium: Spacing.lg,
    large: Spacing.xl,
  };

  const radiusMap = {
    none: BorderRadius.none,
    small: BorderRadius.sm,
    medium: BorderRadius.md,
    large: BorderRadius.lg,
  };

  const shadowMap = {
    none: Shadows.none,
    sm: Shadows.sm,
    md: Shadows.md,
    lg: Shadows.lg,
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor,
      borderRadius: radiusMap[rounded],
      padding: paddingMap[padding],
      ...shadowMap[shadow],
    },
  });

  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}
