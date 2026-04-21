import { StyleSheet, Platform } from 'react-native';

const headingFont = Platform.select({
  ios: 'Lora',
  android: 'Lora',
  default: 'serif',
  web: "'Lora', Georgia, serif",
});

const bodyFont = Platform.select({
  ios: 'Lato',
  android: 'Lato',
  default: 'sans-serif',
  web: "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
});

export const Typography = StyleSheet.create({
  // Headings (Lora serif)
  headingXL: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 40,
    fontFamily: headingFont,
  },
  headingL: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 34,
    fontFamily: headingFont,
  },
  headingM: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 30,
    fontFamily: headingFont,
  },
  headingS: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 26,
    fontFamily: headingFont,
  },

  // Body (Lato sans)
  body: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 24,
    fontFamily: bodyFont,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 22,
    fontFamily: bodyFont,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.1,
    lineHeight: 20,
    fontFamily: bodyFont,
  },

  // Captions
  caption: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.3,
    lineHeight: 16,
    fontFamily: bodyFont,
  },
  captionMedium: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 18,
    fontFamily: bodyFont,
  },

  // Special
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 20,
    fontFamily: bodyFont,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
    lineHeight: 18,
    fontFamily: bodyFont,
  },
});

// Font weights as named constants
export const FontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;
