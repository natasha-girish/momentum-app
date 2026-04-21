// Spacing scale (8px base)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Border radius
export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,  // Momentum design uses 20px for cards
  full: 999,
} as const;

// Component sizes
export const ComponentSizes = {
  // Touch target minimum: 44x44
  buttonHeight: 44,
  buttonHeightSmall: 40,
  buttonHeightLarge: 52,

  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXL: 48,

  // Card heights
  cardMinHeight: 100,
  cardMediumHeight: 150,

  // Input height
  inputHeight: 48,
  inputHeightSmall: 40,

  // Slider height
  sliderHeight: 40,

  // Header height
  headerHeight: 56,
} as const;

// Shadow definitions (iOS style)
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Common layout sizes
export const Layout = {
  screenPadding: 16,
  screenPaddingLarge: 24,
  maxContentWidth: 600,
} as const;

// Opacity values
export const Opacity = {
  disabled: 0.5,
  subtle: 0.7,
  default: 1,
} as const;

// Animation durations (ms)
export const Duration = {
  short: 200,
  medium: 300,
  long: 500,
} as const;
