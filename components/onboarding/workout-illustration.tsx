import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Line } from 'react-native-svg';
import { useThemeColor } from '@/hooks/use-theme-color';

export function WorkoutIllustration() {
  const tint = useThemeColor({}, 'tint');
  // Use the muted dark blue from the design, or fall back to theme color
  const color = '#2a3a56';

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 400 400">
        {/* Motion lines behind runner (trailing right) */}
        <Line x1="290" y1="150" x2="340" y2="150" stroke={color} strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />
        <Line x1="280" y1="190" x2="350" y2="190" stroke={color} strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />
        <Line x1="275" y1="230" x2="330" y2="230" stroke={color} strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />

        {/* Head (runner leaning into run, head ahead of hips) */}
        <Circle cx="162" cy="84" r="22" fill={color} />

        {/* Torso (leaning forward from neck to hips) */}
        <Path d="M 164 106 L 212 202" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Front arm (swung forward/left, elbow bent) */}
        <Path d="M 172 134 L 128 152 L 132 198" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Back arm (swung behind/right, elbow bent) */}
        <Path d="M 176 134 L 222 150 L 250 128" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Front leg (lifted forward/left, knee high) */}
        <Path d="M 212 202 L 166 244 L 124 232" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Front foot */}
        <Path d="M 124 232 L 110 232" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Back leg (pushing off ground/right, heel up) */}
        <Path d="M 212 202 L 234 278 L 268 312" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Toe-off */}
        <Path d="M 268 312 L 282 312" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Ground line */}
        <Line x1="50" y1="322" x2="350" y2="322" stroke={color} strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});
