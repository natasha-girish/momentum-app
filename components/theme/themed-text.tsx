import { Text, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Typography } from '@/constants/typography';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'subtitle' | 'default-bold' | 'default-semibold';
  variant?: keyof typeof Typography;
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  variant,
  weight,
  color,
  ...rest
}: ThemedTextProps) {
  const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const textColor = color || themeColor;

  // Map type to variant
  const variantMap: Record<string, keyof typeof Typography> = {
    title: 'headingL',
    subtitle: 'headingS',
    'default-bold': 'bodyMedium',
    'default-semibold': 'bodyMedium',
    default: 'body',
  };

  const selectedVariant = variant || variantMap[type];
  const baseStyle = Typography[selectedVariant];

  // Override weight if specified
  const fontWeightMap = {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  };

  const selectedWeight = weight ? fontWeightMap[weight] : baseStyle.fontWeight;

  return (
    <Text
      style={[
        baseStyle,
        { color: textColor, fontWeight: selectedWeight },
        style,
      ]}
      {...rest}
    />
  );
}
