/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */


// Momentum Design System
const palette = {
  light: {
    bg: '#F9F7F3',
    surface: '#FFFFFF',
    surface2: '#EBE4D9',
    ink: '#1B2830',
    ink2: '#3E5160',
    muted: '#6B7985',

    teal: '#3E5C6E',
    teaSoft: '#D7E0E5',
    teaTint: '#EAF0F3',

    sage: '#8FA68E',
    sageSoft: '#DDE5DC',
    sageTint: '#EEF2EC',

    amber: '#C89A5B',
    amberSoft: '#E8D8C0',
    amberTint: '#F3EAD9',

    clay: '#B47C6E',
    claySoft: '#E4D1CC',
    clayTint: '#F1E4DF',
  },
  dark: {
    bg: '#14191E',
    surface: '#1C2229',
    surface2: '#222A32',
    ink: '#EFE9DD',
    ink2: '#C4CCD3',
    muted: '#8A95A0',

    teal: '#7FA0B3',
    teaSoft: '#2A3C47',
    teaTint: '#223039',

    sage: '#A9C0A7',
    sageSoft: '#2D3B2C',
    sageTint: '#26312A',

    amber: '#D9B178',
    amberSoft: '#3D3220',
    amberTint: '#32291B',

    clay: '#CE9D8F',
    claySoft: '#3E2D27',
    clayTint: '#322620',
  },
};

export const Colors = {
  light: {
    text: palette.light.ink,
    background: palette.light.bg,
    tint: palette.light.teal,
    icon: palette.light.muted,
    tabIconDefault: palette.light.muted,
    tabIconSelected: palette.light.teal,
    // State colors
    push: palette.light.sage,
    maintain: palette.light.teal,
    recover: palette.light.clay,
  },
  dark: {
    text: palette.dark.ink,
    background: palette.dark.bg,
    tint: palette.dark.teal,
    icon: palette.dark.muted,
    tabIconDefault: palette.dark.muted,
    tabIconSelected: palette.dark.teal,
    // State colors
    push: palette.dark.sage,
    maintain: palette.dark.teal,
    recover: palette.dark.clay,
  },
};

