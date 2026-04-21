import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export function WelcomeIllustration() {
  const accent = useThemeColor({}, 'tint');

  return (
    <View style={styles.container}>
      {/* Background circles */}
      <View style={[styles.circle, styles.circle1, { borderColor: `${accent}15` }]} />
      <View style={[styles.circle, styles.circle2, { borderColor: `${accent}10` }]} />

      {/* Left side: Data bars (representing your tracking) */}
      <View style={styles.barsContainer}>
        <View style={[styles.bar, styles.bar1, { backgroundColor: accent, opacity: 0.4 }]} />
        <View style={[styles.bar, styles.bar2, { backgroundColor: accent, opacity: 0.6 }]} />
        <View style={[styles.bar, styles.bar3, { backgroundColor: accent, opacity: 0.8 }]} />
        <View style={[styles.bar, styles.bar4, { backgroundColor: accent }]} />
      </View>

      {/* Right side: Upward trend line */}
      <View style={styles.trendContainer}>
        <View style={[styles.trendLine, { backgroundColor: accent }]} />
        <View style={[styles.arrow, { borderLeftColor: accent, borderRightColor: accent, borderTopColor: accent }]} />
      </View>

      {/* Center: Pulse rings */}
      <View style={[styles.pulse, styles.pulse1, { borderColor: `${accent}30` }]} />
      <View style={[styles.pulse, styles.pulse2, { borderColor: `${accent}20` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
  },
  circle1: {
    width: 180,
    height: 180,
  },
  circle2: {
    width: 260,
    height: 260,
  },
  barsContainer: {
    position: 'absolute',
    left: 20,
    bottom: 30,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
    height: 120,
  },
  bar: {
    width: 12,
    borderRadius: 6,
  },
  bar1: {
    height: 40,
  },
  bar2: {
    height: 60,
  },
  bar3: {
    height: 85,
  },
  bar4: {
    height: 110,
  },
  trendContainer: {
    position: 'absolute',
    right: 30,
    top: 20,
    width: 80,
    height: 140,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  trendLine: {
    width: 4,
    height: 100,
    borderRadius: 2,
    transform: [{ rotate: '-35deg' }],
    marginRight: 12,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -6,
  },
  pulse: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1.5,
  },
  pulse1: {
    width: 60,
    height: 60,
  },
  pulse2: {
    width: 90,
    height: 90,
  },
});
